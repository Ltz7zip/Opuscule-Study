---
slug: "equivalence-partial-order"
subject: "discrete-mathematics"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Equivalence Relations, Partitions, and Partial Orders"
subtitle: "Two kinds of relation separated by one property"
minutes: 16
meta: ["16 min read","Requires properties and closure of relations","Mastery level"]
concepts: ["relation", "set", "counting"]
prereq: ["relation"]
related: ["map", "numalg"]
---

## What you will get

By the end of this lecture you can decide whether a relation is an equivalence relation and list its classes, translate between classes and partitions, and read a Hasse diagram to find maximal, minimal, greatest, and least elements.

Three things: how an equivalence relation cuts a set into blocks, how a partition gives the relation back, and why a partial order tolerates incomparable elements.

## Three lines back

- An equivalence relation is reflexive, symmetric, and transitive; a partial order is reflexive, antisymmetric, and transitive.
- The routes differ at one point: symmetry allows two-way pairs, antisymmetry forbids them between distinct elements.
- Equivalence relations classify; partial orders rank. Classification allows ties, ranking allows incomparability.

## Equivalence relations and classes

On $A=\{0,1,\dots,8\}$, define $aRb$ exactly when $a\equiv b\pmod 3$. Reflexive: $a-a=0$ is divisible by 3. Symmetric: $a-b$ and $b-a$ are divisible by 3 together. Transitive: sums and differences of multiples of 3 stay multiples of 3.

The equivalence classes $[a]=\{x\in A\mid xRa\}$ are:

| Class | Representative | Elements | Size |
| --- | --- | --- | --- |
| $[0]$ | 0 | $\{0,3,6\}$ | 3 |
| $[1]$ | 1 | $\{1,4,7\}$ | 3 |
| $[2]$ | 2 | $\{2,5,8\}$ | 3 |

The quotient set $A/R=\{[0],[1],[2]\}$ has three elements, each of which is a subset rather than an element of $A$. Three facts hold: every class is non-empty; distinct classes are disjoint; the union of all classes is $A$.

Those three facts are exactly the definition of a partition. Hence the basic theorem: equivalence relations on $A$ correspond one-to-one with partitions of $A$. Given a partition, set $xRy$ iff $x$ and $y$ lie in the same block; given an equivalence relation, take all classes. The two constructions are inverse to each other.

> [!NOTE]
> The quotient set is not a subset of $A$. $A/R\subseteq\mathcal{P}(A)$, and its elements are classes. Both $[0]\in A/R$ and $[0]\subseteq A$ are true, but the two membership relations live on different levels.

## Partial orders and Hasse diagrams

A partial order is reflexive, antisymmetric, and transitive. On $A=\{1,2,3,4,6,12\}$ take divisibility $a\mid b$: $1$ divides everything, $12$ is divisible by everything, and $2\mid4$, $2\mid6$, $3\mid6$, $4\mid12$, $6\mid12$.

To draw the Hasse diagram, delete loops, delete edges implied by transitivity, place smaller elements lower, and keep only covering relations. Element $a$ is covered by $b$ when $a<b$ and no $c$ satisfies $a<c<b$. The edges are $1\to2,1\to3,1\to4,1\to6,2\to4,2\to6,3\to6,4\to12,6\to12$.

| Element | Comparable with | Role |
| --- | --- | --- |
| 1 | all | least and minimal |
| 2 | 1,4,6,12 | middle |
| 3 | 1,6,12 | middle |
| 4 | 1,2,12 | maximal |
| 6 | 1,2,3,12 | maximal |
| 12 | all | greatest and maximal |

Elements $4$ and $6$ are incomparable: neither divides the other. So this order is not total. If every two elements are comparable, the order is total, as with $\le$ on the reals.

Maximal and greatest must be kept apart: a maximal element has nothing above it, a greatest element is above everything. Here $12$ is both. Remove $12$ and both $4$ and $6$ are maximal, but no greatest element exists.

> [!MYTH] Every partially ordered set has a greatest element.
> A finite partial order always has maximal elements, but not necessarily a greatest one. Under divisibility, $\{2,3,4,6\}$ has two maximal elements, $4$ and $6$, and no greatest.

## Three common misconceptions

> [!MYTH] Equivalence classes may overlap partially.
> If $x$ lies in both $[a]$ and $[b]$, symmetry and transitivity give $aRb$, hence $[a]=[b]$. Two classes are either identical or disjoint.

> [!MYTH] The quotient set is a part of the original set.
> Its elements are subsets, so $A/R\subseteq\mathcal{P}(A)$. Treating it as a subset of $A$ confuses the number of blocks with the number of elements.

> [!MYTH] Maximal means greatest.
> Maximal only requires that nothing is larger; greatest requires being larger than everything. With several maximal elements, no greatest element exists.

## Practice

> [!PRACTICE] 1 · Count classes
> $A=\{0,1,\dots,7\}$ and $aRb$ iff $a\equiv b\pmod 4$. Find the classes and $|A/R|$.
>
> > [!ANSWER] Show answer
> > Four classes: $\{0,4\}$, $\{1,5\}$, $\{2,6\}$, $\{3,7\}$, so $|A/R|=4$. In general, congruence mod $m$ on $\{0,\dots,n-1\}$ gives $m$ classes.

> [!PRACTICE] 2 · Find extrema
> In the divisibility order on $\{2,3,4,6\}$, list the maximal and minimal elements and decide whether a greatest element exists.
>
> > [!ANSWER] Show answer
> > Minimal: $2,3$. Maximal: $4,6$. No greatest element, since $4$ and $6$ are incomparable.

> [!PRACTICE] 3 · Partition to relation
> Which equivalence relation corresponds to the partition $\{\{1,4\},\{2,5\},\{3,6\}\}$?
>
> > [!ANSWER] Show answer
> > $R=\{(1,1),(4,4),(1,4),(4,1),(2,2),(5,5),(2,5),(5,2),(3,3),(6,6),(3,6),(6,3)\}$: all pairs inside each block.

## Formal statement

$R\subseteq A\times A$ is an equivalence relation iff it is reflexive, symmetric, and transitive. Then for every $a\in A$ the class $[a]=\{x\in A\mid xRa\}$ is non-empty; $[a]=[b]$ iff $aRb$; if $[a]\neq[b]$ then $[a]\cap[b]=\varnothing$; and $\bigcup_{a\in A}[a]=A$. Hence $\{[a]\mid a\in A\}$ is a partition of $A$, the quotient set $A/R$. Conversely, a partition $\mathcal{P}$ of $A$ defines $xRy\iff\exists B\in\mathcal{P}(x\in B\land y\in B)$, and the two constructions are inverse. $R$ is a partial order iff it is reflexive, antisymmetric, and transitive. Elements $a,b$ are comparable when $aRb$ or $bRa$; if every pair is comparable, $R$ is total. A maximal element $a$ has no $b$ with $a<b$; a greatest element $a$ satisfies $b\le a$ for all $b$. A greatest element, if it exists, is unique and maximal, but the converse fails.
