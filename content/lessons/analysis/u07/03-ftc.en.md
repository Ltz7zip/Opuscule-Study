---
slug: "ftc"
subject: "analysis"
unit: "u07"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "The Fundamental Theorem of Calculus"
subtitle: "Where differentiation and integration shake hands"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["defint", "indefint"]
prereq: ["defint"]
related: ["indefint", "defint"]
---

## Goals

By the end of this lecture you can explain why the accumulation function is an antiderivative, evaluate definite integrals with the Newton-Leibniz formula, and differentiate integrals with variable limits by the chain rule.

Last lecture we could only estimate integrals. This lecture we start computing them. The core is a single sentence: for a continuous function, the accumulation function is one of its antiderivatives.

## Three-line recap

- A definite integral is a number; an indefinite integral is a family of functions; the accumulation function connects them.
- If $f$ is continuous on $[a,b]$, then $\Phi(x)=\int_a^x f(t)\,dt$ is differentiable on $[a,b]$ with $\Phi'(x)=f(x)$.
- Hence $\int_a^b f=F(b)-F(a)$ for any antiderivative $F$ of $f$.

## The accumulation function

Let $f$ be continuous on $[a,b]$ and set

$$\Phi(x)=\int_a^x f(t)\,dt,\qquad x\in[a,b].$$

Geometrically $\Phi(x)$ is the area under the curve from $a$ to $x$. Increasing $x$ by $\Delta x$ adds a thin strip of area roughly $f(x)\Delta x$, so $\Phi'(x)=f(x)$.

The rigorous estimate takes one line: by the mean value theorem for integrals, $\Phi(x+\Delta x)-\Phi(x)=\int_x^{x+\Delta x}f=f(\xi)\Delta x$ with $\xi$ between $x$ and $x+\Delta x$. Let $\Delta x\to0$; continuity sends $\xi\to x$, so the difference quotient tends to $f(x)$.

**Example**: for $\Phi(x)=\int_0^x e^{-t^2}dt$, $\Phi'(x)=e^{-x^2}$ and $\Phi'(1)=e^{-1}\approx0.368$. This antiderivative has no elementary form, yet it exists and is differentiable.

Variable limits can be composed. If $\Phi(x)=\int_a^{\varphi(x)}f(t)\,dt$, then

$$\Phi'(x)=f\bigl(\varphi(x)\bigr)\varphi'(x).$$

**Example**: $\Phi(x)=\int_x^{x^2}\cos t\,dt$. Split it as $\int_0^{x^2}-\int_0^x$, giving $\Phi'(x)=2x\cos(x^2)-\cos x$.

## The Newton-Leibniz formula

If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$, then

$$\int_a^b f(x)\,dx=F(b)-F(a).$$

The proof is short: $\Phi$ and $F$ are both antiderivatives of $f$, so $\Phi=F+C$; substituting $x=a$ gives $C=-F(a)$; hence $F(b)-F(a)=\Phi(b)-\Phi(a)=\int_a^b f$.

**Example**: $\int_0^1x^2dx=\frac{x^3}{3}\Big|_0^1=\frac13$.

**Example**: $\int_1^e\frac{dx}{x}=\ln e-\ln1=1$.

**Example**: $\int_0^2|x-1|dx$ requires splitting first: $\int_0^1(1-x)dx+\int_1^2(x-1)dx=\frac12+\frac12=1$. Across a point where the integrand is not differentiable, the formula cannot be applied in one piece.

> [!NOTE]
> The choice of $F$ is irrelevant: the constant $C$ cancels in the subtraction.

## Where the formula stops

Newton-Leibniz needs both hypotheses: $f$ Riemann integrable on $[a,b]$, and $F'=f$ on $(a,b)$.

The standard counterexample: $f(x)=\dfrac{1}{x^2}$ is unbounded on $[-1,1]$ and not integrable, while $F(x)=-\dfrac1x$ really is an antiderivative on $[-1,0)\cup(0,1]$. Blind substitution gives $-1-1=-2$, yet the integral does not converge. Check integrability first.

The other direction also matters: having an antiderivative does not make $f$ integrable. Take $f(x)=x^2\sin\frac{1}{x^2}$ for $x\ne0$ and $f(0)=0$. It is differentiable everywhere, but the derivative is unbounded near $0$, so Newton-Leibniz does not apply to it.

## Three misconceptions

> [!MYTH] The accumulation function is differentiable everywhere for every integrable function.
> Continuity is required. Take $f(x)=\operatorname{sgn}x$ on $[-1,1]$; then $\Phi(x)=|x|-1$, whose left and right derivatives at $0$ are $-1$ and $1$. It is not differentiable there.

> [!MYTH] Any function with an antiderivative can be handled by Newton-Leibniz.
> Integrability is also needed. $\dfrac{1}{x^2}$ is unbounded on $[-1,1]$; substituting $-\frac1x$ gives $-2$, but the integral diverges.

> [!MYTH] Different antiderivatives give different integral values.
> They do not. If $F_1=F_2+C$, then $F_1(b)-F_1(a)=F_2(b)-F_2(a)$. With $F_1=\frac{x^2}{2}$ and $F_2=\frac{x^2}{2}+7$, both give $\frac12$ on $[0,1]$.

## Practice

> [!PRACTICE] 1 · Differentiate
> Let $\Phi(x)=\int_0^x e^{-t^2}dt$. Find $\Phi'(1)$.
>
> > [!ANSWER] Show answer
> > $\Phi'(x)=e^{-x^2}$, so $\Phi'(1)=e^{-1}\approx0.368$.

> [!PRACTICE] 2 · Composed limits
> Let $\Phi(x)=\int_x^{x^2}\cos t\,dt$. Find $\Phi'(x)$.
>
> > [!ANSWER] Show answer
> > Split into $\int_0^{x^2}\cos t\,dt-\int_0^x\cos t\,dt$, giving $\Phi'(x)=2x\cos(x^2)-\cos x$.

> [!PRACTICE] 3 · Absolute value
> Compute $\int_0^2|x-1|dx$.
>
> > [!ANSWER] Show answer
> > Split at $x=1$: $\int_0^1(1-x)dx=\frac12$ and $\int_1^2(x-1)dx=\frac12$, total $1$.

> [!PRACTICE] 4 · Evaluate directly
> Compute $\int_1^e\dfrac{dx}{x}$ and $\int_0^{\pi/2}\sin x\,dx$.
>
> > [!ANSWER] Show answer
> > $\ln e-\ln1=1$; $[-\cos x]_0^{\pi/2}=0-(-1)=1$.

> [!FORMAL] Formal statement
> Fundamental theorem, first form: if $f$ is continuous on $[a,b]$, then $\Phi(x)=\int_a^x f(t)\,dt$ is differentiable on $[a,b]$ with $\Phi'(x)=f(x)$. Second form (Newton-Leibniz): if $F$ is continuous on $[a,b]$, differentiable on $(a,b)$ with $F'=f$, and $f$ is Riemann integrable on $[a,b]$, then $\int_a^b f=F(b)-F(a)$. In general, $\dfrac{d}{dx}\int_{\alpha(x)}^{\beta(x)}f(t)\,dt=f(\beta(x))\beta'(x)-f(\alpha(x))\alpha'(x)$, provided $f$ is continuous and $\alpha,\beta$ are differentiable.
