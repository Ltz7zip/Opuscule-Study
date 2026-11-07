---
slug: "inverse"
subject: "la"
unit: "u02"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "Inverse matrices"
subtitle: "When division is allowed"
minutes: 15
meta: ["15 min read","Requires matrix multiplication and determinants","Mastery level"]
concepts: ["inverse", "matrix"]
prereq: ["matrix", "det"]
related: ["det", "cramer"]
---

## Goal

By the end of this lecture you can state exactly when a matrix has an inverse, compute the inverse of a small matrix with the adjugate formula, and solve a matrix equation $AX = B$.

The last lecture gave us $Ax = b$ as a system. This one asks a greedier question: can we find a single matrix $A^{-1}$ so that $x = A^{-1}b$ settles everything in one step?

## Three-line recap

- Matrix multiplication means "apply one map, then another".
- Multiplication does not commute: $AB$ and $BA$ are different maps in general.
- The identity $I$ is the map that does nothing.

## The problem

For numbers, $ax = b$ is solved by $x = b/a$, provided $a \neq 0$. That division is really a multiplication: $x = a^{-1}b$.

Can matrices copy this? We want $A^{-1}$ with $A^{-1}A = AA^{-1} = I$, then $x = A^{-1}b$. Three obstacles stand in the way. Only square matrices can have an inverse at all. Multiplication does not commute, so left and right inverses must both hold. And where numbers have a single zero, matrices need their own way of being "zero".

That way is the determinant. If $|A| \neq 0$ then $A$ is invertible; if $|A| = 0$ it is not, and we call $A$ singular.

## Intuition

An inverse is an undo button. $A$ carries $x$ to $b$; $A^{-1}$ carries $b$ back to $x$. Undoing is possible exactly when nothing was lost on the way.

And $|A| = 0$ is the geometric way of saying something was lost: the map crushes the whole plane onto a line, or onto a point, so many different vectors land in the same place. Once destinations coincide, the way back cannot tell them apart. Dividing by zero in one dimension is the same failure in miniature.

The adjugate formula turns this into an algorithm:

$$
A^{-1} = \frac{1}{|A|} A^{*}, \qquad A A^{*} = A^{*} A = |A| I
$$

Here $A^{*}$ is the adjugate: entry $(i, j)$ of $A^{*}$ is the cofactor of $a_{ji}$ — note the indices are **swapped**, and that transpose is where almost every mistake happens. The identity $AA^{*} = |A|I$ is easy to check: the diagonal entries are the cofactor expansion of $|A|$ along a row, and the off-diagonal entries are a row multiplied by another row's cofactors, which vanishes identically.

## Worked by hand

Take $A = \begin{pmatrix} 3 & 1 \\ 2 & 1 \end{pmatrix}$. The determinant first:

$$
|A| = 3 \times 1 - 1 \times 2 = 1
$$

For $2 \times 2$ there is a formula worth memorising: swap the diagonal, flip the signs of the off-diagonal, divide by the determinant.

$$
A^{-1} = \frac{1}{1}\begin{pmatrix} 1 & -1 \\ -2 & 3 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ -2 & 3 \end{pmatrix}
$$

Check: $AA^{-1} = \begin{pmatrix} 3 - 2 & -3 + 3 \\ 2 - 2 & -2 + 3 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

Now solve $AX = B$ with $B = \begin{pmatrix} 5 & 1 \\ 3 & 2 \end{pmatrix}$. Since $A$ is invertible, multiply on the left by $A^{-1}$:

$$
X = A^{-1}B = \begin{pmatrix} 1 & -1 \\ -2 & 3 \end{pmatrix}\begin{pmatrix} 5 & 1 \\ 3 & 2 \end{pmatrix} = \begin{pmatrix} 5-3 & 1-2 \\ -10+9 & -2+6 \end{pmatrix} = \begin{pmatrix} 2 & -1 \\ -1 & 4 \end{pmatrix}
$$

Check $AX$: the first column is $\begin{pmatrix} 6-1 \\ 4-1 \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$, the second is $\begin{pmatrix} -3+4 \\ -2+4 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$, which is exactly $B$.

One detail is worth pausing on. For $AX = B$ you multiply on the **left**; for $XA = B$ you must multiply on the right and get $X = BA^{-1}$. Multiply on the wrong side and both the shape and the answer are wrong.

## Three misconceptions

> [!MYTH] If $|A| \neq 0$, the inverse is the reciprocal of each entry.
> Not at all. The inverse permutes positions, flips signs, and then divides by $|A|$. Only a diagonal matrix happens to invert entry by entry.

> [!MYTH] You can just divide by a matrix.
> Matrices have no division, only multiplication by an inverse, and you must specify left or right because $AB \neq BA$. The solution of $AX = B$ is $A^{-1}B$, never $BA^{-1}$.

> [!MYTH] Now that inverses exist, always invert first.
> Numerically the opposite holds. Inverting costs $O(n^3)$ and amplifies rounding error; practice eliminates on $(A \mid b)$ directly. Inverses are for theory.

## Practice

> [!PRACTICE] 1 · Invertible?
> Is $A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$ invertible? Why?
>
> > [!ANSWER] Answer
> > No. $|A| = 4 - 4 = 0$, and row 2 is twice row 1: both rows point along the same line.

> [!PRACTICE] 2 · Compute it
> Find the inverse of $A = \begin{pmatrix} 2 & 5 \\ 1 & 3 \end{pmatrix}$.
>
> > [!ANSWER] Answer
> > $|A| = 6 - 5 = 1$, so $A^{-1} = \begin{pmatrix} 3 & -5 \\ -1 & 2 \end{pmatrix}$, and $AA^{-1} = I$ checks.

> [!PRACTICE] 3 · Matrix equation
> With $A = \begin{pmatrix} 2 & 5 \\ 1 & 3 \end{pmatrix}$, solve $XA = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.
>
> > [!ANSWER] Answer
> > Multiply on the right by $A^{-1}$: $X = A^{-1} = \begin{pmatrix} 3 & -5 \\ -1 & 2 \end{pmatrix}$. The side matters; this is not the $AX = B$ layout.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be $n \times n$. If there is an $n \times n$ matrix $B$ with $AB = BA = I$, then $A$ is invertible, $B$ is its inverse, written $A^{-1}$, and it is unique. $A$ is invertible if and only if $|A| \neq 0$; then $A^{-1} = \frac{1}{|A|}A^{*}$ with $A^{*} = (A_{ji})$, where $A_{ij}$ is the cofactor of $a_{ij}$. If $A$ and $B$ are invertible, then $(AB)^{-1} = B^{-1}A^{-1}$ and $(A^{\mathsf{T}})^{-1} = (A^{-1})^{\mathsf{T}}$.
