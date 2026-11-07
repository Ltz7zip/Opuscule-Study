---
slug: "matrix-eq"
subject: "la"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Linear Algebra · Mastery"
title: "Linear systems and matrices"
subtitle: "Compressing a page of equations into one table"
minutes: 14
meta: ["14 min read","Requires elementary maths","Mastery level"]
concepts: ["matrix", "la"]
prereq: ["elem"]
related: ["matrix", "rank"]
---

## Goal

By the end of this lecture you can write any linear system as $Ax = b$, tell the coefficient matrix apart from the augmented matrix, and say what diagonal, identity, and triangular matrices each save you.

We are not solving anything yet. This lecture is one translation: a page of equations becomes one table of numbers, and every method that follows works on that table.

## Three-line recap

- A determinant assigns a single number to a square matrix, and decides whether it is invertible.
- Real problems are rarely square, and rarely have only three unknowns.
- What we lack is not another number but a structure that handles a whole system at once.

## The problem

A system of three linear equations looks like this:

$$
\begin{cases}
x_1 + 2x_2 + x_3 = 8 \\
2x_1 - x_2 + 3x_3 = 9 \\
-x_1 + x_2 + 2x_3 = 7
\end{cases}
$$

Five lines of writing, the variable names appear nine times, and only two kinds of thing carry information: the coefficients and the constants. Cramer's rule does give the unique solution, but $n$ unknowns cost $n+1$ determinants of order $n$, each expanding by definition into $n!$ terms. At $n = 10$ the road is already closed; at $n = 100$ writing the expansion down is hopeless.

So the question becomes: can we drop the repeated variable names, keep only numbers, and make elimination something mechanical that you can run without thinking?

## Intuition

Lay the numbers of each equation out by position and the variables fade into column labels. Column 1 is always $x_1$, column 2 is always $x_2$. Keep that order throughout and nothing can be misread.

The first three columns form the coefficient matrix $A$; the last column is the constant vector $b$. Pasting $b$ onto the right of $A$ gives the augmented matrix, written $(A \mid b)$. The whole system then collapses into one line:

$$
Ax = b
$$

This is the most important change of view in the course: **a system is not a pile of equations, it is a matrix times an unknown vector, equal to a known vector.** The previous lecture said $Ax$ is a weighted sum of the columns of $A$, weighted by the entries of $x$, so solving the system asks: how many of each column do we need to build $b$?

Equality of matrices follows the same logic: same shape, and every corresponding entry equal. A $2 \times 3$ matrix never equals a $3 \times 2$ one, however identical the digits look.

Three special families are worth meeting now. A diagonal matrix has nonzero entries only on the main diagonal. The identity $I_n$ is diagonal with every diagonal entry $1$; it does nothing, $Ix = x$. An upper triangular matrix has zeros below the diagonal, a lower triangular one has zeros above it. They earn their name because an upper triangular system can be solved from the last equation upwards, one unknown at a time. Turning any matrix into that shape is the whole purpose of elimination.

## Worked by hand

Take the system above. Copy the table first:

$$
(A \mid b) = \left(\begin{array}{ccc|c}
1 & 2 & 1 & 8 \\
2 & -1 & 3 & 9 \\
-1 & 1 & 2 & 7
\end{array}\right)
$$

Add $-2$ times row 1 to row 2, and $1$ times row 1 to row 3:

$$
\left(\begin{array}{ccc|c}
1 & 2 & 1 & 8 \\
0 & -5 & 1 & -7 \\
0 & 3 & 3 & 15
\end{array}\right)
$$

Now add $\frac{3}{5}$ times row 2 to row 3, making row 3 equal to $(0,\ 0,\ \frac{18}{5},\ \frac{54}{5})$, then scale row 3 by $\frac{5}{18}$:

$$
\left(\begin{array}{ccc|c}
1 & 2 & 1 & 8 \\
0 & -5 & 1 & -7 \\
0 & 0 & 1 & 3
\end{array}\right)
$$

Read upwards: $x_3 = 3$; back into row 2, $-5x_2 + 3 = -7$ gives $x_2 = 2$; back into row 1, $x_1 + 4 + 3 = 8$ gives $x_1 = 1$. The answer is $(1, 2, 3)$, and each original equation checks out.

The three moves used here — swap two rows, scale a row by a nonzero number, add a multiple of one row to another — will be named elementary row operations in the next lecture, and proved not to change the solution set. That is the point of this whole lecture: **solving a system, start to finish, is nothing but these three moves applied to the augmented matrix.**

## Three misconceptions

> [!MYTH] The last column of an augmented matrix is also a coefficient.
> It is the constant on the right-hand side. Sitting in its own column is bookkeeping; it is not part of $A$, and mixing it in corrupts both the shape and the rank of $A$.

> [!MYTH] Two matrices with the same numbers are equal.
> Shape is part of equality. $\begin{pmatrix} 1 & 2 & 3 \end{pmatrix}$ and $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ contain identical entries, but one is $1 \times 3$ and the other $3 \times 1$.

> [!MYTH] You always check a determinant before solving.
> Determinants exist only for square matrices. An augmented matrix is usually $m \times (n+1)$, so there is nothing to expand; the general test is rank, which arrives in the next chapter.

## Practice

> [!PRACTICE] 1 · Copy the table
> Write $\begin{cases} 2x_1 - x_2 = 3 \\ x_1 + 4x_2 = 5 \end{cases}$ as $Ax = b$, and give $A$, $b$, and $(A \mid b)$.
>
> > [!ANSWER] Answer
> > $A = \begin{pmatrix} 2 & -1 \\ 1 & 4 \end{pmatrix}$, $b = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$, $(A \mid b) = \left(\begin{array}{cc|c} 2 & -1 & 3 \\ 1 & 4 & 5 \end{array}\right)$.

> [!PRACTICE] 2 · Name the shapes
> A system has $5$ unknowns and $3$ equations. What are the shapes of $A$, $b$, and $(A \mid b)$?
>
> > [!ANSWER] Answer
> > $A$ is $3 \times 5$, $b$ is $3 \times 1$, and $(A \mid b)$ is $3 \times 6$.

> [!PRACTICE] 3 · Special matrices
> Write down $I_3$, and explain why an upper triangular system needs no elimination.
>
> > [!ANSWER] Answer
> > $I_3 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$. The last row of an upper triangular system contains a single unknown; solve it, substitute upwards, and each remaining row again has only one new unknown.

## Formal statement

> [!FORMAL] Formal statement
> Let $A \in \mathbb{R}^{m \times n}$, $x \in \mathbb{R}^n$, $b \in \mathbb{R}^m$. The solution set of $Ax = b$ is $\{\, x : Ax = b \,\}$. The augmented matrix $(A \mid b)$ is the $m \times (n+1)$ matrix obtained by appending $b$ as column $n+1$. Two matrices of the same shape are equal exactly when all corresponding entries agree. A diagonal matrix has $a_{ij} = 0$ for $i \neq j$; the identity is the diagonal matrix with every diagonal entry $1$; an upper triangular matrix has $a_{ij} = 0$ for $i > j$.
