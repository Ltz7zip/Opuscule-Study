---
slug: "antiderivative-substitution"
subject: "calculus"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Antiderivatives and Integration by Substitution"
subtitle: "Run differentiation backwards"
minutes: 32
meta: ["32 min read","Requires derivatives and differentials","Mastery level"]
concepts: ["indefint", "deriv"]
prereq: ["deriv"]
related: ["defint", "taylor", "areavol"]
---

## Goals of this lecture

Differentiation is mechanical: given a function, you apply the product rule and the chain rule and rarely get stuck. Integration walks the same road backwards, and the return trip has neither a single route nor a unique answer. This lecture first settles two preliminary questions — **does an antiderivative exist, and in what sense is it unique** — and then develops the first genuinely general technique: substitution.

Substitution has to be split in two, because the two cases rest on different hypotheses. The first kind (folding into the differential) handles expressions where the derivative of an inner function is already present as a factor, such as $\int xe^{x^{2}}dx$. The second kind (replacing the variable) handles radicals, such as $\int\sqrt{1-x^{2}}dx$. Both use the same formula, read in opposite directions.

By the end you should be able to:

- state the difference between an antiderivative and an indefinite integral, and explain where $+C$ comes from;
- prove with the mean value theorem that any two antiderivatives on an interval differ by a constant;
- reproduce the basic table and account for each restriction;
- spot an inner function together with its derivative and fold it into the differential;
- choose the right trigonometric substitution for $\sqrt{a^{2}-x^{2}}$, $\sqrt{x^{2}+a^{2}}$, $\sqrt{x^{2}-a^{2}}$ and convert back correctly.

## Three lines back

- If $F'(x)=f(x)$ at every point of an interval $I$, then $F$ is an antiderivative of $f$ on $I$.
- Any two antiderivatives on the same interval differ by a constant, so $\int f(x)\,dx=F(x)+C$ denotes a family of functions.
- Substitution is the chain rule reversed: when $x$ changes, $dx$ changes with it.

## Reversing differentiation: existence, uniqueness, interval

Differentiation lands in exactly one place: a differentiable function has one derivative. Going backwards, the starting point is the same and the destination immediately multiplies. For $f(x)=x^{2}$, each of $\dfrac{x^{3}}{3}$, $\dfrac{x^{3}}{3}+1$ and $\dfrac{x^{3}}{3}-7$ is an antiderivative. The problem therefore cannot be "find an antiderivative"; it must be "find all antiderivatives".

The second question is existence. A continuous function on a closed interval always has an antiderivative (a fact proved only in the lecture on definite integrals), but **having an antiderivative** and **having an elementary antiderivative** are different matters. The functions $\int e^{-x^{2}}dx$ and $\int\frac{\sin x}{x}dx$ do have antiderivatives, yet neither can be written as a finite combination of elementary functions; only series or numerical methods apply.

The third question is the domain. An antiderivative is a concept on an **interval**: the equation $F'(x)=f(x)$ means nothing until an interval is named. The derivative of $\ln\lvert x\rvert$ is $\dfrac1x$, but $\mathbb{R}\setminus\{0\}$ is not an interval, and its two halves may carry different constants.

> [!FORMAL] Definition of an antiderivative
> Let $f$ be defined on an interval $I$. If there is a function $F$, differentiable on $I$, with $F'(x)=f(x)$ for every $x\in I$, then $F$ is an antiderivative of $f$ on $I$, and the family of all antiderivatives is written
> $$
> \int f(x)\,dx=F(x)+C
> $$
> where $C$ is an arbitrary constant, the constant of integration.

## Where the constant comes from: a corollary of the mean value theorem

"All antiderivatives differ by a constant" is a theorem, and its proof uses Lagrange's mean value theorem once. Let $F$ and $G$ be antiderivatives of $f$ on $I$ and put $H=F-G$. Then $H'(x)=f(x)-f(x)=0$ for every $x\in I$. Pick $x_{1}<x_{2}$; on $[x_{1},x_{2}]$ there is $\xi\in(x_{1},x_{2})$ with

$$
H(x_{2})-H(x_{1})=H'(\xi)(x_{2}-x_{1})=0
$$

Hence $H(x_{2})=H(x_{1})$, and since the pair was arbitrary, $H$ is constant on $I$. The phrase "on an interval" cannot be dropped: only on one connected stretch does a vanishing derivative force constancy.

Linearity follows:

$$
\int\bigl[\alpha f(x)+\beta g(x)\bigr]dx=\alpha\int f(x)\,dx+\beta\int g(x)\,dx
$$

Just differentiate the right side. But integration has **no** product rule: there is no identity $\int fg=\int f\cdot\int g$, and no one-step analogue of $(uv)'$. That gap is exactly why the next lecture is devoted to integration by parts.

## The basic integral table: reading the derivative table backwards

The table need not be memorised separately; it is the derivative table read from right to left. Reading $(x^{\alpha+1})'=(\alpha+1)x^{\alpha}$ backwards gives the power rule; the single failure is $\alpha=-1$, where the denominator vanishes and $\ln x$ fills the gap.

| Integrand | Antiderivative | Restriction |
| --- | --- | --- |
| $x^{\alpha}$ | $\dfrac{x^{\alpha+1}}{\alpha+1}+C$ | $\alpha\ne-1$, $x>0$ |
| $\dfrac1x$ | $\ln\lvert x\rvert+C$ | $x\ne0$ |
| $e^{x}$ | $e^{x}+C$ | none |
| $\sin x$ | $-\cos x+C$ | none |
| $\cos x$ | $\sin x+C$ | none |
| $\sec^{2}x$ | $\tan x+C$ | $\cos x\ne0$ |
| $\dfrac{1}{1+x^{2}}$ | $\arctan x+C$ | none |
| $\dfrac{1}{\sqrt{1-x^{2}}}$ | $\arcsin x+C$ | $\lvert x\rvert<1$ |

Two entries need comment. The absolute value in $\ln\lvert x\rvert$ merges the cases $x>0$ and $x<0$ into one line, but it does not make the result a single family on $\mathbb{R}\setminus\{0\}$. The restriction $\lvert x\rvert<1$ for $\arcsin x$ appears because at the endpoints only one-sided derivatives exist, so the statement lives on an open interval. Once the table is automatic, the work reduces to **recognition**: seeing an integrand as a deformation of one row.

## Substitution of the first kind: folding structure into the differential

Everything here comes from the chain rule. If $F'=f$, then

$$
\frac{d}{dx}F(\varphi(x))=F'(\varphi(x))\varphi'(x)=f(\varphi(x))\varphi'(x)
$$

Integrating both sides gives $F(\varphi(x))+C$, and $\int f(u)\,du=F(u)+C$ at $u=\varphi(x)$ is the same thing. Hence

$$
\int f(\varphi(x))\varphi'(x)\,dx=\int f(u)\,du,\qquad u=\varphi(x)
$$

The hypotheses are only that $\varphi$ is differentiable and $f$ has an antiderivative on the range of $\varphi$. Note that $\varphi$ need **not** be monotone: the direction of use is $x\to u$, and converting back simply writes $u=\varphi(x)$, with no inverse function required. This is the sharp contrast with the second kind.

In practice the formula appears as "folding". Worth knowing by heart:

$$
x\,dx=\frac12d(x^{2}),\qquad \frac{dx}{x}=d\ln x,\qquad e^{x}dx=de^{x},
$$

$$
\cos x\,dx=d\sin x,\qquad \frac{dx}{\sqrt{x}}=2\,d\sqrt{x}
$$

> [!PRACTICE] Example 1 · A one-step fold
> Find $\displaystyle\int xe^{x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > Differentiating $x^{2}$ gives $2x$, and the integrand already contains $x\,dx$, so only a constant factor is missing. Take $u=x^{2}$, $du=2x\,dx$, that is $x\,dx=\dfrac12du$:
> > $$
> > \int xe^{x^{2}}dx=\frac12\int e^{u}du=\frac12e^{u}+C=\frac12e^{x^{2}}+C
> > $$
> > Check: $\left(\dfrac12e^{x^{2}}\right)'=xe^{x^{2}}$.

Now a logarithm as the inner function. Since $\dfrac{dx}{x}=d\ln x$, treat $\ln x$ as $u$:

$$
\int\frac{dx}{x\ln x}=\int\frac{d\ln x}{\ln x}=\ln\lvert\ln x\rvert+C
$$

The domain needs $x>0$ and $x\ne1$, and the formula holds separately on $(0,1)$ and $(1,+\infty)$. Trigonometry works the same way: $\int\tan x\,dx=-\int\dfrac{d\cos x}{\cos x}=-\ln\lvert\cos x\rvert+C$, where the minus sign comes from $d\cos x=-\sin x\,dx$.

To decide whether the first kind applies, check three things: is there an inner function $\varphi(x)$; does $\varphi'(x)$ sit next to it (up to a constant factor); is the rest a function of $\varphi$ alone? If all three hold, fold. If the second fails, the second kind is usually the way.

## Substitution of the second kind: replacing the variable

Some integrands offer no inner function at all; $\sqrt{a^{2}-x^{2}}$ is the standard example. Then reverse the move: instead of folding a structure in, replace $x$ itself by a function of a new variable $t$. Let $x=\varphi(t)$ be monotone and differentiable on $J$ with $\varphi'(t)\ne0$; then $\varphi$ has a differentiable inverse $t=\varphi^{-1}(x)$ and

$$
\int f(x)\,dx=\int f(\varphi(t))\varphi'(t)\,dt
$$

Compute the right side, then substitute $t=\varphi^{-1}(x)$ back. The condition $\varphi'\ne0$ secures the inverse; monotonicity makes the substitution reversible on the whole stretch rather than half of it.

Radicals are handled by three identities:

| Radical | Substitution | Identity | Range of $t$ |
| --- | --- | --- | --- |
| $\sqrt{a^{2}-x^{2}}$ | $x=a\sin t$ | $1-\sin^{2}t=\cos^{2}t$ | $\left[-\dfrac{\pi}{2},\dfrac{\pi}{2}\right]$ |
| $\sqrt{x^{2}+a^{2}}$ | $x=a\tan t$ | $1+\tan^{2}t=\sec^{2}t$ | $\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$ |
| $\sqrt{x^{2}-a^{2}}$ | $x=a\sec t$ | $\sec^{2}t-1=\tan^{2}t$ | $\left[0,\dfrac{\pi}{2}\right)$ |

The range column is not decoration. In the first row, $\sqrt{a^{2}\cos^{2}t}=a\lvert\cos t\rvert$, and only on $[-\pi/2,\pi/2]$ is $\cos t\ge0$, so only there can the absolute value be dropped. Choose the wrong interval and a spurious minus sign appears during conversion.

> [!PRACTICE] Example 2 · A complete trigonometric substitution
> Find $\displaystyle\int\sqrt{1-x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > **Substitute.** Let $x=\sin t$ with $t\in\left[-\dfrac{\pi}{2},\dfrac{\pi}{2}\right]$; then $dx=\cos t\,dt$ and $\sqrt{1-x^{2}}=\cos t$, so the integral becomes
> > $$
> > \int\cos^{2}t\,dt
> > $$
> > **Reduce the power.** With $\cos^{2}t=\dfrac{1+\cos 2t}{2}$ this is $\dfrac{t}{2}+\dfrac{\sin 2t}{4}+C$.
> > **Convert back.** Since $\sin 2t=2\sin t\cos t$, $\dfrac{\sin 2t}{4}=\dfrac12x\sqrt{1-x^{2}}$, and $t=\arcsin x$, hence
> > $$
> > \int\sqrt{1-x^{2}}dx=\frac12\left(x\sqrt{1-x^{2}}+\arcsin x\right)+C
> > $$
> > **Check.** Differentiating and putting over a common denominator gives $\dfrac{1-x^{2}}{\sqrt{1-x^{2}}}=\sqrt{1-x^{2}}$, as required.

A right triangle is the safest bookkeeping device: $x=\sin t$ means opposite side $x$, hypotenuse $1$, adjacent side $\sqrt{1-x^{2}}$, so $\cos t=\sqrt{1-x^{2}}$. The substitution $t=\sqrt{x}$ is not trigonometric, but $dx$ must still be converted:

> [!PRACTICE] Example 3 · A whole radical as the new variable
> Find $\displaystyle\int\frac{dx}{1+\sqrt{x}}$.
>
> > [!ANSWER] Show answer
> > Let $t=\sqrt{x}$, so $x=t^{2}$, $dx=2t\,dt$ and $t\ge0$. Substitute and divide polynomials:
> > $$
> > \int\frac{2t}{1+t}dt=2\int\left(1-\frac{1}{1+t}\right)dt=2t-2\ln(1+t)+C
> > $$
> > Converting back gives $\displaystyle\int\frac{dx}{1+\sqrt{x}}=2\sqrt{x}-2\ln\left(1+\sqrt{x}\right)+C$.

Answers from the second kind **must** be expressed in the original variable: the question was posed in $x$, so the answer must be in $x$, and leaving $t$ counts as no answer.

## How the two substitutions divide the work

Both use one formula, read in opposite directions. The differences:

| Item | First kind: fold | Second kind: replace |
| --- | --- | --- |
| Direction | $u=\varphi(x)$, structure folded in | $x=\varphi(t)$, radical released |
| Trigger | $\varphi(x)$ and $\varphi'(x)$ both appear | a radical such as $\sqrt{a^{2}-x^{2}}$ appears |
| Requirement on $\varphi$ | differentiable; monotonicity unnecessary | monotone, differentiable, $\varphi'\ne0$ |
| Conversion back | write $u=\varphi(x)$ directly | solve $t=\varphi^{-1}(x)$ |
| Example | $\displaystyle\int xe^{x^{2}}dx$ | $\displaystyle\int\sqrt{1-x^{2}}dx$ |
| Usual error | a missing constant factor or sign | forgetting to convert $dx$ |

## Boundary cases: when substitution fails

**A non-monotone inner function.** Taking $u=x^{2}$ on $[-1,1]$ sends $x$ and $-x$ to the same $u$. The formula itself still holds (it needs only differentiability), but if you assume a one-to-one correspondence, information is lost when converting back. The monotonicity demanded by the second kind exists precisely to rule this out.

**A disconnected domain.** Two examples have already appeared: $\int\frac{dx}{x}=\ln\lvert x\rvert+C$ and $\int\frac{dx}{x\ln x}=\ln\lvert\ln x\rvert+C$. Each holds on its own connected interval, with its own constant. Writing one $+C$ across both halves silently assumes a single constant on the whole domain, which is unjustified.

**A substitution that makes things worse.** Setting $x=\tan t$ in $\int\frac{dx}{1+x^{2}}$ gives $\int1\,dt$, a success; the same substitution in $\int\frac{x}{1+x^{2}}dx$ gives $\int\tan t\,dt$, which is harder. The test is not whether a substitution is possible but whether the result is simpler.

## Four common misconceptions

> [!MYTH] The $+C$ can be dropped.
> Dropping it answers a different question: one antiderivative instead of the whole family. Differentiating your answer checks one member, never the constant.

> [!MYTH] $\displaystyle\int f(x)g(x)dx=\int f\,dx\cdot\int g\,dx$.
> Take $f=g=x$: the left side is $\dfrac{x^{3}}{3}+C$, the right side is $\dfrac{x^{4}}{4}$. Integration neither distributes over products nor obeys a product rule.

> [!MYTH] Once the substitution works, the answer can be handed in without converting back.
> An indefinite integral must be expressed in the original variable; leaving $t$ changes the question. Conversion needs the inverse function, and that is where most errors occur.

> [!MYTH] Substituting means replacing $x$ by $t$ and $dx$ by $dt$.
> It means $dx=\varphi'(t)\,dt$. Omitting $\varphi'(t)$ changes the answer by a factor, and the derivative check exposes it at once: for $x=\sin t$, $dx=\cos t\,dt$, not $dt$.

## Practice

> [!PRACTICE] 1 · Fold
> Find $\displaystyle\int\frac{x}{1+x^{2}}dx$.
>
> > [!ANSWER] Show answer
> > Let $u=1+x^{2}$, $du=2x\,dx$; the integral is $\dfrac12\ln(1+x^{2})+C$, the absolute value being unnecessary since $1+x^{2}>0$.

> [!PRACTICE] 2 · Radical substitution
> Find $\displaystyle\int\frac{e^{\sqrt{x}}}{\sqrt{x}}dx$.
>
> > [!ANSWER] Show answer
> > Let $t=\sqrt{x}$, $dx=2t\,dt$, $\dfrac{dx}{\sqrt{x}}=2\,dt$; the integral is $2e^{t}+C=2e^{\sqrt{x}}+C$.

> [!PRACTICE] 3 · Complete the square first
> Find $\displaystyle\int\frac{dx}{x^{2}+4}$.
>
> > [!ANSWER] Show answer
> > Let $x=2\tan t$, $dx=2\sec^{2}t\,dt$, $x^{2}+4=4\sec^{2}t$; the integral is $\dfrac12\int dt=\dfrac12\arctan\dfrac{x}{2}+C$.

> [!PRACTICE] 4 · Spot the inner function
> Find $\displaystyle\int x^{2}\sqrt{1+x^{3}}\,dx$.
>
> > [!ANSWER] Show answer
> > Take $u=1+x^{3}$, $du=3x^{2}dx$; the integral is $\dfrac13\int u^{1/2}du=\dfrac{2}{9}\left(1+x^{3}\right)^{3/2}+C$.

> [!PRACTICE] 5 · Trigonometric substitution with a parameter
> Find $\displaystyle\int\sqrt{4-x^{2}}\,dx$.
>
> > [!ANSWER] Show answer
> > Let $x=2\sin t$, $dx=2\cos t\,dt$, $\sqrt{4-x^{2}}=2\cos t$; the integral is $4\int\cos^{2}t\,dt=2t+\sin 2t+C$. With $\sin t=\dfrac{x}{2}$ and $\cos t=\dfrac{\sqrt{4-x^{2}}}{2}$,
> > $$
> > \int\sqrt{4-x^{2}}dx=2\arcsin\frac{x}{2}+\frac{x}{2}\sqrt{4-x^{2}}+C
> > $$

## Formal statement

Let $F$ be an antiderivative of $f$ on an interval $I$. Then every antiderivative of $f$ on $I$ is $F(x)+C$ with $C$ constant, written $\int f(x)\,dx$. Proof: if $G$ is another, then $(G-F)'=0$ on $I$, so by the mean value theorem $G-F$ is constant.

Let $\varphi$ be differentiable on an interval $J$ and let $f$ have an antiderivative $F$ on $\varphi(J)$; then

$$
\int f(\varphi(x))\varphi'(x)\,dx=F(\varphi(x))+C
$$

This is the first kind, with no monotonicity required. If in addition $\varphi$ is strictly monotone and differentiable on $J$ with $\varphi'\ne0$, then its inverse $t=\varphi^{-1}(x)$ exists and is differentiable, and

$$
\int f(x)\,dx=\int f(\varphi(t))\varphi'(t)\,dt\Big|_{t=\varphi^{-1}(x)}
$$

This is the second kind. The two identities are one identity read in opposite directions, except that the second requires converting back.

## How this lecture connects to the others

- **Antiderivatives** are the other half of the fundamental theorem: Newton–Leibniz reduces a definite integral to an antiderivative.
- **The substitution formula** acquires change of limits in the definite integral, $\int_{a}^{b}f(\varphi(x))\varphi'(x)dx=\int_{\varphi(a)}^{\varphi(b)}f(u)du$, with stricter hypotheses than the indefinite case.
- **"No universal integration method"** recurs in integration by parts, partial fractions and rational trigonometric forms: each method covers one class of integrands rather than all of them, and non-elementary antiderivatives show that the table is incomplete, a gap that series and numerical integration later repair.

The next lecture turns the product rule around to get integration by parts, and begins splitting rational functions into blocks that integrate term by term.