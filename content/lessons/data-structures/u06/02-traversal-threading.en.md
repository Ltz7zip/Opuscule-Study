---
slug: "traversal-threading"
subject: "data-structures"
unit: "u06"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "Traversal and Threaded Binary Trees"
subtitle: "Turning empty pointers into the next thread"
minutes: 18
meta: ["18 min read","Requires Basic Properties of Binary Trees","Mastery level"]
concepts: ["binarytree", "tree"]
prereq: ["binarytree", "stack"]
related: ["tree", "stack"]
---

## What you will get

By the end of this lecture you can write the three recursive traversals and produce their output, rebuild a binary tree uniquely from preorder plus inorder, and read inorder threading code well enough to say which node each empty pointer ends up pointing at.

## Three lines back

- Traversal visits every node exactly once; preorder, inorder, and postorder differ only in when the root is visited.
- Preorder plus inorder, or postorder plus inorder, determines a binary tree uniquely; preorder plus postorder does not.
- Threading rewrites empty pointers as predecessor and successor links so traversal needs no stack.

## Four traversals and their recursive code

Use the tree $A(B(D,E),C(F,G(H)))$: node $A$ has left child $B$ (with $D$ and $E$) and right child $C$ (with $F$ and $G$, where $G$ has only left child $H$).

```c
void PreOrder(BiTree T) {
    if (!T) return;
    visit(T);
    PreOrder(T->lchild);
    PreOrder(T->rchild);
}
```

Move `visit(T)` to one of the other two gaps and the other orders appear: between the recursive calls gives inorder, after both gives postorder. One line separates the three, yet the outputs share nothing.

| Traversal | When the root is visited | Sequence |
| --- | --- | --- |
| Preorder | on entering the subtree | A B D E C F G H |
| Inorder | after the left subtree | D B E A F C H G |
| Postorder | after both subtrees | D E B F H G C A |
| Level order | by level, left to right | A B C D E F G H |

By hand, hold three patterns: preorder is root-left-right, inorder is left-root-right, postorder is left-right-root. For inorder on this tree, finish the whole left subtree ($D,B,E$), visit $A$, then the right subtree, where $F$ comes first, then $C$, then $G$'s subtree — and since $G$ has only a left child, $H$ precedes $G$, giving $F,C,H,G$.

Level order uses a queue rather than recursion: enqueue the root, dequeue a node, visit it, enqueue its non-empty children, repeat until empty. It advances by distance from the root, which makes it the tool for tree width and completeness tests.

## Rebuilding a tree from traversal sequences

Given preorder and inorder, the reconstruction is unique. The first preorder character is the root; find it in the inorder sequence, and everything to its left belongs to the left subtree, everything to its right to the right subtree; split the preorder sequence by those two counts and recurse.

Verify on the running tree. Preorder $A|BDE|CFGH$, inorder $DBE|A|FCHG$.

- Root $A$; inorder splits into $DBE$ (3 nodes) and $FCHG$ (4 nodes).
- Left subtree has preorder $BDE$ and inorder $DBE$: root $B$, left $D$, right $E$, giving $B(D,E)$.
- Right subtree has preorder $CFGH$ and inorder $FCHG$: root $C$, left $F$, right $HG$.
- For $HG$ the preorder is $GH$ and the inorder is $HG$: root $G$, left $H$, right empty, giving $G(H)$.

Assembling the pieces returns $A(B(D,E),C(F,G(H)))$.

Why is preorder plus postorder insufficient? Both identify only the root, and neither says which side a lone child sits on. The trees $X(Y)$ and $X(\ ,Y)$ share preorder $XY$ and postorder $YX$ while being different trees. Inorder supplies the dividing line, so it is the indispensable partner.

| Known sequences | Unique reconstruction |
| --- | --- |
| preorder + inorder | yes |
| postorder + inorder | yes |
| level order + inorder | yes |
| preorder + postorder | no |

## Inorder threading

A binary linked list with $n$ nodes has $n+1$ null pointers. Threading repurposes them as predecessor and successor links, adding `ltag` and `rtag` to say whether a pointer is a child or a thread:

```c
typedef struct ThreadNode {
    int data;
    struct ThreadNode *lchild, *rchild;
    int ltag, rtag;      /* 1 means thread */
} ThreadNode, *ThreadTree;

void InThread(ThreadTree p, ThreadTree *pre) {
    if (!p) return;
    InThread(p->lchild, pre);
    if (!p->lchild) { p->lchild = *pre; p->ltag = 1; }
    if (*pre && !(*pre)->rchild) { (*pre)->rchild = p; (*pre)->rtag = 1; }
    *pre = p;
    InThread(p->rchild, pre);
}
```

`pre` always names the previously visited node, so a null left pointer is filled immediately with the predecessor, while a null right pointer waits until the next node is visited.

Thread the running tree in inorder. The inorder sequence is $D,B,E,A,F,C,H,G$, numbered 1 to 8:

| Node | Null pointers | Thread points to | Note |
| --- | --- | --- | --- |
| $D$ | left, right | none, $B$ | first node, no predecessor |
| $E$ | left, right | $B$, $A$ | both neighbours nearby |
| $F$ | left, right | $A$, $C$ | crosses subtrees |
| $H$ | left, right | $C$, $G$ | predecessor lies on the ancestor path |
| $G$ | right | none | last node, no successor |

After threading, inorder traversal needs neither recursion nor a stack: start at the bottom-left node and follow right threads; when a node has `rtag == 0`, descend into its right subtree and walk left again. Every node is visited once, so the cost is $O(n)$ time and $O(1)$ extra space — the payoff for two flag bits.

> [!NOTE]
> Threading changes what an empty pointer means, not the logical shape of the tree. Check `ltag` before descending: when it is 1, `lchild` is a predecessor link, and using it as a child jumps to the wrong place in the traversal order.

## Three misconceptions

> [!MYTH] The three traversals print in different orders but do the same job.
> Inorder yields sorted output on a binary search tree, postorder fits work that needs children handled before parents (freeing a tree, evaluating an expression), and preorder fits structural copying. The visit time decides the use.

> [!MYTH] Preorder plus postorder determines a binary tree.
> It does not. A lone child cannot be placed on a side, so several trees satisfy both sequences. Inorder is required.

> [!MYTH] A threaded tree just tags the child pointers.
> The tags redefine what empty pointers carry: predecessors and successors in the traversal order. That is extra structural information, not a child relation.

## Practice

> [!PRACTICE] 1 · Write the sequence
> Give the postorder sequence of $A(B(D,E),C(F,G(H)))$.
>
> > [!ANSWER] Show answer
> > D E B F H G C A. Postorder visits the root last.

> [!PRACTICE] 2 · Reconstruct
> Preorder $ABDEC$ with inorder $DBEAC$. Draw the tree.
>
> > [!ANSWER] Show answer
> > Root $A$, left subtree $B(D,E)$, right subtree just $C$: $A(B(D,E),C)$.

> [!PRACTICE] 3 · Count threads
> A binary tree has 10 nodes. How many threads appear after inorder threading?
>
> > [!ANSWER] Show answer
> > There are $n+1=11$ null pointers, all converted, so 11 threads.

## Formal statement

Traversal of a binary tree visits every node exactly once along a search path. Depth-first orders are classified by when the root is visited: preorder is root-left-right, inorder is left-root-right, postorder is left-right-root; level order advances by depth. A binary tree is uniquely determined by its preorder and inorder sequences, by its postorder and inorder sequences, or by its level order and inorder sequences, but not by preorder and postorder alone, since the side of a lone child cannot be inferred. A threaded binary tree converts the $n+1$ null pointer fields of a binary linked list into threads pointing to predecessors and successors in the traversal order, using `ltag` and `rtag` to distinguish threads from child pointers. After inorder threading the tree can be traversed in $O(n)$ time with $O(1)$ auxiliary space. Threading does not alter the logical structure, only the meaning of empty pointers.