---
slug: "boolean-simplification"
subject: "discrete-mathematics"
unit: "u15"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Simplifying Boolean Expressions and Logic Circuits"
subtitle: "One gate fewer, one delay less"
minutes: 16
meta: ["16 min read","Requires Boolean algebras and truth tables","Mastery level"]
concepts: ["boolean", "disc"]
prereq: ["boolean"]
related: ["proplogic", "complexity"]
---

## What you will get

By the end of this lecture you can simplify Boolean expressions with algebraic identities, circle adjacent $1$s on a Karnaugh map and read the result, translate an expression into an AND-OR-NOT circuit and count its gates and depth, and explain why NAND gates alone suffice for any circuit.

The goal is concrete: realise the same truth table with fewer literals and fewer gates.

## Three lines back

- A Boolean function is determined by its truth table; an expression is only one way to write it, and the writing is not unique.
- Complementation $a\lor\lnot a=1$ and $a\land\lnot a=0$ is the key that removes variables.
- A two-level AND-OR structure means "products first, sum second", and any DNF maps onto it directly.

## Algebraic simplification: three workhorse identities

Simplification removes variables. Three identities cover most hand calculations:

| Name | Identity | Effect |
| --- | --- | --- |
| Combining | $xy\lor x\lnot y=x$ | removes one variable |
| Absorption | $x\lor xy=x$ | swallows a redundant term |
| De Morgan | $\lnot(x\lor y)=\lnot x\land\lnot y$ | turns OR into AND |

An example:

$$
f=xy\lor x\lnot y\lor \lnot x\,y
$$

The first two terms combine: $xy\lor x\lnot y=x(y\lor\lnot y)=x$. The expression becomes $x\lor\lnot x\,y$, and distributivity read backwards gives

$$
x\lor\lnot x\,y=(x\lor\lnot x)(x\lor y)=1\cdot(x\lor y)=x\lor y
$$

So $f=x\lor y$. The truth table confirms it: $f$ is $1$ exactly on $01,10,11$. The original has three two-literal terms and five literals; the result has two literals and needs one OR gate instead of three AND gates plus two OR gates.

## Karnaugh maps: circling neighbours

A Karnaugh map for $n$ variables has $2^n$ cells arranged in Gray-code order, so neighbouring cells differ in one variable. Circle adjacent $1$s; variables that keep their value inside a circle survive, variables that change are dropped.

For three variables the rows are $x$ and the columns follow $yz=00,01,11,10$. Plot $f=\sum m(0,1,4,5)$, that is, $000,001,100,101$:

| $x\backslash yz$ | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 |

The four $1$s form a $2\times2$ block. Inside it $x$ changes from $0$ to $1$ and $z$ changes as well; only $y$ stays $0$. Hence $f=\lnot y$.

Now $f=\sum m(1,3,5,7)$, that is, $001,011,101,111$:

| $x\backslash yz$ | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 |

The two middle columns are all $1$: $z$ is always $1$ while $x$ and $y$ vary, so $f=z$. Four minterms collapse to a single literal.

Two rules govern the circling: a circle must contain $2^k$ cells, and circles may wrap around the edges (the leftmost and rightmost columns are adjacent). Larger circles give shorter terms, every $1$ must be covered, and circles may overlap.

## From expression to circuit

A sum-of-products expression maps onto a two-level circuit: one AND gate per product term, then a single OR gate. For the majority function $f=xy\lor yz\lor xz$ that means three two-input AND gates and one three-input OR gate.

| Implementation | Gates | Depth |
| --- | --- | --- |
| Unsimplified DNF (four three-variable minterms) | 4 three-input AND + 1 four-input OR = 5 | 2 |
| Simplified $xy\lor yz\lor xz$ | 3 AND + 1 OR = 4 | 2 |
| XOR from NAND gates | 4 NAND | 3 |

Fewer gates do not automatically mean faster: a two-level form forces every signal through two gates, while a multi-level decomposition may use slightly more gates with a shorter critical path. Fan-in limits and wiring matter too.

**NAND is functionally complete**: $\lnot x=x\uparrow x$, $x\land y=\lnot(x\uparrow y)$, and $x\lor y=(\lnot x)\uparrow(\lnot y)$. Any Boolean function can therefore be built from NAND gates alone. The standard four-gate XOR is

$$
x\oplus y=\bigl(x\uparrow(x\uparrow y)\bigr)\uparrow\bigl(y\uparrow(x\uparrow y)\bigr)
$$

With $n=x\uparrow y=\lnot(xy)$, we get $x\uparrow n=\lnot(x\lnot(xy))=\lnot(x\lnot y)$ and $y\uparrow n=\lnot(y\lnot x)$; NANDing those two gives $x\lnot y\lor y\lnot x$.

## Three common misconceptions

> [!MYTH] Simplifying only makes an expression look shorter.
> Every literal costs a gate and wiring. Simplification reduces gate count, area and dynamic power, and often shortens the critical path.

> [!MYTH] Every Boolean function has a unique minimal expression.
> Minimal forms are usually not unique. $f=xy\lor\lnot x z$ and $f=xy\lor\lnot x z\lor yz$ are equivalent, and different circle choices yield different minimal sum-of-products forms.

> [!MYTH] Circuits can only be built from AND, OR and NOT gates.
> NAND alone is complete, and so is NOR. Chips use NAND heavily precisely so that only one gate type has to be manufactured.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Simplify $\lnot x\,y\lor xy$.
>
> > [!ANSWER] Show answer
> > Factor out $y$: $y(\lnot x\lor x)=y\cdot1=y$. The truth table agrees: the output is $1$ whenever $y=1$, independent of $x$.

> [!PRACTICE] 2 · Variation
> Simplify $f=\sum m(0,2,4,6)$ with a Karnaugh map.
>
> > [!ANSWER] Show answer
> > All four minterms satisfy $z=0$ while $x,y$ run through all four combinations, so $f=\lnot z$. On the map the two columns with $z=0$ are entirely $1$.

> [!PRACTICE] 3 · Transfer
> Rewrite $\lnot(xy\lor z)$ using De Morgan's laws.
>
> > [!ANSWER] Show answer
> > $\lnot(xy\lor z)=\lnot(xy)\land\lnot z=(\lnot x\lor\lnot y)\land\lnot z$, a conjunctive form that maps onto OR gates feeding an AND gate.

## Formal statement

Let $f:\{0,1\}^n\to\{0,1\}$. The minterm $m_i$ is $1$ at assignment $i$ and $0$ elsewhere, and the canonical disjunctive normal form is $f=\bigvee_{i:f(i)=1}m_i$. If two minterms differ in exactly one complemented variable they merge and that variable disappears:

$$
x\,g\lor\lnot x\,g=g
$$

Repeated application is exactly the grouping performed on a Karnaugh map: a circle of $2^{k}$ cells removes $k$ variables.

A sum-of-products expression $f=\bigvee_{j}\bigwedge_{k}\ell_{jk}$, with each $\ell_{jk}$ a literal, is realised by a two-level circuit: an AND array followed by one OR gate. The gate count is the number of product terms plus one (ignoring inverters) and the depth is $2$. The NAND gate $x\uparrow y=\lnot(x\land y)$ is functionally complete: $\lnot x=x\uparrow x$, $x\land y=\lnot(x\uparrow y)$, and $x\lor y=(\lnot x)\uparrow(\lnot y)$, so every Boolean function has a NAND-only realisation.
