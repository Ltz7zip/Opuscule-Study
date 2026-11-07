---
slug: "chain-rule"
subject: "analysis"
unit: "u04"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "The Chain Rule and Inverse Functions"
subtitle: "Change travels along the chain"
minutes: 15
meta: ["15 min read","Requires differentiation rules","Mastery level"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["deriv", "partial"]
---

## Goal

Most functions you meet are composites: $\sin(x^2)$, $e^{\sin x}$, $\ln(\cos x)$. The chain rule multiplies the outer rate by the inner rate, and the inverse rule turns $dy/dx$ into $dx/dy$.

By the end you can differentiate a stack of layers, derive the derivatives of $\arcsin x$ and $\arctan x$, and handle something like $x^x$ by taking logarithms first.

## Three-line recap

- Chain rule: $(f\circ g)'(x_0)=f'(g(x_0))\,g'(x_0)$ — differentiate the outer function at the inner value, then multiply by the inner derivative.
- Inverse rule: $\left(f^{-1}\right)'(y_0)=\dfrac{1}{f'(x_0)}$ where $y_0=f(x_0)$; the two points must correspond.
- For a power-tower such as $x^x$, take logs first to turn the exponent into a product.

## The chain rule

Suppose $g$ is differentiable at $x_0$ and $f$ is differentiable at $u_0=g(x_0)$. Then

$$
(f\circ g)'(x_0) = f'(g(x_0))\,g'(x_0).
$$

In Leibniz notation,

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}.
$$

It looks like cancelling fractions, but this is a theorem, not an algebraic identity.

Proof sketch. Differentiability of $f$ at $u_0$ gives

$$
\Delta y = f'(u_0)\Delta u + \varepsilon(\Delta u)\Delta u,
$$

where $\varepsilon(\Delta u)\to 0$ as $\Delta u\to 0$. Divide by $\Delta x$:

$$
\frac{\Delta y}{\Delta x} = f'(u_0)\frac{\Delta u}{\Delta x} + \varepsilon(\Delta u)\frac{\Delta u}{\Delta x}.
$$

Now $\dfrac{\Delta u}{\Delta x}\to g'(x_0)$ and $\varepsilon(\Delta u)\to 0$, so the second term vanishes and the formula follows. Writing it this way avoids the nuisance of dividing by $\Delta u$ when it happens to be zero.

## Derivatives of inverse functions

If $f$ is differentiable at $x_0$, $f'(x_0)\ne 0$, $f$ is strictly monotone near $x_0$, and $f^{-1}$ is differentiable at $y_0=f(x_0)$, then

$$
\left(f^{-1}\right)'(y_0) = \frac{1}{f'(x_0)}.
$$

The derivation is one line: differentiate $f^{-1}(f(x))=x$,

$$
\left(f^{-1}\right)'(f(x))\cdot f'(x) = 1 .
$$

Geometrically the graph of $f^{-1}$ is the mirror image of that of $f$ across $y=x$, so slopes become reciprocals.

**Example**: $y=\arcsin x$ on $(-1,1)$. With $x=\sin y$ and $y\in\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$,

$$
(\arcsin x)' = \frac{1}{\cos y} = \frac{1}{\sqrt{1-\sin^2 y}} = \frac{1}{\sqrt{1-x^2}}.
$$

**Example**: $y=\arctan x$. From $x=\tan y$,

$$
(\arctan x)' = \frac{1}{\sec^2 y} = \frac{1}{1+\tan^2 y} = \frac{1}{1+x^2}.
$$

## Three computations

**$\sin(x^2)$**: outer $\sin$, inner $x^2$.

$$
\big(\sin(x^2)\big)' = \cos(x^2)\cdot 2x = 2x\cos(x^2).
$$

**$e^{\sin x}$**: two layers.

$$
\left(e^{\sin x}\right)' = e^{\sin x}\cos x .
$$

**$x^x$** for $x>0$: both base and exponent move, so the power rule does not apply. Take logs:

$$
\ln y = x\ln x \ \Longrightarrow\ \frac{y'}{y} = \ln x + 1,
$$

hence

$$
y' = x^x(\ln x+1).
$$

At $x=1$ this is $1$; at $x=2$ it is $4(\ln 2+1)\approx 6.77$.

## Three misconceptions

> [!MYTH] $(f(g(x)))'=f'(g(x))$; differentiating the outer function is enough.
> The inner factor $g'(x)$ is missing. The derivative of $\sin(x^2)$ is $2x\cos(x^2)$, not $\cos(x^2)$. Quick check: take $g(x)=2x$; the answer must gain a factor of $2$.

> [!MYTH] The inverse derivative is $1/f'(x)$, taken at the same $x$.
> The two variables differ. $\left(f^{-1}\right)'(y)=1/f'(x)$ with $y=f(x)$. At $x=0$ the derivative of $\arcsin$ is $1$, matching $\sin'(0)=1$; at $x=\dfrac12$ it is $\dfrac{1}{\cos(\pi/6)}=\dfrac{2}{\sqrt{3}}$.

> [!MYTH] The derivative of $x^x$ is $x\cdot x^{x-1}$.
> That is the rule for $x^a$ with constant $a$. In $x^x$ both base and exponent depend on $x$; the correct answer is $x^x(\ln x+1)$. At $x=1$ the two formulas coincide at $1$; at $x=2$ they give $4(\ln 2+1)\approx 6.77$ and $4$.

## Practice

> [!PRACTICE] 1 · One composition
> Differentiate $y=\sin(3x+1)$.
>
> > [!ANSWER] Show answer
> > The outer derivative is $\cos(3x+1)$, the inner derivative is $3$, so $y'=3\cos(3x+1)$.

> [!PRACTICE] 2 · A power
> Differentiate $y=(x^2+1)^{10}$.
>
> > [!ANSWER] Show answer
> > Outer $10(x^2+1)^9$, inner $2x$, so $y'=20x(x^2+1)^9$.

> [!PRACTICE] 3 · Inverse tangent
> Differentiate $y=\arctan(2x)$.
>
> > [!ANSWER] Show answer
> > Outer derivative $\dfrac{1}{1+(2x)^2}$, inner derivative $2$, so $y'=\dfrac{2}{1+4x^2}$.

> [!PRACTICE] 4 · Power tower
> Differentiate $y=x^x$ for $x>0$.
>
> > [!ANSWER] Show answer
> > Taking logs gives $\ln y=x\ln x$; differentiating gives $\dfrac{y'}{y}=\ln x+1$, so $y'=x^x(\ln x+1)$.

> [!FORMAL] Formal statement
> If $g$ is differentiable at $x_0$ and $f$ is differentiable at $g(x_0)$, then $(f\circ g)'(x_0)=f'(g(x_0))g'(x_0)$. The proof uses $\Delta y=f'(u_0)\Delta u+\varepsilon(\Delta u)\Delta u$ with $\varepsilon\to 0$. If $f$ is strictly monotone and $f'(x_0)\ne 0$, then $\left(f^{-1}\right)'(y_0)=1/f'(x_0)$ with $y_0=f(x_0)$. The chain rule iterates across any finite number of layers.
