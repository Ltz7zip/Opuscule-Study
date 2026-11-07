---
slug: "lagrange-cauchy"
subject: "analysis"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Lagrange and Cauchy Mean Value Theorems"
subtitle: "Spreading an endpoint difference onto some interior point"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["mvt"]
prereq: ["mvt"]
related: ["mvt", "lhopital"]
---

## Goals

By the end of this lecture you can write the auxiliary-function proof of Lagrange's theorem, use it to prove monotonicity, constancy, and a family of inequalities, and explain why the extra denominator in Cauchy's theorem cannot be dropped.

Lagrange's theorem says the average rate over a stretch of road is realised exactly, at some instant, by the instantaneous rate. It ties the global to the local, and it is where the chapter starts doing real work.

## Three-line recap

- Rolle's theorem handles the special case of equal endpoint heights.
- In general the endpoints differ — but subtracting the chord joining them makes the ends equal again.
- That chord is the auxiliary function $L(x)=f(a)+\frac{f(b)-f(a)}{b-a}(x-a)$.

## Lagrange's mean value theorem

If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then some $\xi\in(a,b)$ satisfies

$$f(b)-f(a)=f'(\xi)(b-a).$$

Set $F(x)=f(x)-\dfrac{f(b)-f(a)}{b-a}(x-a)$. Then $F$ meets all three hypotheses of Rolle's theorem and $F(a)=F(b)=f(a)$, so some $\xi$ has $F'(\xi)=0$, which reads $f'(\xi)=\dfrac{f(b)-f(a)}{b-a}$.

A hand computation: $f(x)=\ln x$ on $[1,e]$. The left side is $\ln e-\ln 1=1$, and $f'(x)=1/x$, so $1=\frac{1}{\xi}(e-1)$ gives $\xi=e-1\approx 1.718$, comfortably inside $(1,e)$.

Note that the theorem only asserts existence. For $f(x)=x^2$ on $[0,1]$ the solution $\xi=1/2$ happens to be the midpoint; on $[0,2]$ the solution $\xi=1$ is not.

## Three immediate corollaries

| Corollary | Hypothesis | Conclusion |
| --- | --- | --- |
| Constant test | $f'\equiv 0$ on an interval | $f$ is constant there |
| Monotonicity test | $f'\ge 0$ (or $\le 0$) | $f$ is nondecreasing (or nonincreasing) |
| Lipschitz bound | $\|f'\|\le M$ | $\|f(x)-f(y)\|\le M\|x-y\|$ for all $x,y$ |

All three rest on one sentence: for $x<y$, apply Lagrange on $[x,y]$ to get $f(y)-f(x)=f'(\xi)(y-x)$, then read off the sign or the size of $f'(\xi)$.

Apply the second to $f(x)=x-\sin x$: $f'(x)=1-\cos x\ge 0$, so $f$ is nondecreasing, and since $f(0)=0$ we get $x\ge \sin x$ for $x\ge 0$.

Apply the third to $\sin$: $|\cos\xi|\le 1$ gives

$$|\sin x-\sin y|\le |x-y| ,$$

valid for all real $x,y$, because any two points can be fed into the theorem once.

## Cauchy's mean value theorem

If $f,g$ are continuous on $[a,b]$, differentiable on $(a,b)$, and $g'(x)\ne 0$ there, then some $\xi\in(a,b)$ satisfies

$$\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)} .$$

The construction is the same, with "subtract a chord in $x$" replaced by "subtract the linear interpolation of $f$ in terms of $g$":

$$F(x)=f(x)-f(a)-\frac{f(b)-f(a)}{g(b)-g(a)}\bigl(g(x)-g(a)\bigr).$$

Then $F(a)=F(b)=0$ and Rolle's theorem finishes. The denominator is safe: if $g(b)=g(a)$, Rolle would produce a zero of $g'$, contradicting $g'\ne 0$.

Taking $g(x)=x$ recovers Lagrange, so Lagrange is the special case; Cauchy simply swaps the independent variable for another ruler. That ruler is exactly what L'Hôpital's rule needs next lecture.

A computable example: $f(x)=x^2$, $g(x)=x^3$ on $[1,2]$. The left side is $(4-1)/(8-1)=3/7$, the right side is $2\xi/(3\xi^2)=2/(3\xi)$, hence $\xi=14/9\approx 1.556\in(1,2)$.

## Three misconceptions

> [!MYTH] The mean value theorem tells us where $\xi$ is.
> It does not. The theorem is purely existential and the proof constructs nothing. The same $f$ on a different interval puts $\xi$ elsewhere: $f(x)=x^2$ gives $\xi=1/2$ on $[0,1]$ and $\xi=1$ on $[0,2]$.

> [!MYTH] Cauchy's theorem is just a restatement of Lagrange's, with nothing new.
> Setting $g(x)=x$ does recover Lagrange, but Cauchy allows the denominator to come from $g'$, so it handles ratios $\frac{f(b)-f(a)}{g(b)-g(a)}$ of two increments. L'Hôpital's rule converts $\frac{0}{0}$ into a ratio of derivatives precisely this way.

> [!MYTH] Differentiability on $(a,b)$ is enough to apply Lagrange.
> Continuity on the closed interval $[a,b]$ is also required. $f(x)=1/x$ is differentiable on $(0,1)$ but unbounded near $0$, so $[0,1]$ is out of reach.

## Practice

> [!PRACTICE] 1 · Find $\xi$
> Write Lagrange's theorem for $f(x)=x^3$ on $[0,1]$ and solve for $\xi$.
>
> > [!ANSWER] Show answer
> > $f(1)-f(0)=1=f'(\xi)(1-0)=3\xi^2$, so $\xi=1/\sqrt{3}\approx 0.577\in(0,1)$.

> [!PRACTICE] 2 · Prove an inequality
> Prove that $e^x>1+x$ for every real $x\ne 0$.
>
> > [!ANSWER] Show answer
> > Let $f(t)=e^t$. Lagrange on the interval between $0$ and $x$ gives $e^x-1=e^{\xi}x$. If $x>0$ then $\xi>0$ and $e^{\xi}>1$, so $e^x-1>x$. If $x<0$ then $\xi<0$ and $e^{\xi}<1$; multiplying by the negative $x$ flips the inequality and again $e^x-1>x$. Equality holds only at $x=0$.

> [!PRACTICE] 3 · Constancy
> Suppose $f$ is differentiable on $(0,+\infty)$ with $f'(x)=0$. Prove $f$ is constant.
>
> > [!ANSWER] Show answer
> > Take $0<x<y$. Lagrange on $[x,y]$ gives $f(y)-f(x)=f'(\xi)(y-x)=0$, so $f(y)=f(x)$. Since $x,y$ were arbitrary, $f$ is constant.

> [!PRACTICE] 4 · Cauchy's theorem
> Verify Cauchy's theorem for $f(x)=\sin x$, $g(x)=\cos x$ on $[0,\pi/2]$.
>
> > [!ANSWER] Show answer
> > The left side is $\dfrac{1-0}{0-1}=-1$; the right side is $\dfrac{\cos\xi}{-\sin\xi}=-\cot\xi$. Setting $-\cot\xi=-1$ gives $\xi=\pi/4\in(0,\pi/2)$.

> [!FORMAL] Formal statement
> Lagrange: if $f\in C[a,b]$ and $f$ is differentiable on $(a,b)$, then there is $\xi\in(a,b)$ with $f(b)-f(a)=f'(\xi)(b-a)$. Cauchy: if $f,g\in C[a,b]$ are differentiable on $(a,b)$ and $g'(x)\ne 0$ throughout $(a,b)$, then there is $\xi\in(a,b)$ with $\bigl(f(b)-f(a)\bigr)g'(\xi)=\bigl(g(b)-g(a)\bigr)f'(\xi)$. Both proofs reduce to Rolle's theorem applied to a suitable auxiliary function.
