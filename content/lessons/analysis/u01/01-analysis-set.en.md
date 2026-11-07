---
slug: "analysis-set"
subject: "analysis"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Mathematical Analysis · Mastery"
title: "Sets and Operations"
subtitle: "Make “belongs to” precise first"
minutes: 14
meta: ["14 min read","Requires elementary mathematics","Mastery level"]
concepts: ["set", "setops", "cartesian"]
prereq: ["elem"]
related: ["elem", "set", "setops"]
---

## Goal

By the end of this lecture you can say precisely which objects belong to a given range, and carry out subset checks, set operations, and a proof of De Morgan’s laws on your own.

Three moves only: make sets precise, make operations precise, and turn “prove two sets are equal” into a fixed routine.

## Three-line recap

- Calculus studies functions, and both the domain and the range of a function are sets.
- So the first step is not a limit; it is making “set” and “belongs to” precise.
- Limits, continuity, and open sets will all be rewritten in the same language.

## Sets and elements

A **set** is a collection of objects sharing a definite property. Those objects are its **elements**. If x is an element of S we write x ∈ S; otherwise x ∉ S.

> [!MYTH] Definiteness
> For any object, membership must be decidable. There is no “maybe belongs” zone.

> [!MYTH] Distinctness
> Repeating an element adds nothing. {a, a, b} is just {a, b}.

> [!MYTH] No order
> Order does not matter. {a, b} and {b, a} are the same set.

Common number sets: positive integers N*, integers Z, rationals Q, reals R. Elements need not be numbers: colours, letters, functions, even other sets are allowed.

## Two ways to write a set

| Method | Form | Example | Watch out |
| --- | --- | --- | --- |
| Roster | A = {a, b, c} | {red, green, blue} | Elements countable, or the pattern is clear |
| Set-builder | S = { x \| x satisfies P } | { x ∈ R \| x > 0 } | Left of the bar: the element; right: the condition |

An infinite set with a clear pattern can also be opened up: N* = {1, 2, 3, …}.

When writing Q = { p/q | p, q ∈ Z, q ≠ 0 }, say where p and q come from, or the condition is incomplete. The two sides of the bar cannot be swapped: left is “who”, right is “what it must satisfy”.

## Subsets, equality, and counting

Let S and T be sets. If every element of S is in T — that is, for every x, x ∈ S ⇒ x ∈ T — then S is a **subset** of T, written S ⊆ T.

| Concept | Condition | Notation |
| --- | --- | --- |
| Subset | Every x ∈ S also satisfies x ∈ T | S ⊆ T |
| Proper subset | S ⊆ T and S ≠ T | S ⊂ T |
| Equality | S ⊆ T and T ⊆ S | S = T |

The **empty set ∅** has no elements, yet it is a subset of every set; every set is also a subset of itself.

> [!NOTE]
> S = T ⇔ S ⊆ T and T ⊆ S

This is not a slogan; it is the standard proof routine — prove each direction once. Counting: a set with n elements has **2ⁿ** subsets and **2ⁿ − 1** proper subsets. Each element is either chosen or not; remove the full set itself and 2ⁿ − 1 remain.

## Four basic operations

| Operation | Notation | Element condition | Example (A={a,b,c}, B={b,c,d,e}) |
| --- | --- | --- | --- |
| Union | A ∪ B | x ∈ A or x ∈ B | {a, b, c, d, e} |
| Intersection | A ∩ B | x ∈ A and x ∈ B | {b, c} |
| Difference | A \ B | x ∈ A and x ∉ B | {a} |
| Complement | Aᶜ | x ∈ X and x ∉ A | Fix a universe X first |

<figure class="venn-wrap"><svg viewBox="0 0 420 170" role="img" aria-label="Union, intersection and difference of two sets"><circle cx="165" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/><circle cx="255" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/><text x="120" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">A</text><text x="300" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">B</text><text x="210" y="85" font-size="12" fill="var(--ink-2)" text-anchor="middle">A∩B</text></svg><figcaption class="venn-cap">The two circles together form the union; the overlap is the intersection; the left crescent is A \ B.</figcaption></figure>

> [!NOTE]
> A \ B = { x | x ∈ A and x ∉ B }　　Aᶜ = { x ∈ X | x ∉ A }

Difference and complement are not the same. A \ B needs no universe; Aᶜ only makes sense inside a fixed X.

## Laws and De Morgan

| Law | Union | Intersection |
| --- | --- | --- |
| Commutative | A ∪ B = B ∪ A | A ∩ B = B ∩ A |
| Associative | A ∪ (B ∪ D) = (A ∪ B) ∪ D | A ∩ (B ∩ D) = (A ∩ B) ∩ D |
| Distributive | A ∪ (B ∩ D) = (A ∪ B) ∩ (A ∪ D) | A ∩ (B ∪ D) = (A ∩ B) ∪ (A ∩ D) |

> [!NOTE]
> (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ　　(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ

**De Morgan’s laws**: do not memorise, translate. For the second law: x ∈ (A ∩ B)ᶜ ⇔ x ∉ A ∩ B ⇔ not (x ∈ A and x ∈ B) ⇔ x ∉ A or x ∉ B ⇔ x ∈ Aᶜ or x ∈ Bᶜ ⇔ x ∈ Aᶜ ∪ Bᶜ. Every step translates membership into a logical connective and back. Run both directions and the identity is proved.

## Cartesian product

An **ordered pair** (x, y) cares about order: x comes from the first set, y from the second.

> [!NOTE]
> A × B = { (x, y) | x ∈ A and y ∈ B }

| Finish \ Colour | Red | Green | Blue |
| --- | --- | --- | --- |
| Gauze | (Red, Gauze) | (Green, Gauze) | (Blue, Gauze) |
| Jacquard | (Red, Jacquard) | (Green, Jacquard) | (Blue, Jacquard) |
| Print | (Red, Print) | (Green, Print) | (Blue, Print) |
| Embroidery | (Red, Embroidery) | (Green, Embroidery) | (Blue, Embroidery) |

3 colours × 4 finishes = 12 curtain varieties. In general, if A has m elements and B has n, then A × B has m × n elements.

R × R is written R², the plane; R × R × R is R³, space. Note that A × B and B × A generally differ, because the order of the pair changes.

## Four misconceptions

> [!MYTH] The empty set is useless.
> It is a subset of every set and the boundary case of set operations. Without it, an intersection could have no result and subset counting would lose a case.

> [!MYTH] {a, b} and {b, a} are different sets.
> Sets have no order. Only ordered pairs (a, b) care about order; {a, b} = {b, a}.

> [!MYTH] a and {a} are the same thing.
> a is an element; {a} is a set. a ∈ {a} holds; a ⊆ {a} usually does not, because the left side is not a set.

> [!MYTH] A \ B always equals A ∩ Bᶜ.
> Only inside one universe X with A and B both subsets of X. A \ B itself needs no universe.

## Practice

> [!PRACTICE] 1 · Decide
> Is ∅ ⊆ {1, 2}? Is {1} ∈ {1, 2}? Is {1} ⊆ {1, 2}?
>
> > [!ANSWER] Show answer
> > Yes; no, {1} is a set, not an element; yes.

> [!PRACTICE] 2 · List
> Write every subset of {a, b, c} and count them.
>
> > [!ANSWER] Show answer
> > ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}: eight in total.

> [!PRACTICE] 3 · Prove
> Prove (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.
>
> > [!ANSWER] Show answer
> > Take any x and translate x ∈ (A ∩ B)ᶜ into “x ∉ A or x ∉ B”, then into x ∈ Aᶜ ∪ Bᶜ; run the reverse direction too.

> [!PRACTICE] 4 · Compute
> A = {1, 2}, B = {x, y}. Find A × B and B × A, then compare.
>
> > [!ANSWER] Show answer
> > A × B = {(1,x), (1,y), (2,x), (2,y)}; B × A = {(x,1), (x,2), (y,1), (y,2)}. They generally differ.

> [!PRACTICE] 5 · Combine
> Universe X = {1,2,3,4,5}, A = {1,2}, B = {2,3}. Find A \ B, Aᶜ, A ∪ B, A ∩ B.
>
> > [!ANSWER] Show answer
> > A \ B = {1}; Aᶜ = {3,4,5}; A ∪ B = {1,2,3}; A ∩ B = {2}.

> [!FORMAL] Formal statement
> Template for set equality: to prove S = T, first take x ∈ S and derive x ∈ T, then take x ∈ T and derive x ∈ S. For the power-set count, induct on n: with n = 0 only ∅ exists; adding an (n+1)-st element gives every subset a “without a” and “with a” version, doubling the count to 2ⁿ.
