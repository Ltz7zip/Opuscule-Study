---
slug: "r-estimation-and-tests"
subject: "probability"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Estimation and Testing in R"
subtitle: "Calling t.test, chisq.test, lm and aov, and reading what comes back"
minutes: 17
meta: ["17 min read","Requires hypothesis testing and regression","Mastery level"]
concepts: ["estimation", "hypothesistest", "regression"]
prereq: ["estimation", "hypothesistest"]
related: ["regression", "sampling"]
---

## What you will get

You will call `t.test`, `chisq.test`, `lm` and `aov` correctly, and read the statistic, degrees of freedom, p-value and interval out of the output instead of stopping at the word "significant".

## Three lines back

- `t.test` returns a statistic, degrees of freedom, a p-value and a confidence interval; `var.equal` decides whether variances are pooled.
- `chisq.test` runs the Pearson test by default, and `correct = TRUE` applies a continuity correction to $2\times2$ tables.
- `lm` and `aov` share the formula interface `y ~ x`, and `summary` reports coefficients and the $F$ test.

## t.test: one sample and two samples

With ten observations $3,4,4,5,6,6,7,8,9,12$ and $H_0:\mu=5$:

```r
x <- c(3, 4, 4, 5, 6, 6, 7, 8, 9, 12)
t.test(x, mu = 5)
```

The output reports `t = 1.6336`, `df = 9`, `p-value = 0.1366` and the $95\%$ interval $[4.456,8.344]$. The mean is $6.4$ with standard error $0.859$, matching the hand calculation

$$
t=\frac{\bar x-\mu_0}{s/\sqrt n}=\frac{6.4-5}{0.859}=1.63.
$$

For two samples use `y ~ group`. Take $5,6,7,6$ and $7,8,8,9$: means $6$ and $8$, pooled variance $s_p^2=0.667$, so

$$
t=\frac{6-8}{\sqrt{0.667\left(\frac14+\frac14\right)}}=\frac{-2}{0.577}=-3.46,\qquad df=6,
$$

and `t.test(y ~ g, var.equal = TRUE)` gives $p=0.0135$: reject. The default `var.equal = FALSE` runs Welch's correction with fractional degrees of freedom. When variances are equal the two agree closely; when they are far apart the p-values can differ several-fold, so the choice must be stated.

| Argument | Default | When to change it |
| --- | --- | --- |
| `mu` | 0 | null value for a one-sample test |
| `var.equal` | `FALSE` | `TRUE` when equal variances are justified |
| `paired` | `FALSE` | `TRUE` for matched data |
| `alternative` | `"two.sided"` | `"less"` or `"greater"` when direction is known |
| `conf.level` | 0.95 | other confidence levels |

## chisq.test: goodness of fit and contingency tables

Sixty rolls of a die give counts $8,9,10,11,10,12$. Under uniformity every expected count is $10$, so

$$
\chi^2=\sum_{i=1}^6\frac{(O_i-E_i)^2}{E_i}=\frac{4+1+0+1+0+4}{10}=1.0.
$$

```r
obs <- c(8, 9, 10, 11, 10, 12)
chisq.test(obs)
```

The output is `X-squared = 1`, `df = 5`, `p-value = 0.9626`, so uniformity is not rejected. The degrees of freedom are $6-1=5$ because the total of 60 is fixed and the last cell is not free.

Contingency tables go through `table()` first, then `chisq.test`. A $2\times2$ table gets Yates' correction by default; `correct = FALSE` turns it off. When more than about a fifth of the cells have expected counts below 5, the chi-square approximation is unreliable and `fisher.test` is the better call.

## lm and aov: regression and analysis of variance

With $x=1,\dots,5$ and $y=2,4,5,8,11$:

```r
fit <- lm(y ~ x)
summary(fit)
confint(fit)
```

The output gives `(Intercept) = -0.6` and `x = 2.2`, matching the hand calculation, `Residual standard error: 0.730 on 3 degrees of freedom` which is $s=\sqrt{1.6/3}$, `Multiple R-squared: 0.968`, and `F-statistic: 90.75 on 1 and 3 DF` with `p-value: 0.002523`. `confint` adds the slope interval, which carries more information than the p-value alone.

| Output row | Meaning | Values here |
| --- | --- | --- |
| `Estimate` | coefficient estimate | $-0.6$ and $2.2$ |
| `Std. Error` | coefficient standard error | $0.766$ and $0.231$ |
| `t value` | estimate over standard error | $-0.78$ and $9.53$ |
| `Pr(>\|t\|)` | two-sided p-value | $0.491$ and $0.0025$ |

Analysis of variance uses `aov`, and the data must be in long format: one numeric column, one grouping column.

```r
fit2 <- aov(value ~ group, data = df_long)
summary(fit2)
```

For the three groups $5,6,7,6$; $7,8,8,9$; $6,7,7,8$ the output reports `Df` of $2$ and $9$, `Sum Sq` of $8.0$ and $6.0$, `Mean Sq` of $4.0$ and $0.667$, `F value = 6` and `Pr(>F) = 0.0221`, cell for cell the table computed by hand.

> [!MYTH] `p < 0.05` means R has decided there is a real difference.
> R only does arithmetic. The p-value, effect size, interval width and design must be read together; the conclusion is yours.

> [!NOTE]
> `lm` and `aov` are the same linear model underneath. `aov` merely formats the output as an ANOVA table; for one factor, `summary(lm(y ~ g))` and `summary(aov(y ~ g))` give identical $F$ values.

## Three common misconceptions

> [!MYTH] `t.test` assumes equal variances by default.
> The default is Welch's test (`var.equal = FALSE`) with data-driven, possibly fractional degrees of freedom. Pooling requires `var.equal = TRUE`.

> [!MYTH] A small chi-square p-value means a strong association.
> The p-value grows with sample size. Strength needs Cramer's $V$ or the conditional proportions in the table; with large samples even a trivial association is significant.

> [!MYTH] A high $R^2$ in `summary(lm)` means the model predicts well.
> In-sample $R^2$ only rises as variables are added. Predictive ability needs cross-validation or adjusted $R^2$, and extrapolation beyond the data remains unsafe.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Use `t.test` to check whether $10,12,9,11,13$ has mean $10$. Write the code and the conclusion.
>
> > [!ANSWER] Show answer
> > `t.test(c(10,12,9,11,13), mu = 10)` gives $\bar x=11$, $s=1.581$, $se=0.707$, $t=1.414$, $df=4$, $p=0.230$: do not reject.

> [!PRACTICE] 2 · Variation
> Repeat the previous test one-sided with $H_1:\mu>10$. How does the p-value change?
>
> > [!ANSWER] Show answer
> > Adding `alternative = "greater"` halves the p-value to $0.115$, still not rejected. The one-sided choice changes the tail area, not the statistic.

> [!PRACTICE] 3 · Transfer
> `chisq.test` warns that the chi-square approximation may be incorrect. What do you do?
>
> > [!ANSWER] Show answer
> > It means some expected counts are below 5. Merge categories, collect more data, or switch to `fisher.test`; never ignore the warning and report the p-value anyway.

## Formal statement

In the one-sample case `t.test` computes $T=\sqrt n(\bar X-\mu_0)/S$, which is $t(n-1)$ under $H_0$ and normality. With pooled variances, $S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$ and the statistic is $t(n_1+n_2-2)$; the Welch version uses a Satterthwaite approximation for its degrees of freedom. `chisq.test` computes $\sum(O-E)^2/E$, asymptotically $\chi^2((r-1)(c-1))$ under independence, or $\chi^2(k-1)$ for goodness of fit. `lm` solves $\hat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y$ and its residual sum of squares is $y^{\mathsf T}(I-H)y$ with $H=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$; `aov` for one factor splits the total sum of squares into between and within parts with an $F(k-1,n-k)$ statistic. The printed `Pr(>|t|)` and `Pr(>F)` are tail probabilities, and two-sided tests have already doubled them.