---
slug: "bootstrap-idea-empirical-distribution"
subject: "probability"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "The Bootstrap Idea and the Empirical Distribution"
subtitle: "No second sample? Reuse the one you have"
minutes: 15
meta: ["15 min read","Requires sampling distributions and estimation","Mastery level"]
concepts: ["estimation", "sampling", "distribution"]
prereq: ["sampling", "estimation"]
related: ["variance", "hypothesistest"]
---

## What you will get

You will write down the empirical distribution function, explain how a bootstrap sample is drawn, and compute a bootstrap standard error in an example small enough to enumerate by hand.

## Three lines back

- The empirical distribution $\hat F_n$ puts mass $1/n$ on each observation and is a nonparametric estimate of $F$.
- A bootstrap sample is $n$ observations drawn with replacement from $\hat F_n$.
- The spread of a statistic across many bootstrap samples approximates its sampling distribution under the true $F$.

## The empirical distribution: treat the sample as the population

Let $X_1,\dots,X_n$ be i.i.d. with distribution function $F$. The empirical distribution function is

$$
\hat F_n(x)=\frac1n\sum_{i=1}^n \mathbf 1\{X_i\le x\}.
$$

It is a right-continuous step function that jumps by $1/n$ at each observation, or by the appropriate multiple when values tie. For each fixed $x$, $n\hat F_n(x)\sim\text{Bin}(n,F(x))$, so

$$
E[\hat F_n(x)]=F(x),\qquad \operatorname{Var}(\hat F_n(x))=\frac{F(x)(1-F(x))}{n}.
$$

It is unbiased and its standard deviation shrinks at rate $1/\sqrt n$. The Glivenko–Cantelli theorem strengthens this to $\sup_x|\hat F_n(x)-F(x)|\to0$ almost surely: with enough data, $\hat F_n$ is a faithful photograph of $F$ as a whole.

| $x$ | $\hat F_n(x)$ | Meaning |
| --- | --- | --- |
| below the minimum | 0 | nothing observed that small |
| at an observation | cumulative frequency | jumps by $1/n$ |
| at or above the maximum | 1 | every observation covered |

## Resampling and bootstrap samples

The bootstrap is the plug-in principle in action: replace the unknown $F$ by the known $\hat F_n$ everywhere. Drawing from $\hat F_n$ means drawing with replacement from $\{x_1,\dots,x_n\}$, each observation having probability $1/n$ on every draw.

One such draw of size $n$ is a bootstrap sample $X_1^*,\dots,X_n^*$, and the distribution of $T^*=T(X_1^*,\dots,X_n^*)$ is the bootstrap distribution. The algorithm has four steps:

1. Draw $n$ values with replacement from the original sample.
2. Compute the statistic $T^*$ on that bootstrap sample.
3. Repeat $B$ times, typically $1000$ to $10000$, obtaining $T^*_1,\dots,T^*_B$.
4. Use the standard deviation or quantiles of these $B$ values to approximate the sampling behaviour of $T$.

Nothing external enters: the method does not create data, it simulates the question "if the population were $\hat F_n$, how much would $T$ move?" A bootstrap sample contains on average only about $1-e^{-1}\approx63.2\%$ of the distinct original observations, the rest being repeats. That fraction stabilises as $n$ grows, which is one reason the bootstrap needs a reasonable sample size.

## An example small enough to enumerate

Take $n=2$ with data $1$ and $5$. Then $\hat F_2$ places mass $1/2$ on each value, and there are $2^2=4$ equally likely bootstrap samples:

| Bootstrap sample | Mean $\bar x^*$ | Probability |
| --- | --- | --- |
| $(1,1)$ | 1 | $1/4$ |
| $(1,5)$ | 3 | $1/4$ |
| $(5,1)$ | 3 | $1/4$ |
| $(5,5)$ | 5 | $1/4$ |

Thus $E[\bar X^*]=3$, matching the original mean, so the bootstrap distribution of the mean is unbiased here. Its variance is

$$
\operatorname{Var}^*(\bar X^*)=\frac14(1-3)^2+\frac12(3-3)^2+\frac14(5-3)^2=2,
$$

giving a bootstrap standard error of $\sqrt2\approx1.414$. The formula $s/\sqrt n$ gives $s=\sqrt8=2.828$ and hence $2.0$. The two disagree: at $n=2$ the bootstrap underestimates badly, which is exactly the large-sample dependence the theory predicts.

For the same data, $\hat F_2(3)=0.5$ with standard error $\sqrt{0.5\times0.5/2}=0.354$ — a quantity that can be checked directly from the binomial formula.

> [!MYTH] The bootstrap manufactures information from a small sample.
> It only simulates from $\hat F_n$. If the sample misrepresents the population, the bootstrap inherits the distortion, and with tiny $n$ both bias and tail estimates are unreliable.

> [!NOTE]
> Two error sources are at work: the gap between $\hat F_n$ and $F$ (statistical error, fixed by more data) and the finite number of replications $B$ (Monte Carlo error, shrinking like $1/\sqrt B$).

## Three common misconceptions

> [!MYTH] A bootstrap sample is a fresh batch of newly measured subjects.
> It is a recombination of the existing sample. The bootstrap describes sampling variability, not population heterogeneity.

> [!MYTH] The bootstrap only works for means.
> Any statistic that is a function of the sample can be bootstrapped: medians, correlations, quantiles, regression coefficients, even $R^2$.

> [!MYTH] A larger $B$ makes the answer more accurate.
> Increasing $B$ removes Monte Carlo noise only. It cannot remove the bias from $\hat F_n\neq F$; $B=1000$ is usually enough for a standard error.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For the data $2,4,6$, evaluate $\hat F_3$ at $x=1,2,3,5,7$.
>
> > [!ANSWER] Show answer
> > $0,\ 1/3,\ 1/3,\ 2/3,\ 1$. The step function jumps by $1/3$ at $2$, $4$ and $6$.

> [!PRACTICE] 2 · Variation
> With the same data, find the standard error of $\hat F_3(4)$.
>
> > [!ANSWER] Show answer
> > $\hat F_3(4)=2/3$, so the standard error is $\sqrt{(2/3)(1/3)/3}=\sqrt{2/27}=0.272$.

> [!PRACTICE] 3 · Transfer
> What goes wrong when bootstrapping the standard error of a median if $40\%$ of the sample are tied?
>
> > [!ANSWER] Show answer
> > The median falls inside the tied block where $\hat F_n$ jumps, so the bootstrap distribution becomes visibly discrete and the standard error unstable; smoothed or Bayesian bootstrap variants are needed.

## Formal statement

Let $X_1,\dots,X_n$ be i.i.d. $F$, let $\hat F_n$ be the empirical distribution function, and let $T_n=T(X_1,\dots,X_n)$. Conditional on the sample, the bootstrap sample $X_1^*,\dots,X_n^*$ is i.i.d. $\hat F_n$ under a probability $P^*$, and the bootstrap distribution is that of $T_n^*=T(X_1^*,\dots,X_n^*)$ under $P^*$. If $T_n$ is a smooth functional of the empirical measure, then $\sup_t|P^*(T_n^*\le t)-P(T_n\le t)|\to0$ in probability. This consistency rests on $\hat F_n\to F$ (Glivenko–Cantelli) together with smoothness of $T$; for non-smooth functionals such as extreme quantiles or maxima with heavy tails, the naive bootstrap fails.