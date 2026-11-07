---
slug: "distribution-function-discrete"
subject: "probability"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Distribution Functions and Discrete Random Variables"
subtitle: "A staircase that stores every probability"
minutes: 15
meta: ["15 min read","Requires events and probability","Mastery level"]
concepts: ["randvar", "distribution", "series"]
prereq: ["randvar"]
related: ["expectation", "jointdist"]
---

## What you will get

You will map experimental outcomes to real numbers, write the probability mass function of a discrete variable, and read its distribution function off a staircase.

A random variable is not a number that happens to be random. It is a **function** that sends each sample point to a real number.

## Three lines back

- A random variable $X$ is a real-valued function on the sample space, so the event $\{X\le x\}$ makes sense.
- Its distribution function $F(x)=P(X\le x)$ is non-decreasing, right-continuous, and runs from $0$ to $1$.
- For a discrete variable, all information sits in one table: $p_k=P(X=x_k)$.

## Random variables and distribution functions

Toss two coins and let $X$ be the number of heads. The sample points $HH,HT,TH,TT$ map to $2,1,1,0$. Four sample points collapse onto three real values, so different outcomes may share a value.

The distribution function is

$$
F(x)=P(X\le x),\qquad x\in\mathbb{R}
$$

It accumulates the probability of everything at or below $x$. For the coin example:

| Range of $x$ | $F(x)$ |
| --- | --- |
| $x<0$ | $0$ |
| $0\le x<1$ | $1/4$ |
| $1\le x<2$ | $3/4$ |
| $x\ge2$ | $1$ |

The function is a right-continuous staircase. It jumps at each attainable value, and the jump height is exactly that value's probability:

$$
P(X=x_k)=F(x_k)-F(x_k^{-})
$$

Interval probabilities come from differencing: $P(a<X\le b)=F(b)-F(a)$. The strict inequality on the left is forced by the definition of $F$; shifting it by one endpoint changes the answer by a full jump.

## Mass functions for discrete variables

A discrete variable takes finitely or countably many values, with $p_k\ge0$ and $\sum_k p_k=1$.

| Distribution | Mass function | Mean | Variance |
| --- | --- | --- | --- |
| Bernoulli | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomial $B(n,p)$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Poisson $P(\lambda)$ | $e^{-\lambda}\lambda^k/k!$ | $\lambda$ | $\lambda$ |
| Geometric | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |

The binomial counts successes in a fixed number of independent trials. The geometric counts trials until the first success. The difference is not algebraic complexity but whether the number of trials is fixed in advance or random.

## A three-toss example

Toss a fair coin three times and let $X$ be the number of heads, so $X\sim B(3,0.5)$:

| $k$ | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| $P(X=k)$ | $1/8$ | $3/8$ | $3/8$ | $1/8$ |

Compute $P(1<X\le2)$ through the distribution function:

$$
F(2)-F(1)=\frac{7}{8}-\frac{4}{8}=\frac{3}{8}
$$

This matches $P(X=2)=3/8$ from the table. Writing $P(1\le X\le2)$ instead gives $6/8$, because it also includes $X=1$.

> [!MYTH] If the distribution function is continuous at a point, that value is impossible.
> Continuity only says the jump is zero, hence $P(X=x)=0$. For continuous variables this holds almost everywhere, but probability zero is not the same as impossibility.

> [!NOTE]
> The distribution function works for discrete and continuous variables alike. A mass function exists only in the discrete case, a density only in the continuous case.

## Three common misconceptions

> [!MYTH] Since a distribution function integrates a density, discrete variables cannot have one.
> Every random variable has a distribution function. In the discrete case it is a staircase and no density is needed.

> [!MYTH] $P(X=x)$ is always zero, even for discrete variables.
> At an attainable value the probability equals the jump height and is usually positive. Only continuous variables have $P(X=x)=0$ everywhere.

> [!MYTH] Two variables with the same mean have the same distribution.
> A mean is one summary of location. $B(2,0.5)$ and a variable taking $0$ or $4$ with probability $1/2$ each both have mean $1$ and completely different distributions.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Let $P(X=-1)=0.2$, $P(X=0)=0.5$, $P(X=2)=0.3$. Find $F(0)$ and $F(1)$.
>
> > [!ANSWER] Show answer
> > $F(0)=0.2+0.5=0.7$, and $F(1)=0.7$ as well, since nothing jumps between $0$ and $2$.

> [!PRACTICE] 2 · Variation
> For the same variable, find $P(-1<X\le2)$ and $P(X\ge1)$.
>
> > [!ANSWER] Show answer
> > $F(2)-F(-1)=1-0.2=0.8$, and $P(X\ge1)=1-F(1)=0.3$.

> [!PRACTICE] 3 · Transfer
> A shooter hits with probability $0.6$ on each independent attempt and keeps shooting until the first hit. What is the probability of needing at most three shots?
>
> > [!ANSWER] Show answer
> > With $X$ the number of shots, $P(X=k)=0.4^{k-1}(0.6)$. Adding: $0.6+0.24+0.096=0.936$.

## Formal statement

A random variable is a measurable map $X:\Omega\to\mathbb{R}$, meaning $\{\omega:X(\omega)\le x\}\in\mathcal{F}$ for every $x$. Its distribution function $F(x)=P(X\le x)$ is non-decreasing, right-continuous, and satisfies $F(-\infty)=0$, $F(+\infty)=1$. Conversely every function with these properties is the distribution function of some random variable. A discrete variable is specified by a probability mass function $\{p_k\}$ on a countable set, and $F$ is the cumulative staircase whose jumps occur exactly at the attainable values.
