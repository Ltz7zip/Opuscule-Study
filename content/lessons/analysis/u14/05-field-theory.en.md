---
slug: "field-theory"
subject: "analysis"
unit: "u14"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Elements of Field Theory"
subtitle: "Gradient, divergence, curl — three derivatives, three jobs"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["field", "partial"]
prereq: ["field"]
related: ["field", "lineint"]
---

## Goals

The integral theorems of the previous lectures are tied together by three differential operators: gradient, divergence, and curl. By the end you can compute all three, prove the two basic identities, decide whether a vector field has a potential, and explain exactly what "zero curl" still lacks before it implies a conservative field.

## Three-line recap

- The gradient acts on a scalar field and returns a vector pointing toward fastest increase.
- The divergence acts on a vector field and returns a scalar measuring the strength of a source.
- The curl acts on a vector field and returns a vector measuring local rotation.

## Gradient, divergence, curl

Let $f$ be a scalar field and $\mathbf F=(P,Q,R)$ a vector field, with continuous partial derivatives.

$$\nabla f=(f_x,f_y,f_z),$$

$$\nabla\cdot\mathbf F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z},$$

$$\nabla\times\mathbf F=\begin{vmatrix}\mathbf i & \mathbf j & \mathbf k\\ \partial_x & \partial_y & \partial_z\\ P & Q & R\end{vmatrix}=\left(R_y-Q_z,\ P_z-R_x,\ Q_x-P_y\right).$$

Keep the input and output types straight: gradient takes scalar to vector, divergence takes vector to scalar, curl takes vector to vector.

Example: $\mathbf F=(x^2y,\ yz,\ x+z^2)$.

$$\nabla\cdot\mathbf F=2xy+z+2z=2xy+3z,$$

$$\nabla\times\mathbf F=(0-y,\ 0-1,\ 0-x^2)=(-y,\ -1,\ -x^2).$$

The divergence is a number, the curl is a vector. Do not mix them.

## Two identities

For $C^2$ functions and $C^2$ vector fields,

$$\nabla\times(\nabla f)=0,\qquad \nabla\cdot(\nabla\times\mathbf F)=0.$$

The first says a gradient field has no rotation. The second says a curl field has no source. Both follow from equality of mixed partials. For instance,

$$(\nabla\times\nabla f)_x=(f_z)_y-(f_y)_z=f_{zy}-f_{yz}=0.$$

The second identity is checked component by component, each component cancelling a pair of mixed partials.

These identities give necessary conditions: if $\mathbf F=\nabla u$, then $\nabla\times\mathbf F=0$; if $\mathbf F=\nabla\times\mathbf A$, then $\nabla\cdot\mathbf F=0$. Neither is sufficient, as the next section shows.

## Conservative fields and potentials

If $\mathbf F=\nabla u$ for some $u$, then $\mathbf F$ is **conservative** and $u$ is a **potential**. In that case

$$\int_A^B\mathbf F\cdot d\mathbf r=u(B)-u(A)$$

along every path; equivalently, the circulation around every closed curve is zero.

On a **simply connected** region, $\nabla\times\mathbf F=0$ is equivalent to the existence of a potential. The routine for finding one: integrate $u_x=P$ in $x$ to get $u=\int P\,dx+\varphi(y,z)$, then use $u_y=Q$ and $u_z=R$ to determine $\varphi$.

Example: $\mathbf F=(y+z,\ x+z,\ x+y)$. From $u_x=y+z$, $u=xy+xz+\varphi(y,z)$. Then $u_y=x+\varphi_y=x+z$ gives $\varphi_y=z$, so $\varphi=yz+\psi(z)$. Finally $u_z=x+y+\psi'(z)=x+y$, so $\psi'=0$. Take $u=xy+xz+yz$; indeed $\nabla u=\mathbf F$.

## The vortex and the shape of the region

On $\mathbb{R}^3$ with the $z$-axis removed, take

$$\mathbf F=\left(\frac{-y}{x^2+y^2},\ \frac{x}{x^2+y^2},\ 0\right).$$

A direct computation gives $\nabla\times\mathbf F=0$. Yet around the unit circle in $z=0$ counterclockwise,

$$\oint\mathbf F\cdot d\mathbf r=\int_0^{2\pi}dt=2\pi\neq0.$$

So no single-valued potential exists on the punctured region. Locally the potential is the polar angle $\theta$, which increases by $2\pi$ after one turn. Zero curl is equivalent to conservativeness only on simply connected regions.

This also explains why physicists often treat irrotational and conservative as synonyms: the region is assumed hole-free. Once the region is annular or punctured, circulation around the hole must be checked separately.

## Three misconceptions

> [!MYTH] Divergence is a vector.
> Divergence is a scalar measuring source strength per unit volume; curl is the vector. Writing $\nabla\cdot\mathbf F$ as a vector is a type error.

> [!MYTH] Zero curl everywhere guarantees a potential.
> The region must also be simply connected. The vortex field has zero curl on the punctured plane but circulation $2\pi$ around the origin.

> [!MYTH] Gradient, divergence, and curl are unrelated formulas.
> They come from one vector differential operator: $\nabla f$, $\nabla\cdot\mathbf F$, $\nabla\times\mathbf F$. Gauss's and Stokes's theorems are exactly the statements linking these operators to boundary integrals.

## Practice

> [!PRACTICE] 1 · Compute all three
> For $\mathbf F=(x^2y,\ yz,\ x+z^2)$, find the divergence and curl.
>
> > [!ANSWER] Show answer
> > $\nabla\cdot\mathbf F=2xy+3z$ and $\nabla\times\mathbf F=(-y,-1,-x^2)$.

> [!PRACTICE] 2 · Potential
> Show that $\mathbf F=(y+z,\ x+z,\ x+y)$ is conservative and find a potential.
>
> > [!ANSWER] Show answer
> > The curl is zero on all of space. From $u_x=y+z$, $u=xy+xz+\varphi(y,z)$, and the remaining equations give $u=xy+xz+yz$.

> [!PRACTICE] 3 · Verify the identity
> For $f=x^2yz$, verify $\nabla\times\nabla f=0$.
>
> > [!ANSWER] Show answer
> > $\nabla f=(2xyz,\ x^2z,\ x^2y)$, whose curl is $(x^2-x^2,\ 2xy-2xy,\ 2xz-2xz)=(0,0,0)$.

> [!PRACTICE] 4 · Circulation
> For the vortex field, compute the circulation around the unit circle counterclockwise and explain why Stokes's theorem is not violated.
>
> > [!ANSWER] Show answer
> > After parametrising, $\mathbf F\cdot d\mathbf r=dt$, so the circulation is $2\pi$. The disk contains the origin, where the field is undefined, so the smoothness hypothesis of Stokes's theorem fails on that surface.

> [!FORMAL] Formal statement
> Let $f\in C^2$ and $\mathbf F=(P,Q,R)\in C^2$. Then $\nabla\times\nabla f=0$ and $\nabla\cdot(\nabla\times\mathbf F)=0$, both proved by equality of mixed partials. If $D$ is simply connected and $\mathbf F\in C^1(D)$, then $\nabla\times\mathbf F=0$ is equivalent to the existence of $u\in C^2(D)$ with $\mathbf F=\nabla u$, equivalent to path independence of $\int_C\mathbf F\cdot d\mathbf r$, and equivalent to zero circulation around every closed curve.
