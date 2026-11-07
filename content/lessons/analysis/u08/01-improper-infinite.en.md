---
slug: "improper-infinite"
subject: "analysis"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Integrals over Unbounded Intervals"
subtitle: "Push the upper limit to infinity and watch the limit"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["impropint", "defint"]
prereq: ["defint"]
related: ["impropint", "posseries"]
---

## Goals

By the end of this lecture you can turn $\int_a^{+\infty} f(x)\,\mathrm{d}x$ into a limit, decide whether it converges, and hand-calculate the $p$-integral plus two standard values.

Three things only: write the definition, compute the $p$-integral once, and separate "converges" from "the integrand tends to zero".

## Three-line recap

- A definite integral $\int_a^b f$ assumes a bounded interval and a bounded function.
- Replace $b$ by a variable $A$: the integral becomes an ordinary function of $A$.
- Let $A\to+\infty$. If that function has a finite limit, the improper integral converges and the limit is its value.

## Definition: infinity replaced by a limit

Let $f$ be defined on $[a,+\infty)$ and integrable on $[a,A]$ for every $A>a$. Set

$$
\int_a^{+\infty} f(x)\,\mathrm{d}x=\lim_{A\to+\infty}\int_a^A f(x)\,\mathrm{d}x .
$$

The integral **converges** when the limit exists and is finite; otherwise it **diverges**. Divergence is not the same as "equals infinity": for $\int_1^{+\infty}\sin x\,\mathrm{d}x$ the partial integral is $1-\cos A$, which oscillates between $0$ and $2$ and has no limit at all.

The basic computation:

$$
\int_1^A \frac{\mathrm{d}x}{x^2}=1-\frac{1}{A}\ \longrightarrow\ 1 .
$$

So $\int_1^{+\infty}x^{-2}\,\mathrm{d}x=1$. The region runs infinitely far to the right, yet its area is the finite number $1$. That single example is where "improper" and "infinite area" part company.

## The p-integral: one dividing line

For $p\ne 1$,

$$
\int_1^A \frac{\mathrm{d}x}{x^p}=\frac{A^{1-p}-1}{1-p},
$$

while for $p=1$ the partial integral is $\ln A$. Hence

$$
\int_1^{+\infty}\frac{\mathrm{d}x}{x^p}\ \text{converges}\iff p>1,\qquad \text{with value}\ \frac{1}{p-1}.
$$

| $p$ | Partial integral | Limit | Verdict |
| --- | --- | --- | --- |
| $p=\tfrac12$ | $2\sqrt{A}-2$ | $+\infty$ | diverges |
| $p=1$ | $\ln A$ | $+\infty$ | diverges |
| $p=2$ | $1-\tfrac1A$ | $1$ | converges |

There is exactly one threshold, $p=1$. Being $0.001$ above it converges; being $0.001$ below it diverges. The threshold comes from the antiderivative switching from a power $x^{1-p}$ to $\ln x$.

## Two values worth computing by hand

**First.** For $\displaystyle\int_1^{+\infty}\frac{\ln x}{x^2}\,\mathrm{d}x$, take $u=\ln x$, $\mathrm{d}v=x^{-2}\mathrm{d}x$, so $v=-1/x$:

$$
\int_1^A \frac{\ln x}{x^2}\mathrm{d}x=\Big[-\frac{\ln x}{x}\Big]_1^A+\int_1^A\frac{\mathrm{d}x}{x^2}
=-\frac{\ln A}{A}+1-\frac1A\ \longrightarrow\ 1 .
$$

The vanishing of $\ln A/A$ is the point: logarithms grow slower than any positive power.

**Second.** $\displaystyle\int_0^{+\infty}e^{-x}\sin x\,\mathrm{d}x$. An antiderivative is $-\tfrac12 e^{-x}(\sin x+\cos x)$, so

$$
\Big[-\tfrac12 e^{-x}(\sin x+\cos x)\Big]_0^{A}\ \longrightarrow\ 0-\Big(-\tfrac12\Big)=\frac12 .
$$

Substituting $+\infty$ directly works here only because $e^{-x}$ crushes the trigonometric factor to zero.

## Convergence does not require a vanishing integrand

Put a triangular spike of height $1$ and base $4^{-n}$ on $[n,\ n+4^{-n}]$ for $n=2,3,\dots$, and zero elsewhere. Each spike has area at most $4^{-n}$, and

$$
\sum_{n=2}^{\infty}4^{-n}=\frac{1}{16}\cdot\frac{1}{1-\frac14}=\frac{1}{12}.
$$

So $\int_1^{+\infty}f$ converges, yet $f(n)=1$ at every integer and $f$ does not tend to $0$. The converse also fails: $1/x\to 0$ while $\int_1^{+\infty}\mathrm{d}x/x$ diverges.

> [!NOTE]
> An improper integral counts accumulated area only; it does not care how large the integrand is at isolated points or on sparse spikes. So $f\to0$ is neither necessary nor sufficient for convergence.

## Three misconceptions

> [!MYTH] An integral over an infinite interval must have infinite area.
> An unbounded region can have bounded area. $\int_1^{+\infty}x^{-2}\mathrm{d}x=1$: the area under that curve equals a unit square.

> [!MYTH] If the integrand tends to zero, the integral converges.
> $\tfrac1x\to0$, but $\int_1^{A}\tfrac{\mathrm{d}x}{x}=\ln A\to+\infty$. The speed of decay decides; the $p$-integral locates the boundary.

> [!MYTH] If the integral converges, the integrand must tend to zero.
> Place ever-narrower spikes of height $1$ at the integers with total area below $1/12$: the integral converges while $f(n)=1$ for every $n$. Integrals are blind to sparse spikes.

## Practice

> [!PRACTICE] 1 · Direct computation
> Evaluate $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{(x+1)^3}$.
>
> > [!ANSWER] Show answer
> > An antiderivative is $-\tfrac{1}{2(x+1)^2}$, giving $0-\big(-\tfrac18\big)=\tfrac18$. It converges.

> [!PRACTICE] 2 · Integration by parts
> Evaluate $\displaystyle\int_0^{+\infty}xe^{-x}\,\mathrm{d}x$.
>
> > [!ANSWER] Show answer
> > $\int_0^A xe^{-x}\mathrm{d}x=[-xe^{-x}-e^{-x}]_0^A=1-(A+1)e^{-A}\to1$.

> [!PRACTICE] 3 · Decide
> Which converges: $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{\sqrt{x}}$ or $\displaystyle\int_1^{+\infty}\frac{\mathrm{d}x}{x\sqrt{x}}$?
>
> > [!ANSWER] Show answer
> > The first has $p=\tfrac12\le1$ and partial integral $2\sqrt A-2\to+\infty$: divergent. The second has $p=\tfrac32>1$ and converges to $2$.

> [!PRACTICE] 4 · Conditional convergence
> Show that $\displaystyle\int_1^{+\infty}\frac{\sin x}{x}\,\mathrm{d}x$ converges.
>
> > [!ANSWER] Show answer
> > By parts, $\int_1^A\frac{\sin x}{x}\mathrm{d}x=\Big[\frac{-\cos x}{x}\Big]_1^A-\int_1^A\frac{\cos x}{x^2}\mathrm{d}x$. The bracket tends to $\cos1$; the remaining integral is bounded by $\int_1^{+\infty}x^{-2}\mathrm{d}x=1$. Convergence follows. It is not absolute — the next lecture takes that up.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be locally integrable on $[a,+\infty)$. The integral $\int_a^{+\infty}f$ converges if there is a real $I$ such that for every $\varepsilon>0$ there is $A_0>a$ with $\big|\int_a^A f-I\big|<\varepsilon$ whenever $A>A_0$. Equivalently (Cauchy criterion): for every $\varepsilon>0$ there is $A_0$ such that $\big|\int_{A_1}^{A_2}f\big|<\varepsilon$ whenever $A_2>A_1>A_0$. It follows at once that convergence of $\int_a^{+\infty}|f|$ implies convergence of $\int_a^{+\infty}f$, since $\big|\int_{A_1}^{A_2}f\big|\le\int_{A_1}^{A_2}|f|$.
