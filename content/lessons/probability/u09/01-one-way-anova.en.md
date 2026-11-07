---
slug: "one-way-anova"
subject: "probability"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "One-Way Analysis of Variance"
subtitle: "Splitting total variation into between-group and within-group parts"
minutes: 16
meta: ["16 min read","Requires hypothesis testing","Mastery level"]
concepts: ["variance", "hypothesistest", "regression"]
prereq: ["hypothesistest"]
related: ["regression", "sampling"]
---

## What you will get

You will decompose a total sum of squares into between-group and within-group parts, compute an F statistic, and explain why three groups cannot be compared by repeated t tests.

Comparing three means pairwise at $\alpha=0.05$ each pushes the family-wise error rate to about $1-0.95^3=14\%$. Analysis of variance settles all comparisons at once.

## Three lines back

- $SST=SSA+SSE$: total variation equals between-group plus within-group variation.
- Mean squares divide sums of squares by degrees of freedom: $MSA=SSA/(k-1)$ and $MSE=SSE/(n-k)$.
- $F=MSA/MSE$ follows $F(k-1,n-k)$ under the null of equal group means.

## The sum-of-squares decomposition

With $k$ groups of sizes $n_j$, total $n=\sum n_j$, group means $\bar X_j$ and grand mean $\bar X$:

$$
SST=\sum_{j=1}^k\sum_{i=1}^{n_j}(X_{ij}-\bar X)^2,
$$

$$
SSA=\sum_{j=1}^k n_j(\bar X_j-\bar X)^2,\qquad SSE=\sum_{j=1}^k\sum_{i=1}^{n_j}(X_{ij}-\bar X_j)^2.
$$

The identity $SST=SSA+SSE$ holds because the cross terms vanish: a deviation from the grand mean splits into "group mean away from grand mean" plus "observation away from group mean", two orthogonal pieces.

| Source | Sum of squares | df | Mean square | F |
| --- | --- | --- | --- | --- |
| Between | $SSA$ | $k-1$ | $MSA=SSA/(k-1)$ | $MSA/MSE$ |
| Within | $SSE$ | $n-k$ | $MSE=SSE/(n-k)$ | — |
| Total | $SST$ | $n-1$ | — | — |

## The F test and its assumptions

Under equal means with independent normal homoscedastic groups, both $MSA$ and $MSE$ estimate $\sigma^2$ and their ratio hovers near 1. Real differences between groups inflate $MSA$ and push the ratio up.

The assumptions are independence, normality, and equal variances. Check the last with Levene's test and switch to Welch ANOVA when it fails. Unequal sample sizes make the F test especially sensitive to heteroscedasticity.

Degrees of freedom count independent pieces of information that are consumed. $SST$ is built from $n-1$ independent deviations, the $k$ group means use up $k-1$ of them, and the remaining $n-k$ belong to within-group variation. Converting each sum of squares by its own degrees of freedom puts the two mean squares on a common scale, which is why their ratio has an $F(k-1,n-k)$ law under the null.

## A worked example

Three groups of four: $5,6,7,6$; $7,8,8,9$; $6,7,7,8$. Group means are $6,8,7$ and the grand mean is $7$.

Between: $SSA=4[(6-7)^2+(8-7)^2+(7-7)^2]=8$.

Within: the first group has deviations $-1,0,1,0$ with sum of squares 2; the other two have $-1,0,0,1$ each, also 2. So $SSE=6$.

Total: $SST=14$. Degrees of freedom are $3-1=2$ and $12-3=9$.

$$
MSA=\frac82=4,\qquad MSE=\frac69=0.667,\qquad F=\frac{4}{0.667}=6.0.
$$

Since $F_{0.05}(2,9)=4.26$, we reject equal means; $p\approx0.022$.

The standard error of a group mean is $\sqrt{MSE/4}=0.408$, so the gap of 2 between means 8 and 6 is almost five standard errors — visibly real.

> [!MYTH] A significant F means every pair differs.
> It means at least one differs. Which ones requires post-hoc comparisons (Tukey, Bonferroni) with multiplicity control.

> [!NOTE]
> ANOVA is a regression in disguise: encode groups as dummy variables, and $SSA$ becomes the regression sum of squares with the same F test. This is why $R^2=SSA/SST$.

## Three common misconceptions

> [!MYTH] More groups make the F test easier to pass.
> Extra groups change the critical value and split the between-group sum of squares. Power usually falls as $k$ grows.

> [!MYTH] $MSE$ is model error, so smaller is always better.
> $MSE$ estimates within-group noise. Small values mean stable measurements, not a better model.

> [!MYTH] The F test survives unequal variances.
> Unequal sizes plus heteroscedasticity distort the actual level badly. Use Welch or a nonparametric alternative.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Three groups of three: $1,2,3$; $4,5,6$; $7,8,9$. Find $SSA$, $SSE$ and $F$.
>
> > [!ANSWER] Show answer
> > Group means $2,5,8$ with grand mean $5$, so $SSA=3(9+0+9)=54$; each group has within sum of squares 2, so $SSE=6$. Thus $MSA=27$, $MSE=1$, $F=27>F_{0.05}(2,6)=5.14$.

> [!PRACTICE] 2 · Variation
> Change the first group to $1,2,9$ and recompute $SSE$.
>
> > [!ANSWER] Show answer
> > Its mean becomes 4 with deviations $-3,-2,5$, sum of squares 38; the others stay 2 each. $SSE=42$, $MSE=7$, $F=27/7=3.86<5.14$, no longer significant.

> [!PRACTICE] 3 · Transfer
> Given $n=20$, $k=4$, $SST=100$ and $SSA=40$, find $F$.
>
> > [!ANSWER] Show answer
> > $SSE=60$, so $MSA=40/3=13.33$ and $MSE=60/16=3.75$, giving $F=3.56$. With $F_{0.05}(3,16)=3.24$, the result is significant.

## Formal statement

The model is $X_{ij}=\mu+\tau_j+\varepsilon_{ij}$ with i.i.d. $\varepsilon_{ij}\sim N(0,\sigma^2)$ and $\sum_j n_j\tau_j=0$. Test $H_0:\tau_1=\dots=\tau_k=0$. Under $H_0$, $SSA/\sigma^2\sim\chi^2(k-1)$ and $SSE/\sigma^2\sim\chi^2(n-k)$ are independent, so $F\sim F(k-1,n-k)$. Moreover $E[MSE]=\sigma^2$ while $E[MSA]=\sigma^2+\frac{1}{k-1}\sum_j n_j\tau_j^2$, so $F$ has expectation above 1 exactly when real differences exist. The test is one-sided and rejects only in the right tail.
