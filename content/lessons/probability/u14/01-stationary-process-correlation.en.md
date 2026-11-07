---
slug: "stationary-process-correlation"
subject: "probability"
unit: "u14"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Stationary Processes and Correlation Functions"
subtitle: "One sample path, standing in for a whole family"
minutes: 15
meta: ["15 min read","Requires expectation and variance","Mastery level"]
concepts: ["timeseries", "variance", "expectation"]
prereq: ["variance", "jointdist"]
related: ["markov", "regression"]
---

## What you will get

You will separate strict from wide-sense stationarity, verify the four standard properties of the autocorrelation function, and explain why ergodicity is what licenses replacing an ensemble average by a time average.

A stochastic process is a random variable at each instant. Stationarity is the assumption that binds these variables together through the time lag alone, collapsing infinitely many parameters into a single function.

## Three lines back

- Strict stationarity: every finite-dimensional joint distribution is unchanged by a time shift.
- Wide-sense stationarity: constant mean, finite variance, covariance depending only on the lag $\tau$.
- The autocorrelation $\rho(\tau)=R(\tau)/R(0)$ is even, satisfies $\rho(0)=1$, and stays within $[-1,1]$.

## Strict and wide-sense stationarity

Let $\{X_t,\,t\in\mathbb R\}$ be a stochastic process. It is strictly stationary if for every $n$, every set of times $t_1,\dots,t_n$ and every shift $h$, the vectors $(X_{t_1},\dots,X_{t_n})$ and $(X_{t_1+h},\dots,X_{t_n+h})$ share a distribution. The requirement is strong: it constrains joint laws of all orders.

Wide-sense stationarity constrains only the first two moments:

$$
E[X_t]=\mu\quad(\text{independent of }t),\qquad
\operatorname{Cov}(X_t,X_{t+\tau})=R(\tau)\quad(\text{only depends on }\tau).
$$

| Condition | Strict | Wide-sense |
| --- | --- | --- |
| Mean | automatically constant | must be constant |
| Variance | automatically finite and constant | must be finite and constant |
| Covariance | determined by joint laws | depends on $\tau$ only |
| Gaussian case | equivalent to wide-sense | equivalent |

For second-order processes the wide-sense version is the working assumption, because it involves only the mean and the covariance, both estimable from data.

## Properties of the autocorrelation function

With $R(\tau)=\operatorname{Cov}(X_t,X_{t+\tau})$ and $R(0)=\operatorname{Var}(X_t)=\sigma^2$, define

$$
\rho(\tau)=\frac{R(\tau)}{R(0)}=\frac{R(\tau)}{\sigma^{2}}.
$$

Symmetry of covariance together with the Cauchy–Schwarz inequality gives

$$
\rho(0)=1,\qquad \rho(-\tau)=\rho(\tau),\qquad \lvert\rho(\tau)\rvert\le1.
$$

A fourth property is positive semidefiniteness: for any finite set of times and real coefficients, $\sum_{i,j}a_ia_jR(t_i-t_j)\ge0$. This rules out many plausible-looking shapes; a triangular pulse, for instance, cannot be an autocovariance function.

The harmonic process is the standard example: $X_t=A\cos\omega t+B\sin\omega t$ with uncorrelated $A,B$, zero means, and common variance $\sigma^2$. Then $E X_t=0$ and

$$
R(\tau)=\sigma^{2}\bigl(\cos\omega t\cos\omega(t+\tau)+\sin\omega t\sin\omega(t+\tau)\bigr)=\sigma^{2}\cos\omega\tau.
$$

Take $\sigma^2=4$ and $\omega=\pi/6$, so $R(\tau)=4\cos(\pi\tau/6)$.

| $\tau$ | 0 | 2 | 3 | 6 |
| --- | --- | --- | --- | --- |
| $R(\tau)$ | 4 | 2 | 0 | $-4$ |
| $\rho(\tau)$ | 1 | 0.5 | 0 | $-1$ |

At $\tau=6$ the correlation is $-1$: two instants half a period apart are perfectly negatively related. Autocorrelation may be negative and may oscillate, contrary to the habit of reading it as decay.

## Ergodicity

Stationarity says the distribution at a fixed time does not drift. Ergodicity says that a single sufficiently long path represents that distribution. The process is ergodic in the mean if

$$
\frac1T\int_0^T X_t\,\mathrm dt \xrightarrow[T\to\infty]{}\mu
$$

in mean square, which permits estimating $\mu$ from one record instead of many independent runs.

The link to correlation is direct: if $R(\tau)\to0$ as $\tau\to\infty$, the mean is ergodic. The harmonic process fails this test since $R(\tau)=\sigma^2\cos\omega\tau$ never decays. Averaging one path returns a random quantity tied to the phase, not zero.

> [!NOTE]
> Real data give one path only. Without ergodicity there is no justification for estimating parameters from a sample. This is why time series work begins with a stationarity check rather than with a model.

## Three common misconceptions

> [!MYTH] Wide-sense stationarity implies strict stationarity.
> Generally false. Only the first two moments are pinned down, and higher-order laws may shift with time. The Gaussian case is the exception: a Gaussian law is fixed by its mean and covariance, so the two notions coincide.

> [!MYTH] Autocorrelation must decrease monotonically with the lag.
> For the harmonic process $\rho(\tau)=\cos(\pi\tau/6)$ oscillates and reaches $-1$. Decay is common in practice but is not part of the definition.

> [!MYTH] A stationary process can always be averaged over time to estimate its mean.
> Stationarity fixes the distribution, not the behaviour of one path. A periodic component leaves the time average parked at a random phase.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For the harmonic example, find $R(4)$ and $\rho(4)$.
>
> > [!ANSWER] Show answer
> > $\cos(4\pi/6)=\cos(2\pi/3)=-0.5$, so $R(4)=-2$ and $\rho(4)=-0.5$.

> [!PRACTICE] 2 · Variation
> Let $X_t=Z_t+t$ with $Z_t$ a zero-mean wide-sense stationary sequence. Is $X_t$ wide-sense stationary?
>
> > [!ANSWER] Show answer
> > $E X_t=t$ depends on time, so no. The difference $\nabla X_t$ has a constant mean and may be stationary.

> [!PRACTICE] 3 · Transfer
> If $R(\tau)=9e^{-0.2\lvert\tau\rvert}$, find the variance and $\rho(5)$.
>
> > [!ANSWER] Show answer
> > The variance is $R(0)=9$ and $\rho(5)=e^{-1}\approx0.368$.

## Formal statement

A second-order process $\{X_t\}$ is wide-sense stationary if $E X_t=\mu$ is constant, $E X_t^2<\infty$, and $R(s,t)=\operatorname{Cov}(X_s,X_t)$ depends only on $s-t$. Then $R(\tau)=R(-\tau)$, $\lvert R(\tau)\rvert\le R(0)$, and $R$ is positive semidefinite: for any finite set of times and complex coefficients, $\sum_{i,j}a_i\bar a_jR(t_i-t_j)\ge0$. Conversely, the Herglotz theorem in discrete time and the Bochner theorem in continuous time guarantee that every such function is the covariance of some wide-sense stationary process.

Strict stationarity means every finite-dimensional distribution is invariant under time shifts. Strict stationarity with finite second moments implies wide-sense stationarity, but not conversely; for Gaussian processes the two are equivalent. If $\frac1T\int_0^TR(\tau)\,\mathrm d\tau\to0$, the process is ergodic in the mean, so its time average converges in mean square to $\mu$.