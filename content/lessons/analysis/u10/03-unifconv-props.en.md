---
slug: "unifconv-props"
subject: "analysis"
unit: "u10"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Properties of Uniformly Convergent Series"
subtitle: "When the limit may enter the integral sign"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["unifconv"]
prereq: ["unifconv"]
related: ["unifconv", "fourier"]
---

## Goals

By the end of this lecture you can decide whether a series of functions may be differentiated or integrated term by term, and produce a counterexample showing what fails when uniform convergence is dropped.

Uniform convergence earns its place entirely here: it is the licence for three exchange rules. Without it, limits and integrals cannot be swapped, and derivatives certainly cannot.

## Three-line recap

- Continuous terms plus uniform convergence give a continuous sum.
- Continuous terms plus uniform convergence allow termwise integration over a bounded interval.
- Termwise differentiation demands more: the series must converge, and the **differentiated series** must converge uniformly.

## Continuity: the limit does not jump

If each $u_n$ is continuous on $I$ and $\sum u_n$ converges uniformly to $S$ on $I$, then $S$ is continuous on $I$:

$$
\lim_{x\to x_0}\sum_{n=1}^{\infty}u_n(x)=\sum_{n=1}^{\infty}\lim_{x\to x_0}u_n(x).
$$

The proof is the usual $\varepsilon/3$ split: choose $N$ so that the tail is uniformly below $\varepsilon/3$, then use continuity of the finite sum $S_N$ for the middle piece.

The hypothesis cannot be dropped: $f_n(x)=x^n$ is continuous on $[0,1]$, yet the pointwise limit is $1$ at $x=1$ and $0$ elsewhere, hence discontinuous. That alone proves convergence is not uniform.

## Termwise integration

If each $u_n$ is continuous on $[a,b]$ and $\sum u_n$ converges uniformly to $S$ there, then $S$ is integrable and

$$
\int_a^b S(x)\,\mathrm{d}x=\sum_{n=1}^{\infty}\int_a^b u_n(x)\,\mathrm{d}x .
$$

The estimate is direct:

$$
\Big|\int_a^b S-\int_a^b S_N\Big|\le\int_a^b|S-S_N|\le (b-a)\sup_{x\in[a,b]}|S-S_N|\to0 .
$$

A bounded interval is essential. On $[0,+\infty)$ even uniform convergence does not license the swap, because $\int_0^{\infty}$ is itself a limit.

Counterexample: $f_n(x)=nx(1-x^2)^n$ on $[0,1]$. The pointwise limit is $0$, yet

$$
\int_0^1 nx(1-x^2)^n\,\mathrm{d}x=\frac{n}{2(n+1)}\ \longrightarrow\ \frac12\ne\int_0^1 0\,\mathrm{d}x .
$$

The substitution $u=1-x^2$ gives the value. The mass of the $n$-th function concentrates near $x\approx1/\sqrt n$: narrower and taller at the same time, so the integral does not vanish. This is the same family whose supremum grows without bound.

## Termwise differentiation

Let each $u_n$ have a continuous derivative on $[a,b]$, let $\sum u_n(x_0)$ converge at some $x_0\in[a,b]$, and let $\sum u_n'(x)$ converge uniformly on $[a,b]$. Then $\sum u_n$ converges uniformly, and

$$
\Big(\sum_{n=1}^{\infty}u_n(x)\Big)'=\sum_{n=1}^{\infty}u_n'(x).
$$

All three hypotheses matter, above all the third: uniform convergence of the original series is nowhere near enough.

Counterexample: $f_n(x)=\frac{\sin nx}{n}$ converges uniformly to $0$ on $\mathbb{R}$, since $|f_n|\le\frac1n$. But $f_n'(x)=\cos nx$, and $\cos nx$ does not tend to $0$ for $x\ne0$, so differentiation cannot be done term by term. The behaviour of the sum near $x=0$ indeed reflects that.

> [!NOTE]
> Differentiation is the only operation that requires re-testing the series: the original must converge and the derivative series must converge uniformly. Integration needs only the original.

## The three properties side by side

| Property | On the series | Extra hypothesis | Conclusion |
| --- | --- | --- | --- |
| Continuity | uniform convergence | continuous terms | continuous sum |
| Integration | uniform convergence | bounded interval, continuous terms | swap allowed |
| Differentiation | convergence at one point | derivative series uniformly convergent | derivative swaps |

Integration is the cheapest and differentiation the most expensive. This is why many texts prove the integration theorem first, then obtain the differentiation theorem by integrating the derivative series.

## Three misconceptions

> [!MYTH] Pointwise convergence with continuous terms lets you integrate term by term.
> $f_n=nx(1-x^2)^n$ tends to $0$ pointwise while the integrals tend to $\frac12$. Pointwise convergence gives no control over the integral at all.

> [!MYTH] Uniform convergence of the original series is enough to differentiate term by term.
> $f_n=\frac{\sin nx}{n}$ converges uniformly to $0$, but $f_n'=\cos nx$ does not converge to $0$. The differentiated series must itself converge uniformly.

> [!MYTH] The pointwise limit of continuous functions is continuous.
> $x^n$ on $[0,1]$ is continuous at every stage; the limit jumps at $1$. Continuity is inherited only under uniform convergence.

## Practice

> [!PRACTICE] 1 · Limit of an integral
> Find $\displaystyle\lim_{n\to\infty}\int_0^1\frac{x^n}{1+x}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > $\big|\frac{x^n}{1+x}\big|\le x^n$, so the integral is at most $\int_0^1x^n\mathrm{d}x=\frac{1}{n+1}\to0$. The limit is $0$.

> [!PRACTICE] 2 · Disprove
> Is $f_n(x)=\dfrac{nx}{1+n^2x^2}$ uniformly convergent on $[0,1]$? What is the limit of $\int_0^1f_n$?
>
> > [!ANSWER] Show answer
> > The pointwise limit is $0$, but the maximum is $\frac12$ at $x=\frac1n$, so convergence is not uniform. Meanwhile $\int_0^1f_n=\frac{\ln(1+n^2)}{2n}\to0$. The two answers agree here by accident, not by theorem.

> [!PRACTICE] 3 · Termwise derivative
> From $\displaystyle\sum_{n=0}^{\infty}\frac{x^n}{n!}=e^x$, find $\displaystyle\sum_{n=1}^{\infty}\frac{nx^{n-1}}{n!}$.
>
> > [!ANSWER] Show answer
> > On any $[-r,r]$ the derivative series $\sum\frac{n x^{n-1}}{n!}=\sum\frac{x^{n-1}}{(n-1)!}$ converges uniformly, dominated by $\frac{r^{n-1}}{(n-1)!}$. Termwise differentiation is allowed and gives $e^x$.

> [!PRACTICE] 4 · Termwise integral
> Evaluate $\displaystyle\int_0^1\sum_{n=1}^{\infty}\frac{x^n}{n^2}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > The series converges uniformly on $[0,1]$ by the M-test with $\sum\frac{1}{n^2}$, so integrate term by term: $\sum\frac{1}{n^2(n+1)}$. Using $\frac{1}{n^2(n+1)}=-\frac1n+\frac1{n^2}+\frac1{n+1}$, the telescoping part sums to $-1$, so the value is $\frac{\pi^2}{6}-1\approx0.6449$.

## Formal statement

> [!FORMAL] Formal statement
> Let $u_n\in C(I)$ and let $\sum u_n$ converge uniformly to $S$ on $I$. Then $S\in C(I)$. If $I=[a,b]$, then $S$ is Riemann integrable and $\int_a^bS=\sum\int_a^bu_n$. Differentiation: if $u_n\in C^1[a,b]$, $\sum u_n$ converges at some $x_0$, and $\sum u_n'$ converges uniformly on $[a,b]$, then $S\in C^1[a,b]$ with $S'=\sum u_n'$. Proof: set $V=\sum u_n'$. Then $u_n(x)=u_n(x_0)+\int_{x_0}^{x}u_n'(t)\mathrm{d}t$; estimating the partial sums by the mean value form and letting $n\to\infty$ gives $S(x)=S(x_0)+\int_{x_0}^{x}V(t)\mathrm{d}t$, and the fundamental theorem yields $S'=V$.
