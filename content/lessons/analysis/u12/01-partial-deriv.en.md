---
slug: "partial-deriv"
subject: "analysis"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Partial Derivatives and the Total Differential"
subtitle: "Differentiating separately is easy; approximating together is the point"
minutes: 16
meta: ["16 min read","Requires elementary mathematics","Mastery level"]
concepts: ["partial", "multi"]
prereq: ["multi"]
related: ["deriv", "taylormv"]
---

## Goal

By the end of this lecture you can compute partial derivatives, write the total differential, and decide from the definition whether a function is differentiable at a point.

The distinction is this: a partial derivative freezes all other variables and differentiates along one coordinate axis, while differentiability demands one linear approximation that controls every direction at once.

## Three-line recap

- A partial derivative freezes the remaining variables and measures change along one axis.
- The total differential requires $f(a+h)-f(a)=A\cdot h+o(\|h\|)$, a linear approximation.
- Differentiability implies continuity and the existence of partials; neither converse holds.

## Partial derivatives: freeze the rest

Let $f$ be defined near $a=(a_1,\dots,a_n)$. The partial derivative in $x_i$ is
$$f_{x_i}(a)=\lim_{h\to0}\frac{f(a_1,\dots,a_i+h,\dots,a_n)-f(a)}{h}.$$
In two variables,
$$f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h},\qquad f_y(a,b)=\lim_{k\to0}\frac{f(a,b+k)-f(a,b)}{k}.$$
Geometrically, $f_x(a,b)$ is the slope of the curve cut from the surface by the plane $y=b$.

Example: for $f(x,y)=x^2y+e^{xy}$,
$$f_x=2xy+ye^{xy},\qquad f_y=x^2+xe^{xy}.$$
At $(1,0)$ this gives $f_x=0+0=0$ and $f_y=1+1=2$.

Partials are one-variable derivatives with the other letters treated as constants. They describe coordinate directions only; they do not by themselves control any other direction.

## The total differential: one linear approximation

$f$ is **differentiable** at $(a,b)$ if there are constants $A,B$ with
$$f(a+h,b+k)-f(a,b)=Ah+Bk+o\!\left(\sqrt{h^2+k^2}\right).$$
The linear part $Ah+Bk$ is the **total differential** $\mathrm df$. When $f$ is differentiable, $A=f_x(a,b)$ and $B=f_y(a,b)$, so
$$\mathrm df=f_x\,\mathrm dx+f_y\,\mathrm dy.$$
If the partials merely exist, this expression can still be written down, but it need not satisfy the $o(\|h\|)$ condition.

Differentiability implies continuity: $|f(a+h)-f(a)|\le(|A|+|B|)\|h\|+o(\|h\|)\to0$. This arrow does not reverse.

## Partials exist, differentiability fails

The first counterexample is
$$f(x,y)=\frac{xy}{x^2+y^2}\ (x^2+y^2\ne0),\qquad f(0,0)=0.$$
Along the axes $f(h,0)=0$ and $f(0,k)=0$, so $f_x(0,0)=f_y(0,0)=0$. But along $y=x$, $f\to1/2\ne f(0,0)$; the function is not even continuous at the origin, hence not differentiable.

The second counterexample is subtler:
$$g(x,y)=\frac{x^2y}{x^2+y^2}\ (x^2+y^2\ne0),\qquad g(0,0)=0.$$
Since $|g|\le|y|$, $g$ is continuous at the origin, and $g_x(0,0)=g_y(0,0)=0$. If it were differentiable, we would need
$$\frac{g(h,k)}{\sqrt{h^2+k^2}}\longrightarrow0.$$
Take $k=h>0$:
$$\frac{g(h,h)}{\sqrt{2h^2}}=\frac{h^3/(2h^2)}{\sqrt2\,h}=\frac{1}{2\sqrt2}\ne0.$$
So $g$ is not differentiable. Continuity and both partials are present, and still not enough.

## A sufficient condition

If $f_x$ and $f_y$ exist in a neighbourhood of $(a,b)$ and are continuous at $(a,b)$, then $f$ is differentiable there. Split the increment:
$$f(a+h,b+k)-f(a,b)=\big[f(a+h,b+k)-f(a,b+k)\big]+\big[f(a,b+k)-f(a,b)\big],$$
apply the one-variable mean value theorem to each bracket, and get $f_x(\xi,b+k)h+f_y(a,\eta)k$. Continuity of the partials makes the coefficients approach $f_x(a,b)$ and $f_y(a,b)$, leaving an $o(\|h\|)$ remainder.

Higher partials are iterated: $f_{xy}=(f_x)_y$. If $f_{xy}$ and $f_{yx}$ are continuous at $(a,b)$, they are equal (Schwarz). For $f=x^3y^2-xy^3$, $f_x=3x^2y^2-y^3$ and $f_{xy}=6x^2y-3y^2$, while $f_y=2x^3y-3xy^2$ and $f_{yx}=6x^2y-3y^2$.

> [!NOTE]
> Continuous partials are sufficient for differentiability, not necessary. Partials may fail to be continuous at a point while the function is still differentiable there.

## Three misconceptions

> [!MYTH] If the partial derivatives exist, the function is differentiable.
> For $f(x,y)=\frac{xy}{x^2+y^2}$ both partials at the origin are $0$, yet $f$ is not even continuous there. Partials see two axes; differentiability sees every direction.

> [!MYTH] Mixed partials $f_{xy}$ and $f_{yx}$ always agree.
> Continuity is required. For $f=xy(x^2-y^2)/(x^2+y^2)$ with $f(0,0)=0$, one finds $f_{xy}(0,0)=-1$ and $f_{yx}(0,0)=1$.

> [!MYTH] Writing $\mathrm df=f_x\,\mathrm dx+f_y\,\mathrm dy$ proves differentiability.
> The expression exists formally whenever the partials exist, but differentiability requires the error to be $o(\|h\|)$. For $g(x,y)=\frac{x^2y}{x^2+y^2}$ the partials at the origin are $0$, so the formula predicts $\mathrm df=0$, yet $g$ is not differentiable.

## Practice

> [!PRACTICE] 1 · Compute
> Let $f(x,y)=x^2y^3+\sin(xy)$. Find $f_x(1,0)$ and $f_y(1,0)$.
>
> > [!ANSWER] Show answer
> > $f_x=2xy^3+y\cos(xy)$, which is $0$ at $(1,0)$; $f_y=3x^2y^2+x\cos(xy)$, which is $1$ at $(1,0)$.

> [!PRACTICE] 2 · Test differentiability
> Let $g(x,y)=\frac{x^2y}{x^2+y^2}$ with $g(0,0)=0$. Is $g$ differentiable at the origin?
>
> > [!ANSWER] Show answer
> > No. Both partials are $0$; differentiability would force $g(h,k)/\sqrt{h^2+k^2}\to0$, but along $k=h$ the quotient equals $1/(2\sqrt2)$.

> [!PRACTICE] 3 · Linear approximation
> Estimate $e^{0.01}\cos0.02$ using the total differential.
>
> > [!ANSWER] Show answer
> > Take $f=e^x\cos y$. Then $f(0,0)=1$, $f_x(0,0)=1$, $f_y(0,0)=0$, so $\mathrm df=\mathrm dx$ and $f(0.01,0.02)\approx1.01$. The true value is about $1.00985$.

> [!PRACTICE] 4 · Mixed partials
> For $f(x,y)=x^2y^3$, compute $f_{xy}$ and $f_{yx}$.
>
> > [!ANSWER] Show answer
> > $f_x=2xy^3$, so $f_{xy}=6xy^2$; $f_y=3x^2y^2$, so $f_{yx}=6xy^2$. They agree because the polynomial has continuous higher partials.

## Formal statement

> [!FORMAL] Formal statement
> $f$ is differentiable at $(a,b)$ if there exist $A,B\in\mathbb{R}$ with $f(a+h,b+k)-f(a,b)=Ah+Bk+o(\sqrt{h^2+k^2})$; then $A=f_x(a,b)$ and $B=f_y(a,b)$. Differentiability implies continuity and the existence of partials, but neither converse holds. If $f_x,f_y$ exist in a neighbourhood of $(a,b)$ and are continuous at $(a,b)$, then $f$ is differentiable there. Schwarz: if $f_{xy}$ and $f_{yx}$ are continuous at $(a,b)$, then $f_{xy}(a,b)=f_{yx}(a,b)$.
