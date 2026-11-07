---
slug: "fermat-rolle"
subject: "analysis"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Fermat's Lemma and Rolle's Theorem"
subtitle: "Why the tangent at an extremum lies flat"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["mvt", "extremum"]
prereq: ["deriv"]
related: ["mvt", "deriv"]
---

## Goals

By the end of this lecture you can explain why an interior extremum forces the derivative to vanish, and you can say what breaks when each of the three hypotheses of Rolle's theorem is removed.

Fermat's lemma does one job: it translates the geometric phrase "this point is an extremum" into the algebraic equation "the derivative is zero". Rolle's theorem then lifts that local fact to a whole interval — if both ends are at the same height, some tangent in between must be horizontal. Every mean value theorem in this chapter is a rewrite of it.

## Three-line recap

- A derivative at a point, when it exists, is the slope of the line that best approximates the function there.
- At a maximum, the function rises on the left and falls on the right, so the two average rates have opposite signs.
- One number cannot be both nonnegative and nonpositive unless it is zero. That is the whole secret.

## Fermat's lemma: derivative zero at an interior extremum

Let $f$ be defined on a neighbourhood of $x_0$, with $x_0$ an interior point. If $f(x_0)$ is a local maximum and $f'(x_0)$ exists, then $f'(x_0)=0$.

The proof uses difference quotients only. For small $h>0$, maximality gives $f(x_0+h)\le f(x_0)$, so the right quotient is $\le 0$:

$$\frac{f(x_0+h)-f(x_0)}{h}\le 0 .$$

For $h<0$ the numerator is still $\le 0$ but the denominator is negative, so the same quotient is now $\ge 0$. Letting $h\to 0^+$ and $h\to 0^-$ gives $f'_+(x_0)\le 0\le f'_-(x_0)$. Existence of $f'(x_0)$ forces the two one-sided derivatives to be equal, and a number squeezed between $0$ and $0$ must be $0$.

For $f(x)=1-x^2$ we get $f'(0)=0$, and $0$ really is a maximum. The lemma checks out.

> [!NOTE]
> The word "interior" is essential. A maximum at an endpoint carries no derivative information.

## The three hypotheses of Rolle's theorem

If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then some $\xi\in(a,b)$ satisfies $f'(\xi)=0$.

The proof has two steps. First, the extreme value theorem gives a maximum $M$ and a minimum $m$ on $[a,b]$. Second, case split: if $M=m$ then $f$ is constant and any $\xi$ works; if $M>m$, then because $f(a)=f(b)$, at least one of $M,m$ differs from the endpoint value, hence is attained at an interior point, and Fermat's lemma finishes the job.

None of the three hypotheses can be dropped, and each failure has its own counterexample:

| Dropped hypothesis | Counterexample | What happens |
| --- | --- | --- |
| Continuity on $[a,b]$ | $f(0)=f(1)=0$, $f(x)=x$ for $0<x<1$ | $f'\equiv 1$, no zero |
| Differentiability on $(a,b)$ | $f(x)=\|x\|$ on $[-1,1]$ | $f(-1)=f(1)=1$, but $f'$ only takes $\pm 1$ |
| $f(a)=f(b)$ | $f(x)=x$ on $[0,1]$ | $f'\equiv 1$ |

The second counterexample deserves a second look: $|x|$ fails to be differentiable exactly at $0$, the one place where a horizontal tangent could have hidden. Differentiability is not decoration; it guarantees there is a tangent to talk about at every point.

A concrete computation: $f(x)=x^2-4x+1$ on $[0,4]$ has $f(0)=f(4)=1$, and $f'(x)=2x-4$ vanishes at $\xi=2\in(0,4)$.

## Counting roots with Rolle's theorem

The theorem is more useful backwards: if $f'$ has no zero in $(a,b)$, then $f$ has at most one zero in $[a,b]$. Otherwise two zeros would squeeze a zero of $f'$ between them.

Take $f(x)=x^3-3x+1$. Here $f'(x)=3x^2-3$ has only the two zeros $\pm 1$, so $f$ has at most three real roots. Now count sign changes: $f(-2)=-1$, $f(0)=1$, $f(1)=-1$, $f(2)=3$. Three sign changes place one root in each of $(-2,0)$, $(0,1)$, $(1,2)$. At most three and at least three means exactly three.

This pairing — bound the count, then prove existence — is the standard move of the chapter.

## Three misconceptions

> [!MYTH] Fermat's lemma also holds at endpoints.
> It does not. $f(x)=x$ on $[0,1]$ attains its maximum at $x=1$, yet $f'(1)=1\ne 0$. At an endpoint only one side is available, so the two-sided squeeze collapses.

> [!MYTH] If $f(a)=f(b)$, a horizontal tangent must exist somewhere inside.
> Not necessarily. $f(x)=|x|$ on $[-1,1]$ has equal endpoint values, but the derivative only takes the values $\pm 1$ and does not exist at $0$. Differentiability is what is missing.

> [!MYTH] $f'(x_0)=0$ means $x_0$ is an extremum.
> That reverses the implication. $f(x)=x^3$ has $f'(0)=0$, but the function is strictly increasing through $0$: the tangent is horizontal, the point is not an extremum. A zero derivative is necessary, not sufficient.

## Practice

> [!PRACTICE] 1 · Verify
> Check Rolle's theorem for $f(x)=x^2-2x$ on $[0,2]$ and find the guaranteed $\xi$.
>
> > [!ANSWER] Show answer
> > $f(0)=f(2)=0$, so the hypotheses hold. Solving $f'(x)=2x-2=0$ gives $\xi=1\in(0,2)$.

> [!PRACTICE] 2 · Build a counterexample
> Give a function on $[-1,1]$ with $f(-1)=f(1)$ for which no $\xi$ satisfies $f'(\xi)=0$.
>
> > [!ANSWER] Show answer
> > $f(x)=|x|$. Both endpoint values equal $1$, while $f'(x)=\pm 1$ for $x\ne 0$ and $f'(0)$ does not exist, so no such $\xi$ exists.

> [!PRACTICE] 3 · Count roots
> Prove that $x^3+x-1=0$ has exactly one real root.
>
> > [!ANSWER] Show answer
> > $f'(x)=3x^2+1>0$, so $f$ is strictly increasing and has at most one root. Also $f(0)=-1<0$ and $f(1)=1>0$, so the intermediate value theorem gives at least one. Hence exactly one.

> [!PRACTICE] 4 · Auxiliary function
> Let $f$ be continuous on $[0,1]$, differentiable on $(0,1)$, with $f(0)=f(1)=0$. Prove that some $\xi\in(0,1)$ satisfies $f'(\xi)=f(\xi)$.
>
> > [!ANSWER] Show answer
> > Set $g(x)=e^{-x}f(x)$. Then $g(0)=g(1)=0$, so Rolle gives $\xi$ with $g'(\xi)=0$. Since $g'(x)=e^{-x}\bigl(f'(x)-f(x)\bigr)$ and $e^{-\xi}\ne 0$, we get $f'(\xi)=f(\xi)$.

> [!FORMAL] Formal statement
> Let $f$ be defined on an interval $I$ and let $x_0$ be an interior point. If $f(x)\le f(x_0)$ for all $x$ in some $(x_0-\delta,x_0+\delta)\cap I$ and $f'(x_0)$ exists, then $f'(x_0)=0$. Rolle's theorem: if $f\in C[a,b]$, $f$ is differentiable on $(a,b)$, and $f(a)=f(b)$, then there is $\xi\in(a,b)$ with $f'(\xi)=0$. The proof uses the extreme value theorem on a closed interval together with Fermat's lemma.
