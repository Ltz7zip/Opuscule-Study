---
slug: "det-n"
subject: "la"
unit: "u01"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Linear Algebra · Mastery"
title: "The n-th order determinant"
subtitle: "Turning the pattern into one formula"
minutes: 14
meta: ["14 min read","Requires permutations and transpositions","Mastery level"]
concepts: ["det", "cofactor"]
prereq: ["det"]
related: ["cofactor", "det"]
---

## Goal

By the end of this lecture you can read the summation definition of an $n$-th order determinant, tell which terms survive, and compute triangular determinants and determinants with only a few nonzero entries.

The whole lecture is one sentence: **fix the row indices, let the column indices run over all permutations, and attach $(-1)^{\tau}$ to each term.**

## Three-line recap

- Second and third order share one structure: one entry from each row and each column, multiplied.
- The sign is set by the inversion count of the column permutation.
- The number of terms is exactly $n!$.

## The problem

Third order has 6 terms, fourth order has 24, tenth order has more than three million. Drawing diagonals is hopeless. We need a formula that holds for every $n$ and can actually be reasoned with.

The formula has to answer two things: where the terms come from, and how the signs are assigned.

## Intuition

Pin the row indices to the natural order $1,2,\dots,n$ and let only the column indices form a permutation $p_1p_2\cdots p_n$. Each term takes column $p_1$ from row 1, column $p_2$ from row 2, and so on. Every row and every column is used exactly once.

Pinning the rows matters. If the rows also ran over permutations, the same product would be counted $n!$ times and the formula would be wrong.

Why does the inversion count give the sign? Because swapping two columns flips the determinant's sign, and the parity of the swaps needed to sort $p_1p_2\cdots p_n$ back to natural order is exactly the parity of $\tau$.

## Worked by hand

Consider the upper-triangular fourth-order determinant

$$
D = \begin{vmatrix} 2 & 1 & 3 & 4 \\ 0 & 5 & 1 & 2 \\ 0 & 0 & -1 & 3 \\ 0 & 0 & 0 & 6 \end{vmatrix}
$$

Among the 24 terms, any term that picks a zero below the diagonal dies. Work upwards from the last row: row 4 has a nonzero only in column 4, so $p_4=4$; row 3 is left with column 3, so $p_3=3$; row 2 is left with column 2, so $p_2=2$; row 1 is left with column 1. Only the identity permutation survives, with $\tau=0$ and sign $+1$. Therefore

$$
D = 2 \times 5 \times (-1) \times 6 = -60
$$

Now the opposite extreme, an anti-diagonal matrix:

$$
\begin{vmatrix} 0 & 0 & 0 & 1 \\ 0 & 0 & 2 & 0 \\ 0 & 3 & 0 & 0 \\ 4 & 0 & 0 & 0 \end{vmatrix}
$$

Again only $p=(4,3,2,1)$ survives. The product is $24$, and since $\tau = 6$ is even the sign is still $+1$, giving $24$. The sign is counted, not guessed from how the entries look.

## Three misconceptions

> [!MYTH] The row indices must run over permutations too.
> Fixing the rows to natural order is enough. Running both would count every product $n!$ times.

> [!MYTH] The sign of a term is the sign of its first entry.
> Signs of entries are already inside the product. The prefix sign depends only on the inversion count of the column permutation.

> [!MYTH] An $n$-th order determinant really needs all $n!$ terms.
> When many entries are zero, most terms vanish. A triangular determinant needs a single product.

## Practice

> [!PRACTICE] 1 · Counting terms
> How many terms does a fourth-order determinant have, and how many are positive or negative?
>
> > [!ANSWER] Show answer
> > $4! = 24$; even and odd permutations split 12 and 12, so 12 positive and 12 negative terms.

> [!PRACTICE] 2 · Upper triangular
> Compute $\begin{vmatrix} 1 & 7 & 2 \\ 0 & 3 & 5 \\ 0 & 0 & 4 \end{vmatrix}$.
>
> > [!ANSWER] Show answer
> > Only the identity permutation survives, so the value is $1\times3\times4 = 12$.

> [!PRACTICE] 3 · Anti-diagonal
> Compute $\begin{vmatrix} 0 & 0 & 1 \\ 0 & 2 & 0 \\ 3 & 0 & 0 \end{vmatrix}$.
>
> > [!ANSWER] Show answer
> > Only $p=(3,2,1)$, with $\tau = 3$ and sign $-1$. The product is $6$, so the result is $-6$.

## Formal statement

The form you can quote in a proof.

> [!FORMAL] Formal statement
> Let $A=(a_{ij})$ be a square matrix of order $n$. Its determinant is
> $$D = \sum_{p_1p_2\cdots p_n} (-1)^{\tau(p_1p_2\cdots p_n)}\, a_{1p_1}a_{2p_2}\cdots a_{np_n},$$
> the sum running over all $n!$ permutations of $1,2,\dots,n$. Immediate consequences: an upper or lower triangular determinant equals the product of its diagonal entries; a determinant with a zero row is zero; $D$ is linear in each row and changes sign when two rows are exchanged.
