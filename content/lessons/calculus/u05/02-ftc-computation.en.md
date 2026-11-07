---
slug: "ftc-computation"
subject: "calculus"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "The Fundamental Theorem and Computing Definite Integrals"
subtitle: "Differentiation and integration meet here"
minutes: 32
meta: ["32 min read","Requires the definition and properties","Mastery level"]
concepts: ["defint", "indefint"]
prereq: ["defint"]
related: ["impropint", "areavol", "mvt"]
---

## What this lecture sets out to do

The previous lecture defined the definite integral by cutting, approximating, summing, and taking a limit. That answered *what* the integral is, but not *how* to compute one. Going back to Riemann sums every time is expensive: even $\int_0^1x^{2}dx$ first requires the formula for the sum of squares. For an integrand such as $e^{-x^{2}}$, which has no elementary antiderivative, the summation route leads nowhere.

This lecture builds a bridge: **differentiating an accumulation function with respect to its upper limit gives back the integrand**. That bridge merges “find an area” with “find an antiderivative”, and it produces the Newton–Leibniz formula. By the end you should be able to:

- explain why the accumulation function is an antiderivative, and state its derivative;
- evaluate definite integrals with the Newton–Leibniz formula;
- change the limits when you substitute, or substitute back correctly;
- differentiate an integral whose two limits are both functions, without dropping the chain factor;
- recognise when an integral is really improper and handle it by a limit.

## Three lines back

- The accumulation function $\Phi(x)=\int_a^xf(t)\,dt$ is an antiderivative of $f$: when $f$ is continuous, $\Phi'(x)=f(x)$.
- Newton–Leibniz turns a definite integral into the difference of an antiderivative at the endpoints: $\int_a^bf(x)\,dx=F(b)-F(a)$.
- Substitution changes the limits too. If the interval is unbounded, or the integrand is unbounded, the integral is improper and must be defined by a limit.

## Why we cannot always return to the definition

Compute $\int_0^1x^{2}dx$ from the definition. Split the interval into $n$ equal parts and use right endpoints:

$$
S_n=\sum_{i=1}^{n}\left(\frac{i}{n}\right)^{2}\frac1n
=\frac{1}{n^{3}}\cdot\frac{n(n+1)(2n+1)}{6}
\longrightarrow\frac13.
$$

This already needs the sum of squares. For $x^{5}$ we would need the sum of fourth powers; for $e^{-x^{2}}$ there is no elementary antiderivative at all. Numerical work can approximate the value (Simpson's rule with $n=4$ gives about $0.7468$), but it cannot produce an antiderivative.

The fundamental theorem removes the bottleneck: once we find $F$ with $F'=f$, the area is the difference of $F$ at the endpoints. Geometrically, fix the left end $a$ and slide the right end $x$ to the right. The swept area grows, and its growth rate equals the height of the curve at the moving boundary. The next section makes that picture precise.

## The accumulation function

Let $f$ be continuous on $[a,b]$, and define

$$
\Phi(x)=\int_a^xf(t)\,dt.
$$

Here $x$ is the upper limit and the variable; $t$ is a dummy integration variable. We have $\Phi(a)=0$, and $\Phi(b)$ is the integral over the whole interval. For $x<a$ we set $\int_a^xf=-\int_x^af$, so that $\Phi$ is defined throughout the discussion.

For the general proof, take $h>0$:

$$
\Phi(x+h)-\Phi(x)=\int_x^{x+h}f(t)\,dt.
$$

By the mean value theorem for integrals, some $c\in[x,x+h]$ satisfies $\int_x^{x+h}f=f(c)h$. Hence

$$
\frac{\Phi(x+h)-\Phi(x)}{h}=f(c).
$$

As $h\to0^{+}$, the point $c$ is squeezed toward $x$, and continuity gives $f(c)\to f(x)$. The case $h<0$ is identical with the interval written as $[x+h,x]$. The two one-sided derivatives agree, so $\Phi'(x)=f(x)$.

A direct consequence: **every continuous function has an antiderivative**, and the accumulation function is an explicit construction. The antiderivative may not be expressible in elementary terms, but its existence no longer depends on guessing.

> [!NOTE]
> Continuity is essential. If $f$ has a jump, $\Phi$ is still continuous but may fail to be differentiable at the jump. Take $f(t)=\operatorname{sign}(t)$ and $a=-1$; then $\Phi(x)=|x|-1$, which has a corner at $x=0$. The theorem guarantees differentiability for continuous integrands, not for every integrable one.

## The Newton–Leibniz formula

Let $F$ be any antiderivative of $f$. By the previous section $\Phi$ is also an antiderivative, and two antiderivatives differ by a constant:

$$
(F-\Phi)'=f-f=0.
$$

Thus $F(x)=\Phi(x)+C$. Setting $x=a$ and using $\Phi(a)=0$ gives $C=F(a)$, so

$$
\int_a^bf(x)\,dx=\Phi(b)=F(b)-F(a).
$$

The notation is $\Big[F(x)\Big]_a^b$. The constant cancels, so any convenient antiderivative will do.

### Example 1: an exponential with a square

$$
\int_0^1xe^{x^{2}}dx.
$$

Since $x$ is half the derivative of $x^{2}$, an antiderivative is $\frac12e^{x^{2}}$. Therefore

$$
\int_0^1xe^{x^{2}}dx=\frac12\left(e-1\right)\approx0.8591.
$$

The substitution $u=x^{2}$ gives $du=2x\,dx$ and leaves the limits $0,1$ unchanged, producing the same value.

### Example 2: a linear factor times a trigonometric factor

$$
\int_0^{\pi/2}x\sin x\,dx.
$$

Take $u=x$ and $dv=\sin x\,dx$, so $du=dx$ and $v=-\cos x$. An antiderivative is $-x\cos x+\sin x$, and

$$
\Big[-x\cos x+\sin x\Big]_0^{\pi/2}=(0+1)-(0+0)=1.
$$



## Substitution: change the limits or substitute back

Suppose $x=g(t)$, with $g'$ continuous, and as $t$ runs from $\alpha$ to $\beta$, the value $x$ moves monotonically from $a$ to $b$. Then

$$
\int_a^bf(x)\,dx=\int_\alpha^\beta f(g(t))g'(t)\,dt.
$$

There are two safe procedures. **Change the limits**: convert the endpoints to $t$-values at the same time, and never return to $x$. **Substitute back**: find an antiderivative in $t$, convert it back to $x$, and then use the original $x$-limits. The dangerous hybrid is to switch to $t$ but still plug in the old $x$-endpoints.

### Example 3: changing limits

$$
\int_0^{\ln2}\frac{e^{x}}{1+e^{x}}dx.
$$

Let $u=1+e^{x}$, so $du=e^{x}dx$. When $x=0$, $u=2$; when $x=\ln2$, $u=3$. Hence

$$
\int_2^3\frac{du}{u}=\Big[\ln u\Big]_2^3=\ln\frac32\approx0.4055.
$$

### Example 4: trigonometric substitution

$$
\int_0^a\sqrt{a^{2}-x^{2}}\,dx,\qquad a>0.
$$

Put $x=a\sin t$, so $dx=a\cos t\,dt$ and $t$ runs from $0$ to $\pi/2$:

$$
\int_0^{\pi/2}a^{2}\cos^{2}t\,dt=a^{2}\cdot\frac{\pi}{4}=\frac{\pi a^{2}}{4}.
$$

This is exactly the area of a quarter circle.

> [!NOTE]
> Substitution requires monotonicity. Using $u=x^{2}$ on $[-1,1]$ gives $x=\pm\sqrt u$, so the interval must be split at $0$ or one branch is lost. Split first, then substitute.

## Integration by parts

Integrating $(uv)'=u'v+uv'$ over $[a,b]$ and rearranging gives

$$
\int_a^bu\,dv=\Big[uv\Big]_a^b-\int_a^bv\,du.
$$

Compared with the indefinite version, the boundary term $\Big[uv\Big]_a^b$ is new. The usual order for choosing $u$ is “logarithm, inverse trigonometric, power, trigonometric, exponential”, with earlier entries preferred.

### Example 5: a logarithm

$$
\int_1^e\ln x\,dx
=\Big[x\ln x\Big]_1^e-\int_1^e1\,dx
=e-(e-1)=1.
$$

### Example 6: a cyclic integral

$$
I=\int_0^{\pi/2}e^{x}\sin x\,dx.
$$

One integration by parts gives $I=e^{\pi/2}-\int_0^{\pi/2}e^{x}\cos x\,dx$. A second one gives

$$
\int_0^{\pi/2}e^{x}\cos x\,dx=(0-1)+I.
$$

Substituting back, $I=e^{\pi/2}-(I-1)$, so $2I=e^{\pi/2}+1$ and

$$
I=\frac{e^{\pi/2}+1}{2}.
$$

The point of a cyclic integral is to treat the original integral as an unknown and solve for it. Boundary terms are still evaluated as usual.

## Symmetry and parity

If $f$ is continuous on $[-a,a]$, an odd $f$ has integral $0$, and an even $f$ has integral $2\int_0^af$. The proof substitutes $x=-t$ into $\int_{-a}^0f$.

$$
\int_{-1}^1\frac{x^{3}}{1+x^{2}}dx=0.
$$

No antiderivative is needed; parity gives the answer. Likewise,

$$
\int_{-2}^2\left(x^{4}+3x\right)dx=2\int_0^2x^{4}dx=\frac{64}{5}.
$$

The even part doubles and the odd part vanishes. Any function splits into an even and an odd part, and on a symmetric interval only the even part survives.

> [!NOTE]
> Parity applies only to intervals symmetric about $0$, and never across a singularity. The function $\frac1x$ is odd, but $\int_{-1}^1\frac{dx}{x}$ diverges as an improper integral; it is not $0$.

## Differentiating an integral with variable limits

If both limits are functions, split the integral at a fixed point and apply the chain rule:

$$
\frac{d}{dx}\int_{u(x)}^{v(x)}f(t)\,dt
=f(v(x))v'(x)-f(u(x))u'(x).
$$


$$
\frac{d}{dx}\int_0^{x^{2}}\sin t\,dt=\sin(x^{2})\cdot2x.
$$

$$
\frac{d}{dx}\int_x^{x^{2}}e^{t^{2}}dt
=e^{x^{4}}\cdot2x-e^{x^{2}}.
$$

It also computes limits:

$$
\lim_{x\to0}\frac{\int_0^x\sin t\,dt}{x^{2}}
=\lim_{x\to0}\frac{\sin x}{2x}=\frac12.
$$

> [!NOTE]
> If $x$ also appears inside the integrand, differentiating the upper limit alone is not enough. For example, $\frac{d}{dx}\int_0^1xf(t)\,dt=\int_0^1f(t)\,dt$, because here $x$ is constant relative to $t$ and can be pulled out before differentiating.

## Improper integrals: decide first, compute second

When the interval is unbounded or the integrand is unbounded, the integral is defined by a limit:

$$
\int_a^{+\infty}f=\lim_{b\to+\infty}\int_a^bf,\qquad
\int_a^bf=\lim_{\varepsilon\to0^{+}}\int_{a+\varepsilon}^bf.
$$

The first is the infinite-interval type, the second the endpoint-singularity type. The integral converges when the limit exists and is finite; otherwise it diverges. If the singularity lies inside the interval, split there and require every piece to converge.

The basic ruler is the $p$-integral:

| Integral | Converges | Diverges |
| --- | --- | --- |
| $\displaystyle\int_1^{+\infty}\frac{dx}{x^{p}}$ | $p>1$ | $p\le1$ |
| $\displaystyle\int_0^{1}\frac{dx}{x^{p}}$ | $p<1$ | $p\ge1$ |

For $p\ne1$, $\int_1^b x^{-p}dx=\dfrac{b^{1-p}-1}{1-p}$; only $p>1$ makes $b^{1-p}\to0$. For $p=1$ the integral is $\ln b$, which diverges.

$$
\int_1^{+\infty}\frac{dx}{x^{2}}=1,\qquad
\int_1^{+\infty}\frac{dx}{x}\ \text{diverges}.
$$

$$
\int_0^1\frac{dx}{\sqrt x}=2,\qquad
\int_0^1\frac{dx}{x}\ \text{diverges}.
$$

The classic interior-singularity trap is

$$
\int_{-1}^1\frac{dx}{x^{2}}.
$$

Do not apply the antiderivative blindly and get $-2$. Split at $0$; since $\int_0^1x^{-2}dx=\lim_{\varepsilon\to0^{+}}\left(\frac1\varepsilon-1\right)=+\infty$, the whole integral diverges.

The comparison test reduces a new integral to a known one: if $0\le f\le g$ and $\int g$ converges, then $\int f$ converges; if $\int f$ diverges, then $\int g$ diverges. For instance, $\frac{1}{x^{2}+1}\le\frac{1}{x^{2}}$, so $\int_1^{+\infty}\frac{dx}{x^{2}+1}$ converges.

## A decision table

Before computing, ask three questions: is there a composite structure? is the interval symmetric? is anything unbounded?

| Integrand | First method | Check |
| --- | --- | --- |
| composite, inner derivative present | substitution | change limits or substitute back, never both |
| polynomial times exponential, trigonometric, or logarithm | parts | do not drop the boundary term $\big[uv\big]_a^b$ |
| symmetric interval about $0$ | parity | interval must be symmetric; handle singularities separately |
| functional upper limit | differentiate the limit | one term for each limit, with chain factors |
| unbounded interval or integrand | improper integral | split at singularities, then take limits |
| rational function | partial fractions | divide first to lower the degree |

Above all: **check improperness before looking for an antiderivative**. Substituting endpoints across an interior singularity produces a wrong number.

## Four misconceptions

> [!MYTH] A definite integral is the area under the curve.
> It is a signed sum. Below the $x$-axis the contribution is negative. $\int_0^{2\pi}\sin x\,dx=0$, while the two enclosed areas total $4$.

> [!MYTH] Substitution changes the integrand but not the limits.
> Limits refer to the original variable. Keeping $x$-limits after switching to $u$ mixes two coordinate systems.

> [!MYTH] To differentiate an accumulation function, just plug in the upper limit.
> If the upper limit is $x^{2}$, the factor $2x$ is required. Dropping the chain factor is the most common error here.

> [!MYTH] Once an antiderivative exists, every integral can be evaluated by endpoints.
> Only if no singularity is crossed. Applying the antiderivative to $\int_{-1}^1\frac{dx}{x^{2}}$ gives $-2$, but the integral diverges.

## Practice

> [!PRACTICE] 1 · Polynomial
> Evaluate $\displaystyle\int_0^1\left(3x^{2}+2x+1\right)dx$.
>
> > [!ANSWER] Show answer
> > An antiderivative is $x^{3}+x^{2}+x$, so the value is $3$.

> [!PRACTICE] 2 · Trigonometric
> Evaluate $\displaystyle\int_0^{\pi/4}\sec^{2}x\,dx$.
>
> > [!ANSWER] Show answer
> > An antiderivative is $\tan x$, so the value is $\tan\frac{\pi}{4}-\tan0=1$.

> [!PRACTICE] 3 · Substitution
> Evaluate $\displaystyle\int_0^1\frac{x}{1+x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > Let $u=1+x^{2}$; the limits become $1$ and $2$, so the value is $\frac12\int_1^2\frac{du}{u}=\frac12\ln2$.

> [!PRACTICE] 4 · Piecewise
> Evaluate $\displaystyle\int_0^2|x-1|\,dx$.
>
> > [!ANSWER] Show answer
> > Split at $x=1$: $\int_0^1(1-x)dx+\int_1^2(x-1)dx=\frac12+\frac12=1$.

> [!PRACTICE] 5 · Variable limits
> Find $\dfrac{d}{dx}\displaystyle\int_{x^{2}}^{x^{3}}\sin t\,dt$.
>
> > [!ANSWER] Show answer
> > The upper limit contributes $3x^{2}\sin(x^{3})$, the lower limit contributes $-2x\sin(x^{2})$.

> [!PRACTICE] 6 · Improper
> Decide whether $\displaystyle\int_1^{+\infty}\frac{dx}{x^{2}+x}$ converges, and find its value if it does.
>
> > [!ANSWER] Show answer
> > Since $\frac{1}{x(x+1)}=\frac1x-\frac1{x+1}$, an antiderivative is $\ln\frac{x}{x+1}$. As $b\to+\infty$ this tends to $0$, so the value is $0-\ln\frac12=\ln2$.

## Formal statement

Let $f$ be continuous on $[a,b]$ and $\Phi(x)=\int_a^xf(t)\,dt$. Then $\Phi$ is differentiable on $[a,b]$ and $\Phi'(x)=f(x)$. If $F'=f$, then

$$
\int_a^bf(x)\,dx=F(b)-F(a).
$$

If $x=g(t)$ with $g'$ continuous, $g$ monotone, $g(\alpha)=a$, and $g(\beta)=b$, then

$$
\int_a^bf(x)\,dx=\int_\alpha^\beta f(g(t))g'(t)\,dt.
$$

If $u,v$ are differentiable and $f$ is continuous, then

$$
\int_a^bu\,dv=\Big[uv\Big]_a^b-\int_a^bv\,du
$$

and

$$
\frac{d}{dx}\int_{u(x)}^{v(x)}f(t)\,dt=f(v(x))v'(x)-f(u(x))u'(x).
$$

Improper integrals are defined by limits, and converge when those limits exist and are finite. Interior singularities must be split, and every piece must converge.

## How this lecture connects

- **To the definition of the integral**: the previous lecture said what an integral is; this one says how to compute it. Riemann sums still prove properties and estimate errors.
- **To geometric applications**: the next lecture writes area, volume, and arc length as definite integrals and then uses the formulas here. Substitution corresponds to a change of coordinates.
- **To differential equations**: integrating both sides of a separated equation is exactly the substitution and initial-condition work of this lecture.
- **To improper integrals**: series, probability densities, and unbounded regions all require a convergence decision first, and the $p$-integral is the standard ruler.

The real importance of the fundamental theorem is that it unifies accumulation with change. When you see $\int$, ask: is it computing a quantity, or a function? The two viewpoints will keep alternating.
