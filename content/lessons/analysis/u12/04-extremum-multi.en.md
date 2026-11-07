---
slug: "extremum-multi"
subject: "analysis"
unit: "u12"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Extrema of Functions of Several Variables"
subtitle: "Find stationary points, then read the quadratic form"
minutes: 16
meta: ["16 min read","Requires elementary mathematics","Mastery level"]
concepts: ["extremum-mv", "taylormv"]
prereq: ["taylormv"]
related: ["extremum", "implicit"]
---

## Goal

By the end of this lecture you can locate stationary points with the first-order condition, classify them with the Hessian, and combine interior values with boundary candidates to find global extrema on a closed bounded region.

In one variable, a sign change of the derivative is the whole story. In several variables you must first eliminate all directions and then read a quadratic form. The step most often missed is not the discriminant but the boundary.

## Three-line recap

- An interior extremum is stationary: $\nabla f=0$, but a stationary point need not be an extremum.
- A positive definite Hessian gives a minimum, negative definite a maximum, indefinite a saddle, and semidefinite no verdict.
- On a closed region, compare interior stationary values with boundary candidates.

## Stationary points and the first-order condition

If $f(x)\le f(a)$ (or $\ge$) near $a$, then $a$ is a local maximum (or minimum). If $a$ is interior and the partials exist, each coordinate slice has an extremum at $a$, so Fermat’s theorem gives
$$f_{x_i}(a)=0,\qquad i=1,\dots,n,$$
that is, $\nabla f(a)=0$. Such a point is **stationary**.

For $f(x,y)=x^3+y^3-3xy$,
$$f_x=3x^2-3y=0,\qquad f_y=3y^2-3x=0$$
give $y=x^2$ and $x=y^2$, hence $x=x^4$ and $x=0$ or $x=1$. The stationary points are $(0,0)$ and $(1,1)$.

The first-order condition only filters candidates. Both points satisfy $\nabla f=0$, but they are of different types.

## The Hessian test

Suppose $f$ is $C^2$ near a stationary point $a$. Taylor’s formula gives
$$f(a+h)-f(a)=\frac12h^{\mathsf T}H(a)h+o(\|h\|^2).$$
For small $h$ the quadratic form decides the sign: positive definite gives a strict local minimum, negative definite a strict local maximum, indefinite a saddle, and semidefinite no conclusion without higher-order terms.

In two variables, use the determinant. Let $A=f_{xx}$, $B=f_{xy}$, $C=f_{yy}$, and $D=AC-B^2=\det H$:

| Condition | Conclusion |
| --- | --- |
| $D>0,\ A>0$ | minimum |
| $D>0,\ A<0$ | maximum |
| $D<0$ | saddle |
| $D=0$ | inconclusive |

Back to $f=x^3+y^3-3xy$. At $(1,1)$, $H=\begin{pmatrix}6&-3\\-3&6\end{pmatrix}$, so $D=27>0$ and $A=6>0$: a local minimum with $f(1,1)=-1$. At $(0,0)$, $H=\begin{pmatrix}0&-3\\-3&0\end{pmatrix}$, so $D=-9<0$: a saddle.

## Boundaries and global extrema

A continuous function on a closed bounded region attains its global extrema. The procedure has two parts: interior stationary points, then the restriction to the boundary, which is usually a one-variable problem.

Example: $f(x,y)=x^2+2y^2-x$ on the closed disc $x^2+y^2\le1$. Inside,
$$f_x=2x-1=0,\quad f_y=4y=0\ \Longrightarrow\ (1/2,0),\qquad f=-\frac14.$$
On the boundary $x^2+y^2=1$, substitute $y^2=1-x^2$:
$$f=x^2+2(1-x^2)-x=2-x^2-x,\qquad x\in[-1,1].$$
The derivative is $-2x-1$, so $x=-1/2$ and $y=\pm\sqrt3/2$, where
$$f=2-\frac14+\frac12=\frac94.$$
At the endpoints, $f(-1,0)=2$ and $f(1,0)=0$. Comparing, the maximum is $9/4$ at $(-1/2,\pm\sqrt3/2)$ and the minimum is $-1/4$ at $(1/2,0)$.

## The semidefinite borderline

When $D=0$, second-order information is insufficient. Three typical cases:

| Function | At the origin | Conclusion |
| --- | --- | --- |
| $f=x^4+y^4$ | $H=0$, yet $f\ge0=f(0,0)$ | strict minimum |
| $f=x^2-y^4$ | semidefinite $H$, with $f>0$ on the $x$-axis and $f<0$ on the $y$-axis | saddle |
| $f=x^2+y^3$ | the same semidefinite $H$, with $y^3$ changing sign on the $y$-axis | not an extremum |

So semidefiniteness implies neither a minimum nor a saddle. The test concludes only when the form is strictly one-signed.

> [!NOTE]
> An extremum is local; a global maximum is global. On a closed region, a global extremum may occur on the boundary, where the gradient need not vanish.

## Three misconceptions

> [!MYTH] Every stationary point is an extremum.
> For $f=x^3+y^3-3xy$, the origin has $\nabla f=0$, but $H$ is indefinite and the function takes both signs nearby: it is a saddle.

> [!MYTH] A positive definite Hessian is necessary for a minimum.
> It is only sufficient. $f=x^4+y^4$ has a strict minimum at the origin with zero Hessian; when $D=0$, another argument is required.

> [!MYTH] On a closed region, solving $\nabla f=0$ finds the extrema.
> Boundary extrema are usually not stationary. For $f=x^2+2y^2-x$ on the unit disc, the maximum $9/4$ occurs on the boundary, while the interior stationary point supplies the minimum.

## Practice

> [!PRACTICE] 1 · Classify
> For $f(x,y)=x^3+y^3-3xy$, classify $(0,0)$ and $(1,1)$.
>
> > [!ANSWER] Show answer
> > $H=\begin{pmatrix}6x&-3\\-3&6y\end{pmatrix}$. At $(1,1)$, $D=36-9=27>0$ and $A=6>0$, so it is a local minimum with $f=-1$. At $(0,0)$, $D=-9<0$, a saddle.

> [!PRACTICE] 2 · Closed region
> Find the maximum and minimum of $f(x,y)=x^2+y^2-2x-2y$ on $[0,2]\times[0,2]$.
>
> > [!ANSWER] Show answer
> > The interior stationary point is $(1,1)$ with $f=-2$. On $x=0$, $f=y^2-2y=(y-1)^2-1$ has minimum $-1$; the other three edges are the same by symmetry. The four corners give $f=0$. Hence the minimum is $-2$ at $(1,1)$ and the maximum is $0$ at the corners.

> [!PRACTICE] 3 · Semidefinite
> Does $f(x,y)=x^2+y^3$ have an extremum at the origin?
>
> > [!ANSWER] Show answer
> > No. On $y=0$, $f=x^2\ge0$; on $x=0$, $f=y^3$ changes sign. The Hessian $\begin{pmatrix}2&0\\0&0\end{pmatrix}$ is semidefinite, so the test is inconclusive.

> [!PRACTICE] 4 · Zero Hessian
> What extremum does $f(x,y)=x^4+y^4$ have at the origin? Can the Hessian test be used?
>
> > [!ANSWER] Show answer
> > It has a strict minimum $0$, since $x^4+y^4\ge0$ with equality only at the origin. The Hessian is the zero matrix, which is semidefinite, so the test gives no verdict; compare values directly.

## Formal statement

> [!FORMAL] Formal statement
> If $f$ has a local extremum at an interior point $a$ and the partials exist there, then $\nabla f(a)=0$ (Fermat). If $f$ is $C^2$ near $a$ and $\nabla f(a)=0$, then a positive definite $H(a)$ gives a strict local minimum, a negative definite $H(a)$ a strict local maximum, and an indefinite $H(a)$ a saddle; a semidefinite $H(a)$ gives no conclusion. If $f$ is continuous on a compact region $\overline D$, it attains its maximum and minimum on $\overline D$; candidates are interior stationary points, interior points where $f$ is not differentiable, and extremal points on $\partial D$.
