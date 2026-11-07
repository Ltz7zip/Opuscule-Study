---
slug: "free-list-allocation"
subject: "data-structures"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 8 · Data Structures · Mastery"
title: "Free Lists and Allocation Strategies"
subtitle: "How free blocks queue up, and where fragmentation comes from"
minutes: 15
meta: ["15 min read","Requires sequential storage","Mastery level"]
concepts: ["dynstorage","list","arraygen"]
prereq: ["arraygen"]
related: ["list","dynstorage"]
---

## What you will get

You will be able to describe the structure of a free list, compare first fit, best fit, and worst fit on a concrete workload, and use boundary tags to merge adjacent free blocks with only a constant number of checks.

## Three lines back

- Dynamic storage management must both allocate and reclaim, and reclaimed blocks must become allocatable again.
- Free blocks themselves need space, so they are linked into a **free list**.
- The allocation policy chooses a block; the coalescing policy decides whether fragmentation keeps growing.

## Free lists and three fit strategies

A **free list** chains all free blocks in some order. Its head stores only a pointer; each free block records its length and may carry forward and backward links. On allocation the policy picks a block; if it is larger than the request, the excess is split off and returned to the list.

| Policy | Selection rule | Strength | Weakness |
| --- | --- | --- | --- |
| First fit | First block from the head that is large enough | Fast scan, low addresses used first | Small holes collect at low addresses; large blocks get split |
| Best fit | Smallest block that still fits | Leaves the smallest remainder | Must scan the whole list; breeds tiny fragments |
| Worst fit | Largest block available | Remainder stays large and reusable | Large blocks are consumed quickly |

For a request $s$ and a chosen block $S$, the remainder is $S-s$. If that remainder is below the minimum block size, splitting is pointless: the whole block is handed out and the difference becomes **internal fragmentation**. Gaps between blocks that cannot be used are **external fragmentation**.

## Boundary tags

A boundary-tag allocator writes the block size and a flag at both the **head** and the **tail** of every block. The tail copy is what makes neighbour lookup constant time in both directions:

$$
\mathrm{next}=p+\mathrm{size}(p),\qquad \mathrm{prev}=p-\mathrm{size}(p-1)
$$

Here $p$ is the block address and sizes are counted in words. A flag `tag` equal to 0 means free, 1 means allocated. The header can be declared as:

```c
typedef struct {
    int size;   /* total words, including head and tail tags */
    int tag;    /* 0 free, 1 allocated */
    struct Block *fwd, *bwd;  /* used only while free */
} Head;
```

Freeing block $p$ has four cases: both neighbours allocated, insert directly; left free and right allocated, merge left; left allocated and right free, merge right; both free, fuse all three. The test reads the `tag` of the next block and the tail tag at $p-1$. After merging, the new head and tail sizes are rewritten and the absorbed blocks are unlinked. This is constant work, independent of how many free blocks exist.

> [!NOTE]
> Merging is not about finding neighbours; it is about knowing whether they are free. The tail tag makes the backward lookup $O(1)$ as well.

## A walk through a 1024-word heap

Let the heap be $[0,1024)$ with one free block. Allocate $P_1=200$, $P_2=100$, $P_3=300$, $P_4=150$ from low addresses:

| Block | Interval | Size |
| --- | --- | --- |
| $P_1$ | [0,200) | 200 |
| $P_2$ | [200,300) | 100 |
| $P_3$ | [300,600) | 300 |
| $P_4$ | [600,750) | 150 |
| Free | [750,1024) | 274 |

Now free $P_1$ and $P_2$. They are adjacent, so boundary tags fuse them into one 300-word block [0,300) instead of leaving two small ones. The free list is now [0,300) and [750,1024).

Next request $P_5=90$, then $P_6=200$. The policies diverge:

| Policy | $P_5$ start | Free blocks after $P_5$ | $P_6$ start | Free blocks after $P_6$ |
| --- | --- | --- | --- | --- |
| First fit | 0 | [90,300) 210; [750,1024) 274 | 90 | [290,300) 10; [750,1024) 274 |
| Best fit | 750 | [0,300) 300; [840,1024) 184 | 90 | [290,300) 10; [840,1024) 184 |
| Worst fit | 0 | [90,300) 210; [750,1024) 274 | 90 | [290,300) 10; [750,1024) 274 |

Best fit takes 274 rather than 300 for $P_5$ because 274 is closer to 90, leaving 184 instead of 210; the price is cutting the only 274-word block. By $P_6$ only the 210-word block fits, so all three policies agree again. Policy differences depend on the current shape of the free list, not on a universal ranking.

## Three common misconceptions

> [!MYTH] Best fit minimizes fragmentation.
> It minimizes only this round's remainder. Over time it produces many tiny blocks that are hard to reuse, so external fragmentation can get worse.

> [!MYTH] Freeing a block just means pushing it onto the free list.
> Without coalescing, external fragmentation accumulates. Boundary tags exist so that a freed block merges with free neighbours immediately.

> [!MYTH] A size field in the header is enough to find the previous block.
> With only a header, the previous neighbour requires scanning the list. A tail copy of the size is what makes backward lookup $O(1)$.

## Practice

> [!PRACTICE] 1 · Compute addresses
> Block $p$ starts at 600 with `size` 150. Where does the next block start, and what happens if its `tag` is 0 when $p$ is freed?
>
> > [!ANSWER] Show answer
> > The next block starts at $600+150=750$. Since it is free, the two merge into one free block at 600 with length $150+274=424$.

> [!PRACTICE] 2 · Pick a policy
> Free blocks are 64, 128, 256, 512 and the request is 100. Which block does each policy choose?
>
> > [!ANSWER] Show answer
> > First fit and best fit both choose 128; worst fit chooses 512. The first two coincide here, while worst fit cuts the largest block.

> [!PRACTICE] 3 · Internal fragmentation
> A request of 90 words selects a 100-word block, and the minimum splittable remainder is 12 words. How much is allocated?
>
> > [!ANSWER] Show answer
> > The remainder $100-90=10$ is below 12, so the block is not split. All 100 words are allocated and 10 words become internal fragmentation.

## Formal statement

Let the heap be the address interval $[0,M)$ and describe a block by $(p,S,t)$ with $t\in\{0,1\}$. Boundary tags store $S$ and $t$ at both ends, so neighbours are found in constant time: $\mathrm{next}(p)=p+S$ and $\mathrm{prev}(p)=p-S'$, where $S'$ comes from the tail tag at $p-1$.

Allocation selects a free block with $S\ge s$ according to the policy. If $S-s\ge\delta$, the minimum block threshold, the block splits into $s$ and $S-s$; otherwise it is handed out whole. Deallocation inspects the `tag` of both neighbours and merges according to the four cases, the new length being the sum of the merged lengths. Each merge removes at least one free block, so $n$ allocations and frees cause at most $O(n)$ merges in total; apart from the policy scan, the amortized cost per operation is $O(1)$.