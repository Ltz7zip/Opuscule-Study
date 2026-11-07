---
slug: "solve"
subject: "la"
unit: "u03"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Solving linear systems"
subtitle: "Rank tells you whether and how many"
minutes: 16
meta: ["16 min read","Requires rank and row operations","Mastery level"]
concepts: ["rank", "elementary"]
prereq: ["rank", "elementary"]
related: ["vecgroup", "matrix"]
---

## Goal

By the end of this lecture you can decide between no solution, a unique solution, and infinitely many by computing two ranks, run a full case analysis on a system with a parameter, and tell when a homogeneous system has a nonzero solution.

The previous three lectures assembled the tools: augmented matrices, row operations, rank. This one fuses them into a single test.

## Three-line recap

- Elementary row operations preserve the solution set and reach reduced row echelon form.
- Rank counts the nonzero rows of an echelon form, measuring independent directions.
- A square matrix has full rank exactly when its determinant is nonzero.

## The problem

The first question about a system is usually not "what is the solution" but "is there one at all". Real data carry noise, equations outnumber unknowns, and often no solution exists; sometimes the opposite happens and solutions are plentiful.

If every case required reducing to the end, the cost would be wasteful. We want a test that reads two numbers and settles it.

## Intuition

Treat $b$ as one more column. The system $Ax = b$ asks whether $b$ can be written as a combination of the columns of $A$. If it can, appending $b$ adds no new independent direction and the rank is unchanged; if it cannot, $b$ contributes a new direction and the rank goes up by one. The test is one line:

$$
r(A) = r(A \mid b)
$$

Equal means solvable, unequal means not. This single condition covers every case.

Once solvable, count the solutions. Reduce to reduced row echelon form. Pivot columns correspond to basic variables, the rest are free. Each free column gives a free variable that may take any value. The count of free variables is $n - r$: unknowns minus independent constraints.

So there are exactly three outcomes: $r(A) < r(A \mid b)$, no solution; $r(A) = r(A \mid b) = n$, a unique solution with no free variable; $r(A) = r(A \mid b) < n$, infinitely many, parameterised by $n - r$ free variables.

The homogeneous system $Ax = 0$ is the special case. It always has the zero solution, so the only question is whether a nonzero one exists, and the test is $r(A) < n$. For a square matrix this is the same as $|A| = 0$.

## Worked by hand

Discuss the system with parameter $\lambda$:

$$
\begin{cases}
\lambda x_1 + x_2 + x_3 = 1 \\
x_1 + \lambda x_2 + x_3 = 1 \\
x_1 + x_2 + \lambda x_3 = 1
\end{cases}
$$

The determinant of the coefficient matrix is

$$
|A| = \begin{vmatrix} \lambda & 1 & 1 \\ 1 & \lambda & 1 \\ 1 & 1 & \lambda \end{vmatrix} = (\lambda - 1)^2(\lambda + 2)
$$

**Case one: $\lambda \neq 1$ and $\lambda \neq -2$.** The determinant is nonzero, $r(A) = 3 = n$, so the solution is unique. Check with $\lambda = 0$: the system becomes $x_2 + x_3 = 1$, $x_1 + x_3 = 1$, $x_1 + x_2 = 1$. Adding all three gives $2(x_1 + x_2 + x_3) = 3$, hence $x_1 = x_2 = x_3 = 0.5$, and $0 + 0.5 + 0.5 = 1$ confirms the first equation.

**Case two: $\lambda = 1$.** All three rows coincide as $x_1 + x_2 + x_3 = 1$, so $r(A) = r(A \mid b) = 1 < 3$. Two free variables, and

$$
x = \begin{pmatrix} 1 - s - t \\ s \\ t \end{pmatrix}, \qquad s, t \in \mathbb{R}
$$

**Case three: $\lambda = -2$.** Adding the three rows turns the left side into $(-2+1+1)(x_1 + x_2 + x_3) = 0$ and the right side into $1 + 1 + 1 = 3$, giving $0 = 3$, a contradiction. In rank language, $r(A) = 2$ because the third row is minus the sum of the first two, while $r(A \mid b) = 3$: the extra column brought a new direction.

The three cases split exactly at the roots of $|A| = 0$. That also shows why the determinant alone cannot classify a system: when it vanishes, you still have to go back and count ranks.

## Three misconceptions

> [!MYTH] If $r(A) = n$ the solution is unique.
> Only if a solution exists. For a $3 \times 4$ matrix, $n = 4$ while $r(A) \le 3$, so the condition can never hold. You need a square, full rank, solvable system.

> [!MYTH] Infinitely many solutions means the answer cannot be written.
> It can be written completely: particular solution plus general homogeneous solution, or $n - r$ free parameters. It is a line or a plane, described exactly.

> [!MYTH] A homogeneous system only has the zero solution.
> Only when $r(A) = n$. If $r(A) < n$ a nonzero solution always exists, and the solution set is a subspace of dimension $n - r$.

## Practice

> [!PRACTICE] 1 · Two ranks
> A system has $4$ unknowns and $r(A) = r(A \mid b) = 2$. How many solutions?
>
> > [!ANSWER] Answer
> > Infinitely many: $4 - 2 = 2$ free variables, so the solution set is two-dimensional.

> [!PRACTICE] 2 · Spot inconsistency
> With $A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$ and $b = \begin{pmatrix} 1 \\ 3 \end{pmatrix}$, is the system solvable?
>
> > [!ANSWER] Answer
> > No. $r(A) = 1$ but $r(A \mid b) = 2$: row 2, $(2, 4 \mid 3)$, is not twice row 1, $(2, 4 \mid 2)$.

> [!PRACTICE] 3 · Homogeneous
> A $3 \times 3$ homogeneous system has $|A| = 0$ and $r(A) = 2$. Describe its solution set.
>
> > [!ANSWER] Answer
> > A one-dimensional subspace: every solution is $kv$ for some fixed nonzero $v$ and $k \in \mathbb{R}$, since there is $3 - 2 = 1$ free variable.

## Formal statement

> [!FORMAL] Formal statement
> Let $A \in \mathbb{R}^{m \times n}$ and $b \in \mathbb{R}^{m}$. The system $Ax = b$ is consistent if and only if $r(A) = r(A \mid b)$. If consistent with common rank $r$, the solution set is an affine subspace of $\mathbb{R}^n$ of dimension $n - r$: unique when $r = n$, infinite when $r < n$. The homogeneous system $Ax = 0$ always has the zero solution, and has a nonzero solution if and only if $r(A) < n$; its solution set is the subspace of dimension $n - r(A)$ called the null space of $A$.
