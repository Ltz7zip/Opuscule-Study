---
slug: "floating-point-and-alu"
subject: "computer-organization"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 12 · Computer Organization · Mastery"
title: "Floating-Point Representation, Arithmetic, and the ALU"
subtitle: "Read 25.0 out of 0x41C80000, then split carry lookahead into two gate levels"
minutes: 17
meta: ["17 min read","Requires fixed-point two's-complement arithmetic","Mastery level"]
concepts: ["floatrepr","alu"]
prereq: ["alu"]
related: ["isa","cpustruct"]
---

## What you will get

By the end of this lecture you can split an IEEE 754 single-precision word into sign, exponent, and fraction and convert it to decimal, perform floating-point addition in five steps, and write the generate and propagate functions of carry lookahead and use them on $1011+0110$.

## Three lines back

- A floating-point number pairs an exponent with a significand; the exponent sets range, the significand sets precision.
- Floating-point addition aligns first: the smaller exponent is raised to the larger, shifting its significand right.
- The ALU bottleneck is the carry chain, and lookahead trades gates for waiting.

## The IEEE 754 single-precision layout

Thirty-two bits split into three fields: one sign bit $S$, eight exponent bits $E$, and twenty-three fraction bits $M$. The exponent is biased by 127 and the leading 1 is hidden, so

$$x=(-1)^S\times(1.M)\times2^{E-127}$$

| Format | Sign | Exponent | Fraction | Bias |
| --- | --- | --- | --- | --- |
| Single | 1 | 8 | 23 | 127 |
| Double | 1 | 11 | 52 | 1023 |
| Extended | 1 | 15 | 64 | 16383 |

Both extremes of the exponent are reserved:

| Exponent $E$ | Fraction $M$ | Meaning |
| --- | --- | --- |
| All 0 | All 0 | $\pm0$ |
| All 0 | Nonzero | Subnormal, hidden bit 0 |
| All 1 | All 0 | $\pm\infty$ |
| All 1 | Nonzero | NaN |

Expand `0x41C80000`: `0100 0001 1100 1000…` gives $S=0$ and $E=10000011_2=131$, so the true exponent is $131-127=4$. The fraction `1001000…` is $1+2^{-1}+2^{-4}=1.5625$, hence $x=1.5625\times2^4=25.0$. Now take `0xBE200000`: $S=1$, $E=01111100_2=124$, exponent $-3$, fraction $1.25$, so the value is $-1.25\times2^{-3}=-0.15625$.

## Five steps of floating-point addition

Add $x=13=1.101\times2^3$ and $y=-5.5=-1.011\times2^2$ with four fraction bits:

| Step | Action | Result |
| --- | --- | --- |
| Align | $\Delta E=3-2=1$; shift $y$'s significand right by 1 | $-0.1011\times2^3$ |
| Add | $1.1010-0.1011$ | $0.1111\times2^3$ |
| Normalize | Not $1.M$; shift left once, decrement exponent | $1.111\times2^2$ |
| Round | No bits were lost in the left shift | $1.111\times2^2$ |
| Check | Exponent $2$ lies in $-126$ to $127$ | $7.5$ |

Aligning discards low bits of the shifted significand, which is the main source of error in floating-point addition. A right shift is needed when the sum carries out, as in $1.1+1.1=11.0$: shift once and increment the exponent. An exponent above the maximum is overflow; below the minimum the result becomes zero or a subnormal by convention.

## The ALU and carry lookahead

A full adder produces $s_i=a_i\oplus b_i\oplus c_i$ and $c_{i+1}=a_ib_i+(a_i\oplus b_i)c_i$. Define generate and propagate,

$$g_i=a_ib_i,\qquad p_i=a_i\oplus b_i,\qquad c_{i+1}=g_i+p_ic_i$$

Expanding the recurrence removes the dependency on intermediate carries:

$$c_1=g_0+p_0c_0,\quad c_2=g_1+p_1g_0+p_1p_0c_0$$
$$c_3=g_2+p_2g_1+p_2p_1g_0+p_2p_1p_0c_0$$

Expanding $c_4$ adds one more level. Every product term is formed in parallel, so carry delay becomes one AND level plus one OR level instead of growing with word length.

Take $A=1011$, $B=0110$, $c_0=0$: $g=0010$ and $p=1101$. Then

$$c_1=0+1\cdot0=0,\quad c_2=1+0\cdot0=1$$
$$c_3=0+1\cdot1=1,\quad c_4=0+1\cdot1=1$$

The sum bits $s_i=p_i\oplus c_i$ give $s_3s_2s_1s_0=0001$, and with $c_4=1$ the result is $10001_2=17$, matching $11+6$.

| Structure | Gate levels | Character |
| --- | --- | --- |
| 4-bit ripple carry | 8 | Simplest, slower as width grows |
| 4-bit lookahead | 3 | Parallel carries, gate count grows quadratically |
| 16-bit ripple carry | 32 | Delay proportional to width |
| 16-bit grouped lookahead | 5 | Four 4-bit groups, two lookahead levels, feasible fan-in |

A fully lookahead 16-bit adder needs four-input AND and OR gates. Real designs therefore use 4-bit groups with a second level of lookahead, trading two levels for feasible fan-in.

## Three common misconceptions

> [!MYTH] More fraction bits mean a larger representable value.
> The fraction controls precision; the exponent controls range. Single precision has only 24 effective bits yet reaches about $10^{38}$.

> [!MYTH] Aligning the larger exponent down to the smaller works just as well.
> That would shift the larger significand left and lose its high bits. The rule is always to raise the smaller exponent.

> [!MYTH] Lookahead eliminates carry delay entirely.
> It reduces carry computation to two gate levels, but the sum still needs an XOR, and fan-in and wire delay grow with width, so 64-bit adders remain grouped.

## Practice

> [!PRACTICE] 1 · Convert
> What decimal value does `0x42C80000` denote?
>
> > [!ANSWER] Show answer
> > $S=0$, $E=10000101_2=133$, true exponent 6, fraction $1.5625$. The value is $1.5625\times2^6=100.0$.

> [!PRACTICE] 2 · Add
> With four fraction bits, compute $1.5\times2^0+1.25\times2^{-2}$.
>
> > [!ANSWER] Show answer
> > After alignment the second term is $0.0101\times2^0$. The sum is $1.1101\times2^0$, already normalized, so the result is $1.8125$.

> [!PRACTICE] 3 · Lookahead
> For $A=1111$, $B=0001$, $c_0=0$, give $g$, $p$, and $c_1$ through $c_4$.
>
> > [!ANSWER] Show answer
> > $g=0001$ and $p=1110$. Thus $c_1=1$ and $c_2=c_3=c_4=1$; the sum bits are $0000$, so the result is $10000_2=16$.

## Formal statement

An IEEE 754 single-precision number occupies 32 bits divided into $S$, $E$, and $M$ fields of 1, 8, and 23 bits, and denotes $(-1)^S(1.M)2^{E-127}$, with $E$ all zeros or all ones reserved for subnormals, zero, infinity, and NaN. Floating-point addition proceeds by alignment, significand addition, normalization, rounding, and overflow checking; alignment raises the smaller exponent and shifts its significand right by the difference, while normalization shifts left or right until the significand has the form $1.M$. In the ALU each bit satisfies $c_{i+1}=g_i+p_ic_i$ with $g_i=a_ib_i$ and $p_i=a_i\oplus b_i$; lookahead expands every carry into a two-level AND-OR expression over $g$, $p$, and $c_0$, making carry delay nearly independent of word length at the cost of gate count and fan-in, which is why practical adders use grouped lookahead.