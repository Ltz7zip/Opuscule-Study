---
slug: "continuous-and-transformations"
subject: "probability"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Continuous Random Variables and Functions of a Random Variable"
subtitle: "A density is not a probability; the integral is"
minutes: 16
meta: ["16 min read","Requires distribution functions and integration","Mastery level"]
concepts: ["randvar", "distribution", "calc"]
prereq: ["distribution"]
related: ["jointdist", "expectation"]
---

## What you will get

You will turn a density into a distribution function and an interval probability, derive the density of $Y=g(X)$, and explain why a density may exceed one.

Every continuous calculation reduces to one integral, but the integrand and the limits must both be right.

## Three lines back

- A density satisfies $f(x)\ge0$ and $\int_{-\infty}^{+\infty}f(x)\,dx=1$; it is not itself a probability.
- $F(x)=\int_{-\infty}^{x}f(t)\,dt$, and $F'(x)=f(x)$ wherever $f$ is continuous.
- To find the density of $Y=g(X)$, first write $F_Y(y)=P(g(X)\le y)$, then differentiate.

## Densities and distribution functions

For a continuous variable the distribution function is an integral:

$$
F(x)=\int_{-\infty}^{x}f(t)\,dt
$$

Hence $P(a<X<b)=F(b)-F(a)=\int_a^b f(t)\,dt$. For continuous variables single points have probability zero, so open and closed intervals are interchangeable — the opposite of the discrete case.

A density is probability per unit length, with units of probability divided by the units of $x$. That is why it can exceed one. Take $f(x)=2x$ on $(0,1)$: $f(1)=2$, yet $\int_0^1 2x\,dx=1$, which is perfectly valid.

| Distribution | Density | Mean | Variance |
| --- | --- | --- | --- |
| Uniform $U(a,b)$ | $\frac{1}{b-a}$, $a<x<b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential $E(\lambda)$ | $\lambda e^{-\lambda x}$, $x>0$ | $\frac1\lambda$ | $\frac1{\lambda^2}$ |
| Normal $N(\mu,\sigma^2)$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ |

The normal density has no elementary antiderivative, so its probabilities come from tables or from a function such as `pnorm`. This is why the later sampling distributions lean heavily on numerical tables.

## Functions of a random variable

Let $Y=g(X)$ with $g$ monotone and differentiable, and let $h$ be its inverse. Then

$$
f_Y(y)=f_X(h(y))\,|h'(y)|
$$

The absolute value keeps the density non-negative. If $g$ is not monotone, split the event $Y\le y$ into the corresponding $X$ intervals and integrate each piece.

## A worked example

Let $X$ have density $f_X(x)=2x$ on $(0,1)$, so $F_X(x)=x^2$. Then

$$
P(0.3<X<0.7)=F(0.7)-F(0.3)=0.49-0.09=0.4
$$

Now set $Y=X^2$. For $0<y<1$, $F_Y(y)=P(X^2\le y)=P(X\le\sqrt y)=y$, so differentiating gives $f_Y(y)=1$: the variable $Y$ is uniform on $(0,1)$.

The transformation formula agrees. With $h(y)=\sqrt y$ and $h'(y)=1/(2\sqrt y)$,

$$
f_Y(y)=2\sqrt y\cdot\frac{1}{2\sqrt y}=1
$$

Both routes give the same answer. The new variable is simpler than the old one, which is the point of transforming: a skewed density can be flattened.

> [!MYTH] The value of the density at a point is the probability of that value.
> Every single point has probability zero in the continuous case. The density measures how much probability sits near the point per unit length.

> [!NOTE]
> The factor $|h'(y)|$ cannot be dropped. Without the absolute value a decreasing $g$ produces a negative density; without the factor entirely, probability is stretched or squeezed incorrectly.

## Three common misconceptions

> [!MYTH] A density must be at most one.
> Only probabilities are capped at one. A density is probability per unit length, and $f(x)=2x$ reaches 2 at $x=1$ while still integrating to 1.

> [!MYTH] The probability of an interval equals the density times the interval's length.
> That holds only for the uniform distribution. In general $P(a<X<b)=\int_a^b f$.

> [!MYTH] Wherever the distribution function is differentiable, the derivative is the density.
> This holds at continuity points of $f$. At jumps or discontinuities of the density, $F$ may fail to be differentiable and must be handled piecewise.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Let $X\sim U(2,6)$. Find $P(3<X<5)$ and $P(X>4.5)$.
>
> > [!ANSWER] Show answer
> > The density is $1/4$. Thus $P(3<X<5)=2/4=0.5$, and $P(X>4.5)=(6-4.5)/4=0.375$.

> [!PRACTICE] 2 · Variation
> Let $X\sim E(2)$. Find $P(X>1)$ and $P(0.5<X<1)$.
>
> > [!ANSWER] Show answer
> > $P(X>1)=e^{-2}\approx0.1353$, and $P(0.5<X<1)=e^{-1}-e^{-2}\approx0.2326$.

> [!PRACTICE] 3 · Transfer
> Let $X\sim U(0,1)$ and $Y=-2\ln X$. Find the density of $Y$.
>
> > [!ANSWER] Show answer
> > $F_Y(y)=P(X\ge e^{-y/2})=1-e^{-y/2}$ for $y>0$, whose derivative is $\tfrac12e^{-y/2}$. So $Y\sim E(1/2)$.

## Formal statement

If a non-negative integrable $f$ satisfies $F(x)=\int_{-\infty}^{x}f(t)\,dt$ for all $x$, then $X$ is a continuous random variable and $f$ is its probability density. The density is unique up to changes on sets of measure zero and need not be bounded. If $g$ is strictly monotone and continuously differentiable on the support of $X$ with inverse $h$, the density of $Y=g(X)$ is $f_X(h(y))|h'(y)|$. When $g$ is piecewise monotone, apply the formula on each monotone piece and add the results.
