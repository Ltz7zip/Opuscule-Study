---
slug: "individuals-predicates"
subject: "discrete-mathematics"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Individuals, Predicates, and Quantifiers"
subtitle: "Writing 'all' and 'there exists' as formulas"
minutes: 15
meta: ["15 min read","Requires propositional logic","Mastery level"]
concepts: ["predlogic", "proplogic"]
prereq: ["proplogic"]
related: ["axiomset", "relation"]
---

## What you will get

By the end of this lecture you can formalise sentences such as "everyone dies" and "someone is late", identify the scope of a quantifier, separate bound from free variables, and negate a quantified statement correctly.

Three things: take atomic propositions apart, give "all" and "exists" a symbol each, and check that the resulting formula still says what the sentence said.

## Three lines back

- Propositional logic treats "2 is prime" as an indivisible atom and never looks inside.
- Inside an atom there is structure: objects, properties of objects, and relations between objects.
- Once that structure is visible, statements about "all", "some", and "exactly one" become expressible.

## Individuals and predicates

Individual terms name the objects under discussion. Individual constants are written $a,b,c$, or as names such as $s$ for Socrates; individual variables are $x,y,z$, ranging over a domain $D$.

A predicate expresses a property of an object or a relation between objects. $P(x)$ is unary and $R(x,y)$ is binary. Over the integers, take $E(x)$ for "$x$ is even" and $L(x,y)$ for "$x<y$". Then $E(2)$ is true, $E(3)$ is false, and $L(2,3)$ is true.

A predicate is not a proposition until its argument places are filled. Like a propositional variable, $P(x)$ has a truth value only once $x$ is given a value.

## Quantifiers and scope

The universal quantifier $\forall x$ reads "for all $x$"; the existential quantifier $\exists x$ reads "there exists $x$". The formula immediately following the quantifier is its scope.

Take $D=\{1,2,3\}$ and let $P(x)$ mean $x>2$. Check each element:

| $x$ | $P(x)$ | Reason |
| --- | --- | --- |
| 1 | F | $1>2$ fails |
| 2 | F | $2>2$ fails |
| 3 | T | $3>2$ holds |

So $\forall xP(x)$ is false, because $x=1$ is a counterexample, and $\exists xP(x)$ is true, because $x=3$ is a witness. On a finite domain, quantifiers expand into conjunctions and disjunctions:

$$
\forall xP(x)\Leftrightarrow P(1)\land P(2)\land P(3),\qquad \exists xP(x)\Leftrightarrow P(1)\lor P(2)\lor P(3)
$$

This expansion explains both the truth conditions of quantifiers and why changing the domain can change the truth value.

A variable is bound or free according to whether it falls inside the scope of a matching quantifier. In $\forall x(P(x)\to\exists y\,R(x,y))$, $x$ is bound by $\forall x$ and $y$ by $\exists y$; there is no free variable, so the formula is closed. In $P(x)\land\exists yR(x,y)$, $x$ is free and $y$ is bound. Only closed formulas have definite truth values; a formula with a free variable is a claim about $x$.

## From natural language to formulas

Two main patterns:

| Sentence | Formula | Point |
| --- | --- | --- |
| Everyone dies | $\forall x(M(x)\to D(x))$ | universal takes implication |
| Someone dies | $\exists x(M(x)\land D(x))$ | existential takes conjunction |
| No one is immortal | $\neg\exists x(M(x)\land\neg D(x))$ | write "exists", then negate |
| Only primes are even | see below | direction is easy to reverse |

"Everyone dies" cannot be written $\forall x(M(x)\land D(x))$; that says every object is a human who dies, including the rocks in the domain. Restrict a universal with $\to$ and an existential with $\land$. These two templates cover most translations.

Negation follows a pair of equivalences:

$$
\neg\forall xP(x)\Leftrightarrow\exists x\neg P(x),\qquad \neg\exists xP(x)\Leftrightarrow\forall x\neg P(x)
$$

"Not every prime is odd" is therefore equivalent to "there is a prime that is not odd", witnessed by $2$.

> [!MYTH] $\forall x(M(x)\to D(x))$ asserts that people exist.
> It asserts only that each object, if human, dies. On an empty domain it is vacuously true.

## Three common misconceptions

> [!MYTH] A universal quantifier can be followed by a conjunction.
> $\forall x(M(x)\land D(x))$ demands that every object be a mortal human, which is far stronger than the original. Restrict with $\to$.

> [!MYTH] An existential quantifier should be followed by an implication.
> $\exists x(M(x)\to D(x))$ is almost always true: any non-human object makes the antecedent false and the implication true. Bind the property with $\land$.

> [!MYTH] Free and bound variables differ only in notation.
> A free variable leaves the formula without a definite truth value; a bound one does not. Rewriting $\forall xP(x)$ as $P(x)$ throws away all the information.

## Practice

> [!PRACTICE] 1 · Evaluate
> $D=\{1,2,3,4\}$, $P(x)$ means "$x$ is even", $Q(x)$ means "$x>2$". Evaluate $\forall x(P(x)\to Q(x))$ and $\exists x(P(x)\land Q(x))$.
>
> > [!ANSWER] Show answer
> > $x=2$ makes $P$ true and $Q$ false, so the universal is false. $x=4$ satisfies both, so the existential is true.

> [!PRACTICE] 2 · Negate
> Negate "every student took this course".
>
> > [!ANSWER] Show answer
> > The original is $\forall x(S(x)\to C(x))$; its negation is $\exists x(S(x)\land\neg C(x))$, "some student did not take this course".

> [!PRACTICE] 3 · Change the domain
> Evaluate $\forall x\exists y(x<y)$ over $D=\mathbb{N}$ and over $D=\{1,2,3\}$.
>
> > [!ANSWER] Show answer
> > True over the naturals, with $y=x+1$. False over $\{1,2,3\}$, since $x=3$ has no larger element. Same formula, different domain, different truth value.

## Formal statement

A first-order language consists of individual constants, individual variables, function symbols, predicate symbols, connectives, and quantifiers. Terms are built from constants, variables, and function symbols; an atomic formula applies an $n$-ary predicate to $n$ terms. Formulas are generated by: every atomic formula is a formula; if $A,B$ are formulas, so are $\neg A$, $A\land B$, $A\lor B$, $A\to B$, $A\leftrightarrow B$; if $A$ is a formula and $x$ a variable, then $\forall xA$ and $\exists xA$ are formulas. Under an interpretation $(D,I)$, $\forall xA(x)$ is true exactly when $A(d)$ is true for every $d\in D$, and $\exists xA(x)$ is true exactly when $A(d)$ is true for some $d\in D$. A formula with no free variable is closed and has a definite truth value under each interpretation.
