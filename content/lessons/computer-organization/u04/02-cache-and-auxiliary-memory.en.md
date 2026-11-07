---
slug: "cache-and-auxiliary-memory"
subject: "computer-organization"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 8 · Computer Organization · Mastery"
title: "Cache and Auxiliary Memory"
subtitle: "EAT 15 ns at h=0.95, one disk revolution in 8.33 ms"
minutes: 18
meta: ["18 min read","Requires the memory hierarchy and main memory","Mastery level"]
concepts: ["cache","disc"]
prereq: ["memhier"]
related: ["memhier","cache"]
---

## What you will get

By the end of this lecture you can compute cache average access time and speedup from a hit rate, split an address into tag, index, and block offset for direct-mapped, set-associative, and fully associative caches, and calculate disk capacity, average rotational latency, and total access time.

## Three lines back

- Cache exploits temporal and spatial locality by copying recently used blocks from main memory into SRAM.
- Average access time is set by hit rate and miss penalty; a small drop in hit rate costs a lot.
- Disk capacity multiplies platters, cylinders, sectors per track, and sector size; access time is seek plus rotation plus transfer.

## How cache works and what a hit rate costs

Cache exchanges data with main memory in blocks, usually 32–128 bytes. On a memory reference the CPU checks the cache first. A hit returns the data directly; a miss fetches the block from main memory and makes room using a replacement policy. The hit rate is

$$h=\frac{N_{\text{hit}}}{N_{\text{hit}}+N_{\text{miss}}}$$

If a hit costs $T_c$ and a miss costs $T_c+T_m$, average access time is

$$EAT=hT_c+(1-h)(T_c+T_m)=T_c+(1-h)T_m$$

With $T_c=10$ ns, $T_m=100$ ns, and $h=0.95$:

$$EAT=10+0.05\times100=15\ \text{ns}$$

Against 100 ns for every access to main memory, the speedup is $100/15=6.67$. The effect of the hit rate is steep:

| Hit rate $h$ | Miss rate | EAT | Speedup over main memory |
| --- | --- | --- | --- |
| 0.90 | 0.10 | 20 ns | 5.00 |
| 0.95 | 0.05 | 15 ns | 6.67 |
| 0.99 | 0.01 | 11 ns | 9.09 |

Raising the hit rate from 95% to 99% is only four points, yet EAT falls from 15 ns to 11 ns, about a 27% gain.

## Direct-mapped, fully associative, and set-associative

Take a 64 KB cache, 32 B blocks, and a 32-bit address. There are $64\text{K}/32=2048=2^{11}$ blocks, so the block offset is 5 bits.

- **Direct-mapped**: the main-memory block number is taken modulo the number of cache blocks. The index is 11 bits, the tag is $32-11-5=16$ bits, and each line needs one comparator.
- **4-way set-associative**: there are $2048/4=512=2^9$ sets, so the index is 9 bits, the tag is $32-9-5=18$ bits, and each set needs four comparators.
- **Fully associative**: there is no index, the tag is 27 bits, and all 2048 lines need comparators.

| Mapping | Index bits | Tag bits | Comparators | Conflict misses |
| --- | --- | --- | --- | --- |
| Direct | 11 | 16 | 1 | Many |
| 4-way set | 9 | 18 | 4 | Fewer |
| Fully associative | 0 | 27 | 2048 | None |

For address 0x00001234, the block offset is $0x1234\bmod32=0x14=20$. Direct mapping gives index $\lfloor0x1234/32\rfloor\bmod2048=145$ and tag $0x1234\gg16=0$. The 4-way cache gives index $145\bmod512=145$ and tag $0x1234\gg9=9$. Direct mapping has the cheapest hardware but thrashes when two blocks map to the same line. Fully associative has no conflict misses but a large comparator array. Set associativity is the compromise.

## Disk structure, capacity, and access time

Disk capacity is estimated by

$$C=\text{surfaces}\times\text{cylinders}\times\text{sectors per track}\times\text{bytes per sector}$$

With 8 recording surfaces, 1000 cylinders, 63 sectors per track, and 512 B per sector:

$$C=8\times1000\times63\times512=258{,}048{,}000\ \text{B}\approx246\ \text{MiB}$$

Access time has three parts:

$$T_{\text{access}}=T_{\text{seek}}+T_{\text{rotation}}+T_{\text{transfer}}$$

A 7200 r/min disk turns once in $60/7200=8.33$ ms, so average rotational latency is half a turn, 4.17 ms. With an 8 ms seek and a transfer of 63 sectors (32,256 B) at 100 MB/s, transfer takes about 0.32 ms. The total is

$$T=8+4.17+0.32=12.49\ \text{ms}$$

| Component | Typical value | Determined by |
| --- | --- | --- |
| Seek | 4–10 ms | Distance the head travels |
| Rotational latency | 2–6 ms | Spin rate, half a turn on average |
| Transfer | 0.1–1 ms | Sector count and interface rate |

Solid-state drives have no seek or rotation, with random-read latency as low as 0.1 ms, but writes erase whole blocks and cells wear out.

> [!NOTE]
> Drive vendors quote capacity in powers of ten while operating systems often display powers of two. A 500 GB drive may show as about 465 GiB; the difference is units, not lost capacity.

## Three common misconceptions

> [!MYTH] A cache can reach a 100% hit rate.
> The first access to any block must miss, a compulsory miss. No capacity removes cold-start misses, so the hit rate never reaches 100%.

> [!MYTH] Direct mapping needs no tag comparison.
> Direct mapping still compares tags, with one comparator per line. The index locates the line; the tag confirms the block.

> [!MYTH] A disk's advertised capacity equals its formatted usable capacity.
> The advertised figure is unformatted media capacity. Formatting consumes checks, gaps, and spare areas, and decimal versus binary units add another gap, so usable capacity is usually smaller.

## Practice

> [!PRACTICE] 1 · EAT
> With $T_c=5$ ns, $T_m=80$ ns, and $h=0.9$, find average access time and speedup over main memory.
>
> > [!ANSWER] Show answer
> > $EAT=5+0.1\times80=13$ ns, so the speedup is $80/13=6.15$.

> [!PRACTICE] 2 · Split an address
> A 32-bit address, 32 KB cache, 64 B blocks, direct-mapped. Find the index and tag widths, and split address 0x00010040.
>
> > [!ANSWER] Show answer
> > There are $32\text{K}/64=512=2^9$ blocks, so the offset is 6 bits, the index 9 bits, and the tag $32-9-6=17$ bits. For 0x00010040, offset $=0x40\bmod64=0$, index $=(0x10040\gg6)\bmod512=1$, tag $=0x10040\gg15=2$.

> [!PRACTICE] 3 · Disk timing
> Four surfaces, 500 cylinders, 100 sectors per track, 512 B per sector, 10000 r/min, 5 ms seek, 80 MB/s interface. Find capacity and average access time.
>
> > [!ANSWER] Show answer
> > Capacity $=4\times500\times100\times512=102{,}400{,}000$ B, about 97.7 MiB. One turn is 6 ms, so average latency is 3 ms. Transferring $100\times512=51{,}200$ B takes 0.64 ms, giving $5+3+0.64=8.64$ ms.

## Formal statement

Cache copies main-memory blocks according to temporal and spatial locality. With hit rate $h$, cache access time $T_c$, and main-memory access time $T_m$, average access time is $EAT=hT_c+(1-h)(T_c+T_m)=T_c+(1-h)T_m$. Direct mapping uses an index of $\log_2$ cache blocks, set associativity uses an index of $\log_2$ sets, and tag width is the address width minus index bits minus block-offset bits. Direct mapping needs one comparator per line, fully associative needs one per block, and set associativity needs one per way per set. Disk capacity is the product of surfaces, cylinders, sectors per track, and bytes per sector, and access time is the sum of seek time, average rotational latency, and transfer time, where average rotational latency is half a revolution.