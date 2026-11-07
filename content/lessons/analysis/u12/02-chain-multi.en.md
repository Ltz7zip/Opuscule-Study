---
slug: "chain-multi"
subject: "analysis"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Chain Rule and Directional Derivatives"
subtitle: "How fast does it change in an arbitrary direction?"
minutes: 15
meta: ["15 min read","Requires elementary mathematics","Mastery level"]
concepts: ["partial"]
prereq: ["partial"]
related: ["partial", "field"]
---

## Goal

By the end of this lecture you can differentiate a composition with the chain rule, compute a directional derivative along any unit vector, and explain why the gradient points in the direction of steepest ascent.

The chain rule adds the contributions of every intermediate path; directional derivatives extend partials from the coordinate axes to arbitrary directions. Together they set the stage for the gradient.

## Three-line recap

- A partial derivative of a composition is the sum of the contributions from all intermediate paths.
- A directional derivative measures change along a unit vector $l$; when $f$ is differentiable it equals $\nabla f\cdot l$.
- The gradient points toward steepest ascent, and its length is the maximal rate.

## Chain rule and the Jacobian

Let $z=f(u,v)$, $u=u(x,y)$, $v=v(x,y)$, with continuous partials. Then
$$\frac{\partial z}{\partial x}=f_u\frac{\partial u}{\partial x}+f_v\frac{\partial v}{\partial x},\qquad
\frac{\partial z}{\partial y}=f_u\frac{\partial u}{\partial y}+f_v\frac{\partial v}{\partial y}.$$
In matrix form,
$$\begin{pmatrix}\dfrac{\partial z}{\partial x}&\dfrac{\partial z}{\partial y}\end{pmatrix}
=\begin{pmatrix}f_u&f_v\end{pmatrix}
\begin{pmatrix}u_x&u_y\\v_x&v_y\end{pmatrix}.$$
The last matrix is the Jacobian of $(u,v)$; the chain rule is matrix multiplication.

Sum over every path. If $w=f(x,y,z)$ with $x=x(t)$, $y=y(t)$, $z=z(t)$, then
$$\frac{\mathrm dw}{\mathrm dt}=f_x x'(t)+f_y y'(t)+f_z z'(t).$$
Omitting a term omits a path from $t$ to $w$.

## A composite, by hand

Take $z=u^2v$ with $u=x+y$ and $v=xy$. Then
$$z_x=2uv\cdot1+u^2\cdot y=2(x+y)xy+(x+y)^2y.$$
At $(1,1)$, $u=2$ and $v=1$, so $z_x=4+4=8$. Checking directly with $z=xy(x+y)^2$,
$$z_x=y(x+y)^2+2xy(x+y),$$
which is $4+4=8$ at $(1,1)$.

For polar coordinates $x=r\cos\theta$, $y=r\sin\theta$, the same rule gives
$$\frac{\partial z}{\partial r}=f_x\cos\theta+f_y\sin\theta,\qquad
\frac{\partial z}{\partial\theta}=-f_xr\sin\theta+f_y r\cos\theta,$$
the gradient projected onto the radial and angular directions.

## Directional derivatives

Let $l=(l_1,l_2)$ be a unit vector. The **directional derivative** of $f$ at $a$ along $l$ is
$$D_lf(a)=\lim_{t\to0}\frac{f(a+tl)-f(a)}{t}.$$
If $f$ is differentiable at $a$, then
$$D_lf(a)=\nabla f(a)\cdot l=f_x(a)l_1+f_y(a)l_2.$$
For $f(x,y)=x^2+xy$, $\nabla f=(2x+y,x)$, which is $(4,1)$ at $(1,2)$. With $l=(3/5,4/5)$,
$$D_lf=(4,1)\cdot(3/5,4/5)=\frac{16}{5}.$$
With $l=(-1,0)$, $D_lf=-4$: it decreases in the negative $x$ direction.

Directional derivatives can exist without differentiability. For $g(x,y)=\frac{x^2y}{x^2+y^2}$ with $g(0,0)=0$ and $l=(\cos\theta,\sin\theta)$,
$$D_lg(0)=\lim_{t\to0}\frac{g(t\cos\theta,t\sin\theta)}{t}=\cos^2\theta\sin\theta.$$
Every direction exists, yet $g$ is not differentiable at the origin: directional derivatives do not test differentiability.

## Gradient: steepest ascent and level sets

Cauchy–Schwarz gives
$$|D_lf|=|\nabla f\cdot l|\le\|\nabla f\|\,\|l\|=\|\nabla f\|,$$
with equality exactly when $l$ is parallel to $\nabla f$. Therefore, when $\nabla f(a)\ne0$, steepest ascent is along $\nabla f(a)/\|\nabla f(a)\|$ with rate $\|\nabla f(a)\|$; steepest descent is the opposite direction; directions orthogonal to $\nabla f(a)$ have zero rate.

For $f(x,y)=x^2+xy$ at $(1,2)$, $\|\nabla f\|=\sqrt{17}\approx4.12$, and the steepest ascent direction is $(4,1)/\sqrt{17}$.

On a level curve $f(x,y)=c$, if $\gamma(t)$ moves along the curve, then
$$\frac{\mathrm d}{\mathrm dt}f(\gamma(t))=\nabla f(\gamma(t))\cdot\gamma'(t)=0,$$
so the gradient is perpendicular to the tangent, hence to the level curve. For $f=x^2+y^2$ the level curves are circles, and $(2x,2y)$ points radially outward.

> [!NOTE]
> Both “the gradient is normal to level sets” and “$D_lf=\nabla f\cdot l$” assume differentiability. With only partial derivatives, these geometric conclusions can fail.

## Three misconceptions

> [!MYTH] If all directional derivatives exist, the function is differentiable.
> $g(x,y)=\frac{x^2y}{x^2+y^2}$ has $D_lg(0)=\cos^2\theta\sin\theta$ in every unit direction, yet is not differentiable. Checking directions one at a time only probes one-dimensional slices.

> [!MYTH] Every directional derivative equals the projection of the gradient.
> The projection formula needs differentiability. With only partials, or only directional derivatives, it may fail; in the counterexample above the gradient does not even exist.

> [!MYTH] The chain rule means multiplying partials.
> It means summing over all intermediate paths. For $z=f(u,v)$ with respect to $x$, the derivative is $f_u u_x+f_v v_x$; writing only $f_u u_x$ drops the path through $v$.

## Practice

> [!PRACTICE] 1 · Chain rule
> Let $z=u^2+v^2$, $u=x+y$, $v=x-y$. Find $z_x$ and $z_y$.
>
> > [!ANSWER] Show answer
> > $z_x=2u+2v=2(x+y)+2(x-y)=4x$; $z_y=2u-2v=2(x+y)-2(x-y)=4y$. Substituting $z=2x^2+2y^2$ directly gives the same result.

> [!PRACTICE] 2 · Directional derivative
> For $f(x,y)=x^2y$, find the derivative at $(1,2)$ along $l=(1/\sqrt2,1/\sqrt2)$.
>
> > [!ANSWER] Show answer
> > $\nabla f=(2xy,x^2)$, which is $(4,1)$ at $(1,2)$. Hence $D_lf=(4+1)/\sqrt2=5/\sqrt2\approx3.54$.

> [!PRACTICE] 3 · Steepest ascent
> For $f(x,y)=x^2+y^2-2x$ at $(2,1)$, which direction gives the fastest increase, and at what rate?
>
> > [!ANSWER] Show answer
> > $\nabla f=(2x-2,2y)=(2,2)$ at $(2,1)$. The steepest ascent direction is $(1,1)/\sqrt2$, and the maximal rate is $\|\nabla f\|=2\sqrt2\approx2.83$.

> [!PRACTICE] 4 · Several variables
> Let $w=x^2+y^2+z^2$ with $x=t$, $y=t^2$, $z=t^3$. Find $\mathrm dw/\mathrm dt$.
>
> > [!ANSWER] Show answer
> > $\mathrm dw/\mathrm dt=2x+2y\cdot2t+2z\cdot3t^2=2t+4t^3+6t^5$. Differentiating $w=t^2+t^4+t^6$ directly gives the same expression.

## Formal statement

> [!FORMAL] Formal statement
> If $f(u,v)$ is differentiable at $(u_0,v_0)$ and $u(x,y),v(x,y)$ are differentiable at $(x_0,y_0)$ with $(u_0,v_0)=(u(x_0,y_0),v(x_0,y_0))$, then $z=f(u,v)$ is differentiable at $(x_0,y_0)$ and $z_x=f_u u_x+f_v v_x$, $z_y=f_u u_y+f_v v_y$. If $f$ is differentiable at $a$, then for every unit vector $l$, $D_lf(a)=\nabla f(a)\cdot l$, so $|D_lf(a)|\le\|\nabla f(a)\|$, with equality exactly when $l$ is parallel to $\nabla f(a)$.
