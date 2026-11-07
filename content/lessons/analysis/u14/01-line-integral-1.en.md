---
slug: "line-integral-1"
subject: "analysis"
unit: "u14"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Line Integrals of the First Kind"
subtitle: "Weighing a curve — direction does not matter"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["lineint"]
prereq: ["multipleint"]
related: ["lineint", "defint"]
---

## Goals

A line integral of the first kind accumulates a density along a curve, producing mass, arc length, or an average. By the end you can state the partition definition, parametrise a curve and write the arc element $ds$ correctly, and use symmetry to see that some integrals vanish.

## Three-line recap

- A definite integral accumulates along a straight interval; a line integral accumulates along a curved one.
- The accumulation is measured by arc length, not by coordinate increments.
- Arc length has no direction, so a first-kind line integral does not depend on traversal.

## Arc length and the definition

Let $C$ be a rectifiable plane curve and $f$ bounded on it. Split $C$ into $n$ small arcs of length $\Delta s_i$, choose $(\xi_i,\eta_i)$ on the $i$-th arc, and form

$$\sum_{i=1}^n f(\xi_i,\eta_i)\,\Delta s_i.$$

If the sums tend to one number as the largest arc length tends to zero, that number is the **line integral of the first kind** of $f$ along $C$:

$$\int_C f(x,y)\,ds.$$

With $f\equiv1$, $\int_C ds$ is the arc length. If $f$ is linear density, the integral is the mass of the curve. In three dimensions nothing changes: write points as $(x,y,z)$ and use the same $ds$.

## Computing by parametrisation

If $C$ is given by $x=x(t)$, $y=y(t)$ for $\alpha\le t\le\beta$, with continuous derivatives and $x'^2+y'^2\neq0$, then

$$ds=\sqrt{x'(t)^2+y'(t)^2}\,dt,$$

so

$$\int_C f\,ds=\int_\alpha^\beta f\big(x(t),y(t)\big)\sqrt{x'(t)^2+y'(t)^2}\,dt.$$

The right side is an ordinary definite integral, with the lower limit below the upper. The direction of the curve is irrelevant.

Example: let $C$ be the segment from $(0,0)$ to $(1,1)$ and compute $\int_C(x+y)\,ds$. Take $x=t$, $y=t$, $0\le t\le1$, so $ds=\sqrt2\,dt$:

$$\int_0^1 2t\cdot\sqrt2\,dt=\sqrt2.$$

Example: for the circle $x^2+y^2=R^2$, compute $\int_C(x^2+y^2)\,ds$. On the circle the integrand is the constant $R^2$, and the length is $2\pi R$, so the value is $2\pi R^3$ with no parametrisation at all.

A three-dimensional example: the helix $x=a\cos t$, $y=a\sin t$, $z=bt$, $0\le t\le2\pi$. Here $ds=\sqrt{a^2+b^2}\,dt$ and

$$\int_C z\,ds=\int_0^{2\pi}bt\sqrt{a^2+b^2}\,dt=2\pi^2b\sqrt{a^2+b^2}.$$

## Properties and symmetry

A first-kind line integral behaves like a definite integral with respect to arc length:

- $\int_C(\alpha f+\beta g)\,ds=\alpha\int_C f\,ds+\beta\int_C g\,ds$.
- If $C=C_1\cup C_2$ meets only at endpoints, $\int_C f\,ds=\int_{C_1}f\,ds+\int_{C_2}f\,ds$.
- $\left|\int_C f\,ds\right|\le\int_C|f|\,ds\le M\cdot L$, where $M=\max_C|f|$ and $L$ is the arc length.

**Independence of direction.** Traversing from $\beta$ to $\alpha$ leaves $ds$ positive, so the value is unchanged. This is exactly where the second-kind integral will differ.

**Symmetry** is the practical shortcut. If $C$ is symmetric about the $y$-axis and $f$ is odd in $x$, that is $f(-x,y)=-f(x,y)$, then $\int_C f\,ds=0$. On the unit circle, $\int_C x\,ds=0$, while $\int_C x^2\,ds=\int_C y^2\,ds=\pi$. Adding gives $\int_C(x^2+y^2)\,ds=2\pi$, consistent with $1\cdot2\pi$.

## Three misconceptions

> [!MYTH] A first-kind line integral depends on orientation.
> It accumulates arc length, which is positive. Reversing the curve leaves $ds$ unchanged and so leaves the value unchanged. Orientation belongs to the second kind.

> [!MYTH] $ds$ is just $dx$ or $dy$.
> $ds=\sqrt{x'^2+y'^2}\,dt$ is the arc element. Only on a horizontal segment is $ds=|dx|$; in general $ds\ge|dx|$.

> [!MYTH] A different parametrisation changes the value.
> As long as the parametrisation is a one-to-one $C^1$ map onto the curve, the value is unchanged. Reparametrising only redistributes the same arc length.

## Practice

> [!PRACTICE] 1 · Segment
> Let $C$ run from $(0,0)$ to $(1,2)$. Compute $\int_C(x+y)\,ds$.
>
> > [!ANSWER] Show answer
> > Take $x=t$, $y=2t$, $0\le t\le1$, so $ds=\sqrt5\,dt$. Then $\int_0^1 3t\sqrt5\,dt=\frac{3\sqrt5}{2}$.

> [!PRACTICE] 2 · Circle
> For the circle $x^2+y^2=4$, compute $\int_C x^2\,ds$.
>
> > [!ANSWER] Show answer
> > By symmetry $\int_C x^2\,ds=\frac12\int_C(x^2+y^2)\,ds=\frac12\cdot4\cdot4\pi=8\pi$. Equivalently, half of $2\pi R^3=16\pi$.

> [!PRACTICE] 3 · Helix
> For $x=\cos t$, $y=\sin t$, $z=t$, $0\le t\le2\pi$, compute $\int_C z\,ds$.
>
> > [!ANSWER] Show answer
> > $ds=\sqrt2\,dt$, so the integral is $\sqrt2\int_0^{2\pi}t\,dt=2\sqrt2\pi^2$.

> [!PRACTICE] 4 · Estimate
> For the circle of radius $R$, evaluate $\int_C\frac{ds}{1+x^2+y^2}$.
>
> > [!ANSWER] Show answer
> > On the circle $x^2+y^2=R^2$, so the integrand is the constant $\frac{1}{1+R^2}$ and the length is $2\pi R$. The value is $\frac{2\pi R}{1+R^2}$.

> [!FORMAL] Formal statement
> Let $C$ be rectifiable and $f$ bounded on it. For an arc-length partition $0=s_0<s_1<\cdots<s_n=L$ with $\Delta s_i=s_i-s_{i-1}$, if $\sum f(\xi_i,\eta_i)\Delta s_i$ tends to $I$ as $\max\Delta s_i\to0$ for every choice of sample points, write $I=\int_C f\,ds$. If $C$ is given by a $C^1$ parametrisation $r(t)$, $\alpha\le t\le\beta$, with $|r'(t)|\neq0$, then $\int_C f\,ds=\int_\alpha^\beta f(r(t))|r'(t)|\,dt$, and the value is independent of the parametrisation.
