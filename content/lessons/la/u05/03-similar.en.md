---
slug: "similar"
subject: "la"
unit: "u05"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "Similar Matrices"
subtitle: "Two descriptions of one transformation"
minutes: 13
meta: ["13 min read","Requires eigenvalues","Mastery level"]
concepts: ["similar", "eigens"]
prereq: ["eigens"]
related: ["coordchange", "quadratic"]
---

## Goal

By the end of this lecture you can decide whether two matrices are similar, list the quantities that similarity preserves, and determine whether a matrix is diagonalisable. When it is, you can write down the transition matrix $P$.

Everything rests on one sentence: similar matrices are the same linear map written in two bases.

## Three-line recap

- An eigenvalue describes how much the map stretches a particular direction.
- Keep the map and change the basis; the matrix changes, but the map does not.
- The open question: which matrices can be rewritten as diagonal ones, and how do we find the basis that does it?

## The problem

A matrix is not the map itself; it is the map written in coordinates relative to a chosen basis. Change the basis and the matrix changes. So the natural question is: what exactly separates two descriptions of the same map?

The answer is an invertible matrix. If $A$ is the old matrix, $B$ the new one, and $P$ the transition matrix between the bases, then

$$
B=P^{-1}AP.
$$

Matrices related this way are called similar, written $A\sim B$. Each column of $P$ is a new basis vector expressed in the old basis.

Since only the description changed, anything intrinsic should survive. The characteristic polynomial leads the way:

$$
|B-\lambda E|=|P^{-1}AP-\lambda E|=|P^{-1}(A-\lambda E)P|=|A-\lambda E|.
$$

The factors $|P^{-1}|$ and $|P|$ cancel. Hence similar matrices share the characteristic polynomial, the eigenvalues, the trace, the determinant, and the rank.

## Intuition

Think of a matrix as a manual and a basis as a language. The same machine written in Chinese and in English is still the same machine.

Changing basis is translation. Translation does not alter the machine's parameters, only the page they are written on. So eigenvalues, determinant, and rank must agree.

Which description is easiest? The diagonal one. A diagonal matrix stretches each coordinate axis independently, with no cross-talk. If a map has a basis in which every basis vector is only stretched, never turned, that basis consists of eigenvectors and the matrix becomes diagonal.

So "diagonalisable" translates to: **there are $n$ linearly independent eigenvectors**. Put them as columns of $P$, and

$$
P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

## Worked by hand

Decide whether

$$
A=\begin{pmatrix}3&1\\0&2\end{pmatrix}
$$

is diagonalisable, and write $P$ if it is.

The matrix is upper triangular, so the eigenvalues sit on the diagonal: $\lambda_1=3$, $\lambda_2=2$.

For $\lambda=3$,

$$
A-3E=\begin{pmatrix}0&1\\0&-1\end{pmatrix},
$$

so $x_2=0$ and $p_1=(1,0)^{\mathsf{T}}$. For $\lambda=2$,

$$
A-2E=\begin{pmatrix}1&1\\0&0\end{pmatrix},
$$

so $x_1+x_2=0$ and $p_2=(1,-1)^{\mathsf{T}}$. Distinct eigenvalues give independent eigenvectors, so the matrix is diagonalisable.

Take

$$
P=(p_1,p_2)=\begin{pmatrix}1&1\\0&-1\end{pmatrix},\qquad
P^{-1}=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
$$

Check directly:

$$
AP=\begin{pmatrix}3&1\\0&2\end{pmatrix}\begin{pmatrix}1&1\\0&-1\end{pmatrix}
=\begin{pmatrix}3&2\\0&-2\end{pmatrix},
$$

$$
P^{-1}AP=\begin{pmatrix}1&1\\0&-1\end{pmatrix}\begin{pmatrix}3&2\\0&-2\end{pmatrix}
=\begin{pmatrix}3&0\\0&2\end{pmatrix}.
$$

The diagonal entries are exactly the eigenvalues. By contrast, $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has only $\lambda=1$, and $A-E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has rank $1$, so its eigenspace is one-dimensional. There are not enough independent eigenvectors, and it is not diagonalisable.

## Three misconceptions

> [!MYTH] Similar means equal, or at least visually alike.
> Similar matrices often look nothing alike. $\begin{pmatrix}3&0\\0&2\end{pmatrix}$ and $\begin{pmatrix}3&1\\0&2\end{pmatrix}$ are similar, yet only one is diagonal. Similarity is about the same map, not the same list of numbers.

> [!MYTH] Similar matrices have the same eigenvectors.
> The eigenvalues agree, but eigenvectors move with the basis. If $Ax=\lambda x$, then $B(P^{-1}x)=\lambda(P^{-1}x)$: the new eigenvector is the old one written in the new coordinates.

> [!MYTH] Having $n$ eigenvalues counted with multiplicity guarantees diagonalisability.
> Repeated roots can have too small a geometric multiplicity. $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has the eigenvalue $1$ twice but only one independent eigenvector, so it still fails.

## Practice

> [!PRACTICE] 1 · Invariants
> If $B=P^{-1}AP$, prove $|B|=|A|$ and $\operatorname{tr}(B)=\operatorname{tr}(A)$.
>
> > [!ANSWER] Answer
> > $|B|=|P^{-1}||A||P|=|A|$. For the trace use $\operatorname{tr}(XY)=\operatorname{tr}(YX)$: $\operatorname{tr}(P^{-1}AP)=\operatorname{tr}(APP^{-1})=\operatorname{tr}(A)$.

> [!PRACTICE] 2 · Write the transition matrix
> Diagonalise $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$.
>
> > [!ANSWER] Answer
> > The eigenvalues are $3$ and $-1$, with eigenvectors $(1,1)^{\mathsf{T}}$ and $(1,-1)^{\mathsf{T}}$. Take $P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$; then $P^{-1}AP=\operatorname{diag}(3,-1)$.

> [!PRACTICE] 3 · Show failure
> Explain why $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ is not diagonalisable.
>
> > [!ANSWER] Answer
> > The only eigenvalue is $\lambda=1$. Since $A-E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has rank $1$, the eigenspace has dimension $1$, not two, so no basis of eigenvectors exists.

## Formal statement

> [!FORMAL] Formal statement
> Let $A$ and $B$ be $n\times n$ matrices. They are similar if some invertible $P$ satisfies $B=P^{-1}AP$. Similarity is an equivalence relation, and similar matrices share characteristic polynomial, eigenvalues, trace, determinant, and rank. $A$ is diagonalisable exactly when it has $n$ linearly independent eigenvectors; stacking them as columns of $P$ gives $P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$. Equivalently, every eigenvalue's geometric multiplicity equals its algebraic multiplicity.
