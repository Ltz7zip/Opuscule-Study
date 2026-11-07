---
slug: "line-integrals-green"
subject: "calculus"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Line Integrals of the Second Kind and Green's Theorem"
subtitle: "Direction enters, and boundary meets interior"
minutes: 32
meta: ["32 min read","Requires first-kind line integrals and double integrals","Mastery level"]
concepts: ["lineint", "field"]
prereq: ["lineint"]
related: ["paramint", "multipleint", "partial"]
---

## What This Lecture Sets Out to Do

Someone pushes a box along a winding path; how much work is done? Force is a vector, displacement is a vector, and only the component of displacement along the force counts. Cut the path into small pieces, split each displacement into $\Delta x$ and $\Delta y$, split the force into $P$ and $Q$, and the work is $P\Delta x+Q\Delta y$ summed and taken to the limit. Once that sum is written, direction cannot be avoided: walking from $A$ to $B$ versus back from $B$ to $A$ flips every $\Delta x$, and the total work flips with it.

This lecture does three things. First it turns the limit of that sum into the second-kind line integral and gives the parametrised algorithm — the only difference from the previous lecture is that $ds$ becomes $dx$ and $dy$, which carry signs, so the parameter limits may run backwards. Second, it proves Green's theorem: the circulation around a closed curve equals the double integral of "local rotation" over the region inside. Third, it splits "path independence" into four equivalent statements and shows why simple connectivity cannot be dropped.

The connections are tight. The first-kind integral measured length and ignored direction; adding direction back gives a second integral on the same object. The next lecture moves the same idea to surfaces, replacing $dx$, $dy$ by signed area elements, and produces Gauss and Stokes. Green's theorem is the two-dimensional rehearsal for those higher-dimensional formulas: an integral over a closed boundary becomes an integral over the interior.

By the end you should be able to:

- state the definition and explain why reversing the path changes the sign;
- convert $dx$, $dy$ into parameter differentials with the limits following the direction;
- decide between direct parametrization and Green's theorem, and carry out closing and hole-cutting;
- derive the area formula $\frac12\oint_L x\,dy-y\,dx$ from Green;
- separate "equal partials" from "path independent", noting the missing hypothesis of simple connectivity;
- recognise an exact differential and evaluate the integral by a potential.

## Three-Line Recap

- A first-kind line integral uses $ds$, ignores direction, and always has the smaller number as the lower limit.
- A double integral accumulates over a plane region and can be evaluated as an iterated integral.
- Partial derivatives measure change along coordinate directions, and $\partial^2 u/\partial x\partial y=\partial^2 u/\partial y\partial x$ whenever the mixed partials are continuous.

## From ds to dx and dy

Why do we need a second kind at all? The integral $\int_L f\,ds$ handles scalars accumulated along a curve: density, temperature, height. It cannot handle force, velocity, or an electric field, because those are directional: only the component along the tangent does work, the normal component does none. To encode that, the element itself must carry direction.

So replace the arc element $ds$ by its projections $\Delta x_i$, $\Delta y_i$ on the axes. These carry signs: a piece moving right has $\Delta x_i>0$, moving left $\Delta x_i<0$.

Let $L$ be an oriented arc from $A$ to $B$ with $P,Q$ bounded on it. Cut $L$ into $n$ pieces with projections $\Delta x_i,\Delta y_i$, sample $(\xi_i,\eta_i)$ on the $i$-th piece, and form

$$
\sum_{i=1}^{n}\left[P(\xi_i,\eta_i)\Delta x_i+Q(\xi_i,\eta_i)\Delta y_i\right]
$$

If the sum tends to a constant independent of partition and sampling as the largest arc length tends to zero, that constant is the second-kind line integral

$$
\int_L P\,dx+Q\,dy
$$

Orientation is now substantive:

$$
\int_{AB}P\,dx+Q\,dy=-\int_{BA}P\,dx+Q\,dy
$$

because reversing the path flips every $\Delta x_i$ and $\Delta y_i$, the exact opposite of the first kind.

Geometric intuition: read $(P,Q)$ as a vector field; the integral is its tangential accumulation along the curve. If the field is the unit tangent, the integral is the arc length; if the field is everywhere perpendicular to the curve, the integral vanishes. Numerically it is work: force times displacement, in the continuous limit.

The properties parallel the first kind, with one extra sign rule:

- **Linearity** in $P$ and $Q$ separately;
- **Additivity** when $L$ splits into pieces;
- **Sign reversal** under reversing orientation;
- **Estimate** $\left|\int_L P\,dx+Q\,dy\right|\le\int_L\left(\max\sqrt{P^{2}+Q^{2}}\right)ds$.

> [!FORMAL] Existence
> If $L$ is a smooth oriented arc and $P,Q$ are continuous on $L$, the second-kind integral exists. The proof is the same as for the first kind: compare the sum with a Riemann sum over the parameter interval and control the sampling error by uniform continuity.

## Parametrization: Turning dx and dy into dt

Let $L$ be given by $x=\varphi(t)$, $y=\psi(t)$, with $t$ running from $\alpha$ to $\beta$ as you move from $A$ to $B$. Since $dx=\varphi'(t)\,dt$ and $dy=\psi'(t)\,dt$, the sum becomes

$$
\sum_{i=1}^{n}\left[P(\varphi(\tau_i),\psi(\tau_i))\varphi'(\tau_i)+Q(\varphi(\tau_i),\psi(\tau_i))\psi'(\tau_i)\right]\Delta t_i
$$

a Riemann sum, so

$$
\int_L P\,dx+Q\,dy=\int_{\alpha}^{\beta}\left[P\varphi'(t)+Q\psi'(t)\right]dt
$$

Two points must be remembered.

First, **$\alpha$ may exceed $\beta$**. This is the opposite of the first kind. Because $dx$ and $dy$ carry signs, all orientation information sits in the direction of the parameter interval, so the limits must faithfully record where you start and where you end. Habitually writing the smaller number first secretly reverses the direction.

Second, **$dx$ is not $ds$**. Writing $\int_L P\,dx=\int_L P\,ds$ happens to be true only for a horizontal curve; in general $dx=ds\cos\alpha$, with a direction cosine missing.

Example: $L$ is the segment from $(0,0)$ to $(1,1)$; compute $\int_L x\,dy-y\,dx$. With $x=t$, $y=t$, $0\le t\le1$,

$$
\int_0^1(t-t)\,dt=0
$$

Now take the broken path $(0,0)\to(1,0)\to(1,1)$. On the first leg $dy=0$ and $y=0$, so the integrand vanishes; on the second $dx=0$ and $x=1$, giving $\int_0^1 1\,dy=1$. Different values for the same endpoints: the integral depends on the path.

The example hides a geometric fact. The form $x\,dy-y\,dx$ is twice the area swept by the radius vector, since $x\,dy-y\,dx=r^{2}d\theta$. Along a straight segment the motion is radial and sweeps nothing, giving $0$; along the broken path the second leg sweeps one unit of area, giving $1$. This is why the form measures area in the next section.

Example: $L$ is the circle $x^{2}+y^{2}=a^{2}$ traversed counterclockwise; compute $\oint_L x\,dy-y\,dx$. Parametrize $x=a\cos t$, $y=a\sin t$, $0\le t\le2\pi$:

$$
x\,dy-y\,dx=(a\cos t)(a\cos t)-(a\sin t)(-a\sin t)=a^{2}
$$

so the integral is $\int_0^{2\pi}a^{2}\,dt=2\pi a^{2}$, twice the disk area, consistent with the geometric reading.

> [!NOTE]
> Before computing, check whether the form is an exact differential or splits into an easy part plus a cancelling part. For instance $x\,dy+y\,dx=d(xy)$, and no parametrization is needed.

## Green's Theorem: Trading Boundary for Interior

Let $D$ be a closed region bounded by a piecewise smooth closed curve $L$, with $P,Q\in C^{1}(D)$ and $L$ positively oriented (the region stays on your left). Then

$$
\oint_L P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)d\sigma
$$

The integrand is the two-dimensional curl, measuring how strongly the field rotates about each point. The theorem says that adding up these local rotations gives exactly the circulation around the outer boundary. The orientation convention is essential: with positive orientation both sides are positive, and reversing it flips both, so the identity survives.

The proof has two steps: first a "nice region", then a general one.

Step one: suppose $D$ is both $x$-simple and $y$-simple,

$$
D=\{(x,y):c\le y\le d,\ x_1(y)\le x\le x_2(y)\}
=\{a\le x\le b,\ y_1(x)\le y\le y_2(x)\}
$$

Handle the $Q$ part first, integrating in $x$ then $y$:

$$
\iint_D\frac{\partial Q}{\partial x}\,d\sigma
=\int_c^d\left[Q(x_2(y),y)-Q(x_1(y),y)\right]dy
$$

The boundary consists of four arcs. Along the two horizontal pieces $dy=0$, so they do not contribute to $\oint Q\,dy$. Along the right side $x=x_2(y)$, with $y$ running upward, the contribution is $\int_c^d Q(x_2(y),y)\,dy$; along the left side $x=x_1(y)$, traversed downward in positive orientation, it is $-\int_c^d Q(x_1(y),y)\,dy$. Together they equal the double integral.

The $P$ part is symmetric, integrating in $y$ then $x$:

$$
\iint_D\frac{\partial P}{\partial y}\,d\sigma
=\int_a^b\left[P(x,y_2(x))-P(x,y_1(x))\right]dx
$$

while $\oint P\,dx$ runs right-to-left on the top and left-to-right on the bottom with opposite signs, giving $-\int_a^b[P(x,y_2)-P(x,y_1)]\,dx$. Hence

$$
\oint_L P\,dx=-\iint_D\frac{\partial P}{\partial y}\,d\sigma
$$

and adding the two identities gives Green's theorem.

Step two: cut a general region into nice pieces by auxiliary lines, apply the result on each piece, and add. Every auxiliary line is shared by two neighbouring pieces with opposite orientations, so its two contributions cancel, leaving only the outer boundary. This cancellation argument returns in Gauss and Stokes.

## Using Green's Theorem

The value of Green is a change of route: use it when the boundary integral is hard and the double integral easy — or the other way round.

Example: for the positively oriented circle $x^{2}+y^{2}=a^{2}$, compute $\oint_L x\,dy-y\,dx$. With $P=-y$, $Q=x$, $\partial Q/\partial x=1$, $\partial P/\partial y=-1$, the difference is $2$:

$$
\oint_L x\,dy-y\,dx=\iint_D 2\,d\sigma=2\pi a^{2}
$$

matching the parametrised computation. Hence, for any piecewise smooth simple closed curve,

$$
A=\frac12\oint_L x\,dy-y\,dx
$$

an area formula that does not care about the shape — especially useful when the boundary parametrizes easily but the region does not slice easily.

Example (closing the curve): $L$ is the upper semicircle $x^{2}+y^{2}=a^{2}$ from $(a,0)$ to $(-a,0)$; compute $\displaystyle\int_L(e^{x}\sin y-y)\,dx+(e^{x}\cos y-1)\,dy$.

Here $P=e^{x}\sin y-y$, $Q=e^{x}\cos y-1$, and

$$
\frac{\partial Q}{\partial x}=e^{x}\cos y,\qquad
\frac{\partial P}{\partial y}=e^{x}\cos y-1
$$

so the difference is identically $1$ — ideal for Green, but the curve is open. Add the segment $L_1$ on the $x$-axis from $(-a,0)$ to $(a,0)$, making $L+L_1$ the positive boundary of the upper half disk. On $L_1$, $y=0$ and $dy=0$, so the integrand is $(e^{x}\cdot0-0)\,dx=0$ and the added piece contributes nothing. Therefore

$$
\int_L=\oint_{L+L_1}=\iint_D 1\,d\sigma=\frac{\pi a^{2}}{2}
$$

The general recipe: close the gap with the simplest possible auxiliary curve, apply Green to the closed loop, then subtract the auxiliary piece. Horizontal or vertical segments are best, since they kill $dy$ or $dx$.

Example (cutting a hole): let $D$ be the annulus $1\le x^{2}+y^{2}\le4$ and compute $\displaystyle\oint_L\frac{-y\,dx+x\,dy}{x^{2}+y^{2}}$ with $L$ positively oriented.

Inside the annulus the two partials agree, so on a simply connected region the answer would be zero. But the region has a hole. Green's theorem still applies if both boundary circles are included: the outer one counterclockwise, the inner one clockwise, so the region always stays on the left. Since the curl vanishes on the annulus, the double integral is zero, so the outer and inner contributions sum to zero — the counterclockwise integral over the outer circle equals the counterclockwise integral over the inner circle. On the inner circle of radius $1$, the form is $\frac{-y\,dx+x\,dy}{1}=d\theta$, whose integral over one loop is $2\pi$. Hence the original integral is $2\pi$.

The lesson: circulation is nonzero although the curl vanishes at every point. There is no contradiction — the zero-curl region has a hole, and a loop around the hole cannot be contracted to a point inside the region, so local vanishing does not integrate to global vanishing.

| Situation | Strategy |
| --- | --- |
| Closed curve, simple partials | apply Green, convert to a double integral |
| Open curve | close it, then subtract the added piece |
| Region with a hole | outer boundary positive, inner boundary negative |
| Partial derivatives fail at an interior point | remove that point first; Green does not apply directly |

All four rows are the same requirement in disguise: Green needs a boundary that encloses exactly a region where $P,Q$ have continuous partials. Open curves are closed, holes get inner boundaries, singularities get cut out.

## Four Equivalent Forms of Path Independence

Let $D$ be simply connected (any closed curve in $D$ can be contracted to a point inside $D$) and let $P,Q\in C^{1}(D)$. The following are equivalent:

1. $\int_L P\,dx+Q\,dy$ depends only on the endpoints, not on the path;
2. $\oint_C P\,dx+Q\,dy=0$ for every closed curve $C$ in $D$;
3. $\dfrac{\partial P}{\partial y}=\dfrac{\partial Q}{\partial x}$ throughout $D$;
4. there is a potential $u(x,y)$ with $du=P\,dx+Q\,dy$, and then the integral equals $u(B)-u(A)$.

The proof is a cycle, and no link is hard.

$1\Rightarrow2$: on a closed curve the starting point equals the endpoint, so the two "paths" are the same loop; path independence makes their integrals equal, while reversing flips the sign, so the integral equals its own negative and must be zero.

$2\Rightarrow1$: given two paths $L_1$, $L_2$ from $A$ to $B$, form a closed loop from $L_1$ followed by $L_2$ reversed; its integral is zero, i.e. $\int_{L_1}-\int_{L_2}=0$.

$2\Rightarrow3$: take any point and a tiny disk of radius $\varepsilon$ around it, inside $D$. By Green, the integral around that disk is $\iint(\partial Q/\partial x-\partial P/\partial y)\,d\sigma=0$. Dividing by the area $\pi\varepsilon^{2}$ gives the average of the integrand as zero; letting $\varepsilon\to0$ and using continuity gives zero at the point itself. The point was arbitrary.

$3\Rightarrow4$: fix $A\in D$ and construct $u$ by integrating along a horizontal-then-vertical broken line; one verifies $u_x=P$, $u_y=Q$, hence $du=P\,dx+Q\,dy$.

$4\Rightarrow1$: if $du=P\,dx+Q\,dy$, then along any path from $A$ to $B$, $\int_L du=u(B)-u(A)$.

The practical value: test path independence with one partial-derivative identity, and evaluate by finding $u$.

Example: compute $\int_L 2xy\,dx+x^{2}\,dy$ from $(0,0)$ to $(1,2)$. Since $\partial P/\partial y=2x=\partial Q/\partial x$ and $P\,dx+Q\,dy=d(x^{2}y)$,

$$
\int_L 2xy\,dx+x^{2}\,dy=x^{2}y\Big|_{(0,0)}^{(1,2)}=2
$$

No knowledge of the path is needed. Finding the potential is systematic: $u_x=2xy$ gives $u=x^{2}y+g(y)$; then $u_y=x^{2}+g'(y)=x^{2}$ forces $g'=0$.

Simple connectivity cannot be dropped. On the plane with the origin removed, $\dfrac{-y\,dx+x\,dy}{x^{2}+y^{2}}$ satisfies $\partial P/\partial y=\partial Q/\partial x$, yet its integral around the unit circle is $2\pi\ne0$. The punctured plane is not simply connected. More generally, looping $n$ times around the origin gives $2\pi n$: the integral counts how many times you wind, so it can take any integer multiple and certainly depends on the path.

> [!NOTE]
> Path independence compares two paths inside the same connected region. If the paths wind around a hole differently, they do not lie in a common simply connected region, and the question does not apply.

## Four Common Misconceptions

> [!MYTH] A second-kind line integral can be reversed freely.
> Reversing flips the sign. The first kind ignores direction; the second kind builds it into the definition, and mixing the two is the usual source of sign errors.

> [!MYTH] $\partial P/\partial y=\partial Q/\partial x$ alone guarantees path independence.
> The region must also be simply connected. The punctured plane satisfies the equality, yet a loop around the missing point gives $2\pi$.

> [!MYTH] Green's theorem holds for every closed curve.
> It needs continuous partials on the whole enclosed region. If there is a singular point inside, cut it out and apply the theorem to what remains.

> [!MYTH] Green's theorem fails once the region has a hole.
> It does not; the boundary simply has two components — outer positive, inner negative. The annulus is covered, and this hole-cutting step is exactly what produces the answer $2\pi$.

## Exercises

> [!PRACTICE] 1 · Direct
> Compute $\int_L y\,dx+x\,dy$ along the segment from $(1,1)$ to $(2,3)$.
>
> > [!ANSWER] Show answer
> > The integrand is exactly $d(xy)$, so the value is $2\cdot3-1\cdot1=5$. Parametrising $x=1+t$, $y=1+2t$ on $0\le t\le1$ gives the same $5$.

> [!PRACTICE] 2 · Green
> Compute $\oint_L(x+y)\,dx+(x-y)\,dy$ around the positively oriented unit circle.
>
> > [!ANSWER] Show answer
> > $P=x+y$, $Q=x-y$, and $\partial Q/\partial x-\partial P/\partial y=1-1=0$, so the integral is $0$.

> [!PRACTICE] 3 · Exact differential
> Show that $e^{y}dx+xe^{y}dy$ is exact and integrate it from $(0,0)$ to $(1,1)$.
>
> > [!ANSWER] Show answer
> > $\partial P/\partial y=e^{y}=\partial Q/\partial x$, with potential $u=xe^{y}$. The integral is $e-0=e$.

> [!PRACTICE] 4 · Closed loop
> Compute $\oint_L(x^{2}-y)\,dx+(x+y^{2})\,dy$ around the positively oriented unit circle.
>
> > [!ANSWER] Show answer
> > $\partial Q/\partial x=1$ and $\partial P/\partial y=-1$, so the difference is $2$ and the integral is $2$ times the disk area, namely $2\pi$.

> [!PRACTICE] 5 · Area formula
> Use Green's theorem to show that the ellipse $\dfrac{x^{2}}{a^{2}}+\dfrac{y^{2}}{b^{2}}=1$ has area $\pi ab$.
>
> > [!ANSWER] Show answer
> > Take $P=-y/2$, $Q=x/2$; then $\partial Q/\partial x-\partial P/\partial y=1$, so the area is $\iint_D d\sigma=\frac12\oint_L x\,dy-y\,dx=\pi ab$. Parametrising $x=a\cos t$, $y=b\sin t$ gives $\frac12\int_0^{2\pi}ab\,dt=\pi ab$ as well.

> [!PRACTICE] 6 · Test path independence
> Decide whether $\int_L(2xy+y^{2})\,dx+(x^{2}+2xy)\,dy$ is path independent, and evaluate it from $(0,0)$ to $(1,1)$.
>
> > [!ANSWER] Show answer
> > $\partial P/\partial y=2x+2y=\partial Q/\partial x$ on the whole plane, so the integral is path independent. A potential is $u=x^{2}y+xy^{2}$, and the value is $u(1,1)-u(0,0)=2$.

## Precise Statement

> [!FORMAL] Precise statement
> Let $L$ be an oriented smooth arc and $P,Q$ bounded on it. Partition $L$, let $\Delta x_i,\Delta y_i$ be the axis projections of the $i$-th piece, and form $\sum(P\Delta x_i+Q\Delta y_i)$. If the sum tends to a number independent of the partition and sampling as the largest arc length tends to zero, that number is the second-kind line integral of $P\,dx+Q\,dy$ along $L$, and reversing the orientation changes its sign. If $L$ has a parametrization $x=\varphi(t)$, $y=\psi(t)$ with $t$ running from $\alpha$ to $\beta$ as the point moves from start to end, then
> $$
> \int_L P\,dx+Q\,dy=\int_{\alpha}^{\beta}\left[P\varphi'(t)+Q\psi'(t)\right]dt
> $$
> where the order of $\alpha$ and $\beta$ is dictated by the orientation. If $D$ is a closed region bounded by a piecewise smooth closed curve $L$ with positive orientation and $P,Q\in C^{1}(D)$, then
> $$
> \oint_L P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)d\sigma
> $$
> If $D$ is simply connected with $P,Q\in C^{1}(D)$, then path independence, vanishing loop integrals, the equality $\partial P/\partial y=\partial Q/\partial x$, and the existence of a potential $u$ are mutually equivalent, and $\int_{AB}P\,dx+Q\,dy=u(B)-u(A)$.

## Connections with Other Lectures

- **With first-kind line integrals**: the same cut-sum-limit frame, differing only in the element. $ds$ is nonnegative while $dx$, $dy$ carry signs, so one ignores direction and the other flips with it; one has fixed limits and the other follows the traversal.
- **With double integrals**: Green exchanges a boundary integral for a double integral whose integrand is the two-dimensional curl, and in doing so supplies a new way to compute area.
- **With partial derivatives and exact differentials**: the test is a partial-derivative identity and the evaluation uses a potential — the multivariable fundamental theorem of calculus.
- **With the next lecture**: replace $P\,dx+Q\,dy$ by $P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ and the plane loop by a closed surface, and Green becomes Gauss; replace the plane region by a space surface and its boundary by a space curve, and it becomes Stokes. All three proofs use the same cancellation on interior cuts.
- **With field theory**: circulation is the second-kind line integral and the curl is the integrand on the right of Green; path independence means the field is conservative and the potential is the scalar function.

In one sentence: this lecture puts direction into the integral and then uses Green to trade boundary circulation for interior curl, preparing the two higher-dimensional formulas.