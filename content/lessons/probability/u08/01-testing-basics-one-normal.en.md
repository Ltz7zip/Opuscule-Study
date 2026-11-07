---
slug: "testing-basics-one-normal"
subject: "probability"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Hypothesis Testing and the One-Sample Normal Test"
subtitle: "Assume it holds, then measure how absurd the data look"
minutes: 16
meta: ["16 min read","Requires interval estimation","Mastery level"]
concepts: ["hypothesistest", "sampling", "distribution"]
prereq: ["estimation"]
related: ["hypothesistest", "regression"]
---

## What you will get

You will state a null and an alternative hypothesis, compute a test statistic and a p-value, and use the two error types to explain why "not rejected" is not "accepted".

Interval estimation asks where a parameter might lie. Testing asks whether one specific value is credible. Both rest on the same sampling distributions.

## Three lines back

- The null $H_0$ usually encodes "no difference"; the alternative $H_1$ is what we want to establish.
- The test statistic has a known distribution under $H_0$, and the p-value is the chance of a result at least as extreme.
- A type I error rejects a true $H_0$, and its probability is controlled by the level $\alpha$.

## The logic of a test

Assume $H_0$, then compute how probable the data are. If that probability is implausibly small, the assumption conflicts with the evidence and we reject.

This is proof by contradiction plus a small-probability principle: rare events should not happen in one experiment. Being probabilistic, the conclusion can only be "reject" or "do not reject", never "prove".

With $\sigma$ known, the normal mean test uses

$$
Z=\frac{\bar X-\mu_0}{\sigma/\sqrt n}\ \sim\ N(0,1)\quad\text{under }H_0.
$$

When $\sigma$ is unknown, replace it by $S$ and $Z$ by $T\sim t(n-1)$; everything else is unchanged.

| Alternative | Rejection region | p-value |
| --- | --- | --- |
| $\mu>\mu_0$ | $Z>z_\alpha$ | $1-\Phi(z)$ |
| $\mu<\mu_0$ | $Z<-z_\alpha$ | $\Phi(z)$ |
| $\mu\ne\mu_0$ | $\lvert Z\rvert>z_{\alpha/2}$ | $2(1-\Phi(\lvert z\rvert))$ |

## Two kinds of error

| Truth | Do not reject $H_0$ | Reject $H_0$ |
| --- | --- | --- |
| $H_0$ true | correct, $1-\alpha$ | type I error, $\alpha$ |
| $H_0$ false | type II error, $\beta$ | correct, $1-\beta$ |

$\alpha$ is chosen by the analyst; $\beta$ depends on how far the true parameter lies from $\mu_0$ and on the sample size. With $\alpha$ fixed, the only way to reduce $\beta$ is more data. Power $1-\beta$ is the ability to detect a real difference.

The decision rule is $p\le\alpha\Rightarrow$ reject. A p-value is not the probability that $H_0$ is true; it is the probability, computed under $H_0$, of a result at least as extreme as the one observed.

## A worked example

A filling machine claims $\mu_0=10$ ml with known $\sigma=2$. A sample of $n=16$ bottles gives $\bar x=10.8$. Two-sided test at $\alpha=0.05$:

$$
z=\frac{10.8-10}{2/4}=\frac{0.8}{0.5}=1.6.
$$

Since $|1.6|<1.96$ we do not reject. The p-value is $2(1-\Phi(1.6))=0.1096>0.05$, consistent.

Now raise the sample to $n=64$: the standard error halves to $0.25$, so $z=3.2$ and $p=0.0014$ — reject. **The same deviation becomes significant with more data**, which is exactly why "significant" and "important" must be separated.

> [!MYTH] Not rejecting $H_0$ means $H_0$ is true.
> It means the data did not provide enough evidence against it. With a small sample or large noise, a real difference can hide.

> [!NOTE]
> A confidence interval and a two-sided test are two views of one calculation: a $1-\alpha$ interval excludes $\mu_0$ exactly when the test rejects at $\alpha$. Reporting the interval conveys more than a p-value alone.

## Three common misconceptions

> [!MYTH] A smaller p-value means a larger effect.
> The p-value mixes effect size with sample size. Huge samples make tiny differences highly significant, so report effect sizes too.

> [!MYTH] You may pick the significance level after seeing the data.
> Doing so inflates the type I error rate. Fix $\alpha$ before looking.

> [!MYTH] One-sided tests are always better because they are easier to pass.
> The price is blindness to departures in the other direction. The direction must come from theory before the data arrive.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Repeat the example as a one-sided test $H_1:\mu>10$ at $\alpha=0.05$.
>
> > [!ANSWER] Show answer
> > $z=1.6>z_{0.05}=1.645$, so reject. The p-value is $1-\Phi(1.6)=0.0548$, just below $0.05$.

> [!PRACTICE] 2 · Variation
> With $\sigma$ unknown, $n=16$, $s=2.4$ and $\bar x=10.8$, run the two-sided test.
>
> > [!ANSWER] Show answer
> > $t=0.8/(2.4/4)=1.333$ against $t_{0.025}(15)=2.131$, so do not reject; $p\approx0.20$.

> [!PRACTICE] 3 · Transfer
> If the true mean is $10.5$ with $\sigma=2$, $n=16$ and $\alpha=0.05$ two-sided, find the power.
>
> > [!ANSWER] Show answer
> > Rejection needs $|z|\ge1.96$. Under the truth the statistic is $N(1,1)$, so power $=\Phi(-0.96)+1-\Phi(2.96)\approx0.168$.

## Formal statement

Let $X_1,\dots,X_n$ be i.i.d. $N(\mu,\sigma^2)$ with $\sigma$ known. For $H_0:\mu=\mu_0$ versus $H_1:\mu\ne\mu_0$, the level-$\alpha$ test rejects exactly when $|Z|>z_{\alpha/2}$, where $Z=\sqrt n(\bar X-\mu_0)/\sigma$. The p-value is $p(x)=\sup_{\theta\in\Theta_0}P_\theta(T(X)\ge T(x))$, with absolute values in the two-sided case. By the Neyman–Pearson lemma, the likelihood ratio test is most powerful for simple versus simple hypotheses, and the normal mean test is uniformly most powerful against one-sided alternatives. The trade-off between error types is summarised by the power function $\pi(\mu)=P_\mu(\text{reject})$, and the required sample size is $n\approx(z_{\alpha/2}+z_\beta)^2\sigma^2/\delta^2$ for a smallest detectable difference $\delta$.
