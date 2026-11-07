---
slug: "vecgroup-intro"
subject: "la"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Linear Algebra · Mastery"
title: "Vector sets and linear combinations"
subtitle: "What a set of vectors can build"
minutes: 13
meta: ["13 min read","Requires matrix multiplication","Mastery level"]
concepts: ["lindep", "matrix"]
prereq: ["matrix"]
related: ["lindep", "rank"]
---

## Goal

For three chapters the main character has been the matrix: determinants measure it, row operations simplify it, rank scores it. This lecture changes the camera angle. Pull the columns out of a matrix and treat them as a team of ingredients. The question is no longer what a matrix equals, but which vectors the team can produce by mixing its members in every possible proportion.

By the end you can write down any linear combination, decide whether a given vector lies in the span of a set, and explain when two vector sets deserve to be called equivalent.

## Three-line recap

- Every column of a matrix is a vector, and $Ax$ is a weighted sum of those columns.
- Solving $Ax = b$ is the same as asking whether $b$ is a linear combination of the columns of $A$.
- Elementary row operations change the columns themselves but preserve the linear relations among them.

## The problem

Take $\alpha_1 = (1, 2)$ and $\alpha_2 = (2, 4)$ in the plane. However you mix them, you stay on one line. Replace them with $\alpha_1 = (1, 2)$ and $\alpha_2 = (2, 1)$ and the whole plane opens up. Two vectors in, dramatically different reach.

The real question is sharper. Given $\alpha_1, \dots, \alpha_s$ and a target $\beta$, is $\beta$ reachable? If it is, is the recipe unique? This lecture settles reachability; uniqueness is the subject of the next one.

## Intuition

A linear combination is the plainest possible mixing rule: scale each vector, then add. No products, no squares, no other tricks.

$$
c_1 \alpha_1 + \cdots + c_s \alpha_s
$$

The coefficients $c_i$ are arbitrary real numbers. They may be negative or zero. Collect every vector obtainable this way and you have the span of the set, written $\operatorname{span}(\alpha_1, \dots, \alpha_s)$.

The geometry is easy to remember. One nonzero vector spans a line through the origin. Two non-collinear vectors span a plane through the origin. Three non-coplanar vectors span all of three-dimensional space. If two of the vectors are collinear, the second adds nothing and the span stays a line.

This gives the phrase “linearly represented by”. We say $\beta$ is a linear combination of $\alpha_1, \dots, \alpha_s$ if there are coefficients with $\beta = c_1\alpha_1 + \cdots + c_s\alpha_s$. In matrix language this is exactly the statement that $Ax = \beta$ has a solution, where the columns of $A$ are the $\alpha_i$.

Two sets that can represent each other are called equivalent. Equivalence means they span the same subspace: different ingredients, identical menu.

> [!NOTE]
> To decide whether $\beta$ is representable you only need to know whether the system is consistent. Producing the coefficients is a bonus, not a requirement.

## Worked by hand

Let $\alpha_1 = (1, 2, 1)$ and $\alpha_2 = (2, 1, -1)$, and ask whether $\beta = (4, 5, 1)$ is in their span. Write

$$
c_1 \alpha_1 + c_2 \alpha_2 = \beta
$$

and expand component by component:

$$
\begin{cases}
c_1 + 2c_2 = 4 \\
2c_1 + c_2 = 5 \\
c_1 - c_2 = 1
\end{cases}
$$

Double the first equation to get $2c_1 + 4c_2 = 8$, subtract the second to get $3c_2 = 3$, so $c_2 = 1$ and $c_1 = 2$. Check the third: $2 - 1 = 1$, correct. Therefore

$$
\beta = 2\alpha_1 + \alpha_2 = (2,4,2) + (2,1,-1) = (4,5,1)
$$

The recipe exists, and because the coefficient matrix has nonzero determinant, it is unique.

Now try $\gamma = (1, 1, 1)$. The same first two equations give $c_1 = c_2 = \tfrac13$. The third equation reads $c_1 - c_2 = 1$, but the left side is $0$. Contradiction, so $\gamma$ is not in the span. Notice what happened: the first two equations alone would have produced coefficients, but a coefficient is only valid if every equation agrees.

## Three misconceptions

> [!MYTH] Any vector can be represented by any set.
> Only vectors inside the span qualify. Two collinear vectors can never produce a point off their line.

> [!MYTH] Coefficients in a linear combination must be nonnegative.
> They can be any real numbers. A negative coefficient simply reverses a vector, which is why the span is a full line rather than a ray.

> [!MYTH] Equivalent sets must contain the same number of vectors.
> $(1,0), (0,1)$ and $(1,0), (0,1), (1,1)$ span the same plane with different list lengths. Equivalence is about the span, not the inventory.

## Practice

> [!PRACTICE] 1 · Mix directly
> With $\alpha_1 = (1,2,1)$ and $\alpha_2 = (2,1,-1)$, write $\beta = (3,3,0)$ as a linear combination.
>
> > [!ANSWER] Answer
> > By inspection $\beta = \alpha_1 + \alpha_2 = (3,3,0)$, so the coefficients are $1, 1$.

> [!PRACTICE] 2 · Decide reachability
> Let $\alpha_1 = (1,2)$, $\alpha_2 = (2,4)$, and $\beta = (3,6)$. Is $\beta$ representable? How many ways?
>
> > [!ANSWER] Answer
> > Yes. $\beta = 3\alpha_1$. Since $\alpha_2 = 2\alpha_1$, we also have $\beta = \alpha_1 + \alpha_2$, so the representation is not unique.

> [!PRACTICE] 3 · Test equivalence
> Are $(1,0), (0,1)$ and $(1,1), (1,-1)$ equivalent?
>
> > [!ANSWER] Answer
> > Yes. The second pair has determinant $-2 \neq 0$, so it is a basis of $\mathbb{R}^2$ and represents everything, including the first pair. The standard basis clearly represents the second pair too.

## Formal statement

> [!FORMAL] Formal statement
> Let $\alpha_1, \dots, \alpha_s \in \mathbb{F}^n$. A linear combination is a vector $\sum_{i=1}^s c_i \alpha_i$ with $c_i \in \mathbb{F}$; the set of all such vectors is the span $\operatorname{span}(\alpha_1, \dots, \alpha_s)$, a subspace of $\mathbb{F}^n$. A vector $\beta$ is representable by the set if and only if $Ax = \beta$ is consistent, where $A$ has the $\alpha_i$ as columns. Two sets are equivalent when each can represent the other, equivalently when their spans coincide.
