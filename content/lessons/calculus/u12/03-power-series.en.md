---
slug: "power-series"
subject: "calculus"
unit: "u12"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Advanced Mathematics · Mastery"
title: "Power Series"
subtitle: "Find the interval first, differentiate and integrate inside it"
minutes: 34
meta: ["34 min read","Requires positive-term and alternating series","Mastery level"]
concepts: ["powerseries", "series"]
prereq: ["series"]
related: ["taylor", "fourier", "posseries"]
---

## What you will get

Polynomials are the cheapest functions to compute: addition, multiplication, differentiation and integration all take finitely many operations, and evaluating one is substitution. Almost none of the functions we care about is a polynomial — $\ln x$, $\sin x$ and $e^{x}$ are not. A power series treats an "infinite polynomial" as a function representation, replacing finite computation by a limit of finite computations.

But an infinite polynomial must first mean something: infinitely many terms may fail to add up, and even when they do, differentiation, integration and multiplication need justification. So the core of this lecture is not "how to expand" but three questions:

- Where does a power series converge? The answer has a surprisingly rigid shape — always an interval symmetric about the centre;
- What happens at the endpoints? The radius formula governs only the interior, and conditional convergence appears precisely there;
- Which polynomial operations survive inside the interval? Termwise differentiation, termwise integration, addition and multiplication all work — but only inside.

Afterwards you should be able to find the domain of any power series, reduce an unfamiliar series to a geometric one by differentiating or integrating, and evaluate numerical series such as $\sum n/2^{n}$ from a known expansion.

Links: the previous lecture's tests are needed for every endpoint decision below; the next lecture systematises expanding a function into a power series — a Taylor series has coefficients prescribed by derivatives, and a Fourier series replaces $x^{n}$ by trigonometric functions.

## Three lines back

- Positive-term series are settled by comparison, ratio and root tests.
- An alternating series whose terms decrease to zero converges, with the remainder bounded by the next term.
- The geometric series $\sum_{n=0}^{\infty}x^{n}=\dfrac{1}{1-x}$ holds only for $|x|<1$.

## From polynomials to infinite polynomials

A series of the form

$$
\sum_{n=0}^{\infty}a_n(x-x_0)^{n}=a_0+a_1(x-x_0)+a_2(x-x_0)^{2}+\cdots
$$

is called a power series centred at $x_0$, with coefficients $a_n$. Every term is a polynomial and $S_N(x)$ has degree $N$, so a power series is a limit of polynomials.

That viewpoint carries a warning: polynomial properties do not pass to limits. Finitely many polynomials add to a polynomial, but infinitely many may diverge everywhere; polynomials differentiate termwise, but an infinite sum needs an argument. So each step below asks "why is this allowed".

Two basic examples fix the picture.

$\sum x^{n}$ converges to $\dfrac{1}{1-x}$ for $|x|<1$, and diverges for $|x|\ge1$ because the terms fail to tend to zero. The convergence set is an open interval.

$\sum \dfrac{x^{n}}{n!}$ converges for every $x$: the ratio test gives

$$
\left|\frac{a_{n+1}x^{n+1}}{a_nx^{n}}\right|=\frac{|x|}{n+1}\to0
$$

so eventually the ratio is below $1$ however large $x$ is. The convergence set is the whole line.

For $\sum n!\,x^{n}$ the ratio is $(n+1)|x|\to\infty$, so every $x\ne0$ diverges; at $x=0$ every term is zero and the sum is zero. The convergence set collapses to a single point.

Interval, whole line, single point — three shapes pointing to one conclusion: the convergence set is always an interval centred at $x_0$.

## Why the convergence set is an interval

**The idea behind Abel's theorem.** If the series converges at some point $x_1\ne x_0$, then it converges absolutely at every $x$ with $|x-x_0|<|x_1-x_0|$.

The proof uses one observation: the terms of a convergent series are bounded. Since $\sum a_n(x_1-x_0)^{n}$ converges, there is $M$ with

$$
|a_n|\,|x_1-x_0|^{n}\le M
$$

for all $n$. Put $q=\dfrac{|x-x_0|}{|x_1-x_0|}<1$. Then

$$
|a_n(x-x_0)^{n}|=|a_n|\,|x_1-x_0|^{n}q^{n}\le Mq^{n}
$$

and the right side is a convergent geometric series. By comparison, $\sum|a_n(x-x_0)^{n}|$ converges: **one convergent point forces absolute convergence at every point inside it**.

Running the same argument backwards: divergence at a point forces divergence at every point outside it, since otherwise the first half would make the inner point converge.

Hence the convergence set is an interval centred at $x_0$, extending symmetrically, absolutely convergent inside and divergent outside. Its half-length is the radius of convergence $R\in[0,+\infty]$. When $R=0$ only the centre converges; when $R=+\infty$ the series converges everywhere. The two endpoints $x_0\pm R$ lie outside the conclusion and must be tested separately — the dividing line this lecture keeps returning to.

> [!NOTE]
> The radius describes only the interior; the domain also needs the endpoints, and series with the same $R$ often differ there.

## Two ways to compute the radius

With the interval shape settled, only $R$ remains.

**Ratio formula.** If $\lim\left|\dfrac{a_{n+1}}{a_n}\right|$ exists or is $+\infty$, then

$$
R=\lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right|
$$

Reason: apply the ratio test to $\sum|a_n(x-x_0)^{n}|$; the ratio is $\left|\dfrac{a_{n+1}}{a_n}\right||x-x_0|$, which is below $1$ exactly when $|x-x_0|<R$.

**Root formula.** If $\lim\sqrt[n]{|a_n|}$ exists or is $+\infty$, then

$$
R=\frac{1}{\lim_{n\to\infty}\sqrt[n]{|a_n|}}
$$

In general, replacing the limit by the limit superior always works:

$$
R=\frac{1}{\limsup_{n\to\infty}\sqrt[n]{|a_n|}}
$$

This is the most general formula. The ratio test can fail while the root test succeeds: coefficients alternating $1,2,1,2,\dots$ have no ratio limit, but $\sqrt[n]{|a_n|}\to1$, so $R=1$.

| Method | Formula | Hypothesis | Failure mode |
| --- | --- | --- | --- |
| Ratio | $R=\lim\left|\dfrac{a_n}{a_{n+1}}\right|$ | the limit exists or is $+\infty$ | the ratio oscillates, e.g. coefficients contain $2+(-1)^{n}$ |
| Root | $R=1/\lim\sqrt[n]{|a_n|}$ | the limit exists or is $+\infty$ | use the limit superior instead |
| Limit superior | $R=1/\limsup\sqrt[n]{|a_n|}$ | always valid | none |

A practical shortcut: **substitution**. For $\sum a_n(2x)^{n}$, treat $2x$ as a single variable $t$, find the radius $R_t$ in $t$, then solve $|2x|<R_t$. This is safer than manipulating coefficients directly.

**Example.** For $\sum\dfrac{x^{n}}{n}$ we have $a_n=\dfrac1n$ and

$$
R=\lim_{n\to\infty}\frac{n+1}{n}=1
$$

so the interior is $(-1,1)$. Endpoints: at $x=1$ the series is harmonic and diverges; at $x=-1$ it is the alternating harmonic series, whose terms decrease to zero, so Leibniz gives convergence (conditionally). The domain is $[-1,1)$.

**Example.** For $\sum\dfrac{(x-1)^{n}}{n\,3^{n}}$, centred at $1$, $a_n=\dfrac{1}{n3^{n}}$ and

$$
R=\lim_{n\to\infty}\frac{(n+1)3^{n+1}}{n3^{n}}=3
$$

so $|x-1|<3$, that is $-2<x<4$. At $x=4$ the term is $\dfrac1n$ and the series diverges; at $x=-2$ the term is $\dfrac{(-1)^{n}}{n}$ and it converges. The domain is $[-2,4)$.

| Series | $a_n$ | $R$ | Domain |
| --- | --- | --- | --- |
| $\sum x^{n}$ | $1$ | $1$ | $(-1,1)$ |
| $\sum \dfrac{x^{n}}{n}$ | $\dfrac1n$ | $1$ | $[-1,1)$ |
| $\sum \dfrac{x^{n}}{n^{2}}$ | $\dfrac1{n^{2}}$ | $1$ | $[-1,1]$ |
| $\sum \dfrac{x^{n}}{n!}$ | $\dfrac1{n!}$ | $+\infty$ | $\mathbb{R}$ |
| $\sum n!\,x^{n}$ | $n!$ | $0$ | $\{0\}$ |

The last two rows are the extremes: $R=+\infty$ leaves no endpoint to check, while $R=0$ collapses the interval to a point.

## Endpoints: the two points beyond the radius

Why must endpoints be tested separately? The radius formula comes from the ratio or root test, and both fail when the ratio equals $1$. Endpoints sit exactly at $|x-x_0|=R$, where the ratio is exactly $1$.

The table shows three possibilities: both endpoints converge ($\sum x^{n}/n^{2}$), only one does ($\sum x^{n}/n$ at $x=-1$), or neither does ($\sum x^{n}$). Endpoint analysis therefore returns to numerical series: substitute $x=x_0\pm R$ and apply the previous lecture's tools to each.

One trap: even when an endpoint converges, the operations valid inside — termwise differentiation, termwise integration, direct substitution into a sum formula — are not guaranteed there. That is the subject of the edge-case section.

## Sum functions: termwise differentiation and integration

Beyond where a series converges, we usually want to know what it converges to. Direct summation is hopeless, but a power series permits two operations that move the coefficient:

$$
\left(\sum_{n=0}^{\infty}a_n x^{n}\right)'=\sum_{n=1}^{\infty}n a_n x^{n-1},\qquad
\int_0^{x}\left(\sum_{n=0}^{\infty}a_n t^{n}\right)dt=\sum_{n=0}^{\infty}\frac{a_n}{n+1}x^{n+1}
$$

The radius is unchanged. Differentiation multiplies coefficients by $n$, integration divides them by $n+1$, so a factor $n$ in a denominator can be created or destroyed, turning an unfamiliar series back into a geometric one.

**Why it holds.** Termwise differentiation is not free: finite sums differentiate term by term, infinite sums do not, because errors can be amplified. The proof works on a closed interval $[x_0-r,x_0+r]$ lying strictly inside, with $r<R$. Choose $\rho$ with $r<\rho<R$. Since $\sum|a_n|\rho^{n}$ converges, $|a_n|\rho^{n}\le M$, and for $|x-x_0|\le r$,

$$
|n a_n(x-x_0)^{n-1}|\le \frac{M}{\rho}\cdot n\left(\frac{r}{\rho}\right)^{n-1}
$$

The right side is summable in $n$ (ratio $r/\rho<1$), so the differentiated series converges uniformly on $[x_0-r,x_0+r]$. Uniform convergence lets the limit and the derivative commute, and since $r<R$ was arbitrary, the conclusion holds throughout the interior.

The proof also explains three things: the radius does not change; the conclusion is interior only, since $r<R$ was used; and the error amplification worsens as the endpoints are approached.

The standard results all come from the geometric series:

$$
\sum_{n=0}^{\infty}x^{n}=\frac{1}{1-x},\qquad
\sum_{n=1}^{\infty}n x^{n-1}=\frac{1}{(1-x)^{2}},\qquad
\sum_{n=1}^{\infty}\frac{x^{n}}{n}=-\ln(1-x)
$$

all with radius $1$. Differentiating the first gives the second, integrating gives the third; multiplying the second by $x$ gives the handier form

$$
\sum_{n=1}^{\infty}n x^{n}=\frac{x}{(1-x)^{2}}
$$

## Worked example one: turning an unfamiliar series back into a geometric one

**Problem.** Compute $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2^{n}}$.

**Step 1, recognise a power series value.** Direct summation has no tool. But $\dfrac{n}{2^{n}}=n\left(\dfrac12\right)^{n}$, which is $\sum n x^{n}$ evaluated at $x=\dfrac12$. So find the sum function first, then substitute.

**Step 2, find the sum function.** Start from the geometric series

$$
\sum_{n=0}^{\infty}x^{n}=\frac{1}{1-x},\qquad |x|<1
$$

Differentiate:

$$
\sum_{n=1}^{\infty}n x^{n-1}=\frac{1}{(1-x)^{2}}
$$

Multiply by $x$:

$$
\sum_{n=1}^{\infty}n x^{n}=\frac{x}{(1-x)^{2}}
$$

**Step 3, substitute $x=\dfrac12$.** This is legitimate because $\dfrac12$ lies inside $(-1,1)$:

$$
\sum_{n=1}^{\infty}\frac{n}{2^{n}}=\frac{1/2}{(1/2)^{2}}=2
$$

**Step 4, check with partial sums.** $S_5=0.5+0.5+0.375+0.25+0.15625=1.78125$, increasing and staying below $2$.

The structure is worth memorising: numerical series, then power series, then sum function, then substitution — legal only because the point is interior.

## Arithmetic and composition

On a common interval, power series add and multiply like polynomials:

$$
\sum a_n x^{n}\pm\sum b_n x^{n}=\sum(a_n\pm b_n)x^{n}
$$

$$
\left(\sum_{n=0}^{\infty}a_n x^{n}\right)\left(\sum_{n=0}^{\infty}b_n x^{n}\right)
=\sum_{n=0}^{\infty}\left(\sum_{k=0}^{n}a_k b_{n-k}\right)x^{n}
$$

The inner sum is a convolution, obtained by collecting terms of equal degree in $a_kx^{k}\cdot b_{n-k}x^{n-k}$. This is legitimate because both series converge absolutely for $|x|<\min(R_1,R_2)$, and absolutely convergent series may be rearranged freely.

Both results have radius at least $\min(R_1,R_2)$, possibly larger: $\sum x^{n}$ plus $-\sum x^{n}$ is the zero series, with radius $+\infty$.

Composition $f(g(x))$ needs more: the values of $g$ must land inside the interval of $f$, that is $|g(x)-x_0|<R_f$, and the new radius usually comes from this inequality rather than from the smaller of two radii.

**Example.** $\sum\dfrac{(2x)^{n}}{n!}$. With $t=2x$, the expansion $e^{t}=\sum t^{n}/n!$ gives sum function $e^{2x}$ and radius $+\infty$. At $x=1$,

$$
\sum_{n=0}^{\infty}\frac{2^{n}}{n!}=e^{2}\approx7.389
$$

Treat $2x$ as one new variable: the $2^{n}$ affects each term's size, not the statement "converges for all $x$". Believing that $2^{n}$ forces radius $1$ is a standard error.

**Example.** $\sum\dfrac{x^{2n}}{n!}$ is $e^{t}$ composed with $t=x^{2}$, so its sum is $e^{x^{2}}$, radius $+\infty$.

## Worked example two: two derivatives and a numerical substitution

**Problem.** Find the sum function and domain of $\displaystyle\sum_{n=1}^{\infty}n^{2}x^{n}$, then compute $\displaystyle\sum_{n=1}^{\infty}\frac{n^{2}}{2^{n}}$.

**Step 1, build a ladder.** The target coefficient is $n^{2}$ while the geometric series has coefficient $1$. Each differentiation multiplies by $n$ but lowers the exponent, so multiply by $x$ after each differentiation to restore it:

$$
\sum_{n=0}^{\infty}x^{n}=\frac{1}{1-x},\qquad
\sum_{n=1}^{\infty}n x^{n}=x\cdot\frac{d}{dx}\frac{1}{1-x}=\frac{x}{(1-x)^{2}}
$$

**Step 2, differentiate again.**

$$
\sum_{n=1}^{\infty}n^{2}x^{n-1}
=\frac{d}{dx}\left(\frac{x}{(1-x)^{2}}\right)
=\frac{(1-x)^{2}+2x(1-x)}{(1-x)^{4}}
=\frac{1+x}{(1-x)^{3}}
$$

Multiply by $x$:

$$
\sum_{n=1}^{\infty}n^{2}x^{n}=\frac{x(1+x)}{(1-x)^{3}}
$$

**Step 3, domain.** Differentiation and multiplication by $x$ do not change the radius, and the original radius is $1$, so $R=1$. At $x=1$ the term $n^{2}$ does not tend to zero, so the series diverges; at $x=-1$ the term $(-1)^{n}n^{2}$ also fails, so it diverges. The domain is $(-1,1)$.

**Step 4, substitute.** With $x=\dfrac12$ inside the interval,

$$
\sum_{n=1}^{\infty}\frac{n^{2}}{2^{n}}
=\frac{\frac12\cdot\frac32}{\left(\frac12\right)^{3}}
=\frac{3/4}{1/8}=6
$$

**Check.** The first terms are $0.5+1+1.125+1+0.781+0.5625=4.97$, still climbing toward $6$.

## Edge cases

**$R=0$ and $R=+\infty$.** When $R=0$ the domain collapses to the single point $\{x_0\}$, as for $\sum n!\,x^{n}$, and endpoints are meaningless; when $R=+\infty$ there are no endpoints and the domain is the whole line, as for $\sum x^{n}/n!$.

**Termwise differentiation can fail at endpoints.** $\sum\dfrac{x^{n}}{n^{2}}$ converges at both $x=\pm1$ (absolutely), but the differentiated series $\sum\dfrac{x^{n-1}}{n}$ is harmonic at $x=1$ and diverges. The original converges at the endpoint while its derivative does not, because the proof only used interior closed intervals.

**Termwise integration at an endpoint needs Abel's theorem.** For $\sum\dfrac{x^{n}}{n}=-\ln(1-x)$, can the sum function reach $-\ln2$ at $x=-1$? Termwise integration again covers only the interior. Abel's theorem says: if a power series converges at an endpoint, its sum function is continuous there. Hence

$$
\sum_{n=1}^{\infty}\frac{(-1)^{n}}{n}=\lim_{x\to-1^{+}}\big(-\ln(1-x)\big)=-\ln2
$$

Inside the interval, say at $x=-\dfrac12$, direct substitution gives $-\ln\dfrac32\approx-0.4055$ with no extra theorem.

**Shifting the centre changes only the centre.** For $\sum a_n(x-1)^{n}$ the radius is still determined by $a_n$; substituting $t=x-1$ is the safest route.

**Differentiation and integration preserve the radius but can change the endpoints.** $\sum1/n^{2}$ and $\sum1/n$ illustrate this, so endpoints must be re-tested after every operation.

## Four misconceptions

> [!MYTH] The radius of convergence is the length of the interval.
> $R$ is the distance from the centre to an endpoint, so the interval has length $2R$ when $R$ is finite. A radius of $3$ means an open interval of length $6$.

> [!MYTH] Once $R$ is known, the domain is known.
> Endpoints need their own test. $\sum x^{n}/n$ and $\sum x^{n}/n^{2}$ share $R=1$ but have domains $[-1,1)$ and $[-1,1]$.

> [!MYTH] A power series may be differentiated termwise at the endpoints.
> Termwise differentiation is guaranteed only inside the interval. $\sum x^{n}/n^{2}$ converges at $x=1$, yet $\sum x^{n-1}/n$ is harmonic there and diverges.

> [!MYTH] Whenever a series converges, its sum formula may be evaluated directly.
> Substitution requires an interior point; at an endpoint one needs Abel's theorem plus convergence there. $\sum x^{n}=1/(1-x)$ has a meaningful right side at $x=2$ while the left side diverges.

## Practice

> [!PRACTICE] 1 · Radius and endpoints
> Find the domain of $\displaystyle\sum_{n=1}^{\infty}\frac{x^{n}}{n\,2^{n}}$.
>
> > [!ANSWER] Show answer
> > $a_n=\dfrac{1}{n2^{n}}$ and $R=\lim\dfrac{(n+1)2^{n+1}}{n2^{n}}=2$, so the interior is $(-2,2)$. At $x=2$ the series is harmonic and diverges; at $x=-2$ it is alternating harmonic and converges. The domain is $[-2,2)$.

> [!PRACTICE] 2 · Sum a series
> Compute $\displaystyle\sum_{n=1}^{\infty}\frac{n}{3^{n}}$.
>
> > [!ANSWER] Show answer
> > From $\sum n x^{n}=\dfrac{x}{(1-x)^{2}}$ at $x=\dfrac13$, inside $(-1,1)$, the value is $\dfrac{1/3}{(2/3)^{2}}=\dfrac34$.

> [!PRACTICE] 3 · Termwise integration
> Compute $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n\,2^{n}}$.
>
> > [!ANSWER] Show answer
> > Put $x=\dfrac12$ in $\sum\dfrac{x^{n}}{n}=-\ln(1-x)$ for $|x|<1$ to get $-\ln\dfrac12=\ln2\approx0.6931$.

> [!PRACTICE] 4 · Substitution
> Find the domain of $\displaystyle\sum_{n=0}^{\infty}\frac{(x-2)^{n}}{3^{n}}$.
>
> > [!ANSWER] Show answer
> > Let $t=x-2$; the geometric series $\sum(t/3)^{n}$ converges for $|t|<3$, so $|x-2|<3$, that is $(-1,5)$. At $x=-1$ and $x=5$ the terms fail to tend to zero, so both endpoints diverge.

> [!PRACTICE] 5 · One differentiation
> Find the radius of $\displaystyle\sum_{n=1}^{\infty}\frac{n}{n+1}x^{n}$.
>
> > [!ANSWER] Show answer
> > $a_n=\dfrac{n}{n+1}\to1$, so the root formula gives $R=1/\lim\sqrt[n]{|a_n|}=1$. The ratio test agrees: $\left|\dfrac{a_{n+1}}{a_n}\right|=\dfrac{(n+1)^{2}}{n(n+2)}\to1$.

> [!PRACTICE] 6 · Working backwards
> Given $\displaystyle\sum_{n=0}^{\infty}\frac{x^{n}}{n!}=e^{x}$, compute $\displaystyle\sum_{n=0}^{\infty}\frac{n+1}{n!}$.
>
> > [!ANSWER] Show answer
> > Since $\dfrac{n+1}{n!}=\dfrac{1}{(n-1)!}+\dfrac{1}{n!}$ for $n\ge1$, the sum is $\sum_{n\ge1}\dfrac{1}{(n-1)!}+\sum_{n\ge0}\dfrac{1}{n!}=e+e=2e\approx5.4366$. Equivalently differentiate $\sum\dfrac{x^{n}}{n!}=e^{x}$, multiply by $x$, add the original series and set $x=1$.

> [!FORMAL] Formal statement
> Let $\sum a_n(x-x_0)^{n}$ be a power series and $R=1/\limsup\sqrt[n]{|a_n|}$, with the conventions $1/0=+\infty$ and $1/(+\infty)=0$. Then the series converges absolutely for $|x-x_0|<R$ and diverges for $|x-x_0|>R$; $R$ is the radius of convergence, and when $\lim|a_n/a_{n+1}|$ exists or is $+\infty$ it equals $R$. At the two endpoints $x=x_0\pm R$ the value must be substituted and the resulting numerical series tested separately. Inside $|x-x_0|<R$ the sum function is infinitely differentiable, termwise differentiation and integration are valid and preserve the radius; termwise differentiation generally fails at endpoints, while Abel's theorem restores continuity of the sum function at any endpoint where the series converges. If two series have radii $R_1$ and $R_2$, their sum and product may be formed termwise for $|x-x_0|<\min(R_1,R_2)$, with convolution coefficients in the product.

## Links to other lectures

- **Alternating series (previous lecture):** endpoint decisions are ordinary numerical series tests, and the value of $\sum x^{n}/n$ at $x=-1$ comes straight from the Leibniz test.
- **Taylor series (next lecture):** setting $a_n=\dfrac{f^{(n)}(x_0)}{n!}$ produces a Taylor series, and the radius formula and termwise differentiation results here apply unchanged.
- **Differential equations:** seeking a power-series solution and matching coefficients of equal powers is a standard method for linear equations.
- **Numerical computation:** inside the interval, partial sums give controllable approximations, with error of the order of the next term.
- **Improper integrals:** $\int_{0}^{1}\dfrac{\ln(1-x)}{x}dx$ can be evaluated via $\sum x^{n}/n$ and termwise integration, with legitimacy again depending on convergence.