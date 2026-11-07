---
slug: "multiple-app"
subject: "analysis"
unit: "u13"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Applications of Multiple Integrals"
subtitle: "Area, centroid, inertia — same integral, different integrand"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "lineint"]
---

## Goals

Applications of multiple integrals need no new theory. The task is always to write a geometric or physical quantity as density times a small element, then integrate. By the end you can compute surface area with a double integral, compute mass, centroid, and moment of inertia from a density, and decide whether a quantity calls for one, two, or three integrals.

## Three-line recap

- Integration is summing infinitesimals: write the contribution of one small piece, then let it fill the region.
- The area element is $d\sigma$, the volume element is $dV$, the surface element is $dS$.
- Mass, centroid, and inertia differ only in the integrand; the region and the integral stay the same.

## Area, volume, surface area

Plane area is $A=\iint_D d\sigma$. The volume under a nonnegative graph $z=f(x,y)$ is $V=\iint_D f\,d\sigma$.

Surface area needs a conversion. If a surface is given by $z=z(x,y)$ over $D$, then

$$S=\iint_D\sqrt{1+z_x^2+z_y^2}\,dx\,dy.$$

The reason: a small surface piece projects to area $dx\,dy$, and the cosine of the angle between the normal and the $z$-axis is $1/\sqrt{1+z_x^2+z_y^2}$. Hence $dS=\sqrt{1+z_x^2+z_y^2}\,dx\,dy$.

**Sphere.** For the upper hemisphere $z=\sqrt{R^2-x^2-y^2}$, we have $z_x=-x/z$, $z_y=-y/z$, so

$$\sqrt{1+z_x^2+z_y^2}=\sqrt{1+\frac{x^2+y^2}{z^2}}=\frac{R}{z}.$$

Integrating over the disk $x^2+y^2\le R^2$,

$$S_{\text{upper}}=\int_0^{2\pi}\int_0^R\frac{R}{\sqrt{R^2-r^2}}\,r\,dr\,d\theta=2\pi R\cdot R=2\pi R^2.$$

Both halves give $4\pi R^2$, matching the sphere formula.

## Mass, centroid, inertia

For a lamina $D$ with density $\rho(x,y)$,

$$m=\iint_D\rho\,d\sigma,\qquad \bar x=\frac1m\iint_D x\rho\,d\sigma,\qquad \bar y=\frac1m\iint_D y\rho\,d\sigma.$$

The moment of inertia about the $z$-axis is

$$I_z=\iint_D(x^2+y^2)\rho\,d\sigma.$$

A uniform half-disk of radius $R$ is the standard check. Here $m=\frac{\pi R^2}{2}$, symmetry gives $\bar x=0$, and

$$\iint_D y\,d\sigma=\int_0^\pi\int_0^R r\sin\theta\cdot r\,dr\,d\theta=\frac{R^3}{3}\cdot2=\frac{2R^3}{3}.$$

Thus $\bar y=\frac{2R^3/3}{\pi R^2/2}=\frac{4R}{3\pi}\approx0.424R$. The centroid is neither at the centre of the disk nor on the arc.

For a uniform disk,

$$I_z=\int_0^{2\pi}\int_0^R r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac{R^4}{4}=\frac{\pi R^4}{2}.$$

Since $m=\pi R^2$, this is $I_z=\frac12mR^2$, the familiar textbook value.

## Average values and physical quantities

The average of $f$ over $D$ is

$$\bar f=\frac{1}{\sigma(D)}\iint_D f\,d\sigma.$$

For example, $f(x,y)=x^2+y^2$ has average $\frac{1}{\pi}\cdot\frac{\pi}{2}=\frac12$ on the unit disk, matching the polar computation from Lecture 1.

Triple integrals work identically: $m=\iiint_\Omega\rho\,dV$, $\bar z=\frac1m\iiint_\Omega z\rho\,dV$, and $I_z=\iiint_\Omega(x^2+y^2)\rho\,dV$.

To decide how many integrals are needed, look at the element: an element spread over a plane calls for two, one stacked in space calls for three, and one accumulated along a curve calls for a line integral in the next chapter.

## Three misconceptions

> [!MYTH] Surface area equals the area of its projection.
> They agree only when the surface is parallel to the $xy$ plane. In general multiply by $\sqrt{1+z_x^2+z_y^2}$; the hemisphere has twice the area of its shadow.

> [!MYTH] The centroid is the geometric centre.
> Only for uniform density and a symmetric region. With nonuniform density the centroid is determined by $\iint x\rho$ and $\iint y\rho$ and leans toward the denser side.

> [!MYTH] Rotational inertia is $\iint r^2\rho$ with $r$ the distance to the origin.
> For rotation about the $z$-axis, $r$ is the distance to that axis, namely $\sqrt{x^2+y^2}$, so the integrand is $x^2+y^2$. Measure the distance to the axis of rotation.

## Practice

> [!PRACTICE] 1 · Volume
> Find the volume bounded by $z=x^2+y^2$ and $z=1$.
>
> > [!ANSWER] Show answer
> > $V=\iint_{x^2+y^2\le1}(1-x^2-y^2)\,d\sigma=\int_0^{2\pi}\int_0^1(1-r^2)r\,dr\,d\theta=2\pi\left(\frac12-\frac14\right)=\frac{\pi}{2}$.

> [!PRACTICE] 2 · Centroid
> Find the centroid of a uniform half-disk of radius $R$.
>
> > [!ANSWER] Show answer
> > $m=\frac{\pi R^2}{2}$, $\bar x=0$, and $\iint_D y\,d\sigma=\frac{2R^3}{3}$, so $\bar y=\frac{4R}{3\pi}$.

> [!PRACTICE] 3 · Inertia
> For a uniform disk of radius $R$ and density $1$, find $I_z$ and write it as $kmR^2$.
>
> > [!ANSWER] Show answer
> > $I_z=\int_0^{2\pi}\int_0^R r^2\cdot r\,dr\,d\theta=\frac{\pi R^4}{2}$. Since $m=\pi R^2$, $I_z=\frac12mR^2$, so $k=\frac12$.

> [!PRACTICE] 4 · Surface area
> Find the area of the cone $z=\sqrt{x^2+y^2}$, $0\le z\le1$.
>
> > [!ANSWER] Show answer
> > $z_x=x/z$, $z_y=y/z$, so $\sqrt{1+z_x^2+z_y^2}=\sqrt2$. The projection is the unit disk, hence $S=\sqrt2\,\pi$.

> [!FORMAL] Formal statement
> If a surface $\Sigma$ is the graph $z=z(x,y)$ of a $C^1$ function over $D$, its area is defined as $\iint_D\sqrt{1+z_x^2+z_y^2}\,dx\,dy$, independent of the parametrisation. The average of a continuous $f$ on $D$ is $\frac{1}{\sigma(D)}\iint_D f\,d\sigma$. Centroid and inertia are $\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma$ and $I_z=\iint_D(x^2+y^2)\rho\,d\sigma$, where $m=\iint_D\rho\,d\sigma>0$.
