---
slug: "surface-integral-2"
subject: "analysis"
unit: "u14"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Surface Integrals of the Second Kind; Gauss and Stokes"
subtitle: "Flux through a surface, circulation around a boundary"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["lineint", "field"]
prereq: ["lineint"]
related: ["field", "lineint"]
---

## Goals

A second-kind surface integral measures flux through a surface and depends on the chosen side. By the end you can write flux in both forms, identify the outward side of a closed surface, use Gauss's theorem to replace flux by a triple integral, and use Stokes's theorem to replace circulation by the flux of curl.

## Three-line recap

- A first-kind surface integral accumulates area and ignores side; the second kind accumulates oriented area and changes sign with side.
- Flux measures how much crosses a surface; divergence measures how much leaves a point.
- Circulation measures rotation along a boundary; curl measures local rotation at a point.

## Oriented surfaces and flux

Choose a side of $\Sigma$, that is, a unit normal $\mathbf n=(\cos\alpha,\cos\beta,\cos\gamma)$ varying continuously. The second-kind surface integral is defined by

$$\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iint_\Sigma(P\cos\alpha+Q\cos\beta+R\cos\gamma)\,dS.$$

The right side is a first-kind integral, so computation can proceed by finding $dS$ and projecting. If $\Sigma$ is the graph $z=z(x,y)$ with the upper side, then

$$dx\,dy=\cos\gamma\,dS,\qquad \cos\gamma=\frac{1}{\sqrt{1+z_x^2+z_y^2}},$$

so the term $R\,dx\,dy$ becomes $\iint_D R(x,y,z(x,y))\,dx\,dy$.

**Reversing the side changes the sign**: $\iint_{-\Sigma}=-\iint_\Sigma$. A closed surface takes the outward side by default.

## Gauss's theorem

Let $\Omega$ be a bounded closed region bounded by a piecewise smooth closed surface $\partial\Omega$, let $P,Q,R$ have continuous partial derivatives on $\Omega$, and orient $\partial\Omega$ outward. Then

$$\oiint_{\partial\Omega}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV.$$

The integrand is the divergence $\nabla\cdot\mathbf F$.

Example: $\mathbf F=(x,y,z)$ through the sphere $x^2+y^2+z^2=R^2$ outward. The divergence is $3$, so the flux is $3\cdot\frac{4\pi R^3}{3}=4\pi R^3$. Directly, $\mathbf F\cdot\mathbf n=R$ on the sphere, and $R\cdot4\pi R^2=4\pi R^3$, as expected.

Example: $\mathbf F=(x^2,y^2,z^2)$ through the unit cube $[0,1]^3$. The divergence is $2x+2y+2z$; each term integrates to $1$, so the total flux is $3$.

## Stokes's theorem

Let $\Sigma$ be a smooth oriented surface with piecewise smooth boundary $\Gamma$, oriented consistently with the normal by the right-hand rule. Then

$$\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times\mathbf F)\cdot\mathbf n\,dS,$$

where

$$\nabla\times\mathbf F=(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y).$$

Example: $\mathbf F=(y,z,x)$, $\Gamma$ the unit circle in $z=0$ counterclockwise seen from $+z$, and $\Sigma$ the disk with normal $\mathbf k$. Then

$$\nabla\times\mathbf F=(-1,-1,-1),$$

so the flux of curl is $-\pi$. A direct check: on $z=0$ we have $dz=0$, and $\oint y\,dx$ around the unit circle counterclockwise is $-\pi$, matching.

## One theorem in three costumes

- **Green's theorem** is Stokes in the plane: take $\mathbf F=(P,Q,0)$; the $z$-component of curl is $Q_x-P_y$.
- **Gauss's theorem** turns flux through a closed surface into a volume integral of divergence.
- **The fundamental theorem of calculus** is the one-dimensional case: the change at the endpoints equals the integral of the derivative.

All three say: **an integral over a boundary equals an integral of a derivative inside**. Only the dimension and the form of the derivative change.

## Three misconceptions

> [!MYTH] Flux does not depend on the side.
> Reversing the side reverses the normal and changes the sign of the flux. Only first-kind integrals ignore side.

> [!MYTH] Gauss's theorem applies to any surface.
> The surface must be closed and bound a bounded region, and the field must be $C^1$ on that region. For an open surface, close it first.

> [!MYTH] Zero curl implies a conservative field.
> The region must also have no holes. In space with the $z$-axis removed, the vortex field around that axis has zero curl but nonzero circulation.

## Practice

> [!PRACTICE] 1 · Gauss
> For $\mathbf F=(x,y,z)$ through the sphere of radius $R$ outward, find the flux.
>
> > [!ANSWER] Show answer
> > Divergence $3$, volume $\frac{4\pi R^3}{3}$, flux $=4\pi R^3$.

> [!PRACTICE] 2 · Divergence integral
> For $\mathbf F=(x^3,y^3,z^3)$ through the unit sphere outward, find the flux.
>
> > [!ANSWER] Show answer
> > Divergence $=3(x^2+y^2+z^2)=3r^2$. Also $\iiint r^2\,dV=\int_0^{2\pi}\int_0^\pi\int_0^1\rho^4\sin\varphi\,d\rho\,d\varphi\,d\theta=\frac{4\pi}{5}$, so the flux is $\frac{12\pi}{5}$.

> [!PRACTICE] 3 · Stokes
> For $\mathbf F=(-y,x,z)$ around the unit circle in $z=0$ counterclockwise, find the circulation.
>
> > [!ANSWER] Show answer
> > $\nabla\times\mathbf F=(0,0,2)$, the disk normal is $\mathbf k$, so the value is $2\pi$. Directly, $\oint(-y\,dx+x\,dy)=\int_0^{2\pi}dt=2\pi$.

> [!PRACTICE] 4 · Close the surface
> Find the flux of $\mathbf F=(0,0,z)$ through the upper hemisphere $z=\sqrt{1-x^2-y^2}$, upper side.
>
> > [!ANSWER] Show answer
> > Close it with the base disk oriented outward. The divergence is $1$ and the hemisphere volume is $\frac{2\pi}{3}$. On the base, $\mathbf n=-\mathbf k$ and $\mathbf F\cdot\mathbf n=-z=0$, so the base flux is zero. The hemisphere flux is $\frac{2\pi}{3}$.

> [!FORMAL] Formal statement
> Let $\Omega$ be a bounded closed region with piecewise smooth boundary oriented outward, and $P,Q,R\in C^1(\Omega)$. Then $\oiint_{\partial\Omega}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega(P_x+Q_y+R_z)\,dV$. Let $\Sigma$ be a smooth oriented surface with piecewise smooth boundary $\Gamma$ oriented by the right-hand rule, and $P,Q,R\in C^1$. Then $\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(R_y-Q_z)\,dy\,dz+(P_z-R_x)\,dz\,dx+(Q_x-P_y)\,dx\,dy$.
