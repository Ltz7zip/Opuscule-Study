---
slug: "extremum-1d"
subject: "analysis"
unit: "u05"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Extrema, Monotonicity, and Convexity"
subtitle: "Read the sign of the derivative, not its zeros"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["extremum", "taylor"]
prereq: ["taylor", "mvt"]
related: ["mvt", "extremum"]
---

## Goals

By the end of this lecture you can locate extrema from the sign change of $f'$, decide convexity from $f''$, build a sign table that includes inflection points, and explain why "$f'=0$" by itself says nothing.

Locating extrema is not about solving $f'(x)=0$; it is about the sign of $f'$ on the two sides of a stationary point. Convexity works the same way: read the sign of $f''$, not whether $f''$ vanishes.

## Three-line recap

- Lagrange's theorem ties the sign of $f'$ to growth: $f'>0$ means strictly increasing.
- So across a stationary point, the change in sign of $f'$ decides whether the function goes up-then-down or down-then-up.
- Taylor's formula gives finer information: the sign of $f''(x_0)$ says whether the curve bends upward or downward near $x_0$.

## Monotonicity and the first test

Let $f$ be continuous on an interval $I$ and differentiable inside. If $f'(x)>0$ inside, then $f$ is strictly increasing on $I$; if $f'(x)<0$, strictly decreasing. The reason is one mean value theorem step: for $x_1<x_2$, $f(x_2)-f(x_1)=f'(\xi)(x_2-x_1)$, whose sign is that of $f'(\xi)$.

**First derivative test**: let $f$ be continuous at $x_0$ and differentiable on a punctured neighbourhood.

| $f'$ for $x<x_0$ | $f'$ for $x>x_0$ | Conclusion |
| --- | --- | --- |
| $+$ | $-$ | local maximum |
| $-$ | $+$ | local minimum |
| same sign | same sign | not an extremum |

For $f(x)=x^3-3x$ we have $f'(x)=3(x-1)(x+1)$. It is positive left of $-1$ and negative right of $-1$, so $f(-1)=2$ is a local maximum; it is negative left of $1$ and positive right of $1$, so $f(1)=-2$ is a local minimum.

## The second test and convexity

If $f'(x_0)=0$ and $f''(x_0)<0$, then $x_0$ is a local maximum; if $f''(x_0)>0$, a local minimum. This follows from Taylor: $f(x)-f(x_0)=\frac{1}{2}f''(x_0)(x-x_0)^2+o\bigl((x-x_0)^2\bigr)$, where the quadratic term dominates and the linear term is gone.

When $f''(x_0)=0$ the test says nothing. $f(x)=x^4$ has $f'=f''=0$ at $0$ and still has a minimum there; $f(x)=x^3$ has the same two derivatives zero and has no extremum. Fall back to the first test.

Convexity is read from the sign of $f''$ (when it exists):

- $f''>0$: the curve is convex, tangents lie below it and chords above it;
- $f''<0$: the curve is concave, tangents lie above it.

Check with $f(x)=x^2$: $f''=2>0$, and the tangent $y=0$ at the origin indeed lies below the whole parabola.

## Inflection points and the sign table

An **inflection point** is where the convexity changes. A necessary condition is again $f''=0$ or $f''$ undefined, and again it is not sufficient. For $f(x)=x^4$, $f''(0)=0$ but $f''>0$ on both sides, so $0$ is not an inflection point; for $f(x)=x^3$, $f''$ changes from negative to positive at $0$, so $0$ is one.

Put the zeros of $f'$ and $f''$ on one number line and mark signs interval by interval. For $f(x)=x^3-3x$:

| Interval | $f'$ | $f''$ | Shape |
| --- | --- | --- | --- |
| $(-\infty,-1)$ | $+$ | $-$ | increasing, concave |
| $(-1,0)$ | $-$ | $-$ | decreasing, concave |
| $(0,1)$ | $-$ | $+$ | decreasing, convex |
| $(1,+\infty)$ | $+$ | $+$ | increasing, convex |

Reading the table: local maximum $2$ at $x=-1$, local minimum $-2$ at $x=1$, and an inflection point at $x=0$ with value $0$.

## Three misconceptions

> [!MYTH] A point with zero derivative is an extremum.
> No. $f(x)=x^3$ has $f'(0)=0$, yet the function is strictly increasing and $0$ is not an extremum. A zero derivative produces a candidate, nothing more; the sign change must be checked.

> [!MYTH] Every extremum satisfies $f'(x_0)=0$.
> Not so. $f(x)=|x|$ has a minimum at $0$ where the derivative does not exist. Maxima and minima at endpoints also carry no such requirement.

> [!MYTH] If $f''(x_0)=0$, then $x_0$ is not an extremum.
> A failed test is not a negative verdict. $f(x)=x^4$ has $f''(0)=0$ and a minimum at $0$; only the sign change of $f'$ settles the question.

## Practice

> [!PRACTICE] 1 · First test
> Find the extrema of $f(x)=x^3-3x$.
>
> > [!ANSWER] Show answer
> > $f'=3x^2-3=3(x-1)(x+1)$, stationary points $\pm1$. At $-1$ the derivative goes from $+$ to $-$, giving a local maximum $f(-1)=2$; at $1$ it goes from $-$ to $+$, giving a local minimum $f(1)=-2$.

> [!PRACTICE] 2 · Both derivatives
> Find the extrema and inflection points of $f(x)=x^4-2x^2$.
>
> > [!ANSWER] Show answer
> > $f'=4x(x-1)(x+1)$ with zeros $0,\pm1$, and $f''=12x^2-4$. At $x=0$, $f''<0$, so the local maximum is $0$; at $x=\pm1$, $f''>0$, so both minima equal $-1$. Also $f''=0$ at $x=\pm\frac{1}{\sqrt3}$ with a sign change, giving two inflection points with value $-\frac{5}{9}$.

> [!PRACTICE] 3 · Monotonicity proves inequalities
> Prove that $x-\dfrac{x^2}{2}<\ln(1+x)<x$ for $x>0$.
>
> > [!ANSWER] Show answer
> > Let $g(x)=\ln(1+x)-x$. Then $g'(x)=\dfrac{1}{1+x}-1=-\dfrac{x}{1+x}<0$ and $g(0)=0$, so $g<0$: the right inequality. Let $h(x)=\ln(1+x)-x+\dfrac{x^2}{2}$. Then $h'(x)=\dfrac{1}{1+x}-1+x=\dfrac{x^2}{1+x}>0$ and $h(0)=0$, so $h>0$: the left inequality.

> [!PRACTICE] 4 · A rational function
> Find the extrema of $f(x)=\dfrac{x}{1+x^2}$.
>
> > [!ANSWER] Show answer
> > $f'(x)=\dfrac{1-x^2}{(1+x^2)^2}$, with stationary points $\pm1$. At $1$ the sign goes $+$ to $-$, giving a local maximum $\frac{1}{2}$; at $-1$ it goes $-$ to $+$, giving a local minimum $-\frac{1}{2}$.

> [!FORMAL] Formal statement
> Let $f$ be continuous on a neighbourhood of $x_0$ and differentiable on the punctured neighbourhood. If $f'(x)>0$ for $x<x_0$ and $f'(x)<0$ for $x>x_0$, then $f$ has a local maximum at $x_0$. If $f'(x_0)=0$ and $f''(x_0)<0$, then $f(x)\le f(x_0)$ for all $x$ close enough to $x_0$. A function is convex on an interval when $f(\lambda x_1+(1-\lambda)x_2)\le\lambda f(x_1)+(1-\lambda)f(x_2)$ for all $x_1<x_2$ and $\lambda\in(0,1)$; $f''>0$ implies this inequality.
