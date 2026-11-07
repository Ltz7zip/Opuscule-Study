---
slug: "powerseries-def"
subject: "analysis"
unit: "u10"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Power Series"
subtitle: "One radius controls the whole line"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["powerseries", "unifconv"]
prereq: ["unifconv"]
related: ["powerseries", "taylor"]
---

## Goals

By the end of this lecture you can compute the radius of convergence, determine the interval of convergence including both endpoints, and explain why a power series converges uniformly on closed subintervals but not on the open interval.

Among series of functions, $\sum a_n(x-x_0)^n$ is the best behaved: its convergence set is always an interval centred at $x_0$, with only the endpoints in doubt.

## Three-line recap

- A power series converges absolutely for $|x-x_0|<R$ and diverges for $|x-x_0|>R$.
- $R$ is the radius of convergence; it may be $0$, a positive number, or $+\infty$.
- The endpoints $x=x_0\pm R$ must be substituted back and tested separately.

## Abel's theorem and the radius

Let $\sum a_n(x-x_0)^n$ converge at some $x_1\ne x_0$. Then it converges absolutely at every $x$ with $|x-x_0|<|x_1-x_0|$; if it diverges at some point, it diverges at every point farther out. Hence there is a unique $R\in[0,+\infty]$ with

$$
|x-x_0|<R\ \text{convergent},\qquad |x-x_0|>R\ \text{divergent}.
$$

The radius is computed by Cauchy–Hadamard:

$$
\frac1R=\limsup_{n\to\infty}\sqrt[n]{|a_n|}.
$$

The limit superior is used because $\sqrt[n]{|a_n|}$ need not converge. When coefficients vanish, the ratio formula breaks down while the root formula still works.

## Three ways to get the radius

| Method | Formula | Example |
| --- | --- | --- |
| Cauchy–Hadamard | $R=1/\limsup\sqrt[n]{\|a_n\|}$ | $\sum\big(1+\frac1n\big)^{n^2}x^n$ gives $R=\frac1e$ |
| Ratio | $R=\lim\big|\frac{a_n}{a_{n+1}}\big|$ | $\sum\frac{x^n}{n!}$ gives $R=+\infty$ |
| Substitution | treat $x^k$ as a new variable | $\sum(2x)^n$ gives $R=\frac12$ |

Example: $\sum\frac{x^n}{n!}$. The ratio $\frac{a_n}{a_{n+1}}=n+1\to+\infty$, so $R=+\infty$: the series converges on the whole line, with sum $e^x$.

Example: $\sum n!x^n$. The ratio $\frac{n!}{(n+1)!}=\frac{1}{n+1}\to0$, so $R=0$: convergence only at $x=0$.

Example: $\sum x^{2n}$. Put $t=x^2$; then $\sum t^n$ has $R_t=1$, so $|x|<1$ and $R=1$. Here $\sqrt[n]{|a_n|}$ jumps between $0$ and $1$, and the limit superior gives $1$.

## Endpoints need separate work

The radius governs only the open interval; each endpoint is a numerical series.

| Series | $R$ | $x=R$ | $x=-R$ | Interval |
| --- | --- | --- | --- | --- |
| $\sum\frac{x^n}{n}$ | $1$ | $\sum\frac1n$ diverges | $\sum\frac{(-1)^n}{n}$ converges | $[-1,1)$ |
| $\sum\frac{x^n}{n^2}$ | $1$ | $\sum\frac{1}{n^2}$ converges | $\sum\frac{(-1)^n}{n^2}$ converges | $[-1,1]$ |
| $\sum x^n$ | $1$ | diverges | diverges | $(-1,1)$ |

All three have the same radius and three different intervals. The radius carries no endpoint information; substituting back is unavoidable.

## Uniform convergence inside the interval

On $(-R,R)$ a power series need not converge uniformly; on any closed subinterval $[-r,r]$ with $0<r<R$ it does. Pick $q\in(r/R,1)$; the definition of the limit superior gives $|a_n|r^n\le q^n$ for all large $n$, so $\sum|a_n|r^n$ converges and the M-test applies.

$\sum x^n$ is not uniformly convergent on $(-1,1)$: the tail is $\frac{x^{N+1}}{1-x}$, unbounded as $x\to1^-$, so the supremum is $+\infty$. On $[-0.9,0.9]$ the tail is at most $\frac{0.9^{N+1}}{0.1}$, and convergence is uniform.

> [!NOTE]
> Keep the three levels apart: pointwise absolute convergence on the open interval, uniform convergence on closed subintervals, separate tests at the endpoints.

## Three misconceptions

> [!MYTH] Points inside the radius converge, so the endpoints must too.
> Endpoints are exactly where things break. $\sum\frac{x^n}{n}$ becomes the harmonic series at $x=1$ and diverges; $\sum x^n$ diverges at both endpoints, leaving only $(-1,1)$.

> [!MYTH] The radius can always be computed as $R=\lim|a_n/a_{n+1}|$.
> The ratio fails when coefficients vanish. For $\sum x^{2n}$ the coefficients are $1,0,1,0,\dots$ and the ratio jumps between $0$ and $\infty$; only the limit superior works, giving $R=1$.

> [!MYTH] On the interval of convergence $(-R,R)$ a power series converges uniformly.
> Only closed subintervals are guaranteed. $\sum x^n$ converges pointwise on $(-1,1)$, but the supremum of the tail is $+\infty$.

## Practice

> [!PRACTICE] 1 · Radius and endpoints
> Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{n\,3^n}$.
>
> > [!ANSWER] Show answer
> > $R=\lim\frac{n3^n}{(n+1)3^{n+1}}=3$. At $x=3$ the series is $\sum\frac1n$, divergent; at $x=-3$ it is $\sum\frac{(-1)^n}{n}$, convergent. Interval: $[-3,3)$.

> [!PRACTICE] 2 · Ratio
> Find the radius of $\displaystyle\sum_{n=1}^{\infty}\frac{(n!)^2}{(2n)!}x^n$.
>
> > [!ANSWER] Show answer
> > $\frac{a_{n+1}}{a_n}=\frac{(n+1)^2}{(2n+2)(2n+1)}=\frac{n+1}{2(2n+1)}\to\frac14$, so $R=4$.

> [!PRACTICE] 3 · Root
> Find the radius of $\displaystyle\sum_{n=1}^{\infty}\Big(1+\frac1n\Big)^{n^2}x^n$.
>
> > [!ANSWER] Show answer
> > $\sqrt[n]{a_n}=\big(1+\frac1n\big)^n\to e$, so $R=\frac1e$.

> [!PRACTICE] 4 · Shifted centre
> Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{(x-1)^n}{n\,2^n}$.
>
> > [!ANSWER] Show answer
> > Put $t=x-1$; then $R_t=2$, so $|x-1|<2$, i.e. $-1<x<3$. At $x=3$ the series is $\sum\frac1n$, divergent; at $x=-1$ it is $\sum\frac{(-1)^n}{n}$, convergent. Interval: $[-1,3)$.

## Formal statement

> [!FORMAL] Formal statement
> For $\sum a_n(x-x_0)^n$ let $\rho=\limsup_{n\to\infty}\sqrt[n]{|a_n|}$ and $R=1/\rho$, with $R=+\infty$ when $\rho=0$ and $R=0$ when $\rho=+\infty$. Then the series converges absolutely for $|x-x_0|<R$ and diverges for $|x-x_0|>R$. Abel's theorem: if the series converges at $x_1$, it converges uniformly on the segment joining $x_0$ and $x_1$, so the sum is continuous from that side at $x_1$. For every $0<r<R$ the series converges uniformly on $[x_0-r,x_0+r]$: choose $q\in(r/R,1)$; the definition of the limit superior gives $|a_n|r^n\le q^n$ for all large $n$.
