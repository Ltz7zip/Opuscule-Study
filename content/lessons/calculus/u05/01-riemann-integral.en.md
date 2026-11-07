---
slug: "riemann-integral"
subject: "calculus"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lesson 1 · Calculus · Mastery mode"
title: "The Definite Integral: Definition and Properties"
subtitle: "Split, approximate, sum, take the limit"
minutes: 31
meta: ["31 min read","Requires limits and indefinite integrals","Mastery level"]
concepts: ["defint", "areavol"]
prereq: ["indefint"]
related: ["areavol", "impropint", "lineint"]
---

## Learning goals

The previous lesson defined the indefinite integral as "the inverse of differentiation", but the symbol $\int f(x)\,dx$ was then just a family of antiderivatives. This lesson lays the foundation: **the definite integral is defined as a limit of Riemann sums**, so that it first becomes an independent object with a definite numerical value, and only afterwards do we relate it to antiderivatives.

The order cannot be reversed. If you start by reading the definite integral as "the antiderivative evaluated at the two endpoints", then for integrands with no elementary antiderivative (such as $e^{-x^{2}}$) the number has no meaning; with the limit definition it is still a definite real number. The Newton–Leibniz formula is a computational tool; the definition is the source of identity.

By the end of this lesson you should be able to:

- explain the separate roles of the two freedoms in a Riemann sum, the partition and the sample points;
- compute $\displaystyle\int_0^1 x^{2}\,dx$ from the definition, writing out both the summation and the limit;
- decide whether a function is integrable on a closed interval, with justification;
- estimate an integral using only properties, without finding an antiderivative.

## Three-line recap

- A definite integral is a number, independent of the letter used for the variable: $\int_a^b f(x)\,dx$ and $\int_a^b f(t)\,dt$ are the same number.
- It is built by cutting the interval up, approximating with rectangles, and letting the largest step tend to zero.
- Integrability does not require continuity; bounded with finitely many discontinuities is enough.

## From curved trapezoids to Riemann sums

The original problem is the area of the region bounded by $y=f(x)$, the lines $x=a$, $x=b$ and the $x$-axis. Rectangles we can do; curved trapezoids we cannot. The method is to fill with rectangles. Three steps turn "the finer the better" into a definition.

**Partition.** Insert points

$$
a=x_{0}<x_{1}<\cdots<x_{n}=b
$$

and write $\Delta x_{i}=x_{i}-x_{i-1}$ for the length of the $i$-th piece.

**Sample and sum.** Pick any $\xi_{i}\in[x_{i-1},x_{i}]$ and replace that thin strip by a rectangle of height $f(\xi_{i})$ and width $\Delta x_{i}$:

$$
S=\sum_{i=1}^{n}f(\xi_{i})\,\Delta x_{i}
$$

**Take the limit.** Let $\lambda=\max_{1\le i\le n}\Delta x_{i}$ be the largest step. If, as $\lambda\to0$, the Riemann sums tend to a number $I$ independent of the partition and of the sample points, define

$$
\int_a^b f(x)\,dx=I
$$

Two points must be seen clearly. First, the limit is $\lambda\to0$, not $n\to\infty$: more pieces does not mean shorter pieces — you can pile $n-1$ points near the left end and leave the last piece almost the whole interval. Only $\lambda\to0$ forces every piece to be short; for equal parts $\lambda=\dfrac{b-a}{n}$ and the two statements agree.

Second, "independent of the sample points" is not idle caution. The Dirichlet function shows the danger is real: let $D(x)=1$ for rational $x$ and $D(x)=0$ for irrational $x$. Every piece of $[0,1]$ contains both kinds of point. Choosing rational points makes every Riemann sum equal to $1$; choosing irrational points makes it $0$, and refining does not help. Hence $D$ is not integrable on $[0,1]$ — not because we cannot compute the limit, but because the limit does not exist.

## Computing from the definition: two full examples

### Example 1: equal parts, right endpoints

Compute $\displaystyle\int_0^1 x^{2}\,dx$. Take $n$ equal parts, $\Delta x=\dfrac1n$, $x_{i}=\dfrac{i}{n}$, $\xi_{i}=\dfrac{i}{n}$. Then

$$
S_{n}=\sum_{i=1}^{n}\left(\frac{i}{n}\right)^{2}\frac{1}{n}
=\frac{1}{n^{3}}\sum_{i=1}^{n}i^{2}
=\frac{1}{n^{3}}\cdot\frac{n(n+1)(2n+1)}{6}
=\frac{1}{6}\left(2+\frac{3}{n}+\frac{1}{n^{2}}\right)
$$

The last two terms vanish, so $S_{n}\to\dfrac{2}{6}=\dfrac13$, that is,

$$
\int_0^1 x^{2}\,dx=\frac13
$$

This agrees with Newton–Leibniz, $\left.\dfrac{x^{3}}{3}\right|_0^1=\dfrac13$, but only summation formulas and limits were used here.

### Example 2: a different partition

Compute $\displaystyle\int_1^2\frac{1}{x}\,dx$, this time with a geometric partition. Take $q=2^{1/n}$ and $x_{i}=q^{i}$ for $i=0,1,\ldots,n$, so $x_{0}=1$ and $x_{n}=2$. The $i$-th piece has length $\Delta x_{i}=q^{i-1}(q-1)$; taking the left endpoint $\xi_{i}=q^{i-1}$ makes every term the same constant:

$$
f(\xi_{i})\,\Delta x_{i}=\frac{1}{q^{i-1}}\cdot q^{i-1}(q-1)=q-1
$$

Hence $S_{n}=n\left(2^{1/n}-1\right)$. Put $t=\dfrac{\ln 2}{n}\to0$, so $2^{1/n}=e^{t}$ and

$$
n\left(2^{1/n}-1\right)=\ln 2\cdot\frac{e^{t}-1}{t}\to\ln 2
$$

Since $\dfrac1x$ is continuous on $[1,2]$, integrability is guaranteed and every partition gives the same limit:

$$
\int_1^2\frac{1}{x}\,dx=\ln 2
$$

"Any partition" is not a burden but a freedom: choose the right one and the hardest sum becomes a constant.

### The boundary case: why $\dfrac1x$ has no ordinary integral on $(0,1]$

Move the interval to $(0,1]$. The integrand is unbounded near $0$. As soon as the first piece starts at $0$, $f(\xi_{1})=\dfrac{1}{\xi_{1}}$ can be arbitrarily large; the Riemann sums have no upper bound, so no ordinary Riemann integral exists.

The wording matters: not "equals infinity", but "not defined in the Riemann sense". The improper-integrals lesson redefines it as $\displaystyle\lim_{\varepsilon\to0^{+}}\int_{\varepsilon}^{1}\frac{dx}{x}$.

## Sufficient conditions for integrability

The definition quantifies over all partitions and all sample points, so checking it directly is hopeless. Two sufficient conditions remove most of the work.

**Continuous functions are integrable.** Control the oscillation. A continuous $f$ on a closed interval is uniformly continuous: given $\varepsilon>0$ there is $\delta>0$ such that $\lambda<\delta$ forces every oscillation $\omega_{i}=\sup f-\inf f$ on a piece to be less than $\dfrac{\varepsilon}{b-a}$. Two sample choices on the same piece differ by at most $\omega_{i}\Delta x_{i}$, and the total is at most

$$
\sum_{i=1}^{n}\omega_{i}\Delta x_{i}<\frac{\varepsilon}{b-a}\sum_{i=1}^{n}\Delta x_{i}=\varepsilon
$$

So once the partition is fine enough, all Riemann sums are squeezed into a range of width less than $\varepsilon$, and the limit exists and is unique. Uniform continuity is the key: $\delta$ depends on $\varepsilon$ only, not on position.

**Bounded with finitely many discontinuities is integrable.** Cut the interval at each discontinuity. On the finitely many remaining subintervals the function can be altered into a continuous one, the total length altered is arbitrarily small, and so is its effect on the Riemann sums. A jump itself is harmless: a vertical line has no width and contributes no area.

| Function | Integrable? | Reason |
| --- | --- | --- |
| $f$ continuous on $[a,b]$ | yes | uniform continuity bounds oscillation |
| $f$ bounded, finitely many jumps | yes | cut, then handle each piece |
| $f$ monotone and bounded | yes | total oscillation bounded by endpoint values |
| Dirichlet function | no | sums equal $1$ or $0$ depending on samples |
| $\dfrac1x$ on $(0,1]$ | no ordinary integral | unbounded, violates the hypothesis |

## Properties: computing without an antiderivative

| Property | Statement | Typical use |
| --- | --- | --- |
| Linearity | $\displaystyle\int_a^b(\alpha f+\beta g)=\alpha\int_a^b f+\beta\int_a^b g$ | split a complicated integrand |
| Additivity | $\displaystyle\int_a^b=\int_a^c+\int_c^b$ | piecewise and absolute-value functions |
| Sign | $f\ge0\Rightarrow\displaystyle\int_a^b f\ge0$ | compare two integrals |
| Estimate | $m(b-a)\le\displaystyle\int_a^b f\le M(b-a)$ | bound without evaluating |
| Mean value | $\displaystyle\int_a^b f=f(\xi)(b-a)$ | replace the integral by one value |

Linearity comes straight from the Riemann sums: split each sum term by term, then take limits. Additivity comes from the freedom of partitions: insert $c$ into a partition and the sum splits into two. With the conventions $\displaystyle\int_b^a f=-\int_a^b f$ and $\displaystyle\int_a^a f=0$, it holds for any ordering of the three points.

The sign property says the integral of a non-negative function is non-negative. Its most useful form is comparison: if $f\le g$ then $\displaystyle\int_a^b f\le\int_a^b g$. The estimate inequality follows: with $m,M$ the minimum and maximum, $m(b-a)\le\int_a^b f\le M(b-a)$. Crude as it looks, it is often the only quantitative statement available.

## Estimation and the mean value theorem: two full examples

### Example 3: estimation

Estimate $\displaystyle\int_0^1 e^{-x^{2}}\,dx$. The integrand decreases on $[0,1]$, with minimum $e^{-1}\approx0.368$ and maximum $1$, so

$$
0.368\le\int_0^1 e^{-x^{2}}\,dx\le1
$$

The true value is about $0.747$, in the middle of the range. To tighten the upper bound, split: on $\left[\dfrac12,1\right]$, $e^{-x^{2}}\le e^{-1/4}\approx0.779$, hence $\displaystyle\int_0^1 e^{-x^{2}}dx\le\frac12\cdot1+\frac12\cdot0.779=0.890$.

### Example 4: the mean value theorem

Let $f$ be continuous on $[a,b]$. Prove that some $\xi\in[a,b]$ satisfies $\displaystyle\int_a^b f=f(\xi)(b-a)$.

First, by the estimate inequality,

$$
m\le\frac{1}{b-a}\int_a^b f(x)\,dx\le M
$$

The middle quantity is the average value of $f$, between the minimum and the maximum. Second, a continuous function on a closed interval takes every value between $m$ and $M$ by the intermediate value theorem, so some $\xi$ has $f(\xi)$ equal to that average; multiply by $b-a$.

Continuity cannot be dropped: with a jump, the average may lie strictly between the two levels and never be attained. Take $f$ equal to $0$ on half of $[0,1]$ and $2$ on the other half; the average is $1$, and $f$ never equals $1$.

## Symmetry: the easiest tool to forget

If $f$ is odd and the interval is symmetric about the origin, then $\displaystyle\int_{-a}^{a}f=0$: pair each small piece of $[-a,0]$ with its mirror image in $[0,a]$; the values are opposite and cancel. If $f$ is even, $\displaystyle\int_{-a}^{a}f=2\int_0^{a}f$. Hence

$$
\int_{-1}^{1}x^{3}\,dx=0,\qquad \int_{-1}^{1}x^{2}\,dx=2\int_0^1 x^{2}\,dx=\frac23
$$

The classic misuse: $\displaystyle\int_0^{2\pi}\sin x\,dx=0$ because positive and negative areas cancel, not because of oddness.

## Four common misconceptions

> [!MYTH] The definite integral is an area.
> Area is non-negative; a definite integral can be negative. $\displaystyle\int_0^{\pi}\sin x\,dx=2$ while $\displaystyle\int_{\pi}^{2\pi}\sin x\,dx=-2$. "Geometric area" requires absolute values; "definite integral" keeps the sign.

> [!MYTH] Renaming the variable changes the value.
> $\displaystyle\int_0^1 x^{2}\,dx$ and $\displaystyle\int_0^1 t^{2}\,dt$ are the same number. Distinguish renaming from substitution: renaming changes nothing, substitution changes the limits and the differential together.

> [!MYTH] A discontinuous function cannot be integrable.
> Bounded with finitely many jumps is enough. The function $f(x)=0$ for $x\ne0$, $f(0)=1$, has integral $0$ on $[0,1]$. What breaks integrability is unboundedness, or too many bad points.

> [!MYTH] Enough pieces guarantee convergence of the sums.
> Many pieces does not mean small largest step. The definition controls $\lambda$, not $n$; they agree only for equal parts.

## Practice

> [!PRACTICE] 1 · From the definition
> Compute $\displaystyle\int_0^1 x\,dx$ from the definition, using $n$ equal parts and right endpoints.
>
> > [!ANSWER] Show answer
> > With $\Delta x=\dfrac1n$ and $\xi_{i}=\dfrac{i}{n}$, the sum is $\displaystyle\sum_{i=1}^{n}\frac{i}{n}\cdot\frac1n=\frac{n(n+1)}{2n^{2}}=\frac12\left(1+\frac1n\right)\to\frac12$.

> [!PRACTICE] 2 · Using symmetry
> Evaluate $\displaystyle\int_{-1}^{1}\left(x^{3}+x\right)dx$.
>
> > [!ANSWER] Show answer
> > Both terms are odd and the interval is symmetric about the origin, so each integral is $0$ and the total is $0$.

> [!PRACTICE] 3 · Estimation
> Bound $\displaystyle\int_0^1 e^{-x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > The integrand decreases on $[0,1]$ from $1$ to $e^{-1}\approx0.368$, so the integral lies between $0.368$ and $1$.

> [!PRACTICE] 4 · Piecewise integrals
> Let $f(x)=x$ for $0\le x\le1$ and $f(x)=2-x$ for $1<x\le2$. Find $\displaystyle\int_0^2 f(x)\,dx$.
>
> > [!ANSWER] Show answer
> > By additivity, $\displaystyle\int_0^2 f=\int_0^1 x\,dx+\int_1^2(2-x)\,dx=\frac12+\frac12=1$.

> [!PRACTICE] 5 · Comparing integrals
> Without evaluating, compare $\displaystyle\int_0^1 e^{-x}dx$ and $\displaystyle\int_0^1 e^{-x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > On $[0,1]$, $x^{2}\le x$ so $e^{-x^{2}}\ge e^{-x}$. By the sign property, $\displaystyle\int_0^1 e^{-x^{2}}dx\ge\int_0^1 e^{-x}dx=1-e^{-1}\approx0.632$.

> [!PRACTICE] 6 · Mean value theorem
> Let $f$ be continuous on $[0,2]$ with $\displaystyle\int_0^2 f=6$. Find the average value of $f$ and show some $\xi$ attains it.
>
> > [!ANSWER] Show answer
> > The average is $\dfrac{6}{2}=3$, and by the mean value theorem there is $\xi\in[0,2]$ with $f(\xi)=3$.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be bounded on $[a,b]$. For any partition $a=x_{0}<x_{1}<\cdots<x_{n}=b$ and any choice $\xi_{i}\in[x_{i-1},x_{i}]$, form the Riemann sum $\displaystyle S=\sum_{i=1}^{n}f(\xi_{i})(x_{i}-x_{i-1})$ and set $\lambda=\max(x_{i}-x_{i-1})$. If there is a real $I$ such that for every $\varepsilon>0$ there is $\delta>0$ with $|S-I|<\varepsilon$ whenever $\lambda<\delta$, for all partitions and all choices, then $f$ is Riemann integrable on $[a,b]$ and $I=\displaystyle\int_a^b f(x)\,dx$.
>
> Continuous functions on a closed interval are integrable, as are bounded functions with finitely many discontinuities. Integrable functions satisfy linearity, additivity, the sign property and the estimate inequality; if $f$ is continuous then some $\xi\in[a,b]$ satisfies $\displaystyle\int_a^b f=f(\xi)(b-a)$.

## Connections to other lessons

Three things established here recur throughout:

- **Limits as a definition tool**: double integrals, line integrals and improper integrals are all limits of sums, differing only in what is being cut up;
- **Integrability awareness**: before discussing an integral, check that the integrand is bounded on the interval;
- **Properties first**: use linearity, additivity, sign and estimates to simplify before attempting any antiderivative.

The next lesson connects the definite integral back to antiderivatives, proving that $\Phi(x)=\displaystyle\int_a^x f(t)\,dt$ has derivative $f(x)$ and deriving the Newton–Leibniz formula from it. Only then do "definition" and "computation" merge.