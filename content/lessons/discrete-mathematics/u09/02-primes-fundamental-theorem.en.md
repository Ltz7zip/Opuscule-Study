---
slug: "primes-fundamental-theorem"
subject: "discrete-mathematics"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Primes, the Fundamental Theorem of Arithmetic, and Divisor Functions"
subtitle: "Every integer carries a unique fingerprint"
minutes: 15
meta: ["15 min read","Requires divisibility and division with remainder","Mastery level"]
concepts: ["divisibility", "numalg"]
prereq: ["divisibility"]
related: ["numalg", "complexity"]
---

## What you will get

By the end of this lecture you can decide primality by trial division in about $\sqrt n$ steps, write any integer as a product of prime powers and explain why the writing is unique, and read off the greatest common divisor, least common multiple, divisor count, and divisor sum directly from that factorization.

Three things: primes are the atoms of multiplication, the fundamental theorem guarantees unique factorization, and gcd and lcm are just the minimum and maximum of exponents.

## Three lines back

- A prime $p>1$ has only the positive divisors $1$ and $p$; an integer above $1$ that is not prime is composite.
- Every integer above $1$ is a product of prime powers, uniquely up to order.
- Taking the smaller exponent in each prime gives the gcd, the larger gives the lcm.

## Primes and trial division

Let $n>1$. If its only positive divisors are $1$ and $n$, then $n$ is prime; otherwise it is composite. The number $1$ is neither, because it does not have two distinct positive divisors.

The test rests on one observation: if $n$ is composite, then $n=ab$ with $1<a\le b<n$, hence $a\le\sqrt n$. So it suffices to try the primes up to $\sqrt n$; if none divides $n$, then $n$ is prime.

Example: test $101$. Since $\sqrt{101}\approx10.05$, only $2,3,5,7$ need checking. The number is odd, its digit sum $2$ is not divisible by $3$, it does not end in $0$ or $5$, and $101=7\cdot14+3$, so $101$ is prime. Now $91$: here $\sqrt{91}\approx9.54$, and trying up to $7$ gives $91=7\cdot13$, so $91$ is composite.

| $n$ | $\lfloor\sqrt n\rfloor$ | Primes to test | Conclusion |
| --- | --- | --- | --- |
| $97$ | $9$ | $2,3,5,7$ | prime |
| $91$ | $9$ | $2,3,5,7$ | $7\cdot13$ |
| $101$ | $10$ | $2,3,5,7$ | prime |
| $143$ | $11$ | $2,3,5,7,11$ | $11\cdot13$ |

There are infinitely many primes. If only $p_1,\dots,p_k$ existed, take $N=p_1p_2\cdots p_k+1$. Every $p_i$ leaves remainder $1$ when dividing $N$, so the prime factors of $N$ lie outside the list, a contradiction. The argument uses only division with remainder and produces no table of primes.

The sieve of Eratosthenes batches the work: start at $2$ and cross out multiples of each prime in turn, leaving the primes. Its cost is about $O(n\log\log n)$, which suits table building better than testing each number separately.

## The fundamental theorem of arithmetic

The fundamental theorem states that every integer $n>1$ can be written uniquely as

$$
n=p_1^{a_1}p_2^{a_2}\cdots p_k^{a_k}
$$

with $p_1<\dots<p_k$ prime and $a_i\ge1$. Existence follows by strong induction: if $n$ is prime we are done; if $n=ab$ is composite, both factors are smaller, so induction applies to each and the results combine. Uniqueness relies on a lemma: if a prime $p\mid ab$, then $p\mid a$ or $p\mid b$. Without that lemma two factorizations could be spliced into a contradiction-free alternative.

Example: $3600=36\cdot100=2^4\cdot3^2\cdot5^2$, while $5040=7!=2^4\cdot3^2\cdot5\cdot7$. Factorization lays the multiplicative structure bare, and every later question becomes exponent arithmetic.

If $a=\prod p_i^{\alpha_i}$ and $b=\prod p_i^{\beta_i}$, where missing primes get exponent $0$, then

$$
\gcd(a,b)=\prod p_i^{\min(\alpha_i,\beta_i)},\qquad
\operatorname{lcm}(a,b)=\prod p_i^{\max(\alpha_i,\beta_i)}
$$

For $3600$ and $5040$: $\gcd=2^4\cdot3^2\cdot5=720$ and $\operatorname{lcm}=2^4\cdot3^2\cdot5\cdot7=25200$. Their product is $3600\times5040=18144000$, confirming $\gcd\cdot\operatorname{lcm}=ab$.

| Number | Factorization | gcd with $5040$ | lcm with $5040$ |
| --- | --- | --- | --- |
| $3600$ | $2^4\cdot3^2\cdot5^2$ | $720$ | $25200$ |
| $600$ | $2^3\cdot3\cdot5^2$ | $120$ | $25200$ |
| $756$ | $2^2\cdot3^3\cdot7$ | $252$ | $15120$ |

## Divisor counts and divisor sums

Divisors are governed by exponent vectors: each divisor of $n=\prod p_i^{a_i}$ has the form $\prod p_i^{e_i}$ with $0\le e_i\le a_i$. Each exponent offers $a_i+1$ choices, and distinct choices give distinct divisors, so

$$
\tau(n)=\prod_{i=1}^{k}(a_i+1)
$$

Likewise the sum of divisors is the product of geometric sums, one per prime power:

$$
\sigma(n)=\prod_{i=1}^{k}\left(1+p_i+p_i^2+\cdots+p_i^{a_i}\right)
=\prod_{i=1}^{k}\frac{p_i^{a_i+1}-1}{p_i-1}
$$

Example: $3600=2^4\cdot3^2\cdot5^2$ gives $\tau=(4+1)(2+1)(2+1)=45$ and $\sigma=(1+2+4+8+16)(1+3+9)(1+5+25)=31\cdot13\cdot31=12493$. Neither value came from listing divisors one by one.

| $n$ | Factorization | $\tau(n)$ | $\sigma(n)$ |
| --- | --- | --- | --- |
| $12$ | $2^2\cdot3$ | $3\cdot2=6$ | $7\cdot4=28$ |
| $28$ | $2^2\cdot7$ | $3\cdot2=6$ | $7\cdot8=56$ |
| $36$ | $2^2\cdot3^2$ | $3\cdot3=9$ | $7\cdot13=91$ |

A number with $\sigma(n)=2n$ is called perfect. Indeed $\sigma(28)=56=2\cdot28$, matching $1+2+4+7+14=28$ for the proper divisors. Such numbers are rare, and even perfect numbers correspond one-to-one with Mersenne primes. Both $\tau$ and $\sigma$ are multiplicative: if $\gcd(m,n)=1$, then $\tau(mn)=\tau(m)\tau(n)$ and $\sigma(mn)=\sigma(m)\sigma(n)$; without coprimality the identities generally fail.

> [!NOTE]
> The factorization is the structure; $\tau$ and $\sigma$ are two readings of it. Once the exponent view is in place the formulas need not be memorized, since each one follows from counting exponent choices.

## Three common misconceptions

> [!MYTH] $1$ is prime because only $1$ and itself divide it.
> Primality requires $n>1$. Counting $1$ as prime would destroy uniqueness in the fundamental theorem, since $6=2\cdot3=1\cdot2\cdot3$.

> [!MYTH] Testing primality means trying every integer below $n$.
> Trying up to $\sqrt n$ suffices. If $n=ab$ with $a\le b$, then $a\le\sqrt n$, so any larger factor appears together with a small one.

> [!MYTH] The least common multiple is the product of the factorizations, that is, all exponents added.
> Adding exponents gives the product $ab$. The lcm takes the larger exponent and the gcd the smaller, and only their product equals $ab$.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Decide whether $143$ is prime.
>
> > [!ANSWER] Show answer
> > $\sqrt{143}\approx11.96$. None of $2,3,5,7$ divides it, but $11$ does: $143=11\cdot13$, so $143$ is composite.

> [!PRACTICE] 2 · Variation
> Given $1800=2^3\cdot3^2\cdot5^2$, compute $\tau(1800)$ and $\sigma(1800)$.
>
> > [!ANSWER] Show answer
> > $\tau=(3+1)(2+1)(2+1)=36$ and $\sigma=(1+2+4+8)(1+3+9)(1+5+25)=15\cdot13\cdot31=6045$.

> [!PRACTICE] 3 · Transfer
> Find the gcd and lcm of $84$ and $126$, then check that their product equals the product of the two numbers.
>
> > [!ANSWER] Show answer
> > $84=2^2\cdot3\cdot7$ and $126=2\cdot3^2\cdot7$, so $\gcd=2\cdot3\cdot7=42$ and $\operatorname{lcm}=2^2\cdot3^2\cdot7=252$. Indeed $42\times252=10584=84\times126$.

## Formal statement

Let $n>1$. If the only positive divisors of $n$ are $1$ and $n$, then $n$ is prime; otherwise $n$ is composite. If $n$ is composite, some prime $p\le\sqrt n$ divides $n$, so trial division up to $\sqrt n$ decides primality.

Fundamental theorem of arithmetic: every $n>1$ has a unique representation $n=\prod_{i=1}^{k}p_i^{a_i}$ with $p_1<\cdots<p_k$ prime and $a_i\in\mathbb{Z}_{>0}$. Uniqueness depends on Euclid's lemma: if $p$ is prime and $p\mid ab$, then $p\mid a$ or $p\mid b$.

For $a=\prod p_i^{\alpha_i}$ and $b=\prod p_i^{\beta_i}$, $\gcd(a,b)=\prod p_i^{\min(\alpha_i,\beta_i)}$ and $\operatorname{lcm}(a,b)=\prod p_i^{\max(\alpha_i,\beta_i)}$, hence $\gcd(a,b)\operatorname{lcm}(a,b)=ab$.

The divisor functions satisfy $\tau(n)=\prod(a_i+1)$ and $\sigma(n)=\prod_i(p_i^{a_i+1}-1)/(p_i-1)$, and both are multiplicative when $\gcd(m,n)=1$.