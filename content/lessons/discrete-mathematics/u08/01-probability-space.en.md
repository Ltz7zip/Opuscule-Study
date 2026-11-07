---
slug: "probability-space"
subject: "discrete-mathematics"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Discrete Probability Spaces and Conditional Probability"
subtitle: "Turning possibility into counting"
minutes: 15
meta: ["15 min read","Requires counting principles","Mastery level"]
concepts: ["discprob", "counting", "randvar"]
prereq: ["counting"]
related: ["expectation", "randvar"]
---

## What you will get

By the end of this lecture you can write down the three components of a finite probability space, compute probabilities of equally likely events by counting, calculate conditional probabilities, and decide whether two events are independent.

Three things: sample space and events, the counting formula in the uniform model, and how conditioning shrinks the sample space.

## Three lines back

- The possible outcomes of a random experiment form the sample space $\Omega$; an event is a subset of $\Omega$.
- Probability assigns each event a number in $[0,1]$, gives the whole space 1, and adds over disjoint events.
- In a finite uniform model, probability is favourable outcomes divided by total outcomes, so counting is the foundation.

## Probability spaces

A finite probability space has three parts: a finite non-empty sample space $\Omega$; an event field $\mathcal{F}$, usually all subsets of $\Omega$; and a function $P:\mathcal{F}\to[0,1]$ with

$$
P(\Omega)=1,\qquad P(A\cup B)=P(A)+P(B)\ \text{when }A\cap B=\varnothing
$$

If every outcome is equally likely, then $P(\{\omega\})=1/|\Omega|$ and hence

$$
P(A)=\frac{|A|}{|\Omega|}
$$

Example: roll two fair dice, so $\Omega=\{(i,j)\mid1\le i,j\le6\}$ and $|\Omega|=36$. A sum of 7 comes from $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$, six outcomes, so $P=6/36=1/6$. A sum of 2 comes only from $(1,1)$, with probability $1/36$.

| Sum | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Outcomes | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |

The total is $36$, matching $|\Omega|$. The table also shows why 7 is the most likely sum: it has the most outcomes.

## Conditional probability

Given that $B$ occurred, the probability of $A$ under that condition is

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(B)>0
$$

Conditioning shrinks the sample space from $\Omega$ to $B$ and asks how much of $B$ lies in $A$.

Example: let $A$ be "at least one die shows 6" and $B$ be "the sum is even". Then $|A|=36-25=11$ and $P(A)=11/36$; $|B|=18$ and $P(B)=1/2$. The intersection $A\cap B$ requires a 6 and an even sum, so the other die is even:

$$
A\cap B=\{(6,2),(6,4),(6,6),(2,6),(4,6)\},\qquad |A\cap B|=5
$$

Thus

$$
P(A\mid B)=\frac{5/36}{18/36}=\frac{5}{18}\approx0.278
$$

This is slightly below the unconditional $11/36\approx0.306$: among even sums, a 6 is a little less likely.

> [!NOTE]
> The multiplication rule $P(A\cap B)=P(A\mid B)P(B)$ is the standard way to build joint probabilities step by step; the law of total probability splits them over $B$ and $\overline{B}$.

## Independence and basic operations

Events $A,B$ are independent when

$$
P(A\cap B)=P(A)P(B)
$$

Equivalently, if $P(B)>0$, then $P(A\mid B)=P(A)$: learning $B$ does not change the probability of $A$.

Example: let $C$ be "the first die shows 6" and $D$ be "the second die shows 6". Then $P(C)=P(D)=1/6$ and $P(C\cap D)=1/36=P(C)P(D)$, so $C$ and $D$ are independent, as expected from dice not influencing each other.

For the earlier $A$ and $B$: $P(A)P(B)=11/72\approx0.153$ while $P(A\cap B)=5/36\approx0.139$, so they are dependent.

The addition rule holds for all events:

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B)
$$

Also $P(\overline{A})=1-P(A)$. "At least one 6" is quickest by complement: $1-(5/6)^2=11/36$.

> [!MYTH] Disjoint events are necessarily independent.
> If $P(A)>0$, $P(B)>0$, and $A\cap B=\varnothing$, then $P(A\cap B)=0\neq P(A)P(B)$. They are dependent: one occurring rules out the other.

## Three common misconceptions

> [!MYTH] $P(A\mid B)$ equals $P(B\mid A)$.
> The denominators differ: one divides by $P(B)$, the other by $P(A)$. In medical testing, "positive given disease" and "disease given positive" can differ enormously; Bayes' formula quantifies this next lecture.

> [!MYTH] Probability is always favourable outcomes over total outcomes.
> That holds only in the uniform model. With a loaded die the outcomes are not equally likely, so the given $P$ must be used and the counting formula fails.

> [!MYTH] Independence is an informal "no influence" idea, not a set identity.
> Independence has the exact definition $P(A\cap B)=P(A)P(B)$. "No influence" is intuition; decisions must return to the equation.

## Practice

> [!PRACTICE] 1 · Uniform model
> Roll two dice. Find the probability that the sum is at least 10.
>
> > [!ANSWER] Show answer
> > Sums 10, 11, 12 have $3,2,1$ outcomes respectively, six in total, so the probability is $6/36=1/6$.

> [!PRACTICE] 2 · Conditioning
> Roll one die and suppose the result exceeds 3. Find the probability that it is even.
>
> > [!ANSWER] Show answer
> > $B=\{4,5,6\}$, $A=\{4,6\}$, and $A\cap B=\{4,6\}$, so $P(A\mid B)=2/3$.

> [!PRACTICE] 3 · Independence
> $P(A)=0.4$, $P(B)=0.5$, $P(A\cap B)=0.2$. Are $A$ and $B$ independent?
>
> > [!ANSWER] Show answer
> > $P(A)P(B)=0.2=P(A\cap B)$, so they are independent.

## Formal statement

A finite probability space is a triple $(\Omega,\mathcal{F},P)$ with $\Omega$ finite and non-empty, $\mathcal{F}=2^\Omega$, and $P:\mathcal{F}\to[0,1]$ satisfying $P(\Omega)=1$ and finite additivity: for pairwise disjoint $A_1,\dots,A_n$, $P(\bigcup_iA_i)=\sum_iP(A_i)$. If $P(\{\omega\})=1/|\Omega|$ for all $\omega$, the model is uniform and $P(A)=|A|/|\Omega|$. Conditional probability is $P(A\mid B)=P(A\cap B)/P(B)$ for $P(B)>0$, and is itself a probability measure on $\mathcal{F}$. The multiplication rule is $P(A\cap B)=P(A\mid B)P(B)$; the law of total probability states that if $\{B_i\}$ partitions $\Omega$ with $P(B_i)>0$, then $P(A)=\sum_iP(A\mid B_i)P(B_i)$. Events $A,B$ are independent exactly when $P(A\cap B)=P(A)P(B)$.
