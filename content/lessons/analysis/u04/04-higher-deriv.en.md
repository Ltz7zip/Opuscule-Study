---
slug: "higher-deriv"
subject: "analysis"
unit: "u04"
order: 4
mode: "mastery"
lang: "en"
kicker: "Lecture 4 · Mathematical Analysis · Mastery"
title: "Higher Derivatives and Leibniz's Formula"
subtitle: "Differentiate the derivative"
minutes: 14
meta: ["14 min read","Requires the chain rule","Mastery level"]
concepts: ["deriv"]
prereq: ["deriv"]
related: ["taylor", "mvt"]
---

## Goal

Differentiate velocity and you get acceleration; differentiate again and you get a third derivative. Repeating the operation gives the $n$-th derivative.

By the end you can write the general $n$-th derivative of the standard functions, use Leibniz's formula for products, and tell how many derivatives a function has at a given point.

## Three-line recap

- The $n$-th derivative is obtained by differentiating $n$ times, written $f^{(n)}(x)$, with $f^{(0)}=f$.
- Standard results: $(x^n)^{(n)}=n!$, $(e^x)^{(n)}=e^x$, $(\sin x)^{(n)}=\sin\left(x+\dfrac{n\pi}{2}\right)$.
- Products do not differentiate term by term: $(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(k)}v^{(n-k)}$.

## Definition and notation

If $f'$ is differentiable at $x$, then

$$
f''(x)=\lim_{\Delta x\to 0}\frac{f'(x+\Delta x)-f'(x)}{\Delta x}
$$

is the second derivative. Inductively, $f^{(n)}=\left(f^{(n-1)}\right)'$. Other notations are $\dfrac{d^ny}{dx^n}$, $y''$, and $\ddot y$ for a time derivative in mechanics.

One caution: $f''(x)$ requires $f'$ to exist in a neighbourhood of $x$, not just at $x$. So being twice differentiable at a point is strictly stronger than having a derivative there.

**Example**: $f(x)=x|x|$. It is differentiable on $\mathbb{R}$ with $f'(x)=2|x|$, and $f''(0)$ does not exist because $2|x|$ is not differentiable at $0$. The first derivative exists on both sides of $0$, but only one step further.

## Four standard formulas

By induction,

$$
(x^n)^{(n)}=n!,\qquad (e^x)^{(n)}=e^x,
$$

$$
(\sin x)^{(n)}=\sin\left(x+\frac{n\pi}{2}\right),\qquad
(\cos x)^{(n)}=\cos\left(x+\frac{n\pi}{2}\right).
$$

For $\ln x$ with $x>0$:

$$
(\ln x)'=\frac{1}{x},\quad (\ln x)''=-\frac{1}{x^2},\quad (\ln x)'''=\frac{2}{x^3},
$$

and in general

$$
(\ln x)^{(n)}=\frac{(-1)^{n-1}(n-1)!}{x^n}.
$$

To check such a formula, look at three places only: whether signs alternate, whether the factorial is $(n-1)!$ or $n!$, and whether the power in the denominator is $n$. Those are where mistakes live.

## Leibniz's formula

If $u$ and $v$ have $n$ derivatives, then

$$
(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(k)}v^{(n-k)}.
$$

The shape is exactly the binomial theorem with powers replaced by derivative orders. For $n=1$ this is the product rule; for $n=2$,

$$
(uv)''=u''v+2u'v'+uv''.
$$

The coefficient $2$ in the middle term is the usual casualty.

**Example**: find $(x^2e^x)^{(n)}$. Take $u=x^2$ and $v=e^x$. Since $u$ vanishes from the third derivative on, only three terms survive:

$$
(x^2e^x)^{(n)}=x^2e^x+2nx\,e^x+n(n-1)e^x
=e^x\left(x^2+2nx+n(n-1)\right).
$$

At $n=1$ this is $e^x(x^2+2x)$, matching $2xe^x+x^2e^x$.

**Example**: the third derivative of $y=x^2\ln x$ for $x>0$. Now $u=\ln x$, $v=x^2$:

$$
y'''=(\ln x)'''x^2+3(\ln x)''\cdot 2x+3(\ln x)'\cdot 2+0
=\frac{2}{x}-\frac{6}{x}+\frac{6}{x}=\frac{2}{x}.
$$

Terms after the third vanish because $v'''=0$, so the sum truncates by itself.

## Three misconceptions

> [!MYTH] $(uv)^{(n)}=u^{(n)}v+uv^{(n)}$; differentiate each factor and distribute.
> All the middle terms are gone. For $n=2$ the correct expression is $u''v+2u'v'+uv''$. Take $u=v=x$: the left side is $(x^2)''=2$, the right side is $0+0=0$.

> [!MYTH] $(uv)''=u''v+uv''$ merely omits a term; it hardly matters.
> That missing term decides the value. With $u=v=x$ the left side is $2$ and the right side is $0$. This is a numerical error, not a notation issue.

> [!MYTH] Derivatives of an even function stay even.
> Each differentiation flips parity. $f(x)=x^2$ is even, $f'=2x$ is odd, $f''=2$ is even again. In general, even-order derivatives of an even function are even and odd-order ones are odd.

## Practice

> [!PRACTICE] 1 · A polynomial
> Find the fifth and sixth derivatives of $y=x^5$.
>
> > [!ANSWER] Show answer
> > $y^{(5)}=5!=120$ and $y^{(6)}=0$. A polynomial of degree $n$ has constant $n$-th derivative $n!$, and all higher derivatives vanish.

> [!PRACTICE] 2 · A trigonometric
> Find the $100$-th derivative of $y=\sin x$.
>
> > [!ANSWER] Show answer
> > $(\sin x)^{(100)}=\sin\left(x+\dfrac{100\pi}{2}\right)=\sin(x+50\pi)=\sin x$, since the pattern has period $4$ and $100$ is a multiple of $4$.

> [!PRACTICE] 3 · Leibniz
> Find $(x^2e^x)^{(n)}$.
>
> > [!ANSWER] Show answer
> > Take $u=x^2$, $v=e^x$; three terms remain: $x^2e^x+2nxe^x+n(n-1)e^x=e^x\left(x^2+2nx+n(n-1)\right)$.

> [!PRACTICE] 4 · A logarithm
> Find the third derivative of $y=x^2\ln x$.
>
> > [!ANSWER] Show answer
> > Differentiating repeatedly is quickest: $y'=2x\ln x+x$, $y''=2\ln x+3$, $y'''=\dfrac{2}{x}$. Leibniz gives the same: $\dfrac{2}{x^3}x^2+3\left(-\dfrac{1}{x^2}\right)2x+3\cdot\dfrac{1}{x}\cdot 2=\dfrac{2}{x}-\dfrac{6}{x}+\dfrac{6}{x}=\dfrac{2}{x}$.

> [!FORMAL] Formal statement
> $f^{(n)}(x_0)$ is the derivative at $x_0$ of $f^{(n-1)}$, which must therefore exist in a neighbourhood of $x_0$. If $u$ and $v$ have $n$ derivatives at $x_0$, then $(uv)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}u^{(k)}v^{(n-k)}$, proved by induction from the product rule. Standard formulas include $(x^\alpha)^{(n)}=\alpha(\alpha-1)\cdots(\alpha-n+1)x^{\alpha-n}$ and $(\ln x)^{(n)}=(-1)^{n-1}(n-1)!/x^{n}$.
