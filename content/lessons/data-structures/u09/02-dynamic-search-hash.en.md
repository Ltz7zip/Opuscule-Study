---
slug: "dynamic-search-hash"
subject: "data-structures"
unit: "u09"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 9 · Data Structures · Mastery"
title: "Dynamic Search Tables and Hash Tables"
subtitle: "From comparisons in a tree to an address computed directly"
minutes: 17
meta: ["17 min read","Requires static search","Mastery level"]
concepts: ["search","tree","binarytree"]
prereq: ["search"]
related: ["tree","binarytree"]
---

## What you will get

You will be able to insert into a binary search tree and compute its ASL, explain why one AVL insertion needs at most one rotation, follow a split in an order-3 B-tree, and build a hash table for a given key sequence with its load factor and average search length.

## Three lines back

- A dynamic search table supports insertion while searching; the structure changes with the key set.
- A binary search tree encodes comparisons in its shape, and the shape decides efficiency.
- A hash table maps a key directly to an address, and collision handling decides the worst case.

## Binary search trees and AVL trees

A **binary search tree** (BST) satisfies: every key in the left subtree is smaller than the root, every key in the right subtree is larger, and both subtrees are BSTs. Search starts at the root and moves left or right:

```c
BSTree SearchBST(BSTree T, KeyType key) {
    while (T && key != T->data.key)
        T = (key < T->data.key) ? T->lchild : T->rchild;
    return T;
}
```

Inserting 45, 24, 53, 12, 37, 60 gives root 45 with children 24 and 53; 24 has children 12 and 37, and 53 has right child 60. The comparison counts are 1, 2, 2, 3, 3, 3, so

$$
\mathrm{ASL}=\frac{1+2+2+3+3+3}{6}=\frac{14}{6}\approx2.33
$$

Inserting the same keys in ascending order 12, 24, 37, 45, 53, 60 degenerates into a chain, and the ASL becomes $(1+2+3+4+5+6)/6=3.5$, with search degrading to $O(n)$.

An **AVL tree** requires every node's left and right subtree heights to differ by at most 1. When an insertion breaks the balance, only the smallest unbalanced subtree is repaired: type LL takes one right rotation, RR one left rotation, LR a left rotation followed by a right rotation, and RL the mirror image.

Insert 16, 3, 7: 16 is the root, 3 its left child, and 7 becomes the right child of 3. Node 16 now has balance factor 2, an LR case. Rotate left at 3 to lift 7, then rotate right at 16; 7 becomes the root with 3 and 16 as children. One insertion needs at most one rotation, single or double, costing $O(1)$, and search stays $O(\log n)$.

## Basic B-tree operations

A **B-tree** is a multiway balanced search tree. An order-$m$ B-tree allows at most $m$ children and $m-1$ keys per node; every non-root node has at least $\lceil m/2\rceil$ children; all leaves lie on the same level.

Insert 1 through 7 into an order-3 B-tree (at most 2 keys per node):

| Insert | Action | Result |
| --- | --- | --- |
| 1, 2 | Fill the root | [1, 2] |
| 3 | Root overflows, middle key 2 rises | Root [2], leaves [1], [3] |
| 4 | Insert into the right leaf | Root [2], leaves [1], [3, 4] |
| 5 | Right leaf overflows, 4 rises | Root [2, 4], leaves [1], [3], [5] |
| 6 | Insert into the right leaf | Root [2, 4], leaves [1], [3], [5, 6] |
| 7 | Right leaf overflows, 6 rises | Root [2, 4, 6], leaves [1], [3], [5], [7] |

A split always promotes the middle key to the parent; if the parent overflows too, the split propagates upward, and splitting the root increases the height by one. Search, insertion, and deletion visit $O(\log_m n)$ nodes, which suits block devices such as disks.

## Hash tables and collision handling

A **hash function** maps a key to an address: $H(key)=key\bmod p$, where $p$ is usually the largest prime below the table size. Two keys landing at the same address **collide**. The **load factor** is

$$
\alpha=\frac{n}{m}
$$

where $n$ records occupy a table of size $m$. Take $m=11$ and $H(k)=k\bmod 11$, inserting 22, 41, 53, 46, 30, 13, 1, 67 with linear probing:

| Key | 22 | 41 | 53 | 46 | 30 | 13 | 1 | 67 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Address | 0 | 8 | 9 | 2 | 10 | 3 | 1 | 4 |
| Probes | 1 | 1 | 1 | 1 | 3 | 2 | 1 | 4 |

The final table is

| Address | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Key | 22 | 1 | 46 | 13 | 67 | — | — | — | 41 | 53 | 30 |

The load factor is $\alpha=8/11\approx0.727$. The successful average is

$$
\mathrm{ASL}_{\text{succ}}=\frac{1+1+1+1+3+2+1+4}{8}=\frac{14}{8}=1.75
$$

On failure, each address probes forward to the first empty slot; the 11 addresses need 47 probes in total, so $\mathrm{ASL}_{\text{fail}}=47/11\approx4.27$. Separate chaining gives about $1+\alpha/2\approx1.36$ successful probes and about $\alpha\approx0.73$ unsuccessful ones, and it degrades gracefully as $\alpha$ approaches 1.

## Three common misconceptions

> [!MYTH] BST search is always $O(\log n)$.
> Only when the tree is balanced. Ascending insertions produce a chain and the worst case is $O(n)$, which is exactly why AVL and red-black trees exist.

> [!MYTH] An AVL insertion may trigger several rotations.
> At most one repair of the smallest unbalanced subtree is needed: a single rotation for LL or RR, a double rotation for LR or RL.

> [!MYTH] Hash lookup is always $O(1)$.
> That holds on average and at a low load factor. Heavy collisions create long linear-probing clusters and the worst case degrades to $O(n)$.

## Practice

> [!PRACTICE] 1 · Failure ASL
> For the six-node BST above, what is the average unsuccessful search cost, counting external nodes?
>
> > [!ANSWER] Show answer
> > The 7 null pointers cost 2 for the left null of 53 and 3 for each of the six nulls under 12, 37, and 60. Failure ASL $=(2+3\times6)/7=20/7\approx2.86$.

> [!PRACTICE] 2 · Load factor
> A table of size 13 holds 10 records. What is $\alpha$, and how many more fit while keeping $\alpha\le0.9$?
>
> > [!ANSWER] Show answer
> > $\alpha=10/13\approx0.769$. The bound allows $n\le11.7$, so one more record fits; a twelfth gives $\alpha=12/13\approx0.923$.

> [!PRACTICE] 3 · Count keys
> In an order-5 B-tree, what are the minimum and maximum key counts of a non-root node?
>
> > [!ANSWER] Show answer
> > Maximum $m-1=4$. Minimum $\lceil m/2\rceil-1=\lceil2.5\rceil-1=2$.

## Formal statement

An inorder walk of a BST lists its keys in increasing order. Search, insertion, and deletion all cost the height $h$, which is $O(\log n)$ in expectation for random insertions and $n-1$ in the worst case. An AVL tree keeps every balance factor within $[-1,1]$; with $n$ nodes its height satisfies $h<1.44\log_2(n+2)$, so search is $O(\log n)$.

An order-$m$ B-tree keeps every node's key count in $[\lceil m/2\rceil-1,\,m-1]$ except the root, and all leaves on one level, so its height is $O(\log_m n)$. A hash table's average search length depends only on the load factor $\alpha$: linear probing succeeds in about $\frac12(1+\frac{1}{1-\alpha})$ probes, while separate chaining succeeds in about $1+\frac{\alpha}{2}$, both increasing with $\alpha$.