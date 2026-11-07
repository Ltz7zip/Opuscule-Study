---
slug: "poisson-and-wiener-process"
subject: "probability"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "The Poisson and Wiener Processes"
subtitle: "The two basic continuous-time models: jumps and continuous motion"
minutes: 17
meta: ["17 min read","Requires stochastic processes and the exponential law","Mastery level"]
concepts: ["markov", "distribution", "variance"]
prereq: ["markov", "distribution"]
related: ["timeseries", "expectation"]
---

## What you will get

You will compute Poisson probabilities from the rate, explain why interarrival times are exponential, and state the definition and basic properties of the Wiener process.

## Three lines back

- The Poisson process is a counting process with independent and stationary increments, and $N_t\sim P(\lambda t)$.
- Interarrival times are i.i.d. $Exp(\lambda)$, and the $n$th arrival time is Gamma$(n,\lambda)$.
- Wiener increments are independent, stationary and normal, paths are continuous, and $\operatorname{Cov}(W_s,W_t)=\sigma^2\min(s,t)$.

## The Poisson process: counts and intensity

A counting process $\{N_t:t\ge0\}$ records the number of events up to time $t$: nonnegative integers, nondecreasing, jumps of size 1. It is a Poisson process of rate $\lambda$ when

1. $N_0=0$;
2. independent increments: increments over disjoint intervals are independent;
3. stationary increments: the law of an increment depends only on the interval length;
4. $P(N_{t+h}-N_t=1)=\lambda h+o(h)$ and $P(N_{t+h}-N_t\ge2)=o(h)$.

These conditions imply

$$
P(N_t=k)=\frac{(\lambda t)^k}{k!}e^{-\lambda t},\qquad E[N_t]=\operatorname{Var}(N_t)=\lambda t.
$$

With $\lambda=3$ per hour and $t=2$ hours,

$$
P(N_2=5)=\frac{6^5}{120}e^{-6}=64.8\times0.002479=0.1606,
$$

and both mean and variance equal $6$, with standard deviation $\sqrt6=2.449$.

| Property | Statement | Meaning |
| --- | --- | --- |
| independent increments | $N_b-N_a\perp N_d-N_c$ | disjoint intervals do not interact |
| stationary increments | $N_{t+h}-N_t\sim N_h$ | only lengths matter |
| superposition | rates of independent processes add | $\lambda_1+\lambda_2$ |
| thinning | keep each event with probability $p$ | retained rate $p\lambda$ |

## Interarrival and waiting times

Let $T_1$ be the first arrival time and $T_n$ the gap between the $(n-1)$th and $n$th events. "No event in $[0,t]$" gives

$$
P(T_1>t)=P(N_t=0)=e^{-\lambda t},
$$

so $T_1\sim Exp(\lambda)$ with density $\lambda e^{-\lambda t}$ and mean $1/\lambda$. Independent increments extend this: $T_1,T_2,\dots$ are i.i.d. $Exp(\lambda)$.

The $n$th arrival time $S_n=T_1+\dots+T_n$ is Gamma$(n,\lambda)$, and the event $\{S_n\le t\}$ is exactly $\{N_t\ge n\}$, which links the gap language to the counting language.

With $\lambda=3$, the mean gap is $1/3$ hour, or 20 minutes. The probability that nothing arrives in the first half hour is

$$
P(T_1>0.5)=e^{-1.5}=0.2231,
$$

and the probability that the third arrival happens within two hours is

$$
P(S_3\le2)=P(N_2\ge3)=1-e^{-6}\left(1+6+\frac{36}{2}\right)=1-25\times0.002479=0.9380.
$$

Memorylessness has a concrete reading here: after waiting ten minutes, the chance of waiting another ten or more is again $e^{-1.5}$, exactly as if the clock had just started.

## The Wiener process

A Wiener process (Brownian motion) $\{W_t:t\ge0\}$ satisfies

1. $W_0=0$;
2. independent increments;
3. $W_t-W_s\sim N(0,\sigma^2(t-s))$ for $s<t$;
4. continuous paths.

Immediately $W_t\sim N(0,\sigma^2t)$, so $E[W_t]=0$ and $\operatorname{Var}(W_t)=\sigma^2t$. The covariance is

$$
\operatorname{Cov}(W_s,W_t)=\sigma^2\min(s,t).
$$

The derivation is one line: for $s<t$ write $W_t=W_s+(W_t-W_s)$; the cross term vanishes by independent increments.

Take $\sigma=1$. Then $W_3-W_1\sim N(0,2)$ and

$$
P(W_3-W_1>1.5)=1-\Phi\left(\frac{1.5}{\sqrt2}\right)=1-\Phi(1.061)=0.1446.
$$

Also $\operatorname{Cov}(W_1,W_3)=1$, so the correlation is $1/\sqrt{3}=0.577$.

| Contrast | Poisson | Wiener |
| --- | --- | --- |
| values | nonnegative integers | real numbers |
| paths | step functions with jumps | continuous, nowhere differentiable |
| increments | Poisson | normal |
| mean / variance | $\lambda t$ / $\lambda t$ | 0 / $\sigma^2t$ |
| covariance | $\lambda\min(s,t)$ | $\sigma^2\min(s,t)$ |

The path of $W$ has infinite variation on every interval, so it cannot be differentiated in the ordinary sense, and $\operatorname{Var}(W_t)$ grows linearly, so the process is not stationary.

> [!MYTH] Poisson arrivals are uniformly distributed in time.
> Conditional on $N_t=n$, the $n$ arrival times are indeed uniform on $[0,t]$, but the gaps between arrivals are exponential. These are different statements.

> [!NOTE]
> Brownian motion is the limit of a random walk: a walk with $n$ steps of size $\pm1/\sqrt n$ converges to standard Brownian motion as $n\to\infty$. This is the central limit theorem lifted to the level of paths.

## Three common misconceptions

> [!MYTH] A larger Poisson rate means smaller variability in the gaps.
> $T\sim Exp(\lambda)$ has variance $1/\lambda^2$, which does fall with $\lambda$, but the mean $1/\lambda$ falls at the same rate, so the coefficient of variation stays at 1.

> [!MYTH] Continuous paths mean the Wiener process is differentiable.
> Continuity says nothing about differentiability. Brownian paths are almost surely nowhere differentiable, and their quadratic variation is $\sigma^2t$, not 0.

> [!MYTH] Any counting process with stationary increments is Poisson.
> Independence is also required, along with the no-double-jump condition on small intervals. Without independence, stationarity fixes only the marginals.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For $\lambda=4$, find $P(N_1=2)$ and $P(N_1\ge1)$.
>
> > [!ANSWER] Show answer
> > $P(N_1=2)=\frac{4^2}{2}e^{-4}=8\times0.0183=0.1465$, and $P(N_1\ge1)=1-e^{-4}=0.9817$.

> [!PRACTICE] 2 · Variation
> In the same setting, what is the chance the first arrival comes within half an hour?
>
> > [!ANSWER] Show answer
> > $P(T_1\le0.5)=1-e^{-2}=0.8647$, since $T_1\sim Exp(4)$.

> [!PRACTICE] 3 · Transfer
> For standard Brownian motion, compute $\operatorname{Var}(W_2-2W_1)$.
>
> > [!ANSWER] Show answer
> > $\operatorname{Var}(W_2)+4\operatorname{Var}(W_1)-4\operatorname{Cov}(W_2,W_1)=2+4-4=2$.

## Formal statement

A Poisson process is a counting process with $N_0=0$, independent stationary increments, $P(N_{t+h}-N_t=1)=\lambda h+o(h)$ and $P(N_{t+h}-N_t\ge2)=o(h)$. These conditions give $N_t\sim P(\lambda t)$, i.i.d. exponential gaps $T_n\sim Exp(\lambda)$, $n$th arrival $S_n=\sum_{i\le n}T_i\sim\Gamma(n,\lambda)$, and the identity $\{S_n\le t\}=\{N_t\ge n\}$. A Wiener process is a Gaussian process with $W_0=0$, independent increments, $W_t-W_s\sim N(0,\sigma^2(t-s))$ and continuous paths; equivalently it is the zero-mean Gaussian process with covariance $\sigma^2\min(s,t)$. Its quadratic variation satisfies $\sum_i(W_{t_i}-W_{t_{i-1}})^2\to\sigma^2t$ in probability, so paths have unbounded variation and ordinary calculus fails, which is why the Itô integral is needed. Both are Lévy processes with independent stationary increments and right-continuous left-limit paths: the Poisson process is the pure-jump extreme and the Wiener process the purely continuous one.