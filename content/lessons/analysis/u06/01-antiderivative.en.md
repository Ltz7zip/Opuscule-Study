---
slug: "antiderivative"
subject: "analysis"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Antiderivatives and the Indefinite Integral"
subtitle: "Differentiation run backwards, always off by a constant"
minutes: 14
meta: ["14 min read","Requires elementary calculus","Mastery level"]
concepts: ["indefint", "deriv"]
prereq: ["deriv"]
related: ["defint", "indefint"]
---

## Goals

By the end of this lecture you can decide whether a function has an antiderivative on a given interval, reproduce and check the basic integral table, and explain why every indefinite integral must carry $+C$.

An antiderivative is what a function looked like before it was differentiated. That sounds simple, but there are two traps: one function has infinitely many antiderivatives, and some functions have no elementary antiderivative at all. Constants solve the first problem; the second reminds us that integration is not omnipotent.

## Three-line recap

- Differentiation maps a function to another function; if $F'=f$, then $F$ is an antiderivative of $f$.
- If two functions have the same derivative, their difference is constant — a direct corollary of Lagrange's theorem.
- So the set of antiderivatives is a line of functions differing by a constant, and the indefinite integral names that line.

## Antiderivatives and the indefinite integral

Let $f$ be defined on an interval $I$. If some $F$ satisfies $F'(x)=f(x)$ for every $x\in I$, then $F$ is an **antiderivative** of $f$ on $I$. The collection of all antiderivatives is written

$$\int f(x)\,dx=F(x)+C .$$

Here $C$ is an arbitrary constant, the **constant of integration**.

Why is the whole collection just $F+C$? Let $G$ be another antiderivative and put $H=G-F$. Then $H'\equiv 0$, and the constancy criterion from the previous chapter forces $H$ to be constant on the interval. The word "interval" is essential: if the domain splits into two pieces, the two constants may differ.

For example $\int \dfrac{1}{x}\,dx=\ln|x|+C$ holds separately on $(-\infty,0)$ and on $(0,+\infty)$, and the two $C$'s are unrelated.

> [!NOTE]
> An antiderivative requires $f$ to be defined on an interval without jumping too badly. Continuous functions always have one, but discontinuous functions may also have one.

## The basic integral table

| Integrand | Antiderivative | Valid where |
| --- | --- | --- |
| $x^\alpha$ ($\alpha\ne-1$) | $\dfrac{x^{\alpha+1}}{\alpha+1}+C$ | $x>0$, or $x<0$ when $\alpha$ is an integer |
| $\dfrac{1}{x}$ | $\ln\|x\|+C$ | $x\ne0$ |
| $e^x$ | $e^x+C$ | all reals |
| $\sin x$ | $-\cos x+C$ | all reals |
| $\cos x$ | $\sin x+C$ | all reals |
| $\sec^2x$ | $\tan x+C$ | $x\ne\frac{\pi}{2}+k\pi$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x+C$ | all reals |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x+C$ | $\|x\|<1$ |

The table must be memorised, but it must also be checkable: differentiate the right side and see the left side come back. For instance $(\ln|x|)'=1/x$ on both sides, which is exactly why the absolute value cannot be dropped — $\ln x$ is not even defined for $x<0$.

## Linearity

Indefinite integrals are linear:

$$\int\bigl(\alpha f(x)+\beta g(x)\bigr)dx=\alpha\int f(x)\,dx+\beta\int g(x)\,dx .$$

Each integral on the right carries its own constant, but after combining, one $C$ is enough. Do not leave two different constants in a hand computation.

$$\int\left(3x^2-\frac{2}{x}+e^x\right)dx=x^3-2\ln|x|+e^x+C .$$

Check: the derivative is $3x^2-2\cdot\dfrac{1}{x}+e^x$, the integrand.

## Piecewise functions and absolute values

When the integrand contains an absolute value, integrate piece by piece and then see whether the pieces join into one formula.

$$\int |x|\,dx=\frac{x|x|}{2}+C .$$

Check: for $x>0$ the right side is $x^2/2$ with derivative $x$; for $x<0$ it is $-x^2/2$ with derivative $-x=|x|$; at $x=0$ the right side is differentiable with derivative $0$, matching $|0|$. So the single expression works on all three pieces.

By contrast, $\int \operatorname{sgn} x\,dx=|x|+C$ fails at $x=0$, because $|x|$ is not differentiable there. Giving antiderivatives piecewise and giving one global formula are not the same thing.

## Three misconceptions

> [!MYTH] An indefinite integral has a unique answer.
> It is unique only up to a constant. $x^2$, $x^2+1$, and $x^2-7$ are all antiderivatives of $2x$, so the answer is $x^2+C$; writing $x^2$ gives one particular solution.

> [!MYTH] The integral of a product is the product of the integrals.
> False. $\int x\cdot 1\,dx=\dfrac{x^2}{2}+C$, whereas $\left(\int x\,dx\right)\left(\int 1\,dx\right)=\dfrac{x^2}{2}\cdot x=\dfrac{x^3}{2}$. Products need integration by parts.

> [!MYTH] The antiderivative of $\dfrac{1}{x}$ is $\ln x$.
> $\ln x$ is undefined for $x<0$. The correct statement is $\ln|x|+C$, which differentiates to $1/x$ on both intervals.

## Practice

> [!PRACTICE] 1 · Expand first
> Find $\int (2x+1)^2\,dx$.
>
> > [!ANSWER] Show answer
> > Expanding gives $4x^2+4x+1$, so the integral is $\dfrac{4x^3}{3}+2x^2+x+C$.

> [!PRACTICE] 2 · Term by term
> Find $\int\left(x+\dfrac{1}{x}\right)dx$.
>
> > [!ANSWER] Show answer
> > $\dfrac{x^2}{2}+\ln|x|+C$. Differentiating returns $x+\dfrac{1}{x}$.

> [!PRACTICE] 3 · Absolute value
> Find $\int |x|\,dx$ and explain why $\dfrac{x^2}{2}+C$ is wrong.
>
> > [!ANSWER] Show answer
> > The answer is $\dfrac{x|x|}{2}+C$. For $x<0$ the derivative of $\dfrac{x^2}{2}$ is $x$, not $|x|=-x$; the two differ by a sign and cannot be interchanged.

> [!PRACTICE] 4 · Verify
> Verify $\int \sec^2x\,dx=\tan x+C$ and state where it holds.
>
> > [!ANSWER] Show answer
> > $(\tan x)'=\sec^2x$, so the formula holds. Since $\tan x$ is undefined at $x=\frac{\pi}{2}+k\pi$, the conclusion holds on each open interval cut out by those points.

> [!FORMAL] Formal statement
> Let $f$ be defined on an interval $I$. If $F$ is differentiable on $I$ with $F'(x)=f(x)$ for all $x\in I$, then $F$ is an antiderivative of $f$, and the set of all antiderivatives is $\{F+C:C\in\mathbb{R}\}$, written $\int f(x)\,dx$. The difference of two antiderivatives is constant, and this uses the fact that $I$ is an interval. If $f$ is continuous on an interval, an antiderivative exists.
