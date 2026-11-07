---
slug: "seq-limit"
subject: "analysis"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Defining the Limit of a Sequence"
subtitle: "Turning “gets closer” into an inequality"
minutes: 15
meta: ["15 min read","Requires the supremum principle","Mastery level"]
concepts: ["seql", "seq"]
prereq: ["sup"]
related: ["seq", "seql", "cauchy"]
---

## Goals

“Gets closer” is everyday speech, not a proof. This lecture replaces it with a testable inequality: for every $\varepsilon>0$, all terms after some index lie within $\varepsilon$ of $A$.

By the end you can verify limits in the $\varepsilon$–$N$ language, prove uniqueness and boundedness, and explain precisely why a divergent sequence fails to converge.

## Three-line recap

- A limit is not a final term; a sequence has none. It describes the tail entering every small neighbourhood at once.
- $\varepsilon$ is given arbitrarily; $N$ is the resulting starting index and may depend on $\varepsilon$.
- The routine: write the difference, enlarge it, solve for $n$, then round up.

## The ε–N language

A sequence $\{a_n\}$ converges to $A$ if for every $\varepsilon>0$ there is a positive integer $N$ such that, whenever $n>N$,

$$
|a_n - A| < \varepsilon .
$$

We write $\lim_{n\to\infty} a_n = A$ or $a_n \to A$. A sequence that does not converge is divergent.

Three details matter. $\varepsilon$ is arbitrary, not chosen small by us. $N$ is determined by $\varepsilon$ and often written $N(\varepsilon)$. The condition concerns only $n>N$; the first finitely many terms are irrelevant.

Geometrically, $|a_n-A|<\varepsilon$ means $a_n \in (A-\varepsilon, A+\varepsilon)$. The definition says that every narrow band around $A$ contains the whole tail from some index on.

## Three limits verified

**Example 1.** Let $a_n = \dfrac{2n+1}{n}$. Then

$$
\left|\frac{2n+1}{n} - 2\right| = \frac{1}{n}.
$$

We need $1/n < \varepsilon$, that is $n > 1/\varepsilon$. Taking $N = \left\lfloor 1/\varepsilon \right\rfloor$ gives the claim.

**Example 2.** $a_n = \dfrac{(-1)^n}{n} \to 0$. The absolute value removes the sign: $|a_n - 0| = 1/n$, the same estimate as above.

**Example 3.** If $0<q<1$ then $q^n \to 0$. Write $q = 1/(1+h)$ with $h = 1/q - 1 > 0$. Bernoulli's inequality $(1+h)^n \ge 1+nh$ gives

$$
q^n \le \frac{1}{1+nh} < \frac{1}{nh}.
$$

So $N = \lfloor 1/(h\varepsilon) \rfloor$ works. For $q = 0.9$ we have $h = 1/9$; an error below $0.01$ needs $n > 900$.

## Uniqueness and boundedness

**Uniqueness.** If $a_n \to A$ and $a_n \to B$, then $A = B$. Suppose $A \ne B$ and set $\varepsilon = |A-B|/2$. There are $N_1, N_2$ such that $|a_n-A|<\varepsilon$ for $n>N_1$ and $|a_n-B|<\varepsilon$ for $n>N_2$. For an $n$ beyond both,

$$
|A-B| \le |A-a_n| + |a_n-B| < 2\varepsilon = |A-B|,
$$

a contradiction.

**Boundedness.** Every convergent sequence is bounded. Take $\varepsilon = 1$; there is $N$ with $|a_n| < |A|+1$ for $n>N$. The first $N$ terms are finite, so

$$
M = \max\{|a_1|, \dots, |a_N|, |A|+1\}
$$

bounds every term.

The converse fails. The sequence $a_n = (-1)^n$ is bounded but divergent: with $\varepsilon = 1$, a limit $A$ would force both the even and odd terms into $(A-1, A+1)$, yet those terms are $2$ apart and cannot both lie in an interval of length $2$.

## Three misconceptions

> [!MYTH] Checking one small $\varepsilon$ proves the limit.
> The definition quantifies over all $\varepsilon>0$. Checking $\varepsilon = 0.01$ only shows the tail enters that one band; it may fail for $10^{-6}$. A proof must produce $N$ for a general $\varepsilon$.

> [!MYTH] Convergent sequences are monotone, or approach the limit from one side.
> The sequence $a_n = 1 + \dfrac{(-1)^n}{n}$ oscillates through $0.5, 1.25, 0.75, 1.125, \dots$ yet converges to $1$. The definition only asks whether the tail enters the band, not how it travels.

> [!MYTH] Every bounded sequence converges.
> $(-1)^n$ is bounded and divergent. Boundedness is necessary, not sufficient; convergence also needs monotonicity or the Cauchy condition.

## Practice

> [!PRACTICE] 1 · Verify
> Prove from the definition that $\lim_{n\to\infty} \dfrac{3n+1}{n+2} = 3$.
>
> > [!ANSWER] Show answer
> > The difference is $\dfrac{5}{n+2} < \dfrac{5}{n}$. Take $N = \lfloor 5/\varepsilon \rfloor$; then $n>N$ makes the difference less than $\varepsilon$.

> [!PRACTICE] 2 · Enlarge
> Find $\lim_{n\to\infty} \dfrac{n^2+1}{2n^2+n}$.
>
> > [!ANSWER] Show answer
> > The limit is $1/2$. The difference is $\dfrac{|2-n|}{2(2n^2+n)}$, which for $n \ge 2$ is at most $\dfrac{1}{4n}$. Take $N = \max\{2, \lfloor 1/(4\varepsilon) \rfloor\}$.

> [!PRACTICE] 3 · Diverge
> Prove that $a_n = (-1)^n$ diverges.
>
> > [!ANSWER] Show answer
> > Take $\varepsilon = 1$. If $a_n \to A$, some $N$ makes $|a_n-A|<1$ beyond $N$. Pick an even $n>N$ and an odd $m>N$; then $2 = |a_n-a_m| \le |a_n-A|+|A-a_m| < 2$, a contradiction.

> [!PRACTICE] 4 · Absolute value
> If $a_n \to A$, prove $|a_n| \to |A|$; then show the converse fails.
>
> > [!ANSWER] Show answer
> > The reverse triangle inequality $\big||a_n|-|A|\big| \le |a_n-A|$ lets the same $N$ work. For the converse, $a_n = (-1)^n$ has $|a_n| = 1$ convergent while $a_n$ diverges.

> [!FORMAL] Formal statement
> $a_n \to A$ means: $\forall \varepsilon>0\ \exists N \in \mathbb{N}^*\ \forall n>N$, $|a_n-A|<\varepsilon$. Its negation is: $\exists \varepsilon_0>0\ \forall N\ \exists n>N$ with $|a_n-A| \ge \varepsilon_0$. Convergent sequences have a unique limit and are bounded; bounded sequences need not converge. For $0<q<1$, $q^n \to 0$ with the estimate $q^n < 1/(nh)$, where $h = 1/q - 1$.
