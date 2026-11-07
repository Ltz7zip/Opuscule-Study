---
slug: "solution-structure"
subject: "la"
unit: "u04"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Structure of solution sets"
subtitle: "Fundamental systems and general solutions"
minutes: 15
meta: ["15 min read","Requires matrix rank","Mastery level"]
concepts: ["rank", "lindep"]
prereq: ["rank", "lindep"]
related: ["vecspace", "vecgroup"]
---

## Goal

Chapter three taught you to solve systems: eliminate, then decide whether a solution exists. This lecture goes further. It describes the shape of the entire solution set. Solutions of a homogeneous system form a vector space; solutions of a nonhomogeneous system form a translate of that space.

By the end you can produce a fundamental system of solutions, predict the dimension $n - r(A)$, and write a general solution as a particular solution plus the homogeneous one.

## Three-line recap

- A system is consistent exactly when the augmented matrix and the coefficient matrix have equal rank.
- If consistent and $r(A) = n$, the solution is unique; if $r(A) < n$, there are infinitely many.
- The homogeneous system $Ax = 0$ always has the zero solution; nonzero solutions depend on the rank.

## The problem

A $3 \times 4$ homogeneous system usually has infinitely many solutions. “Infinitely many” is not an answer, though. We want a finite instruction manual that generates every solution.

So: can we find finitely many solutions such that every other solution is a linear combination of them? If so, what is the smallest number needed, and how do we compute them?

## Intuition

Start with the homogeneous case $Ax = 0$. If $x$ and $y$ are solutions, then

$$
A(x + y) = Ax + Ay = 0, \qquad A(cx) = cAx = 0
$$

The solution set is closed under addition and scaling, hence a subspace, called the null space. It always contains zero, so it passes through the origin.

Its dimension is controlled by rank. Let $A$ be $m \times n$. There are $n$ unknowns, but $r$ independent equations pin down $r$ of them, leaving $n - r$ free. Thus

$$
\dim \ker A = n - r(A)
$$

Give each free variable the value $1$ once and $0$ otherwise. The resulting $n - r$ solutions are independent and form a basis of the null space, called a fundamental system of solutions. Every homogeneous solution is a linear combination of them.

The nonhomogeneous system $Ax = b$ is different. Its solution set does not contain zero and is not a subspace. But choose any particular solution $\eta^*$. The difference of two solutions satisfies the homogeneous system:

$$
A(\eta_1 - \eta_2) = b - b = 0
$$

Therefore every solution has the form

$$
x = \eta^* + c_1 \xi_1 + \cdots + c_{n-r} \xi_{n-r}
$$

with $\xi_i$ a fundamental system. In one sentence: general solution = one particular solution + the homogeneous general solution. Geometrically, the null space is translated away from the origin.

> [!NOTE]
> A fundamental system is not unique, but its size is: always $n - r(A)$. Choosing different free variables gives a different basis of the same null space.

## Worked by hand

Solve the homogeneous system

$$
\begin{cases}
x_1 + x_2 + x_3 + x_4 = 0 \\
x_1 + 2x_2 + 3x_3 + 4x_4 = 0 \\
2x_1 + 3x_2 + 4x_3 + 5x_4 = 0
\end{cases}
$$

The coefficient matrix is

$$
A = \begin{pmatrix}
1 & 1 & 1 & 1 \\
1 & 2 & 3 & 4 \\
2 & 3 & 4 & 5
\end{pmatrix}
$$

The third row is the sum of the first two, so $r(A) = 2$ and the null space has dimension $4 - 2 = 2$.

Subtract the first row from the second: $x_2 + 2x_3 + 3x_4 = 0$, hence

$$
x_2 = -2x_3 - 3x_4
$$

Substitute into the first equation:

$$
x_1 = -x_2 - x_3 - x_4 = (2x_3 + 3x_4) - x_3 - x_4 = x_3 + 2x_4
$$

Take $x_3, x_4$ as free variables. Setting $x_3 = 1, x_4 = 0$ gives $\xi_1 = (1, -2, 1, 0)$. Setting $x_3 = 0, x_4 = 1$ gives $\xi_2 = (2, -3, 0, 1)$. Check $\xi_1$: $1 - 2 + 1 = 0$ and $1 - 4 + 3 = 0$. Check $\xi_2$: $2 - 3 + 1 = 0$ and $2 - 6 + 4 = 0$. Both work.

The homogeneous general solution is

$$
x = c_1 \xi_1 + c_2 \xi_2, \qquad c_1, c_2 \in \mathbb{R}
$$

Now change the right side to $b = (1, 0, 1)^T$. Set $x_3 = x_4 = 0$. The equations become $x_1 + x_2 = 1$ and $x_1 + 2x_2 = 0$, giving $x_2 = -1$ and $x_1 = 2$. Check the third row: $2 \cdot 2 - 3 = 1$. So $\eta^* = (2, -1, 0, 0)$ is a particular solution, and the general solution is

$$
x = (2, -1, 0, 0) + c_1(1, -2, 1, 0) + c_2(2, -3, 0, 1)
$$

## Three misconceptions

> [!MYTH] Every homogeneous system has nonzero solutions.
> Only when $r(A) < n$. If $r(A) = n$, the only solution is zero.

> [!MYTH] The fundamental system of solutions is unique.
> It is not. Different choices of free variables produce different bases, all spanning the same null space with the same number $n - r(A)$ of vectors.

> [!MYTH] The solution set of a nonhomogeneous system is a vector space.
> Not when $b \neq 0$. It does not contain zero and is not closed under addition. It is a translate of the null space, an affine subspace.

## Practice

> [!PRACTICE] 1 · Count dimensions
> A $3 \times 5$ matrix has rank $3$. What is the dimension of its null space?
>
> > [!ANSWER] Answer
> > $5 - 3 = 2$. A fundamental system contains two vectors.

> [!PRACTICE] 2 · Build a fundamental system
> Solve $x_1 + 2x_2 + x_3 = 0$ and give a fundamental system.
>
> > [!ANSWER] Answer
> > Here $r(A) = 1$ and $n = 3$, so the null space is two-dimensional. With $x_2, x_3$ free, $x_1 = -2x_2 - x_3$, giving $(-2, 1, 0)$ and $(-1, 0, 1)$.

> [!PRACTICE] 3 · Particular plus homogeneous
> If $Ax = b$ has solutions $(1,2)$ and $(3,5)$, find a nonzero solution of the homogeneous system.
>
> > [!ANSWER] Answer
> > Their difference $(2,3)$ satisfies $A(2,3) = b - b = 0$, so it is a nonzero homogeneous solution.

## Formal statement

> [!FORMAL] Formal statement
> Let $A \in \mathbb{F}^{m \times n}$ with $r = r(A)$. The solution set $N(A)$ of $Ax = 0$ is a subspace of $\mathbb{F}^n$ of dimension $n - r$; any basis of it is called a fundamental system of solutions. If $b \in \mathbb{F}^m$ and $Ax = b$ is consistent, then for any particular solution $\eta^*$ the full solution set is $\eta^* + N(A)$. When $r = n$ the solution is unique; when $r < n$ there are infinitely many.
