---
slug: "countable-sets"
subject: "analysis"
unit: "u01"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Countable Sets"
subtitle: "Some infinities are larger than others"
minutes: 16
meta: ["16 min read","Needs maps and composition","Mastery level"]
concepts: ["countable", "map"]
prereq: ["map"]
related: ["set", "map"]
---

## What you will get

Two lectures built the tools: sets and maps. This one uses them for something counter-intuitive — comparing the sizes of two infinite sets.

By the end you can prove that the naturals, the integers, and the rationals are all countable, restate the diagonal argument showing the reals are not, and say plainly what "countable" is claiming.

## Three lines back

- Two sets have the same size when a bijection exists between them; the criterion works for infinite sets too.
- A set is countable when it can be put in bijection with the naturals; integers and rationals are countable.
- The reals are not countable: any attempted list can be diagonalised into a number it misses.

## Comparing two infinities

Finite sets are compared by counting; infinite sets cannot be counted out. Cantor replaced counting with matching: look for a correspondence instead.

Sets $A$ and $B$ are equinumerous, written $|A| = |B|$, if a bijection $f: A \to B$ exists. For finite sets this agrees with everything familiar, but for infinite sets it produces a string of strange answers.

$A$ is **countable** if it is finite, or if there is a bijection $f: \mathbb{N} \to A$. Equivalently, the elements can be listed as a sequence $a_1, a_2, a_3, \dots$ with no repeats and no omissions.

Read "listed as a sequence" carefully. It does not mean the list ends; it means every element appears at some finite position.

## Naturals to evens: apparently half

The even numbers $2\mathbb{N} = \{0, 2, 4, 6, \dots\}$ sit inside the naturals, so intuition says there should be fewer of them. Yet

$$
f(n) = 2n
$$

is a bijection $\mathbb{N} \to 2\mathbb{N}$. By definition the two sets are equinumerous.

This is not a paradox; it is a warning that "a proper subset is smaller" does not transfer to infinite sets. In fact some texts *define* an infinite set as one that is equinumerous with a proper subset of itself.

## Integers and rationals are countable

The integers can be ordered $0, 1, -1, 2, -2, \dots$, and a piecewise formula turns that into a bijection. So $\mathbb{Z}$ is countable.

The rationals look denser: between any two there is another. They are countable anyway, by a table plus a path.

Arrange the positive rationals $p/q$ in an infinite grid and walk the diagonals:

$$
\frac{1}{1};\; \frac{1}{2}, \frac{2}{1};\; \frac{1}{3}, \frac{2}{2}, \frac{3}{1};\; \frac{1}{4}, \frac{2}{3}, \frac{3}{2}, \frac{4}{1}; \dots
$$

The path guarantees every cell is reached in finitely many steps. Skip repeated values (such as $1/2 = 2/4$); what remains is a sequence with no repeats and no omissions. Add $0$ and the negatives, and $\mathbb{Q}$ is countable.

The point is that countability demands *some* listing, not a pretty one. Nobody reads the rationals along diagonals — but a listing exists, and that is enough.

## Properties of countable sets

Three results you can use directly:

- A countable union of countable sets is countable. Same diagonal idea: lay each set out as a row, then walk the diagonals.
- A finite product of countable sets is countable. $\mathbb{N} \times \mathbb{N}$ is countable, which is exactly the grid above.
- Every subset of a countable set is finite or countable.

One consequence: the algebraic numbers (roots of integer-coefficient polynomials) are countable, because the polynomials are countable and each has finitely many roots.

## The reals are not countable: diagonalisation

Suppose the reals in $(0,1)$ were countable, and list them:

$$
x_1 = 0.d_{11}d_{12}d_{13}\dots, \quad x_2 = 0.d_{21}d_{22}d_{23}\dots, \quad \dots
$$

Now build a new number $y = 0.e_1 e_2 e_3 \dots$ with

$$
e_n = \begin{cases} 1, & d_{nn} \neq 1 \\ 2, & d_{nn} = 1 \end{cases}
$$

$y$ differs from every $x_n$ in the $n$-th decimal place, so $y$ equals none of them. Yet $y$ is a real in $(0,1)$, contradicting the claim that the list was complete.

Hence $(0,1)$ is uncountable, and so is $\mathbb{R}$. No advanced machinery is needed: decimal expansions and digitwise distinction are enough.

> [!MYTH] Infinity is infinity; they are all the same size.
> The naturals and the reals are both infinite, and no bijection exists. There is a strict hierarchy of infinities.

## Where the boundary lies

| Set | Countable? | Reason |
| --- | --- | --- |
| $\mathbb{N}$ | yes | identity map |
| $\mathbb{Z}$ | yes | alternating listing |
| $\mathbb{Q}$ | yes | diagonal enumeration |
| algebraic numbers | yes | countably many polynomials, finitely many roots each |
| $\mathbb{R}$ | no | diagonal argument |
| $(0,1)$ | no | equinumerous with $\mathbb{R}$ |

This boundary matters in analysis: statements "for all reals" usually need stronger tools than "for all rationals", and density — the rationals being dense in the reals — does not turn a countable set into an uncountable one.

## Misreadings

> [!MYTH] The rationals outnumber the integers because they are dense.
> Density and cardinality are different. The rationals are dense in the reals and still equinumerous with the integers.

> [!MYTH] Countable means you can finish counting.
> Countable is the opposite: endless, yet listable, with every element at a finite position and none dropped.

> [!MYTH] A longer interval has more points.
> $(0,1)$ and $\mathbb{R}$ have different lengths and the same cardinality. Length is a metric notion; cardinality is not.

## Exercises

> [!PRACTICE] 1 · Build a bijection
> Write a bijection $\mathbb{N} \to \mathbb{Z}$.
>
> > [!ANSWER] Show answer
> > $f(2k) = k$, $f(2k+1) = -(k+1)$, giving $0, -1, 1, -2, 2, \dots$.

> [!PRACTICE] 2 · Proper subset
> Give an infinite set equinumerous with a proper subset of itself.
>
> > [!ANSWER] Show answer
> > $\mathbb{N}$ and the evens $2\mathbb{N}$, with the bijection $f(n) = 2n$.

> [!PRACTICE] 3 · Unions
> Why is the union of two countable sets countable?
>
> > [!ANSWER] Show answer
> > Put the first set in the odd positions and the second in the even ones; if they overlap, skip duplicates. The result is still a listing without repeats or omissions.

> [!PRACTICE] 4 · Diagonals
> In Cantor's argument, why not simply set $e_n = d_{nn}$?
>
> > [!ANSWER] Show answer
> > The resulting $y$ could coincide with some $x_n$. Every digit must differ to guarantee $y$ is absent from the list.

> [!PRACTICE] 5 · Algebraic numbers
> Show that the algebraic numbers are countable.
>
> > [!ANSWER] Show answer
> > Integer-coefficient polynomials can be enumerated by finite coefficient lists, hence are countable; each has finitely many roots, and a countable union of countable sets is countable.

> [!FORMAL] Formal statement
> Sets $A$ and $B$ are equinumerous if a bijection $A \to B$ exists. $A$ is countable if it is finite or there is a bijection $\mathbb{N} \to A$. Countable unions and finite products of countable sets are countable; $\mathbb{Q}$ is countable while $\mathbb{R}$ is not. Cantor's theorem further gives $|A| < |\mathcal{P}(A)|$ for every set $A$, so there is no largest cardinality.
