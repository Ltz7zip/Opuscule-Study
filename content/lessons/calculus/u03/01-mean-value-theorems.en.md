---
slug: "mean-value-theorems"
subject: "calculus"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Rolle, Lagrange, and Cauchy Mean Value Theorems"
subtitle: "One derivative equals the average rate over the whole interval"
minutes: 34
meta: ["34 min read","Requires derivatives and extrema","Mastery level"]
concepts: ["mvt", "deriv"]
prereq: ["deriv"]
related: ["lhopital", "taylor", "extremum"]
---

## What this lecture sets out to do

The derivative is a slope at one point, but measurements report averages over a whole stretch: a car covering $100$ kilometres in one hour must, at some instant, have shown $100\ \mathrm{km/h}$ on the speedometer. Intuition is not a proof. This lecture writes that sentence as an equation.

Rolle handles a horizontal chord, Lagrange tilts it to an arbitrary chord, and Cauchy compares two increments at once. All three proofs rest on two facts: a continuous function on a closed interval attains its extrema, and its derivative vanishes at an interior extremum.

By the end you should be able to:

- test each hypothesis and say which omission breaks the conclusion;
- solve for $\xi$ and pick the root that lies inside $(a,b)$;
- prove Lagrange and Cauchy by constructing auxiliary functions;
- prove inequalities such as $\ln(1+x)<x$ and $\arctan x<x$;
- deduce constancy from $f'\equiv0$ and explain the role of connectedness;
- keep "some $\xi$ exists" apart from "compute $\xi$".

## Three lines back

- Continuity on the closed interval and differentiability in the open interval are the shared hypotheses. Neither can be dropped.
- Rolle adds $f(a)=f(b)$ and concludes that the derivative vanishes somewhere inside.
- Lagrange writes $f(b)-f(a)$ as $f'(\xi)(b-a)$, turning a difference of values into information about a derivative.

## Why we need the mean value theorems

A derivative says nothing directly about a function value. Knowing $f'(x)>0$ only means that the function rises near each point; concluding $f(b)>f(a)$ requires accumulating those local rises over the whole interval. The mean value theorem is that bridge: it guarantees an interior point whose instantaneous rate equals the average rate.

Without this bridge many conclusions rest on intuition. "$f'\equiv0$ implies $f$ is constant" sounds obvious, yet its proof must compare the values at two arbitrary points, which needs exactly this identity.

Geometrically, **some tangent is parallel to the chord joining the endpoints**. Picture a mountain road: the chord is the gradient from start to finish, and somewhere the road's gradient matches it.

## Fermat's lemma: zero derivative at an extremum

All three proofs need the same local fact.

> [!FORMAL]
> If $f$ is defined in a neighbourhood of $x_0$, attains a local extremum at $x_0$, and is differentiable there, then $f'(x_0)=0$.

The proof is by contradiction. Suppose $f'(x_0)>0$. By the definition of the derivative,

$$
f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}>0,
$$

so for all small enough $|h|$ the difference quotient is positive. With $h>0$ this gives $f(x_0+h)>f(x_0)$; with $h<0$ the denominator is negative while the quotient is positive, so $f(x_0+h)<f(x_0)$. Values larger and smaller than $f(x_0)$ then lie on both sides, contradicting the extremum. The case $f'(x_0)<0$ is symmetric, leaving only $f'(x_0)=0$.

The hypotheses matter: $f(x)=|x|$ has a minimum at $0$ but is not differentiable there. A tangent at an extremum, if it exists, must be horizontal.

## Rolle's theorem

> [!FORMAL] Rolle's theorem
> Let $f$ be continuous on $[a,b]$, differentiable on $(a,b)$, and satisfy $f(a)=f(b)$. Then some $\xi\in(a,b)$ has $f'(\xi)=0$.

The first step is the extreme value theorem: $f$ attains a maximum $M$ and a minimum $m$ on $[a,b]$.

- If $M=m$, then $f$ is constant, $f'\equiv0$, and every interior point serves as $\xi$.
- If $M>m$, then $f(a)=f(b)$ forces at least one of $M,m$ to be attained at an interior point $\xi$ (the minimum case is symmetric). Then $\xi$ is a local extremum and Fermat gives $f'(\xi)=0$.

**Example 1** Verify Rolle's theorem for $f(x)=x^{2}-2x$ on $[0,2]$ and find $\xi$. A polynomial is continuous and differentiable, and

$$
f(0)=0,\qquad f(2)=4-4=0,
$$

so the hypotheses hold. From $f'(x)=2x-2=0$ we get $\xi=1\in(0,2)$. The parabola has its minimum $-1$ at $x=1$, where the horizontal tangent is parallel to the chord.

## Lagrange's theorem

Rolle demands a horizontal chord, which is too restrictive; tilting the picture turns it into an arbitrary one.

> [!FORMAL] Lagrange's mean value theorem
> Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then some $\xi\in(a,b)$ has
> $$f(b)-f(a)=f'(\xi)(b-a)$$

Equivalently $f'(\xi)=\dfrac{f(b)-f(a)}{b-a}$, and the right side is the chord slope, so **a tangent parallel to the chord exists**.

The proof subtracts the chord. Put

$$
F(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a).
$$

Then $F(a)=0$ and

$$
F(b)=f(b)-f(a)-\frac{f(b)-f(a)}{b-a}(b-a)=0,
$$

while $F$ inherits continuity and differentiability. Rolle gives $\xi\in(a,b)$ with $F'(\xi)=0$, and since

$$
F'(x)=f'(x)-\frac{f(b)-f(a)}{b-a},
$$

the required identity follows.

The auxiliary function is "the curve minus the chord": it vanishes at both ends, so the deviation has a horizontal tangent inside. This is the standard use of Rolle's theorem — **to prove that some point satisfies an equation, build a function for which the equation reads "the derivative is zero"**.

**Example 2** Verify Lagrange's theorem for $f(x)=x^{3}-3x$ on $[0,2]$ and find $\xi$. The endpoints give

$$
f(0)=0,\qquad f(2)=8-6=2,\qquad \frac{f(2)-f(0)}{2-0}=1.
$$

Setting $3\xi^{2}-3=1$ gives $\xi=\pm\dfrac{2}{\sqrt3}$. The negative root $-\dfrac{2}{\sqrt3}\approx-1.155$ lies outside $(0,2)$; the positive root $\dfrac{2}{\sqrt3}\approx1.155$ lies inside. The theorem guarantees existence; generally there may be several such points.

## Cauchy's theorem

Lagrange compares the increment of $f$ with that of $x$; comparing two increments at once needs a general form.

> [!FORMAL] Cauchy's mean value theorem
> Let $f,g$ be continuous on $[a,b]$ and differentiable on $(a,b)$, with $g'(x)\ne0$ for every $x\in(a,b)$. Then some $\xi\in(a,b)$ has
> $$\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)}$$

The condition $g'\ne0$ does two jobs. It makes $g(b)\ne g(a)$, since equality would give $g'=0$ somewhere by Rolle, so the denominator is safe. And $g$ is then strictly monotone, so the increments are comparable.

The proof again builds an auxiliary function:

$$
F(x)=f(x)-f(a)-\frac{f(b)-f(a)}{g(b)-g(a)}\bigl(g(x)-g(a)\bigr),
$$

for which $F(a)=0$ and, by the definition of $g(b)-g(a)$,

$$
F(b)=f(b)-f(a)-\frac{f(b)-f(a)}{g(b)-g(a)}\bigl(g(b)-g(a)\bigr)=0.
$$

Rolle gives $\xi$ with

$$
0=F'(\xi)=f'(\xi)-\frac{f(b)-f(a)}{g(b)-g(a)}g'(\xi),
$$

and dividing by $g'(\xi)\ne0$ finishes the proof.

With $g(x)=x$ we have $g'=1$ and $g(b)-g(a)=b-a$, so Cauchy becomes Lagrange; adding $f(a)=f(b)$ turns Lagrange into Rolle. Hence

$$
\text{Rolle}\ \Longleftarrow\ \text{Lagrange}\ \Longleftarrow\ \text{Cauchy},
$$

and the arrows are often memorised backwards: Cauchy is the most general, Rolle the most special.

**Example 3** For $f(x)=x^{2}$ and $g(x)=x^{3}$ on $[1,2]$, find the Cauchy point. Both are polynomials and $g'=3x^{2}\ne0$ on $(1,2)$. The left side is

$$
\frac{4-1}{8-1}=\frac37,
$$

the right side is $\dfrac{2\xi}{3\xi^{2}}=\dfrac{2}{3\xi}$, and

$$
\frac37=\frac{2}{3\xi}\quad\Longrightarrow\quad \xi=\frac{14}{9}\approx1.556\in(1,2).
$$

## The three theorems side by side

| Theorem | Shared hypotheses | Extra hypothesis | Conclusion | Typical use |
| --- | --- | --- | --- | --- |
| Rolle | continuous on $[a,b]$, differentiable on $(a,b)$ | $f(a)=f(b)$ | $f'(\xi)=0$ | roots of equations; auxiliary functions |
| Lagrange | as above | none | $f(b)-f(a)=f'(\xi)(b-a)$ | inequalities; monotonicity via $f'$ |
| Cauchy | as above | $g'\ne0$ | ratio of increments equals ratio of derivatives | l'Hôpital's rule; Taylor remainder |

All three share one pipeline: **extreme value theorem → interior extremum → Fermat's lemma**; only the auxiliary function changes.

## Inequalities from the mean value theorem

The standard device: read the compared values as $f(b)$ and $f(a)$, write their difference as $f'(\xi)(b-a)$, then bound $f'(\xi)$.

**Example 4** Prove $\ln(1+x)<x$ for $x>0$. Take $f(t)=\ln(1+t)$ on $[0,x]$, where $f'(t)=\dfrac{1}{1+t}$. Then some $\xi\in(0,x)$ gives

$$
\ln(1+x)-\ln 1=\frac{x}{1+\xi},\qquad\text{so}\qquad \ln(1+x)=\frac{x}{1+\xi}.
$$

Since $\xi>0$ we have $1+\xi>1$, hence $\dfrac{x}{1+\xi}<x$. This is shorter than building $g(x)=x-\ln(1+x)$ and studying its derivative, which merely redoes the proof.

The same device proves $e^{x}>1+x$ for $x\ne0$. Between $0$ and $x$,

$$
e^{x}-1=e^{\xi}x.
$$

For $x>0$ we have $\xi>0$ and $e^{\xi}>1$, so $e^{x}-1>x$. For $x<0$ we have $\xi<0$ and $e^{\xi}<1$ with $x<0$, and reversing the inequality gives $e^{x}-1>x$ again.

> [!NOTE]
> The theorem guarantees that $\xi$ exists; it gives neither uniqueness nor a formula. In practice you only need "some $\xi$" and then bound $f'(\xi)$. An explicit $\xi$ requires solving an equation that usually has no elementary solution.

## Where the hypotheses bite: four counterexamples

**Counterexample 1 (differentiability missing).** $f(x)=|x|$ is continuous on $[-1,1]$ with $f(-1)=f(1)=1$. Rolle would require $\xi\in(-1,1)$ with $f'(\xi)=0$, but $f'\equiv-1$ on $(-1,0)$, $f'\equiv1$ on $(0,1)$, and $0$ is not differentiable. No point has zero derivative.

**Counterexample 2 (equal endpoints missing).** $f(x)=x$ on $[0,1]$ is continuous and differentiable, but $f(0)\ne f(1)$ and $f'\equiv1$, so Rolle fails. Lagrange still holds: $f(1)-f(0)=1=f'(\xi)(1-0)$ for every $\xi$. Rolle's extra condition only buys a stronger conclusion.

**Counterexample 3 (endpoint continuity missing).** Let

$$
f(x)=x\ (0\le x<1),\qquad f(1)=0
$$

on $[0,1]$. The derivative is $1$ on $(0,1)$ while the average rate is $\dfrac{0-0}{1}=0$; Lagrange would demand $f'(\xi)=0$, which never happens. The discontinuity at $x=1$ kills the extreme value theorem.

**Counterexample 4 ($g'=0$).** With $g(x)=x^{2}$ on $[-1,1]$, $g'=2x$ vanishes at $0$ and $g(-1)=g(1)$, so Cauchy's left side has a zero denominator. Hence Cauchy assumes $g'\ne0$.

## Four misconceptions

> [!MYTH] The point $\xi$ in Rolle's theorem is unique.
> $f(x)=\sin x$ on $[0,2\pi]$ satisfies the hypotheses, and both $\xi=\dfrac{\pi}{2}$ and $\dfrac{3\pi}{2}$ make the derivative zero. The theorem asserts at least one.

> [!MYTH] A continuous function must have a point with zero derivative.
> Equal endpoint values and interior differentiability are also needed. $f(x)=x$ on $[0,1]$ is continuous, yet $f'\equiv1$.

> [!MYTH] $\xi$ may be taken at an endpoint.
> The theorem places $\xi$ in the open interval $(a,b)$. An endpoint would degrade Lagrange into the false identity $f(b)-f(a)=f'(b)(b-a)$.

> [!MYTH] The mean value theorem computes a formula for $\xi$.
> It guarantees existence only. For $f(x)=\ln(1+x)$ the equation $\dfrac{1}{1+\xi}=\dfrac{\ln(1+x)}{x}$ has no elementary solution, and $\xi$ is used only as "some number between $0$ and $x$".

## Practice

> [!PRACTICE] 1 · Rolle's theorem
> Verify Rolle's theorem for $f(x)=x^{2}-4x+3$ on $[1,3]$ and find $\xi$.
>
> > [!ANSWER] Show answer
> > The polynomial is continuous and differentiable, and $f(1)=f(3)=0$. From $f'(x)=2x-4=0$, $\xi=2\in(1,3)$.

> [!PRACTICE] 2 · Lagrange's theorem
> Find the Lagrange point for $f(x)=\sqrt{x}$ on $[1,4]$.
>
> > [!ANSWER] Show answer
> > The average rate is $\dfrac{2-1}{4-1}=\dfrac13$ and $f'(x)=\dfrac{1}{2\sqrt{x}}$. From $\dfrac{1}{2\sqrt{\xi}}=\dfrac13$, $\xi=\dfrac94\in(1,4)$.

> [!PRACTICE] 3 · Cauchy's theorem
> For $f(x)=\ln x$ and $g(x)=x$ on $[1,e]$, find the Cauchy point.
>
> > [!ANSWER] Show answer
> > The left side is $\dfrac{1-0}{e-1}=\dfrac{1}{e-1}$ and the right side is $\dfrac1\xi$, so $\xi=e-1\approx1.718\in(1,e)$.

> [!PRACTICE] 4 · Prove an inequality
> Use Lagrange's theorem to prove $\arctan x<x$ for $x>0$.
>
> > [!ANSWER] Show answer
> > Apply the theorem to $\arctan t$ on $[0,x]$: $\arctan x=\dfrac{x}{1+\xi^{2}}$ with $0<\xi<x$. Since $1+\xi^{2}>1$, $\arctan x<x$.

> [!PRACTICE] 5 · Checking hypotheses
> Explain why $f(x)=|x|$ on $[-1,1]$ fails the conclusion of Lagrange's theorem.
>
> > [!ANSWER] Show answer
> > The average rate is $\dfrac{1-1}{2}=0$, but $f'=-1$ on $(-1,0)$, $f'=1$ on $(0,1)$, and $f$ is not differentiable at $0$; no derivative vanishes.

> [!PRACTICE] 6 · Constant test
> Suppose $f$ is continuous on an interval $I$, differentiable inside, and $f'(x)=0$ there. Prove $f$ is constant.
>
> > [!ANSWER] Show answer
> > For any $x_1<x_2$ in $I$, Lagrange on $[x_1,x_2]$ gives $f(x_2)-f(x_1)=f'(\xi)(x_2-x_1)=0$. All values agree.

## Formal statement

If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then some $\xi\in(a,b)$ satisfies

$$
f(b)-f(a)=f'(\xi)(b-a)
$$

(Lagrange). If in addition $f(a)=f(b)$, then some $\xi\in(a,b)$ satisfies $f'(\xi)=0$ (Rolle). If $f,g$ are continuous on $[a,b]$, differentiable on $(a,b)$, and $g'(x)\ne0$ there, then some $\xi\in(a,b)$ satisfies

$$
\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)}
$$

(Cauchy). The common foundation: a continuous function on a closed interval attains its maximum and minimum, and a differentiable function has zero derivative at an interior extremum.

## How this lecture connects

- **l'Hôpital's rule** is proved from Cauchy: write $\dfrac{f(x)}{g(x)}$ between $a$ and $x$ as $\dfrac{f'(\xi)}{g'(\xi)}$ and let $x\to a$.
- **Taylor's formula** generalises Lagrange: at $n=0$ the remainder is $f(x)-f(x_0)=f'(\xi)(x-x_0)$, and repeated Cauchy gives the $n$-th order remainder.
- **Monotonicity and extrema** rely on Lagrange: $f'>0$ implies $f$ increases, which is Practice 6 plus the sign of the derivative.
- **Differentials** are the linearised version, and the mean value theorem upgrades "approximation" to "equality", which is why proofs cannot do without it.

If you remember one sentence: **the mean value theorem compresses global information about an interval into local information at one point**. Seeing "there exists a point", "prove an inequality", or "prove an identity", ask whether a function can be built so that the claim becomes "the derivative is zero" or "the derivative is fixed".