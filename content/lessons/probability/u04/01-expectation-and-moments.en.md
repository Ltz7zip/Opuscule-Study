---
slug: "expectation-and-moments"
subject: "probability"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Mathematical Expectation and Moments"
subtitle: "A weighted average, and its higher-order versions"
minutes: 15
meta: ["15 min read","Requires random variables and distributions","Mastery level"]
concepts: ["expectation", "series", "randvar"]
prereq: ["randvar"]
related: ["variance", "jointdist"]
---

## What you will get

You will compute expectations from a mass function or a density, split complicated expressions with linearity, and see moments as descriptions of different aspects of a distribution.

The expectation is the centre of mass of a distribution. It compresses an entire table into one number and, in exchange, discards shape.

## Three lines back

- Discrete: $E[X]=\sum_k x_k p_k$; continuous: $E[X]=\int x f(x)\,dx$; both require absolute convergence.
- Expectation is linear: $E[aX+bY+c]=aE[X]+bE[Y]+c$, with no independence needed.
- $E[X^k]$ is the $k$-th raw moment and $E[(X-E[X])^k]$ the $k$-th central moment.

## Definition and linearity

The definition multiplies each value by its probability and adds. For a fair die,

$$
E[X]=\sum_{k=1}^{6}k\cdot\frac16=\frac{21}{6}=3.5
$$

An expectation need not be attainable: $3.5$ is never rolled. It describes the long-run average over many repetitions.

Linearity is the workhorse. If $Y=2X+3$, then $E[Y]=2E[X]+3=10$ regardless of the distribution of $X$. The same holds for sums, differences and arbitrary linear combinations, and **independence is not required**. Independence only enters when products or sums of variances are involved.

## Expectations of functions and moments

There is no need to derive the distribution of $Y=g(X)$ first:

$$
E[g(X)]=\sum_k g(x_k)p_k \quad\text{or}\quad \int g(x)f(x)\,dx
$$

This shortcut, sometimes called the law of the unconscious statistician, removes an entire derivation step. It also defines the moments:

| Name | Definition | What it describes |
| --- | --- | --- |
| First raw moment | $E[X]$ | location |
| Second raw moment | $E[X^2]$ | input to the variance |
| Second central moment | $E[(X-E[X])^2]$ | spread |
| Third central moment | $E[(X-E[X])^3]$ | direction of skew |

The gap between $E[X^2]$ and $E[X]^2$ is the variance, which links directly to the next lecture. Common distributions have closed forms:

| Distribution | Mean |
| --- | --- |
| $B(n,p)$ | $np$ |
| $P(\lambda)$ | $\lambda$ |
| $U(a,b)$ | $(a+b)/2$ |
| $E(\lambda)$ | $1/\lambda$ |
| $N(\mu,\sigma^2)$ | $\mu$ |

## A worked example

Let $P(X=-1)=0.2$, $P(X=0)=0.5$, $P(X=2)=0.3$. Then

$$
E[X]=(-1)(0.2)+0(0.5)+2(0.3)=-0.2+0.6=0.4
$$

$$
E[X^2]=(1)(0.2)+0(0.5)+(4)(0.3)=0.2+1.2=1.4
$$

so $\operatorname{Var}(X)=1.4-0.16=1.24$. For $Y=3X-1$, linearity gives $E[Y]=3(0.4)-1=0.2$ without rebuilding the distribution table.

> [!MYTH] The expectation is the most likely value.
> It is a weighted average and has nothing to do with the mode. Above, $0$ is the most likely value while the mean is $0.4$.

> [!NOTE]
> An expectation exists only when $\sum|x_k|p_k<\infty$ or $\int|x|f(x)\,dx<\infty$. The Cauchy distribution has no mean, even though its density is perfectly symmetric.

## Three common misconceptions

> [!MYTH] $E[XY]=E[X]E[Y]$ always holds.
> It requires independence, or at least zero correlation. Linearity covers addition only, never multiplication.

> [!MYTH] $E[g(X)]=g(E[X])$.
> Generally false. With $g(x)=x^2$, $E[X^2]\ge E[X]^2$, and the gap is exactly the variance.

> [!MYTH] Two distributions with the same mean are interchangeable.
> A mean matches only the first moment. Risk management and option pricing depend on higher moments, or on the whole distribution.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $X$ takes $0,1,2$ with probabilities $0.2,0.5,0.3$. Find $E[X]$ and $E[X^2]$.
>
> > [!ANSWER] Show answer
> > $E[X]=0+0.5+0.6=1.1$ and $E[X^2]=0+0.5+1.2=1.7$.

> [!PRACTICE] 2 · Variation
> For the same variable, find $E[2X^2-X+1]$.
>
> > [!ANSWER] Show answer
> > Linearity gives $2(1.7)-1.1+1=3.3$.

> [!PRACTICE] 3 · Transfer
> Let $X\sim E(\lambda)$. Find $E[X^2]$ and then the variance.
>
> > [!ANSWER] Show answer
> > $E[X^2]=\int_0^\infty x^2\lambda e^{-\lambda x}dx=2/\lambda^2$, so the variance is $2/\lambda^2-1/\lambda^2=1/\lambda^2$.

## Formal statement

Let $F$ be the distribution of $X$. If $\int|x|\,dF(x)<\infty$, the expectation $E[X]=\int x\,dF(x)$ exists and is unique. For a measurable $g$ with $E|g(X)|<\infty$, $E[g(X)]=\int g(x)\,dF(x)$. Expectation is linear and monotone: if $X\le Y$ almost surely then $E[X]\le E[Y]$. The $k$-th raw moment is $E[X^k]$ and the $k$-th central moment is $E[(X-E[X])^k]$; each exists only when the corresponding absolute moment is finite.
