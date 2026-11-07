---
slug: "vector-algebra-products"
subject: "calculus"
unit: "u08"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Advanced Mathematics · Mastery"
title: "Vector Algebra: Dot, Cross, and Scalar Triple Products"
subtitle: "Three products, three geometric meanings"
minutes: 30
meta: ["30 min read","Requires planar vectors","Mastery level"]
concepts: ["vectorgeo", "matrix"]
prereq: ["vectorgeo"]
related: ["matrix", "la"]
---

## What this lecture sets out to do

In the plane there is only one product, the dot product. In space it survives but answers only angle and projection; a normal and an area need a second product, and volume and coplanarity need both.

The lecture fixes coordinates and has three tasks: angles and projections, perpendicular vectors, and coplanarity.

By the end you should be able to:

- derive the coordinate formula and explain the sign of a projection;
- compute a cross product and say where direction, length, and perpendicularity come from;
- compute a parallelepiped volume and translate "zero volume" into "coplanar";
- keep straight which product returns a number and which a vector;
- decide which conclusions survive degeneracies.

## Three lines back

- The dot product $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$ is a number; it measures angle, projection, and work.
- The cross product $\mathbf a\times\mathbf b$ is a vector, its direction fixed by the right-hand rule and its length equal to a parallelogram area.
- The scalar triple product $(\mathbf a\times\mathbf b)\cdot\mathbf c$ is a number; its absolute value is a parallelepiped volume, and it vanishes exactly when the three vectors are coplanar.

## Why space needs three products

In the plane two vectors span a parallelogram of area $|\mathbf a||\mathbf b|\sin\theta$, which in two dimensions is merely a determinant and produces no new direction. In space that plane has a definite normal, which the cross product encodes as a vector.

- **Projection and angle**: length along a direction, and the angle between two directions. The dot product.
- **Normal and area**: the direction perpendicular to both, and the size of the parallelogram. The cross product.
- **Volume and coplanarity**: the volume spanned, and whether the vectors lie in one plane. The triple product.

These form one chain: projection, then normal, then one determinant for base area times height.

## Coordinates, length, and unit vectors

Write

$$
\mathbf a=(a_1,a_2,a_3),\qquad \mathbf b=(b_1,b_2,b_3)
$$

Addition and scalar multiplication are componentwise:

$$
\mathbf a+\mathbf b=(a_1+b_1,\ a_2+b_2,\ a_3+b_3),\qquad
k\mathbf a=(ka_1,\ ka_2,\ ka_3)
$$

The length is

$$
|\mathbf a|=\sqrt{a_1^{2}+a_2^{2}+a_3^{2}}
$$

The unit vector $\dfrac{\mathbf a}{|\mathbf a|}$ keeps the direction with length $1$; for $\mathbf a\ne\mathbf 0$,

$$
\mathbf e_{\mathbf a}=\frac{\mathbf a}{|\mathbf a|}
\qquad\text{and}\qquad
\mathbf a=|\mathbf a|\,\mathbf e_{\mathbf a}.
$$

For $A(x_1,y_1,z_1)$ and $B(x_2,y_2,z_2)$ the distance is

$$
|AB|=\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}+(z_2-z_1)^{2}},
$$

and $\overrightarrow{AB}=(x_2-x_1,\ y_2-y_1,\ z_2-z_1)$. Every geometry problem begins by turning points into vectors.

## The dot product: from the law of cosines to coordinates

The geometric definition is

$$
\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta,\qquad \theta\in[0,\pi],
$$

The angle is usually unknown, so the coordinate formula supplies a computable form:

$$
\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3.
$$

The two agree by the law of cosines in the triangle $\mathbf a,\mathbf b,\mathbf a-\mathbf b$:

$$
|\mathbf a-\mathbf b|^{2}=|\mathbf a|^{2}+|\mathbf b|^{2}-2|\mathbf a||\mathbf b|\cos\theta,
$$

while expanding in coordinates gives

$$
|\mathbf a-\mathbf b|^{2}
=(a_1-b_1)^{2}+(a_2-b_2)^{2}+(a_3-b_3)^{2}
=|\mathbf a|^{2}+|\mathbf b|^{2}-2(a_1b_1+a_2b_2+a_3b_3).
$$

Comparing the two yields the formula.

It is symmetric, $\mathbf a\cdot\mathbf b=\mathbf b\cdot\mathbf a$; bilinear, $(\lambda\mathbf a+\mu\mathbf b)\cdot\mathbf c=\lambda\,\mathbf a\cdot\mathbf c+\mu\,\mathbf b\cdot\mathbf c$; and positive definite, $\mathbf a\cdot\mathbf a=|\mathbf a|^{2}\ge 0$, zero only for $\mathbf a=\mathbf 0$. Hence

$$
\cos\theta=\frac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}
$$

and the Cauchy–Schwarz inequality

$$
|\mathbf a\cdot\mathbf b|\le|\mathbf a||\mathbf b|,
$$

with equality exactly when the vectors are parallel.

**Projection.** The **scalar projection** of $\mathbf a$ on $\mathbf b$ is

$$
\mathrm{comp}_{\mathbf b}\mathbf a=\frac{\mathbf a\cdot\mathbf b}{|\mathbf b|}=|\mathbf a|\cos\theta.
$$

It is signed: positive when acute, negative when obtuse, zero when perpendicular. The **vector projection** is

$$
\mathrm{proj}_{\mathbf b}\mathbf a=\frac{\mathbf a\cdot\mathbf b}{|\mathbf b|^{2}}\,\mathbf b.
$$

One is a length, the other a vector along $\mathbf b$.

Perpendicularity: for nonzero vectors,

$$
\mathbf a\perp\mathbf b\iff\mathbf a\cdot\mathbf b=0.
$$

"Nonzero" cannot be dropped: the zero vector dots to $0$ with everything but has no direction.

## Worked example one: angle, projection, perpendicularity

**Perpendicularity test.**

$$
\mathbf a=(1,2,2),\qquad \mathbf b=(2,-1,0)
$$

Compute

$$
\mathbf a\cdot\mathbf b=1\cdot2+2\cdot(-1)+2\cdot0=0,
$$

so the vectors are perpendicular. Their lengths are

$$
|\mathbf a|=\sqrt{1+4+4}=3,\qquad |\mathbf b|=\sqrt{4+1+0}=\sqrt5,
$$

and the projection of $\mathbf a$ on $\mathbf b$ is $0$.

**Angle and projection.**

$$
\mathbf a=(1,0,1),\qquad \mathbf b=(0,1,1)
$$

$$
\mathbf a\cdot\mathbf b=0+0+1=1,\qquad |\mathbf a|=|\mathbf b|=\sqrt2
$$

so

$$
\cos\theta=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12
\Longrightarrow
\theta=\frac{\pi}{3}.
$$

The scalar projection is

$$
\mathrm{comp}_{\mathbf b}\mathbf a=\frac{1}{\sqrt2},
$$

and the vector projection is

$$
\mathrm{proj}_{\mathbf b}\mathbf a=\frac{1}{2}(0,1,1)=\left(0,\frac12,\frac12\right).
$$

As a check, $\mathbf a-\mathrm{proj}_{\mathbf b}\mathbf a=\left(1,-\frac12,\frac12\right)$ dotted with $\mathbf b$ gives

$$
0-\frac12+\frac12=0,
$$

so the remainder is perpendicular to $\mathbf b$.

**Obtuse angle and negative projection.**

$$
\mathbf a=(1,0,0),\qquad \mathbf b=(-1,1,0)
$$

$$
\mathbf a\cdot\mathbf b=-1,\qquad |\mathbf a|=1,\ |\mathbf b|=\sqrt2
$$

$$
\cos\theta=-\frac{1}{\sqrt2}
\Longrightarrow
\theta=\frac{3\pi}{4}.
$$

The scalar projection is $-\dfrac{1}{\sqrt2}$, the minus sign saying it runs opposite to $\mathbf b$; keep the sign for position, take absolute values for distances.

## The cross product: determinant definition and right-hand rule

The coordinate definition is

$$
\mathbf a\times\mathbf b=
\begin{vmatrix}
\mathbf i & \mathbf j & \mathbf k\\
a_{1} & a_{2} & a_{3}\\
b_{1} & b_{2} & b_{3}
\end{vmatrix}.
$$

Expanding along the first row:

$$
\mathbf a\times\mathbf b=
(a_{2}b_{3}-a_{3}b_{2},\ a_{3}b_{1}-a_{1}b_{3},\ a_{1}b_{2}-a_{2}b_{1}).
$$

The determinant is a memory device; the definition rests on three properties:

- **Perpendicularity**: $\mathbf a\cdot(\mathbf a\times\mathbf b)=0$ and $\mathbf b\cdot(\mathbf a\times\mathbf b)=0$;
- **Length**: $|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$;
- **Direction**: bend the right hand from $\mathbf a$ toward $\mathbf b$; the thumb points along $\mathbf a\times\mathbf b$.

Length and dot product are linked by

$$
|\mathbf a\times\mathbf b|^{2}
=|\mathbf a|^{2}|\mathbf b|^{2}-(\mathbf a\cdot\mathbf b)^{2}
=|\mathbf a|^{2}|\mathbf b|^{2}\sin^{2}\theta,
$$

Lagrange's identity: perpendicular vectors give the maximal length, parallel ones the zero vector.

The cross product is **anticommutative**,

$$
\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a,
$$

distributive, but **not associative**. For $\mathbf a=(1,2,2)$ and $\mathbf b=(2,-1,0)$,

$$
\mathbf a\times\mathbf b=
\left(2\cdot0-2\cdot(-1),\ 2\cdot2-1\cdot0,\ 1\cdot(-1)-2\cdot2\right)
=(2,4,-5),
$$

with length

$$
\sqrt{4+16+25}=\sqrt{45}=3\sqrt5,
$$

matching $|\mathbf a||\mathbf b|\sin\theta=3\sqrt5\cdot1$ for perpendicular vectors.

## Cross product geometry: area and normal vector

The parallelogram with edges $\mathbf a$ and $\mathbf b$ has area

$$
S=|\mathbf a||\mathbf b|\sin\theta=|\mathbf a\times\mathbf b|,
$$

and a triangle has half of it:

$$
S_{\triangle}=\frac12|\mathbf a\times\mathbf b|.
$$

The cross product carries a **signed** area: the length is the area, the direction the normal; the length gives ordinary area, the direction gives orientation.

**Example: triangle area.** For

$$
A(1,0,0),\quad B(0,1,0),\quad C(0,0,1),
$$

the edge vectors are

$$
\overrightarrow{AB}=(-1,1,0),\qquad \overrightarrow{AC}=(-1,0,1),
$$

and

$$
\overrightarrow{AB}\times\overrightarrow{AC}
=\left(1\cdot1-0\cdot0,\ 0\cdot(-1)-(-1)\cdot1,\ (-1)\cdot0-1\cdot(-1)\right)
=(1,1,1),
$$

with length $\sqrt3$, so the area is $\dfrac{\sqrt3}{2}$. The same vector $(1,1,1)$ is a normal to plane $ABC$, with unit normal

$$
\mathbf n=\pm\frac{1}{\sqrt3}(1,1,1),
$$

the sign choosing an orientation. Area and normal come out at once, the main use of the cross product.

## The triple product: volume, orientation, coplanarity

The triple product is

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c=
\begin{vmatrix}
a_{1} & a_{2} & a_{3}\\
b_{1} & b_{2} & b_{3}\\
c_{1} & c_{2} & c_{3}
\end{vmatrix}.
$$

Its absolute value is the volume of the parallelepiped with edges $\mathbf a,\mathbf b,\mathbf c$: $\mathbf a\times\mathbf b$ is normal to the base with base area as length, so dotting with $\mathbf c$ gives area times height.

Take

$$
\mathbf a=(1,2,2),\quad \mathbf b=(2,-1,0),\quad \mathbf c=(1,0,1).
$$

Then

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c=2\cdot1+4\cdot0+(-5)\cdot1=-3,
$$

so the volume is $3$ and the vectors are not coplanar. Key properties:

- **Cyclic invariance**: $(\mathbf a\times\mathbf b)\cdot\mathbf c=(\mathbf b\times\mathbf c)\cdot\mathbf a=(\mathbf c\times\mathbf a)\cdot\mathbf b$;
- **Sign change on swap**: exchanging any two vectors flips the sign;
- **Coplanarity criterion**: $(\mathbf a\times\mathbf b)\cdot\mathbf c=0$ exactly when the three vectors are coplanar (or one is zero).

Four points $A,B,C,D$ obey the same test,

$$
\overrightarrow{AB}\cdot\left(\overrightarrow{AC}\times\overrightarrow{AD}\right)=0,
$$

which in coordinates is a $3\times3$ determinant equal to zero.

## Worked example two: four coplanar points

Decide whether

$$
A(1,0,0),\quad B(0,1,0),\quad C(0,0,1),\quad D(1,1,1)
$$

are coplanar. The edge vectors are

$$
\overrightarrow{AB}=(-1,1,0),\quad
\overrightarrow{AC}=(-1,0,1),\quad
\overrightarrow{AD}=(0,1,1),
$$

and

$$
\overrightarrow{AB}\cdot\left(\overrightarrow{AC}\times\overrightarrow{AD}\right)
=
\begin{vmatrix}
-1 & 1 & 0\\
-1 & 0 & 1\\
0 & 1 & 1
\end{vmatrix}
=-1\begin{vmatrix}0&1\\1&1\end{vmatrix}
-1\begin{vmatrix}-1&1\\0&1\end{vmatrix}
+0,
$$

which equals $-1(0-1)-1(-1-0)=1+1=2$, nonzero, so the points are not coplanar.

The plane equation agrees: the plane through $A,B,C$ is

$$
x+y+z=1,
$$

while the coordinates of $D$ sum to $3$. Replace $D$ by $(1,1,-1)$, whose coordinates sum to $1$; now

$$
\overrightarrow{AD}=(0,1,-1),
\qquad
\begin{vmatrix}
-1 & 1 & 0\\
-1 & 0 & 1\\
0 & 1 & -1
\end{vmatrix}
=-1(0-1)-1(1-0)=1-1=0,
$$

"The triple product vanishes" and "the fourth point satisfies the plane equation" describe one fact.

## Algebra rules and standard identities

| Operation | Result | Commutative? | Geometry | Vanishing means |
| --- | --- | --- | --- | --- |
| $\mathbf a\cdot\mathbf b$ | number | yes | projection and angle | perpendicular (nonzero case) |
| $\mathbf a\times\mathbf b$ | vector | no, anticommutative | normal, length is area | parallel |
| $(\mathbf a\times\mathbf b)\cdot\mathbf c$ | number | cyclic only, sign flips on swap | parallelepiped volume | coplanar |

**Lagrange's identity.**

$$
|\mathbf a\times\mathbf b|^{2}+(\mathbf a\cdot\mathbf b)^{2}=|\mathbf a|^{2}|\mathbf b|^{2}
$$

It combines the perpendicular and parallel components into one product of squared lengths.

**The vector triple product.**

$$
\mathbf a\times(\mathbf b\times\mathbf c)
=\mathbf b(\mathbf a\cdot\mathbf c)-\mathbf c(\mathbf a\cdot\mathbf b)
$$

The BAC–CAB rule: a combination of $\mathbf b$ and $\mathbf c$ with the dot products as coefficients; it is generally nonzero, so the cross product is not associative.

**Cyclic invariance of the triple product.**

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c
=(\mathbf b\times\mathbf c)\cdot\mathbf a
=(\mathbf c\times\mathbf a)\cdot\mathbf b
$$

A cyclic order keeps the sign, a swap flips it, exactly as for determinants.

## Edge cases and degeneracies

**Zero vector.** No direction, no angle: $\mathbf 0\cdot\mathbf a=0$ does not make it perpendicular, and $\mathbf 0\times\mathbf a=\mathbf 0$ says nothing beyond "parallel"; tests must first confirm nonzero vectors.

**Parallel and antiparallel.** Here $\sin\theta=0$ and the cross product vanishes; the dot product is $\pm|\mathbf a||\mathbf b|$, which separates the cases but gives no direction.

**Degenerate triangle.** Collinear points give parallel edges and area $0$: the triangle has collapsed, the formula has not failed.

**Handedness.** The determinant formula assumes a right-handed system; reverse one axis and its direction disagrees with the right-hand rule.

**The two-dimensional case.** In $z=0$, with $\mathbf a=(a_1,a_2,0)$ and $\mathbf b=(b_1,b_2,0)$, only the $z$ component survives:

$$
\mathbf a\times\mathbf b=(0,0,a_1b_2-a_2b_1).
$$

Its length is a planar area and its sign records orientation.

## Four misconceptions

> [!MYTH] A zero dot product means one of the vectors is zero.
> Nonzero perpendicular vectors also give zero: "perpendicular" or "one factor is zero".

> [!MYTH] The cross product is commutative.
> $\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a$. Reversing the order above gives $(-2,-4,5)$, the opposite direction.

> [!MYTH] The triple product is a vector, so it can be dotted with another vector.
> $(\mathbf a\times\mathbf b)\cdot\mathbf c$ is already a number. The expression $\mathbf a\times(\mathbf b\times\mathbf c)$ is a different vector, generally unequal.

> [!MYTH] The length of the cross product is the product of the two lengths.
> Only for perpendicular vectors. In general $|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$, zero for parallel vectors.

## Practice

> [!PRACTICE] 1 · Angle
> Find the angle between $\mathbf a=(1,0,1)$ and $\mathbf b=(0,1,1)$.
>
> > [!ANSWER] Show answer
> > $\mathbf a\cdot\mathbf b=1$ and $|\mathbf a|=|\mathbf b|=\sqrt2$, so $\cos\theta=\dfrac12$ and $\theta=\dfrac{\pi}{3}$.

> [!PRACTICE] 2 · Unit normal
> Find a unit vector perpendicular to both $(1,1,0)$ and $(0,1,1)$.
>
> > [!ANSWER] Show answer
> > The cross product is $(1\cdot1-0\cdot1,\ 0\cdot0-1\cdot1,\ 1\cdot1-1\cdot0)=(1,-1,1)$ with length $\sqrt3$, so the unit vectors are $\pm\dfrac{1}{\sqrt3}(1,-1,1)$.

> [!PRACTICE] 3 · Coplanar?
> Are $(1,0,0)$, $(0,1,0)$, and $(1,1,0)$ coplanar?
>
> > [!ANSWER] Show answer
> > The third row is the sum of the first two, so the determinant is $0$; the vectors are coplanar, all lying in $z=0$.

> [!PRACTICE] 4 · Perpendicularity condition
> Find $\lambda$ so that $\mathbf a=(1,\lambda,2)$ and $\mathbf b=(2,1,-1)$ are perpendicular.
>
> > [!ANSWER] Show answer
> > Set $\mathbf a\cdot\mathbf b=2+\lambda-2=0$, which gives $\lambda=0$.

> [!PRACTICE] 5 · Volume
> Find the volume of the parallelepiped with edges $\mathbf a=(1,2,2)$, $\mathbf b=(2,-1,0)$, and $\mathbf c=(1,0,1)$.
>
> > [!ANSWER] Show answer
> > $\mathbf a\times\mathbf b=(2,4,-5)$, whose dot product with $\mathbf c$ is $2-5=-3$; the volume is $|-3|=3$.

> [!PRACTICE] 6 · Triangle area
> Find the area of the triangle with vertices $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.
>
> > [!ANSWER] Show answer
> > $\overrightarrow{AB}=(-1,1,0)$ and $\overrightarrow{AC}=(-1,0,1)$, whose cross product is $(1,1,1)$ with length $\sqrt3$; the area is $\dfrac{\sqrt3}{2}$.

## Formal statement

Let $\mathbf a,\mathbf b,\mathbf c\in\mathbb{R}^{3}$. The dot product is

$$
\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3,
$$

a symmetric bilinear form with $\mathbf a\cdot\mathbf a=|\mathbf a|^{2}$ and $\mathbf a\cdot\mathbf b=|\mathbf a||\mathbf b|\cos\theta$; nonzero vectors are perpendicular exactly when it vanishes.

The cross product is defined by the determinant above, is anticommutative and distributive, satisfies

$$
\mathbf a\cdot(\mathbf a\times\mathbf b)=\mathbf b\cdot(\mathbf a\times\mathbf b)=0,
$$

and has length

$$
|\mathbf a\times\mathbf b|^{2}=|\mathbf a|^{2}|\mathbf b|^{2}-(\mathbf a\cdot\mathbf b)^{2},
$$

the area of the spanned parallelogram, with direction from the right-hand rule.

The triple product

$$
(\mathbf a\times\mathbf b)\cdot\mathbf c
$$

equals the determinant with the three vectors as rows; it is invariant under cyclic permutation and changes sign when two vectors are swapped. Its absolute value is the parallelepiped volume, and it vanishes exactly when the vectors are coplanar — for nonzero vectors, when they are linearly dependent.

## How this lecture connects

- **The next lecture** applies them to planes and lines: a plane normal from a cross product, a line direction from two normals, a point-to-plane distance from a projection.
- **Linear algebra**: the triple product is a third-order determinant and the cross product a determinant expansion; sign changes and vanishing for dependent rows get their first geometric reading here.
- **Multivariable calculus**: surface normals, tangent planes, area elements, and flux all use the cross product.
- **Physics**: work is a dot product, torque and angular momentum are cross products, and the $\mathbf v\times\mathbf B$ of the Lorentz force is one too.
- **Numerics and graphics**: normals, triangle orientation, and back-face culling are direct applications; the length gives area, the sign gives orientation.
