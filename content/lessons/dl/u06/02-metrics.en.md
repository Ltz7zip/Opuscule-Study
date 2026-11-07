---
slug: "metrics"
subject: "dl"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Deep Learning · Mastery"
title: "Classification metrics"
subtitle: "When accuracy lies"
minutes: 14
meta: ["14 min read","Requires model evaluation","Mastery level"]
concepts: ["metric", "eval"]
prereq: ["eval"]
related: ["deploy", "eval"]
---

## Goal

By the end of this lecture you can compute accuracy, precision, recall, and F1 from a confusion matrix, explain why accuracy fails under class imbalance, and justify a metric choice for your own task.

A metric is not an objective score. It is a statement about which mistake you fear more.

## Three-line recap

- Splitting decides which data does the scoring.
- Scoring needs one number, and the choice of that number depends on which error the product can least afford.
- The open question: when does accuracy lie?

## The problem

Take 1000 samples, 990 negative and 10 positive. A model that always says "negative" scores 99% accuracy. It catches none of the positives, yet beats most models that were trained in earnest.

Accuracy treats both error types as equally costly. In practice they rarely are: missing a patient and raising a false alarm differ by orders of magnitude. You need a metric that counts the two errors separately.

## Intuition

Think of the model as a fire alarm.

Precision asks: when it rings, how often is there a real fire? Recall asks: when there is a real fire, how often does it ring?

- Low precision is the boy who cried wolf; users learn to ignore the alarm.
- Low recall is the fire nobody reported; the cost lands on the one time it stayed silent.

The two trade off. Lower the threshold and the alarm fires more readily: recall rises, precision falls. Raise it and the reverse happens. A single operating point means little; the shape of the whole curve is the point.

F1 is their harmonic mean, which leans toward the smaller value. With precision 0.9 and recall 0.1, the arithmetic mean is 0.5 and looks tolerable; F1 is 0.18 and exposes the imbalance immediately.

## Worked by hand

Take a binary confusion matrix: $TP = 40$, $FP = 10$, $FN = 20$, $TN = 930$.

| Metric | Formula | Computation | Result |
| --- | --- | --- | --- |
| Accuracy | $(TP+TN)/N$ | $(40+930)/1000$ | 0.970 |
| Precision | $TP/(TP+FP)$ | $40/50$ | 0.800 |
| Recall | $TP/(TP+FN)$ | $40/60$ | 0.667 |
| F1 | $2PR/(P+R)$ | $2(0.8)(0.667)/(1.467)$ | 0.727 |

97% accuracy looks strong. Yet one positive in three is missed: recall is only 66.7%. For a screening test that is a clinical difference, not a rounding error.

Now the opposite extreme. Set the threshold to "predict positive always": recall is 100%, precision is $60/1000 = 6\%$, and F1 is 0.113. Any single operating point can be bought by sacrificing the other, so a metric report must include the threshold and the confusion matrix.

## Three misconceptions

> [!MYTH] High accuracy means a good model.
> Under imbalance, the majority class alone earns a high score. Draw the confusion matrix and compute an all-majority baseline before claiming the model learned anything.

> [!MYTH] F1 is always better than accuracy.
> F1 assumes precision and recall matter equally. If false positives cost far more (automatic account bans), look at precision; if misses are catastrophic (cancer screening), look at recall, or fix recall and compare precision.

> [!MYTH] A high AUC means the threshold is settled.
> AUC measures ranking quality and is threshold-free. Production needs one operating point, chosen from the PR curve against business costs. A model with AUC 0.95 can still sit at 40% precision when recall is 90%.

## Practice

> [!PRACTICE] 1 · Judge
> With 990 negatives and 10 positives, a model predicts negative for everything. What are accuracy and recall?
>
> > [!ANSWER] Show answer
> > Accuracy is $990/1000 = 99\%$; recall is $0/10 = 0$. Precision is undefined with no positive predictions and is conventionally reported as 0.

> [!PRACTICE] 2 · Hand calculation
> $TP = 30$, $FP = 20$, $FN = 10$, $TN = 940$. Compute accuracy, precision, recall, and F1.
>
> > [!ANSWER] Show answer
> > Accuracy $970/1000 = 0.97$; precision $30/50 = 0.60$; recall $30/40 = 0.75$; $F_1 = 2(0.6)(0.75)/1.35 = 0.667$.

> [!PRACTICE] 3 · Transfer
> In a ten-class problem the largest class holds 80% of the data. Which reflects minority performance better, macro-F1 or micro-F1, and why?
>
> > [!ANSWER] Show answer
> > Macro-F1. It averages per-class F1, giving every class equal weight. Micro-F1 pools all TP, FP, and FN before computing, so the large class dominates and the result approaches accuracy.

## Formal statement

> [!FORMAL] Formal statement
> For a threshold $t$, predict $\hat y = \mathbb{1}[s(x) \ge t]$ and let the confusion matrix counts be $TP, FP, FN, TN$. Define
>
> $$P = \frac{TP}{TP+FP}, \qquad R = \frac{TP}{TP+FN}, \qquad F_1 = \frac{2PR}{P+R}$$
>
> $F_1$ is the harmonic mean of $P$ and $R$, equivalently $\frac{2TP}{2TP+FP+FN}$. Varying $t$ traces the parametric curve $(R(t), P(t))$, the PR curve; the ROC curve uses the false positive rate $FPR = FP/(FP+TN)$ on the horizontal axis.
>
> For $C$ classes, macro averaging is $\frac{1}{C}\sum_{c=1}^{C} F_1^{(c)}$ with equal weight per class, while micro averaging pools the counts across classes and applies the binary formula, which equals overall accuracy. The choice states whether minority classes deserve the same weight as the majority.
