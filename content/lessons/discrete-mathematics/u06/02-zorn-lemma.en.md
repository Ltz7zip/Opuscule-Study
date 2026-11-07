---
slug: "zorn-lemma"
subject: "discrete-mathematics"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Zorn's Lemma and Applications to Infinite Sets"
subtitle: "If every chain can climb, something must be maximal"
minutes: 16
meta: ["16 min read","Requires the axiom of choice","Mastery level"]
concepts: ["axchoice", "algebra-struct", "set"]
prereq: ["axchoice"]
related: ["ordinal", "countable"]
---

## What you will get

By the end of this lecture you can state Zorn's lemma accurately and check its three hypotheses, use it to prove that every vector space has a basis and every proper ideal lies in a maximal one, and explain why it yields maximal rather than greatest elements.

Three things: checking chains and upper bounds, producing a maximal element, and lifting "every finite step is possible" to "a maximal object exists".

## The statement

Let $(P,\le)$ be a non-empty poset. If every chain in $P$ has an upper bound, then $P$ has a maximal element.

Three notions must be kept apart:

| Notion | Definition | Common misreading |
| --- | --- | --- |
| Chain | a subset of $P$ whose elements are pairwise comparable | need not be all of $P$ |
| Upper bound | $u\in P$ with $x\le u$ for every $x$ in the chain | need not belong to the chain |
| Maximal element | $m\in P$ such that no $x$ satisfies $m<x$ | need not exceed every element |

The hypothesis is substantive. In $\mathbb{Z}$ with its usual order, the chain $\{0,1,2,\dots\}$ has no upper bound, the hypothesis fails, and indeed $\mathbb{Z}$ has no maximal element. The open interval $(0,1)$ is not a counterexample either: the whole chain has no upper bound there.

Conversely, when the hypothesis holds, the conclusion is unavoidable. A finite poset satisfies it automatically, since every chain is finite and has a greatest element; Zorn then reduces to "a finite poset has a maximal element".

> [!MYTH] Zorn's lemma guarantees a greatest element.
> It guarantees only a maximal one. Order the proper subsets of $\{1,2,3\}$ by inclusion: the maximal elements are $\{1,2\},\{1,3\},\{2,3\}$, three of them, and there is no greatest element.

## Application 1: a basis for a vector space

Let $V$ be a vector space and let

$$
P=\{S\subseteq V\mid S\text{ is linearly independent}\}
$$

ordered by inclusion. $\varnothing\in P$, so $P$ is non-empty. Take any chain $\mathcal{C}$ and set $U=\bigcup_{S\in\mathcal{C}}S$. Then $U$ is linearly independent: any finite linear combination involves finitely many vectors, and since the chain is totally ordered, those finitely many vectors all lie in some single $S\in\mathcal{C}$; that $S$ is independent, so all coefficients vanish. Hence $U$ is an upper bound of the chain.

By Zorn, there is a maximal linearly independent set $B$. If $B$ did not span $V$, choose $v\in V\setminus\operatorname{span}B$; then $B\cup\{v\}$ would still be independent, contradicting maximality. So $B$ spans $V$ and is a basis.

| Step | Content | Property used |
| --- | --- | --- |
| 1 | elements are independent sets | the poset is non-empty |
| 2 | the union of a chain is independent | finite combinations touch finitely many vectors |
| 3 | a maximal independent set $B$ exists | Zorn's lemma |
| 4 | $B$ spans $V$ | maximality excludes outside vectors |

The proof is non-constructive: it shows a basis exists without saying which set it is. In finite dimension elimination produces one explicitly; in infinite dimension Zorn is often the only workable existence tool.

## Application 2: maximal ideals

Let $R$ be a commutative ring with unity and let $I\subsetneq R$ be a proper ideal. Set

$$
P=\{J\mid J\text{ is an ideal with }I\subseteq J\subsetneq R\}
$$

ordered by inclusion. $I\in P$, so $P$ is non-empty. The union $J=\bigcup_\alpha J_\alpha$ of a chain is again an ideal: any $a,b\in J$ lie in some common $J_\alpha$ by total comparability, and the ideal operations stay inside it; moreover $1\notin J$, since otherwise $1$ would lie in some $J_\alpha$, contradicting that $J_\alpha$ is proper. Thus $J\in P$ and is an upper bound.

Zorn gives a maximal element $M$, a proper ideal containing $I$ with no larger proper ideal, that is, a maximal ideal. Taking $I=\{0\}$ shows every non-zero ring has a maximal ideal.

> [!NOTE]
> The step "$1\notin J$" cannot be skipped. If the union of a chain were the whole ring, the upper bound would fail to lie in $P$, and Zorn would not apply.

## Three common misconceptions

> [!MYTH] An upper bound must belong to the chain.
> It only has to belong to the poset. The chain $\{\{1\},\{1,2\}\}$ has $\{1,2,3\}$ as an upper bound, and that set is not in the chain.

> [!MYTH] A non-empty poset automatically satisfies Zorn's hypothesis.
> Every chain must be checked. $\mathbb{Z}$ and $(0,1)$ are non-empty yet have chains without upper bounds, so Zorn cannot produce maximal elements there.

> [!MYTH] Zorn's lemma delivers a unique object.
> Maximal elements are usually not unique, and bases of a vector space are not unique. Zorn guarantees at least one; uniqueness needs a separate argument.

## Practice

> [!PRACTICE] 1 · Check the hypothesis
> Let $P$ be the proper subsets of $\{1,2,3\}$ ordered by inclusion. Find the maximal elements and explain why the hypothesis holds.
>
> > [!ANSWER] Show answer
> > The maximal elements are $\{1,2\},\{1,3\},\{2,3\}$, with no greatest element. $P$ is finite, so every chain is finite and has a greatest element, which is an upper bound; the hypothesis holds automatically.

> [!PRACTICE] 2 · Find a failure
> Show that $(\mathbb{Z},\le)$ fails the hypothesis of Zorn's lemma.
>
> > [!ANSWER] Show answer
> > The chain $\{0,1,2,\dots\}$ has no upper bound in $\mathbb{Z}$, since no integer exceeds every natural number. The hypothesis fails, and indeed there is no maximal element.

> [!PRACTICE] 3 · Apply it
> Let $A$ be a set and $P=\{X\subseteq A\mid X\neq A\}$ ordered by inclusion. What does Zorn give?
>
> > [!ANSWER] Show answer
> > If $A$ is finite, the maximal elements are the subsets obtained by removing one element, and the hypothesis holds. If $A$ is infinite, no proper subset is maximal, since one more element can always be added; a strictly increasing chain can also have union $A$, whose upper bound $A\notin P$ fails the hypothesis. Both cases agree with Zorn's conclusion.

## Formal statement

Zorn's lemma: if $(P,\le)$ is a non-empty poset and every chain $C\subseteq P$ has an upper bound in $P$, then $P$ has a maximal element. It is equivalent to the axiom of choice: from AC, well-order $P$ and use transfinite recursion to build a strictly increasing chain along the ordinals, stopping when no extension is possible, which yields a maximal element; conversely Zorn implies AC. An application must verify that $P$ is non-empty, that each chain's upper bound really lies in $P$, and that the maximal element has the desired property. Standard applications include a basis for every vector space, a maximal ideal above every proper ideal, and a maximal chain in every poset (Hausdorff maximal principle).
