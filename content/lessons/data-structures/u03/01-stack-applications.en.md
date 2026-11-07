---
slug: "stack-applications"
subject: "data-structures"
unit: "u03"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "Stacks and Their Applications"
subtitle: "Why last-in-first-out settles matching and evaluation"
minutes: 15
meta: ["15 min read","Requires Linked Lists","Mastery level"]
concepts: ["stack"]
prereq: ["list"]
related: ["queue", "list"]
---

## What you will get

By the end of this lecture you can write push and pop for an array-based stack including the full and empty tests, decide whether a bracket string is legal using a hand-drawn trace, convert an infix expression to postfix, evaluate it, and explain why these problems demand a stack rather than a counter.

## Three lines back

- A stack is a linear list whose insertions and deletions happen only at one end, the top, so it is last-in-first-out.
- An array stack tracks the top with an index; a linked stack pushes at the head; both give $O(1)$ operations.
- Whenever work can be postponed until the matching symbol arrives, a stack is the natural structure.

## Array stacks and linked stacks

An array stack is an array plus a top index:

```c
#define MAXSIZE 50
typedef struct {
    int data[MAXSIZE];
    int top;            /* empty when top = -1 */
} SqStack;

int push(SqStack *S, int x) {
    if (S->top == MAXSIZE - 1) return 0;   /* full */
    S->data[++S->top] = x;
    return 1;
}

int pop(SqStack *S, int *x) {
    if (S->top == -1) return 0;            /* empty */
    *x = S->data[S->top--];
    return 1;
}
```

Fix one convention for `top` and keep it. With `top = -1` meaning empty, push increments before storing and pop reads before decrementing. If instead `top` names the next free slot, every test and every access flips. Mixing the two conventions is a leading source of off-by-one bugs.

A linked stack inserts each new node right after the head pointer, so the top of the stack is the first element. It cannot overflow except by exhausting memory, push and pop are still $O(1)$, and the price is one pointer field per element.

| Implementation | Empty test | Full test | Push | Pop |
| --- | --- | --- | --- | --- |
| Array stack | `top == -1` | `top == MAXSIZE-1` | $O(1)$ | $O(1)$ |
| Linked stack | `top == NULL` | none (memory bound) | $O(1)$ | $O(1)$ |

## Bracket matching

Given a string over `()[]{}`, decide whether the brackets pair correctly and nest properly. The rule: push every opening bracket; on a closing bracket, compare it with the top, pop if they match and reject otherwise; at the end the stack must be empty.

Trace `([{}])`:

| Read | Action | Stack (bottom→top) |
| --- | --- | --- |
| `(` | push | `(` |
| `[` | push | `( [` |
| `{` | push | `( [ {` |
| `}` | top is `{`, pop | `( [` |
| `]` | top is `[`, pop | `(` |
| `)` | top is `(`, pop | empty |

The stack is empty at the end, so the string is legal. Now try `([)]`: on reading `)` the top is `[`, which does not pair with `(`, so the string is rejected immediately. The stack checks nesting order, not just counts — counts are handled by two integers, but only a stack remembers which opening bracket is the most recent one still open.

## Expression evaluation and postfix form

In the infix expression `3 + 4 * 5` the precedence is encoded in positions, which is awkward to evaluate left to right. Postfix (reverse Polish) notation writes each operator after its operands: `3 4 5 * +`. No parentheses, no precedence table.

Evaluation uses a single stack. A number is pushed. An operator pops two operands, computes, and pushes the result. The first operand popped is the right-hand one.

Trace `3 4 5 * +`:

| Read | Action | Stack (bottom→top) |
| --- | --- | --- |
| 3 | push | 3 |
| 4 | push | 3 4 |
| 5 | push | 3 4 5 |
| `*` | pop 5, 4, compute $4\times5=20$ | 3 20 |
| `+` | pop 20, 3, compute $3+20=23$ | 23 |

The result is 23, matching the infix form. Swap the pop order and subtraction or division silently produce wrong answers — the single most common implementation error.

> [!NOTE]
> Converting infix to postfix also uses a stack. Operands are emitted directly; before pushing an operator, pop every top operator of equal or higher precedence; a left parenthesis acts as the lowest-precedence marker and a right parenthesis pops back to its partner. Conversion and evaluation are two uses of the same last-in-first-out idea.

## Three misconceptions

> [!MYTH] A stack must be built on an array.
> A linked stack is equally valid and more flexible. The stack constrains behaviour — insert and delete at one end only — not the underlying storage.

> [!MYTH] Bracket matching only needs equal counts of left and right brackets.
> `([)]` has perfectly equal counts and still fails, because the nesting order is wrong. A stack is required to track the most recent unclosed symbol.

> [!MYTH] In postfix evaluation the first operand popped is the left one.
> The first pop is the right operand. Addition and multiplication hide the mistake; subtraction and division expose it at once.

## Practice

> [!PRACTICE] 1 · Decide legality
> Trace `{[()]}` and `{[(])}` with a stack. At which character does the second fail?
>
> > [!ANSWER] Show answer
> > The first matches throughout and ends with an empty stack. In the second, reading `]` finds `(` on top, which does not pair with `[`, so it fails at character 5.

> [!PRACTICE] 2 · Evaluate postfix
> Compute `5 1 2 + 4 * + 3 -`.
>
> > [!ANSWER] Show answer
> > $1+2=3$, $3\times4=12$, $5+12=17$, $17-3=14$. The value is 14.

> [!PRACTICE] 3 · Track the top
> An array stack starts with `top = -1`. After three pushes and two pops, what is `top` and how many elements remain?
>
> > [!ANSWER] Show answer
> > After the pushes `top = 2`; after two pops `top = 0`, leaving one element.

## Formal statement

A stack is a linear list in which insertion and deletion are restricted to one end, called the top; the other end is the bottom, and the resulting discipline is last-in-first-out. An array stack stores elements in a contiguous array and identifies the top by an index, with `top = -1` denoting the empty stack; push and pop are $O(1)$. A linked stack realises the same operations at the head of a singly linked list, also in $O(1)$ and without a fixed capacity. Bracket matching keeps unclosed opening brackets on a stack and compares each closing bracket with the top, requiring an empty stack at the end. Postfix evaluation keeps operands on a stack; on an operator it pops two operands, the first popped being the right operand, and pushes the result. Both procedures rely on the property that the most recently deferred object must be handled first.