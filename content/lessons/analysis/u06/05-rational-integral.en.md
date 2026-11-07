---
slug: "rational-integral"
subject: "analysis"
unit: "u06"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Mathematical Analysis · Mastery"
title: "Rational and Trigonometric Integrals"
subtitle: "Split into partial fractions, then read each term off the table"
minutes: 17
meta: ["17 min read","Requires elementary calculus","Mastery level"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint"]
---

## Goals

By the end of this lecture you can decompose a rational function into partial fractions and integrate term by term, handle irreducible quadratic factors with logarithms and arctangents, and turn a trigonometric rational expression into a rational function by the universal substitution.

There is no theoretical obstacle to integrating a rational function: every one of them splits into four kinds of elementary fractions, and each kind has a closed-form antiderivative. What remains is patient arithmetic.

## Three-line recap

- A rational function is a quotient $\dfrac{P(x)}{Q(x)}$ of two polynomials.
- If $\deg P\ge\deg Q$, divide first, splitting an improper fraction into a polynomial plus a proper one.
- A proper fraction is decomposed according to the factorisation of the denominator, and every piece matches the basic table.

## The four kinds of partial fractions

Let $\dfrac{P(x)}{Q(x)}$ be proper, with $Q$ factored over the reals into linear and irreducible quadratic factors. Only four kinds of terms appear:

| Factor in $Q$ | Corresponding terms |
| --- | --- |
| $(x-a)$ | $\dfrac{A}{x-a}$ |
| $(x-a)^k$ | $\dfrac{A_1}{x-a}+\cdots+\dfrac{A_k}{(x-a)^k}$ |
| $x^2+px+q$ with $p^2<4q$ | $\dfrac{Bx+C}{x^2+px+q}$ |
| $(x^2+px+q)^k$ | one term per power, each with a linear numerator |

The coefficients come from clearing denominators and comparing coefficients of equal powers, or from substituting convenient values of $x$.

## Three basic integrals

$$\int\frac{A}{x-a}dx=A\ln|x-a|+C .$$

For an irreducible quadratic factor, split the numerator into "derivative of the denominator plus a constant":

$$\int\frac{Bx+C}{x^2+px+q}dx=\frac{B}{2}\ln(x^2+px+q)+\left(C-\frac{Bp}{2}\right)\int\frac{dx}{x^2+px+q} .$$

The last integral is an arctangent after completing the square:

$$\int\frac{dx}{x^2+px+q}=\frac{2}{\sqrt{4q-p^2}}\arctan\frac{2x+p}{\sqrt{4q-p^2}}+C .$$

For instance $\int\dfrac{dx}{x^2+2x+5}$: completing the square gives $(x+1)^2+4$, so the result is $\dfrac{1}{2}\arctan\dfrac{x+1}{2}+C$.

## Two complete examples

**Example one**: $\int\dfrac{dx}{x^2-1}$. Decompose $\dfrac{1}{(x-1)(x+1)}=\dfrac{1}{2}\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$, hence

$$\int\frac{dx}{x^2-1}=\frac{1}{2}\ln\left|\frac{x-1}{x+1}\right|+C .$$

**Example two**: $\int\dfrac{2x+3}{x^2+3x+2}dx$. The denominator factors as $(x+1)(x+2)$, so write

$$\frac{2x+3}{(x+1)(x+2)}=\frac{A}{x+1}+\frac{B}{x+2} .$$

Clearing denominators gives $A+B=2$ and $2A+B=3$, hence $A=B=1$. The integral is

$$\ln|x+1|+\ln|x+2|+C=\ln|(x+1)(x+2)|+C .$$

Here a shortcut is available: the numerator is exactly the derivative of the denominator, $\bigl(x^2+3x+2\bigr)'=2x+3$, so the answer is $\ln|x^2+3x+2|+C$. Always glance at the numerator first; it can save half the work.

## Trigonometric rationals and the universal substitution

An expression built from $\sin x$, $\cos x$, and constants by arithmetic is a trigonometric rational. Set

$$t=\tan\frac{x}{2},\qquad \sin x=\frac{2t}{1+t^2},\quad \cos x=\frac{1-t^2}{1+t^2},\quad dx=\frac{2\,dt}{1+t^2}.$$

Every trigonometric rational becomes a rational function of $t$, which partial fractions can handle.

**Example**: $\int\dfrac{dx}{1+\sin x}$. Substituting,

$$\int\frac{\frac{2\,dt}{1+t^2}}{1+\frac{2t}{1+t^2}}=\int\frac{2\,dt}{(1+t)^2}=-\frac{2}{1+t}+C=-\frac{2}{1+\tan\frac{x}{2}}+C .$$

The universal substitution always works, but it often makes the algebra heavier. If the integrand involves only $\sin^2x$, $\cos^2x$, or $\tan x$, the smaller substitution $t=\tan x$ is usually faster.

## Three misconceptions

> [!MYTH] An improper fraction can be decomposed directly.
> Divide first. For $\dfrac{x^2}{x+1}$, setting only $\dfrac{A}{x+1}$ can never balance the degrees. The correct form is $x-1+\dfrac{1}{x+1}$.

> [!MYTH] The numerator over an irreducible quadratic factor is a constant.
> It must be linear, $Bx+C$. Using a constant loses one degree of freedom and the decomposition fails. For $\dfrac{1}{(x^2+1)(x-1)}$ you must set $\dfrac{Bx+C}{x^2+1}+\dfrac{A}{x-1}$.

> [!MYTH] The universal substitution is always the fastest route for trigonometric rationals.
> It guarantees feasibility, not brevity. On $\int\dfrac{dx}{1+\sin^2x}$ it produces a quartic polynomial, whereas $u=\tan x$ finishes in two steps.

## Practice

> [!PRACTICE] 1 · Numerator is the derivative
> Find $\int\dfrac{2x+3}{x^2+3x+2}dx$.
>
> > [!ANSWER] Show answer
> > The numerator is the derivative of the denominator, so the answer is $\ln|x^2+3x+2|+C$. Partial fractions give $\ln|x+1|+\ln|x+2|+C$, the same thing.

> [!PRACTICE] 2 · Difference of squares
> Find $\int\dfrac{dx}{x^2-1}$.
>
> > [!ANSWER] Show answer
> > $\dfrac{1}{x^2-1}=\dfrac{1}{2}\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$, so the integral is $\dfrac{1}{2}\ln\left|\dfrac{x-1}{x+1}\right|+C$.

> [!PRACTICE] 3 · Complete the square
> Find $\int\dfrac{dx}{x^2+4x+13}$.
>
> > [!ANSWER] Show answer
> > Completing the square gives $(x+2)^2+9$, so the integral is $\dfrac{1}{3}\arctan\dfrac{x+2}{3}+C$.

> [!PRACTICE] 4 · Universal substitution
> Find $\int\dfrac{dx}{1+\sin x}$.
>
> > [!ANSWER] Show answer
> > With $t=\tan\frac{x}{2}$: $\int\dfrac{2\,dt}{(1+t)^2}=-\dfrac{2}{1+t}+C=-\dfrac{2}{1+\tan\frac{x}{2}}+C$.

> [!FORMAL] Formal statement
> Let $P,Q$ be real polynomials with $Q$ factored over $\mathbb{R}$ into linear and irreducible quadratic factors. If $\deg P<\deg Q$, then $\dfrac{P}{Q}$ can be written uniquely as a sum of the four kinds of elementary fractions above, with coefficients determined by clearing denominators and comparing powers. Every elementary fraction has an elementary antiderivative: linear factors give logarithms, irreducible quadratic factors give logarithms and arctangents. If $\deg P\ge\deg Q$, first apply polynomial division.
