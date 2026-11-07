---
slug: "two-sample-goodness-of-fit"
subject: "probability"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Two-Sample Tests and Goodness of Fit"
subtitle: "Comparing two groups, or checking a distributional claim"
minutes: 17
meta: ["17 min read","Requires the one-sample test","Mastery level"]
concepts: ["hypothesistest", "sampling", "variance"]
prereq: ["hypothesistest"]
related: ["hypothesistest", "sampling"]
---

## What you will get

You will run a two-sample t test and an F test for variances, and use a chi-square goodness-of-fit test to judge whether counts match a claimed distribution.

A one-sample test asks whether a mean equals a number. Real questions more often ask whether two groups differ, or whether this die is fair.

## Three lines back

- The two-sample t test compares means under independence, normality, and equal variances (or a Welch correction).
- Equal variances are checked with an F test on the ratio of the two sample variances.
- Goodness of fit uses $\chi^2=\sum(O-E)^2/E$ with degrees of freedom equal to categories minus one minus estimated parameters.

## The two-sample mean test

With independent samples of sizes $n_1,n_2$, means $\bar X_1,\bar X_2$ and variances $S_1^2,S_2^2$, pool the variances:

$$
S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}.
$$

The statistic is

$$
T=\frac{\bar X_1-\bar X_2}{S_p\sqrt{1/n_1+1/n_2}}\ \sim\ t(n_1+n_2-2)\quad\text{under }H_0:\mu_1=\mu_2.
$$

When variances differ, use the Welch form: denominators $\sqrt{S_1^2/n_1+S_2^2/n_2}$ and a Satterthwaite degrees-of-freedom approximation, usually fractional.

One may pre-test variances with an F test, but pre-testing distorts the nominal level of the subsequent t test. Defaulting to Welch is the safer habit.

| Test | Statistic | df | Null hypothesis |
| --- | --- | --- | --- |
| Pooled two-sample t | $\frac{\bar X_1-\bar X_2}{S_p\sqrt{1/n_1+1/n_2}}$ | $n_1+n_2-2$ | $\mu_1=\mu_2$ |
| Welch t | $\frac{\bar X_1-\bar X_2}{\sqrt{S_1^2/n_1+S_2^2/n_2}}$ | approximate | $\mu_1=\mu_2$ |
| Variance ratio F | $S_1^2/S_2^2$ | $(n_1-1,n_2-1)$ | $\sigma_1^2=\sigma_2^2$ |
| Goodness of fit | $\sum(O_i-E_i)^2/E_i$ | $k-1-r$ | distribution is correct |

## Goodness of fit

Split the data into $k$ mutually exclusive categories with observed counts $O_i$ and, under $H_0$, expected counts $E_i=np_i$. Then

$$
\chi^2=\sum_{i=1}^k\frac{(O_i-E_i)^2}{E_i}
$$

is approximately $\chi^2(k-1-r)$ for large $n$ with every $E_i\ge5$, where $r$ counts parameters estimated from the data. Categories with small expected counts should be merged.

## Two worked examples

**Two samples.** Two groups of 11 give $\bar x_1=10.2$, $\bar x_2=9.6$, $s_1=1.0$, $s_2=1.1$.

$$
s_p^2=\frac{10(1.00)+10(1.21)}{20}=1.105,\quad s_p=1.051,
$$

$$
t=\frac{0.6}{1.051\sqrt{2/11}}=\frac{0.6}{0.448}=1.339.
$$

With $t_{0.025}(20)=2.086$ we do not reject; $p\approx0.195$.

**A die.** 120 throws give counts $22,19,21,18,20,20$ against an expectation of 20 each:

$$
\chi^2=\frac{4+1+1+4+0+0}{20}=0.5.
$$

With $6-1=5$ degrees of freedom and $\chi^2_{0.05}(5)=11.07$, we do not reject fairness; $p\approx0.99$.

> [!MYTH] The two-sample t test needs equal sample sizes.
> It needs independence and approximate normality, not equal $n$. Very unequal sizes make Welch more important.

> [!NOTE]
> Goodness of fit is one-sided: only a large $\chi^2$ rejects. A suspiciously small value signals data that fit too well, which sometimes means fabrication.

## Three common misconceptions

> [!MYTH] Passing the variance test justifies the pooled t test.
> The pre-test often has low power and misses real variance differences. With unequal sample sizes, use Welch directly.

> [!MYTH] A chi-square test proves the distributions are identical.
> It only checks the chosen $k$ categories. Regrouping can change the conclusion.

> [!MYTH] Finer categories give more power.
> Each expected count must be at least 5. Splitting shrinks the $E_i$ and breaks the approximation.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Repeat the two-sample example with $s_1=2.0$ and $s_2=2.2$.
>
> > [!ANSWER] Show answer
> > $s_p^2=(40+48.4)/20=4.42$ and $s_p=2.102$, so $t=0.6/(2.102\times0.4264)=0.669$; still no rejection.

> [!PRACTICE] 2 · Variation
> A die gives counts $30,25,20,18,15,12$ in 120 throws. Compute $\chi^2$.
>
> > [!ANSWER] Show answer
> > Deviations $10,5,0,-2,-5,-8$ squared sum to $100+25+0+4+25+64=218$, so $\chi^2=10.9<11.07$, a marginal non-rejection.

> [!PRACTICE] 3 · Transfer
> Testing normality with 200 observations in 8 bins and two estimated parameters, what are the degrees of freedom?
>
> > [!ANSWER] Show answer
> > $k-1-r=8-1-2=5$.

## Formal statement

For two independent normal samples with equal variances, $S_p^2/\sigma^2\sim\chi^2(n_1+n_2-2)$ is independent of $\bar X_1-\bar X_2$, so $T\sim t(n_1+n_2-2)$. Under the null, $F=S_1^2/S_2^2\sim F(n_1-1,n_2-1)$. Pearson's theorem gives $\chi^2=\sum(O_i-E_i)^2/E_i\Rightarrow\chi^2(k-1-r)$ under $H_0$, with accuracy depending on the smallest expected count. When $H_0$ is continuous and parameters are estimated by maximum likelihood, $r$ is exactly the number of estimated parameters, Fisher's correction to the degrees of freedom. All of these are asymptotic results; small samples or low expected counts call for exact tests such as Fisher's.
