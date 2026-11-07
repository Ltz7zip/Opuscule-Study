---
slug: "defint-application"
subject: "analysis"
unit: "u07"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Applications of the Definite Integral"
subtitle: "Area, volume, arc length: one micro-element"
minutes: 17
meta: ["17 min read","Requires elementary calculus","Mastery level"]
concepts: ["defint"]
prereq: ["defint"]
related: ["defint", "multipleint"]
---

## Goals

By the end of this lecture you can compute the area of a plane region, the volume of a solid of revolution, and the arc length of a curve, and you can write integrals for work done by a variable force and for average values.

None of these formulas needs memorising. They all come from one move: slice the object into small pieces, write the approximate size of each piece, and let the partition go to infinity.

## Three-line recap

- A definite integral is the limit of a sum of micro-elements; area, volume, arc length, and work share this structure.
- Area uses $\int(\text{upper}-\text{lower})$, volume integrates cross-sections, arc length uses $\int\sqrt{1+y'^2}$.
- The formulas differ only in what the micro-element looks like.

## Area of a plane region

If $g\le f$ on $[a,b]$, the area between the curves is

$$A=\int_a^b\bigl(f(x)-g(x)\bigr)dx .$$

**Example**: the region bounded by $y=x$ and $y=x^2$ on $[0,1]$ has $A=\int_0^1(x-x^2)dx=\frac12-\frac13=\frac16\approx0.167$.

Intersections come first: $x=x^2$ gives $x=0,1$, which fixes the limits. When the upper and lower roles swap, split the integral. For $y=x^3$ and $y=x$ on $[-1,1]$ there are two pieces, so $\int_{-1}^0(x^3-x)dx+\int_0^1(x-x^3)dx=\frac14+\frac14=\frac12$.

In polar coordinates the sector micro-element is $\frac12r^2d\theta$, hence

$$A=\frac12\int_\alpha^\beta r^2(\theta)\,d\theta .$$

**Example**: $r=2\cos\theta$ on $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$ is a circle of radius $1$, and $A=\frac12\int4\cos^2\theta\,d\theta=2\cdot\frac{\pi}{2}=\pi$.

## Volume of a solid of revolution

Rotating about the $x$-axis, take slices perpendicular to the axis; each has area $\pi y^2$, so

$$V=\pi\int_a^b y^2\,dx .$$

**Example**: $y=x^2$ on $[0,1]$ about the $x$-axis gives $V=\pi\int_0^1x^4dx=\frac{\pi}{5}\approx0.628$.

About the $y$-axis the shell method uses circumference times height times thickness:

$$V=2\pi\int_a^b x\,y\,dx .$$

**Example**: the same curve about the $y$-axis gives $V=2\pi\int_0^1x\cdot x^2dx=\frac{\pi}{2}\approx1.571$. Different numbers are expected: a different axis sweeps a different solid.

## Arc length, averages, and work

If $y=f(x)$ is continuously differentiable on $[a,b]$, then

$$L=\int_a^b\sqrt{1+f'(x)^2}\,dx .$$

**Example**: $y=\frac{x^2}{2}$ on $[0,1]$ has $f'=x$, so

$$L=\int_0^1\sqrt{1+x^2}\,dx=\frac{\sqrt2}{2}+\frac12\ln\bigl(1+\sqrt2\bigr)\approx1.148 .$$

The chord between the endpoints is only $\sqrt{1+0.25}\approx1.118$, so the arc is slightly longer, as it should be.

The average value comes from the mean value theorem: $\bar f=\dfrac{1}{b-a}\int_a^b f$. For $f=x^2$ on $[0,3]$ it is $\frac13\cdot9=3$.

Work by a variable force accumulates the micro-element $F(x)dx$: $W=\int_a^bF(x)\,dx$. A spring obeys $F=kx$, so stretching it by $L$ costs $W=\int_0^Lkx\,dx=\frac12kL^2$. With $k=100\ \mathrm{N/m}$ and $L=0.2\ \mathrm{m}$, $W=2\ \mathrm{J}$.

## Three misconceptions

> [!MYTH] Area is just $\int_a^b f$, signs do not matter.
> The integral is an algebraic sum. $\int_0^{2\pi}\sin x\,dx=0$, yet the area between $y=\sin x$ and the $x$-axis is $4$. When the integrand changes sign, split the interval or take absolute values.

> [!MYTH] Rotation about the $y$-axis also uses $\pi\int y^2dx$.
> The formula follows the axis. About the $y$-axis the disk method is $\pi\int x^2dy$, and the shell method is $2\pi\int xy\,dx$. Reusing the $x$-axis formula gives the wrong dimension and the wrong number.

> [!MYTH] Arc length is just the distance between the endpoints.
> The chord is only a lower bound. For $y=\frac{x^2}{2}$ on $[0,1]$ the chord is about $1.118$ while the arc is about $1.148$.

## Practice

> [!PRACTICE] 1 · Area
> Find the area bounded by $y=x$ and $y=x^2$.
>
> > [!ANSWER] Show answer
> > Intersections at $0$ and $1$, so $A=\int_0^1(x-x^2)dx=\frac16\approx0.167$.

> [!PRACTICE] 2 · Volume
> Rotate $y=\sqrt x$ on $[0,4]$ about the $x$-axis and find the volume.
>
> > [!ANSWER] Show answer
> > $V=\pi\int_0^4x\,dx=\pi\cdot8=8\pi\approx25.13$.

> [!PRACTICE] 3 · Arc length
> Find the arc length of $y=\frac23x^{3/2}$ on $[0,3]$.
>
> > [!ANSWER] Show answer
> > $y'=\sqrt x$, so $L=\int_0^3\sqrt{1+x}\,dx=\frac23(1+x)^{3/2}\Big|_0^3=\frac23(8-1)=\frac{14}{3}\approx4.667$.

> [!PRACTICE] 4 · Average value
> Find the average value of $f(x)=x^2$ on $[0,3]$.
>
> > [!ANSWER] Show answer
> > $\frac13\int_0^3x^2dx=\frac13\cdot9=3$.

> [!FORMAL] Formal statement
> Let $f$ be continuous and nonnegative on $[a,b]$. The area bounded by $y=f(x)$, the $x$-axis, and $x=a,b$ is $A=\int_a^b f$; the volume of the solid obtained by rotating it about the $x$-axis is $V=\pi\int_a^b f^2$. If $f$ is continuously differentiable on $[a,b]$, the arc length is $L=\int_a^b\sqrt{1+f'^2}$. Each formula is a Riemann sum of micro-elements followed by a limit, not a new definition.
