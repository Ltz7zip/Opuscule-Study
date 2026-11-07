---
slug: "selection-merge-sort"
subject: "data-structures"
unit: "u10"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 10 · Data Structures · Mastery"
title: "Selection and Merge Sorts"
subtitle: "From tournaments to divide and conquer"
minutes: 17
meta: ["17 min read","Requires insertion and exchange sorts","Mastery level"]
concepts: ["sorting","tree"]
prereq: ["sorting"]
related: ["complexity","sorting"]
---

## What you will get

You will be able to run selection, heap, merge, and radix sorts on the same array, and explain why building a heap is $O(n)$ and why merge sort is always $O(n\log n)$.

## Three lines back

- Selection sorts pick the smallest remaining key each pass and place it at the end of the settled region.
- Heap sort keeps the extreme key at the root of a complete binary tree and lowers the selection cost to $O(\log n)$.
- Merge sort combines two sorted runs, while radix sort distributes and collects by digit; neither decides the global order by pairwise comparison alone.

## Simple and tree selection

**Simple selection sort** scans $A[i..n]$ for the minimum in pass $i$ and swaps it with $A[i]$:

```c
void SelectSort(int A[], int n) {
    for (int i = 1; i < n; ++i) {
        int min = i;
        for (int j = i + 1; j <= n; ++j)
            if (A[j] < A[min]) min = j;
        if (min != i) { int t = A[i]; A[i] = A[min]; A[min] = t; }
    }
}
```

The comparison count is independent of the input:

$$
\sum_{i=1}^{n-1}(n-i)=\frac{n(n-1)}{2}
$$

For $n=8$ this is $8\times7/2=28$. Moves range from 0 on sorted input to $3(n-1)$ in the worst case.

**Tree selection sort** places the $n$ keys at the leaves of a complete binary tree and stores the smaller child at every internal node, so the root is the global minimum. After outputting the root, its leaf becomes $\infty$ and only the path to the root is replayed. Building the tree costs $n-1$ comparisons, and each of the remaining outputs costs $\lceil\log_2 n\rceil$:

$$
(n-1)+(n-1)\lceil\log_2 n\rceil
$$

For $n=8$ this is $7+7\times3=28$, the same as simple selection; for $n=16$ it is $15+15\times4=75$, well below the $120$ of simple selection. The price is about $2n$ extra nodes and comparisons against $\infty$.

## Heap sort

A **heap** is a complete binary tree with $A[i]\le A[2i]$ and $A[i]\le A[2i+1]$ for a min-heap, or the reverse inequalities for a max-heap. Heap sort first builds a max-heap bottom-up with **sift-down**, then repeatedly swaps the root with the last element, shrinks the heap, and sifts down again.

Build a max-heap for $49,38,65,97,76,13,27,49$, starting from the last non-leaf $i=4$. Node 97 has child 49 and stays; node 65 has children 13 and 27 and stays; node 38 has children 97 and 76, so it swaps with 97 and then sinks past 49; finally the root 49 swaps with 97 and then with 76. The result is

$$
97,\ 76,\ 65,\ 49,\ 49,\ 13,\ 27,\ 38
$$

Successive extractions:

| Round | Swap | Heap after sift-down | Settled |
| --- | --- | --- | --- |
| 1 | 97 ↔ 38 | 76, 49, 65, 38, 49, 13, 27 | 97 |
| 2 | 76 ↔ 27 | 65, 49, 27, 38, 49, 13 | 76, 97 |
| 3 | 65 ↔ 13 | 49, 49, 27, 38, 13 | 65, 76, 97 |

Repeating until the heap is empty gives $13,27,38,49,49,65,76,97$. Building the heap costs

$$
\sum_{h=0}^{\lfloor\log_2 n\rfloor}\frac{n}{2^{h+1}}\cdot h=O(n)
$$

rather than $O(n\log n)$; the $n-1$ sift-downs that follow cost $O(\log n)$ each, for $O(n\log n)$ total. Heap sort is in place, has an $O(n\log n)$ worst case, and is unstable.

## Merge sort and radix sort

**Merge sort** splits the array in half, sorts each half recursively, and merges the two sorted runs. A merge compares only the two current heads and emits the smaller one:

| Stage | Array |
| --- | --- |
| Input | 49, 38, 65, 97, 76, 13, 27, 49 |
| Pairs merged | 38, 49 | 65, 97 | 13, 76 | 27, 49 |
| Runs of four | 38, 49, 65, 97 | 13, 27, 49, 76 |
| Final merge | 13, 27, 38, 49, 49, 65, 76, 97 |

This example uses $1+1+1+1+2+3+7=16$ comparisons. The recurrence $T(n)=2T(n/2)+O(n)$ gives $T(n)=O(n\log n)$ in the best, worst, and average cases; the cost is an auxiliary array of $O(n)$. Merge sort is stable when ties are taken from the left run.

**Radix sort** distributes and collects by digit from least significant to most significant:

| Pass | Digit | Collected order |
| --- | --- | --- |
| 1 | Units | 13, 65, 76, 97, 27, 38, 49, 49 |
| 2 | Tens | 13, 27, 38, 49, 49, 65, 76, 97 |

Each pass distributes $n$ keys into $r$ buckets and collects them in order, so $d$ passes cost $O(d(n+r))$. Here $d=2$, $r=10$, $n=8$, about $2\times(8+10)=36$ operations. Radix sort compares no keys, but needs fixed-length digits and stable passes; otherwise a high-digit pass would destroy the order built by lower digits.

## Three common misconceptions

> [!MYTH] Simple selection's comparison count depends on the input order.
> It is always $n(n-1)/2$. The input affects only the number of swaps.

> [!MYTH] Building a heap costs $O(n\log n)$.
> Bottom-up construction is $O(n)$: most nodes are near the bottom and sink a short distance. The $O(n\log n)$ term comes from the $n-1$ removals.

> [!MYTH] Merge sort can run in place.
> A standard two-way merge needs $O(n)$ auxiliary space for the output; otherwise elements must be shifted repeatedly and the running time worsens.

## Practice

> [!PRACTICE] 1 · Count comparisons
> How many comparisons does simple selection sort make on 8 keys, and how many swaps if the input is already sorted?
>
> > [!ANSWER] Show answer
> > $8\times7/2=28$ comparisons. On sorted input `min == i` every pass, so 0 swaps.

> [!PRACTICE] 2 · Tree selection
> What is the total comparison count of tree selection sort on 16 keys?
>
> > [!ANSWER] Show answer
> > $15$ to build the tree, then $15$ replays of $\log_2 16=4$ comparisons each, for $15+15\times4=75$.

> [!PRACTICE] 3 · Radix passes
> Sorting 1000 three-digit decimal numbers with radix sort needs how many passes and how many buckets?
>
> > [!ANSWER] Show answer
> > Three digits, so $d=3$ passes; decimal digits, so $r=10$ buckets. The total cost is $O(3\times(1000+10))$.

## Formal statement

A max-heap satisfies $A[i]\ge A[2i]$ and $A[i]\ge A[2i+1]$ whenever the child exists. Sift-down exchanges the root with its larger child and continues downward until the heap order holds, costing at most the height $O(\log n)$. Bottom-up construction sifts down from $i=\lfloor n/2\rfloor$ to 1; a node of height $h$ sinks at most $h$ levels, so the total is $\sum_{h\ge0}\frac{n}{2^{h+1}}h<2n=O(n)$. The $n-1$ rounds of "swap root with the end, then sift" add $O(n\log n)$.

Merge sort obeys $T(n)=2T(n/2)+\Theta(n)$, so the master theorem gives $T(n)=\Theta(n\log n)$ with recursion depth $\Theta(\log n)$. Radix sort performs $d$ stable distribution passes over $r$ buckets for $d$-digit keys, in $O(d(n+r))$ time and $O(n+r)$ space; correctness relies on each pass preserving the relative order of keys within a bucket.