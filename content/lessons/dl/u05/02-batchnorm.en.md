---
slug: "batchnorm"
subject: "dl"
unit: "u05"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Deep Learning · Mastery"
title: "Normalisation and initialisation"
subtitle: "Keep every layer's input on level ground"
minutes: 14
meta: ["14 min read","Requires backpropagation","Mastery level"]
concepts: ["batchnorm", "grad"]
prereq: ["grad"]
related: ["regular", "adam"]
---

## Goal

By the end of this lecture you can write out a full BatchNorm computation, explain the difference between training and inference, and say why initialisation controls variance through fan-in.

In one line: normalisation decides what range each layer receives; initialisation makes the first pass start inside that range.

## Three-line recap

- Backpropagation tells every parameter which way to move, and how far.
- It assumes each layer's input distribution stays stable, so gradients do not swing wildly.
- The open question: with many layers, input scale drifts layer by layer — can gradients still travel back cleanly?

## The problem

Stack thirty layers. If each one multiplies the variance of its input by $1.5$, by layer thirty the factor is $1.5^{30} \approx 1.9 \times 10^5$. Activations overflow, gradients are amplified by the same factor, and one update can push the weights somewhere unrecoverable. Shrink slightly at every layer instead, and the signal reaching depth is noise.

This is what “deep networks blow up at the start” means. It is not about capacity; it is about numerical scale. Each layer's input distribution keeps shifting during training, later layers must chase earlier ones, and the learning rate has to stay tiny.

## Intuition

BatchNorm is blunt: over a mini-batch, subtract the mean and divide by the standard deviation for each feature, then rescale and shift with two learnable parameters $\gamma$ and $\beta$. Standardisation pins the scale down; $\gamma$ and $\beta$ hand back the choice of how much of the original spread to restore.

The crucial split is train versus inference: training uses the current batch's statistics and stores a running average; inference uses the stored values, because it may have to predict a single example.

LayerNorm changes the axis: it standardises across the features of one sample, independent of batch size. With variable sequence lengths and tiny batches it is steadier than BatchNorm, which is why Transformers use it.

Initialisation follows the same logic: keep the output variance roughly equal to the input variance. For $y = \sum_{i=1}^{n} w_i x_i$, $\mathrm{Var}(y) = n \cdot \mathrm{Var}(w)\mathrm{Var}(x)$, so the weight variance should be $1/n$. ReLU zeroes half the activations, halving the variance, hence the extra factor of two in He initialisation.

## Worked by hand

Take one feature across a batch, $x = [1, 3, 5, 7]$, with $\gamma = 2$ and $\beta = 1$.

| Step | Computation | Result |
| --- | --- | --- |
| Mean | $(1+3+5+7)/4$ | $4$ |
| Variance | $((-3)^2+(-1)^2+1^2+3^2)/4$ | $5$ |
| Standard deviation | $\sqrt{5}$ | $2.236$ |
| Standardise $x_1$ | $(1-4)/2.236$ | $-1.342$ |
| Standardise $x_4$ | $(7-4)/2.236$ | $1.342$ |
| Scale and shift $x_1$ | $2 \times (-1.342) + 1$ | $-1.683$ |
| Scale and shift $x_4$ | $2 \times 1.342 + 1$ | $3.683$ |

The four outputs are $[-1.683,\ 0.106,\ 1.894,\ 3.683]$. Their mean is exactly $\beta = 1$ and their standard deviation is exactly $\gamma = 2$ — hence the names shift and scale.

Now initialisation. A layer has fan-in $n = 512$. He initialisation asks for $\mathrm{Var}(w) = 2/512 = 0.00390625$, so the standard deviation is $\sqrt{0.00390625} = 0.0625$. Xavier with fan-in and fan-out both 512 gives $\mathrm{Var}(w) = 2/1024$ and a standard deviation of about $0.0442$. The ratio is roughly $1.41 = \sqrt{2}$.

## Three misconceptions

> [!MYTH] BatchNorm works because it removes internal covariate shift.
> That was the original story, later challenged: injecting distribution shift on purpose still leaves BN effective. The better account is that it smooths the loss landscape and makes gradients scale-insensitive, which permits larger learning rates.

> [!MYTH] Inference should also use the current batch's mean and variance.
> Inference uses the running averages accumulated during training. Otherwise the same image would get different outputs in different batches, and deployment could not be reproduced.

> [!MYTH] Initialisation only affects convergence speed, not whether training works at all.
> A wrong scale makes the signal vanish or explode. $1.5^{30}$ is not a matter of going slower; the weights are ruined within a few steps.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> $x = [2, 4, 6, 8]$. Find the mean, the variance, and the standardised first value.
>
> > [!ANSWER] Show answer
> > Mean $5$, variance $5$, standard deviation $2.236$, so $(2-5)/2.236 = -1.342$.

> [!PRACTICE] 2 · Variation
> Fan-in $n = 128$ with ReLU. What is the He standard deviation?
>
> > [!ANSWER] Show answer
> > $\mathrm{Var}(w) = 2/128 = 0.015625$, so the standard deviation is $\sqrt{0.015625} = 0.125$.

> [!PRACTICE] 3 · Transfer
> Why do Transformers use LayerNorm rather than BatchNorm?
>
> > [!ANSWER] Show answer
> > Sequence lengths vary and samples within a batch differ a lot, so batch statistics are unstable. LayerNorm is computed per sample, behaves identically in training and inference, and ignores batch size.

## Formal statement

> [!FORMAL] Formal statement
> For a feature $x$ over a batch $B$, BatchNorm computes $\mu_B = \frac{1}{|B|}\sum x$ and $\sigma_B^2 = \frac{1}{|B|}\sum (x-\mu_B)^2$, then outputs $y = \gamma \hat{x} + \beta$ with $\hat{x} = (x-\mu_B)/\sqrt{\sigma_B^2+\epsilon}$. Training updates running statistics $\mu \leftarrow (1-m)\mu + m\mu_B$ with momentum $m$; inference uses $\mu, \sigma^2$. LayerNorm sums over the feature axis of a single sample instead. Initialisation chooses $\mathrm{Var}(w)$ so that $\mathrm{Var}(y) \approx \mathrm{Var}(x)$: $2/(n_{\text{in}}+n_{\text{out}})$ for Xavier, $2/n_{\text{in}}$ for He.
