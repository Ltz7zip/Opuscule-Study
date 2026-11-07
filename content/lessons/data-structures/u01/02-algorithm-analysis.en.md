---
slug: "algorithm-analysis"
subject: "data-structures"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "Algorithms and Algorithm Analysis"
subtitle: "Counting a piece of code into T(n)"
minutes: 16
meta: ["16 min read","Requires basic concepts","Mastery level"]
concepts: ["complexity"]
prereq: ["list"]
related: ["sorting", "search"]
---

## What you will get

By the end of this lecture you can decide whether a procedure qualifies as an algorithm, count its basic operations line by line into $T(n)$, state the result with $O$, $\Omega$, and $\Theta$, and keep time cost separate from space cost.

## Three lines back

- An algorithm is a finite sequence of unambiguous instructions: finite, definite, feasible, with input and output.
- Time complexity is not seconds; it is the growth order of the basic-operation count as the input size $n$ grows.
- Asymptotic notation keeps the fastest-growing term and drops constant factors.

## Five properties and what we judge

A procedure becomes an algorithm only when all five hold:

| Property | Meaning | Counterexample |
| --- | --- | --- |
| Finiteness | ends in finitely many steps | `while (1) {}` |
| Definiteness | every instruction is unambiguous | testing an uninitialised variable |
| Feasibility | each step is a basic operation | calling a library that does not exist |
| Input | zero or more inputs | claiming a solution while reading nothing |
| Output | at least one output | computing without returning or printing |

Beyond these, we judge correctness, readability, robustness, and efficiency. The first three are settled by testing and review; efficiency needs an order-of-growth measure, because wall-clock seconds from two machines cannot be compared.

## Counting one concrete routine

Take a routine that sums a double loop:

```c
int sum(int n) {
    int s = 0;                          /* 1 time */
    for (int i = 1; i <= n; i++)        /* n+1 tests */
        for (int j = 1; j <= i; j++)    /* sum(i+1) tests */
            s += i * j;                 /* sum(i) assignments */
    return s;                           /* 1 time */
}
```

Add the counts of the basic statements. For a fixed $i$ the inner loop performs $i$ assignments and $i+1$ tests, so

$$
T(n)=1+(n+1)+\sum_{i=1}^{n}(i+1)+\sum_{i=1}^{n}i+1
$$

Using $\sum_{i=1}^{n}i=\dfrac{n(n+1)}{2}$:

$$
T(n)=n+3+2\cdot\frac{n(n+1)}{2}=n^{2}+3n+3
$$

At $n=100$ this is $10303$; at $n=1000$ it is $1003003$. Multiply $n$ by ten and the count grows about a hundredfold, so the quadratic term dominates and $T(n)=O(n^{2})$.

Change the loop and the answer changes immediately:

```c
for (int i = 1; i <= n; i *= 2)
    s += i;
```

Here $i$ takes $1,2,4,\dots,2^{k}$ and the loop stops once $2^{k}>n$, so it runs $\lfloor\log_2 n\rfloor+1$ times, which is $O(\log n)$. Nesting depth is not the complexity; how the loop variable advances decides the order.

The usual orders, evaluated at $n=10^{6}$:

| Order | Name | Magnitude at $n=10^{6}$ |
| --- | --- | --- |
| $O(1)$ | constant | 1 |
| $O(\log n)$ | logarithmic | about 20 |
| $O(n)$ | linear | $10^{6}$ |
| $O(n\log n)$ | linearithmic | about $2\times10^{7}$ |
| $O(n^{2})$ | quadratic | $10^{12}$ |

## Space complexity and the asymptotic symbols

Space complexity $S(n)$ counts the extra storage an algorithm uses beyond its input. Swapping two variables in place needs a constant number of temporaries, so $S(n)=O(1)$. Copying $n$ elements before sorting gives $S(n)=O(n)$. A recursion of depth $n$ pushes $n$ frames, so $S(n)=O(n)$. Time and space must be counted separately: a recursive routine of five lines can still be linear in space.

The four symbols differ in whether they give an upper bound, a lower bound, or a tight one:

| Symbol | Meaning | Example |
| --- | --- | --- |
| $O$ | asymptotic upper bound: $T(n)\le c\,g(n)$ for some $c>0$ | $3n^{2}+5n+2=O(n^{2})$ |
| $\Omega$ | asymptotic lower bound: $T(n)\ge c\,g(n)$ | $3n^{2}+5n+2=\Omega(n^{2})$ |
| $\Theta$ | tight bound: both $O$ and $\Omega$ | $3n^{2}+5n+2=\Theta(n^{2})$ |
| $o$ | strictly smaller order: $T(n)/g(n)\to 0$ | $n=o(n^{2})$ |

Textbooks default to $O$ because it answers "how much in the worst case". But "insertion sort is $O(n^{2})$" does not deny that it takes only $O(n)$ on sorted input. Upper bounds are not unique; tight bounds are.

> [!NOTE]
> Count the statement executed in the innermost body. Loop initialisation and tests contribute lower-order terms that disappear after simplification, but write the full derivation anyway — otherwise $n^{2}/2$ is easily misread as $n/2$.

## Three misconceptions

> [!MYTH] $O(1)$ means the code runs once.
> It means the count does not depend on $n$. A fixed loop of 100 iterations is still $O(1)$.

> [!MYTH] Time complexity is how many seconds the program takes.
> Seconds depend on hardware, compiler, and input. Complexity describes only the growth trend.

> [!MYTH] Two nested loops always mean $O(n^{2})$.
> If the inner loop runs from $i$, the total is $n(n+1)/2$, still $O(n^{2})$. But if the inner counter halves each time, the total becomes $O(n\log n)$; the step rule decides.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Find $T(n)$ for `for (i=1;i<=n;i++) for (j=1;j<=n;j++) a[i][j]=0;`.
>
> > [!ANSWER] Show answer
> > The outer loop runs $n$ times and the inner loop $n$ times per pass, giving $n^{2}$ assignments, so $T(n)=O(n^{2})$.

> [!PRACTICE] 2 · Variation
> Replace the inner loop with `for (j=i;j<=n;j++)`. Does the order change? Give the exact count.
>
> > [!ANSWER] Show answer
> > The count is $n+(n-1)+\dots+1=n(n+1)/2$, still $O(n^{2})$: the coefficient halves, the order does not.

> [!PRACTICE] 3 · Space
> Compute $n!$ recursively. What are the recursion depth and the space complexity?
>
> > [!ANSWER] Show answer
> > One call per level, depth $n$, so $n$ stack frames and $S(n)=O(n)$; time is $O(n)$ since each level does a constant number of multiplications.

## Formal statement

Let $T(n)$ be the number of basic operations performed at input size $n$. If positive constants $c$ and $n_0$ exist such that $0\le T(n)\le c\,g(n)$ for all $n\ge n_0$, we write $T(n)=O(g(n))$. If $T(n)\ge c\,g(n)$, we write $T(n)=\Omega(g(n))$. If both hold, $T(n)=\Theta(g(n))$. If for every $c>0$ there is an $n_0$ with $T(n)<c\,g(n)$ beyond it, then $T(n)=o(g(n))$. Any polynomial $T(n)=a_k n^{k}+\dots+a_0$ with $a_k>0$ satisfies $T(n)=\Theta(n^{k})$. Space complexity counts the maximum extra storage beyond the input, and a recursive algorithm's space is at least of the order of its recursion depth.