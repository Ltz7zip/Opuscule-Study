---
slug: "taylor-series"
subject: "analysis"
unit: "u10"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Expanding Functions into Power Series"
subtitle: "The equals sign is not automatic"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["powerseries", "taylor"]
prereq: ["powerseries", "taylor"]
related: ["taylor", "powerseries"]
---

## Goals

By the end of this lecture you can write down the Taylor series of a function at a point, bound the truncation error with the Lagrange remainder, and explain the gap between writing a series and having it equal the function.

The order matters. First comes the Taylor polynomial with its remainder: finite, always true. Then the series: a limit. Only then the equality: that requires the remainder to vanish.

## Three-line recap

- Inside its interval of convergence a power series may be differentiated and integrated term by term.
- Being infinitely differentiable at a point only lets you write the Taylor series down; it does not make the series converge to the function.
- Whether an approximation is good enough is decided by $R_n$, not by how many terms you added.

## Taylor series and remainder

Let $f$ have $n+1$ derivatives near $x_0$. Then

$$
f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+R_n(x),
$$

with the Lagrange remainder

$$
R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1},
$$

where $\xi$ lies between $x_0$ and $x$. This is the mean value theorem applied $n+1$ times, and it holds for every finite $n$.

If $R_n(x)\to0$ for a given $x$, letting $n\to\infty$ gives

$$
f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n.
$$

For $e^x$: every derivative is $e^x$, all equal to $1$ at $0$, so the series is $\sum x^n/n!$. The easy half. The half that needs work is proving the remainder tends to zero, which is the next section.

## Five expansions worth memorising

| Function | Expansion | Where it holds |
| --- | --- | --- |
| $e^x$ | $\sum_{n\ge0}\frac{x^n}{n!}$ | $(-\infty,+\infty)$ |
| $\sin x$ | $\sum_{n\ge0}\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $(-\infty,+\infty)$ |
| $\cos x$ | $\sum_{n\ge0}\frac{(-1)^n x^{2n}}{(2n)!}$ | $(-\infty,+\infty)$ |
| $\ln(1+x)$ | $\sum_{n\ge1}\frac{(-1)^{n-1}x^n}{n}$ | $(-1,1]$ |
| $(1+x)^\alpha$ | $1+\sum_{n\ge1}\frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}x^n$ | $(-1,1)$ |

Add the template $\frac{1}{1-x}=\sum_{n\ge0}x^n$ for $|x|<1$. Integrating $\frac{1}{1+t}$ term by term gives $\ln(1+x)$; integrating $\frac{1}{1+x^2}$ gives $\arctan x$. Two of the five above can be rebuilt from the template in one line each.

The interval for $\ln(1+x)$ is $(-1,1]$, not $[-1,1)$. At $x=1$ the series becomes the alternating harmonic series and sums to $\ln2$; at $x=-1$ it becomes the harmonic series and diverges. The two ends behave differently and must be checked separately.

## Bounding the remainder

**Example 1.** For $e^x$ on $[-1,1]$, $|f^{(n+1)}|=e^\xi\le e$ and $|x|^{n+1}\le1$, so

$$
|R_n|\le\frac{e}{(n+1)!}.
$$

At $n=6$ this is $\frac{e}{5040}\approx5.4\times10^{-4}$, enough for four decimals. At $n=9$ it is $\frac{e}{3628800}\approx7.5\times10^{-7}$.

**Example 2.** For $\sin 0.1$, keeping only the first term $0.1$ leaves

$$
|R_1|\le\frac{0.1^3}{3!}=\frac{0.001}{6}\approx1.67\times10^{-4}.
$$

The true value is $0.0998334$ and the actual error is $1.67\times10^{-4}$ — the bound is tight. Keeping two terms gives $0.0998333$ and an error below $8.3\times10^{-8}$.

**Example 3.** $\arctan1=\frac{\pi}{4}=1-\frac13+\frac15-\cdots$. Truncating after $\frac{1}{2N-1}$ leaves an error of at most $\frac{1}{2N+1}$. To push the error below $5\times10^{-4}$ you need $N\ge1001$. A thousand terms for three decimals is why practical computations of $\pi$ use Machin's formula instead.

## Smooth but not analytic

$$
f(x)=\begin{cases}e^{-1/x^2}, & x\ne0,\\ 0, & x=0.\end{cases}
$$

Induction shows $f^{(n)}(x)=P_n(1/x)e^{-1/x^2}$ with $P_n$ a polynomial, and $e^{-1/x^2}$ decays faster than any power of $x$. Hence $f^{(n)}(0)=0$ for every $n$.

So its Taylor series is

$$
0+0\cdot x+0\cdot x^2+\cdots=0,
$$

with radius of convergence $+\infty$, yet it fails to equal $f$ at every $x\ne0$: $f(1)=e^{-1}\approx0.368$, while the series gives $0$. Being $C^\infty$ is strictly weaker than being analytic.

## Three misconceptions

> [!MYTH] Infinite differentiability is enough to expand a function in a Taylor series.
> Expansion requires the remainder to vanish. $e^{-1/x^2}$ has derivatives of every order, its Taylor series converges everywhere, and it agrees with the function only at $x=0$.

> [!MYTH] If the Taylor series converges, it converges to the function.
> Convergence says the series has a sum; equality says that sum is $f(x)$. In the example above the series sums to the zero function while $f$ is not zero anywhere except at the origin.

> [!MYTH] Adding more terms always improves the approximation.
> A power series is only valid inside its interval of convergence. For $\frac{1}{1-x}=\sum x^n$ at $x=-2$, the partial sums run $1,-1,3,-5,11,\dots$: they oscillate, grow without bound, and move away from the value $1/3$.

## Practice

> [!PRACTICE] 1 · By hand
> Use the series for $e^x$ to compute $e^{0.5}$ through the term $\frac{x^5}{5!}$. Give four decimals and an error bound.
>
> > [!ANSWER] Show answer
> > Summing: $1+0.5+0.125+0.0208333+0.0026042+0.0002604=1.6486979$, so $1.6487$. The remainder satisfies $|R_5|\le e^{0.5}\cdot\frac{0.5^6}{720}\approx3.6\times10^{-5}$, so four decimals are safe.

> [!PRACTICE] 2 · Estimate the error
> Expand $\ln(1+x)$ through $x^3$ and evaluate at $x=0.1$, with an error bound.
>
> > [!ANSWER] Show answer
> > $0.1-\frac{0.01}{2}+\frac{0.001}{3}=0.0953333$. The fourth derivative is $-\frac{6}{(1+\xi)^4}$, so $|R_3|\le\frac{6}{(1+\xi)^4}\cdot\frac{0.1^4}{24}\le2.5\times10^{-5}$. The true value is $0.0953102$; the actual error is $2.3\times10^{-5}$.

> [!PRACTICE] 3 · Expand
> Expand $\frac{1}{2+x}$ at $x=0$ and give the radius and interval of convergence.
>
> > [!ANSWER] Show answer
> > $\frac{1}{2+x}=\frac12\cdot\frac{1}{1+x/2}=\sum_{n\ge0}\frac{(-1)^n}{2^{n+1}}x^n$, so $R=2$. At $x=\pm2$ the terms do not tend to zero, so the interval is $(-2,2)$.

> [!PRACTICE] 4 · A limit
> Use expansions to compute $\displaystyle\lim_{x\to0}\frac{\sin x-x}{x^3}$.
>
> > [!ANSWER] Show answer
> > $\sin x=x-\frac{x^3}{6}+O(x^5)$, so the numerator is $-\frac{x^3}{6}+O(x^5)$ and the limit is $-\frac16$.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be $n+1$ times differentiable on an interval $I$ containing $x_0$ and $x$. Then for some $\xi$ between $x_0$ and $x$, $f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$. If $f$ is infinitely differentiable near $x_0$ and $\lim_{n\to\infty}R_n(x)=0$ for every $x$ in that neighbourhood, then $f(x)=\sum_{n\ge0}\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$, and $f$ is called analytic at $x_0$. An analytic function may be differentiated and integrated term by term inside its interval of convergence, and the resulting series sum to $f'$ and to $\int f$. Both $e^x,\sin x,\cos x$ are analytic on the whole line; $f(x)=e^{-1/x^2}$ for $x\ne0$ with $f(0)=0$ is infinitely differentiable at $0$ but not analytic there.
