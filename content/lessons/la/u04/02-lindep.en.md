---
slug: "lindep"
subject: "la"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Linear dependence"
subtitle: "Is any vector redundant"
minutes: 14
meta: ["14 min read","Requires linear combinations","Mastery level"]
concepts: ["lindep", "vecgroup"]
prereq: ["matrix"]
related: ["rank", "vecgroup"]
---

## Goal

The previous lecture asked whether a target can be built. This one asks whether the recipe is unique. The dividing line between the two questions is linear dependence: the algebraic translation of the sentence “one of these vectors is redundant”.

By the end you can test a set against the definition, use several immediate shortcuts, and exhibit a nontrivial relation with concrete numbers.

## Three-line recap

- A linear combination mixes vectors with coefficients; the span collects every possible result.
- A representable vector may have one recipe or infinitely many.
- Non-uniqueness happens exactly when the set contains a direction you get for free.

## The problem

Three vectors in three-dimensional space either lie in one plane or they do not. If they do, one of them can be built from the other two and is redundant. If they do not, the three directions are genuinely distinct and none can replace another.

“Redundant” is obvious to the eye in three dimensions. In four or five dimensions, or in a space of polynomials or matrices, the eye is useless. We need a test that looks only at coefficients: put the vectors as columns of $A$ and ask whether $Ax = 0$ has a nonzero solution.

## Intuition

Suppose one vector can be built from the rest, say $\alpha_3 = 2\alpha_1 - \alpha_2$. Move everything to one side:

$$
2\alpha_1 - \alpha_2 - \alpha_3 = 0
$$

That is a mix with coefficients not all zero which nevertheless returns to the origin. Conversely, any such free return to the origin can be solved for one term, exposing it as redundant. Hence the definition:

A set is linearly dependent if there are coefficients $c_1, \dots, c_s$, not all zero, with $c_1\alpha_1 + \cdots + c_s\alpha_s = 0$. It is linearly independent if the only way to produce the zero vector is to take every coefficient zero.

The definition turns “redundant” into “zero has a nontrivial recipe”. Zero always has the trivial recipe; independence says there is no other.

Useful consequences follow at once:

- Any set containing the zero vector is dependent: give zero the coefficient $1$ and everything else $0$.
- In an $n$-dimensional space, any $n+1$ vectors are dependent.
- Two vectors are dependent exactly when one is a scalar multiple of the other.
- Every subset of an independent set is independent; every superset of a dependent set is dependent.

Rank gives the fastest test. Put the vectors as columns of $A$. The set is independent exactly when $r(A)$ equals the number of vectors. If the rank is smaller, some column is a combination of the others.

> [!NOTE]
> “Dependent” is not an insult. It only says the set carries repeated information, so its span has dimension below the number of vectors.

## Worked by hand

Take

$$
\alpha_1 = (1,1,1), \quad \alpha_2 = (1,2,3), \quad \alpha_3 = (2,3,4)
$$

and set $c_1\alpha_1 + c_2\alpha_2 + c_3\alpha_3 = 0$. Component by component:

$$
\begin{cases}
c_1 + c_2 + 2c_3 = 0 \\
c_1 + 2c_2 + 3c_3 = 0 \\
c_1 + 3c_2 + 4c_3 = 0
\end{cases}
$$

Subtract the first from the second to get $c_2 + c_3 = 0$. Subtract the second from the third and the same condition appears. So $c_2 = -c_3$, and substituting into the first,

$$
c_1 - c_3 + 2c_3 = 0 \quad\Longrightarrow\quad c_1 = -c_3
$$

Choose $c_3 = 1$. Then $c_1 = -1$ and $c_2 = -1$. Check:

$$
-\alpha_1 - \alpha_2 + \alpha_3 = -(1,1,1) - (1,2,3) + (2,3,4) = (0,0,0)
$$

The coefficients $(-1,-1,1)$ are not all zero, so the set is dependent. Rearranging also shows $\alpha_3 = \alpha_1 + \alpha_2$: the third vector is indeed redundant.

Confirm with rank. The determinant of the matrix with these columns is

$$
1(2 \cdot 4 - 3 \cdot 3) - 1(1 \cdot 4 - 3 \cdot 1) + 2(1 \cdot 3 - 2 \cdot 1) = -1 - 1 + 2 = 0
$$

while the upper-left $2 \times 2$ minor equals $1 \cdot 2 - 1 \cdot 1 = 1 \neq 0$. Hence $r(A) = 2 < 3$, matching dependence.

## Three misconceptions

> [!MYTH] Dependence means one vector is a multiple of another.
> That holds only for two vectors. Three vectors can be pairwise non-proportional and still dependent, for example $(1,0), (0,1), (1,1)$.

> [!MYTH] Every subset of a dependent set is dependent.
> Counterexample: $(1,0), (0,1), (1,1)$ is dependent, but its first two vectors are independent. Dependence belongs to the whole set; removing the redundant vector can cure it.

> [!MYTH] A set containing the zero vector can still be independent.
> Impossible. Give zero coefficient $1$ and all others $0$, and you have a nontrivial combination equal to zero.

## Practice

> [!PRACTICE] 1 · Find a relation
> Are $\alpha_1 = (1,0,0)$, $\alpha_2 = (0,1,0)$, $\alpha_3 = (1,1,0)$ dependent? Exhibit a relation.
>
> > [!ANSWER] Answer
> > Dependent, since $\alpha_1 + \alpha_2 - \alpha_3 = 0$. All three lie in the $xy$-plane, so the rank is $2$, below the number of vectors.

> [!PRACTICE] 2 · Count the vectors
> Are any four vectors in $\mathbb{R}^3$ necessarily dependent? Why?
>
> > [!ANSWER] Answer
> > Yes. As columns they form a $3 \times 4$ matrix whose rank is at most $3$, less than the four columns.

> [!PRACTICE] 3 · With a parameter
> Let $\alpha_1 = (1,1,0)$, $\alpha_2 = (1,a,1)$, $\alpha_3 = (0,1,1)$. For which $a$ are they dependent?
>
> > [!ANSWER] Answer
> > The determinant with these columns is $(a-1)-1 = a-2$. At $a = 2$ it vanishes and the set is dependent; otherwise it is independent.

## Formal statement

> [!FORMAL] Formal statement
> Let $\alpha_1, \dots, \alpha_s \in \mathbb{F}^n$ and $A = (\alpha_1, \dots, \alpha_s)$. The set is linearly dependent if some coefficients $c_1, \dots, c_s$, not all zero, satisfy $\sum c_i \alpha_i = 0$; otherwise it is linearly independent. Equivalently, independence means $Ax = 0$ has only the trivial solution, which holds exactly when $r(A) = s$. Any set containing zero is dependent; any $s > n$ vectors in $\mathbb{F}^n$ are dependent; every nonempty subset of an independent set is independent.
