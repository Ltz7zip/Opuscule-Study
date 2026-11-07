---
slug: "countable-uncountable"
subject: "discrete-mathematics"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Countable and Uncountable Sets"
subtitle: "Infinity can be compared with infinity"
minutes: 16
meta: ["16 min read","Requires relations and maps","Mastery level"]
concepts: ["countable", "set", "map"]
prereq: ["set", "relation"]
related: ["ordinal", "axchoice"]
---

## What you will get

By the end of this lecture you can use bijections to decide whether two infinite sets have the same size, write bijections from the naturals to the integers and to the rationals, and reproduce the diagonal proof that the reals are uncountable.

Three things: the definition of equinumerosity, the test for countability, and the precise meaning of "infinity has levels".

## Three lines back

- Finite sets are compared by counting elements; infinite sets cannot be counted, so they are compared by pairing.
- Two sets are equinumerous when a bijection exists between them.
- The naturals are the basic infinite set; anything that pairs with them has the same size.

## Equinumerosity and countability

Sets $A$ and $B$ are equinumerous, written $A\approx B$, when a bijection $f:A\to B$ exists. This is an equivalence relation: the identity gives reflexivity, the inverse gives symmetry, and composition gives transitivity.

$A$ is finite if it is equinumerous with some $\{0,\dots,n-1\}$, and infinite otherwise. $A$ is countably infinite, or simply countable here, if $A\approx\mathbb{N}$. Finite and countably infinite sets are called at most countable.

The intuition is that a countable set can be listed: a bijection $f:\mathbb{N}\to A$ numbers the elements $a_0,a_1,a_2,\dots$, each appearing exactly once.

## Integers and rationals are countable

The integers look more numerous than the naturals, since both are infinite. Pairing still works:

$$
f(n)=\begin{cases}\dfrac{n}{2}, & n\text{ even}\\[4pt]-\dfrac{n+1}{2}, & n\text{ odd}\end{cases}
$$

| $n$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| $f(n)$ | 0 | $-1$ | 1 | $-2$ | 2 | $-3$ |

Every integer appears exactly once, so $\mathbb{Z}\approx\mathbb{N}$.

The rationals are more surprising. Write each positive rational as $p/q$ and place it in row $p$, column $q$ of an infinite table. Scan diagonals by increasing $p+q$, skipping fractions not in lowest terms:

| Position | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Rational | $0$ | $1$ | $-1$ | $1/2$ | $-1/2$ | $2$ |

Every rational appears on some diagonal, so the list numbers them all. $\mathbb{Q}$ is dense on the line yet equinumerous with $\mathbb{N}$; density is not size.

> [!NOTE]
> A countable union of countable sets is countable. List each set as a row and scan diagonals to obtain one list of all elements. This gives another proof that $\mathbb{Q}$ is countable.

## The reals are uncountable

Suppose $(0,1)$ is countable and list its elements in decimal:

$$
x_1=0.d_{11}d_{12}d_{13}\cdots,\quad x_2=0.d_{21}d_{22}d_{23}\cdots,\quad\dots
$$

Build $y=0.e_1e_2e_3\cdots$ by setting $e_n=2$ when $d_{nn}=1$ and $e_n=1$ otherwise. Then $y$ differs from $x_n$ at position $n$, so $y\neq x_n$ for every $n$. Yet $y\in(0,1)$, contradicting the claim that the list contains everything.

Hence $(0,1)$ is uncountable, and so is $\mathbb{R}$. The proof uses only the diagonal, no detail about the size of real numbers.

A stronger result is Cantor's theorem:

$$
|A|<|\mathcal{P}(A)|
$$

for every set. The injection $a\mapsto\{a\}$ gives $|A|\le|\mathcal{P}(A)|$; if a surjection $f:A\to\mathcal{P}(A)$ existed, the set $B=\{a\in A\mid a\notin f(a)\}$ could equal no $f(a)$, a contradiction.

| Set | Countable? | Reason |
| --- | --- | --- |
| $\mathbb{N}$ | yes | identity map |
| $\mathbb{Z}$ | yes | even-odd pairing |
| $\mathbb{Q}$ | yes | diagonal enumeration |
| $\mathbb{R}$ | no | diagonal argument |
| $\mathcal{P}(\mathbb{N})$ | no | Cantor's theorem |

> [!MYTH] The rationals outnumber the naturals because they are dense.
> Density is an order property; cardinality is a size property. $\mathbb{Q}$ can be listed and so can $\mathbb{N}$, so they are equinumerous; $(0,1)$ cannot be listed.

## Three common misconceptions

> [!MYTH] All infinite sets are equinumerous.
> $\mathbb{N}$ and $\mathbb{R}$ are not. Cantor's theorem goes further: every set has a larger power set, so there is no largest cardinality.

> [!MYTH] A proper subset of an infinite set is always smaller.
> The even numbers are a proper subset of $\mathbb{N}$, yet $n\mapsto2n$ is a bijection. This is exactly what separates infinite sets from finite ones.

> [!MYTH] Adding one element to a countable set can make it uncountable.
> A countable set plus a finite set stays countable: put the new elements first and shift the rest. A countable union of countable sets is countable too.

## Practice

> [!PRACTICE] 1 · Build a bijection
> Show that the positive even numbers $E=\{2,4,6,\dots\}$ are equinumerous with $\mathbb{N}$.
>
> > [!ANSWER] Show answer
> > $f(n)=2n$ is a bijection: injective because $2m=2n$ gives $m=n$, surjective because every $2k$ is $f(k)$. Hence $E\approx\mathbb{N}$.

> [!PRACTICE] 2 · Decide
> Is $\mathbb{N}\times\mathbb{N}$ countable?
>
> > [!ANSWER] Show answer
> > Yes. Layer by $i+j$; each layer is finite, and enumerating layer by layer gives a bijection. Equivalently, the Cantor pairing $\pi(i,j)=\frac{(i+j)(i+j+1)}{2}+i$ works.

> [!PRACTICE] 3 · Use the diagonal
> Show that $(0,1)$ and $\mathbb{R}$ are equinumerous.
>
> > [!ANSWER] Show answer
> > $x\mapsto\tan(\pi(x-\tfrac12))$ is a bijection from $(0,1)$ to $\mathbb{R}$, so they are equinumerous. Since $(0,1)$ is uncountable, so is $\mathbb{R}$.

## Formal statement

$A\approx B$ means there is a bijection $f:A\to B$; this is an equivalence relation on sets. $A$ is countably infinite when $A\approx\mathbb{N}$, and at most countable when it is finite or countably infinite. $\mathbb{Z}\approx\mathbb{N}$, $\mathbb{Q}\approx\mathbb{N}$, $\mathbb{N}\times\mathbb{N}\approx\mathbb{N}$, and a countable union of countable sets is countable. Cantor's theorem: for every $A$, $|A|<|\mathcal{P}(A)|$, since $a\mapsto\{a\}$ is injective and no $f:A\to\mathcal{P}(A)$ is surjective, as $B=\{a\in A\mid a\notin f(a)\}$ is missed. $(0,1)$ is uncountable: if $(0,1)=\{x_1,x_2,\dots\}$, choose $y$ whose $n$-th digit differs from the $n$-th digit of $x_n$; then $y\in(0,1)$ is absent from the list, a contradiction.
