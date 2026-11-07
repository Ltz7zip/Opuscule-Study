---
slug: "vecgroup-rank"
subject: "la"
unit: "u04"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "Rank of a vector set"
subtitle: "Quantifying dependence with rank"
minutes: 14
meta: ["14 min read","Requires linear dependence and rank","Mastery level"]
concepts: ["vecgroup", "rank"]
prereq: ["lindep", "rank"]
related: ["vecspace", "lindep"]
---

## Goal

The previous lecture offered only two labels: dependent or independent. Real sets often sit in between. Part of the set is independent, and adding anything more creates redundancy. This lecture turns “how many independent vectors can we keep” into a single number, the rank of the set.

By the end you can extract a maximal independent subset, compute its size, and explain why the rank of a vector set is literally the rank of a matrix.

## Three-line recap

- Dependence means zero has a nontrivial recipe, equivalently some vector is redundant.
- Every subset of an independent set is independent; every superset of a dependent set is dependent.
- Independence is equivalent to the rank of the column matrix equalling the number of vectors.

## The problem

Four vectors in three-dimensional space may span a line, a plane, or the whole space. Counting them tells you nothing, because several may point in the same direction.

We need two moves: choose a lean but sufficient sublist, then use its size to measure the whole set. The sublist must be independent and must become dependent as soon as any remaining vector is added. Such a sublist is called a maximal linearly independent subset.

## Intuition

“Maximal” does not mean “largest possible count”; it means “cannot be enlarged”. An independent sublist that can still absorb another vector from the original set is not maximal. Keep adding until no more can be added.

Maximal independent subsets are not unique. In a plane, any two non-collinear vectors form one. But their size is unique, and that size is the rank of the set, written $r(\alpha_1, \dots, \alpha_s)$.

Arrange the vectors as columns of a matrix $A$. Then

$$
r(\alpha_1, \dots, \alpha_s) = r(A)
$$

The reason is direct: a maximal independent subset is exactly a maximal independent set of columns, and the rank of a matrix is the largest number of independent columns. The theorem that row rank equals column rank guarantees that row reduction answers the question.

Useful facts:

- The rank never exceeds the number of vectors or the dimension of the ambient space.
- Equivalent sets have equal rank. Equal rank alone does not imply equivalence; the spans must also agree.
- If set $B$ is representable by set $A$, then $r(B) \le r(A)$.

> [!NOTE]
> To find a maximal independent subset, put the vectors as columns and row reduce. The original columns sitting above the pivots form such a subset. Use the original vectors, not the reduced columns.

## Worked by hand

Take four vectors in three-dimensional space:

$$
\alpha_1 = (1,1,0), \quad \alpha_2 = (0,1,1), \quad \alpha_3 = (1,2,1), \quad \alpha_4 = (1,0,-1)
$$

Form the column matrix and eliminate:

$$
\begin{pmatrix}
1 & 0 & 1 & 1 \\
1 & 1 & 2 & 0 \\
0 & 1 & 1 & -1
\end{pmatrix}
\xrightarrow{r_2 - r_1}
\begin{pmatrix}
1 & 0 & 1 & 1 \\
0 & 1 & 1 & -1 \\
0 & 1 & 1 & -1
\end{pmatrix}
\xrightarrow{r_3 - r_2}
\begin{pmatrix}
1 & 0 & 1 & 1 \\
0 & 1 & 1 & -1 \\
0 & 0 & 0 & 0
\end{pmatrix}
$$

Two nonzero rows, so $r(A) = 2$ and the rank of the set is $2$. The pivots lie in columns $1$ and $2$, so $\alpha_1, \alpha_2$ form a maximal independent subset.

They are independent because they are not proportional. Now express the rest. For $\alpha_3 = c_1\alpha_1 + c_2\alpha_2$, compare components: $c_1 = 1$ from the first, $c_1 + c_2 = 2$ from the second gives $c_2 = 1$, and the third reads $c_2 = 1$. All agree, so

$$
\alpha_3 = \alpha_1 + \alpha_2 = (1,2,1)
$$

For $\alpha_4$: $c_1 = 1$, then $c_1 + c_2 = 0$ gives $c_2 = -1$, and the third component confirms $c_2 = -1$. Thus

$$
\alpha_4 = \alpha_1 - \alpha_2 = (1,0,-1)
$$

Since both remaining vectors are built from $\alpha_1, \alpha_2$, the whole set is equivalent to that pair and has rank $2$. This also shows maximal subsets are not unique: $\{\alpha_1, \alpha_4\}$ is independent too, and $\alpha_2 = \alpha_1 - \alpha_4$, $\alpha_3 = 2\alpha_1 - \alpha_4$, so it is another maximal independent subset.

## Three misconceptions

> [!MYTH] The maximal independent subset is unique.
> It is not. Above, both $\{\alpha_1, \alpha_2\}$ and $\{\alpha_1, \alpha_4\}$ are maximal. What is unique is the size.

> [!MYTH] The rank of a vector set equals the number of vectors.
> Only when the set is independent. In general the rank is the size of a maximal independent subset and may be much smaller.

> [!MYTH] Rank belongs only to matrices, not to vector sets.
> The rank of a vector set is the rank of the matrix formed by using those vectors as columns. Two descriptions of one quantity.

## Practice

> [!PRACTICE] 1 · Rank and a maximal subset
> Find the rank of $\alpha_1 = (1,0)$, $\alpha_2 = (0,1)$, $\alpha_3 = (1,1)$, $\alpha_4 = (2,3)$, and give a maximal independent subset.
>
> > [!ANSWER] Answer
> > The rank is $2$, with $\{\alpha_1, \alpha_2\}$ maximal. Indeed $\alpha_3 = \alpha_1 + \alpha_2$ and $\alpha_4 = 2\alpha_1 + 3\alpha_2$.

> [!PRACTICE] 2 · Rank three in three dimensions
> Produce four vectors in $\mathbb{R}^3$ whose rank is $3$.
>
> > [!ANSWER] Answer
> > For instance $(1,0,0), (0,1,0), (0,0,1), (1,1,1)$. The first three already span $\mathbb{R}^3$, and the fourth adds no new dimension.

> [!PRACTICE] 3 · Equivalence and rank
> Can a set of rank $2$ be equivalent to a set of rank $3$?
>
> > [!ANSWER] Answer
> > No. Equivalent sets span the same subspace, so their dimensions, hence their ranks, must agree.

## Formal statement

> [!FORMAL] Formal statement
> Let $S = \{\alpha_1, \dots, \alpha_s\}$. A sublist of $S$ is a maximal linearly independent subset if it is independent and adding any remaining vector of $S$ makes it dependent. The number of vectors in such a subset is the rank $r(S)$, equal to the rank of the matrix whose columns are the $\alpha_i$. Maximal subsets need not be unique, but their size is. Equivalent sets have equal rank, and if $B$ is representable by $A$, then $r(B) \le r(A)$.
