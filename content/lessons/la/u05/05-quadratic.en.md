---
slug: "quadratic-form"
subject: "la"
unit: "u05"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Linear Algebra · Mastery"
title: "Quadratic Forms and Standard Form"
subtitle: "Eliminating the cross terms"
minutes: 15
meta: ["15 min read","Requires similar matrices","Mastery level"]
concepts: ["quadratic", "similar"]
prereq: ["similar"]
related: ["positivedef", "eigens"]
---

## Goal

By the end of this lecture you can write a quadratic form in matrix form $f=x^{\mathsf{T}}Ax$, distinguish a standard form from a canonical form, and state exactly what the law of inertia does and does not guarantee.

You will also orthogonally transform a three-variable quadratic form into one containing only squares.

## Three-line recap

- A real symmetric matrix can always be diagonalised by an orthogonal matrix: $Q^{\mathsf{T}}AQ=\Lambda$.
- Similar matrices are one map in different bases, so eigenvalues do not change.
- Inner products and orthogonality let us change coordinates without changing lengths.

## The problem

A quadratic form is a polynomial whose terms all have degree two, for example

$$
f(x_1,x_2)=x_1^2+4x_1x_2+3x_2^2.
$$

The cross term $4x_1x_2$ tilts the picture. We cannot tell at a glance whether it is a bowl, a saddle, or a degenerate trough. We want new coordinates in which every cross term disappears and only squares remain.

Write the form as

$$
f(x)=x^{\mathsf{T}}Ax,
$$

with $A$ symmetric. The rule: the coefficient of $x_i^2$ goes to $a_{ii}$, and the coefficient of $x_ix_j$ is **split evenly** between $a_{ij}$ and $a_{ji}$. The example above gives

$$
A=\begin{pmatrix}1&2\\2&3\end{pmatrix}.
$$

If $x=Cy$ with $C$ invertible, then

$$
f=x^{\mathsf{T}}Ax=y^{\mathsf{T}}(C^{\mathsf{T}}AC)y.
$$

The matrices $A$ and $B=C^{\mathsf{T}}AC$ are called congruent. Congruence preserves rank and preserves the numbers of positive, negative, and zero squared terms.

A form with only squares is in standard form. Scaling coefficients to $1,-1,0$ gives the canonical form. The law of inertia says that no matter which invertible change you use, the number $p$ of positive terms and the number $q$ of negative terms stay fixed. The standard form is not unique; the pair $(p,q)$ is.

## Intuition

The graph of a quadratic form is a quadric surface. An orthogonal change is a rotation of the coordinate axes: it does not deform the surface, only aligns the axes with its principal directions.

After alignment the cross terms vanish and each coordinate acts independently: $f=\lambda_1y_1^2+\cdots+\lambda_ny_n^2$. The coefficients are the eigenvalues. Positive coefficients bend the surface upward, negative ones downward, and zero means that direction is flat.

So "reduce to standard form" is geometrically "find the principal axes" and algebraically "diagonalise". Orthogonal changes are the best choice because they preserve length and only rotate.

## Worked by hand

Reduce

$$
f=2x_1^2+2x_2^2+2x_3^2+2x_1x_2+2x_1x_3+2x_2x_3
$$

to standard form by an orthogonal transformation.

The matrix is

$$
A=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix},
$$

because every square coefficient is $2$ and every cross coefficient $2$ is split into two entries of $1$.

Let $t=2-\lambda$. Then $A-\lambda E$ has $t$ on the diagonal and $1$ everywhere else, and

$$
|A-\lambda E|=t^3+2-3t=(t-1)^2(t+2).
$$

Thus $t=1$ gives $\lambda=1$ with multiplicity two, and $t=-2$ gives $\lambda=4$. The eigenvalues are $4,1,1$.

For $\lambda=4$, every row of $A-4E$ says $x_1=x_2=x_3$, so

$$
q_1=\frac{1}{\sqrt3}\begin{pmatrix}1\\1\\1\end{pmatrix}.
$$

For $\lambda=1$, the matrix $A-E$ has every entry equal to $1$, leaving one equation $x_1+x_2+x_3=0$. Two orthogonal solutions are

$$
q_2=\frac{1}{\sqrt2}\begin{pmatrix}1\\-1\\0\end{pmatrix},\qquad
q_3=\frac{1}{\sqrt6}\begin{pmatrix}1\\1\\-2\end{pmatrix}.
$$

The three vectors are pairwise orthogonal and unit length. With $Q=(q_1,q_2,q_3)$ and $x=Qy$,

$$
f=4y_1^2+y_2^2+y_3^2.
$$

That is the standard form. Setting $z_1=2y_1$, $z_2=y_2$, $z_3=y_3$ gives the canonical form $z_1^2+z_2^2+z_3^2$. The positive index is $p=3$, the negative index $q=0$, and the rank is $3$.

## Three misconceptions

> [!MYTH] The matrix of a quadratic form can be chosen freely as long as the product is correct.
> It must be symmetric. Split each cross coefficient evenly between $a_{ij}$ and $a_{ji}$; otherwise $x^{\mathsf{T}}Ax$ picks up an antisymmetric part and the eigenvalues stop meaning anything.

> [!MYTH] The standard form is unique.
> It is not. Different invertible changes produce different coefficients. What stays fixed is the number of positive and negative squares, the inertia indices.

> [!MYTH] Congruent and similar mean the same thing.
> Similarity is $P^{-1}AP$; congruence is $C^{\mathsf{T}}AC$. They differ in general. Only when $C$ is orthogonal do we have $C^{\mathsf{T}}=C^{-1}$, so congruence becomes similarity as well.

## Practice

> [!PRACTICE] 1 · Write the matrix
> Write the matrix of $f=x_1^2+4x_1x_2+3x_2^2$.
>
> > [!ANSWER] Answer
> > $A=\begin{pmatrix}1&2\\2&3\end{pmatrix}$, since the cross coefficient $4$ splits into two entries of $2$.

> [!PRACTICE] 2 · Read the indices
> What are the positive and negative inertia indices of $f=y_1^2-2y_2^2+0\cdot y_3^2$?
>
> > [!ANSWER] Answer
> > One positive and one negative term, so $p=1$, $q=1$, and the rank is $2$. The coefficient $-2$ affects only the scaling, not the index.

> [!PRACTICE] 3 · From eigenvalues to canonical form
> A quadratic form has matrix eigenvalues $3,0,-2$. Write its canonical form and inertia indices.
>
> > [!ANSWER] Answer
> > After an orthogonal change it is $3y_1^2-2y_3^2$, which scales to $z_1^2-z_3^2$. Hence $p=1$, $q=1$, and the rank is $2$.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be a real symmetric $n\times n$ matrix. The function $f(x)=x^{\mathsf{T}}Ax$ is a quadratic form. If $B=C^{\mathsf{T}}AC$ for some invertible $C$, then $A$ and $B$ are congruent. Every quadratic form can be brought by an invertible linear change to a standard form $\lambda_1y_1^2+\cdots+\lambda_ny_n^2$, and further to the canonical form $y_1^2+\cdots+y_p^2-y_{p+1}^2-\cdots-y_{p+q}^2$. The law of inertia asserts that $p$ and $q$ depend only on $A$; they are the positive and negative inertia indices, and $p+q$ equals the rank.
