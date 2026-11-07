---
slug: "seq-cauchy"
subject: "analysis"
unit: "u02"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Monotone Boundedness and the Cauchy Criterion"
subtitle: "Deciding convergence without knowing the limit"
minutes: 16
meta: ["16 min read","Requires properties of convergent sequences","Mastery level"]
concepts: ["cauchy", "seql"]
prereq: ["seql"]
related: ["seql", "cauchy", "series"]
---

## Goals

Every test so far required a guess at the limit. This lecture supplies two tools that do not: monotone boundedness, which says a bounded monotone sequence converges, and the Cauchy criterion, which inspects only the sequence's own tail.

By the end you can prove convergence for recursive sequences, define $e$ and estimate it, and decide whether a given sequence is Cauchy.

## Three-line recap

- An increasing sequence bounded above converges to its supremum; a decreasing one bounded below converges to its infimum.
- A Cauchy sequence requires every pair of far-out terms to be close, which is much stronger than consecutive terms being close.
- Inside the reals, convergence and the Cauchy property are equivalent; the proof uses completeness.

## Monotone boundedness

Let $\{a_n\}$ be increasing and bounded above. By completeness, $S = \{a_n\}$ has a supremum $\beta$. Given $\varepsilon>0$, the number $\beta-\varepsilon$ is not an upper bound, so some $N$ has $a_N > \beta-\varepsilon$. For $n>N$, monotonicity gives

$$
\beta - \varepsilon < a_N \le a_n \le \beta,
$$

hence $|a_n-\beta|<\varepsilon$. Therefore $a_n \to \beta = \sup\{a_n\}$.

For a decreasing sequence apply this to $-a_n$; the limit is $\inf\{a_n\}$. Both hypotheses are needed: $a_n = n$ is monotone but unbounded, and $a_n = (-1)^n$ is bounded but not monotone.

## Two classical sequences

**Existence of $e$.** Let $a_n = \left(1+\dfrac{1}{n}\right)^n$. The binomial expansion gives

$$
a_n = \sum_{k=0}^{n} \frac{1}{k!}\prod_{j=0}^{k-1}\left(1-\frac{j}{n}\right).
$$

Each factor grows with $n$ and the number of terms grows too, so $\{a_n\}$ increases. On the other hand every product is at most $1$, and $k! \ge 2^{k-1}$ for $k \ge 2$, so

$$
a_n \le 1 + 1 + \frac{1}{2} + \frac{1}{4} + \cdots < 3.
$$

Monotone and bounded, hence convergent. Its limit is $e \approx 2.71828$.

**A recursive sequence.** Take $a_1 = \sqrt{2}$ and $a_{n+1} = \sqrt{2+a_n}$. Induction gives $a_n < 2$: true at $n=1$, and $a_n<2$ implies $a_{n+1}<\sqrt{4}=2$. It also increases, since

$$
a_{n+1}^2 - a_n^2 = 2 + a_n - a_n^2 = (2-a_n)(1+a_n) > 0.
$$

So a limit $L$ exists. Passing to the limit in the recursion gives $L = \sqrt{2+L}$, that is $L^2-L-2=0$, whose positive root is $L=2$. The first terms are $1.414,\ 1.848,\ 1.962,\ 1.990,\dots$.

## The Cauchy criterion

A sequence is Cauchy if for every $\varepsilon>0$ there is $N$ such that $m,n>N$ implies

$$
|a_m - a_n| < \varepsilon.
$$

**Convergence implies Cauchy.** If $a_n \to A$, choose $N$ with $|a_n-A|<\varepsilon/2$ beyond $N$. Then for $m,n>N$,

$$
|a_m-a_n| \le |a_m-A| + |A-a_n| < \varepsilon.
$$

**Cauchy implies convergence.** First take $\varepsilon=1$ to get $|a_n| \le |a_N|+1$ for $n>N$, so the sequence is bounded. A bounded sequence has a convergent subsequence $a_{n_k} \to A$ (proved next lecture). Given $\varepsilon$, choose $N$ with $|a_m-a_n|<\varepsilon/2$ beyond $N$, then choose $k$ with $n_k>N$ and $|a_{n_k}-A|<\varepsilon/2$. For $n>N$,

$$
|a_n-A| \le |a_n-a_{n_k}| + |a_{n_k}-A| < \varepsilon.
$$

**A counterexample.** The harmonic sums $H_n = 1 + 1/2 + \cdots + 1/n$ are not Cauchy, because

$$
H_{2n} - H_n = \frac{1}{n+1} + \cdots + \frac{1}{2n} \ge n \cdot \frac{1}{2n} = \frac{1}{2}.
$$

With $\varepsilon = 1/2$ the criterion fails, so $H_n$ diverges.

## Three misconceptions

> [!MYTH] Every monotone sequence converges.
> $a_n = n$ increases without bound. Monotonicity rules out oscillation but not escape to infinity; boundedness is essential.

> [!MYTH] If consecutive terms get close, the sequence is Cauchy.
> Cauchy quantifies over all pairs. For $H_n$ consecutive terms differ by $1/n \to 0$, yet $H_{2n}-H_n \ge 1/2$. Likewise $a_n = \sqrt{n}$ has consecutive gaps tending to $0$ while being unbounded.

> [!MYTH] The Cauchy criterion is internal, so it also holds in the rationals.
> Sufficiency uses completeness. The truncations $1.4,\ 1.41,\ 1.414,\dots$ form a Cauchy sequence in $\mathbb{Q}$ with no limit in $\mathbb{Q}$. The criterion is a theorem about the real line.

## Practice

> [!PRACTICE] 1 · Newton iteration
> Let $a_1 = 2$ and $a_{n+1} = \dfrac{1}{2}\left(a_n + \dfrac{2}{a_n}\right)$. Prove convergence and find the limit.
>
> > [!ANSWER] Show answer
> > AM–GM gives $a_{n+1} \ge \sqrt{2}$, and $a_{n+1}-a_n = \dfrac{2-a_n^2}{2a_n} \le 0$ for $n \ge 2$, so the sequence decreases and is bounded below. The limit satisfies $L = (L+2/L)/2$, hence $L = \sqrt{2}$. The first terms are $2,\ 1.5,\ 1.4167$.

> [!PRACTICE] 2 · Not Cauchy
> Prove that $H_n = 1 + 1/2 + \cdots + 1/n$ diverges.
>
> > [!ANSWER] Show answer
> > Since $H_{2n}-H_n \ge 1/2$, with $\varepsilon = 1/2$ every $N$ is defeated by some $n>N$. The sequence is not Cauchy and therefore diverges.

> [!PRACTICE] 3 · Reciprocal squares
> Use the Cauchy criterion to prove that $s_n = 1 + \dfrac{1}{2^2} + \cdots + \dfrac{1}{n^2}$ converges.
>
> > [!ANSWER] Show answer
> > For $m>n$, $\displaystyle\sum_{k=n+1}^{m}\frac{1}{k^2} < \sum_{k=n+1}^{m}\frac{1}{k(k-1)} = \frac{1}{n} - \frac{1}{m} < \frac{1}{n}$. Take $N = \lfloor 1/\varepsilon \rfloor$.

> [!PRACTICE] 4 · Golden ratio
> Let $a_1 = 1$ and $a_{n+1} = \sqrt{1+a_n}$. Prove convergence and find the limit.
>
> > [!ANSWER] Show answer
> > Induction gives $a_n < 2$. Also $a_{n+1}^2 - a_n^2 = 1 + a_n - a_n^2 = (\varphi - a_n)\left(a_n + \dfrac{1}{\varphi}\right) > 0$ while $a_n < \varphi$, so the sequence increases and is bounded. The limit satisfies $L^2 = 1+L$, and the positive root is $L = (1+\sqrt{5})/2 \approx 1.618$.

> [!FORMAL] Formal statement
> Monotone boundedness: an increasing sequence bounded above converges to its supremum. Cauchy criterion: $\{a_n\}$ converges iff $\forall \varepsilon>0\ \exists N\ \forall m,n>N$, $|a_m-a_n|<\varepsilon$. Necessity uses only the definition; sufficiency uses boundedness and a convergent subsequence, hence completeness. Consequently convergence $\Rightarrow$ Cauchy $\Rightarrow$ bounded, and neither arrow reverses.
