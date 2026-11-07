---
slug: "homomorphism-quotient"
subject: "discrete-mathematics"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Homomorphisms, Isomorphisms, and Quotient Algebras"
subtitle: "When two systems count as the same"
minutes: 16
meta: ["16 min read","Requires binary operations and maps","Mastery level"]
concepts: ["algebra-struct", "map"]
prereq: ["algebra-struct", "map"]
related: ["group", "ringfield"]
---

## What you will get

By the end of this lecture you can test whether a map is a homomorphism, separate homomorphism, monomorphism, epimorphism and isomorphism, find the kernel of a homomorphism and write down the quotient algebra it defines, and use the fundamental theorem to split any homomorphism into a surjection followed by an isomorphism.

Testing a homomorphism takes one equation; testing an isomorphism adds two more conditions, injective and surjective.

## Three lines back

- An algebraic system is a set with operations, and the axioms on those operations fix the type of system.
- A map may preserve structure or destroy it; a homomorphism is exactly a map where "compute then map" equals "map then compute".
- If a bijective homomorphism exists between two systems, they cannot be told apart algebraically — only the names of the elements differ.

## Homomorphism: preserve the operation first

Let $(A,*)$ and $(B,\circ)$ be algebraic systems of the same type. A map $h:A\to B$ is a **homomorphism** if, for all $a,b\in A$,

$$
h(a*b)=h(a)\circ h(b)
$$

The equation asks the two sides to agree operation by operation. Some examples:

| Map | From | To | Preserves | Type |
| --- | --- | --- | --- | --- |
| $h(k)=k\bmod 5$ | $(\mathbb{Z},+)$ | $(\mathbb{Z}_5,+)$ | addition | surjective, not injective |
| $h(x)=e^{x}$ | $(\mathbb{R},+)$ | $(\mathbb{R}_{>0},\times)$ | $+$ becomes $\times$ | isomorphism |
| $\det$ | $(GL_2(\mathbb{R}),\cdot)$ | $(\mathbb{R}^{*},\times)$ | multiplication | surjective, not injective |
| $h(x)=x+1$ | $(\mathbb{Z},+)$ | $(\mathbb{Z},+)$ | addition | not a homomorphism |

The last row is worth computing: $h(a+b)=a+b+1$ while $h(a)+h(b)=a+b+2$, always off by one. Translation is not a homomorphism because it does not preserve the identity.

The first row checks directly: with $a=3$, $b=4$, $h(3+4)=h(7)=2$ and $h(3)+h(4)=3+4=7\equiv2\pmod5$.

A homomorphism must send the identity to the identity and inverses to inverses. This is not an extra axiom but a consequence: $h(e)=h(e*e)=h(e)\circ h(e)$, and cancelling $h(e)$ gives the claim.

## Isomorphism: same structure, new names

A bijective homomorphism is an **isomorphism**, written $A\cong B$. Bijectivity matches every element, and the homomorphism property matches the operations, so the two systems are algebraically indistinguishable: any equation true in $A$ stays true in $B$.

The map $h(x)=e^x$ is an isomorphism between $(\mathbb{R},+)$ and $(\mathbb{R}_{>0},\times)$ because

$$
e^{x+y}=e^{x}\cdot e^{y}
$$

and the exponential is a bijection whose inverse is the logarithm. An additive system and a multiplicative one look unrelated, yet as algebraic systems they are the same.

Finite examples are easier to see. $\mathbb{Z}_6$ and $\mathbb{Z}_2\times\mathbb{Z}_3$ are isomorphic via $h(k)=(k\bmod2,\ k\bmod3)$: $h(4)=(0,1)$, $h(5)=(1,2)$, and $h(4+5)=h(9)=(1,0)$, matching $(0,1)+(1,2)=(1,3)\equiv(1,0)$. This is the Chinese Remainder Theorem in algebraic dress.

Conversely, $x\mapsto x^3$ is a bijection of $\mathbb{R}$ onto itself but not a homomorphism of $(\mathbb{R},+)$, since $(a+b)^3\ne a^3+b^3$. Bijection alone is not isomorphism.

## Kernels, quotient algebras, and the fundamental theorem

The **kernel** of $h:(A,*)\to(B,\circ)$ collects what is sent to the identity:

$$
\ker h=\{a\in A\mid h(a)=e_B\}
$$

For $(\mathbb{Z},+)\to(\mathbb{Z}_5,+)$ the kernel is $5\mathbb{Z}=\{0,\pm5,\pm10,\dots\}$. For the determinant it is the set of matrices with determinant $1$, namely $SL_2(\mathbb{R})$.

The kernel is more than a subset: it induces the equivalence $a\sim b\iff h(a)=h(b)$, which in the group case says $a*b^{-1}\in\ker h$. This relation is compatible with the operation, so the quotient set $A/{\sim}$ can carry

$$
[a]*[b]=[a*b]
$$

and the result is the **quotient algebra** $A/\ker h$. The example above gives $\mathbb{Z}/5\mathbb{Z}\cong\mathbb{Z}_5$.

The fundamental theorem packages all of this: for every homomorphism $h:A\to B$,

$$
A/\ker h\ \cong\ \operatorname{Im}h
$$

Every homomorphism factors as "take the quotient, then embed". For a surjective homomorphism $\operatorname{Im}h=B$ and the quotient is isomorphic to the target; for an injective one the kernel is trivial and the quotient is $A$ itself.

## Three common misconceptions

> [!MYTH] A homomorphism has to be bijective.
> It only has to preserve the operation. $k\mapsto k\bmod5$ crushes infinitely many integers onto five classes — far from bijective, yet a textbook surjective homomorphism.

> [!MYTH] Equal cardinality of the underlying sets makes two systems isomorphic.
> Isomorphism also preserves operations. $x\mapsto x^3$ is a bijection of $\mathbb{R}$, but $(a+b)^3\ne a^3+b^3$, so it is not an automorphism of $(\mathbb{R},+)$.

> [!MYTH] The kernel is just an ordinary subset.
> It is closed under the operation and defines a compatible equivalence relation, which is what makes the quotient algebra possible. In groups it is a normal subgroup and determines the quotient group outright.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Verify that $h(k)=k\bmod6$ is a homomorphism from $(\mathbb{Z},+)$ to $(\mathbb{Z}_6,+)$, and state its kernel.
>
> > [!ANSWER] Show answer
> > $h(a+b)=(a+b)\bmod6=(a\bmod6)+(b\bmod6)\bmod6=h(a)+h(b)$. The kernel is the set of multiples of $6$, namely $6\mathbb{Z}$, and $\mathbb{Z}/6\mathbb{Z}\cong\mathbb{Z}_6$.

> [!PRACTICE] 2 · Variation
> Is $f(x)=2x$ an automorphism of $(\mathbb{R},+)$?
>
> > [!ANSWER] Show answer
> > Yes. $f(a+b)=2(a+b)=2a+2b=f(a)+f(b)$, and $f$ is a bijection with inverse $x\mapsto x/2$.

> [!PRACTICE] 3 · Transfer
> Is $g(x)=x^2$ a homomorphism of $(\mathbb{R},+)$ into itself?
>
> > [!ANSWER] Show answer
> > No. $g(1+1)=4$ while $g(1)+g(1)=2$. It is also non-injective, since $g(1)=g(-1)$, and it does not preserve the identity.

## Formal statement

Let $(A,*)$ and $(B,\circ)$ be algebraic systems of the same type. A map $h:A\to B$ is a homomorphism if $h(a*b)=h(a)\circ h(b)$ for all $a,b\in A$; it is a monomorphism, epimorphism, or isomorphism according to injectivity, surjectivity, or bijectivity. The inverse of an isomorphism is again a homomorphism.

The kernel $\ker h=\{a\in A\mid h(a)=e_B\}$ defines the relation $a\sim b\iff h(a)=h(b)$, which is compatible with $*$: from $a\sim a'$ and $b\sim b'$ follows $a*b\sim a'*b'$. Defining $[a]*[b]=[a*b]$ on the quotient set yields the quotient algebra $A/\ker h$. The fundamental homomorphism theorem states

$$
A/\ker h\cong\operatorname{Im}h,\qquad [a]\mapsto h(a).
$$

In groups, $\ker h$ is a normal subgroup and $A/\ker h$ is the quotient group; in rings it is an ideal and the quotient is a quotient ring.
