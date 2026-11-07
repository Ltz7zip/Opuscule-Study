---
slug: "transform-matrix"
subject: "la"
unit: "u06"
order: 5
mode: "mastery"
lang: "en"
kicker: "Lecture 5 · Linear Algebra · Mastery"
title: "Matrix of a linear transformation"
subtitle: "One transformation, one matrix"
minutes: 16
meta: ["16 min read","Requires linear maps and matrices","Mastery level"]
concepts: ["lintransform", "matrix"]
prereq: ["linmap", "matrix"]
related: ["coordchange", "similar"]
---

## Goal

Lecture 4 defined a linear map as one preserving addition and scaling, but left it without a computational body. This lecture supplies one. Fix a basis and the map becomes a matrix; composition becomes matrix multiplication; changing the basis turns the matrix into a similar one.

By the end you can write the matrix of a map in a given basis, explain why composition corresponds to multiplication, distinguish rank from kernel, and see why similar matrices describe the same map.

## Three-line recap

- A linear map preserves operations: $T(u+v) = Tu + Tv$ and $T(ku) = kTu$.
- A linear map is completely determined by its values on a basis.
- Matrices of one map in different bases are similar.

## The problem

Let $T$ be a linear map of the plane that sends $(1,0)$ to $(2,1)$ and $(0,1)$ to $(1,-3)$. Where does it send an arbitrary $(x,y)$?

Linearity gives $(x,y) = x(1,0) + y(0,1)$, so $T(x,y) = x(2,1) + y(1,-3) = (2x+y, x-3y)$. Knowing where the basis vectors go determines everything. Stack those images as columns and you have the matrix.

But what if the basis is not the standard one? How is the matrix written then, and does the same matrix survive a change of basis?

## Intuition

Let $T: V \to V$ be linear and $B = (b_1, \dots, b_n)$ a basis. Expand each image $Tb_j$ in $B$:

$$
Tb_j = a_{1j}b_1 + a_{2j}b_2 + \cdots + a_{nj}b_n
$$

Collect the coefficients column by column into $A = (a_{ij})$. This is the matrix of $T$ in the basis $B$. Its $j$-th column is the coordinate vector of $Tb_j$. For any $v = (b_1,\dots,b_n)x$,

$$
Tv = (b_1,\dots,b_n) A x
$$

In coordinates, the map acts by left multiplication: $[Tv]_B = A[v]_B$. The matrix is not the map itself; it is a photograph of the map taken from the basis $B$.

Why does composition become multiplication? Suppose $S$ has matrix $B$ and $T$ has matrix $A$. Applying $S$ then $T$ gives

$$
x \xrightarrow{B} Bx \xrightarrow{A} A(Bx) = (AB)x
$$

so $T \circ S$ has matrix $AB$. Order matters, because matrix multiplication does not commute and composition itself is order-sensitive.

Under a change of basis with transition matrix $P$, the new matrix is

$$
A' = P^{-1} A P
$$

matching lecture 3. Matrices related this way are called similar. Similar matrices share determinant, rank, and trace, because they describe one map viewed from different angles.

The kernel of $T$ is the set of vectors sent to zero, $\ker T = \{v : Tv = 0\}$; the image is the set of outputs, $\operatorname{im} T = \{Tv\}$. The dimension of the kernel is the nullity, the dimension of the image is the rank. In matrix terms these are $n - r(A)$ and $r(A)$, and

$$
\dim \ker T + \dim \operatorname{im} T = \dim V
$$

> [!NOTE]
> When writing a transformation matrix, use the same basis on domain and codomain so that columns are image coordinates. Different bases on the two sides produce a different kind of matrix and a modified formula.

## Worked by hand

Let $T(x,y) = (2x + y, x - 3y)$ and take the basis

$$
b_1 = (1,1), \qquad b_2 = (1,-1)
$$

Compute the images:

$$
Tb_1 = (2 \cdot 1 + 1, 1 - 3 \cdot 1) = (3, -2)
$$

$$
Tb_2 = (2 \cdot 1 - 1, 1 - 3 \cdot (-1)) = (1, 4)
$$

Express them in $b_1, b_2$. For $Tb_1 = \alpha b_1 + \beta b_2$,

$$
\alpha + \beta = 3, \qquad \alpha - \beta = -2
$$

Adding gives $2\alpha = 1$, so $\alpha = \tfrac12$; subtracting gives $2\beta = 5$, so $\beta = \tfrac52$. The coordinates of $Tb_1$ are $(\tfrac12, \tfrac52)$.

For $Tb_2 = \gamma b_1 + \delta b_2$,

$$
\gamma + \delta = 1, \qquad \gamma - \delta = 4
$$

so $\gamma = \tfrac52$ and $\delta = -\tfrac32$. Stack the columns:

$$
A' = \begin{pmatrix}
\tfrac12 & \tfrac52 \\[2pt]
\tfrac52 & -\tfrac32
\end{pmatrix}
$$

Confirm with similarity. In the standard basis $A = \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix}$, the transition matrix is $P = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$, whose inverse is $P^{-1} = \tfrac12 \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$. Then

$$
AP = \begin{pmatrix} 2 & 1 \\ 1 & -3 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} = \begin{pmatrix} 3 & 1 \\ -2 & 4 \end{pmatrix}
$$

$$
P^{-1}AP = \frac12 \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} 3 & 1 \\ -2 & 4 \end{pmatrix} = \frac12 \begin{pmatrix} 1 & 5 \\ 5 & -3 \end{pmatrix}
$$

exactly $A'$.

Finally, rank and kernel. Since $\det A = 2 \cdot (-3) - 1 \cdot 1 = -7 \neq 0$, $A$ is invertible and $r(A) = 2$. Thus $\ker T = \{(0,0)\}$, nullity $0$, and the image is the whole plane. Contrast $T(x,y) = (x+y, 2x+2y)$: its determinant is $0$, its kernel is the line $x + y = 0$, nullity $1$, rank $1$, and its image is a line.

## Three misconceptions

> [!MYTH] A linear map has a unique matrix.
> Not without a basis. Fixing a basis makes it unique; changing the basis gives $P^{-1}AP$, generally different but describing the same map.

> [!MYTH] Different bases always produce different matrices.
> They can coincide. A scalar matrix $cI$ commutes with every invertible $P$, so its matrix is unchanged in every basis.

> [!MYTH] The rank of a linear map equals the number of entries in its matrix.
> Rank is the dimension of the image, namely the rank of the matrix. It cannot exceed the domain dimension $n$ and has nothing to do with the $mn$ entries.

## Practice

> [!PRACTICE] 1 · Matrix in the standard basis
> For $T(x,y) = (3x - y, 2y)$, write the matrix in the standard basis.
>
> > [!ANSWER] Answer
> > $T(1,0) = (3,0)$ and $T(0,1) = (-1,2)$, so $A = \begin{pmatrix} 3 & -1 \\ 0 & 2 \end{pmatrix}$.

> [!PRACTICE] 2 · Composition order
> $S$ has matrix $B$ and $T$ has matrix $A$. What is the matrix of applying $T$ first, then $S$?
>
> > [!ANSWER] Answer
> > That is $S \circ T$, with $x \mapsto Ax \mapsto B(Ax) = (BA)x$, so the matrix is $BA$.

> [!PRACTICE] 3 · Kernel and rank
> For $T(x,y,z) = (x-y, y-z, x-z)$, find the nullity and the rank.
>
> > [!ANSWER] Answer
> > The third row of the matrix is the sum of the first two, so the rank is $2$. The domain has dimension $3$, so the nullity is $1$. The kernel is $x = y = z$, with basis $(1,1,1)$.

## Formal statement

> [!FORMAL] Formal statement
> Let $T: V \to V$ be linear, $B = (b_1, \dots, b_n)$ a basis, and $Tb_j = \sum_i a_{ij}b_i$. Then $A = (a_{ij})$ is the matrix of $T$ in $B$, and $[Tv]_B = A[v]_B$. If $S$ has matrix $B$, then $T \circ S$ has matrix $AB$. After a change of basis $P$, the matrix becomes $A' = P^{-1}AP$. The kernel and image satisfy $\dim\ker T + \dim\operatorname{im}T = \dim V$, with $\dim\operatorname{im}T = r(A)$.
