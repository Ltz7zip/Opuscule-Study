---
slug: "multiple-integral-applications"
subject: "calculus"
unit: "u10"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Advanced Mathematics · Mastery"
title: "Applications of Multiple Integrals"
subtitle: "Surface area, centroid, moment of inertia"
minutes: 32
meta: ["32 min read","Requires double and triple integrals","Mastery level"]
concepts: ["multipleint", "areavol"]
prereq: ["multipleint"]
related: ["areavol", "lineint", "partial"]
---

## What you will get

Applications of multiple integrals look formula-heavy, but they all reduce to one action: **approximate the quantity on a small piece, then add up**. The earlier lectures settled how to compute such integrals; this one settles what to compute and why the formula looks the way it does.

Three quantities are treated here: surface area, centroid (centre of mass), and moment of inertia. Their small-piece contributions differ — an area element tilted in space, "mass times coordinate", and "mass times squared distance to an axis" — but all of them become an integral of a density times a geometric factor.

By the end you should be able to:

- write the surface-area formula and explain where $1+z_x^{2}+z_y^{2}$ comes from;
- decide whether a surface is a single-valued graph $z=z(x,y)$, and know how to split or re-describe it when it is not;
- use symmetry to reduce a centroid to one coordinate, and say why;
- tell apart moments about an axis, about a point, and about a plane;
- check a result against a volume, a projected area, or simple bounds.

## Three lines back

- A double integral accumulates over a plane region, a triple integral over a solid; both are computed as iterated integrals.
- The mass of a lamina is density times area, accumulated: $m=\iint_D\rho\,d\sigma$; for a solid replace $d\sigma$ by $dV$.
- An odd integrand over a symmetric region integrates to zero; an even one gives twice the integral over half the region.

## One pattern behind all of them

Start with the most familiar quantity. A lamina with density $\rho(x,y)$ is cut into pieces $\Delta\sigma_i$, and on the $i$-th piece a point $(\xi_i,\eta_i)$ is chosen, so that piece contributes about $\rho(\xi_i,\eta_i)\Delta\sigma_i$. Adding and letting the largest diameter go to zero:

$$
m=\iint_D\rho(x,y)\,d\sigma
$$

Three steps — split, approximate, take the limit — form the template. Change the quantity and you only change the small-piece contribution:

- area: each piece contributes $1\cdot\Delta\sigma$, so $A=\iint_D d\sigma$;
- centroid: each piece contributes $x\cdot\Delta m$, so the first moment is $M_y=\iint_D x\rho\,d\sigma$;
- inertia: each piece contributes $r^{2}\cdot\Delta m$, where $r$ is the distance to the axis.

So "write a geometric quantity as an integral" is not memorisation; it is answering two questions: what does the quantity equal approximately on a small piece, and does that approximation converge as the pieces shrink? Continuity of the density and of the geometric factor settles the second question, which is why the formal statement requires $\rho$ to be continuous.

> [!NOTE]
> Work out the small-piece contribution before writing the integral. When formulas blur together, re-derive from this step instead of consulting a table.

## Surface area

The area of a plane region is a direct sum of area elements; a curved surface loses information when projected. The clearest comparison is a tilted flat plate: its shadow on the floor is smaller than the plate, by a factor set by the angle between them. Surface area has to scale each shadow back up.

Let $\Sigma$ be given by $z=z(x,y)$ with shadow $D$ on the $xOy$ plane, where $z$ has continuous partial derivatives on $D$. Treating $(x,y)$ as parameters gives $\mathbf r(x,y)=(x,y,z(x,y))$ with tangent vectors

$$
\mathbf r_x=(1,0,z_x),\qquad \mathbf r_y=(0,1,z_y)
$$

The ratio of a patch $dS$ on the surface to the corresponding patch $d\sigma$ in the parameter plane is the parallelogram area $|\mathbf r_x\times\mathbf r_y|$. The cross product is

$$
\mathbf r_x\times\mathbf r_y=\left(-z_x,-z_y,1\right),\qquad
\left|\mathbf r_x\times\mathbf r_y\right|=\sqrt{1+z_x^{2}+z_y^{2}}
$$

Hence

$$
dS=\sqrt{1+z_x^{2}+z_y^{2}}\;d\sigma,\qquad
A=\iint_D\sqrt{1+z_x^{2}+z_y^{2}}\;dx\,dy
$$

A second reading uses an angle. The normal $\mathbf n=(-z_x,-z_y,1)$ makes an angle $\gamma$ with the $z$ axis, and

$$
\cos\gamma=\frac{1}{\sqrt{1+z_x^{2}+z_y^{2}}}
$$

Since $d\sigma=dS\cos\gamma$, we get $dS=d\sigma/\cos\gamma$. Both readings produce the same factor, which is never below $1$ — a shadow is never larger than the object.

## Example 1: area of a paraboloid

Find the area of $z=x^{2}+y^{2}$ over $x^{2}+y^{2}\le1$.

**Step 1, derivatives.** $z_x=2x$, $z_y=2y$, so

$$
\sqrt{1+z_x^{2}+z_y^{2}}=\sqrt{1+4\left(x^{2}+y^{2}\right)}=\sqrt{1+4r^{2}}
$$

**Step 2, coordinates.** The integrand depends only on $r$ and the shadow is a disk, so polar coordinates are the only sensible choice, with $d\sigma=r\,dr\,d\theta$.

**Step 3, inner integral.** Put $u=1+4r^{2}$, $du=8r\,dr$; $r$ from $0$ to $1$ means $u$ from $1$ to $5$:

$$
\int_0^1\sqrt{1+4r^{2}}\;r\,dr=\frac18\cdot\frac23\left[u^{3/2}\right]_1^5=\frac{1}{12}\left(5^{3/2}-1\right)
$$

**Step 4, multiply by the angle.**

$$
A=2\pi\cdot\frac{1}{12}\left(5^{3/2}-1\right)=\frac{\pi}{6}\left(5\sqrt5-1\right)\approx5.33
$$

**Check.** The shadow has area $\pi\approx3.14$; the surface unfolds more, so $5.33>3.14$ is right, and the ratio $1.70$ matches the maximum slope $2$ of the paraboloid. In rectangular coordinates the integrand $\sqrt{1+4x^{2}+4y^{2}}$ is close to hopeless — choosing coordinates is half the solution.

## Edge cases for surface area

The formula assumes the surface is a single-valued graph $z=z(x,y)$. Three cases need care.

**Overlapping shadow.** The whole sphere $x^{2}+y^{2}+z^{2}=a^{2}$ is not a single-valued graph: the shadow is covered once by each hemisphere. Split it into $z=\pm\sqrt{a^{2}-x^{2}-y^{2}}$ and add, or use $x$ as the function: $x=\pm\sqrt{a^{2}-y^{2}-z^{2}}$.

**Vertical tangent plane.** For the cylinder $x^{2}+y^{2}=a^{2}$, $z_x$ blows up at $x=\pm a$, where the projection method fails; write $x=x(y,z)$ or $y=y(x,z)$ instead. Correspondingly,

$$
dS=\sqrt{1+x_y^{2}+x_z^{2}}\;dy\,dz,\qquad
dS=\sqrt{1+y_x^{2}+y_z^{2}}\;dx\,dz
$$

are the same area element in other variables.

**Parametrised surfaces.** If $\mathbf r(u,v)$ is given, then $dS=|\mathbf r_u\times\mathbf r_v|\,du\,dv$; the formula above is the case $u=x$, $v=y$.

Keep "surface area" separate from "an integral over a surface": the latter carries an integrand times $dS$ and reduces to area only for the constant integrand $1$.

## Centroid and centre of mass

The centroid is where the whole mass could be concentrated: support the lamina there and it balances. It is fixed by first moments:

$$
m=\iint_D\rho\,d\sigma,\qquad
\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma,\qquad
\bar y=\frac{1}{m}\iint_D y\rho\,d\sigma
$$

The numerators are the first moments about the $y$ and $x$ axes. A first moment is "mass times lever arm": moving all the mass to $(\bar x,\bar y)$ leaves every first moment unchanged, which is the defining property.

When $\rho$ is constant it cancels, and the centroid depends only on shape. Applied problems care about the difference: shape fixes the centroid, density fixes the centre of mass.

Two useful properties. **Additivity:** split a region in two and the overall centroid is the mass-weighted average of the two. **Symmetry:** if $D$ is symmetric about the $y$ axis and $\rho$ is even in $x$, then

$$
\bar x=\frac{1}{m}\iint_D x\rho\,d\sigma=0
$$

because $x\rho$ is odd in $x$. For a solid, replace the double integral by a triple integral and $d\sigma$ by $dV$:

$$
m=\iiint_\Omega\rho\,dV,\qquad
\bar x=\frac{1}{m}\iiint_\Omega x\rho\,dV,\qquad
\bar z=\frac{1}{m}\iiint_\Omega z\rho\,dV
$$

## Example 2: centroid of an upper half disk

Find the centroid of the uniform lamina $x^{2}+y^{2}\le a^{2}$, $y\ge0$.

**Step 1, symmetry.** The region is symmetric about the $y$ axis and the density is constant, so $\bar x=0$; only $\bar y$ remains.

**Step 2, mass.** The half disk has area $m=\dfrac{\pi a^{2}}{2}$.

**Step 3, first moment.** In polar coordinates $y=r\sin\theta$ and $d\sigma=r\,dr\,d\theta$, with $\theta$ from $0$ to $\pi$:

$$
\iint_D y\,d\sigma=\int_0^{\pi}d\theta\int_0^{a}r\sin\theta\cdot r\,dr
=\frac{a^{3}}{3}\Big[-\cos\theta\Big]_0^{\pi}=\frac{a^{3}}{3}\cdot2=\frac{2a^{3}}{3}
$$

**Step 4, divide.**

$$
\bar y=\frac{2a^{3}/3}{\pi a^{2}/2}=\frac{4a}{3\pi}\approx0.424a
$$

**Check.** $\bar y$ must lie between $0$ and $a$, and $0.424a$ does; it is below $a/2=0.5a$ because most of the area sits near the flat edge. For a quarter disk in the first quadrant, symmetry gives $\bar x=\bar y=\dfrac{4a}{3\pi}$ — the same number, since area and moment both halve.

## Example 3: centroid of a paraboloid solid

Let $\Omega$ be bounded by $z=x^{2}+y^{2}$ and $z=1$, with density $1$. Find its centroid.

**Step 1, symmetry.** The solid is symmetric about the $z$ axis, so $\bar x=\bar y=0$ and only $\bar z$ is left.

**Step 2, volume.** For fixed $z\in[0,1]$ the cross-section is a disk of radius $\sqrt z$ and area $\pi z$:

$$
V=\int_0^1\pi z\,dz=\frac{\pi}{2}
$$

**Step 3, first moment about the $xOy$ plane.** The integrand depends only on $z$, so slice:

$$
\iiint_\Omega z\,dV=\int_0^1 z\cdot\pi z\,dz=\frac{\pi}{3}
$$

**Step 4, divide.**

$$
\bar z=\frac{\pi/3}{\pi/2}=\frac23
$$

**Check.** $\bar z=2/3$ is above the halfway height $1/2$, because cross-sections grow with $z$ ($\pi z$) and the upper part carries more mass. A centroid away from the volume's midpoint is normal.

**Edge case.** For density $\rho=z$ (light below, heavy above),

$$
m=\int_0^1 z\cdot\pi z\,dz=\frac{\pi}{3},\qquad
\iiint_\Omega z\cdot z\,dV=\int_0^1 z^{2}\cdot\pi z\,dz=\frac{\pi}{4}
$$

so $\bar z=\dfrac{\pi/4}{\pi/3}=\dfrac34$, higher than in the uniform case. Density changes the weights, not the slicing method.

## Moment of inertia

A moment of inertia is the "mass" of rotation: for a given torque, a larger inertia means a smaller angular acceleration, and the kinetic energy is $\frac12I\omega^{2}$. The definition adds mass times squared distance to the axis:

$$
I=\iint_D r^{2}\rho\,d\sigma
$$

where $r$ is the distance to the **axis**. About the $z$ axis, $r^{2}=x^{2}+y^{2}$; about the $x$ axis, $r^{2}=y^{2}+z^{2}$; about the origin (the polar moment), $r^{2}=x^{2}+y^{2}+z^{2}$. For a lamina in the $xOy$ plane, $z=0$, so about the $x$ axis $r^{2}=y^{2}$ and about the $y$ axis $r^{2}=x^{2}$.

Keep the contrast with the centroid in mind: the centroid uses first moments (coordinates to the first power), inertia uses second moments (coordinates squared). So inertia is always positive and grows with distance from the axis, which is why the same body can have very different inertias about different axes.

## Example 4: moment of inertia of a disk

For the disk $x^{2}+y^{2}\le a^{2}$ of density $1$, find the inertia about a diameter (take the $x$ axis) and about the perpendicular axis through the centre (the $z$ axis).

**About the $x$ axis: $r^{2}=y^{2}$.** In polar coordinates $y=r\sin\theta$:

$$
I_x=\iint_D y^{2}\,d\sigma
=\int_0^{2\pi}\sin^{2}\theta\,d\theta\int_0^{a}r^{3}\,dr
=\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4}
$$

**About the $z$ axis: $r^{2}=x^{2}+y^{2}$.** Note the extra $r$ from the area element:

$$
I_z=\iint_D\left(x^{2}+y^{2}\right)d\sigma
=\int_0^{2\pi}d\theta\int_0^{a}r^{2}\cdot r\,dr
=2\pi\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{2}
$$

The factor of two is no accident. The disk is symmetric in $x$ and $y$, so $I_x=I_y$; for a plane lamina the perpendicular-axis theorem gives $I_z=I_x+I_y$, hence $I_z=2I_x$. That is the squared distance showing up on different axes.

**Edge case.** For an annulus $a\le r\le b$,

$$
I_z=2\pi\int_a^b r^{3}\,dr=2\pi\cdot\frac{b^{4}-a^{4}}{4}=\frac{\pi\left(b^{4}-a^{4}\right)}{2}
$$

and $a\to0$ recovers the disk. For an off-centre axis, use the parallel-axis theorem $I=I_C+md^{2}$, where $d$ is the distance between the axes and $m$ the total mass; it reduces every axis to one through the centroid.

## One comparison table

| Quantity | Lamina | Solid | Small piece |
| --- | --- | --- | --- |
| Mass | $\iint_D\rho\,d\sigma$ | $\iiint_\Omega\rho\,dV$ | $\rho\,\Delta V$ |
| Centroid $\bar x$ | $\frac{1}{m}\iint_D x\rho\,d\sigma$ | $\frac{1}{m}\iiint_\Omega x\rho\,dV$ | $x\,\Delta m$ |
| Inertia about $z$ | $\iint_D(x^{2}+y^{2})\rho\,d\sigma$ | $\iiint_\Omega(x^{2}+y^{2})\rho\,dV$ | $(x^{2}+y^{2})\Delta m$ |
| Inertia about $x$ | $\iint_D y^{2}\rho\,d\sigma$ | $\iiint_\Omega(y^{2}+z^{2})\rho\,dV$ | $(y^{2}+z^{2})\Delta m$ |
| Polar moment | $\iint_D(x^{2}+y^{2})\rho\,d\sigma$ | $\iiint_\Omega(x^{2}+y^{2}+z^{2})\rho\,dV$ | $(x^{2}+y^{2}+z^{2})\Delta m$ |

Read the table this way: a solid always has one more squared coordinate than a lamina, because the lamina is confined to $z=0$. Before writing a formula, ask which axis the distance is measured to, then decide which squares appear.

## Three misconceptions

> [!MYTH] 1 · Surface area equals the area of its projection.
> They agree only when the surface is parallel to a coordinate plane. Tilting enlarges the area by $\sqrt{1+z_x^{2}+z_y^{2}}$, which is never below $1$; over the unit disk the paraboloid's area is about $1.70$ times the shadow.

> [!MYTH] 2 · The $y$ coordinate of a centroid is half the maximum height.
> A centroid is a weighted average, not a geometric midpoint. For the upper half disk $\bar y=\dfrac{4a}{3\pi}\approx0.424a$, which is neither $\dfrac a2$ nor determined by the top point $a$ alone.

> [!MYTH] 3 · The moment of inertia is the same about any axis.
> The same body can differ by a factor of several. Decide which axis the distance is measured to; $I_z=2I_x$ for a disk is the warning.

## Practice

> [!PRACTICE] 1 · Area of a flat patch
> Find the area of the plane $z=1-x-y$ over $x\ge0$, $y\ge0$, $x+y\le1$.
>
> > [!ANSWER] Show answer
> > $z_x=z_y=-1$, so $\sqrt{1+1+1}=\sqrt3$; the shadow is a triangle of area $\dfrac12$, hence $A=\dfrac{\sqrt3}{2}$.

> [!PRACTICE] 2 · A centroid coordinate
> Find the $x$ coordinate of the centroid of the uniform lamina between $y=x^{2}$ and $y=x$.
>
> > [!ANSWER] Show answer
> > Area $\displaystyle\int_0^1(x-x^{2})dx=\frac16$, first moment $\displaystyle\iint x\,d\sigma=\int_0^1x(x-x^{2})dx=\frac1{12}$, so $\bar x=\dfrac{1/12}{1/6}=\dfrac12$. The same computation gives $\bar y=\dfrac25$.

> [!PRACTICE] 3 · Inertia of a rectangle
> For the rectangle $0\le x\le a$, $0\le y\le b$ of density $1$, find the inertia about the $x$ axis.
>
> > [!ANSWER] Show answer
> > $\displaystyle I_x=\int_0^{a}dx\int_0^{b}y^{2}dy=a\cdot\frac{b^{3}}{3}=\frac{ab^{3}}{3}$. About the $y$ axis, swapping $a$ and $b$ gives $\dfrac{a^{3}b}{3}$.

> [!PRACTICE] 4 · Centroid of a hemisphere
> Find the centroid height of the upper half ball $x^{2}+y^{2}+z^{2}\le a^{2}$, $z\ge0$, of density $1$.
>
> > [!ANSWER] Show answer
> > Volume $V=\dfrac{2\pi a^{3}}{3}$; in spherical coordinates $\displaystyle\iiint z\,dV=\int_0^{2\pi}d\theta\int_0^{\pi/2}\cos\varphi\sin\varphi\,d\varphi\int_0^{a}\rho^{3}d\rho=\pi\cdot\frac12\cdot\frac{a^{4}}{4}=\frac{\pi a^{4}}{4}$, so $\bar z=\dfrac{3a}{8}$.

> [!PRACTICE] 5 · Area of a sphere
> Use the projection method to find the area of the sphere $x^{2}+y^{2}+z^{2}=a^{2}$.
>
> > [!ANSWER] Show answer
> > For the upper hemisphere $z=\sqrt{a^{2}-x^{2}-y^{2}}$, $\sqrt{1+z_x^{2}+z_y^{2}}=\dfrac{a}{\sqrt{a^{2}-r^{2}}}$, so the hemisphere has area $\displaystyle\int_0^{2\pi}d\theta\int_0^{a}\frac{a\,r\,dr}{\sqrt{a^{2}-r^{2}}}=2\pi a\cdot a=2\pi a^{2}$, and the whole sphere has area $4\pi a^{2}$.

## Formal statement

> [!FORMAL] Formal statement
> Let $\Sigma$ be given by $z=z(x,y)$ with $z$ continuously differentiable on a closed region $D$. Split $D$ into small regions $\Delta\sigma_i$ and choose $(\xi_i,\eta_i)$ in each. The area of $\Sigma$ is defined as
> $$A=\lim_{\lambda\to0}\sum_i\sqrt{1+z_x^{2}(\xi_i,\eta_i)+z_y^{2}(\xi_i,\eta_i)}\;\Delta\sigma_i=\iint_D\sqrt{1+z_x^{2}+z_y^{2}}\;d\sigma$$
> where $\lambda$ is the largest diameter among the small regions.
>
> Let a lamina occupy $D$, with continuous density $\rho$ and $m=\iint_D\rho\,d\sigma>0$. Then
> $$\bar x=\frac1m\iint_D x\rho\,d\sigma,\quad \bar y=\frac1m\iint_D y\rho\,d\sigma,\quad I_x=\iint_D y^{2}\rho\,d\sigma,\quad I_y=\iint_D x^{2}\rho\,d\sigma,\quad I_z=\iint_D\left(x^{2}+y^{2}\right)\rho\,d\sigma$$
> For a solid, replace $D$ by $\Omega$, $d\sigma$ by $dV$, and each squared distance by the squared distance to the corresponding coordinate axis.

## Connections to other lectures

- **Double integrals** supply the area element $d\sigma$ and the polar form $r\,dr\,d\theta$; every area and centroid here rests on them.
- **Triple integrals** supply slicing and spherical coordinates; the $\bar z$ of Example 3 and the hemisphere of Practice 4 use them.
- **Partial derivatives and tangent planes** produce the factor $\sqrt{1+z_x^{2}+z_y^{2}}$, which is the length of the tangent-plane normal in disguise.
- **Line integrals** use the arc element $ds=\sqrt{x'^{2}+y'^{2}}\,dt$, the same idea as $dS$: lengths of tangent vectors straighten something curved.
- **Probability and statistics** call a weighted average an expectation and a second moment a variance — the same language of moments as centroids and inertia.
