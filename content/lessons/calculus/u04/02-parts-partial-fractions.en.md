---
slug: "parts-partial-fractions"
subject: "calculus"
unit: "u04"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "Integration by Parts and Rational Functions"
subtitle: "Run the product rule backwards, then split the fraction"
minutes: 32
meta: ["32 min read","Requires integration by substitution","Mastery level"]
concepts: ["indefint", "defint"]
prereq: ["indefint"]
related: ["defint", "taylor", "impropint"]
---

## What you will get

Integration is the inverse of differentiation, but that supplies no algorithm. Every method comes from one principle: **run each differentiation rule backwards**. The chain rule reversed gives substitution, the product rule reversed gives parts, and reversing the derivative of a rational function gives partial fractions.

Substitution needs both a composite structure and the inner derivative: $\int 2x\cos(x^{2})dx$ has both, $\int xe^{x}dx$ has neither, and $\int\ln x\,dx$ does not even have two factors. Such integrals move the differentiation from one factor to the other, which is what parts does. Rational functions reverse the other way: differentiation complicates a fraction, so splitting it undoes that.

By the end you should be able to:

- derive $\int u\,dv=uv-\int v\,du$ from $(uv)'=u'v+uv'$;
- decide which factor to call $u$, and say when "inverse trig, log, power, exponential, trig" fails;
- handle a cyclic integral and the recurrence that parts produces;
- compare degrees and divide first, turning an improper fraction into a polynomial plus a proper one;
- split a proper fraction by the factors of its denominator and integrate each piece.

## Three lines back

- Rearranging $(uv)'=u'v+uv'$ and integrating gives $\int u\,dv=uv-\int v\,du$.
- Parts pays off only if $v$ can be found and $u'$ is simpler.
- For a rational function compare degrees first; for a proper fraction split by the factors of $Q$, writing all $j=1,\dots,k$ for a repeated factor.

## Why substitution runs out

If $f$ has an antiderivative $F$ and $g$ is differentiable, then $\int f(g(x))g'(x)dx=F(g(x))+C$. The integrand needs both a composite structure and the inner derivative; with one half missing the rule fails:

1. no inner function: the two factors in $\int xe^{x}dx$ are not composed at all;
2. only one factor: $\int\ln x\,dx$ has nothing to match;
3. forcing it is worse: $\int x^{2}\cos x\,dx$ with $u=\sin x$ drags in $\arcsin u$.

Substitution changes the composite structure, never the relation between two independent factors. Read backwards, $(uv)'=u'v+uv'$ lets a product's integral assign differentiation to whichever factor we prefer.

## Deriving the formula

Let $u$ and $v$ be differentiable on an interval $I$. Taking antiderivatives of $(uv)'=u'v+uv'$ gives

$$
uv=\int u'v\,dx+\int uv'\,dx\quad\Longrightarrow\quad\int u\,dv=uv-\int v\,du
$$

The definite version carries a boundary term: if $u,v$ are continuously differentiable on $[a,b]$, then

$$
\int_a^b uv'\,dx=\big[uv\big]_a^b-\int_a^b u'v\,dx
$$

Replacing $v$ by $v+C$ adds $Cu$ to the product and $-Cu$ elsewhere, which cancel, so any antiderivative works. The formula promises nothing simpler.

## Choosing $u$

The usual order is "**inverse trig, log, power, exponential, trig**": inverse trig and log factors make the best $u$, powers next, exponentials and trig the best $dv$. Because $\ln x$ differentiates to $\dfrac1x$ and $\arctan x$ to $\dfrac{1}{1+x^{2}}$, a transcendental factor is **demoted** to a rational one; $x^{n}$ drops one degree per derivative; $e^{x}$ and $\sin x$ stay in their family.

The rule has a hidden prerequisite: **$dv$ must be integrable first**. In $\int x^{3}e^{x^{2}}dx$, choosing $u=x^{3}$ leaves $dv=e^{x^{2}}dx$, for which no $v$ exists. The right split is $u=x^{2}$ and $dv=xe^{x^{2}}dx$, so $v=\dfrac12e^{x^{2}}$:

$$
\int x^{3}e^{x^{2}}dx=\frac12x^{2}e^{x^{2}}-\int xe^{x^{2}}dx=\frac12\left(x^{2}-1\right)e^{x^{2}}+C
$$

Differentiating gives $e^{x^{2}}\left[x+x^{3}-x\right]=x^{3}e^{x^{2}}$. The real test has two clauses: $dv$ integrable and $u'$ simpler — the first lets you start, the second lets you finish.

## Example 1: polynomial times exponential

Find $\int xe^{x}dx$. Take $u=x$ and $dv=e^{x}dx$, so $du=dx$ and $v=e^{x}$:

$$
\int xe^{x}dx=xe^{x}-\int e^{x}dx=(x-1)e^{x}+C
$$

Choosing $u=e^{x}$ instead gives $\dfrac{x^{2}}{2}e^{x}-\int\dfrac{x^{2}}{2}e^{x}dx$: the degree rises from $1$ to $2$; "make $u'$ simpler" guarantees **termination**. For a quadratic, use parts twice: $\int x^{2}e^{x}dx=\left(x^{2}-2x+2\right)e^{x}+C$. In general $\int x^{n}e^{x}dx=\left[x^{n}-nx^{n-1}+\cdots\right]e^{x}+C$, in as many steps as the degree.

## Example 2: a lone transcendental function

A lone $\ln x$ is read as $\ln x\cdot1$, with $u=\ln x$ and $dv=dx$:

$$
\int\ln x\,dx=x\ln x-\int x\cdot\frac1x dx=x\ln x-x+C
$$

Here $u'=\dfrac1x$ demotes the transcendental factor while $x\cdot\dfrac1x=1$. The same trick handles $\arctan x$:

$$
\int\arctan x\,dx=x\arctan x-\int\frac{x}{1+x^{2}}dx=x\arctan x-\frac12\ln\left(1+x^{2}\right)+C
$$

Check by differentiating: $\arctan x+\dfrac{x}{1+x^{2}}-\dfrac{x}{1+x^{2}}=\arctan x$. Likewise $\int\arcsin x\,dx=x\arcsin x+\sqrt{1-x^{2}}+C$.

## Example 3: the cyclic case

Find $I=\int e^{x}\sin x\,dx$. In the first round take $u=e^{x}$ and $dv=\sin x\,dx$:

$$
I=-e^{x}\cos x+\int e^{x}\cos x\,dx
$$

The second round **must make the same choice**, so $\int e^{x}\cos x\,dx=e^{x}\sin x-I$. Substituting gives $I=-e^{x}\cos x+e^{x}\sin x-I$. Collect:

$$
2I=e^{x}\left(\sin x-\cos x\right),\qquad I=\frac{e^{x}\left(\sin x-\cos x\right)}{2}+C
$$

Differentiating gives $\dfrac{e^{x}}{2}\left[\left(\sin x-\cos x\right)+\left(\cos x+\sin x\right)\right]=e^{x}\sin x$. Two rules: keep the same choice in both rounds, or you get $I=I$; and divide by $2$ after collecting.

## Definite integrals and edge cases

In the definite version the boundary term must be computed. With $u=x$ and $dv=\sin x\,dx$,

$$
\int_0^{\pi}x\sin x\,dx=\Big[-x\cos x\Big]_0^{\pi}+\int_0^{\pi}\cos x\,dx=\pi+0=\pi
$$

Since $\sin x$ is symmetric about $\frac{\pi}{2}$, multiplying by $x$ enlarges the right half, so the result exceeds $\int_0^{\pi}\sin x\,dx=2$; the boundary term is a concrete number.

**Producing a recurrence.** Let $I_n=\int_0^{\pi/2}\sin^{n}x\,dx$. Take $u=\sin^{n-1}x$ and $dv=\sin x\,dx$; the boundary term vanishes, and $\cos^{2}x=1-\sin^{2}x$ gives $I_n=(n-1)\left(I_{n-2}-I_n\right)$, that is $I_n=\dfrac{n-1}{n}I_{n-2}$. With $I_0=\dfrac{\pi}{2}$ and $I_1=1$ this computes everything; for instance $I_4=\dfrac{3\pi}{16}$.

**No elementary antiderivative.** Integrating $\int e^{-x^{2}}dx$ by parts gives $xe^{-x^{2}}+\int 2x^{2}e^{-x^{2}}dx$, with the degree going up. It, like $\int\dfrac{\sin x}{x}dx$ and $\int\dfrac{dx}{\ln x}$, has no elementary antiderivative and needs series or numerics.

## Rational functions: check the degree first

A rational function is $R=\dfrac{P}{Q}$. The first step is not factoring the denominator but **comparing degrees**. If $\deg P\ge\deg Q$ (improper), divide: $P=SQ+R$ with $\deg R<\deg Q$, so $\dfrac{P}{Q}=S+\dfrac{R}{Q}$. Then $S$ integrates immediately and only the proper remainder enters the decomposition.

Example: for $\int\dfrac{x^{3}+x}{x^{2}-1}dx$, $x^{3}+x=x\left(x^{2}-1\right)+2x$, so the integrand is $x+\dfrac{2x}{x^{2}-1}$; the second numerator is the derivative of the denominator, hence the integral is $\dfrac{x^{2}}{2}+\ln\left|x^{2}-1\right|+C$, valid separately on each interval $x\ne\pm1$.

The four cases suffice: a real polynomial factors into linear and irreducible quadratic factors; $(x-a)^{k}$ needs $k$ terms and $(x^{2}+px+q)^{m}$ needs $m$, so there are exactly $\deg Q$ unknowns and the answer is unique. A repeated root supplies only one value.

## The four basic shapes

| Factor in $Q$ | Split as | Integral |
| --- | --- | --- |
| $x-a$ | $\dfrac{A}{x-a}$ | $A\ln\lvert x-a\rvert$ |
| $(x-a)^{k}$ | $\sum_{j=1}^{k}\dfrac{A_j}{(x-a)^{j}}$ | logs and negative powers |
| $x^{2}+px+q$ ($p^{2}<4q$) | $\dfrac{Bx+C}{x^{2}+px+q}$ | log plus $\arctan$ |
| $(x^{2}+px+q)^{k}$ | $\sum_{j=1}^{k}\dfrac{B_jx+C_j}{(\cdot)^{j}}$ | logs, $\arctan$, negative powers |

The logic is uniform: linear factors give logs, higher powers negative powers; an irreducible factor is completed to a square and its numerator split into a multiple of the derivative plus a constant, giving a log and an $\arctan$.

## Case 1: distinct linear factors

Find $\int\dfrac{x+5}{(x+1)(x+2)}dx$. Set

$$
\frac{x+5}{(x+1)(x+2)}=\frac{A}{x+1}+\frac{B}{x+2}\ \Longrightarrow\ x+5=A(x+2)+B(x+1)
$$

Setting $x=-1$ gives $A=4$, and $x=-2$ gives $B=-3$, so

$$
\int\frac{x+5}{(x+1)(x+2)}dx=4\ln|x+1|-3\ln|x+2|+C
$$

Check: $\dfrac{4}{x+1}-\dfrac{3}{x+2}=\dfrac{x+5}{(x+1)(x+2)}$. The same pattern on $\int\dfrac{dx}{x^{2}-1}$, split as $\dfrac12\left(\dfrac{1}{x-1}-\dfrac{1}{x+1}\right)$, gives $\dfrac12\ln\left|\dfrac{x-1}{x+1}\right|+C$.

## Case 2: repeated roots

Find $\int\dfrac{x+2}{x(x-1)^{2}}dx$. One term for the simple root, two for the double root:

$$
\frac{x+2}{x(x-1)^{2}}=\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^{2}}\ \Longrightarrow\ x+2=A(x-1)^{2}+Bx(x-1)+Cx
$$

Setting $x=0$ gives $A=2$ and $x=1$ gives $C=3$. Comparing $x^{2}$ coefficients, the left side has none, so $A+B=0$ and $B=-2$. Hence

$$
\int\frac{x+2}{x(x-1)^{2}}dx=2\ln|x|-2\ln|x-1|-\frac{3}{x-1}+C
$$

The last term uses $\int\dfrac{3}{(x-1)^{2}}dx=-\dfrac{3}{x-1}$. Substitution pins down only $A$ and $C$; $B$ requires comparing coefficients, so both tools are used.

## Case 3: irreducible quadratic factors

Find $\int\dfrac{3x+5}{x^{2}+4x+13}dx$. Since $p^{2}-4q=16-52<0$, complete the square: $(x+2)^{2}+9$. The derivative of the denominator is $2x+4$, so write $3x+5=\dfrac32(2x+4)-1$. The first part gives a log and the second an $\arctan$:

$$
\int\frac{3x+5}{x^{2}+4x+13}dx=\frac32\ln\left(x^{2}+4x+13\right)-\frac13\arctan\frac{x+2}{3}+C
$$

The last term uses $\int\dfrac{du}{u^{2}+9}=\dfrac13\arctan\dfrac u3$, where the factor $\dfrac13$ is easy to drop. In general,

$$
\frac{Bx+C}{x^{2}+px+q}=\frac{B}{2}\cdot\frac{2x+p}{x^{2}+px+q}+\frac{C-\frac{Bp}{2}}{x^{2}+px+q}
$$

The first part gives a log, the second an $\arctan$ after completing the square; "log plus $\arctan$" is no accident. Compare $\int\dfrac{2x+3}{x^{2}+3x+2}dx$, whose numerator is the derivative of the denominator: one step gives $\ln\left|x^{2}+3x+2\right|+C$.

## Case 4: powers of an irreducible quadratic

When $Q$ contains $(x^{2}+px+q)^{k}$, all $j=1,\dots,k$ must be written, each again split into a derivative part and a constant part. The constant part reduces to $I_k=\int\dfrac{dx}{(x^{2}+a^{2})^{k}}$, and for $k\ge2$ parts lowers the power: write $\dfrac{1}{(x^{2}+a^{2})^{2}}$ as $\dfrac{1}{a^{2}}\left[\dfrac{1}{x^{2}+a^{2}}-\dfrac{x^{2}}{(x^{2}+a^{2})^{2}}\right]$, then take $u=x$ and $dv=\dfrac{x\,dx}{(x^{2}+a^{2})^{2}}$ in the second term:

$$
I_2=\frac{x}{2a^{2}(x^{2}+a^{2})}+\frac{1}{2a^{3}}\arctan\frac xa+C
$$

With $a=1$, differentiating confirms $\dfrac{1-x^{2}}{2(1+x^{2})^{2}}+\dfrac{1}{2(1+x^{2})}=\dfrac{1}{(1+x^{2})^{2}}$. Here $u=x$ is simplest, because $dv$ is integrable and $x'=1$ lowers the square.

## Choosing a method

| Method | Applies when | Signal |
| --- | --- | --- |
| Standard table | already a standard shape | matches a formula word for word |
| Substitution | a factor is the inner derivative | spot $g'(x)$ |
| Complete the square + $\arctan$ | quadratic without real roots | $x^{2}+px+q$ |
| Parts | two independent factors, or one lone transcendental | polynomial times transcendental, $\ln x$ |
| Partial fractions | rational function | polynomial over polynomial |
| Series or numerics | no elementary antiderivative | every attempt grows |

Order of attack: simplify (cancel, split terms) → look for an inner derivative → rational functions: compare degrees, divide, factor → polynomial times transcendental or a lone transcendental: parts → otherwise recurrences, series, or numerics.

## Three misconceptions

> [!MYTH] 1 · For parts, taking the transcendental factor as $u$ is easier.
> Taking $u=e^{x}$ raises the degree: $\int xe^{x}dx$ becomes $\dfrac{x^{2}}{2}e^{x}-\int\dfrac{x^{2}}{2}e^{x}dx$ and grows. The test is "smaller $u'$ and integrable $dv$", not "looks more advanced".

> [!MYTH] 2 · A quadratic denominator always calls for partial fractions.
> When the numerator is the derivative of the denominator one step gives a log, as in $\int\dfrac{2x+3}{x^{2}+3x+2}dx$. Partial fractions is the fallback, not the first choice.

> [!MYTH] 3 · $\displaystyle\int\frac{dx}{x^{2}-1}=\ln\left|x^{2}-1\right|+C$.
> Differentiating $\ln\left|x^{2}-1\right|$ gives $\dfrac{2x}{x^{2}-1}$, with an extra $2x$. The correct answer is $\dfrac12\ln\left|\dfrac{x-1}{x+1}\right|+C$.

## Practice

> [!PRACTICE] 1 · One round
> Find $\displaystyle\int x\cos x\,dx$.
>
> > [!ANSWER] Show answer
> > With $u=x$, $dv=\cos x\,dx$: $x\sin x+\cos x+C$.

> [!PRACTICE] 2 · Log times a power
> Find $\displaystyle\int x^{2}\ln x\,dx$.
>
> > [!ANSWER] Show answer
> > With $u=\ln x$, $dv=x^{2}dx$: $\dfrac{x^{3}}{3}\ln x-\dfrac{x^{3}}{9}+C$.

> [!PRACTICE] 3 · Inverse trig times a power
> Find $\displaystyle\int x\arctan x\,dx$.
>
> > [!ANSWER] Show answer
> > Use $\dfrac{x^{2}}{1+x^{2}}=1-\dfrac{1}{1+x^{2}}$ to get $\dfrac{x^{2}+1}{2}\arctan x-\dfrac x2+C$.

> [!PRACTICE] 4 · Repeated root
> Find $\displaystyle\int\frac{dx}{x^{2}(x+1)}$.
>
> > [!ANSWER] Show answer
> > Write $\dfrac{1}{x^{2}(x+1)}=\dfrac{A}{x}+\dfrac{B}{x^{2}}+\dfrac{C}{x+1}$; $B=1$, $C=1$, $A=-1$, so $-\ln|x|-\dfrac1x+\ln|x+1|+C$.

> [!PRACTICE] 5 · Irreducible quadratic
> Find $\displaystyle\int\frac{x+2}{x^{2}+2x+5}dx$.
>
> > [!ANSWER] Show answer
> > Complete the square to $(x+1)^{2}+4$ and write $x+2=\dfrac12(2x+2)+1$: $\dfrac12\ln\left(x^{2}+2x+5\right)+\dfrac12\arctan\dfrac{x+1}{2}+C$.

## Formal statement

> [!FORMAL] Formal statement
> **Theorem (integration by parts).** If $u,v$ are continuously differentiable on $[a,b]$, then $\displaystyle\int_a^b uv'\,dx=u(b)v(b)-u(a)v(a)-\int_a^b u'v\,dx$; on an interval $I$, $\displaystyle\int u\,dv=uv-\int v\,du$, with any antiderivative of $v$.
>
> **Theorem (partial fractions).** Let $P,Q$ be real polynomials with $\deg P<\deg Q$, and let $Q$ factor into linear factors $(x-a_i)^{k_i}$ and irreducible quadratics $(x^{2}+p_jx+q_j)^{m_j}$. Then $\dfrac{P}{Q}$ can be written uniquely as
> $$\sum_{i}\sum_{k=1}^{k_i}\frac{A_{ik}}{(x-a_i)^{k}}+\sum_{j}\sum_{m=1}^{m_j}\frac{B_{jm}x+C_{jm}}{\left(x^{2}+p_jx+q_j\right)^{m}}$$
> with all coefficients real.

## Connections to other lectures

- **Integration by substitution** is the same coin: the chain rule reversed gives substitution, the product rule reversed gives parts.
- **Definite integrals** supply Newton–Leibniz, and the boundary term $\big[uv\big]_a^b$ is its direct product.
- **Taylor's formula** has a remainder obtained by repeated parts, $\int_a^x f^{(n+1)}(t)\dfrac{(x-t)^{n}}{n!}dt$.
- **Improper integrals** use parts with a limit in the boundary term; in **differential equations** partial fractions turns a transfer function into table entries $\dfrac{A}{s-a}$.
