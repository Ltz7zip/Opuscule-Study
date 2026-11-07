---
slug: "compact-set"
subject: "analysis"
unit: "u11"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Compact Sets"
subtitle: "Compress infinitely many open sets into finitely many"
minutes: 15
meta: ["15 min read","Requires elementary mathematics","Mastery level"]
concepts: ["multi", "euclid"]
prereq: ["multi"]
related: ["contprop", "multi"]
---

## Goal

By the end of this lecture you can define compactness by open covers, decide compactness in $\mathbb{R}^n$ by “bounded and closed”, and explain why a continuous function on a compact set attains its extrema and is uniformly continuous.

Compactness generalises finiteness: it keeps “take only finitely many” legal against infinitely many open sets. The extreme value theorem and uniform continuity are direct consequences.

## Three-line recap

- A compact set is one where every open cover has a finite subcover.
- In $\mathbb{R}^n$, compact means bounded and closed — the Heine–Borel theorem.
- A continuous function on a compact set is bounded, attains its extrema, and is uniformly continuous.

## Open covers and compactness

An **open cover** of $K\subset\mathbb{R}^n$ is a family of open sets $\{U_\alpha\}$ with $K\subset\bigcup_\alpha U_\alpha$. The set $K$ is **compact** if every open cover contains finitely many members $U_{\alpha_1},\dots,U_{\alpha_m}$ that still cover $K$.

$[0,1]$ is compact. $(0,1)$ is not: the sets $U_k=(1/k,1)$, $k=2,3,\dots$, cover it, but any finite subfamily has a largest index $K$, and $U_K=(1/K,1)$ misses $(0,1/K]$. The line $\mathbb{R}$ is not compact either, since $(-k,k)$ has no finite subcover.

> [!NOTE]
> Heine–Borel: a subset of $\mathbb{R}^n$ is compact if and only if it is bounded and closed.

Examples: $[0,1]\cup\{2\}$ is compact; $\{1/m:m\ge1\}\cup\{0\}$ is compact; the open ball $B(0,1)$ is bounded but not closed, hence not compact; the closed ball $\{x:\|x\|\le1\}$ is compact. Check boundedness first, then closedness; both are required.

## Continuous images of compact sets

Let $f:K\to\mathbb{R}$ be continuous and $K$ compact. Take any open cover $\{V_\alpha\}$ of $f(K)$. The preimages $\{f^{-1}(V_\alpha)\}$ form an open cover of $K$, so finitely many $f^{-1}(V_{\alpha_1}),\dots,f^{-1}(V_{\alpha_m})$ cover $K$. Their images $V_{\alpha_1},\dots,V_{\alpha_m}$ cover $f(K)$, so $f(K)$ is compact.

This pulls the problem back to $\mathbb{R}$: a compact image is bounded and closed, hence has a largest and a smallest element.

## Extreme values, with computations

**Extreme value theorem.** If $K$ is compact and $f$ is continuous on $K$, there exist $a,b\in K$ with
$$f(a)=\max_{x\in K}f(x),\qquad f(b)=\min_{x\in K}f(x).$$
Indeed $f(K)$ is compact, hence bounded and closed; boundedness gives a supremum $M$, and closedness puts $M$ back in $f(K)$.

Example: $f(x,y)=x^2+2y^2$ on the closed disc $x^2+y^2\le1$ has maximum $2$ at $(0,\pm1)$ and minimum $0$ at $(0,0)$. For $g(x,y)=xy$ on $[0,1]^2$, the bound $xy\le\big((x+y)/2\big)^2\le1$ gives $xy\le1/4$, attained at $(1/2,1/2)$; the minimum $0$ is attained on both axes.

Without compactness the conclusion collapses: $f(x)=x$ on $(0,1)$ has neither a maximum nor a minimum, and $f(x)=1/x$ on $(0,1]$ is unbounded.

## Uniform continuity on compact sets

$f$ is **uniformly continuous** on $D$ if
$$\forall\varepsilon>0\ \exists\delta>0:\ x,y\in D,\ \|x-y\|<\delta\ \Longrightarrow\ |f(x)-f(y)|<\varepsilon.$$
The point is that $\delta$ depends only on $\varepsilon$, not on location. **Cantor’s theorem**: a continuous function on a compact set is uniformly continuous.

The compactness hypothesis cannot be dropped. $f(x)=1/x$ is continuous on $(0,1]$ but not uniformly: take $x_n=1/n$ and $y_n=1/(n+1)$; then $|x_n-y_n|=1/(n(n+1))\to0$, while $|f(x_n)-f(y_n)|=1$ never drops below $\varepsilon=1$. Likewise $x^2$ on $\mathbb{R}$: with $x_n=n$ and $y_n=n+1/n$ the distance tends to $0$ but the value difference tends to $2$.

A positive example: $f(x,y)=x+y$ is uniformly continuous on $\mathbb{R}^2$, because $|(x_1+y_1)-(x_2+y_2)|\le\sqrt2\,\|(x_1,y_1)-(x_2,y_2)\|$, so $\delta=\varepsilon/\sqrt2$ works. Here the domain is not compact; compactness is sufficient, not necessary.

## Three misconceptions

> [!MYTH] Every bounded set is compact.
> $(0,1)$ is bounded but the cover $(1/k,1)$ has no finite subcover. Boundedness must be paired with closedness.

> [!MYTH] A continuous function on an open interval attains its maximum.
> $1/x$ is unbounded on $(0,1]$, and $x$ on $(0,1)$ has neither extremum. The extreme value theorem needs a compact domain; an open interval throws away the endpoints where the extremum would live.

> [!MYTH] Uniform continuity is just continuity.
> Continuity lets $\delta$ vary with the point; uniform continuity demands one $\delta$ for the whole set. $x^2$ is continuous on $\mathbb{R}$ but not uniformly continuous. Only on compact sets does Cantor’s theorem force the upgrade.

## Practice

> [!PRACTICE] 1 · Decide compactness
> Which are compact in $\mathbb{R}^2$: (a) $[0,1]\times[0,1]$; (b) $\{(1/m,0):m\ge1\}$; (c) $B(0,1)$?
>
> > [!ANSWER] Show answer
> > (a) Bounded and closed, so compact. (b) Bounded but not closed, since $(0,0)$ is a limit point outside it, so not compact. (c) Bounded but open and not closed, so not compact.

> [!PRACTICE] 2 · Find extrema
> Find the maximum and minimum of $f(x,y)=x^2+y^2-2x$ on the closed disc $x^2+y^2\le4$.
>
> > [!ANSWER] Show answer
> > Interior: $f_x=2x-2=0$, $f_y=2y=0$ gives $(1,0)$ with $f=-1$. On the boundary $x^2+y^2=4$, $f=4-2x$ with $x\in[-2,2]$, so the maximum is $8$ at $x=-2$ and the minimum is $0$ at $x=2$. Hence the maximum is $8$ at $(-2,0)$ and the minimum is $-1$ at $(1,0)$.

> [!PRACTICE] 3 · Prove uniform continuity
> Show that $f(x,y)=x+y$ is uniformly continuous on $\mathbb{R}^2$.
>
> > [!ANSWER] Show answer
> > For any two points, $|(x_1+y_1)-(x_2+y_2)|\le|x_1-x_2|+|y_1-y_2|\le\sqrt2\,\|(x_1,y_1)-(x_2,y_2)\|$. Take $\delta=\varepsilon/\sqrt2$; then distances below $\delta$ force value differences below $\varepsilon$.

> [!PRACTICE] 4 · Prove non-compactness
> Use an open cover to show that $(0,1)$ is not compact.
>
> > [!ANSWER] Show answer
> > Take $U_k=(1/k,1)$ for $k=2,3,\dots$. For any $x\in(0,1)$, choose $k>1/x$ to get $x\in U_k$, so this is an open cover. A finite subcover has a largest index $K$, and $U_K=(1/K,1)$ misses points of $(0,1/K]$, a contradiction.

## Formal statement

> [!FORMAL] Formal statement
> $K\subset\mathbb{R}^n$ is compact if every open cover of $K$ has a finite subcover. Heine–Borel: $K$ is compact iff $K$ is bounded and closed. If $f:K\to\mathbb{R}$ is continuous and $K$ is compact, then $f(K)$ is compact, so $f$ is bounded and attains a maximum and a minimum on $K$. Cantor: a continuous function on a compact set is uniformly continuous, that is, $\forall\varepsilon>0\ \exists\delta>0$ such that $x,y\in K$ and $\|x-y\|<\delta$ imply $|f(x)-f(y)|<\varepsilon$.
