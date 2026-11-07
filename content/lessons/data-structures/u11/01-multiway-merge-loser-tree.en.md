---
slug: "multiway-merge-loser-tree"
subject: "data-structures"
unit: "u11"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 11 · Data Structures · Mastery"
title: "Multiway Balanced Merging and Loser Trees"
subtitle: "Fewer passes over disk, fewer comparisons in memory"
minutes: 16
meta: ["16 min read","Requires internal sorting","Mastery level"]
concepts: ["extsort","sorting","complexity"]
prereq: ["sorting"]
related: ["complexity","extsort"]
---

## What you will get

You will be able to derive the initial run count, the number of merge passes, and the record transfer count from the record count, buffer size, and merge width, and to explain why a loser tree cuts the comparisons per output from $k-1$ to $\lceil\log_2 k\rceil$.

## Three lines back

- External sorting has two stages: build sorted runs in memory, then merge them into one file.
- The number of passes follows from the run count $m$ and the width $k$: $s=\lceil\log_k m\rceil$.
- Every pass reads and writes all records once, so fewer passes mean less disk I/O.

## External sorting and the pass count

Suppose a file has $n$ records and the memory buffer holds $w$ records. In the first stage, replacement selection or internal sorting reads $w$ records at a time, sorts them, and writes them back, producing $m=\lceil n/w\rceil$ initial runs. In the second stage, $k$ runs are merged into one per pass until a single run remains.

If each pass reduces the run count by a factor of $k$, then

$$
s=\left\lceil\log_k m\right\rceil
$$

Take $n=10000$ and $w=100$, so $m=100$. With $k=5$, since $5^2=25<100\le125=5^3$, we get $s=3$; with $k=10$, $10^2=100$, so $s=2$. Each pass reads and writes all 10000 records, which is 20000 record transfers:

| Width $k$ | Runs $m$ | Passes $s$ | Merge transfers $2ns$ | Including initial write and final read $2n(s+1)$ |
| --- | --- | --- | --- | --- |
| 5 | 100 | 3 | 60000 | 80000 |
| 10 | 100 | 2 | 40000 | 60000 |

A larger width means fewer passes and less disk traffic, but $k$ is limited by the number of input buffers, and selecting the smallest among $k$ run heads becomes more expensive per record. That is exactly where the loser tree helps.

## The loser tree

A **loser tree** is a complete binary tree whose leaves are the current heads of the $k$ runs. Each internal node stores the **loser** of the comparison between its two children, while the winner moves upward, and the overall champion is kept just outside the root. After outputting the champion, only its leaf is replaced by the next record of that run, and the path to the root is replayed.

The tree height is $\lceil\log_2 k\rceil$, so each output costs $\lceil\log_2 k\rceil$ comparisons. A linear scan over all $k$ heads costs $k-1$:

| Width $k$ | Linear minimum | Loser tree | Saved per record |
| --- | --- | --- | --- |
| 5 | 4 | 3 | 1 |
| 8 | 7 | 3 | 4 |
| 16 | 15 | 4 | 11 |

For 10000 records and $k=5$, linear scanning needs $4\times10000=40000$ comparisons while the loser tree needs $3\times10000=30000$, saving 10000. Winner trees also achieve $O(\log k)$; the difference is that a loser tree stores only losers, so a replay never has to read the sibling's value, saving one memory access.

```c
/* ls[t] holds the losing run; b[0..k-1] are heads, b[k] is the champion */
void Adjust(int s) {
    int t = (s + k) / 2;              /* parent of leaf s */
    while (t > 0) {
        if (b[s] > b[ls[t]]) { int tmp = s; s = ls[t]; ls[t] = tmp; }
        t /= 2;                        /* loser stays, winner climbs */
    }
    ls[0] = s;
}
```

## A five-way merge

Take five runs:

| Run | Records |
| --- | --- |
| R1 | 12, 25, 48, 90 |
| R2 | 8, 33, 60, 77 |
| R3 | 15, 20, 55, 82 |
| R4 | 5, 40, 66, 95 |
| R5 | 18, 30, 50, 70 |

The initial heads are $12,8,15,5,18$. Building the tree takes 4 comparisons and the champion is 5 from R4. After output, R4's head becomes 40 and the path is replayed with 3 comparisons:

| Output | Winning run | New head | Comparisons this record |
| --- | --- | --- | --- |
| 5 | R4 | 40 | 3 |
| 8 | R2 | 33 | 3 |
| 12 | R1 | 25 | 3 |
| 15 | R3 | 20 | 3 |
| 18 | R5 | 30 | 3 |
| 20 | R3 | 55 | 3 |

Continuing gives $5,8,12,15,18,20,25,30,33,40,48,50,55,60,66,70,77,82,90,95$. The 20 records cost $20\times3=60$ comparisons, plus 4 to build the tree, for 64; a linear scan would need $20\times4=80$.

## Three common misconceptions

> [!MYTH] A larger merge width is always better.
> Width is limited by available input buffers. Each record also costs $\log k$ comparisons as $k$ grows, and more buffers are needed, so the choice is a trade-off.

> [!MYTH] Internal nodes of a loser tree store winners.
> They store losers; winners climb, and the champion is kept outside the root. That is why a replay only compares against the losers on the path.

> [!MYTH] The pass count is $m/k$.
> Each pass divides the run count by $k$, so the count is $\lceil\log_k m\rceil$, not a single division.

## Practice

> [!PRACTICE] 1 · Count passes
> One million records, a buffer of 1000 records, and 10-way merging. How many passes, and how many record transfers in the merge stage?
>
> > [!ANSWER] Show answer
> > $m=10^6/10^3=1000$, so $s=\lceil\log_{10}1000\rceil=3$ passes; transfers are $2\times10^6\times3=6\times10^6$.

> [!PRACTICE] 2 · Count comparisons
> An 8-way merge outputs 5000 records. Compare the loser tree with a linear scan.
>
> > [!ANSWER] Show answer
> > The loser tree needs $\log_2 8=3$ comparisons per record, or 15000; the linear scan needs 7 per record, or 35000.

> [!PRACTICE] 3 · Tree height
> How many internal levels does a 5-way loser tree need to decide the champion?
>
> > [!ANSWER] Show answer
> > $\lceil\log_2 5\rceil=3$ levels, so at most 3 comparisons per output.

## Formal statement

With $m$ initial runs and width $k$, one pass turns $k$ runs into one, so after $s$ passes the count is $\lceil m/k^s\rceil$. Setting this to 1 gives $s=\lceil\log_k m\rceil$. Each pass reads and writes all $n$ records once, so the merge stage costs $2ns$ transfers, and $2n(s+1)$ including the initial run write and the final read.

A loser tree has $k$ leaves and $k-1$ internal nodes, with height $\lceil\log_2 k\rceil$. Updating a leaf compares once per level on the path to the root, so one adjustment costs $O(\log k)$, and building the tree costs $k-1$ comparisons. The total is $(k-1)+n_{\text{out}}\lceil\log_2 k\rceil$, better than the $n_{\text{out}}(k-1)$ of a linear scan.