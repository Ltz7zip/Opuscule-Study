---
slug: "population-sample-statistics"
subject: "probability"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Populations, Samples, and Statistics"
subtitle: "Squeezing data into a few numbers, and knowing what that costs"
minutes: 15
meta: ["15 min read","Requires expectation and variance","Mastery level"]
concepts: ["sampling", "expectation", "variance"]
prereq: ["variance"]
related: ["estimation", "clt"]
---

## What you will get

You will tell a population distribution apart from the distribution of a sample, compute a sample mean and variance, and explain why the denominator is $n-1$.

The first five units ran forward: distribution known, probability computed. Here the direction flips. The distribution is unknown, all we have is data, and the task is to infer its features.

## Three lines back

- The population is the distribution of all possible observations; the sample is $n$ i.i.d. variables $X_1,\dots,X_n$ drawn from it.
- A statistic is a function of the sample containing no unknown parameter, so it is itself a random variable.
- The sample variance $S^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$ has expectation $\sigma^2$; it is unbiased.

## Populations, samples, statistics

Think of the population as a distribution $F$ and the sample as independent draws from $F$. Independence and identical distribution are the foundation of everything that follows: they let variances add.

A statistic is a sample function free of unknown parameters. $\bar X$, $S^2$, the maximum $X_{(n)}$ and the median all qualify; $\bar X-\mu$ does not, because $\mu$ is unknown.

| Statistic | Formula | Population counterpart |
| --- | --- | --- |
| Sample mean | $\bar X=\frac1n\sum X_i$ | $\mu=E[X]$ |
| Sample variance | $S^2=\frac{1}{n-1}\sum(X_i-\bar X)^2$ | $\sigma^2=\operatorname{Var}(X)$ |
| Uncorrected variance | $S_n^2=\frac1n\sum(X_i-\bar X)^2$ | biased low by $\frac{n-1}{n}$ |
| Sample standard deviation | $S=\sqrt{S^2}$ | $\sigma$ |
| Empirical distribution | $F_n(x)=\frac1n\sum I(X_i\le x)$ | $F(x)$ |

## Why subtract one

With denominator $n$,

$$
E\left[\frac1n\sum_{i=1}^n(X_i-\bar X)^2\right]=\frac{n-1}{n}\sigma^2,
$$

so on average the spread is underestimated. The reason is that $\bar X$ is computed from the same data it measures deviations from, and therefore sits close to them. Multiplying by $n/(n-1)$ repairs the bias, giving $E[S^2]=\sigma^2$. The lost degree of freedom is the one consumed by estimating $\bar X$.

## A worked example

Take the sample $2,4,4,6,9$ with $n=5$.

$$
\bar x=\frac{2+4+4+6+9}{5}=\frac{25}{5}=5
$$

The deviations are $-3,-1,-1,1,4$ with squared sum $9+1+1+1+16=28$. Hence

$$
s^2=\frac{28}{4}=7,\qquad s=\sqrt7\approx2.646,\qquad s_n^2=\frac{28}{5}=5.6
$$

The same data yield $7$ or $5.6$ depending on the denominator, a $20\%$ gap. The gap shrinks with $n$: about $2\%$ at $n=50$.

> [!MYTH] Sample variance is just the average squared deviation.
> Averaging with $n$ is biased. The default $S^2$ uses $n-1$; only when $\mu$ is known do we take deviations from $\mu$ and divide by $n$.

> [!NOTE]
> The empirical distribution $F_n$ jumps by $1/n$ at each observation, and Glivenko–Cantelli gives $\sup_x|F_n(x)-F(x)|\to0$ almost surely. The data are themselves a consistent estimate of the distribution.

## Three common misconceptions

> [!MYTH] A bigger sample always puts the mean closer.
> What shrinks is the probability of deviating by a fixed amount. No single experiment is guaranteed to improve.

> [!MYTH] A statistic is a fixed number once computed.
> Before sampling it is a random variable with its own sampling distribution. Inference rests entirely on that distribution.

> [!MYTH] Unbiased always beats biased.
> Unbiasedness fixes the average, not the spread. Judge estimators by mean squared error, which combines bias and variance.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For the sample $3,5,7,9$, find $\bar x$, $s^2$, and $s$.
>
> > [!ANSWER] Show answer
> > $\bar x=6$, deviations $-3,-1,1,3$, squared sum $20$, so $s^2=20/3\approx6.67$ and $s\approx2.58$.

> [!PRACTICE] 2 · Variation
> Multiply every observation in the previous exercise by 2 and add 1. What are the new mean and variance?
>
> > [!ANSWER] Show answer
> > The mean becomes $2(6)+1=13$ and the variance $4(6.67)\approx26.67$, with standard deviation $5.16$.

> [!PRACTICE] 3 · Transfer
> Given $\sum x_i=120$, $\sum x_i^2=2600$ and $n=8$, compute $s^2$.
>
> > [!ANSWER] Show answer
> > $\bar x=15$, so the centred sum of squares is $2600-8(225)=800$ and $s^2=800/7\approx114.3$.

## Formal statement

Let $X_1,\dots,X_n$ be i.i.d. with $E[X_i]=\mu$ and $\operatorname{Var}(X_i)=\sigma^2<\infty$. Then $E[\bar X]=\mu$, $\operatorname{Var}(\bar X)=\sigma^2/n$, and

$$
E\left[\sum_{i=1}^n(X_i-\bar X)^2\right]=(n-1)\sigma^2,
$$

so $S^2$ is unbiased. If the population is $N(\mu,\sigma^2)$, then $\bar X$ and $S^2$ are independent, $\bar X\sim N(\mu,\sigma^2/n)$, and $(n-1)S^2/\sigma^2\sim\chi^2(n-1)$. These independence facts generate the $t$ and $F$ distributions of the next lecture. For general populations $\bar X$ and $S^2$ need not be independent, but $\bar X$ is still asymptotically normal by the central limit theorem.
