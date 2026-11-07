---
slug: "stationarity-acf-pacf"
subject: "probability"
unit: "u15"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Stationarity and Autocorrelation Analysis"
subtitle: "Plot first, then compute two bars"
minutes: 15
meta: ["15 min read","Requires stationary processes and correlation","Mastery level"]
concepts: ["timeseries", "variance", "regression"]
prereq: ["timeseries", "variance"]
related: ["markov", "regression"]
---

## What you will get

You will spot trend and seasonal components and remove them by differencing, compute sample autocorrelations and partial autocorrelations, and read model orders from cutoff versus tail-off behaviour.

Before fitting anything, check three things: whether the mean drifts, whether the variance changes, and how correlation decays with lag. The first two are handled with plots and differences, the third with ACF and PACF.

## Three lines back

- A trend makes the mean time-dependent; the first difference $\nabla X_t=X_t-X_{t-1}$ removes a linear trend.
- The sample autocorrelation $\hat\rho(k)$ measures linear association at lag $k$, with a significance band near $\pm1.96/\sqrt n$.
- AR models tail off in ACF and cut off in PACF; MA reverses this; ARMA tails off in both.

## Trend, seasonality, and differencing

Let the observations be $x_1,\dots,x_n$. A slow drift of the level is a trend; a pattern repeating every $s$ periods is seasonality, with $s=12$ for monthly data.

The difference operator is

$$
\nabla x_t=x_t-x_{t-1},\qquad \nabla^{2}x_t=\nabla x_t-\nabla x_{t-1}=x_t-2x_{t-1}+x_{t-2}.
$$

A linear trend $x_t=a+bt+u_t$ becomes $\nabla x_t=b+\nabla u_t$, whose mean is constant; a quadratic trend needs two differences. Seasonal components are removed by $\nabla_sx_t=x_t-x_{t-s}$.

| $t$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| $x_t$ | 10 | 12 | 13 | 16 | 17 | 20 |
| $\nabla x_t$ | — | 2 | 1 | 3 | 1 | 3 |

The level climbs from $10$ to $20$, clearly nonstationary; the differences move between $1$ and $3$ with no direction. The price of differencing is one lost observation and amplified noise.

## Estimating ACF and PACF

The sample autocorrelation is

$$
\hat\rho(k)=\frac{\sum_{t=k+1}^{n}(x_t-\bar x)(x_{t-k}-\bar x)}{\sum_{t=1}^{n}(x_t-\bar x)^{2}},\qquad k=1,2,\dots
$$

It is consistent for $\rho(k)$ with a small bias, since the denominator uses the full sum of squares rather than a lag-specific one.

Take $x=(3,5,4,6,5,7)$. Then $\bar x=5$, the deviations are $(-2,0,-1,1,0,2)$, and the sum of squares is $10$. Hence

$$
\hat\rho(1)=\frac{0+0+(-1)(1)+0+0}{10}=-0.1,
$$

$$
\hat\rho(2)=\frac{(-2)(-1)+0+0+(1)(2)}{10}=0.4,
\qquad
\hat\rho(3)=\frac{(-2)(1)+0+(-1)(2)}{10}=-0.4.
$$

With $n=6$ the significance band is $1.96/\sqrt6\approx0.8$, and all three estimates sit inside it, so there is no evidence against white noise. The band comes from $\hat\rho(k)$ being approximately $N(0,1/n)$ under independence.

The partial autocorrelation $\phi_{kk}$ is the net association between $X_t$ and $X_{t-k}$ after controlling the intermediate lags. It equals the last coefficient when $X_t$ is regressed on $X_{t-1},\dots,X_{t-k}$, which strips out indirect correlation routed through intermediate terms and exposes the order more sharply than the ACF.

> [!NOTE]
> Sample autocorrelations from short series are unstable: at $n=6$ a single estimate above $0.5$ happens even for true white noise. Always plot the confidence band rather than staring at one number.

## Reading ACF and PACF

| Model | ACF | PACF | Typical shape |
| --- | --- | --- | --- |
| AR($p$) | tails off, exponential or oscillating | cuts off after $p$ | strong adjacent correlation |
| MA($q$) | cuts off after $q$ | tails off | memory lasts $q$ periods |
| ARMA($p,q$) | tails off | tails off | neither cuts off |

Read in this order: if the ACF drops abruptly to zero after some lag, lean towards MA; if it decays slowly while the PACF truncates at $p$, lean towards AR; if neither truncates, use ARMA and compare orders with an information criterion.

A trended series produces an ACF that decays very slowly and looks significant at almost every lag. That is the trend speaking, not memory. Difference first and recompute instead of fitting a high-order AR.

## Three common misconceptions

> [!MYTH] More differencing always means a more stationary series.
> Overdifferencing injects artificial negative correlation, turning white noise into a non-invertible MA process and inflating the variance. One or two differences are usually enough.

> [!MYTH] A sample ACF above $0.2$ is significant.
> The band scales as $1.96/\sqrt n$: about $0.196$ at $n=100$ but only $0.062$ at $n=1000$. A fixed threshold means nothing.

> [!MYTH] Large autocorrelation proves that one period causes the next.
> Correlation is not causation. Two series rising over time can show an ACF near one, and the association may vanish once the trend is removed.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Compute $\hat\rho(1)$ and $\hat\rho(2)$ for $x=(4,2,5,3,6,4)$.
>
> > [!ANSWER] Show answer
> > $\bar x=4$, deviations $(0,-2,1,-1,2,0)$, sum of squares $10$. Thus $\hat\rho(1)=-5/10=-0.5$ and $\hat\rho(2)=4/10=0.4$.

> [!PRACTICE] 2 · Variation
> A series has ACF $0.6$ at lag one and inside the band from lag two on, while the PACF decays slowly. Which model fits?
>
> > [!ANSWER] Show answer
> > An ACF that cuts off after one lag with a tailing PACF is the signature of MA(1).

> [!PRACTICE] 3 · Transfer
> For $x_t=2+3t$, find $\nabla x_t$ and $\nabla^2x_t$.
>
> > [!ANSWER] Show answer
> > $\nabla x_t=3$ is constant and $\nabla^2x_t=0$. One difference already removes the linear trend; a second only produces zeros.

## Formal statement

Let $\{X_t\}$ be wide-sense stationary with $\gamma(k)=\operatorname{Cov}(X_t,X_{t+k})$ and $\rho(k)=\gamma(k)/\gamma(0)$. The sample version is

$$
\hat\rho(k)=\frac{\sum_{t=k+1}^{n}(x_t-\bar x)(x_{t-k}-\bar x)}{\sum_{t=1}^{n}(x_t-\bar x)^2}.
$$

Under independence with finite variance, $\sqrt n\hat\rho(k)$ converges in distribution to $N(0,1)$, so $\lvert\hat\rho(k)\rvert>1.96/\sqrt n$ is treated as significant.

The partial autocorrelation $\phi_{kk}$ is determined by the Yule–Walker equations $\rho(j)=\sum_{i=1}^{k}\phi_{ki}\rho(j-i)$ for $j=1,\dots,k$, where $\phi_{kk}$ is the last coefficient of the AR($k$) fit. For AR($p$) one has $\phi_{kk}=0$ when $k>p$; for MA($q$) one has $\rho(k)=0$ when $k>q$. Joint white-noise testing often uses the Ljung–Box statistic $Q=n(n+2)\sum_{k=1}^{m}\hat\rho^2(k)/(n-k)$, approximately $\chi^2(m)$ under independence.