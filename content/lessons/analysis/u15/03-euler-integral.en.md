---
slug: "euler-integral"
subject: "analysis"
unit: "u15"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Mathematical Analysis · Mastery"
title: "Euler Integrals"
subtitle: "Gamma and Beta: two functions that connect factorials to integrals"
minutes: 16
meta: ["16 min read","Requires elementary calculus","Mastery level"]
concepts: ["paramint"]
prereq: ["paramint"]
related: ["paramint", "fourier"]
---

## Goals

The Euler integrals are two parameter integrals: the Gamma function and the Beta function. By the end you can state their definitions and domains, use the recurrence to connect $\Gamma$ with factorials, remember $\Gamma(1/2)=\sqrt\pi$, and evaluate a class of definite integrals with $B(p,q)=\Gamma(p)\Gamma(q)/\Gamma(p+q)$.

## Three-line recap

- The Gamma function extends the factorial from integers to positive reals.
- The Beta function is a parameter integral on $[0,1]$, linked to Gamma by one product formula.
- Many complicated definite integrals become standard Beta or Gamma forms after a substitution.

## Gamma: definition and recurrence

For $s>0$, define

$$\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}\,dx.$$

Near $x=0$, $x^{s-1}e^{-x}\sim x^{s-1}$, which is integrable exactly when $s>0$; at infinity exponential decay beats every power, so convergence holds for all $s$. Hence the domain is exactly $s>0$.

Integrate by parts:

$$\Gamma(s+1)=\int_0^\infty x^se^{-x}dx=\left[-x^se^{-x}\right]_0^\infty+s\int_0^\infty x^{s-1}e^{-x}dx=s\Gamma(s).$$

The boundary term vanishes: exponential decay wins at infinity, and $s>0$ sends $x^s\to0$ at zero. Iterating, with $\Gamma(1)=1$,

$$\Gamma(n+1)=n!,\qquad n=0,1,2,\dots$$

This is the precise sense in which $\Gamma$ is the continuous version of the factorial.

That continuous version is essentially unique: the Bohr–Mollerup theorem states that if $F>0$ satisfies $F(1)=1$, $F(s+1)=sF(s)$, and $\ln F$ is convex, then $F=\Gamma$. There is no second reasonable way to extend the factorial to positive reals.

The recursion also reaches the negative half-line: for $s\ne0,-1,-2,\dots$ set $\Gamma(s)=\Gamma(s+1)/s$, so $\Gamma\left(-\frac12\right)=-2\sqrt\pi$. At $s=0,-1,-2,\dots$ the function has simple poles, which is why it cannot be continuous on the whole real line.

## Gamma at one half and special values

In $\Gamma(1/2)=\int_0^\infty x^{-1/2}e^{-x}dx$, put $x=t^2$, $dx=2t\,dt$:

$$\Gamma\left(\frac12\right)=\int_0^\infty\frac{1}{t}e^{-t^2}\cdot2t\,dt=2\int_0^\infty e^{-t^2}dt=\sqrt\pi.$$

The last step is the Gaussian integral. Hence

$$\Gamma\left(\frac32\right)=\frac12\Gamma\left(\frac12\right)=\frac{\sqrt\pi}{2},\qquad \Gamma\left(\frac52\right)=\frac32\cdot\frac12\sqrt\pi=\frac{3\sqrt\pi}{4}.$$

In general, for a nonnegative integer $n$,

$$\Gamma\left(n+\frac12\right)=\frac{(2n-1)!!}{2^n}\sqrt\pi.$$

For instance $\Gamma(7/2)=\frac{5\cdot3\cdot1}{8}\sqrt\pi=\frac{15\sqrt\pi}{8}$.

## Beta and its relation to Gamma

For $p>0$, $q>0$, define

$$B(p,q)=\int_0^1x^{p-1}(1-x)^{q-1}dx.$$

Integrability at the two endpoints requires $p>0$ and $q>0$. Symmetry is immediate from $x\mapsto1-x$: $B(p,q)=B(q,p)$.

**Relation**:

$$B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}.$$

The idea: write $\Gamma(p)\Gamma(q)$ as the double integral

$$\Gamma(p)\Gamma(q)=\int_0^\infty\int_0^\infty u^{p-1}v^{q-1}e^{-(u+v)}du\,dv,$$

and substitute $u=st$, $v=s(1-t)$ with $s>0$, $0<t<1$. The Jacobian is $s$, $u+v=s$, and $du\,dv=s\,ds\,dt$. Thus

$$\Gamma(p)\Gamma(q)=\int_0^\infty s^{p+q-1}e^{-s}ds\int_0^1t^{p-1}(1-t)^{q-1}dt=\Gamma(p+q)B(p,q).$$

Taking $q=1$ gives $B(p,1)=\frac{\Gamma(p)\Gamma(1)}{\Gamma(p+1)}=\frac1p$, matching $\int_0^1x^{p-1}dx=\frac1p$.

**Trigonometric form.** With $x=\sin^2\theta$,

$$B(p,q)=2\int_0^{\pi/2}\sin^{2p-1}\theta\cos^{2q-1}\theta\,d\theta .$$

At $p=q=\frac12$ the left side is $\int_0^1\frac{dx}{\sqrt{x(1-x)}}$ and the right side is $2\cdot\frac{\pi}{2}=\pi$, consistent with $\Gamma\left(\frac12\right)^2=\pi$.

**Derivatives.** Uniform convergence on compact parameter intervals allows differentiation under the integral sign: $\Gamma^{(k)}(s)=\int_0^\infty x^{s-1}(\ln x)^ke^{-x}dx$. In particular $\Gamma'(1)=-\gamma$, where $\gamma\approx0.5772$ is the Euler constant.

## Evaluating integrals with Euler forms

**Example 1.** $\int_0^1x^{3/2}(1-x)^{1/2}dx=B\left(\frac52,\frac32\right)$. By symmetry and the relation,

$$B\left(\frac52,\frac32\right)=\frac{\Gamma(5/2)\Gamma(3/2)}{\Gamma(4)}=\frac{\frac{3\sqrt\pi}{4}\cdot\frac{\sqrt\pi}{2}}{6}=\frac{\pi}{16}.$$

**Example 2.** $\int_0^\infty x^4e^{-x}dx=\Gamma(5)=4!=24$.

**Example 3.** $\int_0^{\pi/2}\sin^3\theta\cos^2\theta\,d\theta$. With $u=\sin^2\theta$ this becomes $\frac12B(2,\frac32)$:

$$\frac12\cdot\frac{\Gamma(2)\Gamma(3/2)}{\Gamma(7/2)}=\frac12\cdot\frac{1\cdot\frac{\sqrt\pi}{2}}{\frac{15\sqrt\pi}{8}}=\frac{2}{15}.$$

**Example 4.** $\int_0^\infty e^{-x^2}dx=\frac12\Gamma\left(\frac12\right)=\frac{\sqrt\pi}{2}$, consistent with the Gaussian integral.

**Example 5.** $\int_0^\infty x^{s-1}e^{-ax}dx=\frac{\Gamma(s)}{a^s}$ for $a>0$: put $t=ax$. This is the line you will use most often from a table; with $s=5$, $a=2$ it gives $\frac{24}{32}=\frac34$.

Before using the table, substitute so that the integral matches $\int_0^1x^{p-1}(1-x)^{q-1}dx$ or $\int_0^\infty x^{s-1}e^{-x}dx$.

## Three misconceptions

> [!MYTH] The integral defines $\Gamma(s)$ for every real $s$.
> It converges only for $s>0$. Values for $s\le0$ come from the recurrence, and there are poles at nonpositive integers.

> [!MYTH] $B(p,q)=\Gamma(p)+\Gamma(q)$.
> It is the product divided by $\Gamma(p+q)$, not the sum. The dimensions already rule out a sum.

> [!MYTH] Since $\Gamma(n+1)=n!$, we have $\Gamma(n)=n!$.
> Off by one. $\Gamma(n+1)=n!$, so $\Gamma(n)=(n-1)!$; for example $\Gamma(4)=6=3!$.

## Practice

> [!PRACTICE] 1 · Factorials
> Find $\Gamma(5)$ and $\Gamma(6)$.
>
> > [!ANSWER] Show answer
> > $\Gamma(5)=4!=24$ and $\Gamma(6)=5!=120$.

> [!PRACTICE] 2 · Half-integers
> Find $\Gamma(7/2)$.
>
> > [!ANSWER] Show answer
> > $\Gamma(7/2)=\frac52\cdot\frac32\cdot\frac12\sqrt\pi=\frac{15\sqrt\pi}{8}$.

> [!PRACTICE] 3 · Beta
> Compute $\int_0^1x(1-x)^2dx$ and verify with the Beta function.
>
> > [!ANSWER] Show answer
> > Directly, $\frac12-\frac23+\frac14=\frac1{12}$. Also $B(2,3)=\frac{\Gamma(2)\Gamma(3)}{\Gamma(5)}=\frac{1\cdot2}{24}=\frac1{12}$.

> [!PRACTICE] 4 · Trigonometric integral
> Compute $\int_0^{\pi/2}\sin^3\theta\cos^2\theta\,d\theta$.
>
> > [!ANSWER] Show answer
> > With $u=\sin^2\theta$ it becomes $\frac12B(2,\frac32)=\frac12\cdot\frac{\Gamma(2)\Gamma(3/2)}{\Gamma(7/2)}=\frac{2}{15}$.

> [!FORMAL] Formal statement
> For $s>0$ define $\Gamma(s)=\int_0^\infty x^{s-1}e^{-x}dx$; the integral converges exactly on $s>0$, and $\Gamma(s+1)=s\Gamma(s)$, $\Gamma(n+1)=n!$, $\Gamma(1/2)=\sqrt\pi$. For $p,q>0$ define $B(p,q)=\int_0^1x^{p-1}(1-x)^{q-1}dx$. Then $B(p,q)=B(q,p)$ and $B(p,q)=\Gamma(p)\Gamma(q)/\Gamma(p+q)$; the proof uses $u=st$, $v=s(1-t)$ to factor $\Gamma(p)\Gamma(q)$ as $\Gamma(p+q)B(p,q)$.
