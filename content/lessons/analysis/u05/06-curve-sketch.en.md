---
slug: "curve-sketch"
subject: "analysis"
unit: "u05"
order: 6
mode: "mastery"
lang: "en"
kicker: "Lecture 6 · Mathematical Analysis · Mastery"
title: "Curve Sketching and Asymptotes"
subtitle: "Pin down the far behaviour before drawing the local bends"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["extremum", "lhopital"]
prereq: ["mvt"]
related: ["lhopital", "extremum"]
---

## Goals

By the end of this lecture you can sketch a curve in a fixed order: domain, symmetry, asymptotes, $f'$ and $f''$, sign table, key points — and mark the extrema and inflection points correctly on the picture.

Sketching is not dot-to-dot drawing. The far behaviour is fixed by asymptotes, the local behaviour by the signs of the derivatives, and only together do they form the graph. Get the order wrong and the picture lies.

## Three-line recap

- Monotonicity and convexity come from the signs of $f'$ and $f''$; their zeros only mark the boundaries.
- Behaviour at infinity is described by limits, and those limits often need L'Hôpital's rule.
- In one direction a curve has at most one dominant line — that is what an asymptote means.

## Three kinds of asymptote

| Type | Definition | How to find it |
| --- | --- | --- |
| Vertical | $\|f(x)\|\to+\infty$ as $x\to a$ | zeros of denominators, endpoints of domains |
| Horizontal | $f(x)\to b$ as $x\to\pm\infty$ | compute the two limits |
| Oblique | $f(x)-(ax+b)\to 0$ as $x\to\pm\infty$ | $a=\lim\dfrac{f(x)}{x}$, then $b=\lim\bigl(f(x)-ax\bigr)$ |

The oblique formula is not a trick, it is the definition rearranged: if $f(x)-ax-b\to 0$, dividing by $x$ gives $a=\lim f(x)/x$, and then $b=\lim(f(x)-ax)$ follows.

Note that $a=0$ degenerates the oblique asymptote into a horizontal one. So compute $a$ first: if $a=0$, switch to the horizontal limit; if $a$ does not exist, there is no asymptote in that direction.

## Three worked examples

**One**: $f(x)=\dfrac{x^2+1}{x}=x+\dfrac{1}{x}$. Then $a=\lim\dfrac{f(x)}{x}=1$ and $b=\lim\left(f(x)-x\right)=\lim\dfrac{1}{x}=0$, so $y=x$ is an oblique asymptote, and $x=0$ is vertical.

**Two**: $f(x)=\dfrac{2x^2-3}{x+1}$. Polynomial division gives $2x^2-3=(x+1)(2x-2)-1$, that is $f(x)=2x-2-\dfrac{1}{x+1}$. Hence $y=2x-2$ is oblique and $x=-1$ is vertical.

**Three**: $f(x)=\sqrt{x^2+x}$. Here $a=\lim\dfrac{\sqrt{x^2+x}}{x}$ equals $1$ as $x\to+\infty$ and $-1$ as $x\to-\infty$. The two directions have different asymptotes, so they must be computed separately.

## A fixed sketching routine

Take $f(x)=\dfrac{x}{1+x^2}$ through the steps:

1. **Domain**: all reals, no vertical asymptote.
2. **Symmetry**: $f(-x)=-f(x)$, odd, so the graph is symmetric about the origin and it suffices to draw $x\ge 0$.
3. **Asymptotes**: $\lim_{x\to\pm\infty}f(x)=0$, so $y=0$ is horizontal; since $f(x)/x\to 0$, there is no oblique one.
4. **First derivative**: $f'(x)=\dfrac{1-x^2}{(1+x^2)^2}$ with zeros $\pm1$. At $x=1$ the sign goes $+$ to $-$, giving a maximum $\dfrac{1}{2}$; at $x=-1$ a minimum $-\dfrac{1}{2}$.
5. **Second derivative**: $f''(x)=\dfrac{2x(x^2-3)}{(1+x^2)^3}$, zero at $0,\pm\sqrt3$, with a sign change at each, so three inflection points.
6. **Key points**: $f(0)=0$, $f(1)=\dfrac12$, $f(\sqrt3)=\dfrac{\sqrt3}{4}\approx0.433$.

Putting it together: the curve climbs from the origin to its highest point $0.5$ at $x=1$, then decays slowly towards the horizontal asymptote $y=0$; by symmetry the left side first drops to $-0.5$ and then returns to $0$.

> [!NOTE]
> Put the zeros of $f'$ and $f''$ on the same number line and mark signs interval by interval. That is far more reliable than plotting points one at a time.

## Three misconceptions

> [!MYTH] A curve can have a horizontal and an oblique asymptote in the same direction.
> Not in the same direction. If $f(x)\to b$, then $f(x)/x\to 0$, so the oblique slope can only be $0$ and the "oblique" line is that same horizontal line. The two directions may differ, as with $\sqrt{x^2+x}$.

> [!MYTH] A curve never crosses its asymptote.
> It can, even infinitely often. $f(x)=\dfrac{\sin x}{x}$ has $y=0$ as a horizontal asymptote and crosses it at every $x=k\pi$. An asymptote describes distant behaviour, not a barrier.

> [!MYTH] Finding an oblique asymptote means dividing numerator by denominator.
> That works only for rational functions whose numerator degree exceeds the denominator degree by exactly one. In general use $a=\lim f(x)/x$ and $b=\lim(f(x)-ax)$; $\sqrt{x^2+x}$ has no denominator to divide.

## Practice

> [!PRACTICE] 1 · Oblique asymptote
> Find all asymptotes of $f(x)=\dfrac{2x^2-3}{x+1}$.
>
> > [!ANSWER] Show answer
> > Division gives $f(x)=2x-2-\dfrac{1}{x+1}$, so $y=2x-2$ is oblique; $f$ is unbounded as $x\to-1$, so $x=-1$ is vertical. There is no horizontal asymptote.

> [!PRACTICE] 2 · Different on each side
> Find the oblique asymptotes of $f(x)=\sqrt{x^2+x}$ as $x\to\pm\infty$.
>
> > [!ANSWER] Show answer
> > As $x\to+\infty$: $a=1$ and $b=\lim(\sqrt{x^2+x}-x)=\lim\dfrac{x}{\sqrt{x^2+x}+x}=\dfrac12$, so $y=x+\dfrac12$. As $x\to-\infty$: $a=-1$ and $b=\lim(\sqrt{x^2+x}+x)=\lim\dfrac{x}{\sqrt{x^2+x}-x}=-\dfrac12$, so $y=-x-\dfrac12$.

> [!PRACTICE] 3 · A rational function
> Find the asymptotes of $f(x)=\dfrac{x^2-1}{x^2-4}$ and its intervals of monotonicity.
>
> > [!ANSWER] Show answer
> > Vertical asymptotes $x=\pm2$, horizontal $y=1$. And $f'(x)=\dfrac{-6x}{(x^2-4)^2}$: positive for $x<0$ (increasing on $(-\infty,-2)$ and $(-2,0)$), negative for $x>0$ (decreasing on $(0,2)$ and $(2,+\infty)$).

> [!PRACTICE] 4 · Does it cross?
> Does $f(x)=\dfrac{\sin x}{x}$ have a horizontal asymptote? Does the curve cross it?
>
> > [!ANSWER] Show answer
> > Yes, $y=0$, since $|\sin x|\le1$ while $x\to\infty$. At $x=k\pi$ with $k\ne0$ we have $f=0$ and the values on the two sides have opposite signs, so the curve crosses the asymptote at each of those points.

> [!FORMAL] Formal statement
> If $\lim_{x\to+\infty}\bigl(f(x)-(ax+b)\bigr)=0$, the line $y=ax+b$ is called an oblique asymptote of $f$ in the $x\to+\infty$ direction. In that case necessarily $a=\lim_{x\to+\infty}\dfrac{f(x)}{x}$ and $b=\lim_{x\to+\infty}\bigl(f(x)-ax\bigr)$, so the asymptote exists exactly when both limits exist and are finite. If $|f(x)|\to+\infty$ as $x\to a$ from one side, then $x=a$ is a vertical asymptote.
