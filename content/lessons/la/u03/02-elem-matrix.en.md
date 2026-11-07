---
slug: "elem-matrix"
subject: "la"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Elementary matrices"
subtitle: "Every move is a multiplication"
minutes: 15
meta: ["15 min read","Requires row operations and inverses","Mastery level"]
concepts: ["elementary", "inverse"]
prereq: ["elementary", "inverse"]
related: ["rank", "matrix"]
---

## Goal

By the end of this lecture you can write down the three families of elementary matrices, explain why left multiplication performs a row operation and right multiplication a column operation, and compute an inverse by reducing $(A \mid I)$ to $(I \mid A^{-1})$.

Last lecture treated elimination as a set of moves. This lecture turns each move into a matrix, so that every move becomes a multiplication.

## Three-line recap

- Three elementary row operations: swap rows, scale by a nonzero number, add a multiple of one row to another.
- They are reversible, so they preserve the solution set.
- The target is reduced row echelon form, and it is unique.

## The problem

Moves are awkward to write. The instruction $R_2 - 2R_1$ is meant for a human; a computer cannot execute it, and there is no way to write "eight steps were performed" as a single expression.

If each move were a matrix, the whole elimination would become a chain of matrix products — which can be composed, inverted, and analysed. That is exactly what solving $AX = B$ needs.

## Intuition

Start from the identity, apply one elementary row operation, and call the result an elementary matrix. Three families appear:

- swap rows $i$ and $j$ of $I$ to get $E_{ij}$;
- multiply row $i$ of $I$ by $k$ to get $E_i(k)$;
- add $k$ times row $j$ of $I$ to row $i$ to get $E_{ij}(k)$.

One property carries everything: **left multiplication by an elementary matrix performs the same row operation on $A$.** The reason is plain — row $i$ of $EA$ is a combination of the rows of $A$ using row $i$ of $E$ as instructions, and every row of an elementary matrix is a single instruction.

$$
E_{ij}A \text{ swaps two rows of } A, \qquad E_{ij}(k)A \text{ adds } k \text{ times row } j \text{ to row } i
$$

Right multiplication, by contrast, acts on columns. That symmetry matters for rank later, but it is useless when solving, because column operations move the unknowns.

Every elementary matrix is invertible, with an inverse of the same family: $E_{ij}^{-1} = E_{ij}$, $E_i(k)^{-1} = E_i(1/k)$, $E_{ij}(k)^{-1} = E_{ij}(-k)$. If each move can be undone, the whole chain can be undone, so if a string of elementary matrices turns $A$ into $I$,

$$
E_s \cdots E_2 E_1 A = I
$$

then that product is $A^{-1}$. This is the entire principle behind inverting by row reduction.

## Worked by hand

Take $A = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$, with $|A| = 1$. Append $I$ on the right, then apply row operations to the **whole $2 \times 4$ array**:

$$
\left(\begin{array}{cc|cc}
2 & 1 & 1 & 0 \\
1 & 1 & 0 & 1
\end{array}\right)
\xrightarrow{r_{12}}
\left(\begin{array}{cc|cc}
1 & 1 & 0 & 1 \\
2 & 1 & 1 & 0
\end{array}\right)
$$

$$
\xrightarrow{r_{21}(-2)}
\left(\begin{array}{cc|cc}
1 & 1 & 0 & 1 \\
0 & -1 & 1 & -2
\end{array}\right)
\xrightarrow{r_2(-1)}
\left(\begin{array}{cc|cc}
1 & 1 & 0 & 1 \\
0 & 1 & -1 & 2
\end{array}\right)
$$

$$
\xrightarrow{r_{12}(-1)}
\left(\begin{array}{cc|cc}
1 & 0 & 1 & -1 \\
0 & 1 & -1 & 2
\end{array}\right)
$$

The left half is now $I$, so the right half is $A^{-1} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$. Check: $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

The four elementary matrices are $E_1 = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$, $E_2 = \begin{pmatrix} 1 & 0 \\ -2 & 1 \end{pmatrix}$, $E_3 = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$, $E_4 = \begin{pmatrix} 1 & -1 \\ 0 & 1 \end{pmatrix}$. Multiply them in order:

$$
E_4E_3E_2E_1 = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}
$$

which matches the right half exactly. Elimination itself constructed the inverse.

Worth noting alongside: swapping rows negates the determinant, scaling by $k$ multiplies it by $k$, and adding a multiple of a row leaves it unchanged. The three families have determinants $-1$, $k$, and $1$ — all nonzero, which is the second reason they are invertible.

## Three misconceptions

> [!MYTH] Every elementary matrix has determinant $1$.
> Only the third family does. A swap has determinant $-1$, and scaling row $i$ by $k$ has determinant $k$.

> [!MYTH] Left and right multiplication do the same thing.
> Left multiplies rows, right multiplies columns. Solving allows only row operations, so only left multiplication is safe; right multiplication scrambles the order of the unknowns.

> [!MYTH] When reducing $(A \mid I)$ you may touch only the left half.
> The whole array must move together. The right half is the ledger recording which moves you made; touching only the left records nothing.

## Practice

> [!PRACTICE] 1 · Write it down
> Give the $3 \times 3$ elementary matrix that adds twice row 3 to row 1.
>
> > [!ANSWER] Answer
> > $E_{13}(2) = \begin{pmatrix} 1 & 0 & 2 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$, with the $2$ in position $(1,3)$.

> [!PRACTICE] 2 · Invert it
> For $E = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{pmatrix}$, give $E^{-1}$ and $|E|$.
>
> > [!ANSWER] Answer
> > $E^{-1} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1/3 & 0 \\ 0 & 0 & 1 \end{pmatrix}$ and $|E| = 3$.

> [!PRACTICE] 3 · Order matters
> $E_1$ swaps rows $1$ and $2$; $E_2$ multiplies row $1$ by $3$. Do $E_2E_1A$ and $E_1E_2A$ agree?
>
> > [!ANSWER] Answer
> > No. In $E_2E_1A$ the swap happens first, so the tripled row is the original row 2. In $E_1E_2A$ the triple happens first, so it is the original row 1. Matrix multiplication does not commute.

## Formal statement

> [!FORMAL] Formal statement
> Let $E$ be obtained from $I_n$ by one elementary row operation; $E$ is called an elementary matrix. For any $n \times p$ matrix $A$, $EA$ equals $A$ with the same elementary row operation applied; for any $m \times n$ matrix $A$, $AE$ equals $A$ with the corresponding column operation applied. Every elementary matrix is invertible, and its inverse is elementary of the same type. A square matrix $A$ is invertible if and only if it is a product of finitely many elementary matrices; in that case row reduction of $(A \mid I)$ yields $(I \mid A^{-1})$.
