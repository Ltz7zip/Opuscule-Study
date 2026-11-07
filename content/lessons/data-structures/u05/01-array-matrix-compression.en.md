---
slug: "array-matrix-compression"
subject: "data-structures"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "Arrays and Matrix Compression"
subtitle: "Turning two indices into one address"
minutes: 16
meta: ["16 min read","Requires Linked Lists","Mastery level"]
concepts: ["arraygen"]
prereq: ["list"]
related: ["stringds", "tree"]
---

## What you will get

By the end of this lecture you can write the address formula for any array in row-major or column-major order, derive the one-dimensional index of a symmetric matrix, and decide whether a triangular or sparse matrix wants a packed array, a triple table, or a cross-linked list.

## Three lines back

- An array maps indices to values; a multi-dimensional array is linearised in memory by a chosen order.
- The row-major index formula settles everything, and transposing just swaps the two coefficients.
- A symmetric matrix stores only half; a sparse matrix stores only what is nonzero, plus its position.

## Address arithmetic for arrays

A one-dimensional array addresses as $\mathrm{LOC}(a_i)=\mathrm{LOC}(a_0)+i\times L$. A two-dimensional array $A[m][n]$ must be flattened, and two orders are in use. Row-major (C, Pascal) finishes row 0 before row 1:

$$
\mathrm{LOC}(i,j)=\mathrm{LOC}(0,0)+(i\times n+j)\times L
$$

Column-major (Fortran) finishes column 0 before column 1:

$$
\mathrm{LOC}(i,j)=\mathrm{LOC}(0,0)+(j\times m+i)\times L
$$

Take $A[4][5]$, $L=4$, $\mathrm{LOC}(0,0)=1000$, and ask for $A[2][3]$. Row-major gives $1000+(2\times5+3)\times4=1052$. Column-major gives $1000+(3\times4+2)\times4=1056$. The four-byte gap equals the difference in how many elements precede the target under each order.

| Order | Formula | Address step | Typical languages |
| --- | --- | --- | --- |
| Row-major | $(i\times n+j)L$ | $L$ within a row | C, Pascal |
| Column-major | $(j\times m+i)L$ | $L$ within a column | Fortran |

For a three-dimensional array $A[p][m][n]$ in row-major order, the offset of $(i,j,k)$ is $(i\times m\times n+j\times n+k)\times L$. The pattern is simple: each dimension's coefficient is the product of the lengths to its right.

## Compressing symmetric and triangular matrices

An $n\times n$ symmetric matrix satisfies $a_{ij}=a_{ji}$, so only the lower triangle including the diagonal needs storage: $n(n+1)/2$ entries instead of $n^{2}$. Packing that triangle row by row into a zero-based array gives

$$
k=\frac{i(i+1)}{2}+j,\qquad i\ge j
$$

because rows $0$ through $i-1$ contribute $0+1+\dots+i=\dfrac{i(i+1)}{2}$ entries and the current row contributes $j$. For $n=5$ and entry $(3,2)$: $k=3\times4/2+2=8$. Accessing $(2,3)$ in the upper triangle simply swaps the indices and lands on the same slot.

| Matrix type | Nonzeros | Storage | Index map |
| --- | --- | --- | --- |
| General $n\times n$ | $n^{2}$ | $n^{2}$ | $i\times n+j$ |
| Symmetric | $n(n+1)/2$ | $n(n+1)/2$ | $i(i+1)/2+j$ |
| Lower triangular | $n(n+1)/2$ | $n(n+1)/2$ | $i(i+1)/2+j$ |
| Upper triangular | $n(n+1)/2$ | $n(n+1)/2$ | derived below |

For an upper triangle stored row by row, row $i$ holds only $n-i$ entries, and the first $i$ rows hold $\sum_{t=0}^{i-1}(n-t)=i\,n-\dfrac{i(i-1)}{2}$. Hence $k=i\,n-\dfrac{i(i-1)}{2}+(j-i)$. The formula is not memorised but counted: how many entries come before this one.

A triangular matrix, where one half is a constant $c$, stores $n(n+1)/2+1$ cells, the extra one holding $c$. Access to the constant half returns it directly with no branch on the actual value.

## Representing sparse matrices

A sparse matrix has few nonzeros, often under 5 percent. A triple table keeps only the row, column, and value of each:

```c
typedef struct {
    int i, j;
    int e;
} Triple;

typedef struct {
    Triple data[1000];
    int mu, nu, tu;      /* rows, columns, nonzeros */
} TSMatrix;
```

The table saves space but loses positional access: finding $(i,j)$ means scanning. Transposing column by column costs $O(\text{nu}\times\text{tu})$, while a two-pass scheme that first counts entries per column and then computes starting offsets costs $O(\text{nu}+\text{tu})$.

A cross-linked list suits matrices whose nonzeros change over time. Each entry hangs on two chains at once:

```c
typedef struct OLNode {
    int i, j, e;
    struct OLNode *right, *down;
} OLNode, *OLink;
```

`right` links the next nonzero in the same row and `down` the next in the same column, with arrays of row and column head pointers alongside. Insertion and deletion touch only local pointers instead of shifting the whole table, at the cost of two extra pointers per node.

> [!NOTE]
> Compression changes the index map, not the arithmetic. Random access stays $O(1)$ precisely because the map is still one multiply and one add. Once a linked structure replaces the formula, locating an entry degrades to the length of a row chain.

## Three misconceptions

> [!MYTH] A two-dimensional array is genuinely two-dimensional in memory.
> Memory is one-dimensional. Twoness is an illusion produced by the index map, and row-major versus column-major are two different linearisations whose data cannot be mixed.

> [!MYTH] A compressed symmetric matrix cannot be accessed randomly.
> It can. Mapping $(i,j)$ through $k=i(i+1)/2+j$ is still $O(1)$, and the mirror position is reached by swapping the indices.

> [!MYTH] A triple table always beats a cross-linked list for sparse matrices.
> The triple table uses fewer pointers and suits static matrices. A cross-linked list suits frequent inserts and deletes. The operation mix decides, not the sparsity ratio.

## Practice

> [!PRACTICE] 1 · Compute an address
> $A[6][8]$ is stored row-major with $L=2$ and $\mathrm{LOC}(0,0)=500$. Find the address of $A[4][5]$.
>
> > [!ANSWER] Show answer
> > $500+(4\times8+5)\times2=500+74=574$.

> [!PRACTICE] 2 · Compute an index
> A symmetric matrix of order 5 stores its lower triangle row by row. Find the flat index of $(4,1)$.
>
> > [!ANSWER] Show answer
> > $k=4\times5/2+1=11$, the twelfth entry.

> [!PRACTICE] 3 · Choose a structure
> A $1000\times1000$ matrix has 2000 nonzeros and needs frequent row scans plus occasional insertion. Triple table or cross-linked list?
>
> > [!ANSWER] Show answer
> > Cross-linked list. Nonzeros are only 0.2 percent and inserts are frequent; the list adjusts local pointers while the triple table would shift entries.

## Formal statement

An array is a mapping from an index set to a value set. A multi-dimensional array is linearised in memory in row-major or column-major order; for an $m\times n$ array in row-major order the address of $(i,j)$ is $\mathrm{LOC}(0,0)+(in+j)L$, and in column-major order $\mathrm{LOC}(0,0)+(jm+i)L$, where $L$ is the element size in bytes. An $n\times n$ symmetric matrix stores only its lower triangle of $n(n+1)/2$ entries, with row-major index $k=i(i+1)/2+j$; the upper triangle stored row by row maps to $k=in-i(i-1)/2+(j-i)$. A triangular matrix keeps one extra cell for its constant. A sparse matrix may be represented by a triple table of (row, column, value) using $O(t)$ space but no positional access, or by a cross-linked list in which each nonzero node joins its row and column chains, supporting $O(1)$ local insertion and deletion at the cost of extra pointers.