---
slug: "deriv-def"
subject: "analysis"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Derivative and Differential"
subtitle: "The limit of a difference quotient"
minutes: 15
meta: ["15 min read","Requires continuity and discontinuities","Mastery level"]
concepts: ["deriv", "cont"]
prereq: ["cont"]
related: ["mvt", "indefint"]
---

## Goals

Continuity says values do not jump; the derivative says how fast they change. It is defined by the limit of a ratio: change the input slightly, measure the output change, then let the input change shrink to zero.

By the end you can compute four basic derivatives from the definition, explain why differentiability is stronger than continuity, and produce a continuous function that is not differentiable.

## Three-line recap

- $f'(x_0)=\lim_{\Delta x\to 0}\dfrac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$, the slope of the tangent.
- Differentiable implies continuous, but not conversely; $|x|$ at $0$ is the standard counterexample.
- The two-sided derivative exists exactly when both one-sided derivatives exist and agree.

## Difference quotients

Let $f$ be defined near $x_0$. If

$$
f'(x_0) = \lim_{\Delta x\to 0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}
= \lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

exists, then $f$ is differentiable at $x_0$ and the limit is its derivative. The quotient $\dfrac{\Delta y}{\Delta x}$ is the slope of a secant; as $\Delta x\to 0$ the secant becomes the tangent, so the derivative is the tangent slope. If $x$ is time and $f$ is position, it is instantaneous velocity.

The derivative is a number, not a difference of values. The notations $f'(x_0)$ and $\left.\dfrac{df}{dx}\right|_{x_0}$ denote the same number.

## Four basic derivatives

**$f(x)=x^2$:**

$$
\frac{(x_0+h)^2-x_0^2}{h} = \frac{2x_0h+h^2}{h} = 2x_0+h \to 2x_0 .
$$

**$f(x)=\dfrac{1}{x}$ for $x_0\ne 0$:**

$$
\frac{1}{h}\left(\frac{1}{x_0+h}-\frac{1}{x_0}\right)
= \frac{-1}{x_0(x_0+h)} \to -\frac{1}{x_0^2}.
$$

**$f(x)=\sqrt{x}$ for $x_0>0$**, after rationalising:

$$
\frac{\sqrt{x_0+h}-\sqrt{x_0}}{h}
= \frac{1}{\sqrt{x_0+h}+\sqrt{x_0}} \to \frac{1}{2\sqrt{x_0}}.
$$

**$f(x)=\sin x$**, using sum-to-product:

$$
\frac{\sin(x_0+h)-\sin x_0}{h}
= \cos\left(x_0+\frac{h}{2}\right)\frac{\sin(h/2)}{h/2} \to \cos x_0 .
$$

In short, $(x^2)'=2x$, $(1/x)'=-1/x^2$, $(\sqrt{x})'=1/(2\sqrt{x})$, and $(\sin x)'=\cos x$.

## Differentiability and continuity

> [!NOTE]
> If $f$ is differentiable at $x_0$, then $f$ is continuous at $x_0$.

The proof only splits the increment:

$$
f(x)-f(x_0) = \frac{f(x)-f(x_0)}{x-x_0}(x-x_0).
$$

The quotient tends to $f'(x_0)$ and $(x-x_0)\to 0$, so the product tends to $f'(x_0)\cdot 0=0$, giving $f(x)\to f(x_0)$.

The converse fails. $f(x)=|x|$ is continuous at $0$, but

$$
\frac{|h|-0}{h} = \begin{cases}1, & h>0,\\ -1, & h<0,\end{cases}
$$

so the left derivative is $-1$ and the right derivative is $1$. The graph has a corner and no unique tangent.

Differentiability is equivalent to both one-sided derivatives existing and agreeing. Even when $f'(x_0)$ exists, $f'$ need not be continuous there. Take

$$
f(x)=\begin{cases}x^2\sin\dfrac{1}{x}, & x\ne 0,\\ 0, & x=0.\end{cases}
$$

At $0$, $f'(0)=\lim_{h\to 0}h\sin\dfrac{1}{h}=0$. But for $x\ne 0$, $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$, which has no limit as $x\to 0$.

## Three misconceptions

> [!MYTH] Differentiable and continuous are the same.
> Differentiability is stronger. $|x|$ is continuous but not differentiable at $0$. Conversely, differentiability implies continuity, as the factorisation above shows.

> [!MYTH] If $f'(x_0)$ exists, then $f'$ is continuous near $x_0$.
> The derivative can oscillate wildly. $x^2\sin\dfrac{1}{x}$ is differentiable at $0$ with $f'(0)=0$, yet $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$ has no limit near $0$.

> [!MYTH] The derivative is the change $\Delta y$.
> The derivative is a limit of a ratio; $\Delta y$ is an actual change. For $y=x^2$ at $x=1$ with $\Delta x=0.1$, $\Delta y=0.21$ while $f'(1)=2$.

## Practice

> [!PRACTICE] 1 · From the definition
> Compute the derivative of $f(x)=x^3$ at $x=1$ from the definition.
>
> > [!ANSWER] Show answer
> > $\dfrac{(1+h)^3-1}{h} = \dfrac{3h+3h^2+h^3}{h} = 3+3h+h^2 \to 3$.

> [!PRACTICE] 2 · A corner
> Prove that $f(x)=|x|$ is not differentiable at $0$.
>
> > [!ANSWER] Show answer
> > The left quotient is constantly $-1$ and the right quotient constantly $1$. The one-sided derivatives differ, so no derivative exists, although $f$ is continuous at $0$.

> [!PRACTICE] 3 · Oscillating derivative
> Discuss differentiability at $0$ for $f(x)=x^2\sin\dfrac{1}{x}$ ($x\ne 0$), $f(0)=0$.
>
> > [!ANSWER] Show answer
> > $\dfrac{f(h)-f(0)}{h} = h\sin\dfrac{1}{h} \to 0$, so $f'(0)=0$. However, for $x\ne 0$, $f'(x)=2x\sin\dfrac{1}{x}-\cos\dfrac{1}{x}$ has no limit near $0$.

> [!PRACTICE] 4 · Tangent line
> Find the tangent to $y=x^2$ at $x=1$.
>
> > [!ANSWER] Show answer
> > $f'(1)=2$ and the point is $(1,1)$, so $y-1=2(x-1)$, that is $y=2x-1$.

> [!FORMAL] Formal statement
> $f$ is differentiable at $x_0$ if $\lim_{x\to x_0}\dfrac{f(x)-f(x_0)}{x-x_0}$ exists; its value is $f'(x_0)$. Differentiability implies continuity, but not conversely. The left and right derivatives use $x\to x_0^-$ and $x\to x_0^+$; $f'(x_0)$ exists iff both exist and are equal. Existence of $f'(x_0)$ does not imply continuity of $f'$ at $x_0$.
