---
slug: "rank"
subject: "la"
unit: "u03"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "Rank of a matrix"
subtitle: "How much information a matrix really carries"
minutes: 14
meta: ["14 min read","Requires row operations and determinants","Mastery level"]
concepts: ["rank", "elementary"]
prereq: ["elementary"]
related: ["vecgroup", "lindep"]
---

## Goal

By the end of this lecture you can compute rank two ways — count the nonzero rows of an echelon form, or find the largest nonvanishing minor — state how rank relates to the determinant, and use the standard inequalities to bound the rank of sums and products.

Rank is the spine of this chapter. One number answers the whole question of whether a matrix lost information.

## Three-line recap

- Elementary row operations preserve the solution set and reach an echelon form.
- Reduced row echelon form is unique, so it is a trustworthy normal form.
- When elimination stops, the number of surviving nonzero rows is an invariant.

## The problem

Two $3 \times 3$ matrices can both have zero determinant, yet be degenerate in different degrees: one flattens the plane onto a line, another crushes all of space to a point. The determinant says only "zero", never "how zero".

And what about non-square matrices? A $2 \times 5$ matrix has no determinant at all, yet its rows may plainly repeat or combine. We still need a number that says how many independent directions it has.

## Intuition

Rank is the number of independent directions. Treat each row as a vector. How many of them can you pick so that none is a combination of the others? That maximum count is the row rank. Doing the same with columns gives the column rank, and a theorem guarantees the two agree — so we speak simply of the rank, $r(A)$.

Three procedures give the same number and can check one another:

- reduce to echelon form and count nonzero rows;
- find the largest nonvanishing minor, whose order is the rank;
- count the pivots.

The compression picture is the clearest. $A$ maps $\mathbb{R}^n \to \mathbb{R}^m$, and its rank is the dimension of the image. Full rank means nothing was lost and an inverse exists; every drop in rank flattens one more direction and merges one more family of solutions.

The relation to determinants is therefore a single sentence: for an $n \times n$ matrix, $r(A) = n \iff |A| \neq 0$, and such a matrix is called nonsingular. When $|A| = 0$ we know only $r(A) < n$; the exact value comes from the minors.

A few inequalities deserve memorising: $0 \le r(A) \le \min(m, n)$; $r(A^{\mathsf{T}}) = r(A)$; $r(AB) \le \min\{r(A), r(B)\}$; $r(A + B) \le r(A) + r(B)$. The first caps the rank, the second says rows and columns are equals, and the third says multiplication can only lose information, never manufacture independence.

## Worked by hand

Find the rank of $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 7 \\ 3 & 6 & 11 \end{pmatrix}$.

Eliminate. $R_2 - 2R_1 = (0,\ 0,\ 1)$ and $R_3 - 3R_1 = (0,\ 0,\ 2)$:

$$
\begin{pmatrix}
1 & 2 & 3 \\
0 & 0 & 1 \\
0 & 0 & 2
\end{pmatrix}
\xrightarrow{r_{32}(-2)}
\begin{pmatrix}
1 & 2 & 3 \\
0 & 0 & 1 \\
0 & 0 & 0
\end{pmatrix}
$$

Two nonzero rows, so $r(A) = 2$.

Confirm with minors. There is only one $3 \times 3$ minor, namely $|A|$:

$$
|A| = 1(4 \times 11 - 7 \times 6) - 2(2 \times 11 - 7 \times 3) + 3(2 \times 6 - 4 \times 3) = 2 - 2 + 0 = 0
$$

so the rank is below $3$. Now find a nonzero $2 \times 2$ minor: rows $1$ and $2$, columns $2$ and $3$,

$$
\begin{vmatrix} 2 & 3 \\ 4 & 7 \end{vmatrix} = 14 - 12 = 2 \neq 0
$$

Hence $r(A) \ge 2$, and together with the previous step $r(A) = 2$. Both routes agree.

What it means: row 3 is $(3, 6, 11) = (1+2,\ 2+4,\ 3+7)$, exactly row 1 plus row 2. The three rows span only two dimensions, so the rank falls one short of $3$.

## Three misconceptions

> [!MYTH] Rank is the number of nonzero entries.
> Unrelated. $\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ has four nonzero entries and rank $1$.

> [!MYTH] Only square matrices have a rank.
> Every $m \times n$ matrix has a rank, never exceeding $\min(m, n)$. Rank is precisely the language for non-square matrices.

> [!MYTH] $r(AB) = r(A) \cdot r(B)$.
> Multiplication only shrinks or preserves rank. Take $A = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ and $B = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$: both have rank $1$, but $AB$ is the zero matrix, of rank $0$, not $1$.

## Practice

> [!PRACTICE] 1 · See it immediately
> What is the rank of $A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 0 & 1 & 1 \end{pmatrix}$?
>
> > [!ANSWER] Answer
> > Row 2 is twice row 1, so the echelon form keeps two nonzero rows: $r(A) = 2$. Rows 1 and 3 are not proportional, so the rank is not $1$.

> [!PRACTICE] 2 · With a parameter
> For $A = \begin{pmatrix} 1 & 1 \\ 1 & a \end{pmatrix}$, when is the rank $1$?
>
> > [!ANSWER] Answer
> > $|A| = a - 1$. At $a = 1$ the rows coincide and the rank is $1$; for $a \neq 1$ the rank is $2$.

> [!PRACTICE] 3 · Use the bounds
> Let $A$ be $3 \times 5$ with $r(A) = 3$ and $B$ be $5 \times 4$ with $r(B) = 2$. What is the largest possible $r(AB)$?
>
> > [!ANSWER] Answer
> > At most $\min\{3, 2\} = 2$. It could be smaller; the data do not determine a lower bound.

## Formal statement

> [!FORMAL] Formal statement
> A $k$-th order minor of $A$ is the determinant of the $k \times k$ submatrix formed by choosing $k$ rows and $k$ columns, keeping their order. If the largest order of a nonvanishing minor is $r$, then $r(A) = r$; the zero matrix has rank $0$. Equivalently, $r(A)$ equals the number of nonzero rows in any row echelon form, and equals both the row rank and the column rank. For an $n \times n$ matrix, $r(A) = n \iff |A| \neq 0$. For $A$ of size $m \times n$: $0 \le r(A) \le \min(m, n)$, $r(A^{\mathsf{T}}) = r(A)$, $r(AB) \le \min\{r(A), r(B)\}$, and $r(A+B) \le r(A) + r(B)$.
