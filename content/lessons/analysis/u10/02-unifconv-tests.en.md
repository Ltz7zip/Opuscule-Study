---
slug: "unifconv-tests"
subject: "analysis"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Tests for Uniform Convergence"
subtitle: "The M-test is sufficient, never necessary"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["unifconv"]
prereq: ["unifconv"]
related: ["unifconv", "series"]
---

## Goals

By the end of this lecture you can confirm uniform convergence quickly with the Weierstrass M-test, fall back on the uniform Dirichlet or Abel test when the M-test fails, and explain why failure is not disproof.

The definition is available but requires a supremum that is often hard to compute. This lecture supplies three working tests, ordered by how easy they are to apply.

## Three-line recap

- Uniform convergence $\iff$ $\sup_x|R_n(x)|\to0$, where $R_n$ is the tail after term $n$.
- M-test: dominate each term by a constant $M_n$ with $\sum M_n$ convergent.
- A failed M-test means only that this tool is unavailable; Dirichlet or Abel may still settle the question.

## The sup criterion

$\sum u_n(x)$ converges uniformly on $I$ if and only if

$$
\sup_{x\in I}\Big|\sum_{k=n+1}^{\infty}u_k(x)\Big|\ \longrightarrow\ 0 .
$$

This is the definition rewritten. One warning about order: compute the tail first, then take the supremum over $x$. Reversing the order computes a different quantity.

## The Weierstrass M-test

Suppose there are constants $M_n\ge0$, independent of $x$, with

$$
|u_n(x)|\le M_n\quad(x\in I,\ n=1,2,\dots),\qquad \sum_{n=1}^{\infty}M_n<+\infty .
$$

Then $\sum u_n(x)$ converges uniformly and absolutely on $I$.

One line of proof: the tail is bounded by $\sum_{k>n}M_k$, a number independent of $x$ that tends to zero.

Example one: $\sum_{n\ge1}\frac{\sin nx}{n^2}$ converges uniformly on $\mathbb{R}$. Take $M_n=\frac{1}{n^2}$, whose sum is $\pi^2/6$. The bound does not care how large $x$ is.

Example two: $\sum_{n\ge1}\frac{x^n}{n}$ converges uniformly on $[-r,r]$ for $0<r<1$. Take $M_n=\frac{r^n}{n}$; then $\sum M_n=-\ln(1-r)<+\infty$. The bound grows as $r\to1$, but it is finite for each fixed $r$.

## When the M-test fails but convergence is still uniform

Consider $\sum_{n\ge1}(-1)^{n-1}\frac{x^n}{n}$ on $[0,1]$.

The M-test is unavailable: the supremum of the $n$-th term is $\frac1n$ (attained at $x=1$), and $\sum\frac1n$ diverges. That is not a proof of non-uniformity.

Use the uniform Dirichlet test instead. The partial sums of $a_n=(-1)^{n-1}$ take only the values $0$ and $1$, so $M=1$ works for every $x$. The factors $b_n(x)=\frac{x^n}{n}$ decrease in $n$ for each fixed $x$ (since $x^n$ does, and division by $n$ preserves it), and

$$
0\le b_n(x)\le\frac1n\ \longrightarrow\ 0
$$

uniformly in $x$. Hence the series converges uniformly on $[0,1]$. At $x=1$ it becomes $\sum\frac{(-1)^{n-1}}{n}=\ln2$, so the endpoint is fine too.

> [!NOTE]
> The M-test is sufficient only. When it fails, the series may still converge uniformly; switch to Dirichlet or Abel rather than concluding the opposite.

## Uniform Dirichlet and Abel

**Dirichlet (uniform form).** If there is $M$ independent of $x$ and $n$ with $\big|\sum_{k=1}^{n}a_k(x)\big|\le M$ for all $x\in I$ and all $n$; and if for each $x$ the sequence $b_n(x)$ is monotone in $n$ with $b_n(x)\rightrightarrows0$ uniformly, then $\sum a_n(x)b_n(x)$ converges uniformly on $I$.

**Abel (uniform form).** If $\sum a_n(x)$ converges uniformly on $I$, and for each $x$ the sequence $b_n(x)$ is monotone in $n$ with $|b_n(x)|\le M$ for a constant $M$ independent of $x$ and $n$, then $\sum a_n(x)b_n(x)$ converges uniformly on $I$.

| Test | On $a$ | On $b$ | Example |
| --- | --- | --- | --- |
| M-test | termwise domination | none | $\sum\frac{\sin nx}{n^2}$ |
| Dirichlet | uniformly bounded partial sums | monotone, uniformly to $0$ | $\sum\frac{(-1)^{n-1}x^n}{n}$ |
| Abel | uniform convergence | monotone, uniformly bounded | $\sum\frac{(-1)^n}{n}\big(1+\frac{x}{n}\big)$ |

## Three misconceptions

> [!MYTH] If the M-test fails, convergence is not uniform.
> It is a sufficient condition only. For $\sum(-1)^{n-1}\frac{x^n}{n}$ the supremum is $\frac1n$ and the M-test fails, yet Dirichlet proves uniform convergence on $[0,1]$.

> [!MYTH] Pointwise absolute convergence plus continuous terms implies uniform convergence.
> Not enough. $\sum x^n(1-x)$ converges absolutely at each point of $[0,1]$ with continuous terms, but the tail supremum is identically $1$, so convergence is not uniform; the limit is even discontinuous at $1$.

> [!MYTH] Uniform convergence on $[-r,r]$ extends to the endpoint by letting $r$ grow.
> It does not. $\sum x^n$ is uniformly convergent on every $[-r,r]$ with $r<1$, but not on $(-1,1)$ or on $[0,1)$. Endpoints need separate treatment.

## Practice

> [!PRACTICE] 1 · M-test
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{\cos nx}{n^2}$ converges uniformly on $\mathbb{R}$.
>
> > [!ANSWER] Show answer
> > $\big|\frac{\cos nx}{n^2}\big|\le\frac{1}{n^2}$ and $\sum\frac{1}{n^2}=\frac{\pi^2}{6}$ converges. The M-test gives uniform and absolute convergence.

> [!PRACTICE] 2 · Closed subinterval
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{x^n}{1+x^n}$ converges uniformly on $[0,\tfrac12]$.
>
> > [!ANSWER] Show answer
> > On $[0,\tfrac12]$, $1+x^n\ge1$, so $\big|\frac{x^n}{1+x^n}\big|\le2^{-n}$ and $\sum2^{-n}=1$. Uniform convergence follows.

> [!PRACTICE] 3 · M-test fails
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n+x}$ converges uniformly on $[0,+\infty)$.
>
> > [!ANSWER] Show answer
> > The M-test gives nothing: $\sup\big|\frac{1}{n+x}\big|=\frac1n$ and $\sum\frac1n$ diverges. Use Dirichlet: the partial sums are $0$ or $1$, bounded by $1$; $b_n=\frac{1}{n+x}$ decreases in $n$ with $0<b_n\le\frac1n\to0$ uniformly. Hence uniform convergence.

> [!PRACTICE] 4 · Negative example
> Show that $\displaystyle\sum_{n=1}^{\infty}nxe^{-nx}$ is not uniformly convergent on $(0,+\infty)$.
>
> > [!ANSWER] Show answer
> > Each term peaks at $x=\frac1n$ with value $e^{-1}$, so $\sum\sup=\infty$ and the M-test is unavailable (that alone proves nothing). The real reason: the sum equals $\frac{xe^{-x}}{(1-e^{-x})^2}\sim\frac1x$ as $x\to0^+$, which is unbounded on $(0,+\infty)$, while every partial sum is bounded. Uniform convergence would preserve boundedness, a contradiction.

## Formal statement

> [!FORMAL] Formal statement
> Weierstrass: if $|u_n(x)|\le M_n$ for all $x\in I$ and all $n$, and $\sum M_n$ converges, then $\sum u_n(x)$ converges uniformly and absolutely on $I$. Dirichlet: if there is $M$ with $\big|\sum_{k=1}^{n}a_k(x)\big|\le M$ for all $x,n$, and $b_n(x)$ is monotone in $n$ with $\sup_{x\in I}|b_n(x)|\to0$, then $\sum a_nb_n$ converges uniformly on $I$. Abel: if $\sum a_n(x)$ converges uniformly on $I$ and $b_n(x)$ is monotone in $n$ and uniformly bounded, then $\sum a_nb_n$ converges uniformly on $I$. All three are proved from the Cauchy criterion and summation by parts, bounding the tail by a quantity independent of $x$.
