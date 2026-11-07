---
slug: "linked-list"
subject: "data-structures"
unit: "u02"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "Linked Lists"
subtitle: "Handing neighbour relations over to pointers"
minutes: 16
meta: ["16 min read","Requires Sequential Lists","Mastery level"]
concepts: ["list", "dynstorage"]
prereq: ["list"]
related: ["stack", "tree"]
---

## What you will get

By the end of this lecture you can write the pointer operations for positional insertion and deletion in a singly linked list, explain the division of labour between the head pointer and the head node, compare singly, doubly, and circular lists, and defend a choice between sequential and linked storage.

## Three lines back

- A linked list stores elements in arbitrary cells and records each successor in a pointer field.
- Access by position costs $O(n)$; insertion or deletion costs $O(1)$ once the predecessor is known.
- The head node holds no data, which makes edits at the first position identical to edits anywhere else.

## Nodes, head pointer, head node

Each node of a singly linked list pairs a data field with a pointer:

```c
typedef struct LNode {
    int data;
    struct LNode *next;
} LNode, *LinkList;
```

`LinkList L` points at the first node; this head pointer is the list's only identity, and `L == NULL` means an empty list. A common variant adds an extra node that stores nothing, so `L->next` is the first real element. That head node removes the special case for inserting at or deleting from the front: the code path becomes identical to the middle, at the cost of one node.

Physically, nodes may sit anywhere. Logical order lives entirely in `next`. Reaching element $i$ means walking $i-1$ links from the head, which is exactly why a linked list cannot do random access. Fetching the first element and the millionth differ by a factor of a million.

## Insertion and deletion in a singly linked list

To insert at position $i$, first walk to node $i-1$ and call it $p$, then assign twice:

```c
s->next = p->next;   /* connect the successor first */
p->next = s;
```

Reverse the order and `p->next = s` overwrites the only reference to the old successor, leaving `s->next` nothing valid to point at. Deletion follows the same pattern:

```c
q = p->next;
p->next = q->next;
free(q);
```

Trace one case. The list is `head -> 10 -> 20 -> 30` and we delete the second element. $p$ stops at 10, `q = p->next` is 20, `p->next = q->next` points 10 straight at 30, and `free(q)` releases 20. The list becomes `head -> 10 -> 30` after three pointer assignments, independent of length.

| Operation | Sequential list | Singly linked list |
| --- | --- | --- |
| Read by position | $O(1)$ | $O(n)$ |
| Search by value | $O(n)$ | $O(n)$ |
| Insert with predecessor known | $O(n)$ (shifting) | $O(1)$ |
| Delete a known node | $O(n)$ | $O(1)$ with predecessor |
| Storage density | 1 | below 1 (pointer field) |
| Space requirement | one large block | scattered cells, grows on demand |

> [!NOTE]
> The $O(1)$ insertion claim has a precondition: the predecessor is already in hand. If only the index $i$ is given, finding the predecessor costs $O(n)$ and the whole operation is $O(n)$. Always state what the input is before quoting a complexity.

## Doubly and circular lists

A doubly linked list adds a `prior` field, enabling backward traversal and $O(1)$ deletion of a known node without hunting for its predecessor:

```c
typedef struct DNode {
    int data;
    struct DNode *prior, *next;
} DNode;

/* insert s after p */
s->next = p->next;
s->prior = p;
p->next->prior = s;
p->next = s;
```

The order matters. The first two assignments give $s$ its neighbours, the third repairs the backward link of the old successor, and only then may `p->next` be overwritten. Change the last two and the old successor is unreachable.

A circular list points the tail's `next` back to the head node, forming a cycle. Every node can then reach the whole list, and the tail is available as `rear->next` in $O(1)$, which suits queue implementations. Emptiness also changes shape: for a circular list with a head node, the empty test is `L->next == L`.

The trade-off is direct. A singly linked list spends the least memory and is enough for forward-only work. A doubly linked list spends one extra pointer per node to buy two-way traversal and $O(1)$ deletion. A circular list removes boundary tests and fits ring scheduling.

## Three misconceptions

> [!MYTH] Linked-list insertion and deletion are always $O(1)$.
> Only when the predecessor is already held, or when the node itself is known in a doubly linked list. Positional operations first pay $O(n)$ to locate the spot.

> [!MYTH] The head pointer is the head node.
> The head pointer is a required variable that marks the start. The head node is an optional extra node holding no data. With a head node, the head pointer targets the head node, not the first element.

> [!MYTH] A linked list saves memory compared with a sequential list.
> Every node carries one or two extra pointer fields, so storage density is below 1. The advantage is on-demand allocation and no contiguity requirement, not a smaller footprint.

## Practice

> [!PRACTICE] 1 · Write the pointers
> Insert $s$ after node $p$ in a singly linked list. Give the two assignments and justify the order.
>
> > [!ANSWER] Show answer
> > `s->next = p->next; p->next = s;`. The first assignment must capture the old successor before the second overwrites the only reference to it.

> [!PRACTICE] 2 · Count the work
> A list of length $n=100$ loses its 50th node. How much moving or pointer work does each representation need?
>
> > [!ANSWER] Show answer
> > The sequential list shifts $100-50=50$ elements. The linked list walks 49 links, then performs three pointer assignments.

> [!PRACTICE] 3 · Test for emptiness
> How do you test a circular doubly linked list that has a head node?
>
> > [!ANSWER] Show answer
> > `L->next == L`, equivalently `L->prior == L`; both pointers of the head node point at itself.

## Formal statement

A linked list is the linked storage representation of a linear list. Each node contains a data field and one or more pointer fields, so logically adjacent elements need not be physically adjacent and the successor is recorded explicitly. Accessing element $i$ in a singly linked list takes $i-1$ link steps, hence $O(n)$; given a predecessor $p$, insertion and deletion take $O(1)$ and a constant number of pointer assignments. The head node is an auxiliary node without data whose presence removes the special case at the first position. A doubly linked list trades a `prior` field for backward traversal and $O(1)$ deletion of a known node, while a circular list links the tail back to the head so that any node reaches the whole list. Storage density is below 1, but no contiguous block is required and capacity grows on demand.