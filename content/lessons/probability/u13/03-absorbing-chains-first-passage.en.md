---
slug: "absorbing-chains-first-passage"
subject: "probability"
unit: "u13"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Probability and Statistics · Mastery"
title: "Absorbing Chains and First Passage Times"
subtitle: "Once you are in, the only question is how long"
minutes: 16
meta: ["16 min read","Requires transition matrices and matrix inversion","Mastery level"]
concepts: ["markov", "matrix", "expectation"]
prereq: ["markov", "matrix"]
related: ["expectation", "distribution"]
---

## What you will get

You will put an absorbing chain into canonical form, use the fundamental matrix $N=(I-Q)^{-1}$ to obtain absorption probabilities and expected absorption times, and explain why entries of $N$ can exceed one.

Some states cannot be left once entered: bankruptcy, a scrapped machine, a finished match. Such chains do not call for a stationary distribution. The two questions that matter are which absorbing state eventually wins and how many steps that takes on average.

## Three lines back

- An absorbing state has $p_{ii}=1$; all other states are transient.
- The canonical form is $\begin{pmatrix}Q&R\\0&I\end{pmatrix}$, where $Q$ holds transitions among transient states.
- The fundamental matrix is $N=(I-Q)^{-1}$, absorption probabilities are $B=NR$, and mean absorption times are $\mathbf t=N\mathbf 1$.

## Absorbing states and canonical form

State $i$ is absorbing when $p_{ii}=1$: once there, the chain stays. A finite chain that has transient and absorbing states, and that reaches an absorbing state with probability one from every transient state, is an absorbing chain.

Reorder the states with transient ones first and absorbing ones last:

$$
P=\begin{pmatrix}Q&R\\0&I\end{pmatrix}.
$$

Here $Q$ holds transient-to-transient moves, $R$ holds transient-to-absorbing moves, and $I$ covers the absorbing states. Each row sum of $Q$ is below one, and the deficit is the chance of being absorbed at that step.

Gambler's ruin: the player holds $1$ or $2$ units, wins or loses one unit each round with probability $1/2$, and stops at $0$ (ruin) or $3$ (target). States $0$ and $3$ absorb, states $1$ and $2$ are transient, so

$$
Q=\begin{pmatrix}0&0.5\\0.5&0\end{pmatrix},\qquad
R=\begin{pmatrix}0.5&0\\0&0.5\end{pmatrix}.
$$

| State | Type | Moves |
| --- | --- | --- |
| $0$ | absorbing | stays at $0$ |
| $1$ | transient | $1/2$ to $0$, $1/2$ to $2$ |
| $2$ | transient | $1/2$ to $1$, $1/2$ to $3$ |
| $3$ | absorbing | stays at $3$ |

## The fundamental matrix and absorption probabilities

Let $n_{ij}$ be the expected number of visits to transient state $j$ before absorption, starting from transient state $i$. Standing at $i$ counts once at step zero, so

$$
N=I+Q+Q^{2}+Q^{3}+\cdots=(I-Q)^{-1}.
$$

The series converges because the spectral radius of $Q$ is below one: transient states are eventually left. For the example,

$$
I-Q=\begin{pmatrix}1&-0.5\\-0.5&1\end{pmatrix},\qquad
N=\frac{1}{1-0.25}\begin{pmatrix}1&0.5\\0.5&1\end{pmatrix}
=\begin{pmatrix}4/3&2/3\\2/3&4/3\end{pmatrix}.
$$

The entry $n_{11}=4/3$ says that starting from one unit, the player visits state $1$ about $1.33$ times on average; $n_{12}=2/3$ says state $2$ is visited about $0.67$ times. Their sum is $2$.

Absorption probabilities follow as

$$
B=NR=\begin{pmatrix}4/3&2/3\\2/3&4/3\end{pmatrix}\begin{pmatrix}0.5&0\\0&0.5\end{pmatrix}
=\begin{pmatrix}2/3&1/3\\1/3&2/3\end{pmatrix}.
$$

Starting from one unit, ruin occurs with probability $2/3$ and reaching three units with probability $1/3$.

> [!NOTE]
> Entries of $N$ are expected visit counts, not probabilities. The diagonal entry $n_{ii}=1/(1-q_{ii})$ blows up as $q_{ii}\to1$, while every row of $B$ must sum to exactly one.

## Mean absorption time

Let $t_i$ be the expected number of steps until absorption starting from transient state $i$. After one step the chain is either absorbed or in some transient $j$, from which $t_j$ more steps are needed:

$$
t_i=1+\sum_{j}q_{ij}t_j,
\qquad\text{so}\qquad \mathbf t=\mathbf 1+Q\mathbf t=(I-Q)^{-1}\mathbf 1=N\mathbf 1.
$$

Both rows of $N$ sum to $4/3+2/3=2$, so the game lasts two rounds on average from either starting point. Direct verification: from state $1$, one round leads to $0$ (done) or to $2$ with $t_2=2$, hence $t_1=1+\tfrac12\cdot0+\tfrac12\cdot2=2$.

Now tilt the game to a win probability of $p=0.6$. Then $Q=\begin{pmatrix}0&0.6\\0.4&0\end{pmatrix}$, $I-Q=\begin{pmatrix}1&-0.6\\-0.4&1\end{pmatrix}$ with determinant $0.76$, and

$$
N=\frac{1}{0.76}\begin{pmatrix}1&0.6\\0.4&1\end{pmatrix}
=\begin{pmatrix}1.316&0.789\\0.526&1.316\end{pmatrix}.
$$

Row sums are $2.105$ and $1.842$: the favoured player lasts longer. Absorption probabilities are $B_{10}=1.316\times0.4=0.526$ and $B_{13}=0.789\times0.6=0.474$.

## Three common misconceptions

> [!MYTH] Entries of the fundamental matrix are probabilities, so they lie between zero and one.
> They are expected visit counts. Since $n_{ii}=1/(1-q_{ii})$ diverges as self-transition probability grows, values above one are routine.

> [!MYTH] One absorbing state is enough to guarantee absorption.
> Every transient state must also be able to reach an absorbing state. If the transient part contains a closed communicating class, the chain can stay there forever and absorption probabilities sum to less than one.

> [!MYTH] The stationary distribution of an absorbing chain gives the mean absorption time.
> Its stationary distributions place all mass on the absorbing states, here any mixture of $(1,0,0,0)$ and $(0,0,0,1)$. They say nothing about the starting point or the duration; that information lives in $N$.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> In the fair gambler's ruin, find the expected duration and the ruin probability starting from two units.
>
> > [!ANSWER] Show answer
> > The second row of $N$ sums to $2$, so two rounds on average. The second row, first entry of $B$ is $1/3$, the ruin probability.

> [!PRACTICE] 2 · Variation
> Two transient states and one absorbing state have $Q=\begin{pmatrix}0.5&0.2\\0.3&0.4\end{pmatrix}$. Find the expected absorption time from each transient state.
>
> > [!ANSWER] Show answer
> > $I-Q=\begin{pmatrix}0.5&-0.2\\-0.3&0.6\end{pmatrix}$ with determinant $0.24$, so $N=\frac{1}{0.24}\begin{pmatrix}0.6&0.2\\0.3&0.5\end{pmatrix}$ and both row sums equal $0.8/0.24=10/3\approx3.33$.

> [!PRACTICE] 3 · Transfer
> Continuing, add absorbing states $a,b$ with $R=\begin{pmatrix}0.2&0.1\\0.1&0.2\end{pmatrix}$. Find the absorption probabilities from each transient state.
>
> > [!ANSWER] Show answer
> > $B=NR$. Row one is $(2.5(0.2)+0.833(0.1),\,2.5(0.1)+0.833(0.2))=(0.583,0.417)$; row two is $(1.25(0.2)+2.083(0.1),\,1.25(0.1)+2.083(0.2))=(0.458,0.542)$. Each row sums to one.

## Formal statement

Let $P$ be a finite transition matrix with absorbing set $A=\{i:p_{ii}=1\}$ and transient set $T=S\setminus A$. The chain is absorbing if, from every $i\in T$, it enters $A$ with probability one. After reordering,

$$
P=\begin{pmatrix}Q&R\\0&I\end{pmatrix}
$$

with $Q$ the $T\times T$ block. For an absorbing chain $\rho(Q)<1$, so $\sum_{k\ge0}Q^{k}$ converges and the fundamental matrix

$$
N=(I-Q)^{-1}=\sum_{k\ge0}Q^{k}
$$

exists, with $n_{ij}$ the expected number of visits to $j$ before absorption starting from $i$. Absorption probabilities are given by $B=NR$; row $i$ is the distribution over absorbing states for starting point $i$ and sums to one. The mean absorption times satisfy $\mathbf t=N\mathbf 1$, equivalently $t_i=1+\sum_j q_{ij}t_j$.