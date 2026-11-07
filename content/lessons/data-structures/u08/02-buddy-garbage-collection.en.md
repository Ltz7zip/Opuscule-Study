---
slug: "buddy-garbage-collection"
subject: "data-structures"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 8 · Data Structures · Mastery"
title: "Buddy Systems and Garbage Collection"
subtitle: "Split by powers of two, reclaim by reachability"
minutes: 16
meta: ["16 min read","Requires free-block management","Mastery level"]
concepts: ["dynstorage","list"]
prereq: ["dynstorage"]
related: ["list","arraygen"]
---

## What you will get

You will be able to compute buddy addresses by hand, follow one split and one cascading merge, and use reference counting and mark-sweep to decide which cells are garbage and what each method misses.

## Three lines back

- A buddy system allocates only $2^k$-word blocks; a request is rounded up to a power of two.
- Two buddy blocks differ in exactly one address bit, so merging needs no search of the free list.
- Garbage is memory the program can no longer reach but still occupies; finding it requires reachability from the roots.

## Splitting and merging in a buddy system

Let the heap start at address 0 with total size $2^K$. For a block of size $2^k$ at address $a$, the **buddy** is

$$
\mathrm{buddy}(a)=a\oplus 2^k
$$

Equivalently, if $a/2^k$ is even the buddy lies at $a+2^k$, and if it is odd the buddy lies at $a-2^k$. A request of $s$ words first sets $k=\lceil\log_2 s\rceil$; if no free $2^k$ block exists, larger blocks are halved repeatedly.

Take a 1024-word heap and request $A=100$, $B=60$, $C=30$ in that order:

| Request | Rounded size | Splitting | Address | Free blocks left |
| --- | --- | --- | --- | --- |
| $A=100$ | 128 | 1024→512→256→128 | 0 | 128@128, 256@256, 512@512 |
| $B=60$ | 64 | 128@128→64+64 | 128 | 64@192 |
| $C=30$ | 32 | 64@192→32+32 | 192 | 32@224 |

The `@` notation gives the block's start address. The heap now has no large block; the three free blocks are only 32, 256, and 512 words.

Now free $A$, then $B$, then $C$. Freeing $A$ cannot merge because its buddy [128,256) still contains $B$ and $C$. Freeing $B$ cannot merge either, since its buddy [192,256) still contains $C$. Freeing $C$ starts a cascade:

1. [192,224) merges with its buddy [224,256) into a 64-word block [192,256);
2. that block merges with its buddy [128,192) into 128 words [128,256);
3. it merges with [0,128) into 256 words [0,256);
4. it merges with [256,512) into 512 words, then with [512,1024) into the whole 1024.

One free triggers four merges and the heap is restored. A buddy allocator checks only the single block obtained by XOR, unlike boundary tags which inspect both neighbours.

## Reference counting

**Reference counting** gives every cell a counter for the number of pointers aimed at it. Creating a pointer increments the counter, deleting one decrements it; at zero the cell is reclaimed immediately and the counters of all its children are decremented, possibly causing a chain reaction.

| Cell | Pointed to by | Count | Reclaimed? |
| --- | --- | --- | --- |
| 2 | 1 | 1 | No |
| 3 | 1 | 1 | No |
| 6 | 7 | 1 | No |
| 7 | 6 | 1 | No |
| 8 | nothing | 0 | Yes |

The method reclaims promptly and needs no global pause, but **cyclic references** never reach zero. In the table, 6 and 7 point at each other while no root reaches either; both counts stay 1 and the cells occupy space forever. Every pointer assignment also pays counter maintenance, so the cost is spread across the whole run.

## Mark and sweep

**Mark-sweep** makes two passes. The first starts from the root set and runs DFS or BFS, setting a mark bit on every reachable cell. The second scans the heap linearly; unmarked cells are garbage and go back to the free list.

Suppose the heap has 8 cells, the roots are 1 and 4, and the pointers are $1\to2$, $1\to3$, $2\to4$, $3\to5$, $6\to7$, $7\to6$, with cell 8 unreferenced.

| Phase | Process | Result |
| --- | --- | --- |
| Mark | From 1 visit 1,2,3,4,5; from 4 nothing new | Marked {1,2,3,4,5} |
| Sweep | Scan 1 through 8, reclaim unmarked | Reclaim {6,7,8} |

The 6-7 cycle is detected correctly because reachability, not counting, decides. The price is that marking touches every reachable cell and sweeping touches the whole heap, so time is proportional to heap size. Holes left behind are still external fragmentation and need a compaction pass.

> [!NOTE]
> Reference counting asks how many point at me; mark-sweep asks whether a root can reach me. The first is local information, the second global, and that difference explains their behaviour on cycles.

## Three common misconceptions

> [!MYTH] A buddy is just an adjacent block.
> Adjacent does not imply buddy. The buddy is fixed by XOR with the block size; only equal-sized halves of the same parent may merge.

> [!MYTH] Only cells with count zero are garbage.
> Count zero certainly means garbage, but garbage need not have count zero. A cycle can keep every count positive forever.

> [!MYTH] Mark-sweep removes fragmentation.
> It reclaims cells without moving survivors, so holes remain. Removing external fragmentation requires mark-compact or copying collection.

## Practice

> [!PRACTICE] 1 · Find the buddy
> In a heap starting at 0, a block at address 320 has size 64. What is its buddy's start address?
>
> > [!ANSWER] Show answer
> > $320\oplus64=256$. Check: $320/64=5$ is odd, so the buddy lies at $320-64=256$, matching the XOR.

> [!PRACTICE] 2 · Round the request
> How much does a buddy system allocate for requests of 200 and 65 words?
>
> > [!ANSWER] Show answer
> > $2^7=128<200\le256=2^8$, so 256 words; $2^6=64<65\le128$, so 128 words. Internal fragmentation is 56 and 63 words.

> [!PRACTICE] 3 · Reclaim a cycle
> Cells satisfy $a\to b$, $b\to c$, $c\to a$ and no root points to any of them. What do reference counting and mark-sweep do?
>
> > [!ANSWER] Show answer
> > All three counts equal 1, so reference counting reclaims nothing; mark-sweep marks none of them and reclaims all three.

## Formal statement

A buddy system's state is a set of disjoint blocks, each a power of two in size and aligned to its size. Allocation with $k=\lceil\log_2 s\rceil$ picks the smallest free block of size $2^j$, $j>k$, and halves it until a $2^k$ block appears. Deallocation repeatedly tests whether $\mathrm{buddy}(a)=a\oplus2^k$ is free and of the same size; if so the two merge and $k$ increases. The XOR property guarantees at most one merge per level, so a single free costs $O(\log M)$.

Mark-sweep is correct because the root set contains every directly accessible cell and the mark phase follows all pointers, so the marked set is exactly the reachable set. Unmarked cells are therefore unreachable and can be reclaimed without changing future program behaviour. Its time is $O(R)$ for $R$ reachable cells plus $O(M)$ for the heap scan, and its space overhead is one mark bit per cell.