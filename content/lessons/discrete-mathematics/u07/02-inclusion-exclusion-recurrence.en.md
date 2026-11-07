---
slug: "inclusion-exclusion-recurrence"
subject: "discrete-mathematics"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Discrete Mathematics · Mastery"
title: "Inclusion–Exclusion, Recurrences, and Generating Functions"
subtitle: "Subtract the overlap, recurse on the structure"
minutes: 17
meta: ["17 min read","Requires permutations and combinations","Mastery level"]
concepts: ["counting", "numalg"]
prereq: ["counting"]
related: ["discprob", "divisibility"]
---

## What you will get

By the end of this lecture you can use inclusion–exclusion on several sets, set up and solve simple linear recurrences, and encode a sequence as a generating function and read off its coefficients.

Three things: how to correct for overlap, how to reduce a problem to smaller instances, and how to pack a whole sequence into one function.

## Three lines back

- The sum rule needs disjoint classes; overlapping classes count shared elements twice.
- A large count often decomposes into smaller counts of the same kind, which yields a recurrence.
- Computing a recurrence term by term is slow; a generating function encodes the sequence as a formal power series and handles it algebraically.

## Inclusion–exclusion

For two sets:

$$
|A\cup B|=|A|+|B|-|A\cap B|
$$

For three:

$$
|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|
$$

The pattern is: add odd-fold intersections, subtract even-fold ones.

Example: count integers from 1 to 100 divisible by 2, 3, or 5. Let $A,B,C$ be the sets divisible by 2, 3, and 5:

| Set | Meaning | Size |
| --- | --- | --- |
| $A$ | divisible by 2 | $\lfloor100/2\rfloor=50$ |
| $B$ | divisible by 3 | $\lfloor100/3\rfloor=33$ |
| $C$ | divisible by 5 | $\lfloor100/5\rfloor=20$ |
| $A\cap B$ | divisible by 6 | $16$ |
| $A\cap C$ | divisible by 10 | $10$ |
| $B\cap C$ | divisible by 15 | $6$ |
| $A\cap B\cap C$ | divisible by 30 | $3$ |

Substituting:

$$
50+33+20-16-10-6+3=74
$$

There are 74 such integers. Subtracting only the pairwise intersections would mishandle multiples of 30, which are removed three times and must be added back once.

## Derangements and recurrences

Put $n$ letters into $n$ addressed envelopes so that every letter goes to the wrong envelope. The number of ways is the derangement number $D_n$.

Inclusion–exclusion gives the closed form

$$
D_n=n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}
$$

and a recurrence that is easier to compute:

$$
D_n=(n-1)(D_{n-1}+D_{n-2}),\qquad D_1=0,\ D_2=1
$$

| $n$ | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| $D_n$ | 0 | 1 | 2 | 9 | 44 |
| $F_n$ | 1 | 1 | 2 | 3 | 5 |

$D_4=3(2+1)=9$, matching $4!(1-1+1/2-1/6+1/24)=9$.

Another common recurrence is climbing stairs one or two steps at a time. If the first step is 1, there are $a_{n-1}$ ways left; if it is 2, there are $a_{n-2}$. Hence

$$
a_n=a_{n-1}+a_{n-2},\qquad a_0=1,\ a_1=1
$$

This is the Fibonacci sequence, with $a_n=F_{n+1}$. For $n=5$ there are 8 ways.

> [!NOTE]
> A recurrence needs initial values. Without them, one recurrence describes infinitely many sequences; initial values select one.

## Generating functions

The generating function of $\{a_n\}$ is the formal power series

$$
A(x)=\sum_{n\ge0}a_nx^n
$$

Convergence is irrelevant; $x$ only records the index. Standard expansions:

$$
\frac{1}{1-x}=\sum_{n\ge0}x^n,\qquad \frac{1}{1-2x}=\sum_{n\ge0}2^nx^n,\qquad (1+x)^n=\sum_{k=0}^{n}\binom{n}{k}x^k
$$

For Fibonacci with $F_0=0,F_1=1,F_n=F_{n-1}+F_{n-2}$, multiplying the recurrence by $x^n$ and summing gives

$$
F(x)=\frac{x}{1-x-x^2}
$$

Multiplying generating functions convolves the sequences: if $C(x)=A(x)B(x)$, then $c_n=\sum_{k=0}^{n}a_kb_{n-k}$. This is why "choose one part, then another" counts become algebraic operations.

> [!MYTH] A generating function requires a discussion of convergence radius.
> In combinatorial counting it is a formal power series, manipulated only through coefficients. Convergence matters only when analytic tools are used to extract a closed form.

## Three common misconceptions

> [!MYTH] Inclusion–exclusion subtracts the intersection once.
> With three sets, pairwise intersections are over-subtracted and the triple intersection must be added back. The number of terms grows exponentially, but the alternating pattern is fixed.

> [!MYTH] A recurrence alone determines every term.
> Without initial values it does not. Derangements need $D_1,D_2$; Fibonacci needs $F_0,F_1$.

> [!MYTH] A generating function is just another way to write a sequence.
> It turns a recurrence into an algebraic equation and a convolution into a product, so it yields closed forms and proves identities in one stroke.

## Practice

> [!PRACTICE] 1 · Inclusion–exclusion
> How many integers from 1 to 60 are divisible by 2 or 3?
>
> > [!ANSWER] Show answer
> > $|A|=30$, $|B|=20$, $|A\cap B|=\lfloor60/6\rfloor=10$, so the count is $30+20-10=40$.

> [!PRACTICE] 2 · Derangements
> Use the recurrence to find $D_5$.
>
> > [!ANSWER] Show answer
> > $D_5=4(D_4+D_3)=4(9+2)=44$.

> [!PRACTICE] 3 · Generating function
> Find the coefficient of $x^n$ in $\dfrac{1}{1-3x}$.
>
> > [!ANSWER] Show answer
> > $\dfrac{1}{1-3x}=\sum_{n\ge0}(3x)^n=\sum_{n\ge0}3^nx^n$, so the coefficient is $3^n$.

## Formal statement

Inclusion–exclusion: for finite sets $A_1,\dots,A_n$,

$$
\left|\bigcup_{i=1}^{n}A_i\right|=\sum_{\varnothing\neq S\subseteq\{1,\dots,n\}}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|
$$

Derangement numbers satisfy $D_n=n!\sum_{k=0}^{n}(-1)^k/k!$ and $D_n=(n-1)(D_{n-1}+D_{n-2})$, with $D_1=0,D_2=1$. A linear homogeneous recurrence $a_n=c_1a_{n-1}+\cdots+c_ka_{n-k}$ is solved from the characteristic equation $r^k=c_1r^{k-1}+\cdots+c_k$, with initial values fixing the constants. The generating function of $\{a_n\}$ is $A(x)=\sum_{n\ge0}a_nx^n$, computed in the formal power series ring; if $C(x)=A(x)B(x)$, then $c_n=\sum_{k=0}^{n}a_kb_{n-k}$.
