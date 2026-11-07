---
slug: "cont-def"
subject: "analysis"
unit: "u03"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Continuity and Discontinuities"
subtitle: "When the limit lands exactly on the value"
minutes: 15
meta: ["15 min read","Requires limits of functions","Mastery level"]
concepts: ["cont", "funclim"]
prereq: ["funclim"]
related: ["contprop", "deriv"]
---

## Goals

Continuity is one sentence: the limit equals the value. That sentence packs three requirements—$f$ is defined at $x_0$, the limit exists, and the two agree. Fail any one and a discontinuity appears.

By the end you can prove continuity with $\varepsilon$–$\delta$, classify discontinuities into four types with examples, and solve for constants using continuity.

## Three-line recap

- $f$ is continuous at $x_0$ if $\lim_{x\to x_0}f(x)=f(x_0)$; equivalently $\Delta y\to 0$ as $\Delta x\to 0$.
- Discontinuities split into two kinds: first kind when both one-sided limits exist (removable, jump), second kind otherwise (infinite, oscillatory).
- Elementary functions are continuous on their domains, which is the most-used fact in limit computations.

## Defining continuity

Let $f$ be defined on a neighbourhood of $x_0$. It is continuous at $x_0$ if

$$
\lim_{x\to x_0}f(x)=f(x_0).
$$

In $\varepsilon$–$\delta$ form: for every $\varepsilon>0$ there is $\delta>0$ such that $|x-x_0|<\delta$ implies

$$
|f(x)-f(x_0)|<\varepsilon .
$$

Unlike the definition of a limit, there is no $0<$, because $x=x_0$ must also qualify, and $f(x_0)$ must exist.

With $\Delta x = x-x_0$ and $\Delta y = f(x_0+\Delta x)-f(x_0)$, continuity becomes

$$
\lim_{\Delta x\to 0}\Delta y = 0 .
$$

A small change in the input produces a small change in the output; that is the whole content of the word.

Restricting to one side gives left and right continuity. A function is continuous at $x_0$ iff it is both left- and right-continuous there.

## Four types of discontinuity

Assume $f$ is defined on a punctured neighbourhood of $x_0$ but is not continuous there.

**Removable.** The limit exists but differs from $f(x_0)$, or $f(x_0)$ is undefined. For $f(x)=\dfrac{x^2-1}{x-1}$ at $x=1$ the limit is $2$ while the value is missing. Defining $f(1)=2$ repairs it.

**Jump.** Both one-sided limits exist but differ. The sign function at $0$ has left limit $-1$ and right limit $1$.

Removable and jump discontinuities form the first kind: both one-sided limits exist and are finite.

**Infinite.** At least one one-sided limit is infinite. $\dfrac{1}{x}$ tends to $-\infty$ and $+\infty$ on the two sides of $0$.

**Oscillatory.** At least one one-sided limit fails to exist without tending to infinity. $\sin\dfrac{1}{x}$ oscillates between $-1$ and $1$ infinitely often near $0$.

The last two form the second kind.

## Elementary functions and local properties

Polynomials, rational functions, exponentials, logarithms, trigonometric and inverse trigonometric functions are continuous on their domains. Sums, products, quotients, and compositions preserve continuity, so every elementary function is continuous on its domain. Limits at interior points can therefore be evaluated by substitution.

Three local properties are used constantly. Local boundedness: a function continuous at $x_0$ is bounded on some neighbourhood. Sign preservation: if $f(x_0)>0$, then $f(x)>0$ on some neighbourhood. Closure: sums, products, quotients, and compositions of continuous functions are continuous.

Sign preservation turns information at a single point into information on a whole interval, which is why it appears in almost every existence proof later.

## Three misconceptions

> [!MYTH] Continuous functions are differentiable.
> $f(x)=|x|$ is continuous at $0$, but its left and right derivatives there are $-1$ and $1$, so it is not differentiable. Continuity prevents jumps, not corners.

> [!MYTH] If the limit exists, the function is continuous.
> The limit must also equal the value. $\dfrac{x^2-1}{x-1}$ has a limit at $1$ but no value there; this is a removable discontinuity, repaired only by defining the point.

> [!MYTH] Piecewise functions are discontinuous.
> Piecewise is a way of writing, not a defect. $f(x)=|x|$ is written as $x$ for $x\ge 0$ and $-x$ for $x<0$; both one-sided limits at $0$ are $0$, matching the value, so it is continuous.

## Practice

> [!PRACTICE] 1 · Removable
> Classify $f(x)=\dfrac{x^2-4}{x-2}$ at $x=2$ and repair it.
>
> > [!ANSWER] Show answer
> > Cancelling gives $f(x)=x+2$ for $x\ne 2$, so the limit is $4$, while $f(2)$ is undefined. This is removable; setting $f(2)=4$ makes it continuous.

> [!PRACTICE] 2 · Jump
> For $f(x)=\begin{cases}x, & x\ge 0\\ x+1, & x<0\end{cases}$, discuss $x=0$.
>
> > [!ANSWER] Show answer
> > The right limit is $0$ and the left limit is $1$. They differ, so this is a jump discontinuity.

> [!PRACTICE] 3 · Oscillation
> Discuss $f(x)=\sin\dfrac{1}{x}$ at $x=0$.
>
> > [!ANSWER] Show answer
> > Along $x_n=1/(n\pi)$ the values are $0$; along $y_n=1/(2n\pi+\pi/2)$ they are $1$. No limit exists and it is not infinite, so this is an oscillatory discontinuity of the second kind.

> [!PRACTICE] 4 · Unknown constant
> Let $f(x)=\dfrac{\sin ax}{x}$ for $x\ne 0$ and $f(0)=3$. Find $a$ making $f$ continuous at $0$.
>
> > [!ANSWER] Show answer
> > Since $\sin ax\sim ax$, the limit is $a$. Continuity forces $a=3$.

> [!FORMAL] Formal statement
> $f$ is continuous at $x_0$ if $\forall\varepsilon>0\ \exists\delta>0\ \forall x\in D$, $|x-x_0|<\delta \Rightarrow |f(x)-f(x_0)|<\varepsilon$. Equivalently, $\lim_{x\to x_0}f(x)=f(x_0)$ and $f(x_0)$ is defined. Discontinuities are classified by one-sided limits: both finite gives the first kind (removable or jump); otherwise the second kind (infinite or oscillatory). Elementary functions are continuous on their domains.
