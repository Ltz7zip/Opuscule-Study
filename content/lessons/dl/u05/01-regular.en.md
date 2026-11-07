---
slug: "regular"
subject: "dl"
unit: "u05"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Deep Learning · Mastery"
title: "Regularisation and dropout"
subtitle: "Stop memorising the training set"
minutes: 14
meta: ["14 min read","Requires loss functions","Mastery level"]
concepts: ["regular", "loss"]
prereq: ["loss"]
related: ["eval", "adam"]
---

## Goal

By the end of this lecture you can spot the early signs of overfitting, write the gradient form of L2 regularisation, and explain why dropout behaves differently in training and inference.

In one line: regularisation does not make a model learn more; it makes the model **commit less where the data gives no evidence**.

## Three-line recap

- Training means finding the point in parameter space that minimises training loss.
- Training loss only sees the training set, so the minimum may simply be memorisation.
- The open question: how do we bake a preference for simple, smooth solutions into the objective?

## The problem

Picture a million-parameter network with a thousand training images. It can pair every image with its label: training loss falls to $0.001$ while validation loss starts climbing after the third epoch.

Overfitting usually shows three signs: the train and validation curves fan apart; validation loss bottoms out and then rebounds; the model is confident even when wrong. Any one of them means it is time to regularise, not to grow the model.

The difficulty is that we only see numbers on the training set, yet we must bet on unseen data. Regularisation writes that bet — what counts as a trustworthy solution — directly into the objective.

## Intuition

L2 regularisation charges rent for weight magnitude: bigger weights cost more. A parameter grows only when the data justifies the rent. Geometrically, the solution is confined to a ball, and the optimiser would rather give up a little training loss than stretch one direction far.

Dropout takes another angle: switch off a random subset of units at every step, so the network cannot lean on any single feature. Training looks like fitting many subnetworks that share weights; inference uses the full network as an approximation to their average.

Data augmentation and early stopping are regularisers too. The first says “these transformations do not change the label”; the second stops before the model starts memorising.

## Worked by hand

Take a layer with two weights $w_1 = 2.0$ and $w_2 = 0.5$. The loss sends gradients $g_1 = 0.30$ and $g_2 = -0.20$. Learning rate $\eta = 0.1$, L2 coefficient $\lambda = 0.1$.

With L2 the objective is $L_{\text{total}} = L + \frac{\lambda}{2}(w_1^2 + w_2^2)$, so each gradient gains a term $\lambda w_i$:

| Parameter | Raw gradient | With decay | No decay | With decay |
| --- | --- | --- | --- | --- |
| $w_1 = 2.0$ | $0.30$ | $0.30 + 0.1 \times 2.0 = 0.50$ | $1.970$ | $1.950$ |
| $w_2 = 0.5$ | $-0.20$ | $-0.20 + 0.1 \times 0.5 = -0.15$ | $0.520$ | $0.515$ |

The rule is $w \leftarrow w - \eta g$. Decay can also be read as a multiplicative shrink: multiply by $(1 - \eta\lambda) = 0.99$ first, then follow the data gradient. So $w_1$ goes $2.0 \to 1.98$ then $-0.03$, giving $1.950$; $w_2$ goes $0.5 \to 0.495$ then $+0.02$, giving $0.515$.

Notice the absolute pull on $w_1$ is $0.02$ but only $0.005$ on $w_2$ — exactly four times, which is what “big weights pay more” means in numbers.

Dropout is shorter: an activation of $4.0$ with keep probability $p = 0.5$ becomes $4.0 / 0.5 = 8.0$ during training when the mask is 1; at inference there is no masking and the output is $4.0$. The training expectation is $0.5 \times 8.0 = 4.0$, matching inference.

## Three misconceptions

> [!MYTH] Dropout must also drop half the units at inference, or training and inference disagree.
> Inference uses the full network. Training already divides by the keep probability, which aligns the expectation — this is inverted dropout. Dropping again would only add noise.

> [!MYTH] Any regularisation improves validation performance.
> Regularisation trades bias for variance. Too large a $\lambda$ crushes the model, and both training and validation loss get worse — that is underfitting.

> [!MYTH] Data augmentation is just a way to manufacture more samples.
> Its real job is to encode which transformations leave the label unchanged. Wrong augmentation is wrong at any scale, and augmentation still helps when data is already plentiful.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Weight $w = 1.5$, data gradient $g = 0.20$, $\eta = 0.1$, $\lambda = 0.1$. Find $w$ after one step.
>
> > [!ANSWER] Show answer
> > Total gradient $0.20 + 0.1 \times 1.5 = 0.35$, so $w \leftarrow 1.5 - 0.1 \times 0.35 = 1.465$.

> [!PRACTICE] 2 · Variation
> Keep probability becomes $p = 0.8$ with activation $5.0$. What is the training output, and its expectation?
>
> > [!ANSWER] Show answer
> > Training output $5.0 / 0.8 = 6.25$; expectation $0.8 \times 6.25 = 5.0$, and inference outputs $5.0$ directly.

> [!PRACTICE] 3 · Transfer
> Early stopping never touches the loss function. Why does it still count as regularisation?
>
> > [!ANSWER] Show answer
> > It limits how long the model may stay on the training set, which limits effective capacity. For a quadratic loss, early stopping from a fixed start lands close to the solution of some L2 strength.

## Formal statement

> [!FORMAL] Formal statement
> The regularised objective is $\hat{R}(w) + \frac{\lambda}{2}\lVert w \rVert_2^2$ with gradient $\nabla \hat{R}(w) + \lambda w$, so each step is a shrink by $(1-\eta\lambda)$ followed by the data gradient. Dropout is the expectation $\mathbb{E}_m[L(w; m \odot x)/p]$ over masks $m \sim \mathrm{Bernoulli}(p)$, approximated at inference by the expectation. Early stopping halts when validation loss first fails to improve, an implicit form of regularisation.
