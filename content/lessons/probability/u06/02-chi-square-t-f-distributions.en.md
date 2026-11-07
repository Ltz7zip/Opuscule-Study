---
slug: "chi-square-t-f-distributions"
subject: "probability"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "The χ², t, and F Distributions"
subtitle: "Three sampling distributions built from the normal"
minutes: 17
meta: ["17 min read","Requires sample statistics","Mastery level"]
concepts: ["sampling", "distribution", "variance"]
prereq: ["sampling"]
related: ["estimation", "hypothesistest"]
---

## What you will get

You will name the normal building blocks behind χ², t, and F, compute an interval from a quantile, and explain why small samples need t rather than z.

The previous lecture established that under normality $\bar X$ and $S^2$ are independent. That independence is exactly what lets the three distributions be assembled.

## Three lines back

- If $Z_1,\dots,Z_k$ are independent standard normals, $\sum Z_i^2\sim\chi^2(k)$.
- If $Z\sim N(0,1)$ is independent of $U\sim\chi^2(k)$, then $T=Z/\sqrt{U/k}\sim t(k)$.
- If $U\sim\chi^2(m)$ and $V\sim\chi^2(n)$ are independent, then $F=(U/m)/(V/n)\sim F(m,n)$.

## How the three are built

**Chi-square.** A sum of $k$ squared independent standard normals. Under normality,

$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1),
$$

which links the sample variance to the population variance and is the tool for estimating $\sigma^2$.

**Student's t.** Divide a standard normal by an independent scaled chi-square root:

$$
T=\frac{\bar X-\mu}{S/\sqrt n}\sim t(n-1).
$$

The unknown $\sigma$ is replaced by $S$, and the price is heavier tails. As $n\to\infty$, $t(n)\to N(0,1)$; beyond $n=30$ the difference is negligible.

**F.** Two independent chi-squares, each divided by its degrees of freedom, then divided:

$$
F=\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}\sim F(n_1-1,n_2-1).
$$

It compares two variances and underlies ANOVA and two-sample variance tests.

| Distribution | Construction | Parameter | Typical use |
| --- | --- | --- | --- |
| $\chi^2(k)$ | $\sum_{i=1}^k Z_i^2$ | degrees of freedom $k$ | variance estimation, goodness of fit |
| $t(k)$ | $Z/\sqrt{U/k}$ | degrees of freedom $k$ | small-sample mean inference |
| $F(m,n)$ | $\frac{U/m}{V/n}$ | two degrees of freedom | variance ratios, ANOVA |
| $N(0,1)$ | standardisation | none | large-sample approximation |

## Quantiles and symmetry

Write $t_\alpha(k)$ for the upper $\alpha$ quantile of $t(k)$, so $P(T>t_\alpha(k))=\alpha$. The t distribution is symmetric about zero, hence $t_{1-\alpha}(k)=-t_\alpha(k)$.

Useful values: $t_{0.025}(15)=2.131$, $t_{0.025}(30)=2.042$, $t_{0.025}(\infty)=1.96$. More degrees of freedom pulls the critical value toward 1.96.

For F there is a reciprocal rule,

$$
F_{1-\alpha}(m,n)=\frac{1}{F_\alpha(n,m)},
$$

so tables only need the upper tail.

## A worked example

From a normal population, $n=16$ observations give $\bar x=10$ and $s=2$. The $95\%$ interval for $\mu$ uses the standard error $s/\sqrt n=2/4=0.5$ and $t_{0.025}(15)=2.131$:

$$
10\pm2.131\times0.5=10\pm1.0655,
$$

that is, $[8.93,\,11.07]$ with width $2.13$. Using $1.96$ by mistake would give $[9.02,\,10.98]$, width $1.96$ — falsely precise.

For the variance, $\chi^2_{0.975}(15)=6.262$ and $\chi^2_{0.025}(15)=27.488$, so

$$
\left[\frac{15\times4}{27.488},\ \frac{15\times4}{6.262}\right]=[2.18,\ 9.58].
$$

The interval is asymmetric because the chi-square is skewed.

> [!MYTH] The t distribution is just a normal for small samples.
> It is a distinct family with heavier tails, indexed by degrees of freedom. The gap is visible for small $n$ and disappears only asymptotically.

> [!NOTE]
> All three distributions assume normality. For clearly non-normal data, mean inference survives via the central limit theorem, while variance inference is sensitive and calls for resampling or robust methods.

## Three common misconceptions

> [!MYTH] A narrower interval means a more accurate estimate.
> Narrow may mean a large sample, or a wrong model. Width measures precision, not bias.

> [!MYTH] Degrees of freedom are always $n-1$.
> That holds for a single mean. A pooled two-sample t test uses $n_1+n_2-2$, a variance interval uses $n-1$, and Welch's correction gives a fractional value.

> [!MYTH] The chi-square is symmetric, so intervals are $\pm$ something.
> It is right-skewed; the two tail quantiles differ and must be looked up separately.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> With $n=25$ and $s=4$, find the $95\%$ interval for $\sigma$.
>
> > [!ANSWER] Show answer
> > With 24 degrees of freedom, $\chi^2_{0.975}(24)=12.401$ and $\chi^2_{0.025}(24)=39.364$. The variance interval is $[384/39.364,\,384/12.401]=[9.76,\,30.97]$, so $\sigma\in[3.12,\,5.57]$.

> [!PRACTICE] 2 · Variation
> If $n$ rises from 25 to 100 with the same $s$, roughly how does the interval change?
>
> > [!ANSWER] Show answer
> > Its width shrinks by roughly $\sqrt{99/24}\approx2$, consistent with the $1/\sqrt n$ scaling.

> [!PRACTICE] 3 · Transfer
> Two samples of size 10 give $s_1^2=9$ and $s_2^2=4$. Test equality of variances.
>
> > [!ANSWER] Show answer
> > $F=9/4=2.25$ on $(9,9)$ degrees of freedom. Since $F_{0.025}(9,9)=4.03$, we do not reject equal variances.

## Formal statement

Let $X_1,\dots,X_n$ be i.i.d. $N(\mu,\sigma^2)$. Then $\bar X\sim N(\mu,\sigma^2/n)$, $(n-1)S^2/\sigma^2\sim\chi^2(n-1)$, and the two are independent. Consequently

$$
T=\frac{\bar X-\mu}{S/\sqrt n}=\frac{Z}{\sqrt{U/(n-1)}}\sim t(n-1),\qquad Z=\frac{\bar X-\mu}{\sigma/\sqrt n},\ U=\frac{(n-1)S^2}{\sigma^2}.
$$

The $t(k)$ density is $\frac{\Gamma((k+1)/2)}{\sqrt{k\pi}\,\Gamma(k/2)}(1+x^2/k)^{-(k+1)/2}$, and the $F(m,n)$ density is $\frac{\Gamma((m+n)/2)}{\Gamma(m/2)\Gamma(n/2)}(m/n)^{m/2}x^{m/2-1}(1+mx/n)^{-(m+n)/2}$. If $T\sim t(k)$ then $T^2\sim F(1,k)$. The $t$ distribution has a mean only for $k>1$ and a finite variance only for $k>2$.
