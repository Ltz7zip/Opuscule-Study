---
slug: "param-improper"
subject: "analysis"
unit: "u15"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Improper Integrals with a Parameter"
subtitle: "Uniform convergence: the licence to swap limits and integrals"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["paramint", "impropint"]
prereq: ["paramint"]
related: ["paramint", "fourier"]
---

## Goals

A parameter integral with an infinite endpoint needs more than pointwise convergence. To make it continuous, differentiable, and integrable in the parameter, we need **uniform convergence**. By the end you can state the definition, verify it with the Weierstrass, Dirichlet, and Abel tests, and use differentiation under the integral to evaluate the Dirichlet integral $\int_0^\infty\frac{\sin x}{x}dx=\frac{\pi}{2}$.

## Three-line recap

- An improper integral is a limit in the upper endpoint; with a parameter, different $y$ may approach that limit at different rates.
- Uniform convergence demands that the tail becomes small for all $y$ at once.
- Only uniform convergence licenses swapping limits, derivatives, and integrals.

## Definition of uniform convergence

Let $f(x,y)$ be defined on $[a,\infty)\times Y$, and suppose $\int_a^\infty f(x,y)\,dx$ converges for each $y\in Y$. It converges **uniformly** on $Y$ if for every $\varepsilon>0$ there is $A>0$ such that $A'>A$ implies

$$\left|\int_{A'}^\infty f(x,y)\,dx\right|<\varepsilon$$

for **all** $y\in Y$ simultaneously.

The only change is the order of quantifiers. Pointwise convergence gives $A(y,\varepsilon)$ depending on $y$. Uniform convergence gives one $A(\varepsilon)$ that works for every $y$.

Example: $\int_0^\infty e^{-xy}dx=\frac1y$ for $y>0$. On $[\delta,\infty)$ the tail is $\frac{e^{-Ay}}{y}\le\frac{e^{-A\delta}}{\delta}$, which can be made uniformly small, so the convergence is uniform. On $(0,\infty)$ it is not: given $A$, take $y=1/A$; the tail is about $Ae^{-1}$, which does not tend to zero.

## Three tests

**Weierstrass test**: if $|f(x,y)|\le M(x)$ and $\int_a^\infty M(x)dx$ converges, then $\int_a^\infty f(x,y)dx$ converges uniformly and absolutely on $Y$. Easiest to use, but it requires absolute convergence.

**Dirichlet test**: if $\left|\int_a^A f(x,y)dx\right|\le K$ for all $A$ and $y$, and $g(x,y)$ is monotone in $x$ for each $y$ and tends to $0$ uniformly as $x\to\infty$, then $\int_a^\infty f g\,dx$ converges uniformly.

**Abel test**: if $\int_a^\infty f(x,y)dx$ converges uniformly and $g(x,y)$ is monotone in $x$ for each $y$ and uniformly bounded, then $\int_a^\infty fg\,dx$ converges uniformly.

The Dirichlet test handles conditional convergence, for example $\int_1^\infty\frac{\sin x}{x^y}dx$ uniformly for $y\ge\delta>0$.

## Properties under uniform convergence

If $\int_a^\infty f(x,y)dx$ converges uniformly on $Y$ and $f$ is continuous, then $I(y)=\int_a^\infty f(x,y)dx$ is continuous on $Y$.

If $f_y$ is continuous, $\int_a^\infty f_y(x,y)dx$ converges uniformly on $Y$, and $\int_a^\infty f(x,y_0)dx$ converges for one $y_0$, then

$$I'(y)=\int_a^\infty f_y(x,y)\,dx.$$

If $f$ is continuous and the integral converges uniformly on $Y=[c,d]$, then

$$\int_c^d dy\int_a^\infty f(x,y)\,dx=\int_a^\infty dx\int_c^d f(x,y)\,dy.$$

All three have the same structure: uniform convergence lets a limit pass through an integral or a derivative.

## The Dirichlet integral

Let

$$J(y)=\int_0^\infty e^{-xy}\frac{\sin x}{x}\,dx,\qquad y>0.$$

On $[\delta,\infty)$, $|e^{-xy}\sin x/x|\le e^{-\delta x}$. By the Weierstrass test, both the original integral and the differentiated integral $\int_0^\infty -e^{-xy}\sin x\,dx$ converge uniformly. Hence

$$J'(y)=-\int_0^\infty e^{-xy}\sin x\,dx=-\frac{1}{1+y^2}.$$

Also $|J(y)|\le\int_0^\infty e^{-xy}dx=\frac1y\to0$ as $y\to\infty$, so

$$J(y)=\int_\infty^y-\frac{dt}{1+t^2}=\frac{\pi}{2}-\arctan y.$$

Let $y\to0^+$. The integrand is dominated by the integrable function $\left|\frac{\sin x}{x}\right|$, so dominated convergence (or a separate uniformity argument on $[0,\infty)$) gives

$$\int_0^\infty\frac{\sin x}{x}\,dx=J(0^+)=\frac{\pi}{2}.$$

The integral itself is only conditionally convergent; it cannot be split into two divergent integrals, and the Weierstrass test does not apply directly at $y=0$.

## Three misconceptions

> [!MYTH] Convergence for each $y$ makes $I(y)$ continuous.
> Uniform convergence is needed. Under pointwise convergence the tail shrinks at a rate depending on $y$, and the limit function can be discontinuous.

> [!MYTH] Uniform convergence is the same as absolute convergence.
> The Dirichlet test often gives uniform but conditional convergence. $\int_0^\infty\frac{\sin x}{x}dx$ converges uniformly on suitable parameter sets but not absolutely.

> [!MYTH] If the original integral converges, differentiation under the integral sign is allowed.
> One also needs $\int f_y$ to converge uniformly. Otherwise the differentiated integral may diverge or fail to equal the derivative.

## Practice

> [!PRACTICE] 1 · Uniformity
> Show that $\int_0^\infty e^{-xy}dx$ converges uniformly on $[\delta,\infty)$ but not on $(0,\infty)$.
>
> > [!ANSWER] Show answer
> > The tail is $\frac{e^{-Ay}}{y}\le\frac{e^{-A\delta}}{\delta}$, independent of $y$. On $(0,\infty)$, take $y=1/A$; the tail is $Ae^{-1}$, which does not go to zero.

> [!PRACTICE] 2 · Differentiate
> Use differentiation to compute $\int_0^\infty xe^{-xy}dx$ for $y>0$.
>
> > [!ANSWER] Show answer
> > Since $\int_0^\infty e^{-xy}dx=\frac1y$, differentiating gives $-\frac1{y^2}=\int_0^\infty(-x)e^{-xy}dx$, so the desired integral is $\frac1{y^2}$.

> [!PRACTICE] 3 · M-test
> Show that $\int_0^\infty e^{-xy}\cos x\,dx$ converges uniformly on $[\delta,\infty)$.
>
> > [!ANSWER] Show answer
> > $|e^{-xy}\cos x|\le e^{-\delta x}$ and $\int_0^\infty e^{-\delta x}dx=\frac1\delta$, so the Weierstrass test applies.

> [!PRACTICE] 4 · Values
> Using $J(y)=\frac{\pi}{2}-\arctan y$, find $J(0)$ and $J(1)$.
>
> > [!ANSWER] Show answer
> > $J(0)=\frac{\pi}{2}$ and $J(1)=\frac{\pi}{4}$, that is, $\int_0^\infty e^{-x}\frac{\sin x}{x}dx=\frac{\pi}{4}$.

> [!FORMAL] Formal statement
> Let $f(x,y)$ be continuous on $[a,\infty)\times Y$ and suppose $\int_a^\infty f(x,y)dx$ converges for each $y\in Y$. It converges uniformly on $Y$ if for every $\varepsilon>0$ there is $A$ such that $A'>A$ implies $\left|\int_{A'}^\infty f(x,y)dx\right|<\varepsilon$ for all $y\in Y$. Then $I(y)$ is continuous; if $f_y$ is continuous and $\int_a^\infty f_y\,dx$ converges uniformly on $Y$, then $I'(y)=\int_a^\infty f_y\,dx$; if $Y=[c,d]$, the two iterated integrals may be exchanged.
