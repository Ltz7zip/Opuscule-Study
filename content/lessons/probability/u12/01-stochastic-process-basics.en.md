---
slug: "stochastic-process-basics"
subject: "probability"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Stochastic Processes and Finite-Dimensional Distributions"
subtitle: "Viewing a whole family of random variables as one object"
minutes: 16
meta: ["16 min read","Requires random variables and moments","Mastery level"]
concepts: ["markov", "expectation", "variance"]
prereq: ["randvar", "expectation"]
related: ["timeseries", "jointdist"]
---

## What you will get

You will define a stochastic process, its sample functions, mean function and covariance function, describe a process through its finite-dimensional distributions, and decide whether it is strictly or weakly stationary.

## Three lines back

- A stochastic process is a family $\{X_t:t\in T\}$; fixing $\omega$ gives one sample function, or path.
- The family of finite-dimensional distributions $\{F_{t_1,\dots,t_n}\}$ determines the probability law completely.
- The mean function is $m(t)=E[X_t]$ and the covariance function is $R(s,t)=\operatorname{Cov}(X_s,X_t)$.

## Processes and sample functions

A stochastic process is a function of two arguments, $X(t,\omega)$, on a probability space. Fix $t$ and it is a random variable; fix $\omega$ and it is an ordinary function of $t$, called a sample function or trajectory. One recording of the process is one trajectory.

| Process | Index set $T$ | State space | Typical path |
| --- | --- | --- | --- |
| Poisson counting process | $[0,\infty)$ | $\{0,1,2,\dots\}$ | right-continuous step function with unit jumps |
| random walk | $\{0,1,2,\dots\}$ | integers | zigzag line moving up or down |
| sinusoid $A\cos\omega t+B\sin\omega t$ | $(-\infty,\infty)$ | $\mathbb R$ | smooth curve with random amplitude |
| Wiener process | $[0,\infty)$ | $\mathbb R$ | continuous, nowhere differentiable |

A discrete index set gives a random sequence; a continuous one gives a continuous-parameter process. The state space may consist of real numbers, integers, vectors, or even functions.

## Finite-dimensional distributions, mean and covariance

For any $n$ and any $t_1<\dots<t_n$, the joint distribution of $(X_{t_1},\dots,X_{t_n})$ is

$$
F_{t_1,\dots,t_n}(x_1,\dots,x_n)=P\left(X_{t_1}\le x_1,\dots,X_{t_n}\le x_n\right),
$$

and the whole collection is the family of finite-dimensional distributions. It is consistent, meaning that marginalising returns the lower-dimensional members, and the Kolmogorov extension theorem guarantees that any consistent family comes from some process. In this sense all probabilistic information about the process lives in those distributions.

Two summary curves do most of the work:

$$
m(t)=E[X_t],\qquad R(s,t)=\operatorname{Cov}(X_s,X_t)=E[(X_s-m(s))(X_t-m(t))].
$$

Note $R(t,t)=\operatorname{Var}(X_t)$. For a Poisson process of rate $\lambda=2$, $m(t)=2t$ and $R(s,t)=2\min(s,t)$, so $E[N_3]=6$, $\operatorname{Var}(N_3)=6$ and $\operatorname{Cov}(N_1,N_3)=2$.

For $X_t=A\cos\omega t+B\sin\omega t$ with independent $A,B\sim N(0,\sigma^2)$, symmetry gives $m(t)=0$ and

$$
R(s,t)=\sigma^2(\cos\omega s\cos\omega t+\sin\omega s\sin\omega t)=\sigma^2\cos\omega(t-s).
$$

With $\sigma^2=4$, $\omega=\pi/6$, $s=0$ and $t=2$ this is $4\cos(\pi/3)=2$, while $\operatorname{Var}(X_t)=4$ for every $t$. The correlation is $2/4=0.5$.

## Strict and weak stationarity

**Strict stationarity** demands that shifts leave every finite-dimensional distribution unchanged:

$$
F_{t_1+h,\dots,t_n+h}(x_1,\dots,x_n)=F_{t_1,\dots,t_n}(x_1,\dots,x_n),\qquad \forall h.
$$

**Weak stationarity** constrains only the first two moments:

$$
m(t)\equiv m,\qquad R(s,t)=R(s-t,0)\ \text{depends only on the lag}.
$$

For processes with finite second moments, strict stationarity implies weak stationarity but not conversely. For Gaussian processes the two coincide, since a Gaussian law is fixed by its mean and covariance.

| Process | Mean | Covariance | Verdict |
| --- | --- | --- | --- |
| Poisson, rate 2 | $2t$, time-varying | $2\min(s,t)$ | neither |
| random walk $S_n=\sum_{i\le n}\xi_i$ | 0 | $\sigma^2\min(m,n)$ | neither |
| sinusoid | 0 | $4\cos\omega(t-s)$ | both |
| $X_t=\varepsilon_t+0.5\varepsilon_{t-1}$ | 0 | lag only | weakly stationary |

The random walk is the standard trap: a constant mean of 0 hides a variance $\sigma^2n$ that grows without bound, and the covariance depends on absolute time, so it cannot be analysed as a stationary series.

> [!MYTH] A constant mean is all stationarity requires.
> The covariance must also depend only on the lag. The random walk has mean 0 forever and a variance that explodes, which is the cleanest counterexample.

> [!NOTE]
> Weak stationarity constrains only first and second moments, so it says nothing useful for heavy-tailed processes with infinite variance. Check a time plot and autocorrelation function first, then confirm with unit-root or split-sample tests.

## Three common misconceptions

> [!MYTH] Equal finite-dimensional distributions mean the same process.
> For a fixed index set, a consistent family does determine the process. But matching a few marginal distributions is nowhere near enough; the joint structure is what matters.

> [!MYTH] The covariance function $R(s,t)$ must be nonnegative.
> Covariances can be negative and can oscillate, as the sinusoid shows. What must hold is positive semidefiniteness: $\sum_{i,j}a_ia_jR(t_i,t_j)\ge0$ for all $t_i$ and coefficients $a_i$.

> [!MYTH] Sample functions are always continuous.
> Continuity is not part of the definition. Poisson paths are right-continuous with jumps, and Wiener paths are continuous yet nowhere differentiable.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For a Poisson process with $\lambda=3$, find $m(2)$, $\operatorname{Var}(N_2)$ and $\operatorname{Cov}(N_1,N_2)$.
>
> > [!ANSWER] Show answer
> > $m(2)=6$, $\operatorname{Var}(N_2)=6$, and $\operatorname{Cov}(N_1,N_2)=3\min(1,2)=3$.

> [!PRACTICE] 2 · Variation
> In the same setting, what is $\operatorname{Corr}(N_1,N_2)$?
>
> > [!ANSWER] Show answer
> > $\sqrt{3\times6}=\sqrt{18}=4.243$, so the correlation is $3/4.243=0.707$, that is $\sqrt{1/2}$.

> [!PRACTICE] 3 · Transfer
> Let $X_t=a+\varepsilon_t$ with i.i.d. $\varepsilon_t$ of mean 0 and variance $\sigma^2$. Is it stationary?
>
> > [!ANSWER] Show answer
> > $m(t)=a$ is constant and $R(s,t)=\sigma^2\delta_{s,t}$ depends only on $s-t$, so it is weakly stationary; with identically distributed errors it is strictly stationary too.

## Formal statement

Let $(\Omega,\mathcal F,P)$ be a probability space and $T\subseteq\mathbb R$. A stochastic process is a map $X:T\times\Omega\to\mathbb R$ such that each $X_t$ is a random variable. For $t_1<\dots<t_n$ the finite-dimensional distributions are consistent: for any permutation $\pi$ and any $m<n$,

$$
F_{t_{\pi(1)},\dots,t_{\pi(n)}}(x_{\pi(1)},\dots,x_{\pi(n)})=F_{t_1,\dots,t_n}(x_1,\dots,x_n),\qquad F_{t_1,\dots,t_m}(x_1,\dots,x_m)=\lim_{x_{m+1},\dots,x_n\to\infty}F_{t_1,\dots,t_n}(x_1,\dots,x_n).
$$

The Kolmogorov extension theorem states that every consistent family arises from some process. The mean function requires $E|X_t|<\infty$; the covariance function requires finite second moments and must be positive semidefinite, because $\sum_{i,j}a_ia_jR(t_i,t_j)=\operatorname{Var}\left(\sum_i a_iX_{t_i}\right)\ge0$. Weak stationarity means $m(t)\equiv m$ and $R(s,t)=R(s-t)$; strict stationarity means invariance of all finite-dimensional distributions under time shifts. The two coincide for Gaussian processes.