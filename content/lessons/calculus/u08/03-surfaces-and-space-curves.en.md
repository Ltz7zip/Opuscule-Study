---
slug: "surfaces-and-space-curves"
subject: "calculus"
unit: "u08"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Advanced Mathematics · Mastery"
title: "Surfaces and Space Curves"
subtitle: "Recognise the shape first, then project"
minutes: 32
meta: ["32 min read","Requires planes and lines","Mastery level"]
concepts: ["vectorgeo"]
prereq: ["vectorgeo"]
related: ["multi", "matrix"]
---

## What this lecture sets out to do

An equation on paper is only symbols; drawn in space, it becomes a shape. Surfaces appear in engineering drawings, terrain maps, medical imaging, and every 3D modelling package. Analytical geometry asks: **given an equation, can you say what it looks like without plotting it?**

The previous lecture dealt with planes and lines, both flat. This lecture faces curved objects for the first time. The difficulty is recognition, not computation: $x^{2}+y^{2}=2z$ and $x^{2}+y^{2}=2$ differ by one letter, yet the first is a paraboloid of revolution and the second a circular cylinder.

Four tasks: derive the revolution rule; identify cylinders by the missing variable; classify the nine quadrics by slicing; and project curves by elimination while checking for extra branches.

By the end you can classify an equation, sketch its traces, and state boundedness and projection.

## Three lines back

- A surface of revolution comes from rotating a plane curve about an axis: the axis variable stays, and the other squared variable becomes the squared distance to the axis.
- A cylinder is swept by a line moving parallel to itself along a fixed curve, so its equation misses one variable.
- A quadric is identified by slicing: cut it with planes parallel to the coordinate planes and inspect the traces.

## Why reading shape in three dimensions matters

In the plane, $F(x,y)=0$ usually gives a curve. In space, $F(x,y,z)=0$ usually gives a surface. Three coordinates minus one constraint leaves two free parameters, so a surface is two-dimensional:

$$
\mathbf r(u,v)=\big(x(u,v),\,y(u,v),\,z(u,v)\big).
$$

A curve needs one parameter, a surface two. Hence later changes of variables must not mix up dimensions.

A surface can be explicit $z=f(x,y)$, implicit $F(x,y,z)=0$, or parametric $\mathbf r(u,v)$. The explicit form must pass the vertical-line test: each $(x,y)$ gives one $z$. Hence the sphere $x^{2}+y^{2}+z^{2}=1$ cannot be one graph; it splits into upper and lower halves, or needs an implicit or parametric description.

## Reading a surface from its equation

Symmetry is visible in the equation: replacing $x$ by $-x$ and leaving it unchanged gives symmetry about $yOz$; replacing $z$ by $-z$ gives symmetry about $xOy$; swapping $x$ and $y$ gives symmetry about $y=x$.

Boundedness asks whether the equation traps the coordinates. In $x^{2}+y^{2}+z^{2}=1$ every term is nonnegative, so $|x|,|y|,|z|\le 1$. In $z=x^{2}+y^{2}$ the height can grow without limit.

The slicing method cuts with planes parallel to the coordinate planes:

1. $z=z_{0}$ gives horizontal traces, showing each layer;
2. $x=x_{0}$ shows how the surface bends along $x$;
3. $y=y_{0}$ gives the other vertical traces.

## Surfaces of revolution: where the rule comes from

Let $L$ be the curve $f(y,z)=0$ in the $yOz$ plane, rotated about the $z$ axis. A point $(0,y_{0},z_{0})$ keeps its height $z_{0}$ and traces a circle of radius $|y_{0}|$ in the plane $z=z_{0}$:

$$
x^{2}+y^{2}=y_{0}^{2},\qquad y_{0}=\pm\sqrt{x^{2}+y^{2}}.
$$

Substituting into the curve equation:

$$
f\big(\pm\sqrt{x^{2}+y^{2}},\,z\big)=0.
$$

If only $y^{2}$ appears, the sign is absorbed and the rule becomes: about the $z$ axis, replace $y^{2}$ by $x^{2}+y^{2}$ and keep $z$. About $y$, keep $y$ and replace $z^{2}$ by $x^{2}+z^{2}$; about $x$, keep $x$ and replace $y^{2}$ by $y^{2}+z^{2}$.

For example, $y^{2}=2z$ about $z$ gives $x^{2}+y^{2}=2z$, a paraboloid; $z=y$ gives $x^{2}+y^{2}=z^{2}$, a cone; $y^{2}-z^{2}=1$ gives $x^{2}+y^{2}-z^{2}=1$, a hyperboloid of one sheet; $z^{2}=2y$ about $y$ gives $x^{2}+z^{2}=2y$.

Squaring merges the two signs but changes nothing. The danger is the axis: rotating about $z$ keeps $z$ exactly.

## Cylinders: the generator direction decides everything

A cylinder is swept by a straight line moving parallel to itself along a fixed curve. The line is the generator, the curve the directrix, and the generator has a fixed direction.

In equations, the signature is a **missing variable**. A cylinder parallel to $z$ has equation $F(x,y)=0$, with no $z$: for every $(x,y)$ satisfying the planar curve, all points $(x,y,z)$ lie on the surface. The directrix is extruded along $z$. Likewise, $F(x,z)=0$ misses $y$ and has generators parallel to $y$; $F(y,z)=0$ misses $x$.

| Equation | Missing | Generators | Directrix | Name |
| --- | --- | --- | --- | --- |
| $x^{2}+y^{2}=R^{2}$ | $z$ | parallel to $z$ | circle in $xOy$ | circular cylinder |
| $y^{2}=2px$ | $z$ | parallel to $z$ | parabola in $xOy$ | parabolic cylinder |
| $x^{2}-y^{2}=1$ | $z$ | parallel to $z$ | hyperbola in $xOy$ | hyperbolic cylinder |

The directrix need not lie in $xOy$, and the generators need not be parallel to $z$. Find the absent variable; the corresponding axis is the generator direction.

This is where cylinders and surfaces of revolution get confused. $x^{2}+y^{2}=2$ misses $z$ and is a cylinder; $x^{2}+y^{2}=2z$ contains all three variables and is a paraboloid of revolution.

> [!MYTH] Any equation containing $x^{2}+y^{2}$ is a circular cylinder.
> A cylinder must miss $z$, as in $x^{2}+y^{2}=R^{2}$. Once $z$ appears, the surface changes along $z$: $x^{2}+y^{2}=2z$ is a paraboloid, $x^{2}+y^{2}=z^{2}$ a cone.

## Quadric surfaces: nine standard forms

A quadric is a quadratic equation in three variables. After translation, rotation, and scaling, most reduce to nine standard forms:

| Standard equation | Name | Boundedness |
| --- | --- | --- |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}+\dfrac{z^{2}}{c^{2}}=1$ | ellipsoid | bounded |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}=z$ | elliptic paraboloid | unbounded in $z$ |
| $\dfrac{x^{2}}{a^{2}}-\dfrac{y^{2}}{b^{2}}=z$ | hyperbolic paraboloid | unbounded |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}=z^{2}$ | elliptic cone | unbounded |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}-\dfrac{z^{2}}{c^{2}}=1$ | hyperboloid of one sheet | unbounded |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}-\dfrac{z^{2}}{c^{2}}=-1$ | hyperboloid of two sheets | unbounded |
| $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}=1$ | elliptic cylinder | unbounded |
| $y^{2}=2px$ | parabolic cylinder | unbounded |
| $\dfrac{x^{2}}{a^{2}}-\dfrac{y^{2}}{b^{2}}=1$ | hyperbolic cylinder | unbounded |

Two clues replace memorisation. The signs decide the type: three plus signs give an ellipsoid; two plus and one minus give one sheet when the right side is positive, two sheets when negative; one square equal to the sum of two positive squares gives a cone; one square plus two positive squares gives an elliptic paraboloid. A lone $z$ rather than $z^{2}$ usually signals a paraboloid.

## The slicing method: two worked examples

**Example 1.** Identify $9x^{2}+4y^{2}+z^{2}=36$. Dividing by $36$:

$$
\frac{x^{2}}{4}+\frac{y^{2}}{9}+\frac{z^{2}}{36}=1.
$$

All squared terms are positive and the right side is $1$: an ellipsoid. Its intercepts are

$$
(\pm2,0,0),\qquad (0,\pm3,0),\qquad (0,0,\pm6),
$$

with semiaxes $2,3,6$. At $z=z_{0}$:

$$
\frac{x^{2}}{4}+\frac{y^{2}}{9}=1-\frac{z_{0}^{2}}{36}.
$$

For $|z_{0}|<6$ the trace is an ellipse; at $|z_{0}|=6$ it collapses to a point; beyond $6$ there is no real trace. The surface is confined to $-6\le z\le 6$ and is closed and bounded.

**Example 2.** Identify $z=x^{2}-y^{2}$:

- $z=0$: $x^{2}=y^{2}$, so $y=\pm x$, two intersecting lines;
- $z=c\ne0$: $x^{2}-y^{2}=c$, a hyperbola, real axis along $x$ if $c>0$, along $y$ if $c<0$;
- $y=0$: $z=x^{2}$ opens upward; $x=0$: $z=-y^{2}$ opens downward.

It bends upward along $x$ and downward along $y$. The opposite curvatures make a saddle, a hyperbolic paraboloid. It is unbounded in $z$: take $x$ large with $y=0$.

| Slice | Example 1 (ellipsoid) | Example 2 (saddle) |
| --- | --- | --- |
| $z=0$ | ellipse $\dfrac{x^{2}}{4}+\dfrac{y^{2}}{9}=1$ | two lines $y=\pm x$ |
| $z=c$ | ellipse, only $\lvert c\rvert\le6$ | hyperbola, two branches if $c\ne0$ |
| $y=0$ | ellipse | parabola $z=x^{2}$ |
| $x=0$ | ellipse | parabola $z=-y^{2}$ |

The ellipsoid's traces shrink to a point, proving boundedness; the saddle's traces degenerate to two lines, marking a saddle point.

## Space curves: parametric and intersection forms

Parametric form uses one parameter:

$$
x=x(t),\qquad y=y(t),\qquad z=z(t),\qquad t\in I.
$$

The standard example is the helix $x=a\cos t$, $y=a\sin t$, $z=bt$. Its horizontal projection is $x^{2}+y^{2}=a^{2}$; one full turn raises the height by $2\pi b$, the pitch.

Intersection form writes the curve as the meeting of two surfaces:

$$
\begin{cases}F(x,y,z)=0\\ G(x,y,z)=0.\end{cases}
$$

Each equation imposes one constraint, and the common set is usually a curve. The sphere $x^{2}+y^{2}+z^{2}=1$ and the plane $z=\dfrac12$ meet in a circle at height $\dfrac12$.

Parametric form suits tangents, arc length, and motion; intersection form suits elimination and projection.

## Projection: elimination and lifting

The projection onto $xOy$ pushes each $(x,y,z)$ down to $(x,y,0)$. There are two steps:

1. **Eliminate** $z$ from the two surface equations to get $H(x,y)=0$, the projecting cylinder with generators parallel to $z$.
2. **Restrict** to $z=0$:

$$
\begin{cases}H(x,y)=0\\ z=0.\end{cases}
$$

The projecting cylinder and the projection curve differ: $H(x,y)=0$ is a surface in space, while the projection is only its trace in the plane.

Lifting a projected point back to the curve needs a check. Elimination guarantees only necessity: every curve point satisfies the projected equation, but not every projected point lifts back. Squaring, multiplication, or division by a possibly vanishing quantity can add branches.

> [!MYTH] Projecting just means deleting $z$.
> Erasing $z$ usually does not give the correct planar equation. Eliminate $z$ from both surface equations, then set $z=0$; check for extra branches afterwards.

## Two complete projection examples

**Example 3.** Project the intersection of $x^{2}+y^{2}+z^{2}=1$ and $z=\dfrac12$ onto $xOy$. Substituting,

$$
x^{2}+y^{2}+\frac14=1
\iff x^{2}+y^{2}=\frac34.
$$

The projection is $x^{2}+y^{2}=\dfrac34$ in the plane $z=0$, a circle of radius $\dfrac{\sqrt3}{2}$. The original curve is the same circle in $z=\dfrac12$, with circumference

$$
2\pi\cdot\frac{\sqrt3}{2}=\sqrt3\pi\approx5.441.
$$

**Example 4.** Project the intersection of $z=x^{2}+y^{2}$ and $z=2x$ onto $xOy$. Substituting,

$$
2x=x^{2}+y^{2}
\iff (x-1)^{2}+y^{2}=1.
$$

The projection is the circle of radius $1$ centred at $(1,0)$. The curve itself lies in the tilted plane $z=2x$ and parametrises as

$$
x=1+\cos t,\qquad y=\sin t,\qquad z=2+2\cos t,
$$

an ellipse. Projection discards height, so the curve and its shadow need not have the same shape.

## Boundary cases and traps

**Empty set.** The sphere $x^{2}+y^{2}+z^{2}=1$ and the plane $z=2$ give $x^{2}+y^{2}=-3$, with no real solution.

**Collapse to a point or line.** An ellipsoid sliced at $z=\pm c$ gives a point; a saddle sliced at $z=0$ gives two lines. These are degenerate traces, not errors.

**Dimension collapse.** A projection can squash a curve to a segment or a point; $x=0,\ z=0$ projects to the origin.

**Extra branches.** For $z=\sqrt{1-x^{2}-y^{2}}$ and $z=x$, squaring gives $2x^{2}+y^{2}=1$, but the original requires $z=x\ge0$. Only the half with $x\ge0$ is real; the rest is an artefact. Always recheck signs and domains.

**Degenerate quadrics.** $x^{2}+y^{2}+z^{2}=0$ is a point; $x^{2}+y^{2}=0$ is the $z$ axis; $x^{2}-y^{2}=0$ is the pair of planes $y=\pm x$.

## Four common misconceptions

> [!MYTH] Seeing $x^{2}+y^{2}$ means a circular cylinder.
> A cylinder must miss $z$. $x^{2}+y^{2}=2$ is a cylinder, $x^{2}+y^{2}=2z$ a paraboloid, $x^{2}+y^{2}=z^{2}$ a cone.

> [!MYTH] A surface of revolution also replaces the axis variable.
> Rotating about $z$ keeps $z$ and replaces the other squared variable by $x^{2}+y^{2}$.

> [!MYTH] Every quadric is bounded and closed.
> Only the ellipsoid is bounded; hyperboloids, paraboloids, and cylinders extend to infinity.

> [!MYTH] Squaring during elimination is equivalent.
> Squaring discards signs and can add the half with $x<0$ in the hemisphere example.

## Practice

> [!PRACTICE] 1 · Surface of revolution
> Rotate $z^{2}=2y$ about the $y$ axis. Find the surface.
>
> > [!ANSWER] Show answer
> > About $y$, keep $y$ and replace $z^{2}$ by $x^{2}+z^{2}$: $x^{2}+z^{2}=2y$, a paraboloid of revolution.

> [!PRACTICE] 2 · Identify the quadric
> What is $x^{2}+y^{2}-z^{2}=1$? Is it bounded?
>
> > [!ANSWER] Show answer
> > A hyperboloid of one sheet. The slice $z=z_{0}$ is the circle $x^{2}+y^{2}=1+z_{0}^{2}$ for every $z_{0}$, so it is unbounded along $z$.

> [!PRACTICE] 3 · Sphere and plane
> Project the intersection of $x^{2}+y^{2}+z^{2}=4$ and $z=1$ onto $xOy$.
>
> > [!ANSWER] Show answer
> > Substitution gives $x^{2}+y^{2}=3$: a circle of radius $\sqrt3$ in $z=0$.

> [!PRACTICE] 4 · Ellipsoid axes
> What is $9x^{2}+4y^{2}+z^{2}=36$? Give its axis intercepts.
>
> > [!ANSWER] Show answer
> > It is $\dfrac{x^{2}}{4}+\dfrac{y^{2}}{9}+\dfrac{z^{2}}{36}=1$, an ellipsoid, with intercepts $(\pm2,0,0)$, $(0,\pm3,0)$, $(0,0,\pm6)$.

> [!PRACTICE] 5 · Tilted plane through a paraboloid
> Project the intersection of $z=x^{2}+y^{2}$ and $z=2x$ onto $xOy$, and describe the curve.
>
> > [!ANSWER] Show answer
> > Substitution gives $(x-1)^{2}+y^{2}=1$, a circle of radius $1$ at $(1,0)$. The curve is $x=1+\cos t$, $y=\sin t$, $z=2+2\cos t$, an ellipse.

> [!PRACTICE] 6 · Cylinder or surface of revolution?
> Classify $x^{2}+y^{2}=2z$ and $x^{2}+y^{2}=2$.
>
> > [!ANSWER] Show answer
> > $x^{2}+y^{2}=2z$ contains all three variables and is a paraboloid of revolution; $x^{2}+y^{2}=2$ misses $z$ and is a circular cylinder.

## Formal statement

Let $L$ be the curve $f(y,z)=0$ in the $yOz$ plane. Rotating about $z$ gives $f\big(\pm\sqrt{x^{2}+y^{2}},z\big)=0$; if only $y^{2}$ appears, this means replacing $y^{2}$ by $x^{2}+y^{2}$. If $F(x,y,z)=0$ does not involve $z$, the surface is a cylinder with generators parallel to $z$ and directrix $F(x,y)=0$ in $xOy$; other missing variables work similarly. A quadric's type is determined by the sign pattern of its squared terms, and its boundedness by whether the equation gives finite bounds on the coordinates.

Let $\Gamma$ be given by $F(x,y,z)=0$ and $G(x,y,z)=0$. If eliminating $z$ gives $H(x,y)=0$, then the projection of $\Gamma$ onto $xOy$ is contained in

$$
\begin{cases}H(x,y)=0\\ z=0.\end{cases}
$$

Elimination guarantees only necessity. Sufficiency needs a check: every projected point must lift to some $z$ with $(x,y,z)\in\Gamma$; if squaring was used, recheck the original equations.

## How this lecture connects

This lecture closes analytical geometry in space and opens multivariable calculus:

- **with planes and lines**: a plane is the lowest-degree quadric, and its normal vector leads to tangent planes;
- **with functions of several variables**: $z=f(x,y)$ is the graph of a two-variable function, and the projected region is its domain;
- **with partial derivatives**: the two trace slopes at a point are the two partials, and they span the tangent plane;
- **with multiple and surface integrals**: the projected region is a double integral's domain; the partials of a parametrisation span the tangent plane, and their cross product gives the area element.

The next lecture treats a surface as the graph of a function of two variables and studies its domain, limits, and continuity. Approaching along different paths is approaching along different traces.
