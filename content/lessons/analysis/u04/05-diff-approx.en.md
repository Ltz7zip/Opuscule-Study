---
slug: "diff-approx"
subject: "analysis"
unit: "u04"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Differentials and Linear Approximation"
subtitle: "Replace a curve by a line"
minutes: 14
meta: ["14 min read","Requires higher derivatives","Mastery level"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["taylor", "mvt"]
---

## Goal

A derivative is the slope of the tangent; a differential is the small step taken along that tangent. The factor $dx$ is exactly what makes the differential usable for numerical estimates.

By the end you can write $dy=f'(x)\,dx$, explain invariance of form, and estimate quantities such as $\sqrt{1.02}$ and $\ln 1.01$ together with the order of the error.

## Three-line recap

- If $\Delta y=f'(x_0)\Delta x+o(\Delta x)$, then $f$ is differentiable at $x_0$ and the linear part $dy=f'(x_0)\,dx$ is the differential.
- Differentiability and having a derivative are equivalent, and $dy=f'(x_0)\,dx$: the differential depends on $dx$, the derivative is just a number.
- Linear approximation $f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\Delta x$ has an error of smaller order than $\Delta x$.

## From increment to differential

Let $y=f(x)$ be differentiable at $x_0$. Give $x_0$ an increment $\Delta x$; the increment of the function is

$$
\Delta y=f(x_0+\Delta x)-f(x_0).
$$

By the definition of the derivative, $\Delta y=f'(x_0)\Delta x+o(\Delta x)$. Isolating the linear part and writing $dx=\Delta x$ gives

$$
dy=f'(x_0)\,dx.
$$

Hence $\Delta y-dy=o(\Delta x)$: **the differential is the linear part of $\Delta y$, not $\Delta y$ itself**.

For the identity function, $dx=\Delta x$, so $dy=f'(x_0)\,dx$ and $dy/dx=f'(x_0)$ say the same thing. This is why the derivative notation can be manipulated like a fraction: it is a ratio of differentials.

Differentiability and differentiability in the sense of having a derivative coincide in one variable. With several variables, the existence of partial derivatives and differentiability will part ways.

## Invariance of form

Let $y=f(u)$ with $u=g(x)$. Whether $u$ is treated as an intermediate variable or as the independent one,

$$
dy=f'(u)\,du
$$

holds. This is invariance of form, checked in one line by the chain rule:

$$
dy=f'(u)g'(x)\,dx=f'(u)\,du .
$$

Derivatives have no such property: $(f\circ g)'=f'(u)g'(x)$ still carries the inner factor. The differential notation always looks like $f'(u)\,du$, hiding the inner contribution inside $du$.

This is also why substitution works in indefinite integrals: $\int f(u)\,du$ is the same integral after $u=g(x)$.

## Linear approximation and error

Dropping $o(\Delta x)$ leaves

$$
f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\Delta x .
$$

Geometrically, the curve is replaced by its tangent at $x_0$. Three useful special cases, valid for $x$ near $0$:

$$
\sqrt{1+x}\approx 1+\frac{x}{2},\qquad
\ln(1+x)\approx x,\qquad
(1+x)^\alpha\approx 1+\alpha x .
$$

**Example**: estimate $\sqrt{1.02}$. Take $f(x)=\sqrt x$, $x_0=1$, $\Delta x=0.02$, $f'(1)=\dfrac12$:

$$
\sqrt{1.02}\approx 1+\frac12(0.02)=1.01 .
$$

The true value is about $1.00995$, an error near $5\times 10^{-5}$. The error is controlled: since $\left(\sqrt x\right)''=-\dfrac14 x^{-3/2}$,

$$
\left|\Delta y-dy\right|\le \frac{1}{8}(0.02)^2=5\times 10^{-5},
$$

in agreement with the computation.

**Example**: estimate $1.01^{10}$. With $f(x)=(1+x)^{10}$, $x_0=0$, $\Delta x=0.01$, $f'(0)=10$:

$$
1.01^{10}\approx 1+10(0.01)=1.1 .
$$

The true value is about $1.1046$, an error of $0.0046$, of order $(0.01)^2$. Shrinking $\Delta x$ by a factor of ten shrinks the error by about a hundred.

## Three misconceptions

> [!MYTH] $dy=\Delta y$; the differential is the increment.
> They differ by $o(\Delta x)$. For $y=x^2$ at $x_0=1$ with $\Delta x=0.1$, $dy=0.2$ while $\Delta y=1.21-1=0.21$. Only as $\Delta x\to 0$ does their ratio tend to $1$.

> [!MYTH] The differential is just the derivative with another symbol.
> The derivative $f'(x_0)$ is a number; the differential $dy=f'(x_0)\,dx$ is a quantity depending on $dx$. When $dx=0$ the differential vanishes while the derivative does not; flipping the sign of $dx$ flips $dy$ but not the derivative.

> [!MYTH] Linear approximation is good everywhere; it is an approximation after all.
> It is good only near $x_0$, and the error grows quickly. Estimating $\sqrt{1+x}$ by $1+\dfrac{x}{2}$ gives an error of $5\times10^{-5}$ at $x=0.02$, but $1.5$ at $x=1$ against $\sqrt2\approx 1.414$, an error of $0.086$ — useless.

## Practice

> [!PRACTICE] 1 · Direct computation
> For $y=x^3$ at $x=2$ with $\Delta x=0.01$, find $dy$ and $\Delta y$.
>
> > [!ANSWER] Show answer
> > $y'=3x^2$ and $y'(2)=12$, so $dy=12\times 0.01=0.12$. Meanwhile $\Delta y=2.01^3-8=8.120601-8=0.120601$. They differ by $0.000601$.

> [!PRACTICE] 2 · A square root
> Estimate $\sqrt{1.02}$ and state the order of the error.
>
> > [!ANSWER] Show answer
> > With $f(x)=\sqrt x$, $x_0=1$, $\Delta x=0.02$, $f'(1)=\dfrac12$, so $\sqrt{1.02}\approx 1.01$. The error is at most $\dfrac18(\Delta x)^2=5\times10^{-5}$.

> [!PRACTICE] 3 · A logarithm
> Estimate $\ln 1.01$.
>
> > [!ANSWER] Show answer
> > Take $f(x)=\ln x$, $x_0=1$, $f'(1)=1$, so $\ln 1.01\approx 0.01$. The true value is about $0.00995$, an error near $5\times10^{-6}$.

> [!PRACTICE] 4 · A power
> Estimate $1.01^{10}$ and compare with the true value.
>
> > [!ANSWER] Show answer
> > With $f(x)=(1+x)^{10}$, $f(0)=1$ and $f'(0)=10$, so $1.01^{10}\approx 1.1$. The true value is about $1.1046$, an error of $0.0046$, consistent with the scale $45(\Delta x)^2$ since $f''(0)=90$.

> [!FORMAL] Formal statement
> $f$ is differentiable at $x_0$ if there is a constant $A$ with $\Delta y=A\,\Delta x+o(\Delta x)$; then $A=f'(x_0)$ and the differential is $dy=f'(x_0)\,dx$. For one variable, differentiability is equivalent to having a derivative. Invariance of form: if $y=f(u)$ and $u=g(x)$ are differentiable, then $dy=f'(u)\,du$. The remainder of the linear approximation is $f(x_0+\Delta x)-f(x_0)-f'(x_0)\Delta x=\dfrac{f''(\xi)}{2}(\Delta x)^2$ for some $\xi$ between $x_0$ and $x_0+\Delta x$, by Taylor's formula with Lagrange remainder.
