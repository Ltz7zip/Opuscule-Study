---
slug: "series-def"
subject: "analysis"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Convergence of Series"
subtitle: "Define the infinite sum before you evaluate it"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["series", "cauchy"]
prereq: ["cauchy"]
related: ["series", "posseries"]
---

## Goals

By the end of this lecture you can translate "add infinitely many terms" into a limit of partial sums, use the Cauchy criterion, and explain why the harmonic series diverges while $\sum 1/n^2$ converges.

Every result in this chapter rests on one move: replace an infinite sum by a sequence. Make that substitution cleanly and the rest has something to stand on.

## Three-line recap

- $\sum_{n=1}^{\infty}a_n$ is not an object you can add up directly; it is a symbol.
- The actual object is the partial sum $S_n=a_1+\cdots+a_n$, an ordinary sequence.
- The series converges $\iff$ $\{S_n\}$ converges. Every tool for sequences transfers.

## Partial sums: an infinite sum becomes a sequence

Let $\{a_n\}$ be a sequence and $S_n=\sum_{k=1}^{n}a_k$. If $\lim_{n\to\infty}S_n=S$ exists and is finite, the series **converges** with sum $S$; otherwise it **diverges**. The difference $r_n=S-S_n$ is the tail after $n$ terms.

The geometric series is the complete example. Take $q=\tfrac12$:

$$
S_n=\sum_{k=1}^{n}\frac{1}{2^k}=1-\frac{1}{2^n}\ \longrightarrow\ 1 .
$$

In general $\sum_{n=1}^{\infty}q^n=\dfrac{q}{1-q}$ for $|q|<1$, giving $1$ at $q=\tfrac12$. For $|q|\ge1$ the terms do not tend to zero and the series diverges immediately.

> [!NOTE]
> Convergence asks only whether $\{S_n\}$ has a limit. What the limit is, is a second question. Many series can be classified but not summed, e.g. $\sum 1/n^2=\pi^2/6$.

## Why the harmonic series diverges

$\sum_{n\ge1}\frac1n$ has terms tending to $0$, yet diverges. Group by powers of two:

$$
S_{2^m}=1+\Big(\frac12\Big)+\Big(\frac13+\frac14\Big)+\cdots+\Big(\frac{1}{2^{m-1}+1}+\cdots+\frac{1}{2^m}\Big).
$$

Group $j$ contains $2^{j-1}$ terms, each at least $\frac{1}{2^{j}}$, so the whole group is at least $\frac12$. Hence $S_{2^m}\ge1+\frac{m}{2}\to+\infty$.

Numerically: $S_4\approx2.083$, $S_8\approx2.718$, $S_{16}\approx3.381$, $S_{1024}\approx7.51$. Reaching $20$ would need roughly $2^{38}$ terms.

## The Cauchy criterion and the necessary condition

The series converges iff for every $\varepsilon>0$ there is $N$ such that for $n>m>N$,

$$
\Big|\sum_{k=m+1}^{n}a_k\Big|<\varepsilon .
$$

Taking $n=m+1$ yields the **necessary condition** $a_n\to0$. It is only necessary: $\frac1n\to0$ while the harmonic series diverges. So "terms tend to zero" can refute convergence, never confirm it.

An easy one to miss: $a_n=\sqrt{n+1}-\sqrt n=\frac{1}{\sqrt{n+1}+\sqrt n}$ tends to $0$, yet

$$
S_n=\sqrt{n+1}-1\ \longrightarrow\ +\infty ,
$$

so the series diverges. The decay rate is $1/(2\sqrt n)$: too slow.

## Telescoping series: the ones you can sum

If $a_n=b_n-b_{n+1}$, then $S_n=b_1-b_{n+1}$, so the sum is $b_1-\lim b_{n+1}$.

Example:

$$
\frac{1}{n(n+1)}=\frac1n-\frac1{n+1},\qquad \sum_{n=1}^{\infty}\frac{1}{n(n+1)}=1-0=1 .
$$

The partial sum is $S_n=1-\frac{1}{n+1}$, already $0.909$ at $n=10$. Such series, together with geometric ones, are the only families whose exact sum you should expect to write down.

## Three misconceptions

> [!MYTH] If the terms tend to zero, the series converges.
> The harmonic series is the counterexample: $1/n\to0$ while partial sums grow like $\ln n$. The necessary condition only refutes convergence.

> [!MYTH] If a bracketed version converges, so does the original.
> $(1-1)+(1-1)+\cdots$ has partial sums identically $0$ and converges; $1-1+1-1+\cdots$ oscillates between $0$ and $1$ and diverges. Bracketing changes how partial sums are sampled and is safe only after convergence is known.

> [!MYTH] The terms of a convergent series can be reordered freely.
> Only absolutely convergent series allow that. The alternating harmonic series is conditionally convergent: rearrangement can make it sum to any prescribed real number, or diverge.

## Practice

> [!PRACTICE] 1 · Telescoping
> Evaluate $\displaystyle\sum_{n=1}^{\infty}\frac{1}{4n^2-1}$.
>
> > [!ANSWER] Show answer
> > $\frac{1}{4n^2-1}=\frac12\Big(\frac{1}{2n-1}-\frac{1}{2n+1}\Big)$, so the partial sum is $\frac12\big(1-\frac{1}{2N+1}\big)$ and the limit is $\frac12$.

> [!PRACTICE] 2 · Geometric
> Evaluate $\displaystyle\sum_{n=1}^{\infty}\Big(-\frac12\Big)^n$.
>
> > [!ANSWER] Show answer
> > First term $-\frac12$, ratio $-\frac12$, so the sum is $\frac{-1/2}{1+1/2}=-\frac13$, not $+\frac13$.

> [!PRACTICE] 3 · Bound it
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^2}$ converges and give an upper bound.
>
> > [!ANSWER] Show answer
> > For $n\ge2$, $\frac{1}{n^2}\le\int_{n-1}^{n}\frac{\mathrm{d}x}{x^2}$, so the partial sums are at most $1+\int_1^{\infty}x^{-2}\mathrm{d}x=2$. Monotone and bounded, hence convergent with sum below $2$ (the true value is $\pi^2/6\approx1.645$).

> [!PRACTICE] 4 · Using the necessary condition
> Decide convergence of $\displaystyle\sum_{n=1}^{\infty}\big(\sqrt{n+1}-\sqrt n\big)$.
>
> > [!ANSWER] Show answer
> > The term is asymptotic to $\frac{1}{2\sqrt n}\to0$, so the necessary condition holds. But $S_N=\sqrt{N+1}-1\to+\infty$, so the series diverges. The necessary condition is not sufficient.

## Formal statement

> [!FORMAL] Formal statement
> Let $\{a_n\}$ be real and $S_n=\sum_{k=1}^{n}a_k$. If $\{S_n\}$ converges to a finite $S$, then $\sum_{n=1}^{\infty}a_n$ converges with sum $S$. Cauchy criterion: $\sum a_n$ converges iff for every $\varepsilon>0$ there is $N$ such that $\big|\sum_{k=m+1}^{n}a_k\big|<\varepsilon$ whenever $n>m\ge N$. Setting $n=m+1$ gives $a_n\to0$, so a series whose terms do not vanish diverges. Bracketing a convergent series preserves convergence and the sum; the converse fails. An absolutely convergent series has the same sum after any rearrangement; a conditionally convergent series can be rearranged to any prescribed real value (Riemann rearrangement theorem).
