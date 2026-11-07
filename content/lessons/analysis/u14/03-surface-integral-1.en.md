---
slug: "surface-integral-1"
subject: "analysis"
unit: "u14"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Surface Integrals of the First Kind"
subtitle: "Accumulating density on a curved shell"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["lineint"]
prereq: ["lineint"]
related: ["lineint", "multipleint"]
---

## Goals

A first-kind surface integral accumulates a density on a surface into a mass, or accumulates the constant $1$ into surface area. By the end you can write $dS$ in both the explicit-graph and parametric forms, compute on graphs and parametrised surfaces, and use symmetry to see when an integral vanishes.

## Three-line recap

- A first-kind line integral accumulates along arc length; a first-kind surface integral accumulates along surface area.
- The key object is the surface element $dS$, not $dx\,dy$; it is $dx\,dy$ times an amplification factor.
- A surface has no preferred side, so a first-kind surface integral is independent of side.

## The surface element

Let $\Sigma$ be a smooth surface and $f$ bounded on it. Split $\Sigma$ into $n$ pieces of area $\Delta S_i$, choose $P_i$ on each, and form $\sum f(P_i)\Delta S_i$. If the sums tend to one number as the largest diameter tends to zero, write

$$\iint_\Sigma f\,dS.$$

With $f\equiv1$ this is surface area. If $f$ is surface density, the integral is the mass of the shell.

For a graph $z=z(x,y)$ over $D$, a small surface piece projects to area $dx\,dy$, and the cosine of the angle between the normal and the $z$-axis is $1/\sqrt{1+z_x^2+z_y^2}$. Hence

$$dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy.$$

For a parametric surface $\mathbf r(u,v)=(x,y,z)(u,v)$, the two tangent vectors span a small parallelogram of area $|\mathbf r_u\times\mathbf r_v|\,du\,dv$, so

$$dS=|\mathbf r_u\times\mathbf r_v|\,du\,dv.$$

The two forms agree: for the graph parametrised by $(x,y)$, $|\mathbf r_x\times\mathbf r_y|=\sqrt{1+z_x^2+z_y^2}$.

## Computing on a graph

Example: let $\Sigma$ be the upper hemisphere $z=\sqrt{R^2-x^2-y^2}$ and compute $\iint_\Sigma z\,dS$.

Since $z_x=-x/z$ and $z_y=-y/z$,

$$dS=\sqrt{1+\frac{x^2+y^2}{z^2}}\,dx\,dy=\frac{R}{z}\,dx\,dy.$$

Thus $z\,dS=R\,dx\,dy$, and the factor $z$ cancels exactly:

$$\iint_\Sigma z\,dS=R\iint_{x^2+y^2\le R^2}dx\,dy=R\cdot\pi R^2=\pi R^3.$$

The cancellation is not accidental: on a sphere, $z\,dS$ is $R$ times the projected area, a standard property of the spherical element.

Example: let $\Sigma$ be the part of $z=1-x-y$ in the first octant. Here $z_x=z_y=-1$, $dS=\sqrt3\,dx\,dy$, and the projection is $x\ge0$, $y\ge0$, $x+y\le1$:

$$\iint_\Sigma z\,dS=\sqrt3\iint_D(1-x-y)\,dx\,dy=\sqrt3\cdot\frac16=\frac{\sqrt3}{6}.$$

## Parametric surfaces and symmetry

Example: the lateral cylinder $\Sigma:x=R\cos\theta$, $y=R\sin\theta$, $0\le z\le1$. Compute

$$\mathbf r_\theta=(-R\sin\theta,R\cos\theta,0),\qquad \mathbf r_z=(0,0,1),$$

$$\mathbf r_\theta\times\mathbf r_z=(R\cos\theta,R\sin\theta,0),\qquad |\mathbf r_\theta\times\mathbf r_z|=R.$$

Hence $dS=R\,d\theta\,dz$ and

$$\iint_\Sigma z\,dS=\int_0^{2\pi}\int_0^1 zR\,dz\,d\theta=\pi R.$$

Geometrically, $R\,d\theta\,dz$ is the area of a flat rectangle after cutting and unrolling the cylinder: $2\pi R$ by $1$.

**Symmetry**: if $\Sigma$ is symmetric about the $xy$ plane and $f$ is odd in $z$, the integral is zero. On the sphere $x^2+y^2+z^2=R^2$, $\iint_\Sigma z\,dS=0$, while $\iint_\Sigma z^2\,dS=\frac13\iint_\Sigma R^2\,dS=\frac{4\pi R^4}{3}$.

## Three misconceptions

> [!MYTH] Just replace $dS$ by $dx\,dy$.
> That is valid only when the surface is parallel to the $xy$ plane. In general multiply by $\sqrt{1+z_x^2+z_y^2}$, or by $|\mathbf r_u\times\mathbf r_v|$ for a parametric surface.

> [!MYTH] A first-kind surface integral depends on the chosen side.
> It accumulates area and is independent of side. Choosing a side matters for the second-kind integral, the flux.

> [!MYTH] The area of the parameter domain is the surface area.
> A small piece $du\,dv$ is amplified by $|\mathbf r_u\times\mathbf r_v|$. For the cylinder parametrised by $(\theta,z)$, the parameter domain has area $2\pi$ while the true lateral area is $2\pi R$.

## Practice

> [!PRACTICE] 1 · Cone
> For $\Sigma:z=\sqrt{x^2+y^2}$, $0\le z\le1$, compute $\iint_\Sigma z\,dS$.
>
> > [!ANSWER] Show answer
> > $z_x=x/z$, $z_y=y/z$, so $dS=\sqrt2\,dx\,dy$. The projection is the unit disk, and $\iint_\Sigma z\,dS=\sqrt2\int_0^{2\pi}\int_0^1 r\cdot r\,dr\,d\theta=\frac{2\sqrt2\pi}{3}$.

> [!PRACTICE] 2 · Sphere
> For the sphere $x^2+y^2+z^2=R^2$, compute $\iint_\Sigma(x^2+y^2+z^2)\,dS$.
>
> > [!ANSWER] Show answer
> > The integrand is constantly $R^2$ and the area is $4\pi R^2$, so the value is $4\pi R^4$.

> [!PRACTICE] 3 · Cylinder
> For the lateral surface $x^2+y^2=R^2$, $0\le z\le1$, compute $\iint_\Sigma z\,dS$.
>
> > [!ANSWER] Show answer
> > $dS=R\,d\theta\,dz$, so the integral is $\int_0^{2\pi}\int_0^1 zR\,dz\,d\theta=\pi R$.

> [!PRACTICE] 4 · Plane piece
> For the part of $z=1-x-y$ in the first octant, compute $\iint_\Sigma z\,dS$.
>
> > [!ANSWER] Show answer
> > $dS=\sqrt3\,dx\,dy$ and $\iint(1-x-y)\,d\sigma=\frac16$ over the projected triangle, so the value is $\frac{\sqrt3}{6}$.

> [!FORMAL] Formal statement
> Let $\Sigma$ be a smooth surface and $f$ bounded on it. For a partition with pieces of area $\Delta S_i$, if $\sum f(P_i)\Delta S_i$ tends to $I$ as the largest diameter tends to zero, uniformly in the sample points, write $I=\iint_\Sigma f\,dS$. If $\Sigma$ is a $C^1$ parametric surface $\mathbf r(u,v)$ over $D$ with $\mathbf r_u\times\mathbf r_v\neq0$, then $\iint_\Sigma f\,dS=\iint_D f(\mathbf r(u,v))|\mathbf r_u\times\mathbf r_v|\,du\,dv$, independent of the parametrisation.
