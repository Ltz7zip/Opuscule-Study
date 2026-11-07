---
slug: "variance-covariance-correlation"
subject: "probability"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Variance, Covariance, and Correlation"
subtitle: "Two numbers for spread, one for linear association"
minutes: 16
meta: ["16 min read","Requires mathematical expectation","Mastery level"]
concepts: ["variance", "expectation", "jointdist"]
prereq: ["expectation"]
related: ["clt", "regression"]
---

## What you will get

You will compute variances with $E[X^2]-E[X]^2$, read the sign of a covariance as co-movement, and explain exactly what $\rho=\pm1$ means.

Expectation says where the centre is, variance says how far values stray from it, and covariance says whether two variables stray together.

## Three lines back

- $\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2$, and the standard deviation is its square root.
- $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$, which reduces to the variance when $X=Y$.
- The correlation $\rho=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ lies in $[-1,1]$ and measures linear association only.

## Variance and standard deviation

The variance is the expected squared distance from the mean. Squaring makes both signs contribute positively and gives large deviations extra weight.

Expanding the square gives the computational form:

$$
\operatorname{Var}(X)=E[X^2]-2E[X]E[X]+E[X]^2=E[X^2]-E[X]^2
$$

Two rules follow:

$$
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X),\qquad \operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)
$$

A shift changes nothing, so $b$ disappears; a rescaling is squared, so the factor becomes $a^2$. When $X$ and $Y$ are independent the covariance is zero and the variances simply add.

## Covariance and correlation

$$
\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])]=E[XY]-E[X]E[Y]
$$

When $X$ is above its mean and $Y$ tends to be above its mean too, the product is usually positive and the covariance is positive; opposite movement gives a negative value. Covariance carries units, however, so rescaling one variable rescales it. Standardising removes the units:

$$
\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}
$$

| Quantity | Formula | Range |
| --- | --- | --- |
| Variance | $E[X^2]-E[X]^2$ | $[0,+\infty)$ |
| Covariance | $E[XY]-E[X]E[Y]$ | $(-\infty,+\infty)$ |
| Correlation | $\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ | $[-1,1]$ |
| Independence | $f(x,y)=f_X(x)f_Y(y)$ | implies $\rho=0$ |

$\rho=\pm1$ holds exactly when $Y=aX+b$ almost surely with $a\ne0$, that is, when the two are perfectly linear in each other. $\rho=0$ rules out linear association only; it does not prove independence.

## A joint-table example

| $X\backslash Y$ | 0 | 1 |
| --- | --- | --- |
| 0 | 0.3 | 0.2 |
| 1 | 0.2 | 0.3 |

Both marginals are $(0.5,0.5)$, so $E[X]=E[Y]=0.5$ and $E[X^2]=0.5$. Hence $\operatorname{Var}(X)=0.25$ and $\sigma_X=0.5$; the same holds for $Y$.

$$
E[XY]=1\cdot1\cdot0.3=0.3
$$

$$
\operatorname{Cov}(X,Y)=0.3-0.25=0.05,\qquad \rho=\frac{0.05}{0.5\times0.5}=0.2
$$

The variables move together, but weakly. For $W=2X+3$, $\operatorname{Var}(W)=4(0.25)=1$ and $\operatorname{Cov}(W,Y)=2(0.05)=0.1$.

> [!MYTH] Zero correlation means independence.
> Only in special families such as the bivariate normal. Take $X\sim U(-1,1)$ and $Y=X^2$: then $\operatorname{Cov}(X,Y)=E[X^3]=0$, yet $Y$ is fully determined by $X$.

> [!NOTE]
> Correlation measures the strength and direction of linear association. A strongly monotone but nonlinear relation such as $Y=e^X$ can have a small $\rho$ despite near-total dependence.

## Three common misconceptions

> [!MYTH] Variances always add.
> In general a $2\operatorname{Cov}(X,Y)$ term appears. It vanishes only when the covariance is zero.

> [!MYTH] Larger variance implies a larger mean.
> They describe different features. A variable can have a large variance and mean zero, or zero variance and any mean.

> [!MYTH] Standard deviation and variance are interchangeable.
> Variance is in squared units; the standard deviation is in the original units. Report errors and intervals with the standard deviation.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $P(X=0)=0.2$, $P(X=1)=0.5$, $P(X=2)=0.3$. Find the variance.
>
> > [!ANSWER] Show answer
> > $E[X]=1.1$ and $E[X^2]=1.7$, so $\operatorname{Var}(X)=1.7-1.21=0.49$.

> [!PRACTICE] 2 · Variation
> With $Y=2X-1$ from the previous exercise, find $E[Y]$ and $\operatorname{Var}(Y)$.
>
> > [!ANSWER] Show answer
> > $E[Y]=2(1.1)-1=1.2$ and $\operatorname{Var}(Y)=4(0.49)=1.96$.

> [!PRACTICE] 3 · Transfer
> Given $\operatorname{Var}(X)=4$, $\operatorname{Var}(Y)=9$ and $\rho=0.5$, find $\operatorname{Var}(X+Y)$.
>
> > [!ANSWER] Show answer
> > $\operatorname{Cov}=0.5(2)(3)=3$, so $\operatorname{Var}(X+Y)=4+9+6=19$.

## Formal statement

Assume $E[X^2]<\infty$ and $E[Y^2]<\infty$. Then $\operatorname{Var}(X)=E[(X-E[X])^2]$ is finite, and the Cauchy–Schwarz inequality gives $|\operatorname{Cov}(X,Y)|\le\sigma_X\sigma_Y$, hence $|\rho|\le1$. Equality holds if and only if $Y-E[Y]=c(X-E[X])$ almost surely. Covariance is a bilinear form associated with a positive semidefinite matrix, and $\operatorname{Var}(\sum_i a_iX_i)=\sum_{i,j}a_ia_j\operatorname{Cov}(X_i,X_j)$.
