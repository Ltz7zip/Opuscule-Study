---
slug: "bootstrap-standard-error-intervals"
subject: "probability"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Bootstrap Standard Errors, Intervals and Tests"
subtitle: "Read uncertainty straight off the resampling distribution"
minutes: 16
meta: ["16 min read","Requires the bootstrap idea","Mastery level"]
concepts: ["estimation", "hypothesistest", "variance"]
prereq: ["estimation", "sampling"]
related: ["hypothesistest", "regression"]
---

## What you will get

You will turn $B$ bootstrap replicates into a standard error, build a percentile interval, explain what BCa corrects, and obtain an approximate p-value from a bootstrap distribution.

## Three lines back

- The bootstrap standard error is the sample standard deviation of the $B$ replicates.
- A percentile interval takes the $2.5\%$ and $97.5\%$ quantiles of the bootstrap distribution.
- A bootstrap test must resample under the null, not resample the raw data as it stands.

## Bootstrap standard errors

Let $\hat\theta=T(x_1,\dots,x_n)$ be the original estimate and $T^*_1,\dots,T^*_B$ its bootstrap replicates. The bootstrap standard error is

$$
\widehat{\operatorname{se}}_{\text{boot}}=\sqrt{\frac{1}{B-1}\sum_{b=1}^B\left(T^*_b-\bar T^*\right)^2},\qquad \bar T^*=\frac1B\sum_{b=1}^B T^*_b.
$$

It estimates the sampling standard error of $\hat\theta$ without normality assumptions and without algebra. For a mean it agrees asymptotically with $s/\sqrt n$; for medians, correlations and $R^2$, where clean formulas are scarce or assumption-heavy, it is often the only practical route.

| Statistic | Analytic standard error | Bootstrap |
| --- | --- | --- |
| mean | $s/\sqrt n$ | close in large samples |
| median | depends on the density at the median | direct |
| correlation | long formula, bivariate normality | direct |
| regression slope | $s/\sqrt{S_{xx}}$ under model assumptions | no normality or homoscedasticity needed |

The gap $\bar T^*-\hat\theta$ is the bootstrap bias estimate. It flags skewness in the estimator, but with small $n$ it is itself noisy and should be treated as diagnostic only.

## Percentile intervals and BCa

The **percentile** interval simply takes the $\alpha/2$ and $1-\alpha/2$ quantiles of the bootstrap distribution:

$$
\left[T^*_{(\alpha/2)},\ T^*_{(1-\alpha/2)}\right].
$$

It respects asymmetry automatically and never leaves the parameter's range. Its weakness is undercoverage when $\hat\theta$ is biased or the bootstrap distribution is strongly skewed.

The **basic** or reflected interval flips the quantiles around $\hat\theta$:

$$
\left[2\hat\theta-T^*_{(1-\alpha/2)},\ 2\hat\theta-T^*_{(\alpha/2)}\right].
$$

**BCa** keeps the percentile form but changes which quantiles are used. Define

$$
z_0=\Phi^{-1}\!\left(\frac{\#\{T^*_b<\hat\theta\}}{B}\right),
$$

which measures median bias, and estimate an acceleration $a$ by jackknife, which measures how the standard error changes with the parameter. The adjusted levels are

$$
\alpha_1=\Phi\!\left(z_0+\frac{z_0+z_{\alpha/2}}{1-a(z_0+z_{\alpha/2})}\right),\qquad \alpha_2=\Phi\!\left(z_0+\frac{z_0+z_{1-\alpha/2}}{1-a(z_0+z_{1-\alpha/2})}\right),
$$

and the interval is $[T^*_{(\alpha_1)},T^*_{(\alpha_2)}]$. With $z_0=0$ and $a=0$ this collapses to the percentile method, so BCa reads as "correct the bias, then stretch or shift for skewness".

## A worked example

Ten observations: $3,4,4,5,6,6,7,8,9,12$. The mean is $\bar x=6.4$, with $s^2=66.4/9=7.378$, $s=2.716$ and $s/\sqrt{10}=0.859$.

Running $B=2000$ bootstrap replications gives:

| Quantity | Value |
| --- | --- |
| bootstrap mean $\bar T^*$ | $6.41$ |
| bootstrap standard error | $0.84$ |
| $2.5\%$ quantile | $4.85$ |
| $97.5\%$ quantile | $8.05$ |

The percentile $95\%$ interval is $[4.85,8.05]$. The $t$ interval is

$$
6.4\pm2.262\times0.859=[4.46,8.34].
$$

They are close but not identical: the data are right-skewed because of the value 12, so the percentile interval is tighter below and more conservative above.

If BCa reports $z_0=0.06$ and $a=0.018$, then at $\alpha=0.05$

$$
\alpha_1=\Phi\!\left(0.06+\frac{-1.90}{1+0.034}\right)=\Phi(-1.777)=0.038,\qquad \alpha_2=\Phi(2.156)=0.984.
$$

Using the $3.8\%$ and $98.4\%$ quantiles instead gives $[5.02,8.47]$: shifted right and slightly wider, the correction the skew calls for.

**Testing.** For $H_0:\mu=5$ the observed deviation is $1.4$. Shift the data to the null by subtracting $6.4$ and adding $5$, resample, and record $|\bar X^*-5|$. About $270$ of $2000$ replicates exceed $1.4$, so the bootstrap p-value is roughly $0.135$. A $t$ test gives $t=1.63$ and $p=0.138$ — same conclusion, no rejection.

> [!MYTH] A bootstrap test just resamples the raw data and counts how often the replicate beats the observed value.
> That measures sampling variability, not the null distribution. The data must first be moved to a world where $H_0$ holds — by shifting, centring or rescaling — or the p-value is meaningless.

> [!NOTE]
> For symmetric statistics such as the mean, percentile and $t$ intervals nearly coincide. The bootstrap earns its keep for medians, quantiles and correlations, where no clean analytic formula exists.

## Three common misconceptions

> [!MYTH] The percentile interval always beats the $t$ interval.
> With small $n$ and skewness its coverage can fall below nominal. BCa or the bootstrap-t is more reliable, at the cost of complexity.

> [!MYTH] A bigger $B$ raises coverage.
> $B$ controls Monte Carlo error only. Coverage is set by the method and the sample size; $B=2000$ already gives stable quantiles.

> [!MYTH] The bootstrap removes the need to check how the sample was drawn.
> If the sample is not random, $\hat F_n$ does not converge to $F$. Stratified, clustered or serially dependent designs need block or stratified bootstrap variants.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> With $1000$ replicates, $\bar T^*=12.1$, $\hat\theta=12.0$ and bootstrap standard error $0.50$, find the bias estimate.
>
> > [!ANSWER] Show answer
> > $12.1-12.0=0.1$, about $0.2$ standard errors, so the bias is negligible.

> [!PRACTICE] 2 · Variation
> If the percentile interval is $[11.2,13.1]$, write the basic interval.
>
> > [!ANSWER] Show answer
> > $[2(12.0)-13.1,\ 2(12.0)-11.2]=[10.9,12.8]$.

> [!PRACTICE] 3 · Transfer
> Why can you not simply resample the raw data to test whether a correlation is zero?
>
> > [!ANSWER] Show answer
> > Under the raw data the correlation is generally not zero, so replicates centre on the observed value. You must permute one variable or resample residuals to impose $H_0$.

## Formal statement

Let $\hat\theta$ estimate $\theta$ and let $T^*_1,\dots,T^*_B$ be bootstrap replicates. The bootstrap standard error is the sample standard deviation of the replicates and consistently estimates the sampling standard error of $\hat\theta$ when $T$ is a smooth functional. The percentile interval $[T^*_{(\alpha/2)},T^*_{(1-\alpha/2)}]$ has coverage error of order $O(n^{-1/2})$, while BCa uses

$$
z_0=\Phi^{-1}\!\left(P^*(T^*<\hat\theta)\right),\qquad a=\frac{\sum_i(\hat\theta_{(i)}-\bar\theta)^3}{6\left[\sum_i(\hat\theta_{(i)}-\bar\theta)^2\right]^{3/2}}
$$

to reduce the coverage error to $O(n^{-1})$, where $\hat\theta_{(i)}$ is the estimate with observation $i$ deleted. A bootstrap test requires replicates generated under $H_0$: shift for location families, rescale for scale families, and permute for independence structures. Only replicates generated under the null give valid tail probabilities.