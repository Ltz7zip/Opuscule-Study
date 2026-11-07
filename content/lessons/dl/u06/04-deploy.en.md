---
slug: "deploy"
subject: "dl"
unit: "u06"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Deep Learning · Mastery"
title: "Inference and deployment"
subtitle: "From notebook to production"
minutes: 14
meta: ["14 min read","Requires model evaluation","Mastery level"]
concepts: ["deploy", "eval"]
prereq: ["eval"]
related: ["metric", "pretrain"]
---

## Goal

By the end of this lecture you can explain how the training graph differs from the inference graph, estimate the memory and per-request latency of a model, and list what must be checked before launch.

Training optimises a metric. Deployment makes that same metric reproduce on real traffic, fast enough and cheap enough.

## Three-line recap

- Evaluation tells you how good the model is on offline data.
- Good offline does not mean serviceable online: latency, memory, valid inputs, and drift all matter.
- The open question: how do you turn weights in a notebook into a stable service?

## The problem

In a notebook the model is an object: dropout is active, batch norm uses the current batch statistics, and the optimiser may still be changing the weights. In production the model must behave almost like a pure function: the same input yields the same output, within tens of milliseconds.

The difference is not "wrap it in an API". Three states must switch: dropout off, batch norm on running statistics, parameters frozen. Miss one and outputs drift with batch composition, in ways that are hard to reproduce.

## Intuition

Training is batch manufacturing: many samples at once, randomness allowed, slowness allowed. Inference is retail: one customer at a time, deterministic, fast, cheap.

Batching is the dial between them. Serve 32 requests together and the weights are read from memory once, so throughput rises; but the request at the back of the queue waits longer, so latency rises too. Throughput and latency are different quantities, and service-level agreements usually target the second.

Compression has three moves. Quantisation turns fp32 into int8, shrinking weights fourfold and easing memory bandwidth fourfold; pruning removes unimportant connections and saves compute; distillation trains a small model on a large model's output distribution and changes the architecture. All three trade accuracy for cost, so measure the loss on validation data before committing.

Launch is not the finish line. Start with shadow traffic, logging the new model's predictions without serving them; then canary, routing 5% of traffic; then an A/B test judged on product metrics; and keep a one-click rollback at every stage. Monitor the input distribution as well, because model metrics often wait for labels to come back, while input drift is visible immediately.

## Worked by hand

A 7B-parameter model served in fp16, with 1 TB/s of memory bandwidth and 24 GB of GPU memory.

| Item | Computation | Result |
| --- | --- | --- |
| Weight memory | $7\times10^9 \times 2$ B | 14 GB |
| Compute per token | $2 \times 7\times10^9$ | 14 GFLOP |
| Time to read weights | $14 / 1000$ s | 14 ms |
| Compute time at 50 TFLOPS | $14 / 50000$ s | 0.28 ms |

Decoding one token takes about 14 ms. The bottleneck is reading weights, not arithmetic. A single request runs at roughly $1/0.014 \approx 71$ tokens/s.

Now the KV cache. With 32 layers, 32 heads, head dimension 128, and fp16:

$$
2 \times 32 \times 32 \times 128 \times 2\ \text{B} = 524{,}288\ \text{B} \approx 0.5\ \text{MB/token}
$$

At a 1024-token context that is about 512 MB, negligible. At 32k tokens it becomes 16 GB, and with 14 GB of weights the total is 30 GB, which does not fit in 24 GB. At that point the context length, not the parameter count, is the binding constraint.

Batching eight requests: the weights are still read once, so 14 ms produces eight tokens, about 570 tokens/s in aggregate. The eighth request's queueing delay does not shrink. To cut latency you need a smaller model, lower precision, or more bandwidth.

## Three misconceptions

> [!MYTH] Loading the trained weights is equivalent to deploying them.
> Without switching modes, dropout still drops units at random and batch norm still uses the current batch's mean and variance, so the same input can produce different outputs in a different batch. Set evaluation mode explicitly before serving.

> [!MYTH] A larger batch lowers latency.
> Throughput rises, but per-request latency usually rises too, because requests wait for the batch to fill. Measure the two separately: throughput sets cost, latency sets experience.

> [!MYTH] Quantisation always costs accuracy, so it is off the table.
> int8 weight quantisation typically loses less than one percentage point, and a small calibration set usually makes it acceptable. Measure on validation data first; if the loss is unacceptable, quantise only some layers.

## Practice

> [!PRACTICE] 1 · Judge
> At batch size 1 in production, batch norm still uses the current sample's mean and variance. What happens?
>
> > [!ANSWER] Show answer
> > A single sample has zero variance, so normalisation degenerates into division by zero or a constant output. Inference must use the running mean and variance accumulated during training.

> [!PRACTICE] 2 · Hand calculation
> A 3B-parameter model in fp16 with 800 GB/s of bandwidth. How much memory do the weights need, and what is the per-token latency?
>
> > [!ANSWER] Show answer
> > $3\times10^9 \times 2 = 6$ GB; $6/800 = 0.0075$ s, about 7.5 ms per token.

> [!PRACTICE] 3 · Transfer
> A week after launch the average input length rises from 200 to 800 tokens. Which metrics move?
>
> > [!ANSWER] Show answer
> > Latency rises, KV cache memory rises, and long inputs may also hurt accuracy through position extrapolation or truncation. Beyond model metrics, monitor input length and the input distribution directly.

## Formal statement

> [!FORMAL] Formal statement
> During training the model is a random map $f_\theta(x; \epsilon)$, where $\epsilon$ comes from dropout masks and batch sampling. At inference $\epsilon$ is fixed, giving the deterministic map $\hat y = f_\theta(x)$. Dropout at inference is the identity, and batch norm uses the running statistics accumulated during training:
>
> $$\mu_{\text{run}} \leftarrow (1-m)\mu_{\text{run}} + m\,\mu_B, \qquad \sigma^2_{\text{run}} \leftarrow (1-m)\sigma^2_{\text{run}} + m\,\sigma^2_B$$
>
> where $m$ is the momentum. Quantisation is the affine map $q = \mathrm{round}(x/s) + z$ with dequantisation $\hat x = s(q - z)$, where $s$ and $z$ are fitted on a calibration set.
>
> Let $L$ be end-to-end latency for one request and $N$ the number of requests completed in time $T$; throughput is $N/T$. The two are not interchangeable: a larger batch usually raises $N/T$ and also raises $L$. Distribution shift means the production input distribution $P_{\text{prod}}(x)$ departs from the training distribution $P_{\text{train}}(x)$, and must be monitored independently of label feedback.
