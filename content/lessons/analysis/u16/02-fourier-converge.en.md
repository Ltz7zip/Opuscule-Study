---
slug: "fourier-converge"
subject: "analysis"
unit: "u16"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Convergence of Fourier Series"
subtitle: "Does the partial sum reach the function, or the average of its two sides?"
minutes: 16
meta: ["16 min read","Requires Fourier coefficients","Mastery level"]
concepts: ["fourier", "unifconv"]
prereq: ["fourier"]
related: ["fourier", "paramint"]
---

## Goals

By the end of this lecture you can write the partial sum as an integral against the Dirichlet kernel, state Dirichlet's convergence theorem, decide where a given series converges and to what value, and explain why continuity and uniform convergence are different requirements.

The previous lecture computed coefficients but never justified that the series returns the function. This lecture supplies that step.

## Three-line recap

- The partial sum $S_n(x)$ is an integral: $f$ convolved with the Dirichlet kernel.
- Dirichlet's theorem: for a piecewise monotone (or piecewise smooth) function, the series converges at each point to the average of the one-sided limits.
- Continuity gives pointwise convergence only; uniform convergence needs matching endpoints and piecewise smoothness.

## Partial sums and the Dirichlet kernel

Substituting the coefficient formulas into the partial sum and exchanging the finite sum with the integral,

$$S_n(x)=\frac{a_0}{2}+\sum_{k=1}^{n}\left(a_k\cos kx+b_k\sin kx\right)=\frac1\pi\int_{-\pi}^{\pi}f(x+t)\,D_n(t)\,dt,$$

where

$$D_n(t)=\frac12+\sum_{k=1}^{n}\cos kt=\frac{\sin\left(n+\frac12\right)t}{2\sin\frac t2}$$

is the **Dirichlet kernel**. The second equality is a trigonometric identity, not an approximation.

Two properties matter. First, $\frac1\pi\int_{-\pi}^{\pi}D_n(t)dt=1$: the constant term contributes $\pi$ and every cosine integrates to zero. Second, $\int_{-\pi}^{\pi}|D_n(t)|dt$ grows like $\ln n$. **The signed integral is fixed while the absolute integral diverges** — this is exactly why Fourier series are harder than power series.

## Dirichlet's theorem

> [!NOTE] Theorem
> Let $f$ be bounded and piecewise monotone (or piecewise smooth) on $[-\pi,\pi]$. Then for every $x$,
> $$S_n(x)\to\frac{f(x+)+f(x-)}{2},\qquad n\to\infty .$$

At a continuity point $f(x+)=f(x-)=f(x)$, so the series returns $f(x)$. At a jump it returns the midpoint of the two one-sided limits, regardless of the value assigned to $f$ there.

A corollary: if $f$ is continuous and $f(-\pi)=f(\pi)$, the series converges to $f$ everywhere on $[-\pi,\pi]$. The endpoint condition cannot be dropped; it is what makes the periodic extension continuous at the seam.

The proof idea is a concentration argument: the Dirichlet kernel's mass gathers near $t=0$, and away from $t=0$ the oscillation of $f(x+t)-f(x\pm)$ cancels the rapidly oscillating kernel.

## Jumps and the Gibbs phenomenon

For the square wave at $x=0$ the left limit is $-1$ and the right limit is $1$, so $S_n(0)\to0$. Every $S_n$ is a sine series, hence vanishes at $x=0$ exactly; no loss there.

Near the jump, however, there is **overshoot**: close to $x=\frac{\pi}{2n}$ the partial sum peaks at about $1.0895$, roughly $9\%$ above $1$. This is the **Gibbs phenomenon**. The overshoot does not vanish as $n$ grows; it merely narrows toward the jump. So the square wave's series converges pointwise but not uniformly.

## Conditions for uniform convergence

If $f$ is continuous on $[-\pi,\pi]$, $f(-\pi)=f(\pi)$, and $f$ is piecewise $C^1$, integration by parts gives

$$a_n=O\!\left(\frac1{n^2}\right),\qquad b_n=O\!\left(\frac1{n^2}\right).$$

Hence $\sum(|a_n|+|b_n|)$ converges, and the Weierstrass test makes the Fourier series **absolutely and uniformly** convergent to $f$. The smoother the function, the faster the coefficients decay.

A second standard tool is the **Riemann–Lebesgue lemma**: for any integrable $f$, $a_n\to0$ and $b_n\to0$. It controls the coefficients but says nothing about the sum.

| Hypothesis | Conclusion | Comment |
| --- | --- | --- |
| $f$ integrable | $a_n,b_n\to0$ | Riemann–Lebesgue |
| Piecewise monotone | Pointwise to the average of one-sided limits | Dirichlet |
| Continuous, matching endpoints | Pointwise to $f$ | Still needs Dirichlet's hypotheses |
| Continuous, matching endpoints, piecewise $C^1$ | Absolute and uniform | Coefficients $O(1/n^2)$ |

## Three misconceptions

> [!MYTH] A continuous function's Fourier series always converges uniformly to it.
> Continuity yields pointwise convergence only. Uniform convergence needs extra hypotheses such as matching endpoints and piecewise $C^1$; otherwise a Gibbs-type oscillation can persist.

> [!MYTH] At a jump the series converges to the value the function takes there.
> It converges to $\frac{f(x+)+f(x-)}{2}$. If $f$ is separately defined at the jump, the series does not notice.

> [!MYTH] The Gibbs overshoot is a numerical error that disappears with more terms.
> The peak stays at about $1.0895$ times the jump height. More terms narrow the overshoot region but do not lower it.

## Practice

> [!PRACTICE] 1 · Continuity point
> Where does the Fourier series of $f(x)=x$ converge at $x=\frac{\pi}{2}$?
>
> > [!ANSWER] Show answer
> > To $\frac{\pi}{2}$: the function is continuous there, so both one-sided limits equal the value.

> [!PRACTICE] 2 · Jump point
> Where does the square wave's series converge at $x=\pi$?
>
> > [!ANSWER] Show answer
> > The periodic extension has left limit $1$ and right limit $-1$, so the average is $0$. This matches $S_n(\pi)=0$ for every $n$.

> [!PRACTICE] 3 · Partial sum by hand
> For $f(x)=x$, compute $S_1\left(\frac{\pi}{2}\right)$ and compare with the true value.
>
> > [!ANSWER] Show answer
> > $S_1\left(\frac{\pi}{2}\right)=2\sin\frac{\pi}{2}=2$, while the true value is $\frac{\pi}{2}\approx1.571$; the error is about $0.43$. More terms help, but convergence near the endpoints is slow.

> [!PRACTICE] 4 · Uniform or not
> Is the Fourier series of $f(x)=|x|$ on $[-\pi,\pi]$ uniformly convergent?
>
> > [!ANSWER] Show answer
> > Yes. $f$ is continuous, $f(-\pi)=f(\pi)=\pi$, and it is smooth except at $0$, where it is still piecewise $C^1$. Its coefficients are $O(1/n^2)$, so the series converges absolutely and uniformly.

> [!FORMAL] Formal statement
> Let $f$ be bounded and piecewise monotone on $[-\pi,\pi]$, let $S_n$ be its Fourier partial sums, and let $D_n(t)=\frac12+\sum_{k=1}^{n}\cos kt$. Then $S_n(x)=\frac1\pi\int_{-\pi}^{\pi}f(x+t)D_n(t)dt$. Dirichlet's theorem asserts $S_n(x)\to\frac12[f(x+)+f(x-)]$ for every $x$, hence $S_n(x)\to f(x)$ at continuity points. If in addition $f$ is continuous, $f(-\pi)=f(\pi)$, and piecewise $C^1$, then $a_n,b_n=O(n^{-2})$ and the series converges absolutely and uniformly. For merely integrable $f$, $a_n,b_n\to0$ (Riemann–Lebesgue).
