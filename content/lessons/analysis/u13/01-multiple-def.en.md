---
slug: "multiple-def"
subject: "analysis"
unit: "u13"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Defining Multiple Integrals"
subtitle: "Cut, sum, shrink the mesh — now in the plane"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["multipleint", "defint"]
prereq: ["defint"]
related: ["multipleint", "defint"]
---

## Goals

Multiple integration moves the definite integral from an interval to a plane region: cut the region into pieces, add area times height, and let the largest diameter go to zero. By the end you can state the partition definition, decide whether a bounded function is integrable, and estimate an integral from its properties without computing it.

Three tasks only: make the partition precise, state the integrability test, then confirm the properties with one hand calculation.

## Three-line recap

- A definite integral cuts $[a,b]$ into small intervals and adds rectangle areas.
- A function of two variables lives on a plane region, so area replaces interval length.
- The question becomes: how do we make cut, sum, and limit independent of the cutting?

## Partitions, diameters, and Riemann sums

Let $D$ be a closed bounded region with area $\sigma(D)$. Cut $D$ by finitely many curves into $n$ small pieces of area $\Delta\sigma_i$, and pick any point $(\xi_i,\eta_i)$ in the $i$-th piece. The sum

$$\sum_{i=1}^{n} f(\xi_i,\eta_i)\,\Delta\sigma_i$$

is a Riemann sum of $f$ for this partition.

The diameter of a piece is $d_i=\sup\{|P-Q|:P,Q\in\Delta\sigma_i\}$, and the mesh of the partition is $\|T\|=\max_i d_i$. The function $f$ is integrable with value $I$ if for every $\varepsilon>0$ there is $\delta>0$ such that $\|T\|<\delta$ forces

$$\left|\sum_{i=1}^n f(\xi_i,\eta_i)\Delta\sigma_i-I\right|<\varepsilon$$

for every partition and every choice of sample points. The phrase "for every" is the whole content: a different cutting or a different sample must lead to the same number. Convergence on square grids alone proves nothing.

## Necessary and sufficient conditions

Necessary: $f$ must be bounded on $D$. If $f$ is unbounded, some piece can make $|f|$ arbitrarily large, so the sums have no finite bound.

Sufficient, in the form used by Chen Jixiu:

- If $f$ is continuous on $D$, it is integrable.
- If $f$ is bounded and its discontinuities lie in a set of area zero, it is integrable.

The second clause explains why changing values along a curve does not change an integral: a curve has area zero.

Keep a counterexample ready. On $[0,1]^2$ let $f(x,y)=1$ when $x$ is rational and $0$ otherwise. Every small piece contains points with rational $x$ and points with irrational $x$, so every upper sum is $1$ and every lower sum is $0$. The gap never closes; $f$ is not integrable. Boundedness alone is far from enough.

## Properties, and one hand check

The following follow directly from the definition, provided the integrals exist:

| Property | Statement |
| --- | --- |
| Linearity | $\iint_D(\alpha f+\beta g)=\alpha\iint_D f+\beta\iint_D g$ |
| Additivity | if $D=D_1\cup D_2$ with disjoint interiors, $\iint_D f=\iint_{D_1}f+\iint_{D_2}f$ |
| Monotonicity | $f\le g$ implies $\iint_D f\le\iint_D g$ |
| Absolute value | $\left|\iint_D f\right|\le\iint_D|f|$ |
| Mean value | for continuous $f$, $\iint_D f=f(\xi,\eta)\sigma(D)$ |

Now compute from the definition. Take $D=[0,1]^2$ and $f(x,y)=x$. Split $D$ into $n^2$ squares of side $1/n$ and sample the midpoint $\left(\frac{i-1/2}{n},\frac{j-1/2}{n}\right)$ of the $(i,j)$-th square. The sum is

$$\sum_{i,j=1}^{n}\frac{i-1/2}{n}\cdot\frac{1}{n^2}=\frac{1}{n^3}\sum_{i=1}^n\left(i-\frac12\right)=\frac{1}{n^3}\cdot\frac{n^2}{2}=\frac{1}{2}.$$

Every $n$ gives exactly $1/2$, so the limit is $1/2$: the integral of $x$ over the unit square is half the area. Likewise $\iint_D y=1/2$, hence $\iint_D(x+y)=1$.

## Three misconceptions

> [!MYTH] A double integral is just two ordinary integrals.
> The definition is cut, sum, limit. Iterated integrals are a computational device justified by Fubini's theorem; whether the order can be swapped is a separate question.

> [!MYTH] Continuity guarantees integrability.
> The region must also be bounded with boundary of area zero. On an unbounded region a continuous function gives an improper multiple integral, which may diverge.

> [!MYTH] If one partition converges, the function is integrable.
> Integrability quantifies over all partitions with mesh tending to zero and all sample choices. Checking a single square grid checks a single path.

## Practice

> [!PRACTICE] 1 · From the definition
> On $D=[0,1]^2$, compute $\iint_D(2x+3y)\,d\sigma$ using sums.
>
> > [!ANSWER] Show answer
> > By linearity and the result above, $\iint_D 2x=1$ and $\iint_D 3y=3/2$, so the value is $5/2$.

> [!PRACTICE] 2 · Integrability
> On $[0,1]^2$ set $f(x,y)=1$ when $x$ is rational and $0$ otherwise. Is $f$ integrable?
>
> > [!ANSWER] Show answer
> > No. Every piece contains both kinds of points, so upper sums are $1$ and lower sums are $0$. The discontinuity set is the entire square, not a null set.

> [!PRACTICE] 3 · Estimate then compute
> For the unit disk $D$, what does the mean value theorem say about $\iint_D(x^2+y^2)\,d\sigma$? What is the exact value?
>
> > [!ANSWER] Show answer
> > The theorem gives $h\pi$ with $0\le h\le1$, hence only $0\le I\le\pi$. Polar coordinates give $\int_0^{2\pi}\int_0^1 r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac14=\frac{\pi}{2}$, so the average height is $1/2$.

> [!PRACTICE] 4 · Properties
> Suppose $f$ is continuous on $D$, $\sigma(D)=4$, and $1\le f\le3$. Bound $\iint_D f$. If in addition $\iint_D f=8$, must $f$ equal $2$ somewhere?
>
> > [!ANSWER] Show answer
> > $4\le\iint_D f\le12$. The mean value theorem gives $8=f(\xi,\eta)\cdot4$, so $f(\xi,\eta)=2$.

> [!FORMAL] Formal statement
> Let $D\subset\mathbb{R}^2$ be closed and bounded, $f$ bounded on $D$. For a partition $T$ write $M_i=\sup_{\Delta\sigma_i}f$, $m_i=\inf_{\Delta\sigma_i}f$, and let $S(T)=\sum M_i\Delta\sigma_i$, $s(T)=\sum m_i\Delta\sigma_i$. Then $f$ is integrable if and only if $\inf_T S(T)=\sup_T s(T)$. Equivalently, there is $I$ such that for every $\varepsilon>0$ some $\delta>0$ makes $\left|\sum f(\xi_i,\eta_i)\Delta\sigma_i-I\right|<\varepsilon$ whenever $\|T\|<\delta$, uniformly in the sample points.
