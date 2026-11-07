---
slug: "central-limit-theorem"
subject: "probability"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "The Central Limit Theorem"
subtitle: "Why sums of many small independent effects look normal"
minutes: 17
meta: ["17 min read","Requires the law of large numbers","Mastery level"]
concepts: ["clt", "distribution", "sampling"]
prereq: ["clt"]
related: ["sampling", "estimation"]
---

## What you will get

You will standardise a sample mean and treat it as standard normal, and you will approximate binomial probabilities to three decimals with a continuity correction.

The law of large numbers says the sample mean converges. The central limit theorem says how large the remaining error is and what shape it has.

## Three lines back

- $\bar X_n$ has mean $\mu$ and standard deviation $\sigma/\sqrt n$, whatever the population shape.
- The standardised $Z_n=(\bar X_n-\mu)/(\sigma/\sqrt n)$ has distribution function converging pointwise to $\Phi$.
- A binomial count with $np$ and $n(1-p)$ both moderate is well approximated by a normal, with a continuity correction when needed.

## Modes of convergence and the statement

"Converges" has several meanings in probability, and mixing them causes errors:

| Name | Notation | Meaning |
| --- | --- | --- |
| Convergence in distribution | $X_n\Rightarrow X$ | distribution functions converge at continuity points |
| Convergence in probability | $X_n\xrightarrow{P}X$ | $P(\lvert X_n-X\rvert>\varepsilon)\to0$ |
| Almost sure convergence | $X_n\to X$ a.s. | pointwise except on a null set |

The central limit theorem gives the weakest of the three: convergence in distribution. It does not promise that a particular sum lands near anything, only that the aggregate shape becomes bell-shaped.

Let $X_1,X_2,\dots$ be i.i.d. with $E[X_i]=\mu$ and $\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$. Then

$$
\frac{\sqrt n(\bar X_n-\mu)}{\sigma}=\frac{\sum_{i=1}^nX_i-n\mu}{\sigma\sqrt n}\Rightarrow N(0,1).
$$

Equivalently, for large $n$, $\bar X_n$ is approximately $N(\mu,\sigma^2/n)$, and the error shrinks like $1/\sqrt n$.

## Normal approximation to the binomial

Writing $X\sim\mathrm{Bin}(n,p)$ as a sum of $n$ Bernoulli variables gives $E[X]=np$ and $\operatorname{Var}(X)=np(1-p)$, hence

$$
P(a\le X\le b)\approx\Phi\!\left(\frac{b-np}{\sqrt{np(1-p)}}\right)-\Phi\!\left(\frac{a-np}{\sqrt{np(1-p)}}\right).
$$

## A worked example

Take $X\sim\mathrm{Bin}(1000,0.4)$ and ask for $P(380\le X\le420)$. The mean is $400$ and the standard deviation is $\sqrt{240}=15.49$.

$$
z_1=\frac{380-400}{15.49}=-1.29,\qquad z_2=\frac{420-400}{15.49}=1.29
$$

$$
P\approx\Phi(1.29)-\Phi(-1.29)=0.9015-0.0985=0.803
$$

With the continuity correction the limits become $379.5$ and $420.5$, giving $z=\pm1.3233$ and about $0.814$. The correction matters little at this sample size and a great deal for small $n$.

In the other direction, requiring $P(|\bar X_n-0.4|\le0.01)\ge0.95$ needs $1.96\sqrt{0.24/n}\le0.01$, that is, $n\ge9219$ — the concrete face of "quadruple the sample to halve the error".

> [!MYTH] The central limit theorem needs normal data.
> It holds for any distribution with finite variance. Heavier skew simply demands a larger $n$.

> [!NOTE]
> A common rule of thumb is $np\ge5$ and $n(1-p)\ge5$. When $p$ is near 0 or 1 the normal approximation distorts badly; use a Poisson approximation or exact computation instead.

## Three common misconceptions

> [!MYTH] The CLT says the data become normal.
> What becomes normal is the sampling distribution of the mean. The raw data keep their original skew and shape.

> [!MYTH] Any statistic is normal for large samples.
> The theorem covers standardised sums or means. Medians and extremes need their own limit theory; extremes converge to extreme-value laws, not the normal.

> [!MYTH] A negative or above-one approximate probability proves the theorem wrong.
> It proves the sample is too small. Check $np$ and $n(1-p)$, and fall back on the exact distribution.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> For $X\sim\mathrm{Bin}(100,0.5)$, approximate $P(45\le X\le55)$.
>
> > [!ANSWER] Show answer
> > $\mu=50$ and $\sigma=5$, so $z=\pm1$ and the probability is about $0.6827$. The exact value is $0.7287$; the approximation is low at $n=100$.

> [!PRACTICE] 2 · Variation
> Redo the previous exercise with a continuity correction.
>
> > [!ANSWER] Show answer
> > Use the limits $44.5$ and $55.5$, giving $z=\pm1.1$ and about $0.7287$, which matches the exact value closely.

> [!PRACTICE] 3 · Transfer
> A process has defect rate $0.02$. In 1000 items, approximate the chance of more than 25 defects.
>
> > [!ANSWER] Show answer
> > $\mu=20$ and $\sigma=\sqrt{19.6}=4.43$, so $z=(25.5-20)/4.43=1.24$ and the probability is about $0.107$. A Poisson approximation with $\lambda=20$ agrees closely.

## Formal statement

Let $X_1,X_2,\dots$ be i.i.d. with $E[X_i]=\mu$ and $0<\sigma^2<\infty$, and set $Z_n=\sqrt n(\bar X_n-\mu)/\sigma$. Then $P(Z_n\le x)\to\Phi(x)$ for every $x$, i.e. $Z_n\Rightarrow N(0,1)$. The characteristic-function proof uses $\varphi_{Z_n}(t)=[\varphi(t/(\sigma\sqrt n))]^n\to e^{-t^2/2}$. The Berry–Esseen theorem quantifies the error: $|P(Z_n\le x)-\Phi(x)|\le C\rho/(\sigma^3\sqrt n)$ with $\rho=E|X_1-\mu|^3$. When $\sigma^2=\infty$ the conclusion can fail, and the limit belongs to the stable laws of the generalised central limit theorem.
