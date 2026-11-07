---
slug: "dirichlet-abel"
subject: "analysis"
unit: "u09"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Dirichlet and Abel Tests"
subtitle: "No common sign needed — just bounded and monotone"
minutes: 15
meta: ["15 min read","Requires elementary calculus","Mastery level"]
concepts: ["series"]
prereq: ["series"]
related: ["series", "funcseries"]
---

## Goals

By the end of this lecture you can use summation by parts to split the convergence of $\sum a_nb_n$ into "bounded partial sums of $a$" and "$b$ monotone to zero", and settle series such as $\sum\frac{\sin n}{n}$ and $\sum\frac{\cos nx}{n}$.

Leibniz handles exactly one oscillation, $a_n=(-1)^{n-1}$. Dirichlet replaces it by any oscillation with bounded partial sums, which is far more general.

## Three-line recap

- Direct comparison needs a common sign; sign-changing series need different tools.
- Summation by parts (Abel transformation) rewrites $\sum a_kb_k$ in terms of partial sums $A_k$ and differences of $b_k$.
- If $A_k$ is bounded and $b_k$ decreases to zero, the rewritten sum is controlled by a telescoping structure.

## Summation by parts: hide the oscillation in the partial sums

Let $A_k=a_1+\cdots+a_k$ and $A_0=0$. Then

$$
\sum_{k=1}^{n}a_kb_k=A_nb_n+\sum_{k=1}^{n-1}A_k\,(b_k-b_{k+1}).
$$

Check at $n=2$: the right side is $(a_1+a_2)b_2+a_1(b_1-b_2)=a_1b_1+a_2b_2$.

The identity shifts attention: individual $a_k$ disappear, only the accumulated $A_k$ remain. If $|A_k|\le M$ and $b_k$ decreases, then

$$
\Big|\sum_{k=1}^{n}a_kb_k\Big|\le M\Big(b_n+\sum_{k=1}^{n-1}(b_k-b_{k+1})\Big)=Mb_1 .
$$

The differences of $b$ telescope to $b_1-b_n\le b_1$. That is the whole mechanism.

## The Dirichlet test

If $\{A_n\}$ is bounded and $\{b_n\}$ is monotone with $b_n\to0$, then $\sum a_nb_n$ converges.

By Cauchy, for $n>m$,

$$
\Big|\sum_{k=m+1}^{n}a_kb_k\Big|\le M\,(b_{m+1}+b_{m+1}-b_{n+1})\le 2Mb_{m+1}\to0 .
$$

Example: $\sum_{n\ge1}\frac{\sin n\theta}{n}$ for $\theta$ not a multiple of $2\pi$. The oscillating partial sums satisfy

$$
\sum_{k=1}^{n}\sin k\theta=\frac{\sin\frac{n\theta}{2}\sin\frac{(n+1)\theta}{2}}{\sin\frac{\theta}{2}},
$$

whose modulus is at most $\frac{1}{|\sin(\theta/2)|}$. At $\theta=\frac{\pi}{3}$ the bound is $\frac{1}{\sin(\pi/6)}=2$. Since $\frac1n$ decreases to $0$, the series converges.

The lesson: the signs of $\sin n$ look random, but its partial sums are trapped in $[-2,2]$, so nothing accumulates.

## The Abel test

If $\sum a_n$ converges and $\{b_n\}$ is monotone and bounded, then $\sum a_nb_n$ converges.

Two differences from Dirichlet: "bounded partial sums" is strengthened to "convergent series", and "$b_n\to0$" is relaxed to "monotone and bounded".

Example: $\sum_{n\ge1}(-1)^n\Big(1+\frac1n\Big)$. The series $\sum(-1)^n$ converges, and $b_n=1+\frac1n$ decreases with lower bound $1$, so the product converges. Splitting also works — $(-1)^n+(-1)^n/n$, both convergent — but Abel avoids the split.

Another: $\sum_{n\ge1}\frac{(-1)^{n-1}}{n}\Big(1+\frac1n\Big)$ converges because $\sum\frac{(-1)^{n-1}}{n}$ converges and $b_n=1+\frac1n$ is monotone bounded.

## How the two tests divide the work

| Test | Requirement on $a$ | Requirement on $b$ | Typical use |
| --- | --- | --- | --- |
| Dirichlet | bounded partial sums | monotone, tends to $0$ | $\sum\frac{\sin n}{n}$, $\sum\frac{(-1)^n}{\sqrt n}$ |
| Abel | convergent series | monotone, bounded | $\sum\frac{(-1)^n}{n}\big(1+\frac1n\big)$ |

Mnemonic: Dirichlet covers "conditional convergence times decay", Abel covers "convergence times bounded". Subtracting the limit $b$ reduces Abel to Dirichlet: $\sum a_nb_n=b\sum a_n+\sum a_n(b_n-b)$, where the first term converges and the second is handled by Dirichlet.

> [!NOTE]
> Both tests require monotonicity of $b_n$. It is not decoration; see the counterexample below.

## Three misconceptions

> [!MYTH] Bounded partial sums plus $b_n\to0$ is enough.
> Monotonicity cannot be dropped. Take $a_n=(-1)^{n-1}$ (partial sums $0$ or $1$) and $b_{2k-1}=\frac1k$, $b_{2k}=\frac{1}{2k}$. Then $\sum a_nb_n=\sum_k\big(\frac1k-\frac1{2k}\big)=\sum\frac{1}{2k}$, which diverges, while $b_n\to0$ but is not monotone ($b_5=\frac13>b_4=\frac14$).

> [!MYTH] $\sum\frac{\sin n}{n}$ converges because it converges absolutely.
> It does not. Since $|\sin n|\ge\sin^2n$ and $\sum\frac{\sin^2 n}{n}=\sum\frac{1}{2n}-\sum\frac{\cos 2n}{2n}$ diverges (first part divergent, second convergent), the absolute-value series diverges. Convergence is conditional.

> [!MYTH] The Abel test requires $b_n\to0$.
> It does not. $b_n$ only needs to be monotone and bounded; the limit may be a nonzero constant. The case $b_n\equiv1$ is the trivial one, where the conclusion reduces to the convergence of $\sum a_n$.

## Practice

> [!PRACTICE] 1 · Dirichlet
> Show that $\displaystyle\sum_{n=1}^{\infty}\frac{\sin(n\pi/3)}{n}$ converges and give a bound on its partial sums.
>
> > [!ANSWER] Show answer
> > $\big|\sum_{k=1}^{n}\sin\frac{k\pi}{3}\big|\le\frac{1}{\sin(\pi/6)}=2$ and $\frac1n\downarrow0$, so Dirichlet applies.

> [!PRACTICE] 2 · Leibniz or Abel
> Decide $\displaystyle\sum_{n=1}^{\infty}(-1)^n\arctan\frac1n$.
>
> > [!ANSWER] Show answer
> > $\arctan\frac1n$ decreases to $0$ (since $1/n$ decreases and $\arctan$ is increasing), so Leibniz applies directly. Equivalently, view it as $\sum(-1)^n b_n$ with $b_n$ monotone and bounded.

> [!PRACTICE] 3 · Cosine version
> Discuss $\displaystyle\sum_{n=1}^{\infty}\frac{\cos nx}{n}$.
>
> > [!ANSWER] Show answer
> > For $x\ne2k\pi$, $\big|\sum_{k=1}^{n}\cos kx\big|\le\frac{1}{|\sin(x/2)|}$, so Dirichlet gives convergence. For $x=2k\pi$ the series is $\sum\frac1n$, which diverges.

> [!PRACTICE] 4 · Half power
> Decide $\displaystyle\sum_{n=1}^{\infty}\frac{\sin n}{\sqrt n}$.
>
> > [!ANSWER] Show answer
> > $\big|\sum_{k=1}^{n}\sin k\big|\le\frac{1}{\sin(1/2)}\approx2.086$ and $n^{-1/2}$ decreases to $0$, so Dirichlet gives convergence. After taking absolute values the terms are of order $n^{-1/2}$, so the series diverges there. Conditional convergence.

## Formal statement

> [!FORMAL] Formal statement
> Summation by parts: with $A_k=\sum_{i=1}^{k}a_i$ and $A_0=0$, for $1\le m<n$, $\sum_{k=m+1}^{n}a_kb_k=A_nb_n-A_mb_m+\sum_{k=m+1}^{n-1}A_k(b_k-b_{k+1})$. Dirichlet: if $|A_k|\le M$ for all $k$ and $\{b_k\}$ is monotone with $b_k\to0$, then $\sum a_kb_k$ converges. Abel: if $\sum a_k$ converges and $\{b_k\}$ is monotone and bounded, then $\sum a_kb_k$ converges. Both proofs start from the identity and bound the Cauchy block using $|A_k|\le M$ and the telescoping sum $\sum(b_k-b_{k+1})=b_{m+1}-b_{n+1}$. For series of functions the same arguments are pointwise; if $M$ is independent of $x$ and $b_k\to0$ uniformly, the conclusion upgrades to uniform convergence.
