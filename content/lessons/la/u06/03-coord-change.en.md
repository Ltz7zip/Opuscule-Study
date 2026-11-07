---
slug: "coord-change"
subject: "la"
unit: "u06"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "Change of basis"
subtitle: "New ruler, new coordinates"
minutes: 14
meta: ["14 min read","Requires bases and coordinates","Mastery level"]
concepts: ["coordchange", "basis"]
prereq: ["basis", "matrix"]
related: ["basis", "similar"]
---

## Goal

Lecture 2 established that one vector has different coordinates in different bases. This lecture turns the conversion into a matrix and carries it through. There are only two formulas: how the basis changes and how coordinates change. The difficulty is not algebra but direction — basis and coordinates move opposite ways.

By the end you can compute a transition matrix from two bases, convert coordinates with $x = Py$, explain why the matrix is invertible, and connect it to similar matrices.

## Three-line recap

- Coordinates are coefficients with respect to a basis; change the basis and the coordinates change.
- The transition matrix stores the new basis vectors in old coordinates, column by column.
- Changing the basis does not move the vector, only its address.

## The problem

Let $B = (b_1, \dots, b_n)$ be the old basis and $B' = (b'_1, \dots, b'_n)$ the new one. A vector $v$ has old coordinates $x$ and new coordinates $y$. Given $x$, how do we get $y$, and vice versa?

Solving a fresh system every time would make a change of basis a manual chore. We want one matrix and one multiplication. The questions are: what goes into its columns, which side do we multiply, and which direction does it point?

## Intuition

Write each basis as a row of vectors. Since $B$ is a basis, every $b'_j$ has a unique expansion in $B$:

$$
b'_j = p_{1j} b_1 + p_{2j} b_2 + \cdots + p_{nj} b_n
$$

Collect the coefficients column by column into $P = (p_{ij})$. This is the transition matrix. In matrix notation,

$$
(b'_1, \dots, b'_n) = (b_1, \dots, b_n) P
$$

The $j$-th column of $P$ is exactly the old-coordinate vector of $b'_j$. That gives the practical recipe: express each new basis vector in the old basis and place the coordinate vectors as columns.

Now for coordinates. If $v$ has new coordinates $y = (y_1, \dots, y_n)^T$, then

$$
v = \sum_j y_j b'_j = (b'_1, \dots, b'_n) y = (b_1, \dots, b_n) P y
$$

But also $v = (b_1, \dots, b_n) x$. Coordinates in a fixed basis are unique, so

$$
x = P y
$$

Read it slowly: old coordinates equal the transition matrix times new coordinates. To go from old to new, solve $y = P^{-1} x$.

The opposite directions deserve emphasis. Changing the basis from $B$ to $B'$ uses $P$; changing coordinates from $B$ to $B'$ uses $P^{-1}$. One goes forward, the other backward. When in doubt, test with a concrete vector instead of memorising the arrow.

$P$ is always invertible. Both lists are bases, so the translation neither loses nor invents information, and its determinant is nonzero.

> [!NOTE]
> Some texts define the transition matrix the other way, as old basis in new coordinates, and then get $P^{-1}$. Notation varies; the reliable check is substituting one vector and seeing whether the formula holds.

## Worked by hand

Take the old basis to be the standard basis $B = (e_1, e_2)$ and the new basis

$$
b'_1 = (2,1), \qquad b'_2 = (1,1)
$$

Their standard coordinates are just themselves, so the transition matrix is

$$
P = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}
$$

Its determinant is $2 \cdot 1 - 1 \cdot 1 = 1 \neq 0$, so it is invertible, with

$$
P^{-1} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}
$$

Take $v = (5, 2)$, whose old coordinates are $x = (5,2)^T$. Let $y = (y_1, y_2)^T$ be the new coordinates. From $x = Py$,

$$
\begin{pmatrix} 5 \\ 2 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \end{pmatrix}
$$

so $2y_1 + y_2 = 5$ and $y_1 + y_2 = 2$. Subtract to get $y_1 = 3$, then $y_2 = -1$. Thus $y = (3, -1)^T$.

Check directly: $3b'_1 - b'_2 = 3(2,1) - (1,1) = (5,2) = v$. Check with the inverse:

$$
P^{-1} x = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} 5 \\ 2 \end{pmatrix} = \begin{pmatrix} 3 \\ -1 \end{pmatrix}
$$

Both routes agree.

Notice the directions. The basis changes by $P$: new basis equals old basis times $P$. Coordinates change by $P^{-1}$: new coordinates equal $P^{-1}$ times old coordinates. Applying $P$ to the coordinates instead gives $P x = (12, 7)^T$, which reconstructs $12b'_1 + 7b'_2 = (31, 19)$, nowhere near $v$. Wrong direction, wrong numbers immediately.

Finally, linear maps. If the same map has matrix $M$ in the old basis and $M'$ in the new one, then

$$
M' = P^{-1} M P
$$

The derivation is one line: act with $M$ in old coordinates, then translate the result back to new coordinates. $P$ translates, $P^{-1}$ translates back. This is precisely where similar matrices come from.

## Three misconceptions

> [!MYTH] The transition matrix and the coordinate-change matrix point the same way.
> The basis changes by $P$, the coordinates by $P^{-1}$. They are inverse to each other and move in opposite directions.

> [!MYTH] A transition matrix must be orthogonal.
> Only when both bases are orthonormal. Between arbitrary bases, any invertible matrix can occur, symmetric or not.

> [!MYTH] Changing the basis changes the vector.
> The vector is a geometric object and stays put. Only the list of coefficients changes, like a person moving house: the person is the same.

## Practice

> [!PRACTICE] 1 · Write the transition matrix
> The old basis is standard, the new basis is $b'_1 = (1,2)$, $b'_2 = (3,5)$. Write the transition matrix.
>
> > [!ANSWER] Answer
> > $P = \begin{pmatrix} 1 & 3 \\ 2 & 5 \end{pmatrix}$, with determinant $-1 \neq 0$.

> [!PRACTICE] 2 · Convert coordinates
> Continuing, a vector has old coordinates $(1,1)$. Find its new coordinates.
>
> > [!ANSWER] Answer
> > Solve $Py = (1,1)^T$, that is $y_1 + 3y_2 = 1$ and $2y_1 + 5y_2 = 1$. Then $y_1 = -2$ and $y_2 = 1$.

> [!PRACTICE] 3 · Similarity
> If $M' = P^{-1}MP$, prove that $\det M' = \det M$.
>
> > [!ANSWER] Answer
> > Multiplicativity gives $\det M' = \det(P^{-1}) \det M \det P = \det M$.

## Formal statement

> [!FORMAL] Formal statement
> Let $B = (b_1, \dots, b_n)$ and $B' = (b'_1, \dots, b'_n)$ be two bases of $V$. The transition matrix $P$ is defined by $(b'_1, \dots, b'_n) = (b_1, \dots, b_n)P$. If $x = [v]_B$ and $y = [v]_{B'}$, then $x = Py$, equivalently $y = P^{-1}x$. The matrix $P$ is invertible. A linear map $T$ with matrices $M$ and $M'$ in the two bases satisfies $M' = P^{-1}MP$.
