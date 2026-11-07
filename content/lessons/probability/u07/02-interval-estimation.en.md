---
slug: "interval-estimation"
subject: "probability"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Interval Estimation and Confidence Intervals"
subtitle: "Giving a point estimate the error margin it deserves"
minutes: 17
meta: ["17 min read","Requires parameter estimation","Mastery level"]
concepts: ["estimation", "sampling", "distribution"]
prereq: ["estimation"]
related: ["hypothesistest", "estimation"]
---

## What you will get

You will build confidence intervals for means and proportions, interpret "95%" correctly, and use the sample-size formula to control interval width.

A point estimate is one number with no error attached. An interval states the uncertainty as an explicit length, which is what every honest report needs.

## Three lines back

- A pivot is a quantity involving the parameter but no other unknowns, whose distribution is known.
- The $1-\alpha$ interval for $\mu$ is $\bar X\pm t_{\alpha/2}(n-1)\,S/\sqrt n$.
- Width shrinks like $\sqrt n$: halving it takes quadruple the sample.

## What a confidence interval actually claims

Repeat the sampling many times, building one interval each time. If the method is right, about $95\%$ of those intervals cover the true $\mu$. That is a long-run frequency statement about the **procedure**, not about any single interval.

Once the data are fixed the interval is fixed, and $\mu$ is either inside or not. Saying "this interval contains $\mu$ with probability 95%" is loose talk.

The general recipe: find a pivot $Q(X;\theta)$ whose distribution is parameter-free, then invert

$$
P\big(q_{1-\alpha/2}\le Q\le q_{\alpha/2}\big)=1-\alpha.
$$

## A catalogue of intervals

| Setting | Condition | Interval |
| --- | --- | --- |
| Normal mean, $\sigma$ known | normal population | $\bar X\pm z_{\alpha/2}\sigma/\sqrt n$ |
| Normal mean, $\sigma$ unknown | normal population | $\bar X\pm t_{\alpha/2}(n-1)S/\sqrt n$ |
| Mean, large sample | finite variance, large $n$ | $\bar X\pm z_{\alpha/2}S/\sqrt n$ |
| Proportion $p$ | $np,n(1-p)$ above 5 | $\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}$ |
| Variance $\sigma^2$ | normal population | $\left[\frac{(n-1)S^2}{\chi^2_{\alpha/2}},\frac{(n-1)S^2}{\chi^2_{1-\alpha/2}}\right]$ |

## A worked example

With $n=16$, $\bar x=10$ and $s=2$, the standard error is $2/4=0.5$ and $t_{0.025}(15)=2.131$:

$$
10\pm2.131\times0.5=[8.93,\,11.07],
$$

a width of $2.13$. Now raise $n$ to $64$ with the same $s$: the standard error becomes $0.25$ and $t_{0.025}(63)\approx2.00$, so

$$
10\pm2.00\times0.25=[9.50,\,10.50],
$$

width $1.00$ — almost exactly half. Four times the data, half the width.

To force the width below $0.5$, solve $1.96\times2/\sqrt n\le0.25$, giving $n\ge246$.

For a proportion with $\hat p=0.6$ and $n=400$, the standard error is $\sqrt{0.24/400}=0.0245$ and the interval is $0.6\pm0.048=[0.552,\,0.648]$.

> [!MYTH] This particular interval contains the truth with probability 95%.
> Once computed, nothing is random. The 95% belongs to the procedure's coverage rate, not to one realised interval.

> [!NOTE]
> Intervals for bounded parameters can breach the boundary. With $\hat p=0.98$ and $n=100$ the Wald upper limit exceeds 1. Use Wilson or Clopper–Pearson intervals, which never leave $[0,1]$.

## Three common misconceptions

> [!MYTH] Higher confidence is always better.
> Going from 95% to 99% widens the interval by about $30\%$ and loses precision. Confidence and precision trade off against each other.

> [!MYTH] Overlapping intervals prove no difference.
> Overlap and test conclusions do not correspond one-to-one, especially for one-sided tests. Interval the difference directly instead.

> [!MYTH] Intervals are symmetric in general.
> Symmetry holds for means under symmetric distributions. Chi-square intervals for variances and Wilson intervals for proportions are skewed.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> With $n=25$, $\bar x=50$ and $s=10$, give the $95\%$ interval for $\mu$.
>
> > [!ANSWER] Show answer
> > Standard error $10/5=2$ and $t_{0.025}(24)=2.064$, so the interval is $50\pm4.128=[45.87,\,54.13]$.

> [!PRACTICE] 2 · Variation
> Change the level to $90\%$ with $t_{0.05}(24)=1.711$. What happens?
>
> > [!ANSWER] Show answer
> > $50\pm1.711\times2=50\pm3.422=[46.58,\,53.42]$, narrower than the $95\%$ interval.

> [!PRACTICE] 3 · Transfer
> How large a sample estimates a proportion to $\pm0.03$ at 95% confidence in the worst case?
>
> > [!ANSWER] Show answer
> > Take $\hat p=0.5$ to maximise variance: $1.96\sqrt{0.25/n}\le0.03$ gives $n\ge(1.96/0.06)^2\approx1067$, so use 1068.

## Formal statement

Let $\bar X$ and $S$ come from a normal population. Then $T=\sqrt n(\bar X-\mu)/S\sim t(n-1)$ is a pivot. Choosing $t_{\alpha/2}$ with $P(T>t_{\alpha/2})=\alpha/2$ gives

$$
P\left(\bar X-t_{\alpha/2}\frac{S}{\sqrt n}\le\mu\le\bar X+t_{\alpha/2}\frac{S}{\sqrt n}\right)=1-\alpha
$$

for every fixed $\mu$, the probability coming from the randomness of the sample. This is the precise meaning of coverage: the random interval covers the fixed $\mu$ with probability $1-\alpha$. Variance intervals follow from the chi-square pivot; because that distribution is skewed, equal-tailed limits are the default and the shortest interval requires a numerical search.
