---
slug: "instruction-format-addressing"
subject: "computer-organization"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 13 · Computer Organization · Mastery"
title: "Instruction Formats and Addressing Modes"
subtitle: "Opcode extension squeezes in 61 instructions; seven modes each compute one address"
minutes: 16
meta: ["16 min read","Requires fixed-point arithmetic basics","Mastery level"]
concepts: ["isa"]
prereq: ["alu"]
related: ["cpustruct","alu"]
---

## What you will get

By the end of this lecture you can say how many bits an instruction gives to its opcode and its address fields, lay out 61 instructions in a 16-bit word by extending the opcode, compute the effective address and fetched operand for seven addressing modes, and explain how instruction length, addressing granularity, and byte order affect instruction fetch.

## Three lines back

- An instruction is an opcode plus address fields: the opcode says what to do, the fields say what to do it to.
- Address bits bound the reachable range; opcode bits bound how many instructions exist.
- Addressing modes answer one question: how does the number in the address field become the real operand address?

## Instruction formats and opcode extension

Every instruction carries an opcode; the number of address fields classifies it:

| Format | Address fields | Typical instruction | Note |
| --- | --- | --- | --- |
| Zero-address | 0 | `NOP`, `HLT`, stack ops | Operands sit on the stack |
| One-address | 1 | `INC R1`, `MUL X` | Second operand implied in ACC |
| Two-address | 2 | `ADD R1, R2` | Most common; result overwrites a source |
| Three-address | 3 | `ADD R1, R2, R3` | One instruction, one complete operation |

With a 16-bit word, a 4-bit base opcode, and three 4-bit address fields, only 16 opcodes fit. Sacrificing one code per level to mark an extension gives a hierarchy:

| Code space | Meaning | Count |
| --- | --- | --- |
| `0000` to `1110` | Three-address instructions | 15 |
| `1111 0000` to `1111 1110` | Two-address, A1 extends the opcode | 15 |
| `1111 1111 0000` to `1111 1111 1110` | One-address, A1 and A2 extend it | 15 |
| `1111 1111 1111 0000` to `1111` | Zero-address instructions | 16 |

The total is $15+15+15+16=61$. Each extension level gives up one code, so a 4-bit field is not simply "16 instructions"; the price is a shorter address field for those instructions.

## Effective addresses for seven modes

Place `LD R1, D` at `1000H` as a 2-byte instruction, so $PC=1002H$ after fetch. Let $D=0020H$, index register $R_3=0008H$, and general register $R_2=2000H$. Memory holds $M(0020H)=0040H$, $M(0040H)=1234H$, $M(0028H)=5678H$, $M(1022H)=9ABCH$, and $M(2000H)=0BADH$.

| Mode | Effective address | $EA$ | Operand obtained |
| --- | --- | --- | --- |
| Immediate | None; $D$ is the operand | — | $0020H$ |
| Direct | $EA=D$ | $0020H$ | $0040H$ |
| Indirect | $EA=M(D)$ | $0040H$ | $1234H$ |
| Register | None; operand in a register | — | $R_2=2000H$ |
| Register indirect | $EA=(R_2)$ | $2000H$ | $0BADH$ |
| Indexed | $EA=(R_3)+D$ | $0028H$ | $5678H$ |
| Relative | $EA=(PC)+D$ | $1022H$ | $9ABCH$ |

Indirection costs one extra memory access but widens the reachable space. Indexing suits array traversal: increment $R_3$ and the same instruction points at the next element. Relative addressing ties the offset to the current PC, so a branch still works after the whole program is relocated, which is why branches use it.

## Instruction length, granularity, and byte order

Instruction length may equal, halve, or double the machine word length. With byte addressing a 16-bit instruction occupies two bytes, so $PC$ advances by 2; with word addressing it advances by 1. A program of 100 such instructions occupies $100\times2=200$ bytes. If each memory access takes 100 ns, an instruction that fetches itself and one operand needs two accesses, 200 ns, capping throughput at $1/(200\ \text{ns})=5$ MIPS.

Multi-byte data can be stored in two orders. Placing `12345678H` at `1000H`:

| Address | Big-endian | Little-endian |
| --- | --- | --- |
| `1000H` | `12` | `78` |
| `1001H` | `34` | `56` |
| `1002H` | `56` | `34` |
| `1003H` | `78` | `12` |

Big-endian puts the most significant byte at the lowest address; little-endian reverses that. Both are self-consistent, but copying bytes between the two conventions yields wrong values, which is why network protocols fix a single byte order.

## Three common misconceptions

> [!MYTH] A fixed opcode width fixes the instruction count.
> Opcodes can be extended by borrowing address-field code space, at the cost of shorter addresses for those instructions.

> [!MYTH] The effective address is just the number in the address field.
> That holds only for direct addressing. Indirect needs another memory access, indexed adds a register, and relative adds the PC.

> [!MYTH] Instruction length always equals machine word length.
> It may be equal, shorter, or longer. Variable-length instructions pack code more densely but complicate fetch and decode.

## Practice

> [!PRACTICE] 1 · Extend
> A 16-bit instruction set starts with a 4-bit opcode and extends three-address into two-address instructions. How many of each can exist at most?
>
> > [!ANSWER] Show answer
> > At most 15 three-address instructions, reserving `1111` as the escape. The two-address level then uses A1: 15 if the one-address extension is kept, or the full 16 if extension stops here.

> [!PRACTICE] 2 · Address
> Change the example to `LD R1, 20H` with relative addressing and $PC=1002H$. Which unit supplies the operand?
>
> > [!ANSWER] Show answer
> > $EA=(PC)+20H=1002H+0020H=1022H$, so the operand is `9ABCH`.

## Formal statement

An instruction word consists of an opcode field and one or more address fields, whose count determines whether it is zero-, one-, two-, or three-address. Opcode extension reserves one or more codes as escape markers and reuses address bits as additional opcode bits, fitting more instructions into a fixed word at the cost of reduced address reach for those instructions. An addressing mode defines how the address field yields an effective address: immediate takes the field as the operand, direct uses $EA=D$, indirect uses $EA=M(D)$, register addressing keeps the operand in a register, register indirect uses $EA=(R)$, indexed uses $EA=(R_x)+D$, and relative uses $EA=(PC)+D$. Instruction length, machine word length, and storage word length are independent concepts; with byte addressing a 16-bit instruction spans two locations and increments the PC by 2.