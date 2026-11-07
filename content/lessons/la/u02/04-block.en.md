---
slug: "block-matrix"
subject: "la"
unit: "u02"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Block matrices"
subtitle: "Treating a big matrix as a matrix of small ones"
minutes: 14
meta: ["14 min read","Requires matrix multiplication and inverses","Mastery level"]
concepts: ["matrix", "inverse"]
prereq: ["matrix", "inverse"]
related: ["rank", "matrix"]
---

## Goal

By the end of this lecture you can slice a large matrix into blocks, multiply the blocks by the ordinary rule, invert a block diagonal matrix, and count exactly how many scalar operations one blocked product performs.

No new operation appears here. The only change is the point of view: matrices can be multiplied, so why should a matrix whose entries are matrices be any different?

## Three-line recap

- Matrix multiplication is row times column, summed, with matching inner shapes.
- An inverse undoes a map, and exists exactly when the determinant is nonzero.
- Elimination, inversion, and solving are all the same moves applied to a whole array of numbers.

## The problem

A $4 \times 4$ product means writing down $16$ entries, each a sum of four products. One size up and the page becomes unreadable; one size up again and even the computer starts worrying about cache.

But real large matrices are rarely random. They come with structure: a block in the upper left, another in the lower right, zeros in between; or rows that split into groups of unrelated variables. Since the zeros and the structure are free, can we treat each chunk as a single entry?

## Intuition

Cut $A$ once horizontally and once vertically, and four blocks appear:

$$
A = \begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix}
$$

As long as each block has the right shape, the multiplication rule is exactly the old one:

$$
AB = \begin{pmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12}B_{22} \\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22} \end{pmatrix}
$$

The one extra condition is **conformability**: wherever $A$ is cut between columns, $B$ must be cut between rows, at the same position. Otherwise a term like $A_{12}B_{21}$ cannot even be formed.

The prettiest application is the block diagonal matrix. If

$$
D = \begin{pmatrix} A & 0 \\ 0 & B \end{pmatrix}
$$

and both $A$ and $B$ are invertible, then so is $D$, with

$$
D^{-1} = \begin{pmatrix} A^{-1} & 0 \\ 0 & B^{-1} \end{pmatrix}, \qquad |D| = |A| \cdot |B|
$$

Verification takes one block product: the off-diagonal block is $A \cdot 0 + 0 \cdot B^{-1} = 0$, and the diagonal blocks give $AA^{-1} = I$. Whole zero blocks swallow every cross term, and that is where the saving lives. A block upper triangular matrix $\begin{pmatrix} A & C \\ 0 & B \end{pmatrix}$ likewise has $|A||B|$, since expanding along the first block column kills the second term.

## Worked by hand

Take two $4 \times 4$ matrices, each cut into four $2 \times 2$ blocks.

$$
A = \left(\begin{array}{cc|cc}
1 & 2 & 0 & 1 \\
3 & 4 & 1 & 0 \\ \hline
1 & 0 & 2 & 1 \\
0 & 1 & 1 & 2
\end{array}\right), \qquad
B = \left(\begin{array}{cc|cc}
1 & 0 & 0 & 1 \\
2 & 1 & 1 & 0 \\ \hline
1 & 1 & 2 & 0 \\
0 & 1 & 0 & 2
\end{array}\right)
$$

Start with the upper-left block, $C_{11} = A_{11}B_{11} + A_{12}B_{21}$:

$$
A_{11}B_{11} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} = \begin{pmatrix} 5 & 2 \\ 11 & 4 \end{pmatrix}, \qquad
A_{12}B_{21} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 1 \end{pmatrix}
$$

So $C_{11} = \begin{pmatrix} 5 & 3 \\ 12 & 5 \end{pmatrix}$. The other three follow the same way:

$$
C_{12} = \begin{pmatrix} 2 & 3 \\ 6 & 3 \end{pmatrix}, \qquad
C_{21} = \begin{pmatrix} 3 & 3 \\ 3 & 4 \end{pmatrix}, \qquad
C_{22} = \begin{pmatrix} 4 & 3 \\ 3 & 4 \end{pmatrix}
$$

Assemble, and entry $(2,1)$ of $C$ is $12$. Spot-check it the ordinary way: row $2$ of $A$, $(3, 4, 1, 0)$, dotted with column $1$ of $B$, $(1, 2, 1, 0)$, gives $3 + 8 + 1 + 0 = 12$.

Now the dimension audit. Four blocks $C_{ij}$, two block products each, so eight products of $2 \times 2$ by $2 \times 2$; each costs $2^3 = 8$ scalar multiplications, for a total of $64$ — exactly $4^3$. Blocking saves no arithmetic. It buys three other things: zero blocks can be skipped whole (set $A_{21} = 0$ and $C_{21}$ loses one of its two products, a quarter of the block work gone); every block product is an ordinary small matrix product that an optimised routine can run at full speed; and the eight block products are independent, hence parallel.

## Three misconceptions

> [!MYTH] Blocking reduces the number of multiplications.
> It usually does not. A $4 \times 4$ split into $2 \times 2$ blocks still costs $64$ scalar products. What drops is work on zero blocks, cache misses, and communication.

> [!MYTH] Any cut works for block multiplication.
> Conformability is required: the vertical cut positions in the left matrix must match the horizontal cut positions in the right one. Otherwise inner blocks have incompatible shapes.

> [!MYTH] Inverting a block diagonal matrix means adding the blocks first.
> No. Invert each block in place and leave the zeros alone.

## Practice

> [!PRACTICE] 1 · Conformability
> $A$ is cut by columns into $2+3$ and $B$ by rows into $3+2$. Can they be multiplied blockwise this way?
>
> > [!ANSWER] Answer
> > No. The first block of $A$ is $m \times 2$ while the first block of $B$ is $3 \times p$; the inner sizes $2$ and $3$ disagree. $B$ must be cut into rows as $2+3$.

> [!PRACTICE] 2 · Block diagonal inverse
> Let $D = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 4 \end{pmatrix}$. Give $D^{-1}$ and $|D|$.
>
> > [!ANSWER] Answer
> > $D^{-1} = \begin{pmatrix} 1/2 & 0 & 0 \\ 0 & 1/3 & 0 \\ 0 & 0 & 1/4 \end{pmatrix}$ and $|D| = 2 \times 3 \times 4 = 24$.

> [!PRACTICE] 3 · Count them
> Split a $6 \times 6$ product into $3 \times 3$ blocks. How many block multiplications, and how many scalar multiplications?
>
> > [!ANSWER] Answer
> > A $2 \times 2$ block structure needs two block products per $C_{ij}$, so eight block multiplications; each costs $3^3 = 27$, giving $216$, the same as $6^3$.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be $m \times n$ and $B$ be $n \times p$. Cut the columns of $A$ and the rows of $B$ at the same points $n_1 + \dots + n_r$, and cut the rows of $A$ and the columns of $B$ arbitrarily into $m_1 + \dots + m_s$ and $p_1 + \dots + p_t$. Then block $(i,j)$ of $AB$ is $\sum_{k=1}^{r} A_{ik}B_{kj}$, of shape $m_i \times p_j$. Block multiplication and ordinary multiplication produce the same matrix, because the block sums merely regroup scalar sums.
