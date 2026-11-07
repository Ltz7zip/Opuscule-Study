---
slug: "crt-modular"
subject: "discrete-mathematics"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Congruences, the Chinese Remainder Theorem, and Modular Arithmetic"
subtitle: "Squeezing infinitely many integers into finitely many boxes"
minutes: 16
meta: ["16 min read","Requires the extended Euclidean algorithm","Mastery level"]
concepts: ["numalg", "divisibility"]
prereq: ["numalg"]
related: ["divisibility", "algebra-struct"]
---

## What you will get

By the end of this lecture you can treat congruence as an equivalence relation, add, subtract and multiply modulo $m$ without breaking the rules, glue solutions from several small moduli into one solution under the Chinese Remainder Theorem, and tell when a system with non-coprime moduli is solvable.

The theme is compression: the integers are infinite, but modulo $m$ only $m$ boxes remain, and arithmetic becomes arithmetic on a finite table.

## Three lines back

- $a\equiv b \pmod m$ means $m\mid(a-b)$; it splits the integers into $m$ residue classes.
- If $a\equiv a'$ and $b\equiv b'$, then $a+b\equiv a'+b'$ and $ab\equiv a'b'$, so the operations descend to residue classes.
- Addition modulo $m$ forms a group, and multiplication forms one on the invertible classes; both reappear when algebraic structures are introduced.

## Congruence: packing the integers into m boxes

Fix $m\ge1$ and define $a\sim b$ exactly when $m\mid(a-b)$. The relation is reflexive, symmetric and transitive, hence an equivalence relation. Each class is a **residue class** $[a]_m$, and the set of all of them is $\mathbb{Z}_m=\{[0],[1],\dots,[m-1]\}$.

Writing multiplication on $\mathbb{Z}_6$ as a table makes zero divisors visible:

| $\times$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 2 | 3 | 4 | 5 |
| 2 | 0 | 2 | 4 | 0 | 2 | 4 |
| 3 | 0 | 3 | 0 | 3 | 0 | 3 |
| 4 | 0 | 4 | 2 | 0 | 4 | 2 |
| 5 | 0 | 5 | 4 | 3 | 2 | 1 |

Two entries deserve attention. Since $2\times3\equiv0$, the ring $\mathbb{Z}_6$ has non-zero zero divisors. Since $5\times5\equiv1$, the class $5$ is invertible. In general $[a]_m$ is invertible exactly when $\gcd(a,m)=1$.

## Operations move inside the brackets

The useful property of congruence is compatibility with arithmetic: if $a\equiv a'$ and $b\equiv b'$, then

$$
a+b\equiv a'+b',\qquad a-b\equiv a'-b',\qquad ab\equiv a'b' \pmod m
$$

The proof is one line: write $a=a'+km$ and $b=b'+\ell m$; every extra term in the expansion carries a factor $m$.

So "compute, then reduce" equals "reduce, then compute", which is why large computations can be split into small pieces. For $37\times48 \bmod 7$: $37\equiv2$ and $48\equiv6$, so the product is $12\equiv5$. Directly, $1776=7\times253+5$, the same answer, with much bigger intermediate numbers.

Division has no such property. We have $4\equiv1 \pmod 3$, but $4/2=2$ while "$1/2$" means nothing over the integers. Division is legal only as multiplication by an inverse, and only when that inverse exists.

## The Chinese Remainder Theorem: small moduli, one big modulus

Let $m_1,\dots,m_k$ be pairwise coprime, $M=m_1m_2\cdots m_k$, and $M_i=M/m_i$. Then the system

$$
x\equiv a_i \pmod{m_i}\quad(i=1,\dots,k)
$$

has a unique solution modulo $M$. To build it, let $y_i$ be the inverse of $M_i$ modulo $m_i$; then

$$
x\equiv\sum_{i=1}^{k} a_i M_i y_i \pmod M
$$

Take $x\equiv2 \pmod3$, $x\equiv3 \pmod5$, $x\equiv2 \pmod7$. Here $M=105$ and the cofactors are $M_1=35$, $M_2=21$, $M_3=15$, congruent to $2,1,1$ modulo $3,5,7$; their inverses are $2,1,1$. Hence

$$
x\equiv 2\cdot35\cdot2+3\cdot21\cdot1+2\cdot15\cdot1=140+63+30=233\equiv23 \pmod{105}
$$

Check: $23\bmod3=2$, $23\bmod5=3$, $23\bmod7=2$. Exactly one solution exists modulo $105$, because the three conditions are independent and together collapse $105$ boxes into one.

## When the moduli are not coprime

Pairwise coprimality is sufficient, not necessary. The pair $x\equiv a_1 \pmod{m_1}$, $x\equiv a_2 \pmod{m_2}$ is solvable if and only if

$$
a_1\equiv a_2 \pmod{\gcd(m_1,m_2)}
$$

and then the solution is unique modulo $\operatorname{lcm}(m_1,m_2)$. For $x\equiv1 \pmod4$ and $x\equiv3 \pmod6$: $\gcd(4,6)=2$ and $1\equiv3 \pmod2$, so a solution exists. Trying values, $x=9$ works: $9\bmod4=1$ and $9\bmod6=3$. The general solution is $x\equiv9 \pmod{12}$.

By contrast, $x\equiv1 \pmod4$ with $x\equiv2 \pmod6$ has no solution: modulo $2$ the two requirements ask for $1$ and $0$ at once.

## Three common misconceptions

> [!MYTH] A common factor can be cancelled from a congruence like from an equation.
> $6\equiv12 \pmod 6$, but dividing both sides by $6$ gives $1\equiv2 \pmod 6$, which is false. The correct rule divides the modulus as well: $ak\equiv bk \pmod m$ implies $a\equiv b \pmod{m/\gcd(k,m)}$.

> [!MYTH] The Chinese Remainder Theorem works for any moduli.
> It needs pairwise coprime moduli. $x\equiv1 \pmod4$, $x\equiv2 \pmod6$ is a counterexample with no solution; in general the gcd condition decides solvability and the period is the lcm, not the product.

> [!MYTH] Modular arithmetic only matters for cryptography.
> Hash buckets, circular buffer indices, block multiplication of large integers, and check digits all rest on the same fact: reducing early never changes the final residue.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find the least non-negative solution of $x\equiv1 \pmod3$, $x\equiv2 \pmod5$, $x\equiv3 \pmod7$.
>
> > [!ANSWER] Show answer
> > $M=105$, with cofactors $35\equiv2$, $21\equiv1$, $15\equiv1$. The inverses are $2,1,1$, so $x=1\cdot35\cdot2+2\cdot21+3\cdot15=70+42+45=157\equiv52 \pmod{105}$. Check: $52\bmod3=1$, $52\bmod5=2$, $52\bmod7=3$.

> [!PRACTICE] 2 · Variation
> Solve $x\equiv2 \pmod4$ and $x\equiv4 \pmod6$.
>
> > [!ANSWER] Show answer
> > $\gcd(4,6)=2$ and $2\equiv4 \pmod2$, so a solution exists. $x=10$ satisfies both, hence $x\equiv10 \pmod{12}$.

> [!PRACTICE] 3 · Transfer
> Use modular arithmetic to compute $2^{10}\bmod 7$.
>
> > [!ANSWER] Show answer
> > $2^3=8\equiv1$, so $2^{10}=(2^3)^3\cdot2\equiv1\cdot2=2 \pmod7$.

## Formal statement

For $m\ge1$, addition and multiplication on $\mathbb{Z}_m$ are defined by $[a]+[b]=[a+b]$ and $[a][b]=[ab]$. They are well defined and satisfy associativity, commutativity and distributivity; $[0]$ is the additive identity and $[-a]$ the additive inverse of $[a]$. The class $[a]$ is multiplicatively invertible if and only if $\gcd(a,m)=1$.

Let $m_1,\dots,m_k$ be pairwise coprime and $M=\prod m_i$. The map $\varphi:\mathbb{Z}_M\to\mathbb{Z}_{m_1}\times\cdots\times\mathbb{Z}_{m_k}$ given by $\varphi([x]_M)=([x]_{m_1},\dots,[x]_{m_k})$ is a ring isomorphism. Consequently the system $x\equiv a_i \pmod{m_i}$ has a unique solution modulo $M$ for every choice of residues. If the moduli are not pairwise coprime, two congruences are jointly solvable exactly when their right sides agree modulo the gcd of the moduli, and the solution is then unique modulo their lcm.
