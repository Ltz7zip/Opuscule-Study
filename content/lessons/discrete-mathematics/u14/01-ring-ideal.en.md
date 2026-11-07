---
slug: "ring-ideal"
subject: "discrete-mathematics"
unit: "u14"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Rings, Integral Domains, and Ideals"
subtitle: "Two operations, two jobs"
minutes: 16
meta: ["16 min read","Requires groups and binary operations","Mastery level"]
concepts: ["ringfield", "group"]
prereq: ["group"]
related: ["algebra-struct", "boolean"]
---

## What you will get

By the end of this lecture you can check the ring axioms, decide which elements of a ring are invertible and which are zero divisors, tell rings, integral domains and fields apart, and explain why ideals are exactly the kernels of ring homomorphisms and how quotient rings are built.

A ring puts two operations on one set: addition supplies subtraction, multiplication supplies products, and distributivity makes them cooperate.

## Three lines back

- A group has one operation; a ring has two, with addition forming an abelian group and multiplication a semigroup.
- Distributivity is the bridge: $a(b+c)=ab+ac$ carries the additive structure into multiplication.
- The kernel of a group homomorphism is a normal subgroup; the ring counterpart is an ideal.

## Rings: two operations with distinct jobs

A set $R$ with operations $+$ and $\cdot$ is a **ring** if

- $(R,+)$ is an abelian group (identity $0$, inverse $-a$);
- $\cdot$ is closed and associative on $R$;
- $a(b+c)=ab+ac$ and $(a+b)c=ac+bc$ for all $a,b,c$.

If multiplication commutes the ring is commutative; if there is a multiplicative identity it is written $1$.

Multiplying by $0$ always gives $0$: $a\cdot0=a(0+0)=a\cdot0+a\cdot0$, and adding $-(a\cdot0)$ to both sides finishes. Only distributivity is used, no commutativity of multiplication.

A comparison of familiar rings:

| Ring | Commutative | Has $1$ | No zero divisors | Field |
| --- | --- | --- | --- | --- |
| $\mathbb{Z}$ | yes | yes | yes | no |
| $\mathbb{Z}_6$ | yes | yes | no | no |
| $\mathbb{Q}$ | yes | yes | yes | yes |
| $M_2(\mathbb{R})$ | no | yes | no | no |
| $\mathbb{Z}[x]$ | yes | yes | yes | no |

The "no" for $\mathbb{Z}_6$ comes from $2\cdot3\equiv0$: two non-zero elements multiply to zero, and such elements are **zero divisors**.

## Units and zero divisors

Check inverses one by one in $\mathbb{Z}_8$:

| $a$ | Invertible | Inverse | Reason |
| --- | --- | --- | --- |
| 1 | yes | 1 | multiplicative identity |
| 2 | no | — | $2\cdot4=8\equiv0$, a zero divisor |
| 3 | yes | 3 | $3\cdot3=9\equiv1$ |
| 4 | no | — | $4\cdot2\equiv0$, a zero divisor |
| 5 | yes | 5 | $5\cdot5=25\equiv1$ |
| 6 | no | — | $6\cdot4=24\equiv0$ |
| 7 | yes | 7 | $7\cdot7=49\equiv1$ |

The pattern: $[a]_8$ is invertible exactly when $\gcd(a,8)=1$, and every non-invertible non-zero element is a zero divisor. The four units form a group $\mathbb{Z}_8^{*}$ of order $4$.

An **integral domain** is a commutative ring with $1\ne0$ and no zero divisors. $\mathbb{Z}$, $\mathbb{Q}$ and $\mathbb{Z}[x]$ qualify; $\mathbb{Z}_6$ does not. In an integral domain non-zero factors cancel: if $ab=ac$ and $a\ne0$, then $a(b-c)=0$, so $b=c$. That fails in $\mathbb{Z}_6$, where $2\cdot1=2\cdot4$ but $1\ne4$.

## Ideals and quotient rings

A subset $I\subseteq R$ is an **ideal** if $(I,+)$ is a subgroup and $rx\in I$, $xr\in I$ for all $r\in R$, $x\in I$.

The only ideals of $\mathbb{Z}$ are $n\mathbb{Z}$: take a non-zero ideal, let $n$ be its least positive element, and division with remainder shows every element is a multiple of $n$. Thus $2\mathbb{Z}$ is an ideal and $6\mathbb{Z}\subseteq2\mathbb{Z}$, a chain of inclusions.

Ideals exist so that quotients are rings. Since $I$ is an additive subgroup, the quotient group $R/I$ makes sense; since $I$ absorbs multiplication, one can define

$$
(a+I)(b+I)=ab+I
$$

independent of the representatives, and $R/I$ becomes a **quotient ring**. For instance $\mathbb{Z}/6\mathbb{Z}\cong\mathbb{Z}_6$, collapsing infinitely many integers onto six classes.

The kernel $\ker h=\{r\mid h(r)=0_S\}$ of a ring homomorphism $h:R\to S$ is always an ideal, and conversely every ideal is the kernel of its quotient map. This is the same pattern as the fundamental theorem for groups.

## Three common misconceptions

> [!MYTH] Multiplication in a ring is automatically commutative.
> The matrix ring $M_2(\mathbb{R})$ is a ring under addition and multiplication, yet $AB\ne BA$ in general. Commutativity is an extra condition, and only commutative rings can be integral domains.

> [!MYTH] Having no zero divisors is enough to be an integral domain.
> An integral domain must also be commutative, have a multiplicative identity, and satisfy $1\ne0$. Absence of zero divisors is only one clause.

> [!MYTH] Every subring is an ideal.
> $\mathbb{Z}$ is a subring of $\mathbb{Q}$ but not an ideal: with $r=1/2$ and $x=1$, $rx=1/2\notin\mathbb{Z}$. An ideal must absorb multiplication by the whole ring.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> List all units of $\mathbb{Z}_{10}$ and give their inverses.
>
> > [!ANSWER] Show answer
> > The units are the classes coprime to $10$: $1,3,7,9$. Their inverses are $1$, $7$ (since $3\cdot7=21\equiv1$), $3$, and $9$ (since $9\cdot9=81\equiv1$).

> [!PRACTICE] 2 · Variation
> Is $\mathbb{Z}_7$ an integral domain? Is it a field?
>
> > [!ANSWER] Show answer
> > Both. Since $7$ is prime, every non-zero class is coprime to $7$ and invertible; there are no zero divisors, and the ring is commutative with $1$, so it is an integral domain and, because every non-zero element is invertible, a field.

> [!PRACTICE] 3 · Transfer
> Verify that $2\mathbb{Z}$ is an ideal of $\mathbb{Z}$.
>
> > [!ANSWER] Show answer
> > Closed under addition: $2m+2n=2(m+n)$; contains $0$; closed under inverses: $-2m=2(-m)$. Absorption: for $r\in\mathbb{Z}$, $r\cdot2m=2(rm)\in2\mathbb{Z}$. So it is an ideal and $\mathbb{Z}/2\mathbb{Z}\cong\mathbb{Z}_2$.

## Formal statement

A triple $(R,+,\cdot)$ is a ring if $(R,+)$ is an abelian group, $\cdot$ is closed and associative, and both distributive laws hold for all $a,b,c\in R$. It is commutative if $\cdot$ is commutative, and unital if a multiplicative identity $1$ exists.

A unital commutative ring is an integral domain if $1\ne0$ and $ab=0$ implies $a=0$ or $b=0$; non-zero elements then satisfy cancellation. A ring in which every non-zero element is invertible is a field. Every field is an integral domain, but not conversely ($\mathbb{Z}$ is an integral domain and not a field).

A subset $I\subseteq R$ is an ideal if $(I,+)$ is an additive subgroup and $rI\subseteq I$, $Ir\subseteq I$ for every $r\in R$. The multiplication $(a+I)(b+I)=ab+I$ on the quotient group is then well defined and makes $R/I$ a quotient ring. The kernel of a ring homomorphism $h:R\to S$ is an ideal of $R$, and $R/\ker h\cong\operatorname{Im}h$.
