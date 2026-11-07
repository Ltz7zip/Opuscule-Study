---
slug: "positive-def"
subject: "la"
unit: "u05"
order: 7
mode: "mastery"
lang: "en"
kicker: "Lecture 7 · Linear Algebra · Mastery"
title: "Positive Definite Quadratic Forms"
subtitle: "The ones that are always positive"
minutes: 14
meta: ["14 min read","Requires quadratic forms","Mastery level"]
concepts: ["positivedef", "quadratic"]
prereq: ["quadratic"]
related: ["eigens", "similar"]
---

## Goal

By the end of this lecture you can decide whether a quadratic form is positive definite in three equivalent ways: through its eigenvalues, through its leading principal minors, and through congruence to the identity matrix.

You will also separate positive definite from positive semidefinite, and see why "all entries positive" and "positive determinant" are unreliable tests.

## Three-line recap

- A quadratic form is $x^{\mathsf{T}}Ax$ with $A$ symmetric.
- An orthogonal change diagonalises $A$, and the eigenvalues become the coefficients in standard form.
- The inertia indices $(p,q)$ are invariant under congruence, and $p+q$ is the rank.

## The problem

In optimisation we often need to know whether a quadratic form is always positive. If it is, the function looks like a bowl near the point and has a local minimum. If it takes both signs, the point is a saddle and there is no extremum.

The definition is direct: $f$ (or $A$) is positive definite if

$$
f(x)=x^{\mathsf{T}}Ax>0 \quad\text{for every } x\neq0.
$$

If only $f(x)\ge0$ is required, the form is positive semidefinite.

Checking the definition directly is hopeless, since there are infinitely many $x$. Fortunately positive definiteness is decided by the internal structure of the matrix, and there are three standard tests:

1. all eigenvalues of $A$ are positive;
2. all leading principal minors of $A$ are positive;
3. $A$ is congruent to the identity, that is, $A=C^{\mathsf{T}}C$ for some invertible $C$.

The first follows from orthogonal diagonalisation: $f=\lambda_1y_1^2+\cdots+\lambda_ny_n^2$ is always positive exactly when every coefficient is. The second is Sylvester's criterion; it avoids the characteristic equation and works from determinants of the top-left corners. The third says a positive definite matrix is the identity matrix in disguise.

## Intuition

The graph of a positive definite form is a bowl opening upward. Leaving the origin in any direction raises the value.

The eigenvalue test says the bowl curves upward along every principal axis. One downward axis would immediately produce negative values along that direction, and positive definiteness would fail.

The leading-minor test is a floor-by-floor inspection: first $a_{11}>0$, then the $2\times2$ top-left determinant, then the $3\times3$, and so on. Each level asks whether the new dimension has flipped the bowl over. Only when every level passes is the bowl genuine.

Positive semidefinite allows flat directions: the bottom may be a trough or a plane, and values never drop below zero without being strictly positive. Eigenvalues may vanish, the leading minors need only be nonnegative, and all principal minors must be checked as well.

## Worked by hand

Decide whether

$$
f=2x_1^2+2x_2^2+2x_3^2-2x_1x_2-2x_2x_3
$$

is positive definite.

Its matrix is

$$
A=\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}.
$$

Apply Sylvester's criterion and compute the three leading principal minors.

First order:

$$
D_1=2>0.
$$

Second order:

$$
D_2=\begin{vmatrix}2&-1\\-1&2\end{vmatrix}=4-1=3>0.
$$

Third order:

$$
D_3=\begin{vmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{vmatrix}
=2\begin{vmatrix}2&-1\\-1&2\end{vmatrix}-(-1)\begin{vmatrix}-1&-1\\0&2\end{vmatrix}
=2\times3-2=4>0.
$$

All three are positive, so the form is positive definite.

Cross-check with the eigenvalues. Put $t=2-\lambda$; then

$$
|A-\lambda E|=\begin{vmatrix}t&-1&0\\-1&t&-1\\0&-1&t\end{vmatrix}
=t(t^2-1)-t=t^3-2t=t(t^2-2).
$$

Thus $t=0$ or $t=\pm\sqrt2$, giving

$$
\lambda_1=2,\qquad \lambda_2=2-\sqrt2,\qquad \lambda_3=2+\sqrt2.
$$

These are approximately $0.586$, $2$, and $3.414$, all positive, matching the minor test. Their product is $2(2-\sqrt2)(2+\sqrt2)=4$, exactly $D_3$.

## Three misconceptions

> [!MYTH] If every entry is positive, the form is positive definite.
> Signs depend on the whole matrix, not on individual cells. $\begin{pmatrix}1&2\\2&1\end{pmatrix}$ has all entries positive but eigenvalues $3,-1$, so it is indefinite. Conversely $\begin{pmatrix}1&-2\\-2&5\end{pmatrix}$ has a negative entry and minors $1,1$, so it is positive definite.

> [!MYTH] A positive determinant makes a matrix positive definite.
> $\begin{pmatrix}-1&0\\0&-1\end{pmatrix}$ has determinant $1$ but is negative definite. In two dimensions you also need a positive trace; in general you need all eigenvalues positive or all leading minors positive.

> [!MYTH] Nonnegative leading minors are enough for positive semidefiniteness.
> Positive semidefiniteness requires **all** principal minors to be nonnegative, not just the leading ones. $\begin{pmatrix}0&0\\0&-1\end{pmatrix}$ has leading minors $0,0$ but gives $f=-x_2^2$, which is not semidefinite.

## Practice

> [!PRACTICE] 1 · Two by two
> Decide whether $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ is positive definite.
>
> > [!ANSWER] Answer
> > $D_1=2>0$ and $D_2=4-1=3>0$, so it is positive definite. Its eigenvalues $3$ and $1$ are also positive.

> [!PRACTICE] 2 · Parameter range
> For which $t$ is $A=\begin{pmatrix}1&t\\t&1\end{pmatrix}$ positive definite?
>
> > [!ANSWER] Answer
> > We need $D_1=1>0$ and $D_2=1-t^2>0$, hence $|t|<1$. Then both eigenvalues $1+t$ and $1-t$ are positive.

> [!PRACTICE] 3 · Semidefinite
> Classify $A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$.
>
> > [!ANSWER] Answer
> > $f=x_1^2\ge0$, but it is not strictly positive: $x=(0,1)^{\mathsf{T}}$ gives $f=0$. So the form is positive semidefinite, not positive definite.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be a real symmetric $n\times n$ matrix and $f(x)=x^{\mathsf{T}}Ax$. $A$ is positive definite if $f(x)>0$ for every $x\neq0$. The following are equivalent: all eigenvalues of $A$ are positive; all leading principal minors of $A$ are positive (Sylvester's criterion); $A$ is congruent to $E$, meaning $A=C^{\mathsf{T}}C$ for some invertible $C$; the positive inertia index is $p=n$. If only $f(x)\ge0$ is required, $A$ is positive semidefinite, equivalently all eigenvalues are nonnegative, all principal minors are nonnegative, or $A=C^{\mathsf{T}}C$ for some, not necessarily invertible, $C$.
