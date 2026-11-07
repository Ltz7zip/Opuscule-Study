---
slug: "unifcont-def"
subject: "analysis"
unit: "u03"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Uniform Continuity"
subtitle: "One δ controls the whole interval"
minutes: 15
meta: ["15 min read","Requires continuity on closed intervals","Mastery level"]
concepts: ["unifcont", "contprop"]
prereq: ["cont", "contprop"]
related: ["cont", "unifconv"]
---

## Goals

Continuity is local: each point gets its own $\delta$. Uniform continuity strengthens it to a single $\delta$ for the whole interval, so that nearby points have nearby values no matter where they lie.

By the end you can write the definition and its negation, disprove uniform continuity with two sequences, and prove it using a Lipschitz condition or Cantor's theorem.

## Three-line recap

- Uniform continuity requires $\delta$ to depend on $\varepsilon$ alone, not on position.
- Continuity does not imply uniformity: $1/x$ is continuous on $(0,1)$ but grows steeper near $0$.
- Every continuous function on a closed interval is uniformly continuous; this is Cantor's theorem.

## The definition

Let $f$ be defined on an interval $I$. It is uniformly continuous on $I$ if for every $\varepsilon>0$ there is $\delta>0$ such that for all $x,y\in I$, $|x-y|<\delta$ implies

$$
|f(x)-f(y)|<\varepsilon .
$$

Compare with ordinary continuity: there $\delta$ depends on $\varepsilon$ and on the point $x_0$; here only on $\varepsilon$. The quantifier order shows the difference:

$$
\text{continuous:}\ \forall x_0\ \forall\varepsilon\ \exists\delta; \qquad
\text{uniform:}\ \forall\varepsilon\ \exists\delta\ \forall x,y.
$$

The negation matters too: $f$ is not uniformly continuous on $I$ iff there is $\varepsilon_0>0$ such that for every $\delta>0$ one can find $x,y\in I$ with $|x-y|<\delta$ but $|f(x)-f(y)|\ge\varepsilon_0$.

## One counterexample, one proof

**Counterexample.** $f(x)=\dfrac{1}{x}$ is not uniformly continuous on $(0,1)$. Take $\varepsilon_0=1$. For any $\delta>0$, choose $n$ large and set

$$
x_n=\frac{1}{n}, \qquad y_n=\frac{1}{n+1}.
$$

Then $|x_n-y_n|=\dfrac{1}{n(n+1)}\to 0$, so it is smaller than $\delta$, yet

$$
|f(x_n)-f(y_n)| = |n-(n+1)| = 1 \ge \varepsilon_0 .
$$

The points come arbitrarily close while the values stay $1$ apart. The slope is unbounded near $0$.

**Proof.** $f(x)=x^2$ is uniformly continuous on $(0,1)$. For $x,y\in(0,1)$,

$$
|x^2-y^2| = |x+y|\,|x-y| \le 2|x-y|.
$$

Take $\delta=\varepsilon/2$, independent of position.

The same function is not uniformly continuous on $\mathbb{R}$. Take $x_n=n$ and $y_n=n+\dfrac{1}{n}$; then $|x_n-y_n|=\dfrac{1}{n}\to 0$, while

$$
|x_n^2-y_n^2| = 2+\frac{1}{n^2} \ge 2 .
$$

Once the interval grows, no fixed $\delta$ suffices.

## Cantor's theorem and tests

> [!NOTE]
> Cantor's theorem: if $f$ is continuous on $[a,b]$, then $f$ is uniformly continuous on $[a,b]$.

Proof by contradiction with Bolzano–Weierstrass. If uniformity failed, there would be $\varepsilon_0>0$ and sequences $x_n,y_n$ with $|x_n-y_n|<1/n$ but $|f(x_n)-f(y_n)|\ge\varepsilon_0$. The bounded sequence $\{x_n\}$ has a subsequence $x_{n_k}\to x_0\in[a,b]$; since $|x_{n_k}-y_{n_k}|<1/n_k$, also $y_{n_k}\to x_0$. Continuity gives $f(x_{n_k})-f(y_{n_k})\to f(x_0)-f(x_0)=0$, a contradiction.

Two practical tests. **Lipschitz condition:** if $|f(x)-f(y)|\le L|x-y|$, then $f$ is uniformly continuous with $\delta=\varepsilon/L$. **Bounded derivative:** if $f$ is differentiable with $|f'|\le L$, the mean value theorem gives the Lipschitz condition.

A bounded derivative is sufficient, not necessary. $\sqrt{x}$ is uniformly continuous on $[0,1]$ by Cantor's theorem, yet $f'(x)=\dfrac{1}{2\sqrt{x}}$ is unbounded near $0$.

## Three misconceptions

> [!MYTH] Every continuous function is uniformly continuous on its domain.
> $1/x$ is continuous at every point of $(0,1)$ but steepens as $x\to 0^+$; the sequences $x_n=1/n$, $y_n=1/(n+1)$ disprove uniformity. Cantor's theorem needs a closed interval.

> [!MYTH] Uniform continuity is equivalent to a bounded derivative.
> A bounded derivative implies uniformity, but not conversely. $\sqrt{x}$ is uniformly continuous on $[0,1]$ while its derivative blows up at $0$; boundedness is only a convenient sufficient condition.

> [!MYTH] With continuity at each point, take the smallest of all the local δ's.
> Infinitely many positive numbers need not have a positive infimum. For $1/x$ on $(0,1)$ the local $\delta$ tends to $0$ as $x\to 0^+$, so no positive minimum exists.

## Practice

> [!PRACTICE] 1 · Linear
> Prove that $f(x)=3x+2$ is uniformly continuous on $\mathbb{R}$.
>
> > [!ANSWER] Show answer
> > $|f(x)-f(y)|=3|x-y|$. Given $\varepsilon>0$, take $\delta=\varepsilon/3$, independent of position.

> [!PRACTICE] 2 · Reciprocal
> Prove that $f(x)=\dfrac{1}{x}$ is not uniformly continuous on $(0,1)$.
>
> > [!ANSWER] Show answer
> > Take $\varepsilon_0=1$, $x_n=1/n$, $y_n=1/(n+1)$. The distance tends to $0$ while the value difference stays $1$, defeating every $\delta$.

> [!PRACTICE] 3 · Interval matters
> Prove that $x^2$ is uniformly continuous on $(0,1)$ but not on $\mathbb{R}$.
>
> > [!ANSWER] Show answer
> > On $(0,1)$, $|x^2-y^2|\le 2|x-y|$, so $\delta=\varepsilon/2$ works. On $\mathbb{R}$, take $x_n=n$, $y_n=n+1/n$; the distance tends to $0$ while the value difference is at least $2$.

> [!PRACTICE] 4 · Sine
> Prove that $\sin x$ is uniformly continuous on $\mathbb{R}$.
>
> > [!ANSWER] Show answer
> > By the sum-to-product formula, $|\sin x-\sin y| = 2\left|\cos\dfrac{x+y}{2}\right|\left|\sin\dfrac{x-y}{2}\right| \le |x-y|$. Take $\delta=\varepsilon$.

> [!FORMAL] Formal statement
> $f$ is uniformly continuous on $I$ if $\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in I$, $|x-y|<\delta \Rightarrow |f(x)-f(y)|<\varepsilon$. Negation: $\exists\varepsilon_0>0\ \forall\delta>0\ \exists x,y\in I$ with $|x-y|<\delta$ and $|f(x)-f(y)|\ge\varepsilon_0$. Cantor's theorem: every $f\in C[a,b]$ is uniformly continuous on $[a,b]$. The Lipschitz condition $|f(x)-f(y)|\le L|x-y|$ is sufficient, and a bounded derivative is a special case.
