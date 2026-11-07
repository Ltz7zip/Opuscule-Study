---
slug: "boolean-algebra-function"
subject: "discrete-mathematics"
unit: "u15"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Boolean Algebras and Boolean Functions"
subtitle: "Writing logic as equations"
minutes: 15
meta: ["15 min read","Requires propositional logic and set operations","Mastery level"]
concepts: ["boolean", "proplogic"]
prereq: ["proplogic"]
related: ["algebra-struct", "boolean"]
---

## What you will get

By the end of this lecture you can check a system against the Boolean axioms, write the truth table and disjunctive normal form of an $n$-variable Boolean function, transform expressions with distributivity, absorption and De Morgan's laws, and count how many $n$-variable Boolean functions exist.

A Boolean algebra unifies "true/false", "in/out of a set" and "on/off" into one set of equations, so reasoning becomes calculation.

## Three lines back

- In propositional logic, $\land,\lor,\lnot$ have four-row tables, yet they obey commutativity, associativity, distributivity and complementation.
- Set operations $\cap,\cup$ and complement obey exactly the same laws, with $0$ playing $\varnothing$ and $1$ playing the universe.
- Extracting those shared laws as axioms gives a Boolean algebra.

## Boolean algebras: a bundle of equations

A set $B$ carries two binary operations $\lor,\land$, one unary operation $\lnot$, and constants $0,1$. If for all $a,b,c\in B$:

| Axiom | Form |
| --- | --- |
| Commutativity | $a\lor b=b\lor a$, $a\land b=b\land a$ |
| Associativity | $(a\lor b)\lor c=a\lor(b\lor c)$, likewise for $\land$ |
| Distributivity | $a\lor(b\land c)=(a\lor b)\land(a\lor c)$, likewise for $\land$ over $\lor$ |
| Identities | $a\lor0=a$, $a\land1=a$ |
| Complementation | $a\lor\lnot a=1$, $a\land\lnot a=0$ |

then $(B,\lor,\land,\lnot,0,1)$ is a **Boolean algebra**. Both distributive laws hold, which separates Boolean algebras from ordinary rings: in $\mathbb{Z}$, $a+(b\cdot c)\ne(a+b)(a+c)$.

The smallest model is $B=\{0,1\}$ with $\lor$ as OR, $\land$ as AND, $\lnot$ as NOT. Another is the power-set algebra $(P(S),\cup,\cap,\complement,\varnothing,S)$, where complement is taken relative to $S$. The elements differ completely, yet the same axioms hold.

The axioms yield the **absorption law** $a\lor(a\land b)=a$ and **De Morgan's laws** $\lnot(a\lor b)=\lnot a\land\lnot b$. Both are used freely when simplifying.

## Boolean functions and truth tables

A map from $\{0,1\}^n$ to $\{0,1\}$ is an $n$-variable **Boolean function**. Since there are $2^n$ inputs and one output per input, the truth table determines the function completely. Hence the number of $n$-variable Boolean functions is

$$
2^{2^{n}}
$$

There are $4$ for $n=1$, $16$ for $n=2$, and already $256$ for $n=3$.

Take the three-variable **majority function**: output $1$ when at least two inputs are $1$. Its expression is

$$
f(x,y,z)=xy\lor yz\lor xz
$$

with truth table:

| $x$ | $y$ | $z$ | $f$ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

Check one row: at $x=1,y=0,z=1$, $xy=0$, $yz=0$, $xz=1$, so $f=1$.

## Disjunctive normal form: read the expression off the table

Every row with output $1$ gives a **minterm**: variables equal to $1$ appear plain, variables equal to $0$ appear negated, all joined by $\land$. Joining all minterms with $\lor$ gives a **disjunctive normal form** (DNF).

The four $1$ rows of the majority function are $011,101,110,111$, giving the minterms $\lnot x\land y\land z$, $x\land\lnot y\land z$, $x\land y\land\lnot z$, and $x\land y\land z$. Their disjunction is a correct DNF, but not a minimal one. Merging with distributivity and absorption:

$$
\lnot xyz\lor xyz=yz,\qquad x\lnot yz\lor xyz=xz,\qquad xy\lnot z\lor xyz=xy
$$

so $f=xy\lor yz\lor xz$, down from four three-literal terms to three two-literal terms. A DNF is guaranteed to exist, not to be shortest; minimisation is a separate job.

Dually, minterms of the $0$ rows joined by $\land$ give a **conjunctive normal form** (CNF). For the majority function it is $(x\lor y)(y\lor z)(x\lor z)$.

## Three common misconceptions

> [!MYTH] Boolean algebra is only about $0$ and $1$.
> $\{0,1\}$ is merely the smallest model. The power-set algebra $(P(S),\cup,\cap,\complement)$ has far more than two elements when $|S|>1$ and satisfies every axiom.

> [!MYTH] The distributive law in Boolean algebra is just the usual one in disguise.
> Both directions hold here: $a\lor(b\land c)=(a\lor b)\land(a\lor c)$ and $a\land(b\lor c)=(a\land b)\lor(a\land c)$. Integer addition does not distribute over multiplication.

> [!MYTH] Two Boolean functions agree if the first few truth-table rows agree.
> Equality needs all $2^n$ rows. The functions $x$ and $x\lor y$ agree on rows $10$ and $11$ but split on $01$: the first gives $0$, the second $1$. Skipping one row is enough to confuse two different functions.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Verify the absorption law $x\lor(x\land y)=x$ by truth table.
>
> > [!ANSWER] Show answer
> > At $00$: $0\lor0=0$; $01$: $0\lor0=0$; $10$: $1\lor0=1$; $11$: $1\lor1=1$. All four rows equal $x$, so the identity holds.

> [!PRACTICE] 2 · Variation
> Write the DNF of XOR, $x\oplus y$.
>
> > [!ANSWER] Show answer
> > The $1$ rows are $01$ and $10$, with minterms $\lnot x\land y$ and $x\land\lnot y$, so $x\oplus y=(\lnot x\land y)\lor(x\land\lnot y)$.

> [!PRACTICE] 3 · Transfer
> How many Boolean functions are there in three variables? In four?
>
> > [!ANSWER] Show answer
> > Three variables: $2^{2^3}=2^8=256$. Four: $2^{2^4}=2^{16}=65536$. The growth is doubly exponential.

## Formal statement

A Boolean algebra is a six-tuple $(B,\lor,\land,\lnot,0,1)$ where $\lor,\land$ are binary operations on $B$, $\lnot$ is unary, and for all $a,b,c\in B$ the laws of commutativity, associativity, both distributivity laws, the identities $a\lor0=a$ and $a\land1=a$, and complementation $a\lor\lnot a=1$, $a\land\lnot a=0$ hold.

Idempotence $a\lor a=a$, absorption $a\lor(a\land b)=a$, De Morgan's laws $\lnot(a\lor b)=\lnot a\land\lnot b$, and involution $\lnot\lnot a=a$ all follow. With $0<1$, the set $\{0,1\}$ is the two-element Boolean algebra, and every finite Boolean algebra is isomorphic to some power-set algebra.

An $n$-variable Boolean function is a map $f:\{0,1\}^n\to\{0,1\}$, and there are $2^{2^n}$ of them. Every such function has a DNF: for each assignment with $f=1$ form the minterm $m_i=\bigwedge_j(x_j\ \text{or}\ \lnot x_j)$, and $f=\bigvee_{i:f(i)=1}m_i$. The dual construction gives a CNF.
