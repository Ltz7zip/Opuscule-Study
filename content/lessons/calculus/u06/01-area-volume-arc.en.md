---
slug: "area-volume-arc"
subject: "calculus"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "The Element Method: Area, Volume, and Arc Length"
subtitle: "Write a small piece as a differential, then integrate"
minutes: 36
meta: ["36 min read","Requires definite-integral computation","Mastery level"]
concepts: ["areavol", "defint"]
prereq: ["defint"]
related: ["paramint", "multipleint", "lineint"]
---

## What this lecture sets out to do

These quantities have formulas only for a few standard shapes. Real regions are bounded by several curves, and a solid may have an arbitrary profile. The element method cuts the whole into thin pieces, linearises each piece, writes its contribution, and integrates.

By the end you should be able to:

- explain what each step of the element method does and why the error disappears;
- decide whether to integrate with respect to $x$ or $y$ in rectangular coordinates;
- write the polar area element and choose an interval that traces the curve once;
- choose between discs, washers, and shells;
- write arc-length integrals in rectangular, parametric, and polar form.

## Three lines back

- The element method is local linearisation: over a short span the curve acts like a line and a varying quantity acts like a constant.
- An area element is height times width, a volume element is cross-section area times thickness, and an arc element comes from Pythagoras.
- Adding the elements and taking a limit is a definite integral; the variable of integration and the limits must belong to the same coordinate system.

## Why the element method

Start with a region that has no ready-made formula: the part between $y=x$ and $y=x^{2}$ on $[0,1]$. It is not a rectangle, triangle, or circle, so elementary geometry cannot supply the area.

Cut $[0,1]$ into many vertical strips. At position $x$, the strip height is the upper curve minus the lower curve, $x-x^{2}$, and its width is $dx$. One strip has area

$$
dA=(x-x^{2})\,dx.
$$

Adding the strips and taking the limit gives

$$
A=\int_0^1(x-x^{2})\,dx=\frac12-\frac13=\frac16.
$$

Ten right-endpoint strips give about $0.285$, a hundred about $0.1617$, and refinement stabilises at $1/6$.

## The four steps

Whatever the quantity, the routine has four steps:

1. **Choose the variable**: decide whether $x$, $y$, $\theta$, or $t$ describes the region, and state its range.
2. **Take an element**: pick a typical thin slice and identify its shape.
3. **Linearise**: treat the curve as a line and the varying length as constant, and write $dQ$.
4. **Integrate**: integrate $dQ$ over the range and pass to the limit.

Step 3 is the heart of the method and the usual source of error. “Treat the curve as a line” is not casual; the error must be higher order than $dx$. For area, replacing the curved strip by a rectangle leaves a cap of area $O(dx^{2})$; dividing by $dx$ still tends to $0$, so the total error vanishes.

The same argument works for volume and arc length. For arc length, each chord differs from the arc by $O(dx^{3})$, and there are $O(1/dx)$ pieces, so the total error is $O(dx^{2})\to0$. That is why finitely many chords must be refined by a limit.

> [!NOTE]
> The element method is not “write any approximation and integrate it”. The element $dQ$ must satisfy: the true increment $\Delta Q$ differs from $dQ$ by $o(dx)$. If the error is the same order as $dx$, it survives integration.

## Area in rectangular coordinates

If $f(x)\ge g(x)$ on $[a,b]$, the area between the curves is

$$
A=\int_a^b\left[f(x)-g(x)\right]dx.
$$

Here $f-g$ is the height of a vertical strip and $dx$ its width. If the curves cross, find the intersections first and use “upper minus lower” on each piece.

### Example 1: a parabola and a line

Find the area between $y=x$ and $y=x^{2}$. The intersections satisfy $x=x^{2}$, so $x=0,1$, and $x\ge x^{2}$ in between. Hence

$$
A=\int_0^1(x-x^{2})dx=\frac16.
$$

### Example 2: a sign-changing function

Find the area between $y=\sin x$ and the $x$-axis on $[0,2\pi]$. Since $\sin x$ is positive on $(0,\pi)$ and negative on $(\pi,2\pi)$, split and take absolute values:

$$
A=\int_0^\pi\sin x\,dx+\int_\pi^{2\pi}(-\sin x)\,dx=2+2=4.
$$

Computing $\int_0^{2\pi}\sin x\,dx$ directly gives $0$, the two signed areas cancelling. **A definite integral gives a signed sum; an area gives a nonnegative total.**

### Example 3: integrating with respect to $y$

Some regions are awkward with vertical strips and easy with horizontal ones. Find the area between $x=y^{2}$ and $x=y+2$. The intersections satisfy $y^{2}=y+2$, so $y=-1,2$. The right curve is $y+2$ and the left curve is $y^{2}$:

$$
A=\int_{-1}^{2}\left[(y+2)-y^{2}\right]dy
=\left[\frac{y^{2}}{2}+2y-\frac{y^{3}}{3}\right]_{-1}^{2}
=\frac92.
$$

Integrating in $x$ would require splitting at $x=0$ and $x=1$ and switching boundaries. Choosing the variable is choosing the slicing direction.

## Area in polar coordinates

In polar coordinates a region is bounded by the rays $\theta=\alpha$, $\theta=\beta$ and the curve $r=r(\theta)$. A small angle increment $d\theta$ gives a piece that is approximately a sector of radius $r(\theta)$ and angle $d\theta$. Its area is $\frac12r^{2}d\theta$, so

$$
A=\frac12\int_\alpha^\beta r^{2}(\theta)\,d\theta.
$$

The element is a triangle of area $\frac12\cdot r\cdot r\,d\theta$, not “radius times arc length”; reading $r\,d\theta$ as the base and $r$ as the height explains the $\frac12$.

### Example 4: a circle

The curve $r=2\cos\theta$ is the circle of radius $1$ centred at $(1,0)$, traced once as $\theta$ runs from $-\pi/2$ to $\pi/2$:

$$
A=\frac12\int_{-\pi/2}^{\pi/2}4\cos^{2}\theta\,d\theta
=2\int_{-\pi/2}^{\pi/2}\cos^{2}\theta\,d\theta
=2\cdot\frac{\pi}{2}=\pi.
$$

Taking $[0,2\pi]$ traces the same circle twice and gives $2\pi$, twice the area. That is the standard polar trap.

### Example 5: a cardioid

Find the area enclosed by $r=1+\cos\theta$. The curve closes once over $[0,2\pi]$:

$$
A=\frac12\int_0^{2\pi}\left(1+\cos\theta\right)^{2}d\theta
=\frac12\int_0^{2\pi}\left(1+2\cos\theta+\cos^{2}\theta\right)d\theta.
$$

Since $\int_0^{2\pi}\cos\theta\,d\theta=0$ and $\int_0^{2\pi}\cos^{2}\theta\,d\theta=\pi$,

$$
A=\frac12\left(2\pi+0+\pi\right)=\frac{3\pi}{2}.
$$

Never drop the $\frac12$, and choose an interval that traces the curve once.

## Volumes of revolution

### Discs

Let $y=f(x)\ge0$ be continuous on $[a,b]$, and rotate the curve about the $x$-axis. A slice perpendicular to the axis is a disc of radius $y$ and thickness $dx$, so

$$
V=\pi\int_a^b y^{2}\,dx.
$$

Example: $y=x^{2}$ on $[0,1]$ about the $x$-axis:

$$
V=\pi\int_0^1x^{4}dx=\frac{\pi}{5}.
$$

### Washers

If the region lies between two curves, the rotated slice is an annulus with outer radius $R$ and inner radius $r$:

$$
V=\pi\int_a^b\left[R^{2}(x)-r^{2}(x)\right]dx.
$$

Example: the region between $y=x$ and $y=x^{2}$ on $[0,1]$, rotated about the $x$-axis. The outer radius is $x$ and the inner radius is $x^{2}$:

$$
V=\pi\int_0^1\left(x^{2}-x^{4}\right)dx
=\pi\left(\frac13-\frac15\right)=\frac{2\pi}{15}.
$$

### Shells

About the $y$-axis, if the function is given as $y=y(x)$, solving for $x=x(y)$ may be difficult. Cut the region into vertical shells: radius $x$, height $y(x)$, thickness $dx$. Unrolled, each shell contributes about $2\pi x\,y(x)\,dx$, so

$$
V=2\pi\int_a^b x\,y(x)\,dx.
$$

Example: the same region between $y=x$ and $y=x^{2}$, about the $y$-axis:

$$
V=2\pi\int_0^1x\left(x-x^{2}\right)dx
=2\pi\left(\frac13-\frac14\right)=\frac{\pi}{6}.
$$

Check with washers: integrating in $y$, the right boundary is $x=\sqrt y$ and the left boundary is $x=y$, so

$$
V=\pi\int_0^1\left[y-y^{2}\right]dy=\pi\left(\frac12-\frac13\right)=\frac{\pi}{6}.
$$

Shells avoid solving for $x$; washers make the cross-section obvious. Choose by function and axis.

> [!NOTE]
> The shell radius is the distance from the shell to the axis. About the $y$-axis the radius is $|x|$, so a region crossing the $y$-axis must be split into left and right parts. The disc formula's $y^{2}$ handles the sign automatically.

### General cross-sections

Discs and washers are special cases. If the cross-section perpendicular to an axis has area $A(x)$, then

$$
V=\int_a^b A(x)\,dx.
$$

This applies whenever the slice shape is consistent: squares, triangles, semicircles. Identify the slice and write its area; $\pi y^{2}$ is only one case.

## Arc length

### Rectangular coordinates

On $[x,x+dx]$, the curve is approximately a straight segment with horizontal increment $dx$ and vertical increment $dy=y'\,dx$. Pythagoras gives

$$
ds=\sqrt{dx^{2}+dy^{2}}=\sqrt{1+y'^{2}}\,dx,
$$

so

$$
L=\int_a^b\sqrt{1+y'^{2}}\,dx.
$$

Example: $y=x^{2}$ on $[0,1]$ has $y'=2x$:

$$
L=\int_0^1\sqrt{1+4x^{2}}\,dx
=\frac{\sqrt5}{2}+\frac14\ln\left(2+\sqrt5\right)\approx1.4789.
$$

### Parametric curves

If $x=x(t)$, $y=y(t)$ for $t\in[\alpha,\beta]$, then

$$
ds=\sqrt{x'^{2}(t)+y'^{2}(t)}\,dt,
\qquad
L=\int_\alpha^\beta\sqrt{x'^{2}+y'^{2}}\,dt.
$$

Example: the cycloid $x=t-\sin t$, $y=1-\cos t$ on $[0,2\pi]$:

$$
L=\int_0^{2\pi}\sqrt{(1-\cos t)^{2}+\sin^{2}t}\,dt
=\int_0^{2\pi}\sqrt{2-2\cos t}\,dt.
$$

Since $1-\cos t=2\sin^{2}\frac t2$ and $\sin\frac t2\ge0$ on $[0,2\pi]$,

$$
L=\int_0^{2\pi}2\sin\frac t2\,dt=8.
$$

Parametrisation often removes square roots from $x'$ and $y'$, simplifying the integrand.

### Polar curves

A polar curve $r=r(\theta)$ can be viewed as the parametric curve $x=r\cos\theta$, $y=r\sin\theta$. Differentiating and simplifying gives

$$
ds=\sqrt{r^{2}+r'^{2}}\,d\theta,
\qquad
L=\int_\alpha^\beta\sqrt{r^{2}+r'^{2}}\,d\theta.
$$

Example: the cardioid $r=1+\cos\theta$ on $[0,2\pi]$:

$$
L=\int_0^{2\pi}\sqrt{(1+\cos\theta)^{2}+\sin^{2}\theta}\,d\theta
=\int_0^{2\pi}\sqrt{2+2\cos\theta}\,d\theta.
$$

Now $1+\cos\theta=2\cos^{2}\frac\theta2$, but $\cos\frac\theta2$ is positive on $[0,\pi]$ and negative on $[\pi,2\pi]$, so the absolute value is required:

$$
L=\int_0^{2\pi}2\left|\cos\frac\theta2\right|d\theta=8.
$$

Without the absolute value the integral is $0$, plainly wrong. This is the most commonly missed step.

| Quantity | Element | Formula | Condition |
| --- | --- | --- | --- |
| Rectangular area | $(f-g)dx$ | $\int_a^b(f-g)dx$ | $f\ge g$, split if needed |
| Polar area | $\frac12r^{2}d\theta$ | $\frac12\int_\alpha^\beta r^{2}d\theta$ | curve traced once |
| Volume about $x$-axis | $\pi y^{2}dx$ | $\pi\int_a^b y^{2}dx$ | slices perpendicular to $x$ |
| Washer about $x$-axis | $\pi(R^{2}-r^{2})dx$ | $\pi\int_a^b(R^{2}-r^{2})dx$ | region between two curves |
| Shell about $y$-axis | $2\pi xy\,dx$ | $2\pi\int_a^b xy\,dx$ | radius $x\ge0$, height is the gap |
| Rectangular arc | $\sqrt{1+y'^{2}}dx$ | $\int_a^b\sqrt{1+y'^{2}}dx$ | $y'$ continuous |
| Parametric arc | $\sqrt{x'^{2}+y'^{2}}dt$ | $\int_\alpha^\beta\sqrt{x'^{2}+y'^{2}}dt$ | traced once |
| Polar arc | $\sqrt{r^{2}+r'^{2}}d\theta$ | $\int_\alpha^\beta\sqrt{r^{2}+r'^{2}}d\theta$ | watch the sign inside the root |

## Boundary cases and strategy

**Sign changes.** Area needs $|f-g|$ or splitting. In volume, $y^{2}$ removes the sign, but washer radii are distances from the axis, not “which curve is on top”.

**Multiple intersections.** The order can change several times. Solve all intersections, then use upper minus lower on each piece.

**Axis not on the boundary.** About the $y$-axis, a region on the right has shell radius $x$; a region straddling the axis has radii $|x|$ and must be split. About $x=c$, the radius is $|x-c|$.

**Repeated parametrisation.** A curve has many parametrisations. The circle is traced once on $[0,2\pi]$ and twice on $[0,4\pi]$; the latter gives $4\pi R$. Check the interval first.

**No elementary arc length.** The ellipse

$$
L=\int_0^{2\pi}\sqrt{a^{2}\sin^{2}t+b^{2}\cos^{2}t}\,dt
$$

generally has no elementary antiderivative. Such integrals are elliptic; evaluate numerically or keep the integral form.

**Unbounded derivative, finite length.** For $y=\sqrt x$ on $[0,1]$, $y'=\frac{1}{2\sqrt x}$ is unbounded near $0$, yet the arc length is finite:

$$
L=\int_0^1\sqrt{1+\frac{1}{4x}}\,dx.
$$

This is improper at $0$; use a limit. An unbounded derivative does not imply infinite length.

**Choosing the variable.** A practical test: which slicing direction gives every slice the same boundary formula? If vertical strips need a change, try horizontal; if those split too, try polar or parametric form.

## Four misconceptions

> [!MYTH] Area is just $\int_a^b f(x)dx$.
> If $f$ changes sign, the integral is a signed sum. $\sin x$ integrates to $0$ over $[0,2\pi]$, while the area is $4$. Area needs $|f|$ or a split.

> [!MYTH] Any rotation lets you use $\pi\int y^{2}dx$.
> That formula assumes rotation about the $x$-axis with slices perpendicular to $x$. About the $y$-axis, either solve for $x=x(y)$ and use discs or washers, or use shells. About another axis, replace the radius by distance to that axis.

> [!MYTH] Arc length is close enough to the chord.
> A curve is generally longer than its chord. From $(0,0)$ to $(1,1)$ on $y=x^{2}$, the chord is $\sqrt2\approx1.414$ but the arc is about $1.479$. The chord is only a lower bound, attained for a straight line.

> [!MYTH] The polar area formula works on any interval.
> It computes the signed area swept by a ray. If the interval traces the curve repeatedly, the same area is counted several times. $r=2\cos\theta$ on $[0,2\pi]$ gives $2\pi$, while the true area is $\pi$.

## Practice

> [!PRACTICE] 1 · Area
> Find the area enclosed by $y=x$ and $y=x^{2}$.
>
> > [!ANSWER] Show answer
> > The intersections are $0$ and $1$, so $\int_0^1(x-x^{2})dx=\frac12-\frac13=\frac16$.

> [!PRACTICE] 2 · Discs
> Rotate $y=\sqrt x$ on $[0,1]$ about the $x$-axis and find the volume.
>
> > [!ANSWER] Show answer
> > $V=\pi\int_0^1x\,dx=\frac{\pi}{2}$.

> [!PRACTICE] 3 · Polar area
> Find the area enclosed by $r=2\cos\theta$.
>
> > [!ANSWER] Show answer
> > It is the circle of radius $1$ centred at $(1,0)$, so the area is $\pi$. The formula gives $\frac12\int_{-\pi/2}^{\pi/2}4\cos^{2}\theta\,d\theta=\pi$.

> [!PRACTICE] 4 · Washers
> Rotate the region between $y=x$ and $y=x^{2}$ about the $x$-axis and find the volume.
>
> > [!ANSWER] Show answer
> > Outer radius $x$, inner radius $x^{2}$: $V=\pi\int_0^1(x^{2}-x^{4})dx=\pi\left(\frac13-\frac15\right)=\frac{2\pi}{15}$.

> [!PRACTICE] 5 · Shells
> Rotate the same region about the $y$-axis and find the volume.
>
> > [!ANSWER] Show answer
> > $V=2\pi\int_0^1x(x-x^{2})dx=2\pi\left(\frac13-\frac14\right)=\frac{\pi}{6}$. The washer check gives $\pi\int_0^1(y-y^{2})dy=\frac{\pi}{6}$.

> [!PRACTICE] 6 · Arc length
> Find the arc length of $y=\frac23x^{3/2}$ on $[0,1]$.
>
> > [!ANSWER] Show answer
> > $y'=x^{1/2}$, so $L=\int_0^1\sqrt{1+x}\,dx=\frac23\left(2\sqrt2-1\right)\approx1.219$.

## Formal statement

Let $f,g$ be continuous on $[a,b]$ with $f\ge g$. The area is $\int_a^b(f-g)dx$; if the curves cross, split and use upper minus lower.

If $r(\theta)$ is continuous on $[\alpha,\beta]$ and the curve is traced once there, the sector area is $\frac12\int_\alpha^\beta r^{2}(\theta)d\theta$.

If $y=f(x)\ge0$ is continuous on $[a,b]$, rotation about the $x$-axis gives volume $\pi\int_a^bf^{2}(x)dx$. If the region lies between $y=U(x)$ and $y=L(x)$, washer volume is $\pi\int_a^b[U^{2}(x)-L^{2}(x)]dx$. Shell volume about the $y$-axis is $2\pi\int_a^bx[U(x)-L(x)]dx$, with $x\ge0$.

If $f'$ is continuous, the arc length is $\int_a^b\sqrt{1+f'^{2}(x)}dx$. If $x(t),y(t)$ are continuously differentiable and trace once, the length is $\int_\alpha^\beta\sqrt{x'^{2}+y'^{2}}dt$. If $r,r'$ are continuous, the polar length is $\int_\alpha^\beta\sqrt{r^{2}+r'^{2}}d\theta$.

## How this lecture connects

- **To integral computation**: every formula here uses the substitution, parts, and symmetry of the previous lecture.
- **To parametric equations**: parametric curves make arc length one Pythagoras formula; the next lecture extends this viewpoint.
- **To multiple integrals**: double and triple integrals generalise “cut into pieces” to higher dimensions; the element idea is unchanged.
- **To line integrals**: the arc element $ds$ underlies line integrals of the first kind.

The real training is not memorising formulas but splitting a quantity into small contributions. For a new quantity, ask what one small piece contributes; if that is right, the integral is only the closing step.
