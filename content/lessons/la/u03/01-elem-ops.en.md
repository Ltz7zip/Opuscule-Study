---
slug: "elem-ops"
subject: "la"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Linear Algebra · Mastery"
title: "Elementary row operations"
subtitle: "Three moves that keep the solution set"
minutes: 16
meta: ["16 min read","Requires matrices and linear systems","Mastery level"]
concepts: ["elementary", "matrix"]
prereq: ["matrix"]
related: ["rank", "elementary"]
---

## Goal

By the end of this lecture you can name the three elementary row operations, decide whether a matrix is in row echelon or reduced row echelon form, and take a $3 \times 4$ augmented matrix all the way to reduced form and read the solution off it.

This is the section to drill. Rank, systems, eigenvalues — everything later runs on these moves.

## Three-line recap

- A system compresses into an augmented matrix $(A \mid b)$; its solution is the $x$ with $Ax = b$.
- While eliminating we already swapped rows, scaled rows, and added multiples of rows.
- Those moves only rewrote the equations; the equations themselves never changed.

## The problem

Last lecture we performed these moves without justifying them. If swapping, scaling, and adding really preserve the solution set, the entire chain is safe; if not, every earlier result has to be redone.

Worse, having moves is not enough. We need a target shape, or we never know when to stop. That shape is row echelon form, and its polished version, reduced row echelon form.

## Intuition

Think of a system as a list of constraints. Swapping two rows just reads the same two constraints in the other order. Multiplying a row by $k \neq 0$ multiplies both sides of one equation by $k$, which is still an equality. Adding $k$ times one row to another adds or subtracts two equations; the new equation follows from the old ones, and the old ones follow back, so no information is created or destroyed.

Two things must not be touched. The multiplier must be nonzero — multiplying by $0$ erases a whole row and the information is genuinely gone. And only **row** operations are allowed, never column operations, because swapping columns renumbers the unknowns and changes what the system is even asking.

The target has two grades. Row echelon form requires nonzero rows at the bottom and each leading nonzero entry (the pivot) strictly to the right of the pivot above it. Reduced row echelon form adds two demands: every pivot equals $1$, and every other entry in a pivot column is $0$. Echelon form stacks the equations into a staircase; reduced form isolates each unknown completely.

One fact is worth knowing in advance: row echelon form is not unique — different elimination orders give different staircases — but reduced row echelon form is unique. Your answer therefore cannot depend on the route you chose.

## Worked by hand

Drive last lecture's system to reduced form. Start from

$$
\left(\begin{array}{ccc|c}
1 & 2 & 1 & 8 \\
2 & -1 & 3 & 9 \\
-1 & 1 & 2 & 7
\end{array}\right)
$$

| Step | Move | Rows 2 and 3 become |
| --- | --- | --- |
| 1 | $R_2 - 2R_1$ | $(0,\ -5,\ 1 \mid -7)$ |
| 2 | $R_3 + R_1$ | $(0,\ 3,\ 3 \mid 15)$ |
| 3 | $R_3 + \frac{3}{5}R_2$ | $(0,\ 0,\ \frac{18}{5} \mid \frac{54}{5})$ |
| 4 | $R_3 \times \frac{5}{18}$ | $(0,\ 0,\ 1 \mid 3)$ |

That is row echelon form: three pivots in columns $1$, $2$, $3$, and back substitution finishes the job. Push upward to clear the rest:

| Step | Move | Result |
| --- | --- | --- |
| 5 | $R_2 \times (-\frac{1}{5})$ | $(0,\ 1,\ -\frac{1}{5} \mid \frac{7}{5})$ |
| 6 | $R_2 + \frac{1}{5}R_3$ | $(0,\ 1,\ 0 \mid 2)$ |
| 7 | $R_1 - 2R_2$ | $(1,\ 0,\ 1 \mid 4)$ |
| 8 | $R_1 - R_3$ | $(1,\ 0,\ 0 \mid 1)$ |

The reduced form is

$$
\left(\begin{array}{ccc|c}
1 & 0 & 0 & 1 \\
0 & 1 & 0 & 2 \\
0 & 0 & 1 & 3
\end{array}\right)
$$

so $x_1 = 1$, $x_2 = 2$, $x_3 = 3$ sit in the last column. None of the eight steps changed the solution set, so this is an equivalent system, not an approximation. Check one row: $2 \times 1 - 2 + 3 \times 3 = 9$, matching the original second equation.

## Three misconceptions

> [!MYTH] You may multiply a row by $0$.
> Only nonzero multipliers are reversible. Multiplying by $0$ wipes out the row, the constraint disappears, the solution set grows, and you can never get back.

> [!MYTH] Column operations are just as good for solving.
> Only row operations preserve the solution set. A column operation renames or recombines unknowns, so the answer you get belongs to a different set of variables. Column operations are fine when computing rank, which only counts independent directions; they are not fine for solving.

> [!MYTH] Row echelon form is unique, so it can be used to check answers.
> Echelon form is not unique; different elimination orders give different staircases. Reduced form is unique. Compare against that.

## Practice

> [!PRACTICE] 1 · Read the shape
> Is $\begin{pmatrix} 1 & 2 & 0 \\ 0 & 0 & 3 \\ 0 & 0 & 0 \end{pmatrix}$ in row echelon form? Reduced form?
>
> > [!ANSWER] Answer
> > It is in row echelon form: pivots in columns $1$ and $3$, moving right. It is not reduced, because the pivot $3$ is not $1$.

> [!PRACTICE] 2 · One move
> On $\left(\begin{array}{cc|c} 2 & 4 & 6 \\ 1 & 3 & 5 \end{array}\right)$, make the $(1,1)$ entry equal to $1$ in one move.
>
> > [!ANSWER] Answer
> > Multiply row 1 by $\frac{1}{2}$: $\left(\begin{array}{cc|c} 1 & 2 & 3 \\ 1 & 3 & 5 \end{array}\right)$.

> [!PRACTICE] 3 · Full run
> Reduce $\left(\begin{array}{cc|c} 1 & 1 & 3 \\ 2 & 3 & 7 \end{array}\right)$ and give the solution.
>
> > [!ANSWER] Answer
> > $R_2 - 2R_1$ gives $(0,\ 1 \mid 1)$, so $x_2 = 1$; then $R_1 - R_2$ gives $(1,\ 0 \mid 2)$, so $x_1 = 2$. The reduced form is $\left(\begin{array}{cc|c} 1 & 0 & 2 \\ 0 & 1 & 1 \end{array}\right)$ and the solution is $(2, 1)$.

## Formal statement

> [!FORMAL] Formal statement
> There are three elementary row operations: interchange rows $i$ and $j$ ($r_{ij}$); multiply row $i$ by a nonzero $k$ ($r_i(k)$, $k \neq 0$); add $k$ times row $j$ to row $i$ ($r_{ij}(k)$). Each is invertible, with an inverse of the same type, so each maps the solution set bijectively onto itself. Row echelon form requires zero rows at the bottom and strictly increasing pivot columns. Reduced row echelon form additionally requires every pivot to be $1$ with all other entries of its column equal to $0$. Every matrix has a unique reduced row echelon form.
