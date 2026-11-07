---
slug: "classical-conditional-total-probability"
subject: "probability"
unit: "u01"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Probability and Statistics · Mastery"
title: "Classical Probability, Conditional Probability, and the Total Probability Formula"
subtitle: "Split a hard question into disjoint easy ones"
minutes: 16
meta: ["16 min read","Requires sample spaces and the addition rule","Mastery level"]
concepts: ["discprob", "counting"]
prereq: ["discprob"]
related: ["randvar", "distribution"]
---

## What you will get

You will count outcomes in equally likely models, revise a probability once information arrives, and compute an event's probability by splitting it according to causes.

The whole lecture rests on one sentence: new information does not change the world, it changes the weights you assign to its parts.

## Three lines back

- In a classical model all sample points are equally likely, so $P(A)=|A|/|\Omega|$ and the problem becomes counting.
- Conditioning compresses the sample space into $B$: $P(A\mid B)=P(A\cap B)/P(B)$.
- If $B_1,\dots,B_n$ are disjoint and cover $\Omega$, then $P(A)=\sum_i P(B_i)P(A\mid B_i)$.

## Classical models and conditioning

Draw one card from a standard deck. The probability of a heart is $13/52=0.25$; the probability of a face card is $12/52=3/13$.

Now suppose you are told the card is a heart. The sample space shrinks from 52 cards to 13, and three of those are face cards, so the answer is $3/13$. The formula confirms it:

$$
P(\text{face}\mid\text{heart})=\frac{P(\text{face}\cap\text{heart})}{P(\text{heart})}=\frac{3/52}{13/52}=\frac{3}{13}
$$

Conditioning is nothing but a change of denominator. Rearranging gives the multiplication rule

$$
P(A\cap B)=P(B)\,P(A\mid B)=P(A)\,P(B\mid A)
$$

When $P(A\mid B)=P(A)$, the events are **independent** and $P(A\cap B)=P(A)P(B)$. Independence says that knowing $B$ leaves $A$'s probability untouched; mutual exclusivity says that when $B$ happens, $A$ cannot.

| Concept | Formula | Intuition |
| --- | --- | --- |
| Conditional | $P(A\mid B)=P(A\cap B)/P(B)$ | shrink the sample space |
| Multiplication | $P(A\cap B)=P(A)P(B\mid A)$ | compute in stages |
| Independence | $P(A\cap B)=P(A)P(B)$ | information is irrelevant |
| Exclusivity | $P(A\cap B)=0$ | cannot co-occur |

## Total probability and Bayes

Partition $\Omega$ into disjoint blocks $B_1,\dots,B_n$, one per possible cause. Every event $A$ is sliced into pieces:

$$
P(A)=\sum_{i=1}^{n}P(B_i)\,P(A\mid B_i)
$$

Running the logic backwards, given that $A$ occurred, the share contributed by cause $j$ is

$$
P(B_j\mid A)=\frac{P(B_j)P(A\mid B_j)}{\sum_{i}P(B_i)P(A\mid B_i)}
$$

The denominator is the total probability already computed; the numerator is the single slice belonging to cause $j$.

## A worked urn example

Two boxes. Box 1 holds 3 white and 2 black balls; box 2 holds 1 white and 4 black. Pick a box at random with probability $1/2$ each, then draw one ball.

The probability of white is

$$
P(W)=\tfrac12\cdot\tfrac35+\tfrac12\cdot\tfrac15=0.3+0.1=0.4
$$

Given a white ball, the probability that it came from box 1 is

$$
P(B_1\mid W)=\frac{0.3}{0.4}=0.75
$$

The prior was $0.5$; seeing white raises it to $0.75$. The entire update comes from the gap between the two white-ball rates.

> [!MYTH] Bayes' formula only handles two causes.
> It works for any finite or countable collection of disjoint causes. More causes only make the sum longer.

> [!NOTE]
> The total probability formula needs the blocks to be disjoint and to cover the whole space. Overlapping blocks double-count; missing blocks make the sum fall short of one.

## Three common misconceptions

> [!MYTH] Independent events must be mutually exclusive.
> The opposite is true. If $P(A)>0$, $P(B)>0$ and they are exclusive, then $P(A\cap B)=0\ne P(A)P(B)$, so they are certainly dependent.

> [!MYTH] Conditioning always increases a probability.
> Conditioning only reweights. $P(A\mid B)$ can be larger, smaller, or equal to $P(A)$, depending on whether $B$ is positively, negatively, or not related to $A$.

> [!MYTH] Priors are subjective, so Bayesian answers are arbitrary.
> A prior is a modelling choice and the posterior is driven by data. As data accumulate, posteriors from different priors typically converge, and prior influence can be measured instead of hidden.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Two dice are rolled. Given that the sum is 8, what is the probability that the first die shows 3?
>
> > [!ANSWER] Show answer
> > Sums of 8 are $(2,6),(3,5),(4,4),(5,3),(6,2)$, five equally likely pairs. Only $(3,5)$ has first die 3, so the probability is $1/5$.

> [!PRACTICE] 2 · Variation
> A disease has prevalence $0.01$. A test has sensitivity $0.95$ and specificity $0.90$. What is the probability of disease given a positive test?
>
> > [!ANSWER] Show answer
> > $P(+)=0.01(0.95)+0.99(0.10)=0.0095+0.099=0.1085$, so $P(\text{disease}\mid +)=0.0095/0.1085\approx0.0876$. A positive test moves the probability from $1\%$ to about $8.8\%$.

> [!PRACTICE] 3 · Transfer
> Three boxes each hold two balls: box 1 white-white, box 2 black-black, box 3 one of each. Pick a box at random and draw a white ball. What is the probability it came from box 1?
>
> > [!ANSWER] Show answer
> > $P(W)=\tfrac13(1+0+\tfrac12)=\tfrac12$, so $P(\text{box 1}\mid W)=\tfrac{1/3}{1/2}=\tfrac23$.

## Formal statement

Let $(\Omega,\mathcal{F},P)$ be a probability space, $B\in\mathcal{F}$ with $P(B)>0$. Then $P(\cdot\mid B)$ is again a probability measure on $\mathcal{F}$ and satisfies the three axioms. If $\{B_i\}$ is a finite or countable partition of $\Omega$ with $P(B_i)>0$, the total probability formula holds for every $A$; when $P(A)>0$, Bayes' formula gives the posterior. Independence of two events means $P(A\cap B)=P(A)P(B)$. For several events, mutual independence requires the product rule for every subcollection; pairwise independence is not enough.
