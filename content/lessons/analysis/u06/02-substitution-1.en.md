---
slug: "substitution-1"
subject: "analysis"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Substitution I: Reversing the Chain Rule"
subtitle: "Spot the inner derivative and fold it into the differential"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["indefint"]
prereq: ["indefint"]
related: ["indefint", "deriv"]
---

## Goals

By the end of this lecture you can recognise the pattern "inner function times its derivative" inside an integral, simplify it by folding the derivative into the differential, and return the answer to the original variable.

The first substitution is the chain rule run backwards. Differentiating a composition produces the inner derivative as a factor; if the integral shows that factor, it can be absorbed into the differential.

## Three-line recap

- Chain rule: $\bigl(F(\varphi(x))\bigr)'=F'(\varphi(x))\varphi'(x)$.
- Integrate both sides: the left returns $F(\varphi(x))$, the right is $\int F'(\varphi(x))\varphi'(x)\,dx$.
- With $u=\varphi(x)$ and $du=\varphi'(x)dx$, the right becomes $\int F'(u)\,du$, matching the basic table.

## The substitution formula

If $f$ has an antiderivative $F$ and $\varphi$ is differentiable, then

$$\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du\Big|_{u=\varphi(x)}=F(\varphi(x))+C .$$

The point is to recognise $\varphi'(x)dx$ as $du$. That step is called **folding the differential**.

Two basic examples:

$$\int 2x\,e^{x^2}dx=\int e^{u}\,du=e^{u}+C=e^{x^2}+C,\qquad u=x^2;$$

$$\int\frac{x}{1+x^2}dx=\frac{1}{2}\int\frac{2x}{1+x^2}dx=\frac{1}{2}\ln(1+x^2)+C .$$

In the second, the numerator has only $x$ while the inner derivative is $2x$; multiply by $2$ and by $\frac12$ to balance. This balancing is the most common move.

## Standard patterns

| Structure | Take $u$ | Example |
| --- | --- | --- |
| $f(ax+b)$ | $u=ax+b$ | $\int e^{3x-1}dx=\frac{1}{3}e^{3x-1}+C$ |
| $x^{n-1}f(x^n)$ | $u=x^n$ | $\int x^2\sqrt{x^3+1}\,dx$ |
| $\dfrac{f(\ln x)}{x}$ | $u=\ln x$ | $\int\dfrac{dx}{x\ln x}=\ln\|\ln x\|+C$ |
| $f(\sin x)\cos x$ | $u=\sin x$ | $\int\cos^3x\,dx$ |
| $f(e^x)e^x$ | $u=e^x$ | $\int\dfrac{e^x}{1+e^{2x}}dx$ |

Work the third one: with $u=\ln x$, $du=dx/x$, so $\int\dfrac{dx}{x\ln x}=\int\dfrac{du}{u}=\ln|u|+C=\ln|\ln x|+C$.

For the fourth, split first: $\cos^3x=\cos x(1-\sin^2x)$. With $u=\sin x$,

$$\int(1-u^2)\,du=u-\frac{u^3}{3}+C=\sin x-\frac{\sin^3x}{3}+C .$$

## Balancing coefficients and substituting back

Two things are easily dropped: the coefficient and the return to $x$.

**Coefficient**: if $u=ax+b$ then $du=a\,dx$, so $\int f(ax+b)dx=\dfrac{1}{a}\int f(u)\,du$. For example $\int e^{2x}dx=\dfrac{1}{2}e^{2x}+C$; omitting $\frac12$ is wrong, and differentiating the answer detects it immediately.

**Return**: an indefinite integral must be a function of $x$. After computing $\int e^u du=e^u+C$, write $e^{x^2}+C$; do not stop at $u$.

One more with trigonometry: $\int\tan x\,dx=\int\dfrac{\sin x}{\cos x}dx$. With $u=\cos x$ and $du=-\sin x\,dx$,

$$\int\tan x\,dx=-\int\frac{du}{u}=-\ln|\cos x|+C .$$

## Three misconceptions

> [!MYTH] Replacing $x$ by $u$ is the whole substitution.
> The differential must change too. For $u=x^2$, $du=2x\,dx$; replacing only the letter leaves $x\,dx$ in an expression that mixes two variables and means nothing.

> [!MYTH] After substituting, an indefinite integral may stay in $u$.
> No. The indefinite integral is a function of $x$ and the answer must return to $x$. Keeping $u$ answers a different question; only definite integrals may stay in the new variable, after changing the limits.

> [!MYTH] Every integral can be done by folding a differential.
> Far from it. $\int e^{-x^2}dx$ and $\int\dfrac{\sin x}{x}dx$ have antiderivatives but no elementary closed form. Folding works only when the inner derivative is actually present.

## Practice

> [!PRACTICE] 1 · A square root
> Find $\int x^2\sqrt{x^3+1}\,dx$.
>
> > [!ANSWER] Show answer
> > Let $u=x^3+1$, $du=3x^2dx$. The integral is $\dfrac{1}{3}\int u^{1/2}du=\dfrac{2}{9}u^{3/2}+C=\dfrac{2}{9}(x^3+1)^{3/2}+C$.

> [!PRACTICE] 2 · Linear inner function
> Find $\int\dfrac{dx}{2x+3}$.
>
> > [!ANSWER] Show answer
> > Let $u=2x+3$, $du=2\,dx$. The integral is $\dfrac{1}{2}\int\dfrac{du}{u}=\dfrac{1}{2}\ln|2x+3|+C$.

> [!PRACTICE] 3 · Odd power of cosine
> Find $\int\cos^3x\,dx$.
>
> > [!ANSWER] Show answer
> > Write $\cos x(1-\sin^2x)$ and let $u=\sin x$: $\int(1-u^2)du=u-\dfrac{u^3}{3}+C=\sin x-\dfrac{\sin^3x}{3}+C$.

> [!PRACTICE] 4 · Exponential
> Find $\int x e^{-x^2}dx$.
>
> > [!ANSWER] Show answer
> > Let $u=-x^2$, $du=-2x\,dx$. The integral is $-\dfrac{1}{2}\int e^u du=-\dfrac{1}{2}e^{-x^2}+C$.

> [!FORMAL] Formal statement
> Let $f$ have an antiderivative $F$ on an interval $J$, and let $\varphi$ be differentiable on an interval $I$ with $\varphi(I)\subseteq J$. Then $F\circ\varphi$ is an antiderivative of $f(\varphi(x))\varphi'(x)$ on $I$: $\int f(\varphi(x))\varphi'(x)\,dx=F(\varphi(x))+C$. The proof differentiates $F(\varphi(x))$ and applies the chain rule to get $f(\varphi(x))\varphi'(x)$.
