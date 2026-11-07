---
slug: "permutations-combinations"
subject: "discrete-mathematics"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Sum and Product Rules, Permutations, and Combinations"
subtitle: "First ask: classify, or proceed in stages?"
minutes: 15
meta: ["15 min read","Requires sets and maps","Mastery level"]
concepts: ["counting", "set"]
prereq: ["set", "map"]
related: ["discprob", "numalg"]
---

## What you will get

By the end of this lecture you can decide whether a problem calls for the sum rule or the product rule, count permutations, combinations, arrangements with repetition, and circular arrangements, and simplify counting expressions with binomial identities.

Three things: adding across classes and multiplying across stages, the difference between choosing and ordering, and how to avoid double counting and omissions.

## Three lines back

- Counting means finding the size of a finite set, and the answer must be a definite integer.
- If the objects split into disjoint classes, the total is the sum over the classes.
- If an object is determined by successive stages, the total is the product of the choice counts.

## Sum and product rules

Sum rule: if $A\cap B=\varnothing$, then $|A\cup B|=|A|+|B|$, and the same extends to finitely many pairwise disjoint sets. Example: 3 flights and 2 trains from Beijing to Shanghai give $3+2=5$ ways to choose a mode of transport.

Product rule: $|A\times B|=|A|\cdot|B|$. Example: a set meal with 3 main dishes and 4 drinks gives $3\times4=12$ different meals.

The rule of thumb is "classify and add, stage and multiply". Classes must be disjoint and exhaustive; the number of choices at a stage must not depend on earlier choices, or the cases must be split further.

| Problem | Rule | Computation |
| --- | --- | --- |
| 3 flights or 2 trains | sum | $3+2=5$ |
| 3 mains with 4 drinks | product | $3\times4=12$ |
| 3 of 5 people in a row | product, decreasing | $5\times4\times3=60$ |
| 3 of 5 people as a group | product divided by order | $60/6=10$ |

## Permutations

Choosing $k$ distinct objects from $n$ and lining them up gives

$$
P(n,k)=n(n-1)\cdots(n-k+1)=\frac{n!}{(n-k)!}
$$

The first position has $n$ choices, the second $n-1$, and so on. For $k=n$ this is the full permutation count $n!$.

With repetition allowed, each position has $n$ choices, so $k$ positions give $n^k$. Example: a 4-digit code has $10^4=10000$ possibilities with repetition, and $10\times9\times8\times7=5040$ without.

Circular arrangements are easy to overcount. With $n$ distinct objects around a circle, rotations are considered the same, so the count is

$$
\frac{n!}{n}=(n-1)!
$$

Five people at a round table give $4!=24$ arrangements. If reflections are also identified, as with a bracelet, divide by 2 once more.

## Combinations

Choosing $k$ objects from $n$ as a set, with order irrelevant, gives

$$
\binom{n}{k}=\frac{P(n,k)}{k!}=\frac{n!}{k!\,(n-k)!}
$$

Choosing 3 of 5 people as a group: $P(5,3)=60$, and each group is counted $3!=6$ times, so $\binom{5}{3}=10$.

Two basic identities:

$$
\binom{n}{k}=\binom{n}{n-k},\qquad \binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}
$$

The first pairs "chosen" with "left behind"; the second classifies by whether one fixed element is chosen, producing Pascal's triangle. The binomial theorem ties the numbers together:

$$
(x+y)^n=\sum_{k=0}^{n}\binom{n}{k}x^{n-k}y^k
$$

Setting $x=y=1$ gives $\sum_k\binom{n}{k}=2^n$, the total number of subsets of an $n$-element set.

> [!NOTE]
> Permutations and combinations differ only on whether order counts. Counting ordered first and then dividing by the number of repeats is a reliable way to avoid both omissions and double counting.

## Three common misconceptions

> [!MYTH] Permutations and combinations are just different notation.
> Permutations count order, combinations do not. Three of five people in a row gives 60, as a group gives 10; the ratio is $3!$.

> [!MYTH] "Or" always means add and "and" always means multiply.
> Structure matters: disjoint classes add, independent stages multiply. If the number of choices at one stage depends on the previous one, direct multiplication is wrong.

> [!MYTH] Circular arrangements are also $n!$.
> Rotations must be identified. There are $n$ rotations of an arrangement, so the count is $n!/n=(n-1)!$.

## Practice

> [!PRACTICE] 1 · Choose and appoint
> From 7 people choose 3 to form a committee, then choose a chair from those 3. How many outcomes are there?
>
> > [!ANSWER] Show answer
> > Choose the committee: $\binom{7}{3}=35$; choose the chair: $3$ ways. Total $35\times3=105$. Alternatively choose the chair first ($7$ ways), then 2 of the remaining 6: $7\times15=105$.

> [!PRACTICE] 2 · Codes
> A licence plate has 2 distinct letters followed by 3 digits, digits may repeat. How many plates are there?
>
> > [!ANSWER] Show answer
> > Letters: $26\times25=650$; digits: $10^3=1000$. Total $650\times1000=650000$.

> [!PRACTICE] 3 · Round table
> In how many ways can 6 people sit around a round table, counting only relative position?
>
> > [!ANSWER] Show answer
> > The circular count is $(6-1)!=5!=120$.

## Formal statement

Let $A,B$ be finite. Sum rule: if $A\cap B=\varnothing$, then $|A\cup B|=|A|+|B|$. Product rule: $|A\times B|=|A|\cdot|B|$. The number of injections from an $n$-set into $k$ ordered positions is $P(n,k)=n!/(n-k)!$; the number of $k$-element subsets is $\binom{n}{k}=n!/(k!(n-k)!)$; the number of all functions from an $n$-set to a $k$-set is $n^k$. Circular arrangements number $(n-1)!$. Binomial coefficients satisfy $\binom{n}{k}=\binom{n}{n-k}$ and Pascal's recurrence $\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}$, and appear in $(x+y)^n=\sum_{k=0}^{n}\binom{n}{k}x^{n-k}y^k$. A count is correct only when classes are disjoint and exhaustive, or stages are independent; otherwise it repeats or omits cases.
