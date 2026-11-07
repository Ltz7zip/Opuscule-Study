---
slug: "triple-integral"
subject: "analysis"
unit: "u13"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Triple Integrals and Curvilinear Coordinates"
subtitle: "Choose the right volume element and half the work is done"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint"]
---

## Goals

A triple integral replaces area times height with volume times density. By the end you can state the partition definition, reduce a triple integral to one integral plus a double integral by projection or by slicing, and write the correct volume element in cylindrical and spherical coordinates for spheres, cones, and their intersections.

## Three-line recap

- A double integral cuts a plane region; a triple integral cuts a solid.
- Each piece contributes its volume $\Delta V_i$ times the value of $f$ at a sample point.
- Good coordinates turn boundaries into constants and add only a simple factor to the volume element.

## Partition and volume

Let $\Omega\subset\mathbb{R}^3$ be closed and bounded with volume $V(\Omega)$. Cut it into $n$ pieces of volume $\Delta V_i$, choose $(\xi_i,\eta_i,\zeta_i)$ in each, and form

$$\sum_{i=1}^n f(\xi_i,\eta_i,\zeta_i)\,\Delta V_i.$$

If, as the largest diameter tends to zero, this sum tends to the same number $I$ for every partition and every choice of samples, then $f$ is integrable and

$$\iiint_\Omega f\,dV=\iiint_\Omega f(x,y,z)\,dx\,dy\,dz=I.$$

Everything parallels the double integral: continuous functions on closed solids are integrable, and bounded functions whose discontinuities have volume zero are integrable. Taking $f\equiv1$ gives $V(\Omega)=\iiint_\Omega dV$: a triple integral is first of all a weighted volume.

## Projection and slicing

**Projection** (one integral, then a double integral). If

$$\Omega=\{(x,y,z):(x,y)\in D,\ z_1(x,y)\le z\le z_2(x,y)\},$$

then

$$\iiint_\Omega f\,dV=\iint_D\left(\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)\,dz\right)dx\,dy.$$

Integrate along a vertical line first, then integrate over the shadow $D$.

**Slicing** (a double integral, then one integral). If $c\le z\le d$ and $\Omega_z$ is the horizontal cross-section at height $z$, then

$$\iiint_\Omega f\,dV=\int_c^d\left(\iint_{\Omega_z}f(x,y,z)\,dx\,dy\right)dz.$$

When the cross-sections are disks or ellipses but the vertical boundary is messy, slicing is cheaper.

## Cylindrical coordinates

$$x=r\cos\theta,\qquad y=r\sin\theta,\qquad z=z.$$

The Jacobian is $r$, so

$$dV=r\,dr\,d\theta\,dz.$$

Example: for the cylinder $x^2+y^2\le1$, $0\le z\le1$, compute $\iiint_\Omega z\,dV$:

$$\int_0^{2\pi}\int_0^1\int_0^1 z\cdot r\,dz\,dr\,d\theta=2\pi\cdot\frac12\cdot\frac12=\frac{\pi}{2}.$$

Cylindrical coordinates suit solids symmetric about the $z$-axis with top and bottom given as graphs over the $xy$ plane. The signal is $x^2+y^2$ appearing together while $z$ appears alone.

## Spherical coordinates

$$x=\rho\sin\varphi\cos\theta,\qquad y=\rho\sin\varphi\sin\theta,\qquad z=\rho\cos\varphi,$$

with $\rho\ge0$, $\varphi\in[0,\pi]$ measured from the positive $z$-axis, and $\theta\in[0,2\pi]$. The Jacobian is $\rho^2\sin\varphi$, so

$$dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta.$$

**Ball.** For $0\le\rho\le R$, $0\le\varphi\le\pi$, $0\le\theta\le2\pi$,

$$V=\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=2\pi\cdot2\cdot\frac{R^3}{3}=\frac{4\pi R^3}{3}.$$

**Sphere cut by a cone.** Take $\rho\le R$ and $\varphi\le\frac{\pi}{4}$:

$$V=\int_0^{2\pi}\int_0^{\pi/4}\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=2\pi\cdot\frac{R^3}{3}\left(1-\frac{\sqrt2}{2}\right).$$

Note that $\varphi$ runs from $0$ to $\pi$, not $0$ to $2\pi$. Treating $\varphi$ as longitude is the standard error.

## Three misconceptions

> [!MYTH] In cylindrical coordinates $dV=dr\,d\theta\,dz$.
> The factor $r$ is missing. The map $x=r\cos\theta$, $y=r\sin\theta$ has Jacobian $r$, so the area element is $r\,dr\,d\theta$, multiplied by $dz$.

> [!MYTH] The angle $\varphi$ in spherical coordinates is latitude.
> It is the polar angle from the positive $z$-axis, ranging over $[0,\pi]$. Latitude is measured from the equator over $[-\pi/2,\pi/2]$, shifted by $\pi/2$, and it changes the volume element.

> [!MYTH] A triple integral must integrate over $z$ first.
> The order is dictated by the region. Projection integrates $z$ first; slicing integrates it last. Both are valid; choose the one with simpler limits.

## Practice

> [!PRACTICE] 1 · Cylindrical
> For $x^2+y^2\le1$, $0\le z\le1$, compute $\iiint_\Omega z\,dV$.
>
> > [!ANSWER] Show answer
> > $\int_0^{2\pi}\int_0^1\int_0^1 zr\,dz\,dr\,d\theta=2\pi\cdot\frac12\cdot\frac12=\frac{\pi}{2}$.

> [!PRACTICE] 2 · Spherical
> Find the volume of the upper hemisphere $x^2+y^2+z^2\le R^2$, $z\ge0$.
>
> > [!ANSWER] Show answer
> > $\varphi\in[0,\pi/2]$, so $V=\int_0^{2\pi}\int_0^{\pi/2}\int_0^R\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac{2\pi R^3}{3}$, exactly half the ball.

> [!PRACTICE] 3 · A symmetric integral
> Compute $\iiint_\Omega z^2\,dV$ over the unit ball.
>
> > [!ANSWER] Show answer
> > With $z^2=\rho^2\cos^2\varphi$, $\int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cos^2\varphi\cdot\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac15\cdot2\pi\cdot\frac23=\frac{4\pi}{15}$.

> [!PRACTICE] 4 · Set up only
> For the cone $z^2=x^2+y^2$, $0\le z\le1$, write the volume in cylindrical coordinates and evaluate.
>
> > [!ANSWER] Show answer
> > $0\le r\le z\le1$, so $V=\int_0^{2\pi}\int_0^1\int_0^z r\,dr\,dz\,d\theta=2\pi\int_0^1\frac{z^2}{2}dz=\frac{\pi}{3}$.

> [!FORMAL] Formal statement
> Let $\Omega\subset\mathbb{R}^3$ be closed and bounded, $f$ bounded. Integrability means there is $I$ such that for every $\varepsilon>0$ some $\delta>0$ makes $\left|\sum f(\xi_i,\eta_i,\zeta_i)\Delta V_i-I\right|<\varepsilon$ whenever the largest diameter is below $\delta$, uniformly in the sample points. If $\Omega=\{(x,y,z):(x,y)\in D,\ z_1(x,y)\le z\le z_2(x,y)\}$ and $f$ is continuous, the integral equals $\iint_D dx\,dy\int_{z_1}^{z_2}f\,dz$. Cylindrical and spherical coordinates use $dV=r\,dr\,d\theta\,dz$ and $dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$.
