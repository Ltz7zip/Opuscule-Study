---
slug: "subseq-lim"
subject: "analysis"
unit: "u02"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Subsequences, limsup and liminf"
subtitle: "Reading the whole oscillation from its parts"
minutes: 15
meta: ["15 min read","Requires the Cauchy criterion","Mastery level"]
concepts: ["subseq", "sup"]
prereq: ["seql"]
related: ["seql", "sup"]
---

## Goals

A divergent sequence need not be chaotic: $(-1)^n$ jumps between two values, and $\sin(n\pi/2)$ cycles through three. Subsequences expose that structure, while limsup and liminf compress the entire tail into two numbers.

By the end you can infer convergence from subsequences, state and use the Bolzano–Weierstrass theorem, and compute limsup and liminf for concrete sequences.

## Three-line recap

- A subsequence keeps the original order and selects terms; every subsequence of a convergent sequence converges to the same limit.
- Every bounded sequence has a convergent subsequence, which is another form of completeness.
- For a bounded sequence, limsup and liminf are the largest and smallest limit points; equality forces convergence.

## Subsequences and limit points

Let $n_1<n_2<\cdots$ be a strictly increasing sequence of positive integers. Then $\{a_{n_k}\}$ is a subsequence of $\{a_n\}$.

If $a_n \to A$, then $a_{n_k} \to A$ for every subsequence: take $N$ from the definition; for $k>N$ we have $n_k \ge k > N$, hence $|a_{n_k}-A|<\varepsilon$.

Conversely, two subsequences with different limits prove divergence. For $a_n = (-1)^n$ the even subsequence is constantly $1$ and the odd one constantly $-1$.

A number $A$ is a limit point if some subsequence converges to it. A sequence may have no limit point ($a_n = n$), exactly one (any convergent sequence), or many ($\sin(n\pi/2)$ has $1,0,-1$).

## Bounded sequences have convergent subsequences

> [!NOTE]
> Bolzano–Weierstrass theorem: every bounded sequence has a convergent subsequence.

The proof uses a monotone subsequence. Call an index $n$ a peak if $a_n \ge a_m$ for every $m>n$.

If there are infinitely many peaks, list them as $n_1<n_2<\cdots$. Their values satisfy $a_{n_1}\ge a_{n_2}\ge\cdots$, a decreasing subsequence bounded below, hence convergent.

If there are only finitely many peaks, start after the last one at some index $n_1$. It is not a peak, so some $n_2>n_1$ has $a_{n_2}>a_{n_1}$. The index $n_2$ is not a peak either, and the process continues, producing a strictly increasing subsequence. It is bounded above and converges.

Either way a convergent subsequence exists. Boundedness cannot be dropped: $a_n = n$ has none.

## Limsup and liminf

For a bounded sequence, set

$$
b_n = \sup_{k \ge n} a_k .
$$

The sequence $b_n$ decreases and is bounded below, so it converges. Define

$$
\limsup_{n\to\infty} a_n = \lim_{n\to\infty} b_n = \inf_{n\ge 1} \sup_{k\ge n} a_k .
$$

Replacing $\sup$ by $\inf$ gives $\liminf$. Intuitively $b_n$ is the highest level visible from index $n$ onward; it can only fall, and its limit is the long-run ceiling.

**Example.** $a_n = (-1)^n\left(1+\dfrac{1}{n}\right)$. The even terms are $1+\dfrac{1}{n} \to 1$ and the odd terms are $-\left(1+\dfrac{1}{n}\right) \to -1$. Hence $\limsup a_n = 1$ and $\liminf a_n = -1$.

**Example.** $a_n = \sin\dfrac{n\pi}{2}$ takes the values $1,0,-1,0,\dots$, so $\limsup = 1$ and $\liminf = -1$.

The key criterion: $\{a_n\}$ converges to a finite limit if and only if

$$
-\infty < \liminf a_n = \limsup a_n < +\infty .
$$

The common value is the limit. For unbounded sequences we allow $\limsup = +\infty$ or $\liminf = -\infty$; for $a_n = n^{(-1)^n}$ the even terms go to $+\infty$ and the odd terms to $0$, so $\limsup = +\infty$ and $\liminf = 0$.

## Three misconceptions

> [!MYTH] Every subsequence converges.
> A subsequence is only a selection of terms, not an improvement. Every subsequence of $a_n = n$ is unbounded; for $a_n = \sin\dfrac{n\pi}{2}$, the choice $n_k = 2k+1$ gives the divergent subsequence $(-1)^k$.

> [!MYTH] One convergent subsequence makes the whole sequence converge.
> The even subsequence of $(-1)^n$ is constantly $1$, yet the sequence diverges. One convergent subsequence only exhibits a limit point; convergence needs all subsequences to share one limit.

> [!MYTH] $\limsup a_n$ is just $\sup\{a_n\}$.
> The supremum looks at all terms, limsup at the tail. For $a_n = 1/n$ the supremum is $1$ (the first term) while limsup is $0$.

## Practice

> [!PRACTICE] 1 · Oscillation
> Find limsup and liminf of $a_n = (-1)^n + \dfrac{1}{n}$.
>
> > [!ANSWER] Show answer
> > Even terms $1+1/n \to 1$ and odd terms $-1+1/n \to -1$. Thus $\limsup = 1$ and $\liminf = -1$; they differ, so the sequence diverges.

> [!PRACTICE] 2 · Unbounded
> Find limsup and liminf of $a_n = n^{(-1)^n}$.
>
> > [!ANSWER] Show answer
> > For even $n$, $a_n = n \to +\infty$; for odd $n$, $a_n = 1/n \to 0$. So $\limsup = +\infty$ and $\liminf = 0$.

> [!PRACTICE] 3 · Even and odd
> If $a_{2k} \to A$ and $a_{2k-1} \to A$, prove $a_n \to A$.
>
> > [!ANSWER] Show answer
> > Given $\varepsilon>0$, choose $K_1$ with $|a_{2k}-A|<\varepsilon$ for $k>K_1$ and $K_2$ with $|a_{2k-1}-A|<\varepsilon$ for $k>K_2$. Let $N = \max\{2K_1, 2K_2-1\}$; then $|a_n-A|<\varepsilon$ for every $n>N$.

> [!PRACTICE] 4 · Three values
> Find limsup and liminf of $a_n = \cos\dfrac{2n\pi}{3}$.
>
> > [!ANSWER] Show answer
> > The values cycle through $1, -\dfrac{1}{2}, -\dfrac{1}{2}$. Hence $\limsup = 1$ and $\liminf = -\dfrac{1}{2}$.

> [!FORMAL] Formal statement
> For a bounded sequence, $\limsup a_n = \lim_{n\to\infty}\sup_{k\ge n}a_k$ and $\liminf a_n = \lim_{n\to\infty}\inf_{k\ge n}a_k$, both finite. The limsup is the supremum of the set of limit points and the liminf its infimum. The sequence converges iff $\liminf a_n = \limsup a_n$. Bolzano–Weierstrass: every bounded sequence has a convergent subsequence, proved from monotone boundedness.
