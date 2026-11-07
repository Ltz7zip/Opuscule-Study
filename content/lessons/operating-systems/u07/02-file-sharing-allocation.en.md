---
slug: "file-sharing-allocation"
subject: "operating-systems"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 14 · Operating Systems · Mastery"
title: "File Sharing, Protection, and Physical Allocation"
subtitle: "Past twelve direct blocks: which index level holds logical block 5000"
minutes: 16
meta: ["16 min read","Requires files and directories","Mastery level"]
concepts: ["filesys","disksched"]
prereq: ["filesys"]
related: ["iomgmt","disksched"]
---

## What you will get

You will be able to contrast hard and symbolic links, compress an access matrix into ACLs or capabilities, and walk a mixed index.

## Three lines back

- Sharing lets several entries reach one copy of the data; protection says who may and how.
- Physical allocation decides how many disk reads one random access costs.
- Indexed allocation trades space for time: more index blocks mean larger files and more reads.

## Sharing: hard links and symbolic links

A **hard link** adds a directory entry pointing at an existing inode and increments its link count. Both paths are equivalent; removing one only decrements the count. A **symbolic link** is a separate file holding the target path, re-resolved by the kernel on each access.

| Property | Hard link | Symbolic link |
| --- | --- | --- |
| Implementation | Directory entry points to the same inode | Own file holding a path |
| Across file systems | Not allowed | Allowed |
| After target deletion | Data survives, link valid | Becomes a dangling link |
| Access cost | One path resolution | A second resolution |
| Link count | Counted in the inode | Does not touch the target inode |

Hard links cannot cross a mount point because inode numbers are unique per file system. Symbolic links turn "points to" into data, costing one extra resolution and dangling targets.

## Protection: access matrix, ACLs, and capabilities

The model is an **access matrix**: rows are subjects, columns objects, cells permission sets such as $\{r,w,x\}$. Real matrices are sparse, motivating two compressions.

An **access control list** stores by column: each file lists subject-to-permission entries. A **capability list** stores by row: each subject holds tickets naming objects and rights. The nine UNIX bits collapse subjects into owner, group, and others:

| Field | Meaning | Octal value |
| --- | --- | --- |
| `rwx` owner | read, write, execute | 7 |
| `r-x` group | read, execute | 5 |
| `r--` others | read only | 4 |

So `rwxr-xr--` is 754; `rw-r-----` (640) leaves the group read-only and gives others nothing.

ACLs revoke per object easily but are scanned on open; capabilities authenticate fast but revoke slowly. With 1000 users, 10,000 files, and five grantees each, an ACL needs $10{,}000\times5=50{,}000$ entries against $10^7$ cells, a 200-fold compression.

## Physical allocation: contiguous, linked, indexed

**Contiguous allocation** gives a file adjacent blocks and stores the first block and length. Logical block $i$ lives at $b_0+i$, so one seek reads the file, but growth is hard and fragmentation costly.

**Linked allocation** scatters blocks, each holding the next pointer, so block $i$ costs $i$ steps and random access degrades to $O(i)$. FAT moves pointers into an in-memory table sized with the disk.

**Indexed allocation** gives each file an index block whose entry $i$ points to logical block $i$. UNIX adds twelve direct pointers plus single-, double-, and triple-indirect pointers.

With 4 KB blocks and 4 B pointers, each index block holds $4096/4=1024$ pointers, so the largest file is

$$(12+1024+1024^2+1024^3)\times4\ \text{KB}\approx4\ \text{TiB}$$

Locate block 5000. Direct blocks cover $0$–$11$ and single-indirect $12$–$1035$, so it falls in the double-indirect range. Its offset is

$$5000-1036=3964,\qquad 3964=3\times1024+892$$

The kernel reads entry 3 of the double-indirect block for a second-level index block, then entry 892 for the data block: three disk reads with the inode cached.

| Method | Random access | External fragmentation | Growth | Used by |
| --- | --- | --- | --- | --- |
| Contiguous | $O(1)$, one seek | Yes | Hard | ISO 9660, early FAT |
| Linked | $O(i)$ | No | Easy | FAT, FAT32 |
| Indexed | $O(1)$ plus index reads | No | Easy | ext2/3/4, NTFS |

> [!NOTE]
> Read count depends on depth, not file size: a small file needs one read; only crossing into single-indirect adds one.

## Three common misconceptions

> [!MYTH] Deleting a hard link deletes the file contents.
> Data is reclaimed only when the link count reaches zero and no process has the file open.

> [!MYTH] A symbolic link copies the target contents.
> The link stores a path string, usually a few dozen bytes, independent of target size.

> [!MYTH] Indexed allocation is always faster than contiguous.
> A small contiguous file costs one seek, while indexed pays an extra read. Indexing wins on growth and fragmentation, not every access.

## Practice

> [!PRACTICE] 1 · Compute
> Blocks are 4 KB, pointers 4 B, with 12 direct and one single-indirect block. What is the maximum file size, and how many index blocks reach block 2000?
>
> > [!ANSWER] Show answer
> > Each index block holds 1024 pointers, so the maximum is $(12+1024)\times4\ \text{KB}=4144\ \text{KB}\approx4.05$ MB; block 2000 exceeds $12+1024=1036$ and is out of range.

> [!PRACTICE] 2 · Compute
> A file occupies 100 logical blocks. How many disk reads reach block 99 under linked allocation, and with a cached FAT?
>
> > [!ANSWER] Show answer
> > Linked allocation reads 100 blocks in sequence; a cached FAT walks 99 pointers in memory and needs one disk read.

> [!PRACTICE] 3 · Decide
> A file's mode changes from 644 to 640. What can group and others still do?
>
> > [!ANSWER] Show answer
> > 644 is `rw-r--r--`; 640 is `rw-r-----`. The group keeps read, others lose read.

## Formal statement

Sharing uses hard links pointing several entries at one inode and counting links, or symbolic links holding a target path. Protection is an access matrix of subjects against objects, compressed by column into ACLs or by row into capabilities. Allocation is contiguous (block $i$ at $b_0+i$), linked (block $i$ costs $i$ pointer steps), or indexed. Under the UNIX mixed index the maximum file is $(12+1024+1024^2+1024^3)$ blocks; block 5000 needs double indirection and three reads.