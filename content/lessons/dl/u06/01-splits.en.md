---
slug: "splits"
subject: "dl"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Deep Learning · Mastery"
title: "Splits and cross-validation"
subtitle: "Never grade with the exam you studied"
minutes: 13
meta: ["13 min read","Requires loss functions","Mastery level"]
concepts: ["eval", "loss"]
prereq: ["loss"]
related: ["metric", "regular"]
---

## Goal

By the end of this lecture you can design an honest split for a dataset, explain what the training, validation, and test sets each answer, and hand-calculate both the cost of k-fold cross-validation and the inflation caused by leakage.

No new models here. We are solving a more basic problem: how do you know your model is genuinely good rather than merely well memorised?

## Three-line recap

- A loss function compresses "how wrong" into one number, and training pushes that number down.
- But loss on the training set only says how much the model memorised, not how it behaves on new samples.
- The open question: which data should judge generalisation, and how do we keep that judgement uncontaminated?

## The problem

Parameters are learned from training data. When the same data both fits the parameters and scores them, the score is inflated by construction: the model can at least memorise what it has seen.

Selection is subtler. You train twenty models, pick the best on the test set, then report its test score. That number no longer measures performance on unseen data, because the test set took part in the choice. "The test set may be used once" is exactly this rule.

## Intuition

Think of three kinds of exam paper. The training set is the textbook exercises: revisit them as often as you like. The validation set is a mock exam: it decides which study method works and when to stop. You may sit it many times, but every decision overfits it a little. The test set is the final exam: once.

If the mock and the final are the same paper, the score is inflated. If practice questions leak into the final, it is worse.

k-fold cross-validation makes the mock more stable: cut the data into $k$ parts, hold out one part at a time, train on the rest, and average the $k$ results. Every part serves as an exam once, so the data is used fully and the luck of drawing an easy validation set shrinks.

Stratified sampling keeps the class ratio of each fold equal to the whole. With nine negatives for every positive, a random cut can produce an all-negative fold, and that fold's metric means nothing.

Time series must be split by time: predict the future from the past. Shuffling lets the model use tomorrow to predict today, which looks great offline and collapses in production. For the same reason, multiple records from one user or one patient must stay in a single fold.

## Worked by hand

Take 1000 samples and 5-fold cross-validation. Each fold validates on 200 and trains on 800. Five models are trained, so the total is five runs and 4000 training samples seen.

| Item | Computation | Result |
| --- | --- | --- |
| Validation per fold | $1000 / 5$ | 200 |
| Training per fold | $1000 - 200$ | 800 |
| Number of fits | 5 folds | 5 |
| Training samples seen | $5 \times 800$ | 4000 |

Now the price of leakage. The test set has 200 samples and true accuracy is 50%. Because deduplication failed, 60 of them appear verbatim in training and the model gets all 60 right. The remaining 140 are still right half the time.

$$
\frac{60 + 0.5 \times 140}{200} = \frac{130}{200} = 65\%
$$

The reported 65% is 15 points above the true 50%. Those 15 points are not a stronger model; they are a leaked exam.

## Three misconceptions

> [!MYTH] With enough data, one split is enough.
> More data lowers the variance of the estimate; it does not remove selection bias. As long as you keep choosing models and tuning hyperparameters on the same data, that data is quietly becoming a validation set. The more data you have, the more you should reserve a test set you never touch.

> [!MYTH] Solid cross-validation removes the need for a test set.
> Every fold took part in model selection, so the average is still optimistic. Cross-validation buys stability, not unbiasedness. The final number must come from data that played no role in any decision.

> [!MYTH] Random shuffling is always correct.
> It is valid only for i.i.d. samples. Split time series by time, grouped data by group, and drop duplicates before splitting.

## Practice

> [!PRACTICE] 1 · Judge
> You try 30 hyperparameter settings on the test set, pick the best, and report 91% test accuracy. Can you trust it?
>
> > [!ANSWER] Show answer
> > No. The test set took part in selection, so 91% is the maximum of 30 tries and is optimistic by construction. Select on validation data and run the test set once, at the end.

> [!PRACTICE] 2 · Hand calculation
> With 800 samples and 4-fold cross-validation, how many samples are used for training and validation per fold, and how many samples are seen in total?
>
> > [!ANSWER] Show answer
> > 200 for validation and 600 for training per fold; four fits, so $4 \times 600 = 2400$ samples in total.

> [!PRACTICE] 3 · Transfer
> For text classification you fit TF-IDF and normalisation on the whole corpus, then split. What is wrong?
>
> > [!ANSWER] Show answer
> > Preprocessing saw all the data, so the vocabulary and statistics already contain test information: leakage. Fit the preprocessor on the training fold only, then apply it to validation and test.

## Formal statement

> [!FORMAL] Formal statement
> Let $(x_i, y_i)$ be drawn i.i.d. from $P$, with risk $R(f) = \mathbb{E}_{(x,y)\sim P}[\ell(f(x), y)]$. The training set minimises empirical risk, the validation set selects $\hat f$ within a hypothesis space or hyperparameter grid, and the test set only estimates $R(\hat f)$ and must be independent of the selection.
>
> k-fold cross-validation partitions the data into disjoint $D_1,\dots,D_k$; the estimate for fold $j$ is
>
> $$\hat R_j = \frac{1}{|D_j|}\sum_{(x,y)\in D_j} \ell(\hat f_{-j}(x), y), \qquad \hat R_{\text{cv}} = \frac{1}{k}\sum_{j=1}^{k}\hat R_j$$
>
> where $\hat f_{-j}$ is trained only on $\bigcup_{i\neq j} D_i$. When samples are dependent (time, groups), the split must cut along the dependence structure, otherwise $\hat R_{\text{cv}}$ is no longer a consistent estimator of $R$.
