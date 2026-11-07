---
slug: "double-integral-computation"
subject: "calculus"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Double Integrals: Concept and Computation"
subtitle: "From slicing and summing to two single integrals"
minutes: 30
meta: ["30 min read","Requires definite integrals and space geometry","Mastery level"]
concepts: ["multipleint", "defint"]
prereq: ["defint"]
related: ["areavol", "partial", "vectorgeo"]
---

## What this lecture sets out to do

A definite integral accumulates along a line segment; a double integral accumulates over a plane region. Only the object of accumulation changes, but two things must be rebuilt. A region has no natural starting point or endpoint, so the order of integration becomes a pair of inner and outer limits. And the area element is no longer $dx$: in polar coordinates it becomes $r\,dr\,d\theta$. These two facts decide most of the technique below.

By the end of the lecture you should be able to:

- restate the four steps — slice, approximate, sum, take the limit — and explain why independence of the partition and the sample points is essential;
- state the four basic properties and derive each from the integral sum;
- decide whether a region is $x$-simple or $y$-simple and write the limits in the correct order;
- reverse the order when the inner integral is intractable, redrawing the region to get the new limits;
- explain where $d\sigma=r\,dr\,d\theta$ comes from, and recognise regions and integrands that suit polar coordinates;
- use $f=1$ or a known area to judge whether a computed value is plausible.

## Three lines back

- A definite integral is a limit of sums over a partition, and its geometric meaning is the area of a curved trapezoid.
- A single integral accumulates along an interval; a double integral accumulates over a plane region. Only the "small piece" changes.
- Volume equals base area times height, which is where the solid-under-a-surface picture starts.

## From a solid under a surface to a double integral

Start with a geometry problem. Let $D$ be a closed bounded region in the $xOy$ plane and $f(x,y)\ge 0$ continuous on $D$. Take $D$ as base, the surface $z=f(x,y)$ as top, and the vertical cylinder along the boundary of $D$ as side. The solid enclosed is called a **solid with a curved top**. Its volume cannot be read off as base times height, because the height varies.

The remedy is the one-variable procedure: cut, approximate, sum. Divide $D$ into $n$ pieces, the $i$-th of area $\Delta\sigma_i$. Inside a small enough piece $f$ hardly varies, so the piece is nearly a flat-topped column of height $f(\xi_i,\eta_i)$ and volume $f(\xi_i,\eta_i)\Delta\sigma_i$. Adding the columns approximates the volume, and refining the partition drives the approximation to the truth.

One detail has no one-variable analogue. An interval has only length, but a region has shape, so "fine enough" cannot be measured by area alone: a long thin sliver may have tiny area while $f$ differs greatly at its ends. The right measure is the **diameter**, the supremum of distances between two points of a piece. Let $\lambda$ be the largest diameter; only $\lambda\to0$ makes every piece genuinely small.

If it is independent of the partition and the sample points, the limit is the double integral of $f$ over $D$; otherwise the number would not be a property of $f$ and $D$ at all.

## The four-step definition and its geometric meaning

> [!FORMAL] Definition of the double integral
> Let $f$ be bounded on a closed bounded region $D$. Divide $D$ into $n$ pieces $\Delta\sigma_1,\dots,\Delta\sigma_n$ (with $\Delta\sigma_i$ denoting the area as well), choose $(\xi_i,\eta_i)$ in each piece, and form the integral sum $S=\sum_{i=1}^{n}f(\xi_i,\eta_i)\Delta\sigma_i$. Let $\lambda$ be the largest diameter. If $S$ tends to a constant $I$ independent of the partition and the sample points as $\lambda\to0$, then $f$ is integrable on $D$ and $I$ is written $\iint_D f(x,y)\,d\sigma$.

$$
S=\sum_{i=1}^{n} f(\xi_i,\eta_i)\,\Delta\sigma_i
$$

The four steps check out one by one: slicing gives $\Delta\sigma_i$, approximating lets one value stand for a piece, summing gives $S$, and the limit pushes the error to zero. Forcing areas to zero while diameters do not would leave the error on a thin sliver uncontrolled.

Geometrically there are three cases. For $f\ge0$ the integral is the volume of the curved-top solid. For a sign-changing integrand it is a signed volume, with the part below the $xOy$ plane counted negatively. For $f\equiv1$ it degenerates to $\iint_D d\sigma=\sigma(D)$, the area. That third case is the everyday check: an integrand identically $1$ must reproduce the area.

## Four basic properties

Every property traces back to the integral sum, so none needs a separate proof.

| Property | Statement | Comment |
| --- | --- | --- |
| Linearity | $\iint(\alpha f+\beta g)=\alpha\iint f+\beta\iint g$ | constants factor out |
| Additivity | $\iint_{D_1\cup D_2}=\iint_{D_1}+\iint_{D_2}$ | interiors disjoint |
| Monotonicity | $f\le g\Rightarrow \iint f\le\iint g$ | yields estimates |
| Mean value | $\iint_D f\,d\sigma=f(\xi,\eta)\,\sigma(D)$ | requires $f$ continuous |

Linearity and additivity are inherited from summation: the limit of a sum is the sum of limits, and splitting a region differs from summing over the whole only by regrouping. Monotonicity holds because every term is non-negative.

The mean value theorem deserves a line of reasoning. Let $f$ be continuous on $D$ with minimum $m$ and maximum $M$. Monotonicity gives $m\sigma(D)\le\iint_D f\,d\sigma\le M\sigma(D)$, hence

$$
m\le\frac{1}{\sigma(D)}\iint_D f\,d\sigma\le M
$$

The middle quantity is the average value of $f$ on $D$. A continuous function attains every value between $m$ and $M$, so some $(\xi,\eta)$ realizes that average: a double integral divided by an area is an average height.

## Rectangular coordinates: two single integrals

The definition guarantees existence but not computation. The way in is to describe the region by inequalities and reduce to two one-variable integrals.

Suppose $D$ is given by $a\le x\le b$, $\varphi_1(x)\le y\le\varphi_2(x)$: every vertical line meets $D$ in a single interval. Fix $x$ and integrate along that line:

$$
A(x)=\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy
$$

$A(x)$ is a cross-sectional area, the area of the slice obtained by cutting the solid at $x$. Accumulating the slices along the $x$ direction,

$$
\iint_D f\,d\sigma=\int_a^b A(x)\,dx=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)} f(x,y)\,dy
$$

Such a $D$ is called **$x$-simple**. If instead $D$ is given by $c\le y\le d$, $\psi_1(y)\le x\le\psi_2(y)$, so every horizontal line meets it in one interval, it is **$y$-simple** and one integrates in $x$ first:

$$
\iint_D f\,d\sigma=\int_c^d dy\int_{\psi_1(y)}^{\psi_2(y)} f(x,y)\,dx
$$

A region may be both; the two descriptions then agree in value and the choice is whichever integral is easier. The rule never changes: outer limits are constants, inner limits may depend on the outer variable.

## Example 1: a region bounded by two curves

Let $D$ be bounded by $y=x$ and $y=x^{2}$, and compute $\iint_D(x+y)\,d\sigma$.

**Step 1, intersections.** Solving $x=x^{2}$ gives $x=0$ or $x=1$, so the curves meet at $(0,0)$ and $(1,1)$.

**Step 2, which is above.** At $x=\tfrac12$ in $0<x<1$, $\tfrac12>\tfrac14$, hence $x^{2}<x$ and the line is on top.

**Step 3, limits.** The region is

$$
D:\quad 0\le x\le 1,\qquad x^{2}\le y\le x
$$

**Step 4, compute.** The inner integral is

$$
\int_{x^{2}}^{x}(x+y)\,dy=\left[xy+\frac{y^{2}}{2}\right]_{x^{2}}^{x}
=x^{2}-x^{3}+\frac{x^{2}-x^{4}}{2}
$$

and the outer one gives

$$
\int_0^1\left(x^{2}-x^{3}+\frac{x^{2}-x^{4}}{2}\right)dx
=\frac13-\frac14+\frac16-\frac1{10}
=\frac{3}{20}
$$

**Check.** The area is $\int_0^1(x-x^{2})dx=\frac16$. The integrand lies between $0$ and $2$ on $D$, so the integral should lie between $0$ and $\frac13$; indeed $\frac{3}{20}=0.15$.

**The same region as $y$-simple.** A horizontal line meets $D$ in one interval only after solving both curves for $x$: for $0\le y\le 1$ the left boundary is $x=\sqrt y$ and the right is $x=y$, so

$$
\iint_D(x+y)\,d\sigma=\int_0^1 dy\int_{\sqrt y}^{y}(x+y)\,dx
$$

which again gives $\frac{3}{20}$. The $y$-simple form needs both curves solved for $x$, while the $x$-simple form uses $y=x^{2}$ and $y=x$ as they stand. Choose the description that requires no algebra.

## Reversing the order of integration

Sometimes the inner integral has no elementary antiderivative, as with $\int e^{-y^{2}}dy$, $\int\sin(y^{2})dy$ or $\int\frac{dy}{\ln y}$. No outer limits rescue such an integral; the only way out is to cut the region the other way.

Consider

$$
I=\int_0^1 dx\int_x^1 e^{-y^{2}}dy
$$

Reconstruct the region first: $0\le x\le 1$, $x\le y\le 1$ is the triangle with vertices $(0,0)$, $(1,1)$, $(0,1)$. Describe it with horizontal strips: for $0\le y\le 1$, $x$ runs from $0$ to $y$, hence

$$
I=\int_0^1 dy\int_0^{y}e^{-y^{2}}dx=\int_0^1 y e^{-y^{2}}dy=\frac12\left(1-\frac1e\right)
$$

The inner integral now involves only $x$ and produces the factor $y$, which combines with $e^{-y^{2}}$ into the differential of $-\frac12e^{-y^{2}}$.

A purely formal version: if $D$ is bounded by $y=x$ and $y=\sqrt x$, then

$$
\int_0^{1}dx\int_{x}^{\sqrt x} f(x,y)\,dy=\int_0^{1}dy\int_{y^{2}}^{y} f(x,y)\,dx
$$

The new lower limit comes from solving $y=\sqrt x$ for $x=y^{2}$, the new upper limit from $y=x$. Orientation is consistent: $y=\sqrt x$ is on the left, and solving gives $y^{2}\le x\le y$.

Three disciplines: draw the region rather than guess from the integrand; keep the outer limits constant, since a variable there means an error; test one point and confirm it lies in the region under both descriptions.

## Polar coordinates: the extra r

Circular boundaries carry square roots in rectangular coordinates and split the limits. In polar coordinates such a boundary becomes $r=\text{constant}$ and one piece suffices. The price is a modified area element.

Put $x=r\cos\theta$ and $y=r\sin\theta$. The area element is not $dr\,d\theta$ but

$$
d\sigma=r\,dr\,d\theta
$$

The infinitesimal argument is transparent: fix $\theta$, let $r$ grow to $r+dr$ and $\theta$ to $\theta+d\theta$. The piece cut out is nearly a rectangle with sides $dr$ and $r\,d\theta$, hence area $r\,dr\,d\theta$. The Jacobian agrees:

$$
\left|\frac{\partial(x,y)}{\partial(r,\theta)}\right|
=\left|\begin{matrix}\cos\theta&-r\sin\theta\\ \sin\theta&r\cos\theta\end{matrix}\right|
=r
$$

That $r$ is neither a typo nor a constant to be dropped: the same angular increment sweeps a longer arc farther out.

Limits are found by scanning with a ray. Let $\theta$ run from $\theta_1$ to $\theta_2$; for fixed $\theta$ the ray enters at $r_1(\theta)$ and leaves at $r_2(\theta)$. Then

$$
\iint_D f\,d\sigma=\int_{\theta_1}^{\theta_2}d\theta\int_{r_1(\theta)}^{r_2(\theta)} f(r\cos\theta,r\sin\theta)\,r\,dr
$$

For a disk of radius $R$ about the origin the limits are the constants $0$ and $R$; for an annulus or cardioid the upper limit depends on $\theta$.

## Example 2: an integral over a quarter disk

Let $D$ be the part of $x^{2}+y^{2}\le 1$ in the first quadrant, and compute $\iint_D(x^{2}+y^{2})\,d\sigma$.

**Choose the coordinates.** The region is a quarter disk and the integrand is $x^{2}+y^{2}=r^{2}$. Both signals point to polar coordinates.

**Limits.** The first quadrant gives $0\le\theta\le\frac{\pi}{2}$ and the disk gives $0\le r\le 1$, both constant.

**Compute.**

$$
\iint_D(x^{2}+y^{2})\,d\sigma
=\int_0^{\pi/2}d\theta\int_0^{1}r^{2}\cdot r\,dr
=\frac{\pi}{2}\cdot\frac14=\frac{\pi}{8}
$$

**Check.** With integrand $1$ the same limits give $\frac{\pi}{2}\cdot\frac12=\frac{\pi}{4}$, the area of a quarter disk. Since $r^{2}\le1$, the answer cannot exceed that area, and $\frac{\pi}{8}\approx0.393$ against $\frac{\pi}{4}\approx0.785$ is consistent.

**Compare with rectangular coordinates.** An $x$-simple description gives $0\le x\le 1$, $0\le y\le\sqrt{1-x^{2}}$, and the inner integral is

$$
\int_0^{\sqrt{1-x^{2}}}(x^{2}+y^{2})\,dy=x^{2}\sqrt{1-x^{2}}+\frac{(1-x^{2})^{3/2}}{3}
$$

The outer integral must then handle this nest of radicals and needs a trigonometric substitution; the workload is several times larger. The wrong choice turns one integral into three.

## A comparison table

| Description | Region shape | Outer and inner | Area element | Typical signal |
| --- | --- | --- | --- | --- |
| $x$-simple | each vertical line meets an interval | $x$ outer, $y$ inner | $dy\,dx$ | boundaries given as $y=\cdot$ |
| $y$-simple | each horizontal line meets an interval | $y$ outer, $x$ inner | $dx\,dy$ | boundaries given as $x=\cdot$ |
| Polar | disk, sector, annulus | $\theta$ outer, $r$ inner | $r\,dr\,d\theta$ | boundary contains $x^{2}+y^{2}$ or $r=\cdot$ |

The three descriptions refer to the same integral and must agree in value; only the difficulty differs. Decide in this order: can the boundary be written in one piece, does the inner integral have an elementary antiderivative, and only then what the integrand looks like.

## Four misconceptions

> [!MYTH] In polar coordinates $dx\,dy$ simply becomes $dr\,d\theta$.
> Dropping the Jacobian $r$ scales the answer by a factor tied to the radius. The area element is $r\,dr\,d\theta$, and that $r$ stays in the integrand.

> [!MYTH] The two iterated integrals can always be interchanged.
> The value is independent of the order (Fubini's theorem), but **the limits must change with the region**. Only for a rectangle are all limits constant. Swapping the signs for a general region integrates over a different set.

> [!MYTH] A double integral only computes volume.
> A negative integrand gives signed volume; $f=1$ gives area; a density gives mass; $f=x$ gives the numerator of a centroid. It is a general accumulator over a plane region.

> [!MYTH] In polar coordinates the limits on $r$ are always constants.
> That holds only for regions centred at the origin and bounded by circles or arcs. For an off-centre circle, a cardioid or a piece of an annulus, the upper limit depends on $\theta$. The test is whether every ray enters and leaves at fixed radii.

## Practice

> [!PRACTICE] 1 · Set the limits
> Compute $\iint_D x\,d\sigma$ for $D$: $0\le x\le 1$, $x^{2}\le y\le x$.
>
> > [!ANSWER] Show answer
> > The inner integral gives $x(x-x^{2})$, then $\displaystyle\int_0^1 x(x-x^{2})\,dx=\frac13-\frac14=\frac1{12}$. With $f=1$ the area is $\frac16$ and the integrand is at most $1$, so $\frac1{12}$ is plausible.

> [!PRACTICE] 2 · Reverse the order
> Compute $\displaystyle\int_0^1 dx\int_x^1 e^{-y^{2}}dy$.
>
> > [!ANSWER] Show answer
> > The inner integral has no elementary antiderivative. The region is the triangle with vertices $(0,0)$, $(1,1)$, $(0,1)$, rewritten as $0\le y\le 1$, $0\le x\le y$: $\displaystyle\int_0^1 dy\int_0^{y}e^{-y^{2}}dx=\int_0^1 y e^{-y^{2}}dy=\frac12\left(1-\frac1e\right)$.

> [!PRACTICE] 3 · Polar
> Compute $\iint_D\sqrt{x^{2}+y^{2}}\,d\sigma$ over the unit disk.
>
> > [!ANSWER] Show answer
> > The integrand is $r$ and the area element supplies another $r$, so $\displaystyle\int_0^{2\pi}d\theta\int_0^1 r\cdot r\,dr=2\pi\cdot\frac13=\frac{2\pi}{3}$.

> [!PRACTICE] 4 · A triangular region
> Compute $\iint_D xy\,d\sigma$ for $D$: $0\le x\le 1$, $0\le y\le x$.
>
> > [!ANSWER] Show answer
> > $\displaystyle\int_0^1 dx\int_0^{x}xy\,dy=\int_0^1\frac{x^{3}}{2}dx=\frac18$. The area is $\frac12$ and $xy\le 1$, so the magnitude is reasonable.

> [!PRACTICE] 5 · A Gaussian integrand
> Use polar coordinates to compute $\iint_D e^{-x^{2}-y^{2}}\,d\sigma$ over the unit disk.
>
> > [!ANSWER] Show answer
> > The integrand becomes $e^{-r^{2}}$, so $\displaystyle\int_0^{2\pi}d\theta\int_0^1 e^{-r^{2}}r\,dr=2\pi\cdot\frac12\left(1-\frac1e\right)=\pi\left(1-\frac1e\right)$. Letting the radius grow to $R\to\infty$ gives $\iint_{\mathbb R^{2}}e^{-x^{2}-y^{2}}d\sigma=\pi$, the standard route to $\int_{-\infty}^{\infty}e^{-x^{2}}dx=\sqrt\pi$.

> [!PRACTICE] 6 · The upper half disk
> Compute $\iint_D y\,d\sigma$ for the upper half disk $D$: $x^{2}+y^{2}\le 1$, $y\ge0$.
>
> > [!ANSWER] Show answer
> > In polar coordinates $0\le\theta\le\pi$, $0\le r\le 1$ and $y=r\sin\theta$: $\displaystyle\int_0^{\pi}\sin\theta\,d\theta\int_0^1 r^{2}\,dr=2\cdot\frac13=\frac23$. Divided by the area $\frac{\pi}{2}$ this gives the centroid height $\frac{4}{3\pi}$.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be bounded on a closed bounded region $D$ of area $\sigma(D)$. Divide $D$ into $n$ pieces, let $\lambda$ be the largest diameter, and form $\sum f(\xi_i,\eta_i)\Delta\sigma_i$. If the sum tends to a constant $I$ independent of the partition and the sample points as $\lambda\to0$, then $f$ is integrable and $I$ is its double integral. Continuous functions on closed bounded regions are integrable. If $f$ is continuous on $D$ and $D$ is $x$-simple with $a\le x\le b$, $\varphi_1(x)\le y\le\varphi_2(x)$, then $\iint_D f\,d\sigma=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy$; the $y$-simple case is analogous. In polar coordinates $d\sigma=r\,dr\,d\theta$, where $r$ is the absolute value of the Jacobian determinant of $(r,\theta)\mapsto(r\cos\theta,r\sin\theta)$.

## How this lecture connects

- **Definite integrals** supply the limiting language. Reading $A(x)=\int f\,dy$ as a definite integral, a double integral is a definite integral of a definite integral.
- **Partial derivatives and differentials** describe the shape of the integrand and reappear in every change of variables.
- **Space geometry** turns regions and surfaces into inequalities; most failures of limits come from this step.
- **Triple integrals** carry the same four steps into space, replacing small regions by small blocks and the area element by $dV$.
- **Applications of multiple integrals** use the integral as an accumulator for area, centroid and moment of inertia; the "approximate, then sum" pattern here is the source of those formulas.

In one sentence: the definition guarantees existence; what makes a double integral usable is slicing the region into two layers of single variables.
