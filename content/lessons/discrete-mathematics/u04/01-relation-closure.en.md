---
slug: "relation-closure"
subject: "discrete-mathematics"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Properties, Composition, and Closure of Relations"
subtitle: "Treating a relation as a graph you can walk"
minutes: 16
meta: ["16 min read","Requires ordered pairs and Cartesian products","Mastery level"]
concepts: ["relation", "cartesian", "set"]
prereq: ["cartesian"]
related: ["map", "numalg"]
---

## What you will get

By the end of this lecture you can decide whether a binary relation is reflexive, symmetric, or transitive, compute the composite of two relations, and find its reflexive, symmetric, and transitive closures.

Three things: what each of five properties constrains, why composition is not commutative, and why a closure must be minimal.

## Three lines back

- A binary relation on $A$ is a subset of $A\times A$; its elements are ordered pairs.
- Each pair can be read as a directed edge, and the relation matrix records whether the edge exists.
- Properties constrain the whole edge set; a closure adds the fewest edges that make a property hold.

## The five basic properties

| Property | Definition | Matrix/graph picture |
| --- | --- | --- |
| Reflexive | $\forall x\in A,\ (x,x)\in R$ | diagonal all 1, a loop at every point |
| Irreflexive | $\forall x\in A,\ (x,x)\notin R$ | diagonal all 0 |
| Symmetric | $(x,y)\in R\to(y,x)\in R$ | symmetric matrix, edges in pairs |
| Antisymmetric | $(x,y)\in R\land(y,x)\in R\to x=y$ | at most one edge between distinct points |
| Transitive | $(x,y)\in R\land(y,z)\in R\to(x,z)\in R$ | two steps imply one step |

Take $A=\{1,2,3\}$ and $R=\{(1,1),(1,2),(2,3)\}$:

| Property | Verdict | Reason |
| --- | --- | --- |
| Reflexive | no | missing $(2,2)$ and $(3,3)$ |
| Irreflexive | no | contains $(1,1)$ |
| Symmetric | no | contains $(1,2)$ but not $(2,1)$ |
| Antisymmetric | yes | no reversed pair of distinct points |
| Transitive | no | $(1,2),(2,3)\in R$ but $(1,3)\notin R$ |

"Antisymmetric" is not the negation of "symmetric". The identity $I_A$ is both symmetric and antisymmetric; the empty relation is irreflexive, symmetric, antisymmetric, and transitive. Boundary cases must be counted.

## Composition and powers

With the convention used here,

$$
R\circ S=\{(x,z)\mid\exists y\,((x,y)\in R\land(y,z)\in S)\}
$$

that is, traverse $R$ first and then $S$. Let $R=\{(1,2),(2,3)\}$ and $S=\{(2,4),(3,5)\}$. Then

$$
R\circ S=\{(1,4),(2,5)\},\qquad S\circ R=\varnothing
$$

The results differ, so composition is not commutative. The path reading makes it clear: $R\circ S$ collects two-edge walks whose first edge is in $R$ and second in $S$.

Powers are defined by $R^0=I_A$ and $R^{n+1}=R^n\circ R$. Above, $R^2=R\circ R=\{(1,3)\}$ and $R^3=\varnothing$. In general $R^n$ collects the endpoints of walks of length $n$.

## Three closures

The reflexive closure $r(R)$ is the smallest reflexive relation containing $R$, obtained by adding the missing diagonal:

$$
r(R)=R\cup I_A
$$

The symmetric closure adds all reverse edges: $s(R)=R\cup R^{-1}$. The transitive closure adds all reachability of length at least two:

$$
t(R)=R\cup R^2\cup R^3\cup\cdots
$$

On a finite set with $|A|=n$, the union only needs terms up to $R^n$: any longer walk repeats a vertex and can be shortened.

For $A=\{1,2,3\}$ and $R=\{(1,2),(2,3)\}$:

| Closure | Result | Added pairs |
| --- | --- | --- |
| $r(R)$ | $\{(1,1),(2,2),(3,3),(1,2),(2,3)\}$ | three loops |
| $s(R)$ | $\{(1,2),(2,1),(2,3),(3,2)\}$ | $(2,1),(3,2)$ |
| $t(R)$ | $\{(1,2),(2,3),(1,3)\}$ | $(1,3)$ |

An extreme case: $R=\{(1,2),(2,3),(3,1)\}$ on $\{1,2,3\}$ returns to its start after three steps, so $t(R)=A\times A$, all 9 pairs.

> [!NOTE]
> "Smallest" is part of the definition. Adding an extra edge still gives a transitive relation, but not the closure. $t(R)$ is the intersection of all transitive relations containing $R$.

## Three common misconceptions

> [!MYTH] Symmetry and antisymmetry cannot both hold.
> The identity satisfies both: whenever $(x,y)$ and $(y,x)$ occur, $x=y$. The two properties conflict only on pairs of distinct points.

> [!MYTH] Transitivity only needs checking two adjacent edges.
> It must hold for every intermediate $y$, not just the edges drawn next to each other. The matrix test asks whether every nonzero position of $M_R^2$ lies inside $M_R$.

> [!MYTH] The transitive closure is an endless union with no bound.
> On a finite set the union stabilises at $R^n$; the infinite union is just the definition. Warshall's algorithm computes it in $O(n^3)$.

## Practice

> [!PRACTICE] 1 · Check properties
> $A=\{1,2,3\}$, $R=\{(1,1),(2,2),(3,3),(1,2),(2,1)\}$. Which properties hold?
>
> > [!ANSWER] Show answer
> > Reflexive, symmetric, and transitive all hold; not irreflexive; not antisymmetric, since $(1,2)$ and $(2,1)$ coexist with $1\neq2$.

> [!PRACTICE] 2 · Compose
> $R=\{(1,2),(2,3)\}$, $S=\{(1,3),(3,4)\}$. Find $R\circ S$ and $S\circ R$.
>
> > [!ANSWER] Show answer
> > $R\circ S=\{(2,4)\}$: $2\to3$ by $R$, then $3\to4$ by $S$. For $S\circ R$, $S$ sends $1\to3$ and $3\to4$, but $R$ has no edge out of $3$ or $4$, so the composite is empty.

> [!PRACTICE] 3 · Count closures
> For $R=\{(1,2),(2,3)\}$ on $\{1,2,3\}$, give the sizes of $r(R)$, $s(R)$, and $t(R)$.
>
> > [!ANSWER] Show answer
> > $|r(R)|=5$, $|s(R)|=4$, $|t(R)|=3$: they add the diagonal, the reverse edges, and the transitive edge respectively.

## Formal statement

Let $R\subseteq A\times A$. $R$ is reflexive if $\forall x\in A\,(x,x)\in R$; irreflexive if $\forall x\in A\,(x,x)\notin R$; symmetric if $\forall x\forall y\,((x,y)\in R\to(y,x)\in R)$; antisymmetric if $\forall x\forall y\,((x,y)\in R\land(y,x)\in R\to x=y)$; transitive if $\forall x\forall y\forall z\,((x,y)\in R\land(y,z)\in R\to(x,z)\in R)$. Composition is $R\circ S=\{(x,z)\mid\exists y\,((x,y)\in R\land(y,z)\in S)\}$, with $R^0=I_A$ and $R^{n+1}=R^n\circ R$. The reflexive closure is the smallest reflexive relation containing $R$, namely $R\cup I_A$; the symmetric closure is $R\cup R^{-1}$; the transitive closure is $\bigcup_{k\ge1}R^k$, which for $|A|=n$ equals $\bigcup_{k=1}^{n}R^k$.
