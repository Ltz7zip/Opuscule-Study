---
slug: "markov-chain-transition-matrix"
subject: "probability"
unit: "u13"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Probability and Statistics · Mastery"
title: "Markov Chains and Transition Matrices"
subtitle: "Condition on the present and the past stops mattering"
minutes: 15
meta: ["15 min read","Requires conditional distributions and matrices","Mastery level"]
concepts: ["markov", "jointdist", "matrix"]
prereq: ["jointdist", "matrix"]
related: ["timeseries", "expectation"]
---

## What you will get

You will specify a state space and a transition matrix, compute n-step probabilities by matrix powers, and justify "multi-step equals matrix power" through the Chapman–Kolmogorov equation.

A Markov chain squeezes an entire random process into one table: which state you are in, where you can go next, and how likely each move is. Everything later — limiting distributions, absorption times, forecasts — is read off that table.

## Three lines back

- The Markov property says the future is conditionally independent of the past given the present.
- Each row of a transition matrix is nonnegative and sums to one; row $i$ is the destination distribution starting from state $i$.
- The n-step transition matrix is $P^n$, a consequence of the C-K equation.

## States, the Markov property, and the transition matrix

Let $\{X_n,\,n=0,1,2,\dots\}$ take values in an at most countable set $S$, the state space. The chain is Markov if for every $n$ and every choice of states,

$$
P(X_{n+1}=j\mid X_n=i,X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i).
$$

The right-hand side depends on the current state alone; history is fully absorbed by the present.

Write $p_{ij}=P(X_{n+1}=j\mid X_n=i)$. When this does not depend on $n$ the chain is time-homogeneous, and all information sits in the matrix $P=(p_{ij})$.

Weather model: state $1$ is sunny, state $2$ is rainy. If today is sunny, tomorrow is sunny with probability $0.8$; if today is rainy, tomorrow turns sunny with probability $0.1$. Then

$$
P=\begin{pmatrix}0.8&0.2\\0.1&0.9\end{pmatrix}.
$$

| Today | Sunny tomorrow | Rainy tomorrow | Row sum |
| --- | --- | --- | --- |
| Sunny | $0.8$ | $0.2$ | $1$ |
| Rainy | $0.1$ | $0.9$ | $1$ |

Rows sum to one because tomorrow must land somewhere. Columns carry no such constraint: a column sum is the composition of arrivals into that state and is generally not one.

> [!NOTE]
> Any nonnegative matrix with unit row sums is a valid transition matrix. Checking row sums is the fastest debugging step: a row that does not sum to one means a missing state or a mis-typed probability.

## n-step transitions and the C-K equation

Let $p_{ij}^{(n)}=P(X_{m+n}=j\mid X_m=i)$ and let $P^{(n)}$ collect these entries. Conditioning on the state occupied after $m$ steps and applying the law of total probability gives

$$
p_{ij}^{(m+n)}=\sum_{k\in S}p_{ik}^{(m)}\,p_{kj}^{(n)}.
$$

This is the Chapman–Kolmogorov equation, or in matrix form $P^{(m+n)}=P^{(m)}P^{(n)}$. Setting $m=1$ and iterating yields $P^{(2)}=P^2$, $P^{(3)}=P^2P=P^3$, and in general

$$
P^{(n)}=P^{n}.
$$

With the initial distribution written as a row vector $\pi_0=(\pi_0(1),\pi_0(2),\dots)$, the marginal distribution at time $n$ is

$$
\pi_n=\pi_0P^{n},\qquad \pi_n(j)=\sum_{i}\pi_0(i)p_{ij}^{(n)}.
$$

Mind the order: a distribution is a row vector and multiplies from the left. If you store $\pi$ as a column, the recursion becomes $\pi_n=P^{\mathsf T}\pi_{n-1}$.

## A worked weather example

Square the matrix:

$$
P^{2}=\begin{pmatrix}0.8&0.2\\0.1&0.9\end{pmatrix}^{2}
=\begin{pmatrix}0.8(0.8)+0.2(0.1)&0.8(0.2)+0.2(0.9)\\0.1(0.8)+0.9(0.1)&0.1(0.2)+0.9(0.9)\end{pmatrix}
=\begin{pmatrix}0.66&0.34\\0.17&0.83\end{pmatrix}.
$$

Starting sunny, the chance of sun two days later is $0.66$ and of rain is $0.34$. Starting rainy, the chance of rain two days later is $0.83$. One more multiplication gives

$$
P^{3}=\begin{pmatrix}0.562&0.438\\0.219&0.781\end{pmatrix}.
$$

From a sunny day the probability of sun three days out has fallen to $0.562$; from a rainy day it has risen to $0.219$. The two rows are moving toward each other, a fact made precise by the stationary distribution.

Take $\pi_0=(1,0)$, meaning today is certainly sunny. Then

$$
\pi_1=(1,0)P=(0.8,0.2),\qquad \pi_2=\pi_1P=(0.66,0.34),
$$

which matches the first row of $P^2$. Multiplying the initial distribution by a matrix power is the same as reading the corresponding row of that power.

## Three common misconceptions

> [!MYTH] The Markov property makes the variables independent across time.
> It only asserts conditional independence of future and past given the present. Neighbouring states are usually strongly dependent: in the weather model, sun today means sun tomorrow with probability $0.8$.

> [!MYTH] A transition matrix must be symmetric, $p_{ij}=p_{ji}$.
> Symmetry is a very special case. Sun to rain at $0.2$ and rain to sun at $0.1$ can differ freely; only the row-sum constraint is mandatory.

> [!MYTH] To get an n-step probability, raise $p_{ij}$ to the n-th power.
> That counts only paths that repeat one fixed edge and misses every intermediate route. The correct object is the matrix power $P^n$, which sums over all paths.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> Using the weather matrix, find the probability that it is sunny three days from now given that it rains today.
>
> > [!ANSWER] Show answer
> > Read row $2$, column $1$ of $P^3$: $0.219$.

> [!PRACTICE] 2 · Variation
> Decide whether $Q=\begin{pmatrix}0.6&0.5\\0.4&0.5\end{pmatrix}$ can be a transition matrix.
>
> > [!ANSWER] Show answer
> > The first row sums to $1.1$ and the second to $0.9$, so no. Replacing the first row by $(0.6,0.4)$ makes it valid.

> [!PRACTICE] 3 · Transfer
> A three-state chain has $P=\begin{pmatrix}0.5&0.3&0.2\\0.2&0.6&0.2\\0.1&0.1&0.8\end{pmatrix}$ and $\pi_0=(0.2,0.5,0.3)$. Find $\pi_1$.
>
> > [!ANSWER] Show answer
> > $\pi_1=(0.23,0.39,0.38)$, and the three entries sum to one.

## Formal statement

Let $\{X_n\}_{n\ge0}$ be a random sequence on a probability space with an at most countable state space $S$. It is a Markov chain if for all $n\ge0$ and all states with $P(X_n=i,\dots,X_0=i_0)>0$,

$$
P(X_{n+1}=j\mid X_n=i,\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i).
$$

For a time-homogeneous chain the transition matrix satisfies $p_{ij}\ge0$ and $\sum_j p_{ij}=1$, that is $P\mathbf 1=\mathbf 1$; such a matrix is called stochastic. The law of total probability together with the Markov property gives $P^{(m+n)}=P^{(m)}P^{(n)}$, hence $P^{(n)}=P^n$, and the distribution evolves as $\pi_n=\pi_0P^n$. For finite $S$ the spectral radius of $P$ equals $1$ and $\mathbf 1$ is a right eigenvector, which is the starting point for limiting and stationary distributions.