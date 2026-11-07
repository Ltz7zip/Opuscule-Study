---
slug: "surface-integrals-gauss-stokes"
subject: "calculus"
unit: "u11"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Advanced Mathematics · Mastery"
title: "Surface Integrals of the Second Kind, Gauss and Stokes"
subtitle: "Flux, divergence, and curl in one place"
minutes: 32
meta: ["32 min read","Requires second-kind line integrals and triple integrals","Mastery level"]
concepts: ["lineint", "field", "multipleint"]
prereq: ["lineint"]
related: ["multipleint", "vectorgeo", "partial"]
---

## What This Lecture Sets Out to Do

Picture a thin film submerged in water. To describe how much water passes through it each second, the first-kind surface integral is not enough: $\iint_\Sigma f\,dS$ accumulates by area and ignores direction. But a flow through a surface carries a sign by nature — water crossing from the front to the back and water crossing the other way differ by a minus sign, and accumulating with the always-positive $dS$ wipes that difference out. The second-kind surface integral exists precisely for direction-carrying flow, and what it computes is flux.

The lecture moves in four steps: write flux as a second-kind surface integral, clarify what "choosing a side" really means, and give the projection rule; use Gauss's theorem to turn flux through a closed surface into a triple integral whose integrand is divergence; use Stokes' theorem to turn circulation along a space curve into a surface integral whose integrand is curl; then place Green, Gauss, and Stokes side by side and see that they are one statement in three dimensions.

By the end you should be able to:

- explain why a side must be chosen, and why reversing it flips all three terms at once;
- convert $P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ into a double integral by projection, with the correct sign for upper and lower sides;
- decide whether a problem calls for direct projection, for Gauss, or for closing the surface and then using Gauss;
- write down divergence and curl and connect them to sources and rotation;
- pair a curve's direction with a surface normal using the right-hand rule;
- say under what conditions each of the three theorems degenerates into another.

## Three-Line Recap

- A second-kind line integral carries direction and changes sign when the path is reversed; when parametrizing, let the limits follow the direction rather than forcing the smaller number first.
- Triple integrals accumulate over a solid; the volume element is $r\,dr\,d\theta\,dz$ in cylindrical coordinates and $\rho^{2}\sin\varphi\,d\rho\,d\varphi\,d\theta$ in spherical coordinates.
- For a surface $z=z(x,y)$ the area element is $\sqrt{1+z_x^{2}+z_y^{2}}\,dx\,dy$, where the square root is the factor by which the tilted surface exceeds its shadow.

## From "Accumulating by Area" to "Accumulating by Oriented Area"

The first-kind surface integral already solved half the problem of accumulating over a surface: subdivide, sum, take a limit, with the always-positive area element $dS$. It handles scalar totals such as mass or charge. But flux and circulation are flow-type quantities: what flows in and what flows out must be distinguished by sign, and summing absolute values throws away the net outflow, which is the most informative number in the problem.

The remedy is exactly parallel to the curve case. On a curve we replaced the arc element $ds$ by its projections $\Delta x_i$, $\Delta y_i$ on the axes, producing the oriented second-kind line integral. On a surface we replace the area element $\Delta S_i$ by its projections $\Delta S_{yz}$, $\Delta S_{zx}$, $\Delta S_{xy}$ on the three coordinate planes. These projections carry signs: positive when the normal makes an acute angle with the corresponding axis, negative when the angle is obtuse. Choosing a side is thereby translated into the signs of three projections. The two kinds of integral are not two separate theories; they are one subdivision-and-sum scheme with and without signs on the element.

## Flux: Definition and Properties of the Second-Kind Surface Integral

Let $\Sigma$ be a piecewise smooth oriented surface (one side has been chosen), with unit normal $\boldsymbol n=(\cos\alpha,\cos\beta,\cos\gamma)$, and let $P$, $Q$, $R$ be bounded on $\Sigma$. Subdivide $\Sigma$ into $n$ pieces, let the $i$-th piece have area $\Delta S_i$ and signed projections $\Delta S_{yz}$, $\Delta S_{zx}$, $\Delta S_{xy}$ on the planes $yOz$, $zOx$, $xOy$, pick a point $(\xi_i,\eta_i,\zeta_i)$ on the $i$-th piece, and form

$$
\sum_{i=1}^{n}\left[P(\xi_i,\eta_i,\zeta_i)\Delta S_{yz}+Q(\xi_i,\eta_i,\zeta_i)\Delta S_{zx}+R(\xi_i,\eta_i,\zeta_i)\Delta S_{xy}\right]
$$

If this sum tends to a constant independent of the subdivision and of the sampling points as the largest diameter tends to zero, that constant is the second-kind surface integral of $P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ over the chosen side of $\Sigma$, written

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
$$

Its relation to the first-kind integral is the identity

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
=\iint_\Sigma\left(P\cos\alpha+Q\cos\beta+R\cos\gamma\right)dS
=\iint_\Sigma\boldsymbol F\cdot\boldsymbol n\,dS
$$

The last expression says what the object is: project the field $\boldsymbol F=(P,Q,R)$ onto the normal and accumulate over area. $\boldsymbol F\cdot\boldsymbol n$ is the flow per unit area leaving through the surface; multiplying by $dS$ and integrating gives the net outflow of the whole surface, which is flux. Two extremes confirm the intuition: if $\boldsymbol F$ is everywhere tangent to the surface the dot product vanishes and the flux is zero; if $\boldsymbol F$ is everywhere normal with constant magnitude $c$, the flux is $c$ times the surface area.

Three properties mirror the second-kind line integral:

- **Side reversal flips the sign**: taking the other side reverses $\boldsymbol n$, so all three projections change sign;
- **Linearity**: the integral is linear in $P$, $Q$, $R$ separately and can be split term by term;
- **Additivity**: splitting $\Sigma$ into pieces adds the integrals, provided every piece uses the same side.

> [!NOTE]
> The symbols $dy\,dz$, $dz\,dx$, $dx\,dy$ denote signed projections, not products of differentials; treating them as products to be cancelled leads to sign errors sooner or later.

## Projection: Landing the Surface Integral on a Coordinate Plane

The definition says what the object is; computation still needs projection. Take the single term $\iint_\Sigma R\,dx\,dy$. Suppose $\Sigma$ is given by $z=z(x,y)$ over a region $D_{xy}$ in the $xOy$ plane. Since $\Delta S_{xy}=\Delta S\cos\gamma$, an acute angle with the $z$-axis gives $\cos\gamma>0$ and a positive projection, meaning the upper side; an obtuse angle gives a negative projection, meaning the lower side. Hence

$$
\iint_\Sigma R\,dx\,dy=\pm\iint_{D_{xy}}R(x,y,z(x,y))\,dx\,dy
$$

with the plus sign for the upper side and the minus sign for the lower. The other two terms project onto their own coordinate planes:

$$
\iint_\Sigma P\,dy\,dz=\pm\iint_{D_{yz}}P(x(y,z),y,z)\,dy\,dz,\qquad
\iint_\Sigma Q\,dz\,dx=\pm\iint_{D_{zx}}Q(x,y(z,x),z)\,dz\,dx
$$

Each sign is decided by whether the normal makes an acute or obtuse angle with the corresponding positive axis. The three terms may be computed separately and added, but all three signs must come from the same normal.

Example: $\Sigma$ is the outside of the sphere $x^{2}+y^{2}+z^{2}=a^{2}$; compute $\iint_\Sigma z\,dx\,dy$.

The sphere is not the graph of a single function, so split it into hemispheres. On the upper hemisphere $z=\sqrt{a^{2}-x^{2}-y^{2}}$ the outward normal makes an acute angle with the $z$-axis, so the sign is positive; on the lower hemisphere $z=-\sqrt{a^{2}-x^{2}-y^{2}}$ the outward normal makes an obtuse angle, so the sign is negative. Both project to the disk $D:r\le a$, hence

$$
\iint_\Sigma z\,dx\,dy=\iint_{D}\sqrt{a^{2}-r^{2}}\,d\sigma-\iint_{D}\left(-\sqrt{a^{2}-r^{2}}\right)d\sigma
=2\int_0^{2\pi}d\theta\int_0^{a}\sqrt{a^{2}-r^{2}}\,r\,dr
$$

The inner integral, with $t=a^{2}-r^{2}$, equals $\frac{a^{3}}{3}$, so the result is $\frac{4\pi a^{3}}{3}$, exactly the volume of the ball. This is no accident: with $R=z$ we have $\partial R/\partial z=1$, and Gauss's theorem in the next section explains the coincidence.

Example: $\Sigma$ is the part of the paraboloid $z=x^{2}+y^{2}$ with $0\le z\le1$, taken with the lower side; compute $\iint_\Sigma z\,dx\,dy$.

The projection is the disk $D:x^{2}+y^{2}\le1$. The lower side has an obtuse angle with the $z$-axis, so the sign is negative; on the surface $z=x^{2}+y^{2}=r^{2}$, hence

$$
\iint_\Sigma z\,dx\,dy=-\iint_D r^{2}\,d\sigma=-\int_0^{2\pi}d\theta\int_0^{1}r^{3}\,dr=-\frac{\pi}{2}
$$

The minus sign is meaningful: the paraboloid is a cap opening upward, the lower side points the normal downward, while the field points upward, so the flux is negative. Taking the upper side would give $+\frac{\pi}{2}$.

## Boundary Cases and Comparisons

Three things go wrong most often, and each is a boundary case.

**First, a degenerate projection.** If the surface is perpendicular to a coordinate plane, its projection there collapses to a curve, so that term vanishes. For the cylinder $x^{2}+y^{2}=a^{2}$ the normal is horizontal, $\cos\gamma=0$, and $\iint_\Sigma R\,dx\,dy=0$ for every $R$; the term must be handled through the $yOz$ or $zOx$ projection instead.

**Second, a closed surface must be split.** Spheres, the two ends of a cylinder, the six faces of a cube: group them by where the normal points and assign the sign piece by piece. Trying to force one formula over everything almost guarantees a sign error.

**Third, the three terms may degenerate differently in one problem.** On the side of a cylinder only $R\,dx\,dy$ vanishes; on a horizontal disk the first two terms vanish and only the third survives. Before computing, check which terms actually exist.

Comparing with the first-kind integral, only the element differs. The first kind uses the positive $dS$ and multiplies by $\sqrt{1+z_x^{2}+z_y^{2}}$; the second kind uses signed projections, needs no square root, and flips sign with the side. This is also why the second kind is often quicker: the ratio of projection to area is already carried by $\cos\gamma$, whose information now survives only in that sign.

## Gauss's Theorem: Trading a Closed Surface for a Triple Integral

Computing flux through a closed surface directly is tedious: a sphere must be split into hemispheres and each piece examined for the angle between its normal and the axes. A triple integral is often one line. Gauss's theorem supplies that conversion.

First introduce divergence. For a field $\boldsymbol F=(P,Q,R)$ define

$$
\operatorname{div}\boldsymbol F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}
$$

Divergence is the net outflow per unit volume: shrink a tiny cube around a point, divide the flux leaving it by its volume, and take the limit. Where divergence is positive the field behaves like a source; where it is negative, like a drain; where it vanishes, whatever flows in flows out.

Gauss's theorem says that adding these local source strengths over the solid gives exactly the net outflow through its boundary.

Let $\Omega$ be a closed region in space whose boundary $\Sigma$ is a piecewise smooth closed surface taken with the outward side, and let $P$, $Q$, $R$ have continuous first partial derivatives on $\Omega$. Then

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV
$$

The proof has two layers: a small box, then a subdivision of the whole region.

**A small box.** Let its length in the $x$-direction be $\Delta x$, with two faces of area $\Delta y\Delta z$ perpendicular to $x$. The right face lets out $P(x+\Delta x)\Delta y\Delta z$, the left face lets out $-P(x)\Delta y\Delta z$ because its normal points along negative $x$, and the pair contributes

$$
\left[P(x+\Delta x)-P(x)\right]\Delta y\Delta z\approx\frac{\partial P}{\partial x}\,\Delta x\,\Delta y\,\Delta z
$$

The other two directions are identical, so the flux through all six faces is approximately $\operatorname{div}\boldsymbol F\cdot\Delta V$. This step is where the definition of divergence comes from.

**The whole region.** Cut $\Omega$ into many small boxes, using irregular pieces near the boundary whose error vanishes in the limit, apply the box result to each, and add. The key is the interior shared face: it is crossed twice, once as an outflow for one box and once as an inflow for its neighbour, so the two contributions cancel. What remains is the unshared boundary $\Sigma$. Taking the limit turns the sum into a triple integral and the boundary sum into a surface integral.

This cancellation of interior faces is the same device that Green's theorem used with auxiliary cutting lines; Stokes' proof uses it once more.

## Using Gauss's Theorem

Example: $\Sigma$ is the outside of the sphere $x^{2}+y^{2}+z^{2}=a^{2}$; compute $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$.

Here $P=x$, $Q=y$, $R=z$, so the divergence is $1+1+1=3$, constant on the ball. By Gauss,

$$
\iint_\Sigma=\iiint_\Omega 3\,dV=3\cdot\frac{4\pi a^{3}}{3}=4\pi a^{3}
$$

Compared with the direct projection result $\frac{4\pi a^{3}}{3}$ from the previous section, the factor $3$ is exactly the divergence. Direct projection would require six separate computations; Gauss takes one line.

Example (closing the surface): $\Sigma$ is the upper hemisphere $z=\sqrt{a^{2}-x^{2}-y^{2}}$ with the upper side; compute $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$.

The surface is not closed, so Gauss does not apply directly. Add the disk $\Sigma_1:z=0$, $x^{2}+y^{2}\le a^{2}$, taken with the lower side; then $\Sigma+\Sigma_1$ bounds the upper half-ball $\Omega$ with the outward side. The divergence is $3$, hence

$$
\iint_{\Sigma+\Sigma_1}=\iiint_\Omega 3\,dV=3\cdot\frac{2\pi a^{3}}{3}=2\pi a^{3}
$$

On $\Sigma_1$ we have $z=0$ and $\boldsymbol n=(0,0,-1)$, so the integrand $\boldsymbol F\cdot\boldsymbol n=-R=-z$ vanishes, and the added disk contributes nothing. The original integral is therefore $2\pi a^{3}$.

Closing a surface follows four fixed steps: choose the simplest lid; check that the union uses the outward side; apply Gauss; subtract the lid's flux. Coordinate-plane disks and polygons are the usual lids, since their normals are constant and the integrand often vanishes outright.

Set side by side, the three theorems share one shape:

| Theorem | Integral on the boundary | Replaced by | Orientation |
| --- | --- | --- | --- |
| Green | Circulation on a plane closed curve | Double integral over the plane region | Boundary positively oriented, region on the left |
| Gauss | Flux through a closed surface | Triple integral over the solid | Outward side |
| Stokes | Circulation along a space closed curve | Second-kind integral over a surface | Curve and normal in right-hand relation |

Read it this way: Green trades a one-dimensional boundary for a two-dimensional interior, Gauss trades a two-dimensional boundary for a three-dimensional interior, and Stokes trades a space curve for a spanning surface. All three say that an integral on the boundary equals an integral of some derivative inside.

## Stokes' Theorem: Trading a Space Curve for a Surface Integral

Green's theorem handled plane closed curves: the curve encloses a plane region and circulation equals the integral of the two-dimensional curl. A closed curve in space encloses no plane region, but it can span a surface, the way a wire loop spans a soap film. The film's shape is not unique, and that is the interesting part: as long as the boundary is the same, any spanning surface works.

Write the curl first. For $\boldsymbol F=(P,Q,R)$,

$$
\nabla\times\boldsymbol F=\left(\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z},\ \frac{\partial P}{\partial z}-\frac{\partial R}{\partial x},\ \frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)
$$

Curl measures how strongly the field rotates about an axis near each point and in which direction that axis points: it points along the axis of rotation, and its magnitude measures the strength of the spin.

Let $\Sigma$ be a piecewise smooth oriented surface whose boundary $\Gamma$ is a piecewise smooth closed curve. Suppose the direction of $\Gamma$ and the normal of $\Sigma$ obey the right-hand rule — curl the fingers of the right hand along $\Gamma$ and the thumb points along the normal — and suppose $P$, $Q$, $R$ have continuous first partial derivatives on a region containing $\Sigma$. Then

$$
\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma
\begin{vmatrix}
dy\,dz & dz\,dx & dx\,dy\\
\dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z}\\
P & Q & R
\end{vmatrix}
$$

Expanding the determinant along the first row gives $\iint_\Sigma(\nabla\times\boldsymbol F)\cdot\boldsymbol n\,dS$, the flux of curl through the surface. In words: circulation along the boundary equals the flux of curl across the surface.

The proof is again subdivide and cancel, this time on the surface. Cut $\Sigma$ into small patches, each small enough to look like a plane quadrilateral with an almost constant normal. On each patch, apply Green's theorem to get circulation approximately equal to $(\nabla\times\boldsymbol F)\cdot\boldsymbol n$ times the patch area. Adding all patches, each interior edge is traversed twice in opposite directions and cancels, leaving only the outer curve $\Gamma$. The limit gives the formula.

Two consequences follow. First, Stokes is a genuine generalization of Green: take $\Sigma$ to be a plane region and let all quantities be independent of $z$; the determinant collapses to its last term, which is Green. Second, since the proof only uses the boundary, the surface can be replaced freely as long as its boundary is $\Gamma$ and the right-hand rule holds.

Example: $\Gamma$ is the unit circle in the plane $z=0$, traversed counterclockwise, and $\boldsymbol F=(y,z,x)$; compute $\oint_\Gamma y\,dx+z\,dy+x\,dz$.

Here $P=y$, $Q=z$, $R=x$; differentiating term by term,

$$
\nabla\times\boldsymbol F=\left(\frac{\partial x}{\partial y}-\frac{\partial z}{\partial z},\ \frac{\partial y}{\partial z}-\frac{\partial x}{\partial x},\ \frac{\partial z}{\partial x}-\frac{\partial y}{\partial y}\right)=(-1,-1,-1)
$$

Take $\Sigma$ to be the unit disk with normal $\boldsymbol k=(0,0,1)$. The right-hand rule makes the counterclockwise direction correct for this normal. The dot product $(\nabla\times\boldsymbol F)\cdot\boldsymbol k=-1$ is constant, so

$$
\iint_\Sigma(-1)\,dS=-\pi
$$

Direct parametrization confirms it: $x=\cos t$, $y=\sin t$, $z=0$, so $dx=-\sin t\,dt$, $dy=\cos t\,dt$, $dz=0$, and the integral becomes $\int_0^{2\pi}(-\sin^{2}t)\,dt=-\pi$.

The same example can be recomputed on another surface: take the upper hemisphere $z=\sqrt{1-x^{2}-y^{2}}$, whose boundary is the same circle. The normal is no longer constant, so the computation is harder, but the answer must again be $-\pi$. Choosing the easiest surface is precisely the practical value of Stokes' theorem.

## Four Common Misconceptions

> [!MYTH] A second-kind surface integral does not depend on the side chosen.
> Reversing the side flips all three projections. Before computing, decide which normal words like "outward" and "upper" refer to; the same sphere with outward and inward sides gives answers differing by a minus sign.

> [!MYTH] Gauss's theorem holds for any surface.
> It requires a closed surface with an outward side and continuous partial derivatives throughout the enclosed solid. An open surface must be closed first, and the lid's flux subtracted; if there is a singularity inside, remove it and apply the theorem to what remains.

> [!MYTH] In Stokes' theorem the direction of the curve is arbitrary.
> It must form a right-handed pair with the surface normal. Reversing it flips the surface integral too, so the identity survives; but reversing only one side of the equation is an error.

> [!MYTH] If the curl vanishes everywhere, the field must be a gradient.
> Simple connectivity is also needed. The field $\boldsymbol F=\left(\frac{-y}{x^{2}+y^{2}},\frac{x}{x^{2}+y^{2}},0\right)$ has zero curl away from the $z$-axis, yet its circulation around the axis is $2\pi$, which cannot equal $u(B)-u(A)=0$. This is the three-dimensional version of "equal partials do not imply path independence".

## Exercises

> [!PRACTICE] 1 · Projection
> Compute $\iint_\Sigma z\,dx\,dy$ over the part of the plane $z=1$ inside $x^{2}+y^{2}\le1$, with the upper side.
>
> > [!ANSWER] Show answer
> > The upper side takes the plus sign, the integrand is identically $1$, and the result is the area of the projected disk, $\pi$.

> [!PRACTICE] 2 · Gauss
> Compute $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$ over the outer surface of the cube $0\le x,y,z\le1$.
>
> > [!ANSWER] Show answer
> > The divergence is $1+1+1=3$ and the volume is $1$, so the flux is $3$.

> [!PRACTICE] 3 · Stokes
> Use Stokes' theorem to compute $\oint_\Gamma-y\,dx+x\,dy$, where $\Gamma$ is the unit circle in the plane $z=0$ traversed counterclockwise.
>
> > [!ANSWER] Show answer
> > With $P=-y$, $Q=x$, $R=0$, the $z$-component of the curl is $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=1-(-1)=2$ and the other components vanish. Taking the disk with normal $\boldsymbol k$, the surface area is $\pi$, so the answer is $2\pi$, matching Green's theorem.

> [!PRACTICE] 4 · Symmetry
> Compute $\iint_\Sigma x\,dy\,dz$ over the outside of the sphere $x^{2}+y^{2}+z^{2}=a^{2}$.
>
> > [!ANSWER] Show answer
> > No piecewise projection is needed. Read $x\,dy\,dz$ as the flux of $\boldsymbol F=(x,0,0)$ and use Gauss: the divergence is $1$, so the integral equals the ball's volume $\dfrac{4\pi a^{3}}{3}$.

> [!PRACTICE] 5 · Closing a surface
> Compute $\iint_\Sigma x\,dy\,dz+y\,dz\,dx$ over the part of the cylinder $x^{2}+y^{2}=1$ with $0\le z\le1$, with the outward side and without the two ends.
>
> > [!ANSWER] Show answer
> > Add the two disks to obtain a closed cylinder. With $\boldsymbol F=(x,y,0)$ the divergence is $2$ and the cylinder's volume is $\pi$, so the closed flux is $2\pi$. The ends have normals $\pm\boldsymbol k$, orthogonal to the field, so they contribute nothing; the answer is $2\pi$.

> [!PRACTICE] 6 · Changing the surface
> Use Stokes' theorem to compute $\oint_\Gamma z\,dx+x\,dy+y\,dz$, where $\Gamma$ is the unit circle in the plane $z=0$ traversed counterclockwise.
>
> > [!ANSWER] Show answer
> > With $P=z$, $Q=x$, $R=y$ the curl is $(1,1,1)$, whose dot product with $\boldsymbol k$ is $1$; the disk has area $\pi$, so the answer is $\pi$. Direct parametrization agrees: $\oint x\,dy=\pi$.

## Precise Statement

> [!FORMAL] Precise statement
> Let $\Sigma$ be a piecewise smooth oriented surface with unit normal $\boldsymbol n=(\cos\alpha,\cos\beta,\cos\gamma)$ and let $P$, $Q$, $R$ be continuous on $\Sigma$. Subdivide $\Sigma$ into pieces with signed projections $\Delta S_{yz}$, $\Delta S_{zx}$, $\Delta S_{xy}$ on the coordinate planes and form $\sum(P\Delta S_{yz}+Q\Delta S_{zx}+R\Delta S_{xy})$; if the sum tends to a limit independent of subdivision and sampling as the largest diameter tends to zero, that limit is the second-kind surface integral, and
> $$
> \iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iint_\Sigma\left(P\cos\alpha+Q\cos\beta+R\cos\gamma\right)dS
> $$
> Reversing the side changes the sign of the integral.
> If $\Omega$ is a closed region whose boundary $\Sigma$ is a piecewise smooth closed surface taken outward, and $P,Q,R\in C^{1}(\Omega)$, then
> $$
> \iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV
> $$
> If $\Sigma$ is a piecewise smooth oriented surface with boundary a piecewise smooth closed curve $\Gamma$, if the direction of $\Gamma$ and the normal of $\Sigma$ satisfy the right-hand rule, and $P,Q,R\in C^{1}$, then
> $$
> \oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma\left(\nabla\times\boldsymbol F\right)\cdot\boldsymbol n\,dS
> $$
> When $\Sigma$ is a plane region and no quantity depends on $z$, Stokes' theorem reduces to Green's theorem.

## Connections with Other Lectures

This lecture pushes the ideas of direction and boundary-into-interior from the previous two lectures into three dimensions; the three theorems are one family:

- **With first-kind surface integrals**: the same subdivision and summation, with the positive $dS$ replaced by signed projections. The first kind measures scalar totals and needs no side; the second measures flux and must choose one.
- **With second-kind line integrals**: flux and circulation are two faces of one coin. The line integral accumulates along a one-dimensional boundary, the surface integral along a two-dimensional one; sign reversal under a reversed path and under a reversed side are the same phenomenon in two dimensions.
- **With Green's theorem**: Green is the plane case of Stokes and the two-dimensional shadow of Gauss. All three proofs use one device, interior pieces cancelling in pairs.
- **With triple integrals and partial derivatives**: Gauss converts closed-surface flux into a triple integral whose integrand is divergence, and the cylindrical and spherical volume elements remain useful; divergence and curl are both built from first partial derivatives, one as their trace and the other as their antisymmetric combination.
- **With field theory and later courses**: a field with zero divergence is source-free, one with zero curl is irrotational; on a simply connected region, irrotationality is equivalent to the existence of a potential, which is exactly the path-independence theorem of the previous lecture moved into space.

In one sentence: this lecture writes flux as a second-kind surface integral, then uses Gauss and Stokes to trade boundary integrals for divergence and curl inside — three appearances of a single idea.