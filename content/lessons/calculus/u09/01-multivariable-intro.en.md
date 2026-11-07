---
slug: "multivariable-intro"
subject: "calculus"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Functions of Several Variables: Limits and Continuity"
subtitle: "Infinitely many ways to approach a point"
minutes: 30
meta: ["30 min read","Requires one-variable limits","Mastery level"]
concepts: ["multi", "cont"]
prereq: ["funclim"]
related: ["cont", "partial"]
---

## What this lecture sets out to do

In one-variable calculus a point approaches from the left or right; in the plane, along infinitely many paths. The extra variables alter the difficulty of limits: **a double limit exists only when every path gives the same number**.

Applications are concrete: terrain height is $z=f(x,y)$, a temperature field's limit sets boundary conditions, optimisation asks about stability. One defecting path destroys the double limit, and differentiability with it.

The lecture has four tasks:

- draw domains as plane regions with interior, boundary, open and closed distinguished;
- write the double limit in $\varepsilon$-$\delta$ form and justify the disc;
- prove existence by one uniform estimate, nonexistence by two paths;
- separate iterated from double limits, and state the three global properties on closed bounded regions.

You should end able to judge existence, build counterexamples, and justify each hypothesis of the extreme value theorem.

## Three lines back

- A two-variable domain is a plane point set; drawing it comes first, and a different domain means a different function.
- $\lim_{(x,y)\to(x_{0},y_{0})}f=A$ requires every path to give $A$; two disagreeing paths destroy the limit.
- A continuous function on a closed bounded region is bounded and attains its maximum and minimum; "closed" and "bounded" are both indispensable.

## Why one-variable intuition fails

The graph of $y=f(x)$ is a curve, with $x_{0}$ approached from two sides; that of $z=f(x,y)$ is a surface, with $(x_{0},y_{0})$ approached along lines, parabolas, or any curve.

Paths need not look different: a function can agree along every line and differ along a parabola, so checking lines is not enough; one estimate valid in every direction is required.

Domains change too: an interval has two endpoints, a two-variable domain may be a disc, half-plane, or annulus, and behaviour near the boundary often decides the limit.

## Domains and graphs

The domain of $z=f(x,y)$ collects the pairs where the expression makes sense; the constraints mirror the one-variable ones, with regions for intervals.

| Function | Constraint | Domain |
| --- | --- | --- |
| $z=\sqrt{1-x^{2}-y^{2}}$ | $x^{2}+y^{2}\le1$ | closed disc |
| $z=\ln(x+y)$ | $x+y>0$ | open half-plane |
| $z=\dfrac{1}{xy}$ | $x\ne0$ and $y\ne0$ | plane minus both axes |
| $z=\arcsin(x+y)$ | $-1\le x+y\le1$ | closed strip |
| $z=\sqrt{4-x^{2}-y^{2}}+\ln x$ | $x^{2}+y^{2}\le4$ and $x>0$ | right half-disc minus the $y$-axis |

The last row is neither open nor closed: $x>0$ removes the $y$-axis, $x^{2}+y^{2}\le4$ keeps the arc.

Vocabulary: an **interior point** has a small disc inside the set; a **boundary point** has every disc meeting set and complement; an **open region** has only interior points; a **closed region** contains its boundary; a **bounded** region fits in a large disc.

The graph is a surface; joining points of equal height gives **level curves**,

$$
f(x,y)=c,
$$

which flatten it into the plane: circles for $z=x^{2}+y^{2}$, hyperbolas for $z=x^{2}-y^{2}$.

> [!NOTE]
> Write each restriction separately, then intersect: a solid curve includes its boundary, a dashed one excludes it, keeping later limits and bounds right.

## The precise definition of a double limit

Let $P=(x,y)$, $P_{0}=(x_{0},y_{0})$. The function $f$ has limit $A$ at $P_{0}$ if for every $\varepsilon>0$ there is $\delta>0$ such that whenever

$$
0<\sqrt{(x-x_{0})^{2}+(y-y_{0})^{2}}<\delta
$$

and $(x,y)$ lies in the domain, we have

$$
|f(x,y)-A|<\varepsilon.
$$

We write

$$
\lim_{(x,y)\to(x_{0},y_{0})}f(x,y)=A.
$$

Word by word:

- "for every $\varepsilon>0$": the tolerance is set by someone else;
- "there exists $\delta>0$": $\delta$ may depend on $\varepsilon$, written $\delta(\varepsilon)$;
- "$0<|P-P_{0}|<\delta$": a punctured disc, so $f(P_{0})$ is irrelevant;
- "$|f-A|<\varepsilon$": every value in the disc lies near $A$.

Geometrically, every neighbourhood of $A$ contains the surface over a punctured disc at $P_{0}$: a disc, not an interval, gives every direction.

A limit is unique: if $f$ tended to $A$ and $B$, then with $\varepsilon=\dfrac{|A-B|}{2}$ the values fall in two disjoint neighbourhoods.

> [!NOTE]
> The condition $0<|P-P_{0}|$ lets $f$ be undefined at $P_{0}$ and lets $f(P_{0})$ differ; continuity adds equality.

## Proving existence: one uniform estimate

The key is a bound depending only on $r=|P-P_{0}|$ and tending to $0$: an inequality such as $|xy|\le\dfrac{x^{2}+y^{2}}{2}$, polar coordinates, or squeezing.

**Example 1.** Find

$$
\lim_{(x,y)\to(0,0)}\frac{x^{2}y}{x^{2}+y^{2}}.
$$

Using $|xy|\le\dfrac{x^{2}+y^{2}}{2}$,

$$
\left|\frac{x^{2}y}{x^{2}+y^{2}}\right|
=|x|\cdot\frac{|xy|}{x^{2}+y^{2}}
\le|x|\cdot\frac12
\le\frac r2.
$$

Given $\varepsilon>0$, take $\delta=2\varepsilon$; for $0<r<\delta$ the expression is below $\varepsilon$, so the limit is $0$: the bound is uniform in direction.

**Example 2.** Find

$$
\lim_{(x,y)\to(0,0)}\frac{\sin(x^{2}+y^{2})}{x^{2}+y^{2}}.
$$

Put $u=x^{2}+y^{2}=r^{2}$. As $r\to0$, $u\to0$ and $\lim_{u\to0}\dfrac{\sin u}{u}=1$, so the double limit is $1$, a one-variable limit by substitution.

| Goal | Usual method | Key check |
| --- | --- | --- |
| Prove the limit exists | algebraic bound, polar coordinates, squeeze | the bound uses only $r$ and tends to $0$ |
| Prove it does not exist | two paths | the limits differ, or one path has none |
| Prove discontinuity | paths, or compare with $f(P_{0})$ | the limit fails or differs from $f(P_{0})$ |
| Compute an iterated limit | fix one variable first | it is not the double limit |

> [!NOTE]
> A polar estimate must be uniform in $\theta$: if $\theta$ survives, show it is controlled by $r$ alone, or $r\to0$ cannot be taken.

## Proving nonexistence: two paths

Two paths with different values, or one without a limit, refute a double limit.

**Example 3.** Discuss

$$
f(x,y)=\frac{x^{2}y}{x^{4}+y^{2}}
$$

at the origin. Along $y=kx$,

$$
f(x,kx)=\frac{kx^{3}}{x^{4}+k^{2}x^{2}}
=\frac{kx}{x^{2}+k^{2}}\to0,
$$

so every line through the origin gives $0$, and one might conclude the limit is $0$. But along $y=x^{2}$,

$$
f(x,x^{2})=\frac{x^{4}}{x^{4}+x^{4}}=\frac12.
$$

Two paths, two values: the double limit fails.

The lesson: **agreement along every line is still not enough**. Existence needs a uniform estimate, nonexistence one defecting path.

> [!MYTH] Agreement along every line means the double limit exists.
> Lines are only one family. $f=\dfrac{xy^{2}}{x^{2}+y^{4}}$ tends to $0$ along every line but to $\dfrac12$ along $x=y^{2}$, so the limit still fails.

## Iterated limits and double limits

An iterated limit takes one variable first:

$$
\lim_{y\to y_{0}}\left(\lim_{x\to x_{0}}f(x,y)\right),
\qquad
\lim_{x\to x_{0}}\left(\lim_{y\to y_{0}}f(x,y)\right).
$$

The difference is order against simultaneity:

- the double limit puts all points inside the disc of $P_{0}$ at once;
- an iterated limit runs along a special path first, one variable fixed.

Both may exist and be unequal, and the double limit may exist while an iterated one does not.

**Example 4.** Let

$$
f(x,y)=\frac{xy}{x^{2}+y^{2}}\quad((x,y)\ne(0,0)),\qquad f(0,0)=0.
$$

For fixed $y\ne0$, $x\to0$ gives $0$, then $y\to0$ gives $0$; the other order too. Yet along $y=x$ the value is $\dfrac12$, so the double limit fails.

**Example 5.** Let

$$
f(x,y)=y\sin\frac1x\quad(x\ne0),\qquad f(0,y)=0.
$$

Since $|f|\le|y|\le r$, the double limit is $0$. But for fixed $y\ne0$, $\sin\dfrac1x$ has no limit as $x\to0$, so the iterated limit fails.

One theorem: **if the double limit and some iterated limit both exist, they are equal**. Unequal iterated limits disprove the double limit; equal ones prove nothing.

> [!MYTH] If the limit exists, $x$ and $y$ may be taken separately.
> For $f=\dfrac{xy}{x^{2}+y^{2}}$ both iterated limits are $0$ while the double limit fails; for $f=y\sin\dfrac1x$ the double limit exists while the iterated one does not.

## Continuity and global properties

If

$$
\lim_{(x,y)\to(x_{0},y_{0})}f(x,y)=f(x_{0},y_{0}),
$$

then $f$ is continuous at $P_{0}$: the limit exists and equals the value.

Polynomials, rational functions, and elementary functions are continuous on their domains, and sums, products, quotients, and compositions stay continuous — one-variable facts with region for interval.

On a closed bounded region $D$, a continuous $f$ has three global properties:

1. **Boundedness**: there is $M>0$ with $|f(P)|\le M$ for all $P\in D$;
2. **Extreme values**: some $P_{1},P_{2}\in D$ give the maximum and the minimum;
3. **Intermediate values**: if $D$ is connected and $f$ takes $a$ and $b$, it takes every value in $[a,b]$.

Both hypotheses are needed: dropping a boundary point may let $f$ blow up there; an unbounded domain may let it grow without limit.

> [!NOTE]
> Connectedness cannot be dropped: with $f=0$ on one closed disc and $1$ on a disjoint one, $f$ is continuous yet never takes $\dfrac12$.

## Edge cases

**Domain not open.** At a boundary point the limit runs along points of the domain: $f=\sqrt{1-x^{2}-y^{2}}$ at $(1,0)$ gives $0$ from inside.

**Isolated point.** An isolated point is no accumulation point, so no limit exists; each punctured neighbourhood needs points of $D$.

**Domain with a hole.** $f=\dfrac{\sin(x^{2}+y^{2})}{x^{2}+y^{2}}$ is undefined at the origin yet has limit $1$; defining $f(0,0)=1$ makes it continuous.

**Unbounded domain.** Double limits concern $P\to P_{0}$; $P\to\infty$ is separate.

**Separate continuity is not joint continuity.** Continuity in each variable alone gives no double limit: see $f=\dfrac{xy}{x^{2}+y^{2}}$.

**Closed and bounded is not enough if $f$ is discontinuous.** The theorem needs continuity on $D$: $f=\dfrac{1}{x^{2}+y^{2}}$ on $0<x^{2}+y^{2}\le1$ is unbounded.

| Situation | Maximum guaranteed? | Reason |
| --- | --- | --- |
| closed bounded + continuous | yes | extreme value theorem |
| open + continuous | no | $f=x$ on the unit open disc has no extremes |
| bounded non-closed + continuous | no | a missing boundary or hole allows blow-up |
| unbounded + continuous | no | the function may grow without bound |
| closed bounded + discontinuous | no | it may be unbounded near the discontinuity |

## Four misconceptions

> [!MYTH] Agreement along every line means the limit exists.
> $f=\dfrac{xy^{2}}{x^{2}+y^{4}}$ tends to $0$ along every line and to $\dfrac12$ along $x=y^{2}$, so the double limit fails.

> [!MYTH] Continuity in each variable separately implies joint continuity.
> With $f=\dfrac{xy}{x^{2}+y^{2}}$ and $f(0,0)=0$, $f$ is continuous in each variable but not at the origin.

> [!MYTH] If the double limit exists, the iterated limits must exist.
> For $f=y\sin\dfrac1x$ the double limit is $0$ while the inner limit does not exist.

> [!MYTH] A continuous function always attains a maximum.
> The domain must also be bounded and closed: $f=x$ on the unit open disc has no maximum, and $f=\dfrac{1}{x^{2}+y^{2}}$ on the punctured disc is unbounded.

## Practice

> [!PRACTICE] 1 · Domain
> Find the domain of $z=\sqrt{4-x^{2}-y^{2}}+\ln x$.
>
> > [!ANSWER] Show answer
> > The root needs $x^{2}+y^{2}\le4$, the logarithm $x>0$: the right half-disc $\{x>0,\ x^{2}+y^{2}\le4\}$, minus the $y$-axis.

> [!PRACTICE] 2 · Prove existence
> Find $\lim_{(x,y)\to(0,0)}\dfrac{x^{3}+y^{3}}{x^{2}+y^{2}}$.
>
> > [!ANSWER] Show answer
> > Since $|x^{3}|\le r^{3}$ and $|y^{3}|\le r^{3}$, $\left|\dfrac{x^{3}+y^{3}}{x^{2}+y^{2}}\right|\le 2r\to0$: the limit is $0$.

> [!PRACTICE] 3 · Prove nonexistence
> Does $\lim_{(x,y)\to(0,0)}\dfrac{(x-y)^{2}}{x^{2}+y^{2}}$ exist?
>
> > [!ANSWER] Show answer
> > Along $y=0$ the value is $1$; along $y=x$ it is $0$. The paths disagree, so the limit does not exist.

> [!PRACTICE] 4 · Polar coordinates
> Find $\lim_{(x,y)\to(0,0)}\dfrac{\sin(x^{2}+y^{2})}{x^{2}+y^{2}}$.
>
> > [!ANSWER] Show answer
> > Put $u=x^{2}+y^{2}$; as $(x,y)\to(0,0)$, $u\to0$ and $\dfrac{\sin u}{u}\to1$: the limit is $1$.

> [!PRACTICE] 5 · Iterated limits
> For $f=\dfrac{x^{2}y}{x^{4}+y^{2}}$, find both iterated limits and decide whether the double limit exists.
>
> > [!ANSWER] Show answer
> > With $x\to0$ first the inner limit is $0$, so the iterated limit is $0$; the other order also gives $0$. But along $y=x^{2}$ the value is $\dfrac12$, so the double limit fails.

> [!PRACTICE] 6 · Extreme values
> Find the maximum and minimum of $f(x,y)=x+y$ on the closed disc $x^{2}+y^{2}\le1$.
>
> > [!ANSWER] Show answer
> > With $x=\cos\theta$, $y=\sin\theta$, $f=\sqrt2\sin\left(\theta+\dfrac\pi4\right)$: maximum $\sqrt2$, minimum $-\sqrt2$.

## Formal statement

Let $D\subset\mathbb{R}^{2}$, $P_{0}$ an accumulation point of $D$, $A\in\mathbb{R}$. If for every $\varepsilon>0$ there is $\delta>0$ such that $|f(P)-A|<\varepsilon$ whenever $P\in D$ and $0<|P-P_{0}|<\delta$, then $f$ has limit $A$ at $P_{0}$; if also $A=f(P_{0})$, $f$ is continuous there.

Limits are unique. If $f$ is continuous at $P_{0}$ and $g$ at $f(P_{0})$, then $g\circ f$ is continuous at $P_{0}$. Polynomials and rational functions are continuous on their domains.

If $D$ is closed and bounded and $f$ continuous on $D$, then $f$ is bounded and attains a maximum and a minimum; if $D$ is also connected, $f$ takes every value between any two of its values.

## How this lecture connects

This lecture moves one-variable limits into the plane; later material rests on it:

- **With surfaces**: the graph of $z=f(x,y)$ is the previous lecture's surface, its domain the projection onto $xOy$, its level curves the traces.
- **With partial derivatives**: a partial derivative is a limit along one special path; a failing double limit rules them out.
- **With differentiability**: the increment must be controlled in every direction by one linear part — the same uniformity.
- **With optimisation**: the extreme value theorem supplies maxima and minima on closed bounded regions.
- **With multiple integrals**: the integrand must be continuous or bounded on the region, whose closedness and boundedness decide integrability.

The next lecture writes this uniformity as partial derivatives and the total differential.
