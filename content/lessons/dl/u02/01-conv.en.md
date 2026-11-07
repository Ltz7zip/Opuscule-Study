---
slug: "conv"
subject: "dl"
unit: "u02"
order: 1
mode: "mastery"
lang: "en"
title: "Convolution and receptive fields"
subtitle: "One window, slid across the whole image"
kicker: "Lecture 1 · Deep Learning · Mastery"
minutes: 14
meta: ["14 min read","Requires matrix multiplication","Mastery level"]
concepts: ["conv", "matrix"]
prereq: ["matrix"]
related: ["pooling", "cnn"]
---

## Goal

By the end of this lecture you can explain why a fully connected layer chokes on images, hand-compute a small convolution, and derive an output size from input size, kernel size, stride, and padding.

Three moves: count parameters until it hurts, watch a kernel slide, then work a $5\times5$ example by hand.

## Three-line recap

- A multilayer network is trained by backpropagation; each layer is a matrix multiply plus a non-linearity.
- A fully connected layer flattens its input into one vector, and every output sees every input.
- The open question: an image has hundreds of thousands of pixels, and that wiring does not survive.

## The problem

Take a $224\times224$ colour image. Flattened, it is $224\times224\times3 = 150{,}528$ numbers.

Give the first hidden layer 1000 units and the weights alone number $150{,}528\times1000 \approx 1.5\times10^{8}$. That is one layer, biases excluded. Go to $1024\times1024$ and the count grows twentyfold.

Worse, the fully connected layer treats the image as a bag of unordered numbers. Shift the same cat three pixels right and almost every input entry changes; the network must learn the pattern again from scratch.

Both problems are one problem: **we gave every position its own set of weights, while the pattern in an image is the same at every position.**

## Intuition

Convolution rewires the connection: instead of every output touching every input, each output touches only a small window.

A $3\times3$ kernel is nine weights. It sits over the top-left $3\times3$ patch, multiplies the nine weights by the nine pixels and sums, producing one number. The window slides one column right and repeats. At the end of a row it drops down one row.

One kernel sweeps the whole image, and the result is a **feature map**. Two things happened:

- **Local connectivity**: each output looks only at a small neighbourhood. Nearby pixels interact strongly; distant pixels have no direct say.
- **Weight sharing**: the same nine weights are used everywhere. A cat in the top-left or the bottom-right is found by the same detector.

The parameter count drops from "pixels times units" to "kernel size" — usually a few hundred.

> [!NOTE]
> What a kernel detects is decided by data. The architecture only makes one assumption on our behalf: useful patterns are local, and they count wherever they appear.

Stride is how far the window moves each step; padding is a ring of zeros added at the border. Together with kernel size they fix the output size:

$$
O = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1
$$

## Worked by hand

Input is $5\times5$, kernel $3\times3$, stride 1, no padding. The formula gives $(5-3)/1+1 = 3$, so the output is $3\times3$.

Input $X$:

| $X$ | c1 | c2 | c3 | c4 | c5 |
| --- | --- | --- | --- | --- | --- |
| r1 | 1 | 2 | 3 | 0 | 1 |
| r2 | 0 | 1 | 2 | 3 | 1 |
| r3 | 2 | 1 | 0 | 1 | 2 |
| r4 | 3 | 2 | 1 | 0 | 1 |
| r5 | 1 | 0 | 2 | 1 | 3 |

Kernel $K$:

| $K$ | c1 | c2 | c3 |
| --- | --- | --- | --- |
| r1 | 1 | 0 | $-1$ |
| r2 | 1 | 0 | $-1$ |
| r3 | 1 | 0 | $-1$ |

Start at the top-left: rows 1–3 and columns 1–3 of $X$, multiplied entrywise by $K$:

$$
(1+0+2)-(3+2+0) = 3-5 = -2
$$

Now the centre cell: rows 2–4 and columns 2–4:

$$
(1+1+2)-(3+1+0) = 4-4 = 0
$$

Doing all nine positions:

| $Y$ | c1 | c2 | c3 |
| --- | --- | --- | --- |
| r1 | $-2$ | 0 | 1 |
| r2 | 2 | 0 | $-1$ |
| r3 | 3 | 1 | $-3$ |

This kernel subtracts the right column from the left one, so it detects vertical edges: positive where the left side is brighter. The same nine weights were used nine times; a fully connected layer from 25 inputs to 9 outputs would need 225.

## Three misconceptions

> [!MYTH] Bigger kernels are better.
> Two stacked $3\times3$ convolutions see as far as one $5\times5$, with 18 weights instead of 25, and one extra non-linearity in between.

> [!MYTH] Convolution means the signal-processing operation, so the kernel must be flipped.
> Deep learning computes cross-correlation, without the flip. The kernel is learned, so flipping only reparametrises it.

> [!MYTH] Convolutional networks only work on images.
> 1D convolutions handle audio and text; 3D convolutions handle video and volumes. The real requirement is local neighbourhood structure.

## Practice

> [!PRACTICE] 1 · Check
> Input $32\times32$, kernel $5\times5$, stride 1, padding 2. What is the output size?
>
> > [!ANSWER] Show answer
> > $(32-5+4)/1+1 = 32$. Padding 2 exactly cancels the shrinkage of a $5\times5$ kernel — this is same padding.

> [!PRACTICE] 2 · Compute
> With the input and kernel above, compute output cell (3, 3).
>
> > [!ANSWER] Show answer
> > Rows 3–5, columns 3–5: left column $0+1+2=3$, right column $2+1+3=6$, so the output is $-3$.

> [!PRACTICE] 3 · Transfer
> Three $3\times3$ stride-1 convolutions are stacked. How large is the receptive field? What changes if the middle one has stride 2?
>
> > [!ANSWER] Show answer
> > With stride 1 throughout it is $1+2+2+2=7$. With stride 2 in the middle the third layer samples every other position of the second, the field grows to 9, and the output shrinks faster.

## Formal statement

> [!FORMAL] Formal statement
> Let $X\in\mathbb{R}^{H\times W}$, $K\in\mathbb{R}^{k\times k}$, stride $s$, padding $p$. Cross-correlation gives $Y_{ij}=\sum_{u=0}^{k-1}\sum_{v=0}^{k-1}K_{uv}X_{si+u-p,\,sj+v-p}$, with out-of-range entries treated as zero and output size $H'=\lfloor (H-k+2p)/s\rfloor+1$. For a multi-channel input $X\in\mathbb{R}^{C\times H\times W}$ a single kernel has shape $C\times k\times k$ and sums over channels. The receptive field of layer $l$ satisfies $r_l=r_{l-1}+(k_l-1)\prod_{i<l}s_i$.
