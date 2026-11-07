---
slug: "triple-integral-computation"
subject: "calculus"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Triple Integrals"
subtitle: "Project, pierce, or change the coordinates"
minutes: 32
meta: ["32 min read","Requires double integrals and surfaces in space","Mastery level"]
concepts: ["multipleint"]
prereq: ["multipleint"]
related: ["areavol", "paramint", "partial"]
---

## What this lecture sets out to do

A double integral accumulates over a plane region; a triple integral over a solid. The definition keeps its shape — divide, approximate, sum, take the limit. Two things are new.

The first is **setting the limits**. A plane region is pinched between two curves, a solid between two surfaces, and each extra variable adds a decision about where a line enters and leaves. The same solid can be pierced by vertical lines or cut by horizontal planes; both give the same value, at very different cost.

The second is the **volume element**. Rectangular coordinates give $dx\,dy\,dz$, whose three differentials may be written in any order. Cylindrical coordinates add a factor $r$, spherical coordinates a factor $\rho^{2}\sin\varphi$. These are Jacobian determinants, not conventions; omit one and the answer is systematically wrong.

By the end of the lecture you should be able to:

- write one solid in both projection and cross-section form, and say when each applies;
- recognise when an integrand of one variable favours a slicing direction;
- write the volume elements in cylindrical and spherical coordinates and explain each factor;
- use symmetry to make an integral vanish, or halve it, before computing;
- check any triple integral against $\iiint_\Omega dV$, the volume.

## Three lines back

- A double integral accumulates over a plane region; $d\sigma$ becomes $r\,dr\,d\theta$ in polar coordinates, that $r$ being the Jacobian of the change of variables.
- Solids are described by inequalities such as $x^{2}+y^{2}\le 1$, $0\le z\le 1-x-y$; "every vertical line meets the solid once" is the precondition for iterated limits.
- The triple integral is defined by dividing, summing and passing to the limit; its properties mirror the double integral: linearity, additivity, sign preservation, mean value.

## Why a third integral

Take an object of non-uniform density $\mu(x,y,z)$ and ask for its mass. A lamina is cut into small pieces of mass about $\mu\cdot\Delta\sigma$; a solid is treated the same way, with pieces replaced by blocks:

$$
\Delta m_i\approx \mu(\xi_i,\eta_i,\zeta_i)\,\Delta V_i
$$

Adding and refining gives

$$
m=\iiint_\Omega \mu(x,y,z)\,dV
$$

With $f=1$ this degenerates to $\iiint_\Omega dV$, the volume of $\Omega$ — the standard check.

Block size must be measured by **diameter**: a thin long block may have tiny volume while the density differs greatly at its ends. Only $\lambda\to0$ makes the approximation good everywhere.

The definition guarantees existence, not computation. The method is to unwind the accumulation one layer at a time: along a line, across a plane, along a direction. Different unwindings are the methods below; for a regular solid the integral becomes three single integrals.

## The projection method: one integral, then two

Let the projection of $\Omega$ onto $xOy$ be $D_{xy}$, and suppose every line through $D_{xy}$ parallel to the $z$ axis meets $\Omega$ in a **single segment**, entering at $z_1(x,y)$ and leaving at $z_2(x,y)$. Then

$$
\iiint_\Omega f\,dV=\iint_{D_{xy}}\left[\int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z)\,dz\right]d\sigma
$$

Read it as summing columns: fix $(x,y)$ and the inner integral reduces one vertical line to a number, the mass of that column; the outer integral adds the column masses over the projection. Hence "one first, two after".

The phrase "single segment" cannot be dropped. If a line enters and leaves twice — a ring-shaped tube, or a solid between folding surfaces — then $z_1,z_2$ cannot be written as one pair, and $D_{xy}$ must be split. The test is concrete: solve the inequalities for $z$ and check the bounds on the whole projection.

> [!NOTE]
> The order never varies: get $D_{xy}$ from non-emptiness, then the bounds on $z$ from where a vertical line enters and leaves. Writing $z$ first and guessing the projection almost always misplaces a boundary.

## Example 1: an integral over a tetrahedron

Let $\Omega$ be the tetrahedron bounded by $x+y+z\le 1$ and the three coordinate planes, and compute

$$
I=\iiint_\Omega z\,dV
$$

**Step 1, the projection.** The solid requires $x,y,z\ge0$ and $z\le 1-x-y$; non-emptiness forces $1-x-y\ge 0$, so the projection is the triangle

$$
D_{xy}:\quad 0\le x\le 1,\quad 0\le y\le 1-x
$$

**Step 2, the range of $z$.** $z$ enters at $z=0$ and leaves at the slanting plane:

$$
0\le z\le 1-x-y
$$

**Step 3, the inner integral.**

$$
\int_0^{1-x-y} z\,dz=\frac{(1-x-y)^{2}}{2}
$$

**Step 4, the outer integral.**

$$
I=\int_0^1 dx\int_0^{1-x}\frac{(1-x-y)^{2}}{2}\,dy
$$

For fixed $x$ put $u=1-x-y$; then $dy=-du$ and $y$ from $0$ to $1-x$ sends $u$ from $1-x$ to $0$:

$$
\int_0^{1-x}\frac{(1-x-y)^{2}}{2}\,dy=\int_0^{1-x}\frac{u^{2}}{2}\,du=\frac{(1-x)^{3}}{6}
$$

Finally

$$
I=\int_0^1\frac{(1-x)^{3}}{6}\,dx=\frac16\cdot\frac14=\frac1{24}
$$

**Check.** The volume is $\frac16\cdot 1\cdot 1\cdot 1=\frac16$ and $0\le z\le1$, so $0<I<\frac16$; indeed $\frac1{24}\approx0.0417$. A stronger check is symmetry: $\Omega$ survives any permutation of $x,y,z$, so

$$
\iiint_\Omega x\,dV=\iiint_\Omega y\,dV=\iiint_\Omega z\,dV
$$

Since $\iiint_\Omega(x+y+z)\,dV$ equals the volume $\frac16$ times the average $\frac34$, namely $\frac18$, each component is $\frac{1}{24}$.

## The slicing method: two integrals, then one

Fix $z$ in $[c,d]$ and cut $\Omega$ with the plane $z=\text{constant}$, obtaining a cross-section $D_z$. If every section is regular with an easy area $A(z)$, then

$$
\iiint_\Omega f\,dV=\int_c^d dz\iint_{D_z} f(x,y,z)\,dx\,dy
$$

This is "two first, one after": each slice contributes its double integral, and the outer integral stacks them.

It is best when **the integrand depends on $z$ alone**:

$$
\iiint_\Omega f(z)\,dV=\int_c^d f(z)\,A(z)\,dz
$$

The double integral collapses to an area and the triple integral to a single integral — the biggest shortcut in the subject.

## Example 2: a region between a paraboloid and a plane

Let $\Omega$ be bounded by the paraboloid $z=x^{2}+y^{2}$ and the plane $z=1$, and compute

$$
J=\iiint_\Omega z\,dV
$$

**Step 1, choose the cut.** The integrand depends on $z$ alone, and the section is a disk. Both point to slicing.

**Step 2, the section.** For fixed $z\in[0,1]$, $x^{2}+y^{2}\le z$ is a disk of radius $\sqrt z$, so

$$
A(z)=\pi(\sqrt z)^{2}=\pi z
$$

**Step 3, a single integral.**

$$
J=\int_0^1 z\cdot A(z)\,dz=\int_0^1 \pi z^{2}\,dz=\frac{\pi}{3}
$$

**Check.** With $f=1$ the volume is $\int_0^1 \pi z\,dz=\frac{\pi}{2}$ and $z\le1$, so $J<\frac{\pi}{2}$: $\frac{\pi}{3}\approx1.047$ against $\frac{\pi}{2}\approx1.571$.

**Compared with projection.** The projection is the unit disk and $z$ runs from $r^{2}$ to $1$:

$$
J=\int_0^{2\pi}d\theta\int_0^{1}\left(\int_{r^{2}}^{1}z\,dz\right)r\,dr
=2\pi\int_0^{1}\frac{1-r^{4}}{2}\,r\,dr
=\pi\left(\frac12-\frac16\right)=\frac{\pi}{3}
$$

Values agree, work does not: projection needs terms like $\int r^{5}dr$, slicing one integral $\int z^{2}dz$. With a $z$-only integrand and regular sections the advantage is an order of magnitude.

> [!NOTE]
> The methods are two descriptions of one solid. The test: with which variable is the integrand simplest, and is the matching section easy? The method satisfying both wins.

## A comparison table

| Method | Order | Volume element | Signal | Main risk |
| --- | --- | --- | --- | --- |
| Projection | $z$ first, then $x,y$ | $dz\,d\sigma$ | top and bottom each one formula | split when a line pierces twice |
| Slicing | $x,y$ first, then $z$ | $d\sigma\,dz$ | regular sections, easy areas | sections too complicated as $z$ varies |
| Cylindrical | $z$, then $r,\theta$ | $r\,dr\,d\theta\,dz$ | symmetry about the $z$ axis | dropping $r$ |
| Spherical | $\rho$, then $\varphi,\theta$ | $\rho^{2}\sin\varphi\,d\rho\,d\varphi\,d\theta$ | ball, cone, spherical shell | treating $\varphi$ as latitude |

If a solid is symmetric about a coordinate plane and the integrand is odd in that variable, the integral is zero. Settle this before writing: it deletes a whole computation and is the first guard against nonsense.

## Cylindrical coordinates

For symmetry about the $z$ axis, or an integrand containing $x^{2}+y^{2}$, replace the plane part by polar coordinates and leave $z$:

$$
x=r\cos\theta,\qquad y=r\sin\theta,\qquad z=z
$$

with $r\ge0$, $0\le\theta\le2\pi$. The volume element is

$$
dV=r\,dr\,d\theta\,dz
$$

The $r$ has the same origin as in the polar area element: $(x,y)\to(r,\theta)$ contributes a Jacobian $r$, while $z$ contributes $1$.

$$
\left|\frac{\partial(x,y,z)}{\partial(r,\theta,z)}\right|
=\left|\begin{matrix}\cos\theta&-r\sin\theta&0\\ \sin\theta&r\cos\theta&0\\ 0&0&1\end{matrix}\right|
=r
$$

Geometrically, a bar of length $dz$ has cross-section sides $dr$ and $r\,d\theta$, giving $r\,dr\,d\theta\,dz$.

## Example 3: an integral over a cylinder

Let $\Omega$ be $x^{2}+y^{2}\le1$, $0\le z\le1$, and compute

$$
K=\iiint_\Omega\left(x^{2}+y^{2}\right)dV
$$

**Step 1, coordinates.** Rotational symmetry and an $x^{2}+y^{2}$ integrand: cylindrical coordinates.

**Step 2, limits.** With $x^{2}+y^{2}=r^{2}$,

$$
0\le\theta\le2\pi,\qquad 0\le r\le1,\qquad 0\le z\le1
$$

All three intervals are constant, so the solid is a disk times a height interval.

**Step 3, compute.**

$$
K=\int_0^{2\pi}d\theta\int_0^{1}r^{2}\cdot r\,dr\int_0^{1}dz
=2\pi\cdot\frac14\cdot1=\frac{\pi}{2}
$$

**Check.** The volume is $\pi$ and $0\le r^{2}\le1$, so $0<K<\pi$; $\frac{\pi}{2}$ sits in the middle.

Write the two $r$'s separately: $r^{2}$ is the transformed integrand, $r\,dr$ the volume element. They contribute $\frac14$ and $\frac12$; merging them into $r^{3}$ hides errors.

**Boundary cases.** For an annulus $a^{2}\le x^{2}+y^{2}\le b^{2}$ the limits on $r$ become $a$ and $b$. For an off-centre cylinder $x^{2}+y^{2}\le 2ax$ the boundary is $r\le 2a\cos\theta$ with $\theta\in[-\pi/2,\pi/2]$. The criterion: a ray must enter and leave at the same radii, or the upper limit depends on $\theta$.

## Spherical coordinates

Balls, cones and their parts suit spherical coordinates:

$$
x=\rho\sin\varphi\cos\theta,\qquad y=\rho\sin\varphi\sin\theta,\qquad z=\rho\cos\varphi
$$

where $\rho\ge0$ is the distance to the origin, $\varphi$ the polar angle from the **positive $z$ axis**, and $\theta$ the azimuth, with

$$
0\le\rho,\qquad 0\le\varphi\le\pi,\qquad 0\le\theta\le2\pi
$$

The range of $\varphi$ must be memorised: $[0,\pi]$, not the $[-\pi/2,\pi/2]$ of latitude. The upper half space is $0\le\varphi\le\pi/2$, the $xOy$ plane is $\varphi=\pi/2$, the negative $z$ axis is $\varphi=\pi$.

$$
dV=\rho^{2}\sin\varphi\,d\rho\,d\varphi\,d\theta
$$

The three edge lengths are $d\rho$, $\rho\,d\varphi$ and $\rho\sin\varphi\,d\theta$; the sine comes from the latitude circle having radius $\rho\sin\varphi$.

## Example 4: an integral over the unit ball

Let $\Omega$ be $x^{2}+y^{2}+z^{2}\le1$, and compute

$$
L=\iiint_\Omega z^{2}\,dV
$$

**Step 1, substitute.** $z^{2}=\rho^{2}\cos^{2}\varphi$, with $0\le\rho\le1$, $0\le\varphi\le\pi$, $0\le\theta\le2\pi$.

**Step 2, separate.** Integrand times element:

$$
\rho^{2}\cos^{2}\varphi\cdot\rho^{2}\sin\varphi
=\rho^{4}\cos^{2}\varphi\sin\varphi
$$

Each variable appears separately, so the integral factors:

$$
L=\int_0^{2\pi}d\theta\int_0^{\pi}\cos^{2}\varphi\sin\varphi\,d\varphi\int_0^{1}\rho^{4}\,d\rho
$$

**Step 3, evaluate.**

$$
\int_0^{2\pi}d\theta=2\pi,\qquad
\int_0^{\pi}\cos^{2}\varphi\sin\varphi\,d\varphi=\left[-\frac{\cos^{3}\varphi}{3}\right]_0^{\pi}=\frac23,
\qquad
\int_0^{1}\rho^{4}\,d\rho=\frac15
$$

**Step 4, multiply.**

$$
L=2\pi\cdot\frac23\cdot\frac15=\frac{4\pi}{15}
$$

**Check.** With $f=1$,

$$
\iiint_\Omega dV=\int_0^{2\pi}d\theta\int_0^{\pi}\sin\varphi\,d\varphi\int_0^{1}\rho^{2}\,d\rho
=2\pi\cdot2\cdot\frac13=\frac{4\pi}{3}
$$

the ball's volume. Since $z^{2}\le1$, $L$ is below $4.19$, and $\frac{4\pi}{15}\approx0.838$ is. By symmetry the integrals of $x^{2},y^{2},z^{2}$ are equal and sum to $\iiint_\Omega\rho^{2}dV=\frac{4\pi}{5}$, so each is $\frac{4\pi}{15}$.

**Boundary cases.** For the off-centre ball $(x-1)^{2}+y^{2}+z^{2}\le1$, spherical coordinates make $\rho$ depend on both angles; translate first with $u=x-1$.

For the part of a ball inside $\varphi\le\pi/4$, $\rho\le1$ stays constant. But between the cone $z\ge\sqrt{x^{2}+y^{2}}$ and $z\le1$, the cone is $\varphi=\pi/4$ and the plane is $\rho\cos\varphi=1$, so $\rho\le\sec\varphi$:

$$
\iiint_\Omega z\,dV=\int_0^{2\pi}d\theta\int_0^{\pi/4}\cos\varphi\sin\varphi\,d\varphi\int_0^{\sec\varphi}\rho^{3}\,d\rho
$$

Costlier than constant limits: choose coordinates by whether the new limits are simple, not by appearances.

## Symmetry: halve the work before you start

**Coordinate-plane symmetry.** If $(x,y,z)\in\Omega\Leftrightarrow(x,y,-z)\in\Omega$, then

$$
\iiint_\Omega f\,dV=
\begin{cases}
0, & f(x,y,-z)=-f(x,y,z),\\
2\displaystyle\iiint_{\Omega_{+}} f\,dV, & f(x,y,-z)=f(x,y,z),
\end{cases}
$$

with $\Omega_{+}$ the part where $z\ge0$; for other planes, replace $z$ by the matching variable.

**Cyclic symmetry.** If $\Omega$ is unchanged by permuting $x,y,z$, then for any function

$$
\iiint_\Omega x^{2}\,dV=\iiint_\Omega y^{2}\,dV=\iiint_\Omega z^{2}\,dV
$$

It gives no number, but turns three unknowns into one.

**Even doubles, odd vanishes — check the region.** If a solid is symmetric about the $z$ axis but not about $xOy$, the rule "odd in $z$ gives zero" **fails**. Symmetry is always about a specific plane.

For the unit ball, $\iiint_\Omega z\,dV=0$ because the integrand is odd in $z$ and the ball is symmetric about $xOy$. There $\iiint_\Omega z^{2}\,dV=\frac{4\pi}{15}$: twice the upper half's $\frac{2\pi}{15}$, matching Example 4.

> [!NOTE]
> Pin every symmetry claim to a plane. The ball is symmetric about $xOy$, which licences "odd vanishes, even doubles" in $z$. The cylinder $x^{2}+y^{2}\le1$, $0\le z\le1$ is only rotationally symmetric, and $\iiint z\,dV=\frac{\pi}{2}\ne0$: no vanishing rule applies.

## Four misconceptions

> [!MYTH] The cylindrical volume element is $dr\,d\theta\,dz$.
> It carries an $r$, as in polar coordinates. Omit it and the unit cylinder has volume $2\pi$ instead of $\pi$.

> [!MYTH] In spherical coordinates $\varphi$ is latitude, from $-\pi/2$ to $\pi/2$.
> $\varphi$ runs from the positive to the negative $z$ axis, so $[0,\pi]$. Latitude mixes the hemispheres, lets $\sin\varphi$ go negative and flips the sign of the volume element.

> [!MYTH] The three systems differ only in notation, so any will do.
> The value is the same, the work is not. A cylinder wants cylindrical coordinates, a ball or cone spherical ones; in rectangular coordinates such integrals may be impossible.

> [!MYTH] All three limits of a triple integral can be constants.
> Only for box-like solids. In general the limits depend on each other: $z$ on $x,y$ in projection form, $\rho$ on $\varphi$ for a cone-plus-plane solid. Constant limits are the exception.

## Practice

> [!PRACTICE] 1 · Projection
> Compute $\iiint_\Omega x\,dV$ for $\Omega$: $0\le x\le1$, $0\le y\le1-x$, $0\le z\le1-x-y$.
>
> > [!ANSWER] Show answer
> > The $z$ range is $0$ to $1-x-y$: $\displaystyle\int_0^1 x\,dx\int_0^{1-x}(1-x-y)\,dy=\int_0^1\frac{x(1-x)^{2}}{2}dx=\frac1{24}$, as in Example 1, matching the symmetry in the three variables.

> [!PRACTICE] 2 · Cylindrical
> Compute $\iiint_\Omega z\,dV$ for $\Omega$: $x^{2}+y^{2}\le1$, $0\le z\le1$.
>
> > [!ANSWER] Show answer
> > $\displaystyle\int_0^{2\pi}d\theta\int_0^1 r\,dr\int_0^1 z\,dz=2\pi\cdot\frac12\cdot\frac12=\frac{\pi}{2}$. The volume is $\pi$ and the integrand at most $1$, so the value is reasonable.

> [!PRACTICE] 3 · Spherical
> Compute $\iiint_\Omega(x^{2}+y^{2}+z^{2})\,dV$ over the unit ball.
>
> > [!ANSWER] Show answer
> > The integrand $\rho^{2}$ times $\rho^{2}\sin\varphi$ gives $\rho^{4}\sin\varphi$: $\displaystyle\int_0^{2\pi}d\theta\int_0^{\pi}\sin\varphi\,d\varphi\int_0^{1}\rho^{4}d\rho=2\pi\cdot2\cdot\frac15=\frac{4\pi}{5}$.

> [!PRACTICE] 4 · A volume in spherical coordinates
> Recompute the volume of the unit ball in spherical coordinates, naming each factor.
>
> > [!ANSWER] Show answer
> > $\displaystyle\int_0^{2\pi}d\theta\int_0^{\pi}\sin\varphi\,d\varphi\int_0^{1}\rho^{2}\,d\rho=2\pi\cdot2\cdot\frac13=\frac{4\pi}{3}$: $2\pi$ from a full turn in azimuth, $2$ from $\int_0^{\pi}\sin\varphi\,d\varphi$, $\frac13$ from $\int_0^1\rho^{2}d\rho$.

> [!PRACTICE] 5 · A cone
> Compute $\iiint_\Omega z\,dV$ for the solid between $z=\sqrt{x^{2}+y^{2}}$ and $z=1$.
>
> > [!ANSWER] Show answer
> > Cylindrically, $0\le\theta\le2\pi$, $0\le r\le1$, $r\le z\le1$: $\displaystyle\int_0^{2\pi}d\theta\int_0^1 r\,dr\int_r^1 z\,dz=2\pi\int_0^1\frac{r(1-r^{2})}{2}dr=2\pi\left(\frac14-\frac18\right)=\frac{\pi}{4}$. The cone's volume is $\frac{\pi}{3}$ and the integrand is at most $1$, so $\frac{\pi}{4}<\frac{\pi}{3}$.

> [!PRACTICE] 6 · Symmetry
> Given $\iiint_\Omega(x^{2}+y^{2}+z^{2})\,dV=\frac{4\pi}{5}$ over the unit ball, compute $\iiint_\Omega x^{2}\,dV$.
>
> > [!ANSWER] Show answer
> > The ball survives permutations, so the three squared terms are equal, each a third of the total: $\frac{4\pi}{15}$.

## Formal statement

> [!FORMAL] Formal statement
> Let $\Omega$ be a bounded closed region in space and $f$ bounded on it. Divide $\Omega$ into $n$ pieces $\Delta V_i$ (denoting volume as well), let $\lambda$ be the largest diameter, and form $\sum_{i=1}^{n} f(\xi_i,\eta_i,\zeta_i)\Delta V_i$. If the sum tends as $\lambda\to0$ to a constant $I$ independent of the partition and the sample points, then $f$ is integrable on $\Omega$ and $I$ is written $\iiint_\Omega f\,dV$. Continuous functions on closed bounded regions are integrable. If $\Omega$ is $z_1(x,y)\le z\le z_2(x,y)$ over $(x,y)\in D_{xy}$, the integral is iterated with $z$ first; if $\Omega$ is $c\le z\le d$ over $(x,y)\in D_z$, with $D_z$ first. Under a change of variables the volume element gains the absolute Jacobian: $r$ for cylindrical coordinates, $\rho^{2}\sin\varphi$ for spherical ones.

## How this lecture connects

- **Double integrals** supply the technique: projection is a double integral of a single integral, slicing the reverse. The polar $r$ is the ancestor of the cylindrical $r$.
- **Space analytic geometry** turns solids into inequalities; if $z_1,z_2$ can be written, projection works, and if $D_z$ can be written, slicing works.
- **Partial derivatives and differentials** produce the Jacobian; $r$ and $\rho^{2}\sin\varphi$ are its special cases.
- **Applications of multiple integrals** use this lecture as an engine: volume, mass, centroid and moment of inertia are triple integrals with different integrands.
- **Line and surface integrals** move accumulation onto curves and surfaces, replacing $dV$ by arc length and area elements; the pattern is unchanged.

In one sentence: only two things are new — pinching a solid between two surfaces to set the limits, and correcting the volume element with a Jacobian factor.
