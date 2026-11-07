---
slug: "permutation"
subject: "la"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Permutations and transpositions"
subtitle: "Counting inversions"
minutes: 12
meta: ["12 min read","Requires second- and third-order determinants","Mastery level"]
concepts: ["det"]
prereq: ["matrix"]
related: ["det", "cofactor"]
---

## Goal

By the end of this lecture you can count the inversions of a permutation, decide its parity, and explain why swapping two positions always flips that parity.

There is no new computation here, only a language. The definition of the $n$-th order determinant is built entirely on it.

## Three-line recap

- The six terms of a third-order determinant correspond exactly to the six permutations of the column indices $1,2,3$.
- The sign in front of each term comes from that permutation's inversion count.
- Pushing the formula to order $n$ requires a precise notion of permutation and inversion.

## The problem

The third-order formula has three positive and three negative terms. Remembering it as main-diagonal positive, anti-diagonal negative collapses at fourth order: there are 24 terms and no way to draw that many diagonals.

So the real question is not how to draw lines. It is: **given a permutation, how do we automatically decide its sign?**

The answer is one integer: the inversion count.

## Intuition

Picture $n$ people numbered $1,2,\dots,n$ standing in a row. Every pair where the larger number stands before the smaller one is an inversion. The inversion count $\tau$ is the total number of such pairs.

Even $\tau$ means an even permutation with a plus sign; odd $\tau$ means an odd permutation with a minus sign.

There is a more usable picture: $\tau$ equals the minimum number of **adjacent swaps** needed to sort the permutation back to $1,2,\dots,n$. That is exactly what bubble sort does, and each swap of an adjacent inverted pair lowers $\tau$ by one.

## Worked by hand

Take the four-element permutation $p = (3,1,4,2)$ and count, for each entry, how many later entries are smaller:

| Position | Entry | Smaller entries after it | Count |
| --- | --- | --- | --- |
| 1 | 3 | 1, 2 | 2 |
| 2 | 1 | none | 0 |
| 3 | 4 | 2 | 1 |
| 4 | 2 | none | 0 |

So $\tau(p) = 2+0+1+0 = 3$: odd, sign $-1$.

For comparison, the identity $(1,2,3,4)$ has $\tau = 0$ and is even. Swap positions 2 and 3 of $p$ to get $(3,4,1,2)$, where $\tau = 2+2+0+0 = 4$, now even. The parity flipped.

Note the size of the flip: $\tau$ moved from 3 to 4, a change of one. But swap the two ends of $(4,3,2,1)$, which has $\tau = 6$, and you get $(1,3,2,4)$ with $\tau = 1$, a change of five. A transposition changes an **odd number** of inversions, not necessarily exactly one.

## Three misconceptions

> [!MYTH] The inversion count is just the permutation written backwards.
> Writing it backwards gives a different permutation. The inversion count counts pairs whose order is reversed relative to their values, regardless of how the permutation is written down.

> [!MYTH] The parity depends on how you count.
> $\tau$ is a fixed integer. A different counting order changes the order of summation, not the result.

> [!MYTH] One transposition changes exactly one inversion.
> It changes an odd number of them. The example $(4,3,2,1)$ loses five at once, yet the parity still flips.

## Practice

> [!PRACTICE] 1 · Third order
> Find $\tau(2,3,1)$ and its parity.
>
> > [!ANSWER] Show answer
> > 2 has 1 after it; 3 has 1 after it. Total $2$, even, sign $+1$.

> [!PRACTICE] 2 · Fourth order
> Find $\tau(4,1,3,2)$.
>
> > [!ANSWER] Show answer
> > 4 has three smaller entries after it; 1 has none; 3 has 2 after it. So $\tau = 4$, even.

> [!PRACTICE] 3 · Transposition
> Swap positions 2 and 3 of $(4,1,3,2)$ and describe the change in parity.
>
> > [!ANSWER] Show answer
> > The result is $(4,3,1,2)$ with $\tau = 3+2+0+0 = 5$, so even becomes odd. The parity does flip.

## Formal statement

Writing the counting rule down as a definition.

> [!FORMAL] Formal statement
> A rearrangement $p=(p_1,\dots,p_n)$ of $1,2,\dots,n$ is called a permutation of $n$ elements. If $i<j$ but $p_i>p_j$, the pair $(p_i,p_j)$ is an inversion, and the total number of inversions is written $\tau(p)$. Define $\operatorname{sgn}(p)=(-1)^{\tau(p)}$, equal to $+1$ for even $\tau$ and $-1$ for odd $\tau$. Any permutation can be reduced to the identity by finitely many transpositions, and the parity of the number used always matches the parity of $\tau(p)$. Hence every transposition flips $\operatorname{sgn}$, and $\operatorname{sgn}$ is a group homomorphism from $S_n$ to $\{+1,-1\}$.
