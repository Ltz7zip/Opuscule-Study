---
slug: "subgroup-coset"
subject: "discrete-mathematics"
unit: "u13"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Subgroups, Cyclic Groups, and Coset Decomposition"
subtitle: "A group has layers inside it"
minutes: 16
meta: ["16 min read","Requires the definition of a group and group tables","Mastery level"]
concepts: ["group", "numalg"]
prereq: ["group"]
related: ["algebra-struct", "numalg"]
---

## What you will get

By the end of this lecture you can test a subset with the one-step subgroup criterion, compute the order of an element and decide whether a group is cyclic, cut a group into disjoint cosets of a subgroup, and count those cosets with Lagrange's theorem.

The plan is to look inside a group: first find smaller groups within it, then use one of them to partition the whole. The blocks must have a size dividing the group's order, and that constraint is strong.

## Three lines back

- A group is closed, associative, has an identity, and every element is invertible.
- A subgroup is a subset that is itself a group under the inherited operation.
- In a finite group, repeatedly multiplying an element by itself eventually returns to the identity; the least number of steps is the element's order.

## Subgroups: one criterion is enough

Let $H\subseteq G$ with $H\ne\varnothing$. If $H$ is closed under the operation, contains the identity, and contains the inverse of each of its elements, then $H$ is a **subgroup** of $G$, written $H\le G$.

The three conditions collapse into one: $H\le G$ iff $H\ne\varnothing$ and $a*b^{-1}\in H$ for all $a,b\in H$. Taking $b=a$ gives $e\in H$; taking $a=e$ gives $b^{-1}\in H$; replacing $b$ by $b^{-1}$ gives $ab\in H$.

For $G=\mathbb{Z}_6$ under addition, here are all subgroups:

| Subgroup $H$ | Elements | Order |
| --- | --- | --- |
| $\{0\}$ | 0 | 1 |
| $\{0,3\}$ | 0, 3 | 2 |
| $\{0,2,4\}$ | 0, 2, 4 | 3 |
| $\mathbb{Z}_6$ | 0,1,2,3,4,5 | 6 |

The orders $1,2,3,6$ all divide $6$. That is no accident. The set $\{0,1,2\}$ is not a subgroup because $1+2=3\notin H$, and the fact that $3\nmid6$ already warns us.

## Cyclic groups and the order of an element

A group $G$ is **cyclic** if every element is a power of one fixed element $g$, called a generator, and we write $G=\langle g\rangle$. The **order** of $g$ is the least positive $k$ with $g^{k}=e$.

Take $G=\mathbb{Z}_7^{*}=\{1,2,3,4,5,6\}$ under multiplication modulo $7$ and look at $g=3$:

| $k$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| $3^{k}\bmod 7$ | 3 | 2 | 6 | 4 | 5 | 1 |

The six powers run through every non-zero class, so $3$ has order $6$ and $\mathbb{Z}_7^{*}=\langle3\rangle$ is cyclic of order $6$.

Try $g=2$ instead: $2,4,1,2,4,1,\dots$ has order $3$ and generates only $\{1,2,4\}$. Elements of one group can have different orders, but each divides the group order $6$.

Structure is fixed by the order: every cyclic group of order $n$ is isomorphic to $\mathbb{Z}_n$. The group $(\mathbb{Z},+)$ is infinite cyclic with generators $1$ and $-1$.

## Cosets and Lagrange's theorem

Let $H\le G$ and $a\in G$. The set $aH=\{a*h\mid h\in H\}$ is a **left coset** of $H$. Three facts hold:

- any two left cosets are either equal or disjoint;
- each coset has the same size as $H$, because $h\mapsto a*h$ is a bijection;
- the cosets cover $G$, since $a\in aH$.

Back to $G=\mathbb{Z}_6$ with $H=\{0,3\}$; the three cosets are

| Coset | Elements |
| --- | --- |
| $0+H$ | $\{0,3\}$ |
| $1+H$ | $\{1,4\}$ |
| $2+H$ | $\{2,5\}$ |

The blocks are disjoint, cover $G$, and each has size $2$. Hence $6=3\times2$, and the number of cosets, the **index** $[G:H]$, equals $|G|/|H|$. This is **Lagrange's theorem**: in a finite group the order of every subgroup divides the order of the group.

A corollary follows at once: if $|G|=p$ is prime, the only subgroups are $\{e\}$ and $G$, so $G$ is cyclic. The converse fails — divisibility is necessary, not sufficient. The group $A_4$ has order $12$ but no subgroup of order $6$.

## Three common misconceptions

> [!MYTH] Any subset of a group is a subgroup.
> The subset must be closed under the operation, contain the identity, and be closed under inverses. $\{0,1,2\}\subseteq\mathbb{Z}_6$ is a subset but not a subgroup.

> [!MYTH] Cyclic groups must be small.
> $(\mathbb{Z},+)$ is infinite and cyclic: one generator produces every integer. "Cyclic" describes how the group is generated, not how many elements it has.

> [!MYTH] Whenever $d$ divides $|G|$, a subgroup of order $d$ exists.
> Divisibility is necessary but not sufficient. $A_4$ has order $12$ and $6\mid12$, yet it has no subgroup of order $6$.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Show that $H=\{0,2,4\}$ is a subgroup of $\mathbb{Z}_6$ and list its cosets.
>
> > [!ANSWER] Show answer
> > $0\in H$; $2+4=0$, $2+2=4$, $4+4=2$, so $H$ is closed and closed under inverses. There are only two cosets, $H=\{0,2,4\}$ and $1+H=\{1,3,5\}$; the index is $2$.

> [!PRACTICE] 2 · Variation
> Find the order of $2$ in $\mathbb{Z}_7^{*}$.
>
> > [!ANSWER] Show answer
> > $2^1=2$, $2^2=4$, $2^3=8\equiv1$, so the order is $3$. It generates $\{1,2,4\}$, whose order $3$ divides $6$.

> [!PRACTICE] 3 · Transfer
> Is $H=\{0,1,2\}$ a subgroup of $\mathbb{Z}_4$?
>
> > [!ANSWER] Show answer
> > No. $1+2=3\notin H$, so it is not closed. Lagrange also rules it out immediately: $3\nmid4$.

## Formal statement

Let $G$ be a group and $H\subseteq G$ non-empty. Then $H$ is a subgroup if and only if $a*b^{-1}\in H$ for all $a,b\in H$. The intersection of subgroups is a subgroup; the subgroup generated by a set $S$, written $\langle S\rangle$, is the smallest subgroup containing $S$.

If $G=\{g^{k}\mid k\in\mathbb{Z}\}$ for some $g\in G$, then $G$ is cyclic and $g$ is a generator. The order of $a$ is the least positive $k$ with $a^{k}=e$; in a finite group it divides $|G|$ and equals the order of $\langle a\rangle$.

For $H\le G$ and $a\in G$, the left coset is $aH=\{a*h\mid h\in H\}$. The left cosets form a partition of $G$: any two are equal or disjoint, and $|aH|=|H|$. Hence for finite $G$, $|G|=[G:H]\cdot|H|$ (Lagrange's theorem), where the index $[G:H]$ is the number of left cosets.
