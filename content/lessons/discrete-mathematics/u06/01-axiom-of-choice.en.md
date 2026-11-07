---
slug: "axiom-of-choice"
subject: "discrete-mathematics"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "The Axiom of Choice and Its Equivalent Forms"
subtitle: "'One from each box' is not a triviality"
minutes: 15
meta: ["15 min read","Requires ordinals and well-ordering","Mastery level"]
concepts: ["axchoice", "ordinal", "set"]
prereq: ["ordinal"]
related: ["countable", "algebra-struct"]
---

## What you will get

By the end of this lecture you can state the axiom of choice formally, explain why the finite case needs no axiom, and list its equivalence with the well-ordering theorem, Zorn's lemma, and comparability of cardinals.

Three things: what a choice function is, why infinite families are troublesome, and exactly what the axiom asserts and does not assert.

## Three lines back

- Given a family of non-empty sets, intuition says one may pick an element from each.
- For finitely many sets, that intuition is provable by induction.
- For infinitely many, without a uniform rule, the act of "picking" cannot be carried out step by step in a first-order proof.

## Choice functions

Let $\{A_i\}_{i\in I}$ be a family of sets with every $A_i\neq\varnothing$. A choice function is

$$
f:I\to\bigcup_{i\in I}A_i,\qquad f(i)\in A_i\ \text{for every }i\in I
$$

The axiom of choice (AC) asserts that **every family of non-empty sets has a choice function**. The index set $I$ may be arbitrary, not necessarily countable.

The finite case is a theorem. For $I=\{1,2\}$, pick $a_1\in A_1$ and $a_2\in A_2$ and set $f(1)=a_1,f(2)=a_2$; induction handles $n$. Each step makes only finitely many choices, which is logically legitimate.

The infinite case differs. If $A_n=\{0,1\}$, set $f(n)=0$; if $A_n=\{n,n+1\}$, set $f(n)=n$. But when no such rule can be written, AC guarantees only that a function exists, not how to construct it.

Russell's shoes and socks make the point: from infinitely many pairs of shoes, always take the left one; from infinitely many pairs of socks, the two are indistinguishable, no rule applies, and AC is exactly what is needed.

## Equivalent forms

AC has many faces that look unrelated:

| Form | Statement | Typical use |
| --- | --- | --- |
| Choice function | every family of non-empty sets has one | recursive constructions |
| Well-ordering theorem | every set can be well-ordered | transfinite recursion |
| Zorn's lemma | a poset whose chains have upper bounds has a maximal element | existence of maximal objects |
| Comparability | for any $A,B$, $|A|\le|B|$ or $|B|\le|A|$ | ordering cardinals |
| Non-empty product | a product of non-empty sets is non-empty | building algebraic structures |

These are equivalent over ZF: any one implies the rest. A textbook usually takes AC as the axiom, proves it equivalent to the well-ordering theorem, and derives Zorn's lemma from that.

The well-ordering theorem is used directly: to build an object, well-order the candidate set and "take the least one satisfying the condition". This is legal because a well-order guarantees a least element in every non-empty subset, with no extra choice.

> [!NOTE]
> AC asserts existence, not constructibility. When a proof says "choose $f(i)\in A_i$" without a rule, AC is in use, and a formal proof should say so.

## Three common misconceptions

> [!MYTH] The axiom of choice can be proved.
> It is not a theorem of ZF. Gödel (1938) showed AC is consistent with ZF, and Cohen (1963) showed its negation is consistent too. AC is independent and must be adopted or rejected as an axiom.

> [!MYTH] Choice is needed only for enormous sets.
> Countably many two-element sets already need it. For $A_n=\{0,1\}$, without a uniform rule, "choose one from each simultaneously" is not provable in ZF.

> [!MYTH] A choice function must be given by a formula.
> AC guarantees existence, not a defining expression. Definable choices are special cases; the strength of AC lies in allowing non-constructive existence claims.

## Practice

> [!PRACTICE] 1 · Build a choice function
> $A_n=\{n,n+1\}$ for $n\in\mathbb{N}$. Give a choice function and explain why AC is not needed.
>
> > [!ANSWER] Show answer
> > Set $f(n)=n$. The rule is given by a formula and $f(n)\in A_n$, so the construction is explicit and no choice is required.

> [!PRACTICE] 2 · Finite induction
> Prove that if $A_1,\dots,A_n$ are non-empty, then $A_1\times\cdots\times A_n$ is non-empty.
>
> > [!ANSWER] Show answer
> > Induct on $n$. The case $n=1$ is immediate; given $(a_1,\dots,a_n)$ and $a_{n+1}\in A_{n+1}$, form the $(n+1)$-tuple. Each step makes finitely many choices.

> [!PRACTICE] 3 · Decide
> Can "every countable family of non-empty sets has a choice function" be proved in ZF?
>
> > [!ANSWER] Show answer
> > No. That is the countable axiom of choice, strictly weaker than AC but independent of ZF. It follows only under extra assumptions or AC itself.

## Formal statement

Axiom of choice: for every set $I$ and every family $\{A_i\}_{i\in I}$ of non-empty sets, there is a function $f:I\to\bigcup_{i\in I}A_i$ with $\forall i\in I\,(f(i)\in A_i)$. Well-ordering theorem: every set $A$ carries a well-order. Zorn's lemma: if every chain in a poset $(P,\le)$ has an upper bound, then $P$ has a maximal element. Comparability: for any $A,B$, there is an injection $A\to B$ or an injection $B\to A$. These four statements are equivalent over ZF. Relative consistency of AC with ZF is due to Gödel (1938), and its independence to Cohen (1963); hence AC is neither provable nor refutable in ZF.
