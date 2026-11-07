---
slug: "propositions"
subject: "discrete-mathematics"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Discrete Mathematics · Mastery"
title: "Propositions, Connectives, and Truth Tables"
subtitle: "Fix truth first, then argue"
minutes: 14
meta: ["14 min read","No prerequisites","Mastery level"]
concepts: ["proplogic", "disc"]
prereq: []
related: ["predlogic", "axiomset"]
---

## What you will get

By the end of this lecture you can decide whether a sentence is a proposition, translate "and", "or", and "if … then" into formulas, and compute a formula's truth value under every assignment with a truth table.

Three things only: what counts as a proposition, the truth conditions of five connectives, and the truth table as a hand-cranked calculator.

## Three lines back

- A claim can be tested only if it has a definite truth value; vague sentences cannot be tested.
- Sentences combine in fixed ways, and each way has its own truth rule.
- Write those rules as a table, and a formula's value follows row by row, with no appeal to intuition.

## Propositions and truth values

A proposition is a declarative sentence whose truth value is uniquely determined. "2 is even" is true, "3 is even" is false; both are propositions. "$x>5$" is not, because $x$ is unspecified. "Please close the door" is not either: imperatives and questions have no truth value.

Propositional variables are written $p,q,r$, with $T$ or $1$ for true and $F$ or $0$ for false. A variable is not itself a proposition; it acquires a value only under an assignment. An assignment is one row of data giving each variable a value.

## The five connectives

There are only five basic ways to build a new formula from old ones:

| Connective | Reading | True when | Example |
| --- | --- | --- | --- |
| $\neg p$ | not $p$ | $p$ is false | 2 is not even |
| $p\land q$ | $p$ and $q$ | both are true | 2 is even and 3 is prime |
| $p\lor q$ | $p$ or $q$ | at least one is true | 2 is even or 3 is even |
| $p\to q$ | if $p$ then $q$ | false only when $p$ is true and $q$ is false | if 2 is even then 3 is even |
| $p\leftrightarrow q$ | $p$ iff $q$ | the two values agree | 2 is even iff 3 is odd |

Implication is the one people misread. $p\to q$ rules out exactly one case: $p$ true and $q$ false. When the antecedent is false, the implication counts as true. "If $1+1=3$, then the moon is made of cheese" is therefore true. That is not a trick; it is how "if … then" is fixed in mathematics.

This also separates sufficient from necessary conditions. Let $p$ mean it rains and $q$ mean the ground is wet. "Rain is sufficient for a wet ground" is $p\to q$; "rain is necessary for a wet ground" is $q\to p$. The arrows point in opposite directions and cannot be swapped.

## Computing with truth tables

A truth table lists every combination of values. With $n$ variables there are $2^n$ rows: 4 rows for two variables, 8 for three. Take $(p\to q)\land(p\lor\neg q)$:

| $p$ | $q$ | $p\to q$ | $\neg q$ | $p\lor\neg q$ | conjunction |
| --- | --- | --- | --- | --- | --- |
| T | T | T | F | T | T |
| T | F | F | T | T | F |
| F | T | T | F | F | F |
| F | F | T | T | T | T |

The last column reads $T,F,F,T$, exactly the column of $p\leftrightarrow q$. That is not a coincidence; it is evidence that the two formulas are equivalent. Every assignment that makes one true makes the other true, and conversely.

> [!NOTE]
> A truth table both checks equivalences and finds them. Compute the columns, then compare columns; that is more reliable than rewriting by feel.

The usual precedence is $\neg$, then $\land$, then $\lor$, then $\to$, then $\leftrightarrow$. When in doubt, add parentheses: they never change meaning, only the order of reading.

## Three common misconceptions

> [!MYTH] $p\to q$ means $p$ causes $q$.
> Material implication looks only at truth combinations, never at causation, time, or relevance. "If $2+2=4$, then Beijing is in China" is true, though the first does not cause the second.

> [!MYTH] Mathematical "or" is exclusive.
> $\lor$ is inclusive: it stays true when both parts are true. Exclusive or must be written $(p\lor q)\land\neg(p\land q)$.

> [!MYTH] A truth table is only a post-hoc check.
> It is also a definition. The meaning of each connective is given by its truth table, and deciding tautology, contradiction, or satisfiability reduces to filling in rows.

## Practice

> [!PRACTICE] 1 · Decide
> Which of these are propositions: (a) Beijing is the capital of China; (b) $x+y=0$; (c) Will it rain tomorrow?
>
> > [!ANSWER] Show answer
> > (a) Yes, and it is true. (b) No, $x$ and $y$ have no values. (c) No, a question has no truth value.

> [!PRACTICE] 2 · Fill the table
> Use a truth table to classify $\neg(p\land q)\leftrightarrow(\neg p\lor\neg q)$.
>
> > [!ANSWER] Show answer
> > On all four assignments both sides are $T$, so the formula is a tautology. It is one of De Morgan's laws.

> [!PRACTICE] 3 · Translate
> Let $p$ mean you pass the exam and $q$ mean you get into the course. Formalise "Only if you pass the exam can you get into the course."
>
> > [!ANSWER] Show answer
> > $q\to p$. "Only if $p$, then $q$" says $p$ is necessary for $q$, so the arrow runs from $q$ to $p$.

## Formal statement

Formulas are generated by three rules: a propositional variable is a formula; if $A$ is a formula, so is $\neg A$; if $A,B$ are formulas, so are $(A\land B)$, $(A\lor B)$, $(A\to B)$, and $(A\leftrightarrow B)$. An assignment $v$ maps variables to $\{0,1\}$ and extends recursively: $v(\neg A)=1-v(A)$, $v(A\land B)=\min(v(A),v(B))$, $v(A\lor B)=\max(v(A),v(B))$, $v(A\to B)=0$ exactly when $v(A)=1$ and $v(B)=0$, and $v(A\leftrightarrow B)=1$ exactly when $v(A)=v(B)$. A formula true under every assignment is a tautology; false under every assignment, a contradiction; true under at least one assignment, satisfiable.
