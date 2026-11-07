---
slug: "implicit-function"
subject: "analysis"
unit: "u12"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "The Implicit Function Theorem"
subtitle: "An equation hides a curve when one partial is nonzero"
minutes: 16
meta: ["16 min read","Requires elementary mathematics","Mastery level"]
concepts: ["implicit", "partial"]
prereq: ["partial"]
related: ["implicit", "extremum-mv"]
---

## Goal

By the end of this lecture you can use the implicit function theorem to decide whether $F(x,y)=0$ can be solved locally for $y=\varphi(x)$, differentiate with $\varphi'=-F_x/F_y$, and handle second derivatives and systems.

Many curves arrive as equations: $x^2+y^2=1$ is a circle, and $e^y+xy=e$ is a curve near a suitable point. The theorem does not promise an explicit formula; it promises a unique differentiable curve locally.

## Three-line recap

- If $F(a,b)=0$ and $F_y(a,b)\ne0$, then $y=\varphi(x)$ is uniquely determined near $(a,b)$.
- The derivative is $\varphi'=-F_x/F_y$, obtained by differentiating $F(x,\varphi(x))=0$.
- For systems, replace $F_y$ by the Jacobian $\partial(F,G)/\partial(y,z)$ and require it to be nonzero.

## One equation: theorem and formula

Let $F(x,y)$ be $C^1$ near $(a,b)$, with $F(a,b)=0$ and
$$F_y(a,b)\ne0.$$
Then there is a neighbourhood $U$ of $a$ and a unique continuously differentiable $\varphi:U\to\mathbb{R}$ such that $\varphi(a)=b$ and
$$F(x,\varphi(x))=0,\qquad \varphi'(x)=-\frac{F_x(x,\varphi(x))}{F_y(x,\varphi(x))}.$$
The formula comes from differentiating $F(x,\varphi(x))=0$:
$$F_x+F_y\varphi'=0.$$
The condition $F_y\ne0$ keeps the denominator away from zero.

Geometrically, $F_y\ne0$ says the curve is not vertical at $(a,b)$, so it can be read as a graph over the $x$-axis. If $F_x\ne0$, one can instead solve for $x=\psi(y)$.

## Differentiating implicitly, by hand

Example 1: $x^2+y^2=1$ near $(0,1)$. Here $F=x^2+y^2-1$ and $F_y=2y$, which is $2\ne0$ at $(0,1)$, so $y=\sqrt{1-x^2}$ locally. Then
$$y'=-\frac{F_x}{F_y}=-\frac{2x}{2y}=-\frac xy.$$
At $(0,1)$, $y'=0$ and the tangent is horizontal. At $(\sqrt3/2,1/2)$, $y'=-\sqrt3$.

For the second derivative, differentiate $y'=-x/y$ with $y=y(x)$:
$$y''=-\frac{y-xy'}{y^2}=-\frac{y+x^2/y}{y^2}=-\frac{1}{y^3}.$$
At $(0,1)$, $y''=-1$: the circle bends downward at its top.

Example 2: $e^y+xy=e$ near $(0,1)$. With $F=e^y+xy-e$, $F(0,1)=0$ and $F_y=e^y+x=e\ne0$ at $(0,1)$. Hence
$$y'=-\frac{y}{e^y+x},\qquad y'(0)=-\frac1e\approx-0.368.$$

The tangent line follows directly:
$$F_x(a,b)(x-a)+F_y(a,b)(y-b)=0.$$
For the circle at $(\sqrt3/2,1/2)$ this is $\sqrt3(x-\sqrt3/2)+(y-1/2)=0$, or $\sqrt3x+y=2$.

## Systems and the Jacobian

Let $F(x,y,z)=0$ and $G(x,y,z)=0$ with $F=G=0$ at $(a,b,c)$. If
$$\frac{\partial(F,G)}{\partial(y,z)}=\det\begin{pmatrix}F_y&F_z\\G_y&G_z\end{pmatrix}\ne0,$$
then $y=y(x)$ and $z=z(x)$ are uniquely determined near $x=a$. Their derivatives solve
$$F_y y'+F_z z'=-F_x,\qquad G_y y'+G_z z'=-G_x.$$
Do not memorise the determinant quotients; differentiate both equations totally with respect to $x$ and solve the resulting linear system.

Example: $y+z=x$ and $y-z=x^2$. Let $F=y+z-x$ and $G=y-z-x^2$. Then
$$\frac{\partial(F,G)}{\partial(y,z)}=\det\begin{pmatrix}1&1\\1&-1\end{pmatrix}=-2\ne0.$$
Solving gives $y=(x+x^2)/2$ and $z=(x-x^2)/2$, so $y'=1/2+x$ and $z'=1/2-x$, both equal to $1/2$ at $x=0$.

## When the condition fails

$F_y(a,b)\ne0$ is sufficient, not necessary.

Counterexample 1: $F(x,y)=x^2-y^2$ at $(0,0)$. Here $F(0,0)=0$ but $F_y=-2y=0$ at the origin. The zero set consists of the two lines $y=\pm x$, so no unique function $y(x)$ exists near the origin. The condition fails and so does the conclusion.

Counterexample 2: $F(x,y)=y^3-x$ at $(0,0)$. Again $F_y=3y^2=0$ at the origin, yet the equation determines $y=x^{1/3}$ uniquely. The theorem is only sufficient; note, however, that $x^{1/3}$ is not differentiable at $0$, so the differentiability conclusion is genuinely lost.

> [!NOTE]
> The theorem gives local existence, uniqueness, and continuous differentiability. It does not give an elementary formula and does not guarantee global uniqueness.

## Three misconceptions

> [!MYTH] $F_y\ne0$ is necessary for an implicit function to exist.
> It is sufficient only. For $y^3-x=0$ at the origin, $F_y=0$, yet $y=x^{1/3}$ is the unique continuous implicit function; it simply fails to be differentiable at $0$.

> [!MYTH] The implicit function theorem produces an explicit formula for $y=\varphi(x)$.
> It asserts local existence and uniqueness and supplies the derivative formula. Most equations cannot be solved in elementary functions; the theorem is valuable precisely because no formula is needed to differentiate.

> [!MYTH] When differentiating $F(x,y)=0$, treat $y$ as a constant.
> Since $y$ depends on $x$, the chain rule gives $F_x+F_y y'=0$, so $y'=-F_x/F_y$. Treating $y$ as constant would give only $F_x=0$ and lose the curve.

## Practice

> [!PRACTICE] 1 · Slope on a circle
> Find $y'$ for $x^2+y^2=1$ at $(\sqrt3/2,1/2)$.
>
> > [!ANSWER] Show answer
> > $y'=-x/y=-(\sqrt3/2)/(1/2)=-\sqrt3$, matching the slope of the tangent $\sqrt3x+y=2$.

> [!PRACTICE] 2 · Exponential equation
> Find $y'$ at $(0,1)$ for $e^y+xy=e$.
>
> > [!ANSWER] Show answer
> > $F_x=y$ and $F_y=e^y+x$, so $y'=-y/(e^y+x)$. At $(0,1)$, $y'=-1/e\approx-0.368$.

> [!PRACTICE] 3 · Second derivative
> Find $y''$ for $x^2+y^2=1$ and evaluate it at $(0,1)$.
>
> > [!ANSWER] Show answer
> > From $y'=-x/y$, $y''=-(y-xy')/y^2=-(y+x^2/y)/y^2=-1/y^3$. At $(0,1)$, $y''=-1$.

> [!PRACTICE] 4 · System
> Solve $y+z=x$, $y-z=x^2$ for $y(x),z(x)$ and find $y',z'$ at $x=0$.
>
> > [!ANSWER] Show answer
> > Adding gives $2y=x+x^2$ and subtracting gives $2z=x-x^2$, so $y=(x+x^2)/2$ and $z=(x-x^2)/2$. Hence $y'=1/2+x$ and $z'=1/2-x$, both $1/2$ at $x=0$.

## Formal statement

> [!FORMAL] Formal statement
> Let $F$ be $C^1$ near $(a,b)$, with $F(a,b)=0$ and $F_y(a,b)\ne0$. Then there are a neighbourhood $I$ of $a$ and a unique $C^1$ function $\varphi:I\to\mathbb{R}$ with $\varphi(a)=b$, $F(x,\varphi(x))=0$ on $I$, and $\varphi'(x)=-F_x(x,\varphi(x))/F_y(x,\varphi(x))$. For systems: if $F,G$ are $C^1$ near $(a,b,c)$, $F=G=0$ there, and $\partial(F,G)/\partial(y,z)\ne0$, then unique $C^1$ functions $y(x),z(x)$ satisfy the system near $a$, and their derivatives are obtained by total differentiation with respect to $x$ followed by solving the resulting linear system.
