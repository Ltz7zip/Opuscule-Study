---
slug: "infinit-small"
subject: "analysis"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Infinitesimals and Infinities"
subtitle: "Comparing who vanishes faster"
minutes: 14
meta: ["14 min read","Requires limits of functions","Mastery level"]
concepts: ["funclim"]
prereq: ["funclim"]
related: ["cont", "deriv"]
---

## Goals

A quantity with limit zero is called infinitesimal. By itself it carries little information; the ratio of two infinitesimals does. If the numerator vanishes faster, the ratio tends to zero; if both vanish at the same rate, the ratio tends to a nonzero constant.

By the end you can compare orders, recall six standard equivalences, and use replacements safely in products and quotients but not in sums.

## Three-line recap

- An infinitesimal is a variable with limit zero, not a tiny number; the only constant infinitesimal is $0$.
- $f(x)\to A$ is equivalent to $f(x)-A$ being infinitesimal.
- Equivalent infinitesimals may be substituted inside products and quotients, never blindly inside sums, where leading terms can cancel.

## Definition and algebra

If $\lim_{x\to x_0}\alpha(x)=0$, then $\alpha$ is infinitesimal as $x\to x_0$.

Immediately, $\lim_{x\to x_0}f(x)=A$ iff $f(x)=A+\alpha(x)$ with $\alpha$ infinitesimal. Every limit statement becomes a main term plus a remainder.

Finitely many infinitesimals may be added or multiplied and remain infinitesimal; a bounded function times an infinitesimal is infinitesimal. The last rule explains many limits: $\left|x\sin\dfrac{1}{x}\right| \le |x|$, where $|x|$ is infinitesimal and $\sin(1/x)$ is bounded.

“Finitely many” cannot be dropped. Adding $n$ copies of $1/n$ gives $1$, and the number of terms changes with $n$.

## Comparing orders

Let $\alpha,\beta$ be infinitesimal as $x\to x_0$, with $\alpha\ne 0$ on a punctured neighbourhood.

- If $\dfrac{\beta}{\alpha}\to 0$, then $\beta$ is of higher order than $\alpha$, written $\beta=o(\alpha)$.
- If $\dfrac{\beta}{\alpha}\to c \ne 0$, they are of the same order.
- If $\dfrac{\beta}{\alpha}\to 1$, they are equivalent, written $\beta\sim\alpha$.

Equivalence is stronger than same order: $x$ and $2x$ have the same order but are not equivalent, while $x$ and $\sin x$ are.

The standard list as $x\to 0$:

$$
\sin x \sim x,\quad \tan x \sim x,\quad \arcsin x \sim x,\quad \arctan x \sim x,
$$

$$
1-\cos x \sim \frac{x^2}{2},\quad \ln(1+x)\sim x,\quad e^x-1\sim x,\quad (1+x)^\alpha - 1 \sim \alpha x .
$$

Each follows from the definition of the derivative or a basic limit. For instance, $1-\cos x = 2\sin^2\dfrac{x}{2} \sim 2\cdot\dfrac{x^2}{4} = \dfrac{x^2}{2}$.

## Equivalences and one counterexample

Inside products and quotients, replacement is safe: if $\alpha\sim\alpha'$ and $\beta\sim\beta'$, then $\lim \dfrac{\beta}{\alpha} = \lim \dfrac{\beta'}{\alpha'}$.

Inside sums and differences it is not. Consider

$$
\lim_{x\to 0}\frac{\tan x - \sin x}{x^3}.
$$

Replacing both $\tan x$ and $\sin x$ by $x$ gives $x-x=0$, the wrong answer. Factor first:

$$
\tan x - \sin x = \tan x(1-\cos x) \sim x \cdot \frac{x^2}{2} = \frac{x^3}{2}.
$$

The limit is $\dfrac{1}{2}$. What cancels is the shared leading term; the true order comes from the next layer.

## Infinities

If for every $M>0$ there is a punctured neighbourhood on which $|f(x)|>M$, then $f$ is infinite, written $\lim f(x)=\infty$. As $x\to 0$, $\dfrac{1}{x}$ is infinite; as $x\to+\infty$, so is $x$.

Infinitesimals and infinities are reciprocals away from zero: if $\alpha\to 0$ and $\alpha\ne 0$, then $1/\alpha\to\infty$, and conversely.

Infinity is not a real number and does not obey arithmetic. $\infty-\infty$, $\dfrac{\infty}{\infty}$, and $0\cdot\infty$ are indeterminate forms requiring the concrete functions. $x^2-x\to+\infty$ while $(x+1)-x=1$; both look like $\infty-\infty$.

## Three misconceptions

> [!MYTH] An infinitesimal is a very small number such as $10^{-100}$.
> $10^{-100}$ is a constant whose limit is itself, not zero. An infinitesimal is a varying quantity: $x$, $\sin x$, $1-\cos x$. The only constant infinitesimal is $0$.

> [!MYTH] Equivalent infinitesimals can be substituted anywhere.
> In products and quotients yes; in sums and differences no. Replacing both terms of $\tan x-\sin x$ by $x$ gives $0$, while the true limit is $\dfrac{1}{2}$. Replace the whole expression, or factor first.

> [!MYTH] Infinity is a huge number, so $\infty-\infty=0$.
> Infinity describes unbounded growth, not a real value. $x^2-x\to+\infty$, $(x+1)-x=1$, and $x-x^2\to-\infty$ are all of the form $\infty-\infty$ with different outcomes.

## Practice

> [!PRACTICE] 1 · Basic replacement
> Find $\lim_{x\to 0}\dfrac{\sin 3x}{x}$.
>
> > [!ANSWER] Show answer
> > $\sin 3x \sim 3x$, so the limit is $3$. Equivalently, $\dfrac{\sin 3x}{3x}\cdot 3 \to 3$.

> [!PRACTICE] 2 · Double angle
> Find $\lim_{x\to 0}\dfrac{1-\cos 2x}{x^2}$.
>
> > [!ANSWER] Show answer
> > $1-\cos 2x \sim \dfrac{(2x)^2}{2} = 2x^2$, so the limit is $2$.

> [!PRACTICE] 3 · The sum trap
> Find $\lim_{x\to 0}\dfrac{\tan x-\sin x}{x^3}$.
>
> > [!ANSWER] Show answer
> > Factor $\tan x(1-\cos x) \sim x\cdot\dfrac{x^2}{2} = \dfrac{x^3}{2}$, so the limit is $\dfrac{1}{2}$. Replacing the two terms separately gives the wrong answer $0$.

> [!PRACTICE] 4 · A square root
> Find $\lim_{x\to 0}\dfrac{\sqrt{1+x}-1}{x}$.
>
> > [!ANSWER] Show answer
> > $(1+x)^{1/2}-1 \sim \dfrac{1}{2}x$, so the limit is $\dfrac{1}{2}$. Rationalising gives $\dfrac{x}{x(\sqrt{1+x}+1)} \to \dfrac{1}{2}$ as well.

> [!FORMAL] Formal statement
> $\alpha$ is infinitesimal at $x_0$ if $\lim_{x\to x_0}\alpha(x)=0$. $\beta=o(\alpha)$ means $\beta/\alpha\to 0$; $\beta\sim\alpha$ means $\beta/\alpha\to 1$. Equivalent factors may replace one another in products and quotients: if $\alpha\sim\alpha'$ and $\beta\sim\beta'$, then $\lim\beta/\alpha=\lim\beta'/\alpha'$, provided the denominators are nonzero on a punctured neighbourhood. Sums and differences generally do not preserve equivalence; factor out the leading term first.
