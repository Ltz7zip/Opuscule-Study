---
slug: "equivalence-normal-forms"
subject: "discrete-mathematics"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Equivalences, Normal Forms, and Inference"
subtitle: "Turning 'looks different' into 'is the same'"
minutes: 15
meta: ["15 min read","Requires propositions and truth tables","Mastery level"]
concepts: ["proplogic", "disc"]
prereq: ["proplogic"]
related: ["predlogic", "axiomset"]
---

## What you will get

By the end of this lecture you can simplify a formula with equivalences, write its principal disjunctive and conjunctive normal forms, and prove that an argument form is valid using inference rules.

Three things: which rewrites are legal, how to put a formula into a standard shape, and what "the premises entail the conclusion" actually claims.

## Three lines back

- Two formulas are equivalent when they have the same value under every assignment, written $A\Leftrightarrow B$.
- Equivalences may be substituted one at a time; substitution preserves truth, so formulas simplify like algebraic expressions.
- An argument is valid when the premises cannot all be true while the conclusion is false.

## Equivalences and calculation

The list is short, but you should know it without looking it up:

| Name | Equivalence |
| --- | --- |
| Double negation | $\neg\neg p\Leftrightarrow p$ |
| De Morgan | $\neg(p\land q)\Leftrightarrow\neg p\lor\neg q$; $\neg(p\lor q)\Leftrightarrow\neg p\land\neg q$ |
| Distribution | $p\land(q\lor r)\Leftrightarrow(p\land q)\lor(p\land r)$; $p\lor(q\land r)\Leftrightarrow(p\lor q)\land(p\lor r)$ |
| Implication | $p\to q\Leftrightarrow\neg p\lor q$ |
| Contrapositive | $p\to q\Leftrightarrow\neg q\to\neg p$ |
| Biconditional | $p\leftrightarrow q\Leftrightarrow(p\to q)\land(q\to p)$ |
| Absorption | $p\lor(p\land q)\Leftrightarrow p$; $p\land(p\lor q)\Leftrightarrow p$ |

The method is: recognise the shape, apply an equivalence, repeat. Simplify $\neg(\neg p\lor q)\lor(p\land q)$:

$$
\neg(\neg p\lor q)\lor(p\land q)\Leftrightarrow(p\land\neg q)\lor(p\land q)\Leftrightarrow p\land(\neg q\lor q)\Leftrightarrow p
$$

The first step is De Morgan, the second factors out $p$, the third uses excluded middle $\neg q\lor q\Leftrightarrow T$ and identity. Every step is an equivalence, so the original formula equals $p$.

> [!NOTE]
> Each step should come with the name of the equivalence used. If you cannot name it, the step is probably only "looks right".

## Normal forms

A disjunctive normal form is a disjunction of conjunctions; a conjunctive normal form is a conjunction of disjunctions. Neither is unique: $p$ can be written as $p$, or as $p\land(q\lor\neg q)$.

Principal normal forms remove that freedom. With $n$ variables there are $2^n$ minterms, each a conjunction containing every variable exactly once, and exactly one minterm is true under each assignment. Disjoin the minterms of the rows where the formula is true, and you get the unique principal disjunctive normal form.

For $p\to q$:

| Assignment | Minterm | $p\to q$ |
| --- | --- | --- |
| $p=T,q=T$ | $p\land q$ | T |
| $p=T,q=F$ | $p\land\neg q$ | F |
| $p=F,q=T$ | $\neg p\land q$ | T |
| $p=F,q=F$ | $\neg p\land\neg q$ | T |

The three true rows give $m_3,m_1,m_0$, so

$$
p\to q\Leftrightarrow(\neg p\land\neg q)\lor(\neg p\land q)\lor(p\land q)
$$

The principal conjunctive form comes from the false rows: only $p=T,q=F$, whose maxterm is $\neg p\lor q$, which is $p\to q$ itself. The two forms describe the same truth table, one from the true rows and one from the false rows.

## Inference

An argument form from premises $A_1,\dots,A_n$ to conclusion $B$ is written $A_1,\dots,A_n\vdash B$. It is valid exactly when

$$
(A_1\land\cdots\land A_n)\to B
$$

is a tautology. Notice that this asserts "if the premises are true, the conclusion is true"; it does not assert that the premises are true.

Frequently used rules:

| Rule | Form |
| --- | --- |
| Modus ponens | $p,\ p\to q\ \vdash\ q$ |
| Modus tollens | $\neg q,\ p\to q\ \vdash\ \neg p$ |
| Hypothetical syllogism | $p\to q,\ q\to r\ \vdash\ p\to r$ |
| Disjunctive syllogism | $p\lor q,\ \neg p\ \vdash\ q$ |

A concrete proof: premises $p\to q$, $q\to r$, $p$; conclusion $r$.

1. $p$ (premise)
2. $p\to q$ (premise)
3. $q$ (1, 2, modus ponens)
4. $q\to r$ (premise)
5. $r$ (3, 4, modus ponens)

If the conclusion is an implication, use the conditional proof: assume its antecedent temporarily, derive the consequent, then discharge the assumption. To show $p\to(q\to r)$, $p$, $q\vdash r$, apply modus ponens to $p$ and $p\to(q\to r)$ to get $q\to r$, then apply it to $q$ to get $r$.

> [!MYTH] If a premise is false, the argument is invalid.
> Validity asks only whether the conclusion could be false while the premises are true. A false premise does not by itself make the form invalid; it only makes the conclusion unusable.

## Three common misconceptions

> [!MYTH] A conditional and its converse are equivalent.
> $p\to q$ is equivalent only to its contrapositive $\neg q\to\neg p$. The converse $q\to p$ and the inverse $\neg p\to\neg q$ are equivalent to each other, but not to the original.

> [!MYTH] A formula has one disjunctive normal form.
> Ordinary disjunctive and conjunctive forms are not unique. Only the principal forms, expanded all the way to minterms or maxterms, are unique.

> [!MYTH] Normal forms are only for exercises.
> The principal disjunctive form lists every assignment that makes the formula true. It is a compressed truth table and the standard tool for deciding equivalence and satisfiability.

## Practice

> [!PRACTICE] 1 · Calculate
> Prove $\neg(p\to q)\Leftrightarrow p\land\neg q$ by equivalences.
>
> > [!ANSWER] Show answer
> > $\neg(p\to q)\Leftrightarrow\neg(\neg p\lor q)\Leftrightarrow\neg\neg p\land\neg q\Leftrightarrow p\land\neg q$, using the implication equivalence, De Morgan, and double negation.

> [!PRACTICE] 2 · Principal form
> Find the principal disjunctive normal form of $p\lor(q\land\neg p)$.
>
> > [!ANSWER] Show answer
> > Expand the missing variable: $p\Leftrightarrow(p\land q)\lor(p\land\neg q)$, while $q\land\neg p$ is already a minterm. The result is $m_1\lor m_2\lor m_3$, that is, $(\neg p\land q)\lor(p\land\neg q)\lor(p\land q)$.

> [!PRACTICE] 3 · Infer
> From $p\to q$ and $\neg q$, what follows, and by which rule?
>
> > [!ANSWER] Show answer
> > $\neg p$ follows by modus tollens. It is modus ponens applied to the contrapositive $\neg q\to\neg p$.

## Formal statement

Let $A,B$ be propositional formulas. If $v(A)=v(B)$ for every assignment $v$, then $A$ and $B$ are equivalent, written $A\Leftrightarrow B$. Equivalence is an equivalence relation on formulas and is closed under substitution: if $A\Leftrightarrow B$, replacing an occurrence of $A$ in $C$ by $B$ yields a formula equivalent to $C$. A minterm over $n$ variables is $m_i=\bigwedge_{j=1}^{n}L_j$, where $L_j$ is $p_j$ or $\neg p_j$ according to the $j$-th bit of $i$; every formula $A$ is equivalent to the disjunction of the minterms of its true rows, its principal disjunctive normal form, unique up to the ordering of variables and minterms. The form $A_1,\dots,A_n\vdash B$ is valid exactly when $(A_1\land\cdots\land A_n)\to B$ is a tautology.
