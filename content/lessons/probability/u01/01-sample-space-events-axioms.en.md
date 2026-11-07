---
slug: "sample-space-events-axioms"
subject: "probability"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Sample Spaces, Events, and the Axioms of Probability"
subtitle: "Write down what can happen before computing anything"
minutes: 15
meta: ["15 min read","Requires sets and counting","Mastery level"]
concepts: ["discprob", "counting"]
prereq: ["counting"]
related: ["randvar", "distribution"]
---

## What you will get

You will be able to describe a random experiment as a set of outcomes, translate a question about it into a subset, and derive the standard probability formulas from three axioms.

The first move in probability is not arithmetic. It is deciding what counts as one outcome and which collections of outcomes you care about.

## Three lines back

- The set of all possible outcomes is the sample space $\Omega$; each outcome $\omega$ is a sample point.
- An event is a subset of $\Omega$, and "$A$ occurs" means the outcome lands inside $A$.
- Probability is not an arbitrary number attached to an event; it must obey three axioms, and everything else follows from them.

## Sample spaces and events

Roll one die: $\Omega=\{1,2,3,4,5,6\}$. The event "even" is $A=\{2,4,6\}$, and "greater than four" is $B=\{5,6\}$.

Set operations mirror ordinary language:

| Words | Set notation | Meaning |
| --- | --- | --- |
| $A$ or $B$ | $A\cup B$ | at least one occurs |
| $A$ and $B$ | $A\cap B$ | both occur |
| not $A$ | $A^c=\Omega\setminus A$ | complement |
| $A$, $B$ mutually exclusive | $A\cap B=\varnothing$ | cannot co-occur |

De Morgan's laws turn "neither happens" into a complement: $(A\cup B)^c=A^c\cap B^c$. This is the single most useful identity for simplifying complicated events.

## Three axioms and the addition rule

A probability is a function $P$ on events satisfying:

1. Non-negativity: $P(A)\ge 0$ for every event $A$.
2. Normalisation: $P(\Omega)=1$.
3. Countable additivity: if $A_1,A_2,\dots$ are pairwise disjoint, then $P(\bigcup_i A_i)=\sum_i P(A_i)$.

Two consequences come immediately. Taking $A_1=\Omega$ and $A_2=\varnothing$ gives $1=1+P(\varnothing)$, hence $P(\varnothing)=0$. Since $A$ and $A^c$ are disjoint and cover $\Omega$,

$$
P(A^c)=1-P(A)
$$

For two events that may overlap, the overlap is counted twice, so

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B)
$$

With three events, subtract the three pairwise intersections and add the triple intersection back once.

## A worked example

Let $P(A)=0.5$, $P(B)=0.4$, $P(C)=0.3$, with $P(A\cap B)=0.2$, $P(A\cap C)=0.15$, $P(B\cap C)=0.1$ and $P(A\cap B\cap C)=0.05$. The probability that at least one event occurs is

$$
P(A\cup B\cup C)=0.5+0.4+0.3-0.2-0.15-0.1+0.05=0.8
$$

So the probability that none occurs is $1-0.8=0.2$. Dropping the final $+0.05$ gives $0.75$, which over-subtracts the region where all three happen.

> [!MYTH] If three events are pairwise disjoint, nothing more needs checking.
> Pairwise disjointness does imply the triple intersection is empty, but it must be verified for all three pairs. Checking only $A\cap B=\varnothing$ proves nothing about $A\cap C$.

> [!NOTE]
> The axioms say what a probability must satisfy, not how to compute one. Classical counting, geometric area, and long-run frequency are all ways of producing a $P$ inside a specific model.

## Three common misconceptions

> [!MYTH] An event of probability zero is impossible.
> In continuous models a single point has probability zero yet is not impossible. Probability zero means measure zero, not logical impossibility.

> [!MYTH] $P(A)+P(B)$ is the probability that at least one occurs.
> That holds only when $A\cap B=\varnothing$. Otherwise the overlap is counted twice and $P(A\cap B)$ must be subtracted.

> [!MYTH] Sample points must be numbers.
> Outcomes can be heads, words, or even functions. Probability only needs set structure; numbers appear later, when random variables are defined.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Toss two coins. Write the sample space and find the probability of at least one head.
>
> > [!ANSWER] Show answer
> > $\Omega=\{HH,HT,TH,TT\}$ with four equally likely points. Three of them contain a head, so the probability is $3/4$.

> [!PRACTICE] 2 · Variation
> Given $P(A)=0.6$, $P(B)=0.5$ and $P(A\cup B)=0.9$, find $P(A\cap B)$ and $P(A^c\cap B^c)$.
>
> > [!ANSWER] Show answer
> > The addition rule gives $P(A\cap B)=0.6+0.5-0.9=0.2$. By De Morgan, $P(A^c\cap B^c)=1-P(A\cup B)=0.1$.

> [!PRACTICE] 3 · Transfer
> If $P(A)=0.7$ and $P(B)=0.6$, what range can $P(A\cap B)$ take?
>
> > [!ANSWER] Show answer
> > Since $P(A\cup B)\le 1$, the intersection is at least $0.3$. It cannot exceed the smaller marginal, $0.6$. The range is $[0.3,0.6]$.

## Formal statement

Let $\Omega$ be a sample space, $\mathcal{F}$ a $\sigma$-algebra of subsets of $\Omega$ (closed under complement and countable union), and $P:\mathcal{F}\to[0,1]$ a function with $P(\Omega)=1$ and countable additivity. The triple $(\Omega,\mathcal{F},P)$ is a probability space. The axioms yield $P(\varnothing)=0$, finite additivity, monotonicity in the form $A\subseteq B\Rightarrow P(B\setminus A)=P(B)-P(A)$, and the inclusion–exclusion formula.

Continuity from below also follows: if $A_n\uparrow A$, then $P(A_n)\to P(A)$. This is not an extra assumption but a consequence of countable additivity, and it is used repeatedly when passing to limits.
