---
slug: "seq-props"
subject: "analysis"
unit: "u02"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Properties of Convergent Sequences"
subtitle: "Arithmetic, order, and squeezing"
minutes: 14
meta: ["14 min read","Requires the definition of a limit","Mastery level"]
concepts: ["seql", "subseq"]
prereq: ["seql"]
related: ["seql", "cauchy"]
---

## Goals

The definition tells us how to verify a limit, not how to compute one. This lecture turns limits into objects we can calculate with: sums, products, and quotients pass to the limit, inequalities survive in the weak form, and a squeezed sequence is forced to converge.

By the end you can split a complicated sequence into simple pieces, handle roots and exponentials by squeezing, and state the exact hypotheses each rule needs.

## Three-line recap

- If $a_n \to a$ and $b_n \to b$, then sums, differences, products, and quotients (with nonzero denominator limit) tend to the corresponding values.
- Order passes only as $\le$, never as $<$: $0 < 1/n$ yet the limit is $0$.
- The squeeze theorem turns estimates into values: matching upper and lower limits are enough.

## Algebra of limits

Let $a_n \to a$ and $b_n \to b$. Then

$$
a_n \pm b_n \to a \pm b, \qquad a_n b_n \to ab, \qquad \frac{a_n}{b_n} \to \frac{a}{b}\ (b \ne 0).
$$

The product proof rests on one split:

$$
a_nb_n - ab = a_n(b_n-b) + b(a_n-a).
$$

A convergent sequence is bounded, so $|a_n| \le M$ for some $M$, and

$$
|a_nb_n-ab| \le M|b_n-b| + |b||a_n-a|.
$$

Both terms can be made arbitrarily small. For the quotient, $b_n \to b \ne 0$ first guarantees $|b_n| > |b|/2$ from some index on, and the same estimate applies to $1/b_n$.

The theorem makes computation routine: divide $\dfrac{n^2+3n}{2n^2-1}$ by $n^2$ to get $\dfrac{1+3/n}{2-1/n^2} \to \dfrac{1}{2}$. Both pieces converge and the denominator limit is $2 \ne 0$.

## Order and squeezing

**Order.** If $a_n \le b_n$ from some index on, and $a_n \to a$, $b_n \to b$, then $a \le b$. Otherwise $a>b$; take $\varepsilon = (a-b)/2$. Eventually $a_n > a-\varepsilon > b+\varepsilon > b_n$, contradicting $a_n \le b_n$.

Strict inequality is not preserved. Take $a_n = 0$ and $b_n = 1/n$: always $a_n < b_n$, but both limits are $0$.

**Squeeze theorem.** If $b_n \le a_n \le c_n$ from some index on and $b_n \to L$, $c_n \to L$, then $a_n \to L$. The proof is immediate from $|a_n-L| \le \max\{|b_n-L|, |c_n-L|\}$.

For example, $\left|\dfrac{\sin n}{n}\right| \le \dfrac{1}{n} \to 0$, so $\dfrac{\sin n}{n} \to 0$. Nothing about the values of $\sin n$ is needed beyond boundedness.

## Three concrete limits

**A difference of roots.** $\sqrt{n+1}-\sqrt{n} = \dfrac{1}{\sqrt{n+1}+\sqrt{n}} \le \dfrac{1}{2\sqrt{n}} \to 0$. Rationalising is the standard move.

**A sum of exponentials.** Find $(2^n+3^n)^{1/n}$. The largest term gives the lower bound $3 \le (2^n+3^n)^{1/n}$. For the upper bound use $2^n+3^n \le 2 \cdot 3^n$, so

$$
(2^n+3^n)^{1/n} \le 3 \cdot 2^{1/n}.
$$

Now $2^{1/n} \to 1$: write $2^{1/n} = 1+h_n$; then $2 = (1+h_n)^n \ge 1+nh_n$, hence $0 \le h_n \le 1/n$. Squeezing gives the limit $3$.

**A continued fraction.** Let $a_1 = 1$ and $a_{n+1} = \dfrac{1}{1+a_n}$. If a limit $L$ exists, then $L = 1/(1+L)$, so $L^2+L-1=0$ and $L = (\sqrt{5}-1)/2 \approx 0.618$. This only produces a candidate; existence needs monotone boundedness, which is the next lecture.

## Three misconceptions

> [!MYTH] If $a_n < b_n$ always, then $\lim a_n < \lim b_n$.
> Only $\le$ survives. The sequences $a_n = 0$ and $b_n = 1/n$ satisfy $a_n < b_n$ everywhere, yet both limits are $0$.

> [!MYTH] $\lim \dfrac{a_n}{b_n} = \dfrac{\lim a_n}{\lim b_n}$ always holds.
> It needs both limits to exist, the denominator limit to be nonzero, and the denominators themselves to be nonzero. For $a_n = 1$ and $b_n = 1/n$ the right side is meaningless while the quotient $n$ diverges.

> [!MYTH] The sum of two divergent sequences diverges.
> $a_n = n$ and $b_n = -n$ both diverge, but the sum is identically $0$. Divergence is unstable under addition unless one side converges.

## Practice

> [!PRACTICE] 1 · Rational function
> Find $\lim_{n\to\infty} \dfrac{n^2+3n}{2n^2-1}$.
>
> > [!ANSWER] Show answer
> > Divide top and bottom by $n^2$: $\dfrac{1+3/n}{2-1/n^2} \to \dfrac{1}{2}$. The denominator limit is $2 \ne 0$, so the quotient rule applies.

> [!PRACTICE] 2 · Roots
> Find $\lim_{n\to\infty}(\sqrt{n+1}-\sqrt{n})$.
>
> > [!ANSWER] Show answer
> > Rationalise: $\dfrac{1}{\sqrt{n+1}+\sqrt{n}} \le \dfrac{1}{2\sqrt{n}} \to 0$. The limit is $0$.

> [!PRACTICE] 3 · Exponentials
> Find $\lim_{n\to\infty}(2^n+3^n)^{1/n}$.
>
> > [!ANSWER] Show answer
> > From $3^n \le 2^n+3^n \le 2 \cdot 3^n$ we get $3 \le (2^n+3^n)^{1/n} \le 3 \cdot 2^{1/n}$. Since $2^{1/n} \to 1$, the limit is $3$.

> [!PRACTICE] 4 · Averages
> If $a_n \to a$, prove $\dfrac{a_1+a_2+\cdots+a_n}{n} \to a$.
>
> > [!ANSWER] Show answer
> > Given $\varepsilon>0$, choose $N_1$ with $|a_n-a|<\varepsilon/2$ beyond $N_1$. The first $N_1$ terms have a fixed sum $S$. Choose $N>N_1$ with $N>2|S|/\varepsilon$. For $n>N$ the average differs from $a$ by at most $|S|/n + \varepsilon/2 < \varepsilon$.

> [!FORMAL] Formal statement
> If $a_n \to a$ and $b_n \to b$, then $\alpha a_n + \beta b_n \to \alpha a + \beta b$ for constants $\alpha,\beta$; $a_nb_n \to ab$; and $a_n/b_n \to a/b$ when $b \ne 0$ and $b_n \ne 0$ eventually. If $a_n \le b_n$ eventually, then $a \le b$. If $b_n \le a_n \le c_n$ eventually and $b_n,c_n \to L$, then $a_n \to L$. Every proof uses only the definition and the boundedness of convergent sequences.
