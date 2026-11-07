---
slug: "binary-operations"
subject: "discrete-mathematics"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Binary Operations, Closure, and Algebraic Systems"
subtitle: "Making the operation itself the object of study"
minutes: 15
meta: ["15 min read","Requires sets and Cartesian products","Mastery level"]
concepts: ["algebra-struct", "setops"]
prereq: ["setops"]
related: ["group", "algebra-struct"]
---

## What you will get

By the end of this lecture you can decide whether a map is a binary operation on a set $A$, read commutativity, identity and inverses off an operation table, explain that an algebraic system consists of a set, its operations and the axioms imposed on them, and state how semigroups, monoids and groups differ.

The shift is from "what to compute" to "what the operation satisfies". Numbers stop being the subject; the rules take over.

## Three lines back

- The Cartesian product $A\times A$ is the set of all ordered pairs $(x,y)$ and serves as the domain.
- A binary operation is a map $*:A\times A\to A$ assigning a unique element to every ordered pair.
- "Unique" and "the result stays in $A$" are separate demands; the second is closure.

## A binary operation is a map

Let $A$ be a non-empty set. A **binary operation** on $A$ is a map $*:A\times A\to A$ sending $(a,b)$ to $a*b$. Written as a map it already carries two facts: every ordered pair has a result, and that result is unique; and the values lie in $A$, which is **closure**.

Closed and not closed, side by side:

| Set | Operation | Closed | Reason |
| --- | --- | --- | --- |
| $\mathbb{N}$ | addition | yes | a sum of naturals is a natural |
| $\mathbb{N}$ | subtraction | no | $2-5=-3\notin\mathbb{N}$ |
| $\mathbb{Z}$ | multiplication | yes | a product of integers is an integer |
| $\mathbb{Z}\setminus\{0\}$ | division | no | $1/2$ is not an integer |
| $M_n(\mathbb{R})$ | matrix multiplication | yes | $n\times n$ times $n\times n$ stays $n\times n$ |

The last row deserves notice: matrix multiplication is closed but not commutative. Closure asks only whether the result stays inside the set; it says nothing about how the operation behaves.

## Reading properties off a table

On a finite set an operation can be written as a **Cayley table**, rows for the left operand and columns for the right. Take $A=\{0,1,2,3\}$ with addition modulo $4$:

| $+_4$ | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 2 | 3 |
| 1 | 1 | 2 | 3 | 0 |
| 2 | 2 | 3 | 0 | 1 |
| 3 | 3 | 0 | 1 | 2 |

Three facts are visible. The table is symmetric about the main diagonal, so the operation is **commutative**. Every row contains $0,1,2,3$ exactly once, the Latin-square property that makes each element invertible. The row and column headed by $0$ repeat the header, so $0$ is the **identity**. Inverses are found by looking for $0$: $1$ pairs with $3$, $2$ with itself, $0$ with itself.

**Associativity** cannot be read off. A table checks finitely many triples, while associativity quantifies over all $a,b,c$. You either prove it case by case or produce one counterexample. Real subtraction fails:

$$
(5-3)-1=1,\qquad 5-(3-1)=3
$$

So $(\mathbb{R},-)$ is not a semigroup, closed though it is.

## From an operation to an algebraic system

An **algebraic system** is a set $A$ together with its operations, written $(A,*,*')$ or $(A,+,\cdot)$. The same set with different operations gives different systems: $(\mathbb{Z},+)$ and $(\mathbb{Z},\cdot)$ are not the same object.

Adding axioms layer by layer gives the standard ladder:

| Structure | Requirement |
| --- | --- |
| Groupoid | closure |
| Semigroup | closure + associativity |
| Monoid | semigroup + identity |
| Group | monoid + inverse for every element |

For instance $(\mathbb{N},+)$ is a semigroup and a monoid (identity $0$), but not a group, since $3$ has no additive inverse in $\mathbb{N}$. $(\mathbb{Z},+)$ is a group. $(\mathbb{Z},\cdot)$ is a monoid (identity $1$) but not a group, because $1/2\notin\mathbb{Z}$.

Set operations give systems too: $(P(S),\cup,\cap)$ carries two binary operations, each distributes over the other, $\varnothing$ is the identity for $\cup$ and $S$ for $\cap$. This example returns when Boolean algebras are discussed.

## Three common misconceptions

> [!MYTH] Writing down a formula defines a binary operation.
> Closure still has to be checked. $a*b=a-b$ is not an operation on $\mathbb{N}$, because results escape the set; the same formula works on $\mathbb{Z}$.

> [!MYTH] Commutativity and associativity are the same law.
> Matrix multiplication is associative but not commutative; real subtraction satisfies neither. They are independent axioms, and groups demand only associativity.

> [!MYTH] Every algebraic system has an identity and inverses.
> A semigroup has closure and associativity only. $(\mathbb{N}\setminus\{0\},+)$ is a semigroup with neither.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Is $(\mathbb{Z},-)$ associative?
>
> > [!ANSWER] Show answer
> > No. $(5-3)-1=1$ while $5-(3-1)=3$, and one counterexample refutes the universal claim.

> [!PRACTICE] 2 · Variation
> Using the addition table modulo $4$, list the inverse of every element.
>
> > [!ANSWER] Show answer
> > The identity is $0$. The inverse of $0$ is $0$, of $1$ is $3$, of $2$ is $2$, of $3$ is $1$.

> [!PRACTICE] 3 · Transfer
> What is the identity of $(P(S),\cup)$, and which elements have inverses?
>
> > [!ANSWER] Show answer
> > The identity is $\varnothing$, since $A\cup\varnothing=A$. If $A\cup X=\varnothing$ then $A\subseteq\varnothing$, so $A=\varnothing$. Only $\varnothing$ is invertible.

## Formal statement

Let $A\ne\varnothing$. A binary operation on $A$ is a map $*:A\times A\to A$; it is closed on $A$ precisely because its values lie in $A$. It is associative if $(a*b)*c=a*(b*c)$ for all $a,b,c\in A$, and commutative if $a*b=b*a$ for all $a,b$.

An element $e\in A$ is an identity if $e*a=a*e=a$ for every $a$; if the operation is associative, the identity is unique. Given an identity $e$, an element $b$ is an inverse of $a$ if $a*b=b*a=e$; again associativity makes it unique.

A pair $(A,*)$ is a semigroup when the operation is closed and associative; a monoid when it also has an identity; a group when every element is invertible. A group whose operation is commutative is called abelian.
