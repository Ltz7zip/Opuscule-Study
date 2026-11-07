---
slug: "alternating-series"
subject: "analysis"
unit: "u09"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Alternating Series and Absolute Convergence"
subtitle: "How much cancellation actually buys"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["series", "posseries"]
prereq: ["series"]
related: ["series", "funcseries"]
---

## Goals

By the end of this lecture you can apply the Leibniz test, bound the error with the remainder formula, and tell absolute convergence from conditional convergence by what each one permits.

Every test so far assumed nonnegative terms. Allow signs to alternate and partial sums stop being monotone, so all arguments built on "bounded implies convergent" collapse. Alternating series are the tractable case, because their partial sums rock back and forth.

## Three-line recap

- In $\sum(-1)^{n-1}u_n$ the sign flips, so partial sums oscillate between two monotone subsequences.
- If $u_n$ decreases to $0$, those subsequences are squeezed to one limit and the series converges.
- Convergence is not absolute convergence: $\sum\frac{(-1)^{n-1}}{n}$ converges while $\sum\frac1n$ diverges.

## The Leibniz test and its remainder

Let $u_n>0$, $u_1\ge u_2\ge\cdots$, and $\lim u_n=0$. Then $\sum_{n=1}^{\infty}(-1)^{n-1}u_n$ converges and

$$
|r_n|=\Big|\sum_{k=n+1}^{\infty}(-1)^{k-1}u_k\Big|\le u_{n+1}.
$$

The proof inspects two subsequences: even partial sums $S_{2m}$ increase, odd ones $S_{2m+1}$ decrease, and $S_{2m}\le S_{2m+1}$. Both are monotone and bounded, and their limits differ by $u_{2m+1}\to0$.

Geometrically, the true sum is trapped between two consecutive partial sums, so the error never exceeds the next term. This is the first thing to reach for in any alternating estimate.

## Using the remainder bound

Take $\ln 2=1-\frac12+\frac13-\frac14+\cdots$ and stop at $n=10$:

$$
S_{10}=1-\frac12+\frac13-\cdots-\frac{1}{10}=0.6456\ldots
$$

The bound is $|r_{10}|\le u_{11}=\frac{1}{11}\approx0.0909$. The true value is $0.6931$, so the actual error is $0.0475$, comfortably inside.

To force an error below $10^{-3}$ you need $\frac{1}{n+1}<10^{-3}$, that is $n\ge999$. Slow: a thousand terms buy three digits.

> [!NOTE]
> The Leibniz bound is $u_{n+1}$, not $u_n$, and not $\frac{u_{n+1}}{2}$. The actual error is often about half the next term, but the provable bound is the next term itself.

## Absolute versus conditional convergence

If $\sum|a_n|$ converges, $\sum a_n$ is **absolutely convergent**. If $\sum a_n$ converges while $\sum|a_n|$ diverges, it is **conditionally convergent**.

Absolute convergence implies convergence, because $\big|\sum_{k=m+1}^{n}a_k\big|\le\sum_{k=m+1}^{n}|a_k|$ and the right side can be made small by Cauchy.

| Series | Itself | Absolute value | Type |
| --- | --- | --- | --- |
| $\sum\frac{(-1)^{n-1}}{n^2}$ | converges | $\sum\frac{1}{n^2}$ converges | absolute |
| $\sum\frac{(-1)^{n-1}}{n}$ | converges | $\sum\frac1n$ diverges | conditional |
| $\sum\frac{(-1)^{n-1}}{\sqrt n}$ | converges | $\sum n^{-1/2}$ diverges | conditional |
| $\sum\frac{\sin n}{n^2}$ | converges | $\sum\frac{1}{n^2}$ converges | absolute |

The order of work is fixed: test the absolute-value series first, using every positive-series tool; only if that fails do you invoke Leibniz or Dirichlet on the signed series.

## The price of conditional convergence: rearrangement

An absolutely convergent series can be reordered freely without changing its sum. A conditionally convergent one cannot.

For $\sum\frac{(-1)^{n-1}}{n}$ the positive and negative parts both diverge:

$$
\sum_{k\ge1}\frac{1}{2k-1}=+\infty,\qquad \sum_{k\ge1}\frac{1}{2k}=+\infty .
$$

So fix any real $L$: add positive terms until the sum exceeds $L$, then negative terms until it drops below $L$, and repeat. Because terms tend to $0$, the overshoot shrinks and the rearranged series converges to $L$. This is the Riemann rearrangement theorem.

The price, stated plainly: the sum of a conditionally convergent series is a property of the order, not of the set of terms.

## Three misconceptions

> [!MYTH] Every alternating series converges.
> Monotone decrease to zero is also required. Take $u_n=\frac1n$ for odd $n$ and $u_n=\frac{1}{n^2}$ for even $n$: $u_n\to0$ but is not decreasing ($u_3=\frac13>u_2=\frac14$). The positive terms diverge, the negative terms converge, and the series diverges to $+\infty$.

> [!MYTH] The Leibniz conditions are necessary as well as sufficient.
> They are sufficient only. Convergence can occur without monotonicity, for instance by pairing consecutive terms. Monotonicity is there to make the two subsequences monotone, which is what the proof needs.

> [!MYTH] Absolute and conditional convergence differ in name only.
> They differ in rearrangement and in multiplication. Absolutely convergent series keep their sum under any reordering, and the Cauchy product of two absolutely convergent series converges to the product of the sums; a conditionally convergent series can change value under rearrangement.

## Practice

> [!PRACTICE] 1 · Error bound
> Does $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{\sqrt n}$ converge? What is the error bound after ten terms?
>
> > [!ANSWER] Show answer
> > $u_n=n^{-1/2}$ decreases to $0$, so Leibniz gives convergence. The error is at most $u_{11}=1/\sqrt{11}\approx0.302$.

> [!PRACTICE] 2 · Classify
> Classify $\displaystyle\sum_{n=1}^{\infty}(-1)^n\frac{n}{n^2+1}$.
>
> > [!ANSWER] Show answer
> > With $u_n=\frac{n}{n^2+1}$, the ratio $u_{n+1}/u_n<1$ for $n\ge2$, so $u_n$ decreases to $0$ and the series converges. But $u_n\sim\frac1n$, so the absolute-value series diverges. Conditionally convergent.

> [!PRACTICE] 3 · Logarithmic denominator
> Decide $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^n}{\ln(n+1)}$.
>
> > [!ANSWER] Show answer
> > $\frac{1}{\ln(n+1)}$ decreases to $0$, so Leibniz gives convergence. Since $\frac{1}{\ln(n+1)}>\frac1n$ for $n\ge10$, the absolute-value series diverges. Conditionally convergent.

> [!PRACTICE] 4 · By hand
> Estimate $\ln 2$ from four terms and bound the error.
>
> > [!ANSWER] Show answer
> > $S_4=1-\frac12+\frac13-\frac14=\frac{7}{12}\approx0.5833$, with $|r_4|\le u_5=\frac15=0.2$. The true value is $0.6931$, so the error is $0.1098$, inside the bound.

## Formal statement

> [!FORMAL] Formal statement
> Leibniz test: if $\{u_n\}$ decreases to $0$, then $\sum(-1)^{n-1}u_n$ converges and $\big|\sum_{k=n+1}^{\infty}(-1)^{k-1}u_k\big|\le u_{n+1}$ for every $n$. Proof: $S_{2m}$ increases, $S_{2m+1}$ decreases, and $S_{2m}\le S_{2m+1}=S_{2m}+u_{2m+1}$, so both subsequences converge to the same limit. Absolute convergence: $\sum|a_n|$ converges; then $\sum a_n$ converges and every rearrangement has the same sum. Conditional convergence: $\sum a_n$ converges but $\sum|a_n|$ diverges; then some rearrangement converges to any prescribed real number, and some rearrangement diverges (Riemann).
