---
slug: "file-logical-structure"
subject: "operating-systems"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 13 · Operating Systems · Mastery"
title: "Files, Logical Structure, and Directories"
subtitle: "128-byte records: where does record 500 begin"
minutes: 15
meta: ["15 min read","Requires I/O management basics","Mastery level"]
concepts: ["filesys","iomgmt"]
prereq: ["iomgmt"]
related: ["disksched","memmgmt"]
---

## What you will get

You will be able to separate the roles of files, file systems, and directories, classify files by purpose and structure, compute the byte offset of any record in a structured file, and compare FCBs, directory entries, and three directory implementations by lookup cost.

## Three lines back

- A file is a named, owned, persistent information collection; the file system maps it onto disk blocks.
- A directory is not a container for contents; it is an index from name to FCB.
- Logical structure faces the user, physical structure faces the disk, and the two need not agree.

## Files, file systems, and file types

A file is the logical unit of information a process creates, with attributes for identifier, type, location, size, protection, owner, and timestamps. A file system has three parts: objects (files and directories), attributes, and operations such as open, read, write, seek, and close.

| Angle | Categories | What it decides |
| --- | --- | --- |
| Purpose | System, library, user files | Who may modify them |
| Protection | Read-only, read-write, execute | Allowed operations |
| Structure | Byte stream, record-based | Whether read counts bytes or records |
| Device | Regular, directory, device | Which driver handles the request |

UNIX refines this into regular files, directories, character devices, block devices, FIFOs, symbolic links, and sockets. One interface covers all seven, with the file type dispatching the semantics.

## Logical structure and record addressing

A byte-stream file is an uninterpreted sequence of bytes; a structured file is a sequence of records organized sequentially, by index, or indexed-sequentially.

For fixed-length records, the offset of record $k$ is

$$\text{offset}(k)=(k-1)\times R$$

With $R=128$ B and $k=500$, the offset is $499\times128=63{,}872$ B. With 4 KB blocks,

$$\text{block}=\left\lfloor\frac{63{,}872}{4096}\right\rfloor=15,\qquad \text{in-block}=63{,}872-15\times4096=2432\ \text{B}$$

so the record begins at in-block offset 2432 of block 15 and one disk read fetches it. Variable-length records need the index first.

Lookup cost separates the structures. With $N=10{,}000$ records, a sequential file scans $(N+1)/2=5000.5$ records on average, an indexed file hits in one index probe, and an indexed-sequential file with one entry per 100 records compares about 100 entries plus 50 records inside the group.

| Structure | Random access | Average search | Extra space |
| --- | --- | --- | --- |
| Sequential | No | $O(N)$ | None |
| Indexed | Yes | $O(1)$ | One entry per record |
| Indexed-sequential | Yes | About $O(\sqrt{N})$ | One entry per group |

## Directories, FCBs, and implementations

A file control block (FCB) is the proof that a file exists, holding name, type, size, physical location, protection bits, timestamps, and link count. A directory entry is an FCB or a pointer to one. Directories grew from single-level to two-level and tree forms, then acyclic graphs for sharing one file under several paths.

| Implementation | Lookup | Cost at 4096 entries | Weakness |
| --- | --- | --- | --- |
| Linear list | Compare each entry | About 2048 comparisons | Slow when large, holes after delete |
| Hash table | Hash the name | About 1 comparison | Collisions, resizing |
| B+ tree | Multi-level index | 2 node reads, about 12 comparisons | Complex insert and split |

Path resolution is charged per component: `/usr/lib/libc.so` looks up the root directory, then `usr`, then `lib`, each potentially a disk read. That cost is why a current working directory and relative paths exist.

## Three common misconceptions

> [!MYTH] A directory is a special file holding file contents.
> A directory only maps names to FCBs or inode numbers. Contents live in data blocks, pointed to by the location field.

> [!MYTH] Logical structure describes how the file sits on disk.
> Logical structure is the record organization the user sees. The same sequential file may be stored contiguously, by chaining, or through an index.

> [!MYTH] A big directory is only a little slower.
> Reusing holes carelessly in a linear directory can overwrite entries, and a hash directory that cannot grow fails insertion outright.

## Practice

> [!PRACTICE] 1 · Compute
> Records are 256 B and blocks are 1 KB. For record 1000, give the offset, block number, and in-block offset.
>
> > [!ANSWER] Show answer
> > Offset $=(1000-1)\times256=255{,}744$ B, block 249, in-block offset $255744-249\times1024=768$ B.

> [!PRACTICE] 2 · Compare
> For 100 records, what is the average comparison count for a sequential search and for an indexed-sequential search with one entry per 10 records?
>
> > [!ANSWER] Show answer
> > Sequential: $(100+1)/2\approx50$. Indexed-sequential: 5 comparisons over the index plus 5 in the group, about 10.

> [!PRACTICE] 3 · Decide
> A directory holds 200,000 files as a linear list. What is the worst case, and what should replace it?
>
> > [!ANSWER] Show answer
> > Up to 200,000 comparisons, each potentially a disk read. Use a hash table with expected one probe, or a B+ tree with logarithmic depth.

## Formal statement

A file is a named, attributed, persistent information collection, and a file system is built from file objects, attributes, and operations. Logical structure is either a byte stream or a record sequence organized sequentially, by index, or indexed-sequentially; for fixed-length records the offset of record $k$ is $(k-1)R$. An FCB records name, type, size, location, protection, and timestamps, and a directory maps names to FCBs. Directories may be linear lists, hash tables, or B+ trees, with average lookup costs of $O(N)$, $O(1)$, and $O(\log N)$.