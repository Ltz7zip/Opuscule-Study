---
slug: "substitution-2"
subject: "analysis"
unit: "u06"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Substitution II: Inverse Substitution"
subtitle: "Write x as a function of t and make the radical disappear"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint", "defint"]
---

## Goals

By the end of this lecture you can decide when to use an inverse substitution $x=\psi(t)$, choose the right trigonometric substitution for each of the three radical types, and convert the answer back to $x$.

The first substitution names the inner function $u$. The second goes the other way: it sets $x$ equal to a function of $t$. When the integrand contains something like $\sqrt{a^2-x^2}$ that no differential folding can absorb, this is the only route.

## Three-line recap

- First substitution: $u=\varphi(x)$, folding $\varphi'(x)dx$ into $du$.
- If $\varphi$ is invertible, the same identity can be read backwards: $x=\psi(t)$, $dx=\psi'(t)dt$.
- After the change the integral contains only $t$; once computed, return via $t=\psi^{-1}(x)$.

## The inverse substitution formula

If $x=\psi(t)$ is differentiable with $\psi'(t)\ne 0$ on an interval, then

$$\int f(x)\,dx=\int f(\psi(t))\psi'(t)\,dt\Big|_{t=\psi^{-1}(x)} .$$

The only difference from the first kind is the direction of writing: one absorbs a complicated inner function, the other replaces $x$ wholesale by a convenient variable. The aim is the same — reach a form that appears in the table.

## Three standard trigonometric substitutions

| Radical | Substitution | Identity used |
| --- | --- | --- |
| $\sqrt{a^2-x^2}$ | $x=a\sin t$ | $1-\sin^2t=\cos^2t$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan t$ | $1+\tan^2t=\sec^2t$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec t$ | $\sec^2t-1=\tan^2t$ |

Take $\int\sqrt{1-x^2}\,dx$. Let $x=\sin t$ with $t\in(-\frac{\pi}{2},\frac{\pi}{2})$; then $dx=\cos t\,dt$ and $\sqrt{1-x^2}=\cos t$, with no absolute value needed because of the chosen range:

$$\int\cos^2t\,dt=\int\frac{1+\cos 2t}{2}dt=\frac{t}{2}+\frac{\sin 2t}{4}+C .$$

Back-substitute: $t=\arcsin x$ and $\sin 2t=2\sin t\cos t=2x\sqrt{1-x^2}$, so

$$\int\sqrt{1-x^2}\,dx=\frac{1}{2}x\sqrt{1-x^2}+\frac{1}{2}\arcsin x+C .$$

A quick sanity check: both terms are dimensionless, so adding them is legitimate.

## Radicals and other substitutions

Not every radical calls for trigonometry. For $\sqrt[n]{ax+b}$, setting $t=\sqrt[n]{ax+b}$ directly is usually faster.

$$\int\frac{dx}{1+\sqrt{x}},\qquad t=\sqrt{x},\ x=t^2,\ dx=2t\,dt .$$

Substituting,

$$\int\frac{2t}{1+t}dt=2\int\left(1-\frac{1}{1+t}\right)dt=2t-2\ln(1+t)+C .$$

Returning with $t=\sqrt x$,

$$\int\frac{dx}{1+\sqrt{x}}=2\sqrt{x}-2\ln(1+\sqrt{x})+C .$$

A second common case is completing the square: $\int\dfrac{dx}{x^2+2x+5}=\int\dfrac{d(x+1)}{(x+1)^2+4}=\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$. No radical here; after completing the square the table applies directly.

> [!NOTE]
> Fix the range of $t$ before taking a square root, and then $\sqrt{a^2\sin^2t}=a\cos t$ is legitimate without an absolute value.

## Three misconceptions

> [!MYTH] The second substitution just means "let $t$ be the messy part".
> That is the wrong direction. The second kind sets $x=\psi(t)$ and replaces the variable as a whole; naming a messy part $t$ is the first kind. The formulas look similar, but one changes an inner function and the other changes the variable.

> [!MYTH] Once the answer is in terms of $t$, the trigonometric substitution is finished.
> An indefinite integral must return to $x$. Use $\sin t=x/a$ or $\tan t=x/a$ and a right triangle to express $\cos t$ and $\sec t$ in terms of $x$.

> [!MYTH] $\sqrt{x^2}=x$.
> It is $|x|$. When returning from a $\tan$ or $\sec$ substitution, writing $\sqrt{\sec^2t-1}=\tan t$ without checking the sign can flip the answer; confirm the sign of $\tan t$ on the chosen range.

## Practice

> [!PRACTICE] 1 · Sum of squares
> Find $\int\dfrac{dx}{\sqrt{x^2+4}}$.
>
> > [!ANSWER] Show answer
> > Let $x=2\tan t$, $dx=2\sec^2t\,dt$, $\sqrt{x^2+4}=2\sec t$. The integral becomes $\int\sec t\,dt=\ln|\sec t+\tan t|+C=\ln\left|\dfrac{\sqrt{x^2+4}+x}{2}\right|+C$, which absorbs the constant into $\ln\left(x+\sqrt{x^2+4}\right)+C$.

> [!PRACTICE] 2 · Difference of squares
> Find $\int\sqrt{4-x^2}\,dx$.
>
> > [!ANSWER] Show answer
> > Let $x=2\sin t$, giving $4\int\cos^2t\,dt=2t+\sin 2t+C$. Back-substituting yields $\dfrac{x}{2}\sqrt{4-x^2}+2\arcsin\dfrac{x}{2}+C$.

> [!PRACTICE] 3 · Radical substitution
> Find $\int\dfrac{dx}{1+\sqrt{x}}$.
>
> > [!ANSWER] Show answer
> > Let $t=\sqrt x$, $dx=2t\,dt$. Then $\int\dfrac{2t}{1+t}dt=2t-2\ln(1+t)+C=2\sqrt x-2\ln(1+\sqrt x)+C$.

> [!PRACTICE] 4 · Complete the square
> Find $\int\dfrac{dx}{x^2+2x+5}$.
>
> > [!ANSWER] Show answer
> > Complete the square to $(x+1)^2+4$. With $u=x+1$, the integral is $\int\dfrac{du}{u^2+4}=\dfrac{1}{2}\arctan\dfrac{u}{2}+C=\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$.

> [!FORMAL] Formal statement
> Let $f$ be continuous on an interval $I$, let $\psi$ be differentiable on an interval $J$ with $\psi'(t)\ne 0$ and $\psi(J)=I$. If $F$ is an antiderivative of $f$ on $I$, then $F(\psi(t))$ is an antiderivative of $f(\psi(t))\psi'(t)$ on $J$:
> $$\int f(x)\,dx\Big|_{x=\psi(t)}=\int f(\psi(t))\psi'(t)\,dt .$$
> Since $\psi$ is strictly monotone, $\psi^{-1}$ exists and the right side can be returned to $x$. Differentiating $F(\psi(t))$ and applying the chain rule verifies the identity.
