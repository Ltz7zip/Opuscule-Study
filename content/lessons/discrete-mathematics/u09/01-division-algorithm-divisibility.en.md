---
slug: "division-algorithm-divisibility"
subject: "discrete-mathematics"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Divisibility, the Division Algorithm, and Euclid's Algorithm"
subtitle: "The remainder carries the common divisor"
minutes: 15
meta: ["15 min read","Requires integer multiplication and order","Mastery level"]
concepts: ["divisibility", "numalg"]
prereq: ["divisibility"]
related: ["numalg", "complexity"]
---

## What you will get

By the end of this lecture you can verify a divisibility statement from the definition, write the unique quotient-and-remainder expression for any integer pair including negative ones, compute a greatest common divisor by hand with Euclid's algorithm, and expand that divisor as an integer linear combination of the two inputs.

Three things: divisibility is a statement about an integer quotient existing, the division algorithm pins down quotient and remainder together, and Euclid's algorithm shrinks the problem by making the remainder strictly decrease.

## Three lines back

- $a\mid b$ means there is an integer $q$ with $b=aq$; it describes multiplicative structure, not a division operation.
- The division algorithm writes $a=bq+r$ with $0\le r<b$, and $q,r$ are uniquely determined by $a,b$.
- Two integers and their remainder share exactly the same common divisors, so repeated reduction reaches the greatest common divisor.

## The definition and its properties

Let $a,b\in\mathbb{Z}$ with $a\neq0$. We say $a$ divides $b$, written $a\mid b$, if some integer $q$ satisfies $b=aq$; otherwise $a\nmid b$. Then $a$ is a divisor of $b$ and $b$ is a multiple of $a$.

The definition uses only integer multiplication, so it works for negatives and zero. $3\mid12$ because $12=3\cdot4$; $-7\mid21$ because $21=(-7)\cdot(-3)$; and $a\mid0$ for every $a\neq0$ because $0=a\cdot0$. But $0\mid b$ holds only when $b=0$, since $b=0\cdot q$ forces $b=0$.

The standard properties are collected below.

| Property | Statement | Example |
| --- | --- | --- |
| Transitivity | $a\mid b$ and $b\mid c$ imply $a\mid c$ | $4\mid12$, $12\mid36$, so $4\mid36$ |
| Linear combinations | $a\mid b$ and $a\mid c$ imply $a\mid(mb+nc)$ | $6\mid18$, $6\mid30$, so $6\mid(2\cdot18-30)=6$ |
| Reflexivity | $a\mid a$ | $9\mid9$ |
| Scaling | $a\mid b$ implies $ac\mid bc$ | $5\mid20$, so $15\mid60$ |
| Size bound | $a\mid b$ and $b\neq0$ imply $|a|\le|b|$ | a divisor never exceeds its multiple |

The size bound is the starting point of many proofs: a nonzero integer has only finitely many divisors. It also yields that $a\mid b$ together with $b\mid a$ forces $|a|=|b|$.

Linear combinations do the heaviest work. They say the set of divisors is closed under addition, subtraction, and integer scaling, which is exactly why the common-divisor set stays unchanged in the reduction step below: if $d$ divides both $a$ and $b$, then $d$ divides $a-bq$, and conversely.

## The division algorithm

Let $a\in\mathbb{Z}$ and $b\in\mathbb{Z}$ with $b>0$. Then there is a unique pair $(q,r)$ with

$$
a=bq+r,\qquad 0\le r<b
$$

Here $q$ is the quotient and $r$ the remainder. Existence comes from repeatedly subtracting $b$: among $\dots,a-2b,a-b,a,a+b,\dots$ exactly one term lies in $[0,b-1]$. Uniqueness comes from the size bound: if $a=bq_1+r_1=bq_2+r_2$, then $b(q_1-q_2)=r_2-r_1$, whose absolute value is below $b$, so $q_1-q_2=0$.

Negatives are where mistakes happen. Take $a=-47$ and $b=7$. Dividing absolute values and attaching a minus sign gives $q=-6$, $r=-5$, but $-5$ violates $0\le r<7$. Make the quotient small enough instead:

$$
-47=7\cdot(-7)+2,\qquad q=-7,\ r=2
$$

because $7\cdot(-7)=-49$ and $2$ restores the difference. In general $q=\lfloor a/b\rfloor$ and the remainder is never negative.

| $a$ | $b$ | $q$ | $r$ | Check |
| --- | --- | --- | --- | --- |
| $47$ | $7$ | $6$ | $5$ | $7\cdot6+5=47$ |
| $-47$ | $7$ | $-7$ | $2$ | $7\cdot(-7)+2=-47$ |
| $47$ | $-7$ | $-7$ | $-2$ | violates $0\le r<|b|$ |
| $-47$ | $-7$ | $6$ | $-5$ | violates $0\le r<|b|$ |

If a negative divisor is allowed, the usual convention is to replace $b$ by $|b|$ first and adjust afterwards. From here on we always take $b>0$, so the remainder is one of $0,1,\dots,b-1$.

## Greatest common divisors and Euclid's algorithm

For $a,b$ not both zero, the largest element of their common divisors is the greatest common divisor, written $\gcd(a,b)$, with the convention $\gcd(a,0)=|a|$.

The key lemma: if $a=bq+r$, then $a,b$ and $b,r$ have exactly the same common divisors. This is the linear-combination property again. If $d\mid a$ and $d\mid b$, then $d\mid r=a-bq$; if $d\mid b$ and $d\mid r$, then $d\mid a$. The sets coincide, so their maxima do:

$$
\gcd(a,b)=\gcd(b,r)
$$

Repeating the division algorithm makes the remainder strictly decrease while staying nonnegative, so the process reaches $0$ in finitely many steps. The last nonzero remainder is the greatest common divisor. Take $1071$ and $462$:

| Step | Division | Remainder |
| --- | --- | --- |
| 1 | $1071=2\cdot462+147$ | $147$ |
| 2 | $462=3\cdot147+21$ | $21$ |
| 3 | $147=7\cdot21+0$ | $0$ |

Hence $\gcd(1071,462)=21$. Back-substitution rewrites $21$ in terms of the original pair:

$$
21=462-3\cdot147=462-3(1071-2\cdot462)=-3\cdot1071+7\cdot462
$$

This is the Bézout identity: there exist integers $s,t$ with $sa+tb=\gcd(a,b)$. The greatest common divisor is therefore not merely the largest common divisor but the smallest positive integer reachable by integer combinations of $a$ and $b$. That fact will matter when computing modular inverses.

The cost is worth remembering too. Each remainder is below the previous divisor and at least halves it every two steps, so the running time is $O(\log\min(|a|,|b|))$, which stays fast even for integers with hundreds of digits.

> [!NOTE]
> Finding a greatest common divisor does not require factoring. Euclid's algorithm uses only division with remainder, which is precisely why it beats "factor both, then take the smaller exponent" in practice.

## Three common misconceptions

> [!MYTH] Remainders may be negative, so $-47=7\cdot(-6)+(-5)$ is acceptable.
> The division algorithm requires $0\le r<b$. Both the quotient and the remainder in that expression are wrong; the correct pair is $q=-7$, $r=2$. Nonnegativity is part of uniqueness.

> [!MYTH] Zero divides every integer.
> $0\mid b$ requires $b=0\cdot q=0$, so it holds only for $b=0$. The definition of divisibility normally excludes a zero divisor outright.

> [!MYTH] You must factor both numbers before you can find their greatest common divisor.
> Factoring works in theory but is extremely slow for large integers. Euclid's algorithm needs only $O(\log n)$ division steps and is the method actually used.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Use Euclid's algorithm to compute $\gcd(252,105)$ and express it as an integer combination of $252$ and $105$.
>
> > [!ANSWER] Show answer
> > $252=2\cdot105+42$, $105=2\cdot42+21$, $42=2\cdot21+0$, so $\gcd=21$. Back-substituting: $21=105-2\cdot42=105-2(252-2\cdot105)=5\cdot105-2\cdot252$.

> [!PRACTICE] 2 · Variation
> Write the division algorithm for $a=-100$, $b=13$ and check that the remainder lies in $[0,13)$.
>
> > [!ANSWER] Show answer
> > $q=\lfloor-100/13\rfloor=\lfloor-7.69\rfloor=-8$, so $-100=13\cdot(-8)+4$ with $r=4$, and $0\le4<13$.

> [!PRACTICE] 3 · Transfer
> Suppose $d\mid a$ and $d\mid b$. Prove $d\mid(3a-5b)$ and explain the role of this fact in Euclid's algorithm.
>
> > [!ANSWER] Show answer
> > Write $a=dm$, $b=dn$. Then $3a-5b=d(3m-5n)$, so $d$ divides it. The role is to convert "divides both $a$ and $b$" into "divides both $b$ and $r$", keeping the common-divisor set unchanged at every step.

## Formal statement

Let $a,b\in\mathbb{Z}$ with $a\neq0$. Then $a\mid b$ holds if and only if $\exists q\in\mathbb{Z}$ such that $b=aq$. On $\mathbb{Z}\setminus\{0\}$ divisibility is reflexive and transitive, and closed under integer linear combinations: $a\mid b$ and $a\mid c$ imply $a\mid(mb+nc)$ for all $m,n\in\mathbb{Z}$.

Division algorithm: for $a\in\mathbb{Z}$ and $b\in\mathbb{Z}_{>0}$ there is a unique pair $(q,r)\in\mathbb{Z}\times\mathbb{Z}$ with $a=bq+r$ and $0\le r<b$; necessarily $q=\lfloor a/b\rfloor$.

For $a,b$ not both zero, $\gcd(a,b)$ is the maximum of the common divisors and satisfies $\gcd(a,b)=\gcd(b,a\bmod b)$. Euclid's algorithm iterates this identity until the remainder is $0$; the last nonzero remainder is $\gcd(a,b)$. The Bézout identity asserts that integers $s,t$ exist with $sa+tb=\gcd(a,b)$, constructed by back-substitution. The algorithm runs in $O(\log\min(|a|,|b|))$ division steps.