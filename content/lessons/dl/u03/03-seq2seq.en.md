---
slug: "seq2seq"
subject: "dl"
unit: "u03"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Deep Learning · Mastery"
title: "Sequence to sequence"
subtitle: "How encoder and decoder split the work"
minutes: 13
meta: ["13 min read","Requires LSTM","Mastery level"]
concepts: ["seq2seq", "lstm"]
prereq: ["lstm"]
related: ["attention", "rnn"]
---

## Goal

By the end of this lecture you can sketch the encoder–decoder architecture, say what teacher forcing and beam search each buy you, and hand-run one beam=2 pruning step.

## Three-line recap

- A recurrent network reads a sequence into a chain of hidden states.
- An LSTM leaves an additive channel on the cell state so information survives many steps.
- The open question: when both input and output are sequences of different lengths, how does a network move from reading to writing?

## The problem

Translate "我喜欢猫" into "I like cats": four input tokens, three output tokens, no alignment between them, and different lengths.

A fully connected layer cannot do it, because neither sequence has a fixed shape. A single recurrent network cannot either: it emits one output per step, which assumes a one-to-one correspondence. Translation, summarisation, and dialogue are not one-to-one — how many output tokens there should be is only known after reading the whole input.

## Intuition

One reads, one writes.

The encoder only reads: it consumes the input token by token, and its final hidden state is the reading note it hands over. This fixed-size vector is the context vector.

The decoder only writes: starting from the note, it generates one token per step, feeds that token back to itself, and stops at the end symbol.

Everything hinges on that handover: **the encoder compresses the entire sentence into a fixed-size vector and then steps aside.** The design is clean and simple, and it is also the source of every later difficulty.

Training does not feed the model its own output. One wrong token early on poisons everything after it and the gradients become very noisy. So the correct token is used as the next input instead — this is teacher forcing. The cost is a mismatch between training and inference: at inference there is no answer key, only the model's own output. That gap is exposure bias.

Generation adds a second choice. Greedy decoding takes the highest-probability token at each step, but a locally best choice is not a globally best sentence. Beam search keeps the top $k$ candidates, expands each one, then prunes back to $k$. With $k = 1$ it is greedy; larger $k$ finds higher-scoring sentences at a cost that grows linearly in $k$.

## Worked by hand

The vocabulary holds three symbols: `a`, `b`, and the end token `eos`. After encoding the input, the decoder's first-step distribution is:

| Token | Probability |
| --- | --- |
| `a` | 0.6 |
| `b` | 0.3 |
| `eos` | 0.1 |

Conditional on what has been generated so far:

| Given | $P(a \mid \cdot)$ | $P(b \mid \cdot)$ | $P(eos \mid \cdot)$ |
| --- | --- | --- | --- |
| `a` | 0.2 | 0.7 | 0.1 |
| `b` | 0.5 | 0.1 | 0.4 |
| `a b` | 0.05 | 0.05 | 0.90 |

Greedy takes `a` at 0.6, then `b` at 0.7, then `eos` at 0.9. The sentence score is the product $0.6 \times 0.7 \times 0.9 = 0.378$.

With beam=2 the first step keeps `a` (0.6) and `b` (0.3), and the second step expands each into three branches:

| Candidate | Computation | Score |
| --- | --- | --- |
| `a a` | $0.6 \times 0.2$ | 0.12 |
| `a b` | $0.6 \times 0.7$ | 0.42 |
| `a eos` | $0.6 \times 0.1$ | 0.06 |
| `b a` | $0.3 \times 0.5$ | 0.15 |
| `b b` | $0.3 \times 0.1$ | 0.03 |
| `b eos` | $0.3 \times 0.4$ | 0.12 |

The top two survive: `a b` (0.42) and `b a` (0.15). Notice that `b eos` (0.12) is dropped — it is already a complete sentence, yet it scores below the unfinished `b a`. That is the beam trade-off: pruning on cumulative probability discards some legal short sentences. Real implementations keep finished sentences in a separate pool that is never pruned; they are compared here only to make the scores visible.

Third step: `a b` followed by `eos` gives $0.42 \times 0.9 = 0.378$; `b a` followed by `b` gives $0.15 \times 0.7 = 0.105$, and by `eos` gives $0.15 \times 0.1 = 0.015$. The best score is still 0.378.

Probabilities multiply, so sentences decay exponentially with length. In practice the score is normalised by length, otherwise beam search systematically prefers short output.

## Three misconceptions

> [!MYTH] Encoder and decoder share the same parameters.
> Architectures may match; parameters never do. Only the vocabulary and possibly the embedding are shared. Tied weights make reading and writing compete.

> [!MYTH] Teacher forcing is just a training trick with no effect on quality.
> It creates a train/inference mismatch and is the source of exposure bias. Scheduled sampling and its relatives exist to patch that seam.

> [!MYTH] Beam search is always better than greedy.
> It maximises the model's own likelihood, not the task metric. A wide beam often returns bland, short, over-safe sentences and can lose points on translation benchmarks.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> With $P(a) = 0.5$, $P(b) = 0.3$, $P(eos) = 0.2$ and $P(b \mid a) = 0.6$, what score does greedy decoding reach in two steps?
>
> > [!ANSWER] Show answer
> > Take `a`, then `b`: $0.5 \times 0.6 = 0.30$.

> [!PRACTICE] 2 · Variation
> Continue from the previous item with $P(a \mid a) = 0.2$, $P(eos \mid a) = 0.2$, $P(a \mid b) = 0.2$, $P(b \mid b) = 0.3$, $P(eos \mid b) = 0.5$. Which two candidates survive beam=2 after two steps?
>
> > [!ANSWER] Show answer
> > The six scores are `a a` 0.10, `a b` 0.30, `a eos` 0.10, `b a` 0.06, `b b` 0.09, `b eos` 0.15. Keep `a b` and `b eos` — this time a finished sentence makes the cut.

> [!PRACTICE] 3 · Transfer
> Why does the decoder see a context vector of the same size for a 5-token input and a 50-token input?
>
> > [!ANSWER] Show answer
> > The context vector is the encoder's last hidden state, so its shape is set by the hidden dimension and not by input length. Capacity is therefore unequal, and in a long sentence the second half overwrites the first.

## Formal statement

> [!FORMAL] Formal statement
> The encoder maps $x_{1:T}$ to states $h^{enc}_{1:T}$ and sets the context vector $c = h^{enc}_T$. Conditioned on $c$, the previous output $y_{t-1}$, and its own state $s_{t-1}$, the decoder defines $p(y_{1:T'} \mid x_{1:T}) = \prod_{t} p\left(y_t \mid y_{<t}, c\right)$. Training minimises $-\sum_t \log p\left(y_t \mid y_{<t}, c\right)$, with $y_{<t}$ the true prefix under teacher forcing. Inference takes $\arg\max$ step by step, or approximates the joint maximum with beam search. Because the dimension of $c$ is independent of $T$, the whole input must fit into one vector — a fixed bottleneck of this architecture.
