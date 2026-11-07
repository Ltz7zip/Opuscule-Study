---
slug: "first-order-linear-reduction"
subject: "calculus"
unit: "u07"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Advanced Mathematics · Mastery"
title: "First-Order Linear Equations and Reducible Higher-Order Equations"
subtitle: "One integrating factor, one reduction table"
minutes: 32
meta: ["32 min read","Requires antiderivatives","Mastery level"]
concepts: ["diffeq", "indefint"]
prereq: ["indefint"]
related: ["defint", "deriv"]
---

## What this lecture sets out to do

This lecture treats two families: **first-order linear equations** and **higher-order equations with a missing variable**. Both rely on one substitution that turns the equation into a shape we can solve. In the linear case, multiplying by an integrating factor $\mu=e^{\int P\,dx}$ merges two terms into one derivative. In the second-order case, $p=y'$ lowers the order.

By the end you should be able to derive the integrating factor, solve an initial value problem on the correct interval, linearise a Bernoulli equation with $z=y^{1-n}$, and choose between $p(x)$ and $p(y)$ from the missing variable.

## Three lines back

- The standard form is $y'+P(x)y=Q(x)$; it is homogeneous when $Q\equiv 0$.
- The factor $\mu=e^{\int P\,dx}$ turns the left side into $(\mu y)'$, leaving one integration.
- Reducible equations branch by the missing variable: $p(x)$ when $y$ is absent, $p(y)$ when $x$ is absent, two direct integrations when both are absent.

## Why first-order linear equations deserve their own lecture

Most models of cooling, mixing, circuits, and populations have the same shape: a rate of change equal to an input minus a loss proportional to the quantity itself,

$$
\frac{dy}{dt}=Q(t)-P(t)y.
$$

Rearranged, this is $y'+P(t)y=Q(t)$. The coefficient $P$ is the loss rate and $Q$ is the input. Ask first for the equilibrium and the speed of approach; those answers often explain the model better than the full solution.

Linear equations also obey superposition: solutions for inputs $Q_1$ and $Q_2$ add to a solution for $Q_1+Q_2$. This is why "homogeneous solution plus one particular solution" works and why a sum on the right can be handled term by term.

The integrating factor itself is a general construction, not a trick: multiply so that the left side becomes the derivative of a product. The same idea returns for exact equations and linear systems.

One warning: **not every linear equation is separable**. For example $y'+2xy=x$ can be rewritten as $y'=x(1-2y)$ and happens to separate, but $y'+y=\sin x$ cannot separate $x$ from $y$. The integrating factor works for all linear equations without relying on such coincidences.

## Standard form and the integrating factor

An equation

$$
y'+P(x)y=Q(x)
$$

is **first-order linear** when $y'$ and $y$ enter linearly and the coefficients depend only on $x$. It is **homogeneous** when $Q\equiv 0$.

We look for a positive $\mu(x)$ such that

$$
\mu(y'+Py)=(\mu y)'.
$$

Since $(\mu y)'=\mu y'+\mu'y$, we need $\mu'=P\mu$, so

$$
\frac{\mu'}{\mu}=P
\Longrightarrow
\mu=e^{\int P\,dx}.
$$

Any antiderivative works: a different constant only multiplies $\mu$ by a positive constant, which does not change the solution set. Multiplying the equation gives

$$
(\mu y)'=\mu Q
\Longrightarrow
\mu y=\int \mu Q\,dx+C,
$$

hence

$$
y=e^{-\int P\,dx}\left[\int Q(x)e^{\int P\,dx}\,dx+C\right].
$$

Both occurrences of $\int P\,dx$ use the same antiderivative, and no extra constant is needed inside the integral. The formula covers all solutions where $P,Q$ are continuous; if $P=1/x$, solutions live on one side of $0$ only.

> [!NOTE]
> The method is "multiply, then integrate". Multiplication creates one derivative; integration undoes it. Doing only one of the two leaves the equation unsolved.

Geometrically, $(\mu y)'=\mu Q$ says that $z=\mu y$ changes only according to the known function $\mu Q$. The factor absorbs the term in which the unknown feeds on itself.

## Structure of the general solution

Split the formula:

$$
y=\underbrace{Ce^{-\int P\,dx}}_{\text{homogeneous}}
+\underbrace{e^{-\int P\,dx}\int Qe^{\int P\,dx}\,dx}_{\text{particular}}.
$$

The first term is the system with no input; the second is where the input pushes it. Their sum is the full answer. The same architecture appears in second-order equations, with two homogeneous solutions and two constants.

For $y(x_0)=y_0$,

$$
y(x)=e^{-\int_{x_0}^{x}P(u)\,du}
\left[y_0+\int_{x_0}^{x}Q(s)e^{\int_{x_0}^{s}P(u)\,du}\,ds\right].
$$

The outer factor damps the initial value by accumulated loss; the integral accumulates each input with its own damping.

> [!FORMAL] Structure of the solution
> Let $P,Q$ be continuous on $I$ and $x_0\in I$. For every $y_0$, the problem $y'+P(x)y=Q(x)$, $y(x_0)=y_0$ has a unique solution on $I$, given above. The homogeneous solution is $Ce^{-\int P\,dx}$; the full solution adds one particular solution.

## Worked example 1: polynomial right side

Solve $y'+2xy=x$ with $y(0)=0$. Here $P=2x$, $Q=x$, and $\mu=e^{x^{2}}$. Multiplying,

$$
(e^{x^{2}}y)'=xe^{x^{2}}
\Longrightarrow
e^{x^{2}}y=\frac12e^{x^{2}}+C,
$$

so $y=\tfrac12+Ce^{-x^{2}}$. The initial condition gives $C=-\tfrac12$, hence

$$
y=\frac12\left(1-e^{-x^{2}}\right).
$$

Check: $y'=xe^{-x^{2}}$, and $y'+2xy=xe^{-x^{2}}+x(1-e^{-x^{2}})=x$. The solution rises from $0$ to the equilibrium $\tfrac12$, which comes from $y'=0$. The factor $e^{-x^{2}}$ controls the approach.

## Worked example 2: convert to standard form

Solve $xy'-y=x^{2}$ for $x>0$. Dividing by $x$,

$$
y'-\frac1x y=x,
$$

so $P=-\tfrac1x$, $Q=x$, and $\mu=e^{-\ln x}=\tfrac1x$. Then

$$
\left(\frac yx\right)'=1
\Longrightarrow
\frac yx=x+C
\Longrightarrow
y=x^{2}+Cx.
$$

Check: $xy'-y=x(2x+C)-(x^{2}+Cx)=x^{2}$.

If $x<0$ is allowed, the interval cannot cross $0$: on each side the solution is $x^{2}+Cx$ with a possibly different constant. An initial value fixes only the constant on its own side. Standard form is not optional; applying the formula directly misreads $P$ as $-1$.

## Worked example 3: trigonometric right side and the transient

Solve $y'+y=\cos x$. Here $P=1$, $\mu=e^{x}$, and

$$
(e^{x}y)'=e^{x}\cos x
\Longrightarrow
y=\frac{\cos x+\sin x}{2}+Ce^{-x}.
$$

Check: $y'+y=\dfrac{-\sin x+\cos x}{2}+\dfrac{\cos x+\sin x}{2}=\cos x$.

The first term is the **steady state**, oscillating with the input. The term $Ce^{-x}$ is the **transient**, fixed by the initial value and decaying exponentially. Whatever the initial value, the solution eventually locks onto the steady state. This is the forced/free decomposition seen in circuits and vibrations.

## Bernoulli equations

An equation

$$
y'+P(x)y=Q(x)y^{n}\qquad(n\ne 0,1)
$$

is a **Bernoulli equation**. Put $z=y^{1-n}$, so $z'=(1-n)y^{-n}y'$. Dividing by $y^{n}$ (assume $y>0$),

$$
y^{-n}y'+Py^{1-n}=Q
\Longrightarrow
z'+(1-n)Pz=(1-n)Q,
$$

which is linear. Solve for $z$ and return via $y=z^{1/(1-n)}$.

**Example.** Solve $y'+y=xy^{2}$. With $n=2$, $z=y^{-1}$, and $z'-z=-x$. The factor $e^{-x}$ gives

$$
(ze^{-x})'=-xe^{-x}
\Longrightarrow
z=x+1+Ce^{x},
$$

so

$$
y=\frac{1}{x+1+Ce^{x}}.
$$

Check: $y'=-\dfrac{1+Ce^{x}}{z^{2}}$, and $y'+y=\dfrac{-1-Ce^{x}+z}{z^{2}}=\dfrac{x}{z^{2}}=xy^{2}$.

> [!NOTE]
> Dividing by $y^{n}$ discards $y\equiv 0$, which is a genuine solution for $n>0$. When $n=0$ or $n=1$, the equation is already linear and the substitution does not apply.

## Reducible higher-order equations

| Type | Missing | Substitution | Reduced equation |
| --- | --- | --- | --- |
| $y''=f(x)$ | $y,y'$ | integrate twice | $y'=\int f\,dx+C_1$ |
| $y''=f(x,y')$ | $y$ | $p=y'$, $y''=p'$ | $p'=f(x,p)$ |
| $y''=f(y,y')$ | $x$ | $p=y'$, $y''=p\dfrac{dp}{dy}$ | $p\dfrac{dp}{dy}=f(y,p)$ |

The third row needs care. Since $x$ is absent, $p$ is a function of $y$, and

$$
y''=\frac{dp}{dx}=\frac{dp}{dy}\frac{dy}{dx}=p\frac{dp}{dy}.
$$

This replaces a derivative in $x$ by one in $y$, the variable still present. Writing $p'=y''$ leaves both variables and reduces nothing.

> [!NOTE]
> Classify by the missing variable: $p(x)$ when $y$ is absent, $p(y)$ when $x$ is absent, two integrations when both are absent.

## Worked example 4: two routes for $y''=y'$

Solve $y''=y'$. Both $y$ and $x$ are missing.

**Route one (missing $y$).** With $p=y'$, $p'=p$, so $p=C_1e^{x}$ and $y=C_1e^{x}+C_2$.

**Route two (missing $x$).** With $p=y'$ and $y''=p\dfrac{dp}{dy}$, $p\dfrac{dp}{dy}=p$. If $p\ne 0$, $\dfrac{dp}{dy}=1$, so $p=y+C$ and $y+C=Ae^{x}$, giving $y=Ae^{x}-C$. Renaming constants gives the same answer. The case $p=0$ gives constant solutions, corresponding to $C_1=0$.

Route one is shorter because $y$ is the missing variable; route two adds an unnecessary division by $p$.

## Worked example 5: an equation without $x$

Solve $yy''+(y')^{2}=0$ for $y>0$. No $x$ appears. Solve for $y''=-\dfrac{(y')^{2}}{y}$, then set $p=y'$ and $y''=p\dfrac{dp}{dy}$:

$$
p\frac{dp}{dy}=-\frac{p^{2}}{y}.
$$

For $p\ne 0$, $\dfrac{dp}{p}=-\dfrac{dy}{y}$, so $p=\dfrac{C_1}{y}$. Since $p=\dfrac{dy}{dx}$, integration gives $y^{2}=C_1x+C_2$ after renaming constants. The case $p=0$ gives constant solutions, included when $C_1=0$.

Check: from $y^{2}=C_1x+C_2$, $y'=\dfrac{C_1}{2y}$ and $y''=-\dfrac{C_1^{2}}{4y^{3}}$, hence $yy''+(y')^{2}=0$.

A shortcut: $(yy')'=(y')^{2}+yy''$, so the equation is $(yy')'=0$, giving $yy'=C_1$ immediately.

## Application: a mixing problem

A $100\ \mathrm{L}$ tank receives brine at $2\ \mathrm{L/min}$ with concentration $0.1\ \mathrm{kg/L}$ and drains at the same rate, with perfect mixing. Let $y(t)$ be the salt mass.

Inflow is $0.2\ \mathrm{kg/min}$; outflow concentration is $y/100$, so outflow is $0.02y$. Hence

$$
y'=0.2-0.02y,\qquad y(0)=0.
$$

With integrating factor $e^{0.02t}$,

$$
(ye^{0.02t})'=0.2e^{0.02t}
\Longrightarrow
y=10+Ce^{-0.02t}.
$$

The initial condition gives $C=-10$:

$$
y=10\left(1-e^{-0.02t}\right).
$$

The limit is $10\ \mathrm{kg}$, which also follows from inflow equals outflow: $0.2=0.02y$. That is concentration $0.1\ \mathrm{kg/L}$, matching the inflow.

The time to reach $5\ \mathrm{kg}$ satisfies $e^{-0.02t}=0.5$, so $t=50\ln2\approx34.7\ \mathrm{min}$.

If the inflow concentration doubles to $0.2\ \mathrm{kg/L}$, the input is $0.4$, the equilibrium is $20\ \mathrm{kg}$, and $y=20(1-e^{-0.02t})$. Reaching $5\ \mathrm{kg}$ now requires $e^{-0.02t}=0.75$, so $t=50\ln\frac43\approx14.4\ \mathrm{min}$. The equilibrium also doubled, so $5\ \mathrm{kg}$ is only a quarter of the way rather than half.

The model assumes perfect mixing and equal inflow and outflow. If outflow exceeds inflow, the volume changes and

$$
y'=c_{\rm in}r_{\rm in}-\frac{r_{\rm out}}{V(t)}y,
$$

which is still linear, but with nonconstant $P(t)$.

## Choosing a method

| Equation shape | Recognition | First method | Caveat |
| --- | --- | --- | --- |
| $y'=f(x)g(y)$ | right side splits | separation | check $g(y)=0$ |
| $y'+P(x)y=Q(x)$ | linear in $y',y$ | integrating factor | standard form first |
| $y'+Py=Qy^{n}$ | power $y^{n}$, $n\ne0,1$ | $z=y^{1-n}$ | restore $y\equiv0$ |
| $y''=f(x)$ | only $x$ on the right | integrate twice | two constants |
| $y''=f(x,y')$ | no $y$ | $p(x)=y'$ | first-order in $p$ |
| $y''=f(y,y')$ | no $x$ | $p(y)=y'$ | $y''=p\,dp/dy$ |

If the equation contains both variables, is nonlinear, and is not Bernoulli, numerical or series methods are usually needed.

## Edge cases and traps

**Interval.** Integrate where $P,Q$ are continuous. With $P=1/x$, a solution cannot cross $0$.

**Division.** The Bernoulli substitution discards $y\equiv0$; a reduction discards constant solutions. Check these separately.

**Constants.** First order has one constant, second order has two. Reduction still needs a final integration, so the count cannot shrink.

**Degenerate and discontinuous cases.** The Bernoulli formula fails at $n=0,1$. For piecewise $Q$, solve on each piece and glue by continuity.

## Four misconceptions

> [!MYTH] Every first-order linear equation can be separated.
> Only some can, usually by accident. $y'+y=\sin x$ cannot separate $x$ from $y$.

> [!MYTH] The integrating factor multiplies only the left side.
> It multiplies the whole equation, so the right side becomes $\mu Q$.

> [!MYTH] For $y''=f(y,y')$ one can use $p=y'$ with $p'=y''$.
> That leaves both $x$ and $y$ and reduces nothing. Use $y''=p\,dp/dy$.

> [!MYTH] After reduction a second-order equation needs only one constant.
> One more integration returns to $y$; a second-order solution must carry two constants.

## Practice

> [!PRACTICE] 1 · Standard form
> Solve $y'+\dfrac{y}{x}=\sin x$ for $x>0$.
>
> > [!ANSWER] Show answer
> > $\mu=x$, so $(xy)'=x\sin x$ and $xy=\sin x-x\cos x+C$. Thus $y=\dfrac{\sin x}{x}-\cos x+\dfrac{C}{x}$.

> [!PRACTICE] 2 · Combine first
> Solve $(1+x^{2})y'+2xy=3x^{2}$ with $y(0)=0$.
>
> > [!ANSWER] Show answer
> > The left side is $\big((1+x^{2})y\big)'$, so $(1+x^{2})y=x^{3}+C$. The condition gives $C=0$ and $y=\dfrac{x^{3}}{1+x^{2}}$.

> [!PRACTICE] 3 · Bernoulli
> Solve $y'-y=y^{2}$.
>
> > [!ANSWER] Show answer
> > With $z=y^{-1}$, $z'+z=-1$, so $z=Ce^{-x}-1$ and $y=\dfrac{1}{Ce^{-x}-1}$. Also $y\equiv0$.

> [!PRACTICE] 4 · Missing $y$
> Solve $y''=y'+x$.
>
> > [!ANSWER] Show answer
> > With $p=y'$, $p'-p=x$, so $p=Ce^{x}-x-1$. Then $y=Ce^{x}-\dfrac{x^{2}}2-x+C_2$.

> [!PRACTICE] 5 · Missing $x$
> Solve $y''+(y')^{2}=0$.
>
> > [!ANSWER] Show answer
> > With $p=y'$, $p\dfrac{dp}{dy}+p^{2}=0$. For $p\ne0$, $p=C_1e^{-y}$, so $e^{y}=C_1x+C_2$ and $y=\ln(C_1x+C_2)$. Constant solutions also work.

> [!PRACTICE] 6 · Mixing model
> A $100\ \mathrm{L}$ tank has equal inflow and outflow of $2\ \mathrm{L/min}$, inflow concentration $0.2\ \mathrm{kg/L}$, and initial salt mass $0$. When does the salt reach $15\ \mathrm{kg}$?
>
> > [!ANSWER] Show answer
> > $y'=0.4-0.02y$, so $y=20(1-e^{-0.02t})$. Setting $y=15$ gives $e^{-0.02t}=0.25$ and $t=50\ln4\approx69.3\ \mathrm{min}$.

## Formal statement

Let $P,Q$ be continuous on $I$, with $x_0\in I$ and $y_0\in\mathbb{R}$. The problem $y'+P(x)y=Q(x)$, $y(x_0)=y_0$ has a unique solution on $I$, namely

$$
y(x)=e^{-\int_{x_0}^{x}P(u)\,du}
\left[y_0+\int_{x_0}^{x}Q(s)e^{\int_{x_0}^{s}P(u)\,du}\,ds\right].
$$

The general solution is $y=e^{-\int P\,dx}\left[\int Qe^{\int P\,dx}\,dx+C\right]$, reducing to $y=Ce^{-\int P\,dx}$ when $Q\equiv0$.

For $n\ne0,1$, the Bernoulli equation becomes linear under $z=y^{1-n}$ on intervals where $y>0$, with $z'+(1-n)Pz=(1-n)Q$.

For second order, $y''=f(x,y')$ becomes $p'=f(x,p)$ under $p=y'$; $y''=f(y,y')$ becomes $p\dfrac{dp}{dy}=f(y,p)$ when $p$ is treated as a function of $y$.

## How this lecture connects

- **Antiderivatives** are the working tool; every integrating-factor problem ends in an indefinite integral.
- **Separable equations** came earlier in this unit. The warning that linear is not automatically separable forces classification before computation.
- **Constant-coefficient equations** come next; characteristic roots, repeated roots, and resonance extend the homogeneous-plus-particular structure.
- **Reduction from a known solution.** If one nonzero solution $y_1$ is known, $y=uy_1$ lowers the order.
- **Modelling language.** Equilibrium, time constant, and the time to reach $95\%$ recur in later applications.
