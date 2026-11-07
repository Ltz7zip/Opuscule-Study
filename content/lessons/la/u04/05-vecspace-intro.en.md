---
slug: "vecspace-intro"
subject: "la"
unit: "u04"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Linear Algebra · Mastery"
title: "Vector spaces"
subtitle: "Seeing all solutions as one space"
minutes: 15
meta: ["15 min read","Requires linear dependence and bases","Mastery level"]
concepts: ["vecspace", "basis"]
prereq: ["lindep", "basis"]
related: ["vecspace", "lintransform"]
---

## Goal

The first four lectures worked inside $\mathbb{R}^n$: vectors were strings of numbers, and operations were performed component by component. This lecture removes the numeric shell and keeps only two abilities, addition and scaling. What remains is the idea of a linear space. It is the doorway to chapter six and the last piece needed to see all solutions as one space.

By the end you can test closure under addition and scaling, recognise subspaces, generate a subspace from a set, and explain what basis and dimension mean in an abstract setting.

## Three-line recap

- The full solution set of a homogeneous system is a subspace through the origin, of dimension $n - r(A)$.
- The solution set of a nonhomogeneous system is a translate of that subspace, not a subspace.
- All linear combinations of a set of vectors form the subspace they span.

## The problem

The previous lecture claimed the homogeneous solution space has dimension $n - r$. But a solution is a quadruple of numbers that cannot be drawn. What does dimension mean there? Can a polynomial $1 + x + x^2$ be added to a matrix? If not, why do textbooks call both of them vectors?

The issue is that we have been using “vector” as a synonym for “string of numbers”, an unnecessarily narrow picture. What actually matters is not the appearance of the object but the operations it supports. Once a set has sensible addition and scaling, every earlier discussion of combinations, dependence, bases, and dimension carries over unchanged.

## Intuition

Let $V$ be a set with an addition between elements and a scalar multiplication by real numbers. If for all $u, v \in V$ and $k \in \mathbb{R}$,

$$
u + v \in V, \qquad k u \in V
$$

then $V$ is closed under both operations. Closure is only the entry ticket. Eight axioms must also hold: commutativity and associativity of addition, a zero element, additive inverses, associativity of scaling, the unit law, and two distributive laws. All of them are automatic in $\mathbb{R}^n$; the point of abstraction is that polynomials, matrices, and continuous functions can share the same theorems.

Three standard examples. The polynomial space $P_n$ consists of all polynomials of degree at most $n$, with ordinary polynomial addition and coefficientwise scaling. The matrix space $M_{m \times n}$ consists of all $m \times n$ matrices. The function space $C[a,b]$ consists of continuous functions on a closed interval. Their elements look nothing alike, yet all satisfy the same eight rules.

A subspace is a self-sufficient part of a linear space: it is itself a linear space under the inherited operations. Three checks suffice: it is nonempty (usually checked by locating zero), it is closed under addition, and it is closed under scaling.

All linear combinations of $\alpha_1, \dots, \alpha_s$ form a subspace called the span of the set. If we can choose $r$ independent vectors from the set that represent all the others, those $r$ vectors form a basis and $r$ is the dimension.

> [!NOTE]
> When testing a subspace, look for zero first. If zero is missing, reject immediately; closure checks are unnecessary. This is the fastest filter.

## Worked by hand

Decide whether the following subsets of $\mathbb{R}^3$ are subspaces:

$$
S_1 = \{(x,y,z) : x + y + z = 1\}, \qquad S_2 = \{(x,y,z) : x + 2y - z = 0\}
$$

Start with $S_1$. The zero vector $(0,0,0)$ gives $0 + 0 + 0 = 0 \neq 1$, so zero is not in $S_1$ and $S_1$ is not a subspace. Check closure as a second witness. Take $u = (1,0,0)$ and $v = (0,1,0)$, both in $S_1$. Then

$$
u + v = (1,1,0), \qquad 1 + 1 + 0 = 2 \neq 1
$$

so $u + v \notin S_1$. Two independent reasons, same verdict.

Now $S_2$. Zero satisfies $0 + 0 - 0 = 0$, so it is present. Take $u = (x_1, y_1, z_1)$ and $v = (x_2, y_2, z_2)$ with $x_i + 2y_i - z_i = 0$. Then

$$
(x_1 + x_2) + 2(y_1 + y_2) - (z_1 + z_2) = (x_1 + 2y_1 - z_1) + (x_2 + 2y_2 - z_2) = 0
$$

so $u + v \in S_2$. For any $k$,

$$
kx_1 + 2ky_1 - kz_1 = k(x_1 + 2y_1 - z_1) = 0
$$

so $ku \in S_2$. All three checks pass, and $S_2$ is a subspace.

Put in numbers: $u = (1,0,1)$ and $v = (0,1,2)$ both lie in $S_2$, since $1 + 0 - 1 = 0$ and $0 + 2 - 2 = 0$. Their sum $(1,1,3)$ satisfies $1 + 2 - 3 = 0$, and $3u = (3,0,3)$ satisfies $3 + 0 - 3 = 0$.

$S_2$ is a plane. The equation $z = x + 2y$ gives $(x, y, x + 2y) = x(1,0,1) + y(0,1,2)$, so $\{(1,0,1), (0,1,2)\}$ is a basis and the dimension is $2$.

## Three misconceptions

> [!MYTH] Closure under addition is enough for a subspace.
> Scaling must also hold. The integers are closed under addition, but multiplying by $\tfrac12$ leaves the set, so they are not a subspace of the reals.

> [!MYTH] Subspaces are always lines or planes.
> Lines and planes are the easiest to draw, but $\{0\}$, the whole space, and higher-dimensional slices are subspaces too. Dimensions range from $0$ to $n$.

> [!MYTH] The solution set of any system is a subspace.
> Only for homogeneous systems. A nonhomogeneous solution set misses zero and fails closure; it is merely a translate.

## Practice

> [!PRACTICE] 1 · Zero test
> Is $S = \{(x,y) : x^2 + y^2 \le 1\}$ a subspace of $\mathbb{R}^2$?
>
> > [!ANSWER] Answer
> > No. Zero is present, but $(1,0)$ and $(0,1)$ both lie in the unit disk while their sum $(1,1)$ has length $\sqrt2 > 1$, so addition leaves the set.

> [!PRACTICE] 2 · Test closure
> Is $S = \{(x, 2x) : x \in \mathbb{R}\}$ a subspace of $\mathbb{R}^2$? What is its dimension?
>
> > [!ANSWER] Answer
> > Yes. $(x_1,2x_1) + (x_2,2x_2) = (x_1+x_2, 2(x_1+x_2))$ and $k(x,2x) = (kx,2kx)$ stay in $S$. It is a line through the origin, of dimension $1$, with basis $(1,2)$.

> [!PRACTICE] 3 · Span a subspace
> For $\alpha_1 = (1,0,1)$ and $\alpha_2 = (0,1,2)$, what is $\operatorname{span}(\alpha_1,\alpha_2)$?
>
> > [!ANSWER] Answer
> > The plane $x + 2y - z = 0$. A combination $c_1\alpha_1 + c_2\alpha_2 = (c_1, c_2, c_1 + 2c_2)$ always satisfies the equation, and the two vectors are independent, so the dimension is $2$.

## Formal statement

> [!FORMAL] Formal statement
> A nonempty set $V$ with addition and scalar multiplication over a field $\mathbb{F}$ satisfying the eight axioms is a linear space. A subset $W \subseteq V$ is a subspace if $0 \in W$ and for all $u, v \in W$, $k \in \mathbb{F}$, both $u + v \in W$ and $ku \in W$. For $\alpha_1, \dots, \alpha_s \in V$, their linear combinations form the subspace $\operatorname{span}(\alpha_1, \dots, \alpha_s)$; the size of a maximal independent subset is its dimension, and that subset is a basis.
