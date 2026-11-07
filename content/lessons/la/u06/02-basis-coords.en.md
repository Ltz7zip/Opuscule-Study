---
slug: "basis-coords"
subject: "la"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Dimension, basis, and coordinates"
subtitle: "How many addresses can one vector have"
minutes: 14
meta: ["14 min read","Needs linear maps","Mastery level"]
concepts: ["basis", "linmap"]
prereq: ["linmap"]
related: ["matrix", "la", "linmap"]
---

## What you will get

The first two lectures said that a matrix is how a linear map is written, and that a linear map is fixed by what it does to a basis. This lecture finally pins down the word "basis": what makes a set of vectors eligible, what a coordinate is actually recording, and what happens to the same object when you switch bases.

By the end you can test whether a set is a basis, compute a change-of-basis matrix, and see why "changing coordinates" in deep learning only makes the arithmetic easier without changing the model.

## Three lines back

- A basis is linearly independent plus spanning: no spare parts, no missing ones.
- A coordinate is not a point; it is the recipe of basis vectors that assembles the vector.
- Changing basis changes neither the vector nor the map — only the bookkeeping.

## A coordinate is a recipe

Saying "the point $(3, 4)$" in the plane quietly assumes the basis $e_1 = (1,0)$, $e_2 = (0,1)$. The full sentence is

$$
(3, 4) = 3 e_1 + 4 e_2
$$

A coordinate is a recipe: three parts $e_1$, four parts $e_2$. Change the basis and the recipe changes, while the thing being mixed stays the same.

That is the definition. Let $B = (b_1, \dots, b_n)$ be a basis of $V$. For every $v \in V$ there is a unique list $c_1, \dots, c_n$ with

$$
v = c_1 b_1 + \cdots + c_n b_n
$$

Those numbers are the coordinates of $v$ in $B$, written $[v]_B$. Uniqueness is not a bonus; it is the whole point. Without it, coordinates would mean nothing.

## Linear independence: no spare parts

Vectors $v_1, \dots, v_k$ are linearly independent when

$$
c_1 v_1 + \cdots + c_k v_k = 0 \quad \Longrightarrow \quad c_1 = \cdots = c_k = 0
$$

In plain words: no vector can be assembled from the others. If some $v_i$ is a combination of the rest, it is a spare part, and keeping it only makes the recipe non-unique.

Three quick tests:

- Any set containing the zero vector is dependent: put coefficient 1 on zero, 0 everywhere else.
- In an $n$-dimensional space, more than $n$ vectors are always dependent.
- Two vectors are dependent exactly when one is a scalar multiple of the other.

## Span and basis: not one too many

The span of a set is everything you can build from it:

$$
\operatorname{span}(v_1, \dots, v_k) = \{c_1 v_1 + \cdots + c_k v_k : c_i \in \mathbb{F}\}
$$

A **basis** does two things at once: independent (no redundancy) and spanning (nothing missing). In an $n$-dimensional space these two conditions together amount to "exactly $n$ vectors, independent".

| Set | Independent | Spans | A basis? |
| --- | --- | --- | --- |
| $(1,0), (0,1)$ | yes | yes | yes |
| $(1,0), (0,1), (1,1)$ | no | yes | no (one too many) |
| $(1,0)$ | yes | no | no (one short) |
| $(1,1), (2,2)$ | no | no | no |

## One vector, two coordinate lists

Take the standard basis $B = (e_1, e_2)$ and another basis $B' = (b_1, b_2)$ with $b_1 = (1,1)$, $b_2 = (1,-1)$. The vector $v = (3,1)$ has coordinates $(3,1)$ in $B$. In $B'$? Solve

$$
c_1 (1,1) + c_2 (1,-1) = (3,1)
$$

Adding the two equations gives $2c_1 = 4$, so $c_1 = 2$; subtracting gives $2c_2 = 2$, so $c_2 = 1$. Hence $[v]_{B'} = (2, 1)$.

One vector, two coordinate lists: $(3,1)$ and $(2,1)$. Which is correct? Both. A coordinate is never a property of the vector alone — it is a property of the vector together with a basis.

## The change-of-basis matrix

Write each vector of $B'$ in the basis $B$ and line the results up as columns. That is the change-of-basis matrix $P$:

$$
P = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}
$$

It translates $B'$ coordinates into $B$ coordinates:

$$
[v]_B = P\,[v]_{B'}
$$

Check: $P \begin{bmatrix} 2 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$. Correct.

The other direction is $P^{-1}$. This also shows that a change-of-basis matrix must be invertible: both sets are bases, so no information should be lost in translation.

For a linear map, changing basis gives a similarity transform:

$$
M' = P^{-1} M P
$$

$M$ and $M'$ describe the same map under two bookkeeping schemes. Similar matrices share trace, determinant, and eigenvalues — precisely because those quantities belong to the map, not to the notation.

## Why neural networks barely care about basis

A layer learns $W$, and $W$ is just the matrix of a map in the standard basis. Change the input basis (apply any invertible linear transform), and the network can absorb it into a new $W'$ computing the same function:

$$
W' = P^{-1} W P
$$

Two practical consequences. First, weight initialisation, batch normalisation, and whitening are all coordinate adjustments meant to flatten the optimisation landscape. Second, the interpretability of a single layer is limited: each column of $W$ depends on the current basis, and after a change of basis those columns mean something else — unless the basis itself carries semantics.

> [!MYTH] A basis must be orthogonal.
> Orthogonal bases are convenient, not required. Any independent spanning set is a basis, even a skewed one, as long as nothing is redundant.

## Misreadings

> [!MYTH] Coordinates are the vector.
> Coordinates are coefficients in a chosen basis. Change the basis and every coordinate changes while the vector does not.

> [!MYTH] As many vectors as the dimension is enough.
> Independence is also required. Three vectors in three dimensions that lie in one plane fail to span.

> [!MYTH] Eigenvalues change when the basis changes.
> Eigenvalues belong to the map and survive similarity. What changes is the coordinate expression of the eigenvectors.

## Exercises

> [!PRACTICE] 1 · A basis?
> Are $(1,2), (2,4)$ a basis of $\mathbb{R}^2$?
>
> > [!ANSWER] Show answer
> > No. $(2,4) = 2(1,2)$; they are dependent and span only a line.

> [!PRACTICE] 2 · Find coordinates
> In the basis $b_1 = (2,0)$, $b_2 = (0,3)$, what are the coordinates of $(4,9)$?
>
> > [!ANSWER] Show answer
> > Solve $c_1(2,0) + c_2(0,3) = (4,9)$: $c_1 = 2$, $c_2 = 3$, so $(2,3)$.

> [!PRACTICE] 3 · Change of basis
> Let $B' = ((1,1), (1,-1))$ and let $B$ be the standard basis. Write the matrix taking $B'$ coordinates to $B$ coordinates.
>
> > [!ANSWER] Show answer
> > Columns are the $B'$ vectors: $P = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}$.

> [!PRACTICE] 4 · Similarity invariant
> If $M' = P^{-1} M P$, prove that $\operatorname{tr}(M') = \operatorname{tr}(M)$.
>
> > [!ANSWER] Show answer
> > Use $\operatorname{tr}(AB) = \operatorname{tr}(BA)$: $\operatorname{tr}(P^{-1} M P) = \operatorname{tr}(M P P^{-1}) = \operatorname{tr}(M)$.

> [!PRACTICE] 5 · Dependence
> $v_1 = (1,0,0)$, $v_2 = (0,1,0)$, $v_3 = (1,1,0)$. Independent? What do they span?
>
> > [!ANSWER] Show answer
> > $v_3 = v_1 + v_2$, so they are dependent. They span the $xy$-plane, not all of $\mathbb{R}^3$.

> [!FORMAL] Formal statement
> Let $V$ be a vector space over $\mathbb{F}$. A subset $B \subseteq V$ is a basis if it is linearly independent and $\operatorname{span}(B) = V$. If $V$ has a finite basis, any two bases have the same cardinality, called $\dim V$. For a fixed basis $B$, the coordinate map $v \mapsto [v]_B$ is a linear isomorphism $V \to \mathbb{F}^n$; translation between two bases is an invertible matrix $P$, and matrices of a linear map transform as $M \mapsto P^{-1}MP$.
