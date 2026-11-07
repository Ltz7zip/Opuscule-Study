---
slug: "diagonalize"
subject: "la"
unit: "u05"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Linear Algebra · Mastery"
title: "Diagonalising Symmetric Matrices"
subtitle: "An orthogonal matrix flattens a symmetric one"
minutes: 14
meta: ["14 min read","Requires similar matrices and inner products","Mastery level"]
concepts: ["similar", "innerprod"]
prereq: ["similar", "innerprod"]
related: ["quadratic", "eigens"]
---

## Goal

By the end of this lecture you can explain why a real symmetric matrix is always diagonalisable, why its eigenvectors can be chosen pairwise orthogonal, and you can orthogonally diagonalise a $2\times2$ symmetric matrix by hand.

At the end you will have the factorisation $A=Q\Lambda Q^{\mathsf{T}}$, the direct tool for the standard form of a quadratic form next lecture.

## Three-line recap

- Similar matrices are one map in two bases, so their eigenvalues coincide.
- Diagonalisable means $n$ linearly independent eigenvectors.
- Zero inner product means orthogonal; an orthogonal matrix satisfies $Q^{\mathsf{T}}Q=E$ and preserves lengths and angles.

## The problem

A general real matrix can fail in two ways: its eigenvalues may leave the real line, and repeated roots may not supply enough eigenvectors.

Real symmetric matrices remove both problems at once, with two surprisingly strong facts:

- all eigenvalues are real;
- eigenvectors belonging to distinct eigenvalues are automatically orthogonal.

The second fact deserves a proof. Suppose $Ap_1=\lambda_1p_1$, $Ap_2=\lambda_2p_2$, and $A^{\mathsf{T}}=A$. Then

$$
\lambda_1(p_1,p_2)=(Ap_1,p_2)=(p_1,Ap_2)=\lambda_2(p_1,p_2).
$$

The middle step uses symmetry. Rearranging gives $(\lambda_1-\lambda_2)(p_1,p_2)=0$, so if $\lambda_1\neq\lambda_2$ then $(p_1,p_2)=0$.

Eigenvectors from different eigenvalues are therefore already orthogonal. Inside a repeated eigenspace, run Gram–Schmidt on any basis. Normalise everything and put the vectors as columns of $Q$:

$$
Q^{\mathsf{T}}AQ=\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\qquad
A=Q\Lambda Q^{\mathsf{T}}.
$$

## Intuition

A symmetric matrix represents a self-adjoint map: its action in one direction mirrors its action in the opposite direction. Geometrically it squashes the unit sphere into an ellipsoid, and the principal axes of that ellipsoid are mutually perpendicular.

Diagonalising means finding those axes. The columns of $Q$ are the axis directions, and the diagonal entries of $\Lambda$ are the corresponding stretch factors. Because the axes are perpendicular by nature, $Q$ is orthogonal for free.

Written as $A=\sum_i\lambda_iq_iq_i^{\mathsf{T}}$, the map is a sum of independent axis actions. Each $q_iq_i^{\mathsf{T}}$ is a rank-one projector onto the $i$-th axis, scaled by its eigenvalue.

## Worked by hand

Take

$$
A=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

It is symmetric. The characteristic equation is

$$
|A-\lambda E|=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-3)(\lambda-1)=0,
$$

so $\lambda_1=3$ and $\lambda_2=1$.

For $\lambda=3$,

$$
A-3E=\begin{pmatrix}-1&-1\\-1&-1\end{pmatrix},
$$

which gives $x_1+x_2=0$; take $p_1=(1,-1)^{\mathsf{T}}$. For $\lambda=1$,

$$
A-E=\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
$$

which gives $x_1-x_2=0$; take $p_2=(1,1)^{\mathsf{T}}$. Their inner product is $1-1=0$, so they are orthogonal.

Normalise:

$$
q_1=\frac{1}{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix},\qquad
q_2=\frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix},\qquad
Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}.
$$

Check $Q^{\mathsf{T}}Q=E$: both columns have length $1$ and inner product $0$. Now check the diagonalisation:

$$
Aq_1=\frac{1}{\sqrt2}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}
=\frac{3}{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix}=3q_1,
$$

and similarly $Aq_2=q_2$. Hence $Q^{\mathsf{T}}AQ=\operatorname{diag}(3,1)$. Finally verify the spectral decomposition:

$$
3q_1q_1^{\mathsf{T}}+1q_2q_2^{\mathsf{T}}
=\frac32\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
+\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}
=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
$$

## Three misconceptions

> [!MYTH] Every real matrix can be orthogonally diagonalised.
> Only real symmetric matrices carry that guarantee. $\begin{pmatrix}1&1\\0&2\end{pmatrix}$ has real eigenvalues $1,2$, but its eigenvectors are not orthogonal, so no orthogonal $Q$ makes $Q^{\mathsf{T}}AQ$ diagonal.

> [!MYTH] Eigenvectors of a symmetric matrix are always pairwise orthogonal.
> Only eigenvectors from distinct eigenvalues are automatically orthogonal. For a repeated eigenvalue you may pick any basis of its eigenspace, and that basis need not be orthogonal until you run Gram–Schmidt.

> [!MYTH] An orthogonal matrix is any matrix with determinant $1$.
> An orthogonal matrix has determinant $\pm1$; the converse fails. $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has determinant $1$ but its columns are not orthogonal.

## Practice

> [!PRACTICE] 1 · Orthogonal diagonalisation
> Orthogonally diagonalise $A=\begin{pmatrix}1&1\\1&1\end{pmatrix}$.
>
> > [!ANSWER] Answer
> > The eigenvalues are $2$ and $0$, with eigenvectors $(1,1)^{\mathsf{T}}$ and $(1,-1)^{\mathsf{T}}$. Take $Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$; then $Q^{\mathsf{T}}AQ=\operatorname{diag}(2,0)$.

> [!PRACTICE] 2 · Write it down
> Let $A$ be a $3\times3$ real symmetric matrix with eigenvalues $-2,5,5$. Write $Q^{\mathsf{T}}AQ$.
>
> > [!ANSWER] Answer
> > $\operatorname{diag}(-2,5,5)$, with the columns of $Q$ ordered accordingly. The two eigenvectors for the repeated eigenvalue $5$ still need orthogonalising inside their eigenspace.

> [!PRACTICE] 3 · Check orthogonality
> Decide whether $Q=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ is orthogonal and compute $\det Q$.
>
> > [!ANSWER] Answer
> > Both columns have length $1$ and inner product $\frac12(1-1)=0$, so $Q^{\mathsf{T}}Q=E$ and $Q$ is orthogonal. $\det Q=\frac12(-1-1)=-1$.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be a real $n\times n$ symmetric matrix. Then all eigenvalues of $A$ are real, and eigenvectors belonging to distinct eigenvalues are orthogonal. There exists an orthogonal matrix $Q$ with $Q^{\mathsf{T}}AQ=\Lambda$, where $\Lambda$ is a real diagonal matrix; equivalently $A=Q\Lambda Q^{\mathsf{T}}=\sum_{i=1}^{n}\lambda_iq_iq_i^{\mathsf{T}}$, with $q_i$ the columns of $Q$. This is the spectral theorem for real symmetric matrices.
