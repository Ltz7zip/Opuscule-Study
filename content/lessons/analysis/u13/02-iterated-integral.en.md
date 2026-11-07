---
slug: "iterated-integral"
subject: "analysis"
unit: "u13"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Iterated Integrals"
subtitle: "Integrate along one line, then sweep the line across"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "defint"]
---

## Goals

The definition of a double integral is not a computational tool. The useful statement is an identity: a double integral equals two one-variable integrals in succession. By the end you can write the correct inner and outer limits on rectangles and general regions, recognise $x$-simple and $y$-simple regions, and reverse the order when the inner integral has no elementary antiderivative.

## Three-line recap

- A double integral is cut, sum, limit; it carries no preferred order of integration.
- Fix $x$ and let $y$ run: one integral collapses a vertical slice to a single number.
- Then let $x$ sweep the region, turning a two-dimensional problem into two one-dimensional ones.

## Fubini on a rectangle

If $f$ is continuous on $R=[a,b]\times[c,d]$, then

$$\iint_R f(x,y)\,dx\,dy=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy.$$

Both orders hold. Continuity on the closed rectangle gives uniform continuity, and the inner integral is continuous in the remaining variable. The textbook proof partitions $R$ into $mn$ small rectangles, applies the mean value theorem on each, and passes to the limit in the one-dimensional sums.

A concrete check: $f(x,y)=x^2y$ on $[0,1]\times[0,2]$.

$$\int_0^1 x^2\left(\int_0^2 y\,dy\right)dx=\int_0^1 2x^2\,dx=\frac{2}{3}.$$

The other order gives $\int_0^2 y\left(\int_0^1 x^2dx\right)dy=\int_0^2\frac{y}{3}dy=\frac23$. Both are easy here, so the choice of order does not matter yet. On general regions it does.

## x-simple and y-simple regions

A region of the form

$$D=\{(x,y):a\le x\le b,\ \varphi_1(x)\le y\le\varphi_2(x)\}$$

with continuous $\varphi_1,\varphi_2$ is **$x$-simple** (a region of vertical strips). Then

$$\iint_D f\,d\sigma=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy.$$

The outer limits are constants; the inner limits may depend on $x$. A **$y$-simple** region is written $c\le y\le d$, $\psi_1(y)\le x\le\psi_2(y)$, and the inner integral is in $x$.

Example: let $D$ be bounded by $y=0$, $x=1$, $y=x^2$, and compute $\iint_D xy\,d\sigma$. It is $x$-simple with $0\le x\le1$, $0\le y\le x^2$:

$$\int_0^1 x\left(\int_0^{x^2}y\,dy\right)dx=\int_0^1 x\cdot\frac{x^4}{2}\,dx=\frac{1}{12}.$$

Drawing is not optional. Project the region onto the $x$-axis, then for a fixed $x$ draw a vertical line and read where it enters and where it leaves.

## Reversing the order

Some inner integrals have no elementary antiderivative, for instance $\int e^{-y^2}dy$ or $\int\frac{\sin y}{y}dy$. Reversing the order is then the standard move.

Compute

$$I=\int_0^1 dx\int_x^1 e^{-y^2}dy.$$

The region is the triangle $0\le x\le y\le1$. Rewrite it as $0\le y\le1$, $0\le x\le y$:

$$I=\int_0^1 dy\int_0^y e^{-y^2}dx=\int_0^1 y e^{-y^2}dy=\left[-\frac12e^{-y^2}\right]_0^1=\frac{1-e^{-1}}{2}.$$

Reversing the order is entirely a translation of the region description. Draw the region, project onto the other axis, and read off the two boundary curves.

## When the order cannot be swapped

Fubini is not unconditional. On $(0,1]^2$ take

$$f(x,y)=\frac{x^2-y^2}{(x^2+y^2)^2}.$$

Integrating in $x$ first, use $\frac{\partial}{\partial x}\left(\frac{x}{x^2+y^2}\right)=\frac{y^2-x^2}{(x^2+y^2)^2}$:

$$\int_0^1 f(x,y)\,dx=-\frac{1}{1+y^2},\qquad \int_0^1 dy\int_0^1 f\,dx=-\frac{\pi}{4}.$$

Integrating in $y$ first, use $\frac{\partial}{\partial y}\left(\frac{y}{x^2+y^2}\right)=\frac{x^2-y^2}{(x^2+y^2)^2}$:

$$\int_0^1 f(x,y)\,dy=\frac{1}{1+x^2},\qquad \int_0^1 dx\int_0^1 f\,dy=\frac{\pi}{4}.$$

The two iterated integrals differ by a sign. The theorem is not wrong: $f$ is unbounded near the origin and $\iint|f|\,d\sigma$ diverges, so Fubini's hypothesis fails. Before swapping, check boundedness and continuity on the closed region, or absolute integrability.

## Three misconceptions

> [!MYTH] The limits can be written in any order.
> The outer limits must be constants, the inner ones may depend on the outer variable, and each inner segment must lie entirely in the region. Wrong limits describe a different region.

> [!MYTH] The two iterated integrals are automatically equal.
> They are equal under Fubini's hypotheses, for example continuity on a closed rectangle or absolute integrability. The function above is the counterexample.

> [!MYTH] Reversing order just swaps $dx$ and $dy$.
> The region must be redescribed. $\int_0^1dx\int_x^1$ becomes $\int_0^1dy\int_0^y$; the limits change with the description.

## Practice

> [!PRACTICE] 1 · Triangle
> Let $D$ be bounded by $y=0$, $x=1$, $y=x$. Compute $\iint_D xy\,d\sigma$.
>
> > [!ANSWER] Show answer
> > Write $0\le x\le1$, $0\le y\le x$: $\int_0^1 x\cdot\frac{x^2}{2}dx=\frac18$.

> [!PRACTICE] 2 · Reverse
> Compute $\int_0^1 dy\int_y^1 e^{-x^2}dx$.
>
> > [!ANSWER] Show answer
> > The region is $0\le y\le x\le1$. Swap: $\int_0^1 dx\int_0^x e^{-x^2}dy=\int_0^1 xe^{-x^2}dx=\frac{1-e^{-1}}{2}$.

> [!PRACTICE] 3 · Volume
> Find the volume of the tetrahedron cut from the first octant by $x+y+z=1$.
>
> > [!ANSWER] Show answer
> > Volume $=\iint_D(1-x-y)\,d\sigma$ over $x\ge0$, $y\ge0$, $x+y\le1$. Then $\int_0^1dx\int_0^{1-x}(1-x-y)dy=\int_0^1\frac{(1-x)^2}{2}dx=\frac16$.

> [!PRACTICE] 4 · Diagnose
> The function above is continuous on $(0,1]^2$. Why can the two iterated integrals still differ?
>
> > [!ANSWER] Show answer
> > It is continuous on the half-open square but unbounded near the origin of $[0,1]^2$, and $\iint|f|$ diverges. Fubini needs continuity on the closed rectangle or absolute integrability; neither holds.

> [!FORMAL] Formal statement
> Let $f$ be continuous on $R=[a,b]\times[c,d]$. Then $F(x)=\int_c^d f(x,y)\,dy$ is continuous on $[a,b]$ and $\iint_R f=\int_a^bF(x)\,dx$; the other order gives the same value. If $D=\{(x,y):a\le x\le b,\varphi_1(x)\le y\le\varphi_2(x)\}$ with continuous $\varphi_1,\varphi_2$ and $f$ continuous on $D$, then $\iint_D f=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy$.
