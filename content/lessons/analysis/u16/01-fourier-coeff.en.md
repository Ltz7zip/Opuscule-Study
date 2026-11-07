---
slug: "fourier-coeff"
subject: "analysis"
unit: "u16"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Fourier Coefficients and Series"
subtitle: "Splitting a curve into infinitely many sine waves"
minutes: 15
meta: ["15 min read","Requires integrals with a parameter","Mastery level"]
concepts: ["fourier"]
prereq: ["paramint"]
related: ["fourier", "unifconv"]
---

## Goals

By the end of this lecture you can write down the orthogonality relations for the trigonometric system, derive the Euler–Fourier coefficient formulas yourself, and expand simple functions such as $f(x)=x$ and a square wave on $(-\pi,\pi)$.

Three moves: see why trigonometric functions are the right basis, compute the coefficients, then run the formula on two examples.

## Three-line recap

- A power series approximates a function near one point; a Fourier series decomposes it globally, by frequency.
- The key is orthogonality: on a full period, the product of two different frequencies integrates to zero.
- The coefficient formula $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx$ is exactly that orthogonality used as a filter.

## Orthogonality of the trigonometric system

Consider

$$1,\ \cos x,\ \sin x,\ \cos 2x,\ \sin 2x,\ \dots,\ \cos nx,\ \sin nx,\ \dots$$

on $[-\pi,\pi]$. The product of any two distinct members integrates to zero, while each member squared does not:

$$\int_{-\pi}^{\pi}\cos nx\cos mx\,dx=\begin{cases}0,&n\ne m,\\ \pi,&n=m\ne0,\end{cases}$$

$$\int_{-\pi}^{\pi}\sin nx\sin mx\,dx=\begin{cases}0,&n\ne m,\\ \pi,&n=m,\end{cases}\qquad \int_{-\pi}^{\pi}\cos nx\sin mx\,dx=0 .$$

The constant needs its own line: $\int_{-\pi}^{\pi}1^2dx=2\pi$, yet $\int_{-\pi}^{\pi}1\cdot\cos nx\,dx=0$.

All of it follows from the product-to-sum identity, for instance $\cos nx\cos mx=\frac12[\cos(n-m)x+\cos(n+m)x]$; each term integrates to zero over a complete period when $n\ne m$.

## Deriving the coefficient formulas

Suppose

$$f(x)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos nx+b_n\sin nx\right)$$

converges uniformly on $[-\pi,\pi]$. Uniform convergence is what licenses term-by-term integration — the preparation from the previous unit.

Integrating both sides over $[-\pi,\pi]$ kills everything except the constant:

$$\int_{-\pi}^{\pi}f(x)dx=\frac{a_0}{2}\cdot2\pi \quad\Longrightarrow\quad a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)dx .$$

Multiplying by $\cos kx$ and integrating leaves only the $n=k$ term:

$$a_k=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos kx\,dx,\qquad k=1,2,\dots$$

The same argument with $\sin kx$ gives

$$b_k=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin kx\,dx,\qquad k=1,2,\dots$$

> [!NOTE] Coefficients are projections
> Think of $f$ as a vector in an infinite-dimensional space where $\cos nx$ and $\sin nx$ form an orthogonal basis. The numbers $a_n,b_n$ are its coordinates; the factor $\frac1\pi$ is the squared length of a basis vector.

## Example one: f(x)=x

The function is odd, and $\cos nx$ is even, so $x\cos nx$ is odd and integrates to zero on a symmetric interval. Hence $a_0=a_n=0$ and only sines survive:

$$b_n=\frac1\pi\int_{-\pi}^{\pi}x\sin nx\,dx=\frac1\pi\left[-\frac{x\cos nx}{n}\right]_{-\pi}^{\pi}+\frac1\pi\int_{-\pi}^{\pi}\frac{\cos nx}{n}dx .$$

The second term vanishes; the first gives

$$b_n=\frac1\pi\left(-\frac{\pi\cos n\pi}{n}-\frac{\pi\cos n\pi}{n}\right)=\frac{2(-1)^{n+1}}{n}.$$

So

$$x\sim 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx=2\left(\sin x-\frac{\sin 2x}{2}+\frac{\sin 3x}{3}-\cdots\right),\qquad -\pi<x<\pi .$$

At $x=\frac{\pi}{2}$ the left side is $\frac{\pi}{2}$ and the right side is $2\left(1-\frac13+\frac15-\cdots\right)$, which yields the Leibniz series

$$\frac{\pi}{4}=1-\frac13+\frac15-\frac17+\cdots$$

The endpoints $x=\pm\pi$ are excluded: there the series is zero while the periodic extension jumps.

## Example two: a square wave

Take $f(x)=-1$ on $(-\pi,0)$ and $f(x)=1$ on $(0,\pi)$. It is odd, so $a_0=a_n=0$ and

$$b_n=\frac1\pi\left(\int_{-\pi}^{0}(-1)\sin nx\,dx+\int_{0}^{\pi}\sin nx\,dx\right)=\frac{2}{\pi}\int_0^{\pi}\sin nx\,dx=\frac{2(1-\cos n\pi)}{n\pi}.$$

For even $n$ the numerator is zero; for odd $n$ it equals two. Writing $n=2k-1$,

$$f(x)\sim\frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\sin(2k-1)x}{2k-1}=\frac{4}{\pi}\left(\sin x+\frac{\sin 3x}{3}+\frac{\sin 5x}{5}+\cdots\right).$$

Only odd harmonics appear, matching the symmetry of the wave about $x=\frac{\pi}{2}$. At $x=\frac{\pi}{2}$ the series gives $\frac{4}{\pi}\left(1-\frac13+\frac15-\cdots\right)=1$, the same Leibniz series as before — a useful cross-check.

## General period and a fixed routine

If $f$ has period $2l$, the substitution $t=\frac{\pi x}{l}$ reduces to $[-\pi,\pi]$:

$$f(x)\sim\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l}\right),$$

$$a_n=\frac1l\int_{-l}^{l}f(x)\cos\frac{n\pi x}{l}dx,\qquad b_n=\frac1l\int_{-l}^{l}f(x)\sin\frac{n\pi x}{l}dx .$$

The routine is always the same: check parity to halve the work, then compute $a_0$, $a_n$, $b_n$. Write "$\sim$" rather than "$=$": at this stage nothing has been proved about convergence — that is the next lecture.

## Three misconceptions

> [!MYTH] A Fourier expansion is just a sine series, essentially a Taylor series.
> The bases differ. Taylor uses $x^n$ to approximate near a point and demands smoothness; Fourier uses $\cos nx,\sin nx$ to split the whole interval by frequency and needs only integrability to define the coefficients.

> [!MYTH] The constant term is $a_0$.
> The standard form is $\frac{a_0}{2}$, precisely so that $a_0=\frac1\pi\int_{-\pi}^{\pi}f$ matches the $a_n$ formula. Writing $a_0$ alone forces a stray factor of two everywhere.

> [!MYTH] Once the coefficients are computed, the series equals the function.
> Only at points where it converges. At a jump the series converges to the average of the one-sided limits, and at the endpoints the periodic extension decides the value.

## Practice

> [!PRACTICE] 1 · Constant function
> Find the Fourier coefficients of $f(x)=1$ on $[-\pi,\pi]$.
>
> > [!ANSWER] Show answer
> > $a_0=\frac1\pi\int_{-\pi}^{\pi}dx=2$ and $a_n=b_n=0$. The series is just $\frac{a_0}{2}=1$.

> [!PRACTICE] 2 · Even function
> Find $b_n$ for $f(x)=x^2$ on $[-\pi,\pi]$, and explain.
>
> > [!ANSWER] Show answer
> > $x^2\sin nx$ is odd, so its integral over a symmetric interval is zero: $b_n=0$. An even function has a cosine-only series.

> [!PRACTICE] 3 · By hand
> Verify directly that $b_1=\frac1\pi\int_{-\pi}^{\pi}x\sin x\,dx=2$.
>
> > [!ANSWER] Show answer
> > Integrate by parts: $\int x\sin x\,dx=\sin x-x\cos x$. At $x=\pi$ this equals $\pi$; at $x=-\pi$ it equals $-\pi$. The difference is $2\pi$, and dividing by $\pi$ gives $2$.

> [!PRACTICE] 4 · General period
> Expand $f(x)=x$ on $[-1,1]$ and write down $b_n$.
>
> > [!ANSWER] Show answer
> > Here $l=1$, so $b_n=\int_{-1}^{1}x\sin n\pi x\,dx=\frac{2(-1)^{n+1}}{n\pi}$, one factor $\frac1\pi$ more than on $[-\pi,\pi]$.

> [!FORMAL] Formal statement
> For integrable $f$ on $[-\pi,\pi]$, define $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx$ ($n\ge0$) and $b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx$ ($n\ge1$), and write $f\sim\frac{a_0}{2}+\sum(a_n\cos nx+b_n\sin nx)$. If the series converges uniformly to $f$, term-by-term integration is legitimate, and orthogonality $\int_{-\pi}^{\pi}\cos nx\cos mx\,dx=\pi\delta_{nm}$, $\int_{-\pi}^{\pi}\sin nx\sin mx\,dx=\pi\delta_{nm}$ yields exactly these formulas. Whether the series converges to $f$ is settled by Dirichlet's theorem in the next lecture.
