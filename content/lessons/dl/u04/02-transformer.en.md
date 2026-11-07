---
slug: "transformer"
subject: "dl"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Deep Learning · Mastery"
title: "Transformer"
subtitle: "A sequence model without recurrence"
minutes: 16
meta: ["16 min read","Requires attention · matrix multiplication","Mastery level"]
concepts: ["transformer", "attention"]
prereq: ["attention", "matrix"]
related: ["residual", "pretrain"]
---

## Goal

By the end of this lecture you can name the four parts of a Transformer layer and the gap each one closes, hand-calculate the output shape and parameter count of multi-head attention, and explain why positional encoding and causal masking cannot be dropped.

## Three-line recap

- Attention scores queries against keys and takes a weighted sum of values.
- Softmax turns each row of scores into a distribution, so every output is a convex combination of values.
- The open question: can that single operation carry an entire sequence model?

## The problem

Use attention on its own and three gaps appear.

First, it is blind to order. Attention is a weighted sum over a set; permute the input and the output is merely permuted with it. The model itself has no notion of what comes first, yet language carries meaning precisely through order — the dog bites the man and the man bites the dog use the same words.

Second, one head expresses one relation. Some positions should look at the verb, some at the subject, some only at the neighbouring word. Forcing one set of weights to serve all of them makes the demands compete, and none is served well.

Third, it does not stack deep. Without residual connections the gradient cannot travel back through many layers, and the distribution of each layer's input drifts during training, so a slightly large learning rate diverges.

The Transformer answers with four parts: multiple heads, positional encoding, residual plus LayerNorm, and a feed-forward layer. Each closes one gap.

## Intuition

- **Multiple heads**: split $d_{\text{model}}$ into $h$ slices, let each head learn one view in its own low-dimensional space, then concatenate and project. One reader, several angles on the same sentence.
- **Positional encoding**: hand every position a fixed seat-number vector and add it to the word vector. Now position 3 and position 5 differ numerically.
- **Residual plus LayerNorm**: the residual gives the gradient a direct path that skips each layer; LayerNorm pulls each position's vector back to a stable scale. It normalises across features, per sample, never across the batch, so variable-length sequences are fine.
- **Feed-forward layer**: for each position independently, expand, apply a non-linearity, and contract. Attention exchanges information between positions; the feed-forward layer digests it within a position.
- **Masking**: the decoder sees the whole sentence during training, so scores at future positions must be set to $-\infty$; after softmax their weights are exactly 0.

> [!NOTE]
> An encoder layer holds only self-attention and a feed-forward block, and every position sees the entire input. A decoder layer adds cross-attention and puts a causal mask on its self-attention.

## Worked by hand

Take $d_{\text{model}} = 4$ and $h = 2$ heads, so each head has $d_k = d_v = 2$. The sequence has two tokens.

| Item | Computation | Result |
| --- | --- | --- |
| Output width per head | $4 / 2$ | 2 |
| One token after concatenation | $2 \times 2$ | 4 |
| Shape of the whole output | $2 \times 4$ | $2 \times 4$ |

Filling in numbers: head 1 gives token 1 the vector $(1, 0)$ and token 2 the vector $(0, 1)$; head 2 gives $(0.5, 0.5)$ and $(1, 1)$. Concatenation makes token 1 $(1, 0, 0.5, 0.5)$ and token 2 $(0, 1, 1, 1)$ — a $2 \times 4$ matrix, exactly $d_{\text{model}}$ wide.

Now the parameter count. All four projections are $4 \times 4$, ignoring biases:

| Matrix | Shape | Parameters |
| --- | --- | --- |
| $W_Q$ | $4 \times 4$ | 16 |
| $W_K$ | $4 \times 4$ | 16 |
| $W_V$ | $4 \times 4$ | 16 |
| $W_O$ | $4 \times 4$ | 16 |
| Total | | 64 |

The key comparison: with a single 4-dimensional head, $W_Q$ is still $4 \times 4 = 16$ parameters and the four matrices still total 64. Multiple heads do not double the budget; they slice the same budget into several viewpoints.

One cell of positional encoding, for good measure. With $d_{\text{model}} = 4$,

$$
\mathrm{PE}(p) = \left(\sin p,\ \cos p,\ \sin\frac{p}{100},\ \cos\frac{p}{100}\right)
$$

$p = 0$ gives $(0, 1, 0, 1)$ and $p = 1$ gives $(0.841, 0.540, 0.010, 1.000)$. The two positions differ in all four coordinates, so the model can tell them apart.

## Three misconceptions

> [!MYTH] A Transformer has no recurrence, so it cannot understand order.
> Order is injected explicitly by positional encoding. Without it the model truly cannot tell positions apart; with it, the model not only tells them apart but reaches long-range dependencies in far fewer steps than a recurrent network.

> [!MYTH] Multi-head attention multiplies the parameter count by the number of heads.
> Each head has width $d_{\text{model}}/h$, so the total projection parameters equal those of a single head. Heads buy viewpoints, not budget.

> [!MYTH] LayerNorm and BatchNorm are the same thing.
> BatchNorm computes statistics over the batch, depends on batch size, and is awkward on variable-length sequences. LayerNorm normalises over the feature dimension for each sample and each position, independent of the batch.

## Practice

> [!PRACTICE] 1 · Check
> With $d_{\text{model}} = 512$ and 8 heads, what is $d_k$ per head, and how many parameters do the four projections hold in total (no biases)?
>
> > [!ANSWER] Show answer
> > $d_k = 512/8 = 64$. Each matrix is $512 \times 512$, so the total is $4 \times 262{,}144 = 1{,}048{,}576$.

> [!PRACTICE] 2 · Hand calculation
> With $d_{\text{model}} = 8$ and 4 heads, count the parameters in $W_Q$ and compare with a single 8-dimensional head.
>
> > [!ANSWER] Show answer
> > Each head holds $8 \times 2 = 16$, so four heads hold 64. A single 8-dimensional head holds $8 \times 8 = 64$. Identical — that is what keeping the budget constant means.

> [!PRACTICE] 3 · Transfer
> What happens if you train a decoder and forget the causal mask?
>
> > [!ANSWER] Show answer
> > Position $t$ can see the answers at $t+1$ and beyond, so the loss collapses towards zero. At inference there are no future tokens to look at, the input distribution is entirely different, and outputs fall apart. The mask keeps training and inference consistent.

## Formal statement

> [!FORMAL] Formal statement
> Let the input be $X \in \mathbb{R}^{n \times d}$. Head $i$ is $\mathrm{head}_i = \mathrm{Attn}(XW_Q^i,\, XW_K^i,\, XW_V^i)$ with $W_Q^i, W_K^i, W_V^i \in \mathbb{R}^{d \times d_k}$ and $d_k = d/h$. Then
>
> $$\mathrm{MultiHead}(X) = \mathrm{Concat}(\mathrm{head}_1, \dots, \mathrm{head}_h)\,W_O, \qquad W_O \in \mathbb{R}^{d \times d}$$
>
> A layer computes $X' = \mathrm{LN}\big(X + \mathrm{MultiHead}(X)\big)$ and $X'' = \mathrm{LN}\big(X' + \mathrm{FFN}(X')\big)$, with $\mathrm{FFN}$ applied position-wise. Decoder self-attention adds a mask $M$ before the softmax, with $M_{ij} = -\infty$ whenever $j > i$ and 0 otherwise.
