---
slug: "physical-applications"
subject: "calculus"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Integrals in Physics: Work, Pressure, Centroids, Averages"
subtitle: "One element method, four physical quantities"
minutes: 34
meta: ["34 min read","Requires definite-integral computation","Mastery level"]
concepts: ["areavol", "defint"]
prereq: ["defint"]
related: ["areavol", "paramint"]
---

## What this lecture sets out to do

The previous lecture applied the element method to geometry: area, volume, arc length. This lecture applies the same method to physical quantities. They look different, but their integral expressions share a structure: **density × geometric element × a factor that varies with position**. In work the varying factor is displacement; in hydrostatic force it is depth; in a centroid it is the lever arm.

Five quantities are treated here: work by a variable force, work to pump water, hydrostatic force, centroids, and the average value of a function. By the end you should be able to:

- choose the integration variable for each quantity and write the element $dQ$;
- use dimensional analysis to check the integral;
- keep depth, height, and radius in the same coordinate system;
- explain why $x\,dA$ and $\frac12y^{2}dx$ appear in centroid formulas;
- explain why the integral average differs from the endpoint average.

## Three lines back

- The element method has four steps: choose the variable, take an element, write $dQ$, integrate.
- A physical element is usually density times a geometric element, multiplied by a factor that varies with position.
- Limits must belong to the same coordinate as the integrand; never mix depth, height, and radius.

## Why physical quantities can be integrated

Consider a gate whose width varies with depth. The pressure $p=\rho gh$ grows linearly with depth, so different heights of the gate carry different forces. Using “average pressure times area” would first require knowing the average pressure, and that itself needs an integral.

Likewise, a spring pull $F=kx$ changes with extension, so “force times displacement” is no longer valid. Pumping water from a tank lifts each layer through a different distance, so “total weight times some height” is also invalid.

The common feature is that **the accumulated quantity is distributed unevenly in space**. The element method cuts the uneven distribution into thin pieces, treats the varying factor as constant on each piece, computes that piece's contribution, and adds all contributions. As the slices become fine, the approximation error disappears and the limit of the sum is exact.

Mathematically this is no different from the area and volume of the previous lecture. The physical context changes what the element looks like, not how it is integrated.

## The physics version of the element method

A physical element usually has three parts:

$$
dQ=\text{density}\times\text{geometric element}\times\text{varying factor}.
$$

For example:

- variable-force work: $dW=F(x)\,dx$, with force as the varying factor and $dx$ the geometric element;
- pumping: $dW=\rho gA(y)\,y\,dy$, where $\rho gA(y)dy$ is the weight of one layer and $y$ is the lift height;
- hydrostatic force: $dF=\rho gh\cdot w(h)\,dh$, where $\rho gh$ is pressure and $w(h)dh$ is strip area;
- centroid: $x\,dA$ is the moment of an area element about the $y$-axis, with $x$ as the lever arm.

Dimensional analysis is the fastest check. Work has units $\mathrm{J}=\mathrm{N\cdot m}$, so $F(x)dx$ must be force times length. In pumping, $\rho gA(y)dy$ is weight; multiplying by $y$ makes it work. A wrong dimension almost always means a factor is inverted.

Coordinate choice matters just as much. Depth, height, and radius are all lengths but point in different directions. **Once the integration variable is fixed, every geometric quantity must use that same coordinate.** If depth from the rim is $y$, the bottom is at $y=H$ and the lift height is also $y$. If height from the bottom is $h$, the lift height becomes $H-h$. Both are correct, but they cannot be mixed in one problem.

## Work by a variable force

For motion along a line with force $F(x)$, the force is nearly constant on $[x,x+dx]$, so $dW=F(x)\,dx$ and

$$
W=\int_a^bF(x)\,dx.
$$

### Example 1: a spring

A spring with $k=100\ \mathrm{N/m}$ is stretched by $0.2\ \mathrm{m}$ from its natural length. By Hooke's law $F=kx$,

$$
W=\int_0^{0.2}100x\,dx=50x^{2}\Big|_0^{0.2}=2\ \mathrm{J}.
$$

Using the final force $F(0.2)=20\ \mathrm{N}$ times the displacement gives $4\ \mathrm{J}$, exactly double. The force rises from $0$ to $20$, so the average force is only $10\ \mathrm{N}$.

### Example 2: a nonlinear force

Let $F(x)=x^{2}+1$ (newtons) and move an object from $x=0$ to $x=2$ (metres). Then

$$
W=\int_0^2\left(x^{2}+1\right)dx
=\left[\frac{x^{3}}{3}+x\right]_0^2
=\frac83+2=\frac{14}{3}\approx4.67\ \mathrm{J}.
$$

The force is nonlinear, but the method still works: on each small interval the force is treated as constant. As long as $F$ is continuous, the error vanishes as $dx\to0$.

> [!NOTE]
> Work is signed. If the force points opposite to the displacement, $F(x)$ is negative and the integral is negative. Friction does negative work. When computing the work needed to overcome a force, take the opposite of that force so the result is positive.

## Pumping work

Picture the water as horizontal layers, each lifted to the rim. Let the tank have depth $H$, with the rim at $y=0$ and depth $y$ measured downward. A layer at depth $y$ of thickness $dy$ has volume $A(y)dy$, weight $\rho gA(y)dy$, and must be lifted a distance $y$. Hence

$$
dW=\rho gA(y)\,y\,dy,
\qquad
W=\rho g\int_0^HA(y)\,y\,dy.
$$

### Example 3: a cylindrical tank

A cylindrical tank of radius $2\ \mathrm{m}$ and depth $5\ \mathrm{m}$ is full to the rim and pumped out over the top. Here $A(y)=\pi\cdot2^{2}=4\pi$, so

$$
W=\rho g\pi\cdot4\int_0^5y\,dy
=1000\times9.8\times4\pi\times\frac{25}{2}
\approx1.54\times10^{6}\ \mathrm{J}.
$$

That is about $1.5$ megajoules. If the water is only pumped down to half the depth, the lift distance for the remaining layers changes, and both the limits and the factor must be adjusted.

### Example 4: an inverted conical tank

An inverted conical tank has rim radius $R=2\ \mathrm{m}$ and depth $H=4\ \mathrm{m}$, with its vertex at the bottom and water full to the rim. The cross-section radius shrinks linearly:

$$
r(y)=2\left(1-\frac{y}{4}\right)=2-\frac y2,
$$

so $A(y)=\pi\left(2-\frac y2\right)^{2}$. The work is

$$
W=\rho g\pi\int_0^4\left(2-\frac y2\right)^{2}y\,dy.
$$

Expanding,

$$
\left(2-\frac y2\right)^{2}=4-2y+\frac{y^{2}}{4},
$$

and therefore

$$
\int_0^4\left(4y-2y^{2}+\frac{y^{3}}{4}\right)dy
=\left[2y^{2}-\frac{2}{3}y^{3}+\frac{y^{4}}{16}\right]_0^4
=32-\frac{128}{3}+16=\frac{16}{3}.
$$

Hence

$$
W=\rho g\pi\cdot\frac{16}{3}\approx1.64\times10^{5}\ \mathrm{J}.
$$

With the same depth, the cone holds less water and takes an order of magnitude less work. The cross-section function $A(y)$ must be written from the actual shape; the cylinder's $A$ cannot be reused.

> [!NOTE]
> If water is pumped to a height $h$ above the rim, the lift distance becomes $y+h$, and the work is $\rho g\int_0^HA(y)(y+h)dy$. If the tank is not full, the lower limit becomes the current water depth. Limits always describe the water that actually exists.

## Hydrostatic force

At depth $h$ in a fluid at rest the pressure is $p=\rho gh$, acting normal to the surface. On a vertical plate take a horizontal strip of depth $h$, width $w(h)$, and height $dh$. Its area is $w(h)dh$, so

$$
dF=p\cdot w(h)\,dh=\rho gh\,w(h)\,dh,
$$

and

$$
F=\rho g\int_0^Hh\,w(h)\,dh.
$$

### Example 5: a rectangular gate

A vertical gate is $3\ \mathrm{m}$ wide and $2\ \mathrm{m}$ high, with its top edge at the water surface. The width is constant at $3$, so

$$
F=\rho g\int_0^2 3h\,dh
=3\rho g\cdot\frac{2^{2}}{2}
=5.88\times10^{4}\ \mathrm{N}.
$$

Using the pressure at the maximum depth $2\ \mathrm{m}$ over the whole area gives $3\times2\times\rho g\times2=1.176\times10^{5}\ \mathrm{N}$, exactly double. Pressure grows linearly with depth, so the average pressure is half the maximum.

### Example 6: a triangular gate

An isosceles triangular gate has top width $4\ \mathrm{m}$ and height $3\ \mathrm{m}$, with the vertex down and the top edge at the water surface. The width shrinks linearly:

$$
w(h)=4\left(1-\frac h3\right).
$$

Then

$$
F=\rho g\int_0^3h\cdot4\left(1-\frac h3\right)dh
=4\rho g\int_0^3\left(h-\frac{h^{2}}{3}\right)dh
=4\rho g\left(\frac{9}{2}-3\right)=6\rho g=5.88\times10^{4}\ \mathrm{N}.
$$

It equals the result for the $3\times2$ rectangular gate. The two shapes happen to have the same “area times average depth”, not the same geometry.

> [!NOTE]
> If the top edge lies a distance $d$ below the surface, the depth becomes $d+h$, where $h$ is measured down from the top edge. Then $F=\rho g\int_0^H(d+h)w(h)dh$. If the gate is tilted, the strip area also picks up a geometric factor from the angle; the vertical projection width is not enough.

## Centroids

For a uniform lamina, the centroid is defined by first moments:

$$
\bar x=\frac{\displaystyle\int_D x\,dA}{\displaystyle\int_D dA},
\qquad
\bar y=\frac{\displaystyle\int_D y\,dA}{\displaystyle\int_D dA}.
$$

The denominator is area; the numerators are moments about the $y$- and $x$-axes. For nonuniform density, both numerator and denominator carry $\rho(x,y)$; for uniform density it cancels.

### Example 7: the region under a parabola

Find the centroid of the region bounded by $y=x^{2}$, the $x$-axis, and $x=1$. The area is

$$
A=\int_0^1x^{2}dx=\frac13.
$$

The horizontal coordinate is

$$
\bar x=\frac{\int_0^1x\cdot x^{2}dx}{1/3}
=\frac{1/4}{1/3}=\frac34.
$$

For the vertical coordinate, the moment of a vertical strip about the $x$-axis is $\frac12y^{2}dx$, not $y\,dx$: the strip extends from $0$ to $y$, so its own centroid is at height $y/2$, and the moment is $(y\,dx)\cdot\frac y2=\frac12y^{2}dx$. Thus

$$
\bar y=\frac{\frac12\int_0^1\left(x^{2}\right)^{2}dx}{1/3}
=\frac{1/10}{1/3}=\frac{3}{10}.
$$

The centroid is $\left(\frac34,\frac{3}{10}\right)$, inside the region.

> [!NOTE]
> Pappus's theorem: rotating a plane region about an axis that does not intersect it gives volume $V=2\pi dA$, where $d$ is the distance from the centroid to the axis. Check it on the example: about the $y$-axis, $d=\bar x=3/4$, so $V=2\pi\cdot\frac34\cdot\frac13=\frac{\pi}{2}$, matching the shell calculation $2\pi\int_0^1x\cdot x^{2}dx=\frac{\pi}{2}$.

A centroid need not lie inside the region. For a crescent or an L-shape it may fall in empty space. It is the balance point of first moments, not “the most central point of the material”.

## Average value

The integral average of $f$ on $[a,b]$ is

$$
\bar f=\frac{1}{b-a}\int_a^bf(x)\,dx.
$$

Geometrically it is the height of a rectangle of width $b-a$ with the same area as the region under the curve.

### Example 8: average speed

For $v(t)=3t^{2}$ on $[0,2]$,

$$
\bar v=\frac12\int_0^23t^{2}dt
=\frac12\cdot8=4.
$$

The average speed is $4$, while the arithmetic mean of the endpoints is $\frac{0+12}{2}=6$. They differ because the speed grows quickly in the second half, so time is spent mostly at smaller speeds.

The mean value theorem for integrals guarantees that if $f$ is continuous, some $c\in[a,b]$ satisfies $f(c)=\bar f$. Here $\bar v=4$ is attained at $t=\sqrt{4/3}\approx1.155$.

### Example 9: average of a sine

$$
\overline{\sin x}=\frac{1}{\pi}\int_0^\pi\sin x\,dx=\frac{2}{\pi}\approx0.637.
$$

This is not $\frac{\sin0+\sin\pi}{2}=0$. The sine is positive over most of the interval, so its average is positive.

> [!NOTE]
> Average value and root-mean-square are different. The RMS is $\sqrt{\frac{1}{b-a}\int_a^bf^{2}dx}$, the square root of the average of the square. For $v=3t^{2}$ on $[0,2]$, the average is $4$ and the RMS is $\sqrt{28.8}\approx5.37$. They are not interchangeable.

## Decision table

| Quantity | Element | Formula | Key coordinate |
| --- | --- | --- | --- |
| Variable-force work | $F(x)dx$ | $\int_a^bF\,dx$ | direction of displacement |
| Pumping work | $\rho gA(y)y\,dy$ | $\rho g\int_0^HA(y)y\,dy$ | depth $y$ down from the rim |
| Hydrostatic force | $\rho gh\,w(h)dh$ | $\rho g\int_0^Hh\,w(h)dh$ | depth $h$ down from the surface |
| Centroid abscissa | $x\,dA$ | $\int x\,dA\big/\int dA$ | lever arm to the $y$-axis |
| Centroid ordinate | $\frac12y^{2}dx$ | $\int\frac12y^{2}dx\big/\int y\,dx$ | strip centroid at $y/2$ |
| Average value | $f\,dx$ | $\frac{1}{b-a}\int_a^bf\,dx$ | interval length |

## Boundary cases

**Changing cross-section.** In pumping and pressure problems, $A(y)$ or $w(h)$ must come from the geometry. A cylinder, cone, spherical cap, and inverted triangle all have different cross-section functions; one formula is not enough.

**Coordinate shifts.** A gate whose top edge is below the surface, a partly full tank, or a pump target above the rim all change the varying factor. Draw the picture, put every length on one axis, then write the integral.

**Nonuniform density.** In centroid formulas, a density that varies with position cannot be cancelled; it stays in numerator and denominator. For a nonuniform fluid, pressure also uses $\rho(h)$.

**Centroid outside the region.** A centroid is a balance point of moments and may lie outside the material. Do not test an answer by “it looks central”; use symmetry and moment balance.

**Average versus weighted average.** The integral average weights by length uniformly. If the physical quantity is weighted by time, area, or mass, the definition changes. Average speed with respect to time and with respect to distance are different quantities.

**Units and order of magnitude.** Estimate before computing. One cubic metre of water weighs about $9.8\times10^{3}\ \mathrm{N}$, so pumping a $5\ \mathrm{m}$ cylindrical tank should cost megajoules. A result of a few tens of joules means a radius or depth was substituted wrong.

## Four misconceptions

> [!MYTH] Work equals force times displacement.
> Only for constant force. Stretching the spring with $F=100x$ by $0.2\ \mathrm{m}$ takes $2\ \mathrm{J}$. Using the final force $20\ \mathrm{N}$ times displacement gives $4\ \mathrm{J}$, exactly double. A variable force must be integrated.

> [!MYTH] Water force is $\rho g$ times maximum depth times area.
> Pressure grows linearly with depth, so the maximum depth overestimates. The $3\times2$ gate takes $5.88\times10^{4}\ \mathrm{N}$; the maximum-depth shortcut gives $1.176\times10^{5}\ \mathrm{N}$, exactly twice.

> [!MYTH] The average is the mean of the endpoint values.
> $\frac{f(a)+f(b)}{2}$ generally differs from the integral average. For $v=3t^{2}$ on $[0,2]$, the endpoints average to $6$ and the integral average is $4$. For $\sin x$ on $[0,\pi]$, the endpoints average to $0$ and the integral average is $2/\pi$.

> [!MYTH] A centroid always lies inside the region.
> A centroid is a balance point of moments. For a crescent, an L-shape, or a region with a hole it may fall in empty space. It need not even lie on the material, but its definition is unaffected.

## Practice

> [!PRACTICE] 1 · Spring work
> A spring with $k=200\ \mathrm{N/m}$ is compressed by $0.1\ \mathrm{m}$. Find the work.
>
> > [!ANSWER] Show answer
> > $W=\int_0^{0.1}200x\,dx=100\times0.01=1\ \mathrm{J}$.

> [!PRACTICE] 2 · Rectangular gate
> A rectangular gate $2\ \mathrm{m}$ wide and $3\ \mathrm{m}$ high has its top edge at the water surface. Find the force on one side.
>
> > [!ANSWER] Show answer
> > $F=\int_0^3 2\rho gh\,dh=2\rho g\cdot\frac{9}{2}=8.82\times10^{4}\ \mathrm{N}$.

> [!PRACTICE] 3 · Integral average
> Find the average value of $f(x)=x^{2}$ on $[0,3]$.
>
> > [!ANSWER] Show answer
> > $\bar f=\frac13\int_0^3x^{2}dx=\frac13\times9=3$.

> [!PRACTICE] 4 · Pumping
> A cylindrical tank of radius $1\ \mathrm{m}$ and depth $3\ \mathrm{m}$ is full to the rim and pumped out over the top. Find the work.
>
> > [!ANSWER] Show answer
> > $W=\rho g\pi\int_0^3y\,dy=1000\times9.8\times\pi\times\frac{9}{2}\approx1.39\times10^{5}\ \mathrm{J}$.

> [!PRACTICE] 5 · Triangular gate
> An isosceles triangular gate has top width $4\ \mathrm{m}$, height $3\ \mathrm{m}$, vertex down, and top edge at the water surface. Find the force on one side.
>
> > [!ANSWER] Show answer
> > $w(h)=4\left(1-\frac h3\right)$, so $F=\rho g\int_0^3h\cdot4\left(1-\frac h3\right)dh=4\rho g\left(\frac92-3\right)=5.88\times10^{4}\ \mathrm{N}$.

> [!PRACTICE] 6 · Centroid
> Find the centroid of the region bounded by $y=\sqrt x$, the $x$-axis, and $x=1$.
>
> > [!ANSWER] Show answer
> > The area is $A=\frac23$; $\bar x=\frac{\int_0^1x\sqrt x\,dx}{2/3}=\frac{2/5}{2/3}=\frac35$; $\bar y=\frac{\frac12\int_0^1x\,dx}{2/3}=\frac{1/4}{2/3}=\frac38$.

## Formal statement

Let $F$ be continuous on $[a,b]$. The work done by a force along a line from $a$ to $b$ is

$$
W=\int_a^bF(x)\,dx.
$$

Let a tank have depth $H$ and horizontal cross-section $A(y)$ continuous on $[0,H]$, with $y$ measured down from the rim. Pumping it to the rim costs

$$
W=\rho g\int_0^HA(y)\,y\,dy.
$$

If a vertical plate has width $w(h)$ at depth $h$, the force on one side is

$$
F=\rho g\int_0^Hh\,w(h)\,dh.
$$

For a plane region $D$ of finite area, the centroid is

$$
\bar x=\frac{\int_Dx\,dA}{\int_DdA},
\qquad
\bar y=\frac{\int_Dy\,dA}{\int_DdA}.
$$

If $f$ is continuous on $[a,b]$, its integral average is

$$
\bar f=\frac{1}{b-a}\int_a^bf(x)\,dx.
$$

The mean value theorem for integrals guarantees some $c\in[a,b]$ with $f(c)=\bar f$. If a plane region rotates about an axis not intersecting it, Pappus's theorem gives $V=2\pi dA$, with $d$ the distance from the centroid to the axis.

## How this lecture connects

- **To geometric applications**: the element method becomes “density × geometric element × varying factor”. The $2\pi x$ in the shell method is the distance travelled by the centroid.
- **To integral computation**: every physical quantity ends in a definite integral; substitution, parts, and symmetry all carry over.
- **To parametric equations**: if a gate profile or tank meridian is given parametrically, the width and height in the element must be written in the parameter, and the integration variable changes.
- **To probability and statistics**: average value, weighted average, and centroid have the same structure as expectation: integrate “value times weight”, then divide by total weight.

The physics version of the element method adds only two habits: **check units, then check coordinates**. Correct units mean the “density × geometry × varying factor” structure is right; correct coordinates mean the limits and the varying factor share one reference frame. After those checks, only the computation remains.
