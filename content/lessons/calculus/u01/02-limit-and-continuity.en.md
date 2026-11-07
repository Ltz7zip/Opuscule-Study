---
slug: "limit-and-continuity"
subject: "calculus"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Limits of Functions, Infinitesimals, and Continuity"
subtitle: "Turning approach into an inequality you can check"
minutes: 34
meta: ["34 min read","Requires sequence limits","Mastery level"]
concepts: ["funclim", "cont"]
prereq: ["seq"]
related: ["cont", "unifcont", "deriv"]
---

## What this lecture sets out to do

The previous lecture controlled error with the size of the index $n$. That device fails for functions: $x$ is not an integer, and it does not approach from a single direction. The control parameter has to become "how close $x$ is to $x_0$", which is exactly what $\varepsilon$-$\delta$ measures.

This lecture answers three questions in order: how a limit is defined, how a limit is computed, and how continuity is expressed through limits. The first decides whether a proof can be written, the second whether a calculation can be shortened, the third whether the objects of the rest of the course qualify at all — derivatives, mean value theorems, and definite integrals all rest on "the function is continuous".

By the end you should be able to produce a $\delta$ from a given $\varepsilon$; explain why the definition insists on $0<|x-x_0|$; decide whether a two-sided limit exists from the one-sided ones; compute multiplicative limits with equivalent infinitesimals and explain why that move fails in a sum; classify discontinuities; and state the three theorems for continuous functions on a closed interval together with counterexamples when a hypothesis is dropped.

## Three lines back

- A sequence limit asks whether the index is large enough; a function limit asks whether $x$ is close enough to $x_0$. One direction versus two.
- Only the punctured neighbourhood matters: whether $f$ is defined at $x_0$, and what value it takes, is irrelevant to the limit.
- Continuity is the equation that joins the limit to the value: $\lim_{x\to x_0}f(x)=f(x_0)$.

## Why function limits are harder

A sequence has one way of approaching: $n$ grows. A function has at least three: sliding in from the left, from the right, or alternating between the two while oscillating. The definition must handle all of them at once, so it describes no process, only an outcome: however $x$ arrives, once it enters the $\delta$-window the error must be suppressed.

| Comparison | Sequence limit | Function limit |
| --- | --- | --- |
| Variable | index $n$, increasing only | real $x$, from either side |
| Control | integer $N$ | real $\delta$ |
| Region | the tail $n>N$ | $0<\lvert x-x_0\rvert<\delta$ |
| Role of the point | every term counts | only nearby values count |
| Typical failure | $(-1)^n$ splits into two subsequences | $\sin\dfrac{1}{x}$ oscillates near $0$ |

Geometrically: draw an arbitrarily narrow horizontal strip $(A-\varepsilon,A+\varepsilon)$; you can always find a vertical strip of width $2\delta$ around $x_0$ such that the curve inside it, with the centre line removed, lies entirely in the horizontal strip. Your opponent chooses $\varepsilon$; you choose the window $\delta$.

## The ε-δ definition as an inequality

> Let $f$ be defined on a punctured neighbourhood of $x_0$. We say $\lim_{x\to x_0}f(x)=A$ if, for every $\varepsilon>0$, there is $\delta>0$ such that $0<|x-x_0|<\delta$ implies $|f(x)-A|<\varepsilon$.

The four ingredients each do work:

1. **For every $\varepsilon>0$** — $\varepsilon$ is chosen by the opponent; you may not pick a convenient one.
2. **There is $\delta>0$** — $\delta$ is yours, and it may depend on $\varepsilon$ and on $x_0$.
3. **$0<|x-x_0|<\delta$** — the strict inequality removes the centre, which is precisely why the limit ignores $f(x_0)$.
4. **$|f(x)-A|<\varepsilon$** — this says $f(x)$ lies in the $\varepsilon$-neighbourhood of $A$.

**Example 1 (linear).** Show $\lim_{x\to 1}(2x+3)=5$. The gap is $2|x-1|$, so $2\delta\le\varepsilon$ suffices and $\delta=\varepsilon/2$ works.

**Example 2 (quadratic, where a factor must be trapped first).** Show $\lim_{x\to 1}x^2=1$. The gap is $|x-1|\cdot|x+1|$, and the second factor is not constant. First impose $\delta\le 1$, which gives $0<x<2$ and hence $|x+1|<3$; then require $3\delta\le\varepsilon$. Take

$$
\delta=\min\left\{1,\ \frac{\varepsilon}{3}\right\}.
$$

Then $0<|x-1|<\delta$ gives $|x^2-1|<3\cdot\dfrac{\varepsilon}{3}=\varepsilon$. Trap the variable factor on a bounded range first, then control the main term: this two-step move is the standard technique.

The dependence of $\delta$ on $x_0$ matters. For $\varepsilon=0.01$, $\delta\approx0.0033$ suffices at $x_0=1$, but at $x_0=100$ the factor $|x+x_0|\approx200$ forces $\delta\approx0.00005$. One $\delta$ serving all $x_0$ is precisely the uniform continuity problem of the next lecture.

## One-sided limits and the two-sided criterion

The left limit $\lim_{x\to x_0^-}f(x)=A$ means: for every $\varepsilon>0$ there is $\delta>0$ such that $x_0-\delta<x<x_0$ implies $|f(x)-A|<\varepsilon$. The right limit replaces that inequality by $x_0<x<x_0+\delta$.

> $\lim_{x\to x_0}f(x)$ exists and equals $A$ exactly when both one-sided limits exist and equal $A$.

This is the cheapest test available. For $f(x)=\dfrac{|x|}{x}$ at $0$ the left limit is $-1$ and the right limit is $1$; for $f(x)=\lfloor x\rfloor$ at an integer $n$ they are $n-1$ and $n$; for $f(x)=e^{1/x}$ at $0$ the right limit is $+\infty$ and the left limit is $0$.

One-sided limits also explain the edge of a domain: $\sqrt{x}$ at $0$ admits only a right limit, whose value is $0$, so "$\sqrt{x}$ is continuous at $0$" means right-continuous.

## Limit laws and two important limits

> If $\lim f=A$ and $\lim g=B$ with $A,B$ finite, then $\lim(f\pm g)=A\pm B$, $\lim(fg)=AB$, and $\lim\dfrac{f}{g}=\dfrac{A}{B}$ when $B\ne0$.

The hypothesis that both limits exist and are finite cannot be dropped. The shapes $\infty-\infty$, $\dfrac{0}{0}$, and $0\cdot\infty$ are **indeterminate** and need separate treatment.

The first important limit is $\lim_{x\to0}\dfrac{\sin x}{x}=1$. The proof squeezes with areas: in the unit circle, a sector of angle $x$ has area $\dfrac{x}{2}$ and is trapped between triangles of area $\tfrac12\sin x$ and $\tfrac12\tan x$. Hence for $0<x<\dfrac{\pi}{2}$,

$$
\sin x<x<\tan x,
\quad\text{so}\quad
\cos x<\frac{\sin x}{x}<1.
$$

We also need $\cos x\to1$: from $|\sin t|\le|t|$,

$$
0\le 1-\cos x=2\sin^2\frac{x}{2}\le\frac{x^2}{2}.
$$

Squeezing gives $\dfrac{\sin x}{x}\to1$; the quotient is even, so the two one-sided limits agree and the two-sided limit exists.

The second important limit is $\lim_{x\to\infty}\left(1+\dfrac{1}{x}\right)^x=e$. Put $n=\lfloor x\rfloor$, so $n\le x<n+1$; both the base and the exponent shrink, hence

$$
\left(1+\frac{1}{n+1}\right)^{n}\le\left(1+\frac{1}{x}\right)^{x}\le\left(1+\frac{1}{n}\right)^{n+1}.
$$

Both ends tend to $e$, so the squeeze applies. With $t=1/x$ the same result reads $\lim_{t\to0}(1+t)^{1/t}=e$. These two are foundations rather than tricks: $(\sin x)'=\cos x$ uses the first, $(\ln x)'=1/x$ uses the second.

## Infinitesimals and equivalent replacement

If $\lim_{x\to x_0}\alpha(x)=0$, then $\alpha$ is called an infinitesimal. The definition mentions a limit, never a size: $x$, $\sin x$, and $1-\cos x$ are all infinitesimals as $x\to0$, whereas $10^{-100}$ is not — it is a constant whose limit is itself.

Two properties are used constantly: a finite sum of infinitesimals is infinitesimal, and **a bounded function times an infinitesimal is infinitesimal**, which is the squeeze theorem in disguise. Infinitesimals can also be compared. If $\alpha/\beta\to0$, then $\alpha$ is of higher order than $\beta$, written $\alpha=o(\beta)$; if $\alpha/\beta\to c\ne0$, they are of the same order; if $\alpha/\beta\to1$, they are equivalent, written $\alpha\sim\beta$.

Equivalent replacement rests on a theorem.

> If $\alpha\sim\alpha'$ and $\beta\sim\beta'$, with $\beta,\beta'$ nonzero near $x_0$, then $\lim\dfrac{\alpha}{\beta}=\lim\dfrac{\alpha'}{\beta'}$, provided the right-hand limit exists.

The proof splits the ratio into three factors, $\dfrac{\alpha}{\alpha'}\cdot\dfrac{\alpha'}{\beta'}\cdot\dfrac{\beta'}{\beta}$, the first and last tending to $1$. That proof also exposes the limits of the rule: $\alpha$ and $\beta$ must be replaced **as whole factors**; if $\alpha$ is merely one term of a sum, the outer factors no longer tend to $1$.

Standard equivalents as $x\to0$:

| Infinitesimal | Equivalent to | Why |
| --- | --- | --- |
| $\sin x,\ \tan x,\ \arcsin x,\ \arctan x$ | $x$ | first important limit |
| $1-\cos x$ | $\dfrac{x^{2}}{2}$ | $1-\cos x=2\sin^2\dfrac{x}{2}$ |
| $\ln(1+x)$ | $x$ | second important limit |
| $(1+x)^{\alpha}-1$ | $\alpha x$ | binomial expansion |
| $\tan x-\sin x$ | $\dfrac{x^{3}}{2}$ | $\tan x(1-\cos x)$ |

**Example 3 (where replacement fails).** Compute $\lim_{x\to0}\dfrac{\tan x-\sin x}{x^{3}}$. Replacing both terms by $x$ makes the numerator zero, which is wrong: the two leading terms cancel, and the surviving higher-order term is the real contribution. Factor first:

$$
\tan x-\sin x=\tan x(1-\cos x)\sim x\cdot\frac{x^{2}}{2}=\frac{x^{3}}{2}.
$$

The limit is $\dfrac12$. Rule: replace whole factors freely; for sums, combine into a product or carry the expansion further.

## Continuity: joining the limit back to the value

$f$ is continuous at $x_0$ when $\lim_{x\to x_0}f(x)=f(x_0)$. Three things must hold: the limit exists, $f(x_0)$ is defined, and the two agree.

An equivalent incremental form is $\lim_{\Delta x\to0}\Delta y=0$, where $\Delta y=f(x_0+\Delta x)-f(x_0)$. A third form is sequential: $f$ is continuous at $x_0$ exactly when $x_n\to x_0$ implies $f(x_n)\to f(x_0)$. Its main use is to **disprove** continuity, by exhibiting two sequences with different image limits.

Take $f(x)=\sin\dfrac1x$ for $x\ne0$ and $f(0)=0$. With $x_n=\dfrac{1}{2n\pi+\pi/2}\to0$ we get $f(x_n)=1\not\to0$, while $y_n=\dfrac{1}{n\pi}\to0$ gives $f(y_n)=0$. Two approaches, two answers: discontinuity.

Continuity propagates: basic elementary functions are continuous on their domains, as are sums, products, quotients with nonzero denominators, compositions, and inverses of strictly monotone continuous functions. So testing an elementary function at a point reduces to checking that the point lies in its domain: $\ln(\sin x)$ is continuous at $x=\dfrac{\pi}{2}$ and undefined at $x=0$.

## Four types of discontinuity

Only two questions matter: do the one-sided limits exist, and does the limit agree with the value?

| Type | Criterion | Example |
| --- | --- | --- |
| Removable | one-sided limits exist and agree, but the value is missing or different | $\dfrac{x^{2}-1}{x-1}$ at $1$ |
| Jump | both one-sided limits exist but differ | $\dfrac{\lvert x\rvert}{x}$ at $0$ |
| Infinite | at least one side tends to $\pm\infty$ | $\dfrac{1}{x}$ at $0$ |
| Oscillatory | no limit and no blow-up | $\sin\dfrac{1}{x}$ at $0$ |

Procedure: compute the one-sided limits (only the side that exists, if the function is defined on one side); if both are finite and equal, compare with $f(x_0)$ — missing or different means **removable**; if they differ, **jump**; if one side is infinite, **infinite**; otherwise **oscillatory**.

**Example 4.** Classify the discontinuities of $f(x)=\dfrac{x^{2}-1}{x^{2}-3x+2}$. The denominator factors as $(x-1)(x-2)$, so the suspects are $1$ and $2$; after cancelling, $f=\dfrac{x+1}{x-2}$ for $x\ne1,2$. At $x=1$ the limit is $-2$ while the function is undefined: removable, repaired by setting $f(1)=-2$. At $x=2$ the numerator is $3$ and the denominator vanishes, with the two sides going to $-\infty$ and $+\infty$: infinite.

## Three theorems on a closed interval

Let $f$ be continuous on $[a,b]$. Then:

1. **Boundedness**: some $M>0$ satisfies $|f(x)|\le M$ for all $x\in[a,b]$;
2. **Extreme values**: $f$ attains a maximum and a minimum on $[a,b]$;
3. **Intermediate value**: for every $c$ between $f(a)$ and $f(b)$ there is $\xi$ with $f(\xi)=c$; in particular, $f(a)f(b)<0$ guarantees a zero in $(a,b)$.

All three need both "closed" and "continuous", and each can be refuted separately:

- Drop "closed": $\dfrac{1}{x}$ is continuous on $(0,1]$ but unbounded; $x$ on $(0,1)$ is continuous but has no maximum, since the supremum $1$ is never attained.
- Drop "continuous": on $[0,1]$ set $f(x)=x$ for $0\le x<1$ and $f(1)=0$. The function is bounded but no maximum exists.
- The intermediate value property also needs continuity: on $[0,1]$ set $f=0$ for $x<\tfrac12$ and $f=1$ for $x\ge\tfrac12$. The value $\tfrac12$ is never taken.

The theorem most often proves that an equation has a root. For instance $g(x)=x-\cos x$ is continuous on $\left[0,\dfrac{\pi}{2}\right]$, with $g(0)=-1<0$ and $g\left(\dfrac{\pi}{2}\right)=\dfrac{\pi}{2}>0$, so some $\xi$ satisfies $\xi=\cos\xi$. Existence only; uniqueness needs derivatives.

## Boundary cases: where the definition stops applying

**First, $x_0$ must be a limit point of the domain.** If $x_0$ is isolated — say the function is defined only on the integers — the punctured neighbourhood contains no points of the domain, so the definition is vacuous and textbooks exclude such points.

**Second, infinity needs its own language.** $\lim_{x\to+\infty}f(x)=A$ reads: for every $\varepsilon>0$ there is $X>0$ such that $x>X$ implies $|f(x)-A|<\varepsilon$; the control parameter changes from $\delta$ to $X$. And $\lim_{x\to x_0}f(x)=+\infty$ describes divergence rather than a limit, so the limit laws do not apply.

## Four misconceptions

> [!MYTH] Continuous functions are differentiable.
> $f(x)=|x|$ is continuous at $0$, yet the one-sided difference quotients tend to $-1$ and $1$. Continuity is necessary for differentiability, not sufficient.

> [!MYTH] An infinitesimal is a very small number.
> It is a **variable** whose limit is zero. The only constant infinitesimal is $0$; $10^{-100}$ is a definite number whose limit is itself.

> [!MYTH] If the limit exists, the function is defined there.
> The limit inspects only a punctured neighbourhood. $\dfrac{x^{2}-1}{x-1}$ is undefined at $1$ yet has limit $2$. A removable discontinuity is exactly this situation.

> [!MYTH] Equivalent infinitesimals may be substituted inside sums.
> In $\tan x-\sin x$, replacing both terms by $x$ gives $0$, while the true limit of the quotient by $x^{3}$ is $\dfrac12$. The rule applies to whole factors only.

## Practice

> [!PRACTICE] 1 · Build a $\delta$
> Prove from the definition that $\lim_{x\to 2}(x^{2}+1)=5$.
>
> > [!ANSWER] Show answer
> > $|x^{2}-4|=|x-2||x+2|$. Imposing $\delta\le1$ gives $|x+2|<5$; then $\delta=\min\{1,\varepsilon/5\}$ works.

> [!PRACTICE] 2 · Replace
> Compute $\lim_{x\to 0}\dfrac{\sin 3x}{\tan 5x}$.
>
> > [!ANSWER] Show answer
> > The numerator is $\sim3x$ and the denominator $\sim5x$, both whole factors, so the limit is $\dfrac35$.

> [!PRACTICE] 3 · A power difference
> Compute $\lim_{x\to 0}\dfrac{(1+x)^{1/3}-1}{x}$.
>
> > [!ANSWER] Show answer
> > Use $(1+x)^{\alpha}-1\sim\alpha x$ with $\alpha=\dfrac13$; the limit is $\dfrac13$.

> [!PRACTICE] 4 · Classify
> Identify the type of discontinuity at $x=0$ for $f(x)=\dfrac{|x|}{x}$ and $g(x)=\sin\dfrac1x$.
>
> > [!ANSWER] Show answer
> > For $f$ the one-sided limits are $-1$ and $1$: a jump. For $g$ there is unbounded oscillation without blow-up: oscillatory.

> [!PRACTICE] 5 · Choose a parameter
> Let $f(x)=\dfrac{1-\cos x}{x^{2}}$ for $x\ne0$ and $f(0)=a$. Find $a$ making $f$ continuous at $0$.
>
> > [!ANSWER] Show answer
> > $\lim_{x\to0}\dfrac{1-\cos x}{x^{2}}=\dfrac12$, so $a=\dfrac12$.

> [!PRACTICE] 6 · A root
> Show that $x^{3}-4x+1=0$ has a solution in $(0,1)$.
>
> > [!ANSWER] Show answer
> > $g(x)=x^{3}-4x+1$ is continuous, with $g(0)=1>0$ and $g(1)=-2<0$; the intermediate value theorem gives a zero in $(0,1)$.

## Formal statement

> [!FORMAL] Limits, continuity, and the closed-interval theorems
> Let $f$ be defined on a punctured neighbourhood of $x_0$. Then $\lim_{x\to x_0}f(x)=A$ means: for every $\varepsilon>0$ there is $\delta>0$ with $|f(x)-A|<\varepsilon$ whenever $0<|x-x_0|<\delta$. If $f$ is defined on a full neighbourhood of $x_0$ and $\lim_{x\to x_0}f(x)=f(x_0)$, then $f$ is continuous at $x_0$, equivalently $\lim_{\Delta x\to0}\Delta y=0$.
>
> If $f$ is continuous on $[a,b]$, then $f$ is bounded; there exist $x_1,x_2\in[a,b]$ with $f(x_1)\le f(x)\le f(x_2)$ for all $x$; and for every $c$ between $f(a)$ and $f(b)$ there is $\xi\in[a,b]$ with $f(\xi)=c$.

## How this lecture connects

- **The $\varepsilon$-$\delta$ language** becomes uniform continuity next lecture, where $\delta$ may not depend on $x_0$; unit 2 uses it for the derivative, unit 5 for the definite integral.
- **Equivalent infinitesimals** underwrite the derivations of $(\sin x)'=\cos x$ and $(\ln x)'=1/x$, and lead the treatment of indeterminate forms in unit 3.
- **Continuity** is the hypothesis behind the mean value theorems, the extreme value theorem, and integrability.
- **Discontinuity types** are the first checkpoint when a piecewise function must be differentiated at its seam.

The next lecture removes the freedom in $\delta$: one $\delta$ must serve every point of the interval. That strengthening decides whether continuity survives limit operations, and it is the key to integrability.
