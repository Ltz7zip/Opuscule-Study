---
slug: "multi-limit"
subject: "analysis"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Mathematical Analysis · Mastery"
title: "Limits and Continuity in Several Variables"
subtitle: "Every path must lead to the same value"
minutes: 15
meta: ["15 min read","Requires elementary mathematics","Mastery level"]
concepts: ["multi", "euclid"]
prereq: ["euclid"]
related: ["cont", "multi"]
---

## Goal

By the end of this lecture you can write the $\varepsilon$-$\delta$ definition of a multivariable limit, construct a counterexample from a single path, and evaluate limits by inequalities or polar coordinates.

A one-variable limit has only two directions. A multivariable limit has infinitely many paths, and the definition has to control all of them at once.

## Three-line recap

- A multivariable limit exists only when every path into the point gives the same value.
- Proving existence needs an inequality or polar estimate; disproving it needs just two paths with different values.
- Continuity means the limit equals the value, and sums, products, quotients, and compositions preserve it.

## Definition and sequential form

Let $f$ be defined on $D\subset\mathbb{R}^n$ and let $a$ be a limit point of $D$. We write $\lim_{x\to a}f(x)=L$ if
$$\forall\varepsilon>0\ \exists\delta>0:\ 0<\|x-a\|<\delta,\ x\in D\ \Longrightarrow\ |f(x)-L|<\varepsilon.$$
The condition $0<$ excludes $x=a$, so the value at $a$ is irrelevant.

The limit is unique: if $L_1$ and $L_2$ both qualify, then $|L_1-L_2|\le|L_1-f(x)|+|f(x)-L_2|<\varepsilon$ for every $\varepsilon>0$, hence $L_1=L_2$.

Sequentially, the limit is $L$ exactly when $f(x^{(k)})\to L$ for every sequence $x^{(k)}\to a$ with $x^{(k)}\ne a$. Negating this is the standard counterexample machine: two sequences, two different limits, no limit.

## Paths: lines and parabolas

First consider
$$f(x,y)=\frac{xy}{x^2+y^2}\quad((x,y)\ne(0,0)),\qquad f(0,0)=0.$$
Along $y=kx$,
$$f(x,kx)=\frac{kx^2}{x^2+k^2x^2}=\frac{k}{1+k^2}.$$
This depends on $k$: $0$ for $k=0$, $1/2$ for $k=1$, $-1/2$ for $k=-1$. Two lines give two values, so the limit at the origin does not exist and $f$ is discontinuous there.

The function tends to a definite number along every line through the origin, but those numbers disagree. Inconsistency along paths is already fatal; no exotic curve is needed.

Lines are still not enough. Now consider
$$g(x,y)=\frac{x^2y}{x^4+y^2}\quad((x,y)\ne(0,0)),\qquad g(0,0)=0.$$
Along every line $y=mx$,
$$g(x,mx)=\frac{mx^3}{x^4+m^2x^2}=\frac{mx}{x^2+m^2}\longrightarrow0.$$
All lines agree on $0$, which invites the wrong conclusion. Try the parabola $y=kx^2$:
$$g(x,kx^2)=\frac{kx^4}{x^4+k^2x^4}=\frac{k}{1+k^2},$$
again dependent on $k$: $1/2$ for $k=1$, $0$ for $k=0$. The limit still fails. Checking every line is necessary-looking but never sufficient.

## Polar coordinates and estimates

If $|f(x,y)-L|$ can be bounded by a quantity depending only on $r=\sqrt{x^2+y^2}$ and tending to $0$, the limit holds. For example,
$$\left|\frac{x^2y}{x^2+y^2}\right|\le|y|\le r\longrightarrow0,$$
because $x^2/(x^2+y^2)\le1$. Similarly,
$$\left|\frac{xy}{\sqrt{x^2+y^2}}\right|=r|\cos\theta\sin\theta|\le\frac{r}{2}\longrightarrow0.$$
In polar form, if the angular factor stays bounded, the whole expression is controlled by $Cr$. The angle may vary with $r$, so the bound must be uniform in $\theta$; fixing one $\theta$ proves nothing.

Polar form also exposes failure: $\frac{xy}{x^2+y^2}=\cos\theta\sin\theta$ is independent of $r$, so different angles give different values.

## Continuity and its algebra

$f$ is **continuous** at $a$ if $a\in D$, the limit exists, and $\lim_{x\to a}f(x)=f(a)$. Equivalently,
$$\forall\varepsilon>0\ \exists\delta>0:\ \|x-a\|<\delta,\ x\in D\ \Longrightarrow\ |f(x)-f(a)|<\varepsilon.$$
Polynomials, $\sin$, $\cos$, and $\exp$ are continuous on $\mathbb{R}^n$; sums, differences, products, quotients with nonzero denominator, and compositions preserve continuity.

Check the denominator first. The function $\frac{x^2y}{x^2+y^2}$ becomes continuous at the origin after defining the value as $0$, since $|f|\le|y|$. The function $\frac{xy}{x^2+y^2}$ stays discontinuous no matter what value is assigned at the origin, because the limit does not exist. A removable singularity in one variable need not be removable in two.

> [!NOTE]
> Continuity is local: only values near $a$ matter, and $|f(x)-f(a)|$ must be controllable by an arbitrarily small $\varepsilon$.

## Three misconceptions

> [!MYTH] If all straight-line limits agree, the multivariable limit exists.
> Not enough. $g(x,y)=\frac{x^2y}{x^4+y^2}$ tends to $0$ along every line but to $1/2$ along $y=x^2$. The set of paths is much larger than the set of lines.

> [!MYTH] Continuity in each variable separately implies joint continuity.
> Take $f(x,y)=\frac{xy}{x^2+y^2}$ with $f(0,0)=0$. With $y=0$ it is identically $0$, and with $x=0$ also $0$, so both one-variable slices are continuous. Yet along $y=x$, $f\to1/2\ne f(0,0)$.

> [!MYTH] A limit requires the function to be defined at the point.
> The definition uses $0<\|x-a\|<\delta$, excluding $a$. The function $\frac{\sin(x^2+y^2)}{x^2+y^2}$ is undefined at the origin but has limit $1$. Continuity adds the extra requirement that the value match the limit.

## Practice

> [!PRACTICE] 1 · Evaluate
> Find $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}$.
>
> > [!ANSWER] Show answer
> > Since $\frac{x^2}{x^2+y^2}\le1$, we get $\left|\frac{x^2y}{x^2+y^2}\right|\le|y|\to0$, so the limit is $0$.

> [!PRACTICE] 2 · Disprove
> Show that $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x+y}{x-y}$ does not exist.
>
> > [!ANSWER] Show answer
> > Along $y=0$ the quotient is $1$; along $x=0$ it is $-1$. Two paths, two values, so no limit.

> [!PRACTICE] 3 · Polar form
> Find $\displaystyle\lim_{(x,y)\to(0,0)}(x^2+y^2)\ln(x^2+y^2)$.
>
> > [!ANSWER] Show answer
> > Put $r^2=x^2+y^2$. The expression is $r^2\ln r^2=2r^2\ln r$, and $r^2\ln r\to0$ as $r\to0^+$, so the limit is $0$.

> [!PRACTICE] 4 · Extension
> The function $f(x,y)=\frac{\sin(xy)}{xy}$ is defined for $xy\ne0$. Can it be extended continuously to the origin, and with what value?
>
> > [!ANSWER] Show answer
> > Yes. With $t=xy\to0$, $\frac{\sin t}{t}\to1$, so the extension value is $f(0,0)=1$.

## Formal statement

> [!FORMAL] Formal statement
> Let $D\subset\mathbb{R}^n$, let $a$ be a limit point of $D$, and let $f:D\to\mathbb{R}$. Then $\lim_{x\to a}f(x)=L$ means: $\forall\varepsilon>0\ \exists\delta>0$ such that $x\in D$ and $0<\|x-a\|<\delta$ imply $|f(x)-L|<\varepsilon$. The limit is unique. $f$ is continuous at $a$ if $a\in D$ and $\lim_{x\to a}f(x)=f(a)$. If $f,g$ are continuous at $a$, so are $f\pm g$, $fg$, and $f/g$ when $g(a)\ne0$; if $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f\circ g$ is continuous at $a$.
