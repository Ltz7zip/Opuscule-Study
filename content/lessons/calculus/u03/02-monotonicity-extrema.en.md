---
slug: "monotonicity-extrema"
subject: "calculus"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "L'Hôpital's Rule, Monotonicity, and Extrema"
subtitle: "The sign of the derivative sets the shape, the shape sets the extremes"
minutes: 32
meta: ["32 min read","Requires the mean value theorems","Mastery level"]
concepts: ["lhopital", "extremum"]
prereq: ["mvt"]
related: ["taylor", "extremum-mv", "areavol"]
---

## What this lecture sets out to do

The mean value theorems tie the derivative to growth. This lecture turns that sentence into three working tools: L'Hôpital's rule for indeterminate forms, the sign of the first derivative for monotonicity, and a comparison of candidates for extrema on a closed interval.

All three rest on the same assumption: the function is differentiable on an interval and its derivative can be computed and compared. L'Hôpital is a corollary of Cauchy's mean value theorem, the monotonicity test a corollary of Lagrange's, and the extremum tests translate "the sign of the derivative changes" into "neighbouring values are higher or lower".

By the end you should be able to classify a limit and explain why the rule may fail, draw a complete monotonicity table, tell a local extremum from a global one, and find extrema on closed, open, and infinite intervals.

## Three lines back

- L'Hôpital's rule replaces a $0/0$ or $\infty/\infty$ quotient by a quotient of derivatives, provided the latter limit exists or is infinite.
- On an interval, $f'>0$ gives strict increase and $f'<0$ gives strict decrease; the converse fails.
- An extremum is local, a maximum or minimum is global, and on a closed interval the candidates are stationary points, non-differentiable points, and endpoints.

## What "indeterminate" actually means

Look at three quotients near $x=1$:

$$
\frac{x^2-1}{x-1},\qquad \frac{x-1}{x^2-1},\qquad \frac{x^2-1}{x^2-1}
$$

Each has the form $0/0$ as $x\to1$, yet the limits are $2$, $\dfrac12$, and $1$. The symbol "$0/0$" carries no numerical information: it says only that both numerator and denominator shrink. Which one shrinks faster is the actual content of the limit.

Suppose $f$ and $g$ are differentiable at $x_0$ with $f(x_0)=g(x_0)=0$. Then

$$
f(x)\approx f'(x_0)(x-x_0),\qquad g(x)\approx g'(x_0)(x-x_0).
$$

Dividing cancels the common factor $x-x_0$ and leaves $f'(x_0)/g'(x_0)$. A $0/0$ limit is decided by the **first-order rate of vanishing**, and L'Hôpital is nothing more than that approximation made rigorous by a mean value theorem. If the first-order terms also cancel, the second order takes over, which is why the rule may need repeating:

$$
\lim_{x\to0}\frac{e^x-1-x}{x^2}=\frac12,
$$

because $e^x=1+x+\dfrac{x^2}{2}+o(x^2)$. If the numerator vanishes faster the quotient tends to $0$; otherwise it diverges.

## The precise statement of L'Hôpital's rule

Assume $f$ and $g$ are differentiable on a punctured neighbourhood of $x_0$, with $g'(x)\ne0$ there, and suppose

1. $f(x)\to0$ and $g(x)\to0$ (the $0/0$ case), or both tend to infinity (the $\infty/\infty$ case);
2. $\displaystyle\lim_{x\to x_0}\frac{f'(x)}{g'(x)}$ exists or equals $\pm\infty$.

Then

$$
\lim_{x\to x_0}\frac{f(x)}{g(x)}=\lim_{x\to x_0}\frac{f'(x)}{g'(x)}.
$$

One-sided versions also hold.

The $0/0$ case needs one application of Cauchy's mean value theorem. Extend $f$ and $g$ continuously by $f(x_0)=g(x_0)=0$. For $x$ near $x_0$, some $c$ between $x$ and $x_0$ satisfies

$$
\frac{f(x)}{g(x)}=\frac{f(x)-f(x_0)}{g(x)-g(x_0)}=\frac{f'(c)}{g'(c)}.
$$

As $x\to x_0$ the trapped point $c$ also tends to $x_0$, so the right side tends to the limit of $f'/g'$. The $\infty/\infty$ case needs a separate proof: $|g|$ must first be shown to become arbitrarily large, after which an $\varepsilon$ estimate finishes the argument.

> [!NOTE]
> The implication runs one way: an existing limit of $f'/g'$ forces the original limit to equal it; if $f'/g'$ has no limit, the original one may still exist.

## Six indeterminate forms and how to convert them

| Shape | Form | Conversion | Example |
| --- | --- | --- | --- |
| $\dfrac{f}{g}$ | $0/0$ or $\infty/\infty$ | apply the rule directly | $\dfrac{e^x-1}{x}$ |
| $f\cdot g$ | $0\cdot\infty$ | write $\dfrac{f}{1/g}$ or $\dfrac{g}{1/f}$ | $x\ln x$ as $x\to0^+$ |
| $f-g$ | $\infty-\infty$ | common denominator or rationalise | $\dfrac1x-\dfrac1{\sin x}$ |
| $f^g$ | $1^\infty$ | take logs, compute $g\ln f$ | $(1+x)^{1/x}$ |
| $f^g$ | $0^0$ | take logs, compute $g\ln f$ | $x^x$ as $x\to0^+$ |
| $f^g$ | $\infty^0$ | take logs, compute $g\ln f$ | $x^{1/x}$ as $x\to\infty$ |

Direction matters: pick the easier reciprocal. For $\lim_{x\to0^+}x\ln x$, writing $\dfrac{\ln x}{1/x}$ gives

$$
\lim_{x\to0^+}\frac{\ln x}{1/x}=\lim_{x\to0^+}\frac{1/x}{-1/x^2}=\lim_{x\to0^+}(-x)=0.
$$

The other direction makes the differentiation worse.

For $\infty-\infty$, merge first:

$$
\lim_{x\to0}\left(\frac1x-\frac1{\sin x}\right)=\lim_{x\to0}\frac{\sin x-x}{x\sin x}.
$$

One application gives $\dfrac{\cos x-1}{\sin x+x\cos x}$, still $0/0$; a second gives $\dfrac{-\sin x}{2\cos x-x\sin x}\to0$. Power forms go through logarithms: for $(1+x)^{1/x}$ the logarithm tends to $1$, so the limit is $e$; for $x^{1/x}$ it tends to $0$, so the limit is $1$.

## When the rule fails

1. **Not an indeterminate form.** $\lim_{x\to0}\dfrac{x+1}{x+2}=\dfrac12$, while the ratio of derivatives is $1$.
2. **The derivative ratio has no limit.** $\lim_{x\to\infty}\dfrac{x+\sin x}{x}=1$, but $\dfrac{1+\cos x}{1}$ oscillates; the rule cannot decide.
3. **Circular reasoning.** Using the rule on $\lim_{x\to0}\dfrac{\sin x}{x}$ needs the derivative of $\sin$ at $0$, which is defined by that very limit.
4. **Repeating without checking.** Every step must confirm an indeterminate form and $g'(x)\ne0$.
5. **Accumulating zeros of $g'$.** If $g'$ vanishes infinitely often near $x_0$, Taylor expansion is the better tool.

## Monotonicity from the sign of the derivative

Let $f$ be continuous on an interval $I$ and differentiable inside. If $f'>0$ throughout, then $f$ is strictly increasing on $I$; if $f'<0$, strictly decreasing. The proof uses Lagrange once: for $x_1<x_2$ there is $c$ with $f(x_2)-f(x_1)=f'(c)(x_2-x_1)$, and the right side is positive.

The converse fails: strict increase only forces $f'\ge0$, and $f(x)=x^3$ is strictly increasing while $f'(0)=0$.

A monotonicity table is built in five steps: state the domain; solve $f'=0$; locate points where $f'$ does not exist; cut the domain at these points and test the sign on each piece; record the signs and the resulting behaviour.

Take $f(x)=\dfrac{x}{1+x^2}$:

$$
f'(x)=\frac{1-x^2}{(1+x^2)^2}.
$$

The denominator is always positive, so the sign is that of $1-x^2$, whose zeros are $x=\pm1$.

| Interval | $(-\infty,-1)$ | $(-1,1)$ | $(1,+\infty)$ |
| --- | --- | --- | --- |
| $f'$ | $-$ | $+$ | $-$ |
| $f$ | decreasing | increasing | decreasing |

Hence $x=-1$ is a local minimum with value $-\dfrac12$ and $x=1$ is a local maximum with value $\dfrac12$. The table also shows $f\to0$ as $x\to\pm\infty$.

> [!NOTE]
> Monotonicity is a statement about intervals. $f(x)=\dfrac1x$ decreases on $(-\infty,0)$ and on $(0,+\infty)$ separately, but it is not decreasing on its whole domain: the value jumps from negative to positive across $0$.

## Extrema: locality and two tests

If some $\delta>0$ makes $f(x)\le f(x_0)$ for every $x$ within $\delta$ of $x_0$, then $x_0$ is a local maximum point; strict inequalities give a strict local maximum. Local minima are defined the same way.

Fermat's theorem: if $f$ has a local extremum at an interior point $x_0$ and $f'(x_0)$ exists, then $f'(x_0)=0$. Suppose $x_0$ is a local maximum. For $h>0$ the difference quotient is $\le0$, so the right derivative is $\le0$; for $h<0$ it is $\ge0$, so the left derivative is $\ge0$. Both agree, hence the derivative is zero; at an endpoint only one side exists.

**First derivative test.** If $f'$ is positive left of $x_0$ and negative right of it, then $x_0$ is a local maximum; negative then positive gives a local minimum; the same sign on both sides gives neither.

**Second derivative test.** If $f'(x_0)=0$ and $f''(x_0)<0$, then $x_0$ is a strict local maximum; if $f''(x_0)>0$, a strict local minimum; if $f''(x_0)=0$, the test is silent. The content is the second-order Taylor expansion, whose linear term has vanished:

$$
f(x_0+h)-f(x_0)=\frac12f''(x_0)h^2+o(h^2).
$$

For small $h$ the sign is that of $f''(x_0)$.

The failures must be memorised: $x^4$ has both derivatives zero at $0$ and still has a local minimum; $x^3$ and $x^5$ have neither at $0$. The decision always comes from the change of sign in $f'$.

## Extrema on a closed interval

A continuous function on a closed interval attains its extrema; only the location is open. The candidate set has three kinds of points: stationary points inside the interval, non-differentiable points inside the interval, and the two endpoints.

Evaluate $f$ at every candidate; the largest is the maximum, the smallest the minimum. Fermat guarantees that an interior extremum is stationary or non-differentiable, so anything else must be an endpoint.

Example 1: $f(x)=x^3-3x+1$ on $[-2,2]$. Here $f'=3(x-1)(x+1)$, so the stationary points are $x=\pm1$ and there are no others.

| Candidate | $x$ | $f(x)$ | Role |
| --- | --- | --- | --- |
| left endpoint | $-2$ | $-1$ | minimum |
| stationary | $-1$ | $3$ | local maximum |
| stationary | $1$ | $-1$ | local minimum |
| right endpoint | $2$ | $3$ | maximum |

The maximum $3$ occurs at $x=-1$ and at $x=2$; the minimum $-1$ occurs at $x=1$ and at $x=-2$. The maximum sits at a stationary point and an endpoint alike, which is why endpoints must be listed.

Example 2: $f(x)=x^{2/3}$ on $[-1,1]$. Its derivative $f'(x)=\dfrac23x^{-1/3}$ does not exist at $0$, is negative for $x<0$, and positive for $x>0$. So $f$ decreases on $[-1,0]$ and increases on $[0,1]$. The candidates give

$$
f(-1)=1,\qquad f(0)=0,\qquad f(1)=1.
$$

The minimum $0$ is attained at the non-differentiable point, the maximum $1$ at both endpoints. There is no stationary point at all: a search restricted to $f'=0$ returns nothing.

Open and infinite intervals have no endpoints, so monotonicity and boundary limits take over. For $f(x)=x+\dfrac1x$ on $(0,+\infty)$, $f'=1-\dfrac1{x^2}$ has the single zero $x=1$, and $f''(1)=2>0$, so the minimum is $f(1)=2$; both ends tend to $+\infty$, so there is no maximum.

## Boundary cases

- **Endpoints**: Fermat does not apply, so an endpoint can be the maximum without being stationary.
- **Corners and cusps**: $|x|$ and $x^{2/3}$ have local minima at $0$ where they are not differentiable; $x^{1/3}$ has an infinite slope there but is not extremal.
- **All higher derivatives vanish**: $x^4$ and $x^6$ still have minima, $x^3$ and $x^5$ do not.
- **Infinite intervals**: limits at $\pm\infty$ replace the endpoint comparison.

## Four misconceptions

> [!MYTH] Any $0/0$ form can be handled by L'Hôpital.
> The rule also needs $g'(x)\ne0$ and an existing limit of the derivative ratio. For $\dfrac{x+\sin x}{x}$ as $x\to\infty$ the ratio oscillates and the rule fails, while the limit is $1$.

> [!MYTH] $f'(x_0)=0$ means $x_0$ is an extremum.
> $f(x)=x^3$ has zero derivative at $0$ and is strictly increasing everywhere, so $0$ is not an extremum. A stationary point is a candidate, not a verdict.

> [!MYTH] Strict increase forces $f'>0$.
> $x^3$ is strictly increasing and $f'(0)=0$. Strict increase only gives $f'\ge0$; isolated zeros do not break monotonicity.

> [!MYTH] On a closed interval the maximum is at a stationary point.
> An endpoint can win: the maximum of $x^3-3x+1$ is at $x=2$, and the minimum of $x^{2/3}$ is at a non-differentiable point.

## Practice

> [!PRACTICE] 1 · Three rounds
> Find $\lim_{x\to0}\dfrac{e^x-1-x-\dfrac{x^2}{2}}{x^3}$.
>
> > [!ANSWER] Show answer
> > Every step is $0/0$: $\dfrac{e^x-1-x}{3x^2}$, then $\dfrac{e^x-1}{6x}$, then $\dfrac{e^x}{6}$, so the limit is $\dfrac16$. Taylor expansion gives the numerator $\sim\dfrac{x^3}{6}$.

> [!PRACTICE] 2 · Power form
> Find $\lim_{x\to0^+}x^x$.
>
> > [!ANSWER] Show answer
> > Let $y=x^x$. Then $\ln y=x\ln x\to0$, so $y\to1$.

> [!PRACTICE] 3 · Monotonicity
> Find the monotonicity intervals and extrema of $f(x)=xe^{-x}$.
>
> > [!ANSWER] Show answer
> > $f'=(1-x)e^{-x}$ with the single zero $x=1$. The function increases on $(-\infty,1]$ and decreases on $[1,+\infty)$, with a local maximum $\dfrac1e$ at $x=1$.

> [!PRACTICE] 4 · Second derivative test
> Find the extrema of $f(x)=x^4-2x^2$.
>
> > [!ANSWER] Show answer
> > $f'=4x(x^2-1)$ with zeros $0,\pm1$. Since $f''=12x^2-4$, $f''(0)<0$ gives a local maximum $0$, and $f''(\pm1)>0$ gives local minima $-1$.

> [!PRACTICE] 5 · Closed interval
> Find the maximum and minimum of $f(x)=x^3-3x$ on $[-2,3]$.
>
> > [!ANSWER] Show answer
> > $f'=3(x^2-1)$ with zeros $x=\pm1$. The candidates give $f(-2)=-2$, $f(-1)=2$, $f(1)=-2$, $f(3)=18$. The maximum is $18$ at $x=3$, the minimum $-2$ at $x=-2$ and $x=1$.

> [!PRACTICE] 6 · Optimisation
> A fence of length $20$ encloses a rectangle. Find the largest possible area.
>
> > [!ANSWER] Show answer
> > With sides $x$ and $10-x$, $S=x(10-x)$ on $0<x<10$. $S'=10-2x$ gives $x=5$ and $S''<0$, so the maximum area is $25$, attained by a square.

## Formal statement

> [!FORMAL] Formal statement
> **Cauchy's mean value theorem**: if $f,g$ are continuous on $[a,b]$, differentiable on $(a,b)$, and $g'\ne0$, then some $c\in(a,b)$ satisfies $[f(b)-f(a)]g'(c)=[g(b)-g(a)]f'(c)$.
>
> **L'Hôpital's rule**: if $f,g$ are differentiable near $x_0$ with $g'\ne0$, if $f,g\to0$ or both tend to $\pm\infty$ (with $|g|\to\infty$), and if $\lim f'/g'$ exists or is $\pm\infty$, then $\lim f/g$ equals it.
>
> **Monotonicity**: $f$ continuous on $I$, differentiable inside, and $f'>0$ there gives strict increase; $f'<0$ gives strict decrease.
>
> **Fermat's theorem**: a local extremum at an interior point where $f'$ exists forces $f'=0$.
>
> **Extremum tests**: $f'(x_0)=0$ with $f''(x_0)<0$ gives a strict local maximum; $f''(x_0)>0$ gives a strict local minimum.
>
> **Extreme value theorem**: a continuous function on $[a,b]$ attains its extrema, and the extremal points lie among stationary points, non-differentiable points, and endpoints.

## How this lecture connects

- **With Taylor's formula**: L'Hôpital compares first-order rates; when higher order decides, one Taylor expansion settles the same limits.
- **With inequality proofs**: to show $f\ge g$, build $h=f-g$ and use monotonicity plus one zero value.
- **With the definite integral**: estimates and average values rely on a continuous function attaining its extrema on a closed interval.

The next lecture moves on to concavity and Taylor's formula, where the two tests reappear in the language of the second derivative.
