---
slug: "moment-and-mle"
subject: "probability"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Moment Estimation and Maximum Likelihood"
subtitle: "Two roads to the same destination: parameters from data"
minutes: 17
meta: ["17 min read","Requires the three sampling distributions","Mastery level"]
concepts: ["estimation", "expectation", "calc"]
prereq: ["sampling"]
related: ["estimation", "hypothesistest"]
---

## What you will get

You will derive a moment estimator and a maximum likelihood estimator for a given family, solve the log-likelihood stationarity equation, and explain why the two need not agree.

Parameter estimation asks: the shape of the distribution is known, only a few numbers are missing, so how do we pin them down with a sample?

## Three lines back

- The method of moments equates sample moments to population moments and solves.
- Maximum likelihood picks the parameter value under which the observed data are most probable.
- Estimators are judged on unbiasedness, consistency, and efficiency (small variance).

## Method of moments

With $k$ unknown parameters, equate the first $k$ sample moments to the population moments:

$$
\frac1n\sum_{i=1}^nX_i^j=E_\theta[X^j],\qquad j=1,\dots,k.
$$

The solution is $\hat\theta$. It costs almost no calculus but wastes information and may leave the parameter space.

With both mean and variance unknown, for instance,

$$
\hat\mu=\bar X,\qquad \hat\sigma^2=\frac1n\sum(X_i-\bar X)^2,
$$

where the second uses $n$, so this variance estimator is biased.

## Maximum likelihood

The likelihood treats the data as a function of the parameter:

$$
L(\theta)=\prod_{i=1}^n f(x_i;\theta),\qquad \ell(\theta)=\ln L(\theta)=\sum_{i=1}^n\ln f(x_i;\theta).
$$

The logarithm turns a product into a sum, and $\ell'(\theta)=0$ locates the optimum. If $\ell$ is strictly concave the stationary point is the maximum. For discrete data replace densities by probability masses.

| Distribution | Parameters | Moments | Maximum likelihood |
| --- | --- | --- | --- |
| $N(\mu,\sigma^2)$ | $\mu,\sigma^2$ | $\bar X,\ \frac1n\sum(X_i-\bar X)^2$ | $\bar X,\ \frac1n\sum(X_i-\bar X)^2$ |
| $\mathrm{Exp}(\lambda)$ | $\lambda$ | $1/\bar X$ | $1/\bar X$ |
| $U(0,\theta)$ | $\theta$ | $2\bar X$ | $\max X_i$ |
| $\mathrm{Ber}(p)$ | $p$ | $\bar X$ | $\bar X$ |

The uniform row is the clearest split. Moments give $2\bar X$, which can fall below the observed maximum and thus be impossible; maximum likelihood gives $\max X_i$, always feasible but systematically small.

## Two worked examples

**Normal.** For the sample $2,4,4,6,9$, $\bar x=5$ and the centred sum of squares is $28$. Hence

$$
\hat\mu=5,\qquad \hat\sigma^2_{\mathrm{MLE}}=\frac{28}{5}=5.6,\qquad s^2=\frac{28}{4}=7.
$$

Maximum likelihood underestimates by about $20\%$ at $n=5$; the $n-1$ correction removes the bias.

**Exponential.** Observations $0.5,1,1.5$ give $\bar x=1$ and

$$
L(\lambda)=\lambda^3e^{-\lambda(0.5+1+1.5)}=\lambda^3e^{-3\lambda}.
$$

Setting $3/\lambda-3=0$ gives $\hat\lambda=1$, exactly $1/\bar x$. The second derivative $-3$ at $\lambda=1$ confirms a maximum.

> [!MYTH] Maximum likelihood estimators are unbiased.
> $\hat\sigma^2_{\mathrm{MLE}}$ and $\max X_i$ for $U(0,\theta)$ are both biased. Maximum likelihood promises consistency and asymptotic efficiency, not finite-sample unbiasedness.

> [!NOTE]
> Maximum likelihood is invariant: if $\hat\theta$ maximises the likelihood for $\theta$, then $g(\hat\theta)$ maximises it for $g(\theta)$. That is why $\hat\sigma=\sqrt{\hat\sigma^2}$ needs no fresh derivation.

## Three common misconceptions

> [!MYTH] The two methods always coincide.
> They coincide for the normal and exponential, but diverge for the uniform and for mixtures. Agreement is the exception, not the rule.

> [!MYTH] A larger likelihood means a better model.
> The likelihood is a function of parameters within one model. Likelihoods from different models or datasets are not comparable; use information criteria or likelihood ratio tests.

> [!MYTH] Moment estimation is rigorous only in name.
> It is consistent whenever the relevant moments exist; it is merely less efficient than maximum likelihood. Simple is not the same as wrong.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> A sample $1,2,3,4$ comes from a Poisson distribution with mean $\theta$. Find the maximum likelihood estimate.
>
> > [!ANSWER] Show answer
> > $\ell(\theta)=-4\theta+\ln\theta\sum x_i$ gives $\hat\theta=\bar x=2.5$.

> [!PRACTICE] 2 · Variation
> The sample $0.2,0.4,0.6$ comes from $U(0,\theta)$. Give both estimates.
>
> > [!ANSWER] Show answer
> > $\bar x=0.4$, so the moment estimate is $2\bar x=0.8$; the maximum likelihood estimate is $\max=0.6$. The former can fall below the data and become infeasible.

> [!PRACTICE] 3 · Transfer
> Show that $\hat\theta=\max X_i$ for $U(0,\theta)$ has expectation $\frac{n}{n+1}\theta$ and give the unbiased correction.
>
> > [!ANSWER] Show answer
> > The maximum has $F(t)=(t/\theta)^n$ and density $nt^{n-1}/\theta^n$, so $E=\int_0^\theta tn t^{n-1}/\theta^n\,dt=\frac{n}{n+1}\theta$. Multiply by $\frac{n+1}{n}$.

## Formal statement

For a family $\{f(\cdot;\theta):\theta\in\Theta\}$, the maximum likelihood estimator satisfies $L(\hat\theta)=\sup_{\theta\in\Theta}L(\theta)$. Under regularity (parameter-free support, three-times differentiable log-likelihood, finite positive Fisher information $I(\theta)$), it is consistent and asymptotically normal: $\sqrt n(\hat\theta-\theta)\Rightarrow N(0,I(\theta)^{-1})$, attaining the Cramér–Rao bound and hence asymptotic efficiency. A moment estimator defined by $\bar{g(X)}=E_\theta[g(X)]$ is consistent by the law of large numbers and asymptotically normal by the central limit theorem, though usually with larger variance than $I(\theta)^{-1}$.
