---
slug: "transfer"
subject: "dl"
unit: "u02"
order: 4
mode: "mastery"
lang: "en"
title: "Transfer learning and augmentation"
subtitle: "Two ways out when data is scarce"
kicker: "Lecture 4 · Deep Learning · Mastery"
minutes: 13
meta: ["13 min read","Requires convolutional networks","Mastery level"]
concepts: ["pretrain", "cnn"]
prereq: ["cnn"]
related: ["regular", "pretrain"]
---

## Goal

By the end of this lecture you can separate feature extraction from fine-tuning, order the freezing and unfreezing steps, and count exactly how many parameters a transfer plan trains.

## Three-line recap

- Convolution uses local connectivity and weight sharing to make image parameters trainable.
- Residual connections give gradient a shortcut, so networks can reach hundreds of layers.
- The open question: these networks have tens of millions of parameters, and labelled data has to come from somewhere.

## The problem

Training ResNet-50 from scratch takes ImageNet: 1.28 million labelled images. Medical imaging, industrial inspection and rare-species recognition usually offer a few hundred to a few thousand.

What happens if you train from scratch? The network memorises the training set: 99% training accuracy, 60% validation. Too many parameters, too few samples — it learns noise instead of structure.

Two ways out:

- **Transfer learning**: borrow a network trained on a large dataset and move its representation to your task.
- **Data augmentation**: turn each image into many, without changing the label.

## Intuition

Picture a convolutional network as a pyramid. Bottom layers learn edges, colour blobs and corners; middle layers learn textures and parts; top layers learn task-specific combinations such as a cat face or a wheel.

The bottom is almost universal for vision. No need to relearn it — copy it over and replace only the top.

That gives two recipes:

- **Feature extraction**: freeze the whole backbone, swap the last layer, train only the new head. The backbone becomes a fixed feature extractor.
- **Fine-tuning**: unfreeze the top few layers of the backbone and train them with a very small learning rate. The bottom stays frozen because it encodes generic edges.

Freezing means `requires_grad = False`: the forward pass runs as usual, the backward pass does not update those parameters.

> [!NOTE]
> Use layer-wise learning rates. The head is randomly initialised and can take $10^{-3}$; an unfrozen pretrained block is already good and wants something near $10^{-5}$. Otherwise one large update destroys it.

Augmentation has exactly one rule: **after the transformation, the label must still be correct.**

Horizontal flipping is safe for cats versus dogs and unsafe for handwritten digits, where a flipped 6 may look like a 9. Colour jitter is safe for natural images and a disaster for traffic-light colour classification. A 180° rotation may be safe for satellite imagery and wrong for street photographs.

## Worked by hand

ResNet-50 for a 10-class industrial defect task.

ResNet-50 has about 25.56 million parameters. The original classifier is $2048\to1000$:

$$
2048\times1000+1000 = 2{,}049{,}000
$$

Replace it with $2048\to10$:

$$
2048\times10+10 = 20{,}490
$$

Freeze the backbone and train only the new head:

| Part | Parameters | Trained |
| --- | --- | --- |
| Backbone (frozen) | 23,508,032 | No |
| Classifier head | 20,490 | Yes |
| Total | 23,528,522 | — |

The trainable share:

$$
\frac{20{,}490}{23{,}528{,}522} \approx 0.087\%
$$

Under one part in a thousand. Memory goes mostly to backbone activations; optimiser state covers only those twenty thousand numbers.

Unfreeze the last stage (layer4 of ResNet-50, roughly 13.6 million parameters) and the trainable share jumps above half. The learning rate must drop and the dataset must grow, or the pretrained representation is washed away.

## Three misconceptions

> [!MYTH] Transfer learning is only for images.
> Text, speech and tabular tasks all have pretrained models. The idea is moving a representation learned at scale onto a small task, independent of modality.

> [!MYTH] Frozen layers do nothing.
> They still compute forward activations; they simply receive no gradient updates. At inference they are part of the full network.

> [!MYTH] More augmentation is always better.
> Only label-preserving transforms are safe. Too-aggressive augmentation injects label noise, and the model learns the wrong correspondence.

## Practice

> [!PRACTICE] 1 · Check
> After freezing the backbone, does training for many more epochs change its weights?
>
> > [!ANSWER] Show answer
> > No. With `requires_grad = False` the optimiser never updates them; only the head changes.

> [!PRACTICE] 2 · Compute
> A backbone has 10 million parameters, and its head $2048\to1000$ is replaced by $2048\to5$. Only the head is trained. What share of parameters is trainable?
>
> > [!ANSWER] Show answer
> > New head: $2048\times5+5=10{,}245$. Backbone without the old head: $10{,}000{,}000-2{,}049{,}000=7{,}951{,}000$. Total: $7{,}961{,}245$, so about $0.129\%$.

> [!PRACTICE] 3 · Transfer
> For a traffic-light colour classifier, which augmentations are safe and which are not?
>
> > [!ANSWER] Show answer
> > Brightness, contrast, slight cropping and blur are safe. Hue jitter and greyscale are not, because colour is the label. Horizontal flip is usually safe, provided the light layout does not become ambiguous when mirrored.

## Formal statement

> [!FORMAL] Formal statement
> Let the pretrained model be $f=g\circ h$, with backbone $h$ and original head $g$. Transfer learning fixes $\theta_h$ and minimises $\mathcal{L}(g_\phi(h_\theta(x)),y)$ over a new dataset $D$, updating only $\phi$. If a set of layers $S$ is unfrozen, the variables become $\phi\cup\{\theta_i:i\in S\}$, typically with different rates $\eta_\phi\gg\eta_S$. Augmentation is a sample transform $T\sim p(T)$ satisfying $y(T(x))=y(x)$; the objective becomes $\mathbb{E}_{T}\mathcal{L}(f(T(x)),y)$, which amounts to marginalising the data over a transformation group.
