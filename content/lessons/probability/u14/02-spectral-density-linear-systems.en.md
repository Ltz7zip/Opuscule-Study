---
slug: "spectral-density-linear-systems"
subject: "probability"
unit: "u14"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Spectral Density and Linear Systems"
subtitle: "The same correlation, read on a frequency axis"
minutes: 16
meta: ["16 min read","Requires autocorrelation and Fourier transforms","Mastery level"]
concepts: ["timeseries", "variance", "expectation"]
prereq: ["timeseries", "variance"]
related: ["regression", "markov"]
---

## What you will get

You will derive a spectral density from an autocorrelation function, move between time and frequency domains with the Wiener–Khinchin relation, and use $\lvert H(\omega)\rvert^2$ to obtain the spectrum and variance of white noise passed through a linear system.

Autocorrelation answers how strongly two instants are related; spectral density answers which frequencies carry the variance. They are two coordinate systems for the same information, exchanged by a Fourier transform.

## Three lines back

- $S(\omega)$ is the Fourier transform of the autocorrelation: nonnegative and even.
- The variance is the integral of the spectrum, $R(0)=\int S(\omega)\,\mathrm d\omega$.
- A linear system multiplies the input spectrum by the squared magnitude of its frequency response.

## From autocorrelation to spectral density

For a wide-sense stationary process with $\int\lvert R(\tau)\rvert\,\mathrm d\tau<\infty$, define

$$
S(\omega)=\frac{1}{2\pi}\int_{-\infty}^{\infty}R(\tau)e^{-i\omega\tau}\,\mathrm d\tau,
\qquad
R(\tau)=\int_{-\infty}^{\infty}S(\omega)e^{i\omega\tau}\,\mathrm d\omega.
$$

This pair is the Wiener–Khinchin relation. The meaning of $S(\omega)$ is the distribution of variance over frequency: the contribution of a band $[\omega_1,\omega_2]$ is $\int_{\omega_1}^{\omega_2}S(\omega)\,\mathrm d\omega$.

| Time domain | Frequency domain |
| --- | --- |
| $R(\tau)$ | $S(\omega)$ |
| $R(0)=\sigma^2$ | $\int S(\omega)\,\mathrm d\omega$ |
| fast decay | broad, flat spectrum |
| periodic oscillation | spectral lines (impulses) |

For a discrete-time series the integral runs over $[-\pi,\pi]$ and the transform becomes a sum.

The harmonic process $R(\tau)=\sigma^2\cos\omega_0\tau$ has two spectral lines, $\frac{\sigma^2}{2}[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$. It fails absolute integrability, so this is a generalized spectrum, but the message stands: a single frequency is a single point in the frequency domain.

## Properties of the spectrum and white noise

Evenness and positive semidefiniteness of $R$ give immediately

$$
S(\omega)\ge0,\qquad S(-\omega)=S(\omega).
$$

Nonnegativity is a hard constraint: a function that dips below zero on some band cannot be a spectral density.

White noise is the flat case. With $R(0)=\sigma^2$ and $R(\tau)=0$ for $\tau\ne0$, the density is the constant $\sigma^2/(2\pi)$ on $[-\pi,\pi]$. Every frequency contributes equally.

| Process | $R(\tau)$ | $S(\omega)$ |
| --- | --- | --- |
| discrete white noise | $\sigma^2\delta_{\tau0}$ | $\sigma^2/(2\pi)$ |
| AR(1), parameter $\varphi$ | $\sigma^2\varphi^{\lvert\tau\rvert}/(1-\varphi^2)$ | $\sigma^2/[2\pi(1+\varphi^2-2\varphi\cos\omega)]$ |
| harmonic | $\sigma^2\cos\omega_0\tau$ | two spectral lines |

## Linear systems and frequency response

Let $X_t$ be wide-sense stationary and let the system be linear and time-invariant, with output

$$
Y_t=\sum_{k}h_kX_{t-k},\qquad H(\omega)=\sum_k h_ke^{-ik\omega}.
$$

$H(\omega)$ is the frequency response and $\lvert H(\omega)\rvert^2$ the power gain. The output is again wide-sense stationary and

$$
S_Y(\omega)=\lvert H(\omega)\rvert^{2}S_X(\omega).
$$

Feed unit-variance white noise through $Y_t=\frac12(X_t+X_{t-1})$:

$$
H(\omega)=\frac{1+e^{-i\omega}}{2}=e^{-i\omega/2}\cos\frac{\omega}{2},
\qquad
S_Y(\omega)=\frac{1}{2\pi}\cos^{2}\frac{\omega}{2}.
$$

The gain is $1$ at $\omega=0$ and $0$ at $\omega=\pi$: high frequencies are cancelled entirely. The output variance is

$$
R_Y(0)=\int_{-\pi}^{\pi}\frac{1}{2\pi}\cos^{2}\frac{\omega}{2}\,\mathrm d\omega=\frac12,
$$

matching the direct computation $\operatorname{Var}\bigl(\tfrac12(X_t+X_{t-1})\bigr)=\tfrac14(1+1)=\tfrac12$.

Now take the AR(1) process $X_t=0.6X_{t-1}+\varepsilon_t$ with unit-variance innovations. Here $H(\omega)=1/(1-0.6e^{-i\omega})$, so

$$
S_X(\omega)=\frac{1}{2\pi\left(1.36-1.2\cos\omega\right)}.
$$

At $\omega=0$ this is $1/(2\pi\times0.16)=0.995$; at $\omega=\pi$ it is $1/(2\pi\times2.56)=0.062$. Low frequencies carry sixteen times the energy of high frequencies, which is why the series looks smooth and positively correlated. Integrating gives variance $1/(1-0.36)=1.5625$, in agreement with the AR(1) variance formula.

## Three common misconceptions

> [!MYTH] The spectral density is a probability density, so it integrates to one.
> It integrates to the variance $\sigma^2$, not to one. Values above one are normal; the units are variance per unit frequency.

> [!MYTH] A spectral density may be negative as long as the total integral is positive.
> Nonnegativity follows from positive semidefiniteness of $R$. A negative value would mean a negative variance contribution in that band.

> [!MYTH] White noise has to be Gaussian white noise.
> White noise only requires zero correlation and a flat spectrum. Gaussianity is an extra distributional assumption used for likelihoods and interval forecasts.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> If $R(\tau)=\sigma^2e^{-\alpha\lvert\tau\rvert}$, find $S(\omega)$.
>
> > [!ANSWER] Show answer
> > The integral equals $\sigma^2\cdot\frac{2\alpha}{\alpha^2+\omega^2}$, so $S(\omega)=\frac{\sigma^2\alpha}{\pi(\alpha^2+\omega^2)}$, a Cauchy-shaped spectrum.

> [!PRACTICE] 2 · Variation
> Unit-variance white noise passes through $Y_t=X_t+0.5X_{t-1}$. Find $S_Y(\omega)$ and the variance.
>
> > [!ANSWER] Show answer
> > $\lvert H\rvert^2=1.25+\cos\omega$, so $S_Y=(1.25+\cos\omega)/(2\pi)$ and the variance is $1.25$.

> [!PRACTICE] 3 · Transfer
> If the gain of a linear system is doubled everywhere, how do the output spectrum and variance change?
>
> > [!ANSWER] Show answer
> > $H$ becomes $2H$, so the spectrum and the variance are both multiplied by $4$.

## Formal statement

Let $\{X_t\}$ be wide-sense stationary with $R(\tau)=\operatorname{Cov}(X_t,X_{t+\tau})$. If $\int_{\mathbb R}\lvert R(\tau)\rvert\,\mathrm d\tau<\infty$, the spectral density $S(\omega)=\frac{1}{2\pi}\int R(\tau)e^{-i\omega\tau}\mathrm d\tau$ exists and $R(\tau)=\int S(\omega)e^{i\omega\tau}\mathrm d\omega$, the Wiener–Khinchin pair. Positive semidefiniteness of $R$ yields $S(\omega)\ge0$, and $R(0)=\int S(\omega)\mathrm d\omega=\operatorname{Var}(X_t)$.

For a linear time-invariant system $Y_t=\sum_kh_kX_{t-k}$ with frequency response $H(\omega)=\sum_kh_ke^{-ik\omega}$, one has $S_Y(\omega)=\lvert H(\omega)\rvert^2S_X(\omega)$. When $\sum_k\lvert h_k\rvert<\infty$ the output is wide-sense stationary with $E Y_t=\mu\sum_kh_k$. For white-noise input, $S_X=\sigma^2/(2\pi)$, and the output spectrum is shaped entirely by $\lvert H\rvert^2$.