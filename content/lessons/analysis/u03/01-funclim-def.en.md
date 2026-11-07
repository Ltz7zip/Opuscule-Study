---
slug: "funclim-def"
subject: "analysis"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Limits of Functions"
subtitle: "Does f(x) follow x toward x₀?"
minutes: 15
meta: ["15 min read","Requires limits of sequences","Mastery level"]
concepts: ["funclim"]
prereq: ["seql"]
related: ["seql", "cont"]
---

## Goals

In a sequence the index can only march to $+\infty$; a function limit lets the variable approach any point $x_0$ from both sides. This lecture rewrites $\varepsilon$–$N$ as $\varepsilon$–$\delta$ and explains why the value $f(x_0)$ is irrelevant.

By the end you can verify limits of linear and rational functions, decide existence from one-sided limits, and use sequences to disprove a limit.

## Three-line recap

- $\lim_{x\to x_0}f(x)=A$ means: for every $\varepsilon>0$ there is $\delta>0$ such that $0<|x-x_0|<\delta$ implies $|f(x)-A|<\varepsilon$.
- The neighbourhood is punctured: the point $x_0$ itself is excluded, so $f$ need not be defined there.
- The two-sided limit exists exactly when both one-sided limits exist and agree.

## The ε–δ language

Let $f$ be defined on a punctured neighbourhood of $x_0$. We say the limit of $f$ at $x_0$ is $A$, written $\lim_{x\to x_0}f(x)=A$, if for every $\varepsilon>0$ there is $\delta>0$ such that

$$
0 < |x-x_0| < \delta \quad\Longrightarrow\quad |f(x)-A|<\varepsilon .
$$

Compared with sequences, $N$ becomes $\delta$ and $n>N$ becomes $0<|x-x_0|<\delta$. The extra $0<$ is essential: it removes $x_0$. A limit describes behaviour near the point, not the value at the point.

## Two limits verified

**Example 1.** Prove $\lim_{x\to 2}(3x+1)=7$. The difference is

$$
|(3x+1)-7| = 3|x-2|.
$$

We need $3|x-2|<\varepsilon$, that is $|x-2|<\varepsilon/3$. Take $\delta=\varepsilon/3$.

**Example 2.** Prove $\lim_{x\to 1}\dfrac{x^2-1}{x-1}=2$. Since $0<|x-1|$, cancellation is legal:

$$
\frac{x^2-1}{x-1} = x+1,
$$

so $|f(x)-2| = |x-1|$ and $\delta=\varepsilon$ works. The function is undefined at $x=1$ yet has a limit there; this is precisely why the neighbourhood is punctured.

**Example 3.** $\lim_{x\to 0}x\sin\dfrac{1}{x}=0$. No cancellation is available, so we bound:

$$
\left|x\sin\frac{1}{x}\right| \le |x|,
$$

and take $\delta=\varepsilon$. The factor $\sin(1/x)$ has no limit of its own but is bounded, and multiplication by $|x|$ crushes it.

## One-sided limits and Heine's theorem

The left limit $\lim_{x\to x_0^-}f(x)$ uses $x_0-\delta<x<x_0$; the right limit uses $x_0<x<x_0+\delta$.

> [!NOTE]
> The two-sided limit exists iff both one-sided limits exist and are equal.

For the floor function $f(x)=[x]$ at $x=1$: the left limit is $0$ and the right limit is $1$, so no limit exists. This is the shape of a jump.

**Heine's theorem.** $\lim_{x\to x_0}f(x)=A$ iff, for every sequence with $x_n\to x_0$ and $x_n\ne x_0$, one has $f(x_n)\to A$. It reduces function limits to sequence limits and is especially useful for disproof.

Example: $f(x)=\sin\dfrac{1}{x}$ has no limit at $0$. Take $x_n=\dfrac{1}{n\pi}$, so $f(x_n)=0\to 0$; take $y_n=\dfrac{1}{2n\pi+\pi/2}$, so $f(y_n)=1\to 1$. Two sequences, two answers; by Heine the limit fails.

## Three misconceptions

> [!MYTH] A limit requires $f$ to be defined at $x_0$, with the limit equal to $f(x_0)$.
> The definition excludes $x=x_0$. The function $\dfrac{x^2-1}{x-1}$ is undefined at $1$ yet has limit $2$ there. Even when $f(x_0)$ exists, its value does not affect the limit.

> [!MYTH] If both one-sided limits exist, the two-sided limit exists.
> They must also agree. For $[x]$ at $1$ the left limit is $0$ and the right limit is $1$, so the limit fails. Two finite but unequal one-sided limits produce a jump.

> [!MYTH] One sequence $x_n\to x_0$ with $f(x_n)\to A$ proves the limit is $A$.
> Heine's theorem quantifies over all such sequences. Along $x_n=1/(n\pi)$ the function $\sin(1/x)$ tends to $0$, but along another sequence it tends to $1$, so no limit exists.

## Practice

> [!PRACTICE] 1 · Linear
> Prove from the definition that $\lim_{x\to 3}(2x-1)=5$.
>
> > [!ANSWER] Show answer
> > $|(2x-1)-5| = 2|x-3|$. Given $\varepsilon>0$, take $\delta=\varepsilon/2$; then $0<|x-3|<\delta$ makes the difference less than $\varepsilon$.

> [!PRACTICE] 2 · Bounded times small
> Prove $\lim_{x\to 0}x^2\sin\dfrac{1}{x}=0$.
>
> > [!ANSWER] Show answer
> > $\left|x^2\sin\dfrac{1}{x}\right| \le x^2$. Given $\varepsilon>0$, take $\delta=\sqrt{\varepsilon}$; then $0<|x|<\delta$ gives $x^2<\varepsilon$.

> [!PRACTICE] 3 · Disprove
> Prove that $\lim_{x\to 0}\sin\dfrac{1}{x}$ does not exist.
>
> > [!ANSWER] Show answer
> > Take $x_n=1/(n\pi)$, so $f(x_n)=0$; take $y_n=1/(2n\pi+\pi/2)$, so $f(y_n)=1$. Both sequences tend to $0$ but the values have different limits, so Heine's theorem rules out a limit.

> [!PRACTICE] 4 · Floor
> Discuss the limit of $f(x)=[x]$ at $x=1$.
>
> > [!ANSWER] Show answer
> > As $x\to 1^-$, $[x]=0$; as $x\to 1^+$, $[x]=1$. The one-sided limits differ, so the limit does not exist; this is a jump discontinuity.

> [!FORMAL] Formal statement
> Let $x_0$ be a limit point of the domain $D$. Then $\lim_{x\to x_0}f(x)=A$ means: $\forall\varepsilon>0\ \exists\delta>0\ \forall x\in D$, $0<|x-x_0|<\delta \Rightarrow |f(x)-A|<\varepsilon$. A limit, when it exists, is unique. The two-sided limit equals $A$ iff $\lim_{x\to x_0^+}f(x)=\lim_{x\to x_0^-}f(x)=A$. Heine's theorem gives the equivalent sequential characterisation.
