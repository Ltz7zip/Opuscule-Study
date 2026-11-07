---
slug: "linear-map"
subject: "la"
unit: "u06"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Linear Transformations"
subtitle: "The transformation comes before the matrix"
minutes: 15
meta: ["15 min read","Needs matrix multiplication","Mastery level"]
concepts: ["linmap", "la"]
prereq: ["la"]
related: ["matrix", "basis", "la"]
---

## What you will get

The last lecture turned matrix multiplication into a mechanical sum. This one goes the other way: forget what the matrix looks like, ask what a transformation does to the space, then ask what it takes for that transformation to be writable as a matrix.

By the end you can decide whether a map is linear, derive all its properties from two axioms, and explain why a linear map is pinned down entirely by what it does to a basis.

## Three lines back

- A linear map preserves addition and scaling: combine first or transform first, same result.
- Linearity is exactly $T(x+y)=T(x)+T(y)$ and $T(cx)=cT(x)$.
- Once a basis is fixed, a linear map is determined by its images of the basis vectors — and can then be written as a matrix.

## Why the word "map"

A function is a special case of a map whose domain and codomain sit on the number line. Linear algebra cares about vectors, and vectors can live in $\mathbb{R}^n$, in polynomial spaces, or in spaces of matrices and functions. Calling it a function makes you look for an input $x$; calling it a map keeps your eye on where the whole set is carried.

Write $T: V \to W$. $V$ is the input space, $W$ the output space. $T$ sends each $v \in V$ to exactly one $T(v) \in W$. Exactly one, not at most one for the reverse: two different inputs may land on the same output. That is what makes projection possible.

## The two axioms

$T$ is linear if and only if for all $u, v \in V$ and every scalar $c$:

$$
T(u+v) = T(u) + T(v), \qquad T(cu) = c\,T(u)
$$

The two can be fused into one:

$$
T(cu + dv) = c\,T(u) + d\,T(v)
$$

Read the fused form slowly. It says a linear map carries a **linear combination** across to the other space untouched: give it coefficients and a recipe, and it does not matter whether you assemble then transform, or transform then assemble with the same coefficients.

Two free consequences follow. $T(0) = 0$, because $T(0) = T(0 \cdot 0) = 0 \cdot T(0) = 0$. And $T(-v) = -T(v)$. These are the fastest way to rule out a candidate: if $T(0) \neq 0$, stop.

## Three visible examples

**Scaling.** $T(x, y) = (2x, 3y)$: double the first coordinate, triple the second. Both axioms hold term by term.

**Rotation.** Rotate every vector by $\theta$ counter-clockwise. Addition in the plane is the parallelogram rule, and rotation preserves parallelograms; scaling is movement along a line, which rotation also preserves. So rotation is linear, with matrix

$$
R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}
$$

**Projection.** $T(x, y) = (x, 0)$ flattens the plane onto the $x$-axis. It is linear, but it crushes the entire $y$-axis to a point, so it cannot be undone. Projection is the cleanest picture of non-invertibility.

For contrast: $T(x) = x + 1$ is not linear because $T(0) = 1 \neq 0$; $T(x) = x^2$ is not linear because $T(u+v) = (u+v)^2 \neq u^2 + v^2$.

## A linear map is fixed by its basis images

This is the sentence to carry out of the lecture.

Let $v_1, \dots, v_n$ be a basis of $V$. Every $v \in V$ has a unique expansion $v = c_1 v_1 + \cdots + c_n v_n$, so

$$
T(v) = T(c_1 v_1 + \cdots + c_n v_n) = c_1 T(v_1) + \cdots + c_n T(v_n)
$$

Every term on the right needs only $T(v_i)$. In other words: **tell me where the basis vectors go, and I know where the whole space goes**.

That is where matrices come from. Write each $T(v_j)$ as a coordinate column in the basis of $W$, line the columns up, and you get the $m \times n$ matrix of $T$. The previous lecture's line — "$Ax$ is a weighted combination of the columns of $A$" — is exactly this statement in coordinates.

> [!MYTH] A matrix and a linear map are the same thing.
> The map is the object; the matrix is how it reads in one particular basis. Change the basis and the matrix changes while the map does not. Only with a fixed basis may you treat them as interchangeable in computation.

## Linear versus affine: where the bias goes

The common layer $y = Wx + b$ is not linear when $b \neq 0$, since $T(0) = b \neq 0$. It is **affine**: a linear map plus a translation.

Why does everyone still call it a linear layer? Habit, and because you can absorb $b$ into an augmented matrix, at which point it really is linear in one dimension higher:

$$
\begin{bmatrix} W & b \\ 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ 1 \end{bmatrix} = \begin{bmatrix} Wx + b \\ 1 \end{bmatrix}
$$

Keep the distinction: linear fixes the origin, affine lets it move. To test a transformation for linearity, first ask where $0$ goes.

## Composition is multiplication

If $S: U \to V$ and $T: V \to W$ are both linear, so is $T \circ S$. Written as matrices, the matrix of $T \circ S$ is $M_T M_S$ — the matrix that acts first sits on the right.

$$
(T \circ S)(x) = T(S(x)) = M_T (M_S x) = (M_T M_S) x
$$

This also explains why matrix multiplication is defined the way it is. It is not an arbitrary rule; it is the only coordinate expression of composition. The previous lecture noted that products do not commute, and now there is a reason: the order in which transformations happen usually cannot be swapped.

## Kernel and image

Two sets describe the whole structure of a linear map:

- **Kernel** $\ker T = \{v : T(v) = 0\}$: the inputs crushed to zero.
- **Image** $\operatorname{im} T = \{T(v) : v \in V\}$: the outputs actually reachable.

For projection $T(x,y) = (x,0)$, the kernel is the whole $y$-axis and the image is the whole $x$-axis. For rotation, the kernel is just the zero vector and the image is the whole plane. Together these give the rank–nullity theorem:

$$
\dim \ker T + \dim \operatorname{im} T = \dim V
$$

The intuition is plain: every dimension of the input space either gets crushed into the kernel or carried into the image. There is nowhere else to go.

## Misreadings

> [!MYTH] The graph is a straight line, so the map is linear.
> Only lines through the origin. Every point of $y = x + 1$ lies on a line, and the map is still not linear.

> [!MYTH] Linear implies invertible.
> Projection is linear and erases a whole direction. Invertibility requires a trivial kernel.

> [!MYTH] Changing the basis changes the map.
> The matrix changes; the map does not. The same road measured in kilometres or miles is the same road.

## Exercises

> [!PRACTICE] 1 · Test for linearity
> Is $T(x, y) = (x + y, xy)$ linear?
>
> > [!ANSWER] Show answer
> > No. $T(0,0) = (0,0)$ passes the first check, but $T(2,2) = (4,4)$ while $2T(1,1) = (4,2)$: scaling fails.

> [!PRACTICE] 2 · From basis to map
> Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be linear with $T(1,0) = (2,1)$ and $T(0,1) = (-1,3)$. Find $T(4,5)$.
>
> > [!ANSWER] Show answer
> > $T(4,5) = 4T(1,0) + 5T(0,1) = (8,4) + (-5,15) = (3,19)$.

> [!PRACTICE] 3 · Write the matrix
> Write the map above as a matrix and check it on $(4,5)$.
>
> > [!ANSWER] Show answer
> > Columns are the images: $M = \begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$, and $M\begin{bmatrix}4\\5\end{bmatrix} = \begin{bmatrix}3\\19\end{bmatrix}$.

> [!PRACTICE] 4 · Kernel and image
> For $T(x,y,z) = (x, y, 0)$, what are the kernel and the image, and their dimensions?
>
> > [!ANSWER] Show answer
> > Kernel: the $z$-axis, dimension 1. Image: the $xy$-plane, dimension 2. $1 + 2 = 3$, matching rank–nullity.

> [!PRACTICE] 5 · Affine
> Why is $T(x) = 3x - 2$ not linear? How many dimensions do you need to write it linearly?
>
> > [!ANSWER] Show answer
> > $T(0) = -2 \neq 0$. With the augmented matrix $\begin{bmatrix} 3 & -2 \\ 0 & 1 \end{bmatrix}$ acting on $(x, 1)$, it becomes a linear map in two dimensions.

> [!FORMAL] Formal statement
> Let $V, W$ be vector spaces over one field. $T: V \to W$ is linear if $T(u+v)=T(u)+T(v)$ and $T(cv)=cT(v)$ for all $u, v \in V$ and scalars $c$. Linear maps form a vector space $\mathcal{L}(V,W)$, and with bases fixed $\mathcal{L}(V,W) \cong \mathbb{F}^{m \times n}$. Kernel and image are subspaces, and $\dim V = \dim \ker T + \dim \operatorname{im} T$.
