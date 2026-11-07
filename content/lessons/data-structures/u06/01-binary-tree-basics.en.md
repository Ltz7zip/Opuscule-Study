---
slug: "binary-tree-basics"
subject: "data-structures"
unit: "u06"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "Basic Properties of Binary Trees"
subtitle: "Five formulas that hold up a tree"
minutes: 17
meta: ["17 min read","Requires Linked Lists","Mastery level"]
concepts: ["tree", "binarytree"]
prereq: ["list"]
related: ["graphds", "stack"]
---

## What you will get

By the end of this lecture you can state the five basic properties of a binary tree from memory, derive $n_0=n_2+1$ on your own, compute the depth of a complete binary tree from its node count, and explain where sequential storage wastes space.

## Three lines back

- A binary tree gives each node at most two children, and left and right are ordered and not interchangeable.
- Level $i$ holds at most $2^{i-1}$ nodes; a tree of depth $h$ holds at most $2^{h}-1$.
- Every non-empty binary tree satisfies $n_0=n_2+1$: leaves outnumber two-child nodes by one.

## The five basic properties

| No. | Property | Condition |
| --- | --- | --- |
| 1 | Level $i$ holds at most $2^{i-1}$ nodes | $i\ge1$ |
| 2 | Depth $h$ gives at most $2^{h}-1$ nodes | $h\ge1$ |
| 3 | $n_0=n_2+1$ | non-empty binary tree |
| 4 | A complete tree of $n$ nodes has depth $\lfloor\log_2 n\rfloor+1$ | $n\ge1$ |
| 5 | Node $i$ has children $2i$ and $2i+1$, parent $\lfloor i/2\rfloor$ | complete tree |

Property 1 follows by induction. Level 1 is the root alone, $2^{0}=1$; if level $i$ holds at most $2^{i-1}$ nodes and each has at most two children, level $i+1$ holds at most $2^{i}$. Property 2 sums that geometric series: $\sum_{i=1}^{h}2^{i-1}=2^{h}-1$.

For property 4, the first $h-1$ levels are full and contribute $2^{h-1}-1$ nodes, while level $h$ contributes at least one, so

$$
2^{h-1}-1 < n\le 2^{h}-1
$$

Taking logarithms pins $h$ between $\log_2 n$ and $\log_2 n+1$, giving $h=\lfloor\log_2 n\rfloor+1$. At $n=1000$: $\log_2 1000\approx9.97$, so the depth is $\lfloor9.97\rfloor+1=10$.

## Deriving n0 = n2 + 1

Let $n_0$, $n_1$, $n_2$ count nodes with 0, 1, and 2 children. The total is

$$
n=n_0+n_1+n_2
$$

Now count edges. Every node except the root has exactly one edge to its parent, so there are $n-1$ edges. Counting from the other side, each one-child node emits one edge and each two-child node emits two, so the same total is $n_1+2n_2$. Equating them:

$$
n_0+n_1+n_2-1=n_1+2n_2
$$

Cancelling $n_1$ leaves $n_0=n_2+1$. Nothing about the tree's shape entered the argument, so the identity holds for every binary tree.

Check it on a concrete tree: root $A$ has children $B$ and $C$, and $B$ has left child $D$. Then $n_0=2$ (nodes $C$ and $D$), $n_1=1$ ($B$), $n_2=1$ ($A$), and indeed $2=1+1$ with $n=4$.

A useful corollary follows: $n=2n_2+n_1+1$, so the total is odd plus $n_1$; when $n_1=0$ the node count is odd.

## Sequential storage and binary linked lists

Sequential storage numbers nodes as in a complete binary tree and places them in an array indexed from 1. Node $i$ lives at `a[i]`, and property 5 gives parent and children with no pointers at all:

```c
#define MAXN 100
typedef struct {
    int data[MAXN];
    int n;
} SqBiTree;
```

For a complete binary tree this is optimal: full utilisation and $O(1)$ navigation. For a general binary tree, missing positions must be left empty. A degenerate tree of depth $h$ has only $h$ nodes but demands $2^{h}-1$ array cells, an exponential waste, so sequential storage is reserved for complete trees.

A binary linked list gives each node two pointers:

```c
typedef struct BiTNode {
    int data;
    struct BiTNode *lchild, *rchild;
} BiTNode, *BiTree;
```

With $n$ nodes there are $2n$ pointer fields. Of these, $n-1$ are used as edges, leaving

$$
2n-(n-1)=n+1
$$

empty. Those empties are an opportunity rather than a flaw: threaded binary trees reuse them as traversal threads, enabling in-order traversal without a stack.

| Storage | Space | Find child | Find parent | Suitable for |
| --- | --- | --- | --- | --- |
| Sequential | $2^{h}-1$ | $O(1)$ | $O(1)$ | complete trees |
| Binary linked list | $3n$ (data plus two pointers) | $O(1)$ | $O(n)$ | general trees |

> [!NOTE]
> A binary tree is not a tree in which every node has degree 2. Binary nodes may have 0, 1, or 2 children, and left and right are ordered. A "degree-2 tree" requires every node to have exactly two children or none, a strictly narrower notion that property 3 covers only as a special case.

## Three misconceptions

> [!MYTH] A binary tree means every node has two children.
> It only requires at most two, allows exactly one, and insists that the single child be identified as left or right.

> [!MYTH] Swapping left and right children yields the same binary tree.
> It yields a different one. Order is part of the definition, which is a key difference from an ordinary tree.

> [!MYTH] Sequential storage always saves space over linked storage.
> Only for complete trees. General trees leave gaps, wasting up to $2^{h}-1-n$ cells, and a degenerate tree wastes nearly everything.

## Practice

> [!PRACTICE] 1 · Count leaves
> A binary tree has 8 nodes of degree 2. How many leaves? If it also has 3 one-child nodes, what is the total?
>
> > [!ANSWER] Show answer
> > $n_0=n_2+1=9$. The total is $9+3+8=20$.

> [!PRACTICE] 2 · Find the depth
> What is the depth of a complete binary tree with 500 nodes? How many nodes fit on level 6 at most?
>
> > [!ANSWER] Show answer
> > $\lfloor\log_2 500\rfloor+1=8+1=9$. Level 6 holds at most $2^{5}=32$ nodes.

> [!PRACTICE] 3 · Count null pointers
> A binary linked list has 12 nodes. How many null pointer fields?
>
> > [!ANSWER] Show answer
> > $n+1=13$.

## Formal statement

A binary tree is a finite set of $n\ge0$ nodes that is either empty or consists of a root together with two disjoint binary trees called its left and right subtrees, whose order is fixed and not interchangeable. Its basic properties are: level $i$ contains at most $2^{i-1}$ nodes; a tree of depth $h$ contains at most $2^{h}-1$ nodes; in every non-empty binary tree the number of leaves $n_0$ and the number of two-child nodes $n_2$ satisfy $n_0=n_2+1$; a complete binary tree with $n$ nodes has depth $\lfloor\log_2 n\rfloor+1$; and in a complete tree the node numbered $i$ has left child $2i$, right child $2i+1$, and parent $\lfloor i/2\rfloor$. Sequential storage follows complete-tree numbering and suits only complete trees, while a binary linked list uses left and right child pointers and leaves exactly $n+1$ null pointer fields among its $2n$.