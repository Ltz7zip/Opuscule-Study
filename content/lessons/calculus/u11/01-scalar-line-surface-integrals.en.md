---
slug: "scalar-line-surface-integrals"
subject: "calculus"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Calculus · Mastery Mode"
title: "Line Integrals with Respect to Arc Length and Surface Integrals with Respect to Area"
subtitle: "Measure length and area first, then talk about direction"
minutes: 34
meta: ["34 min read","Requires definite integrals and surfaces in space","Mastery level"]
concepts: ["lineint", "multipleint"]
prereq: ["defint", "paramint"]
related: ["field", "multipleint", "areavol"]
---

## What This Lecture Sets Out to Do

A definite integral accumulates along a straight line: cut the interval into pieces of length $\Delta x$. Real objects are rarely straight. A bent wire or a bulging thin shell carries mass neither on a line nor on a plane, so we must replace length by arc length and area by surface area, then reuse the pipeline of cut, approximate, sum, and pass to the limit. That is exactly what this lecture does — deliberately without any direction.

The two direction-free integrals share one structure: both copy the cut-sum-limit template and only swap the measure. Second-kind integrals (next lecture) are complicated solely by two extra choices, "which way" and "which side". Delete those choices first, add them back later, and the two sets of formulas never blur together.

By the end you should be able to:

- state both definitions and explain why no direction appears;
- write the three forms of $ds$ and say where the $r^{2}$ in polar form comes from;
- parametrize, compute arc length, project a surface, and build the area element;
- simplify the integrand on the curve or surface before grinding;
- use symmetry to annihilate an integral or reduce it to a multiple;
- keep "independent of direction" and "independent of path" apart.

## Three-Line Recap

- A definite integral accumulates on a line: split the interval, each piece has length $\Delta x$, then take the limit of $\sum f(\xi_i)\Delta x_i$.
- Arc length is $\int\sqrt{x'(t)^{2}+y'(t)^{2}}\,dt$; it does not depend on which end you start from.
- For $z=z(x,y)$ the area element is $\sqrt{1+z_x^{2}+z_y^{2}}\,dx\,dy$, a factor measuring how far the surface tilts from the projection plane.

## Why We Need Accumulation Along Curves and Surfaces

Take a circular wire of radius $a$ with linear density $\rho(x,y)$, and ask for its mass.

Projecting the ring onto the $x$-axis fails at once. A vertical arc is crushed to a single point, so its length vanishes; nearly vertical parts are compressed most, nearly horizontal parts barely at all. Multiplying a projected length by a density gives neither the true mass of that piece nor anything recoverable by a fixed correction.

The trouble is the measure. On a straight interval $\Delta x$ happens to equal the piece's length; on a curve it does not. We therefore need an intrinsic element $ds$ that depends only on the curve — not on where the curve sits, not on where the traversal starts. Likewise $dS$ must depend only on the surface.

Hence the design principle: **keep the pipeline, replace the measure**. Partition along the curve or surface, multiply $f$ at a sample point by the measure of the piece, sum, and send the largest measure to zero. Only "how big is a piece" changes.

Two questions must be answered. Does the limit exist, independent of partition and sample points? Continuity of the integrand suffices. Is the result independent of the parametrization? A curve has infinitely many parametrizations, and the substitution rule in the next section shows the answer never changes.

## Line Integrals with Respect to Arc Length: Definition and Intuition

Let $L$ be a rectifiable arc and $f$ bounded on it. Split $L$ into $n$ pieces of arc length $\Delta s_i$, pick $(\xi_i,\eta_i)$ on the $i$-th piece, and form

$$
\sum_{i=1}^{n} f(\xi_i,\eta_i)\,\Delta s_i
$$

Let $\lambda=\max_{1\le i\le n}\Delta s_i$. If the sum tends to a constant $I$ independent of partition and sample points as $\lambda\to0$, then $f$ is integrable on $L$ with respect to arc length and

$$
\int_L f(x,y)\,ds
$$

denotes $I$. For a space curve replace $f$ by $f(x,y,z)$; nothing else changes.

Geometric intuition. With $f\equiv1$ every term is $\Delta s_i$, so the integral is the arc length. For general nonnegative $f$, read $f(\xi_i,\eta_i)$ as the height of a curtain standing on $L$: each panel has area about $f\cdot\Delta s_i$, and the integral is the curtain's area — the curved version of "area under a graph".

Numerical intuition. If $f\equiv c$, the integral is $c$ times the arc length. If $f$ is nonzero only on a short piece, only that piece counts. The integral is a length-weighted sum, and the weight is length, not coordinate difference.

Several properties follow immediately:

- **Linearity**: $\int_L(\alpha f+\beta g)\,ds=\alpha\int_L f\,ds+\beta\int_L g\,ds$;
- **Additivity**: if $L$ splits into $L_1$ and $L_2$, then $\int_L=\int_{L_1}+\int_{L_2}$;
- **Absolute-value estimate**: $\left|\int_L f\,ds\right|\le\int_L|f|\,ds$;
- **Mean value theorem**: for continuous $f$ there is $(\xi,\eta)$ on $L$ with $\int_L f\,ds=f(\xi,\eta)\cdot s$, where $s$ is the arc length of $L$.

The key point: **direction never enters**. Since $\Delta s_i>0$, reversing the traversal only reverses the order of the pieces, so

$$
\int_{AB} f\,ds=\int_{BA} f\,ds
$$

This is the opposite of the second-kind integral, where $dx$ is a projection and can change sign.

> [!FORMAL] Existence of the first-kind line integral
> If $L$ is a smooth arc and $f$ is continuous on $L$, then $f$ is integrable there with respect to arc length. Compare the sum with a Riemann sum over the parameter interval: uniform continuity of $f$ makes its variation within one piece arbitrarily small, so the two sums differ by a quantity tending to zero as $\lambda\to0$.

## Turning ds into a Parameter

Let $L$ be given by $x=\varphi(t)$, $y=\psi(t)$, $\alpha\le t\le\beta$, with continuous derivatives never simultaneously zero. On a small subinterval $[t_{i-1},t_i]$ the chord is, by the mean value theorem,

$$
\sqrt{\Delta x_i^{2}+\Delta y_i^{2}}
=\sqrt{\varphi'(\tau_i)^{2}+\psi'(\tau_i)^{2}}\;\Delta t_i
$$

and arc length over chord tends to $1$, so the chord may replace the arc. Substituting gives a Riemann sum, hence

$$
\int_L f\,ds=\int_{\alpha}^{\beta} f(\varphi(t),\psi(t))\sqrt{\varphi'(t)^{2}+\psi'(t)^{2}}\,dt
$$

Three points matter.

First, **$\alpha<\beta$ is mandatory**. Here $\Delta s_i>0$ forces $\Delta t_i>0$, so the parameter sweeps the curve from small to large. Reversed limits insert a minus sign through $dt$, and the wrong sign is easy to miss because the number still looks reasonable.

Second, **the result is independent of the parametrization**: for another strictly monotone parameter $t=t(\tau)$, the substitution factor and the chain-rule factor cancel.

Third, **the root cannot be dropped**. It is the speed of the curve relative to the parameter, and equals $1$ only on a segment lying on the $x$-axis.

Example: $L$ is the segment from $(0,0)$ to $(1,1)$; find $\int_L(x+y)\,ds$.

Take $x=t$, $y=t$, $0\le t\le1$; then $\varphi'=\psi'=1$ and

$$
ds=\sqrt{1+1}\,dt=\sqrt2\,dt
$$

The integrand equals $2t$ on $L$, so

$$
\int_L(x+y)\,ds=\int_0^1 2t\cdot\sqrt2\,dt
=\sqrt2\,t^{2}\Big|_0^1=\sqrt2
$$

Check: the average of $f$ is $1$ (endpoints give $0$ and $2$), the length is $\sqrt2$, and the product is $\sqrt2$.

Example: $L$ is the circle $x^{2}+y^{2}=a^{2}$; find $\int_L(x^{2}+y^{2})\,ds$.

No parametrization is needed: on $L$ the integrand is the constant $a^{2}$, so

$$
\int_L(x^{2}+y^{2})\,ds=a^{2}\int_L ds=a^{2}\cdot 2\pi a=2\pi a^{3}
$$

Parametrizing instead with $x=a\cos t$, $y=a\sin t$, $0\le t\le2\pi$, $ds=a\,dt$ gives the same $a^{2}\cdot a\cdot2\pi$. In harder problems "simplify on the curve first" saves most of the work.

Example: $L$ is the arc of $y=x^{2}$ from $(0,0)$ to $(1,1)$; find $\int_L\sqrt{y}\,ds$.

With $x$ as parameter, $y'=2x$,

$$
ds=\sqrt{1+4x^{2}}\,dx,\qquad \sqrt{y}=x
$$

and $x\ge0$ on $[0,1]$, so

$$
\int_L\sqrt{y}\,ds=\int_0^1 x\sqrt{1+4x^{2}}\,dx
=\frac{1}{12}(1+4x^{2})^{3/2}\Big|_0^1
=\frac{5\sqrt5-1}{12}
$$

using $x\,dx=\dfrac18\,d(1+4x^{2})$.

The same integrand on the segment $y=x$ gives $\int_0^1\sqrt{x}\cdot\sqrt2\,dx=\dfrac{2\sqrt2}{3}\approx0.943$, while the parabola gives $\dfrac{5\sqrt5-1}{12}\approx0.848$. Same endpoints, same integrand, different values: the first-kind integral depends on the whole shape. It ignores direction but is emphatically **not** path-independent.

## Boundary Cases and Comparisons

**Degenerate curves.** A curve shrunk to a point has zero length, so the integral vanishes. A segment with $f\equiv1$ reproduces its length, matching $\int_a^b dx$; the first-kind integral really generalizes the definite integral.

**Curves that are not graphs $y=y(x)$.** On a vertical segment, $x$ is constant and cannot be solved for $y$. Use $x=x(y)$ or a full parametrization; forcing a vertical segment into $\sqrt{1+y'^{2}}\,dx$ produces a spurious infinity.

**Parameters that sweep the curve twice.** Taking $0\le t\le4\pi$ for the unit circle traces it twice, counts every arc twice, and doubles the integral. Unlike the second-kind integral, back-and-forth motion does not cancel: the first-kind integral sees the image with multiplicity.

The order of work follows: ask which parameter sweeps the curve once without repetition, ask whether the integrand simplifies on the curve, and only then compute.

## Surface Integrals with Respect to Area: Definition and Area Element

Let $\Sigma$ be a smooth surface and $f$ bounded on it. Split $\Sigma$ into $n$ patches of area $\Delta S_i$, pick $(\xi_i,\eta_i,\zeta_i)$ in the $i$-th patch, and form

$$
\sum_{i=1}^{n} f(\xi_i,\eta_i,\zeta_i)\,\Delta S_i
$$

If the sum tends to a constant independent of partition and sample points as the largest diameter tends to zero, that constant is

$$
\iint_\Sigma f(x,y,z)\,dS
$$

With $f\equiv1$ this is the surface area; with $f$ an areal density it is the mass of a shell; with $f$ a temperature, the integral divided by the area is the average temperature. No side of the surface appears, because area is nonnegative.

The technical difficulty is $dS$, which must be derived, not guessed. Let $\Sigma$ be $\boldsymbol r(u,v)$ over a plane region $D_{uv}$. A rectangle $\Delta u\times\Delta v$ maps to an approximate parallelogram with sides $\boldsymbol r_u\Delta u$ and $\boldsymbol r_v\Delta v$, whose area is the modulus of the cross product:

$$
\Delta S\approx\left|\boldsymbol r_u\times\boldsymbol r_v\right|\Delta u\,\Delta v
$$

so $dS=\left|\boldsymbol r_u\times\boldsymbol r_v\right|du\,dv$. For a graph $z=z(x,y)$, take $u=x$, $v=y$:

$$
\boldsymbol r_x=(1,0,z_x),\qquad \boldsymbol r_y=(0,1,z_y)
$$

and

$$
\boldsymbol r_x\times\boldsymbol r_y=(-z_x,\,-z_y,\,1)
$$

whose modulus is $\sqrt{1+z_x^{2}+z_y^{2}}$. This factor is the area ratio between a small patch and its projection: the more the surface tilts, the larger it is, and a horizontal surface has ratio $1$. Since projection only shrinks area, $dS\ge dx\,dy$ always. Hence, for $\Sigma$ given by $z=z(x,y)$ over $D$,

$$
\iint_\Sigma f\,dS=\iint_D f(x,y,z(x,y))\sqrt{1+z_x^{2}+z_y^{2}}\,dx\,dy
$$

Example: $\Sigma$ is the upper hemisphere $z=\sqrt{a^{2}-x^{2}-y^{2}}$; find $\iint_\Sigma z\,dS$.

Differentiating $x^{2}+y^{2}+z^{2}=a^{2}$ in $x$ gives $2x+2zz_x=0$, so

$$
z_x=-\frac{x}{z},\qquad z_y=-\frac{y}{z}
$$

and

$$
1+z_x^{2}+z_y^{2}=1+\frac{x^{2}+y^{2}}{z^{2}}
=\frac{z^{2}+x^{2}+y^{2}}{z^{2}}=\frac{a^{2}}{z^{2}}
$$

Since $z>0$, $\sqrt{1+z_x^{2}+z_y^{2}}=\dfrac{a}{z}$. Over the disk $D:x^{2}+y^{2}\le a^{2}$,

$$
\iint_\Sigma z\,dS=\iint_D z\cdot\frac{a}{z}\,dx\,dy
=a\iint_D dx\,dy=a\cdot\pi a^{2}=\pi a^{3}
$$

The $z$ in the integrand cancels the $z$ in the root, leaving the disk area. Most sphere problems use exactly this structure. With $f\equiv1$ the same computation gives the hemisphere's area, $\displaystyle a\iint_D\frac{dx\,dy}{z}=2\pi a^{2}$, the quickest check that the area element is right.

Boundary case: a vertical cylinder $x^{2}+y^{2}=a^{2}$ projects to a curve of area $0$ and the formula fails. Write $x=\pm\sqrt{a^{2}-y^{2}}$, or parametrize $(a\cos\theta,a\sin\theta,z)$, for which $\left|\boldsymbol r_\theta\times\boldsymbol r_z\right|=a$ and $dS=a\,d\theta\,dz$. The criterion: **the projection must be a genuine two-dimensional region**. All three coordinate planes are allowed; choose the one where nothing degenerates and the element is simplest.

## The Two Integrals Side by Side

| Item | Line integral w.r.t. arc length | Surface integral w.r.t. area |
| --- | --- | --- |
| Domain | curve $L$ | surface $\Sigma$ |
| Element | $ds$ | $dS$ |
| Direction | none | none (the second kind has sides) |
| Reduces to | a definite integral | a double integral |
| Substitution factor | $\sqrt{\varphi'^{2}+\psi'^{2}}$ | $\sqrt{1+z_x^{2}+z_y^{2}}$ |
| Limits / region | lower limit must be smaller | projection region as a double integral |
| With $f=1$ | arc length | surface area |
| Typical meaning | mass of a wire, weighted length | mass of a shell, average temperature |

Both are linear, additive over the domain, independent of parametrization, and obey the absolute-value estimate; neither changes sign when the domain is flipped. The only real difference is dimension: one maps an interval to a curve, the other a plane region to a surface.

## Choosing a Parametrization and Using Symmetry

| Description of the curve | Arc element | When to use |
| --- | --- | --- |
| $y=y(x)$ | $\sqrt{1+y'^{2}}\,dx$ | the curve is a function of $x$, and $x$ is monotone |
| $x=\varphi(t),\ y=\psi(t)$ | $\sqrt{\varphi'^{2}+\psi'^{2}}\,dt$ | circles, ellipses, cycloids, closed curves |
| $r=r(\theta)$ | $\sqrt{r^{2}+r'^{2}}\,d\theta$ | simple in polar form, e.g. cardioids, spirals |

The polar form is where $r^{2}$ is most often dropped. It comes from expanding $x=r\cos\theta$, $y=r\sin\theta$:

$$
dx=\cos\theta\,dr-r\sin\theta\,d\theta,\qquad
dy=\sin\theta\,dr+r\cos\theta\,d\theta
$$

The cross terms cancel, leaving

$$
dx^{2}+dy^{2}=dr^{2}+r^{2}d\theta^{2}
=r'^{2}d\theta^{2}+r^{2}d\theta^{2}
$$

so $ds=\sqrt{r^{2}+r'^{2}}\,d\theta$. For constant $r$ this is $ds=r\,d\theta$, i.e. radius times central angle — the best anchor for memory.

Symmetry can delete an integral. The rule is **symmetry of the region plus parity of the integrand**, and the two must match.

- If $L$ is symmetric about the $y$-axis and $f(-x,y)=-f(x,y)$, then $\int_L f\,ds=0$;
- If $L$ is symmetric about the $y$-axis and $f(-x,y)=f(x,y)$, then $\int_L f\,ds=2\int_{L_{\text{right}}}f\,ds$;
- If $\Sigma$ is symmetric about the $xOy$ plane and $f(x,y,-z)=-f(x,y,z)$, then $\iint_\Sigma f\,dS=0$.

The symmetry maps the curve (surface) onto itself and preserves length (area), so the two halves contribute opposite amounts.

Example: for the circle $x^{2}+y^{2}=a^{2}$, $\int_L x\,ds=0$ because the circle is symmetric about the $y$-axis and $x$ is odd. On the same curve $\int_L(x^{2}+y^{2})\,ds=2\pi a^{3}$ had to be computed; that is what symmetry buys.

Polar check: $r=a$, $r'=0$, $ds=a\,d\theta$, so

$$
\int_L x\,ds=\int_0^{2\pi}a\cos\theta\cdot a\,d\theta
=a^{2}\int_0^{2\pi}\cos\theta\,d\theta=0
$$

> [!NOTE]
> Before using symmetry, check three things: the region is symmetric about that plane or axis; the integrand is odd or even in the corresponding variable; the element is unchanged by the symmetry. If one fails, the conclusion fails.

## Four Common Misconceptions

> [!MYTH] A first-kind line integral changes sign when traversed backwards.
> It does not. $ds>0$, so $\int_{AB}f\,ds=\int_{BA}f\,ds$. The second-kind integral changes sign because it uses the projections $dx$, $dy$.

> [!MYTH] The parameter interval can be written any way round.
> The lower limit must be smaller; otherwise $ds$ is paired with a negative $dt$ and the sign flips undetected. A first-kind integral sweeps its parameter in one direction only.

> [!MYTH] A surface integral is a double integral with $dS$ written as $dx\,dy$.
> A factor $\sqrt{1+z_x^{2}+z_y^{2}}$ sits in between, growing with the tilt; the two agree only for a surface parallel to a coordinate plane.

> [!MYTH] Since it ignores direction, a first-kind integral depends only on the endpoints.
> "Ignores direction" means both traversals of one path agree; "depends only on the endpoints" means different paths agree. The latter fails: the parabola $y=x^{2}$ and the segment $y=x$ share endpoints, yet $\int\sqrt{y}\,ds$ equals $0.848$ and $0.943$.

## Exercises

> [!PRACTICE] 1 · A segment
> Find $\int_L(x^{2}+y^{2})\,ds$, where $L$ is the segment from $(0,0)$ to $(1,1)$.
>
> > [!ANSWER] Show answer
> > Take $x=y=t$, $0\le t\le1$, $ds=\sqrt2\,dt$, integrand $2t^{2}$, so $\displaystyle\int_0^1 2t^{2}\sqrt2\,dt=\frac{2\sqrt2}{3}$.

> [!PRACTICE] 2 · An arc
> Find $\int_L y\,ds$, where $L$ is the upper unit semicircle $x^{2}+y^{2}=1$, $y\ge0$.
>
> > [!ANSWER] Show answer
> > With $x=\cos t$, $y=\sin t$, $0\le t\le\pi$ and $ds=dt$, $\displaystyle\int_0^{\pi}\sin t\,dt=2$. The centroid formula gives the same: centroid height $\dfrac{2}{\pi}$ times length $\pi$.

> [!PRACTICE] 3 · A surface
> Find $\iint_\Sigma z\,dS$, where $\Sigma$ is the part of $z=1$ with $x^{2}+y^{2}\le1$.
>
> > [!ANSWER] Show answer
> > Here $z_x=z_y=0$, so $dS=dx\,dy$ and the integrand is $1$; the answer is the disk area $\pi$.

> [!PRACTICE] 4 · Simplify on the curve
> Find $\int_L(x^{2}+y^{2})\,ds$, where $L$ is the circle $x^{2}+y^{2}=2x$.
>
> > [!ANSWER] Show answer
> > On $L$, $x^{2}+y^{2}=2x$, so the integral is $2\int_L x\,ds$. The curve is the circle of centre $(1,0)$ and radius $1$, length $2\pi$, centroid $x$-coordinate $1$; hence $\int_L x\,ds=2\pi$ and the answer is $4\pi$.

> [!PRACTICE] 5 · A cone
> Find $\iint_\Sigma(x^{2}+y^{2})\,dS$, where $\Sigma$ is the part of $z=\sqrt{x^{2}+y^{2}}$ with $0\le z\le2$.
>
> > [!ANSWER] Show answer
> > With $r=\sqrt{x^{2}+y^{2}}$, $z_x=\dfrac{x}{r}$, $z_y=\dfrac{y}{r}$, so $1+z_x^{2}+z_y^{2}=2$ and $dS=\sqrt2\,dx\,dy$. Over the disk $r\le2$, $\displaystyle\sqrt2\int_0^{2\pi}d\theta\int_0^{2}r^{3}\,dr=8\sqrt2\,\pi$.

## Precise Statement

> [!FORMAL] Precise statement
> Let $L$ be a rectifiable arc and $f$ bounded on $L$. Split $L$ into $n$ pieces of arc length $\Delta s_i$, take a sample point in each, and form $\sum f\Delta s_i$. If the sum tends to a constant $I$ independent of partition and samples as the largest arc length $\lambda\to0$, then $f$ is integrable on $L$ with respect to arc length and $I=\int_L f\,ds$. If $L$ has a continuously differentiable parametrization $x=\varphi(t)$, $y=\psi(t)$, $\alpha\le t\le\beta$, $\varphi'^{2}+\psi'^{2}\ne0$, then
> $$
> \int_L f\,ds=\int_{\alpha}^{\beta} f(\varphi(t),\psi(t))\sqrt{\varphi'(t)^{2}+\psi'(t)^{2}}\,dt
> $$
> independently of the parametrization. If $\Sigma$ is given by $z=z(x,y)$ with continuous partial derivatives over $D$, then
> $$
> \iint_\Sigma f\,dS=\iint_D f(x,y,z(x,y))\sqrt{1+z_x^{2}+z_y^{2}}\,dx\,dy
> $$
> Both integrals are orientation-free; with $f=1$ they give arc length and surface area. For continuous $f$ both exist and satisfy linearity, additivity, and $\left|\int f\right|\le\int|f|$.

## Connections with Other Lectures

- **With definite integrals**: the same cut-sum-limit template with $\Delta x$ replaced by $\Delta s$ or $\Delta S$; improper cases are handled by limits.
- **With parametrization**: all three forms of $ds$ come from parametrization, and the arc-length formula is the case $f=1$. The second-kind integral next lecture also lands on a parametrization, except that $x'(t)$, $y'(t)$ multiply $P$, $Q$ separately.
- **With double integrals**: a surface integral becomes a double integral over a projection, and the area element is exactly the substitution factor; polar coordinates, symmetry, and order-swapping all remain available.
- **With the next lecture**: replace $\Delta s_i$ by signed projections $\Delta x_i$, $\Delta y_i$ to get the second-kind line integral; replace $\Delta S_i$ by signed projections such as $\Delta S_{xy}$ to get the second-kind surface integral.
- **With field theory**: flux is a second-kind surface integral and circulation a second-kind line integral; "accumulate by area" is the prototype of flux, "accumulate by arc length" the prototype of circulation along a tangent.

In one sentence: this lecture answers "how to accumulate a scalar along length or area on a curved object", the next answers "how direction enters and how a boundary replaces an interior".