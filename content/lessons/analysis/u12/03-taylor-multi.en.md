---
slug: "taylor-multi"
subject: "analysis"
unit: "u12"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Taylor's Formula in Several Variables"
subtitle: "Flatten a surface with first- and second-order terms"
minutes: 16
meta: ["16 min read","Requires elementary mathematics","Mastery level"]
concepts: ["taylormv", "partial"]
prereq: ["partial", "taylor"]
related: ["taylor", "extremum-mv"]
---

## Goal

By the end of this lecture you can write the second-order Taylor formula for a function of two variables, assemble the Hessian correctly, and use the expansion for a numerical estimate. The formula is short; the errors are almost always the cross term or the factor $\frac12$.

Taylor in one variable approximates a curve by a polynomial. In several variables it approximates a surface by a quadratic form, and that form decides whether the surface looks like a bowl, a cap, or a saddle.

## Three-line recap

- First order uses the gradient and gives the tangent plane; second order uses the Hessian and gives a quadratic surface.
- The second-order term is $\frac12(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2)$; the cross term carries the coefficient $2f_{xy}$.
- The Peano remainder only says $o(\rho^2)$; a numerical bound needs the Lagrange remainder and one more derivative.

## First- and second-order formulas

Let $f$ have continuous second partials near $a=(a,b)$, let $h=(h,k)$, and set $\rho=\sqrt{h^2+k^2}$. Then
$$f(a+h,b+k)=f(a,b)+f_x h+f_y k+\frac12\big(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2\big)+o(\rho^2),$$
with all derivatives evaluated at $(a,b)$. The first-order part is the tangent plane; the second-order part measures departure from it.

In matrix form,
$$f(a+h)=f(a)+\nabla f(a)\cdot h+\frac12 h^{\mathsf T}H(a)h+o(\|h\|^2),\qquad
H=\begin{pmatrix}f_{xx}&f_{xy}\\f_{xy}&f_{yy}\end{pmatrix}.$$
$H$ is the **Hessian**, symmetric because $f_{xy}=f_{yx}$ under continuity.

## Hessian and quadratic form

The sign of $Q(h,k)=f_{xx}h^2+2f_{xy}hk+f_{yy}k^2$ determines the local shape:

| Type of $H$ | Sign of $Q$ | Shape |
| --- | --- | --- |
| Positive definite | $Q>0$ for $h\ne0$ | bowl, local minimum |
| Negative definite | $Q<0$ for $h\ne0$ | cap, local maximum |
| Indefinite | both signs occur | saddle |
| Semidefinite | $Q\ge0$ or $Q\le0$ | higher-order terms decide |

Take $f=x^3+y^3-3xy$ at $(1,1)$. There $f(1,1)=-1$, $\nabla f=(3x^2-3y,3y^2-3x)=(0,0)$, and
$$H(1,1)=\begin{pmatrix}6&-3\\-3&6\end{pmatrix},\qquad Q=6h^2-6hk+6k^2=6\left[\left(h-\frac k2\right)^2+\frac34k^2\right]>0.$$
So $(1,1)$ is a local minimum, with local model $-1+3h^2-3hk+3k^2$.

## Concrete expansions

For $f(x,y)=e^{x+y}$ at the origin,
$$e^{x+y}=1+(x+y)+\frac{(x+y)^2}{2}+\frac{(x+y)^3}{6}+\cdots,$$
so the second-order part is $1+x+y+\frac12x^2+xy+\frac12y^2$; the cross coefficient $1$ is $2f_{xy}/2=f_{xy}$.

For $f(x,y)=x^y$ at $(1,1)$: $f=1$, $f_x=yx^{y-1}=1$, $f_y=x^y\ln x=0$, $f_{xx}=y(y-1)x^{y-2}=0$, $f_{xy}=x^{y-1}(1+y\ln x)=1$, $f_{yy}=x^y(\ln x)^2=0$. Hence
$$x^y=1+h+k+hk+o(h^2+k^2).$$
With $h=0.02$ and $k=0.03$,
$$1.02^{1.03}\approx1+0.02+0.03+0.0006=1.0206.$$
The actual value is about $1.020606$, so the error is of order $10^{-6}$.

## Multi-index notation and remainders

Let $\alpha=(\alpha_1,\dots,\alpha_n)$, $|\alpha|=\alpha_1+\cdots+\alpha_n$, $\alpha!=\alpha_1!\cdots\alpha_n!$, $h^\alpha=h_1^{\alpha_1}\cdots h_n^{\alpha_n}$, and $D^\alpha f=\partial_1^{\alpha_1}\cdots\partial_n^{\alpha_n}f$. Then
$$f(a+h)=\sum_{|\alpha|\le m}\frac{D^\alpha f(a)}{\alpha!}h^\alpha+R_m(h).$$
Peano remainder: if $f$ is $m$ times differentiable at $a$, then $R_m(h)=o(\|h\|^m)$; this is qualitative.

Lagrange remainder: if $f$ has continuous partials of order $m+1$ on a convex set containing $a$ and $a+h$, then for some $\theta\in(0,1)$,
$$R_m(h)=\sum_{|\alpha|=m+1}\frac{D^\alpha f(a+\theta h)}{\alpha!}h^\alpha.$$
Apply the one-variable Taylor theorem to $g(t)=f(a+th)$ on the segment. Use Lagrange for error bounds and Peano for local shape.

> [!NOTE]
> Peano needs $m$ derivatives at the point; Lagrange needs $m+1$ continuous derivatives on the segment. The hypotheses differ and cannot be swapped.

## Three misconceptions

> [!MYTH] The second-order terms are only $f_{xx}h^2+f_{yy}k^2$.
> The cross term $2f_{xy}hk$ cannot be dropped. For $f=x^3+y^3-3xy$ at $(1,1)$ the form is $6h^2-6hk+6k^2$; losing $-6hk$ changes the definiteness verdict.

> [!MYTH] The quadratic form is $f_{xx}h^2+f_{xy}hk+f_{yy}k^2$.
> The cross coefficient is $2f_{xy}$, coming from the two symmetric entries of $h^{\mathsf T}Hh$. Expand the matrix product and the factor $2$ takes care of itself.

> [!MYTH] Expanding to second order automatically gives an error bound.
> The Peano remainder only gives $o(\rho^2)$. A bound such as $|R_2|\le M\rho^3/6$ requires bounded third derivatives and the Lagrange remainder.

## Practice

> [!PRACTICE] 1 · Expand
> Expand $f(x,y)=x^2+xy+y^2$ at $(1,1)$ to second order.
>
> > [!ANSWER] Show answer
> > $f(1,1)=3$, $\nabla f=(2x+y,x+2y)=(3,3)$, and $H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. Hence $f=3+3h+3k+h^2+hk+k^2$, an exact identity because the function is already quadratic.

> [!PRACTICE] 2 · Third order
> Write $\sin(x+y)$ at the origin through third order.
>
> > [!ANSWER] Show answer
> > With $t=x+y$, $\sin t=t-t^3/6+o(t^3)$, so $\sin(x+y)=(x+y)-\frac16(x+y)^3+o(\rho^3)$, where $(x+y)^3=x^3+3x^2y+3xy^2+y^3$.

> [!PRACTICE] 3 · Numerical estimate
> Estimate $1.02^{1.03}$ with the second-order Taylor formula.
>
> > [!ANSWER] Show answer
> > At $(1,1)$, $f=1$, $f_x=1$, $f_y=0$, $f_{xy}=1$, and the other second partials vanish, so $x^y\approx1+h+k+hk$. With $h=0.02$, $k=0.03$ this gives $1.0206$; the true value is about $1.020606$.

> [!PRACTICE] 4 · Hessian
> For $f(x,y)=x^2y+y^2$, write the Hessian at $(1,1)$ and determine the sign of the quadratic form.
>
> > [!ANSWER] Show answer
> > $f_x=2xy$, $f_y=x^2+2y$, $f_{xx}=2y$, $f_{xy}=2x$, $f_{yy}=2$. At $(1,1)$, $H=\begin{pmatrix}2&2\\2&2\end{pmatrix}$ and $Q=2h^2+4hk+2k^2=2(h+k)^2$, which is positive semidefinite and vanishes for $h=-k\ne0$, so higher-order terms decide.

## Formal statement

> [!FORMAL] Formal statement
> If $f$ has $m$ continuous partials near $a$, then $f(a+h)=\sum_{|\alpha|\le m}\frac{D^\alpha f(a)}{\alpha!}h^\alpha+o(\|h\|^m)$ (Peano). If moreover $f$ has continuous partials of order $m+1$ on a convex set containing $a$ and $a+h$, then for some $\theta\in(0,1)$, $R_m(h)=\sum_{|\alpha|=m+1}\frac{D^\alpha f(a+\theta h)}{\alpha!}h^\alpha$ (Lagrange). For $m=2$, both remainder forms follow by applying the one-variable Taylor theorem to $g(t)=f(a+th)$ on the segment.
