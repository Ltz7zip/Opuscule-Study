---
slug: "pretrain"
subject: "dl"
unit: "u04"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Deep Learning · Mastery"
title: "Pretraining and fine-tuning"
subtitle: "General first, specific later"
minutes: 14
meta: ["14 min read","Requires Transformer · loss","Mastery level"]
concepts: ["pretrain", "transformer"]
prereq: ["transformer", "loss"]
related: ["eval", "deploy"]
---

## Goal

By the end of this lecture you can explain how self-supervision manufactures labels out of unlabelled text, sketch the two-stage pretrain-then-fine-tune pipeline, and hand-calculate the share of trainable parameters in full fine-tuning versus LoRA.

## Three-line recap

- A Transformer stacks attention into a sequence model that is parallel and deep.
- It has a great many parameters, and training it well takes a great deal of data.
- The open question: labelled data is scarce and expensive, so can we start from unlabelled text instead?

## The problem

A translation task may come with a few hundred thousand sentence pairs. A model with a billion parameters needs to read far more than that just to converge.

Labelling is the bottleneck. Having a human annotate one example costs seconds and money; scraping one page of text costs almost nothing. The two differ by three or four orders of magnitude.

The idea of pretraining is plain: ignore the task for now, let the model practise on unlabelled text with questions it sets and grades itself, then adapt the representation it learned to the task with a small amount of labelled data.

## Intuition

Self-supervised means the label comes from the input itself, with no human in the loop.

- **Masked language modelling (MLM)**: hide 15% of the words at random and ask the model to restore them. To fill in the blank in a sentence about a bank, it must read both sides, which is how it knows whether the missing word is an interest rate or a river bank.
- **Next-word prediction (CLM)**: see the first $t$ words and guess word $t+1$. It only looks left, which makes it a natural fit for generation.

Neither exercise needs labels, because the answer is already sitting in the text.

Pretraining learns what language looks like and roughly how the world works; fine-tuning learns what output format this task wants. It is general education first, then a professional course. General education does not convert directly into a grade, but without it the professional course starts from zero.

Fine-tuning has two extremes. Full fine-tuning updates every parameter and usually works best, but every task needs its own complete copy of the model. Linear probing trains only a final classification head: cheap, but it can only use what the pretrained representation already contains.

The middle ground is low-rank adaptation (LoRA): freeze the original weight $W$ and learn only a low-rank increment $\Delta W = BA$, with $B$ of shape $d \times r$, $A$ of shape $r \times d$, and $r$ much smaller than $d$. The forward pass becomes $Wx + BAx$. The change is confined to a low-rank subspace, so it is light and unlikely to wash out what was already learned.

## Worked by hand

Take $d = 4096$. One attention layer holds four $4096 \times 4096$ matrices.

| Item | Computation | Parameters |
| --- | --- | --- |
| One matrix | $4096 \times 4096$ | 16,777,216 |
| Four matrices, one layer | $4 \times 16{,}777{,}216$ | 67,108,864 |
| 32 layers | $32 \times 67{,}108{,}864$ | 2,147,483,648 |

Now LoRA with rank $r = 8$:

| Item | Computation | Parameters |
| --- | --- | --- |
| $A$ for one matrix | $8 \times 4096$ | 32,768 |
| $B$ for one matrix | $4096 \times 8$ | 32,768 |
| One matrix total | $2 \times 32{,}768$ | 65,536 |
| Four matrices, one layer | $4 \times 65{,}536$ | 262,144 |
| 32 layers | $32 \times 262{,}144$ | 8,388,608 |

The ratio:

$$
\frac{8{,}388{,}608}{2{,}147{,}483{,}648} = 0.003906 = 0.39\%
$$

Trainable parameters drop from 2.15 billion to 8.39 million, roughly one four-hundredth. Memory makes it concrete: full fine-tuning a 7B model needs 14 GB for bf16 weights plus 56 GB for the two Adam moment buffers in fp32 — past 70 GB before activations. LoRA's optimiser state follows only those 8.39 million parameters, so a single GPU can hold it.

Double the rank to 16 and the share is still only 0.78%. That is the bet behind the low-rank assumption: adapting to a task only requires moving along a narrow set of directions.

## Three misconceptions

> [!MYTH] Pretraining is just training early; it is no different from fine-tuning.
> The objectives differ — self-supervised versus usually supervised — and so does what is learned: a general representation versus a task mapping. Pretraining earns no score by itself, but without it fine-tuning starts from nothing.

> [!MYTH] Fine-tuning necessarily wipes out the pretrained knowledge.
> Catastrophic forgetting is real, but a small learning rate, frozen lower layers, and mixing in pretraining data all soften it. LoRA's low-rank constraint limits how far the weights can move, which is itself a safeguard.

> [!MYTH] More pretraining data is always better, quality aside.
> Duplicated text burns compute for nothing and noise teaches the model bad habits. At a fixed compute budget, parameters and tokens must be balanced; a huge model fed very little data is a poor trade.

## Practice

> [!PRACTICE] 1 · Check
> Between masked language modelling and next-word prediction, which one can be used for generation directly?
>
> > [!ANSWER] Show answer
> > Next-word prediction. A masked model expects blanks at training time, and inference has no blanking step, so the input distribution does not match and it cannot write word by word.

> [!PRACTICE] 2 · Hand calculation
> With $d = 1024$ and $r = 4$, count the LoRA parameters for one matrix and its share of the original.
>
> > [!ANSWER] Show answer
> > $A$ and $B$ hold $4 \times 1024 = 4096$ each, so 8192 together. The original is $1024^2 = 1{,}048{,}576$. The share is $8192 / 1{,}048{,}576 = 0.0078$, or $0.78\%$.

> [!PRACTICE] 3 · Transfer
> Why does LoRA use a low-rank increment instead of a random sparse one?
>
> > [!ANSWER] Show answer
> > Low rank needs only two small dense matrices multiplied together, which is efficient on a GPU and needs no sparse mask bookkeeping. It also encodes a reasonable prior: adapting to a task should only move a few directions.

## Formal statement

> [!FORMAL] Formal statement
> Given a sequence $x_{1:n}$, masked language modelling samples a set of masked positions $M$ and minimises
>
> $$\mathcal{L}_{\mathrm{MLM}} = -\sum_{i \in M} \log p_\theta(x_i \mid x_{\setminus M})$$
>
> Next-word prediction minimises $\mathcal{L}_{\mathrm{CLM}} = -\sum_{t=1}^{n} \log p_\theta(x_t \mid x_{<t})$. Both are self-supervised: the label is drawn from the sequence itself. LoRA rewrites a weight matrix as $W' = W + BA$, with $W \in \mathbb{R}^{d \times k}$ frozen and $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$ trained, $r \ll \min(d,k)$. The trainable count is $r(d+k)$ against $dk$, a share of $r(d+k)/(dk)$.
