---
slug: "ordinals-well-order"
subject: "discrete-mathematics"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Ordinals, Well-Ordering, and Transfinite Induction"
subtitle: "Same size, different lengths of arrangement"
minutes: 17
meta: ["17 min read","Requires countable and uncountable sets","Mastery level"]
concepts: ["ordinal", "countable", "relation"]
prereq: ["countable"]
related: ["axchoice", "numalg"]
---

## What you will get

By the end of this lecture you can decide whether a total order is a well-order, write the first ordinals and $\omega$, $\omega+1$ as sets, prove statements by transfinite induction, and explain how ordinals differ from cardinals.

Three things: the extra condition in a well-order, how ordinals are built from sets, and why ordinal arithmetic is not commutative.

## Three lines back

- Cardinality measures "how many"; equinumerous sets share a cardinal.
- But the same set can be ordered in different ways: the naturals can run $0,1,2,\dots$, or all even numbers can be placed first.
- Different orders give different "positions"; an ordinal records the length of the arrangement.

## Well-ordered sets

A total order $(A,\le)$ is a well-order if every non-empty subset of $A$ has a least element.

| Set and order | Well-ordered? | Reason |
| --- | --- | --- |
| $\mathbb{N}$, usual order | yes | every non-empty subset has a least element |
| $\mathbb{Z}$, usual order | no | the whole set has no least element |
| $(0,1)$, usual order | no | no least element |
| $\{1/n\mid n\ge1\}$, usual order | no | the set itself has no least element; it approaches 0 |

Well-ordering is stronger than total ordering. $\mathbb{Z}$ is totally ordered but not well-ordered; reordered as $0,1,-1,2,-2,\dots$ it becomes well-ordered, of order type $\omega$. So being well-ordered is a property of a set together with an order, not of the set alone.

## Ordinals as sets

Von Neumann's representation makes each ordinal a set:

$$
0=\varnothing,\qquad 1=\{0\},\qquad 2=\{0,1\},\qquad 3=\{0,1,2\}
$$

The successor operation is $\alpha+1=\alpha\cup\{\alpha\}$. Taking the union of all natural numbers gives the first infinite ordinal:

$$
\omega=\{0,1,2,\dots\}
$$

After $\omega$ come $\omega+1=\omega\cup\{\omega\}$, then $\omega+2$, and eventually $\omega+\omega=\omega\cdot2$.

| Ordinal | As a set | Number of elements |
| --- | --- | --- |
| $0$ | $\varnothing$ | 0 |
| $2$ | $\{0,1\}$ | 2 |
| $\omega$ | $\{0,1,2,\dots\}$ | countably infinite |
| $\omega+1$ | $\{0,1,\dots,\omega\}$ | countably infinite |
| $\omega\cdot2$ | $\omega\cup\{\omega+n\mid n<\omega\}$ | countably infinite |

An ordinal is a transitive set well-ordered by $\in$. Transitive means every element of $\alpha$ is also a subset of $\alpha$. Under this definition $\beta<\alpha$ simply means $\beta\in\alpha$: the order is encoded directly in membership.

## Transfinite induction

Ordinary induction says: if $P(0)$ holds and $P(n)\to P(n+1)$, then $P(n)$ holds for all $n$. Transfinite induction extends this to all ordinals:

If for every ordinal $\alpha$ the assumption "$\forall\beta<\alpha\,P(\beta)$" yields $P(\alpha)$, then $P(\alpha)$ holds for every ordinal $\alpha$.

A proof has three cases: $0$; a successor $\alpha+1$ (use $P(\alpha)$); and a limit ordinal $\lambda$ (use all $\beta<\lambda$). The third case is new and is what makes the principle stronger than ordinary induction.

The same structure gives transfinite recursion: whenever each value is determined by all earlier values, a function on all ordinals can be defined. Ordinal arithmetic is defined this way.

## Ordinal arithmetic does not commute

Addition recurses on the second argument: $\alpha+0=\alpha$, $\alpha+(\beta+1)=(\alpha+\beta)+1$, and $\alpha+\lambda=\sup_{\beta<\lambda}(\alpha+\beta)$.

$$
1+\omega=\sup_{n<\omega}(1+n)=\omega,\qquad \omega+1=\omega\cup\{\omega\}\neq\omega
$$

The first places a single element before an infinite list, which still has type $\omega$; the second appends one element after the list, adding one position.

Multiplication behaves similarly: $2\cdot\omega=\sup_n 2n=\omega$, while $\omega\cdot2=\omega+\omega$, two copies of $\omega$ end to end.

| Expression | Value | Explanation |
| --- | --- | --- |
| $1+\omega$ | $\omega$ | one element in front changes nothing |
| $\omega+1$ | $\omega+1$ | one element at the end adds a position |
| $2\cdot\omega$ | $\omega$ | two per step is still countably infinite |
| $\omega\cdot2$ | $\omega+\omega$ | two copies of $\omega$ joined |

Ordinals and cardinals coincide on finite sets and split on infinite ones. $\omega$, $\omega+1$, and $\omega\cdot2$ all have cardinality $\aleph_0$, but different order types. A cardinal can be seen as the least ordinal of its size: among all ordinals equinumerous with $A$, take the smallest.

> [!MYTH] Cardinals classify more finely than ordinals.
> The opposite is true. Cardinality merges $\omega$ and $\omega+1$ into one size, while ordinals keep their difference in order. Ordinals carry more information.

## Three common misconceptions

> [!MYTH] Every total order is a well-order.
> $\mathbb{Z}$ and $(0,1)$ are totally ordered but not well-ordered. A well-order requires a least element in every non-empty subset, far more than pairwise comparability.

> [!MYTH] Ordinal addition is commutative.
> $1+\omega=\omega$, while $\omega+1\neq\omega$. Ordinal addition describes concatenation, and putting a piece in front differs from putting it at the end.

> [!MYTH] Transfinite induction is ordinary induction under another name.
> It adds the limit case. Without it, nothing beyond $\omega$ follows; and because of it, statements about $\omega$ are not reached by ordinary induction alone.

## Practice

> [!PRACTICE] 1 · Well-ordering
> Decide whether $\{1/n\mid n\ge1\}$ and $\mathbb{N}\cup\{-1\}$ are well-ordered in the usual order.
>
> > [!ANSWER] Show answer
> > The first is not: the set has no least element and approaches 0. The second is: adding $-1$ keeps a least element, and the least element of every non-empty subset is unchanged.

> [!PRACTICE] 2 · Write an ordinal
> Write $\omega+2$ as a set and say whether it is countable.
>
> > [!ANSWER] Show answer
> > $\omega+2=\omega\cup\{\omega,\omega+1\}=\{0,1,2,\dots,\omega,\omega+1\}$. Its cardinality is $\aleph_0$, so it is countable.

> [!PRACTICE] 3 · Compute
> Compare $3+\omega$ and $\omega+3$.
>
> > [!ANSWER] Show answer
> > $3+\omega=\sup_n(3+n)=\omega$; $\omega+3$ appends three elements after $\omega$ and is strictly larger. Hence $3+\omega=\omega<\omega+3$.

## Formal statement

A total order $(A,<)$ is a well-order if every non-empty $S\subseteq A$ has a least element. An ordinal is a transitive set well-ordered by $\in$; $0=\varnothing$, the successor is $\alpha+1=\alpha\cup\{\alpha\}$, and a limit ordinal is a non-zero ordinal that is not a successor. The class of all ordinals is denoted $\mathrm{On}$ and is not a set (Burali-Forti). Transfinite induction: if for every ordinal $\alpha$, $\forall\beta<\alpha\,P(\beta)$ implies $P(\alpha)$, then $\forall\alpha\,P(\alpha)$. Ordinal addition is defined by $\alpha+0=\alpha$, $\alpha+(\beta+1)=(\alpha+\beta)+1$, and $\alpha+\lambda=\sup_{\beta<\lambda}(\alpha+\beta)$; multiplication by $\alpha\cdot0=0$, $\alpha\cdot(\beta+1)=\alpha\cdot\beta+\alpha$, and $\alpha\cdot\lambda=\sup_{\beta<\lambda}(\alpha\cdot\beta)$. The cardinal $|A|$ is the least ordinal equinumerous with $A$; infinite cardinals begin with $\aleph_0$.
