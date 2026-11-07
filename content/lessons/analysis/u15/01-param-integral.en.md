---
slug: "param-integral"
subject: "analysis"
unit: "u15"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Proper Integrals with a Parameter"
subtitle: "Integrate over x first, then study the result as a function of y"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["paramint"]
prereq: ["defint"]
related: ["paramint", "unifconv"]
---

## Goals

A parameter integral $I(y)=\int_a^b f(x,y)\,dx$ is a new function: each $y$ produces a definite integral. By the end you can explain when it is continuous and differentiable, apply Leibniz's rule correctly, and evaluate a class of integrals with no elementary antiderivative by integrating over the parameter.

## Three-line recap

- The integral removes $x$ and leaves a function of $y$ alone.
- Continuity comes from uniform continuity of $f$ on the rectangle.
- Differentiation comes from moving $f_y$ inside the integral, which requires $f_y$ to be continuous.

## Continuity and uniform control

Let $f(x,y)$ be continuous on $R=[a,b]\times[c,d]$ and set

$$I(y)=\int_a^b f(x,y)\,dx,\qquad y\in[c,d].$$

Then $I$ is continuous on $[c,d]$. The key is not continuity of each $f(\cdot,y)$ but **uniform continuity** of $f$ on the compact rectangle: for every $\varepsilon>0$ there is $\delta>0$ such that $|y-y_0|<\delta$ implies $|f(x,y)-f(x,y_0)|<\varepsilon/(b-a)$ for **all** $x$ simultaneously. Then

$$|I(y)-I(y_0)|\le\int_a^b|f(x,y)-f(x,y_0)|\,dx<\varepsilon.$$

The phrase "for all $x$ simultaneously" is the whole point: it upgrades pointwise continuity to continuity after integration.

## Leibniz's rule

If $f$ and $f_y$ are continuous on $R$, then $I$ is differentiable on $[c,d]$ and

$$I'(y)=\int_a^b\frac{\partial f}{\partial y}(x,y)\,dx.$$

The proof uses difference quotients and the mean value theorem: $\frac{f(x,y+\Delta y)-f(x,y)}{\Delta y}=f_y(x,\eta)$, with the error controlled by uniform continuity of $f_y$.

Example: $f(x,y)=x^y$ on $[0,1]\times(0,\infty)$. First integrate:

$$I(y)=\int_0^1x^y\,dx=\frac{1}{y+1}.$$

Hence $I'(y)=-\frac{1}{(y+1)^2}$. On the other hand, moving $f_y=x^y\ln x$ inside gives

$$\int_0^1x^y\ln x\,dx=-\frac{1}{(y+1)^2}.$$

At $y=0$ this reads $\int_0^1\ln x\,dx=-1$, which matches a direct computation. The formula survives at $y=0$ because $x^y\ln x$ is bounded and integrable on $[0,1]\times[0,1]$.

If the limits also depend on the parameter, Leibniz's rule gains two boundary terms:

$$\frac{d}{dy}\int_{a(y)}^{b(y)}f(x,y)\,dx=f(b(y),y)b'(y)-f(a(y),y)a'(y)+\int_{a(y)}^{b(y)}f_y(x,y)\,dx.$$

## Integrating over the parameter

If $f$ is continuous on the rectangle, then $I$ is integrable and

$$\int_c^d I(y)\,dy=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx.$$

This is Fubini in one-parameter form: the two iterated integrals may be exchanged.

Its power is to turn a hard one-dimensional integral into an easy double integral. For $a,b>-1$, consider

$$J=\int_0^1\frac{x^b-x^a}{\ln x}\,dx.$$

The integrand is understood by limits at $x=0,1$, and it can be written as

$$\frac{x^b-x^a}{\ln x}=\int_a^b x^y\,dy.$$

Swap the order:

$$J=\int_0^1dx\int_a^b x^y\,dy=\int_a^b\left(\int_0^1x^y\,dx\right)dy=\int_a^b\frac{dy}{y+1}=\ln\frac{b+1}{a+1}.$$

An integral with no visible antiderivative collapses to a logarithm.

## Worked examples and limits of use

**Example 1.** $\int_0^1\frac{x^y-1}{\ln x}\,dx=\ln(y+1)$ for $y>-1$, because $\frac{x^y-1}{\ln x}=\int_0^y x^t\,dt$ and exchanging the order gives $\int_0^y\frac{dt}{t+1}=\ln(y+1)$.

**Example 2.** $\int_0^1\frac{x^2-x}{\ln x}\,dx=\ln\frac32$, by taking $y=2$ in Example 1.

Check three things before using the method: $f$ is continuous on the closed rectangle; $f_y$ is continuous when differentiating; the limits do not secretly depend on the parameter. If $f_y$ is continuous only on an open region, the conclusion may fail at the boundary and needs a separate argument.

## Three misconceptions

> [!MYTH] If $f(x,y)$ is integrable in $x$ for each $y$, then $I(y)$ is continuous.
> Not enough. One needs joint continuity on the rectangle, or at least uniform continuity; otherwise the integral can jump with $y$.

> [!MYTH] Differentiation always moves inside the integral sign.
> It requires $f_y$ continuous on the rectangle, or a dominated-convergence hypothesis. Otherwise the inner integral may fail to exist or may differ from the derivative.

> [!MYTH] With variable limits, Leibniz's rule only adds an integral term.
> It also adds the boundary terms $f(b(y),y)b'(y)$ and $-f(a(y),y)a'(y)$. Omitting them is the standard error.

## Practice

> [!PRACTICE] 1 · Direct check
> For $I(y)=\int_0^1(x+y)^2dx$, integrate, differentiate, and compare with $\int_0^1 2(x+y)\,dx$.
>
> > [!ANSWER] Show answer
> > $I(y)=\frac13+y+y^2$, so $I'(y)=1+2y$, which equals $\int_0^1 2(x+y)dx$.

> [!PRACTICE] 2 · Differentiate
> Use Leibniz's rule to compute $\int_0^1x^y\ln x\,dx$.
>
> > [!ANSWER] Show answer
> > $I(y)=\frac{1}{y+1}$, hence $I'(y)=-\frac{1}{(y+1)^2}$.

> [!PRACTICE] 3 · Parameter integral
> Compute $\int_0^1\frac{x^2-x}{\ln x}\,dx$.
>
> > [!ANSWER] Show answer
> > From $\int_0^1\frac{x^b-x^a}{\ln x}dx=\ln\frac{b+1}{a+1}$ with $b=2$, $a=1$, the value is $\ln\frac32$.

> [!PRACTICE] 4 · Variable limits
> For $I(y)=\int_0^y e^{-yx}\,dx$, find $I'(y)$.
>
> > [!ANSWER] Show answer
> > $I(y)=\frac{1-e^{-y^2}}{y}$ for $y\neq0$, so $I'(y)=\frac{(2y^2+1)e^{-y^2}-1}{y^2}$. Leibniz with variable limits gives $e^{-y^2}+\int_0^y(-x)e^{-yx}dx$, the same result.

> [!FORMAL] Formal statement
> Let $f,f_y$ be continuous on $R=[a,b]\times[c,d]$. Then $I(y)=\int_a^bf(x,y)dx$ is continuously differentiable on $[c,d]$, with $I'(y)=\int_a^bf_y(x,y)dx$, and $\int_c^dI(y)dy=\int_a^b\int_c^df(x,y)\,dy\,dx$. If $a(y),b(y)\in C^1$ and $f,f_y$ are continuous, then $\frac{d}{dy}\int_{a(y)}^{b(y)}f(x,y)dx=f(b(y),y)b'(y)-f(a(y),y)a'(y)+\int_{a(y)}^{b(y)}f_y(x,y)dx$.
