---
slug: "field-finite-field"
subject: "discrete-mathematics"
unit: "u14"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Fields, Finite Fields, and Polynomial Rings"
subtitle: "When every non-zero element can divide"
minutes: 17
meta: ["17 min read","Requires rings and ideals","Mastery level"]
concepts: ["ringfield", "numalg"]
prereq: ["ringfield"]
related: ["group", "sec"]
---

## What you will get

By the end of this lecture you can decide whether a ring is a field, invert elements in $\mathbb{F}_p$, build the fields with $4$ and $9$ elements from irreducible polynomials and multiply in them, and divide polynomials with remainder.

The gap between an integral domain and a field is one sentence: whether every non-zero element is invertible. That sentence decides whether division is available.

## Three lines back

- An integral domain is a commutative ring with $1$ and no zero divisors; a field is an integral domain in which every non-zero element is invertible.
- In $\mathbb{Z}_p$ the non-zero classes are invertible exactly when $p$ is prime, so $\mathbb{Z}_p$ is a field while $\mathbb{Z}_6$ is not.
- The polynomial ring $F[x]$ has division with remainder, so remainder and irreducibility can be discussed much as for the integers.

## Fields: division completed

A commutative ring $F$ is a **field** if $1\ne0$ and every non-zero $a$ has an inverse $a^{-1}$ with $aa^{-1}=1$. Equivalently, the non-zero elements form an abelian group under multiplication.

In $\mathbb{F}_5=\{0,1,2,3,4\}$ the inverses can simply be listed:

| $a$ | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| $a^{-1}$ | 1 | 3 | 2 | 4 |
| Check | $1\cdot1=1$ | $2\cdot3=6\equiv1$ | $3\cdot2\equiv1$ | $4\cdot4=16\equiv1$ |

Every non-zero element is invertible, so $\mathbb{F}_5$ is a field. $\mathbb{Z}_6$ is not: $2$ and $3$ are zero divisors and $2x\equiv1\pmod6$ has no solution.

In a field cancellation is immediate: from $ab=ac$ with $a\ne0$, multiply by $a^{-1}$ to get $b=c$. An integral domain reaches the same conclusion from the absence of zero divisors, but a field has the inverse in hand. $\mathbb{Z}$ is an integral domain that is not a field, since $1/2\notin\mathbb{Z}$.

## Finite fields: the size must be a prime power

A finite field is also called a Galois field and written $\mathbb{F}_q$ for $q$ elements. A basic fact: **the number of elements is always $p^n$**, where $p$ is the characteristic (the least positive $p$ with $p\cdot1=0$, necessarily prime) and $n\ge1$. Conversely, for every prime power $p^n$ there is a field with $p^n$ elements, unique up to isomorphism.

The field with $p$ elements is $\mathbb{F}_p=\mathbb{Z}_p$. A field with $4$ elements cannot be $\mathbb{Z}_4$ (it has the zero divisor $2$); another construction is needed. Take the irreducible $f(x)=x^2+x+1\in\mathbb{F}_2[x]$ and form

$$
\mathbb{F}_4=\mathbb{F}_2[x]/(x^2+x+1)=\{0,\ 1,\ \alpha,\ \alpha+1\},\qquad \alpha^2=\alpha+1
$$

Addition is coefficient-wise modulo $2$; in multiplication, $\alpha^2$ is repeatedly replaced by $\alpha+1$:

| $\cdot$ | $0$ | $1$ | $\alpha$ | $\alpha+1$ |
| --- | --- | --- | --- | --- |
| $0$ | 0 | 0 | 0 | 0 |
| $1$ | 0 | 1 | $\alpha$ | $\alpha+1$ |
| $\alpha$ | 0 | $\alpha$ | $\alpha+1$ | 1 |
| $\alpha+1$ | 0 | $\alpha+1$ | 1 | $\alpha$ |

Two entries to check: $\alpha\cdot\alpha=\alpha^2=\alpha+1$, and $\alpha\cdot(\alpha+1)=\alpha^2+\alpha=(\alpha+1)+\alpha=1$, so $\alpha$ and $\alpha+1$ are inverses. All four non-zero elements are invertible, and $\mathbb{F}_4$ is a field.

## Polynomial rings and irreducibility

$F[x]$ is the set of polynomials with coefficients in a field $F$, a commutative ring under the usual operations. Its key property is **division with remainder**: for $f,g\in F[x]$ with $g\ne0$ there are unique $q,r$ such that

$$
f=qg+r,\qquad \deg r<\deg g
$$

Divide $f=x^3+2x+1$ by $g=x+1$ over $\mathbb{Q}$: the leading term gives $x^2$, subtracting leaves $-x^2+2x+1$; next $-x$, leaving $3x+1$; next $3$, leaving $-2$. Hence

$$
x^3+2x+1=(x+1)(x^2-x+3)-2
$$

The quotient is $x^2-x+3$ and the remainder is the constant $-2$. When the remainder is $0$, $g$ divides $f$.

A polynomial of degree $2$ or $3$ over a field is irreducible exactly when it has no root: a factorisation would contain a linear factor, and a linear factor corresponds to a root. Now $x^2+x+1$ over $\mathbb{F}_2$ takes the values $f(0)=1$ and $f(1)=1+1+1=1$, both non-zero, so it is irreducible — which is why the construction of $\mathbb{F}_4$ works. In general $F[x]/(f)$ is a field exactly when $f$ is irreducible over $F$.

The same test over $\mathbb{F}_3$: $x^2+1$ takes the values $1,2,2$ at $0,1,2$, so it has no root and is irreducible; $\mathbb{F}_3[x]/(x^2+1)$ is a field with $9$ elements.

## Three common misconceptions

> [!MYTH] "Field" is just another word for integral domain.
> An integral domain need not have inverses for its non-zero elements. $\mathbb{Z}$ is an integral domain but not a field, since $2$ has no multiplicative inverse in $\mathbb{Z}$.

> [!MYTH] Any positive integer can be the size of a finite field.
> Only prime powers occur. No field has $6$ elements: its characteristic would be $2$ or $3$, and the size would have to be a power of that prime.

> [!MYTH] Polynomial division only works with real coefficients.
> Division with remainder needs only that the leading coefficient of the divisor be invertible, so it holds over every field. Over a general ring the quotient and remainder may fail to exist or be unique.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find the inverse of $3$ in $\mathbb{F}_7$.
>
> > [!ANSWER] Show answer
> > $3\cdot5=15\equiv1\pmod7$, so the inverse is $5$. The extended algorithm agrees: $1=7-2\cdot3$, hence $3^{-1}\equiv-2\equiv5$.

> [!PRACTICE] 2 · Variation
> In $\mathbb{F}_4$ compute $(\alpha+1)^2$ and $\alpha^3$.
>
> > [!ANSWER] Show answer
> > $(\alpha+1)^2=\alpha^2+1=(\alpha+1)+1=\alpha$, since the characteristic is $2$ and $1+1=0$. Also $\alpha^3=\alpha\cdot\alpha^2=\alpha(\alpha+1)=1$, so $\alpha$ has order $3$.

> [!PRACTICE] 3 · Transfer
> Is $x^2+1$ reducible over $\mathbb{F}_3[x]$?
>
> > [!ANSWER] Show answer
> > No. Substituting the three elements gives $1$, $2$, and $5\equiv2$, all non-zero; there is no linear factor, so the quadratic is irreducible.

## Formal statement

A commutative ring $F$ is a field if $1\ne0$ and every non-zero element is invertible under multiplication; equivalently $F\setminus\{0\}$ is an abelian group under multiplication. The ring $\mathbb{Z}_n$ is a field exactly when $n$ is prime.

Let $F$ be a field. Then $F[x]$ admits division with remainder: for $f,g\in F[x]$ with $g\ne0$ there are unique $q,r$ with $f=qg+r$ and $\deg r<\deg g$. Every ideal of $F[x]$ is generated by a single polynomial. If $f$ is irreducible — not a product of two positive-degree polynomials — then $F[x]/(f)$ is a field; for $\deg f\in\{2,3\}$, irreducibility is equivalent to having no root in $F$.

A finite field has $p^n$ elements for some prime characteristic $p$ and some $n\ge1$, and for each prime power $p^n$ there is exactly one field with $p^n$ elements up to isomorphism. In particular $\mathbb{F}_{p^n}$ can be built as $\mathbb{F}_p[x]/(f)$ with $f$ irreducible of degree $n$ over $\mathbb{F}_p$.
