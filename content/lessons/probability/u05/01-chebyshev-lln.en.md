---
slug: "chebyshev-lln"
subject: "probability"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Chebyshev's Inequality and the Law of Large Numbers"
subtitle: "Bounding probabilities from the variance alone"
minutes: 16
meta: ["16 min read","Requires variance and covariance","Mastery level"]
concepts: ["variance", "expectation", "clt"]
prereq: ["variance"]
related: ["clt", "sampling"]
---

## What you will get

You will bound a probability using only a mean and a variance, and you will explain why relative frequencies settle down as a theorem rather than a folk belief.

Every earlier lesson assumed the full distribution was known. Here we reverse the logic: given only $\mu$ and $\sigma^2$, we still get bounds that hold for every distribution shape.

## Three lines back

- Markov's inequality: for nonnegative $X$, $P(X\ge a)\le E[X]/a$.
- Chebyshev's inequality: $P(|X-\mu|\ge\varepsilon)\le\sigma^2/\varepsilon^2$.
- The law of large numbers: the sample mean $\bar X_n$ converges in probability to $\mu$.

## From Markov to Chebyshev

Markov's inequality uses one fact only: if $X$ is nonnegative with mean $\mu$, the mass beyond $a$ cannot be large.

$$
P(X\ge a)\le\frac{E[X]}{a},\qquad a>0
$$

Apply it to the nonnegative variable $(X-\mu)^2$ and Chebyshev's inequality falls out:

$$
P(|X-\mu|\ge\varepsilon)=P\big((X-\mu)^2\ge\varepsilon^2\big)\le\frac{E[(X-\mu)^2]}{\varepsilon^2}=\frac{\sigma^2}{\varepsilon^2}
$$

Equivalently, the probability of staying inside $\varepsilon$ is at least $1-\sigma^2/\varepsilon^2$. Neither bound looks at the distribution, and the price is looseness.

| Inequality | Assumption | Conclusion |
| --- | --- | --- |
| Markov | $X\ge0$ | $P(X\ge a)\le E[X]/a$ |
| Chebyshev | finite variance | $P(|X-\mu|\ge\varepsilon)\le\sigma^2/\varepsilon^2$ |
| Law of large numbers | i.i.d., finite variance | $\bar X_n\xrightarrow{P}\mu$ |
| Central limit theorem | i.i.d., finite variance | $(\bar X_n-\mu)/(\sigma/\sqrt n)\Rightarrow N(0,1)$ |

## The law of large numbers

For an i.i.d. sequence, $E[\bar X_n]=\mu$ and $\operatorname{Var}(\bar X_n)=\sigma^2/n$, so Chebyshev applied to $\bar X_n$ gives

$$
P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}\to0
$$

This is the weak law. Larger samples make a fixed-size deviation less and less likely. It does **not** say that each experiment gets closer to $\mu$; it says that large deviations become rare.

Khinchin's version weakens the assumption from finite variance to finite mean, but its proof needs characteristic functions and lies beyond this lecture.

## A worked example

Let $X\sim\mathrm{Bin}(100,0.4)$. Then $E[X]=40$ and $\operatorname{Var}(X)=100(0.4)(0.6)=24$. The chance of being at least 10 away from the mean satisfies

$$
P(|X-40|\ge10)\le\frac{24}{100}=0.24
$$

So $X$ lies in $(30,50)$ with probability at least $0.76$. Widening to $\varepsilon=20$ gives $24/400=0.06$.

The exact binomial probability is about $0.00004$, far below the bound. Chebyshev is a guarantee, not a computation: always true, usually conservative.

> [!MYTH] The Chebyshev bound is the true probability.
> It is only an upper bound, sometimes orders of magnitude too large. Exact values need the distribution; approximations need the central limit theorem.

> [!NOTE]
> The bound is attainable. A three-point distribution on $\mu-\varepsilon$, $\mu$, $\mu+\varepsilon$ with total mass $\sigma^2/\varepsilon^2$ at the ends achieves equality, so Chebyshev is optimal given only the first two moments rather than merely crude.

## Three common misconceptions

> [!MYTH] The law of large numbers means a result is "due".
> It concerns averages only. After ten heads in a row, a fair coin still lands heads with probability $1/2$ on the next toss.

> [!MYTH] Doubling the sample halves the error.
> The standard error is $\sigma/\sqrt n$, so halving it requires quadrupling $n$.

> [!MYTH] Finite variance is automatic.
> The Cauchy distribution has no mean at all, and sample averages from it do not converge. Assumptions must be checked.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For $X\sim\mathrm{Bin}(100,0.4)$, bound $P(20<X<60)$ from below.
>
> > [!ANSWER] Show answer
> > Take $\varepsilon=20$: the upper bound is $24/400=0.06$, so the lower bound is $0.94$.

> [!PRACTICE] 2 · Variation
> A variable has mean 5 and variance 4. Chebyshev cannot certify $P(|X-5|<1)\ge0.9$. Why, and what $\varepsilon$ would work?
>
> > [!ANSWER] Show answer
> > At $\varepsilon=1$ the bound is $1-4=-3$, vacuous. Requiring $1-4/\varepsilon^2\ge0.9$ needs $\varepsilon^2\ge40$, i.e. $\varepsilon\ge6.32$.

> [!PRACTICE] 3 · Transfer
> With $p=0.5$ and $n=400$ independent trials, bound the chance that the relative frequency $f_n$ differs from $p$ by more than $0.05$.
>
> > [!ANSWER] Show answer
> > $\operatorname{Var}(f_n)=0.25/400=0.000625$, so the bound is $0.000625/0.0025=0.25$. The exact binomial value is about $0.046$, so the bound is loose.

## Formal statement

Let $X_1,X_2,\dots$ be i.i.d. with $E[X_i]=\mu$ and $\operatorname{Var}(X_i)=\sigma^2<\infty$. Then for every $\varepsilon>0$,

$$
\lim_{n\to\infty}P\left(\left|\frac{1}{n}\sum_{i=1}^{n}X_i-\mu\right|\ge\varepsilon\right)=0,
$$

that is, $\bar X_n\xrightarrow{P}\mu$ (Khinchin's weak law needs only $E|X_1|<\infty$). If in addition $\sum_n P(|X_n-\mu|>\varepsilon)<\infty$, the Borel–Cantelli lemma upgrades this to almost sure convergence, the strong law. Chebyshev's inequality is the elementary tool in the proof; its general form is Markov's inequality applied to a nonnegative increasing $g$: $P(g(X)\ge g(a))\le E[g(X)]/g(a)$.
