---
slug: "fixed-point-representation-arithmetic"
subject: "computer-organization"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 11 · Computer Organization · Mastery"
title: "Fixed-Point Representation and Two's-Complement Arithmetic"
subtitle: "Four encodings, one overflow test, and Booth's algorithm run by hand"
minutes: 16
meta: ["16 min read","Requires instruction-set basics","Mastery level"]
concepts: ["alu","isa"]
prereq: ["isa"]
related: ["floatrepr","alu"]
---

## What you will get

By the end of this lecture you can write the 8-bit ranges of sign-magnitude, one's complement, two's complement, and biased notation and convert between them, add and subtract in two's complement while detecting overflow, tell arithmetic shifts from logical ones by what fills the vacated bit, and run Booth's algorithm on $9\times(-6)$ to reach −54.

## Three lines back

- A machine number encodes the sign together with the value; its true value is the number it actually denotes.
- Two's complement turns subtraction into addition, at the cost of an asymmetric range.
- Hardware multiplication is a loop of test, add or subtract, and shift, not a single operation.

## Four encodings and their ranges

Fixed-point numbers come as pure fractions or pure integers; the radix point sits at an agreed position and is never stored. With word length $n=8$ and the top bit as sign, the encodings differ only in how negatives are formed:

| Encoding | Encoding of zero | 8-bit range | Rule for negatives |
| --- | --- | --- | --- |
| Sign-magnitude | `00000000` / `10000000` | $-127$ to $+127$ | Sign bit 1, magnitude unchanged |
| One's complement | `00000000` / `11111111` | $-127$ to $+127$ | Invert every magnitude bit |
| Two's complement | `00000000` only | $-128$ to $+127$ | One's complement plus one |
| Biased | `10000000` | $-128$ to $+127$ | Invert the sign bit of two's complement |

Take $x=-100$. The 8-bit sign-magnitude form is `11100100`, one's complement `10011011`, two's complement `10011100`. Check the last one: $10011100_2=156$, and $156-256=-100$. Bias notation flips only the sign bit, giving `00011100`, which reads as 28 unsigned; subtract the bias 128 and the value is again $-100$. Because bias notation preserves unsigned ordering, floating-point exponents use it so two exponents can be compared as plain integers.

## Addition, subtraction, and overflow

Two's complement lets the sign bit participate in the arithmetic:

$$[x+y]_{\text{2c}}=[x]_{\text{2c}}+[y]_{\text{2c}}\pmod{2^n}$$

$$[x-y]_{\text{2c}}=[x]_{\text{2c}}+[-y]_{\text{2c}},\qquad [-y]_{\text{2c}}=\overline{[y]_{\text{2c}}}+1$$

Compute $105+50$: $[105]_{\text{2c}}=01101001$ and $[50]_{\text{2c}}=00110010$ sum to $10011011$. Two positives have produced a negative-looking sign bit. Inspect the carries: the carry out of the sign position is $C_8=0$ while the carry into it is $C_7=1$, so

$$V=C_8\oplus C_7=0\oplus1=1$$

This is a positive overflow, since the true sum 155 exceeds 127. Now $105-50$: $[-50]_{\text{2c}}=11001110$, and $01101001+11001110=1\,00110111$. Dropping the carry leaves $00110111=55$, with $C_8=C_7=1$ and $V=0$. The dual-sign-bit variant turns the same test into reading the two leading bits: `00` and `11` are fine, `01` is positive overflow, `10` is negative overflow.

## Shifts and Booth multiplication

Shifts fall into three families, distinguished by what enters the vacated positions:

| Type | Rule | `10110100` shifted right | Typical use |
| --- | --- | --- | --- |
| Arithmetic | Sign bit fixed, vacated bits copy the sign | `11011010` | Signed multiply or divide by $2^k$ |
| Logical | All bits move, zeros enter | `01011010` | Unsigned values and bit strings |
| Circular | Bits leaving one end re-enter the other | `01011010` | Hashing and cryptography |

Booth's algorithm groups the multiplier by the pair $Q_0Q_{-1}$ and performs only add, subtract, or nothing, followed by one arithmetic right shift:

| $Q_0Q_{-1}$ | Operation |
| --- | --- |
| 00 or 11 | No change |
| 01 | $A\leftarrow A+M$ |
| 10 | $A\leftarrow A-M$ |

Multiply $M=+9$ by $Q=-6$ in 5 bits: $M=01001$, $-M=10111$, $Q=11010$, with $A=00000$ and $Q_{-1}=0$. Five rounds give:

| Round | $Q_0Q_{-1}$ | $A$ after add/subtract | $A$, $Q$, $Q_{-1}$ after shift |
| --- | --- | --- | --- |
| Start | — | 00000 | 00000 11010 0 |
| 1 | 00 | 00000 | 00000 01101 0 |
| 2 | 10 | 10111 | 11011 10110 1 |
| 3 | 01 | 00100 | 00010 01011 0 |
| 4 | 10 | 11001 | 11100 10101 1 |
| 5 | 11 | 11100 | 11110 01010 1 |

The concatenation $AQ=1111001010$ is a 10-bit two's complement number; inverting and adding one gives $0000110110_2=54$, so the product is $-54$, matching $9\times(-6)$. The five rounds used two subtractions and one addition, so the datapath needs one adder, one shift register, and a small decoder.

## Three common misconceptions

> [!MYTH] The two's-complement range is symmetric about zero.
> The 8-bit range is $-128$ to $+127$, one more negative value than positive. $-128$ has no positive counterpart, and negating `10000000` returns `10000000`.

> [!MYTH] A carry out of the top bit means overflow.
> A carry is normal in modulo $2^n$ arithmetic: $105-50$ produces one and is still correct. Overflow is the exclusive-or of the carry into and out of the sign position.

> [!MYTH] Arithmetic and logical right shifts differ in name only.
> An arithmetic shift of a negative number inserts 1; a logical shift inserts 0. `10110100` becomes `11011010` or `01011010`, two different values.

## Practice

> [!PRACTICE] 1 · Compute
> Use 8-bit two's complement to compute $87-45$ and check for overflow.
>
> > [!ANSWER] Show answer
> > $[87]_{\text{2c}}=01010111$, $[45]_{\text{2c}}=00101101$, so $[-45]_{\text{2c}}=11010011$. The sum is $1\,00101010$; dropping the carry leaves $00101010=42$. Both $C_8$ and $C_7$ are 1, hence $V=0$.

> [!PRACTICE] 2 · Decide
> With $[x]_{\text{2c}}=01111000$ and $[y]_{\text{2c}}=00001001$, does the sum overflow, and what does the result pattern denote?
>
> > [!ANSWER] Show answer
> > The sum is $10000001$. $C_8=0$ and $C_7=1$, so $V=1$: positive overflow, since $120+9=129>127$. Read as two's complement the pattern is $-127$, but that value is meaningless here.

> [!PRACTICE] 3 · By hand
> Run Booth's algorithm for $(-5)\times3$ and give the final $AQ$.
>
> > [!ANSWER] Show answer
> > In 5 bits, $M=11011$ ($-5$), $-M=00101$, $Q=00011$. Applying the 00/10/01/11 rules for five rounds yields $AQ=1111100001$; inverting and adding one gives $0000011111_2=31$, so the product is $-15$.

## Formal statement

A fixed-point number keeps its radix point at a fixed position, and the $n$-bit two's-complement range is $-2^{n-1}$ to $2^{n-1}-1$ with a unique encoding of zero. Addition and subtraction obey $[x\pm y]_{\text{2c}}=[x]_{\text{2c}}+[\pm y]_{\text{2c}}\pmod{2^n}$, where $[-y]_{\text{2c}}$ inverts $[y]_{\text{2c}}$ including its sign bit and adds one. Overflow is detected by $V=C_n\oplus C_{n-1}$, equivalently by a dual-sign-bit result of 01 or 10. Arithmetic shifts preserve the sign and fill with it, whereas logical shifts fill with zeros. Booth's algorithm selects add $M$, subtract $M$, or no operation from the pair formed by the multiplier's lowest bit and the extra bit $Q_{-1}$, then shifts $A$, $Q$, and $Q_{-1}$ right arithmetically as one register; after $n$ rounds $AQ$ holds the two's-complement product.