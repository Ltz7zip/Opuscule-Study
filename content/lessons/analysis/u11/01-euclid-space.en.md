---
slug: "euclid-space"
subject: "analysis"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Euclidean Space and Point Sets"
subtitle: "Turn “how close” into an inequality"
minutes: 14
meta: ["14 min read","Requires elementary mathematics","Mastery level"]
concepts: ["euclid"]
prereq: ["cartesian"]
related: ["euclid", "multi"]
---

## Goal

By the end of this lecture you can compute lengths and distances in $\mathbb{R}^n$, write “close enough” as an inequality, and decide whether a set is open, closed, or neither.

No functions yet. On the real line, $x$ is near $a$ when $|x-a|<\varepsilon$. In $\mathbb{R}^n$ there is no absolute value; the norm replaces it, and every later limit, continuity, and compactness argument runs through that norm.

## Three-line recap

- Every statement proved on $\mathbb{R}$ has to be proved again on $\mathbb{R}^n$.
- The entry point is not a function but the distance between two points.
- Once distance is fixed, balls, interior points, open sets, and closed sets follow in order.

## Inner product, norm, distance

For $x=(x_1,\dots,x_n)$ and $y=(y_1,\dots,y_n)$ in $\mathbb{R}^n$,
$$\langle x,y\rangle=\sum_{i=1}^{n}x_iy_i,\qquad \|x\|=\sqrt{\langle x,x\rangle},$$
and $d(x,y)=\|x-y\|$. Take $x=(1,2,2)$ and $y=(2,0,1)$. Then $\langle x,y\rangle=2+0+2=4$, $\|x\|=3$, $\|y\|=\sqrt5$, and $d(x,y)=\|(-1,2,1)\|=\sqrt6$.

Cauchy–Schwarz, $|\langle x,y\rangle|\le\|x\|\|y\|$, reads here as $4\le3\sqrt5\approx6.71$. Together with the triangle inequality $\|x+y\|\le\|x\|+\|y\|$, it gives $d$ positivity, symmetry, and the triangle inequality, so $d$ is a metric.

> [!NOTE]
> $\|x\|$ is the length of a vector; $d(x,y)$ is the distance between two points. Only the latter enters limit definitions.

## Balls, interior points, open sets

The **open ball** with centre $a$ and radius $r$ is
$$B(a,r)=\{x\in\mathbb{R}^n:\|x-a\|<r\}.$$
On $\mathbb{R}$ it is the interval $(a-r,a+r)$; in $\mathbb{R}^2$ it is a disc without its circle.

A point $a$ is **interior** to $S$ if $B(a,r)\subset S$ for some $r>0$; $S$ is **open** if every point is interior. A ball is itself open: take $x\in B(a,r)$ and set $\delta=r-\|x-a\|>0$. For any $y\in B(x,\delta)$,
$$\|y-a\|\le\|y-x\|+\|x-a\|<\delta+\|x-a\|=r,$$
so $B(x,\delta)\subset B(a,r)$.

Concretely, $S=\{(x,y):x>0\}$ is open, while $T=\{(x,y):x\ge0\}$ is not: every ball around $(0,0)$ contains points with $x<0$. Also $U=B(0,1)\cup\{(1,0)\}$ is not open, because every ball around $(1,0)$ leaves the disc.

Open sets are closed under arbitrary unions and finite intersections. Infinite intersections may fail: $\bigcap_{k\ge1}B(0,1+1/k)=\{x:\|x\|\le1\}$, which contains points with $\|x\|=1$ and is not open.

## Limit points, closed sets, closure

A point $a$ is a **limit point** of $S$ if every ball around $a$ meets $S$ at some point other than $a$. The union of $S$ with all its limit points is the **closure** $\overline S$. The set $S$ is **closed** if $\mathbb{R}^n\setminus S$ is open — equivalently, if $S$ contains all its limit points.

For example, $A=\{(1/m,1/n):m,n\in\mathbb{N}^*\}$ has $(0,0)$ as a limit point that it does not contain, so $A$ is not closed. The set $\{1/m:m\ge1\}\cup\{0\}$ is closed, while $(0,1)$ is not, since $0$ is a limit point outside it.

The sequential test is the one to use: $S$ is closed exactly when every convergent sequence in $S$ has its limit in $S$. Proving closure with sequences is usually shorter than with balls.

> [!NOTE]
> Closed does not mean “has a boundary”. $\mathbb{R}^n$ has empty boundary yet is closed; $B(0,1)$ has a boundary yet is not closed. Closure is about the complement being open, not about appearance.

## Convergence and coordinates

A sequence $x^{(k)}$ in $\mathbb{R}^n$ converges to $a$ when $\|x^{(k)}-a\|\to0$. Since
$$|x_i^{(k)}-a_i|\le\|x^{(k)}-a\|\le\sum_{j=1}^{n}|x_j^{(k)}-a_j|,$$
convergence in norm is equivalent to convergence of every coordinate. One vector problem becomes $n$ scalar problems.

For instance, $x^{(k)}=\big((1+1/k)^k,\,1/k\big)$ converges to $(e,0)$ in $\mathbb{R}^2$. This also gives the Cauchy criterion: if $\|x^{(k)}-x^{(l)}\|\to0$ as $k,l\to\infty$, the sequence converges.

## Three misconceptions

> [!MYTH] Open and closed are opposites.
> They are not. $\varnothing$ and $\mathbb{R}^n$ are both open and closed, and $[0,1)\subset\mathbb{R}$ is neither. Openness and closedness are independent properties, not two ends of one scale.

> [!MYTH] A set with a boundary is closed.
> Closed means the complement is open. $B(0,1)$ has a boundary but is not closed; $\mathbb{R}$ has no boundary but is closed. Test the limit points, not the picture.

> [!MYTH] Any intersection of open sets is open.
> Only finite intersections are guaranteed. $\bigcap_{k\ge1}B(0,1+1/k)=\{x:\|x\|\le1\}$ is a closed ball; the radii shrink to $1$ and leave the boundary behind.

## Practice

> [!PRACTICE] 1 · Compute
> Let $x=(1,-2,2)$ and $y=(3,1,-1)$. Find $\|x\|$, $\|y\|$, $d(x,y)$, and compare $d(x,y)$ with $\|x\|+\|y\|$.
>
> > [!ANSWER] Show answer
> > $\|x\|=\sqrt{1+4+4}=3$, $\|y\|=\sqrt{9+1+1}=\sqrt{11}$, $x-y=(-2,-3,3)$, so $d=\sqrt{4+9+9}=\sqrt{22}\approx4.69$. Also $3+\sqrt{11}\approx6.32>d$, because the vectors are not parallel.

> [!PRACTICE] 2 · Classify
> Is $A=\{(x,y):x>0,\ y\ge0\}$ open, closed, or neither?
>
> > [!ANSWER] Show answer
> > Neither. Every ball around $(1,0)$ contains points with $y<0$, so $A$ is not open; $(0,1)$ is a limit point not in $A$, so $A$ is not closed.

> [!PRACTICE] 3 · Prove
> Show that the complement of a closed ball, $\{x:\|x-a\|>r\}$, is open.
>
> > [!ANSWER] Show answer
> > Take $x$ with $\|x-a\|>r$ and set $\delta=(\|x-a\|-r)/2>0$. For $y\in B(x,\delta)$, $\|y-a\|\ge\|x-a\|-\|x-y\|>r+\delta>r$, so $B(x,\delta)$ lies in the complement.

> [!PRACTICE] 4 · Limit points
> Let $A=\{(1/m,0):m\in\mathbb{N}^*\}$. Describe $\overline A$ and decide whether $A$ is closed.
>
> > [!ANSWER] Show answer
> > The only limit point is $(0,0)$, so $\overline A=A\cup\{(0,0)\}$. Since $(0,0)\notin A$, the set $A$ is not closed.

## Formal statement

> [!FORMAL] Formal statement
> Let $S\subset\mathbb{R}^n$. $S$ is open if $\forall a\in S\ \exists r>0:\ B(a,r)\subset S$. $S$ is closed if $\mathbb{R}^n\setminus S$ is open, equivalently if every convergent sequence $\{x^{(k)}\}\subset S$ has its limit in $S$. The norm satisfies (i) $\|x\|\ge0$ with equality only at $x=0$; (ii) $\|\lambda x\|=|\lambda|\|x\|$; (iii) $\|x+y\|\le\|x\|+\|y\|$. Property (iii) yields $d(x,z)\le d(x,y)+d(y,z)$, the arithmetic behind every $\varepsilon$-$\delta$ argument that follows.
