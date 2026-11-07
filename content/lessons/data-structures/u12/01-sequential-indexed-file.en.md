---
slug: "sequential-indexed-file"
subject: "data-structures"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 12 · Data Structures · Mastery"
title: "Sequential, Indexed, and Indexed-Sequential Files"
subtitle: "Same 1000 records, three search costs spanning a factor of 40"
minutes: 16
meta: ["16 min read","Requires searching and sorting","Mastery level"]
concepts: ["filedata","search"]
prereq: ["search"]
related: ["filedata","sorting"]
---

## What you will get

By the end of this lecture you can explain how the three file organisations differ on disk, compute average comparison counts for 1000 records with 10 per block, and say why an indexed-sequential file needs an overflow area.

## Three lines back

- A file is a collection of records on external storage, and the unit of access is a block, not a record.
- A sequential file stores records in arrival order, so a lookup scans from the start and reads half the file on average.
- An index stores key-to-address pairs as a separate table, trading space for search time.

## Sequential files

A **sequential file** is the simplest organisation: records sit in the order they entered the file, record $i+1$ immediately follows record $i$, and logical order equals physical order. One variant sorts records by key and supports binary search; the other keeps insertion order and supports only a scan.

With $n$ records, finding the $i$-th means reading the first $i-1$, so a successful search costs on average

$$
\mathrm{ASL}_{\text{seq}}=\frac{1}{n}\sum_{i=1}^{n} i=\frac{n+1}{2}
$$

For $n=1000$ this is $500.5$. Even when each read brings a block of 10 records, the search still touches about $50.5$ blocks. They are excellent for bulk reads but poor for random lookups, insertions, and deletions, which shift large amounts of data.

## Indexed files

An **indexed file** consists of two files: a data file holding records in arbitrary positions, and an index file holding one entry per record, each entry a key together with the physical address of that record. Index entries are much smaller than records, so the index can stay in memory; a lookup finds the address and then reads the data once.

When the index is sorted by key, binary search applies. With 1000 entries:

$$
\lceil \log_2(1000+1)\rceil = 10
$$

plus one access to fetch the record, for 11 total. The price is index space: at 16 bytes per entry, 1000 entries occupy 16 KB.

| Organisation | Data sorted | Search basis | Cost for 1000 records |
| --- | --- | --- | --- |
| Sequential, unsorted | no | linear scan | 500.5 comparisons |
| Sequential, sorted | yes | binary search | 10 comparisons, but insertion shifts data |
| Indexed | no | binary search on dense index | 10 comparisons + 1 data access |

An indexed file decouples placement from logical order: records can be appended anywhere, as long as the index entry goes in the right place. The drawback is that the index grows linearly and eventually no longer fits in memory.

## Indexed-sequential files

An **indexed-sequential file** (ISAM is the classic implementation) splits the difference: data records are sorted by key overall, but the index is **sparse** — one entry per block, holding the largest key in that block. With 1000 records and 10 per block there are only 100 index entries.

A lookup takes two steps: locate the block in the 100-entry index, then scan inside the block. If both the index and the block are scanned linearly, the average comparison count is

$$
\frac{100+1}{2}+\frac{10+1}{2}=50.5+5.5=56
$$

Using binary search on the index, the index costs at most 7 comparisons and the block 5.5, about 12.5 total. Adding another index level helps further: split 100 entries into 10 groups of 10, and a lookup costs $5.5+5.5+5.5=16.5$, while the top level of only 10 entries can stay in memory.

| Scheme | Index levels | Average comparisons | Versus 500.5 |
| --- | --- | --- | --- |
| Plain scan | 0 | 500.5 | 1× |
| One level, linear index | 1 | 56 | about 1/9 |
| One level, binary index | 1 | 12.5 | about 1/40 |
| Two levels, linear | 2 | 16.5 | about 1/30 |

Insertion is where this organisation hurts: a record must land in the block owning its key range, and if that block is full, later records shift, potentially across the whole file. Real systems reserve an **overflow area** per block: new records go into overflow blocks linked to the main block, and a lookup checks the main block first, then follows the overflow chain. A long chain degrades the logarithmic lookup into a linear one, so the file must be reorganised periodically to fold overflow records back into the main area.

> [!NOTE]
> Sequential files save space, indexed files save lookup time, and indexed-sequential files balance both while maintaining an overflow area.

## Three common misconceptions

> [!MYTH] File search cost is measured per record.
> External access works in blocks. With 1000 records and 10 per block, one read brings 10 records, and comparisons inside the block barely cost I/O.

> [!MYTH] More index entries always mean faster search.
> A larger index may no longer fit in memory, adding an extra disk read of the index itself. Sparse indexes exist precisely to keep the index small.

> [!MYTH] Inserting into an indexed-sequential file is as easy as into a sequential file.
> Records must stay sorted, so everything after the insertion point shifts; a full block splits or spills into overflow, which is far more expensive than appending.

## Practice

> [!PRACTICE] 1 · Compute the ASL
> An unsorted sequential file holds 2000 records. What is the average number of comparisons for a successful search, and how many blocks are read with 20 records per block?
>
> > [!ANSWER] Show answer
> > $(2000+1)/2=1000.5$ comparisons; with 20 records per block, about $1000.5/20\approx50$ blocks.

> [!PRACTICE] 2 · Compare indexes
> With 1000 records and 10 per block, how many comparisons do a one-level linear index and a binary index need?
>
> > [!ANSWER] Show answer
> > Linear: $50.5+5.5=56$. Binary: $\lceil\log_2 101\rceil=7$ plus $5.5$ inside the block, about $12.5$.

> [!PRACTICE] 3 · Choose a design
> A file receives 100,000 appends per day and almost never queries old records. Should it be sequential or indexed-sequential?
>
> > [!ANSWER] Show answer
> > Sequential. Appending writes to the end in $O(1)$; an indexed-sequential file must maintain order and indexes on every insert, causing heavy write amplification.

## Formal statement

A sequential file stores records in physical order. Key-sorted data supports binary search; otherwise only linear search, with average successful cost $(n+1)/2$ comparisons. An indexed file pairs a data file with a dense index of $(k,\mathrm{addr})$ entries sorted by $k$, giving $O(\log n)$ index search plus one data access. An indexed-sequential file keeps data sorted and uses a sparse index with one entry per block; with block size $s$ and block count $b=n/s$, linear search costs $(b+1)/2+(s+1)/2$ comparisons on average. A full block spills into an overflow chain; an overlong chain destroys the logarithmic bound and forces periodic reorganisation.