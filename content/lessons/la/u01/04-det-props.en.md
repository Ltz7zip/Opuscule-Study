---
slug: "det-props"
subject: "la"
unit: "u01"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Properties of determinants"
subtitle: "Which moves leave the number alone"
minutes: 15
meta: ["15 min read","Requires the n-th order determinant","Mastery level"]
concepts: ["det"]
prereq: ["det"]
related: ["cofactor", "cramer"]
---

## Goal

By the end of this lecture you can state the five basic properties, reduce a third-order determinant to triangular form with row operations, and say exactly whether each step changed the number.

## Three-line recap

- A determinant is linear in each row and alternating under row swaps.
- Every computational trick follows from these two facts.
- The cheapest target shape is upper triangular: the value is the product of the diagonal.

## The problem

The definition costs $n!$ terms. A tenth-order determinant would need more than three million multiplications. We need operations that either leave the determinant unchanged or change it in a known way, so the matrix can be simplified.

## Intuition

Think of the determinant as a signed volume. Adding $k$ times one row to another slides one edge of the parallelepiped along another edge: base and height are untouched, so the volume is untouched. Swapping two rows exchanges two edges, reversing the orientation, so the volume changes sign. Multiplying a row by $k$ stretches that edge by $k$, and the volume follows.

## Worked by hand

$$
D = \begin{vmatrix} 1 & 2 & 3 \\ 2 & 5 & 7 \\ 3 & 7 & 9 \end{vmatrix}
$$

| Step | Operation | Resulting matrix | Relation to $D$ |
| --- | --- | --- | --- |
| 0 | start | $\begin{pmatrix} 1 & 2 & 3 \\ 2 & 5 & 7 \\ 3 & 7 & 9 \end{pmatrix}$ | $D$ |
| 1 | $r_2 - 2r_1$ | $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 3 & 7 & 9 \end{pmatrix}$ | unchanged, still $D$ |
| 2 | $r_3 - 3r_1$ | $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 1 & 0 \end{pmatrix}$ | unchanged, still $D$ |
| 3 | swap $r_2, r_3$ | $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}$ | sign flip, now $-D$ |
| 4 | $r_3 - r_2$ | $\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$ | unchanged, still $-D$ |

The final matrix is upper triangular, so its value is $1\times1\times1 = 1$. Hence $-D = 1$, that is $D = -1$.

Check against the definition: $1\cdot(45-49) - 2\cdot(18-21) + 3\cdot(14-15) = -4+6-3 = -1$. Two row additions, one swap, one more addition — far cheaper than brute force.

## Three misconceptions

> [!MYTH] Adding a multiple of one row to another changes the determinant.
> Row addition leaves it unchanged; that is why it is the workhorse of simplification. What does change the determinant is multiplying an entire row by $k$.

> [!MYTH] $\det(kA) = k\det A$.
> Every entry is multiplied by $k$, so each of the $n$ rows contributes a factor $k$: $\det(kA) = k^n \det A$. For order three that is $k^3$.

> [!MYTH] Two proportional rows can still give a nonzero determinant.
> Factor out the ratio, and two rows become identical. Identical rows swap to the same matrix but must change sign, so the value can only be zero.

## Practice

> [!PRACTICE] 1 · Read the structure
> Compute $\begin{vmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{vmatrix}$.
>
> > [!ANSWER] Show answer
> > Apply $r_3 - 2r_2 + r_1$; the third row becomes all zeros, so the determinant is $0$. This always happens when the rows form an arithmetic progression.

> [!PRACTICE] 2 · Scaling
> A $3\times3$ matrix $A$ has $\det A = 5$. Find $\det(2A)$ and $\det(-A)$.
>
> > [!ANSWER] Show answer
> > $\det(2A) = 2^3 \times 5 = 40$; $\det(-A) = (-1)^3 \times 5 = -5$.

> [!PRACTICE] 3 · Using antisymmetry
> Without computing, explain why a determinant with two equal rows must vanish.
>
> > [!ANSWER] Show answer
> > Swapping the equal rows leaves the matrix unchanged, so $D$ is unchanged; but a swap must flip the sign, so $D = -D$ and therefore $D = 0$.

## Formal statement

The five properties, side by side.

> [!FORMAL] Formal statement
> A determinant satisfies: (1) $\det(A^{\mathsf{T}}) = \det A$; (2) swapping two rows changes the sign; (3) a common factor $k$ in one row can be pulled out — multiplying that row by $k$ multiplies the determinant by $k$ — and the determinant is additive in each row; (4) two equal rows give zero; (5) adding $k$ times one row to another leaves the determinant unchanged. By (2), (3) and (5) any square matrix can be reduced to triangular form with the determinant tracked exactly, so $D$ equals the product of the diagonal entries times the sign accumulated from row swaps. Transpose invariance says all five statements hold for columns as well.
