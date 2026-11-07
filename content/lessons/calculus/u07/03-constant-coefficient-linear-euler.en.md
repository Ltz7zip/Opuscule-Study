---
slug: "constant-coefficient-linear-euler"
subject: "calculus"
unit: "u07"
order: 3
mode: "mastery"
lang: "en"
kicker: "Lecture 3 · Advanced Mathematics · Mastery"
title: "Constant-Coefficient Linear Equations and Euler Equations"
subtitle: "Structure sets the frame, the characteristic equation fills it in"
minutes: 31
meta: ["31 min read","Requires first-order linear equations","Mastery level"]
concepts: ["diffeq", "indefint"]
prereq: ["diffeq"]
related: ["deriv", "defint"]
---

## What this lecture sets out to do

Second-order linear equations have the most complete structure in this course. The solution has two layers: linear algebra describes what every solution looks like, and the characteristic equation computes the individual solutions. The first layer gives the frame; the second fills it in.

This lecture establishes the solution structure, solves constant-coefficient homogeneous equations, treats non-homogeneous right sides by undetermined coefficients, and converts Euler equations into constant-coefficient form with $x=e^{t}$.

By the end you should be able to explain why a second-order equation has exactly two arbitrary constants; write the homogeneous solution for distinct, repeated, and complex roots; choose the correct trial form and decide whether to multiply by $x$; and convert an Euler equation into power-function solutions.

## Three lines back

- The general solution of a non-homogeneous equation is the homogeneous solution plus one particular solution.
- The homogeneous constant-coefficient case is settled by the roots of $r^{2}+pr+q=0$.
- An Euler equation $x^{2}y''+pxy'+qy=0$ becomes constant-coefficient under $x=e^{t}$ for $x>0$.

## Why study the structure first

Second-order linear equations model springs, RLC circuits, bending beams, and competing populations. Their common form is

$$
y''+p(x)y'+q(x)y=f(x).
$$

Two properties make a complete description possible.

**Linearity.** Define $L[y]=y''+p(x)y'+q(x)y$. Then for constants $C_1,C_2$ and functions $y_1,y_2$,

$$
L[C_1y_1+C_2y_2]=C_1L[y_1]+C_2L[y_2].
$$

The operator respects linear combinations, so the problem becomes a problem about a linear space.

**Second order.** Two initial conditions, such as $y(x_0)$ and $y'(x_0)$, fix the solution. Two conditions match two degrees of freedom, so the homogeneous solution space should be two-dimensional, spanned by two independent solutions.

Together these give the central statement:

> general solution of the non-homogeneous equation = homogeneous solution + one particular solution.

This splits "find every solution" into two independent tasks: the homogeneous part supplies two constants, and the particular solution matches the right side.

## Structure and superposition

For the homogeneous equation

$$
y''+p(x)y'+q(x)y=0,
$$

two solutions $y_1,y_2$ are **linearly independent** if neither is a constant multiple of the other. Then the homogeneous general solution is

$$
y_h=C_1y_1+C_2y_2.
$$

Two solutions suffice because the solution space is two-dimensional, and two independent solutions form a basis.

For the non-homogeneous equation, if $y^{*}$ is one solution and $y_h$ is the homogeneous general solution, then

$$
L[y_h+y^{*}]=L[y_h]+L[y^{*}]=0+f=f.
$$

Conversely, if $y$ and $y^{*}$ both solve the non-homogeneous equation, then $L[y-y^{*}]=f-f=0$, so their difference is homogeneous. Hence every solution is exactly a particular solution plus the homogeneous general solution.

> [!FORMAL] Solution structure
> Let $p,q,f$ be continuous on $I$, let $y_1,y_2$ be independent homogeneous solutions, and let $y^{*}$ be one particular solution. Every solution on $I$ is $y=C_1y_1+C_2y_2+y^{*}$. Given $x_0\in I$ and arbitrary $y_0,y_1^{0}$, there is a unique solution with $y(x_0)=y_0$ and $y'(x_0)=y_1^{0}$.

## The characteristic equation

For the constant-coefficient homogeneous equation

$$
y''+py'+qy=0,
$$

exponentials are natural because differentiating $e^{rx}$ only multiplies it. Substituting $y=e^{rx}$ gives

$$
(r^{2}+pr+q)e^{rx}=0.
$$

Since $e^{rx}\ne0$, we need

$$
r^{2}+pr+q=0.
$$

This is the **characteristic equation**, and its roots are the **characteristic roots**. The differential problem becomes a quadratic problem. Conversely, each root $r$ yields the solution $e^{rx}$. A quadratic has two roots counted with multiplicity, matching the two solutions a second-order equation needs.

## Three roots, three solutions

| Roots | Homogeneous solution | Behaviour |
| --- | --- | --- |
| distinct real $r_1,r_2$ | $C_1e^{r_1x}+C_2e^{r_2x}$ | two exponential terms |
| double real $r$ | $(C_1+C_2x)e^{rx}$ | critical case with a polynomial factor |
| complex $\alpha\pm\beta i$ | $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ | exponential envelope times oscillation |

**Distinct real roots.** Two different exponentials are independent, so they add directly.

**Double root.** Only $e^{rx}$ is available. To find a second solution, set $y=u(x)e^{rx}$. Then

$$
y'=e^{rx}(u'+ru),\qquad y''=e^{rx}(u''+2ru'+r^{2}u).
$$

Substitution gives

$$
e^{rx}\left[u''+(2r+p)u'+(r^{2}+pr+q)u\right]=0.
$$

Because $r$ is a double root, $r^{2}+pr+q=0$ and $2r+p=0$, leaving $u''=0$. Hence $u=C_1+C_2x$, the second solution is $xe^{rx}$, and the general solution is $(C_1+C_2x)e^{rx}$.

**Complex roots.** For $r=\alpha\pm\beta i$, Euler's formula gives

$$
e^{(\alpha+i\beta)x}=e^{\alpha x}(\cos\beta x+i\sin\beta x).
$$

Taking real and imaginary parts yields $e^{\alpha x}\cos\beta x$ and $e^{\alpha x}\sin\beta x$, so

$$
y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x).
$$

Geometrically, $\alpha$ controls the envelope: growth if $\alpha>0$, decay if $\alpha<0$, constant amplitude if $\alpha=0$. The number $\beta$ is the angular frequency, with period $2\pi/\beta$. A double root is the boundary between oscillation and monotone behaviour, called critical damping in vibration problems.

## Worked example 1: three homogeneous cases

**(a) Distinct real roots.** For $y''-3y'+2y=0$, the characteristic equation is $r^{2}-3r+2=0$, with roots $1$ and $2$. Hence

$$
y=C_1e^{x}+C_2e^{2x}.
$$

**(b) Double root.** For $y''+4y'+4y=0$, $r^{2}+4r+4=(r+2)^{2}=0$, so $r=-2$ is double and

$$
y=(C_1+C_2x)e^{-2x}.
$$

**(c) Complex roots.** For $y''+2y'+5y=0$, $r^{2}+2r+5=0$ gives

$$
r=\frac{-2\pm\sqrt{4-20}}2=-1\pm2i.
$$

Thus $\alpha=-1$, $\beta=2$, and

$$
y=e^{-x}(C_1\cos2x+C_2\sin2x).
$$

This is a damped oscillation with period $\pi$ and envelope $e^{-x}$.

## Non-homogeneous equations and undetermined coefficients

The right side determines the trial form. The principle: **the trial belongs to the same family as the right side, possibly with a polynomial factor and a factor $x^{k}$**.

| Right side $f(x)$ | Root condition | Trial form |
| --- | --- | --- |
| $P_m(x)$ | $0$ is a root of multiplicity $k$ | $x^{k}Q_m(x)$ |
| $P_m(x)e^{\lambda x}$ | $\lambda$ has multiplicity $k$ | $x^{k}Q_m(x)e^{\lambda x}$ |
| $e^{\alpha x}(A\cos\beta x+B\sin\beta x)$ | $\alpha\pm\beta i$ has multiplicity $k$ | $x^{k}e^{\alpha x}(a\cos\beta x+b\sin\beta x)$ |

Here $P_m$ is a polynomial of degree $m$, and $Q_m$ is a trial polynomial of the same degree with $m+1$ unknown coefficients. The exponent $k$ is the multiplicity of the relevant root: $0$ when it is not a root, $1$ for a simple root, $2$ for a double root.

If the right side is a sum, solve term by term and add the particular solutions. For a trigonometric right side, always include both $\cos$ and $\sin$ in the trial, even if only one appears, because differentiation mixes them.

Why the factor $x^{k}$? When the right side is already a homogeneous solution, a trial of the same shape substituted into $L$ gives zero, not the required right side. Multiplying by $x$ moves the trial out of the homogeneous solution space. This is the algebraic explanation of **resonance**.

## Worked example 2: exponential right sides and resonance

**(a) No resonance.** For

$$
y''-3y'+2y=e^{3x},
$$

the roots are $1,2$ and $\lambda=3$ is not a root, so try $y^{*}=Ae^{3x}$. Substitution gives $(9-9+2)A=1$, hence $A=\tfrac12$ and

$$
y=C_1e^{x}+C_2e^{2x}+\frac12e^{3x}.
$$

**(b) Simple-root resonance.** Change the right side to $e^{x}$. Now $\lambda=1$ is a simple root, so try $y^{*}=Axe^{x}$. Then

$$
y^{*}{}'=A(1+x)e^{x},\qquad y^{*}{}''=A(2+x)e^{x},
$$

and substitution gives

$$
A\left[(2+x)-3(1+x)+2x\right]e^{x}=-Ae^{x}=e^{x},
$$

so $A=-1$ and

$$
y=C_1e^{x}+C_2e^{2x}-xe^{x}.
$$

Without the factor $x$, trying $Ae^{x}$ produces $0=e^{x}$, a contradiction.

**(c) A sum on the right.** For $y''-3y'+2y=e^{3x}+e^{x}$, the two particular solutions are $\tfrac12e^{3x}$ and $-xe^{x}$, so

$$
y=C_1e^{x}+C_2e^{2x}+\frac12e^{3x}-xe^{x}.
$$

## Worked example 3: trigonometric right side and resonance

Solve

$$
y''+y=\cos x.
$$

The characteristic roots are $\pm i$. The right side corresponds to $\alpha=0$, $\beta=1$, and $\pm i$ is a simple root, so $k=1$ and

$$
y^{*}=x(a\cos x+b\sin x).
$$

Differentiating,

$$
y^{*}{}'=(a\cos x+b\sin x)+x(-a\sin x+b\cos x),
$$

$$
y^{*}{}''=-2a\sin x+2b\cos x-x(a\cos x+b\sin x).
$$

The $x$-terms cancel in $y''+y$:

$$
y^{*}{}''+y^{*}=-2a\sin x+2b\cos x.
$$

Matching $\cos x$ gives $b=\tfrac12$, $a=0$, so $y^{*}=\tfrac{x}{2}\sin x$ and

$$
y=C_1\cos x+C_2\sin x+\frac{x}{2}\sin x.
$$

The amplitude grows linearly. This is resonance: the forcing frequency equals the natural frequency, energy keeps entering, and the response cannot stay bounded. For $y''+y=\sin x$, a similar computation gives $y^{*}=-\tfrac{x}{2}\cos x$.

## Euler equations

An equation

$$
x^{2}y''+pxy'+qy=0\qquad(x>0)
$$

is an **Euler equation** (also Cauchy–Euler). Its coefficients are powers of $x$, so it is invariant under rescaling. Put $x=e^{t}$, that is $t=\ln x$, and write $D=\dfrac{d}{dt}$. The chain rule gives

$$
y'=\frac1x Dy
\Longrightarrow
xy'=Dy,
$$

and differentiating again,

$$
y''=\frac1{x^{2}}(D^{2}-D)y
\Longrightarrow
x^{2}y''=D(D-1)y.
$$

Substitution yields

$$
D(D-1)y+pDy+qy=0,
$$

that is

$$
\left[D^{2}+(p-1)D+q\right]y=0,
$$

a constant-coefficient equation in $D$. Solve the quadratic in $D$, then translate back to $x$.

| Roots in $D$ | Solutions in $x$ |
| --- | --- |
| distinct real $r_1,r_2$ | $C_1x^{r_1}+C_2x^{r_2}$ |
| double real $r$ | $(C_1+C_2\ln x)x^{r}$ |
| complex $\alpha\pm\beta i$ | $x^{\alpha}\left(C_1\cos(\beta\ln x)+C_2\sin(\beta\ln x)\right)$ |

Example:

$$
x^{2}y''-2xy'+2y=0
$$

becomes

$$
D(D-1)y-2Dy+2y=0
\Longrightarrow
(D^{2}-3D+2)y=0,
$$

with roots $1,2$, hence

$$
y=C_1e^{t}+C_2e^{2t}=C_1x+C_2x^{2}.
$$

One checks directly that $x$ and $x^{2}$ solve the original equation.

## Worked example 4: oscillation and resonance in Euler form

**(a) Oscillation.** For

$$
x^{2}y''+xy'+y=0\qquad(x>0),
$$

we have $p=1$, $q=1$, so

$$
(D^{2}-1+1)y=(D^{2}+1)y=0.
$$

The roots are $\pm i$, giving $\alpha=0$, $\beta=1$ and

$$
y=C_1\cos(\ln x)+C_2\sin(\ln x).
$$

This oscillates in $\ln x$ with constant amplitude. As $x$ runs from $0$ to $\infty$, $\ln x$ runs from $-\infty$ to $\infty$, so the number of oscillations is infinite.

**(b) Non-homogeneous and resonant.** For

$$
x^{2}y''-2xy'+2y=x\qquad(x>0),
$$

the substitution gives

$$
(D^{2}-3D+2)y=e^{t}.
$$

Since $\lambda=1$ is a simple root, try $y^{*}=At e^{t}$. For $P(D)=D^{2}-3D+2$,

$$
P(D)(te^{t})=e^{t}\left[tP(1)+P'(1)\right].
$$

Now $P(1)=0$ and $P'(1)=2-3=-1$, so $P(D)(te^{t})=-e^{t}$. Taking $A=-1$ gives $y^{*}=-te^{t}=-x\ln x$ and

$$
y=C_1x+C_2x^{2}-x\ln x.
$$

Check: for $y=-x\ln x$, $y'=-\ln x-1$ and $y''=-1/x$, so

$$
x^{2}y''-2xy'+2y=-x-2x(-\ln x-1)+2(-x\ln x)=x.
$$

## Edge cases and traps

**Interval and singular point.** Euler equations degenerate at $x=0$, which is a singular point. Solutions live on $x>0$ or $x<0$. For $x<0$, use $x=-e^{t}$, or write $|x|^{r}$ and treat the $\ln|x|$ carefully.

**Multiplicity and resonance.** The number of factors $x$ equals the multiplicity of the root. Missing one produces $0$ equals something nonzero; adding one too many makes the coefficients unsolvable.

**Right sides outside the table.** Functions such as $\tan x$, $\ln x$, or $e^{x^{2}}$ require variation of parameters, not undetermined coefficients.

**Initial conditions.** A second-order equation needs two conditions. An initial point in $x_0>0$ guarantees a unique solution only on an interval containing $x_0$ and avoiding singular points.

## Four misconceptions

> [!MYTH] The general solution of a non-homogeneous equation is just a particular solution.
> A particular solution has no arbitrary constant. The homogeneous part must be added to cover all solutions.

> [!MYTH] An exponential right side always calls for $Ae^{\lambda x}$.
> That fails when $\lambda$ is a characteristic root. Multiply by $x$ for a simple root, by $x^{2}$ for a double root.

> [!MYTH] Euler equations can be solved by trying $y=e^{rx}$.
> $e^{rx}$ belongs to constant-coefficient equations. Euler equations have power solutions $x^{r}$; the exponential trial applies only after $x=e^{t}$.

> [!MYTH] A double root means the solution is just $Ce^{rx}$.
> That gives only one constant and loses $xe^{rx}$. The solution must be $(C_1+C_2x)e^{rx}$.

## Practice

> [!PRACTICE] 1 · Double root
> Solve $y''+4y'+4y=0$.
>
> > [!ANSWER] Show answer
> > $r^{2}+4r+4=0$ has the double root $r=-2$, so $y=(C_1+C_2x)e^{-2x}$.

> [!PRACTICE] 2 · Simple-root resonance
> Solve $y''-y=e^{x}$.
>
> > [!ANSWER] Show answer
> > The homogeneous roots are $\pm1$. Since $\lambda=1$ is a simple root, try $y^{*}=Axe^{x}$; substitution gives $2A=1$, so $A=\tfrac12$ and $y=C_1e^{x}+C_2e^{-x}+\tfrac{x}{2}e^{x}$.

> [!PRACTICE] 3 · Euler
> Solve $x^{2}y''+xy'-y=0$ for $x>0$.
>
> > [!ANSWER] Show answer
> > The substitution gives $(D^{2}-1)y=0$ with roots $\pm1$, so $y=C_1x+C_2x^{-1}$.

> [!PRACTICE] 4 · Trigonometric resonance
> Solve $y''+y=\sin x$.
>
> > [!ANSWER] Show answer
> > The homogeneous solution is $C_1\cos x+C_2\sin x$. Since $\pm i$ are roots, try $y^{*}=x(a\cos x+b\sin x)$; substitution gives $a=-\tfrac12$, $b=0$, hence $y=C_1\cos x+C_2\sin x-\tfrac{x}{2}\cos x$.

> [!PRACTICE] 5 · Double resonance
> Solve $y''-2y'+y=e^{x}$.
>
> > [!ANSWER] Show answer
> > The characteristic equation is $(r-1)^{2}=0$, a double root at $1$. Try $y^{*}=Ax^{2}e^{x}$; substitution gives $2A=1$, so $A=\tfrac12$ and $y=(C_1+C_2x)e^{x}+\tfrac{x^{2}}{2}e^{x}$.

> [!PRACTICE] 6 · Euler double root
> Solve $x^{2}y''-xy'+y=0$ for $x>0$.
>
> > [!ANSWER] Show answer
> > The substitution gives $(D-1)^{2}y=0$, a double root at $1$, so $y=(C_1+C_2\ln x)x$.

## Formal statement

Let $p,q,f$ be continuous on $I$. For $L[y]=y''+py'+qy$, the homogeneous solution space is two-dimensional; if $y_1,y_2$ are independent, the homogeneous solution is $C_1y_1+C_2y_2$. The non-homogeneous general solution is $C_1y_1+C_2y_2+y^{*}$ with any particular solution $y^{*}$.

For constant $p,q$, the homogeneous solutions follow from $r^{2}+pr+q=0$: distinct real roots give $C_1e^{r_1x}+C_2e^{r_2x}$; a double root $r$ gives $(C_1+C_2x)e^{rx}$; complex roots $\alpha\pm\beta i$ give $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.

If $f=P_m(x)e^{\lambda x}$ and $\lambda$ is a root of multiplicity $k$, a particular solution may be sought as $x^{k}Q_m(x)e^{\lambda x}$. If $f=e^{\alpha x}(A\cos\beta x+B\sin\beta x)$ and $\alpha\pm\beta i$ has multiplicity $k$, try $x^{k}e^{\alpha x}(a\cos\beta x+b\sin\beta x)$.

The Euler equation $x^{2}y''+pxy'+qy=0$ on $x>0$ becomes

$$
\left[D^{2}+(p-1)D+q\right]y=0
$$

under $x=e^{t}$, $D=\dfrac{d}{dt}$. Its solutions are powers, powers times $\ln x$, or powers times trigonometric functions of $\ln x$.

## How this lecture connects

- **The previous lecture** supplied the integrating factor and reduction of order. The homogeneous-plus-particular structure continues here, and the double-root case is solved by the same substitution $y=ue^{rx}$.
- **Complex exponentials** become essential. Taking real and imaginary parts of $e^{(\alpha+i\beta)x}$ produces two real solutions; the same step recurs in vibrations, AC circuits, and Fourier series.
- **Linear algebra** supplies the language of dimension and basis. The homogeneous solution space of a second-order equation is two-dimensional, matching the vector-space notions of span and independence.
