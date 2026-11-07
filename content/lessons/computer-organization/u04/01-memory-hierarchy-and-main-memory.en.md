---
slug: "memory-hierarchy-and-main-memory"
subject: "computer-organization"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 7 · Computer Organization · Mastery"
title: "Memory Hierarchy and Main Memory"
subtitle: "Turning 1K×4 chips into a 4K×8 memory"
minutes: 17
meta: ["17 min read","Requires buses and address space","Mastery level"]
concepts: ["memhier","cache"]
prereq: ["bus"]
related: ["cache","disc"]
---

## What you will get

By the end of this lecture you can order the memory hierarchy by capacity, speed, and cost, explain how SRAM differs from DRAM, describe the MAR, MDR, and decoder structure of main memory, and use the word-expansion and bit-expansion formula to find the chip count and address ranges.

## Three lines back

- Going down the hierarchy, capacity grows, access slows, and cost per bit falls.
- Main memory is addressed by location: the decoder selects a cell and data passes through MDR.
- Bit expansion widens the word; word expansion adds locations; the two can be combined.

## The memory hierarchy and its classes

| Level | Typical capacity | Access time | Medium | Role |
| --- | --- | --- | --- | --- |
| Registers | Tens to hundreds of bytes | 0.3–1 ns | Flip-flops | Directly operated on by instructions |
| Cache | 32 KB–32 MB | 1–10 ns | SRAM | Bridges the CPU-main memory speed gap |
| Main memory | 8–256 GB | 50–100 ns | DRAM | Holds running programs and data |
| Secondary storage | 1–10 TB | 5–10 ms for disks | Magnetic or flash | Long-term storage |

Higher levels are faster, more expensive, and smaller. The hierarchy works because programs show temporal and spatial locality: recently used data, and data near it, are likely to be used again.

By access mode, memory is random-access (RAM, ROM), sequential (tape), or direct (disk). By volatility, RAM loses its contents on power loss while ROM and flash retain them. SRAM and DRAM differ as follows:

| Property | SRAM | DRAM |
| --- | --- | --- |
| Storage principle | Bistable flip-flop | Capacitor charge |
| Density | Low, six transistors per cell | High, one transistor plus capacitor |
| Speed | Fast | Slower |
| Refresh | Not needed | Periodic refresh required |
| Use | Cache | Main memory |

## Main-memory structure and address decoding

Main memory consists of a storage array, the address register MAR, the data register MDR, and an address decoder. The CPU places an address in MAR; the decoder turns $n$ address bits into one of $2^n$ word-select lines and activates one cell. A read sends that cell's contents to MDR; a write stores MDR into the cell.

The relationship between address lines and locations is

$$N=2^n$$

A $2\text{K}\times8$ chip has $2^{11}=2048$ locations and therefore needs 11 address lines and 8 data lines. A $1\text{K}\times4$ chip needs 10 address lines and 4 data lines. The decoder inside a chip selects only cells within that chip; selection among chips is done by the chip-select signal $CS$.

## Chip count and address mapping

To build an $M\times W$ memory from $m\times w$ chips, the count is

$$\text{chips}=\frac{M}{m}\times\frac{W}{w}$$

The first factor is word expansion and the second is bit expansion.

Example: build a $4\text{K}\times8$ memory from $1\text{K}\times4$ chips.

$$\text{chips}=\frac{4\text{K}}{1\text{K}}\times\frac{8}{4}=4\times2=8$$

Four groups handle word expansion, and within each group two chips in parallel handle bit expansion. There are 12 address lines: $A_{11}A_{10}$ drive a 2-to-4 decoder that produces four chip-select signals, while $A_9$–$A_0$ go to every chip. The eight data lines split so one chip in each group supplies $D_0$–$D_3$ and the other supplies $D_4$–$D_7$.

| Chip select $A_{11}A_{10}$ | Address range | Selected group |
| --- | --- | --- |
| 00 | 0000H–03FFH | Group 1 |
| 01 | 0400H–07FFH | Group 2 |
| 10 | 0800H–0BFFH | Group 3 |
| 11 | 0C00H–0FFFH | Group 4 |

More combinations:

| Target | Chip | Word expansion | Bit expansion | Total chips |
| --- | --- | --- | --- | --- |
| 16K×8 | 4K×8 | 4 | 1 | 4 |
| 64K×16 | 16K×8 | 4 | 2 | 8 |
| 2K×8 | 1K×4 | 2 | 2 | 4 |

> [!NOTE]
> Word expansion changes the address range; bit expansion changes the data width. With bit expansion alone, all chips share one address bus and one chip select. With word expansion, high address bits must generate separate chip selects, or several groups will answer at once.

## Three common misconceptions

> [!MYTH] Capacity depends only on the number of address lines.
> Address lines fix the number of locations; capacity also multiplies by bits per location. With 20 address lines, an 8-bit word gives 1 MB and a 16-bit word gives 2 MB.

> [!MYTH] SRAM is slower than DRAM, so it belongs in secondary storage.
> SRAM stores bits in flip-flops, needs no refresh, and is faster than DRAM. It is less dense and more expensive, which is why it serves as cache rather than main memory.

> [!MYTH] Bit expansion also needs extra chip-select signals.
> Bit expansion wires several chips' data lines in parallel onto the same address and shares one chip select, so all work together. Only word expansion uses high address bits to distinguish groups.

## Practice

> [!PRACTICE] 1 · Chip count
> How many $4\text{K}\times4$ chips build a $16\text{K}\times8$ memory?
>
> > [!ANSWER] Show answer
> > $(16\text{K}/4\text{K})\times(8/4)=4\times2=8$ chips. The memory needs 14 address lines, with $A_{13}A_{12}$ driving the chip selects.

> [!PRACTICE] 2 · Address and data lines
> A $64\text{K}\times16$ memory is required. What are the minimum address and data line counts?
>
> > [!ANSWER] Show answer
> > $64\text{K}=2^{16}$, so 16 address lines are needed; a 16-bit word needs 16 data lines. From $16\text{K}\times8$ chips, the count is $(64/16)\times(16/8)=8$.

> [!PRACTICE] 3 · Address ranges
> Build a $4\text{K}\times8$ memory from $1\text{K}\times8$ chips and give the four 1K block ranges.
>
> > [!ANSWER] Show answer
> > Each block is $1\text{K}=0400\text{H}$. The blocks are 0000H–03FFH, 0400H–07FFH, 0800H–0BFFH, and 0C00H–0FFFH, selected by $A_{11}A_{10}=00,01,10,11$.

## Formal statement

Memory forms a hierarchy of registers, cache, main memory, and secondary storage ordered by capacity, speed, and cost, and its effectiveness depends on temporal and spatial locality. By access mode it is random, sequential, or direct; by volatility it is volatile or non-volatile. Main memory consists of a storage array, MAR, MDR, and an address decoder, and $n$ address lines select $2^n$ locations. To build an $M\times W$ memory from $m\times w$ chips, the required count is $(M/m)\times(W/w)$, where $M/m$ is the word-expansion factor and $W/w$ the bit-expansion factor. Word expansion uses high address bits through a decoder to generate chip selects, while bit expansion parallels data lines and shares address and chip select. SRAM stores bits in flip-flops, needs no refresh, is fast but less dense, and serves as cache; DRAM stores charge in capacitors, needs refresh, is denser, and serves as main memory.