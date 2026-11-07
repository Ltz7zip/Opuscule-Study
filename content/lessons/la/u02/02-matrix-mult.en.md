---
slug: "matrix-mult"
subject: "la"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Linear Algebra · Mastery"
title: "Matrix Multiplication"
subtitle: "The moment rows meet columns"
minutes: 16
meta: ["16 min read","Needs elementary maths","Mastery level"]
concepts: ["matrix", "la"]
prereq: ["elem"]
related: ["la", "matrix", "backprop"]
---

## What you will get

By the end of this lecture you can decide whether two matrices can be multiplied, multiply small ones by hand, and explain why every forward and backward pass in deep learning is the same operation.

Three things only: define the product as a sum of products, turn the shape rule into a reflex, and build the reading of multiplication as a combination of columns.

## Three lines back

- A matrix is not a table of numbers; it is a linear map that carries one vector to another.
- Matrix multiplication means "apply one map, then another".
- That is why products do not commute, and why not every pair of shapes can be multiplied.

## How one entry is computed

Let $A$ be $m \times n$ and $B$ be $n \times p$. Their product $C = AB$ is $m \times p$. Entry $(i, j)$ of $C$ comes from row $i$ of $A$ and column $j$ of $B$, multiplied term by term and summed:

$$
c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}
$$

Expanded at $n = 3$, this is the hand computation you have seen before:

$$
c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + a_{i3}b_{3j}
$$

Two things matter. First, the index $k$ walks across the columns of the left matrix and down the rows of the right one, so those two lengths must match; that is the entire origin of the shape rule. Second, $c_{ij}$ depends only on row $i$ of $A$ and column $j$ of $B$. Rows do not talk to rows, so the work splits into many independent small tasks.

## Shapes and cost

One condition only: **the left matrix's column count equals the right matrix's row count**. Written as $(m \times n)(n \times p) = m \times p$, the inner $n$ has to agree, and only the outer $m$ and $p$ survive.

| Left | Right | Allowed | Result |
| --- | --- | --- | --- |
| $2 \times 3$ | $3 \times 4$ | Yes | $2 \times 4$ |
| $3 \times 2$ | $3 \times 4$ | No | — |
| $3 \times 2$ | $2 \times 3$ | Yes | $3 \times 3$ |
| $1 \times n$ | $n \times 1$ | Yes | $1 \times 1$ (a number) |

The last row deserves its own memory slot: a row vector times a column vector is a **dot product**. And $A$ times a column vector $x$ is just a dot product between $x$ and each row of $A$.

Know the cost as well. Producing $m \times p$ entries, each needing $n$ multiplications, costs $mnp$ multiplications. Two $1000 \times 1000$ matrices need $10^9$ of them, which is why matrix libraries tile the work, run it in parallel, and reach for Strassen-style algorithms to reduce the order.

## A product is a combination of columns

Split $B$ into columns $b_1, b_2, \dots, b_p$. Then column $j$ of $AB$ is exactly $A b_j$:

$$
A B = A\,[\,b_1 \; b_2 \; \cdots \; b_p\,] = [\,A b_1 \; A b_2 \; \cdots \; A b_p\,]
$$

At a more basic level, $Ax$ is a weighted sum of the columns of $A$, weighted by the entries of $x$:

$$
A x = x_1 \begin{bmatrix} a_{11} \\ a_{21} \\ \vdots \\ a_{m1} \end{bmatrix} + x_2 \begin{bmatrix} a_{12} \\ a_{22} \\ \vdots \\ a_{m2} \end{bmatrix} + \cdots + x_n \begin{bmatrix} a_{1n} \\ a_{2n} \\ \vdots \\ a_{mn} \end{bmatrix}
$$

That single line carries the meaning of the operation: the columns of $A$ are directions in stock, $x$ says how much of each, and $Ax$ is the resulting mix. It also tells you immediately that $Ax$ always lands inside the span of the columns of $A$, no matter how large $A$ is.

The same view explains the algebra. $(AB)C$ and $A(BC)$ both describe "do three maps in a row", only with different brackets, hence associativity. $AB$ and $BA$ describe different orders of maps, hence no commutativity in general.

## Identity, transpose, inverse

The identity $I_n$ has $1$ on the diagonal and $0$ elsewhere; it is the map that does nothing:

$$
I_n A = A, \qquad A I_n = A, \qquad I_n x = x
$$

The transpose swaps rows and columns. On a product it acts in **reverse order**, a fact used daily in backpropagation:

$$
(AB)^{\mathsf{T}} = B^{\mathsf{T}} A^{\mathsf{T}}
$$

The inverse $A^{-1}$ satisfies $A^{-1}A = AA^{-1} = I$ and undoes the map. It is not a universal key: only square matrices can have one, and many square matrices do not. A map that collapses two different vectors onto the same output cannot be undone; there you use a pseudo-inverse or a least-squares solution instead.

## Why backprop is all matrix products

One neural layer reads

$$
y = W x + b, \qquad L = \ell(y)
$$

with $W$ of shape $d_{\text{out}} \times d_{\text{in}}$. Backpropagation wants the gradient of the loss with respect to $W$. By the chain rule, that gradient is a matrix shaped like $W$, whose $(i, j)$ entry is $\delta_i x_j$ with $\delta = \partial L / \partial y$:

$$
\frac{\partial L}{\partial W} = \delta\, x^{\mathsf{T}}, \qquad \frac{\partial L}{\partial b} = \delta
$$

One outer product gives the whole update direction. For a batch, stack the inputs into $X \in \mathbb{R}^{n \times d_{\text{in}}}$; the forward pass is a single product of shape $(n \times d_{\text{in}})(d_{\text{in}} \times d_{\text{out}})$, and the backward pass is another product against a transpose. "Automatic differentiation" in a framework is, at matrix level, this lecture's sum from section 3 applied again and again, plus transposes.

> [!MYTH] Which side when shapes fail?
> Check the order first. If $W$ is $d_{\text{out}} \times d_{\text{in}}$, then $x^{\mathsf{T}}$ must sit on the right and $\delta$ on the left for the result to come back as $d_{\text{out}} \times d_{\text{in}}$.

## Four common mistakes

> [!MYTH] $AB$ always equals $BA$.
> Usually false, and often one of them is not even defined. The shapes already say so.

> [!MYTH] Matrix multiplication is entry-by-entry.
> Entry-wise multiplication is the Hadamard product $A \odot B$, a different operation. Matrix multiplication is row times column, summed.

> [!MYTH] A matrix is just numbers.
> Numbers are a representation. Change the basis of the same map and the matrix changes; the map does not.

> [!MYTH] An inverse lets you divide freely.
> Only invertible square matrices have one, and computing it is usually slower and less stable than solving the system directly.

## Practice

> [!PRACTICE] 1 · Shapes
> $A$ is $4 \times 2$ and $B$ is $2 \times 5$. What are the shapes of $AB$ and $BA$, and which one does not exist?
>
> > [!ANSWER] Answer
> > $AB$ is $4 \times 5$; $BA$ would need $5 = 4$, so it does not exist.

> [!PRACTICE] 2 · One entry
> $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$. Compute entry $(2, 1)$ of $AB$.
>
> > [!ANSWER] Answer
> > $c_{21} = 3 \times 5 + 4 \times 7 = 43$.

> [!PRACTICE] 3 · Columns view
> With $A = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}$ and $x = \begin{bmatrix} 3 \\ 5 \end{bmatrix}$, how does $Ax$ combine the columns of $A$?
>
> > [!ANSWER] Answer
> > $Ax = 3 \begin{bmatrix} 1 \\ 0 \end{bmatrix} + 5 \begin{bmatrix} 0 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ 10 \end{bmatrix}$.

> [!PRACTICE] 4 · Gradient shape
> A layer has $W$ of shape $8 \times 3$, $\delta$ of shape $8 \times 1$, $x$ of shape $3 \times 1$. Write $\partial L / \partial W$ and its shape.
>
> > [!ANSWER] Answer
> > $\delta x^{\mathsf{T}}$: $(8 \times 1)(1 \times 3) = 8 \times 3$, the same shape as $W$.

> [!PRACTICE] 5 · Associativity
> Give a $2 \times 2$ example where $AB \neq BA$.
>
> > [!ANSWER] Answer
> > $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}$ gives $AB = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ and $BA = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$.

> [!FORMAL] Formal statement
> Matrix multiplication is composition of linear maps: if $T_A : \mathbb{R}^n \to \mathbb{R}^m$ and $T_B : \mathbb{R}^p \to \mathbb{R}^n$, then $T_A \circ T_B$ has matrix $AB$. Associativity follows from associativity of composition; distributivity follows from linearity. The compatibility condition is exactly the requirement that the middle space be the same on both sides.
