---
slug: "taylor-formula"
subject: "analysis"
unit: "u05"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Taylor's Formula"
subtitle: "A polynomial impersonating a function, with the bill in the remainder"
minutes: 17
meta: ["17 min read","Requires elementary calculus","Mastery level"]
concepts: ["taylor", "mvt"]
prereq: ["mvt"]
related: ["taylor", "extremum"]
---

## Goals

By the end of this lecture you can write Taylor's formula with the Peano remainder and with the Lagrange remainder, explain which question each remainder answers, and use a second-order expansion both to approximate a number and to evaluate a limit.

Taylor's formula is Lagrange's theorem promoted in degree. The mean value theorem replaces a function by a line; Taylor replaces it by a parabola, a cubic, or an $n$-th degree curve, and writes the error explicitly into the remainder. How good the approximation is depends on how many terms you keep and whether the remainder can be controlled.

## Three-line recap

- Lagrange: $f(x)=f(x_0)+f'(\xi)(x-x_0)$, which is Taylor's formula of order one.
- Requiring the expansion to match $f$ in its first, second, …, up to $n$-th derivative at $x_0$ pins the coefficients down uniquely.
- What is left over is the remainder, and it decides how many decimals of the approximation you can trust.

## The coefficients are forced

Suppose $f$ has $n$ derivatives at $x_0$, and set

$$P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k .$$

We demand $P_n^{(k)}(x_0)=f^{(k)}(x_0)$ for $k=0,1,\dots,n$. Differentiate $k$ times and substitute $x=x_0$: only the degree-$k$ term survives, contributing $k!$ times its coefficient. Hence the coefficient must be $\dfrac{f^{(k)}(x_0)}{k!}$, with no freedom left.

For $f(x)=e^x$ at $x_0=0$ every derivative equals $e^x$ and hence equals $1$ at $0$:

$$e^x=1+x+\frac{x^2}{2}+\frac{x^3}{6}+\cdots+\frac{x^n}{n!}+R_n(x).$$

## Three remainders, three jobs

| Remainder | Form | Hypotheses | Good for |
| --- | --- | --- | --- |
| Peano | $R_n=o\bigl((x-x_0)^n\bigr)$ | $n$ derivatives at $x_0$ | Limits; purely local information |
| Lagrange | $R_n=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ | $n+1$ derivatives on the interval | Bounding the absolute error |
| Cauchy | $R_n=\dfrac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n(x-x_0)$ | same as above | Sharper estimates near an endpoint |

All three describe the same deficit, at different prices. Peano is the weakest: it only promises "smaller than order $n$" and gives no constant. Lagrange is the strongest: it gives a bound, but needs one more derivative and hides $\xi$.

## Estimating with the Lagrange remainder

Approximate $e$ with $n=4$:

$$e\approx 1+1+\frac{1}{2}+\frac{1}{6}+\frac{1}{24}=2.708333\ldots$$

The error is $\dfrac{e^{\xi}}{5!}$ for some $\xi\in(0,1)$, hence at most $\dfrac{e}{120}<\dfrac{3}{120}=0.025$. Since $e=2.718281\ldots$, the true error is about $0.00995$, well inside the bound.

Next, $\sqrt{1.02}$. Take $f(x)=(1+x)^{1/2}$ at $x_0=0$ with $x=0.02$:

$$f(0)=1,\quad f'(0)=\frac{1}{2},\quad f''(0)=-\frac{1}{4}.$$

So $\sqrt{1.02}\approx 1+\dfrac{0.02}{2}-\dfrac{0.0004}{8}=1.00995$, while the true value is $1.00995049\ldots$: six digits already agree.

## Limits with the Peano remainder

$$\lim_{x\to 0}\frac{e^x-1-x-\frac{x^2}{2}}{x^3}=\lim_{x\to 0}\frac{\frac{x^3}{6}+o(x^3)}{x^3}=\frac{1}{6}.$$

Nothing here requires knowing where $\xi$ is; only that the remainder is $o(x^3)$. Similarly $\cos x=1-\dfrac{x^2}{2}+\dfrac{x^4}{24}+o(x^4)$, so

$$\lim_{x\to 0}\frac{\cos x-1+\frac{x^2}{2}}{x^4}=\frac{1}{24}.$$

For such problems, decide the order first and only then write: too low and you stay stuck in $\frac{0}{0}$, too high and you write terms that never get used.

## Three misconceptions

> [!MYTH] The Taylor polynomial stays accurate away from the expansion point.
> It is a local statement, and accuracy degrades with distance. The third-order expansion of $\sin x$ at $x=3$ gives $3-\dfrac{27}{6}=-1.5$, while $\sin 3\approx 0.141$: even the sign is wrong.

> [!MYTH] The Peano remainder lets you estimate the size of the error.
> It only says $R_n(x)/(x-x_0)^n\to 0$ and supplies no constant. To conclude "the error is below $0.025$" you must switch to the Lagrange remainder.

> [!MYTH] Taylor expansion only works at $x_0=0$.
> Any expansion point is allowed. For instance $\ln x$ at $x_0=1$: $\ln(1+t)=t-\dfrac{t^2}{2}+\dfrac{t^3}{3}-\cdots$ with $t=x-1$. Choose the point where the derivatives are easiest.

## Practice

> [!PRACTICE] 1 · Write it out
> Write the fifth-order Taylor formula for $\sin x$ at $0$ with the Lagrange remainder.
>
> > [!ANSWER] Show answer
> > $\sin x=x-\dfrac{x^3}{6}+\dfrac{x^5}{120}+R_5(x)$ with $R_5(x)=\dfrac{\sin^{(6)}(\xi)}{6!}x^6=\dfrac{-\sin\xi}{720}x^6$, where $\xi$ lies between $0$ and $x$.

> [!PRACTICE] 2 · Evaluate a limit
> Find $\lim_{x\to 0}\dfrac{e^x-1-x-\frac{x^2}{2}}{x^3}$.
>
> > [!ANSWER] Show answer
> > Expand $e^x=1+x+\dfrac{x^2}{2}+\dfrac{x^3}{6}+o(x^3)$; the numerator is $\dfrac{x^3}{6}+o(x^3)$, so the ratio is $\dfrac{1}{6}+o(1)\to\dfrac{1}{6}$.

> [!PRACTICE] 3 · Approximate
> Compute $\sqrt{1.02}$ with the second-order Taylor formula.
>
> > [!ANSWER] Show answer
> > $(1+x)^{1/2}=1+\dfrac{x}{2}-\dfrac{x^2}{8}+R_2$. At $x=0.02$ this gives $1+0.01-0.00005=1.00995$. The remainder is $\dfrac{3}{8}(1+\xi)^{-5/2}\cdot\dfrac{x^3}{6}$, of size about $10^{-8}$.

> [!PRACTICE] 4 · Bound the error
> Approximate $\ln 1.1$ with the third-order Taylor formula and give an error bound.
>
> > [!ANSWER] Show answer
> > $\ln(1+x)=x-\dfrac{x^2}{2}+\dfrac{x^3}{3}+R_3$ with $R_3=-\dfrac{(1+\xi)^{-4}}{4}x^4$. At $x=0.1$: $0.1-0.005+0.000333=0.095333$, with error at most $\dfrac{0.1^4}{4}=0.000025$. The true value is $0.0953102$, so the actual error is about $0.000023$.

> [!FORMAL] Formal statement
> Let $f$ have $n+1$ derivatives on an interval $I$ and let $x_0,x\in I$. Then there is $\xi$ between $x_0$ and $x$ with
> $$f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.$$
> If $f$ has only $n$ derivatives at $x_0$, the only assertion available is $f(x)=P_n(x)+o\bigl((x-x_0)^n\bigr)$. The Peano form follows from repeated L'Hôpital or by induction on the remainder; the Lagrange form follows from an auxiliary function and Rolle's theorem.
