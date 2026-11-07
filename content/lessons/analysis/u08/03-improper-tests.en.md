---
slug: "improper-tests"
subject: "analysis"
unit: "u08"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Convergence Tests for Improper Integrals"
subtitle: "Compare orders, not integrals"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["impropint", "posseries"]
prereq: ["impropint"]
related: ["posseries", "paramint"]
---

## Goals

By the end of this lecture you can settle a new improper integral in three steps: identify the singular behaviour, estimate the order of the integrand, then compare against a known integral.

Most improper integrals have no elementary antiderivative, so convergence cannot be decided by "just compute it". A test compares growth rates instead.

## Three-line recap

- $\int_1^{+\infty}x^{-p}\mathrm{d}x$ converges for $p>1$; $\int_0^1x^{-p}\mathrm{d}x$ converges for $p<1$.
- Trap the unknown between two known integrals, or show it has the same order as a $p$-integral.
- Sign-changing integrands need separate treatment: absolute convergence first, conditional convergence second.

## The comparison test: only the order matters

Suppose $0\le f(x)\le g(x)$ for all sufficiently large $x$.

- If $\int_a^{+\infty}g$ converges, then $\int_a^{+\infty}f$ converges.
- If $\int_a^{+\infty}f$ diverges, then $\int_a^{+\infty}g$ diverges.

One sentence of proof: $\int_a^A f$ increases with $A$, and a monotone quantity bounded above has a limit.

Example: $\displaystyle\int_1^{+\infty}\frac{x+1}{x^3+2}\mathrm{d}x$. For large $x$ the numerator behaves like $x$ and the denominator like $x^3$, so the whole thing behaves like $x^{-2}$. Precisely,

$$
\frac{x+1}{x^3+2}\Big/\frac{1}{x^2}=\frac{x^3+x^2}{x^3+2}\ \longrightarrow\ 1 .
$$

A positive finite ratio means the same order. The integral converges, and we never need its value.

## Three cases of the limit comparison

Let $f,g>0$ and $\lim_{x\to+\infty}f(x)/g(x)=L$, allowing $L=0$ or $L=+\infty$.

| $L$ | Conclusion | Example |
| --- | --- | --- |
| $0<L<+\infty$ | same verdict for both | $\frac{1}{x^2+3x}$ against $\frac1{x^2}$ |
| $L=0$ | $g$ converges $\Rightarrow$ $f$ converges | $\frac{1}{x^3e^{x}}$ against $\frac1{x^3}$ |
| $L=+\infty$ | $g$ diverges $\Rightarrow$ $f$ diverges | $\frac{1}{\sqrt{x}\ln x}$ against $\frac1{\sqrt x}$ |

The third row is the one misused. $L=+\infty$ says only that $f$ is much larger than $g$, so divergence passes from $g$ to $f$; if $g$ converges, nothing is known. Symmetrically, $L=0$ carries no information when $g$ diverges.

> [!NOTE]
> Mnemonic: $L=\infty$ makes $f$ the heavier one, so bad news (divergence) flows from $g$ to $f$. $L=0$ makes $f$ the lighter one, so good news (convergence) flows from $g$ to $f$.

## Absolute and conditional convergence

If $\int_a^{+\infty}|f|$ converges, the integral is **absolutely convergent**. If $\int_a^{+\infty}f$ converges but $\int_a^{+\infty}|f|$ does not, it is **conditionally convergent**.

Absolute convergence implies convergence, immediately from the Cauchy criterion and $\big|\int_{A_1}^{A_2}f\big|\le\int_{A_1}^{A_2}|f|$.

The standard counterexample to the converse is $\displaystyle\int_1^{+\infty}\frac{\sin x}{x}\mathrm{d}x$, which converges by parts, while

$$
\frac{|\sin x|}{x}\ge\frac{\sin^2 x}{x}=\frac{1}{2x}-\frac{\cos 2x}{2x}.
$$

The first term integrates to $\tfrac12\ln A\to+\infty$ and the second converges, so $\int_1^{+\infty}\frac{\sin^2x}{x}$ diverges, hence so does $\int\frac{|\sin x|}{x}$. That is what conditional means: convergence purchased entirely by cancellation between signs.

## Dirichlet and Abel tests

**Dirichlet (integral form).** If $F(A)=\int_a^A f$ is bounded and $g$ is monotone with $g(x)\to0$ as $x\to+\infty$, then $\int_a^{+\infty}fg$ converges.

**Abel (integral form).** If $\int_a^{+\infty}f$ converges and $g$ is monotone and bounded, then $\int_a^{+\infty}fg$ converges.

The tool behind both is the second mean value theorem: for monotone $g$ there is $\xi\in(A_1,A_2)$ with $\int_{A_1}^{A_2}fg=g(A_1)\int_{A_1}^{\xi}f+g(A_2)\int_{\xi}^{A_2}f$, so the tail is controlled by the bound on $|F|$ times $g(A_1)$.

Example: $\displaystyle\int_1^{+\infty}\frac{\sin x}{x^p}\mathrm{d}x$ converges for every $p>0$, since $\big|\int_1^A\sin x\,\mathrm{d}x\big|\le2$ and $x^{-p}$ decreases to $0$. At $p=1$ this is exactly a conditionally convergent integral; for $p>1$ it is absolutely convergent. Dirichlet covers the whole range $0<p\le1$.

## Three misconceptions

> [!MYTH] The comparison test applies directly to sign-changing integrands.
> Direct comparison needs $0\le f\le g$. Saying $\frac{\sin x}{x}$ is smaller than $\frac1x$ and therefore converges is invalid, because the partial integrals are not monotone. Take absolute values or switch to Dirichlet.

> [!MYTH] If the integral of the absolute value diverges, the original diverges.
> That is precisely the conditional case. $\int_1^{+\infty}\frac{\sin x}{x}\mathrm{d}x$ converges while $\int_1^{+\infty}\frac{|\sin x|}{x}\mathrm{d}x$ diverges.

> [!MYTH] In limit comparison, $L=0$ means both integrals share a verdict.
> $L=0$ transfers convergence from $g$ to $f$ only. Take $f=1/x^2$ and $g=1/x$: $L=0$, $f$ converges, $g$ diverges. Not the same verdict.

## Practice

> [!PRACTICE] 1 · Limit comparison
> Decide convergence of $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{x\sqrt{x^2+1}}$.
>
> > [!ANSWER] Show answer
> > As $x\to+\infty$ the integrand is of order $x^{-2}$: the ratio $x^2/(x\sqrt{x^2+1})\to1$. Since $p=2>1$, it converges.

> [!PRACTICE] 2 · Two logarithms
> Decide $\displaystyle\int_2^{+\infty}\frac{\mathrm{d}x}{x\ln x}$ and $\displaystyle\int_2^{+\infty}\frac{\mathrm{d}x}{x(\ln x)^2}$.
>
> > [!ANSWER] Show answer
> > The first has antiderivative $\ln\ln x\to+\infty$: divergent. The second has antiderivative $-1/\ln x$, giving $1/\ln2\approx1.443$: convergent.

> [!PRACTICE] 3 · Dirichlet
> Is $\displaystyle\int_1^{+\infty}\frac{\sin x}{\sqrt x}\,\mathrm{d}x$ absolutely convergent?
>
> > [!ANSWER] Show answer
> > It converges by Dirichlet: the sine integral is bounded by $2$ and $x^{-1/2}\downarrow0$. It is not absolutely convergent, because $|\sin x|\ge\sin^2x$ makes $\int\frac{|\sin x|}{\sqrt x}$ diverge. So it is conditionally convergent.

> [!PRACTICE] 4 · Ruling out trouble
> Decide $\displaystyle\int_1^{+\infty}e^{-x}x^{10}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > Convergent. For large $x$, $e^{-x}x^{10}\le C/x^2$ because exponential decay beats every power, so comparison with $\int_1^{+\infty}x^{-2}$ works. Its value is $10!$ minus a tiny tail, about $3.6\times10^6$.

## Formal statement

> [!FORMAL] Formal statement
> Let $f,g$ be locally integrable on $[a,+\infty)$ with $g\ge0$. If $|f|\le g$ and $\int_a^{+\infty}g$ converges, then $\int_a^{+\infty}f$ converges absolutely. If $\lim_{x\to+\infty}f/g=L$ with $0<L<+\infty$, the two integrals share a verdict. Dirichlet: if $\big|\int_a^A f\big|\le M$ for all $A>a$, and $g$ is monotone with $\lim_{x\to+\infty}g=0$, then $\int_a^{+\infty}fg$ converges. Abel: if $\int_a^{+\infty}f$ converges and $g$ is monotone and bounded, then $\int_a^{+\infty}fg$ converges. Both follow from the second mean value theorem, which gives $\int_{A_1}^{A_2}fg=g(A_1)\int_{A_1}^{\xi}f+g(A_2)\int_{\xi}^{A_2}f$ for some $\xi\in(A_1,A_2)$.
