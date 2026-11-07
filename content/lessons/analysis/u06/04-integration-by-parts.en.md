---
slug: "integration-by-parts"
subject: "analysis"
unit: "u06"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Integration by Parts"
subtitle: "The product rule integrated, for products of different species"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["indefint", "deriv"]
prereq: ["indefint"]
related: ["indefint", "taylor"]
---

## Goals

By the end of this lecture you can state the integration-by-parts formula and derive it, choose $u$ by the standard priority order, and handle both reduction-type and cyclic integrals.

Substitution handles compositions; integration by parts handles products. A polynomial times an exponential, a polynomial times a sine, a logarithm times a polynomial — none of these has an inner derivative to fold, so the only way forward is to move the hard part of the integral elsewhere.

## Three-line recap

- Product rule: $(uv)'=u'v+uv'$.
- Integrating gives $uv=\int u'v\,dx+\int uv'\,dx$; rearranging yields the formula.
- Its effect is to swap who differentiates and who integrates, redistributing the difficulty between two terms.

## The formula

$$\int u\,dv=uv-\int v\,du,\qquad\text{that is}\qquad\int u(x)v'(x)\,dx=u(x)v(x)-\int u'(x)v(x)\,dx .$$

There is no new content here, only the product rule rearranged. The one skill is choosing $u$ so that it simplifies when differentiated, while what remains as $dv$ is still integrable.

## Choosing u

The usual mnemonic orders the candidates: inverse trigonometric, logarithmic, power, trigonometric, exponential. Functions earlier in the list make better choices for $u$, because they tend to simplify or disappear under differentiation, whereas the later ones are easy to integrate.

| Integral | $u$ | $dv$ | Result |
| --- | --- | --- | --- |
| $\int x e^x dx$ | $x$ | $e^x dx$ | $(x-1)e^x+C$ |
| $\int x\cos x\,dx$ | $x$ | $\cos x\,dx$ | $x\sin x+\cos x+C$ |
| $\int \ln x\,dx$ | $\ln x$ | $dx$ | $x\ln x-x+C$ |
| $\int \arctan x\,dx$ | $\arctan x$ | $dx$ | $x\arctan x-\frac12\ln(1+x^2)+C$ |

Check the second row: $(x\sin x+\cos x)'=\sin x+x\cos x-\sin x=x\cos x$, correct.

The third deserves a separate look. $\int\ln x\,dx$ shows no visible product, but take $u=\ln x$ and $dv=dx$:

$$\int\ln x\,dx=x\ln x-\int x\cdot\frac{1}{x}dx=x\ln x-x+C .$$

When there is only one function, treat $dx$ as $dv$; this is the standard entry point.

## Integrals needing two rounds

$$\int x^2\sin x\,dx=-x^2\cos x+2\int x\cos x\,dx=-x^2\cos x+2x\sin x+2\cos x+C .$$

The first round lowers $x^2$ to $x$, the second lowers $x$ to a constant. For a polynomial times a sine or exponential, the number of rounds equals the degree, because each round takes $u$ to be the polynomial and drops its degree by one.

Similarly $\int x^2e^x dx=(x^2-2x+2)e^x+C$, again in two rounds.

## Reduction and cyclic integrals

**Reduction**: write $I_n=\int\sin^n x\,dx$. Take $u=\sin^{n-1}x$ and $dv=\sin x\,dx$:

$$I_n=-\sin^{n-1}x\cos x+(n-1)\int\sin^{n-2}x\cos^2x\,dx .$$

Replacing $\cos^2x=1-\sin^2x$ and collecting terms,

$$I_n=-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}I_{n-2} .$$

Starting from $I_0=x+C$ and $I_1=-\cos x+C$, this produces every $I_n$.

**Cyclic**: for $\int e^x\sin x\,dx$, two rounds bring the original integral back:

$$I=e^x\sin x-e^x\cos x-I\ \Longrightarrow\ I=\frac{e^x(\sin x-\cos x)}{2}+C .$$

The point is to treat $I$ as an unknown and solve, not to differentiate forever.

## Three misconceptions

> [!MYTH] Parts can be used only once.
> A polynomial times a sine or exponential often needs two or three rounds, and $\sin^n x$ needs a reduction formula. The count is set by the structure, not by the formula.

> [!MYTH] Any choice of $u$ and $dv$ works, since the formula is symmetric.
> The formula is not symmetric, and a poor choice makes things worse. For $\int x\ln x\,dx$, taking $u=x$ leads to $\frac{x^2}{2}\ln x-\int\frac{x}{2}dx$; it still finishes, but with an extra detour, and some choices produce a $v$ you cannot find at all.

> [!MYTH] $\int\ln x\,dx$ is not a product, so parts do not apply.
> It does: take $dv=dx$, so $v=x$. The same device handles $\int\arctan x\,dx$ and $\int\arcsin x\,dx$.

## Practice

> [!PRACTICE] 1 · One round
> Find $\int x\cos x\,dx$.
>
> > [!ANSWER] Show answer
> > With $u=x$ and $dv=\cos x\,dx$: $x\sin x-\int\sin x\,dx=x\sin x+\cos x+C$.

> [!PRACTICE] 2 · Log times power
> Find $\int x\ln x\,dx$.
>
> > [!ANSWER] Show answer
> > With $u=\ln x$ and $dv=x\,dx$: $\dfrac{x^2}{2}\ln x-\int\dfrac{x}{2}dx=\dfrac{x^2}{2}\ln x-\dfrac{x^2}{4}+C$.

> [!PRACTICE] 3 · Cyclic
> Find $\int e^x\sin x\,dx$.
>
> > [!ANSWER] Show answer
> > Let $I=\int e^x\sin x\,dx$. Two rounds give $I=e^x\sin x-e^x\cos x-I$, hence $I=\dfrac{e^x(\sin x-\cos x)}{2}+C$.

> [!PRACTICE] 4 · Two rounds
> Find $\int x^2e^x\,dx$.
>
> > [!ANSWER] Show answer
> > The first round gives $x^2e^x-2\int xe^x dx$, and $\int xe^x dx=(x-1)e^x$. Combining, $(x^2-2x+2)e^x+C$.

> [!FORMAL] Formal statement
> Let $u,v$ be differentiable on an interval $I$ with $u',v'$ continuous. Then
> $$\int u(x)v'(x)\,dx=u(x)v(x)-\int u'(x)v(x)\,dx .$$
> Proof: differentiate $u(x)v(x)$ to get $u'(x)v(x)+u(x)v'(x)$, take antiderivatives on $I$, and rearrange. Continuity of $u'$ and $v'$ guarantees both integrals exist.
