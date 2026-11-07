---
slug: "extended-euclid"
subject: "discrete-mathematics"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "The Extended Euclidean Algorithm and Linear Congruences"
subtitle: "Keeping the books on a greatest common divisor"
minutes: 15
meta: ["15 min read","Requires divisibility and division with remainder","Mastery level"]
concepts: ["divisibility", "numalg"]
prereq: ["divisibility"]
related: ["numalg", "algebra-struct"]
---

## What you will get

By the end of this lecture you can run the extended Euclidean algorithm by hand, produce integers $s,t$ with $sa+tb=\gcd(a,b)$, and decide whether $ax\equiv b \pmod m$ has solutions, how many, and which.

There is one idea: every step of Euclid's division can be read backwards as an integer combination, so the greatest common divisor comes with a recipe attached.

## Three lines back

- Division with remainder: for $a$ and $b>0$ there are unique $q,r$ with $a=qb+r$ and $0\le r<b$.
- Every remainder is an integer combination of $a$ and $b$, because $r=a-qb$.
- So computing the gcd and computing the coefficients can happen at the same time, in one pass.

## Dividing, and recording the coefficients

Take $a=252$, $b=198$. First the divisions alone:

| Step | Division | Remainder |
| --- | --- | --- |
| 1 | $252=1\times 198+54$ | 54 |
| 2 | $198=3\times 54+36$ | 36 |
| 3 | $54=1\times 36+18$ | 18 |
| 4 | $36=2\times 18+0$ | 0 |

The last non-zero remainder is $18$, so $\gcd(252,198)=18$. Now substitute backwards, always keeping the form "remainder $=252s+198t$":

| Step | Remainder | $s$ | $t$ | Check |
| --- | --- | --- | --- | --- |
| 0 | 252 | 1 | 0 | $252$ |
| 1 | 54 | 1 | $-1$ | $252-198$ |
| 2 | 36 | $-3$ | 4 | $4\cdot198-3\cdot252$ |
| 3 | 18 | 4 | $-5$ | $4\cdot252-5\cdot198$ |

The last row gives $4\times252-5\times198=1008-990=18$. This is the **Bézout identity**: $\gcd(a,b)$ is always an integer combination of $a$ and $b$. The coefficients are not unique — adding $198$ to $s$ and subtracting $252$ from $t$ preserves the value.

In code you never store the whole table. Carry two coefficient pairs alongside the two remainders: if $r_i=r_{i-2}-q_i r_{i-1}$, then $s_i=s_{i-2}-q_i s_{i-1}$ and similarly for $t_i$.

## Linear congruences: first ask whether a solution exists

The congruence $ax\equiv b \pmod m$ says that $ax+my=b$ for some integer $y$. The left side is always a multiple of $d=\gcd(a,m)$, so if $d\nmid b$ there is no solution. If $d\mid b$, divide everything by $d$:

$$
\frac{a}{d}x \equiv \frac{b}{d} \pmod{\frac{m}{d}}
$$

Now $\gcd(a/d,\,m/d)=1$, so the coefficient is invertible modulo $m/d$ and the solution is unique there. Take that solution $x_0$ and expand it in the original modulus:

$$
x=x_0+k\cdot\frac{m}{d},\qquad k=0,1,\dots,d-1
$$

That gives exactly $d$ solutions, pairwise incongruent modulo $m$, and there are no others.

## One example carried to the end

Solve $18x\equiv 12 \pmod{30}$. Here $d=\gcd(18,30)=6$ and $6\mid 12$, so solutions exist and there are exactly six of them.

The reduced equation is $3x\equiv 2 \pmod 5$. The inverse of $3$ modulo $5$ is $2$, since $3\times2=6\equiv1$, so $x\equiv4 \pmod 5$. Expanding with $x=4+5k$:

| $k$ | $x$ | $18x \bmod 30$ |
| --- | --- | --- |
| 0 | 4 | 12 |
| 1 | 9 | 12 |
| 2 | 14 | 12 |
| 3 | 19 | 12 |
| 4 | 24 | 12 |
| 5 | 29 | 12 |

The six solutions are $4,9,14,19,24,29$. They are distinct modulo $30$ but all congruent to $4$ modulo $5$: unique after reduction, six after expansion.

When $d=1$ the solution is unique, and it is the **inverse** of $a$ modulo $m$. Computing that inverse is exactly solving $ax\equiv1 \pmod m$: the extended algorithm gives $sa+tm=1$, and $s$ is the inverse.

## Three common misconceptions

> [!MYTH] The extended algorithm is just Euclid with extra work.
> Trial division needs a factorisation and is hopeless on large integers. The extended algorithm runs in $O(\log\min(a,b))$ divisions and hands you the coefficients and the inverse for free.

> [!MYTH] Any congruence $ax\equiv b \pmod m$ with $a\ne0$ has a solution.
> Counterexample: $6x\equiv5 \pmod 9$. Here $\gcd(6,9)=3$ and $3\nmid5$. The left side is always $0$ modulo $3$, the right side is $2$.

> [!MYTH] If a solution exists, it is unique.
> Whenever $\gcd(a,m)>1$ divides $b$, there are $\gcd(a,m)$ incongruent solutions modulo $m$. Uniqueness holds only when $a$ and $m$ are coprime.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find $\gcd(99,78)$ and write it as $99s+78t$.
>
> > [!ANSWER] Show answer
> > $99=1\cdot78+21$, $78=3\cdot21+15$, $21=1\cdot15+6$, $15=2\cdot6+3$, $6=2\cdot3+0$, so the gcd is $3$. Back-substitution gives $3=14\cdot78-11\cdot99$, that is $s=-11$, $t=14$.

> [!PRACTICE] 2 · Variation
> Solve $7x\equiv3 \pmod{11}$.
>
> > [!ANSWER] Show answer
> > Since $\gcd(7,11)=1$ the solution is unique. The inverse of $7$ is $8$ because $7\times8=56\equiv1$, so $x\equiv3\times8=24\equiv2 \pmod{11}$.

> [!PRACTICE] 3 · Transfer
> Find the inverse of $13$ modulo $40$.
>
> > [!ANSWER] Show answer
> > $40=3\cdot13+1$, so $1=40-3\cdot13$ and the inverse is $-3\equiv37 \pmod{40}$. Check: $13\times37=481=12\cdot40+1$.

## Formal statement

Let $a,b$ be integers, not both zero, and $d=\gcd(a,b)$. Then there exist integers $s,t$ with $sa+tb=d$; the extended Euclidean algorithm finds them within $O(\log\min(|a|,|b|))$ divisions.

Let $m\ge1$ and $d=\gcd(a,m)$. The congruence $ax\equiv b \pmod m$ is solvable if and only if $d\mid b$. When solvable, its solutions are exactly

$$
x\equiv x_0 \pmod{m/d},\qquad x=x_0+k\frac{m}{d}\ (k=0,\dots,d-1),
$$

where $x_0$ is the unique solution of the reduced congruence $(a/d)x\equiv b/d \pmod{m/d}$. In particular, $a$ is invertible modulo $m$ exactly when $\gcd(a,m)=1$.
