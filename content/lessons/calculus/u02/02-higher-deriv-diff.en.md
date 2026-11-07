---
slug: "higher-deriv-diff"
subject: "calculus"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Higher Derivatives, Implicit Functions, and Differentials"
subtitle: "Finding slopes when the curve is not written as y=f(x)"
minutes: 32
meta: ["32 min read","Requires the derivative definition and rules","Mastery level"]
concepts: ["deriv", "implicit"]
prereq: ["deriv"]
related: ["taylor", "partial", "multi"]
---

## What this lecture sets out to do

The previous lecture reached the four rules and the chain rule, but its input had to be explicit. Real objects rarely cooperate: acceleration is a second derivative; a curve is often $x^{2}+y^{2}=25$ with no neat $y=f(x)$; and engineering wants "how much does the output change", not an exact value.

Three directions follow:

- **Higher derivatives**: differentiate the derivative, the rate of change of a rate of change;
- **Implicit and parametric differentiation**: differentiate both sides without solving for $y$;
- **Differentials**: the linear part of an increment, for approximation and error estimates.

All three share one move: **differentiate both sides with respect to $x$, treating $y$ as a function of $x$**. Then implicit, logarithmic, and parametric differentiation stop being isolated tricks.

By the end you should be able to:

- write the $n$-th derivative of $e^{ax}$, $\sin x$, $x^{m}$, and $\ln(1+x)$;
- use $y'=-F_x/F_y$ near a point with $F_y\ne0$, and write the tangent;
- handle $x^{x}$ and $x^{\sin x}$ by logarithmic differentiation;
- differentiate parametric curves twice, and explain why the second formula divides by $x'(t)$ rather than $x''(t)$;
- approximate with $dy=f'(x)dx$ and estimate the error's order;
- recognise boundary points where a formula fails and say what happens geometrically.

## Three-line recap

- A derivative is a function, so it can be differentiated again, giving second and third derivatives.
- Differentiating both sides of an equation in $x$ requires a $y'$ factor whenever $y$ appears.
- The differential is the linear part of the increment: $\Delta y=f'(x)\Delta x+o(\Delta x)$.

## Higher derivatives: why differentiate again

A first derivative answers "how fast is it changing now", but many questions ask whether the rate itself is changing. Velocity is the derivative of position; the push a passenger feels is the derivative of velocity, namely acceleration. In economics the derivative of cost is marginal cost, and the second says whether marginal cost is rising, deciding whether expansion gets more expensive. Geometrically the sign of $f''$ decides the bending: $f''>0$ opens upward, $f''<0$ opens downward.

A first derivative alone loses all this, so we differentiate repeatedly and seek general formulas for common functions.

## Definition and notation

> [!FORMAL] Higher derivatives
> If $f'$ is differentiable at $x$, then $(f')'(x)$ is the second derivative, written $f''(x)$ or $\dfrac{d^{2}y}{dx^{2}}$. In general $f^{(n)}=(f^{(n-1)})'$ is the $n$-th derivative, with $f^{(0)}=f$.

Two notational traps: $y''$ and $y^{(2)}$ are synonyms, but $y^{(2)}$ is not $y^{2}$, a square; and $\dfrac{d^{2}y}{dx^{2}}$ is one symbol, not a cancellable fraction.

No new rule is needed: apply the four rules repeatedly. Polynomials lose one degree per derivative.

**Example 1.** Let $y=x^{4}-3x^{2}+1$.

$$
y'=4x^{3}-6x,\qquad y''=12x^{2}-6,\qquad y'''=24x,\qquad y^{(4)}=24,\qquad y^{(5)}=0
$$

All later derivatives vanish: the $(m+1)$-th derivative of a degree-$m$ polynomial is zero.

**Example 2.** Let $y=\dfrac1x$. Find $y^{(n)}$.

Compute the first few:

$$
y'=-\frac{1}{x^{2}},\qquad y''=\frac{2}{x^{3}},\qquad y'''=-\frac{6}{x^{4}}
$$

The numerator is a factorial, the denominator a power, and signs alternate, so guess

$$
y^{(n)}=(-1)^{n}\frac{n!}{x^{n+1}}
$$

Prove it by induction. For $n=1$ the right side is $-1/x^{2}$, correct. If it holds for $n$, differentiate once more:

$$
\left((-1)^{n}\frac{n!}{x^{n+1}}\right)'
=(-1)^{n}n!\cdot\left(-(n+1)x^{-(n+2)}\right)
=(-1)^{n+1}\frac{(n+1)!}{x^{n+2}}
$$

This is the $n+1$ form, so the formula holds for all $n\ge1$. The route: **compute three orders, guess, then prove by induction**.

## A table of common nth derivatives

| Function | $n$-th derivative | Remark |
| --- | --- | --- |
| $e^{ax}$ | $a^{n}e^{ax}$ | each derivative adds a factor $a$ |
| $\sin x$ | $\sin\left(x+\dfrac{n\pi}{2}\right)$ | period $4$ |
| $\cos x$ | $\cos\left(x+\dfrac{n\pi}{2}\right)$ | period $4$ |
| $x^{m}$ | $m(m-1)\cdots(m-n+1)x^{m-n}$ | zero for $n>m$ |
| $\ln(1+x)$ | $(-1)^{n-1}\dfrac{(n-1)!}{(1+x)^{n}}$ | $n\ge1$ |

The sine row deserves a derivation. Differentiating once turns $\sin$ into $\cos$, twice gives $-\sin$; every two derivatives advance the phase by $\pi$. Since $\cos x=\sin\left(x+\dfrac{\pi}{2}\right)$, each differentiation adds $\dfrac{\pi}{2}$ to the phase:

$$
(\sin x)'=\cos x=\sin\left(x+\frac{\pi}{2}\right),\qquad
(\sin x)''=-\sin x=\sin\left(x+\pi\right)
$$

Induction gives $(\sin x)^{(n)}=\sin\left(x+\dfrac{n\pi}{2}\right)$; cosine is analogous. This is safer than memorising: a forgotten sign can be checked by one differentiation.

## Implicit differentiation: when y cannot be isolated

Near $(3,4)$ the circle $x^{2}+y^{2}=25$ does define $y=\sqrt{25-x^{2}}$, but $x^{3}+y^{3}-9xy=0$ has no elementary solution, and even solvable equations carry a $\pm$. Implicit differentiation **differentiates both sides without solving**.

The principle: on $F(x,y)=0$, $y$ is a function $y(x)$, so $F(x,y(x))=0$ is an identity and both sides may be differentiated. Whenever $y$ appears, the chain rule contributes $y'$: $y^{2}$ gives $2yy'$, $\sin y$ gives $\cos y\cdot y'$, $e^{y}$ gives $e^{y}y'$.

> [!FORMAL] Implicit differentiation
> Suppose $F(x,y)$ has continuous partial derivatives near $(x_0,y_0)$, with $F(x_0,y_0)=0$ and $F_y(x_0,y_0)\ne0$. Then $F(x,y)=0$ determines a unique continuously differentiable function $y=y(x)$ near $(x_0,y_0)$, and
> $$y'(x_0)=-\frac{F_x(x_0,y_0)}{F_y(x_0,y_0)}$$

The condition $F_y\ne0$ is not decoration: it guarantees the curve is not vertical near the point, so it can be written as a graph. If $F_y=0$ there may be a vertical tangent and the formula fails.

**Example 3.** Find the tangent to $x^{2}+y^{2}=25$ at $(3,4)$.

Differentiate both sides:

$$
2x+2yy'=0\quad\Longrightarrow\quad y'=-\frac{x}{y}
$$

At $(3,4)$, $y'=-\dfrac34$, so the tangent is

$$
y-4=-\frac34(x-3)\quad\Longrightarrow\quad 3x+4y=25
$$

Check: the distance from the centre to the line is $\dfrac{25}{5}=5$, the radius; the radius slope $\dfrac43$ times $-\dfrac34$ is $-1$.

**Example 4.** The equation $e^{y}+xy=e$ determines $y(x)$. Find $y'(0)$.

Differentiate both sides, using the chain and product rules on $e^{y}$ and $xy$:

$$
e^{y}y'+y+xy'=0
$$

At $x=0$ the original equation gives $e^{y}=e$, so $y=1$. Substituting:

$$
e\cdot y'(0)+1+0=e\,y'(0)+1=0\quad\Longrightarrow\quad y'(0)=-\frac1e
$$

The standard order is **find $y$ at the point, then find $y'$ at the point**; solving for $y$ explicitly is hard and unnecessary.

## Logarithmic differentiation

A power-exponential $y=u(x)^{v(x)}$ is neither a power nor an exponential, so no rule applies directly. Take logarithms, turning the exponent into a product:

$$
\ln y=v(x)\ln u(x)
$$

Differentiate both sides: the left gives $\dfrac{y'}{y}$, the right uses the product rule. For $y=x^{x}$ with $x>0$:

$$
\ln y=x\ln x\quad\Longrightarrow\quad\frac{y'}{y}=\ln x+1\quad\Longrightarrow\quad y'=x^{x}(\ln x+1)
$$

The same method handles $y=x^{\sin x}$: $\ln y=\sin x\ln x$, so $\dfrac{y'}{y}=\cos x\ln x+\dfrac{\sin x}{x}$ and $y'=x^{\sin x}\left(\cos x\ln x+\dfrac{\sin x}{x}\right)$.

It also turns products and quotients of many factors into sums and differences, and radicals into fractional powers, avoiding a missed layer in the chain rule. It is not a new rule, only "take logarithms, then differentiate implicitly".

## Parametric equations

Some curves are natural in parametric form, for example $x=t^{2}$, $y=t^{3}$. Then $y$ depends on $x$ through $t$, and

$$
\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{y'(t)}{x'(t)}
$$

provided $x'(t)\ne0$. If $x'(t)=0\ne y'(t)$ the tangent is vertical; if both vanish, the point needs separate analysis.

The second derivative is not $\dfrac{y''(t)}{x''(t)}$. Treat $\dfrac{dy}{dx}$ as a function of $t$ and differentiate with respect to $x$, dividing again by $\dfrac{dx}{dt}$:

$$
\frac{d^{2}y}{dx^{2}}
=\frac{d}{dx}\left(\frac{dy}{dx}\right)
=\frac{\dfrac{d}{dt}\left(\dfrac{y'(t)}{x'(t)}\right)}{x'(t)}
$$

The denominator is always $x'(t)$: each differentiation with respect to $x$ passes through the chain rule.

**Example 5.** Let $x=t^{2}$, $y=t^{3}$. Find $\dfrac{dy}{dx}$ and $\dfrac{d^{2}y}{dx^{2}}$.

First order:

$$
\frac{dy}{dx}=\frac{3t^{2}}{2t}=\frac{3t}{2}
$$

Second order: differentiate with respect to $t$ to get $\dfrac32$, then divide by $x'(t)=2t$:

$$
\frac{d^{2}y}{dx^{2}}=\frac{3/2}{2t}=\frac{3}{4t}
$$

At $t=1$ the slope is $\dfrac32$ and the second derivative $\dfrac34$. As $t\to0$ the second derivative blows up: the parametrisation degenerates at $x'(0)=0$, not an arithmetic error.

## Differentials: the linear part of an increment

A derivative answers "what is the slope"; a differential answers "roughly how big is the increment". Let $y=f(x)$ be differentiable at $x$ and move the input to $x+\Delta x$. Then

$$
\Delta y=f(x+\Delta x)-f(x)=f'(x)\Delta x+o(\Delta x)
$$

The first term is linear in $\Delta x$, the second is higher-order. Name the linear part:

$$
dy=f'(x)\,dx,\qquad dx=\Delta x
$$

Thus $\Delta y=dy+o(\Delta x)$, or approximately $\Delta y\approx dy$, that is

$$
f(x+\Delta x)\approx f(x)+f'(x)\Delta x
$$

Geometrically this replaces the curve by its tangent near $x$; the two increments differ only by a higher-order quantity.

**Example 6.** Estimate $\sqrt{1.02}$.

Take $f(x)=\sqrt{x}$, $x=1$, $\Delta x=0.02$. Then $f'(1)=\dfrac12$ and $dx=0.02$:

$$
dy=\frac12(0.02)=0.01,\qquad
\sqrt{1.02}\approx1+0.01=1.01
$$

The true value is about $1.00995$, an error of roughly $5\times10^{-5}$. Since $f''(x)=-\dfrac14x^{-3/2}$ is bounded near $x=1$, the term $\dfrac12f''(1)(\Delta x)^{2}=-5\times10^{-5}$ explains the size and sign.

> [!NOTE]
> The quality of a differential approximation is controlled by the second derivative: the smaller $|f''|$, the better the approximation. If $f''$ is large or does not exist, a higher-order Taylor expansion is needed.

## Comparing the four methods

| Method | Applies to | Key condition | Typical failure |
| --- | --- | --- | --- |
| Explicit | $y=f(x)$ | $f$ differentiable | a seam needs the definition |
| Implicit | $F(x,y)=0$ | $F_y\ne0$ | $F_y=0$ at a vertical tangent |
| Logarithmic | power-exponential, many factors | base $u(x)>0$ | logarithm undefined for nonpositive base |
| Parametric | $x=x(t),y=y(t)$ | $x'(t)\ne0$ | degenerate parametrisation |

The four methods are not independent tricks but different writings of one chain rule: first see how the curve is given, then see which denominator might vanish.

## Four common misconceptions

> [!MYTH] The differential $dy$ is the increment $\Delta y$.
> They differ by $o(\Delta x)$: for $y=x^{2}$ at $x=1$ with $\Delta x=0.1$, $dy=0.2$ while $\Delta y=0.21$. The gap vanishes only as $\Delta x\to0$.

> [!MYTH] In implicit differentiation, $y'$ is just another unknown and $y$ can be treated as a constant.
> $y$ is a function of $x$, so the derivative of $y^{2}$ is $2yy'$, not $2y$. Dropping $y'$ ruins the problem.

> [!MYTH] The second derivative of a parametric curve is $y''(t)/x''(t)$.
> First find $\dfrac{dy}{dx}$, then differentiate with respect to $t$ and divide by $x'(t)$; the denominator is always $x'(t)$. For $x=t^{2}$, $y=t^{3}$, $y''/x''=3t$ but the correct value is $\dfrac{3}{4t}$.

> [!MYTH] The $n$-th derivative just stacks $n$ primes, so notation is arbitrary.
> $y^{(n)}$ and $y^{n}$ are completely different: one differentiates $n$ times, the other takes an $n$-th power. Nor can $\dfrac{d^{2}y}{dx^{2}}$ be cancelled like a fraction.

## Practice

> [!PRACTICE] 1 · Second derivative
> Find the second derivative of $y=x^{2}\ln x$.
>
> > [!ANSWER] Show answer
> > $y'=2x\ln x+x$, so $y''=2\ln x+2+1=2\ln x+3$.

> [!PRACTICE] 2 · Implicit
> The equation $e^{y}+xy=e$ determines $y(x)$. Find $y'(0)$.
>
> > [!ANSWER] Show answer
> > Differentiate: $e^{y}y'+y+xy'=0$. At $x=0$, $y=1$, so $ey'+1=0$ and $y'(0)=-\dfrac1e$.

> [!PRACTICE] 3 · Approximation
> Estimate $\sqrt{1.02}$ with a differential and compare with the true value.
>
> > [!ANSWER] Show answer
> > $\sqrt{1.02}\approx1+\dfrac{0.02}{2}=1.01$; the true value is about $1.00995$, an overestimate of about $5\times10^{-5}$.

> [!PRACTICE] 4 · General nth derivative
> Find the $n$-th derivative of $y=\sin(2x)$.
>
> > [!ANSWER] Show answer
> > Each derivative contributes a factor $2$ and adds $\dfrac{\pi}{2}$ to the phase, so $y^{(n)}=2^{n}\sin\left(2x+\dfrac{n\pi}{2}\right)$.

> [!PRACTICE] 5 · Parametric
> Let $x=t^{2}$, $y=t^{3}$. Find $\dfrac{dy}{dx}$ and $\dfrac{d^{2}y}{dx^{2}}$ at $t=1$.
>
> > [!ANSWER] Show answer
> > $\dfrac{dy}{dx}=\dfrac{3t}{2}$, equal to $\dfrac32$ at $t=1$; $\dfrac{d^{2}y}{dx^{2}}=\dfrac{3}{4t}$, equal to $\dfrac34$ at $t=1$.

> [!PRACTICE] 6 · Logarithmic
> Find the derivative of $y=x^{\sin x}$ for $x>0$.
>
> > [!ANSWER] Show answer
> > Take logarithms: $\ln y=\sin x\ln x$, so $\dfrac{y'}{y}=\cos x\ln x+\dfrac{\sin x}{x}$ and $y'=x^{\sin x}\left(\cos x\ln x+\dfrac{\sin x}{x}\right)$.

## A precise statement

If $f$ is differentiable on an interval and $f'$ is differentiable too, then $f''=(f')'$ is the second derivative; inductively $f^{(n)}=(f^{(n-1)})'$, with $f^{(0)}=f$.

Let $F(x,y)$ have continuous partial derivatives near $(x_0,y_0)$, with $F(x_0,y_0)=0$ and $F_y(x_0,y_0)\ne0$. Then there is a neighborhood of $(x_0,y_0)$ and a unique continuously differentiable $y=y(x)$ with $F(x,y(x))=0$ and $y(x_0)=y_0$, and

$$
y'(x)=-\frac{F_x(x,y(x))}{F_y(x,y(x))}
$$

If $y=f(x)$ is differentiable at $x$, the differential is $dy=f'(x)dx$, where $dx=\Delta x$ is an arbitrary increment of the independent variable, and

$$
\Delta y=f(x+\Delta x)-f(x)=dy+o(\Delta x)
$$

so $dy$ is the linear part of $\Delta y$.

## Connections to other lectures

The three blocks lead to three later strands. Higher derivatives feed Taylor's formula $f(x)=\sum\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}$, where the table above reappears. Implicit differentiation becomes $z_x=-F_x/F_z$ in multivariable calculus; $y'=-F_x/F_y$ is its two-dimensional version. Differentials make first-order approximation precise, and the mean value theorem turns approximation into equality: $f(x+\Delta x)-f(x)=f'(\xi)\Delta x$.

If you remember one sentence: **all differentiation is the chain rule**. Implicit differentiation remembers that $y$ depends on $x$; parametric differentiation routes $y$ through $t$; logarithmic differentiation takes logs first. Reduce all three to one chain and the formulas need no memorising.