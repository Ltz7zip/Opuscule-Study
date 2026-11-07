---
slug: "extrema-and-geometry"
subject: "calculus"
unit: "u09"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lesson 4 · Calculus · Mastery"
title: "Extrema, Constrained Extrema, and Geometric Applications"
subtitle: "Find the stationary points, then let gradients and multipliers finish the job"
minutes: 32
meta: ["32 min read","Requires partial derivatives and the total differential","Mastery"]
concepts: ["extremum-mv", "partial"]
prereq: ["partial"]
related: ["taylormv", "multi"]
---

## Goals

For one variable, solve $f'(x)=0$ and read the sign of $f''(x)$. Neither move survives in two variables. Around a stationary point there are infinitely many directions: a point rising one way and falling another is neither peak nor valley, yet still satisfies $f_x=f_y=0$. Second-order data are now four partial derivatives, which must be combined into one direction-free test.

After this lecture you can:

- justify why $f_x=f_y=0$ is only necessary;
- classify stationary points with $A,B,C,\Delta=AC-B^{2}$ and derive the test;
- recognise $\Delta=0$ as failure of the test;
- write the Lagrange equations and read $\lambda$ geometrically;
- find extrema on a closed region, boundary included;
- write tangent planes and compute directional derivatives.

## Three-line review

- $f_x$ is the rate along $x$ with $y$ fixed: one direction only.
- The total differential $dz=f_x\,dx+f_y\,dy$ is the linear approximation of the surface.
- The gradient $\nabla f=(f_x,f_y)$ points toward fastest increase, with rate $|\nabla f|$.

## Why single-variable methods fall short

Three functions all satisfy $f_x=f_y=0$ at the origin:

$$
f_1=x^{2}+y^{2},\qquad f_2=x^{2}-y^{2},\qquad f_3=xy
$$

$f_1$ has a minimum $0$ there. $f_2$ is positive along the $x$-axis and negative along the $y$-axis: valley one way, peak the other. $f_3$ is $x^{2}>0$ along $y=x$ and $-x^{2}<0$ along $y=-x$.

The one-variable recipe reads the sign of $f''$, but three second-order numbers give any pattern. Concluding a minimum from $f_{xx}>0$ is wrong: $f_2$ has $f_{xx}=2>0$ at the origin and is no extremum. The root cause is direction count: one variable offers two directions, two variables infinitely many, all of which one test must handle. That test is the **quadratic form** of the second-order Taylor expansion.

## Defining an unconstrained extremum

> [!FORMAL] Local extrema
> Let $f$ be defined near $P_0$. If $f(P)\le f(P_0)$ for all $P$ in some neighbourhood of $P_0$, that point is a **local maximum point**; if the inequality is strict off $P_0$, a **strict local maximum point**. Reverse it for minima.

Three readings matter. "There exists a neighbourhood'', not a point: extrema are local. $P_0$ must be interior: boundary comparisons belong to the maximum-and-minimum problem. A maximum is a peak, a minimum a valley, and points like those of $f_2$ and $f_3$ are saddles.

## A necessary condition: the gradient vanishes

> If $f$ has an extremum at $P_0=(x_0,y_0)$ and both first partials exist, then $f_x(P_0)=f_y(P_0)=0$.

The proof reduces to two one-variable problems. Fix $y=y_0$ and set $g(x)=f(x,y_0)$: if $P_0$ is a local maximum of $f$, then $g(x)\le g(x_0)$ nearby, so Fermat gives $g'(x_0)=0$, and $g'(x_0)=f_x(x_0,y_0)$. Fixing $x=x_0$ gives $f_y(x_0,y_0)=0$.

The same proof exposes the limit: partials describe two lines only. Points with $f_x=f_y=0$ are **stationary points**, candidates only. Interior extrema must be stationary; where the partials fail to exist, as with $\sqrt{x^{2}+y^{2}}$ at the origin, a point can still be extremal; boundary points are excluded.

## The second-order test: making the quadratic form definite

Assume continuous second partials near $P_0$ and $\nabla f(P_0)=\mathbf 0$. Expanding to second order,

$$
f(x_0+h,y_0+k)=f(x_0,y_0)+\frac12\left(Ah^{2}+2Bhk+Ck^{2}\right)+o(h^{2}+k^{2}),
$$

with $A=f_{xx}(P_0)$, $B=f_{xy}(P_0)$, $C=f_{yy}(P_0)$. The first-order terms vanish by stationarity, so the sign of $f-f(P_0)$ is the sign of

$$
Q(h,k)=Ah^{2}+2Bhk+Ck^{2}
$$

for $(h,k)\ne(0,0)$; the question is whether that sign is direction-independent. Completing the square for $A\ne 0$,

$$
Q=A\left(h+\frac{B}{A}k\right)^{2}+\frac{AC-B^{2}}{A}\,k^{2}.
$$

With $\Delta=AC-B^{2}$ the square carries the sign of $A$, the second term that of $\Delta/A$. For $\Delta>0$ they agree, so $Q$ has the sign of $A$ everywhere: minimum if $A>0$, maximum if $A<0$. For $\Delta<0$, $k=0,h\ne0$ gives $Q=Ah^{2}$, while $Ah+Bk=0$, $k\ne0$ gives $Q=\Delta k^{2}/A$, the opposite sign: a saddle. For $\Delta=0$, higher-order terms decide. If $A=0$, complete the square in $C$; then $\Delta=-B^{2}$, so $B\ne0$ already flips the sign.

| Discriminant | Sign of $A$ | Quadratic form $Q$ | Conclusion |
| --- | --- | --- | --- |
| $\Delta>0$ | $A>0$ | positive definite | local minimum |
| $\Delta>0$ | $A<0$ | negative definite | local maximum |
| $\Delta<0$ | either | indefinite | saddle |
| $\Delta=0$ | either | semidefinite | test fails |

In matrix language $\Delta$ is the determinant of the Hessian

$$
H=\begin{pmatrix}A&B\\ B&C\end{pmatrix},\qquad \det H=AC-B^{2},
$$

so $\Delta>0,A>0$ is positive definite, $\Delta>0,A<0$ negative definite, $\Delta<0$ indefinite; in two dimensions both the determinant and the top-left entry must be positive, hence two conditions.

> [!NOTE]
> The test says whether a stationary point is an extremum, not whether it is the largest or smallest value, and it compares no two stationary points.

## Example 1: a complete test

Find the extrema of $f(x,y)=x^{3}+y^{3}-3xy$.

**Stationary points.** From $f_x=3x^{2}-3y=0$ and $f_y=3y^{2}-3x=0$, the first gives $y=x^{2}$ and substitution yields

$$
3x^{4}-3x=0\iff x(x^{3}-1)=0.
$$

So $x=0$ or $x=1$, with $y=0$ or $y=1$: the points $(0,0)$ and $(1,1)$.

**Second partials.** $A=f_{xx}=6x$, $B=f_{xy}=-3$, $C=f_{yy}=6y$.

**Classify.** At $(0,0)$, $A=0$, $B=-3$, $C=0$, so

$$
\Delta=AC-B^{2}=0-9=-9<0,
$$

a saddle. At $(1,1)$, $A=6$, $B=-3$, $C=6$, so

$$
\Delta=36-9=27>0,\qquad A=6>0.
$$

The form is positive definite, hence a local minimum with $f(1,1)=1+1-3=-1$.

**Check the saddle by definition.** Along $y=x$, $f(x,x)=x^{2}(2x-3)$ is negative for small $|x|$; along $y=-x$, $f(x,-x)=x^{2}(3-2x)$ is positive. Two lines through the origin give opposite signs: neither maximum nor minimum.

## Boundary cases: a vanishing discriminant and extrema on closed regions

**A vanishing discriminant.** For

$$
f(x,y)=x^{4}+y^{4},\qquad g(x,y)=x^{4}-y^{4}
$$

both have $A=B=C=0$ at the origin, so $\Delta=0$ and the test says nothing. Yet $f$ has a minimum there, while $g$, positive along the $x$-axis and negative along the $y$-axis, is a saddle. One value $\Delta=0$ covering opposite conclusions means failure: sample special paths, or inspect the first non-zero term above second order.

**Extrema on a closed region.** Evaluate $f$ at every interior stationary point; find the extrema on the boundary, usually by reducing to one variable or by multipliers; then compare. The last step is the one most often skipped: the maximum may lie on the boundary alone.

## Constrained extrema: the constraint kills the directions

Real problems constrain their variables: fixed perimeter, material, or budget. The tool is the method of Lagrange multipliers.

Geometry brings $\lambda$ down to earth. Let the constraint be a curve $\varphi(x,y)=0$ and $P_0$ an extremum of $f$ on it. A particle on the curve has position $\mathbf r(t)$, $\mathbf r(0)=P_0$; since $t\mapsto f(\mathbf r(t))$ has an extremum at $t=0$,

$$
\frac{d}{dt}f(\mathbf r(t))\Big|_{t=0}=\nabla f(P_0)\cdot\mathbf r'(0)=0.
$$

Thus $\nabla f(P_0)$ is perpendicular to the tangent of the constraint. Differentiating $\varphi(\mathbf r(t))=0$ gives the same for $\nabla\varphi(P_0)$, and two vectors perpendicular to one tangent must be parallel:

$$
\nabla f(P_0)=\lambda\,\nabla\varphi(P_0).
$$

$\lambda$ is the ratio of two normal vectors, not an invented unknown. At a constrained extremum the level curve of $f$ is **tangent** to the constraint; were they to cross, one could still move along it and change $f$.

The recipe is $L=f+\lambda\varphi$ with $L_x=L_y=L_\lambda=0$:

$$
f_x+\lambda\varphi_x=0,\qquad f_y+\lambda\varphi_y=0,\qquad \varphi=0.
$$

The first two say $\nabla f=-\lambda\nabla\varphi$; the third restores the constraint. Note that $\nabla\varphi(P_0)\ne\mathbf 0$ is essential, that candidates must still be compared, that each extra constraint brings its own multiplier, and that the method is only necessary.

> [!NOTE]
> When the constraint solves for one variable ($x+y=1$ gives $y=1-x$), substitution is faster. Multipliers pay off for implicit constraints, or when symmetry should be preserved.

## Example 2: maximizing a product under a constraint

Maximize $xy$ subject to $x+y=1$. With $f=xy$ and $\varphi=x+y-1$,

$$
L=xy+\lambda(x+y-1),
$$

$$
y+\lambda=0,\qquad x+\lambda=0,\qquad x+y-1=0.
$$

The first two give $x=y=-\lambda$; the constraint gives $x=y=\dfrac12$, hence $xy=\dfrac14$.

**Is it the maximum?** If $x,y\ge0$, as for areas and lengths, the constraint is a closed segment whose endpoints $(1,0)$, $(0,1)$ both give $0$, while the interior candidate gives $\dfrac14>0$. Substitution confirms it:

$$
xy=x(1-x)=\frac14-\left(x-\frac12\right)^{2}\le\frac14.
$$

## Tangent planes, normal lines, and the gradient

A surface has a tangent plane whose normal again comes from the gradient. Let the surface be $F(x,y,z)=0$ with $P_0$ on it, and take a curve $\mathbf r(t)$ on it with $\mathbf r(0)=P_0$. Since $F(x(t),y(t),z(t))=0$ identically, differentiating at $t=0$ gives

$$
F_x(P_0)x'(0)+F_y(P_0)y'(0)+F_z(P_0)z'(0)=0,
$$

that is, $\nabla F(P_0)\cdot\mathbf r'(0)=0$. Every tangent at $P_0$ is perpendicular to $\nabla F(P_0)$, and those tangents span the tangent plane, so $\nabla F(P_0)$ is normal:

$$
F_x(x-x_0)+F_y(y-y_0)+F_z(z-z_0)=0.
$$

For $z=f(x,y)$, take $F=f(x,y)-z$, so $\nabla F=(f_x,f_y,-1)$ and

$$
z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0),
$$

the total differential in geometric dress.

**Example.** For $z=x^{2}+y^{2}$ at $(1,1,2)$, with $F=x^{2}+y^{2}-z$,

$$
\nabla F=(2x,2y,-1)\Big|_{(1,1,2)}=(2,2,-1).
$$

The tangent plane is

$$
2(x-1)+2(y-1)-(z-2)=0\iff 2x+2y-z-2=0,
$$

and the normal line is

$$
\frac{x-1}{2}=\frac{y-1}{2}=\frac{z-2}{-1}.
$$

## Directional derivatives and the gradient

Partials answer two fixed directions; applications ask how fast $f$ changes along an arbitrary direction $\mathbf l$. With unit vector $\mathbf e_{\mathbf l}=(\cos\alpha,\cos\beta)$,

$$
\frac{\partial f}{\partial\mathbf l}\Big|_{P_0}
=\lim_{t\to0}\frac{f(x_0+t\cos\alpha,\ y_0+t\cos\beta)-f(x_0,y_0)}{t},
$$

the derivative at $t=0$ of a one-variable function, so the chain rule gives

$$
\frac{\partial f}{\partial\mathbf l}=f_x(P_0)\cos\alpha+f_y(P_0)\cos\beta=\nabla f(P_0)\cdot\mathbf e_{\mathbf l}.
$$

One inner product handles every direction. Since $\frac{\partial f}{\partial\mathbf l}=|\nabla f|\cos\theta$, the gradient gives the maximum $|\nabla f|$ and steepest ascent, its opposite gives $-|\nabla f|$, and a perpendicular direction gives zero. The last case explains why $\nabla f$ is normal to a level curve: along it $f$ is constant.

**Example.** For $f=x^{2}+y^{2}$ at $(1,1)$ along $\mathbf l=(3,4)$,

$$
\nabla f=(2,2),\qquad |\mathbf l|=5,\qquad \mathbf e_{\mathbf l}=\left(\frac35,\frac45\right),
$$

$$
\frac{\partial f}{\partial\mathbf l}=2\cdot\frac35+2\cdot\frac45=\frac{14}{5}=2.8.
$$

Meanwhile $|\nabla f|=2\sqrt2\approx2.828$, slightly larger, as $(3,4)$ is not aligned with $(2,2)$.

> [!NOTE]
> The direction must be **normalised**. Dotting with $(3,4)$ gives $14$, five times too large; the factor $5$ is $|\mathbf l|$.

## A comparison table

| Problem | Data | Tool | Output | Typical mistake |
| --- | --- | --- | --- | --- |
| Unconstrained extremum | interior point | $\nabla f=\mathbf 0$ and the second-order test | max, min, or saddle | calling a stationary point an extremum |
| Closed-region extremum | whole region | stationary points, boundary, comparison | global max and min | missing boundary and corners |
| Constrained extremum | constraint curve | $\nabla f=\lambda\nabla\varphi$ | candidates on the curve | dropping the constraint or endpoints |
| Tangent plane | surface and point | $\nabla F$ | plane and normal line | using $\nabla f$ for $\nabla F$ |
| Directional derivative | point and direction | $\nabla f\cdot\mathbf e_{\mathbf l}$ | a number | forgetting to normalise |

## Four common misconceptions

> [!MYTH] A stationary point must be an extremum.
> The point $(0,0)$ in Example 1 is stationary with $\Delta<0$ and is a saddle; along $y=x$ and $y=-x$ the signs differ.

> [!MYTH] For a constrained extremum, substitute the constraint and set partials to zero.
> That is the unconstrained recipe, and it erases the constraint; keep the constraint as an equation and solve it with $\nabla f=\lambda\nabla\varphi$.

> [!MYTH] The gradient is the direction of fastest increase, so it is the normal to the tangent plane.
> Both are true of different objects: $\nabla f=(f_x,f_y)$ lies in the plane, the normal to $z=f(x,y)$ in space is $(f_x,f_y,-1)$, and only for $F(x,y,z)=0$ is $\nabla F$ both.

> [!MYTH] A zero discriminant means no extremum.
> $\Delta=0$ only says second-order data are insufficient: $f=x^{4}+y^{4}$ is a minimum at the origin, $g=x^{4}-y^{4}$ a saddle, both with $\Delta=0$.

## Practice

> [!PRACTICE] 1 · Unconstrained extremum
> Find the extrema of $f=x^{2}+y^{2}-2x-4y$.
>
> > [!ANSWER] Show answer
> > $f_x=2x-2=0$ gives $x=1$, $f_y=2y-4=0$ gives $y=2$. With $A=C=2$, $B=0$, $\Delta=4>0$, $A>0$, this is a minimum, $f(1,2)=-5$; indeed $f=(x-1)^{2}+(y-2)^{2}-5$.

> [!PRACTICE] 2 · Constrained extremum
> Maximize $x+y$ subject to $x^{2}+y^{2}=1$.
>
> > [!ANSWER] Show answer
> > $L=x+y+\lambda(x^{2}+y^{2}-1)$ gives $1+2\lambda x=0=1+2\lambda y$, so $x=y=\pm\dfrac{1}{\sqrt2}$, values $\pm\sqrt2$; the maximum is $\sqrt2$.

> [!PRACTICE] 3 · Tangent plane
> Find the tangent plane to $z=xy$ at $(1,2,2)$.
>
> > [!ANSWER] Show answer
> > With $F=xy-z$, $\nabla F=(y,x,-1)=(2,1,-1)$ at $(1,2,2)$, so the plane is $2(x-1)+(y-2)-(z-2)=0$, i.e. $2x+y-z-2=0$.

> [!PRACTICE] 4 · Constrained minimum
> Minimize $f=x^{2}+y^{2}$ subject to $x+y=1$.
>
> > [!ANSWER] Show answer
> > $L=x^{2}+y^{2}+\lambda(x+y-1)$ gives $2x+\lambda=0=2y+\lambda$, so $x=y=\dfrac12$, minimum $\dfrac12$; substitution: $x^{2}+(1-x)^{2}=2\left(x-\dfrac12\right)^{2}+\dfrac12\ge\dfrac12$.

> [!PRACTICE] 5 · Directional derivative
> Find the directional derivative of $f=x^{2}y$ at $(1,1)$ along $\mathbf l=(1,2)$.
>
> > [!ANSWER] Show answer
> > $\nabla f=(2xy,x^{2})=(2,1)$ at $(1,1)$, $|\mathbf l|=\sqrt5$, so $\mathbf e_{\mathbf l}=\left(\dfrac{1}{\sqrt5},\dfrac{2}{\sqrt5}\right)$ and the derivative is $\dfrac{4}{\sqrt5}\approx1.79$.

> [!PRACTICE] 6 · Extremum on a closed region
> Find the maximum and minimum of $f=xy$ on $x^{2}+y^{2}\le 1$.
>
> > [!ANSWER] Show answer
> > The interior point $(0,0)$ gives $0$ and is a saddle. On the boundary, $y+2\lambda x=0=x+2\lambda y$ gives $x^{2}=y^{2}$, so $(x,y)=\left(\pm\dfrac{1}{\sqrt2},\pm\dfrac{1}{\sqrt2}\right)$: maximum $\dfrac12$, minimum $-\dfrac12$.

## Formal statement

Let $f$ have continuous second partials near $P_0$ with $\nabla f(P_0)=\mathbf 0$, and set $A=f_{xx}(P_0)$, $B=f_{xy}(P_0)$, $C=f_{yy}(P_0)$, $\Delta=AC-B^{2}$. Then $\Delta>0,A>0$ gives a strict local minimum, $\Delta>0,A<0$ a strict local maximum, $\Delta<0$ no extremum, and $\Delta=0$ failure of the test.

Let $f,\varphi$ have continuous first partials near $P_0$, with $\varphi(P_0)=0$, $\nabla\varphi(P_0)\ne\mathbf 0$. If $P_0$ is an extremum of $f$ under $\varphi=0$, then for some $\lambda$

$$
\nabla f(P_0)=\lambda\,\nabla\varphi(P_0),\qquad \varphi(P_0)=0.
$$

For $F(x,y,z)=0$ with $\nabla F(P_0)\ne\mathbf 0$ the tangent plane is $\nabla F(P_0)\cdot(M-P_0)=0$. If $f$ is differentiable at $P_0$ and $\mathbf e_{\mathbf l}$ is a unit vector,

$$
\frac{\partial f}{\partial\mathbf l}\Big|_{P_0}=\nabla f(P_0)\cdot\mathbf e_{\mathbf l},
$$

maximal, $|\nabla f(P_0)|$, along the gradient and $-|\nabla f(P_0)|$ opposite to it.

## Connections to other lessons

- **Partial derivatives and the total differential** supply stationarity and the linear approximation behind the tangent plane; the discriminant is a second-order version.
- **Taylor's formula** is the direct source of the test, which fails at $\Delta=0$ because third-order terms hide behind the quadratic part.
- **Implicit functions** provide $\varphi(x,y)=0$ and $F(x,y,z)=0$, on which constrained extrema and tangent planes rest.
- **Multiple integrals** come next, producing surface area, centroids, and moments from integrands such as $|\nabla F|$.

If only one sentence is kept: an extremum question asks in which direction the function grows, and the gradient answers it.