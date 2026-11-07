---
slug: "funcseries-def"
subject: "analysis"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Series of Functions and Uniform Convergence"
subtitle: "Convergent everywhere is not convergent in step"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["funcseries", "unifconv"]
prereq: ["series"]
related: ["unifconv", "powerseries"]
---

## Goals

By the end of this lecture you can separate pointwise from uniform convergence, write the sup criterion, and explain why $\sum x^n$ converges pointwise on $[0,1)$ but not uniformly.

In a numerical series each term is a number; in a series of functions each term is a function. Convergence therefore has two levels: pointwise convergence stabilises each location eventually, uniform convergence stabilises all locations together.

## Three-line recap

- The partial sum $S_N(x)$ of $\sum u_n(x)$ is a function, not a number.
- Pointwise: for each fixed $x$, the sequence $S_N(x)$ converges to a limit $S(x)$.
- Uniform: $\sup_x|S_N(x)-S(x)|\to0$, so the error bound is independent of $x$.

## Pointwise convergence: each point on its own

Let $u_n$ be defined on an interval $I$. If for every $x\in I$ the sequence $\sum_{n=1}^{N}u_n(x)$ converges, the series **converges pointwise** on $I$, with sum function

$$
S(x)=\lim_{N\to\infty}\sum_{n=1}^{N}u_n(x).
$$

Example: $\sum_{n=0}^{\infty}x^n$ converges pointwise on $(-1,1)$. The partial sum is

$$
S_N(x)=\frac{1-x^{N+1}}{1-x},\qquad S(x)=\frac{1}{1-x},
$$

and the error is

$$
S(x)-S_N(x)=\frac{x^{N+1}}{1-x}.
$$

For each fixed $x$, $x^{N+1}\to0$, so convergence is pointwise. Near $x=1$ that error can be made arbitrarily large: at $x=0.999$ the error is $\frac{0.999^{N+1}}{0.001}$, and forcing it below $0.01$ needs $N$ above $6900$.

## Uniform convergence: one N for all points

The series **converges uniformly** to $S$ on $I$ if for every $\varepsilon>0$ there is $N$ depending only on $\varepsilon$ such that for $n>N$,

$$
|S_n(x)-S(x)|<\varepsilon\quad\text{for all }x\in I .
$$

Equivalently, compress "all points" into one number:

$$
\|S_n-S\|_\infty=\sup_{x\in I}|S_n(x)-S(x)|\ \longrightarrow\ 0 .
$$

Pointwise convergence lets $N$ depend on $x$; uniform convergence forbids it. That single dependency is the entire difference.

## Deciding with the supremum

$\sum x^n$ is not uniformly convergent on $[0,1)$, because

$$
\sup_{x\in[0,1)}\frac{x^{N+1}}{1-x}=+\infty ,
$$

which is not even finite. On a closed subinterval $[0,r]$ with $r<1$,

$$
\sup_{x\in[0,r]}\frac{x^{N+1}}{1-x}\le\frac{r^{N+1}}{1-r}\ \longrightarrow\ 0,
$$

so convergence is uniform there. Uniform convergence is a local property: it survives away from the boundary and fails at it.

A more vivid example: $f_n(x)=x^n$ on $[0,1]$. The pointwise limit is $S(x)=0$ for $x<1$ and $S(1)=1$. Since $\sup|f_n-S|=1$ for every $n$, convergence is not uniform. There is a second proof: each $f_n$ is continuous and the limit is discontinuous at $1$ — a discontinuous limit of continuous functions certifies non-uniformity.

> [!NOTE]
> The fastest way to disprove uniform convergence: check whether the limit function breaks continuity. If $S$ jumps while every $S_n$ is continuous, convergence cannot be uniform.

## Three misconceptions

> [!MYTH] Convergence at every point means uniform convergence.
> The pointwise $N$ varies with $x$ and can be unbounded. For $\sum x^n(1-x)$ on $[0,1]$ the partial sum is $1-x^{N+1}$ and the limit is $1$ for $x<1$, $0$ at $x=1$, while $\sup|S_N-S|=1$. Not uniform.

> [!MYTH] If the error at every point can be made small, one N works for all.
> Each point has its own $N(x,\varepsilon)$, and $\sup_x N(x,\varepsilon)$ may be infinite. For $f_n(x)=nx(1-x^2)^n$ on $[0,1]$, the pointwise limit is $0$, but the maximum sits at $x=1/\sqrt{2n+1}$ and grows like $\sqrt{n/2}\,e^{-1/2}\to+\infty$; the error bound never goes to zero.

> [!MYTH] Uniform convergence is a technical strengthening with no practical difference.
> It is exactly what licenses swapping limits with integrals and derivatives. $\sum x^n$ converges pointwise on $[0,1)$, yet termwise integration gives the divergent $\sum\frac{1}{n+1}$, matching the divergence of $\int_0^1\frac{\mathrm{d}x}{1-x}$ while giving no way to sum anything; a uniformly convergent series allows the swap outright.

## Practice

> [!PRACTICE] 1 · Supremum
> Does $f_n(x)=\dfrac{x}{1+nx^2}$ converge uniformly to $0$ on $[0,1]$?
>
> > [!ANSWER] Show answer
> > The maximum is at $x=1/\sqrt n$ with value $\frac{1}{2\sqrt n}$ (when $1/\sqrt n\le1$). Since $\sup|f_n|=\frac{1}{2\sqrt n}\to0$, convergence is uniform.

> [!PRACTICE] 2 · Disprove
> Is $f_n(x)=nx(1-x^2)^n$ uniformly convergent on $[0,1]$?
>
> > [!ANSWER] Show answer
> > The pointwise limit is $0$. But the maximum is at $x=1/\sqrt{2n+1}$ with value $\frac{n}{\sqrt{2n+1}}\big(\frac{2n}{2n+1}\big)^n\sim\sqrt{n/2}\,e^{-1/2}\to+\infty$. Not uniform.

> [!PRACTICE] 3 · Telescoping
> Is $\displaystyle\sum_{n=0}^{\infty}\big(x^n-x^{n+1}\big)$ uniformly convergent on $[0,1]$?
>
> > [!ANSWER] Show answer
> > The partial sum is $S_N=1-x^{N+1}$, with limit $1$ for $x<1$ and $0$ at $x=1$. Since $\sup|S_N-S|=\sup_{x<1}x^{N+1}=1$, convergence is not uniform.

> [!PRACTICE] 4 · Closed subinterval
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{n}$ converges uniformly on $[0,\tfrac12]$.
>
> > [!ANSWER] Show answer
> > The tail satisfies $|R_N(x)|\le\sum_{k>N}\big(\tfrac12\big)^k=\big(\tfrac12\big)^{N}$, independent of $x$ and tending to $0$. Hence uniform.

## Formal statement

> [!FORMAL] Formal statement
> Let $u_n$ and $S$ be defined on $I$ and let $S_n=\sum_{k=1}^{n}u_k$. Pointwise convergence: for each $x\in I$ and each $\varepsilon>0$ there is $N(x,\varepsilon)$ such that $|S_n(x)-S(x)|<\varepsilon$ for $n>N$. Uniform convergence: for each $\varepsilon>0$ there is $N(\varepsilon)$ such that $|S_n(x)-S(x)|<\varepsilon$ for $n>N$ and all $x\in I$, equivalently $\sup_{x\in I}|S_n(x)-S(x)|\to0$. Cauchy form: for every $\varepsilon>0$ there is $N$ with $\sup_{x\in I}\big|\sum_{k=m+1}^{n}u_k(x)\big|<\varepsilon$ whenever $n>m>N$. Uniform convergence implies pointwise convergence; the converse fails.
