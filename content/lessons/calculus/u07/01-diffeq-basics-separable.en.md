---
slug: "diffeq-basics-separable"
subject: "calculus"
unit: "u07"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lesson 1 · Calculus · Mastery mode"
title: "Differential Equations: Basic Concepts, Separable and Homogeneous Equations"
subtitle: "Order and general solution first, then two directly integrable types"
minutes: 30
meta: ["30 min read","Requires derivatives and indefinite integrals","Mastery level"]
concepts: ["diffeq", "deriv"]
prereq: ["deriv"]
related: ["defint", "indefint"]
---

## Learning goals

The previous lessons all did one thing: given a function, find its derivative or its integral. A differential equation reverses the question — **the local law the function obeys is known, and the function itself is wanted**. Population growth, radioactive decay, Newton cooling, charging a capacitor: all of them are written as equations containing derivatives.

This lesson first fixes the vocabulary (order, solution, general solution, particular solution, initial condition), then treats the two easiest types: separable equations and homogeneous equations. Both reduce to "integrate each side separately", so they need only the integration techniques already available.

Relation to the surrounding lessons: this lesson handles first-order equations only, and the method is integration; the next lesson treats higher-order linear equations, where the characteristic equation replaces separation of variables. We must first settle "what counts as a solution" before asking "how to solve", otherwise the general solution and the set of all solutions get confused.

By the end you should be able to:

- state the order of an equation and decide whether a given function solves it;
- use an initial condition to pick the particular solution, and explain why the number of constants equals the order;
- solve a separable equation and check whether a constant solution was lost;
- recognise $y'=\varphi(y/x)$ and reduce it with $u=y/x$, then substitute back.

## Three-line recap

- A differential equation contains an unknown function and its derivatives; the order is the highest derivative present.
- The general solution contains as many independent arbitrary constants as the order; the initial condition selects a particular solution.
- A separable equation is written as $g(y)dy=f(x)dx$ and integrated on both sides; a homogeneous equation is reduced by $u=y/x$.

## Why differential equations

Take the simplest model: a bacterial culture grows by $10\%$ per hour. If $y(t)$ is the population at time $t$, the precise content of that sentence is "the growth rate is proportional to the current population", that is,

$$
y'=0.1y
$$

This is not an algebraic formula for $y$ but a constraint: the rate of change is determined by the current value. Finding the functions that obey it is the answer.

Such equations matter because physical laws state rates: $F=ma$ involves a second derivative, heat conduction a temperature gradient, circuit laws rates of change of current. Differential equations are the route from calculus to applications.

And because the equation describes a local law, it usually determines a whole family of functions. To know which member, we need the value at one instant — that is where initial conditions come from.

## Basic vocabulary: order, solution, general and particular solutions

**Order.** The order of an equation is the order of the highest derivative of the unknown that appears. $y''+3y'+2y=0$ is second order; $y'=x^{2}$ is first order. The order decides how many independent constants the general solution should carry: one for first order, two for second order.

**Solution.** A function is a solution if substituting it makes the equation an identity. "Identity" means on an interval, everywhere, not merely at isolated points. For instance $y=x^{2}$ solves $y'=2x$ because $2x=2x$ for every $x$.

**General and particular solutions.** The general solution of $y'=2x$ is $y=x^{2}+C$; letting $C$ run over the reals gives a whole family of parabolas. The condition $y(0)=1$ forces $C=1$, giving the particular solution $y=x^{2}+1$.

| Term | Meaning | Example ($y'=2x$) |
| --- | --- | --- |
| order | order of the highest derivative | first order |
| general solution | contains independent constants, as many as the order | $y=x^{2}+C$ |
| particular solution | constants fixed | $y=x^{2}+1$ |
| initial condition | value prescribed at one point | $y(0)=1$ |

The word "independent" cannot be dropped. The expression $y=C_{1}\sin x+C_{2}\sin x$ collapses to $(C_{1}+C_{2})\sin x$: only one independent constant, so it cannot be the general solution of a second-order equation.

The number of initial conditions must match the order. A second-order equation with one condition usually fails to pin down a unique solution; with three it usually has none. A first-order equation takes $y(x_{0})=y_{0}$; a second-order equation takes $y(x_{0})=y_{0}$ together with $y'(x_{0})=y'_{0}$.

## Checking solutions and the geometric picture

Verifying a solution takes two steps: differentiate, substitute, see whether the result is an identity. Check $y=Ce^{x^{2}/2}$ against $y'=xy$:

$$
y'=Ce^{x^{2}/2}\cdot x=xy
$$

The two sides agree, so it is a solution for every constant $C$.

Geometrically, a first-order equation $y'=f(x,y)$ assigns a slope to every point $(x,y)$ of the plane. Drawing these little slopes gives a direction field; a curve everywhere tangent to the field is an integral curve, and it is a solution. The general solution is a family of such curves; the initial condition names the point the curve passes through.

This picture explains both facts: a family of curves needs one label, and the field guarantees a curve can be drawn, not that it can be written with powers and exponentials.

## Separable equations: the method and why it works

If the equation can be written as

$$
\frac{dy}{dx}=f(x)\,g(y)
$$

move the $y$-factors to the left and the $x$-factors to the right, then integrate both sides:

$$
\int\frac{dy}{g(y)}=\int f(x)\,dx
$$

This looks like treating $dy$ and $dx$ as fractions, but it has a rigorous justification. Let $G(y)$ be an antiderivative of $\dfrac{1}{g(y)}$. Then

$$
\frac{d}{dx}G(y(x))=G'(y)\,y'=\frac{1}{g(y)}\cdot f(x)g(y)=f(x)
$$

so $G(y(x))$ is an antiderivative of $f(x)$, and integrating gives $G(y)=\int f(x)\,dx+C$. That is exactly the formula above. Separation of variables is not symbol shuffling but **the chain rule run backwards**: the left side integrates with respect to $y$, and since $y$ depends on $x$, differentiating brings out a factor $y'$.

### Example 1: a separable equation with an initial condition

Solve $y'=xy$ with $y(0)=3$.

First, separate. For $y\ne0$,

$$
\frac{dy}{y}=x\,dx
$$

Second, integrate:

$$
\ln|y|=\frac{x^{2}}{2}+C_{1}
$$

Third, solve for $y$. Exponentiating gives $|y|=e^{C_{1}}e^{x^{2}/2}$; renaming $e^{C_{1}}$ as a positive constant and then allowing negative values,

$$
y=Ce^{x^{2}/2},\qquad C\in\mathbb{R}
$$

Fourth, impose $y(0)=3$: $3=Ce^{0}=C$, hence

$$
y=3e^{x^{2}/2}
$$

Check: $y'=3e^{x^{2}/2}\cdot x=xy$ and $y(0)=3$. Note that $y(0)=3$ means the solution is positive near $x=0$, so dropping the absolute value with a plus sign is legitimate; a negative initial value would give negative $C$.

### The boundary case: constant solutions divided away

Separating divides by $g(y)$, which presupposes $g(y)\ne0$. If $g(y_{0})=0$, then $y\equiv y_{0}$ is itself a solution: its derivative vanishes, and so does the right side. This solution may or may not be absorbed by the general formula, and must be checked separately.

Consider $y'=y^{2}$. Separating gives $\dfrac{dy}{y^{2}}=dx$, so $-\dfrac1y=x+C$ and

$$
y=-\frac{1}{x+C}
$$

Now $y\equiv0$ is a solution, yet it is not in this family: $-\dfrac{1}{x+C}$ is never identically zero. The full answer is therefore "$y=-\dfrac{1}{x+C}$ or $y\equiv0$".

Compare $y'=xy$, where $y\equiv0$ corresponds to $C=0$ and is absorbed. Both situations occur, so the check cannot be replaced by a guess. This is the first concrete example of "the general solution is not all solutions".

## Homogeneous equations and the substitution

An equation of the form

$$
\frac{dy}{dx}=\varphi\!\left(\frac{y}{x}\right)
$$

is called homogeneous. Here "homogeneous" means the right side depends only on the ratio $y/x$, which has nothing to do with homogeneity of polynomials.

The test is direct: replace $x$ by $tx$ and $y$ by $ty$, and see whether the expression is unchanged. For example $\dfrac{x^{2}+y^{2}}{xy}$ becomes $\dfrac{t^{2}(x^{2}+y^{2})}{t^{2}xy}$, unchanged, so it is homogeneous; while $\dfrac{y+1}{x}$ becomes $\dfrac{ty+1}{tx}$, changed, so it is not.

Set $u=\dfrac{y}{x}$, that is $y=ux$; then $y'=u+xu'$ and the equation becomes

$$
u+x\frac{du}{dx}=\varphi(u)
$$

so $x\dfrac{du}{dx}=\varphi(u)-u$, a separable equation. Solve for $u$ and substitute back with $y=ux$.

### Example 2: a homogeneous equation

Solve $y'=\dfrac{y}{x}+\dfrac{x}{y}$.

The right side depends only on $y/x$: with $u=y/x$ we have $\dfrac{x}{y}=\dfrac1u$, so $u+xu'=u+\dfrac1u$. Cancelling $u$,

$$
x\frac{du}{dx}=\frac1u
$$

Separate: $u\,du=\dfrac{dx}{x}$, and integrate:

$$
\frac{u^{2}}{2}=\ln|x|+C
$$

Substitute back $u=y/x$:

$$
\frac{y^{2}}{2x^{2}}=\ln|x|+C
$$

Multiply by $2x^{2}$ and rename $2C$ as $C$:

$$
y^{2}=2x^{2}\ln|x|+Cx^{2}
$$

A dimensional check: $y^{2}$ and $x^{2}$ have the same order, which is reassuring. Substituting back into the original equation confirms it. The equation is undefined at $x=0$ and at $y=0$, so the solution lives where $x\ne0$, $y\ne0$ — which also explains the $\ln|x|$.

## Comparing the two types

| Item | Separable | Homogeneous |
| --- | --- | --- |
| Standard form | $y'=f(x)g(y)$ | $y'=\varphi(y/x)$ |
| Key move | separate, then integrate both sides | set $u=y/x$ to make it separable |
| Recognition | right side splits into an $x$-part times a $y$-part | unchanged under $x\mapsto tx$, $y\mapsto ty$ |
| Usual trap | dividing by $g(y)$ loses constant solutions | forgetting to replace $u$ by $y/x$ at the end |
| Shape of answer | usually explicit in $y$ | often only an implicit relation |

Neither type is a new kind of equation; both are equations that can be reduced to first-order integration. The real dividing line is whether separation is possible: once it is, only integration technique remains.

## Four common misconceptions

> [!MYTH] The general solution is "all solutions".
> It is a family with arbitrary constants, and individual solutions may lie outside it — for instance constant solutions divided away. Always check $g(y)=0$ and add what is missing.

> [!MYTH] Each side needs its own constant of integration.
> Two constants combine into one: $\ln|y|=\frac{x^{2}}{2}+C_{1}+C_{2}$ and $\ln|y|=\frac{x^{2}}{2}+C$ say the same thing, and writing two invites errors.

> [!MYTH] "Homogeneous" means all terms have the same degree.
> Here it means the right side is a function of $y/x$, which is a different notion from homogeneity of polynomials. Do not try to match degrees.

> [!MYTH] A solution is finished only when $y$ is written explicitly.
> Many equations yield only an implicit relation such as $y^{2}=2x^{2}\ln|x|+Cx^{2}$. An implicit solution that locally determines $y$ is legitimate; forcing $y$ out may be impossible and may lose branches.

## Practice

> [!PRACTICE] 1 · Separation
> Solve $y'=2xy$ with $y(0)=1$.
>
> > [!ANSWER] Show answer
> > $\dfrac{dy}{y}=2x\,dx$ gives $\ln|y|=x^{2}+C$, so $y=Ce^{x^{2}}$. From $y(0)=1$, $C=1$ and $y=e^{x^{2}}$.

> [!PRACTICE] 2 · Homogeneous substitution
> Solve $y'=\dfrac{y}{x}+1$.
>
> > [!ANSWER] Show answer
> > With $u=y/x$, $u+xu'=u+1$, so $xu'=1$, $u=\ln|x|+C$, hence $y=x\ln|x|+Cx$.

> [!PRACTICE] 3 · Order and solution
> What is the order of $y''+y=0$? Is $y=\sin x$ a solution?
>
> > [!ANSWER] Show answer
> > Second order. $y'=\cos x$ and $y''=-\sin x$, so $-\sin x+\sin x=0$; it is a solution, and the general solution is $y=C_{1}\sin x+C_{2}\cos x$.

> [!PRACTICE] 4 · Lost solutions
> Solve $y'=y^{2}-1$ and state which solutions separation loses.
>
> > [!ANSWER] Show answer
> > Separating gives $\dfrac{dy}{y^{2}-1}=dx$, and partial fractions give $\dfrac12\ln\left|\dfrac{y-1}{y+1}\right|=x+C$. The divided-away constants $y\equiv1$ and $y\equiv-1$ also solve the equation and must be listed separately.

> [!PRACTICE] 5 · Initial value problem
> Solve $y'=\dfrac{x}{y}$ with $y(0)=2$.
>
> > [!ANSWER] Show answer
> > $y\,dy=x\,dx$ gives $\dfrac{y^{2}}{2}=\dfrac{x^{2}}{2}+C$, that is $y^{2}=x^{2}+C_{1}$. From $y(0)=2$, $C_{1}=4$, and $y(0)>0$, so $y=\sqrt{x^{2}+4}$.

> [!PRACTICE] 6 · Verification
> Verify that $y=x^{2}$ solves $y'=\dfrac{2y}{x}$, and state the interval on which it does.
>
> > [!ANSWER] Show answer
> > $y'=2x$ and $\dfrac{2y}{x}=\dfrac{2x^{2}}{x}=2x$, so it is a solution. Since the equation contains $\dfrac1x$, the solution holds only on an interval avoiding $0$, such as $(0,+\infty)$ or $(-\infty,0)$.

## Formal statement

> [!FORMAL] Formal statement
> An equation involving an unknown function $y$ and its derivatives $y',\dots,y^{(n)}$ is an $n$-th order differential equation, where $n$ is the highest derivative present. A function on an interval is a solution there if substitution makes the equation an identity. If a first-order equation can be written $M(x)N(y)\,dx+P(x)Q(y)\,dy=0$ with continuous coefficients, separation of variables reduces it to $\int\frac{Q(y)}{N(y)}dy=-\int\frac{M(x)}{P(x)}dx$, with the constant solutions satisfying $N(y)=0$ checked separately. If $\varphi$ is continuous in $y'=\varphi(y/x)$, the substitution $u=y/x$ reduces the equation to a separable one; the general solution contains as many independent arbitrary constants as the order.

## Connections to other lessons

- **With derivatives**: the equation treats the derivative as known data and asks for the function; fluency in differentiating, and in recognising chain-rule structure, is what makes separation legitimate.
- **With indefinite integrals**: the last step of solving a first-order equation is almost always an antiderivative, so weak integration technique leaves the solution incomplete.
- **With definite integrals**: an initial value problem is geometrically an integral curve through a fixed point; when the solution is later written as a definite integral, the initial condition becomes the lower limit.
- **With later lessons**: second-order constant-coefficient equations are solved by a characteristic equation rather than separation, but the two rules — the general solution carries as many constants as the order, and initial conditions fix a particular solution — remain unchanged.

Every method here assumes the equation can be rewritten in a first-order integrable form. An equation such as $y'+P(x)y=Q(x)$, which does not separate, needs the integrating factor of the next lesson; second-order equations shift the idea from "integrate" to "solve an algebraic equation".