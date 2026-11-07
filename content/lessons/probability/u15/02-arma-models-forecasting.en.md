---
slug: "arma-models-forecasting"
subject: "probability"
unit: "u15"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "ARMA Models and Forecasting"
subtitle: "Today's value as a function of yesterday and yesterday's shock"
minutes: 17
meta: ["17 min read","Requires autocorrelation analysis and regression","Mastery level"]
concepts: ["timeseries", "regression", "variance"]
prereq: ["timeseries", "regression"]
related: ["markov", "variance"]
---

## What you will get

You will write AR, MA and ARMA models, test stationarity through characteristic roots, solve Yule–Walker equations for theoretical autocorrelations, and produce step-by-step AR(1) forecasts with their error variances.

The previous lecture read orders off ACF and PACF plots; here those hints become equations.

## Three lines back

- AR($p$) explains today by past observations; MA($q$) explains today by past shocks.
- Stationarity requires all roots of $1-\varphi_1z-\cdots-\varphi_pz^p=0$ to lie outside the unit circle.
- A forecast is a conditional expectation; its error variance grows with the horizon towards the unconditional variance.

## AR, MA, and ARMA representations

The three basic forms are

$$
\text{AR}(p):\quad X_t=c+\sum_{i=1}^{p}\varphi_iX_{t-i}+\varepsilon_t,
$$

$$
\text{MA}(q):\quad X_t=\mu+\varepsilon_t+\sum_{j=1}^{q}\theta_j\varepsilon_{t-j},
$$

$$
\text{ARMA}(p,q):\quad X_t=c+\sum_{i=1}^{p}\varphi_iX_{t-i}+\varepsilon_t+\sum_{j=1}^{q}\theta_j\varepsilon_{t-j},
$$

with $\varepsilon_t$ white noise of variance $\sigma^2$. Using the lag operator $B$, the ARMA model reads $\Phi(B)X_t=c+\Theta(B)\varepsilon_t$ with $\Phi(z)=1-\varphi_1z-\cdots-\varphi_pz^p$ and $\Theta(z)=1+\theta_1z+\cdots+\theta_qz^q$.

| Model | Parameters | Source of memory | Stationarity |
| --- | --- | --- | --- |
| AR($p$) | $\varphi_1,\dots,\varphi_p$ | past observations | root condition required |
| MA($q$) | $\theta_1,\dots,\theta_q$ | past shocks | always stationary at finite order |
| ARMA($p,q$) | both | both | determined by the roots of $\Phi$ |

An MA process is automatically stationary because it is a finite combination of white noise. It has a separate requirement, invertibility: the roots of $\Theta(z)$ must also lie outside the unit circle, otherwise it cannot be rewritten as an infinite-order AR.

## Stationarity and the Yule–Walker equations

Iterating AR(1) gives $X_t=\frac{c}{1-\varphi}+\sum_{j\ge0}\varphi^{j}\varepsilon_{t-j}$, which converges exactly when $\lvert\varphi\rvert<1$. For general AR($p$), every root of $\Phi(z)=0$ must satisfy $\lvert z\rvert>1$.

Having every coefficient below one is not sufficient. For AR(2) with $\varphi_1=0.8$ and $\varphi_2=0.3$, the equation $1-0.8z-0.3z^2=0$ has roots $0.927$ and $-3.59$; one lies inside the unit circle, so the process is not stationary.

Multiplying the AR equation by $X_{t-k}$ and taking expectations yields the Yule–Walker recursion

$$
\rho(k)=\varphi_1\rho(k-1)+\cdots+\varphi_p\rho(k-p),\qquad k\ge1.
$$

For AR(2), setting $k=1$ gives $\rho(1)=\varphi_1+\varphi_2\rho(1)$, hence

$$
\rho(1)=\frac{\varphi_1}{1-\varphi_2},\qquad \rho(2)=\varphi_1\rho(1)+\varphi_2.
$$

With $\varphi_1=0.5$ and $\varphi_2=0.3$, $\rho(1)=0.5/0.7=0.714$ and $\rho(2)=0.5(0.714)+0.3=0.657$. The ACF decays slowly from $0.714$, consistent with the tailing behaviour expected of an AR model.

## One-step forecasts and an AR(1) example

Take $X_t=3+0.5X_{t-1}+\varepsilon_t$ with $\sigma^2=1$ and an observed $x_n=10$. The minimum mean squared error forecast is the conditional expectation

$$
\hat x_{n+h}=E[X_{n+h}\mid X_n=x_n].
$$

One step ahead: $\hat x_{n+1}=3+0.5(10)=8$. Two steps: $3+0.5(8)=7$. Continuing gives $6.5,\,6.25,\dots$, converging to the unconditional mean

$$
\mu=\frac{c}{1-\varphi}=\frac{3}{0.5}=6.
$$

| Horizon $h$ | 1 | 2 | 3 | 4 | $\infty$ |
| --- | --- | --- | --- | --- | --- |
| Forecast $\hat x_{n+h}$ | 8.000 | 7.000 | 6.500 | 6.250 | 6.000 |
| Error variance | 1.000 | 1.250 | 1.3125 | 1.328 | 1.333 |

The h-step error is $e_{n+h}=\sum_{j=0}^{h-1}\varphi^{j}\varepsilon_{n+h-j}$, so

$$
\operatorname{Var}(e_{n+h})=\sigma^{2}\frac{1-\varphi^{2h}}{1-\varphi^{2}},
$$

which increases monotonically to $\sigma^2/(1-\varphi^2)=1.333$. Forecasts drifting back to the mean while uncertainty grows towards the unconditional variance are the two fixed features of stationary AR prediction.

> [!NOTE]
> When $\varphi$ is close to one the reversion is very slow, so long-horizon forecasts nearly equal the current value. This is another way of saying a random walk has no predictable mean to return to.

## Three common misconceptions

> [!MYTH] If all AR coefficients have absolute value below one, the process is stationary.
> That holds only for AR(1). With $\varphi_1=0.8$ and $\varphi_2=0.3$ both are below one, yet one characteristic root sits inside the unit circle.

> [!MYTH] MA models are always invertible, so no check is needed.
> Finite-order MA is always stationary, but invertibility requires the roots of $\Theta(z)$ outside the unit circle. An MA(1) with $\theta=1.5$ is not invertible and has exactly the same ACF as the model with $\theta=2/3$, so the data cannot tell them apart.

> [!MYTH] Longer horizons mean more information and better accuracy.
> Information only shrinks with the horizon. The forecast converges to the unconditional mean and the error variance to the unconditional variance.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Let $X_t=2+0.8X_{t-1}+\varepsilon_t$ with $x_n=5$. Find $\hat x_{n+1}$, $\hat x_{n+2}$ and the long-run mean.
>
> > [!ANSWER] Show answer
> > $\hat x_{n+1}=2+4=6$ and $\hat x_{n+2}=2+0.8(6)=6.8$. The mean is $2/0.2=10$.

> [!PRACTICE] 2 · Variation
> Decide whether AR(2) with $\varphi_1=0.8$, $\varphi_2=0.3$ is stationary.
>
> > [!ANSWER] Show answer
> > Solving $0.3z^2+0.8z-1=0$ gives $z=0.927$ and $z=-3.59$. The first has modulus below one, so the process is not stationary.

> [!PRACTICE] 3 · Transfer
> For the MA(1) model $X_t=\varepsilon_t+0.5\varepsilon_{t-1}$, find $\rho(1)$ and $\rho(2)$.
>
> > [!ANSWER] Show answer
> > $\rho(1)=\theta/(1+\theta^2)=0.5/1.25=0.4$ and $\rho(2)=0$, a cutoff after one lag.

## Formal statement

Let $\{\varepsilon_t\}$ be white noise with variance $\sigma^2$. An ARMA($p,q$) process satisfies $\Phi(B)X_t=c+\Theta(B)\varepsilon_t$ with $\Phi(z)=1-\sum_{i=1}^{p}\varphi_iz^i$ and $\Theta(z)=1+\sum_{j=1}^{q}\theta_jz^j$. A unique wide-sense stationary solution exists if and only if $\Phi(z)\neq0$ for all $\lvert z\rvert\le1$. Then $X_t=\mu+\Psi(B)\varepsilon_t$ with $\Psi=\Theta/\Phi$ analytic inside the unit circle and $\mu=c/\Phi(1)$.

The autocorrelations satisfy the Yule–Walker system $\Gamma_p\boldsymbol\varphi=\boldsymbol\gamma_p$, where $(\Gamma_p)_{ij}=\rho(\lvert i-j\rvert)$ and $\boldsymbol\gamma_p=(\rho(1),\dots,\rho(p))^{\mathsf T}$. The minimum mean squared error forecast is the conditional expectation $\hat X_{n+h}=E[X_{n+h}\mid X_n,X_{n-1},\dots]$, with error $e_{n+h}=\sum_{j=0}^{h-1}\psi_j\varepsilon_{n+h-j}$ and $\operatorname{Var}(e_{n+h})=\sigma^2\sum_{j=0}^{h-1}\psi_j^2$, which tends to $\gamma(0)$ as $h\to\infty$.