---
slug: "line-integral-2"
subject: "analysis"
unit: "u14"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Line Integrals of the Second Kind and Green's Theorem"
subtitle: "Work along an oriented curve, then trade the boundary for an area integral"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["lineint", "field"]
prereq: ["lineint"]
related: ["field", "lineint"]
---

## Goals

A second-kind line integral computes the work done by a force along an oriented curve: at each point only the tangential component counts. By the end you can state the definition of $\int_C P\,dx+Q\,dy$, identify the positive boundary orientation, apply Green's theorem to convert a closed-curve integral into a double integral, and distinguish the cases where path independence does and does not hold.

## Three-line recap

- A first-kind integral accumulates arc length and ignores direction.
- A second-kind integral accumulates coordinate increments; reversing the curve changes the sign.
- Green's theorem equates an integral over a closed curve with a double integral over the region inside.

## Oriented curves and the second-kind integral

Let $C$ be an oriented smooth curve from start to end. Split it into small arcs, let $\Delta x_i$ and $\Delta y_i$ be the coordinate increments of the $i$-th arc, choose $(\xi_i,\eta_i)$ on it, and form

$$\sum_{i=1}^n\left[P(\xi_i,\eta_i)\Delta x_i+Q(\xi_i,\eta_i)\Delta y_i\right].$$

When the limit exists, write

$$\int_C P\,dx+Q\,dy.$$

If the unit tangent is $(\cos\alpha,\cos\beta)$, this equals $\int_C(P\cos\alpha+Q\cos\beta)\,ds$: the second-kind integral is a first-kind integral weighted by the tangential projection, with orientation built in.

Basic facts:

- **Direction**: $\int_{-C}P\,dx+Q\,dy=-\int_CP\,dx+Q\,dy$.
- **Parametrisation**: with $x=x(t)$, $y=y(t)$ from $\alpha$ to $\beta$, $\int_C P\,dx+Q\,dy=\int_\alpha^\beta[P x'(t)+Q y'(t)]\,dt$, and the limits follow the orientation.

Example: for the segment from $(0,0)$ to $(1,1)$, compute $\int_C x\,dy-y\,dx$. Take $x=t$, $y=t$:

$$\int_0^1(t\cdot1-t\cdot1)\,dt=0.$$

Along this ray the form vanishes, which is a hint that it is a multiple of the angular form.

## Green's theorem

Let $D$ be a bounded closed region whose boundary $\partial D$ consists of finitely many piecewise smooth simple closed curves, and let $P,Q$ have continuous partial derivatives on $D$. Give $\partial D$ the **positive** orientation: the region lies on the left as the curve is traversed, that is, counterclockwise. Then

$$\oint_{\partial D}P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dx\,dy.$$

The integrand on the right is the scalar two-dimensional curl of the field.

Example: for the unit circle $C$ counterclockwise, compute

$$\oint_C(x^2-y)\,dx+(x+y^2)\,dy.$$

Here $P=x^2-y$, $Q=x+y^2$, so $Q_x=1$ and $P_y=-1$. Hence $Q_x-P_y=2$, the area is $\pi$, and the integral is $2\pi$. Direct parametrisation also works, but Green's theorem finishes in one line.

There is a punctured version: if $D$ has a hole, traverse the outer boundary counterclockwise and the inner boundary clockwise. The formula still holds, with the double integral over the annular region. This version handles integrands undefined inside the hole.

## Area from a line integral

In Green's theorem take $P=-y/2$ and $Q=x/2$. Then $Q_x-P_y=\frac12+\frac12=1$, so

$$A=\iint_D d\sigma=\frac12\oint_{\partial D}x\,dy-y\,dx.$$

For the ellipse $x=a\cos t$, $y=b\sin t$, $0\le t\le2\pi$, we have $dx=-a\sin t\,dt$ and $dy=b\cos t\,dt$, hence

$$x\,dy-y\,dx=ab\,dt,\qquad A=\frac12\int_0^{2\pi}ab\,dt=\pi ab.$$

This matches the change-of-variables computation and is shorter.

## Path independence and conservative fields

An integral $\int_C P\,dx+Q\,dy$ is **path independent** if it depends only on the endpoints. On a **simply connected** region $D$, the following are equivalent:

- $Q_x=P_y$ everywhere in $D$;
- the integral is path independent;
- there is a potential $u$ with $P=u_x$, $Q=u_y$, and then $\int_C P\,dx+Q\,dy=u(\text{end})-u(\text{start})$.

Example: $P=2xy$, $Q=x^2$. Then $P_y=2x=Q_x$, the plane is simply connected, so the integral is path independent, with $u=x^2y$. From $(0,0)$ to $(1,2)$ the value is $2$.

The simply-connected hypothesis cannot be dropped. Take

$$P=\frac{-y}{x^2+y^2},\qquad Q=\frac{x}{x^2+y^2}.$$

On the punctured plane $Q_x=P_y$ holds everywhere. Yet around the unit circle counterclockwise,

$$\oint P\,dx+Q\,dy=\int_0^{2\pi}1\,dt=2\pi\neq0.$$

So the integral is not path independent on the punctured plane. Its potential is the polar angle $\theta$, which increases by $2\pi$ after one turn and is not single-valued. Green's theorem also cannot be applied directly to the disk bounded by the whole circle, because the origin is a singular point.

## Three misconceptions

> [!MYTH] Green's theorem works for either orientation.
> The boundary must be positively oriented, with the region on the left. Clockwise adds a minus sign; reversing orientation is the most common sign error.

> [!MYTH] $Q_x=P_y$ alone implies path independence.
> The region must also be simply connected. The vortex field satisfies $Q_x=P_y$ on the punctured plane but gives $2\pi$ around the origin.

> [!MYTH] $\int_C P\,dx+Q\,dy$ is the same as $\int_C(P+Q)\,ds$.
> The first is an oriented coordinate integral; the second is an unoriented arc-length integral. The correct relation is $\int_C P\,dx+Q\,dy=\int_C(P\cos\alpha+Q\cos\beta)\,ds$.

## Practice

> [!PRACTICE] 1 · Green
> For the unit circle counterclockwise, compute $\oint_C(x^2-y)\,dx+(x+y^2)\,dy$.
>
> > [!ANSWER] Show answer
> > $Q_x-P_y=1-(-1)=2$ and the area is $\pi$, so the value is $2\pi$.

> [!PRACTICE] 2 · Area
> Use a line integral to find the area of $x^2/a^2+y^2/b^2\le1$.
>
> > [!ANSWER] Show answer
> > With $x=a\cos t$, $y=b\sin t$, $A=\frac12\int_0^{2\pi}ab\,dt=\pi ab$.

> [!PRACTICE] 3 · Path independence
> Compute $\int_{(0,0)}^{(1,2)}2xy\,dx+x^2\,dy$.
>
> > [!ANSWER] Show answer
> > $P_y=2x=Q_x$, and $u=x^2y$, so the value is $u(1,2)-u(0,0)=2$.

> [!PRACTICE] 4 · Singularity
> For $P=\frac{-y}{x^2+y^2}$, $Q=\frac{x}{x^2+y^2}$, compute the integral around the unit circle counterclockwise and explain why Green's theorem cannot give zero.
>
> > [!ANSWER] Show answer
> > Parametrise $x=\cos t$, $y=\sin t$; then $P\,dx+Q\,dy=dt$ and the value is $2\pi$. The field is undefined at the origin, so it is not $C^1$ on the closed disk required by Green's theorem.

> [!FORMAL] Formal statement
> Let $D$ be a bounded closed region whose boundary consists of finitely many piecewise smooth simple closed curves, positively oriented. If $P,Q\in C^1(D)$, then $\oint_{\partial D}P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dx\,dy$. If $D$ is simply connected and $P,Q\in C^1(D)$, then $Q_x=P_y$ is equivalent to path independence, and equivalent to the existence of $u\in C^2(D)$ with $\nabla u=(P,Q)$; in that case $\int_C P\,dx+Q\,dy=u(B)-u(A)$.
