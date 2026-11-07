---
slug: "improper-singular"
subject: "analysis"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Integrals of Unbounded Functions"
subtitle: "The endpoint runs off, the area may stay finite"
minutes: 13
meta: ["13 min read","Requires elementary calculus","Mastery level"]
concepts: ["impropint"]
prereq: ["impropint"]
related: ["impropint", "paramint"]
---

## Goals

By the end of this lecture you can spot the singular point of an integral, write it as a limit, decide convergence, and avoid the most common computational accident: substituting the endpoints anyway.

The previous lecture sent the right endpoint to infinity. This one lets the function blow up at an endpoint. The mathematics is identical: a definite integral rewritten as a limit.

## Three-line recap

- $\int_0^1 x^{-1/2}\mathrm{d}x$ has an unbounded integrand near $0$, yet it still means something.
- The recipe: compute $\int_\eta^1$ first, then let $\eta\to0^+$.
- Finite limit means convergence. Unboundedness itself is irrelevant; only the rate matters.

## The singular point: step the endpoint inward

Let $f$ be defined on $(a,b]$, unbounded near $a$, and integrable on $[a+\eta,b]$ for each $\eta>0$. Define

$$
\int_a^b f(x)\,\mathrm{d}x=\lim_{\eta\to0^+}\int_{a+\eta}^{b}f(x)\,\mathrm{d}x .
$$

The point $a$ is called a **singular point**. If it sits at the right end, use $\lim_{\eta\to0^+}\int_a^{b-\eta}f$; if it sits inside at $c$, split into $\int_a^c+\int_c^b$ and require both pieces to converge.

The simplest computation:

$$
\int_\eta^1\frac{\mathrm{d}x}{\sqrt x}=2-2\sqrt\eta\ \longrightarrow\ 2 .
$$

So $\int_0^1x^{-1/2}\mathrm{d}x=2$. A logarithmic case: for $\varepsilon>0$,

$$
\int_\varepsilon^1\ln x\,\mathrm{d}x=[x\ln x-x]_\varepsilon^1=-1-\varepsilon\ln\varepsilon+\varepsilon\ \longrightarrow\ -1 .
$$

Here $\varepsilon\ln\varepsilon\to0$ is used. The integrand equals $-\infty$ at $0$, yet the integral is the ordinary number $-1$.

## The p-test for singular endpoints

The same substitution gives

$$
\int_0^1\frac{\mathrm{d}x}{x^p}\ \text{converges}\iff p<1,\qquad \text{value}\ \frac{1}{1-p}.
$$

| Integral | Exponent | Value or verdict |
| --- | --- | --- |
| $\int_0^1 x^{-1/2}\mathrm{d}x$ | $p=\tfrac12$ | $2$ |
| $\int_0^1 \mathrm{d}x/x$ | $p=1$ | diverges ($\ln\frac1\eta$) |
| $\int_0^1 x^{-2}\mathrm{d}x$ | $p=2$ | diverges ($\frac1\eta-1$) |

Put the two tables side by side: $\int_1^{+\infty}$ needs $p>1$, while $\int_0^1$ needs $p<1$. The directions are opposite because $x=1/t$ carries the neighbourhood of $0$ out to $+\infty$. Do not memorise them separately; ask which growth wins. Near $0$, $x^{-p}$ converges exactly when it is milder than $1/x$.

## Two singular points: split first

$\displaystyle\int_0^1\frac{\mathrm{d}x}{\sqrt{x(1-x)}}$ is unbounded at both ends, so split at $\tfrac12$:

$$
\int_0^{1/2}\frac{\mathrm{d}x}{\sqrt{x(1-x)}}+\int_{1/2}^{1}\frac{\mathrm{d}x}{\sqrt{x(1-x)}}.
$$

On $[0,\tfrac12]$, $\sqrt{x(1-x)}\ge\sqrt{x/2}$, so the integrand is at most $\sqrt2\,x^{-1/2}$; the right half is symmetric. Both converge. For the value, substitute $x=\sin^2\theta$: $\mathrm{d}x=2\sin\theta\cos\theta\,\mathrm{d}\theta$ and $\sqrt{x(1-x)}=\sin\theta\cos\theta$, hence

$$
\int_0^1\frac{\mathrm{d}x}{\sqrt{x(1-x)}}=\int_0^{\pi/2}2\,\mathrm{d}\theta=\pi .
$$

> [!NOTE]
> One divergent piece makes the whole integral divergent. $\int_0^1\frac{\mathrm{d}x}{x(1-x)}$ is $p=1$ at both ends, so it diverges even though the integrand is perfectly tame in the middle.

## Substituting endpoints gives wrong answers

Treat $\int_{-1}^{1}\frac{\mathrm{d}x}{x^2}$ as an ordinary definite integral and apply Newton–Leibniz:

$$
\Big[-\frac1x\Big]_{-1}^{1}=-1-1=-2 .
$$

Wrong. The integrand is unbounded at $0$, and

$$
\int_\eta^1\frac{\mathrm{d}x}{x^2}=\frac1\eta-1\to+\infty .
$$

The correct answer is divergence. The error is skipping the definition: the antiderivative $-\frac1x$ is undefined at $0$ and has no right to be used across the whole interval.

> [!NOTE]
> Before applying Newton–Leibniz, scan the interval: any zero denominator, any logarithm of zero, any zero under a root? If yes, split into limits first, substitute afterwards.

## Three misconceptions

> [!MYTH] An unbounded function cannot be integrated.
> Unboundedness only rules out the original definition for bounded functions. The limit can still exist: $\int_0^1x^{-1/2}\mathrm{d}x=2$ is an ordinary finite number.

> [!MYTH] A singular point means the integral diverges.
> Divergence happens only when the blow-up is too fast. $\int_0^1x^{-1/2}\mathrm{d}x$ converges, $\int_0^1x^{-2}\mathrm{d}x$ diverges; only the exponent separates them.

> [!MYTH] If an antiderivative exists, just plug in the endpoints.
> That gives $-2$ for $\int_{-1}^1x^{-2}\mathrm{d}x$, while the integral diverges. When the antiderivative is undefined at the singular point, the substitution formula has lost its hypothesis.

## Practice

> [!PRACTICE] 1 · Compute
> Evaluate $\displaystyle\int_0^1\frac{\mathrm{d}x}{\sqrt{1-x}}$.
>
> > [!ANSWER] Show answer
> > An antiderivative is $-2\sqrt{1-x}$, which is $0$ at $1$ and $-2$ at $0$, so the value is $2$. This is $p=\tfrac12$.

> [!PRACTICE] 2 · Substitute
> Evaluate $\displaystyle\int_0^{\pi/2}\frac{\cos x}{\sqrt{\sin x}}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > Put $u=\sin x$, $\mathrm{d}u=\cos x\,\mathrm{d}x$: the integral becomes $\int_0^1u^{-1/2}\mathrm{d}u=2$.

> [!PRACTICE] 3 · Logarithmic type
> Evaluate $\displaystyle\int_0^1\frac{\ln x}{\sqrt x}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > An antiderivative is $\sqrt x\,(2\ln x-4)$. At $1$ it equals $-4$, and $\sqrt x\ln x\to0$ at $0$, so the value is $-4$.

> [!PRACTICE] 4 · Two-sided singularity
> Decide convergence of $\displaystyle\int_0^2\frac{\mathrm{d}x}{(x-1)^2}$.
>
> > [!ANSWER] Show answer
> > The singular point is $x=1$. On the left, $\int_0^{1-\eta}(1-x)^{-2}\mathrm{d}x=\frac1\eta-1\to+\infty$, already divergent. No need to inspect the right half; the whole integral diverges.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be defined on $(a,b]$, unbounded in every right neighbourhood of $a$, and integrable on $[a+\eta,b]$ for every $\eta\in(0,b-a)$. If $\lim_{\eta\to0^+}\int_{a+\eta}^{b}f$ exists and is finite, the integral $\int_a^b f$ converges and equals that limit. Cauchy form: for every $\varepsilon>0$ there is $\delta>0$ such that $\big|\int_{a+\eta_1}^{a+\eta_2}f\big|<\varepsilon$ whenever $0<\eta_1<\eta_2<\delta$. If the singular point is interior at $c$, set $\int_a^b f=\int_a^c f+\int_c^b f$, convergent only when both terms are.
