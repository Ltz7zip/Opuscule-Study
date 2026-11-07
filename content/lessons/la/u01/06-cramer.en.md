---
slug: "cramer"
subject: "la"
unit: "u01"
order: 6
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Linear Algebra · Mastery"
title: "Cramer's rule"
subtitle: "Writing the solution as a ratio of determinants"
minutes: 15
meta: ["15 min read","Requires cofactors · inverse matrix","Mastery level"]
concepts: ["cramer", "det", "inverse"]
prereq: ["cofactor", "inverse"]
related: ["det", "rank"]
---

## Goal

By the end of this lecture you can state Cramer's rule, classify what happens when $D=0$, and explain why nobody uses it for real computation.

## Three-line recap

- Write the system as $Ax=b$ and let $D=\det A$.
- If $D\neq 0$ the solution is unique, with $x_j = D_j/D$.
- $D_j$ is the determinant obtained by replacing column $j$ of $A$ with $b$.

## The problem

Lecture 1 handled two unknowns. For $n$ unknowns and $n$ equations, can every solution be written as one uniform formula, the way the $2\times2$ case can?

Yes, and the derivation uses exactly one property: linearity in each column.

## Intuition

Let the columns of $A$ be $a_1,\dots,a_n$. Then $Ax = x_1a_1+\cdots+x_na_n$, so a solution is a recipe for combining the columns of $A$ into $b$.

Now probe the $j$-th coefficient: replace column $j$ by $b$ and leave the others alone. Expanding the new determinant along column $j$ puts $x_1a_1+\cdots+x_na_n$ back in that slot. By column linearity the result splits into $n$ terms. Every term with $k\neq j$ has two equal columns and vanishes. Only $k=j$ survives, and its value is exactly $x_j\det A$. Hence $x_j = D_j/D$.

## Worked by hand

$$
\begin{cases} 2x_1 + x_2 = 5 \\ x_1 + 3x_2 = 10 \end{cases}
$$

$$
D = \begin{vmatrix} 2 & 1 \\ 1 & 3 \end{vmatrix} = 6-1 = 5
$$

Replace the constant column into each position in turn:

$$
D_1 = \begin{vmatrix} 5 & 1 \\ 10 & 3 \end{vmatrix} = 15-10 = 5, \qquad D_2 = \begin{vmatrix} 2 & 5 \\ 1 & 10 \end{vmatrix} = 20-5 = 15
$$

So $x_1 = 5/5 = 1$ and $x_2 = 15/5 = 3$. Substituting back: $2\times1+3=5$ and $1+3\times3=10$, both correct.

Two endings for $D=0$. In $x_1+2x_2=3$, $2x_1+4x_2=6$ the rows are proportional, so $D=0$, but the second equation is just twice the first and there are infinitely many solutions. Change the right side to $7$, giving $2x_1+4x_2=7$, and the equations contradict each other: $D=0$ with no solution.

The two endings form a test: when $D=0$, if some $D_k$ is nonzero the system has no solution; if every $D_k$ vanishes it has infinitely many.

## Three misconceptions

> [!MYTH] $D=0$ means there is no solution.
> There may be infinitely many. $D=0$ only rules out uniqueness; deciding between none and infinitely many needs the $D_j$ and the rank.

> [!MYTH] Cramer's rule is a practical solver.
> It needs $n+1$ determinants of order $n$. By definition that is $n!$ work, and even with expansion roughly $n^4$, while Gaussian elimination costs $n^3$. It also amplifies rounding error. It is a theoretical tool.

> [!MYTH] $D_j$ replaces row $j$ by the constant vector.
> It replaces **column** $j$. The $j$-th unknown corresponds to the $j$-th column, and swapping a row instead gives nonsense.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Solve $x+y=4$, $2x-y=5$ by Cramer's rule.
>
> > [!ANSWER] Show answer
> > $D=-3$, $D_1=-9$, $D_2=-3$, so $x=3$ and $y=1$. Check: $3+1=4$ and $6-1=5$.

> [!PRACTICE] 2 · Classify
> Does $x+2y=3$, $3x+6y=9$ have a unique solution?
>
> > [!ANSWER] Show answer
> > $D=6-6=0$, and the second equation is three times the first. The two are equivalent, so there are infinitely many solutions, of the form $(3-2t,\,t)$.

> [!PRACTICE] 3 · Homogeneous case
> What are the solutions of $Ax=0$ when $D\neq0$? When $D=0$?
>
> > [!ANSWER] Show answer
> > If $D\neq0$ only the zero solution exists. If $D=0$ a nonzero solution must exist, because the columns of $A$ are linearly dependent.

## Formal statement

The result, as a citable theorem.

> [!FORMAL] Formal statement
> Let $A$ be a square matrix of order $n$, $b\in\mathbb{R}^n$, and $D=\det A$. If $D\neq0$, then $Ax=b$ has the unique solution
> $$x_j = \frac{D_j}{D}, \qquad j=1,\dots,n,$$
> where $D_j$ is the determinant of the matrix obtained by replacing column $j$ of $A$ with $b$. Equivalently, $A$ is invertible with
> $$A^{-1} = \frac{1}{D}\operatorname{adj}(A), \qquad x = A^{-1}b,$$
> where $\operatorname{adj}(A)$ is the transpose of the cofactor matrix. If $D=0$, then $A$ is singular: $Ax=b$ either has no solution or has infinitely many, and the homogeneous system $Ax=0$ always has a nonzero solution.
