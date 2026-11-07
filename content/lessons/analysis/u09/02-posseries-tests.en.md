---
slug: "posseries-tests"
subject: "analysis"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Tests for Positive Series"
subtitle: "Monotone and bounded — four words, four tests"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["posseries", "series"]
prereq: ["series"]
related: ["posseries", "impropint"]
---

## Goals

By the end of this lecture you can take a positive series, pick a test within seconds — comparison, ratio, root, integral — and know which one to switch to when the first fails.

Positive series are the foundation of the whole chapter, for a plain reason: partial sums increase, so convergence is exactly boundedness. Every test is a repackaging of that sentence.

## Three-line recap

- If $a_n\ge0$, then $S_n$ increases, so convergence $\iff$ $\{S_n\}$ is bounded above.
- Comparison traps the series between two known ones; the limit form compares orders only.
- Ratio and root tests handle terms carrying $n$-th powers or factorials; the $p$-series is where every comparison ends.

## Bounded means convergent

Let $a_n\ge0$ and $S_n=\sum_{k=1}^n a_k$. Then $S_1\le S_2\le\cdots$. A monotone increasing sequence either converges or tends to $+\infty$, with nothing in between. Hence

$$
\sum_{n=1}^{\infty}a_n\ \text{converges}\iff \{S_n\}\ \text{is bounded above}.
$$

This converts "find the sum" into "estimate a bound". Take $\sum\frac{1}{n!}$: since $n!\ge2^{n-1}$, $S_n\le1+1=2$, so the series converges, with sum $e\approx2.718$.

## Comparison and limit comparison

**Comparison.** If $0\le a_n\le b_n$: convergence of $\sum b_n$ forces convergence of $\sum a_n$; divergence of $\sum a_n$ forces divergence of $\sum b_n$.

**Limit comparison.** If $a_n,b_n>0$ and $\lim a_n/b_n=L\in(0,+\infty)$, the two series share a verdict.

| Series | Reference | Ratio limit | Verdict |
| --- | --- | --- | --- |
| $\sum\frac{1}{n^2+3n}$ | $\sum\frac1{n^2}$ | $1$ | converges |
| $\sum\frac{1}{2n+1}$ | $\sum\frac1n$ | $\tfrac12$ | diverges |
| $\sum\frac{\ln n}{n^3}$ | $\sum\frac{1}{n^{2.5}}$ | $0$ | converges |
| $\sum\frac{1}{n\ln(n+1)}$ | $\sum\frac1n$ | $+\infty$ | diverges |

In the third row the ratio of $\frac{\ln n}{n^3}$ to $n^{-2.5}$ is $\frac{\ln n}{\sqrt n}\to0$, so $L=0$ and the reference converges; the series converges. The exponent $2.5$ rather than $3$ is chosen to leave room for the logarithm.

## Ratio and root tests

**Ratio (d'Alembert).** For $a_n>0$, let $\rho=\lim_{n\to\infty}\frac{a_{n+1}}{a_n}$. Then $\rho<1$ gives convergence, $\rho>1$ divergence, $\rho=1$ nothing.

**Root (Cauchy).** Same conclusions with $\rho=\lim_{n\to\infty}\sqrt[n]{a_n}$.

Example one: $a_n=\frac{n!}{n^n}$,

$$
\frac{a_{n+1}}{a_n}=\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!}=\Big(\frac{n}{n+1}\Big)^n\longrightarrow\frac1e\approx0.368<1,
$$

so it converges.

Example two: $a_n=\Big(1-\frac1n\Big)^{n^2}$,

$$
\sqrt[n]{a_n}=\Big(1-\frac1n\Big)^{n}\longrightarrow\frac1e<1,
$$

so it converges. Both rest on $(1+1/n)^n\to e$.

> [!NOTE]
> At $\rho=1$ the test says nothing at all. Both $\sum\frac1n$ (divergent) and $\sum\frac{1}{n^2}$ (convergent) have $\rho=1$.

## The integral test and p-series

Let $f$ be nonnegative and decreasing on $[1,+\infty)$. Then

$$
\sum_{n=1}^{\infty}f(n)\ \text{converges}\iff\int_1^{+\infty}f(x)\,\mathrm{d}x\ \text{converges}.
$$

The reason is $\int_n^{n+1}f\le f(n)\le\int_{n-1}^{n}f$: the partial sums and the integral bound each other.

With $f(x)=x^{-p}$ this gives the **$p$-series**: $\sum\frac{1}{n^p}$ converges for $p>1$ and diverges for $p\le1$. The case $p=1$ is the harmonic series; at $p=2$ the sum is $\pi^2/6\approx1.645$.

With $f(x)=\frac{1}{x(\ln x)^q}$ the integral becomes $\int\frac{\mathrm{d}t}{t^q}$, so it converges for $q>1$ and diverges for $q\le1$. Hence $\sum\frac{1}{n\ln n}$ diverges while $\sum\frac{1}{n(\ln n)^2}$ converges.

## Three misconceptions

> [!MYTH] A ratio test value of $\rho=1$ means the series converges.
> $\rho=1$ is a failure, not a verdict. Both $\sum 1/n$ and $\sum 1/n^2$ have $\rho=1$; one diverges, one converges.

> [!MYTH] Once the ratio test fails, nothing more can be done.
> Failure means only that this tool cannot see the difference. Switch to comparison or the integral test. The ratio limit for $\sum\frac{1}{n(\ln n)^2}$ is also $1$, yet the integral test settles it at once.

> [!MYTH] The comparison test requires a term-by-term inequality.
> The limit form needs only that $\lim a_n/b_n$ be a positive finite number; no explicit inequality has to be produced. For $\sum\frac{1}{n^2+3n}$ the single ratio $1$ finishes the job.

## Practice

> [!PRACTICE] 1 · Ratio
> Decide $\displaystyle\sum_{n=1}^{\infty}\frac{2^n n!}{n^n}$.
>
> > [!ANSWER] Show answer
> > $\frac{a_{n+1}}{a_n}=2\big(\frac{n}{n+1}\big)^n\to\frac{2}{e}\approx0.736<1$, so it converges.

> [!PRACTICE] 2 · Root
> Decide $\displaystyle\sum_{n=1}^{\infty}\Big(\frac{n}{2n+1}\Big)^n$.
>
> > [!ANSWER] Show answer
> > $\sqrt[n]{a_n}=\frac{n}{2n+1}\to\frac12<1$, so it converges.

> [!PRACTICE] 3 · Integral test
> Decide $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n\ln n}$ and $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n(\ln n)^2}$.
>
> > [!ANSWER] Show answer
> > The first matches $\int_2^{\infty}\frac{\mathrm{d}x}{x\ln x}=\ln\ln x\big|_2^{\infty}=+\infty$: divergent. The second matches $\big[-\frac{1}{\ln x}\big]_2^{\infty}=\frac{1}{\ln2}\approx1.443$: convergent.

> [!PRACTICE] 4 · Equivalent infinitesimals
> Decide $\displaystyle\sum_{n=1}^{\infty}\sin\frac{1}{n^2}$.
>
> > [!ANSWER] Show answer
> > $\sin\frac{1}{n^2}\sim\frac{1}{n^2}$, so the ratio limit is $1$ and the series shares the verdict of the convergent $p$-series with $p=2$. It converges.

## Formal statement

> [!FORMAL] Formal statement
> Let $a_n\ge0$. Then $\sum a_n$ converges iff its partial sums are bounded above. Comparison: if $0\le a_n\le b_n$ and $\sum b_n$ converges, then $\sum a_n$ converges. Limit comparison: if $a_n,b_n>0$ and $\lim a_n/b_n=L\in(0,+\infty)$, both series share a verdict; if $L=0$, convergence of $\sum b_n$ implies convergence of $\sum a_n$; if $L=+\infty$, divergence of $\sum b_n$ implies divergence of $\sum a_n$. Ratio test: if $\lim a_{n+1}/a_n=\rho$, then $\rho<1$ gives convergence, $\rho>1$ divergence, $\rho=1$ inconclusive. Root test uses $\lim\sqrt[n]{a_n}$ with the same conclusions. Integral test: for nonnegative decreasing $f$, $\sum f(n)$ and $\int_1^{+\infty}f$ share a verdict. Consequently $\sum n^{-p}$ converges iff $p>1$.
