---
slug: "segmentation-segpages"
subject: "operating-systems"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 8 · Operating Systems · Mastery"
title: "Segmentation and Segmented Paging"
subtitle: "Cut by logic or cut by physics"
minutes: 16
meta: ["16 min read","Requires paged memory management","Mastery level"]
concepts: ["memmgmt","memhier"]
prereq: ["memmgmt"]
related: ["virtmem","cache"]
---

## What you will get

By the end of this lecture you can translate an address through a segment table with bounds checking, explain why segments share more naturally than pages, reproduce the six-point comparison between paging and segmentation, and count the tables a segmented-paging reference touches.

## Three lines back

- Paging cuts physically into equal pieces invisible to the user; segmentation cuts logically into unequal units the user can name.
- A segment-table entry holds a base and a length, and every translation must check the bound first.
- Segmented paging layers the two: split logically into segments, then page each segment, so addresses become triples.

## Segmentation: dividing by logical unit

**Segmentation** divides a process along program structure: main program, subroutines, data, stack. Each segment has a name and a length and is addressed from 0. The logical address is a pair $(s, d)$ with segment number $s$ and offset $d$.

Each process has a **segment table** whose entries hold the segment number, length, and base. The rule is

$$\text{if } d \ge \text{length}(s) \Rightarrow \text{bounds fault};\qquad PA=\text{base}(s)+d$$

Take a segment table with segment 0 base 1000 length 800, segment 1 base 2000 length 500, segment 2 base 3500 length 1200, segment 3 base 5000 length 400.

| Logical address | Check | Physical address |
| --- | --- | --- |
| (1, 120) | $120<500$, valid | $2000+120=2120$ |
| (2, 120) | $120<1200$, valid | $3500+120=3620$ |
| (1, 600) | $600\ge500$, fault | Bounds interrupt |
| (3, 399) | $399<400$, valid | $5000+399=5399$ |

Bounds checking is segmentation's distinctive value. Because the length is explicit, any offset past the end is caught during translation instead of quietly overwriting someone else's data.

## Sharing and protection for segments

Page-level sharing works in page units, so sharing something smaller than a page drags in the whole page and the boundary does not match the program. Segment sharing follows program structure: a shared subroutine becomes one segment with one copy for many processes.

Suppose an editor has a 160 KB code segment and 40 KB of private data per user, with 40 concurrent users. Without sharing the cost is

$$40\times(160+40)=8000\ \text{KB}$$

With the code segment shared it is

$$160+40\times40=1760\ \text{KB}$$

a saving of $8000-1760=6240$ KB, about 6.1 MB. A shared-segment table records segment number, length, start, a reference count, and access bits.

Protection has two layers: the bounds check stops access beyond the segment, and access bits (read, write, execute) stop unauthorized operations. A pure code segment gets read and execute, a data segment read and write, and processes sharing one segment may hold different rights in their own tables.

## Paging versus segmentation

| Dimension | Paging | Segmentation |
| --- | --- | --- |
| Division basis | Physical, equal size | Logical, unequal size |
| Visible to user | No | Yes, with names and lengths |
| Address form | One-dimensional $(P, W)$ | Two-dimensional $(s, d)$ |
| Fragmentation | Internal | External |
| Sharing and protection | Per page, coarse | Per segment, natural |
| Table entry | Frame number | Base plus length |

**Segmented paging** segments first and pages each segment. Every segment has its own page table, and the segment-table entry records the segment number, the page-table length, and the page-table base. The logical address is a triple $(s, p, w)$.

Translation takes three steps: the segment table yields the page-table base, the page table yields the frame number, and the physical address is assembled as

$$PA=b\times L+w$$

With 1 KB pages, a logical address of segment 2, page 3, offset 100, and a page table for segment 2 mapping page 0 to frame 7, page 1 to frame 9, page 2 to frame 2, page 3 to frame 11:

$$PA=11\times1024+100=11264+100=11364$$

The cost is memory references: segment table, page table, and data - three, or one on a hit. With $t_m=100$ ns, no TLB gives $EAT=3t_m=300$ ns, while a 0.9 hit rate and a 10 ns TLB give $0.9\times110+0.1\times310=130$ ns.

> [!NOTE]
> Segmented paging combines logical convenience for sharing and protection with the absence of external fragmentation. The price is more tables and a longer translation path.

## Three common misconceptions

> [!MYTH] Segmentation is newer, so it should replace paging.
> They solve different problems: paging removes external fragmentation, segmentation matches program structure; real systems combine them or use permission bits.

> [!MYTH] A segment can grow freely.
> Segments must be contiguous, so growth may collide with a neighbour and require moving or swapping - the practical difficulty of segmentation.

> [!MYTH] Segmented paging needs three table lookups per reference, so it is unusable.
> That is the no-TLB worst case; a TLB hit needs one memory reference, with the tables as fallback.

## Practice

> [!PRACTICE] 1 · Translate
> Segment table: segment 0 base 500 length 300; segment 1 base 1200 length 900. Evaluate (0, 299), (1, 900), (0, 300).
>
> > [!ANSWER] Show answer
> > (0, 299): $299<300$, so $500+299=799$. (1, 900): $900\ge900$, bounds fault. (0, 300): $300\ge300$, bounds fault.

> [!PRACTICE] 2 · Compute
> A shared library is 2 MB and used by 60 processes, each with 64 KB of private data. Find memory use with and without sharing.
>
> > [!ANSWER] Show answer
> > Without sharing: $60\times(2048+64)=126{,}720$ KB, about 123.75 MB. With sharing: $2048+60\times64=5888$ KB, about 5.75 MB.

## Formal statement

In segmented storage a process is divided along logical structure into segments of unequal length. The logical address is a pair $(s,d)$ and each segment-table entry holds a length and a base; when $d$ is not less than the length a bounds interrupt occurs, otherwise the physical address is the base plus $d$. In segmented paging each segment is further divided into pages of fixed size $L$, the logical address is a triple $(s,p,w)$, the segment table yields the base of that segment's page table and $p$ is checked against the page-table length, then the page table yields frame number $b$ and the physical address is $bL+w$. Without a TLB, one access requires three memory references.