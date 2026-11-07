---
slug: "connected-set"
subject: "analysis"
unit: "u11"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Connected Sets and Domains"
subtitle: "One piece, not two"
minutes: 14
meta: ["14 min read","Requires elementary mathematics","Mastery level"]
concepts: ["euclid", "multi"]
prereq: ["multi"]
related: ["euclid", "cont"]
---

## Goal

By the end of this lecture you can decide whether a point set is connected, explain why a continuous function on a connected set satisfies the intermediate value theorem, and distinguish a connected open set from a domain.

Compactness secures extrema; connectedness secures intermediate values. Together they restore the closed-interval theorems in $\mathbb{R}^n$.

## Three-line recap

- A connected set cannot be written as two disjoint nonempty open pieces.
- Connected subsets of $\mathbb{R}$ are exactly intervals; balls and convex sets in $\mathbb{R}^n$ are connected.
- A continuous image of a connected set is connected — the geometric form of the intermediate value theorem.

## Connectedness: not two pieces

A set $S\subset\mathbb{R}^n$ is **disconnected** if there are open sets $U,V$ with
$$S\subset U\cup V,\qquad S\cap U\ne\varnothing,\qquad S\cap V\ne\varnothing,\qquad S\cap U\cap V=\varnothing.$$
Otherwise $S$ is **connected**. The pieces $S\cap U$ and $S\cap V$ are relatively open in $S$, cover $S$, and are disjoint.

The definition uses only open sets, reusing the previous lecture's language. The question is separation, not seams: a wildly bent curve can still be connected.

## Examples and tests

The connected subsets of $\mathbb{R}$ are precisely the intervals. If $S$ is not an interval, there are $a<c<b$ with $a,b\in S$ and $c\notin S$; then $U=(-\infty,c)$ and $V=(c,\infty)$ separate $S$.

In $\mathbb{R}^n$:

| Set | Connected? | Reason |
| --- | --- | --- |
| Ball $B(a,r)$ | Yes | Convex: the segment between two points stays inside |
| Two disjoint open discs | No | The discs themselves separate the union |
| $A=\{(x,y):xy>0\}$ | No | Splits into the first and third quadrants |
| Annulus $1<x^2+y^2<4$ | Yes | A polygonal path stays inside |
| Plane minus the unit circle | No | Splits into inside and outside |

Convexity of the ball follows from $\|(1-t)x+ty-a\|\le(1-t)\|x-a\|+t\|y-a\|<r$. The unit circle itself is the continuous image of $[0,2\pi)$ under $(\cos t,\sin t)$, hence connected.

Holes do not automatically disconnect: an annulus has a hole yet remains connected. A hole must run through the whole set to cut it in two.

## Continuous images stay connected

If $f:S\to\mathbb{R}$ is continuous and $S$ is connected, then $f(S)$ is a connected subset of $\mathbb{R}$, hence an interval. This is the **intermediate value theorem**: if $x,y\in S$ and $f(x)<c<f(y)$, then $f(z)=c$ for some $z\in S$.

Proof by contradiction: if $c\notin f(S)$, the sets $f^{-1}(U)$ and $f^{-1}(V)$ with $U=(-\infty,c)$ and $V=(c,\infty)$ are two disjoint nonempty relatively open pieces of $S$, contradicting connectedness.

Example: $f(x,y)=x-y$ is continuous on the closed disc $x^2+y^2\le1$, which is connected. Since $f(1,0)=1$ and $f(0,1)=-1$, the image is $[-1,1]$, so $x-y=1/2$ has a solution; indeed $(1/2,0)$ works.

## Domains and path connectedness

$S$ is **path connected** if for every $x,y\in S$ there is a continuous curve $\gamma:[0,1]\to S$ with $\gamma(0)=x$ and $\gamma(1)=y$. Path connected implies connected, because $[0,1]$ is connected and its continuous image is connected.

The converse fails in general; the standard counterexample is the topologist’s sine curve
$$\{(x,\sin(1/x)):0<x\le1\}\cup(\{0\}\times[-1,1]),$$
which is connected but cannot be traversed from the sine part to the vertical segment. In $\mathbb{R}^n$, however, **an open set is connected exactly when it is path connected**: a polygonal path can go around any gap.

A **domain** is a connected open set. Discs, the half-plane $x>0$, and the annulus $1<x^2+y^2<4$ are domains; the union of two disjoint open discs is not. Domains are the default setting for multivariable calculus: openness permits differentiation, connectedness permits intermediate values and antiderivatives.

> [!NOTE]
> Domain = connected + open. Without openness, differentiability at the boundary is not defined; without connectedness, the intermediate value theorem fails.

## Three misconceptions

> [!MYTH] Every open set is connected.
> The union of two disjoint open discs is open yet separated by those very discs. Openness gives each point a ball, not a single piece.

> [!MYTH] Connected sets are always path connected.
> False in general; the topologist’s sine curve is the standard example. Only for open subsets of $\mathbb{R}^n$ do the two notions coincide, so do not silently replace one by the other.

> [!MYTH] A set with a hole cannot be connected.
> The annulus $1<x^2+y^2<4$ has a hole, but any two of its points can be joined by a polygonal path inside it. A hole must open into a cut before it disconnects the set.

## Practice

> [!PRACTICE] 1 · Decide connectivity
> Are $A=\{(x,y):xy>0\}$ and $B=\{(x,y):1<x^2+y^2<4\}$ connected?
>
> > [!ANSWER] Show answer
> > $A$ is disconnected: $U=\{x>0\}$ and $V=\{x<0\}$ split it into the first and third quadrants. $B$ is connected, even path connected: join two points by a circular arc plus radial segments, all inside the annulus.

> [!PRACTICE] 2 · Continuous image
> What is the image of $f(x,y)=x^2+y^2$ on the annulus $1\le x^2+y^2\le4$?
>
> > [!ANSWER] Show answer
> > The annulus is connected and compact, so the image is a closed interval. The minimum is $1$ on the inner boundary and the maximum is $4$ on the outer boundary, and all intermediate values occur, so the image is $[1,4]$.

> [!PRACTICE] 3 · Use the IVT
> Show that $x-y=1/2$ has a solution in the closed disc $x^2+y^2\le1$.
>
> > [!ANSWER] Show answer
> > $f(x,y)=x-y$ is continuous and the disc is connected. Since $f(1,0)=1$ and $f(0,1)=-1$, and $1/2\in[-1,1]$, the intermediate value theorem gives a solution; for instance $(1/2,0)$.

> [!PRACTICE] 4 · Prove path connectedness
> Show that $\mathbb{R}^2\setminus\{(0,0)\}$ is path connected.
>
> > [!ANSWER] Show answer
> > Take any two points $x,y$. If the segment $[x,y]$ avoids the origin, use it. If it passes through the origin, pick a point $z$ off the line $xy$; the broken path $x\to z\to y$ avoids the origin and is continuous.

## Formal statement

> [!FORMAL] Formal statement
> $S\subset\mathbb{R}^n$ is disconnected if there are open sets $U,V$ with $S\subset U\cup V$, $S\cap U\ne\varnothing$, $S\cap V\ne\varnothing$, and $S\cap U\cap V=\varnothing$; otherwise $S$ is connected. Continuous maps preserve connectedness: if $f:S\to\mathbb{R}$ is continuous and $S$ is connected, then $f(S)$ is an interval. $S$ is path connected if every pair $x,y\in S$ is joined by a continuous $\gamma:[0,1]\to S$; path connected implies connected. A domain is a connected open set, and on open subsets of $\mathbb{R}^n$ connectedness and path connectedness are equivalent.
