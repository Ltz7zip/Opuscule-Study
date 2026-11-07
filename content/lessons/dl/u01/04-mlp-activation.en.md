---
slug: "mlp-activation"
subject: "dl"
unit: "u01"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Deep Learning · Mastery"
title: "Multilayer networks and activations"
subtitle: "Why one linear layer is never enough"
minutes: 13
meta: ["13 min read","Requires perceptron · loss","Mastery level"]
concepts: ["dl", "perceptron"]
prereq: ["perceptron", "loss"]
related: ["backprop", "dl"]
---

## Goal

By the end of this lecture you can explain why stacking two linear layers collapses into one, and you can write down concrete weights that let a two-layer network compute XOR.

Three moves: prove that linear stacking is useless, introduce the activation function, then work the whole thing by hand.

## Three-line recap

- A perceptron is a linear classifier: it can only draw one straight line (or hyperplane).
- A loss function squeezes "how wrong" into one number, and backpropagation differentiates that number.
- The open question: if one layer only draws lines, can several layers draw curves?

## The problem

Start with the trap most people fall into. Two layers, no activation:

$$
h = W_1 x + b_1, \qquad o = W_2 h + b_2
$$

Substitute:

$$
o = W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2)
$$

The brackets still hold one matrix and one vector. So **two linear layers are exactly one linear layer**, and a hundred layers would be one as well.

Depth on its own buys no expressiveness. To draw a curved boundary, something non-linear has to sit between the layers.

## Intuition

A linear layer changes the viewpoint: rotate, stretch, shift. Change the viewpoint as often as you like, a straight line is still straight.

An activation function folds. It bends the line at some point; enough folds can approximate any shape.

> [!NOTE]
> Depth comes from alternating two operations: linear layers recombine features, non-linear layers bend space. With only the first, a network is one big matrix forever.

## Worked by hand

Test it on XOR. Inputs $(x_1, x_2) \in \{0,1\}^2$, target $y = x_1 \oplus x_2$: 0 when the inputs agree, 1 when they differ.

First show that one layer cannot do it. A single layer outputs $o = w_1 x_1 + w_2 x_2 + b$, which must satisfy:

| Input | Target | Equation |
| --- | --- | --- |
| (0, 0) | 0 | $b = 0$ |
| (1, 0) | 1 | $w_1 = 1$ |
| (0, 1) | 1 | $w_2 = 1$ |
| (1, 1) | 0 | $w_1 + w_2 + b = 0$ |

The first three give $w_1 + w_2 + b = 2$, contradicting the fourth. No solution.

Now add a hidden layer with two ReLU units:

$$
h_1 = \mathrm{ReLU}(x_1 + x_2), \qquad h_2 = \mathrm{ReLU}(x_1 + x_2 - 1), \qquad o = h_1 - 2h_2
$$

Substitute each input:

| Input | $x_1+x_2$ | $h_1$ | $h_2$ | $o$ | Target |
| --- | --- | --- | --- | --- | --- |
| (0, 0) | 0 | 0 | 0 | 0 | 0 |
| (1, 0) | 1 | 1 | 0 | 1 | 1 |
| (0, 1) | 1 | 1 | 0 | 1 | 1 |
| (1, 1) | 2 | 2 | 1 | 0 | 0 |

All four rows correct. The two ReLUs fold the number line into three pieces, and the output layer assigns a different value to each piece — that is the expressiveness folding buys.

## Three misconceptions

> [!MYTH] More parameters always means a stronger model.
> Without non-linearity, any number of parameters is still one big linear map. Expressiveness comes from structure, not from count alone.

> [!MYTH] The activation must be sigmoid.
> Sigmoid was an early choice. Today hidden layers default to ReLU and its variants; the output layer chooses sigmoid or softmax by task.

> [!MYTH] Deeper is always better.
> Without residual connections and normalisation, deep networks are hard to train. Depth only pays off once training is stable.

## Practice

> [!PRACTICE] 1 · Judge
> A three-layer network whose hidden layers all use the identity, $\mathrm{id}(z)=z$: how many layers is it equivalent to?
>
> > [!ANSWER] Show answer
> > One. The identity bends nothing, so all the matrices multiply into a single matrix.

> [!PRACTICE] 2 · Compute
> With the XOR network above, take input $(1,1)$ and recompute $h_1$, $h_2$, $o$.
>
> > [!ANSWER] Show answer
> > $x_1 + x_2 = 2$, so $h_1 = 2$, $h_2 = 1$, and $o = 2 - 2 = 0$.

> [!PRACTICE] 3 · Transfer
> Why do binary classifiers end in sigmoid and multiclass classifiers end in softmax?
>
> > [!ANSWER] Show answer
> > Sigmoid squashes each number independently into $(0,1)$ — right for yes/no. Softmax turns a group of numbers into a distribution summing to one — right for picking one class out of many.

> [!FORMAL] Formal statement
> Let $W_1 \in \mathbb{R}^{m \times n}$ and $W_2 \in \mathbb{R}^{k \times m}$. If $\sigma$ is the identity, then $W_2 \sigma(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2)$, still an affine map. With a non-linear $\sigma$ the composition no longer collapses into a single affine map, and the universal approximation theorem guarantees that for any continuous function on a compact set and any $\varepsilon > 0$, a sufficiently wide one-hidden-layer network approximates it uniformly within $\varepsilon$.
