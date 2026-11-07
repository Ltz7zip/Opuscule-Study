---
slug: "queue-applications"
subject: "data-structures"
unit: "u03"
order: 2
mode: "mastery"
lang: "en"
kicker: "Lecture 2 · Data Structures · Mastery"
title: "Queues and Their Applications"
subtitle: "One wasted slot buys a clean empty-versus-full test"
minutes: 16
meta: ["16 min read","Requires Stacks and Their Applications","Mastery level"]
concepts: ["queue"]
prereq: ["list", "stack"]
related: ["stack", "graphds"]
---

## What you will get

By the end of this lecture you can write enqueue and dequeue for a circular queue together with the empty and full tests, compute how many elements it holds, explain when a linked queue wins, and assemble the main loop of a discrete-event simulation on top of a queue.

## Three lines back

- A queue inserts at the rear and deletes at the front, so it is first-in-first-out.
- A circular queue wraps the rear index modulo the array size, sacrificing one slot to tell empty from full.
- Queues buffer work and preserve arrival order: scheduling, level-order traversal, event simulation.

## Empty and full in a circular queue

In a plain array queue, letting `rear` advance past the end wastes every slot before it. The fix is to treat the array as a ring and take indices modulo the capacity:

```c
#define MAXQSIZE 8
typedef struct {
    int data[MAXQSIZE];
    int front, rear;
} SqQueue;

int EnQueue(SqQueue *Q, int x) {
    if ((Q->rear + 1) % MAXQSIZE == Q->front) return 0;  /* full */
    Q->data[Q->rear] = x;
    Q->rear = (Q->rear + 1) % MAXQSIZE;
    return 1;
}

int DeQueue(SqQueue *Q, int *x) {
    if (Q->front == Q->rear) return 0;                   /* empty */
    *x = Q->data[Q->front];
    Q->front = (Q->front + 1) % MAXQSIZE;
    return 1;
}
```

The condition `front == rear` can mean either empty or full, and the two cases cannot be distinguished. The standard remedy is to keep one slot permanently free: full is `(rear+1) % MAXQSIZE == front`, so an array of capacity `MAXQSIZE` stores at most `MAXQSIZE-1` elements.

Take `MAXQSIZE = 8`, giving room for 7 elements. With `front = 3` and `rear = 7` the count is

$$
\text{count}=(\text{rear}-\text{front}+\text{MAXQSIZE})\bmod \text{MAXQSIZE}=(7-3+8)\bmod 8=4
$$

so indices 3, 4, 5, 6 are occupied. One enqueue writes `data[7]` and moves `rear` to $(7+1)\bmod 8=0$; two more move it to 2. Now $(2+1)\bmod 8=3=\text{front}$, so the queue is full even though only one physical slot is unused — the ring has wrapped and every other slot holds data.

| State | Condition | Element count |
| --- | --- | --- |
| Empty | `front == rear` | 0 |
| Full | `(rear+1) % MAXQSIZE == front` | `MAXQSIZE-1` |
| General | otherwise | `(rear-front+MAXQSIZE) % MAXQSIZE` |

> [!NOTE]
> An extra `count` or `tag` field also separates empty from full and lets the array be used completely. The textbook scheme wastes one slot but adds no field. Both are correct; follow whichever convention the problem states.

## Linked queues

A linked queue is a singly linked list with front and rear pointers. Enqueue appends at the rear, dequeue removes at the front, both $O(1)$, and no capacity has to be declared.

```c
typedef struct QNode {
    int data;
    struct QNode *next;
} QNode, *QueuePtr;

typedef struct {
    QueuePtr front, rear;
} LinkQueue;
```

The subtle case: when dequeue removes the last remaining node, `rear` must be reset to point at the head node. Otherwise `rear` dangles and the next enqueue writes into freed memory. When the queue is empty, `front == rear`, both pointing at the head node.

A linked queue never suffers false overflow, which suits workloads whose length varies wildly. A circular queue avoids allocation and is cache friendly, which suits workloads with a known upper bound.

## Discrete-event simulation

Simulating a bank counter is the classic queue application. Customers arrive and queue up; a free teller serves the next one immediately. Only two event types exist — arrival and departure — and they are processed in nondecreasing time order. The waiting line is a queue, the current clock is a scalar, and each step removes the earliest event.

One teller, arrivals at times 0, 2, 3, service time 4 each:

| Time | Event | Queue (front→rear) | Note |
| --- | --- | --- | --- |
| 0 | customer 1 arrives | 1 | teller free, starts at once |
| 2 | customer 2 arrives | 2 | 1 is still served |
| 3 | customer 3 arrives | 2, 3 | both wait |
| 4 | customer 1 departs | 2, 3 | 2 starts |
| 8 | customer 2 departs | 3 | 3 starts |
| 12 | customer 3 departs | empty | all done |

Average wait is $(0+2+5)/3\approx2.33$ and average time in system is $(4+6+9)/3\approx6.33$. Correctness depends on two rules: events are processed in nondecreasing time, and at equal timestamps departures are handled before arrivals, otherwise a phantom customer appears in the line. The queue here is doing one job only — preserving arrival order as service order.

## Three misconceptions

> [!MYTH] A circular queue of array size $N$ holds $N$ elements.
> With the one-slot-sacrifice scheme it holds $N-1$. Forcing $N$ elements makes full and empty indistinguishable.

> [!MYTH] A queue inserts and deletes at the same end.
> Insertion is at the rear and deletion at the front. Doing both at one end produces a stack, not a queue.

> [!MYTH] Dequeue only needs to move `front`.
> Removing the final node leaves `rear` dangling, so it must be reset to the head node. Skip that and the next enqueue writes to freed memory.

## Practice

> [!PRACTICE] 1 · Count the elements
> With `MAXQSIZE = 8`, `front = 6`, `rear = 2`, how many elements are queued and how many more fit?
>
> > [!ANSWER] Show answer
> > The count is $(2-6+8)\bmod 8=4$. Capacity is 7, so 3 more fit.

> [!PRACTICE] 2 · Reach the full state
> Continuing from above, where does `rear` land after three more enqueues, and what is the state?
>
> > [!ANSWER] Show answer
> > `rear` becomes 3, then 4, then 5; since $(5+1)\bmod 8=6=\text{front}$, the queue is full.

> [!PRACTICE] 3 · Run a simulation
> One teller, arrivals at 0 and 1, service times 5 and 2. What is the average wait?
>
> > [!ANSWER] Show answer
> > Customer 1 waits 0; customer 2 starts at time 5 and waits 4; average $(0+4)/2=2$.

## Formal statement

A queue is a linear list allowing insertion at one end, the rear, and deletion at the other, the front, giving first-in-first-out behaviour. A circular queue views its array as a ring, with `front` addressing the head element and `rear` the next free position, both advanced modulo the capacity. To distinguish empty from full the convention is $(\text{rear}+1)\bmod \text{MAXQSIZE}=\text{front}$ for full, so at most $\text{MAXQSIZE}-1$ elements are stored and the current count is $(\text{rear}-\text{front}+\text{MAXQSIZE})\bmod \text{MAXQSIZE}$. A linked queue uses a singly linked list with a head node, enqueuing at the rear and dequeuing at the front, both $O(1)$, and must reset `rear` to the head node when the last node leaves. Because a queue maps arrival order onto processing order, it underlies buffering, scheduling, level-order traversal, and discrete-event simulation.