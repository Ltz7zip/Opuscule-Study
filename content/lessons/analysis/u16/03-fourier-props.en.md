---
slug: "fourier-props"
subject: "analysis"
unit: "u16"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Properties and Applications of Fourier Series"
subtitle: "Term-by-term integration, Parseval's identity, and two famous sums"
minutes: 16
meta: ["16 min read","Requires Fourier series","Mastery level"]
concepts: ["fourier"]
prereq: ["fourier"]
related: ["fourier", "unifconv"]
---

## Goals

By the end of this lecture you can build the cosine or sine series of a function defined on $(0,\pi)$, decide when term-by-term integration and differentiation are legal, and use Parseval's identity to evaluate a class of numerical series.

At this point the Fourier series stops being a representation device and becomes a computational tool.

## Three-line recap

- An odd extension produces a sine series; an even extension produces a cosine series. Choose by the endpoint behaviour you want.
- Term-by-term integration is almost always safe; term-by-term differentiation demands smoothness and matching endpoints.
- Parseval's identity converts an integral of $f^2$ into a sum of squared coefficients, and is the main engine for evaluating series.

## Even and odd extensions

When only the values on $(0,\pi)$ are given, the extension to $[-\pi,\pi]$ is not unique, and different extensions give different series.

**Even extension**, $f(-x)=f(x)$: then $b_n=0$ and

$$a_n=\frac{2}{\pi}\int_0^{\pi}f(x)\cos nx\,dx,\qquad n=0,1,2,\dots$$

This is the **cosine series**. Its periodic extension automatically has zero slope at $x=0$ (when differentiable), which is why it models an insulated endpoint.

**Odd extension**, $f(-x)=-f(x)$: then $a_n=0$ and

$$b_n=\frac{2}{\pi}\int_0^{\pi}f(x)\sin nx\,dx,\qquad n=1,2,\dots$$

This is the **sine series**, automatically zero at $x=0$; it models a fixed endpoint.

Take $f(x)=x$ on $(0,\pi)$. The even extension gives $a_0=\pi$ and $a_n=\frac{2}{\pi}\cdot\frac{(-1)^n-1}{n^2}$, so

$$x\sim\frac{\pi}{2}-\frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\cos(2k-1)x}{(2k-1)^2},$$

with odd cosine terms only. The odd extension returns $2\sum\frac{(-1)^{n+1}}{n}\sin nx$ from the previous lecture. Same function, two series, different speeds: coefficients are $O(1/n^2)$ for the cosine series and only $O(1/n)$ for the sine series.

## Term-by-term integration

> [!NOTE] Integration theorem
> Let $f$ be integrable on $[-\pi,\pi]$ with $f(x)\sim\frac{a_0}{2}+\sum(a_n\cos nx+b_n\sin nx)$. Then for every $x$,
> $$\int_0^{x}f(t)\,dt=\frac{a_0}{2}x+\sum_{n=1}^{\infty}\frac{a_n\sin nx+b_n(1-\cos nx)}{n},$$
> and the right-hand series converges uniformly on $[-\pi,\pi]$.

Note the hypothesis: **only integrability of $f$**, not convergence of the original series. Integration smooths the oscillations away and adds a factor $1/n$, which buys convergence.

The square wave's series fails to converge to $f$ at the jumps, yet term-by-term integration is still valid and the resulting series converges uniformly. This is what makes the operation so useful in computation.

## Term-by-term differentiation

Differentiation goes the other way: it multiplies coefficients by $n$ and needs much stronger hypotheses. If $f$ is continuous on $[-\pi,\pi]$, $f(-\pi)=f(\pi)$, piecewise $C^1$, and $f'$ is piecewise smooth, then

$$f'(x)\sim\sum_{n=1}^{\infty}\left(nb_n\cos nx-na_n\sin nx\right).$$

Matching endpoints cannot be dropped. If $f(-\pi)\ne f(\pi)$, the periodic extension jumps at the seam, and differentiation is guaranteed to fail.

Counterexample: $f(x)=x$ has the series $2\sum\frac{(-1)^{n+1}}{n}\sin nx$. Formal differentiation gives $2\sum(-1)^{n+1}\cos nx$, whose terms do not tend to zero, so the series diverges. The culprit is $f(-\pi)=-\pi\ne\pi=f(\pi)$. By contrast $f(x)=x^2$ has equal endpoint values and differentiating its series legally produces the cosine series of $2x$.

## Parseval's identity

> [!NOTE] Parseval's identity
> If $f$ is integrable and square-integrable on $[-\pi,\pi]$, then
> $$\frac1\pi\int_{-\pi}^{\pi}f^2(x)\,dx=\frac{a_0^2}{2}+\sum_{n=1}^{\infty}\left(a_n^2+b_n^2\right).$$

This is Pythagoras in function space: the squared length of $f$ equals the sum of the squared coordinates.

**Example 1 (Basel problem).** For $f(x)=x$ we have $a_0=a_n=0$ and $b_n=\frac{2(-1)^{n+1}}{n}$. The left side is $\frac1\pi\cdot\frac{2\pi^3}{3}=\frac{2\pi^2}{3}$ and the right side is $4\sum\frac1{n^2}$. Hence

$$\sum_{n=1}^{\infty}\frac1{n^2}=\frac{\pi^2}{6}\approx1.6449 .$$

**Example 2.** For the square wave the left side is $\frac1\pi\cdot2\pi=2$ and the right side is $\frac{16}{\pi^2}\sum_{k\ge1}\frac1{(2k-1)^2}$, so

$$\sum_{k=1}^{\infty}\frac1{(2k-1)^2}=\frac{\pi^2}{8}\approx1.2337 .$$

Subtracting gives $\sum\frac{(-1)^{n+1}}{n^2}=\frac{\pi^2}{12}$.

## Three misconceptions

> [!MYTH] The two extensions should give the same series.
> They agree only on $(0,\pi)$. On $[-\pi,0)$ they represent the even and the odd extension respectively — two genuinely different functions.

> [!MYTH] A Fourier series can be differentiated term by term whenever you like.
> Differentiation multiplies coefficients by $n$ and requires continuity, matching endpoints, and piecewise smoothness. The series of $f(x)=x$ differentiates into a divergent series.

> [!MYTH] Parseval's identity is an approximation.
> For square-integrable $f$ it is an exact equality. That exactness is precisely what turns $\sum1/n^2$ into the closed value $\pi^2/6$.

## Practice

> [!PRACTICE] 1 · Choose the extension
> You want a series for $f(x)=1$ on $(0,\pi)$ with zero derivative at $x=0,\pi$. Which extension?
>
> > [!ANSWER] Show answer
> > The even extension, giving a cosine series. Here $f\equiv1$ extends to the constant $1$, so $a_0=2$ and all other coefficients vanish.

> [!PRACTICE] 2 · Sine coefficients
> Compute $b_n$ for the sine series of $f(x)=1$ on $(0,\pi)$.
>
> > [!ANSWER] Show answer
> > $b_n=\frac2\pi\int_0^{\pi}\sin nx\,dx=\frac{2(1-\cos n\pi)}{n\pi}$, which is $\frac{4}{n\pi}$ for odd $n$ and $0$ for even $n$.

> [!PRACTICE] 3 · Parseval
> Use Parseval on the square wave to evaluate $\sum_{k\ge1}(2k-1)^{-2}$.
>
> > [!ANSWER] Show answer
> > $\frac1\pi\int_{-\pi}^{\pi}1\,dx=2=\frac{16}{\pi^2}\sum\frac1{(2k-1)^2}$, so the sum is $\frac{\pi^2}{8}$.

> [!PRACTICE] 4 · Differentiation condition
> Can the series of $f(x)=|x|$ be differentiated term by term to get the series of $f'$?
>
> > [!ANSWER] Show answer
> > Not on the whole interval: $f$ is not differentiable at $0$, so the piecewise-smooth hypothesis fails there. On $(-\pi,0)$ and on $(0,\pi)$ separately, term-by-term differentiation is legitimate.

> [!FORMAL] Formal statement
> Let $f$ be integrable on $(0,\pi)$. Its even extension has the cosine series with $a_n=\frac2\pi\int_0^{\pi}f(x)\cos nx\,dx$ ($n\ge0$) and $b_n=0$; its odd extension has the sine series with $b_n=\frac2\pi\int_0^{\pi}f(x)\sin nx\,dx$ ($n\ge1$) and $a_n=0$. For integrable $f$, the Fourier series may be integrated term by term, and the resulting series converges uniformly. If $f$ is continuous, $f(-\pi)=f(\pi)$, piecewise $C^1$, and $f'$ is piecewise smooth, term-by-term differentiation is valid. If $f$ is square-integrable, Parseval's identity $\frac1\pi\int_{-\pi}^{\pi}f^2=\frac{a_0^2}{2}+\sum(a_n^2+b_n^2)$ holds.
