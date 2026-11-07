---
slug: "multiple-change"
subject: "analysis"
unit: "u13"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Change of Variables in Multiple Integrals"
subtitle: "The Jacobian is the local area factor"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["multipleint", "partial"]
---

## Goals

Change of variables exists because some regions are painful in $x,y$: disks, ellipses, regions bounded by curved surfaces. By the end you can state the two-dimensional change-of-variables formula, explain where the Jacobian comes from, use polar coordinates fluently, and compute the ellipse area and the Gaussian integral.

## Three-line recap

- In one dimension, $dx=x'(t)\,dt$: the derivative rescales length.
- In two dimensions, a small piece of the $(u,v)$ plane maps to a small parallelogram in the $(x,y)$ plane.
- Its area rescaling factor is the absolute value of the Jacobian determinant.

## The formula and the Jacobian

Let

$$x=x(u,v),\qquad y=y(u,v)$$

have continuous partial derivatives on a region $D'$, map $D'$ one-to-one onto $D$ except possibly on a set of area zero, and have nonzero Jacobian

$$J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u & x_v\\ y_u & y_v\end{vmatrix}$$

in the interior. If $f$ is continuous on $D$, then

$$\iint_D f(x,y)\,dx\,dy=\iint_{D'}f\big(x(u,v),y(u,v)\big)\,|J|\,du\,dv.$$

The geometry: a small rectangle $du\times dv$ maps to a parallelogram spanned by $\mathbf{r}_u\,du$ and $\mathbf{r}_v\,dv$, whose area is $|J|\,du\,dv$. Change of variables is therefore a piece-by-piece conversion of area, not a formal trick.

For the linear map $x=2u+v$, $y=u+3v$, we get $J=2\cdot3-1\cdot1=5$. The unit square in the $uv$ plane maps to a parallelogram of area $5$, matching $|J|$.

## Polar coordinates

$$x=r\cos\theta,\qquad y=r\sin\theta,\qquad J=\begin{vmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{vmatrix}=r.$$

Hence $dx\,dy=r\,dr\,d\theta$. The factor $r$ is not decorative: far from the origin, the same $dr\,d\theta$ covers more actual area.

Example: compute $\iint_D\sqrt{x^2+y^2}\,d\sigma$ over the unit disk. The integrand is $r$, and $0\le r\le1$, $0\le\theta\le2\pi$:

$$\int_0^{2\pi}\int_0^1 r\cdot r\,dr\,d\theta=2\pi\cdot\frac13=\frac{2\pi}{3}.$$

Dropping the Jacobian factor would give the wrong value $2\pi\cdot\frac12=\pi$. The entire difference is that one $r$.

## Ellipse area and the Gaussian integral

**Ellipse.** For $D:\frac{x^2}{a^2}+\frac{y^2}{b^2}\le1$, set $x=ar\cos\theta$, $y=br\sin\theta$. Then $0\le r\le1$, $0\le\theta\le2\pi$, and

$$J=\begin{vmatrix}a\cos\theta & -ar\sin\theta\\ b\sin\theta & br\cos\theta\end{vmatrix}=abr.$$

The area is $\int_0^{2\pi}\int_0^1 abr\,dr\,d\theta=2\pi\cdot\frac{ab}{2}=\pi ab$. Setting $a=b=R$ recovers $\pi R^2$.

**Gaussian integral.** Let $I=\int_{-\infty}^{\infty}e^{-x^2}dx$. Then

$$I^2=\iint_{\mathbb{R}^2}e^{-(x^2+y^2)}dx\,dy=\int_0^{2\pi}\int_0^{\infty}e^{-r^2}r\,dr\,d\theta=2\pi\cdot\frac12=\pi.$$

So $I=\sqrt\pi$. The finite version is just as clean: $\iint_{x^2+y^2\le R^2}e^{-(x^2+y^2)}d\sigma=\pi(1-e^{-R^2})$, which tends to $\pi$ as $R\to\infty$.

## A checklist before transforming

Run four checks in order:

- **Correspondence**: is the map one-to-one inside the region? Are overlaps or omissions of area zero?
- **Smoothness**: are partial derivatives continuous, and is $J\neq0$ inside? Points with $J=0$ are degenerate and need separate handling.
- **Region**: do the new limits describe the same region? Translate each boundary, not only the integrand.
- **Absolute value**: use $|J|$. A one-dimensional substitution may carry a sign; area cannot be negative.

A common failure is changing the integrand but not the region. Writing the disk as $0\le r\le1$, $0\le\theta\le\pi$ describes only the upper half, so the answer is half of the truth.

## Three misconceptions

> [!MYTH] In polar coordinates $dx\,dy=dr\,d\theta$.
> The factor $r$ is missing. The area element is $r\,dr\,d\theta$, exactly the Jacobian of the polar map.

> [!MYTH] A negative Jacobian should be used with its sign.
> Double integrals use $|J|$. The sign records orientation reversal; area itself is nonnegative.

> [!MYTH] Change of variables only changes the integrand.
> Integrand, area element, and region all change. Changing one of the three computes a different integral.

## Practice

> [!PRACTICE] 1 · Linear map
> Let $u=x+y$, $v=x-y$. Find $\frac{\partial(x,y)}{\partial(u,v)}$ and the area of the image of $0\le u,v\le1$.
>
> > [!ANSWER] Show answer
> > From $x=(u+v)/2$, $y=(u-v)/2$, $J=-\frac12$, so $|J|=\frac12$. The image has area $1\cdot\frac12=\frac12$.

> [!PRACTICE] 2 · Polar
> Compute $\iint_D x^2\,d\sigma$ over the unit disk.
>
> > [!ANSWER] Show answer
> > $\int_0^{2\pi}\int_0^1 r^2\cos^2\theta\cdot r\,dr\,d\theta=\frac14\cdot\pi=\frac{\pi}{4}$. By symmetry $x^2$ and $y^2$ have equal integrals, each half of $\frac{\pi}{2}$.

> [!PRACTICE] 3 · Ellipse
> Find the area of $\frac{x^2}{4}+y^2\le1$ and compute $\iint_D y^2\,d\sigma$.
>
> > [!ANSWER] Show answer
> > Area $=\pi\cdot2\cdot1=2\pi$. With $x=2r\cos\theta$, $y=r\sin\theta$, $|J|=2r$, so $\int_0^{2\pi}\int_0^1 r^2\sin^2\theta\cdot2r\,dr\,d\theta=2\cdot\frac14\cdot\pi=\frac{\pi}{2}$.

> [!PRACTICE] 4 · Diagnose
> Someone writes a disk integral as $\int_0^1dr\int_0^{2\pi}f(r\cos\theta,r\sin\theta)\,d\theta$. What is wrong?
>
> > [!ANSWER] Show answer
> > The factor $r$ in the area element is missing. It should be $\int_0^1 r\,dr\int_0^{2\pi}f\,d\theta$.

> [!FORMAL] Formal statement
> Let $D'\subset\mathbb{R}^2$ be closed and bounded, $\Phi(u,v)=(x(u,v),y(u,v))$ continuously differentiable and one-to-one in the interior, with $J=\partial(x,y)/\partial(u,v)\neq0$ there, and $D=\Phi(D')$. If $f$ is continuous on $D$, then $\iint_D f(x,y)\,dx\,dy=\iint_{D'}f(\Phi(u,v))\,|J(u,v)|\,du\,dv$. The proof linearises $\Phi$ on small rectangles, where the local area factor is $|J|$, and then passes to the limit over partitions.
