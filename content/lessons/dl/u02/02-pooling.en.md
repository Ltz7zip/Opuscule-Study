---
slug: "pooling"
subject: "dl"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
title: "Pooling and downsampling"
subtitle: "Compute less, wobble less"
kicker: "Lecture 2 · Deep Learning · Mastery"
minutes: 12
meta: ["12 min read","Requires convolution","Mastery level"]
concepts: ["pooling", "conv"]
prereq: ["conv"]
related: ["cnn", "conv"]
---

## Goal

By the end of this lecture you can say what pooling compresses, where the translation invariance it buys stops, and hand-compute both max pooling and average pooling.

Three steps: see the size pressure, understand the window vote, then take a $4\times4$ feature map down to $2\times2$.

## Three-line recap

- Convolution slides one small window over the whole image with shared weights.
- Stride and padding set the output size; stacking convolutions grows the receptive field.
- The open question: feature maps are still large, and one pixel of movement moves the numbers.

## The problem

A $224\times224$ input through 64 $3\times3$ kernels gives a $64\times224\times224$ feature map — about 3.2 million numbers. A few more layers and both memory and compute hit the ceiling.

The output is also position-sensitive: move the same edge one pixel right and the activation moves one cell right. A classifier cares whether there is a cat, not whether the cat's left ear sits at row 37.

So we want an operation that **shrinks the spatial size while keeping the "what is here" signal**.

## Intuition

Pooling is a vote inside a small window.

Max pooling asks: what is the strongest signal here? It keeps the maximum and discards the rest. Average pooling asks: what is the mean response? It keeps the average.

In both cases windows usually do not overlap, and each window emits one number. $4\times4$ becomes $2\times2$: half the size, zero learnable parameters. Pooling has no weights; it is a fixed operation.

Why does that give translation invariance? If a cat's ear moves one or two pixels inside the window, the maximum is likely the same number. The output does not change, so the model is insensitive to that shift.

But the invariance is **limited**. Move further than one window and the maximum lands in another cell. Pooling buys local tolerance, not global immunity.

> [!NOTE]
> Pooling has no parameters. It only reorganises information: resolution traded for compute, a little positional precision traded for stability.

## Worked by hand

A $4\times4$ feature map, $2\times2$ windows, stride 2:

| $F$ | c1 | c2 | c3 | c4 |
| --- | --- | --- | --- | --- |
| r1 | 1 | 3 | 2 | 4 |
| r2 | 5 | 6 | 1 | 2 |
| r3 | 0 | 2 | 8 | 3 |
| r4 | 4 | 1 | 7 | 5 |

Each of the four windows takes its maximum:

$$
\max(1,3,5,6)=6,\quad \max(2,4,1,2)=4
$$

$$
\max(0,2,4,1)=4,\quad \max(8,3,7,5)=8
$$

The max-pooled map:

| max | c1 | c2 |
| --- | --- | --- |
| r1 | 6 | 4 |
| r2 | 4 | 8 |

Averaging the same windows gives $(1+3+5+6)/4=3.75$, $(2+4+1+2)/4=2.25$, $(0+2+4+1)/4=1.75$, $(8+3+7+5)/4=5.75$.

| avg | c1 | c2 |
| --- | --- | --- |
| r1 | 3.75 | 2.25 |
| r2 | 1.75 | 5.75 |

Sixteen numbers become four, a 75% reduction, with zero parameters.

The difference between the two is visible right here. In the bottom-right window the 8 stands well above the others: max keeps it whole, while the average is pulled down to 5.75 by 3, 7 and 5. If that 8 were a noise spike, max would pass it on as signal and average would damp it.

## Three misconceptions

> [!MYTH] Pooling gives full translation invariance.
> Only within the window. Beyond one window the output changes, and modern networks often replace pooling with strided convolution, which is equally effective and more flexible.

> [!MYTH] Max pooling always beats average pooling.
> LeNet and AlexNet used max; later networks often end with global average. Max keeps salient features, average keeps overall strength — the task decides.

> [!MYTH] Pooling layers have parameters to train.
> None. Window size and stride are hyperparameters. In the backward pass max pooling routes gradient to the argmax, average pooling splits it evenly.

## Practice

> [!PRACTICE] 1 · Compute
> On the map above, switch to a $3\times3$ window with stride 1. What is the output size, and what is the top-left value?
>
> > [!ANSWER] Show answer
> > $(4-3)/1+1=2$, so $2\times2$. The top-left window covers the first three rows and columns; its maximum is 8.

> [!PRACTICE] 2 · Variation
> Same map, $3\times3$ window, stride 3. What is the output size, and where did the last row and column go?
>
> > [!ANSWER] Show answer
> > $\lfloor (4-3)/3\rfloor+1=1$, so $1\times1$ covering only the top-left $3\times3$. The last row and column are dropped; padding would be needed to keep them.

> [!PRACTICE] 3 · Transfer
> Global average pooling turns $C\times7\times7$ into what, and why is that useful before the classifier?
>
> > [!ANSWER] Show answer
> > $C\times1\times1$: one mean per channel. It cuts the classifier's parameters from $C\times$ classes to zero, reduces overfitting, and accepts inputs of different sizes.

## Formal statement

> [!FORMAL] Formal statement
> Let $F\in\mathbb{R}^{H\times W}$, window $k\times k$, stride $s$, no padding. The output $P\in\mathbb{R}^{H'\times W'}$ has $H'=\lfloor (H-k)/s\rfloor+1$. Max pooling is $P_{ij}=\max_{0\le u,v<k}F_{si+u,\,sj+v}$; average pooling is the arithmetic mean over the same window. Neither has learnable parameters. In the backward pass max pooling sends gradient to the position that attained the maximum (ties resolved by implementation convention), and average pooling splits gradient evenly across the window. Global average pooling is the case $k=H$, $s=H$, giving a $1\times1$ output.
