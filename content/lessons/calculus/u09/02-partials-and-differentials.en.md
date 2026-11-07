---
slug: "partials-and-differentials"
subject: "calculus"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lesson 2 · Calculus · Mastery mode"
title: "Partial Derivatives and Total Differentials"
subtitle: "Partial derivatives look along axes, the total differential looks at the whole"
minutes: 34
meta: ["34 min read","Requires one-variable derivatives","Mastery level"]
concepts: ["partial", "multi"]
prereq: ["deriv"]
related: ["multi", "implicit"]
---

## Learning goals

A one-variable function has a single input, so one number describes its whole rate of change. Multivariable functions are different: standing on a surface and walking in different directions gives completely different slopes. This lesson first simplifies — measure the slope along the two coordinate axes only, which gives **partial derivatives** — then combines the two into a linear approximation of the whole increment, the **total differential**.

The price is that two things must be kept apart. Partial derivatives existing only says the rates along two special directions exist, and says nothing about the surface being smooth nearby. Differentiability demands that every direction and every step be controlled by one linear part. Making this distinction precise is the core of the lesson.

Relation to other lessons: the previous lesson defined multivariable functions and double limits, where a limit already had to be approached along every path. This lesson applies the same eye to derivatives; the next one assembles these partial derivatives with the chain rule and implicit differentiation.

By the end you should be able to:

- compute first- and second-order partial derivatives, including mixed ones;
- explain the logical relations among partial derivatives, continuity and differentiability, with counterexamples;
- write the total differential and use it for linear approximation and error estimates;
- use invariance of form to differentiate composite functions directly;
- decide whether a piecewise function is differentiable at the junction.

## Three-line recap

- $\dfrac{\partial z}{\partial x}$ differentiates in $x$ with $y$ held constant; geometrically it is the slope of the curve cut from the surface by $y=$ constant.
- The total differential $dz=z_{x}dx+z_{y}dy$ is the linear main part of the increment.
- Continuous partial derivatives are sufficient for differentiability, not necessary.

## Why one-variable derivatives are not enough

Let $z=f(x,y)$ be the height of a landscape. At $(x_{0},y_{0})$, walking along $x$ gives one rate, along $y$ another. Both are useful, but they describe only two perpendicular routes.

What we really want is to replace a surface by a plane: near a point, approximate $f$ by a linear function

$$
L(x,y)=f(x_{0},y_{0})+A(x-x_{0})+B(y-y_{0})
$$

If such $A,B$ exist and the error is higher order than $\rho=\sqrt{\Delta x^{2}+\Delta y^{2}}$, the surface has a unique tangent plane there. $A,B$ turn out to be the two partial derivatives, and "error $o(\rho)$" is far stronger than "both partials exist".

The definition of a partial derivative freezes one variable. With $y=y_{0}$ fixed, the function reduces to one variable:

$$
\frac{\partial z}{\partial x}\bigg|_{(x_{0},y_{0})}
=\lim_{\Delta x\to0}\frac{f(x_{0}+\Delta x,y_{0})-f(x_{0},y_{0})}{\Delta x}
$$

Geometrically, $y=y_{0}$ is a vertical plane cutting a curve from the surface, and $z_{x}$ is that curve's tangent slope; $z_{y}$ comes from the cut $x=x_{0}$.

Computationally this is a gift: to find $z_{x}$, treat $y$ as a constant and use all the one-variable rules. Partial differentiation is not a new skill, just "move one letter at a time".

### Example 1: first- and second-order partials

For $z=x^{2}y+\sin(xy)$:

$$
z_{x}=2xy+y\cos(xy),\qquad z_{y}=x^{2}+x\cos(xy)
$$

Differentiating again in $x$:

$$
z_{xx}=2y+y^{2}\cdot(-\sin(xy))=2y-y^{2}\sin(xy)
$$

Differentiating $z_{x}$ in $y$:

$$
z_{xy}=2x+\cos(xy)-xy\sin(xy)
$$

Differentiating $z_{y}$ in $x$:

$$
z_{yx}=2x+\cos(xy)-xy\sin(xy)
$$

The two agree — not by accident, but by a theorem with a hypothesis, discussed next.

| Notation | Meaning | Here |
| --- | --- | --- |
| $z_{x}$ | first partial in $x$ | $2xy+y\cos(xy)$ |
| $z_{y}$ | first partial in $y$ | $x^{2}+x\cos(xy)$ |
| $z_{xx}$ | twice in $x$ | $2y-y^{2}\sin(xy)$ |
| $z_{xy}$ | $x$ then $y$ | $2x+\cos(xy)-xy\sin(xy)$ |

## Mixed partials and the order of differentiation

**Theorem.** If $z_{xy}$ and $z_{yx}$ exist in a neighbourhood of $P_{0}$ and are continuous at $P_{0}$, then

$$
z_{xy}(P_{0})=z_{yx}(P_{0})
$$

The proof uses the one-variable mean value theorem twice on the rectangle increment

$$
\Delta=\big[f(x+\Delta x,y+\Delta y)-f(x,y+\Delta y)\big]-\big[f(x+\Delta x,y)-f(x,y)\big]
$$

Applying the theorem first in $x$ then in $y$ gives $\Delta=z_{xy}(\xi,\eta)\Delta x\Delta y$; the opposite order gives $z_{yx}(\xi',\eta')\Delta x\Delta y$. As the steps shrink, both intermediate points tend to $P_{0}$, and continuity makes both limits equal.

Continuity cannot be dropped; there are classical examples with $z_{xy}(0,0)\ne z_{yx}(0,0)$. For elementary functions (polynomials, exponentials, trigonometric and rational combinations) the condition holds automatically, so the order may be swapped freely; for piecewise or absolute-value expressions, be careful.

> [!NOTE]
> Swapping the order is a theorem, not a habit. It works because second partials are implicitly continuous; swapping without grounds can give a wrong answer.

## Differentiability: why two partials are not enough

It is tempting to think that smoothness along $x$ and along $y$ implies smoothness overall. It does not: two directions out of infinitely many prove nothing.

**Definition.** If the increment at $P_{0}$ can be written

$$
\Delta z=A\Delta x+B\Delta y+o(\rho),\qquad \rho=\sqrt{\Delta x^{2}+\Delta y^{2}}
$$

with $A,B$ independent of $\Delta x,\Delta y$, then $f$ is differentiable at $P_{0}$, and $A\,dx+B\,dy$ is the total differential $dz$. One then proves $A=z_{x}(P_{0})$ and $B=z_{y}(P_{0})$, hence

$$
dz=z_{x}\,dx+z_{y}\,dy
$$

The requirement is a global linear approximation: whichever direction you step, the error must vanish faster than the step. Partial derivatives only require two one-dimensional limits.

**Counterexample.** Let

$$
f(x,y)=\begin{cases}\dfrac{xy}{x^{2}+y^{2}},&(x,y)\ne(0,0),\\[4pt] 0,&(x,y)=(0,0).\end{cases}
$$

On the $x$-axis $f\equiv0$, so $f_{x}(0,0)=0$; likewise $f_{y}(0,0)=0$. Both partials exist. But along $y=x$,

$$
f(x,x)=\frac{x^{2}}{x^{2}+x^{2}}=\frac12
$$

so as $x\to0$ the values tend to $\dfrac12\ne f(0,0)$: the function is not even continuous at the origin, let alone differentiable.

This single example shows three things: partials do not give continuity; partials do not give differentiability; smoothness along two special paths says nothing about all paths.

**A second counterexample.** $f(x,y)=\sqrt{x^{2}+y^{2}}$ is continuous at the origin, but neither partial exists there (along the axis it is $|x|$, not differentiable at $0$), so it is not differentiable. Geometrically it is a cone point with no tangent plane.

| Property | Meaning | Strength |
| --- | --- | --- |
| continuous partials | $z_{x},z_{y}$ exist nearby and are continuous | strongest |
| differentiable | linear main part with error $o(\rho)$ | implied by continuous partials |
| partials exist | one-variable derivatives along two axes | weakest; no continuity |
| continuous | every path has the right limit | incomparable with "partials exist" |

## Sufficient condition for differentiability

**Theorem.** If $z_{x},z_{y}$ exist in a neighbourhood of $(x_{0},y_{0})$ and are continuous there, then $f$ is differentiable there.

Split the increment and apply the mean value theorem twice. Write $\Delta z=f(x+\Delta x,y+\Delta y)-f(x,y)$ and insert $f(x,y+\Delta y)$:

$$
\Delta z=\big[f(x+\Delta x,y+\Delta y)-f(x,y+\Delta y)\big]+\big[f(x,y+\Delta y)-f(x,y)\big]
$$

The first bracket gives $z_{x}(\xi,y+\Delta y)\Delta x$, the second $z_{y}(x,\eta)\Delta y$, so

$$
\Delta z=z_{x}(\xi,y+\Delta y)\Delta x+z_{y}(x,\eta)\Delta y
$$

Continuity replaces the two coefficients by their values at $(x_{0},y_{0})$ with error $o(1)$, whose contribution is at most $o(1)\rho=o(\rho)$.

The condition is sufficient, not necessary: differentiable functions with discontinuous partials exist. So "partials discontinuous" cannot refute differentiability; refutation must return to the definition and test whether $\Delta z-(A\Delta x+B\Delta y)$ is really $o(\rho)$.

## Invariance of the total differential

If $z=f(u,v)$ is differentiable and $u=u(x,y)$, $v=v(x,y)$ are differentiable, then whether $u,v$ are independent or intermediate variables,

$$
dz=f_{u}\,du+f_{v}\,dv
$$

This is invariance of form. Its value: no need to expand into $x,y$ first; substitute layer by layer.

For example, with $z=e^{u}\sin v$, $u=xy$, $v=x+y$, write

$$
dz=e^{u}\sin v\,du+e^{u}\cos v\,dv
$$

then substitute $du=y\,dx+x\,dy$ and $dv=dx+dy$. No partial derivative of $z$ with respect to $x$ ever appears.

By contrast, second-order invariance **fails** in several variables: differentiating $dz$ again produces extra terms because $du,dv$ are themselves variables. This is a standard trap when writing Taylor formulas later.

## Applications: linear approximation and error propagation

### Example 2: approximation by total differential

Estimate $(1.02)^{2.01}$. Take $f(x,y)=x^{y}$ at $(1,2)$: $f(1,2)=1$, and

$$
f_{x}=yx^{y-1}\Big|_{(1,2)}=2,\qquad f_{y}=x^{y}\ln x\Big|_{(1,2)}=0
$$

With $\Delta x=0.02$, $\Delta y=0.01$,

$$
f(1.02,2.01)\approx1+2\times0.02+0\times0.01=1.04
$$

The true value is about $1.0406$, so the error is in the third decimal. The error is small because the steps are of order $10^{-2}$ while the neglected term is of order $\rho^{2}\approx10^{-4}$ — and the approximation deteriorates quickly farther from the base point.

### Example 3: error propagation

For a cylinder, $V=\pi r^{2}h$. With $r=2$, $h=5$, $dr=0.01$, $dh=0.02$, estimate the error in $V$.

$$
V_{r}=2\pi rh=20\pi,\qquad V_{h}=\pi r^{2}=4\pi
$$

$$
dV=V_{r}\,dr+V_{h}\,dh=20\pi\times0.01+4\pi\times0.02=0.2\pi+0.08\pi=0.28\pi\approx0.88
$$

Since $V=20\pi\approx62.83$, the relative error is $0.88/(20\pi)\approx1.4\%$. Logarithmic differentiation confirms it: from $\ln V=\ln\pi+2\ln r+\ln h$,

$$
\frac{dV}{V}=2\frac{dr}{r}+\frac{dh}{h}=2\times0.005+0.004=0.014
$$

The factor $2$ on the radius means the radius contributes twice as much relative error as the height, so measure the radius more carefully. For a worst-case bound, add absolute values:

$$
|\Delta V|\le|V_{r}||dr|+|V_{h}||dh|=0.28\pi
$$

## Four common misconceptions

> [!MYTH] Existing partial derivatives imply continuity.
> For $f=\dfrac{xy}{x^{2}+y^{2}}$ (with $f(0,0)=0$) both partials vanish, yet along $y=x$ the limit is $\dfrac12$. "Differentiable implies continuous" does not transfer from one variable.

> [!MYTH] Differentiability is equivalent to continuous partials.
> Continuous partials are only sufficient. Differentiable functions with discontinuous partials exist, so the criterion cannot be reversed; when partials are discontinuous, return to the definition.

> [!MYTH] $dz$ is the same as $\Delta z$.
> $dz$ is the linear main part, $\Delta z=dz+o(\rho)$. In the $(1.02)^{2.01}$ example $dz=0.04$ while the true increment is about $0.0406$.

> [!MYTH] Two partial derivatives at a point give a tangent plane.
> A tangent plane corresponds to differentiability. $\sqrt{x^{2}+y^{2}}$ has no partials at the origin; $\dfrac{xy}{x^{2}+y^{2}}$ has partials but is discontinuous. Neither has a tangent plane.

## Practice

> [!PRACTICE] 1 · Partial derivatives
> Find $z_{x}$ and $z_{y}$ for $z=x^{3}y^{2}-2xy$.
>
> > [!ANSWER] Show answer
> > $z_{x}=3x^{2}y^{2}-2y$, $z_{y}=2x^{3}y-2x$.

> [!PRACTICE] 2 · Total differential
> Find the total differential of $z=x^{2}+y^{2}$ at $(1,2)$.
>
> > [!ANSWER] Show answer
> > $z_{x}=2x=2$, $z_{y}=2y=4$, so $dz=2\,dx+4\,dy$.

> [!PRACTICE] 3 · Approximation
> Approximate $\sqrt{1.02^{2}+1.97^{2}}$ with a total differential.
>
> > [!ANSWER] Show answer
> > Take $f=\sqrt{x^{2}+y^{2}}$ at $(1,2)$: $f=\sqrt5$, $f_{x}=\dfrac{1}{\sqrt5}$, $f_{y}=\dfrac{2}{\sqrt5}$. With $\Delta x=0.02$, $\Delta y=-0.03$ the increment is about $\dfrac{0.02-0.06}{\sqrt5}\approx-0.0179$, giving $2.2361-0.0179=2.2182$ against a true value of about $2.2184$.

> [!PRACTICE] 4 · Mixed partials
> For $z=x^{2}y^{3}$, find $z_{xy}$ and $z_{yx}$ and explain why they agree.
>
> > [!ANSWER] Show answer
> > $z_{x}=2xy^{3}$, $z_{xy}=6xy^{2}$; $z_{y}=3x^{2}y^{2}$, $z_{yx}=6xy^{2}$. Both are polynomials, hence continuous, so the mixed-partial theorem applies.

> [!PRACTICE] 5 · Differentiability
> Decide whether $f(x,y)=x^{2}+3xy$ is differentiable at $(1,1)$ and write its differential.
>
> > [!ANSWER] Show answer
> > It is a polynomial and $f_{x}=2x+3y$, $f_{y}=3x$ are continuous everywhere, so yes. At $(1,1)$, $f_{x}=5$, $f_{y}=3$, so $df=5\,dx+3\,dy$.

> [!PRACTICE] 6 · Error estimate
> Estimate the change in $z=xy$ at $x=3$, $y=4$ when $dx=0.02$, $dy=-0.01$.
>
> > [!ANSWER] Show answer
> > $z_{x}=y=4$, $z_{y}=x=3$, so $dz=4\times0.02+3\times(-0.01)=0.08-0.03=0.05$.

## Formal statement

> [!FORMAL] Formal statement
> Let $f$ be defined in a neighbourhood of $P_{0}(x_{0},y_{0})$. If $\displaystyle\lim_{\Delta x\to0}\frac{f(x_{0}+\Delta x,y_{0})-f(x_{0},y_{0})}{\Delta x}$ exists, it is the partial derivative $f_{x}(P_{0})$, and similarly for $y$. If constants $A,B$ independent of $\Delta x,\Delta y$ satisfy $\Delta z=A\Delta x+B\Delta y+o(\rho)$ with $\rho=\sqrt{\Delta x^{2}+\Delta y^{2}}$, then $f$ is differentiable at $P_{0}$, with $A=f_{x}(P_{0})$, $B=f_{y}(P_{0})$, and $dz=A\,dx+B\,dy$. If $f_{x},f_{y}$ exist in a neighbourhood of $P_{0}$ and are continuous at $P_{0}$, then $f$ is differentiable there; the converse fails. If $f$ and $u,v$ are differentiable, then $dz=f_{u}\,du+f_{v}\,dv$. If $f_{xy},f_{yx}$ exist near $P_{0}$ and are continuous at $P_{0}$, then $f_{xy}(P_{0})=f_{yx}(P_{0})$.

## Connections to other lessons

- **With multivariable limits**: a multivariable limit must work along every path; differentiability is the same idea for derivatives — the linear approximation must work in every direction.
- **With the chain rule and implicit functions**: $z_{x}=f_{u}u_{x}+f_{v}v_{x}$ is exactly what comparing coefficients of $dx$ in $dz=f_{u}du+f_{v}dv$ gives; implicit differentiation solves $dz=0$.
- **With gradients**: $dz=z_{x}dx+z_{y}dy$ is the inner product $(\nabla z)\cdot(dx,dy)$, so the gradient appears, and directional derivatives are projections of it.
- **With extrema and Taylor formulas**: second derivative tests use the matrix of second partials, and second-order expansions contain $z_{xx},z_{xy},z_{yy}$, whose order may be permuted precisely because of the mixed-partial theorem.

In one sentence: partial derivatives look one direction at a time, the total differential looks at everything at once, and differentiability is the ruler that decides whether the combined view is honest.