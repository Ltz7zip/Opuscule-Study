---
slug: "cont-prop"
subject: "analysis"
unit: "u03"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Properties on a Closed Interval"
subtitle: "Bounded, extremal, and intermediate"
minutes: 16
meta: ["16 min read","Requires the definition of continuity","Mastery level"]
concepts: ["contprop", "cont"]
prereq: ["cont"]
related: ["unifcont", "mvt", "defint"]
---

## Goals

“Closed interval” plus “continuous” forces four properties: boundedness, attainment of extreme values, the intermediate value property, and continuity of the inverse. They are the main source of existence proofs.

By the end you can state all four and explain where closedness is used, prove that specific equations have roots, and upgrade existence to uniqueness with monotonicity.

## Three-line recap

- A continuous function on $[a,b]$ is bounded and attains both a maximum and a minimum.
- If $f(a)f(b)<0$, there is a root inside; more generally, $f$ takes every value between $f(a)$ and $f(b)$.
- Neither hypothesis is removable: an open interval may lose boundedness or extrema, and a discontinuous function may skip intermediate values.

## Boundedness and extrema

> [!NOTE]
> If $f$ is continuous on $[a,b]$, then $f$ is bounded there, and there are $\xi,\eta\in[a,b]$ with $f(\xi)=\max f$ and $f(\eta)=\min f$.

Boundedness is proved by contradiction with Bolzano–Weierstrass. If $f$ were unbounded, choose $x_n\in[a,b]$ with $|f(x_n)|>n$. The sequence is bounded, so some subsequence $x_{n_k}\to x_0\in[a,b]$. Continuity gives $f(x_{n_k})\to f(x_0)$, making the values bounded, contradicting $|f(x_{n_k})|>n_k$.

The extreme value theorem goes one step further. Let $M=\sup f$ and choose $x_n$ with $f(x_n)>M-1/n$. A subsequence $x_{n_k}\to x_0$ gives $f(x_0)=\lim f(x_{n_k})=M$, so the supremum is attained.

Closedness cannot be dropped. $f(x)=1/x$ is continuous on $(0,1]$ but unbounded; $f(x)=x$ on $(0,1)$ is bounded but attains neither endpoint.

## The zero and intermediate value theorems

> [!NOTE]
> Zero theorem: if $f$ is continuous on $[a,b]$ and $f(a)f(b)<0$, then some $\xi\in(a,b)$ satisfies $f(\xi)=0$.

For the proof let $S=\{x\in[a,b] : f(x)<0\}$ and set $\xi=\sup S$. Continuity forces $f(\xi)=0$: if $f(\xi)<0$, sign preservation keeps $f$ negative just to the right, contradicting the definition of $\xi$; if $f(\xi)>0$, it is positive just to the left, so $\xi$ is not the least upper bound.

The intermediate value theorem follows. If $\mu$ lies between $f(a)$ and $f(b)$, apply the zero theorem to $g(x)=f(x)-\mu$, whose endpoint values have opposite signs.

Corollary: a continuous function maps an interval onto an interval. On $[a,b]$ the range is exactly $[\min f,\max f]$.

## Three concrete equations

**A cubic.** For $x^3-4x+1=0$ on $(0,1)$, let $f(x)=x^3-4x+1$. Then $f(0)=1>0$ and $f(1)=1-4+1=-2<0$, so a root lies in $(0,1)$.

**A fixed point.** For $\cos x=x$ on $(0,1)$, let $g(x)=\cos x-x$. Then $g(0)=1>0$ and $g(1)=\cos 1-1\approx -0.46<0$, so a root exists. Moreover $g'(x)=-\sin x-1<0$, so $g$ is strictly decreasing and the root is unique; numerically $\xi\approx 0.739$.

**Continuity of the inverse.** If $f$ is continuous and strictly monotone on an interval, its inverse is continuous on the range. Monotonicity makes the inverse exist; continuity ensures the range is an interval with no gaps.

## Three misconceptions

> [!MYTH] A continuous function on an open interval still attains its maximum.
> $f(x)=x$ is continuous on $(0,1)$ with supremum $1$, but no point gives $1$. The extreme value theorem needs a closed interval; without endpoints the limiting position may lie outside.

> [!MYTH] A zero always comes with a sign change.
> $f(x)=x^2$ vanishes at $0$ while staying positive on both sides. The zero theorem only says opposite signs force a root; the converse fails.

> [!MYTH] The intermediate value theorem needs monotonicity.
> Monotonicity is irrelevant. $f(x)=\sin x$ is not monotone on $[0,\pi]$ yet takes every value in $[0,1]$. What matters is continuity on a closed interval: the step function equal to $0$ for $x<0$ and $1$ for $x\ge 0$ skips $1/2$ on $[-1,1]$.

## Practice

> [!PRACTICE] 1 · Cubic
> Prove that $x^3-4x+1=0$ has a root in $(0,1)$.
>
> > [!ANSWER] Show answer
> > $f(0)=1>0$ and $f(1)=-2<0$; being a polynomial, $f$ is continuous. The zero theorem gives $\xi\in(0,1)$ with $f(\xi)=0$.

> [!PRACTICE] 2 · Fixed point
> Prove that $\cos x=x$ has a unique solution in $(0,1)$.
>
> > [!ANSWER] Show answer
> > $g(0)=1>0$ and $g(1)=\cos 1-1<0$, so a solution exists. Since $g'(x)=-\sin x-1<0$, $g$ decreases strictly, so the solution is unique, about $0.739$.

> [!PRACTICE] 3 · Midpoint symmetry
> Let $f$ be continuous on $[0,1]$ with $f(0)=f(1)$. Prove that some $\xi\in[0,1/2]$ satisfies $f(\xi)=f(\xi+1/2)$.
>
> > [!ANSWER] Show answer
> > Let $h(x)=f(x)-f(x+1/2)$, continuous on $[0,1/2]$. Then $h(0)=f(0)-f(1/2)$ and $h(1/2)=f(1/2)-f(1)=-h(0)$. If $h(0)=0$, take $\xi=0$; otherwise the endpoints have opposite signs and the zero theorem applies.

> [!PRACTICE] 4 · Counterexample
> Show that the extreme value theorem fails on an open interval.
>
> > [!ANSWER] Show answer
> > $f(x)=x$ is continuous on $(0,1)$ with range $(0,1)$; neither $1$ nor $0$ is attained, so there is no maximum or minimum.

> [!FORMAL] Formal statement
> Let $f\in C[a,b]$. Then $f$ is bounded and there exist $\xi,\eta\in[a,b]$ with $f(\xi)=\max_{[a,b]}f$ and $f(\eta)=\min_{[a,b]}f$. If $f(a)f(b)<0$, some $\xi\in(a,b)$ has $f(\xi)=0$; more generally every $\mu$ between $f(a)$ and $f(b)$ is attained. The proofs use Bolzano–Weierstrass and sign preservation. If $f$ is strictly monotone and continuous, then $f^{-1}$ is continuous.
