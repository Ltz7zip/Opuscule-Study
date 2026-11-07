---
slug: "inner-product"
subject: "la"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Linear Algebra · Mastery"
title: "Inner Products, Length, Orthogonality"
subtitle: "Geometry, moved into n dimensions"
minutes: 14
meta: ["14 min read","Requires linear dependence","Mastery level"]
concepts: ["innerprod", "lindep"]
prereq: ["lindep"]
related: ["similar", "vecspace"]
---

## Goal

By the end of this lecture you can compute lengths and angles in $n$ dimensions, decide whether a set of vectors is pairwise orthogonal, and turn any independent set into an orthonormal basis.

Three things only: carry geometry into algebra with an inner product, recognise the maps that do not distort anything through orthogonal matrices, and replace an ordinary basis with a better one using Gram–Schmidt.

## Three-line recap

- Linear dependence asks whether some nontrivial combination of the vectors collapses to zero.
- The number produced by row-times-column in matrix multiplication is an inner product written in coordinates.
- The open question: how should length and perpendicularity be defined in $n$ dimensions?

## The problem

In the plane, length comes from Pythagoras and angle from the cosine rule. In $\mathbb{R}^n$ the picture is gone, but the computation cannot stop. We need a device that depends only on coordinates and still keeps the geometric intuition.

The inner product is that device. For $\alpha=(a_1,\dots,a_n)^{\mathsf{T}}$ and $\beta=(b_1,\dots,b_n)^{\mathsf{T}}$, set

$$
(\alpha,\beta)=a_1b_1+a_2b_2+\cdots+a_nb_n.
$$

It satisfies three properties: symmetry $(\alpha,\beta)=(\beta,\alpha)$; linearity in the first slot, $(\alpha+\gamma,\beta)=(\alpha,\beta)+(\gamma,\beta)$ and $(k\alpha,\beta)=k(\alpha,\beta)$; and positive definiteness, $(\alpha,\alpha)\ge 0$ with equality only at $\alpha=0$.

From it we get length $\|\alpha\|=\sqrt{(\alpha,\alpha)}$, distance $\|\alpha-\beta\|$, and angle through

$$
\cos\theta=\frac{(\alpha,\beta)}{\|\alpha\|\,\|\beta\|}.
$$

When $(\alpha,\beta)=0$ we say $\alpha$ and $\beta$ are orthogonal and write $\alpha\perp\beta$.

## Intuition

The inner product measures how much of one vector lies along another. Aligned vectors score high; vectors at $90^\circ$ score zero.

That reading survives in $n$ dimensions. Orthogonality means "zero projection", and nothing has to be visible. We can therefore talk about perpendicularity, right triangles, and Pythagoras in high dimensions.

Cauchy–Schwarz states this precisely:

$$
|(\alpha,\beta)|\le \|\alpha\|\,\|\beta\|.
$$

Equality holds exactly when the two vectors are linearly dependent. It keeps the cosine inside $[-1,1]$ and gives the triangle inequality $\|\alpha+\beta\|\le\|\alpha\|+\|\beta\|$.

A set of nonzero pairwise orthogonal vectors is automatically independent; normalise them and you have an orthonormal set. Put those vectors as the columns of $Q$; then $Q^{\mathsf{T}}Q=E$, and $Q$ is called an orthogonal matrix. It preserves inner products, lengths, and angles: $(Q\alpha,Q\beta)=(\alpha,\beta)$.

## Worked by hand

Take

$$
\alpha_1=\begin{pmatrix}1\\1\\0\end{pmatrix},\quad
\alpha_2=\begin{pmatrix}1\\0\\1\end{pmatrix},\quad
\alpha_3=\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

They are independent but not orthogonal. Run Gram–Schmidt step by step.

First vector, unchanged:

$$
\beta_1=\alpha_1=\begin{pmatrix}1\\1\\0\end{pmatrix},\qquad \|\beta_1\|^2=2.
$$

Second: subtract the projection of $\alpha_2$ onto $\beta_1$,

$$
\beta_2=\alpha_2-\frac{(\alpha_2,\beta_1)}{(\beta_1,\beta_1)}\beta_1
=\begin{pmatrix}1\\0\\1\end{pmatrix}-\frac12\begin{pmatrix}1\\1\\0\end{pmatrix}
=\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix}.
$$

Indeed $(\beta_2,\beta_1)=\frac12-\frac12+0=0$, and $\|\beta_2\|^2=\frac14+\frac14+1=\frac32$.

Third: subtract the projections onto both earlier vectors. The two inner products are

$$
(\alpha_3,\beta_1)=1,\qquad (\alpha_3,\beta_2)=\frac12,
$$

so

$$
\beta_3=\alpha_3-\frac{1}{2}\beta_1-\frac{1/2}{3/2}\beta_2
=\begin{pmatrix}0\\1\\1\end{pmatrix}-\begin{pmatrix}1/2\\1/2\\0\end{pmatrix}-\frac13\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix}
=\begin{pmatrix}-2/3\\2/3\\2/3\end{pmatrix}.
$$

Check: $(\beta_3,\beta_1)=-\frac23+\frac23=0$ and $(\beta_3,\beta_2)=-\frac13-\frac13+\frac23=0$. Normalise:

$$
e_1=\frac{1}{\sqrt2}\begin{pmatrix}1\\1\\0\end{pmatrix},\quad
e_2=\frac{1}{\sqrt6}\begin{pmatrix}1\\-1\\2\end{pmatrix},\quad
e_3=\frac{1}{\sqrt3}\begin{pmatrix}-1\\1\\1\end{pmatrix}.
$$

The three vectors are pairwise orthogonal, all of length $1$, and they span exactly the same space as before.

## Three misconceptions

> [!MYTH] The inner product is just multiply-and-add position by position.
> That is only the coordinate formula for the standard inner product. An inner product is any function satisfying the three axioms; change the basis and the formula changes, while the geometry does not.

> [!MYTH] Orthogonal means perpendicular, so it only makes sense in three dimensions.
> The definition is one line: the inner product is zero. It works in any dimension, and even for functions, even when there is nothing to draw.

> [!MYTH] Gram–Schmidt changes the space spanned by the vectors.
> Each step only removes a projection onto directions already present. The new vector stays in the original span and does not lower the dimension, so the subspace is unchanged.

## Practice

> [!PRACTICE] 1 · Length and angle
> With $\alpha=(1,2,2)^{\mathsf{T}}$ and $\beta=(2,2,-1)^{\mathsf{T}}$, find $\|\alpha\|$, $\|\beta\|$, and $\cos\theta$.
>
> > [!ANSWER] Answer
> > $\|\alpha\|=\sqrt{1+4+4}=3$, $\|\beta\|=\sqrt{4+4+1}=3$, and $(\alpha,\beta)=2+4-2=4$, so $\cos\theta=\frac49$.

> [!PRACTICE] 2 · Check Cauchy–Schwarz
> Use the vectors above to verify $|(\alpha,\beta)|\le\|\alpha\|\,\|\beta\|$.
>
> > [!ANSWER] Answer
> > The left side is $4$ and the right side is $3\times3=9$, so the inequality holds. Equality would require the vectors to be dependent, which they are not.

> [!PRACTICE] 3 · One orthogonalisation step
> Orthogonalise $\alpha_1=(1,0)^{\mathsf{T}}$ and $\alpha_2=(1,1)^{\mathsf{T}}$, then normalise.
>
> > [!ANSWER] Answer
> > $\beta_1=(1,0)^{\mathsf{T}}$ and $\beta_2=\alpha_2-(\alpha_2,\beta_1)\beta_1=(1,1)^{\mathsf{T}}-(1,0)^{\mathsf{T}}=(0,1)^{\mathsf{T}}$. After normalising, $e_1=(1,0)^{\mathsf{T}}$ and $e_2=(0,1)^{\mathsf{T}}$.

## Formal statement

> [!FORMAL] Formal statement
> Let $V$ be a real vector space. An inner product is a function $V\times V\to\mathbb{R}$ that is symmetric, linear in its first argument, and positive definite. The norm is $\|\alpha\|=\sqrt{(\alpha,\alpha)}$, and the Cauchy–Schwarz inequality $|(\alpha,\beta)|\le\|\alpha\|\|\beta\|$ holds. Two vectors are orthogonal when $(\alpha,\beta)=0$. In finite dimensions any independent set can be converted by Gram–Schmidt into an orthonormal set spanning the same subspace. A real square matrix with $Q^{\mathsf{T}}Q=E$ is orthogonal, and it preserves inner products.
