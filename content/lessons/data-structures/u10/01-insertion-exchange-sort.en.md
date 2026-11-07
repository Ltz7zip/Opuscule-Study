---
slug: "insertion-exchange-sort"
subject: "data-structures"
unit: "u10"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 10 · Data Structures · Mastery"
title: "Insertion and Exchange Sorts"
subtitle: "One array, four different walks"
minutes: 17
meta: ["17 min read","Requires sequential lists","Mastery level"]
concepts: ["sorting","complexity"]
prereq: ["list"]
related: ["complexity","sorting"]
---

## What you will get

You will be able to run direct insertion, binary insertion, Shell sort, bubble sort, and quicksort on the array 49, 38, 65, 97, 76, 13, 27, 49, and to compare their comparison counts, movement counts, and stability.

## Three lines back

- Insertion sorts maintain a sorted prefix and place each new key into its correct position.
- Exchange sorts remove inversions by swapping: bubble sort removes adjacent ones, quicksort removes inversions across a pivot.
- Time complexity describes growth; stability describes whether equal keys keep their relative order.

## Direct and binary insertion

**Direct insertion sort** splits the array into a sorted prefix and an unsorted suffix. It takes the first suffix key $k$, scans the prefix from the right, and shifts every larger key one slot right:

```c
void InsertSort(int A[], int n) {
    for (int i = 2; i <= n; ++i) {
        if (A[i] < A[i-1]) {
            A[0] = A[i];                 /* sentinel */
            int j = i - 1;
            while (A[j] > A[0]) { A[j+1] = A[j]; --j; }
            A[j+1] = A[0];
        }
    }
}
```

The eight-key run:

| Pass | Key inserted | Array after insertion |
| --- | --- | --- |
| 1 | 38 | 38, 49 |
| 2 | 65 | 38, 49, 65 |
| 3 | 97 | 38, 49, 65, 97 |
| 4 | 76 | 38, 49, 65, 76, 97 |
| 5 | 13 | 13, 38, 49, 65, 76, 97 |
| 6 | 27 | 13, 27, 38, 49, 65, 76, 97 |
| 7 | 49 | 13, 27, 38, 49, 49, 65, 76, 97 |

The key comparisons per pass are $1,1,1,2,5,6,4$, for a total of 20. **Binary insertion sort** changes only the search for the position: it uses binary search, cutting comparisons to $O(n\log n)$. Movements remain $O(n^2)$, so the overall bound is unchanged; choosing the rightmost equal position keeps the sort stable.

## Shell sort: insertion by gaps

**Shell sort** uses a decreasing gap sequence $d_1>d_2>\dots>d_t=1$. Each pass insertion-sorts the subsequences of elements $d$ apart. Large gaps move keys long distances and remove many inversions early; the final pass with $d=1$ sees an almost sorted array and costs little.

With gaps 4, 2, 1:

| Gap | Subsequences | Sorted groups | Whole array |
| --- | --- | --- | --- |
| 4 | (49,76), (38,13), (65,27), (97,49) | (49,76), (13,38), (27,65), (49,97) | 49, 13, 27, 49, 76, 38, 65, 97 |
| 2 | (49,27,76,65), (13,49,38,97) | (27,49,65,76), (13,38,49,97) | 27, 13, 49, 38, 65, 49, 76, 97 |
| 1 | all | direct insertion | 13, 27, 38, 49, 49, 65, 76, 97 |

The running time depends on the gap sequence. The sequence $d_k=2^{t-k+1}-1$ gives about $O(n^{1.5})$, the commonly quoted empirical bound is $O(n^{1.3})$, and the worst case is still $O(n^2)$. Shell sort is **unstable**: equal keys may fall into different subsequences, and moving across subsequences changes their relative order.

## Exchange sorts: bubble and quicksort

**Bubble sort** compares adjacent keys and swaps inversions, pushing the current maximum to the end each pass. The first pass is

$$
49,38,65,97,76,13,27,49 \;\to\; 38,49,65,76,13,27,49,97
$$

with 7 comparisons and 5 swaps. If a pass performs no swap, the array is sorted and the algorithm can stop early. Sorting all eight keys takes 28 comparisons and 15 swaps.

**Quicksort** picks a pivot, partitions smaller keys to its left and larger ones to its right, then recurses. With the first key 49 as pivot and two pointers filling from both ends, the pivot lands at index 4 after the first partition:

$$
27,38,13,\;49,\;76,97,65,49
$$

The left part $[27,38,13]$ is partitioned around 27 into $13,27,38$; the right part $[76,97,65,49]$ is partitioned around 76 into $49,65,76,97$. The final array is $13,27,38,49,49,65,76,97$. The two 49s happen to keep their original order, but that is a coincidence, not a guarantee.

| Algorithm | Average | Worst | Best | Extra space | Stable |
| --- | --- | --- | --- | --- | --- |
| Direct insertion | $O(n^2)$ | $O(n^2)$ | $O(n)$ | $O(1)$ | Yes |
| Binary insertion | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Yes |
| Shell | $O(n^{1.3})$ | $O(n^2)$ | $O(n\log n)$ | $O(1)$ | No |
| Bubble | $O(n^2)$ | $O(n^2)$ | $O(n)$ | $O(1)$ | Yes |
| Quicksort | $O(n\log n)$ | $O(n^2)$ | $O(n\log n)$ | $O(\log n)$ | No |

Quicksort's worst case occurs when every partition is extremely unbalanced, for example an already ascending array with the first key as pivot. Recursion then has depth $n-1$ and the cost is $O(n^2)$. Random pivots or the median-of-three rule make this case very unlikely.

## Three common misconceptions

> [!MYTH] Binary insertion is an order of magnitude faster than direct insertion.
> It only reduces comparisons. Movements stay the same, and movements are what make the algorithm quadratic.

> [!MYTH] Quicksort is $O(n\log n)$ even in the worst case.
> Unbalanced partitions give $O(n^2)$. Its strength is the average case and in-place operation, not a worst-case guarantee.

> [!MYTH] Stable sorts are always slower.
> Stability and complexity are independent. Bubble sort is stable and quadratic, merge sort is stable and $O(n\log n)$, and quicksort is unstable yet $O(n\log n)$ on average.

## Practice

> [!PRACTICE] 1 · Count comparisons
> How many key comparisons does direct insertion sort perform on 49, 38, 65, 97, 76, 13, 27, 49?
>
> > [!ANSWER] Show answer
> > The passes use $1,1,1,2,5,6,4$ comparisons, totaling 20. The closer the input is to sorted, the fewer comparisons are needed.

> [!PRACTICE] 2 · Degenerate partition
> Take the first key as pivot on an already ascending array of 8 keys. What are the two part sizes after the first partition?
>
> > [!ANSWER] Show answer
> > The pivot is the minimum, so the left part has size 0 and the right part size 7. Each level removes one key, giving $7+6+\dots+1=28$ comparisons.

> [!PRACTICE] 3 · Stability check
> After Shell sort, which of the two 49s comes first?
>
> > [!ANSWER] Show answer
> > It is not guaranteed. With gap 4 the second 49 shares a group with 97 and may move ahead of the first 49, so Shell sort is unstable.

## Formal statement

The direct insertion invariant: before pass $i$, $A[1..i-1]$ is sorted in nondecreasing order and is a permutation of the first $i-1$ input keys. Inserting $A[i]$ into its correct place preserves the invariant. Comparisons range from $n-1$ on sorted input to $\sum_{i=2}^{n}i=n(n-1)/2$ on reversed input, and movements are of the same order.

The quicksort partition invariant: everything left of `low` is at most the pivot and everything right of `high` is at least the pivot; when `low == high`, the pivot belongs at that position. If the parts have sizes $k$ and $n-1-k$, then $T(n)=T(k)+T(n-1-k)+\Theta(n)$, giving $O(n\log n)$ on average and $O(n^2)$ in the worst case. The recursion stack is $O(\log n)$ deep on average and $O(n)$ in the worst case.