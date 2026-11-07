---
slug: "replacement-selection-merge-tree"
subject: "data-structures"
unit: "u11"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 11 · Data Structures · Mastery"
title: "Replacement Selection and Optimal Merge Trees"
subtitle: "Grow long runs first, then merge them along the cheapest tree"
minutes: 16
meta: ["16 min read","Requires multiway merging","Mastery level"]
concepts: ["extsort","tree"]
prereq: ["extsort"]
related: ["sorting","complexity"]
---

## What you will get

By the end of this lecture you can use a memory buffer of three records to turn ten records into two runs longer than three, build a 3-way optimal merge tree for nine runs of unequal length, and compute the transfer counts of both merge schedules.

## Three lines back

- Replacement selection exploits one rule — nothing in the heap is smaller than the last output — to make each run grow past the buffer size.
- When initial runs differ in length, the order of merging changes the total volume of I/O.
- The optimal merge tree is a Huffman tree: short runs merge early, long runs sit near the root.

## Replacement selection

A plain internal sort reads $w$ records, sorts them, writes them back, and produces runs of length exactly $w$, so there are $\lceil n/w\rceil$ runs. **Replacement selection** instead keeps the $w$ records in a min-heap and, after each output, pulls one new record from the input stream:

- if the new record is not smaller than the value just emitted, it belongs to the current run and is inserted into the heap;
- if it is smaller, it belongs to the next run and is held aside.

When the heap empties, the current run ends and the held records are rebuilt into a heap for the next run.

Take $w=3$ and the input $51,19,63,24,80,7,46,92,33,58$:

| Step | Heap (candidates) | Output | Read | Action |
| --- | --- | --- | --- | --- |
| 1 | 19, 51, 63 | 19 | 24 | 24 ≥ 19, insert |
| 2 | 24, 51, 63 | 24 | 80 | 80 ≥ 24, insert |
| 3 | 51, 63, 80 | 51 | 7 | 7 < 51, hold aside |
| 4 | 63, 80 | 63 | 46 | 46 < 63, hold aside |
| 5 | 80 | 80 | 92 | 92 ≥ 80, insert |
| 6 | 92 | 92 | 33 | 33 < 92, hold aside |
| 7 | empty | — | — | run 1 ends |

Run 1 is $19,24,51,63,80,92$, length 6, twice the buffer size. The held values $7,46,33$ plus the incoming 58 form run 2: $7,33,46,58$, length 4. Ten records give only two runs, while the plain method needs $\lceil10/3\rceil=4$. On random input the average run length is about $2w$; if the input is nearly sorted, runs can be far longer than $2w$.

## The optimal merge tree

Suppose there are 9 initial runs of lengths $10,15,20,25,30,35,40,50,60$ and we merge 3 at a time. The merge tree is a $k$-ary tree whose leaves carry run lengths and whose internal nodes carry the length of the merged result; total I/O is proportional to the **weighted path length** of the tree.

Huffman's algorithm repeatedly takes the three smallest weights:

| Round | Three weights taken | Merged |
| --- | --- | --- |
| 1 | 10, 15, 20 | 45 |
| 2 | 25, 30, 35 | 90 |
| 3 | 40, 45, 50 | 135 |
| 4 | 60, 90, 135 | 285 |

The weighted path length equals the sum of all internal node weights:

$$
\mathrm{WPL}=45+90+135+285=555
$$

Balanced merging, which splits each level into three equal groups, gives three merges of 95 and then 285, so $\mathrm{WPL}=3\times95+285=570$. The Huffman schedule handles 15 fewer records.

A full $k$-ary Huffman tree needs every internal node to have exactly $k$ children, that is, $(m-1)\bmod(k-1)=0$. Here $m=9$ and $k=3$, so $(9-1)\bmod2=0$ and no padding is needed. With $m=8$, $(8-1)\bmod2=1$, so one zero-length **dummy run** must be added to reach 9 leaves; otherwise the deepest level is one child short.

## Counting transfers

One merge reads several runs, combines them, and writes the result. Records read equal the sum of the run lengths, and records written equal the same sum. Over the whole tree the total number of record transfers is therefore

$$
2\times\mathrm{WPL}
$$

| Schedule | WPL | Transfers during merging | Adding initial write-back and final read-in (285 each) |
| --- | --- | --- | --- |
| Balanced | 570 | 1140 | 1710 |
| Optimal merge tree | 555 | 1110 | 1680 |

The gap is 30 transfers, which looks small for a 285-record example; with thousands of runs of very different lengths, the I/O saved by a Huffman merge tree becomes substantial. Note that WPL counts only the merging phase. Producing the initial runs (285 writes) and reading the final result (285 reads) are identical for both schedules, so they cancel in the comparison.

## Three common misconceptions

> [!MYTH] The number of initial runs is always $\lceil n/w\rceil$.
> That is the outcome of internal sorting. Replacement selection produces runs longer than $w$, so the count drops sharply, with an average length near $2w$.

> [!MYTH] An optimal merge tree distributes runs evenly.
> Even distribution ignores run length. Huffman merges the shortest runs first, keeping them far from the root and long runs close to it, which is exactly what minimises the weighted path length.

> [!MYTH] Any internal node of a 3-way merge tree may have only two children.
> An optimal merge tree requires exactly $k$ children per internal node. When $(m-1)\bmod(k-1)\neq0$, dummy runs must be added.

## Practice

> [!PRACTICE] 1 · Estimate the run count
> Twenty records, buffer size 4, replacement selection. Roughly how many runs result?
>
> > [!ANSWER] Show answer
> > Average run length is about $2w=8$, so the count is near $20/8=2.5$, that is, 2 or 3 runs. Plain internal sorting would need $\lceil20/4\rceil=5$.

> [!PRACTICE] 2 · Pad with dummies
> How many dummy runs are needed to merge 8 runs 3 at a time?
>
> > [!ANSWER] Show answer
> > $(8-1)\bmod(3-1)=1$, one short, so add one zero-length dummy run to bring the leaf count to 9.

> [!PRACTICE] 3 · Count the transfers
> Three runs of lengths 5, 10, and 15 are merged 2 at a time. What are the WPL and the transfer count?
>
> > [!ANSWER] Show answer
> > Merge 5 and 10 into 15, then 15 and 15 into 30; $\mathrm{WPL}=15+30=45$ and transfers $=2\times45=90$.

## Formal statement

Replacement selection maintains a min-heap of capacity $w$. Let $L$ be the last value emitted; every heap element is at least $L$. On reading $x$, insert it if $x\ge L$, otherwise hold it for the next run. Each output is the heap minimum and updates $L$, so the current run is nondecreasing. The run ends when the heap empties. Every run except possibly the last has length at least $w$, and on random input the expected length is about $2w$.

The optimal merge tree is a $k$-ary Huffman tree over weighted leaves, minimising $\mathrm{WPL}=\sum_{i} w_i\ell_i$, where $\ell_i$ is the number of edges from leaf $i$ to the root. Optimality of the greedy choice follows by an exchange argument. Total record transfers equal $2\,\mathrm{WPL}$ for the merging phase, because each internal node reads and writes the total size of its subtree once.