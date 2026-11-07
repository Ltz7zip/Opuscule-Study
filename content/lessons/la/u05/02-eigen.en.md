---
slug: "eigen"
subject: "la"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Eigenvalues and Eigenvectors"
subtitle: "Directions that refuse to turn"
minutes: 15
meta: ["15 min read","Requires determinants","Mastery level"]
concepts: ["eigens", "det"]
prereq: ["det"]
related: ["similar", "quadratic"]
---

## Goal

By the end of this lecture you can write the characteristic equation $|A-\lambda E|=0$, compute the eigenvalues of $2\times2$ and $3\times3$ matrices by hand, and find eigenvectors for each one.

More importantly, you should be able to read what an eigenvalue means: how much a direction is stretched or compressed, while the direction itself stays put.

## Three-line recap

- A zero determinant means the matrix crushes some nonzero vector to zero, which also means it is not invertible.
- Linear dependence means one vector in the set is a combination of the others.
- A matrix is a linear map that moves the whole space somewhere else.

## The problem

Most vectors change direction when a linear map is applied. But some special directions are only stretched or compressed; they never turn.

Those are the eigenvectors, and the stretch factors are the eigenvalues. Finding them amounts to finding the skeleton of the map: in a basis made of eigenvectors the matrix becomes diagonal, and the action is just independent scaling along each direction.

The condition is a single equation:

$$
A x=\lambda x,\qquad x\neq 0.
$$

Move everything to one side: $(A-\lambda E)x=0$. For this homogeneous system to have a nonzero solution, the coefficient matrix must be singular, so

$$
|A-\lambda E|=0.
$$

That is the characteristic equation. It is a polynomial equation of degree $n$ in $\lambda$; its roots are the eigenvalues. Substituting each $\lambda$ back and solving $(A-\lambda E)x=0$ gives the eigenvectors.

## Intuition

Picture the matrix as a machine. A vector goes in and another comes out. Most vectors come out pointing somewhere else; eigenvectors come out on the same line, only longer or shorter.

The sign of the eigenvalue matters too: positive means same direction, negative means reversed, zero means the direction is flattened. So one zero eigenvalue is enough to make a matrix singular, because some nonzero direction has been crushed.

Two checks cost almost nothing:

$$
\lambda_1+\lambda_2+\cdots+\lambda_n=\operatorname{tr}(A),\qquad
\lambda_1\lambda_2\cdots\lambda_n=|A|.
$$

The eigenvalues sum to the trace and multiply to the determinant. After computing them by hand, compare against these two identities; most arithmetic slips show up immediately.

## Worked by hand

Start with a $2\times2$ example:

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

The characteristic equation is

$$
|A-\lambda E|=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-1)(\lambda-3)=0,
$$

so $\lambda_1=1$ and $\lambda_2=3$. For $\lambda=1$,

$$
A-E=\begin{pmatrix}1&1\\1&1\end{pmatrix},
$$

which forces $x_1+x_2=0$; take $x=(1,-1)^{\mathsf{T}}$. For $\lambda=3$,

$$
A-3E=\begin{pmatrix}-1&1\\1&-1\end{pmatrix},
$$

which forces $x_1=x_2$; take $x=(1,1)^{\mathsf{T}}$. The checks hold: trace $=4=1+3$ and determinant $=3=1\times3$.

Now a $3\times3$ example:

$$
A=\begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}.
$$

$$
|A-\lambda E|=\begin{vmatrix}-\lambda&1&1\\1&-\lambda&1\\1&1&-\lambda\end{vmatrix}
=-\lambda(\lambda^2-1)+(\lambda+1)+(\lambda+1)
=-\lambda^3+3\lambda+2.
$$

Setting it to zero gives $\lambda^3-3\lambda-2=0$, and

$$
\lambda^3-3\lambda-2=(\lambda-2)(\lambda+1)^2.
$$

The eigenvalues are $2,-1,-1$. For $\lambda=2$, every row of $A-2E$ says $x_1=x_2=x_3$, so take $(1,1,1)^{\mathsf{T}}$. For $\lambda=-1$, the matrix $A+E$ has every entry equal to $1$: one equation $x_1+x_2+x_3=0$, with two independent solutions $(1,-1,0)^{\mathsf{T}}$ and $(1,0,-1)^{\mathsf{T}}$.

Check: trace $=0=2-1-1$ and determinant $=2=2\times(-1)\times(-1)$.

## Three misconceptions

> [!MYTH] A real matrix always has real eigenvalues.
> The $90^\circ$ rotation $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ has characteristic equation $\lambda^2+1=0$, so its eigenvalues are $\pm\mathrm{i}$. Real matrices can certainly have complex eigenvalues.

> [!MYTH] An $n\times n$ matrix always has $n$ independent eigenvectors.
> Repeated roots can fail to supply enough. $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has only $\lambda=1$, and $A-E$ has rank $1$, leaving a single independent eigenvector.

> [!MYTH] The zero vector counts as an eigenvector.
> The definition requires $x\neq 0$. The zero vector satisfies $A0=\lambda0$ for every $\lambda$, and allowing it would make the notion meaningless.

## Practice

> [!PRACTICE] 1 · Upper triangular
> Find the eigenvalues and eigenvectors of $A=\begin{pmatrix}1&1\\0&2\end{pmatrix}$.
>
> > [!ANSWER] Answer
> > $|A-\lambda E|=(1-\lambda)(2-\lambda)$, so the eigenvalues are $1,2$. For $\lambda=1$, $x_2=0$ and $(1,0)^{\mathsf{T}}$ works; for $\lambda=2$, $x_1=x_2$ and $(1,1)^{\mathsf{T}}$ works.

> [!PRACTICE] 2 · Trace and determinant check
> Find the eigenvalues of $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$.
>
> > [!ANSWER] Answer
> > Trace $6$ and determinant $8$, so $\lambda^2-6\lambda+8=0$ gives $\lambda=4,2$. The eigenvectors are $(1,1)^{\mathsf{T}}$ and $(1,-1)^{\mathsf{T}}$.

> [!PRACTICE] 3 · Zero eigenvalue
> Prove that $\lambda=0$ is an eigenvalue of $A$ exactly when $A$ is singular.
>
> > [!ANSWER] Answer
> > $\lambda=0$ is an eigenvalue iff some $x\neq0$ satisfies $Ax=0$, iff the homogeneous system has a nonzero solution, iff $|A|=0$, iff $A$ is not invertible.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ be a real $n\times n$ matrix. If a scalar $\lambda$ and a nonzero vector $x$ satisfy $Ax=\lambda x$, then $\lambda$ is an eigenvalue and $x$ an eigenvector belonging to it. Eigenvalues are the roots of the characteristic polynomial $p(\lambda)=|A-\lambda E|$; the eigenvectors for $\lambda$, together with zero, form the eigenspace $N(A-\lambda E)$. Expanding $p$ shows that the coefficient of $\lambda^{n-1}$ is $-\operatorname{tr}(A)$ and the constant term is $(-1)^n|A|$, hence the sum and product identities above.
