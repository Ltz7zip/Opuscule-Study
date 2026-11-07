---
slug: "set-axioms"
subject: "discrete-mathematics"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Axioms of Set Theory and Basic Operations"
subtitle: "First decide how sets are allowed to exist"
minutes: 15
meta: ["15 min read","Requires propositional logic","Mastery level"]
concepts: ["axiomset", "set", "setops"]
prereq: ["proplogic"]
related: ["cartesian", "relation"]
---

## What you will get

By the end of this lecture you can explain why "the collection of all objects with a property" cannot serve as a definition, list the basic axioms that generate sets, and compute unions, intersections, differences, complements, and power sets.

Three things: what the axioms restrict, how the five operations work, and why a power set has $2^n$ elements.

## Three lines back

- Propositional logic supplies exact uses of "and", "or", and "not"; set operations reuse the same connectives.
- Intuitively a set is a collection of objects, but where the collection stops must be made precise.
- Once "the set of all sets that do not contain themselves" is allowed, the system contradicts itself.

## Why axioms are needed

The naive comprehension principle says that for every property $P$ there is a set $S=\{x\mid P(x)\}$. Take $P(x)$ to be $x\notin x$:

$$
R=\{x\mid x\notin x\}
$$

Then $R\in R\Leftrightarrow R\notin R$. Each side negates the other, a contradiction. This is Russell's paradox.

The fault lies not in sets but in the rule: "any property may carve out a set" is too strong. Axiomatic set theory does not assume sets exist; it states a few generation rules, and every new set is built from sets already available.

| Axiom | Content | Role |
| --- | --- | --- |
| Extensionality | $A=B$ iff $\forall x(x\in A\leftrightarrow x\in B)$ | fixes equality |
| Empty set | there is a set $\varnothing$ with no elements | starting point |
| Pairing | for any $a,b$ there is $\{a,b\}$ | builds pairs |
| Union | for a family $\mathcal{F}$ there is $\bigcup\mathcal{F}$ | merges members |
| Power set | for any $A$ there is $\mathcal{P}(A)=\{X\mid X\subseteq A\}$ | collects subsets |
| Separation | for a set $A$ and property $P$, there is $\{x\in A\mid P(x)\}$ | filters inside a set |

The last one makes the difference: separation only filters elements out of an existing set; it never creates a set from a property alone. That blocks the construction of $R$, which would require a set of all sets.

## Basic operations

Let $A=\{1,2,3\}$, $B=\{3,4\}$, and $U=\{1,2,3,4,5\}$.

| Operation | Definition | Result |
| --- | --- | --- |
| Union $A\cup B$ | $\{x\mid x\in A\lor x\in B\}$ | $\{1,2,3,4\}$ |
| Intersection $A\cap B$ | $\{x\mid x\in A\land x\in B\}$ | $\{3\}$ |
| Difference $A-B$ | $\{x\mid x\in A\land x\notin B\}$ | $\{1,2\}$ |
| Complement $\overline{A}$ | $\{x\in U\mid x\notin A\}$ | $\{4,5\}$ |
| Symmetric difference | $(A-B)\cup(B-A)$ | $\{1,2,4\}$ |

Set operations mirror logical connectives: union is disjunction, intersection is conjunction, complement is negation. Propositional equivalences therefore carry over directly:

$$
\overline{A\cup B}=\overline{A}\cap\overline{B},\qquad \overline{A\cap B}=\overline{A}\cup\overline{B}
$$

and $A\cap(B\cup C)=(A\cap B)\cup(A\cup C)$. To verify one, take an element $x$, read "$x\in A$" as a propositional variable, and the question reduces to a truth table.

## Power sets and counting

The power set collects all subsets:

$$
\mathcal{P}(\{1,2,3\})=\{\varnothing,\{1\},\{2\},\{3\},\{1,2\},\{1,3\},\{2,3\},\{1,2,3\}\}
$$

There are 8. Each element is independently either in or out, so 3 elements give $2^3=8$ choices. In general, $|A|=n$ implies $|\mathcal{P}(A)|=2^n$. This fact returns constantly in counting.

Note that $\varnothing\subseteq A$ always holds, while $\varnothing\in A$ usually does not. The first says every element of the empty set lies in $A$; the second says the empty set itself is a member of $A$.

> [!MYTH] $\{\varnothing\}$ is the empty set.
> $\{\varnothing\}$ has one element, namely $\varnothing$, so its size is 1; the empty set has size 0. Also $\mathcal{P}(\varnothing)=\{\varnothing\}$.

## Three common misconceptions

> [!MYTH] The empty set is an element of every set.
> It is a subset of every set. It is an element only when a set explicitly lists it, as $\mathcal{P}(\varnothing)$ does.

> [!MYTH] Set operations distribute in only one direction, as in arithmetic.
> Union and intersection distribute over each other: $A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$ also holds. Addition and multiplication have no such symmetry.

> [!MYTH] A clearly stated property always defines a set.
> Separation requires a host set. Without one, totalities such as "all sets" or "all ordinals" generate paradoxes.

## Practice

> [!PRACTICE] 1 · Compute
> $A=\{1,2,3,4\}$, $B=\{2,4,6\}$, $U=\{1,\dots,6\}$. Find $A\cap B$, $A-B$, and $\overline{A\cup B}$.
>
> > [!ANSWER] Show answer
> > $A\cap B=\{2,4\}$; $A-B=\{1,3\}$; $A\cup B=\{1,2,3,4,6\}$, whose complement is $\{5\}$.

> [!PRACTICE] 2 · Power sets
> Find $|\mathcal{P}(\{a,b,c,d\})|$ and write out $\mathcal{P}(\varnothing)$.
>
> > [!ANSWER] Show answer
> > $2^4=16$; $\mathcal{P}(\varnothing)=\{\varnothing\}$, of size 1.

> [!PRACTICE] 3 · True or false
> (a) $\varnothing\subseteq\{1\}$; (b) $\varnothing\in\{1\}$; (c) $\{1\}\subseteq\{\{1\},2\}$.
>
> > [!ANSWER] Show answer
> > (a) true; (b) false, the empty set is not an element of $\{1\}$; (c) false, $\{1\}$ is an element of the right side, and its own element $1$ is not there.

## Formal statement

Extensionality: $\forall A\forall B(A=B\leftrightarrow\forall x(x\in A\leftrightarrow x\in B))$. Empty set: $\exists A\forall x(x\notin A)$. Pairing: $\forall a\forall b\exists A\forall x(x\in A\leftrightarrow x=a\lor x=b)$. Union: $\forall\mathcal{F}\exists A\forall x(x\in A\leftrightarrow\exists B(B\in\mathcal{F}\land x\in B))$. Power set: $\forall A\exists B\forall X(X\in B\leftrightarrow X\subseteq A)$. Separation schema: for each formula $P(x)$, $\forall A\exists B\forall x(x\in B\leftrightarrow x\in A\land P(x))$. Extensionality makes the sets asserted by these axioms unique, so each may be given a name.
