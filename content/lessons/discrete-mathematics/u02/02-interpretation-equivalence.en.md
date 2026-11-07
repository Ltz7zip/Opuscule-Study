---
slug: "interpretation-equivalence"
subject: "discrete-mathematics"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Interpretations, Equivalences, and Predicate Inference"
subtitle: "One formula, a different world, a different truth value"
minutes: 16
meta: ["16 min read","Requires individuals, predicates, and quantifiers","Mastery level"]
concepts: ["predlogic", "proplogic"]
prereq: ["predlogic"]
related: ["axiomset", "set"]
---

## What you will get

By the end of this lecture you can specify an interpretation for a predicate formula and compute its truth value, decide which quantifier equivalences hold and which are one-way, and write proofs with the four quantifier rules.

Three things: what an interpretation contains, how quantifiers move, and what licenses each step of a quantifier proof.

## Three lines back

- A predicate formula contains a domain, constants, functions, and predicate symbols, none of which mean anything by itself.
- An interpretation assigns each symbol a concrete set, element, function, or relation.
- A formula has a truth value only under an interpretation; change the interpretation and the value can flip.

## Interpretations and truth values

An interpretation $I=(D,I)$ consists of a non-empty domain $D$; an element of $D$ for each individual constant; a function $D^n\to D$ for each $n$-ary function symbol; and a relation on $D^n$, that is, a truth function, for each $n$-ary predicate symbol.

Take $D=\{1,2,3\}$, assign $P(x)$ the meaning "$x$ is even" and $Q(x)$ the meaning "$x>1$". Check each element:

| $x$ | $P(x)$ | $Q(x)$ | $P(x)\to Q(x)$ |
| --- | --- | --- | --- |
| 1 | F | F | T |
| 2 | T | T | T |
| 3 | F | T | T |

So $\forall x(P(x)\to Q(x))$ is true and $\exists x(P(x)\land\neg Q(x))$ is false. Read the second one literally: there is no even number that is not greater than 1.

Keep the same formula but reassign $P(x)$ to "$x>1$" and $Q(x)$ to "$x$ is even". Now $x=3$ makes the antecedent true and the consequent false, so the formula becomes false. The symbols did not change; the interpretation did.

## Quantifier equivalences

Quantifiers commute with connectives asymmetrically:

| Equivalence | Status |
| --- | --- |
| $\forall x(P(x)\land Q(x))\Leftrightarrow\forall xP(x)\land\forall xQ(x)$ | holds |
| $\exists x(P(x)\lor Q(x))\Leftrightarrow\exists xP(x)\lor\exists xQ(x)$ | holds |
| $\forall x(P(x)\lor Q(x))\Leftrightarrow\forall xP(x)\lor\forall xQ(x)$ | fails; only $\Leftarrow$ |
| $\exists x(P(x)\land Q(x))\Leftrightarrow\exists xP(x)\land\exists xQ(x)$ | fails; only $\Rightarrow$ |

The counterexamples are tiny. Let $D=\{1,2\}$, with $P(x)$ meaning $x=1$ and $Q(x)$ meaning $x=2$. Every element satisfies $P$ or $Q$, so $\forall x(P\lor Q)$ is true; but both $\forall xP$ and $\forall xQ$ are false, so the right side is false.

In the other direction, $\exists xP$ and $\exists xQ$ are both true on the same domain, yet no single element satisfies both, so $\exists x(P\land Q)$ is false.

Two more equivalences connect quantifiers with negation and implication:

$$
\neg\forall xP(x)\Leftrightarrow\exists x\neg P(x),\qquad \forall x(P(x)\to Q(x))\Leftrightarrow\neg\exists x(P(x)\land\neg Q(x))
$$

The second says "all $P$ are $Q$" and "there is nothing that is $P$ but not $Q$" are the same statement. That is the usual starting point for proving a universal claim by contradiction.

> [!NOTE]
> A bound variable may be renamed, provided the new name is not captured. $\forall xP(x,y)$ is equivalent to $\forall zP(z,y)$ but not to $\forall yP(y,y)$.

## Quantifier inference

Four basic rules:

| Rule | Form | Restriction |
| --- | --- | --- |
| Universal instantiation | $\forall xP(x)\vdash P(c)$ | $c$ arbitrary |
| Universal generalisation | if $P(c)$ for arbitrary $c$, then $\vdash\forall xP(x)$ | $c$ must be arbitrary |
| Existential generalisation | $P(c)\vdash\exists xP(x)$ | none |
| Existential instantiation | $\exists xP(x)\vdash P(c)$ | $c$ must be a new constant |

Use them to prove $\forall x(P(x)\to Q(x)),\ \exists xP(x)\vdash\exists xQ(x)$:

1. $\exists xP(x)$ (premise)
2. $P(c)$ (1, existential instantiation, $c$ new)
3. $\forall x(P(x)\to Q(x))$ (premise)
4. $P(c)\to Q(c)$ (3, universal instantiation)
5. $Q(c)$ (2, 4, modus ponens)
6. $\exists xQ(x)$ (5, existential generalisation)

The critical step is 2: $c$ is brand new and carries no information beyond satisfying $P$. Otherwise the conclusion would claim more than the premises allow.

> [!MYTH] Existential instantiation may pick any object you already know.
> If the chosen $c$ has extra properties, step 6 proves more than $\exists xQ(x)$. The new constant exists precisely to block that extra information.

## Three common misconceptions

> [!MYTH] The universal quantifier distributes over disjunction.
> $\forall x(P\lor Q)$ guarantees only that each element satisfies at least one disjunct, not that one disjunct works for all. Two elements give a counterexample.

> [!MYTH] The existential quantifier distributes over conjunction.
> $\exists xP$ and $\exists xQ$ may be witnessed by different elements, while $\exists x(P\land Q)$ demands one element satisfying both.

> [!MYTH] A bound variable can be renamed freely.
> The new name must not capture a free variable. Turning $\forall xP(x,y)$ into $\forall yP(y,y)$ changes the meaning completely.

## Practice

> [!PRACTICE] 1 · Evaluate
> $D=\{1,2,3\}$, $P(x)$ means $x<3$, $Q(x)$ means "$x$ is odd". Evaluate $\forall x(P(x)\to Q(x))$ and $\exists x(P(x)\land\neg Q(x))$.
>
> > [!ANSWER] Show answer
> > $P$ holds for $x=1,2$. Since $2$ is not odd, the universal is false; $x=2$ satisfies $P$ and not $Q$, so the existential is true.

> [!PRACTICE] 2 · Build a counterexample
> On $D=\{1,2\}$, show $\exists x(P(x)\land Q(x))\not\Leftrightarrow\exists xP(x)\land\exists xQ(x)$.
>
> > [!ANSWER] Show answer
> > Let $P(1)$ and $Q(2)$ be true, with the other values false. Both existential formulas on the right are true, but no element satisfies both, so the left side is false.

> [!PRACTICE] 3 · Prove
> Derive $\forall xQ(x)$ from $\forall x(P(x)\to Q(x))$ and $\forall xP(x)$.
>
> > [!ANSWER] Show answer
> > Take a new constant $c$. From $\forall xP(x)$ get $P(c)$; from $\forall x(P\to Q)$ get $P(c)\to Q(c)$; modus ponens gives $Q(c)$. Since $c$ was arbitrary, universal generalisation gives $\forall xQ(x)$.

## Formal statement

An interpretation is a pair $(D,I)$ with $D\neq\varnothing$, where $I$ assigns an element of $D$ to each constant, a map $D^n\to D$ to each $n$-ary function symbol, and a subset of $D^n$ to each $n$-ary predicate symbol. Term values are computed recursively; an atomic formula $P(t_1,\dots,t_n)$ is true exactly when $(t_1^I,\dots,t_n^I)\in P^I$. Truth values of compound formulas are defined recursively by the semantics of the connectives and quantifiers. If $A$ is true under $I$, write $I\models A$; if $A$ is true under every interpretation, it is valid. Formulas $A,B$ are equivalent when $A\leftrightarrow B$ is valid. The argument $A_1,\dots,A_n\vdash B$ is valid exactly when every interpretation that makes all premises true also makes $B$ true.
