---
slug: "series-convergence-tests"
subject: "calculus"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Numerical Series and Convergence Tests for Positive Terms"
subtitle: "Ask whether it converges before asking what it equals"
minutes: 30
meta: ["30 min read","Requires sequence limits and definite integrals","Mastery level"]
concepts: ["series", "posseries"]
prereq: ["seq"]
related: ["powerseries", "defint", "fourier"]
---

## What this lecture sets out to do

Adding infinitely many numbers sounds like an action but is undefined. Everyone says $1+\frac12+\frac14+\cdots=2$, yet what does "finished adding" mean? If infinite terms could be added like finite ones, the properties of addition would survive. They do not:

$$
(1-1)+(1-1)+\cdots=0,\qquad 1-(1-1)-(1-1)-\cdots=1
$$

Same terms, same order, different bracketing, different result: the sum is not decided by the terms, so a rule must come first. This lecture uses the plainest: add in order, record the running sum, obtain a sequence, and call its limit the sum. Once fixed, every test answers one question — does that sequence have a limit?

The second question is "what does it equal". Hardly any convergent series has an elementary sum, so the emphasis belongs on convergence: the definition, the necessary condition, and four tools for positive series.

By the end of the lecture you should be able to:

- restate "the series converges" in partial sums, and explain why bracketing cannot sum a series;
- prove the divergence of the harmonic series independently by $S_{2^{k}}>1+\frac k2$;
- explain why a positive series converges exactly when its partial sums are bounded;
- reduce a general term to a $p$-series by limit comparison, remembering the threshold $p=1$;
- switch to the integral test or a finer comparison when ratio or root gives $\rho=1$;
- recognise the signal "the term comes from an integrable function" and trade the series for an improper integral.

## Three lines back

- A sequence limit is the unique value pinned down by $\varepsilon$-$N$, depending only on eventual behaviour.
- The first $n$ terms of a geometric sequence sum to $\frac{1-q^{n}}{1-q}$ for $q\ne1$.
- A definite integral is partition, sum, limit — the same infinite accumulation that series use.

## Why "just keep adding" does not work

The ellipsis looks like a verb ($u_1+u_2+\cdots$), but the dots only say "continue", not where the sum ends. Finite sums may be rearranged and bracketed freely; the same habit on infinite sums contradicts itself, for $1-1+1-1+\cdots$ gives $0$ or $1$ by bracketing alone, partial sums hopping between them for ever.

So the sum needs its own definition: break the infinite process into finite, computable numbers,

$$
S_1=u_1,\qquad S_2=u_1+u_2,\qquad S_3=u_1+u_2+u_3,\ \ldots
$$

This is the sequence of **partial sums**: every entry is finite and unambiguous, the only infinite step being $n\to\infty$, already settled.

> [!FORMAL] Definition of convergence
> Given a sequence $\{u_n\}$, write $S_n=\sum_{k=1}^{n}u_k$. If $\{S_n\}$ converges to a finite $S$, the series $\sum_{n=1}^{\infty}u_n$ converges with sum $S$, written $\sum_{n=1}^{\infty}u_n=S$; if $\{S_n\}$ diverges, the series diverges.

Two words matter. "Finite": $S_n\to+\infty$ is definite behaviour but not convergence, since infinity cannot enter arithmetic. "Partial sums", not "terms": $S_n$ decides everything, $u_n$ being only material.

The simplest, and the only fully summed, series is geometric: for $q\ne1$, $(1-q)S_n=1-q^{n}$ gives

$$
S_n=1+q+\cdots+q^{n-1}=\frac{1-q^{n}}{1-q}
$$

Everything turns on $q^{n}$: $|q|<1$ gives $q^{n}\to0$ and sum $\frac{1}{1-q}$; $q=1$ gives $S_n=n\to+\infty$; $q=-1$ makes $S_n$ bounce between $1$ and $0$; $|q|>1$ is unbounded. So $\sum q^{n}$ converges exactly when $|q|<1$. Note $q=-1$: terms do not tend to zero, yet nothing marches to infinity — divergence is not always growth.

| Series | General term | Behaviour | Sum |
| --- | --- | --- | --- |
| Geometric | $q^{n}$ | converges for $\lvert q\rvert<1$ | $\frac{1}{1-q}$ |
| Harmonic | $\frac1n$ | diverges | — |
| Telescoping | $\frac{1}{n(n+1)}$ | converges | $1$ |
| $p$-series | $\frac{1}{n^{p}}$ | converges for $p>1$ | usually no elementary sum |
| Alternating harmonic | $\frac{(-1)^{n-1}}{n}$ | converges | $\ln 2$ |

Some terms split into a difference, so the middle cancels: $\frac{1}{n(n+1)}=\frac1n-\frac1{n+1}$ gives

$$
S_n=\left(1-\frac12\right)+\left(\frac12-\frac13\right)+\cdots+\left(\frac1n-\frac1{n+1}\right)=1-\frac1{n+1}\to1
$$

so the sum is $1$. Tests only report convergence; telescoping delivers the value when available. The logarithmic version $u_n=\ln\left(1+\frac1n\right)=\ln(n+1)-\ln n$ gives $S_n=\ln(n+1)\to+\infty$: the harmonic series in disguise.

## Vanishing terms are only necessary

> [!FORMAL] Necessary condition
> If $\sum u_n$ converges, then $u_n\to0$.

The proof is one line: $S_n\to S$ forces $S_{n-1}\to S$, so $u_n=S_n-S_{n-1}\to0$. Reversed it is the **divergence test**: if $u_n\not\to0$, the series diverges — for instance $\sum\frac{n}{2n+1}$, whose terms tend to $\frac12$.

A necessary condition cannot be read backwards: for $\sum\frac1n$ the terms tend to zero while the partial sums are unbounded. Group $S_{2^{k}}$ by powers of two:

$$
S_{2^{k}}=1+\frac12+\left(\frac13+\frac14\right)+\left(\frac15+\cdots+\frac18\right)+\cdots+\left(\frac1{2^{k-1}+1}+\cdots+\frac1{2^{k}}\right)
$$

Block $j$ ($j=1,\dots,k$) holds $2^{j-1}$ terms, each at least the last, $\frac{1}{2^{j}}$, so the block is at least $\frac12$. With the leading $1$,

$$
S_{2^{k}}\ge 1+\frac{k}{2}\to+\infty
$$

Hence unbounded, hence divergent. The proof also measures the gap: the harmonic series sits on the critical line; $1/n^{2}$ converges, $1/\ln n$ diverges more visibly.

## The comparison test and p-series

The partial sums of a positive series increase, and monotone bounded sequences converge:

> [!NOTE]
> If $u_n\ge0$, then $\sum u_n$ converges if and only if the partial sums $\{S_n\}$ are bounded above.

This is the foundation of all four tools: comparison presses an unknown by something known to be bounded, ratio and root use a geometric series, the integral test turns boundedness into an improper integral. It holds only for positive series; general partial sums swing, boundedness being insufficient.

The intuition: larger convergent forces smaller convergent; smaller divergent forces larger divergent.

> [!FORMAL] Limit comparison test
> Let $u_n>0$, $v_n>0$ and $\lim_{n\to\infty}\frac{u_n}{v_n}=c$ with $0<c<+\infty$. Then $\sum u_n$ and $\sum v_n$ converge or diverge together.

Proof: a finite positive limit gives $\frac c2 v_n\le u_n\le 2c\,v_n$ for large $n$, so the partial sums control each other.

The yardstick is the $p$-series: $\sum n^{-p}$ converges for $p>1$, diverges for $p\le1$. The derivation is a model of block estimation. For $p>1$, block $j$ ($n=2^{j-1}+1,\dots,2^{j}$) has $2^{j-1}$ terms, each at most $2^{-p(j-1)}$, so the block is at most

$$
2^{j-1}\cdot 2^{-p(j-1)}=q^{\,j-1},\qquad q=2^{1-p}<1
$$

Each block is dominated by a convergent geometric series, so the partial sums are bounded. For $p\le1$ the direction reverses: block $j$ is at least $2^{j-1}\cdot2^{-pj}=2^{-p}\left(2^{1-p}\right)^{j-1}\ge 2^{-p}$; every block adds a fixed positive amount, so the partial sums grow linearly in the block count and the series diverges. At $p=1$ this is $1+\frac k2$ again.

**Example 1 (full steps).** Decide whether $\displaystyle\sum_{n=1}^{\infty}\frac{1}{2n^{2}+n}$ converges.

**Step 1, guess the order.** The denominator's leading term is $n^{2}$, so the term is of order $\frac{1}{n^{2}}$.

**Step 2, the ratio.**

$$
\frac{u_n}{v_n}=\frac{1/(2n^{2}+n)}{1/n^{2}}=\frac{n^{2}}{2n^{2}+n}=\frac{1}{2+\frac1n}\to\frac12
$$

**Step 3, conclude.** A finite positive limit means the same behaviour; $p=2>1$, so the series converges. Also $\frac{1}{2n^{2}+n}<\frac{1}{2n^{2}}$, so direct comparison works.

**Example 2 (full steps).** Decide whether $\displaystyle\sum_{n=1}^{\infty}\frac{1}{\sqrt{n^{3}+1}}$ converges.

**Step 1, guess the order.** Inside the root the dominant term is $n^{3}$, giving $n^{3/2}$.

**Step 2, the ratio.** With $v_n=n^{-3/2}$,

$$
\frac{u_n}{v_n}=\frac{n^{3/2}}{\sqrt{n^{3}+1}}=\frac{1}{\sqrt{1+n^{-3}}}\to1
$$

**Step 3, conclude.** $p=\frac32>1$, so the series converges. Shortcut: $n^{3}+1>n^{3}$ gives $u_n<n^{-3/2}$.

Comparison has a missed precondition: **the yardstick must really be comparable**. The ratio of $\sum\frac{1}{n\ln n}$ to $\sum\frac1n$ is $\frac{1}{\ln n}\to0$, so the former is smaller, but "smaller than a divergent series" proves nothing; it diverges, yet needs a finer ruler than a $p$-series.

## The ratio and root tests

When factorials or $a^{n}$ appear, no $p$-series matches, but the ratio of consecutive terms simplifies.

> [!FORMAL] Ratio test
> Let $u_n>0$ and $\displaystyle\lim_{n\to\infty}\frac{u_{n+1}}{u_n}=\rho$. If $\rho<1$ the series converges, if $\rho>1$ it diverges, and if $\rho=1$ the test is inconclusive.

The idea: turn the ratio into a geometric series. If $\rho<1$, choose $\rho<q<1$; then $\frac{u_{n+1}}{u_n}\le q$ for $n\ge N$, and multiplying gives $u_n\le u_N\,q^{\,n-N}$, dominated by a convergent geometric series. If $\rho>1$, choose $1<q<\rho$; then $u_{n+1}\ge q\,u_n$, so the terms eventually increase, cannot tend to zero, and the necessary condition gives divergence.

The proof uses $q$, not $\rho$: $\rho<1$ only says the ratio is eventually a little below $1$, possibly by less and less, so $\rho$ is not a legal common ratio. Inserting $q$ is standard in every limit-type test.

> [!FORMAL] Root test
> Let $u_n\ge0$ and $\displaystyle\lim_{n\to\infty}\sqrt[n]{u_n}=\rho$. If $\rho<1$ the series converges, if $\rho>1$ it diverges, and if $\rho=1$ the test fails.

The proof is the same: choose $\rho<q<1$; eventually $\sqrt[n]{u_n}\le q$, that is $u_n\le q^{n}$.

The division of labour: use the ratio for $n!$, since consecutive factorials differ by one factor; use the root for a whole $n$-th power, which removes it in one step.

**Example 3 (full steps).** Decide whether $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2^{n}}$ converges, and find the sum if so.

**Step 1, the ratio.**

$$
\frac{u_{n+1}}{u_n}=\frac{(n+1)/2^{n+1}}{n/2^{n}}=\frac{n+1}{2n}\to\frac12
$$

**Step 2, conclude.** $\rho=\frac12<1$, so the series converges.

**Step 3, the sum.** Differentiating $\sum x^{n}=\frac{x}{1-x}$ term by term gives $\sum n x^{n}=\frac{x}{(1-x)^{2}}$; at $x=\frac12$,

$$
\sum_{n=1}^{\infty}\frac{n}{2^{n}}=\frac{1/2}{(1/2)^{2}}=2
$$

Tests give only convergence; summing needs another device, and the two tasks are independent.

## The integral test and the critical case

A positive series converges when its partial sums are bounded, and boundedness can be controlled by area. If $f$ is non-negative, continuous and decreasing on $[1,+\infty)$ with $f(n)=u_n$, each rectangle is trapped:

$$
f(k+1)\le\int_{k}^{k+1}f(x)\,dx\le f(k)
$$

Summing over $k=1,\dots,n-1$ gives $\int_{1}^{n}f\le S_{n-1}$ and $\int_{1}^{n}f\ge S_n-u_1$: a bounded integral bounds the partial sums, a divergent one leaves them unbounded.

> [!FORMAL] Integral test
> If $f$ is non-negative, continuous and decreasing on $[1,+\infty)$ with $u_n=f(n)$, then $\sum u_n$ and $\int_{1}^{\infty}f(x)\,dx$ converge or diverge together.

None of the three conditions can be dropped: non-negativity makes the partial sums monotone, continuity makes the integral exist, decrease fixes the rectangle inequality's direction. The test also gives a remainder estimate,

$$
\int_{n+1}^{\infty}f\le S-S_n\le\int_{n}^{\infty}f
$$

so the error of $S_n$ equals the tail area, usable to choose $n$ in numerical work.

**Example 6 (full steps).** Decide whether $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n\ln^{2}n}$ converges.

**Step 1, check the conditions.** Take $f(x)=\frac{1}{x\ln^{2}x}$, non-negative and continuous on $[2,+\infty)$; both $x$ and $\ln^{2}x$ increase, so $f$ decreases.

**Step 2, the integral.** With $t=\ln x$,

$$
\int_{2}^{\infty}\frac{dx}{x\ln^{2}x}=\int_{\ln2}^{\infty}\frac{dt}{t^{2}}=\left[-\frac1t\right]_{\ln2}^{\infty}=\frac{1}{\ln2}\approx1.4427
$$

**Step 3, conclude.** The integral converges, so the series converges.

**The boundary case.** Replace the squared logarithm by one power, $\sum\frac{1}{n\ln n}$:

$$
\int_{2}^{\infty}\frac{dx}{x\ln x}=\left[\ln\ln x\right]_{2}^{\infty}=+\infty
$$

The integral diverges, so the series diverges. One factor $\ln n$ flips the conclusion: criticality continues along the logarithmic direction, and $\sum\frac{1}{n\ln^{p}n}$ converges for $p>1$, diverges for $p\le1$. Hence ratio and root are helpless at $\rho=1$: they recognise powers, not logarithms.

Two remedies exist: a finer ruler (count powers of the logarithm), or comparison with equivalent infinitesimals. Since $\sin\frac1n\sim\frac1n$, $\sum\sin\frac1n$ diverges; since $1-\cos\frac1n\sim\frac{1}{2n^{2}}$, $\sum\left(1-\cos\frac1n\right)$ converges. The difference is whether the first non-zero term is of order one or two.

## A comparison table

| Test | Signal | Form of conclusion | Fails when |
| --- | --- | --- | --- |
| Necessary condition | any series | $u_n\not\to0$ implies divergence | can only prove divergence |
| Comparison (limit form) | term of order $1/n^{p}$ | same behaviour | no comparable series found |
| Ratio | factorials, $a^{n}$ | $\rho<1$ converges, $\rho>1$ diverges | $\rho=1$ |
| Root | whole term an $n$-th power | as above | $\rho=1$ |
| Integral | term from an integrable function | same behaviour | function not monotone or integrable |

A working rule: check whether the terms tend to zero; count powers and prefer comparison; with a factorial or exponential use the ratio; with a whole $n$-th power use the root; with $\ln n$ use the integral test. The tools are ordered from coarse to fine, not four equal choices.

## Four misconceptions

> [!MYTH] If the terms tend to zero, the series converges.
> Necessary, not sufficient: the harmonic series has terms tending to zero and $S_{2^{k}}\ge1+\frac k2$, hence unbounded; convergence always looks at partial sums.

> [!MYTH] If the ratio test gives $\rho=1$, the series converges.
> At $\rho=1$ the test says nothing: $\sum\frac1n$ and $\sum\frac{1}{n^{2}}$ both give $\rho=1$ with opposite behaviour, so use another tool, usually the integral test.

> [!MYTH] A convergent series can always be summed.
> Convergence gives a limit, not an elementary expression. $\sum\frac{1}{n^{2}}=\frac{\pi^{2}}{6}$ and $\sum\frac{(-1)^{n-1}}{n}=\ln2$ need extra technique, and most convergent series admit only numerical approximation.

> [!MYTH] Once a series converges, the terms may be reordered freely.
> Only absolute convergence permits rearrangement. The alternating harmonic series sums to $\ln2$ in its given order; re-pairing positive and negative terms can produce any prescribed number.

## Practice

> [!PRACTICE] 1 · Telescoping
> Find $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n(n+2)}$.
>
> > [!ANSWER] Show answer
> > $\frac{1}{n(n+2)}=\frac12\left(\frac1n-\frac1{n+2}\right)$, so terms one apart cancel: $S_n=\frac12\left(1+\frac12-\frac1{n+1}-\frac1{n+2}\right)\to\frac34$.

> [!PRACTICE] 2 · Ratio and sum
> Decide whether $\displaystyle\sum_{n=1}^{\infty}\frac{3^{n}}{n!}$ converges, and find its sum if so.
>
> > [!ANSWER] Show answer
> > The ratio $\frac{3}{n+1}\to0<1$ gives convergence. Since $e^{3}=\displaystyle\sum_{n=0}^{\infty}\frac{3^{n}}{n!}$, removing the $n=0$ term gives $e^{3}-1$.

> [!PRACTICE] 3 · Integral
> Decide the behaviour of $\displaystyle\sum_{n=2}^{\infty}\frac{1}{n\sqrt{\ln n}}$.
>
> > [!ANSWER] Show answer
> > Take $f(x)=\frac{1}{x\sqrt{\ln x}}$, non-negative, continuous, decreasing. With $t=\ln x$, $\displaystyle\int_2^{\infty}\frac{dx}{x\sqrt{\ln x}}=\left[2\sqrt{\ln x}\right]_2^{\infty}=+\infty$, so the series diverges.

> [!PRACTICE] 4 · Comparison
> Decide the behaviour of $\displaystyle\sum_{n=1}^{\infty}\frac{2n+1}{n^{3}+n}$.
>
> > [!ANSWER] Show answer
> > Numerator degree one, denominator degree three, so the order is $n^{-2}$: $\frac{(2n+1)/(n^{3}+n)}{1/n^{2}}=\frac{2n^{3}+n^{2}}{n^{3}+n}\to2$. Since $p=2>1$, it converges. Alternatively $2n+1\le3n$ and $n^{3}+n>n^{3}$ give $u_n\le\frac{3}{n^{2}}$.

> [!PRACTICE] 5 · Root
> Decide the behaviour of $\displaystyle\sum_{n=1}^{\infty}\left(\frac{n}{2n+3}\right)^{n}$.
>
> > [!ANSWER] Show answer
> > The whole term is an $n$-th power: $\sqrt[n]{u_n}=\frac{n}{2n+3}\to\frac12<1$, hence convergence.

> [!PRACTICE] 6 · Equivalent infinitesimals
> Decide the behaviour of $\displaystyle\sum_{n=1}^{\infty}\sin\frac1n$ and $\displaystyle\sum_{n=1}^{\infty}\left(1-\cos\frac1n\right)$.
>
> > [!ANSWER] Show answer
> > The first has $\frac{\sin(1/n)}{1/n}\to1$, behaving like the harmonic series: divergence. The second has $1-\cos\frac1n\sim\frac{1}{2n^{2}}$, behaving like $p=2$: convergence. Both terms tend to zero, yet the orders $n^{-1}$ and $n^{-2}$ give opposite conclusions.

## Formal statement

> [!FORMAL] Formal statement
> Let $\{u_n\}$ be real and $S_n=\sum_{k=1}^{n}u_k$. If $\{S_n\}$ converges to a finite $S$, $\sum u_n$ converges with sum $S$; otherwise it diverges. A convergent series must have $u_n\to0$, but not conversely. For a positive series, $\{S_n\}$ increases, so convergence is equivalent to boundedness above. Comparison, ratio, root and integral tests all rest on that boundedness; ratio and root fail when the limit equals $1$. The $p$-series $\sum n^{-p}$ converges exactly when $p>1$; more generally $\sum\frac{1}{n(\ln n)^{p}}$ does too. Changing finitely many terms does not affect convergence.

## How this lecture connects

- **Sequence limits** supply the language: a series converges when its partial sums do, and the monotone-bounded and squeeze criteria transfer unchanged.
- **Definite integrals** are the tool of the integral test and another instance of infinite accumulation; the rectangle inequality translates between $\int f$ and $\sum f(n)$.
- **Power series** apply these tests to $\sum a_nx^{n}$, the ratio test giving $\rho=|x|\lim\left|\frac{a_{n+1}}{a_n}\right|$; $\rho<1$ yields the radius of convergence.
- **Fourier series** study series of functions, but pointwise convergence returns to partial sums and the estimates above.
- **Improper integrals** are twins of series: one subdivides an interval, the other extends the index, the criteria corresponding line by line.

In one sentence: a series is not "adding infinitely often" but "asking whether the partial sums have a limit"; every test decides existence without finding the limit.
