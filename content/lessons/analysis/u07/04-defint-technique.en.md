---
slug: "defint-technique"
subject: "analysis"
unit: "u07"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Substitution and Integration by Parts for Definite Integrals"
subtitle: "Change the limits, and never drop the boundary term"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["defint"]
prereq: ["defint"]
related: ["indefint", "defint"]
---

## Goals

By the end of this lecture you can substitute correctly and change the limits at the same time, handle products with integration by parts including the boundary term, and use symmetry to cut a computation in half.

Every technique from indefinite integration still works here, but two disciplines are added: substitution changes the limits, and integration by parts keeps its boundary term.

## Three-line recap

- In a definite integral, the limits change together with the variable, so no back-substitution is needed.
- Integration by parts gains a boundary term $\bigl[uv\bigr]_a^b$; dropping it always gives a wrong number.
- On a symmetric interval an odd function integrates to zero, and an even function doubles.

## Substitution: change the limits, not the variable

Let $f$ be continuous on $[a,b]$ and let $x=\varphi(t)$ be continuously differentiable on $[\alpha,\beta]$ with $\varphi(\alpha)=a$ and $\varphi(\beta)=b$. Then

$$\int_a^b f(x)\,dx=\int_\alpha^\beta f\bigl(\varphi(t)\bigr)\varphi'(t)\,dt .$$

**Example**: $\int_0^4\dfrac{dx}{1+\sqrt x}$. Put $x=t^2$ with $t\in[0,2]$ and $dx=2t\,dt$:

$$\int_0^2\frac{2t}{1+t}\,dt=2\int_0^2\left(1-\frac{1}{1+t}\right)dt=2\bigl(2-\ln3\bigr)\approx1.803 .$$

Here $t=\sqrt x$ is monotone, and the endpoints map $0\mapsto0$, $4\mapsto2$, so the limits change in one step.

Choose exactly one route: either change the limits and finish in $t$, or keep the original limits, convert back to $x$, then substitute $a$ and $b$. Mixing the two is the most common way to lose the computation.

## Integration by parts: keep the boundary term

If $u,v$ are continuously differentiable on $[a,b]$, then

$$\int_a^b u\,dv=\bigl[uv\bigr]_a^b-\int_a^b v\,du .$$

**Example**: $\int_0^{\pi/2}x\sin x\,dx$. Take $u=x$ and $dv=\sin x\,dx$, so $v=-\cos x$:

$$\bigl[-x\cos x\bigr]_0^{\pi/2}+\int_0^{\pi/2}\cos x\,dx=0+1=1 .$$

**Example**: $\int_0^1\arctan x\,dx$. Take $u=\arctan x$ and $dv=dx$:

$$\bigl[x\arctan x\bigr]_0^1-\int_0^1\frac{x}{1+x^2}\,dx=\frac{\pi}{4}-\frac12\ln2\approx0.439 .$$

The second integral follows at once from $d(1+x^2)=2x\,dx$.

## Symmetric intervals and periodicity

If $f$ is integrable on $[-a,a]$, then

$$\int_{-a}^{a}f=0\quad(f\text{ odd}),\qquad\int_{-a}^{a}f=2\int_0^{a}f\quad(f\text{ even}).$$

**Example**: $\int_{-1}^1x^3e^{x^2}dx=0$, since $x^3e^{x^2}$ is odd.

**Example**: $\int_{-2}^2x^5\cos x\,dx=0$, again odd.

**Example**: $\int_{-1}^1x^2dx=\dfrac23$, since $x^2$ is even. Writing $0$ here is wrong.

$\sin^2x$ is not odd, and $\int_0^{2\pi}\sin^2x\,dx=\pi$. Parity is decided by comparing $f(-x)$ with $f(x)$, not by how symmetric the interval looks.

## Three misconceptions

> [!MYTH] After substituting, keep the old limits.
> The variable changed, so the limits must change too. If $\int_0^4\dfrac{dx}{1+\sqrt x}$ keeps $0$ and $4$ and integrates in $t$, the result is $2(4-\ln5)\approx4.78$, while the true value is $2(2-\ln3)\approx1.80$.

> [!MYTH] A symmetric interval always gives zero.
> Only for odd functions. $\int_{-1}^1x^2dx=\frac23\ne0$; even functions double instead.

> [!MYTH] The boundary term can be omitted in a definite integral, since constants cancel anyway.
> The boundary term is not a constant, it is the difference of $uv$ at the endpoints. Dropping $[xe^x]_0^1$ from $\int_0^1xe^xdx$ leaves $-(e-1)\approx-1.718$, while the true value is $1$.

## Practice

> [!PRACTICE] 1 · Spot the differential
> Compute $\int_0^1xe^{x^2}dx$.
>
> > [!ANSWER] Show answer
> > Put $t=x^2$, $dt=2x\,dx$: $\frac12\int_0^1e^t dt=\frac{e-1}{2}\approx0.859$.

> [!PRACTICE] 2 · Root substitution
> Compute $\int_0^4\dfrac{dx}{1+\sqrt x}$.
>
> > [!ANSWER] Show answer
> > Put $x=t^2$: $2\int_0^2\frac{t}{1+t}dt=2(2-\ln3)\approx1.803$.

> [!PRACTICE] 3 · By parts
> Compute $\int_0^1\arctan x\,dx$.
>
> > [!ANSWER] Show answer
> > $[x\arctan x]_0^1-\frac12\ln(1+x^2)\Big|_0^1=\frac{\pi}{4}-\frac12\ln2\approx0.439$.

> [!PRACTICE] 4 · Parity
> Compute $\int_{-2}^{2}x^5\cos x\,dx$.
>
> > [!ANSWER] Show answer
> > $x^5\cos x$ is odd, so the integral over the symmetric interval is $0$.

> [!FORMAL] Formal statement
> Substitution theorem: if $f$ is continuous on $[a,b]$, $\varphi$ is continuously differentiable on $[\alpha,\beta]$ with $\varphi([\alpha,\beta])\subseteq[a,b]$, $\varphi(\alpha)=a$, and $\varphi(\beta)=b$, then $\int_a^b f(x)\,dx=\int_\alpha^\beta f(\varphi(t))\varphi'(t)\,dt$. Integration by parts: if $u,v$ are continuously differentiable on $[a,b]$, then $\int_a^b u\,dv=[uv]_a^b-\int_a^b v\,du$. Both follow from evaluating antiderivatives with the Newton-Leibniz formula.
