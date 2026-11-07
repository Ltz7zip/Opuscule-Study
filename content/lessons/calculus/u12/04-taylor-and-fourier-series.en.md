---
slug: "taylor-and-fourier-series"
subject: "calculus"
unit: "u12"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Advanced Mathematics · Mastery"
title: "Expanding Functions into Power Series and Fourier Series"
subtitle: "One basis is powers, the other is trigonometric functions"
minutes: 36
meta: ["36 min read","Requires power series and Taylor's formula","Mastery level"]
concepts: ["taylor", "powerseries", "fourier"]
prereq: ["powerseries", "taylor"]
related: ["series", "fourier", "impropint"]
---

## What you will get

The previous lecture studied power series as objects: given coefficients, find the domain and sum. This lecture reverses the question: given a function, can it be written as a power series? If so, are the coefficients unique, and where does equality hold?

Splitting a function into infinitely many simple pieces admits two different bases:

- Powers $1,x,x^{2},\dots$ give the Taylor series, which describes local behaviour and takes its coefficients from derivatives.
- $1,\cos x,\sin x,\cos2x,\sin2x,\dots$ give the Fourier series, which describes periodic phenomena, takes its coefficients from integrals over one period, and handles discontinuities.

This lecture answers four questions:

- Why is an infinitely differentiable function not necessarily equal to its Taylor series, and what exactly is missing?
- How do we produce a new expansion without differentiating repeatedly?
- Where do the two Fourier coefficient integrals come from, and why are they not merely conventions?
- What does a Fourier series converge to at a jump, and how does that differ from the Taylor case?

Links: a Taylor series is the power series with $a_n=\dfrac{f^{(n)}(x_0)}{n!}$, so the previous lecture's results carry over unchanged; Fourier convergence reduces to numerical series tests.

## Three lines back

- Taylor's formula approximates a function by a polynomial of degree $n$, with the remainder measuring the error.
- Inside its interval of convergence a power series may be differentiated and integrated termwise, with the radius unchanged.
- The geometric series $\sum x^{n}=\dfrac{1}{1-x}$ for $|x|<1$ is the most used expansion.

## Why expand at all

Polynomials need only addition and multiplication; trigonometric functions are closed under differentiation and integration and describe oscillations naturally. Writing a function as an infinite sum of them replaces a hard function by a limit of easy ones.

The logical order changes, however. The previous lecture started from a series and asked what it converges to; here we start from a function and look for its series. Legitimacy is no longer automatic: we must decide the coefficients and then check that the series converges back to the function. The second step is usually skipped, and it is exactly where Taylor series fail.

## Taylor series: the gap between formal writing and equality

If $f$ is infinitely differentiable near $x_0$, we may formally write

$$
\sum_{n=0}^{\infty}\frac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}
=f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^{2}+\cdots
$$

the Taylor series of $f$ at $x_0$. "Formally" is the key word: differentiability lets us write the series, but neither convergence nor equality follows.

The equality holds exactly when the Taylor remainder tends to zero. Taylor's formula with the Lagrange remainder gives

$$
f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^{k}+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}
$$

where $\xi$ lies between $x_0$ and $x$. With $P_n$ the Taylor polynomial,

$$
f(x)-P_n(x)=R_n(x),\qquad |R_n(x)|\le\frac{M_{n+1}}{(n+1)!}|x-x_0|^{n+1}
$$

with $M_{n+1}$ an upper bound for $f^{(n+1)}$ on that interval. So "the expansion is valid" becomes a concrete estimate: can the factorial outrun the growth of the derivatives?

**Why the coefficients must be derivative values.** Suppose $f(x)=\sum a_n(x-x_0)^{n}$ holds on some interval. Differentiating $k$ times and setting $x=x_0$ kills every term except $n=k$, giving $f^{(k)}(x_0)=k!\,a_k$, hence $a_k=\dfrac{f^{(k)}(x_0)}{k!}$. An expansion, if it exists, is unique; the coefficients leave no freedom.

## Three standard expansions and their remainders

The Lagrange remainder verifies the three basic expansions directly, and the verification is the template for all remainder estimates.

**$e^{x}$.** At $0$ every derivative is $e^{x}$, so

$$
e^{x}=\sum_{n=0}^{\infty}\frac{x^{n}}{n!},\qquad |R_n(x)|\le\frac{e^{|x|}}{(n+1)!}|x|^{n+1}
$$

For fixed $x$ the factorial beats every exponential, so the expansion holds for all $x$.

**$\sin x$ and $\cos x$.** The derivatives cycle through $\pm\sin x$ and $\pm\cos x$, all bounded by $1$, so

$$
|R_n(x)|\le\frac{|x|^{n+1}}{(n+1)!}\to0
$$

for every $x$. Explicitly,

$$
\sin x=\sum_{n=0}^{\infty}\frac{(-1)^{n}x^{2n+1}}{(2n+1)!},\qquad
\cos x=\sum_{n=0}^{\infty}\frac{(-1)^{n}x^{2n}}{(2n)!}
$$

Only odd or only even powers appear, reflecting the symmetry of the functions.

> [!NOTE]
> The remainder estimate is only as good as $M_{n+1}$. If derivatives grow too fast, the right side may fail to tend to zero even though the function is infinitely differentiable.

## A counterexample: smooth does not mean expandable

Consider

$$
f(x)=\begin{cases}e^{-1/x^{2}},&x\ne0\\[2pt]0,&x=0\end{cases}
$$

Every derivative at $0$ exists and equals zero: for $x\ne0$, $f^{(n)}(x)$ is $e^{-1/x^{2}}$ times a rational function, which the exponential crushes as $x\to0$. Hence its Taylor series at $0$ is identically $0$, while $f(x)>0$ for every $x\ne0$.

The point is not that the example is clever, but that **infinite differentiability only lets you write the series down**. What is needed is the remainder estimate, and here $R_n(x)=f(x)-0=f(x)$ does not tend to zero.

Failure can also come from singularities. $\dfrac{1}{1+x^{2}}$ is infinitely differentiable on the real line, yet its Taylor series at $0$ is $\sum(-1)^{n}x^{2n}$, with radius $1$: the series diverges for $|x|>1$ although the function is perfectly smooth. The reason lies in the complex plane, where $\pm i$ are poles at distance $1$ from the origin.

So the radius of a power series is governed by the nearest singularity, and that singularity may be off the real axis. This is also why an expansion domain is always an interval centred at the expansion point.

## Indirect expansion: building from five basic series

Differentiating repeatedly is rarely efficient. The faster route starts from five basic expansions and applies substitution, multiplication by constants, termwise differentiation and termwise integration. Every step is legitimate as long as it stays inside the domain of convergence.

| Function | Expansion | Domain |
| --- | --- | --- |
| $e^{x}$ | $\sum\dfrac{x^{n}}{n!}$ | $\mathbb{R}$ |
| $\sin x$ | $\sum\dfrac{(-1)^{n}x^{2n+1}}{(2n+1)!}$ | $\mathbb{R}$ |
| $\cos x$ | $\sum\dfrac{(-1)^{n}x^{2n}}{(2n)!}$ | $\mathbb{R}$ |
| $\dfrac{1}{1-x}$ | $\sum x^{n}$ | $\lvert x\rvert<1$ |
| $\ln(1+x)$ | $\sum\dfrac{(-1)^{n-1}x^{n}}{n}$ | $-1<x\le1$ |

The five base expansions support five kinds of manipulation: substitution (replace $x$ by $g(x)$), multiplication by constants, termwise differentiation, termwise integration, and partial fractions reducing to the geometric series. Two rules matter most:

- **Substitution**: put $t=g(x)$ in $\sum a_n t^{n}$ to get $\sum a_n g(x)^{n}$; the domain is obtained by solving $|g(x)|<R$, which is generally not the old interval.
- **Differentiation and integration**: coefficients gain or lose factors of $n$, the radius is unchanged, but the endpoints may change.

## Worked example one: when you cannot integrate, expand first

**Problem.** Expand $e^{-x^{2}}$, use the expansion to approximate $\displaystyle\int_0^1 e^{-x^{2}}dx$, and bound the error.

**Step 1, substitute.** In $e^{t}=\sum\dfrac{t^{n}}{n!}$ put $t=-x^{2}$:

$$
e^{-x^{2}}=\sum_{n=0}^{\infty}\frac{(-1)^{n}x^{2n}}{n!}
=1-x^{2}+\frac{x^{4}}{2}-\frac{x^{6}}{6}+\cdots
$$

The domain is still the whole line, because $t=-x^{2}$ ranges over $(-\infty,0]$, inside the domain of $e^{t}$.

**Step 2, integrate termwise.** Termwise integration on $[0,1]$ is legitimate inside the interval of convergence:

$$
\int_0^1 e^{-x^{2}}dx=\sum_{n=0}^{\infty}\frac{(-1)^{n}}{n!\,(2n+1)}
=1-\frac13+\frac1{10}-\frac1{42}+\frac1{216}-\cdots
$$

**Step 3, take four terms.** $1-0.333333+0.1-0.023810=0.742857$, while the true value is about $0.746824$, so the error is about $0.004$.

**Step 4, bound the error.** The series is alternating with terms $\dfrac{1}{n!(2n+1)}$ decreasing to zero, so by Leibniz the truncation error is at most the first omitted term $\dfrac{1}{4!\cdot9}=\dfrac{1}{216}\approx0.00463$. The actual error lies inside that bound.

The pattern: the antiderivative is not elementary, so expand first; each term then integrates to a power, and error control returns to numerical series.

## Worked example two: partial fractions and the geometric series

**Problem.** Expand $\dfrac{1}{2-x}$ and $\dfrac{x}{(2-x)^{2}}$ at $x=0$, and state the domains.

**Step 1, factor out the constant.** Write the denominator as $2(1-x/2)$:

$$
\frac{1}{2-x}=\frac12\cdot\frac{1}{1-x/2}=\frac12\sum_{n=0}^{\infty}\left(\frac{x}{2}\right)^{n}
=\sum_{n=0}^{\infty}\frac{x^{n}}{2^{n+1}}
$$

valid for $\left|\dfrac{x}{2}\right|<1$, that is $|x|<2$.

**Step 2, differentiate for the squared denominator.**

$$
\frac{1}{(2-x)^{2}}=\sum_{n=1}^{\infty}\frac{n x^{n-1}}{2^{n+1}}
$$

Multiply by $x$:

$$
\frac{x}{(2-x)^{2}}=\sum_{n=1}^{\infty}\frac{n x^{n}}{2^{n+1}},\qquad |x|<2
$$

**Step 3, check.** At $x=1$ the left side is $1$, while the right side is $\sum\dfrac{n}{2^{n+1}}=\dfrac12\sum\dfrac{n}{2^{n}}=\dfrac12\cdot2=1$, matching $\sum n/2^{n}=2$ from the previous lecture.

**Comparison.** With denominator $2+x$ the expansion gains a factor $(-1)^{n}$ but keeps the domain $|x|<2$: substitution $t=-x/2$ changes signs, not the radius.

## Edge cases

**The domain need not be symmetric.** The expansion of $\ln(1+x)$ converges at $x=1$ but diverges at $x=-1$, so its domain is $(-1,1]$; termwise integration often produces such half-open domains.

**Shift first, then re-solve the domain.** Expanding $\ln x$ at $x_0=1$ means putting $t=x-1$, which gives $0<x\le2$; substituting $t=x^{2}$ into $\dfrac{1}{1-t}$ gives $|x|<1$, narrower than $|t|<1$.

**A Taylor polynomial is not a Taylor series.** $P_n$ is always defined, while the series may diverge. For $e^{-1/x^{2}}$, every $P_n$ is zero, the series converges to zero, and the function is not zero: three distinct objects.

**Differentiation can cost an endpoint.** $\sum\dfrac{x^{n}}{n}$ diverges at $x=1$, and its sum function $-\ln(1-x)$ blows up there, another reminder that endpoints need separate treatment.

## Fourier series: projecting onto trigonometric functions

Power series describe a function near a point; Fourier series describe periodic behaviour. Let $f$ be $2\pi$-periodic and integrable on $[-\pi,\pi]$, and set

$$
a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx,\qquad
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx
$$

Then the Fourier series of $f$ is

$$
\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos nx+b_n\sin nx\right)
$$

**Where the formulas come from.** Orthogonality:

$$
\int_{-\pi}^{\pi}\cos mx\cos nx\,dx=\pi\delta_{mn},\qquad
\int_{-\pi}^{\pi}\sin mx\sin nx\,dx=\pi\delta_{mn},\qquad
\int_{-\pi}^{\pi}\sin mx\cos nx\,dx=0
$$

where $\delta_{mn}$ is $1$ when $m=n$ and $0$ otherwise. If $f$ is temporarily assumed equal to the series, multiplying by $\cos nx$ and integrating termwise leaves only the $a_n$ term, giving $a_n=\dfrac1\pi\int f\cos nx$. This is what projection means: $a_n$ and $b_n$ are the components of $f$ along the basis functions, exactly as coordinates are components of a vector along axes.

The factor $\dfrac{a_0}{2}$ is a normalisation: $a_0=\dfrac1\pi\int f$, so the constant term is the mean value of $f$ over a period.

**Symmetry removes half the work.** For an even function $b_n=0$ and only cosines survive; for an odd function $a_n=0$ and only sines survive. Square waves, triangle waves and sawtooth waves are all simplified this way.

| Type of function | $a_n$ | $b_n$ | Series |
| --- | --- | --- | --- |
| Even | possibly nonzero | $0$ | cosine series |
| Odd | $0$ | possibly nonzero | sine series |
| General | either | either | full series |

## Dirichlet's theorem: what the series converges to

**Dirichlet's theorem.** If $f$ is $2\pi$-periodic, piecewise monotone on $[-\pi,\pi]$ and has only finitely many discontinuities of the first kind, then its Fourier series converges everywhere: to $f(x)$ at continuity points, and to $\dfrac{f(x^{+})+f(x^{-})}{2}$ at jumps.

Contrast with Taylor: a convergent Taylor series converges to $f$ itself. A Fourier series at a jump converges to the average of the one-sided limits, which may differ from the value assigned to $f$ there, because integrals ignore single points.

**Uniform convergence.** If $f$ is continuous, $2\pi$-periodic and piecewise smooth, the series converges uniformly to $f$. Termwise integration is then allowed, but termwise differentiation generally is not: differentiating multiplies coefficients by $n$ and may destroy convergence.

## Worked example three: the square wave and π/4

**Problem.** Let $f(x)=-1$ for $-\pi<x<0$ and $f(x)=1$ for $0<x<\pi$, extended $2\pi$-periodically. Find its Fourier series and use it to evaluate $\sum\dfrac{(-1)^{n-1}}{2n-1}$.

**Step 1, parity.** $f$ is odd, so $a_n=0$ and only $b_n$ is needed.

**Step 2, compute $b_n$.**

$$
b_n=\frac1\pi\left[\int_{-\pi}^{0}(-1)\sin nx\,dx+\int_0^{\pi}(1)\sin nx\,dx\right]
=\frac{2}{n\pi}\left(1-(-1)^{n}\right)
$$

For even $n$ the bracket vanishes; for odd $n$ it equals $2$, so $b_n=\dfrac{4}{n\pi}$ for odd $n$ and $0$ for even $n$.

**Step 3, write the series.**

$$
f(x)\sim\frac4\pi\left(\sin x+\frac{\sin3x}{3}+\frac{\sin5x}{5}+\cdots\right)
$$

**Step 4, substitute $x=\dfrac{\pi}{2}$.** The point is a continuity point with $f\left(\dfrac{\pi}{2}\right)=1$, while $\sin\dfrac{n\pi}{2}$ runs through $1,0,-1,0,\dots$, so

$$
1=\frac4\pi\left(1-\frac13+\frac15-\frac17+\cdots\right)
$$

that is, $\dfrac{\pi}{4}=1-\dfrac13+\dfrac15-\cdots\approx0.7854$. This is the same series discussed with the Leibniz test in the previous lecture; here we obtain its sum.

**Step 5, look at the jumps.** At $x=0$ the one-sided limits are $-1$ and $1$, with average $0$, and every term equals $\sin0=0$, so the series indeed converges to $0$; similarly at $x=\pi$. Near a jump the partial sums overshoot by about $9\%$, and the overshoot never disappears — it only moves closer to the jump. This is the Gibbs phenomenon, showing that uniform convergence fails for discontinuous functions.

## Taylor versus Fourier: a comparison

| Item | Taylor series | Fourier series |
| --- | --- | --- |
| Basis | $1,x,x^{2},\dots$ | $1,\cos nx,\sin nx$ |
| Coefficients | derivatives at the expansion point | integrals over one period |
| Good for | smooth functions, local behaviour | periodic functions, global behaviour |
| Convergence condition | remainder tends to zero | piecewise monotone, finitely many jumps |
| At a jump | not applicable (smoothness needed) | average of the one-sided limits |
| Region | interval centred at the expansion point | the whole period, everywhere |
| Termwise differentiation | valid inside the interval | generally invalid |

## Four misconceptions

> [!MYTH] Any infinitely differentiable function equals its Taylor series.
> The remainder must tend to zero. For $e^{-1/x^{2}}$ all derivatives at $0$ vanish, the series is identically zero, and the function is not.

> [!MYTH] A Fourier series converges to $f(x)$ at every point.
> At a jump it converges to the average of the one-sided limits. For the square wave the series value at the jump is $0$, not $1$ or $-1$.

> [!MYTH] An expansion may be evaluated at any point whatsoever.
> Each expansion has its own domain. $\ln(1+x)$ converges at $x=1$ but diverges at $x=-1$; check the domain before substituting.

> [!MYTH] The Fourier coefficient formulas are arbitrary conventions.
> They are forced by orthogonality: multiply by a basis function and integrate, and every other term vanishes. A different normalisation rescales the coefficients but not the series.

## Practice

> [!PRACTICE] 1 · Termwise differentiation
> Differentiate the expansion of $\sin x$ termwise and write the expansion of $\cos x$.
>
> > [!ANSWER] Show answer
> > $\displaystyle\left(\sum\frac{(-1)^{n}x^{2n+1}}{(2n+1)!}\right)'=\sum\frac{(-1)^{n}x^{2n}}{(2n)!}$, which is the standard expansion of $\cos x$.

> [!PRACTICE] 2 · Integrating an expansion
> Use a series to approximate $\displaystyle\int_0^{1}\frac{\sin x}{x}dx$ with three terms.
>
> > [!ANSWER] Show answer
> > $\dfrac{\sin x}{x}=1-\dfrac{x^{2}}{6}+\dfrac{x^{4}}{120}-\cdots$, so termwise integration gives $1-\dfrac1{18}+\dfrac1{600}\approx0.9461$. The series is alternating and the error is at most the next term, $\dfrac{1}{7!\cdot7}\approx0.000028$.

> [!PRACTICE] 3 · Fourier coefficients
> Find $b_n$ for $f(x)=x$ on $[-\pi,\pi]$.
>
> > [!ANSWER] Show answer
> > $f$ is odd, so $a_n=0$; integration by parts gives $b_n=\dfrac{2(-1)^{n-1}}{n}$, hence $x\sim2\sum\dfrac{(-1)^{n-1}\sin nx}{n}$.

> [!PRACTICE] 4 · Expanding about another point
> Expand $\cos x$ at $x=\dfrac{\pi}{2}$.
>
> > [!ANSWER] Show answer
> > With $t=x-\dfrac{\pi}{2}$, $\cos x=\cos\left(t+\dfrac{\pi}{2}\right)=-\sin t=-\sum\dfrac{(-1)^{n}t^{2n+1}}{(2n+1)!}$, so $\cos x=-\left(x-\dfrac{\pi}{2}\right)+\dfrac{1}{6}\left(x-\dfrac{\pi}{2}\right)^{3}-\cdots$ for all $x$.

> [!PRACTICE] 5 · Partial fractions
> Expand $\dfrac{1}{x^{2}-3x+2}$ at $x=0$.
>
> > [!ANSWER] Show answer
> > $\dfrac{1}{x^{2}-3x+2}=\dfrac{1}{x-1}-\dfrac{1}{x-2}=\dfrac{1}{1-x}-\dfrac12\cdot\dfrac{1}{1-x/2}$, so the coefficient of $x^{n}$ is $1-\dfrac{1}{2^{n+1}}$ and the domain is $|x|<1$, limited by the nearer singularity at $x=1$.

> [!PRACTICE] 6 · Remainder estimate
> Using the Taylor polynomial of $e^{x}$ at $0$, how large must $n$ be to approximate $e^{0.1}$ with error below $10^{-4}$?
>
> > [!ANSWER] Show answer
> > $|R_n(0.1)|\le\dfrac{e^{0.1}}{(n+1)!}(0.1)^{n+1}$. For $n=2$ this is about $\dfrac{1.105}{6}\cdot10^{-3}\approx1.8\times10^{-4}$, still too large; for $n=3$ it is about $\dfrac{1.105}{24}\cdot10^{-4}\approx4.6\times10^{-6}$, small enough. So $n=3$.

> [!FORMAL] Formal statement
> Let $f$ be infinitely differentiable near $x_0$. If $\lim_{n\to\infty}R_n(x)=0$ for a given $x$, where $R_n$ is the Taylor remainder, then $f(x)=\sum_{n\ge0}\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^{n}$. With the Lagrange remainder, $R_n(x)=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ for some $\xi$ between $x_0$ and $x$; when the series converges, its sum is infinitely differentiable inside the interval and its radius is determined by the nearest singularity to $x_0$. If $f$ is $2\pi$-periodic, piecewise monotone on $[-\pi,\pi]$ and has finitely many discontinuities of the first kind, its Fourier series converges at every point, to $f(x)$ at continuity points and to $\dfrac{f(x^{+})+f(x^{-})}{2}$ at jumps; on intervals where $f$ is continuous and piecewise smooth the convergence is uniform. The Fourier coefficients are given by the Euler–Fourier formulas, whose uniqueness follows from orthogonality of the trigonometric system.

## Links to other lectures

- **Power series (previous lecture):** a Taylor series is the power series with $a_n=\dfrac{f^{(n)}(x_0)}{n!}$, so radius, termwise differentiation and termwise integration carry over.
- **Taylor's formula (mean value theorems):** the Lagrange remainder is exactly the error term derived there; this lecture pushes $n$ to infinity and asks whether the limit is zero.
- **Alternating series (Lecture 2):** the error bounds in example one and the $\pi/4$ series in example three both rely on the Leibniz test.
- **Improper integrals:** integrals such as $\int_0^1 e^{-x^{2}}dx$ that have no elementary antiderivative are evaluated by expansion, with error controlled by an alternating remainder.
- **Linear algebra:** Fourier coefficients are projections of a function onto an orthogonal basis, parallel to coordinates in a vector space.