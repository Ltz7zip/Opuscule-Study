---
slug: "chain-rule-implicit"
subject: "calculus"
unit: "u09"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lesson 3 · Calculus · Mastery mode"
title: "Composite and Implicit Functions of Several Variables"
subtitle: "Draw the dependency tree, then read the formula off the branches"
minutes: 34
meta: ["34 min read","Requires partial derivatives","Mastery level"]
concepts: ["implicit", "partial"]
prereq: ["partial"]
related: ["multi", "deriv"]
---

## Learning goals

Last lecture split the change of a multivariable function into partial derivatives and used the total differential for linear approximation, but assumed the variables of $z$ were $x$ and $y$ themselves. In practice $z$ usually depends on $x$ through intermediaries, which may be nested. The volume $V=\pi r^{2}h$ of a cylinder whose radius and height both change with time is one example: two dependency chains must be combined.

This lecture turns "rates travel along dependency chains" into a rule. The chain rule for composites comes first, with a fixed way to draw the dependency tree; the same idea applied to $F(x,y)=0$ gives $y'=-F_{x}/F_{y}$ without solving for $y$; systems then bring in Jacobian determinants, because the step is still solving a linear system.

It follows from the previous lecture: the chain rule is $dz=f_{u}du+f_{v}dv$ with $du,dv$ expanded; it leads to Lagrange multipliers, where a constraint becomes an implicit function.

By the end you should be able to:

- draw the tree for a composite of any depth and write its partials;
- distinguish $\partial z/\partial x$ from $dz/dt$ and explain the extra term;
- use the implicit formula for first and second derivatives;
- write a system's partials with Jacobians and see why the formula fails at $J=0$.

## Three-line recap

- Each chain-rule term is an outer partial times an inner partial; paths to the same variable add.
- An implicit function $F(x,y)=0$ has $y'=-F_{x}/F_{y}$, provided $F_{y}\ne0$.
- For systems, Jacobians decide whether the underlying linear system can be solved.

## Why the chain rule is needed

A conical sand pile has volume

$$
V=\frac{\pi}{3}r^{2}h
$$

with both $r=r(t)$ and $h=h(t)$ changing. Substituting first is possible in principle but messy, and impossible when $r,h$ are known only implicitly. The better view: $V$ depends on $t$ through intermediaries. Time affects $r$, which affects $V$; time also affects $h$, which affects $V$. Rates multiply along each chain and add across parallel chains:

$$
\frac{dV}{dt}=\frac{\partial V}{\partial r}\frac{dr}{dt}+\frac{\partial V}{\partial h}\frac{dh}{dt}
=\frac{2\pi}{3}rh\,\frac{dr}{dt}+\frac{\pi}{3}r^{2}\frac{dh}{dt}
$$

This holds because the increment of $V$ equals its linear part plus a higher-order remainder, and that linear part is exactly the two partials times their increments. Note that $V_{r}+V_{h}$ would be wrong: each partial measures change per unit of an intermediate variable that is itself moving, so it must be converted by multiplying by $\dfrac{dr}{dt}$ or $\dfrac{dh}{dt}$.

## The dependency tree

Draw the dependence as a tree: start at the dependent variable, draw down to every independent variable labelling each edge with its partial derivative, multiply along a path, and add the paths that end at the same variable.

If $z=f(u,v)$ is differentiable and $u=u(x,y)$, $v=v(x,y)$ have partials, there are two paths to $x$, so

$$
\frac{\partial z}{\partial x}=f_{u}\frac{\partial u}{\partial x}+f_{v}\frac{\partial v}{\partial x},\qquad
\frac{\partial z}{\partial y}=f_{u}\frac{\partial u}{\partial y}+f_{v}\frac{\partial v}{\partial y}
$$

Paths count terms, which catches omissions. The common structures:

| Structure | Free variables | Formula |
| --- | --- | --- |
| $z=f(u,v)$, $u,v$ functions of $x,y$ | $x,y$ | $z_{x}=f_{u}u_{x}+f_{v}v_{x}$ |
| $z=f(x,y)$, $y=y(x)$ | $x$ | $\dfrac{dz}{dx}=f_{x}+f_{y}y'$ |
| $z=f(u)$, $u=u(x,y)$ | $x,y$ | $z_{x}=f'(u)u_{x}$ |
| $z=f(x,y,t)$, $x,y$ functions of $t$ | $t$ | $\dfrac{dz}{dt}=f_{x}x'+f_{y}y'+f_{t}$ |

Remember that $f_{u}$ is evaluated at $\big(u(x,y),v(x,y)\big)$.

### Example 1: a two-layer composite

Let $z=u^{2}v$ with $u=xy$ and $v=x^{2}-y^{2}$. Find $z_{x}$, $z_{y}$ and their values at $(1,1)$.

The outer partials, treating $u,v$ as independent, are $f_{u}=2uv$ and $f_{v}=u^{2}$; the inner ones are

$$
u_{x}=y,\quad u_{y}=x,\quad v_{x}=2x,\quad v_{y}=-2y
$$

Multiply along the paths and add:

$$
z_{x}=2uv\cdot y+u^{2}\cdot 2x,\qquad
z_{y}=2uv\cdot x+u^{2}\cdot(-2y)
$$

Substituting $u=xy$, $v=x^{2}-y^{2}$:

$$
z_{x}=2xy(x^{2}-y^{2})\,y+2x^{3}y^{2}=2x^{3}y^{2}-2xy^{4}+2x^{3}y^{2}=4x^{3}y^{2}-2xy^{4}
$$

$$
z_{y}=2xy(x^{2}-y^{2})\,x-2x^{2}y^{2}\,y=2x^{4}y-2x^{2}y^{3}-2x^{2}y^{3}=2x^{4}y-4x^{2}y^{3}
$$

At $(1,1)$, $z_{x}=4-2=2$ and $z_{y}=2-4=-2$. Check: direct expansion agrees.

A third layer just lengthens the path. For $z=f(u)$, $u=g(v)$, $v=h(x)$,

$$
\frac{dz}{dx}=f'(u)\cdot g'(v)\cdot h'(x)
$$

## The total derivative

Suppose $z=f(x,y)$ and $y=y(x)$. Only $x$ is free, so the derivative is written $\dfrac{dz}{dx}$ and called the **total derivative**:

$$
\frac{dz}{dx}=f_{x}+f_{y}\,y'
$$

To derive it, divide $\Delta z=f_{x}\Delta x+f_{y}\Delta y+o(\rho)$ by $\Delta x$, where $\rho=\sqrt{\Delta x^{2}+\Delta y^{2}}$; then $\dfrac{\Delta y}{\Delta x}\to y'$ and $\dfrac{o(\rho)}{\Delta x}\to0$.

For $z=xy$ with $x=\cos t$, $y=\sin t$,

$$
\frac{dz}{dt}=f_{x}\left(-\sin t\right)+f_{y}\left(\cos t\right)=y(-\sin t)+x\cos t=-\sin^{2}t+\cos^{2}t=\cos 2t
$$

and direct substitution $z=\dfrac12\sin 2t$ agrees. The notation matters: with $x,y$ free, $\dfrac{\partial z}{\partial x}=f_{x}$ freezes $y$; with $y=y(x)$, the total derivative adds $f_{y}y'$.

## Implicit differentiation

Many equations cannot be solved for $y$: $y^{5}+2y-x=0$ and $e^{y}+xy=e$ are examples. Yet the curve and its tangent still exist. The **implicit function theorem** says that if $F(x,y)$ has continuous partials near $P_{0}$, $F(P_{0})=0$ and $F_{y}(P_{0})\ne0$, then $F=0$ determines a unique continuously differentiable $y=y(x)$ near $P_{0}$.

Substituting $y=y(x)$ gives the identity $F\big(x,y(x)\big)\equiv0$. Differentiating in $x$ uses the chain rule with two paths:

$$
F_{x}\cdot1+F_{y}\cdot y'=0
\quad\Longrightarrow\quad
\frac{dy}{dx}=-\frac{F_{x}}{F_{y}}
$$

Nothing new was introduced, and the denominator is exactly the theorem's condition. Geometrically, $F_{y}=0$ means a vertical tangent, so $y$ is not single-valued in $x$ nearby. Also $(F_{x},F_{y})$ is a normal to the curve, so the slope is perpendicular to it: $F_{x}\cdot1+F_{y}\cdot(-F_{x}/F_{y})=0$.

### Example 2: first and second derivatives on a circle

For $x^{2}+y^{2}=1$, find $y'$, $y''$ at $\left(\dfrac12,\dfrac{\sqrt3}{2}\right)$ and the tangent there.

With $F=x^{2}+y^{2}-1$, $F_{x}=2x$ and $F_{y}=2y$, so

$$
y'=-\frac{2x}{2y}=-\frac{x}{y}
$$

At the point, $y'=-\dfrac{1/2}{\sqrt3/2}=-\dfrac{1}{\sqrt3}\approx-0.577$, a negative slope as expected on the first-quadrant arc. The tangent is

$$
y-\frac{\sqrt3}{2}=-\frac{1}{\sqrt3}\left(x-\frac12\right)
\quad\Longleftrightarrow\quad
x+\sqrt3\,y=2
$$

Check: $\dfrac12+\sqrt3\cdot\dfrac{\sqrt3}{2}=2$.

For the second derivative, use the quotient rule on $y'=-x/y$, remembering that $y$ depends on $x$:

$$
y''=-\frac{1\cdot y-x\cdot y'}{y^{2}}=-\frac{y-x\left(-x/y\right)}{y^{2}}=-\frac{y^{2}+x^{2}}{y^{3}}=-\frac{1}{y^{3}}
$$

The last step uses $x^{2}+y^{2}=1$. At the point, $y''=-\dfrac{1}{(\sqrt3/2)^{3}}=-\dfrac{8}{3\sqrt3}\approx-1.540$, so the arc is concave down. At no stage was $y=\sqrt{1-x^{2}}$ needed.

## Implicit functions in three variables

If $F(x,y,z)=0$ determines $z=z(x,y)$ with $F_{z}\ne0$, differentiating the identity in $x$ and $y$ gives

$$
F_{x}+F_{z}z_{x}=0,\qquad F_{y}+F_{z}z_{y}=0
$$

hence

$$
\frac{\partial z}{\partial x}=-\frac{F_{x}}{F_{z}},\qquad
\frac{\partial z}{\partial y}=-\frac{F_{y}}{F_{z}}
$$

For $x^{2}+y^{2}+z^{2}=1$, $z_{x}=-\dfrac{x}{z}$ and $z_{y}=-\dfrac{y}{z}$; at $\left(\dfrac12,\dfrac12,\dfrac{\sqrt2}{2}\right)$ both equal $-\dfrac{1}{\sqrt2}\approx-0.707$, matching the explicit computation on the upper hemisphere. Here $F_{z}\ne0$ says the surface is not vertical; if $F_{z}=0$ the tangent plane is vertical and $z$ is not single-valued in $x,y$, the analogue of a vertical tangent for $F_{y}=0$.

The tangent plane follows from the normal $\mathbf n=(F_{x},F_{y},F_{z})$:

$$
F_{x}(P_{0})(x-x_{0})+F_{y}(P_{0})(y-y_{0})+F_{z}(P_{0})(z-z_{0})=0
$$

For the unit sphere at that point, $\mathbf n=(1,1,\sqrt2)$ and the tangent plane is $x+y+\sqrt2 z=2$.

## Systems and the Jacobian

Suppose $F(x,y,u,v)=0$ and $G(x,y,u,v)=0$ determine $u,v$ as functions of $x,y$. Differentiating both in $x$, holding $y$ fixed:

$$
\begin{cases}
F_{u}u_{x}+F_{v}v_{x}=-F_{x},\\
G_{u}u_{x}+G_{v}v_{x}=-G_{x}.
\end{cases}
$$

This is a linear system for $u_{x},v_{x}$, with determinant the Jacobian

$$
J=\frac{\partial(F,G)}{\partial(u,v)}=
\begin{vmatrix}F_{u} & F_{v}\\ G_{u} & G_{v}\end{vmatrix}
=F_{u}G_{v}-F_{v}G_{u}
$$

When $J\ne0$, Cramer's rule gives

$$
u_{x}=-\frac{1}{J}\frac{\partial(F,G)}{\partial(x,v)},\qquad
v_{x}=-\frac{1}{J}\frac{\partial(F,G)}{\partial(u,x)}
$$

So the Jacobian is not a new formula: it is the unique-solvability condition of a linear system, renamed. $J\ne0$ says the two constraints act independently on $u,v$.

### Example 3: solving a system

Let $u+v-x=0$ and $uv-y=0$. Find $u_{x}$ and $v_{x}$.

With $F=u+v-x$, $G=uv-y$, the partials are

$$
F_{u}=1,\ F_{v}=1,\ F_{x}=-1;\qquad G_{u}=v,\ G_{v}=u,\ G_{x}=0
$$

and

$$
J=F_{u}G_{v}-F_{v}G_{u}=u-v
$$

so the formula applies when $u\ne v$. The determinants are

$$
\frac{\partial(F,G)}{\partial(x,v)}=F_{x}G_{v}-F_{v}G_{x}=-u,\qquad
\frac{\partial(F,G)}{\partial(u,x)}=F_{u}G_{x}-F_{x}G_{u}=v
$$

hence

$$
u_{x}=\frac{u}{u-v},\qquad
v_{x}=-\frac{v}{u-v}
$$

Check: differentiating gives $u_{x}+v_{x}=1$ and $vu_{x}+uv_{x}=0$, which the results satisfy.

## When the conditions fail

**$F_{y}=0$.** On $x^{2}+y^{2}=1$ at $(1,0)$, $F_{y}=2y=0$ and the formula blows up. This is geometry: the tangent is vertical and $y$ is not single-valued in $x$ near $(1,0)$. Swap the roles and use

$$
\frac{dx}{dy}=-\frac{F_{y}}{F_{x}}
$$

At $(1,0)$, $F_{x}=2$ gives $\dfrac{dx}{dy}=0$, the signature of a vertical tangent. A failed formula means the wrong dependent variable was chosen.

**$J=0$.** Take $F=u+v-x=0$ and $G=2u+2v-y=0$. Here $J=1\cdot2-1\cdot2=0$. The equations show why: the second says $2(u+v)=y$ while the first says $u+v=x$, so the system is consistent only when $y=2x$, and even then only the sum $u+v$ is fixed, leaving infinitely many splits. No implicit function exists, so partial derivatives are meaningless.

| Case | Given | Wanted | Formula | Condition |
| --- | --- | --- | --- | --- |
| Two-layer composite | $z=f(u,v)$, $u,v$ functions of $x,y$ | $z_{x},z_{y}$ | $f_{u}u_{x}+f_{v}v_{x}$ | $f$ differentiable, $u,v$ have partials |
| Implicit in two variables | $F(x,y)=0$ | $y'$ | $-F_{x}/F_{y}$ | continuous partials, $F_{y}\ne0$ |
| Implicit in three variables | $F(x,y,z)=0$ | $z_{x},z_{y}$ | $-F_{x}/F_{z}$, $-F_{y}/F_{z}$ | $F_{z}\ne0$ |
| System | $F=G=0$ | $u_{x},v_{x}$ | Cramer's rule | Jacobian $J\ne0$ |

## Four common misconceptions

> [!MYTH] One multiplication is enough.
> Multiply once per layer. For $z=f(u)$, $u=g(v)$, $v=h(x)$ the derivative is $f'(u)g'(v)h'(x)$; skipping a layer breaks both the units and the value.

> [!MYTH] Implicit differentiation requires solving for $y$ first.
> Most equations cannot be solved, and none need to be. For $y^{5}+2y-x=0$ no explicit solution exists, yet $y'=-F_{x}/F_{y}$ works wherever $F_{y}=5y^{4}+2\ne0$.

> [!MYTH] The minus sign in the implicit formula is optional.
> It comes from moving terms in $F_{x}+F_{y}y'=0$. Drop it and $x^{2}+y^{2}=1$ predicts a positive slope in the first quadrant, contradicting the picture.

> [!MYTH] $\dfrac{\partial z}{\partial x}$ and $\dfrac{dz}{dx}$ differ only in notation.
> When $y=y(x)$, $\dfrac{dz}{dx}=f_{x}+f_{y}y'$, one term more than $f_{x}$. The symbol $\partial$ freezes the other variables; $d$ counts everything that moves with $x$.

## Practice

> [!PRACTICE] 1 · Chain rule
> For $z=u^{2}+v^{2}$ with $u=x+y$ and $v=x-y$, find $z_{x}$ and $z_{y}$.
>
> > [!ANSWER] Show answer
> > $f_{u}=2u$, $f_{v}=2v$, $u_{x}=u_{y}=1$, $v_{x}=1$, $v_{y}=-1$. So $z_{x}=2u+2v=4x$ and $z_{y}=2u-2v=4y$, confirmed by substituting $z=2x^{2}+2y^{2}$.

> [!PRACTICE] 2 · Implicit
> Find $y'(0)$ for the function defined by $e^{y}+xy=e$.
>
> > [!ANSWER] Show answer
> > Let $F=e^{y}+xy-e$. At $x=0$, $e^{y}=e$ so $y=1$; then $F_{x}=y=1$ and $F_{y}=e^{y}+x=e$, so $y'=-\dfrac{1}{e}$.

> [!PRACTICE] 3 · Total derivative
> For $z=x^{2}+y^{2}$ with $x=\cos t$ and $y=\sin t$, find $\dfrac{dz}{dt}$.
>
> > [!ANSWER] Show answer
> > $\dfrac{dz}{dt}=-2x\sin t+2y\cos t=-2\cos t\sin t+2\sin t\cos t=0$, consistent with $z\equiv1$: the distance from the origin never changes.

> [!PRACTICE] 4 · Implicit in three variables
> For $x^{2}+y^{2}+z^{2}=1$ defining $z=z(x,y)$, find $z_{x}$ and $z_{y}$ at $\left(\dfrac12,\dfrac12,\dfrac{\sqrt2}{2}\right)$.
>
> > [!ANSWER] Show answer
> > $F=x^{2}+y^{2}+z^{2}-1$ gives $z_{x}=-\dfrac{x}{z}$ and $z_{y}=-\dfrac{y}{z}$, so at the point both equal $-\dfrac{1}{\sqrt2}\approx-0.707$.

> [!PRACTICE] 5 · Second implicit derivative
> For $x^{2}+xy+y^{2}=3$, find $y'$ and $y''$ at $(1,1)$.
>
> > [!ANSWER] Show answer
> > $F_{x}=2x+y=3$ and $F_{y}=x+2y=3$, so $y'=-1$. Differentiating $2x+y+xy'+2yy'=0$ gives $2+y'+y'+xy''+2(y')^{2}+2yy''=0$, which at $x=y=1$, $y'=-1$ reads $2+3y''=0$, so $y''=-\dfrac23$. Differentiating $y'=-\dfrac{2x+y}{x+2y}$ confirms it; the curve is concave down, consistent with $(1,1)$ maximising $x+y$.

> [!PRACTICE] 6 · System
> For $u+v=x$ and $uv=y$, find $u_{x}$ and $v_{x}$.
>
> > [!ANSWER] Show answer
> > With $F=u+v-x$ and $G=uv-y$, $J=u-v$, $F_{x}=-1$, $G_{x}=0$, so $u_{x}=\dfrac{u}{u-v}$ and $v_{x}=-\dfrac{v}{u-v}$. Check: $u_{x}+v_{x}=1$ and $vu_{x}+uv_{x}=0$, as the differentiated equations require.

## Formal statement

> [!FORMAL] Formal statement
> Let $z=f(u,v)$ be differentiable at $(u,v)$ and let $u=u(x,y)$, $v=v(x,y)$ have partials at $(x,y)$. Then $z_{x}=f_{u}u_{x}+f_{v}v_{x}$ and $z_{y}=f_{u}u_{y}+f_{v}v_{y}$, with $f_{u},f_{v}$ evaluated at $\big(u(x,y),v(x,y)\big)$; if $z=f(x,y)$ is differentiable and $y=y(x)$ is differentiable, then $\dfrac{dz}{dx}=f_{x}+f_{y}y'$. Let $F(x,y)$ have continuous partials near $P_{0}(x_{0},y_{0})$, with $F(P_{0})=0$ and $F_{y}(P_{0})\ne0$. Then there is a unique continuously differentiable $y=y(x)$ on $|x-x_{0}|<\delta$ with $y(x_{0})=y_{0}$, $F\big(x,y(x)\big)\equiv0$, and $y'=-F_{x}/F_{y}$. If $F(x,y,z)$ has continuous partials, $F(P_{0})=0$ and $F_{z}(P_{0})\ne0$, then $z=z(x,y)$ is unique near $P_{0}$ with $z_{x}=-F_{x}/F_{z}$, $z_{y}=-F_{y}/F_{z}$. If $F,G$ have continuous partials, $F(P_{0})=G(P_{0})=0$ and $\dfrac{\partial(F,G)}{\partial(u,v)}(P_{0})\ne0$, then $u,v$ are unique continuously differentiable functions of $x,y$ near $P_{0}$, with partials given by Cramer's rule.

## Connections to other lessons

- **Partial derivatives and total differentials**: the chain rule is invariance of the differential written out; substituting $du=u_{x}dx+u_{y}dy$ and $dv=v_{x}dx+v_{y}dy$ into $dz=f_{u}du+f_{v}dv$ and comparing the coefficient of $dx$ gives the formula.
- **Planes and lines in space**: the gradient $(F_{x},F_{y})$ is a normal to $F(x,y)=0$, and $(F_{x},F_{y},F_{z})$ to $F(x,y,z)=0$, so tangents and tangent planes follow; the point-normal form is this construction in general.
- **Differential equations**: converting an implicit solution $F(x,y)=0$ to an explicit one uses these formulas, and separable equations use the same step of differentiating both sides.
- **Extrema and directional derivatives**: constraints $g(x,y)=0$ become implicit functions, and the Lagrange system is another way of writing this differentiation.

In one sentence: the chain rule multiplies along dependency chains and adds at junctions; the implicit formula applies it to $F\big(x,y(x)\big)\equiv0$; the system case applies it to two identities and solves a linear system.