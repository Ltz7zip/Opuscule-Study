---
slug: "static-search-asl"
subject: "data-structures"
unit: "u09"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 9 · Data Structures · Mastery"
title: "Static Search Tables: Sequential, Binary, and Block"
subtitle: "Turning average search length into a number"
minutes: 15
meta: ["15 min read","Requires tree traversal","Mastery level"]
concepts: ["search","complexity"]
prereq: ["tree"]
related: ["binarytree","complexity"]
---

## What you will get

You will be able to state the average search length for sequential and binary search, draw the decision tree for 11 keys and compute its ASL, and explain why block search adds an index cost to a block cost.

## Three lines back

- A static search table supports queries only; once built it is neither inserted into nor deleted from.
- The average search length $\mathrm{ASL}$ is the weighted mean of the comparisons needed to find each key.
- Sequential, binary, and block search differ in one decision: where to look first.

## Sequential search

Sequential search compares from the head of the table and stops on a match. Let the table have $n$ keys, let key $i$ be requested with probability $p_i$, and let finding it cost $i$ comparisons. Then

$$
\mathrm{ASL}_{\text{succ}}=\sum_{i=1}^{n}p_i\,c_i,\qquad p_i=\frac{1}{n}\ \Rightarrow\ \mathrm{ASL}_{\text{succ}}=\frac{1}{n}\sum_{i=1}^{n}i=\frac{n+1}{2}
$$

For $n=11$ this gives $(11+1)/2=6$. On failure, a **sentinel** in slot 0 holding the target key bounds the loop at $n+1$ comparisons; without a sentinel the same key comparisons occur plus one bounds check.

| Case | Comparisons | $n=11$ |
| --- | --- | --- |
| Best | 1 | 1 |
| Worst, successful | $n$ | 11 |
| Average, successful | $(n+1)/2$ | 6 |
| Failure, with sentinel | $n+1$ | 12 |

Sequential search needs neither sorted keys nor contiguous storage, so it also works on a linked list; the price is $O(n)$.

## Binary search and its decision tree

Binary search requires **sorted keys** in **contiguous storage**. Each round takes the midpoint `mid = (low + high) / 2` and halves the interval:

```c
int BinarySearch(SSTable ST, KeyType key) {
    int low = 1, high = ST.length;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (ST.elem[mid].key == key) return mid;
        else if (ST.elem[mid].key < key) low = mid + 1;
        else high = mid - 1;
    }
    return 0;
}
```

The comparisons form a tree: each node is one comparison, its left subtree is the smaller half, its right subtree the larger half. This is the **decision tree**. Take the sorted table

| Index | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Key | 6 | 8 | 14 | 23 | 30 | 45 | 51 | 62 | 77 | 88 | 96 |

The first comparison is index 6 (key 45); the left half [1,5] takes index 3 (14), the right half [7,11] takes index 9 (77), and so on:

| Level | Indices | Count | Comparisons |
| --- | --- | --- | --- |
| 1 | 6 | 1 | 1 |
| 2 | 3, 9 | 2 | 2 |
| 3 | 1, 4, 7, 10 | 4 | 3 |
| 4 | 2, 5, 8, 11 | 4 | 4 |

$$
\mathrm{ASL}_{\text{succ}}=\frac{1\times1+2\times2+3\times4+4\times4}{11}=\frac{33}{11}=3
$$

Three comparisons on average instead of six. The tree shape depends on how `mid` is rounded; using `(low+high+1)/2` produces a different tree, but the ASL stays 3.

## Block search

Block search splits the table into blocks that are **ordered between blocks and unordered inside**. Every key in block $i$ is smaller than every key in block $i+1$. A separate index stores each block's maximum key and start address.

Split the 11 keys into blocks of 3:

| Block | Keys | Maximum | Start index |
| --- | --- | --- | --- |
| 1 | 6, 8, 14 | 14 | 1 |
| 2 | 23, 30, 45 | 45 | 4 |
| 3 | 51, 62, 77 | 77 | 7 |
| 4 | 88, 96 | 96 | 10 |

A search first locates the block in the index, then scans inside the block. With $b$ blocks of size $s$ and sequential search in both stages,

$$
\mathrm{ASL}_{\text{block}}=\frac{b+1}{2}+\frac{s+1}{2}
$$

Here $b=4$ and $s=3$, so $\mathrm{ASL}=2.5+2=4.5$, between sequential search at 6 and binary search at 3. A binary search over the index would cut the first term to about $\log_2 5\approx2.3$, giving roughly 4.3. The advantage of block search is that insertion and deletion only shift keys within one block instead of the whole table.

## Three common misconceptions

> [!MYTH] Binary search is always faster than sequential search.
> It needs sorted, contiguous data, and sorting has its own cost. For tiny $n$ the constant factors dominate, and a linked list cannot index a midpoint at all.

> [!MYTH] The decision tree is unique.
> Rounding `mid` down or up yields different shapes. The ASL is well defined once the splitting rule is fixed, but the tree is not.

> [!MYTH] ASL means the worst case.
> ASL is the average number of comparisons; the worst case is the tree height. For $n=11$, binary search has ASL 3 and worst case 4.

## Practice

> [!PRACTICE] 1 · Sequential cost
> A table has $n=20$ keys with equal probabilities. Give the average successful and unsuccessful comparison counts with a sentinel.
>
> > [!ANSWER] Show answer
> > Successful: $(20+1)/2=10.5$. Unsuccessful: $20+1=21$.

> [!PRACTICE] 2 · Move the midpoint
> For the 11-key table, if `mid` is `(low+high+1)/2`, which index is the root?
>
> > [!ANSWER] Show answer
> > $\lfloor(1+11+1)/2\rfloor=6$, so the root is still index 6; the difference appears in even-length ranges, for example [1,2] now takes 2 instead of 1.

> [!PRACTICE] 3 · Block cost
> A table has 1000 keys in blocks of 10, with sequential search in both the index and the block. What is the ASL?
>
> > [!ANSWER] Show answer
> > $b=100$, so $\mathrm{ASL}=(100+1)/2+(10+1)/2=50.5+5.5=56$.

## Formal statement

For a table of $n$ keys, let key $i$ have request probability $p_i$ and require $c_i$ comparisons. The average search length is $\mathrm{ASL}=\sum_{i=1}^{n}p_i c_i$, with a separate $\mathrm{ASL}_{\text{fail}}$ for unsuccessful queries.

The decision tree of binary search is a binary search tree: an inorder walk lists the keys in ascending order, each internal node is one successful comparison, and each external node represents a failure interval. A decision tree with $n$ internal nodes has height $\lceil\log_2(n+1)\rceil$, so the worst case is $O(\log n)$; with equal probabilities, $\mathrm{ASL}_{\text{succ}}\le\log_2(n+1)$. Block search pays for both the index lookup and the in-block scan; with equal probabilities, uniform blocks, and sequential search in both stages, choosing $s\approx\sqrt{n}$ gives the optimal $O(\sqrt{n})$ order.