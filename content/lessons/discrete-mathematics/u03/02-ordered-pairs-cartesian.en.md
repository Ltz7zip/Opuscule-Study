---
slug: "ordered-pairs-cartesian"
subject: "discrete-mathematics"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Ordered Pairs, Cartesian Products, and Relations as Sets"
subtitle: "Making order itself a set-theoretic object"
minutes: 16
meta: ["16 min read","Requires set axioms and operations","Mastery level"]
concepts: ["cartesian", "set", "setops"]
prereq: ["set"]
related: ["relation", "map"]
---

## What you will get

By the end of this lecture you can define an ordered pair using sets alone and explain why the definition works, count the elements of a Cartesian product, and write a binary relation as a subset of $A\times B$ with a domain and a range.

Three things: how a pair encodes order, how a product enumerates combinations, and why a relation is just a bunch of ordered pairs.

## Three lines back

- Sets have no order: $\{a,b\}$ and $\{b,a\}$ are the same set.
- Coordinates do have order: $(1,2)$ and $(2,1)$ are different objects.
- To build relations inside set theory, order itself must first be built from sets.

## Encoding ordered pairs

Kuratowski's encoding is

$$
(a,b)=\{\{a\},\{a,b\}\}
$$

It uses only unordered pairing and union, so it is a legal set in the axiom system. Check $(1,2)$:

$$
(1,2)=\{\{1\},\{1,2\}\},\qquad (2,1)=\{\{2\},\{1,2\}\}
$$

They contain different singleton sets, $\{1\}$ versus $\{2\}$, so they are not equal. Order is recorded by which element appears alone.

The essential property is the characterisation

$$
(a,b)=(c,d)\iff a=c\land b=d
$$

The proof splits into two cases. If $a=b$, then $(a,b)=\{\{a\}\}$, so equality forces $\{c\}=\{d\}=\{a\}$ and hence $c=d=a$. If $a\neq b$, the two members of $(a,b)$ are a singleton and a two-element set; equality can only match singleton with singleton, so $a=c$, and then $\{a,b\}=\{c,d\}$ gives $b=d$. Nothing is lost in the encoding.

> [!NOTE]
> The encoding is not unique: $\{a,\{a,b\}\}$ also works. What matters is that the object is built from sets and satisfies the characterisation.

## Cartesian products

The Cartesian product is the set of all ordered pairs:

$$
A\times B=\{(a,b)\mid a\in A\land b\in B\}
$$

Take $A=\{1,2\}$ and $B=\{a,b,c\}$:

| $a\in A$ | $b\in B$ | Ordered pair |
| --- | --- | --- |
| 1 | a | $(1,a)$ |
| 1 | b | $(1,b)$ |
| 1 | c | $(1,c)$ |
| 2 | a | $(2,a)$ |
| 2 | b | $(2,b)$ |
| 2 | c | $(2,c)$ |

There are $2\times 3=6$, and in general $|A\times B|=|A|\cdot|B|$. Note that this is multiplication, not addition: the size of a union is $|A|+|B|-|A\cap B|$, while a product simply multiplies.

Some boundary cases: $A\times\varnothing=\varnothing$; $A\times B$ and $B\times A$ generally differ unless $A=B$ or one of them is empty; $A\times A$ is written $A^2$ and has $|A|^2$ elements.

## Relations as sets of pairs

A binary relation $R$ from $A$ to $B$ is a subset of $A\times B$. When $(a,b)\in R$ we write $aRb$.

With $A=\{1,2,3\}$ and $B=\{a,b,c\}$, let $R=\{(1,a),(1,b),(2,c)\}$. Its domain and range are

$$
\operatorname{dom}R=\{1,2\},\qquad \operatorname{ran}R=\{a,b,c\}
$$

Three special relations: the empty relation $\varnothing$; the universal relation $A\times B$; and the identity $I_A=\{(a,a)\mid a\in A\}$ on $A$.

Because relations are sets, all set operations apply: $R\cup S$, $R\cap S$, and $R-S$ are relations again. There are $|A|^2$ ordered pairs on $A$, and each may be included or not, so the number of binary relations on $A$ is

$$
2^{|A|^2}
$$

For $|A|=3$ this is $2^9=512$. That count underlies everything said later about relation properties.

Inverse and composite relations are defined at the same level:

$$
R^{-1}=\{(b,a)\mid(a,b)\in R\},\qquad R\circ S=\{(a,c)\mid\exists b\,((a,b)\in R\land(b,c)\in S)\}
$$

The convention here is that $R\circ S$ goes through $R$ first, then $S$, and this course keeps that convention.

> [!MYTH] A relation is a "link between two sets", not a set.
> A relation has been defined as a subset of $A\times B$, so it can be unioned, intersected, complemented, and counted. "Link" is only intuition.

## Three common misconceptions

> [!MYTH] Ordered pairs must use the Kuratowski encoding.
> The encoding is a technique; any set-theoretic construction with the characterisation works. Mathematics cares that $(a,b)=(c,d)\iff a=c\land b=d$, not about the braces.

> [!MYTH] $|A\times B|=|A|+|B|$.
> The product has $|A|\cdot|B|$ elements. Two elements times three gives six ordered pairs, not five.

> [!MYTH] $A\times B$ and $B\times A$ differ only in notation.
> Their elements are reversed and they are usually unequal. $(1,a)\in A\times B$, but $(1,a)\notin B\times A$ because its first coordinate is not in $B$.

## Practice

> [!PRACTICE] 1 · Expand the encoding
> Write the Kuratowski encoding of $(2,3)$ and decide whether $\{\{2\},\{2,3\}\}$ equals $\{\{3\},\{2,3\}\}$.
>
> > [!ANSWER] Show answer
> > $(2,3)=\{\{2\},\{2,3\}\}$. The two sets are unequal because one contains $\{2\}$ and the other $\{3\}$, corresponding to $(2,3)$ and $(3,2)$.

> [!PRACTICE] 2 · Count
> $|A|=4$, $|B|=5$. Find $|A\times B|$, $|A\times A|$, and the number of binary relations on $A$.
>
> > [!ANSWER] Show answer
> > $|A\times B|=20$; $|A\times A|=16$; a relation is a subset of $A^2$, so there are $2^{16}=65536$.

> [!PRACTICE] 3 · Domain and inverse
> $A=\{1,2,3\}$, $R=\{(1,1),(2,3),(3,1)\}$. Find $\operatorname{dom}R$, $\operatorname{ran}R$, and $R^{-1}$.
>
> > [!ANSWER] Show answer
> > $\operatorname{dom}R=\{1,2,3\}$, $\operatorname{ran}R=\{1,3\}$, and $R^{-1}=\{(1,1),(3,2),(1,3)\}$.

## Formal statement

The ordered pair is $(a,b)=\{\{a\},\{a,b\}\}$. Theorem: $(a,b)=(c,d)$ iff $a=c$ and $b=d$. The Cartesian product is $A\times B=\{(a,b)\mid a\in A\land b\in B\}$, with $|A\times B|=|A|\cdot|B|$ and $A\times\varnothing=\varnothing$. A binary relation from $A$ to $B$ is any subset of $A\times B$; its domain is $\operatorname{dom}R=\{a\mid\exists b\,(a,b)\in R\}$ and its range is $\operatorname{ran}R=\{b\mid\exists a\,(a,b)\in R\}$. The inverse is $R^{-1}=\{(b,a)\mid(a,b)\in R\}$ and the composite is $R\circ S=\{(a,c)\mid\exists b\,((a,b)\in R\land(b,c)\in S)\}$. There are $2^{|A|^2}$ binary relations on $A$.
