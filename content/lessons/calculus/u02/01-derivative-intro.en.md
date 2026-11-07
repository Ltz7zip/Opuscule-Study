---
slug: "derivative-intro"
subject: "calculus"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Derivative: Definition, Geometry, and Rules"
subtitle: "The limit of a difference quotient is the tangent slope"
minutes: 30
meta: ["30 min read","Requires function limits and continuity","Mastery level"]
concepts: ["deriv", "cont"]
prereq: ["cont"]
related: ["mvt", "taylor", "extremum"]
---

## What this lecture sets out to do

The previous lecture built functions and sequence limits: what it means for a function to be defined near a point, and how "arbitrarily small" is said with $\varepsilon$. This lecture adds one move: **let two points come arbitrarily close and ask whether the difference quotient has a limit**.

That move settles three questions. What is a tangent line? "Meeting the curve only once" fails immediately for $y=x^{3}$. What is instantaneous velocity? Average velocity depends on the time interval, and at interval zero the denominator vanishes. How sensitive is a function at a point? All three share the structure

$$
\frac{\text{difference in output}}{\text{difference in input}}
$$

as the input difference tends to zero. Abstracted, this is the derivative: not a new symbol but **a limit that already existed**, given a name.

By the end you should be able to:

- compute a derivative at a point from the definition, with the full limit process;
- explain that derivative, tangent slope, and instantaneous rate are one object;
- write tangent and normal equations, and know when the normal does not exist;
- prove "differentiable implies continuous" and give counterexamples to the converse;
- use the sum, product, quotient, and chain rules without dropping a chain factor;
- return to the definition at a seam instead of substituting into a branch formula.

## Three-line recap

- The average rate $\dfrac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ depends on $\Delta x$; it is a secant slope.
- If the quotient has a limit as $\Delta x\to0$, that limit is $f'(x_0)$, the tangent slope.
- Differentiable implies continuous; the converse fails at corners, vertical tangents, and violent oscillations.

## Why we need the derivative

On a curve $y=f(x)$, take $P(x_0,f(x_0))$ and a nearby $Q(x_0+\Delta x,f(x_0+\Delta x))$. The secant slope is

$$
k(\Delta x)=\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
$$

Computable whenever $\Delta x\ne0$. But the tangent is the limiting position of the secant, and a limiting position needs a number. So we define the tangent slope as the limit of $k(\Delta x)$.

Physics has the same shape. Average velocity over $[t_0,t_0+\Delta t]$ is

$$
\bar v=\frac{s(t_0+\Delta t)-s(t_0)}{\Delta t}
$$

One second and one thousandth of a second usually differ, and $\Delta t=0$ is meaningless. Instantaneous velocity can only be a limit. The two problems differ only in letters: difference in height over difference in horizontal position, versus difference in displacement over difference in time.

> [!NOTE]
> The difference quotient always makes sense for $\Delta x\ne0$; all difficulty is in the passage to the limit. Simplify until the limit is visible, then take it. The order cannot be reversed.

## The definition of the derivative

> [!FORMAL] Definition of the derivative
> Let $f$ be defined in a neighborhood of $x_0$. If
> $$\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$$
> exists and is finite, then $f$ is **differentiable** at $x_0$, and the limit is the derivative, written $f'(x_0)$, $y'|_{x=x_0}$, or $\left.\dfrac{dy}{dx}\right|_{x=x_0}$.

Three points. First, **the derivative is a number**, not a function. Collecting the values at all differentiable points gives $f'(x)$; confusing the two produces errors such as writing $f'(x)$ at $x_0$ and then substituting.

Second, **being defined in a neighborhood** matters. $\sqrt{x}$ is defined only to the right of $0$, so there is no two-sided limit and no derivative by this definition, though a right-hand derivative exists.

Third, $\Delta x$ may have either sign. Restricting to $\Delta x\to0^+$ gives $f'_+(x_0)$; restricting to $\Delta x\to0^-$ gives $f'_-(x_0)$. The two-sided derivative exists exactly when both exist and agree:

$$
f'(x_0)\ \text{exists}\iff f'_+(x_0)=f'_-(x_0)
$$

This is the only reliable test at a seam. Equivalently, $f'(x_0)=\lim_{x\to x_0}\dfrac{f(x)-f(x_0)}{x-x_0}$, which is convenient when function values are known.

## Differentiating from the definition: two examples

The procedure is: write the quotient, simplify until $\Delta x$ cancels, take the limit. The middle step is the crux, since substituting $\Delta x=0$ gives $0/0$.

**Example 1.** Find $f'(4)$ for $f(x)=\sqrt{x}$.

$$
\frac{f(4+h)-f(4)}{h}=\frac{\sqrt{4+h}-2}{h}
$$

Multiply by the conjugate:

$$
\frac{\sqrt{4+h}-2}{h}\cdot\frac{\sqrt{4+h}+2}{\sqrt{4+h}+2}
=\frac{(4+h)-4}{h\left(\sqrt{4+h}+2\right)}
=\frac{1}{\sqrt{4+h}+2}
$$

Now $h$ is gone from the denominator, so

$$
f'(4)=\lim_{h\to0}\frac{1}{\sqrt{4+h}+2}=\frac{1}{4}
$$

This matches the geometry: $y=\sqrt{x}$ is fairly flat at $x=4$.

**Example 2.** Find $f'(2)$ for $f(x)=\dfrac{1}{x}$.

$$
\frac{f(2+h)-f(2)}{h}
=\frac{1}{h}\left(\frac{1}{2+h}-\frac{1}{2}\right)
=\frac{2-(2+h)}{2h(2+h)}
=-\frac{1}{2(2+h)}
$$

Letting $h\to0$ gives $f'(2)=-\dfrac14$; the minus sign says the function decreases near $x=2$.

Both examples show the same feature: **cancellation before the limit**. Radicals call for rationalizing, fractions for a common denominator, trigonometric expressions for standard limits. Skipping the algebra loses the process marks.

## Geometric meaning: tangent, normal, and linear approximation

Since the secant slope tends to the tangent slope, the tangent at $P(x_0,f(x_0))$ is

$$
y-f(x_0)=f'(x_0)(x-x_0)
$$

The normal is perpendicular, with slope $-1/f'(x_0)$ when $f'(x_0)\ne0$:

$$
y-f(x_0)=-\frac{1}{f'(x_0)}(x-x_0)
$$

If $f'(x_0)=0$, the tangent is horizontal and the normal is vertical, with equation $x=x_0$. If the curve has a vertical tangent (e.g. $\sqrt[3]{x}$ at the origin), the normal is horizontal. So the normal-slope formula needs $f'(x_0)$ to exist and be nonzero.

**Example 3.** Find the tangent and normal to $f(x)=x^{3}-2x$ at $x=1$.

$$
f(1)=1-2=-1,\qquad f'(x)=3x^{2}-2,\qquad f'(1)=1
$$

The tangent is $y+1=x-1$, i.e. $y=x-2$; the normal has slope $-1$, so $y+1=-(x-1)$, i.e. $y=-x$. The slopes multiply to $-1$, confirming perpendicularity.

The tangent is also the best **first-order approximation** near $P$:

$$
f(x)\approx f(x_0)+f'(x_0)(x-x_0)
$$

Its error is smaller than $x-x_0$ by an order. The next lecture's differential is this statement as $\Delta y=f'(x_0)\Delta x+o(\Delta x)$. The same approximation gives the physical readings: velocity from displacement, marginal cost from cost.

> [!MYTH] A tangent meets the curve at exactly one point.
> The tangent to $y=x^{3}$ at the origin is $y=0$; it touches the curve and passes through it. A tangent is the local best linear approximation, and "meets once" is an illusion from circles.

## Differentiability and continuity

> [!FORMAL] Differentiable implies continuous
> If $f$ is differentiable at $x_0$, then $f$ is continuous at $x_0$.

Isolate the increment using the definition:

$$
f(x_0+\Delta x)-f(x_0)
=\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}\cdot\Delta x
$$

The first factor tends to the finite $f'(x_0)$, the second to $0$, so the product tends to $0$:

$$
\lim_{\Delta x\to0}\left[f(x_0+\Delta x)-f(x_0)\right]=0
$$

That is $\lim_{\Delta x\to0}f(x_0+\Delta x)=f(x_0)$, which is continuity.

The converse fails: continuity prevents breaking, not corners. The three standard failures are a corner ($|x|$ at $0$, one-sided derivatives $-1$ and $1$), a vertical tangent ($\sqrt[3]{x}$ at $0$, quotient $h^{-2/3}\to+\infty$), and oscillation ($x\sin\dfrac1x$ at $0$, quotient $\sin\dfrac1h$ has no limit).

For $|x|$, the one-sided derivatives are

$$
f'_-(0)=\lim_{h\to0^-}\frac{|h|}{h}=-1,\qquad
f'_+(0)=\lim_{h\to0^+}\frac{|h|}{h}=1
$$

They differ, so $|x|$ is not differentiable at $0$: the curve has a corner and no single tangent direction. For $\sqrt[3]{x}$ there is no corner and the curve is smooth, but the tangent is vertical and the quotient tends to infinity; a finite limit is required, so no derivative exists. "Infinite derivative" is only notation.

## Four differentiation rules

| Rule | Formula | Condition |
| --- | --- | --- |
| Sum/difference | $(u\pm v)'=u'\pm v'$ | $u,v$ differentiable |
| Constant multiple | $(Cu)'=Cu'$ | $u$ differentiable, $C$ constant |
| Product | $(uv)'=u'v+uv'$ | $u,v$ differentiable |
| Quotient | $\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^{2}}$ | $u,v$ differentiable, $v\ne0$ |
| Chain | $\dfrac{dy}{dx}=\dfrac{dy}{du}\cdot\dfrac{du}{dx}$ | inner at $x_0$, outer at $g(x_0)$ |

The product rule shows the "add and subtract" trick. Insert $-u(x+h)v(x)+u(x+h)v(x)$ into the quotient:

$$
\frac{u(x+h)v(x+h)-u(x)v(x)}{h}
=u(x+h)\cdot\frac{v(x+h)-v(x)}{h}+v(x)\cdot\frac{u(x+h)-u(x)}{h}
$$

As $h\to0$, the first term tends to $u(x)v'(x)$ and the second to $v(x)u'(x)$, giving $(uv)'=u'v+uv'$. The quotient rule follows by writing $u/v=u\cdot v^{-1}$ and applying product and chain rules.

The chain rule is the most used and the easiest to get wrong. Its intuition is "rates multiply layer by layer": if $u$ changes twice as fast as $x$ and $y$ three times as fast as $u$, then $y$ changes six times as fast as $x$. The proof draft writes $\dfrac{\Delta y}{\Delta x}=\dfrac{\Delta y}{\Delta u}\cdot\dfrac{\Delta u}{\Delta x}$ and takes limits; a rigorous proof must handle $\Delta u=0$. The conclusion holds when both layers are differentiable.

## The basic derivative table and composite examples

These should be automatic:

| Function | Derivative | Domain note |
| --- | --- | --- |
| $x^{\alpha}$ | $\alpha x^{\alpha-1}$ | valid on $x>0$ |
| $\sin x$ | $\cos x$ | all real $x$ |
| $\cos x$ | $-\sin x$ | all real $x$ |
| $e^{x}$ | $e^{x}$ | all real $x$ |
| $\ln x$ | $\dfrac1x$ | $x>0$ |

**Example 4.** Find the derivative of $y=\ln(\cos x)$. Outer $\ln u$, inner $u=\cos x$:

$$
y'=\frac{1}{\cos x}\cdot(-\sin x)=-\tan x
$$

The domain requires $\cos x>0$; otherwise $-\tan x$ is unrelated to $y$. This shows the two-layer structure of the chain rule; three layers keep multiplying, as Practice 2 checks.

## Seams in piecewise functions

Inside a branch, differentiate by formula; at the seam, return to the definition, because the branches differ and the definition uses values on both sides. Check continuity, compute one-sided derivatives, compare.

Take

$$
f(x)=\begin{cases}x^{2}\sin\dfrac1x,&x\ne0,\\[2mm]0,&x=0\end{cases}
$$

Continuity follows from $|f(x)|\le x^{2}\to0$. By definition,

$$
\left|\frac{f(0+h)-f(0)}{h}\right|
=\left|h\sin\frac1h\right|\le|h|\to0
$$

so $f'(0)=0$. Yet the derivative oscillates near $0$: at $x_n=\dfrac{1}{2n\pi}$, $f'(x_n)=2x_n\sin\dfrac1{x_n}-\cos\dfrac1{x_n}=-1$, not tending to $0$. Hence **$f'$ is not continuous at $0$**. Two lessons: differentiability does not guarantee a continuous derivative, and the derivative is pointwise, not obtained by differentiating a formula and substituting.

> [!MYTH] At a seam, differentiate each branch and substitute the point.
> Check continuity first, then use the definition. Differentiating $|x|$ on each side gives $-1$ and $1$, yet $|x|$ is not differentiable at $0$. Substitution gives only one-sided derivatives.

## Three common misconceptions

> [!MYTH] $(uv)'=u'v'$.
> With $u=v=x$, the left side is $(x^{2})'=2x$ and the right side $1\cdot1=1$. The correct rule is $(uv)'=u'v+uv'$.

> [!MYTH] A tangent can meet the curve only once.
> The tangent to $y=x^{3}$ at the origin is $y=0$; it touches the curve and also passes through it. A tangent is the local best linear approximation.

> [!MYTH] Continuity is enough for a tangent.
> $|x|$ is continuous at $0$ but has different one-sided slopes, so no tangent. $x^{1/3}$ is continuous and looks smooth at $0$, yet has a vertical tangent and no derivative.

## Practice

> [!PRACTICE] 1 · From the definition
> Use the definition to find the derivative of $f(x)=\sqrt{x}$ at $x=9$.
>
> > [!ANSWER] Show answer
> > The quotient is $\dfrac{\sqrt{9+h}-3}{h}$; rationalizing gives $\dfrac{1}{\sqrt{9+h}+3}\to\dfrac16$. Hence $f'(9)=\dfrac16$.

> [!PRACTICE] 2 · Three layers
> Find the derivative of $y=\cos\left(\sqrt{1+x^{2}}\right)$.
>
> > [!ANSWER] Show answer
> > Outer $\cos u$, middle $u=\sqrt v$, inner $v=1+x^{2}$. $y'=-\sin u\cdot\dfrac{1}{2\sqrt v}\cdot2x=-\dfrac{x\sin\sqrt{1+x^{2}}}{\sqrt{1+x^{2}}}$.

> [!PRACTICE] 3 · Quotient rule
> Find the derivative of $y=\dfrac{x+1}{x^{2}+1}$.
>
> > [!ANSWER] Show answer
> > $y'=\dfrac{(x^{2}+1)-(x+1)\cdot2x}{(x^{2}+1)^{2}}=\dfrac{1-2x-x^{2}}{(x^{2}+1)^{2}}$.

> [!PRACTICE] 4 · At the seam
> Let $f(x)=x\lvert x\rvert$. Is $f$ differentiable at $x=0$? If so, find the derivative.
>
> > [!ANSWER] Show answer
> > For $h>0$, $\dfrac{f(h)-f(0)}{h}=\dfrac{h^{2}}{h}=h\to0$; for $h<0$, $\dfrac{-h^{2}}{h}=-h\to0$. Both one-sided derivatives equal $0$, so $f'(0)=0$.

> [!PRACTICE] 5 · Tangent and normal
> Find the tangent and normal to $y=\ln x$ at $x=1$.
>
> > [!ANSWER] Show answer
> > $y(1)=0$ and $y'=1/x$, so $y'(1)=1$. The tangent is $y=x-1$; the normal is $y=-x+1$.

## A precise statement

Let $f$ be defined in a neighborhood of $x_0$. If $\lim_{\Delta x\to0}\dfrac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$ exists and is finite, then $f$ is differentiable at $x_0$ and the limit is $f'(x_0)$.

$f$ is differentiable at $x_0$ iff $f'_-(x_0)=f'_+(x_0)$, both existing. Differentiability implies continuity, not conversely. If $f,g$ are differentiable at $x_0$, then $(f\pm g)'=f'\pm g'$ and $(fg)'=f'g+fg'$; if $g(x_0)\ne0$, then $\left(\dfrac{f}{g}\right)'=\dfrac{f'g-fg'}{g^{2}}$; if $g$ is differentiable at $x_0$ and $f$ at $g(x_0)$, then $(f\circ g)'(x_0)=f'(g(x_0))g'(x_0)$.

## Connections to other lectures

Three things persist. Difference quotients and limits define higher derivatives next time. The tangent as a first-order approximation starts differentials and Newton's method. The differentiability-continuity hierarchy supplies the counterexamples for the mean value theorems. The next lecture differentiates again, differentiates $F(x,y)=0$ directly, and approximates with differentials; all three rest on the four rules above.