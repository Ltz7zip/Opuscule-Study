---
slug: "deriv-rules"
subject: "analysis"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Differentiation Rules"
subtitle: "Breaking functions into basic pieces"
minutes: 14
meta: ["14 min read","Requires derivative and differential","Mastery level"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["deriv", "taylor"]
---

## Goals

Computing every derivative from the definition is impractical. This lecture supplies the rules for sums, products, and quotients, and explains why the product rule carries an extra term.

By the end you can differentiate rational functions, trigonometric combinations, and polynomials directly, reproduce the product rule proof, and recognise two common false formulas.

## Three-line recap

- Sums and differences differentiate term by term: $(u\pm v)'=u'\pm v'$.
- Product rule: $(uv)'=u'v+uv'$, not $u'v'$.
- Quotient rule: $\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2}$, with a nonzero denominator.

## Sums, products, quotients

If $u,v$ are differentiable at $x$, then

$$
(u\pm v)' = u' \pm v', \qquad (uv)' = u'v + uv', \qquad
\left(\frac{u}{v}\right)' = \frac{u'v-uv'}{v^2}\ (v\ne 0).
$$

The first two follow from the algebra of limits. The product rule gains a cross term because both factors move at once: the first-order increment has one part where $u$ changes and $v$ is frozen, and another where $v$ changes and $u$ is frozen.

The quotient rule follows from the product rule by writing $u/v = u\cdot v^{-1}$ and applying the chain rule, or by putting the difference quotient over a common denominator. The order in the numerator matters; swapping the terms changes the sign.

## Proof of the product rule

The key is one algebraic split:

$$
u(x+h)v(x+h)-u(x)v(x)
= u(x+h)\big(v(x+h)-v(x)\big) + v(x)\big(u(x+h)-u(x)\big).
$$

Divide by $h$:

$$
\frac{\Delta(uv)}{h}
= u(x+h)\frac{\Delta v}{h} + v(x)\frac{\Delta u}{h}.
$$

Since $u$ is differentiable it is continuous, so $u(x+h)\to u(x)$. The two difference quotients tend to $v'(x)$ and $u'(x)$. Passing to the limit,

$$
(uv)' = u v' + v u' .
$$

The proof uses “differentiable implies continuous”, the result of the previous lecture.

## Three computations

**A rational function.** For $y=\dfrac{x^2+1}{x-1}$,

$$
y' = \frac{2x(x-1)-(x^2+1)}{(x-1)^2} = \frac{x^2-2x-1}{(x-1)^2}.
$$

**A trigonometric quotient.** For $y=\tan x=\dfrac{\sin x}{\cos x}$,

$$
y' = \frac{\cos x\cos x - \sin x(-\sin x)}{\cos^2 x}
= \frac{\cos^2 x+\sin^2 x}{\cos^2 x} = \frac{1}{\cos^2 x}.
$$

This is $\sec^2 x$, valid wherever $\cos x\ne 0$.

**A product.** For $y=x^2\sin x$,

$$
y' = 2x\sin x + x^2\cos x .
$$

A polynomial such as $y=x^3-3x+2$ is differentiated term by term: $y'=3x^2-3$. These rules compose indefinitely; the definition is needed only once.

## Three misconceptions

> [!MYTH] $(uv)'=u'v'$.
> Take $u=v=x$: the left side is $(x^2)'=2x$, the right side is $1\cdot 1=1$. The correct rule is $u'v+uv'$, recording the change in one factor while the other is held fixed.

> [!MYTH] $\left(\dfrac{u}{v}\right)'=\dfrac{u'}{v'}$.
> Take $u=x^2$, $v=x$: the left side is $(x)'=1$, the right side is $\dfrac{2x}{1}=2x$. The quotient rule has numerator $u'v-uv'$ and denominator $v^2$, nothing like $u'/v'$.

> [!MYTH] In the quotient rule, $u'v$ and $uv'$ may be swapped.
> Swapping flips the sign. For $u=\sin x$, $v=x$ the correct derivative is $\dfrac{x\cos x-\sin x}{x^2}$; the swapped version is its negative.

## Practice

> [!PRACTICE] 1 · Polynomial
> Differentiate $y=x^3-3x+2$.
>
> > [!ANSWER] Show answer
> > Term by term: $y'=3x^2-3$.

> [!PRACTICE] 2 · Quotient
> Differentiate $y=\dfrac{x^2+1}{x-1}$.
>
> > [!ANSWER] Show answer
> > $y'=\dfrac{2x(x-1)-(x^2+1)}{(x-1)^2}=\dfrac{x^2-2x-1}{(x-1)^2}$, on $x\ne 1$.

> [!PRACTICE] 3 · Product
> Differentiate $y=x^2\sin x$.
>
> > [!ANSWER] Show answer
> > $y'=2x\sin x+x^2\cos x$.

> [!PRACTICE] 4 · Tangent
> Differentiate $y=\tan x$.
>
> > [!ANSWER] Show answer
> > Write it as $\dfrac{\sin x}{\cos x}$; then $y'=\dfrac{\cos^2 x+\sin^2 x}{\cos^2 x}=\sec^2 x$.

> [!FORMAL] Formal statement
> If $u,v$ are differentiable at $x$, then $(u\pm v)'(x)=u'(x)\pm v'(x)$, $(uv)'(x)=u'(x)v(x)+u(x)v'(x)$, and, when $v(x)\ne 0$, $\left(\dfrac{u}{v}\right)'(x)=\dfrac{u'(x)v(x)-u(x)v'(x)}{v(x)^2}$. The product rule follows by writing $\Delta(uv)=u(x+h)\Delta v+v(x)\Delta u$ and using continuity of $u$.
