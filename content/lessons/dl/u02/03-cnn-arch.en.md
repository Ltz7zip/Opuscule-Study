---
slug: "cnn-arch"
subject: "dl"
unit: "u02"
order: 3
mode: "mastery"
lang: "en"
title: "Classic architectures: LeNet to ResNet"
subtitle: "How depth became trainable"
kicker: "Lecture 3 · Deep Learning · Mastery"
minutes: 15
meta: ["15 min read","Requires convolution · pooling","Mastery level"]
concepts: ["cnn", "residual"]
prereq: ["conv", "pooling"]
related: ["residual", "backprop"]
---

## Goal

By the end of this lecture you can trace LeNet, AlexNet, VGG and ResNet and say what each step fixed, hand-compute a residual block forward and backward, and count a convolution layer's parameters.

## Three-line recap

- Convolution uses local connectivity and weight sharing to keep image parameters manageable.
- Pooling shrinks the spatial size, trading resolution for compute.
- The open question: the pieces exist, so why does simply stacking more layers fail?

## The problem

Stack convolutions and pooling and you have a convolutional network. How deep?

AlexNet in 2012 had 8 layers; VGG in 2014 reached 16 to 19. Depth should mean more expressive power. Experiments said otherwise: train a plain 20-layer and a plain 56-layer network, and the **56-layer one has higher training error**.

This is not overfitting. Overfitting means low training error and high test error; here training error itself refuses to fall. The paper calls it **degradation**.

It is not just parameter count or vanishing gradients either. In principle the 56-layer network could learn its last 36 layers as identity and be no worse than the 20-layer one. But making a stack of non-linear layers represent identity exactly is very hard for an optimiser.

## Intuition

A residual connection changes the question.

Instead of learning the target map $H(x)$, the block learns the **residual** $F(x)=H(x)-x$ and adds the input back:

$$
y = F(x) + x
$$

If the best transformation is "do nothing", driving $F(x)$ to zero is far easier than making a pile of weights equal the identity matrix.

Backward is where it really pays. For $y=F(x)+x$:

$$
\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y}\left(1+\frac{\partial F}{\partial x}\right)
$$

There is always a $1$ in the bracket. However small $\partial F/\partial x$ is, gradient can travel straight back along the identity path. Over dozens of layers that route keeps the signal from decaying to zero.

While we are here: a $1\times1$ convolution linearly mixes channels at each spatial position. Compress 256 channels to 64, process, expand back to 256 — far cheaper than a $3\times3$ convolution with the same reach. It leaves the spatial size alone and only changes channels.

## Worked by hand

Take $x=1$ and a residual branch of two linear layers with ReLU: $F(x)=w_2\,\mathrm{ReLU}(w_1x)$, with $w_1=2$ and $w_2=0.5$.

Forward:

| Step | Computation | Result |
| --- | --- | --- |
| Linear | $z=w_1x$ | 2 |
| Activation | $a=\mathrm{ReLU}(z)$ | 2 |
| Residual branch | $F=w_2a$ | 1 |
| Output | $y=F+x$ | 2 |

Backward, with upstream gradient $\partial L/\partial y=1$:

| Step | Computation | Result |
| --- | --- | --- |
| Residual branch | $\partial L/\partial F=1$ | 1 |
| $w_2$ | $1\cdot a$ | 2 |
| Activation | $\partial L/\partial a=1\cdot w_2$ | 0.5 |
| $z$ (since $z>0$) | $0.5\cdot 1$ | 0.5 |
| $w_1$ | $0.5\cdot x$ | 0.5 |
| Input (branch) | $0.5\cdot w_1$ | 1 |
| Input (total) | $\partial L/\partial x=1+1$ | 2 |

The input gradient is $2$, not $1$. The branch alone contributes $1$; the extra $1$ comes from the identity path. Multiply that structure through many blocks and depth stops being the enemy of the gradient.

Now count a convolution layer: 64 input channels, 64 output channels, $3\times3$ kernel.

$$
3\times3\times64\times64 = 36{,}864
$$

With 64 biases that is $36{,}928$. A $7\times7$ kernel would need $7\times7\times64\times64=200{,}704$, 5.4 times more. That is why VGG uses $3\times3$ throughout: two of them see as far as one $5\times5$, for $2\times9=18$ weights instead of 25.

## Three misconceptions

> [!MYTH] Residual connections add parameters.
> The identity path has none. Parameters come from $F$ alone; a residual block adds just one addition.

> [!MYTH] Deeper is always better.
> Without residuals and normalisation, deep networks degrade. Depth pays off only after the network becomes trainable.

> [!MYTH] VGG's value is its parameter count.
> It has 138 million parameters, more than ResNet-50. Its real contribution was proving that small kernels stacked deep work.

## Practice

> [!PRACTICE] 1 · Check
> In a residual block, $F$ happens to be the identity map. What is the output?
>
> > [!ANSWER] Show answer
> > $y=x+x=2x$, not $x$. The residual learns an increment, not a replacement; "do nothing" corresponds to $F=0$.

> [!PRACTICE] 2 · Compute
> A $3\times3$ convolution takes 128 input channels to 256 output channels. How many parameters, biases included?
>
> > [!ANSWER] Show answer
> > $3\times3\times128\times256=294{,}912$, plus 256 biases, for $295{,}168$.

> [!PRACTICE] 3 · Transfer
> Both $1\times1$ convolutions and fully connected layers mix channels. What separates them?
>
> > [!ANSWER] Show answer
> > A $1\times1$ convolution shares one set of channel weights across every spatial position, so its parameter count is independent of image size. A fully connected layer also links spatial positions, so its count grows with $H\times W$.

## Formal statement

> [!FORMAL] Formal statement
> A residual block is $y=F(x;W)+x$, where $F$ composes convolutions, normalisation and activations, and $x$ and $y$ share a shape; when channel counts differ, a $1\times1$ projection $W_sx$ aligns them. Backward gives $\partial L/\partial x=(\partial L/\partial y)(I+\partial F/\partial x)$, and the identity term $I$ guarantees a gradient path that bypasses every non-linearity. For $L$ stacked blocks the gradient expands as $\prod_{l}(I+\partial F_l/\partial x_l)$; every subset product survives, so long-range gradient never depends on one long chain of small factors.
