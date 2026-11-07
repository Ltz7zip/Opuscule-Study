---
slug: "semigroup-monoid-group"
subject: "discrete-mathematics"
unit: "u13"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Semigroups, Monoids, and the Definition of a Group"
subtitle: "Four axioms and the structure they hold up"
minutes: 16
meta: ["16 min read","Requires binary operations and associativity","Mastery level"]
concepts: ["group", "algebra-struct"]
prereq: ["algebra-struct"]
related: ["ringfield", "group"]
---

## What you will get

By the end of this lecture you can check the four group axioms one at a time, verify that a finite system given by a table is a group, explain why identity and inverses are unique, and separate semigroups, monoids and groups at the level of definitions.

A group is defined in one short paragraph: closure, associativity, an identity, and an inverse for every element. A short definition means no clause is decorative, and counterexamples usually fail on exactly one of them.

## Three lines back

- A binary operation is a map $A\times A\to A$; closure is built into the codomain.
- Associativity makes brackets irrelevant, and it is what lets statements like "the inverse is unique" be proved.
- The identity is the element that does nothing; an inverse cancels its element back to the identity.

## Three layers

Adding axioms one at a time gives three layers:

| Structure | Axioms | Example | Counterexample (missing axiom) |
| --- | --- | --- | --- |
| Semigroup | closure, associativity | $(\mathbb{N},+)$, $(M_n,\cdot)$ | $(\mathbb{R},-)$ lacks associativity |
| Monoid | semigroup + identity | $(\mathbb{N},\times)$, $(\Sigma^{*},\text{concat})$ | $(\mathbb{N}\setminus\{0\},+)$ has no identity |
| Group | monoid + inverses | $(\mathbb{Z},+)$, $(\mathbb{Z}_5^{*},\times)$ | $2$ has no inverse in $(\mathbb{Z},\times)$ |

Take $(\mathbb{Z}_5^{*},\times)$: the set is $\{1,2,3,4\}$ with multiplication modulo $5$. Since $2\times3=6\equiv1$, the elements $2$ and $3$ are inverses; $4\times4=16\equiv1$, so $4$ is self-inverse; $1$ is the identity. All four axioms hold, and this is a group of order $4$.

Now $(\mathbb{Z},\times)$: it has identity $1$, multiplication is closed and associative, yet it is not a group. The inverse of $2$ would be $1/2$, which is not an integer. Integer multiplication stops at the monoid level.

## A group table: the four-element group

The smallest non-trivial groups come in two kinds. Let $V=\{e,a,b,c\}$ with the operation below:

| $\cdot$ | $e$ | $a$ | $b$ | $c$ |
| --- | --- | --- | --- | --- |
| $e$ | $e$ | $a$ | $b$ | $c$ |
| $a$ | $a$ | $e$ | $c$ | $b$ |
| $b$ | $b$ | $c$ | $e$ | $a$ |
| $c$ | $c$ | $b$ | $a$ | $e$ |

How to read it: the $e$ row repeats the header, so $e$ is the identity; the diagonal is all $e$, so every element is its own inverse; the table is symmetric, so the operation is commutative. Associativity cannot be seen in a table — verify it case by case, or realise the table with concrete objects, for instance

$$
e=\begin{pmatrix}1&0\\0&1\end{pmatrix},\quad a=\begin{pmatrix}-1&0\\0&-1\end{pmatrix},\quad b=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\quad c=\begin{pmatrix}-1&0\\0&1\end{pmatrix}
$$

Matrix multiplication is automatically associative, and $a^2=b^2=c^2=e$, $ab=c$, exactly as the table says. This is the **Klein four-group**.

Compare $(\mathbb{Z}_4,+)$: also a group of order $4$, but it has an element $1$ with $1+1+1+1=0$ and no earlier return to $0$. In $V$ every non-identity element returns to $e$ after two steps. Two groups of the same order can be non-isomorphic, so order alone does not determine structure.

## Why identity and inverses are unique

Identity: if $e$ and $e'$ are both identities, then $e=e*e'=e'$. Both steps use only the definition.

Inverse: if $b$ and $c$ are both inverses of $a$, then

$$
b=b*e=b*(a*c)=(b*a)*c=e*c=c
$$

The middle step is associativity. Without it an element could have several inverses, so that axiom earns its place.

This also yields the **cancellation law**: from $a*b=a*c$, multiply on the left by $a^{-1}$ to get $b=c$. Cancellation always holds in a group but can fail in a monoid: in $(\mathbb{Z}_6,\times)$, $2\times1=2\times4=2$ while $1\ne4$.

## Three common misconceptions

> [!MYTH] A semigroup is "half a group", missing only inverses.
> A monoid sits in between. $(\mathbb{N}\setminus\{0\},+)$ has no identity at all, so it is two axioms away from being a group.

> [!MYTH] A symmetric operation table proves the system is a group.
> Symmetry only gives commutativity. The constant operation $x*y=0$ on $\{0,1\}$ is symmetric and associative but has no identity, hence is not a group. Identity and inverses must still be checked.

> [!MYTH] Every group is abelian.
> The symmetric group $S_3$ on three letters has six elements and is a group under composition, but composing two transpositions depends on the order, so $S_3$ is not abelian. Commutativity is an extra property, never a default.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Check the four axioms for $(\mathbb{Z},+)$.
>
> > [!ANSWER] Show answer
> > Closure: a sum of integers is an integer. Associativity: $(a+b)+c=a+(b+c)$. Identity $0$: $a+0=a$. Inverse $-a$: $a+(-a)=0$. All four hold, and addition commutes, so it is an abelian group.

> [!PRACTICE] 2 · Variation
> In the four-element table compute $ab$, $b^2$, and $(ab)c$.
>
> > [!ANSWER] Show answer
> > $ab=c$; $b^2=e$; $(ab)c=c\cdot c=e$. Equivalently $bc=a$, so $a\cdot a=e$ by associativity.

> [!PRACTICE] 3 · Transfer
> Prove that $(a*b)^{-1}=b^{-1}*a^{-1}$ in a group.
>
> > [!ANSWER] Show answer
> > Compute $(a*b)*(b^{-1}*a^{-1})=a*(b*b^{-1})*a^{-1}=a*a^{-1}=e$, and the reverse product is $e$ as well; uniqueness of the inverse gives the claim. The order reverses.

## Formal statement

Let $G$ be non-empty and let $*$ be a binary operation on $G$. If $*$ is closed and associative, $(G,*)$ is a semigroup; if in addition there is $e\in G$ with $e*a=a*e=a$ for all $a$, it is a monoid and $e$ is the identity; if for every $a\in G$ there is $b\in G$ with $a*b=b*a=e$, it is a group and $b$ is written $a^{-1}$.

In a group the identity is unique, each inverse is unique, and cancellation holds: $a*b=a*c$ implies $b=c$, and $b*a=c*a$ implies $b=c$. A group with a commutative operation is called abelian. The order of a finite group is its number of elements, written $|G|$. Both $V$ and $\mathbb{Z}_4$ have order $4$, but every non-identity element of $V$ satisfies $x^2=e$ while $\mathbb{Z}_4$ does not, so the two are not isomorphic.
