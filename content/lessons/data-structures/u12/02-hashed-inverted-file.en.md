---
slug: "hashed-inverted-file"
subject: "data-structures"
unit: "u12"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 12 · Data Structures · Mastery"
title: "Hashed Files and Multi-Key Files"
subtitle: "Find by address, or find by attribute"
minutes: 16
meta: ["16 min read","Requires hashing and file organisation","Mastery level"]
concepts: ["filedata","search"]
prereq: ["filedata"]
related: ["search","sorting"]
---

## What you will get

By the end of this lecture you can map nine records into five buckets, explain how an overflow chain changes lookup cost, and answer a query such as “CS majors who are female” using either a multilist or an inverted file.

## Three lines back

- A hashed file uses a hash function to turn a key directly into a bucket number, so a lookup costs about one disk access.
- When a bucket fills, an overflow bucket is chained on; the higher the load factor, the longer the chain and the worse the lookup.
- Multi-key files index the same records by several attributes, supporting queries that combine conditions.

## Hashed files

A **hashed file** distributes records across **buckets** by a hash function. Each bucket is one or more disk blocks holding a fixed number of records, so a lookup computes a bucket number and reads one bucket.

Take five buckets of capacity 2, hash function $h(k)=k\bmod 5$, and keys inserted in the order $25,60,45,37,42,18,53,71,84$:

| Bucket | Records in the main bucket | Overflow chain |
| --- | --- | --- |
| 0 | 25, 60 | 45 |
| 1 | 71 | — |
| 2 | 37, 42 | — |
| 3 | 18, 53 | — |
| 4 | 84 | — |

Key 45 hashes to full bucket 0, so it goes into an overflow bucket. Looking it up reads bucket 0, compares 25 and 60, then follows the chain to find it on the third comparison, for two disk reads. The load factor is

$$
\alpha=\frac{n}{b\times c}=\frac{9}{5\times2}=0.9
$$

The average comparison count for a successful search is $(1+2+3+1+2+1+2+1+1)/9=14/9\approx1.56$. This is small only because each bucket holds two records; with 50 per bucket the in-bucket scan dominates. Deletion needs care: clearing a slot can break the chain, so systems use deletion marks.

## Multilist files

A **multilist file** gives each record several pointer fields, each linking it into a chain organised by one attribute.

Consider nine students. Besides the primary order by student number, add a major chain and a gender chain:

| Record | Major | Gender |
| --- | --- | --- |
| R1 | CS | F |
| R2 | Math | F |
| R3 | CS | M |
| R4 | Math | M |
| R5 | CS | F |
| R6 | Math | M |
| R7 | CS | M |
| R8 | Physics | F |
| R9 | Physics | M |

The major chains are $R1\to R3\to R5\to R7$ for CS, $R2\to R4\to R6$ for Math, and $R8\to R9$ for Physics; the gender chains are $R1\to R2\to R5\to R8$ for F and $R3\to R4\to R6\to R7\to R9$ for M.

To find “CS and female”, walk the shorter chain — say the four-node F chain — and test each record's major. R1 and R5 match. Multilists make insertion and deletion cheap, since only pointers change; the weakness is that combined conditions still require record-by-record checks.

## Inverted files

An **inverted file** stores each “attribute value → record addresses” mapping as a separate **inverted list**. Every distinct value gets a sorted list of record identifiers, and records need no pointer fields.

For the same students:

| Attribute | Value | Inverted list |
| --- | --- | --- |
| Major | CS | 1, 3, 5, 7 |
| Major | Math | 2, 4, 6 |
| Major | Physics | 8, 9 |
| Gender | F | 1, 2, 5, 8 |
| Gender | M | 3, 4, 6, 7, 9 |

The query “CS and female” intersects two sorted lists:

$$
\{1,3,5,7\}\cap\{1,2,5,8\}=\{1,5\}
$$

Merging two four-element sorted lists takes at most eight comparisons and yields R1 and R5 directly, without reading records to test attributes. Filtering happens inside the index, and only surviving records are fetched.

| Organisation | Extra storage | Query “CS and F” | Insert and delete |
| --- | --- | --- | --- |
| Multilist | Several pointer fields per record | Walk 4 nodes and test each record | Relink pointers, fast |
| Inverted lists | One record-id list per value | 8 comparisons in a merge, 2 hits | Maintain many lists, slower |

Inverted lists are costly to maintain: an insertion adds a record id to every list the record belongs to while keeping each list sorted, and many distinct values inflate the number of lists.

> [!NOTE]
> A hashed file answers “locate by primary key”; multilists and inverted files answer “filter by an arbitrary combination of attributes”. The first computes an address, the latter intersect indexes.

## Three common misconceptions

> [!MYTH] Hashed lookups are always $O(1)$.
> Only when the load factor is low and overflow chains are short. Once buckets fill, chain scanning degrades to $O(n)$ in the worst case.

> [!MYTH] A multilist file is just an inverted file.
> A multilist keeps pointers inside records and traverses chains; an inverted file stores value-to-address lists separately and can intersect sorted lists. Both the storage location and the query method differ.

> [!MYTH] The more inverted lists, the better.
> Every list consumes space and must be maintained on insert and delete. With many distinct values and frequent updates, maintenance can cost more than the queries save.

## Practice

> [!PRACTICE] 1 · Place the keys
> With $h(k)=k\bmod 7$ and buckets of capacity 2, insert $14,8,21,5,16,23,28$. Which key lands in an overflow bucket?
>
> > [!ANSWER] Show answer
> > Bucket 0 holds 14 and 21 and is full, so 28, also congruent to 0, overflows. Bucket 1 holds 8, bucket 2 holds 16 and 23, bucket 5 holds 5. Only 28 is chained.

> [!PRACTICE] 2 · Compute the ASL
> In the previous question, what is the average comparison count for a successful search?
>
> > [!ANSWER] Show answer
> > Counts are 14→1, 8→1, 21→2, 5→1, 16→1, 23→2, 28→3, summing to 11 over 7 keys, about $11/7\approx1.57$.

> [!PRACTICE] 3 · Intersect the lists
> Using the inverted tables above, what does “Math and male” return?
>
> > [!ANSWER] Show answer
> > $\{2,4,6\}\cap\{3,4,6,7,9\}=\{4,6\}$, namely R4 and R6.

## Formal statement

A hashed file consists of $b$ buckets and a hash function $h$; record $r$ resides in bucket $h(k_r)$. With bucket capacity $c$ and load factor $\alpha=n/(bc)$, a full bucket sends new records to overflow buckets linked by pointers. A successful lookup costs one bucket-address computation, one main-bucket read, and an additional scan proportional to the overflow chain length in the worst case.

A multilist file gives every queried attribute its own pointer field, threading the records into several independent chains; a query traverses the shortest chain and validates the remaining conditions record by record.

An inverted file maintains, for each attribute value $v$, a sorted set $L(v)$ of record identifiers. A conjunctive query “$A=a$ and $B=b$” becomes the merge intersection $L(a)\cap L(b)$, whose cost is proportional to the lengths of the two lists rather than to the file size; the price is that insertions and deletions must update every affected list.