---
slug: "attention"
subject: "dl"
unit: "u04"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Deep Learning · Mastery"
title: "Attention"
subtitle: "The model decides where to look"
minutes: 15
meta: ["15 min read","Requires seq2seq · matrix multiplication","Mastery level"]
concepts: ["attention", "seq2seq"]
prereq: ["seq2seq"]
related: ["transformer", "seq2seq"]
---

## Goal

By the end of this lecture you can explain attention with the three words query, key, and value, hand-calculate a three-row table of attention weights, and say why the scores are divided by $\sqrt{d_k}$.

Three moves only: see the bottleneck of a fixed vector, build the intuition of a lookup, then turn it into arithmetic with real numbers.

## Three-line recap

- A sequence-to-sequence model squeezes the whole input sentence into one fixed vector, then decodes the output from that single vector.
- The longer the sentence, the more that vector has to carry, and the earliest words are the first to be squeezed out.
- The open question: when decoding word $t$, can the model look directly back at the first word of the source?

## The problem

The encoder reads a sentence of length $n$ and hands over only its last hidden state $h_n$. That is all the decoder can see at every step.

This is a narrow pipe. Say each word carries about 20 bits; a ten-word sentence is 200 bits, all forced into one 256-dimensional vector. At fifty words the pipe has not widened, but five times as much has to fit through it.

Distance makes it worse. The first word is farthest from $h_n$ and passes through the most recurrent updates, so both information and gradient decay along the way. Yet the subject that should appear in the translation is very often that first word.

Attention replaces the pipe: instead of passing one compressed package, it keeps every encoder position and fetches from them on demand.

## Intuition

Think of attention as a dictionary lookup.

- **Query Q**: what I am looking for right now, usually the decoder's current state.
- **Key K**: the label each position hangs out, saying roughly what it holds.
- **Value V**: what each position can actually supply.

The query is compared with every key to produce a score; the scores go through softmax to become weights; the weights take a weighted average of all the values. The comparison is a dot product, because a dot product measures direction and length at once, and at matrix level it is a single $QK^\top$.

> [!NOTE]
> The output of attention is always a mixture of all values, never a single chosen value. The weights form a distribution whose rows sum to 1.

## Worked by hand

Take two-dimensional keys, query $q = (1, 0)$, and three positions with one key and one value each.

| Position | Key $k$ | Value $v$ | $q \cdot k$ | Divided by $\sqrt{2}$ | $e^{(\cdot)}$ | Weight |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | $(1, 0)$ | $(1, 0)$ | 1 | 0.707 | 2.028 | 0.401 |
| 2 | $(0, 1)$ | $(0, 1)$ | 0 | 0 | 1.000 | 0.198 |
| 3 | $(1, 1)$ | $(1, 1)$ | 1 | 0.707 | 2.028 | 0.401 |

The exponentials sum to $2.028 + 1.000 + 2.028 = 5.056$. Dividing each row by it gives $0.401$, $0.198$, $0.401$, and they add up to exactly 1.

The output is the weighted sum:

$$
o = 0.401\,(1,0) + 0.198\,(0,1) + 0.401\,(1,1) = (0.802,\ 0.599)
$$

Read the table: the query is looking for the direction where the first coordinate is positive. Positions 1 and 3 match and take about forty percent each; position 2 only has the second coordinate and takes twenty percent. The first output coordinate, 0.802, is clearly larger than the second, 0.599, exactly as the weights predict.

Now drop the $\sqrt{2}$. The scores are $1, 0, 1$ and the weights become $0.422, 0.155, 0.422$: sharper, with a bigger maximum and a smaller minimum. At higher dimensions this sharpening runs to the extreme — softmax saturates, gradients approach zero, and learning stalls. That is the entire reason for the scaling factor.

## Three misconceptions

> [!MYTH] Attention picks the single most relevant position.
> It averages. Every weight is positive and the output is decided by all values together; a near one-hot row is only an extreme case.

> [!MYTH] Dividing by $\sqrt{d_k}$ is what makes the weights sum to 1.
> Softmax does the normalising, and it is independent of scaling. Scaling controls the variance of the scores: a dot product in $d_k$ dimensions has variance growing linearly in $d_k$, and without damping the softmax saturates.

> [!MYTH] Attention weights are the model's explanation.
> A weight only says how much this head, in this layer, at this step gave to each position. Heads stack, later layers recombine, and a high weight is not the same as causal importance.

## Practice

> [!PRACTICE] 1 · Check
> Three identical keys give identical inner products with the query. What are the weights, and what is the output?
>
> > [!ANSWER] Show answer
> > Softmax over three equal numbers gives $1/3$ each. The output is the average of the three values.

> [!PRACTICE] 2 · Hand calculation
> Keep the same keys and values, but change the query to $q = (0, 1)$. Recompute the weights and the output.
>
> > [!ANSWER] Show answer
> > Scores are $0, 1, 1$, scaled to $0, 0.707, 0.707$, so the weights are $0.198, 0.401, 0.401$. The output is $0.198(1,0) + 0.401(0,1) + 0.401(1,1) = (0.599, 0.802)$ — the two coordinates swap, as expected.

> [!PRACTICE] 3 · Transfer
> In a 50-word input, how many steps does the decoder need to reach the first word with attention? And with a fixed vector?
>
> > [!ANSWER] Show answer
> > One step: the decoding state takes a dot product directly with the key at position one. With a fixed vector, the first word's information must pass through dozens of recurrent updates before it arrives.

## Formal statement

> [!FORMAL] Formal statement
> Let $Q \in \mathbb{R}^{n \times d_k}$, $K \in \mathbb{R}^{m \times d_k}$, and $V \in \mathbb{R}^{m \times d_v}$. Then
>
> $$\mathrm{Attn}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$
>
> Softmax is applied row by row and the output has shape $n \times d_v$. Entry $(i,j)$ of the score matrix is the inner product of query $i$ and key $j$; each row of weights is non-negative and sums to 1, so every output is a convex combination of the value vectors.
