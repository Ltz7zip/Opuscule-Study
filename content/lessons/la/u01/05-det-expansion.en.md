---
slug: "det-expansion"
subject: "la"
unit: "u01"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Linear Algebra · Mastery"
title: "Cofactor expansion"
subtitle: "Breaking a big determinant into small ones"
minutes: 14
meta: ["14 min read","Requires properties of determinants","Mastery level"]
concepts: ["cofactor", "det"]
prereq: ["det"]
related: ["cramer", "inverse"]
---

## Goal

By the end of this lecture you can write the minor $M_{ij}$ and the cofactor $A_{ij}$, expand along any row or column, and see how much work creating zeros first saves.

## Three-line recap

- A third-order determinant can be split along one row into three second-order determinants.
- The smaller determinant is the minor; multiplied by $(-1)^{i+j}$ it becomes the cofactor.
- Expanding along any row or column gives the same number.

## The problem

The definition costs $n!$ terms, and row reduction takes a sequence of steps. Is there a third route?

Yes: **reduce the order**. Split an $n$-th order determinant into several of order $n-1$, repeat, and stop at order two. The cost is far below $n!$, and every step can be checked by eye.

## Intuition

Expanding along the first row, a third-order determinant becomes

$$
D = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}
$$

where $M_{1j}$ is the second-order determinant left after deleting row 1 and column $j$. The alternating signs come from $(-1)^{1+j}$.

This is not a new formula. It regroups the six terms of the definition by first-row entries: three terms per group, and each group collapses into one second-order determinant. Expansion and definition are the same statement written two ways, and the first is easier to compute with.

## Worked by hand

Take the third-order determinant from Lecture 1 and expand along the second row, where there is a zero:

$$
D = \begin{vmatrix} 2 & 1 & 3 \\ 0 & 4 & -1 \\ 5 & 2 & 1 \end{vmatrix}
$$

The term $a_{21}A_{21}$ vanishes because $a_{21}=0$. Two terms remain:

$$
M_{22} = \begin{vmatrix} 2 & 3 \\ 5 & 1 \end{vmatrix} = 2-15 = -13, \qquad A_{22} = (-1)^{2+2}M_{22} = -13
$$

$$
M_{23} = \begin{vmatrix} 2 & 1 \\ 5 & 2 \end{vmatrix} = 4-5 = -1, \qquad A_{23} = (-1)^{2+3}M_{23} = 1
$$

Therefore

$$
D = 0 + 4\times(-13) + (-1)\times 1 = -53
$$

The answer matches Lecture 1, but only two second-order determinants were computed.

If a row has no zeros, create some first with row addition. To keep $a_{11}$ and clear the entries below it in column 1, apply $r_2 - \frac{a_{21}}{a_{11}}r_1$. Every zero created removes one term from the expansion.

## Three misconceptions

> [!MYTH] The minor and the cofactor are the same thing.
> They differ by a sign: $A_{ij} = (-1)^{i+j}M_{ij}$. The position decides whether the sign flips.

> [!MYTH] You can only expand along the first row.
> Any row and any column work, and the value is identical. Choosing the row with the most zeros is purely a matter of effort.

> [!MYTH] Row operations before expanding are forbidden because they change the determinant.
> Row addition leaves the determinant unchanged, so it is safe. Only swapping rows flips the sign, and that can be tracked.

## Practice

> [!PRACTICE] 1 · Write a cofactor
> For the matrix above, find $A_{13}$.
>
> > [!ANSWER] Show answer
> > Deleting row 1 and column 3 leaves $\begin{vmatrix} 0 & 4 \\ 5 & 2 \end{vmatrix} = -20$, so $A_{13} = (-1)^{1+3}(-20) = -20$.

> [!PRACTICE] 2 · Expand elsewhere
> Compute $\begin{vmatrix} 1 & 2 & 3 \\ 2 & 1 & 4 \\ 0 & 3 & 1 \end{vmatrix}$ along the first column.
>
> > [!ANSWER] Show answer
> > $1\times(1-12) + 2\times\big(-(2-9)\big) + 0 = -11 + 14 = 3$.

> [!PRACTICE] 3 · Choosing a line
> In a fourth-order determinant, row 3 has a single nonzero entry $a_{34}$. How should you expand?
>
> > [!ANSWER] Show answer
> > Along row 3. Only the term $a_{34}A_{34}$ survives, and the fourth-order problem drops straight to third order.

## Formal statement

Two theorems: one expands, one explains what happens with a different row.

> [!FORMAL] Formal statement
> Delete the row and column containing $a_{ij}$ from an $n$-th order determinant; the remaining determinant of order $n-1$ is the minor $M_{ij}$, and $A_{ij}=(-1)^{i+j}M_{ij}$ is the cofactor. Laplace's expansion theorem: for any fixed row $i$,
> $$D = \sum_{j=1}^{n} a_{ij}A_{ij},$$
> and for any fixed column $j$, $D=\sum_{i=1}^{n}a_{ij}A_{ij}$. Moreover, for $k\neq i$, $\sum_{j=1}^{n} a_{kj}A_{ij}=0$. Together these say that the transpose of the cofactor matrix multiplied by $A$ equals $\det A$ times the identity — the source of the inverse formula in the next chapter.
