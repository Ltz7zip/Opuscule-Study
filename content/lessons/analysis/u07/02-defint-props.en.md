---
slug: "defint-props"
subject: "analysis"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Properties of the Definite Integral"
subtitle: "Split the interval, or squeeze it from both sides"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["defint"]
prereq: ["defint"]
related: ["defint", "indefint"]
---

## Goals

By the end of this lecture you can use linearity, additivity over intervals, and order preservation fluently, bound an integral whose antiderivative has no elementary form, and apply the mean value theorem for integrals correctly.

There are not many properties, but each has precise hypotheses. The skill is to separate two situations: when an antiderivative is available use Newton-Leibniz; when it is not, squeeze with inequalities.

## Three-line recap

- The definite integral is the common limit of upper and lower Darboux sums, so linear combinations and interval splits preserve integrability.
- Integration turns pointwise comparison into global comparison, which yields order preservation and absolute value bounds.
- A continuous function takes every value between its minimum and maximum, which yields the mean value theorem for integrals.

## Linearity and additivity

If $f,g$ are integrable on $[a,b]$, then for any constants $\alpha,\beta$,

$$\int_a^b\bigl(\alpha f+\beta g\bigr)=\alpha\int_a^b f+\beta\int_a^b g .$$

For any $c\in[a,b]$,

$$\int_a^b f=\int_a^c f+\int_c^b f .$$

Reversal and zero length are settled by convention: $\int_a^a f=0$ and $\int_a^b f=-\int_b^a f$. With these two conventions, additivity holds for $a,b,c$ in any order, and there is no need to discuss which lies between the others.

> [!NOTE]
> Additivity requires $f$ to be integrable on each subinterval involved. If $f$ is unbounded near $c$, the property cannot be applied directly.

## Order, absolute values, and estimates

If $f\le g$ on $[a,b]$, then $\int_a^b f\le\int_a^b g$. Two standard consequences:

$$\left|\int_a^b f\right|\le\int_a^b|f|,\qquad m(b-a)\le\int_a^b f\le M(b-a),$$

where $m,M$ are the infimum and supremum of $f$ on $[a,b]$. The second is especially useful when no antiderivative is known.

**Example**: estimate $\int_0^1\dfrac{dx}{1+x}$. On $[0,1]$, $\dfrac12\le\dfrac{1}{1+x}\le1$, so

$$\frac12\le\int_0^1\frac{dx}{1+x}\le1 .$$

The true value is $\ln2\approx0.693$, roughly mid-range. For a tighter bound, split $[0,1]$ into two pieces and estimate each, or choose division points using monotonicity.

**Example**: $\int_0^1 e^{-x^2}dx$. The integrand decreases from $1$ to $e^{-1}\approx0.368$ on $[0,1]$, so

$$0.368<\int_0^1e^{-x^2}dx<1 .$$

This integral has no elementary antiderivative; a squeeze is the only immediate information available.

## The mean value theorem for integrals

If $f$ is continuous on $[a,b]$, then some $\xi\in[a,b]$ satisfies

$$\int_a^b f=f(\xi)(b-a).$$

The proof uses only the extreme value theorem and the intermediate value theorem: with minimum $m$ and maximum $M$, $m\le\dfrac{1}{b-a}\int_a^b f\le M$, and a continuous function attains every intermediate value.

A hand computation: for $f(x)=x^2$ on $[0,3]$, $\int_0^3x^2dx=9$, so $9=3\xi^2$ and $\xi=\sqrt3\approx1.732\in[0,3]$.

Geometrically, the curved trapezoid has the same area as some rectangle on the same base, whose height is the value of $f$ at $\xi$.

## Three misconceptions

> [!MYTH] The integral of a product equals the product of the integrals.
> False. On $[0,1]$ take $f=g=x$: the left side is $\int_0^1x^2dx=\frac13$, the right side is $\left(\frac12\right)^2=\frac14$. Products need integration by parts.

> [!MYTH] If $\int_a^b f\ge0$, then $f\ge0$.
> An integral reflects the total, not the local behaviour. $\int_0^1(2x-1)dx=0$ although $f<0$ on $[0,\frac12)$. Only extra hypotheses such as continuity plus not identically zero give a strict conclusion.

> [!MYTH] The mean value theorem for integrals holds for every integrable function.
> Continuity is needed. Let $f(x)=0$ on $[0,\frac12]$ and $f(x)=1$ on $(\frac12,1]$. The integral is $\frac12$, but $f$ only takes the values $0$ and $1$, so no $\xi$ satisfies $f(\xi)=\frac12$.

## Practice

> [!PRACTICE] 1 · Linearity
> Compute $\int_0^1(3x^2+2x)\,dx$.
>
> > [!ANSWER] Show answer
> > $3\cdot\frac13+2\cdot\frac12=1+1=2$.

> [!PRACTICE] 2 · Estimate a logarithm
> Show that $\frac12\le\int_1^2\dfrac{dx}{x}\le1$.
>
> > [!ANSWER] Show answer
> > On $[1,2]$, $\frac12\le\frac1x\le1$, so by order preservation the integral lies between $\frac12\cdot1$ and $1\cdot1$. The true value is $\ln2\approx0.693$.

> [!PRACTICE] 3 · Bound by the maximum
> Show that $\int_0^1x(1-x)\,dx\le\frac14$.
>
> > [!ANSWER] Show answer
> > On $[0,1]$, $x(1-x)\le\frac14$ because $\frac14-x(1-x)=\left(x-\frac12\right)^2\ge0$. Hence the integral is at most $\frac14\cdot1$. The exact value is $\frac16$.

> [!PRACTICE] 4 · Find the mean point
> Find $\xi$ from the mean value theorem for $f(x)=x^2$ on $[0,3]$.
>
> > [!ANSWER] Show answer
> > $\int_0^3x^2dx=9=3\xi^2$, so $\xi=\sqrt3\approx1.732\in[0,3]$.

> [!FORMAL] Formal statement
> If $f,g$ are Riemann integrable on $[a,b]$, then so are $\alpha f+\beta g$ and $|f|$, with the linearity and absolute value inequalities above. For any $c\in[a,b]$, $\int_a^b f=\int_a^c f+\int_c^b f$. If $m\le f\le M$ on $[a,b]$, then $m(b-a)\le\int_a^b f\le M(b-a)$. If in addition $f$ is continuous, there is $\xi\in[a,b]$ with $\int_a^b f=f(\xi)(b-a)$; the value $\frac{1}{b-a}\int_a^b f$ is called the mean value of $f$ on $[a,b]$.
