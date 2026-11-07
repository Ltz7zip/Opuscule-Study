---
slug: "simple-linear-regression"
subject: "probability"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Simple Linear Regression"
subtitle: "Fit a line through the scatter and state how far to trust it"
minutes: 17
meta: ["17 min read","Requires ANOVA and hypothesis testing","Mastery level"]
concepts: ["regression", "variance", "hypothesistest"]
prereq: ["regression", "variance"]
related: ["hypothesistest", "estimation"]
---

## What you will get

You will derive the least-squares slope and intercept, test whether the linear relation is real with $F$ or $t$, and build a prediction interval at a new $x_0$.

## Three lines back

- The slope is $b_1=S_{xy}/S_{xx}$ and the intercept is $b_0=\bar y-b_1\bar x$.
- $SST=SSR+SSE$, and $R^2=SSR/SST$ is the share of variation the line explains.
- In simple regression the slope test and the overall $F$ test are the same test, with $F=t^2$.

## Least squares and the normal equations

For $n$ pairs $(x_i,y_i)$ write

$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,\qquad E(\varepsilon_i)=0,\ \operatorname{Var}(\varepsilon_i)=\sigma^2.
$$

Least squares chooses $b_0,b_1$ to minimise the residual sum of squares

$$
Q(b_0,b_1)=\sum_{i=1}^n(y_i-b_0-b_1x_i)^2.
$$

Setting the two partial derivatives to zero gives the normal equations

$$
\sum y_i=nb_0+b_1\sum x_i,\qquad \sum x_iy_i=b_0\sum x_i+b_1\sum x_i^2,
$$

whose solution is

$$
b_1=\frac{S_{xy}}{S_{xx}}=\frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sum(x_i-\bar x)^2},\qquad b_0=\bar y-b_1\bar x.
$$

The line always passes through $(\bar x,\bar y)$. Fitted values are $\hat y_i=b_0+b_1x_i$, and the residuals $e_i=y_i-\hat y_i$ satisfy $\sum e_i=0$ and $\sum e_ix_i=0$.

## A worked example

Five points: $(1,2),(2,4),(3,5),(4,8),(5,11)$. Then $\bar x=3$, $\bar y=6$ and $S_{xx}=10$.

| $x_i$ | $y_i$ | $x_i-\bar x$ | $y_i-\bar y$ | product |
| --- | --- | --- | --- | --- |
| 1 | 2 | $-2$ | $-4$ | 8 |
| 2 | 4 | $-1$ | $-2$ | 2 |
| 3 | 5 | 0 | $-1$ | 0 |
| 4 | 8 | 1 | 2 | 2 |
| 5 | 11 | 2 | 5 | 10 |

The products sum to $S_{xy}=22$, so

$$
b_1=\frac{22}{10}=2.2,\qquad b_0=6-2.2\times3=-0.6.
$$

The fitted line is $\hat y=-0.6+2.2x$. Fitted values are $1.6,3.8,6.0,8.2,10.4$ and residuals are $0.4,0.2,-1.0,-0.2,0.6$, giving

$$
SSE=0.16+0.04+1.00+0.04+0.36=1.6.
$$

Also $SST=\sum(y_i-\bar y)^2=50$, hence $SSR=48.4$ and $R^2=48.4/50=0.968$: the line absorbs about $96.8\%$ of the variation in $y$.

## Testing the slope and predicting

The unbiased variance estimate is $s^2=SSE/(n-2)=1.6/3=0.533$, so $s=0.730$. The slope has standard error

$$
\operatorname{SE}(b_1)=\frac{s}{\sqrt{S_{xx}}}=\frac{0.730}{3.162}=0.231.
$$

For $H_0:\beta_1=0$,

$$
t=\frac{2.2}{0.231}=9.53>t_{0.025}(3)=3.182,
$$

so we reject: the linear relation is significant, with $p\approx0.0025$. Equivalently $F=t^2=90.8$, matching the ANOVA table.

| Source | Sum of squares | df | Mean square | $F$ |
| --- | --- | --- | --- | --- |
| Regression | 48.4 | 1 | 48.4 | 90.8 |
| Residual | 1.6 | 3 | 0.533 | — |
| Total | 50.0 | 4 | — | — |

At $x_0=6$ the fitted value is $\hat y_0=12.6$. A prediction interval for one new observation is

$$
\hat y_0\pm t_{\alpha/2}(n-2)\,s\sqrt{1+\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}}.
$$

With $s\sqrt{1+0.2+0.9}=0.730\times1.449=1.058$, this is $12.6\pm3.37=[9.23,15.97]$. If instead you want the mean response at $x=6$, drop the 1 under the root: the interval narrows to $12.6\pm2.44=[10.16,15.04]$. The two intervals answer different questions, and confusing them understates the noise in a single future observation.

> [!MYTH] A high $R^2$ means the model is correct.
> It measures in-sample fit only. Adding variables or deleting outliers moves it, and it says nothing about model form or causation.

> [!NOTE]
> Residual plots catch what $R^2$ hides: a funnel shape signals non-constant variance, and a curved trend signals a missing nonlinear term that needs a quadratic term or a transformation.

## Three common misconceptions

> [!MYTH] The intercept always has a real interpretation.
> When $x=0$ lies far outside the observed range, $b_0$ is extrapolation. The $-0.6$ above has no physical meaning if $x$ cannot be zero.

> [!MYTH] A significant regression proves that $x$ causes $y$.
> Significance only says the association is hard to explain by chance. Causation needs design, randomisation, and control of confounders.

> [!MYTH] The fitted line can be extrapolated anywhere.
> The model is supported only over the observed range of $x$. Far outside it the linear form may fail and the prediction interval is no longer trustworthy.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For $(1,3),(2,5),(3,7),(4,9)$, find $b_1$, $b_0$ and $R^2$.
>
> > [!ANSWER] Show answer
> > $\bar x=2.5$, $\bar y=6$, $S_{xx}=5$, $S_{xy}=10$, so $b_1=2$ and $b_0=1$. The points lie exactly on the line, so $SSE=0$ and $R^2=1$.

> [!PRACTICE] 2 · Variation
> Change the last point from $(5,11)$ to $(5,6)$ and recompute the slope.
>
> > [!ANSWER] Show answer
> > Now $\bar y=5$ and $S_{xy}=22-2\times(11-5)=10$, so $b_1=1.0$ and $b_0=2$. One point drags the slope from $2.2$ to $1.0$.

> [!PRACTICE] 3 · Transfer
> With $n=12$, $S_{xx}=40$, $s=0.5$ and $b_1=1.2$, test $H_0:\beta_1=0$.
>
> > [!ANSWER] Show answer
> > $\operatorname{SE}(b_1)=0.5/\sqrt{40}=0.0791$, so $t=15.2$ against $t_{0.025}(10)=2.228$; reject.

## Formal statement

Assume $Y_i=\beta_0+\beta_1x_i+\varepsilon_i$ with independent $\varepsilon_i\sim N(0,\sigma^2)$. Then $b_1\sim N(\beta_1,\sigma^2/S_{xx})$ and $b_0\sim N(\beta_0,\sigma^2(1/n+\bar x^2/S_{xx}))$, while $SSE/\sigma^2\sim\chi^2(n-2)$ is independent of $b_1$. Hence

$$
T=\frac{b_1-\beta_1}{s/\sqrt{S_{xx}}}\sim t(n-2),
$$

which yields the test of $H_0:\beta_1=0$, and $F=T^2\sim F(1,n-2)$ reproduces the ANOVA table. Confidence intervals for $\beta_0+\beta_1x_0$ and prediction intervals for a future $Y_0$ are

$$
\hat y_0\pm t_{\alpha/2}(n-2)\,s\sqrt{\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}},\qquad \hat y_0\pm t_{\alpha/2}(n-2)\,s\sqrt{1+\frac1n+\frac{(x_0-\bar x)^2}{S_{xx}}}.
$$

The Gauss–Markov theorem states that under zero-mean, homoscedastic, uncorrelated errors, least squares is the best linear unbiased estimator of $(\beta_0,\beta_1)$; normality is not needed for that optimality claim.