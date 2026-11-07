---
slug: "complete-square"
subject: "la"
unit: "u05"
order: 6
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Linear Algebra · Mastery"
title: "Reducing by Completing the Square"
subtitle: "A route that avoids eigenvalues"
minutes: 13
meta: ["13 min read","Requires quadratic forms","Mastery level"]
concepts: ["quadratic"]
prereq: ["quadratic"]
related: ["positivedef", "similar"]
---

## Goal

By the end of this lecture you can reduce a quadratic form to standard form by completing the square, without computing eigenvalues, and write down the invertible linear change that does it.

You need two cases: a square term is available to grab, or every square coefficient is zero and you must manufacture one first.

## Three-line recap

- A quadratic form is $x^{\mathsf{T}}Ax$ with $A$ symmetric.
- Congruence $B=C^{\mathsf{T}}AC$ preserves rank and inertia indices.
- The standard form is not unique, but the numbers of positive and negative squares are.

## The problem

Orthogonal diagonalisation is elegant, but it demands the characteristic equation first. For a three- or four-variable hand computation, finding eigenvalues can cost more than the reduction itself.

Completing the square is another route: elementary algebra absorbs cross terms into perfect squares one by one. Each step is an invertible change of coordinates, so the result stays congruent to the original form and the inertia indices are automatically correct.

The procedure is fixed:

1. Pick a variable with a nonzero square coefficient and gather every term containing it into one perfect square.
2. Repeat on the remainder with the next variable.
3. Express the new variables in terms of the old ones and confirm the change is invertible.

If every square coefficient is zero but some cross term $2a_{12}x_1x_2$ is not, begin with

$$
x_1=y_1+y_2,\qquad x_2=y_1-y_2,
$$

so that $2a_{12}x_1x_2=2a_{12}(y_1^2-y_2^2)$ and squares appear.

## Intuition

Completing the square is bookkeeping: collect scattered cross terms into one bracket. The expression $x_1^2+2x_1x_2$ looks untidy, but it is part of $(x_1+x_2)^2-x_2^2$: add an $x_2^2$ to form the square, then subtract the extra.

Each completion removes all cross terms between one variable and the rest. There are finitely many variables, so the process stops, and what remains contains only squares.

In matrix language, completing the square is a sequence of congruence transformations with invertible $C$ that drives $A$ toward a diagonal matrix. The $C$ need not be orthogonal, so lengths are not preserved, but the inertia indices are, and those are what we actually care about.

## Worked by hand

Reduce

$$
f=x_1^2+2x_2^2+3x_3^2+2x_1x_2+2x_1x_3.
$$

Start with $x_1$. All terms containing it are $x_1^2+2x_1x_2+2x_1x_3$, and

$$
(x_1+x_2+x_3)^2=x_1^2+x_2^2+x_3^2+2x_1x_2+2x_1x_3+2x_2x_3.
$$

Subtracting this from $f$ leaves

$$
f-(x_1+x_2+x_3)^2=x_2^2+2x_3^2-2x_2x_3.
$$

Now complete the square in $x_2$:

$$
x_2^2-2x_2x_3+2x_3^2=(x_2-x_3)^2+x_3^2.
$$

Therefore

$$
f=(x_1+x_2+x_3)^2+(x_2-x_3)^2+x_3^2.
$$

Set

$$
y_1=x_1+x_2+x_3,\qquad y_2=x_2-x_3,\qquad y_3=x_3.
$$

Then $f=y_1^2+y_2^2+y_3^2$. Solving back,

$$
x_3=y_3,\qquad x_2=y_2+y_3,\qquad x_1=y_1-y_2-2y_3,
$$

so

$$
C=\begin{pmatrix}1&-1&-2\\0&1&1\\0&0&1\end{pmatrix},\qquad |C|=1\neq0.
$$

The change is indeed invertible. The positive index is $p=3$, the negative index $q=0$, and the form is positive definite.

Now an example with no square terms at all:

$$
f=2x_1x_2+x_3^2.
$$

Put $x_1=y_1+y_2$, $x_2=y_1-y_2$, $x_3=y_3$. Then

$$
f=2(y_1^2-y_2^2)+y_3^2=2y_1^2-2y_2^2+y_3^2.
$$

Here $p=2$, $q=1$, and the rank is $3$. The transformation matrix has determinant $-2$, so it is invertible.

## Three misconceptions

> [!MYTH] The variables must be completed in the order $x_1,x_2,x_3$.
> Any order works. Pick whichever variable is convenient; as long as each step eliminates the cross terms between one variable and the rest, the reduction reaches standard form.

> [!MYTH] The resulting standard form is unique.
> It is not. Starting with $x_1$ or with $x_2$ can produce different coefficients, but the counts of positive and negative squares never change. That is the law of inertia.

> [!MYTH] Completing the square only works for positive definite forms.
> It works for every quadratic form, indefinite and degenerate included. Negative or zero coefficients simply record different inertia indices.

## Practice

> [!PRACTICE] 1 · Two variables
> Reduce $f=x_1^2+4x_1x_2+3x_2^2$ to standard form.
>
> > [!ANSWER] Answer
> > $f=(x_1+2x_2)^2-x_2^2$. With $y_1=x_1+2x_2$ and $y_2=x_2$, this is $y_1^2-y_2^2$, so $p=1$ and $q=1$.

> [!PRACTICE] 2 · No square terms
> Reduce $f=x_1x_2$ to standard form.
>
> > [!ANSWER] Answer
> > Set $x_1=y_1+y_2$ and $x_2=y_1-y_2$; then $f=y_1^2-y_2^2$. The matrix $\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ has determinant $-2$, so the change is invertible.

> [!PRACTICE] 3 · Read the indices
> What are the inertia indices and rank of the main example $f=(x_1+x_2+x_3)^2+(x_2-x_3)^2+x_3^2$?
>
> > [!ANSWER] Answer
> > All three squares have coefficient $1$, so $p=3$, $q=0$, and the rank is $3$. The form is positive definite.

## Formal statement

> [!FORMAL] Formal statement
> Let $f(x)=x^{\mathsf{T}}Ax$ be a quadratic form in $n$ variables with $A$ real symmetric. Finitely many completions of the square, each an invertible linear change, bring $f$ to the standard form $d_1y_1^2+\cdots+d_ny_n^2$, where some $d_i$ may be zero. If at some stage all remaining square coefficients vanish while a cross term $a_{ij}x_ix_j\neq0$ remains, first use $x_i=y_i+y_j$ and $x_j=y_i-y_j$ to create squares. The process is equivalent to finding an invertible $C$ with $C^{\mathsf{T}}AC$ diagonal; the numbers of positive and negative coefficients are the inertia indices and do not depend on the order of completion.
