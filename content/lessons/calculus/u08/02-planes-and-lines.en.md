---
slug: "planes-and-lines"
subject: "calculus"
unit: "u08"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lesson 2 · Calculus · Mastery mode"
title: "Planes and Lines in Space"
subtitle: "One normal fixes a plane, one direction fixes a line"
minutes: 38
meta: ["38 min read","Requires vector algebra","Mastery level"]
concepts: ["vectorgeo", "la"]
prereq: ["vectorgeo"]
related: ["matrix", "la"]
---

## Learning goals

The previous lesson built vector addition, scalar multiplication, dot and cross products. This lesson applies them to one goal: **describing planes and lines in space by equations**, and computing distances and angles.

Why does a plane need a vector perpendicular to it, while a line needs one along it? A plane is two-dimensional, and the cheapest way to compress it into one equation is to say which direction leaves it — one normal suffices. A line is one-dimensional, and the cheapest way is to say which direction stays on it. Once this is clear, no formula needs memorising.

By the end you should be able to:

- write the point-normal, general and intercept forms of a plane;
- write the symmetric and parametric forms of a line, handling zero denominators;
- read a line's direction from two intersecting planes;
- compute point-to-plane distances, plane-plane angles and line-plane angles;
- use a pencil of planes for "through this line and satisfying an extra condition".

## Three-line recap

- A plane is fixed by a point and a normal: $A(x-x_{0})+B(y-y_{0})+C(z-z_{0})=0$.
- A line is fixed by a point and a direction; the symmetric form writes the three coordinate rates as a continued ratio.
- The angle between normal and direction decides every positional relation.

## Why "point + normal" pins down a plane

Let $M_{0}(x_{0},y_{0},z_{0})$ and $\mathbf n=(A,B,C)\ne\mathbf 0$ be given. A point $M(x,y,z)$ lies in the plane through $M_{0}$ perpendicular to $\mathbf n$ exactly when $\overrightarrow{M_{0}M}\perp\mathbf n$:

$$
\mathbf n\cdot\overrightarrow{M_{0}M}=0
$$

In coordinates this is the point-normal form

$$
A(x-x_{0})+B(y-y_{0})+C(z-z_{0})=0
$$

The equivalence runs both ways, so no point is gained or lost. This also shows why $A,B,C$ cannot all vanish: the zero vector is perpendicular to everything, describes no direction, and collapses the equation to $0=0$.

## Three forms of a plane equation

**Point-normal form.** The form above, with the data visible.

**General form.** Expand and collect:

$$
Ax+By+Cz+D=0,\qquad D=-(Ax_{0}+By_{0}+Cz_{0})
$$

From it one reads the normal $(A,B,C)$, and every such equation with $A,B,C$ not all zero is a plane — parallel to "$Ax+By+C=0$ is a line" in the plane. Three degenerate cases matter: $D=0$ passes through the origin; $C=0$ is vertical and has no $z$; $A=B=0$ gives $z=\text{constant}$, horizontal.

**Intercept form.** If $A,B,C,D$ are all nonzero,

$$
\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1,\qquad a=-\frac{D}{A},\quad b=-\frac{D}{B},\quad c=-\frac{D}{C}
$$

For instance $2x-y+3z-8=0$ becomes $\dfrac{x}{4}+\dfrac{y}{-8}+\dfrac{z}{8/3}=1$, with the intercepts visible. But the form fails when a plane is parallel to an axis or passes through the origin, so **it is for drawing; equations are written in general form**.

### Example 1: writing a plane and measuring a distance

The plane through $(1,0,2)$ with normal $\mathbf n=(2,-1,3)$:

$$
2(x-1)-(y-0)+3(z-2)=0\ \Longrightarrow\ 2x-y+3z-8=0
$$

Its distance from the origin is

$$
d=\frac{|Ax_{0}+By_{0}+Cz_{0}+D|}{\sqrt{A^{2}+B^{2}+C^{2}}}
=\frac{|0+0+0-8|}{\sqrt{4+1+9}}
=\frac{8}{\sqrt{14}}\approx2.138
$$

For $(1,1,1)$ the distance is $\dfrac{|2-1+3-8|}{\sqrt{14}}=\dfrac{4}{\sqrt{14}}\approx1.069$: same plane, different points, different distances.

## Where the distance formula comes from

Take any point $M_{0}$ of the plane and project $\overrightarrow{M_{0}P}$ onto the normal. The projection length is the perpendicular distance, because displacement along the normal is exactly the part that leaves the plane, while displacement within the plane contributes nothing. Hence

$$
d=\frac{|\mathbf n\cdot\overrightarrow{M_{0}P}|}{|\mathbf n|}
=\frac{|A(x_{P}-x_{0})+B(y_{P}-y_{0})+C(z_{P}-z_{0})|}{\sqrt{A^{2}+B^{2}+C^{2}}}
$$

Substituting $D=-(Ax_{0}+By_{0}+Cz_{0})$ gives $|Ax_{P}+By_{P}+Cz_{P}+D|$ upstairs.

The derivation shows two things. $M_{0}$ may be any point of the plane, since replacing it changes $\overrightarrow{M_{0}P}$ by a vector inside the plane, which the normal ignores. And the absolute value is essential: without it we get a signed quantity telling which side $P$ lies on.

> [!NOTE]
> To decide the side, use $Ax_{P}+By_{P}+Cz_{P}+D$ without the absolute value; a positive sign means the side the normal points to. Distance is magnitude; side is a separate question.

## Relative positions of two planes

Let $\Pi_{1},\Pi_{2}$ have normals $\mathbf n_{1},\mathbf n_{2}$.

| Relation | Criterion | Comment |
| --- | --- | --- |
| parallel | $\mathbf n_{1}\times\mathbf n_{2}=\mathbf 0$ and constants not proportional | no common point |
| coincident | $A_{1}:B_{1}:C_{1}:D_{1}=A_{2}:B_{2}:C_{2}:D_{2}$ | same plane |
| perpendicular | $\mathbf n_{1}\cdot\mathbf n_{2}=0$ | normals perpendicular |
| intersecting | none of the above | a unique line |

Parallel normals are necessary but not sufficient: $2x-y+3z-8=0$ and $2x-y+3z+4=0$ are parallel and distinct. Only when all four coefficients are proportional do the planes coincide. Two parallel planes are separated by

$$
d=\frac{|D_{1}-D_{2}|}{\sqrt{A^{2}+B^{2}+C^{2}}}
$$

which here gives $\dfrac{|-8-4|}{\sqrt{14}}=\dfrac{12}{\sqrt{14}}\approx3.207$.

The angle between two planes is the acute angle between normals:

$$
\cos\theta=\frac{|\mathbf n_{1}\cdot\mathbf n_{2}|}{|\mathbf n_{1}||\mathbf n_{2}|}
$$

For $2x-y+3z-8=0$ and $x+2y+2z-3=0$: $\mathbf n_{1}\cdot\mathbf n_{2}=6$, $|\mathbf n_{1}|=\sqrt{14}$, $|\mathbf n_{2}|=3$, so $\cos\theta=\dfrac{2}{\sqrt{14}}\approx0.5345$ and $\theta\approx57.7^{\circ}$. Two intersecting planes form a supplementary pair; "the angle" means the acute one, and the obtuse one is $180^{\circ}-\theta$.

## Lines in space: symmetric and parametric forms

A point $M$ lies on the line through $M_{0}(x_{0},y_{0},z_{0})$ with direction $\mathbf s=(l,m,n)$ exactly when $\overrightarrow{M_{0}M}\parallel\mathbf s$, i.e. when coordinates are proportional:

$$
\frac{x-x_{0}}{l}=\frac{y-y_{0}}{m}=\frac{z-z_{0}}{n}
$$

Calling the common ratio $t$ gives the parametric form

$$
x=x_{0}+lt,\qquad y=y_{0}+mt,\qquad z=z_{0}+nt
$$

For example the line through $(1,2,3)$ with direction $(2,-1,4)$ is

$$
\frac{x-1}{2}=\frac{y-2}{-1}=\frac{z-3}{4}
$$

with $x=1+2t,\ y=2-t,\ z=3+4t$. The direction may be rescaled but never set to zero.

### When a denominator vanishes

If $l=0$ the line does not move in $x$, so $x\equiv x_{0}$ and the form must be read as "numerator zero":

$$
\frac{x-x_{0}}{0}\ \Longleftrightarrow\ x=x_{0}
$$

When $l=0,m\ne0,n\ne0$ the correct writing is

$$
x=x_{0},\qquad \frac{y-y_{0}}{m}=\frac{z-z_{0}}{n}
$$

Treating it as an ordinary fraction would give the false $0\cdot(x-x_{0})=$ something. It is a ratio notation, not a quotient.

### A line as the intersection of two planes

Two non-parallel planes meet in the line

$$
\begin{cases}A_{1}x+B_{1}y+C_{1}z+D_{1}=0,\\ A_{2}x+B_{2}y+C_{2}z+D_{2}=0\end{cases}
$$

whose direction is perpendicular to both normals:

$$
\mathbf s=\mathbf n_{1}\times\mathbf n_{2}
$$

### Example 2: turning an intersection into symmetric form

For $x+y=1$ and $y+z=0$, the normals are $(1,1,0)$ and $(0,1,1)$, so

$$
\mathbf s=(1,1,0)\times(0,1,1)=(1,-1,1)
$$

Putting $y=0$ gives $x=1$, $z=0$, hence the point $(1,0,0)$ and

$$
\frac{x-1}{1}=\frac{y}{-1}=\frac{z}{1}
$$

that is $x=1+t,\ y=-t,\ z=t$, which satisfies both equations.

For the projection on $2x-y+3z-8=0$, use an auxiliary plane containing the line and perpendicular to the given plane. Its normal is

$$
\mathbf s\times\mathbf n=(1,-1,1)\times(2,-1,3)=(-2,-1,1)\sim(2,1,-1)
$$

so the auxiliary plane through $(1,0,0)$ is

$$
2(x-1)+y-z=0\ \Longrightarrow\ 2x+y-z-2=0
$$

The projection is the intersection of the two planes; its direction is $(2,-1,3)\times(2,1,-1)=(-2,8,4)\sim(-1,4,2)$, and at $z=0$ we get $x=\dfrac52$, $y=-3$, so

$$
\frac{x-\frac52}{-1}=\frac{y+3}{4}=\frac{z}{2}
$$

## The angle between a line and a plane

If $\psi$ is the angle between $\mathbf s$ and $\mathbf n$, then $\varphi=90^{\circ}-\psi$, so

$$
\sin\varphi=|\cos\psi|=\frac{|\mathbf s\cdot\mathbf n|}{|\mathbf s||\mathbf n|}
$$

The flatter the line, the more nearly perpendicular $\mathbf s$ is to $\mathbf n$, the smaller the dot product and the smaller $\varphi$ — matching intuition. That is why the line-plane angle uses a sine.

### Example 3: line-plane angle

For $\dfrac{x-1}{2}=\dfrac{y-2}{-1}=\dfrac{z-3}{4}$ and $2x-y+3z-8=0$ we have $\mathbf s=(2,-1,4)$, $\mathbf n=(2,-1,3)$, and

$$
\mathbf s\cdot\mathbf n=4+1+12=17,\qquad |\mathbf s|=\sqrt{21},\qquad |\mathbf n|=\sqrt{14}
$$

$$
\sin\varphi=\frac{17}{\sqrt{294}}\approx0.9915,\qquad \varphi\approx1.44\ \text{rad}\approx82.5^{\circ}
$$

The line is nearly perpendicular to the plane, consistent with $\mathbf s$ differing from $\mathbf n$ in only one component.

## Pencils of planes

All planes through the intersection line of $\Pi_{1},\Pi_{2}$ are

$$
A_{1}x+B_{1}y+C_{1}z+D_{1}+\lambda\left(A_{2}x+B_{2}y+C_{2}z+D_{2}\right)=0
$$

Every point of the line makes both brackets zero, so every $\lambda$ gives a plane through the line; as $\lambda$ varies the normal changes and the plane rotates. $\lambda=0$ gives $\Pi_{1}$, while $\Pi_{2}$ corresponds to the limiting direction and must be added separately.

### Example 4: a pencil

For the plane through the intersection of $x+y-1=0$ and $y+z=0$ passing through $(1,1,1)$, write

$$
(x+y-1)+\lambda(y+z)=0
$$

Substituting $(1,1,1)$ gives $1+2\lambda=0$, so $\lambda=-\dfrac12$ and

$$
2(x+y-1)-(y+z)=0\ \Longrightarrow\ 2x+y-z-2=0
$$

On the line $y=1-x$, $z=x-1$, and substitution gives $0$ identically.

## The three angles side by side

| Objects | Vectors | Formula | Range |
| --- | --- | --- | --- |
| two planes | $\mathbf n_{1},\mathbf n_{2}$ | $\cos\theta=\dfrac{|\mathbf n_{1}\cdot\mathbf n_{2}|}{|\mathbf n_{1}||\mathbf n_{2}|}$ | $[0,\ \pi/2]$ |
| line and plane | $\mathbf s,\mathbf n$ | $\sin\varphi=\dfrac{|\mathbf s\cdot\mathbf n|}{|\mathbf s||\mathbf n|}$ | $[0,\ \pi/2]$ |
| two lines | $\mathbf s_{1},\mathbf s_{2}$ | $\cos\theta=\dfrac{|\mathbf s_{1}\cdot\mathbf s_{2}|}{|\mathbf s_{1}||\mathbf s_{2}|}$ | $[0,\ \pi/2]$ |

| Relation | Criterion |
| --- | --- |
| two planes parallel | $\mathbf n_{1}\parallel\mathbf n_{2}$, i.e. $\mathbf n_{1}\times\mathbf n_{2}=\mathbf 0$ |
| two planes perpendicular | $\mathbf n_{1}\cdot\mathbf n_{2}=0$ |
| line parallel to plane | $\mathbf s\cdot\mathbf n=0$ |
| line perpendicular to plane | $\mathbf s\parallel\mathbf n$ |
| two lines parallel | $\mathbf s_{1}\times\mathbf s_{2}=\mathbf 0$ |
| two lines perpendicular | $\mathbf s_{1}\cdot\mathbf s_{2}=0$ |

"Line parallel to plane" needs one extra check: a zero dot product gives parallel directions, not disjointness; the line might lie in the plane.

## Four common misconceptions

> [!MYTH] In $Ax+By+Cz+D=0$ the triple $(A,B,C)$ is a point of the plane.
> It is the normal, perpendicular to the plane. Points are the triples satisfying the equation.

> [!MYTH] A zero denominator in the symmetric form can be treated as a fraction.
> It must be rewritten as "numerator $=0$": $\frac{x-1}{0}$ means $x=1$. Never cross-multiply when a component vanishes.

> [!MYTH] The line-plane angle can be computed with $\cos$.
> The angle between $\mathbf s$ and $\mathbf n$ is $90^{\circ}-\varphi$, so use $\sin\varphi$. Using $\cos$ swaps $82.5^{\circ}$ with $7.5^{\circ}$.

> [!MYTH] Parallel normals imply parallel planes.
> The constants must also fail to be proportional. $2x-y+3z-8=0$ and $2x-y+3z+4=0$ are parallel; if all four coefficients are proportional the planes coincide.

## Practice

> [!PRACTICE] 1 · Plane equation
> Find the plane through $(0,1,0)$ with normal $(1,2,-1)$.
>
> > [!ANSWER] Show answer
> > $1(x-0)+2(y-1)-1(z-0)=0$, that is $x+2y-z-2=0$.

> [!PRACTICE] 2 · Point-plane distance
> Find the distance from $(1,1,1)$ to $x+2y+2z-3=0$.
>
> > [!ANSWER] Show answer
> > $d=\dfrac{|1+2+2-3|}{\sqrt{1+4+4}}=\dfrac{2}{3}$.

> [!PRACTICE] 3 · Line-plane angle
> Find the angle between $\dfrac{x}{1}=\dfrac{y}{1}=\dfrac{z-1}{1}$ and the plane $z=0$.
>
> > [!ANSWER] Show answer
> > $\mathbf s=(1,1,1)$, $\mathbf n=(0,0,1)$, $\sin\varphi=\dfrac{1}{\sqrt3}$, $\varphi\approx35.3^{\circ}$.

> [!PRACTICE] 4 · Intersection line
> Find the direction and symmetric form of the line given by $x+y+z=1$ and $x-y=0$.
>
> > [!ANSWER] Show answer
> > $\mathbf s=(1,1,1)\times(1,-1,0)=(1,1,-2)$. With $y=x$, $z=1-2x$, taking $x=0$ gives $(0,0,1)$, so $\dfrac{x}{1}=\dfrac{y}{1}=\dfrac{z-1}{-2}$.

> [!PRACTICE] 5 · Pencil of planes
> Find the plane through the intersection of $x+y-1=0$ and $y+z=0$ that is perpendicular to $x+y+z=0$.
>
> > [!ANSWER] Show answer
> > Write $(x+y-1)+\lambda(y+z)=0$ with normal $(1,1+\lambda,\lambda)$. Perpendicularity gives $1+(1+\lambda)+\lambda=0$, so $\lambda=-1$ and the plane is $x-z-1=0$.

> [!PRACTICE] 6 · Parallel planes
> Find the distance between $2x-y+3z-8=0$ and $2x-y+3z+4=0$.
>
> > [!ANSWER] Show answer
> > The normals agree, so $d=\dfrac{|-8-4|}{\sqrt{4+1+9}}=\dfrac{12}{\sqrt{14}}\approx3.207$.

## Formal statement

> [!FORMAL] Formal statement
> The plane through $M_{0}(x_{0},y_{0},z_{0})$ with normal $\mathbf n=(A,B,C)\ne\mathbf 0$ is $\{\,M:\overrightarrow{M_{0}M}\cdot\mathbf n=0\,\}$, that is $A(x-x_{0})+B(y-y_{0})+C(z-z_{0})=0$. The distance from $P$ to it is $\big|Ax_{P}+By_{P}+Cz_{P}+D\big|/\sqrt{A^{2}+B^{2}+C^{2}}$. The line through $M_{0}$ with direction $\mathbf s=(l,m,n)\ne\mathbf 0$ is $\{\,M_{0}+t\mathbf s:t\in\mathbb{R}\,\}$; its symmetric form holds where components are nonzero and means a constant coordinate where they vanish. The angle between two planes is determined by their normals; the line-plane angle satisfies $\sin\varphi=|\mathbf s\cdot\mathbf n|/(|\mathbf s||\mathbf n|)$. The pencil through the intersection of two planes is $(A_{1}x+B_{1}y+C_{1}z+D_{1})+\lambda(A_{2}x+B_{2}y+C_{2}z+D_{2})=0$.

## Connections to other lessons

- **With vector algebra**: the dot product handles perpendicularity and projection, the cross product the direction of an intersection and the normal of an auxiliary plane.
- **With linear algebra**: plane equations are linear systems; their solution sets are affine subspaces, and "two planes meet in a line" says the dimension is $1$.
- **With surfaces**: quadric surfaces are described by quadratic equations, with planes as the linear special case; tangent planes still need "point plus normal", the normal now supplied by partial derivatives.
- **With later spatial geometry**: distance, angle and projection problems repeat, differing only in the vectors used and whether $\sin$ or $\cos$ applies.

Keep the two threads: a plane is "normal + point", a line is "direction + point". Every computation begins by finding those vectors, then choosing dot or cross product.