---
slug: "lhopital-rule"
subject: "analysis"
unit: "u05"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "L'Hôpital's Rule"
subtitle: "Indeterminate forms are converted, not guessed"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["lhopital", "mvt"]
prereq: ["mvt"]
related: ["mvt", "taylor"]
---

## Goals

By the end of this lecture you can decide whether a limit is an indeterminate form the rule applies to, check each hypothesis before using it, and produce a counterexample where the ratio of derivatives has no limit although the original limit exists.

The whole content of L'Hôpital's rule is Cauchy's mean value theorem applied to two functions that tend to zero (or to infinity) together. It changes the form of the problem, not its difficulty: skip the hypotheses and it still gives wrong answers.

## Three-line recap

- Cauchy's theorem says $\dfrac{f(b)-f(a)}{g(b)-g(a)}=\dfrac{f'(\xi)}{g'(\xi)}$ for some $\xi$ between $a$ and $b$.
- Let $b\to a$; both increments shrink, and if both shrink to zero the right side is a ratio of derivatives.
- So a $\dfrac{0}{0}$ question becomes a question about $\dfrac{f'}{g'}$, which can be converted again.

## The two versions of the rule

**Type $\frac{0}{0}$**: suppose $f(x)\to 0$ and $g(x)\to 0$ as $x\to a$, both are differentiable on a punctured neighbourhood of $a$, $g'(x)\ne 0$, and $\lim\dfrac{f'(x)}{g'(x)}$ exists (finite or $\pm\infty$). Then

$$\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)} .$$

**Type $\frac{\infty}{\infty}$**: replace "tends to zero" by "$|f(x)|\to+\infty$ and $|g(x)|\to+\infty$"; the conclusion is unchanged.

A standard hand computation:

$$\lim_{x\to 0}\frac{x-\sin x}{x^3}=\lim_{x\to 0}\frac{1-\cos x}{3x^2}=\lim_{x\to 0}\frac{\sin x}{6x}=\frac{1}{6}.$$

After the first step it is still $\frac{0}{0}$, after the second still $\frac{0}{0}$, and only the third gives $\frac{1}{6}$. Before each application we rechecked that numerator and denominator vanish together.

> [!NOTE]
> All three hypotheses matter: both functions tend to zero or both to infinity, the denominator's derivative is nonzero, and the limit of the derivative ratio exists.

## Simplify before applying

The rule is not the first reflex. Cancel what cancels, replace by equivalents, and often one line is enough.

| Limit | Brute force | Better route |
| --- | --- | --- |
| $\lim_{x\to 0}\dfrac{\sin 3x}{x}$ | differentiate twice | $\sin 3x\sim 3x$, answer $3$ |
| $\lim_{x\to 0}x\ln x$ | not an allowed form, rewrite | as $\dfrac{\ln x}{1/x}$, giving $\dfrac{1/x}{-1/x^2}=-x\to 0$ |
| $\lim_{x\to+\infty}\dfrac{\ln x}{x}$ | direct $\frac{\infty}{\infty}$ works | derivative ratio $\dfrac{1/x}{1}\to 0$ |

The second row matters: $x\ln x$ is $0\cdot(-\infty)$ as $x\to 0^+$, which is not one of the two forms. It must be rewritten as a quotient before the rule is even on the table.

## Two ways the rule fails

**Case one: not an indeterminate form at all.** $\lim_{x\to 0}\dfrac{x+1}{x+2}=\dfrac{1}{2}$. Blindly applying the rule gives $\dfrac{1}{1}=1$, which is not the answer to any question here. The hypotheses fail, so the conclusion has no reason to hold.

**Case two: the derivative ratio has no limit.** Take $f(x)=x+\sin x$ and $g(x)=x$ as $x\to+\infty$. Then

$$\frac{f(x)}{g(x)}=1+\frac{\sin x}{x}\to 1,$$

while $\dfrac{f'(x)}{g'(x)}=1+\cos x$ oscillates and has no limit. The original limit exists and the derivative ratio does not, so the rule is sufficient but not equivalent.

The correct response is to return to the definition or to a squeeze, not to announce that the original limit fails to exist.

## The circular-reasoning trap

Using the rule on $\lim_{x\to 0}\dfrac{\sin x}{x}$ gives $\cos 0=1$. The answer is right and the reasoning is not: the derivative $(\sin x)'=\cos x$ was derived using this very limit. That is circular.

The legitimate route proves $\sin x<x<\tan x$ for $0<x<\pi/2$, takes reciprocals, and squeezes: $\cos x<\dfrac{\sin x}{x}<1$, so the limit is $1$ as $x\to 0^+$. Only after this is $(\sin x)'=\cos x$ available.

The test for circularity is simple: does the proof of the derivative formula you are using depend on the limit you are computing?

## Three misconceptions

> [!MYTH] Any limit can be differentiated first and asked later.
> Only the forms $\frac{0}{0}$ and $\frac{\infty}{\infty}$ qualify. On $\lim_{x\to 0}\frac{x+1}{x+2}$ the rule gives $1$, while the true value is $\frac{1}{2}$.

> [!MYTH] If the derivative ratio has no limit, the original limit has none either.
> Counterexample: $\frac{x+\sin x}{x}\to 1$ while the ratio $1+\cos x$ has no limit. In that situation the rule gives no information; it does not give a negative verdict.

> [!MYTH] You can differentiate repeatedly without checking in between.
> After every step, recheck that the form is still indeterminate. $\lim_{x\to 0}\frac{e^x-1-x}{x^2}$ becomes $\frac{e^x}{2}\to\frac{1}{2}$ after two steps; it is no longer indeterminate, and one more differentiation produces the meaningless denominator $0$.

## Practice

> [!PRACTICE] 1 · Two applications
> Find $\lim_{x\to 0}\dfrac{\tan x-x}{x^3}$.
>
> > [!ANSWER] Show answer
> > The first step gives $\dfrac{\sec^2 x-1}{3x^2}=\dfrac{\tan^2 x}{3x^2}$, and $\tan x\sim x$ yields $\dfrac{1}{3}$. Continuing once more gives $\dfrac{2\sec^2x\tan x}{6x}\to\dfrac{1}{3}$, the same answer.

> [!PRACTICE] 2 · Change the type
> Find $\lim_{x\to 0^+}x\ln x$.
>
> > [!ANSWER] Show answer
> > Rewrite as $\dfrac{\ln x}{1/x}$, of type $\frac{\infty}{\infty}$. Differentiating gives $\dfrac{1/x}{-1/x^2}=-x\to 0$.

> [!PRACTICE] 3 · Decide whether it applies
> Find $\lim_{x\to+\infty}\dfrac{x+\cos x}{x}$ and say whether the rule applies directly.
>
> > [!ANSWER] Show answer
> > The expression equals $1+\dfrac{\cos x}{x}\to 1$. The derivative ratio is $\dfrac{1-\sin x}{1}$, which has no limit, so the rule does not apply; the value comes from direct estimation.

> [!PRACTICE] 4 · Trigonometric type
> Find $\lim_{x\to 0}\dfrac{1-\cos x}{x\sin x}$.
>
> > [!ANSWER] Show answer
> > With equivalents, $1-\cos x\sim x^2/2$ and $x\sin x\sim x^2$, so the ratio tends to $\dfrac{1}{2}$. By the rule, the first step gives $\dfrac{\sin x}{\sin x+x\cos x}$, still $\frac{0}{0}$; one more step gives $\dfrac{\cos x}{2\cos x-x\sin x}\to\dfrac{1}{2}$.

> [!FORMAL] Formal statement
> Type $\frac{0}{0}$: let $f,g$ be differentiable on a punctured neighbourhood of $a$ with $g'(x)\ne 0$, let $\lim_{x\to a}f(x)=\lim_{x\to a}g(x)=0$, and let $\lim_{x\to a}\frac{f'(x)}{g'(x)}=L$ (allowing $L=\pm\infty$). Then $\lim_{x\to a}\frac{f(x)}{g(x)}=L$. Proof: define $f(a)=g(a)=0$ and apply Cauchy's theorem on $[a,x]$ or $[x,a]$ to get $\frac{f(x)}{g(x)}=\frac{f'(\xi)}{g'(\xi)}$, then let $x\to a$. The $\frac{\infty}{\infty}$ case needs a separate proof but has the same conclusion.
