---
slug: "vecspace-def"
subject: "la"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Linear Algebra · Mastery"
title: "Definition and properties of linear spaces"
subtitle: "Eight axioms, one world"
minutes: 15
meta: ["15 min read","Requires an introduction to vector spaces","Mastery level"]
concepts: ["vecspace", "linmap"]
prereq: ["vecspace"]
related: ["basis", "lindep"]
---

## Goal

The final lecture of the previous chapter introduced sets closed under addition and scaling. This lecture states the full contract: eight axioms that qualify a set as a linear space, and the properties those axioms deliver for free.

By the end you can check a set against every axiom, give the three standard families of examples — polynomials, matrices, functions — and prove from the axioms that the zero element is unique, inverses are unique, and $0v = 0$.

## Three-line recap

- A linear space is a set equipped with addition and scalar multiplication, closed under both.
- Closure is only the entrance requirement; the eight axioms are the full definition.
- A subspace is a nonempty subset that is self-sufficient under the same operations.

## The problem

In $\mathbb{R}^n$, the law $u + v = v + u$ looks so obvious that writing it down feels silly. But replace numbers with matrices, polynomials, or functions and “addition” is no longer componentwise. Does commutativity still hold? Is there still a zero element?

Without an explicit list, every new kind of object forces us to reprove every theorem. The point of the axiomatic approach is to separate what depends on the specific construction of $\mathbb{R}^n$ from what depends only on the rules of operation. Once separated, any theorem proved from the rules alone holds in every linear space.

## Intuition

Here are the axioms. Let $V$ be a nonempty set with an addition between elements and a scalar multiplication by real numbers. For all $u, v, w \in V$ and $k, l \in \mathbb{R}$:

| Group | Axiom |
| --- | --- |
| Addition | $u + v = v + u$ |
| Addition | $(u + v) + w = u + (v + w)$ |
| Addition | there is $0$ with $u + 0 = u$ |
| Addition | there is $-u$ with $u + (-u) = 0$ |
| Scaling | $k(lu) = (kl)u$ |
| Scaling | $1u = u$ |
| Distributive | $k(u + v) = ku + kv$ |
| Distributive | $(k + l)u = ku + lu$ |

The first four say addition behaves like an abelian group with inverses. The last four say scaling cooperates with addition. Together they support the entire machinery of combinations, dependence, bases, and dimension.

Three standard examples deserve memorising. The polynomial space $P_n$ consists of polynomials of degree at most $n$; its zero is the zero polynomial, its negatives are coefficientwise, its dimension is $n + 1$, and $1, x, \dots, x^n$ is a basis. The matrix space $M_{m \times n}$ has dimension $mn$. The function space $C[a,b]$ consists of continuous functions, added pointwise and scaled pointwise. The objects look entirely different, yet every axiom holds.

Several familiar properties follow from the axioms, each with a short proof:

- The zero element is unique: if $0$ and $0'$ are both zero, then $0 = 0 + 0' = 0'$.
- Inverses are unique: if $u + v = 0$ and $u + w = 0$, then $v = v + 0 = v + (u + w) = (v + u) + w = w$.
- $0u = 0$ and $k0 = 0$.
- $(-1)u = -u$.
- If $ku = 0$, then $k = 0$ or $u = 0$.

> [!NOTE]
> To test a set, check closure first, then the eight axioms. In practice, closure and the existence of zero are where candidates fail.

## Worked by hand

Take $P_2$, the polynomials of degree at most $2$:

$$
P_2 = \{a_0 + a_1 x + a_2 x^2 : a_i \in \mathbb{R}\}
$$

Check closure. Let $p = 2 + x - 3x^2$ and $q = 1 - 2x + x^2$. Then

$$
p + q = (2 + 1) + (1 - 2)x + (-3 + 1)x^2 = 3 - x - 2x^2
$$

still of degree at most $2$. With $k = 4$,

$$
4p = 8 + 4x - 12x^2
$$

also in $P_2$. In general, if $p = \sum a_i x^i$ and $q = \sum b_i x^i$, then $p + q = \sum (a_i + b_i)x^i$ and $kp = \sum (ka_i)x^i$; no degree can rise, so closure holds.

Check the key axioms. The zero polynomial $0$ satisfies $p + 0 = p$. The inverse is $-p = -2 - x + 3x^2$, and $p + (-p) = 0$. The unit law gives $1 \cdot p = p$. Distributivity gives $k(p + q) = kp + kq$, matching coefficient by coefficient. The rest follow the same way.

Finally, dimension. Every element of $P_2$ can be written

$$
a_0 \cdot 1 + a_1 \cdot x + a_2 \cdot x^2
$$

and $1, x, x^2$ are independent: if $a_0 + a_1 x + a_2 x^2$ is identically zero, all three coefficients vanish. Hence $\{1, x, x^2\}$ is a basis and $\dim P_2 = 3$. In general $P_n$ has basis $1, x, \dots, x^n$, so $\dim P_n = n + 1$.

## Three misconceptions

> [!MYTH] Vectors must be arrows in space.
> A vector is any element of a linear space. Polynomials, matrices, and continuous functions all qualify once the operations satisfy the axioms.

> [!MYTH] Every linear space is finite-dimensional.
> Finite dimension is the common case, not the definition. $C[a,b]$ has no finite basis yet is a perfectly good linear space, of infinite dimension.

> [!MYTH] Closure under addition alone makes a linear space.
> Scaling and all eight axioms are also required. The positive reals are closed under addition but have no zero and no negatives.

## Practice

> [!PRACTICE] 1 · Check zero
> Is $V = \{(x,y) : x > 0, y > 0\}$ a linear space under componentwise operations?
>
> > [!ANSWER] Answer
> > No. The zero vector $(0,0)$ is missing, and $k = -1$ sends $(x,y)$ to $(-x,-y)$, outside $V$, so scaling fails.

> [!PRACTICE] 2 · Matrix space
> What is the dimension of $M_{2 \times 2}$? Give a basis.
>
> > [!ANSWER] Answer
> > Dimension $4$, with basis $E_{11}, E_{12}, E_{21}, E_{22}$, each having a single $1$ and zeros elsewhere.

> [!PRACTICE] 3 · Prove from axioms
> Use the axioms to prove $k0 = 0$.
>
> > [!ANSWER] Answer
> > $k0 = k(0 + 0) = k0 + k0$. Add $-(k0)$ to both sides to get $0 = k0$.

## Formal statement

> [!FORMAL] Formal statement
> Let $V$ be a nonempty set with addition $V \times V \to V$ and scalar multiplication $\mathbb{F} \times V \to V$ over a field $\mathbb{F}$. If for all $u, v, w \in V$ and $k, l \in \mathbb{F}$ the axioms of additive commutativity, associativity, zero, and inverses, together with multiplicative associativity, the unit law, and the two distributive laws, all hold, then $V$ is a linear space over $\mathbb{F}$. The axioms imply uniqueness of zero and inverses, $0u = 0$, $k0 = 0$, $(-1)u = -u$, and that $ku = 0$ forces $k = 0$ or $u = 0$.
