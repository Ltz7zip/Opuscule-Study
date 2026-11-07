---
slug: "lagrange-multiplier"
subject: "analysis"
unit: "u12"
order: 6
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Mathematical Analysis · Mastery"
title: "Constrained Extrema and Lagrange Multipliers"
subtitle: "Search for the best point along a constraint surface"
minutes: 16
meta: ["16 min read","Requires elementary mathematics","Mastery level"]
concepts: ["implicit", "extremum-mv"]
prereq: ["implicit"]
related: ["extremum-mv", "implicit"]
---

## Goal

By the end of this lecture you can turn “optimise $f$ subject to $g=0$” into the system $\nabla f=\lambda\nabla g$, use it for distances, volumes, and product-type extrema, and explain what the multiplier itself means.

Without constraints, an interior optimum has zero gradient. With a constraint, the optimum may slide along the constraint surface, so the gradient need not vanish; it must, however, have no component along the surface, or we could still improve. That is why $\nabla f$ and $\nabla g$ become parallel.

## Three-line recap

- At a constrained extremum with $\nabla g\ne0$, one has $\nabla f=\lambda\nabla g$.
- Solve $f_x=\lambda g_x$, $f_y=\lambda g_y$, and $g=0$, then compare candidate values.
- $\lambda$ is not the extremal value; it measures sensitivity to the constraint level.

## The geometry of a constrained extremum

Let $S=\{x:g(x)=0\}$ be a smooth curve and $a\in S$. If $f|_S$ has an extremum at $a$, take any smooth curve $\gamma(t)$ in $S$ with $\gamma(0)=a$. Then $t=0$ is an extremum of the one-variable function $f(\gamma(t))$, so
$$\frac{\mathrm d}{\mathrm dt}f(\gamma(t))\Big|_{t=0}=\nabla f(a)\cdot\gamma'(0)=0.$$
Thus $\nabla f(a)$ is perpendicular to the tangent of the constraint at $a$. Differentiating $g(\gamma(t))=0$ gives $\nabla g(a)\cdot\gamma'(0)=0$, so $\nabla g(a)$ is perpendicular to the same tangent. In the plane, two vectors perpendicular to the same line must be parallel:
$$\nabla f(a)=\lambda\nabla g(a).$$
The hypothesis is $\nabla g(a)\ne0$; otherwise the normal direction may degenerate.

## The Lagrange multiplier method

To optimise $f$ subject to $g(x,y)=0$:

1. Write the system
$$f_x=\lambda g_x,\qquad f_y=\lambda g_y,\qquad g(x,y)=0.$$
2. Solve for all $(x,y,\lambda)$.
3. Compare the values of $f$ at the candidates; if the constraint set is compact and $f$ is continuous, the extrema are among them.

The three-variable case is identical, with one more equation $f_z=\lambda g_z$.

## Three concrete problems

**Problem 1.** Maximise $xy$ on $x+y=1$. The system is
$$y=\lambda,\qquad x=\lambda,\qquad x+y=1,$$
so $x=y=1/2$ and the maximum is $1/4$. The inequality $xy\le((x+y)/2)^2=1/4$ confirms it.

**Problem 2.** Optimise $xy$ on the unit circle $x^2+y^2=1$. The system is
$$y=2\lambda x,\qquad x=2\lambda y.$$
Multiplying gives $xy=4\lambda^2xy$. If $xy\ne0$, then $\lambda=\pm1/2$, and $y=\pm x$. The candidates $(1/\sqrt2,1/\sqrt2)$ and $(-1/\sqrt2,-1/\sqrt2)$ give $xy=1/2$; the other two sign choices give $xy=-1/2$. Hence the maximum is $1/2$ and the minimum is $-1/2$.

**Problem 3.** Find the distance from the origin to the plane $x+2y+2z=9$. Minimise $f=x^2+y^2+z^2$ subject to $g=x+2y+2z-9=0$. Then
$$2x=\lambda,\qquad 2y=2\lambda,\qquad 2z=2\lambda,$$
so $x=\lambda/2$ and $y=z=\lambda$. Substituting,
$$\frac{\lambda}{2}+2\lambda+2\lambda=\frac{9\lambda}{2}=9,$$
hence $\lambda=2$, the point is $(1,2,2)$, and the distance is $\sqrt{1+4+4}=3$.

## Meaning of the multiplier, and multiple constraints

Treat the constraint level as a parameter: $g(x)=c$, with optimal value $M(c)$. Then
$$\frac{\mathrm dM}{\mathrm dc}=\lambda.$$
For example, maximising $xy$ on $x+y=c$ gives $x=y=c/2$, $M(c)=c^2/4$, and $M'(c)=c/2$, which equals $\lambda=c/2$. So $\lambda$ measures how much the optimum improves when the constraint is relaxed, not the optimum itself.

For several constraints $g_1=0,\dots,g_m=0$,
$$\nabla f=\lambda_1\nabla g_1+\cdots+\lambda_m\nabla g_m,$$
provided $\nabla g_1,\dots,\nabla g_m$ are linearly independent. Geometrically, $\nabla f$ lies in the normal space of the constraint; otherwise a tangential component would allow improvement.

> [!NOTE]
> Constraints must be equalities. Inequalities such as $x\ge0$ require KKT conditions, not the plain Lagrange method.

## Three misconceptions

> [!MYTH] Every solution of the Lagrange equations is a maximum.
> The equations give a necessary condition only. Candidates may be maxima, minima, or saddles; compare values and confirm that an extremum exists, for instance when the constraint set is compact and $f$ is continuous.

> [!MYTH] The condition $\nabla g\ne0$ can be ignored.
> When the constraint qualification fails, the method can miss the answer. Minimise $f=x$ on $g=x^2=0$: the constraint is the $y$-axis and the optimum is $(0,0)$, but $\nabla g=(2x,0)$ vanishes on the constraint, and $1=2\lambda x$ has no solution.

> [!MYTH] The multiplier $\lambda$ is the constrained extremal value.
> It is the derivative of the optimal value with respect to the constraint level. For the distance to $x+2y+2z=9$, $\lambda=2$ while the minimum distance is $3$.

## Practice

> [!PRACTICE] 1 · Product type
> Maximise $x^2y$ subject to $x+y=3$ with $x,y>0$.
>
> > [!ANSWER] Show answer
> > $2xy=\lambda$ and $x^2=\lambda$, so $x^2=2xy$ and $x=2y$ (since $x>0$). Then $x+y=3$ gives $y=1$, $x=2$, and the maximum is $4$. On the boundary $x=0$ or $y=0$ the value is $0$, so $4$ is maximal.

> [!PRACTICE] 2 · Point to plane
> Find the distance from the origin to $2x+y-2z=6$.
>
> > [!ANSWER] Show answer
> > Minimise $x^2+y^2+z^2$ subject to $2x+y-2z=6$. From $2x=2\lambda$, $2y=\lambda$, $2z=-2\lambda$ we get $x=\lambda$, $y=\lambda/2$, $z=-\lambda$. Substitution gives $2\lambda+\lambda/2+2\lambda=6$, so $\lambda=4/3$. The point is $(4/3,2/3,-4/3)$ and the distance is $\sqrt{16/9+4/9+16/9}=2$.

> [!PRACTICE] 3 · Three variables
> For $x,y,z>0$ with $x+y+z=3$, maximise $xyz$.
>
> > [!ANSWER] Show answer
> > $yz=\lambda$, $xz=\lambda$, $xy=\lambda$. Subtracting gives $(y-x)z=0$, so $x=y$; similarly $y=z$. Hence $x=y=z=1$ and the maximum is $1$.

> [!PRACTICE] 4 · Meaning of $\lambda$
> Maximise $xy$ on $x+y=c$, find $M(c)$ and $\lambda$, and verify $M'(c)=\lambda$.
>
> > [!ANSWER] Show answer
> > Symmetry gives $x=y=c/2$ and $M(c)=c^2/4$. The Lagrange equations $y=\lambda$, $x=\lambda$ give $\lambda=c/2$, while $M'(c)=c/2$. They agree.

## Formal statement

> [!FORMAL] Formal statement
> Let $f,g$ be $C^1$ near $a$, with $g(a)=0$ and $\nabla g(a)\ne0$. If $f$ has a local extremum at $a$ on the constraint set $\{g=0\}$, then there is $\lambda\in\mathbb{R}$ with $\nabla f(a)=\lambda\nabla g(a)$. For several constraints: if $g_1(a)=\cdots=g_m(a)=0$, the gradients $\nabla g_1(a),\dots,\nabla g_m(a)$ are linearly independent, and $f$ has a local extremum at $a$ on the constraint set, then there are $\lambda_1,\dots,\lambda_m$ with $\nabla f(a)=\sum_{i=1}^m\lambda_i\nabla g_i(a)$. The condition is necessary; sufficiency requires a separate comparison of candidates.
