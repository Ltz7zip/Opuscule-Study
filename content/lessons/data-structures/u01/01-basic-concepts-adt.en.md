---
slug: "basic-concepts-adt"
subject: "data-structures"
unit: "u01"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 1 · Data Structures · Mastery"
title: "Basic Concepts and Abstract Data Types"
subtitle: "Three layers of abstraction, from data element to ADT"
minutes: 14
meta: ["14 min read","Requires basic C","Mastery level"]
concepts: ["list", "dynstorage"]
prereq: []
related: ["complexity", "arraygen"]
---

## What you will get

By the end of this lecture you can separate data, data elements, and data items, give two storage schemes for one logical structure, and use an abstract data type to keep "what it does" apart from "how it is done".

## Three lines back

- Data is any symbol a computer can process; a data element is the unit handled as a whole.
- A logical structure says how elements relate; a storage structure says how that relation is laid out in memory.
- An abstract data type fixes a value domain and a set of operations, and hides everything else.

## Starting from a student table

A student table has four rows, one record each. A whole row is a **data element**: the smallest unit the program handles as a single object. The student number, name, and age inside that row are **data items**, which cannot be divided further. The table therefore holds 4 elements with 3 items each. Collect every student number on its own and you get a **data object** — a set of elements that share a property.

| Term | In this table | Role |
| --- | --- | --- |
| Data | all records | the symbol set being processed |
| Data element | one student row | unit processed as a whole |
| Data item | number, name, age | indivisible unit |
| Data object | all student numbers | set of like elements |

These terms nest; they are not synonyms. Saying "a data structure is its data elements" throws away the relations between elements, and those relations are exactly what the subject studies.

## Logical structure and storage structure

A **logical structure** describes relations in the abstract, independent of any machine. Four shapes cover the ground:

| Logical structure | Relation | Example |
| --- | --- | --- |
| Set | membership only | class roster |
| Linear | one-to-one, unique predecessor and successor | list, stack, queue |
| Tree | one-to-many, hierarchical | file directories |
| Graph | many-to-many | road network |

A **storage structure** is the image of that logic in memory. There are two basic means: sequential storage places logical neighbours in adjacent memory cells, and linked storage records the relation with pointers. The same list $(a_1,a_2,\dots,a_5)$ can live in a contiguous array or in a chain of nodes.

With sequential storage the address is a closed formula. If the first element sits at $\mathrm{LOC}(a_1)$ and each element occupies $L$ bytes, then

$$
\mathrm{LOC}(a_i)=\mathrm{LOC}(a_1)+(i-1)\times L
$$

Take $\mathrm{LOC}(a_1)=1000$ and $L=4$: element $a_4$ lives at $1000+3\times4=1012$. Linked storage has no such formula — reaching element $i$ costs $i-1$ pointer hops. That single difference drives the comparisons later on.

## Abstract data types

An **abstract data type** (ADT) is a mathematical model plus a set of operations defined on it. It is described by a triple $(D,S,P)$: a data object $D$, a relation set $S$ on $D$, and a set of basic operations $P$. The specification names each operation, its parameters, its effect, and its preconditions — never whether an array or a linked list backs it.

Take complex numbers. At the ADT level we only promise "create, read the real part, read the imaginary part, add". One implementation is a struct with two floats:

```c
typedef struct {
    float real;
    float imag;
} Complex;

Complex Add(Complex a, Complex b) {
    Complex c;
    c.real = a.real + b.real;
    c.imag = a.imag + b.imag;
    return c;
}
```

Callers only need to know that `Add` returns the sum. Computing $(1+2i)+(3-4i)$ gives $4-2i$ regardless of field names, and switching to polar form internally changes nothing for them. This split between specification and implementation is information hiding, and it is the whole point of an ADT.

> [!NOTE]
> The logical structure answers "how are elements connected", the storage structure answers "where in memory", and the ADT answers "what can be done from outside". Three views of one object, not three separate nouns.

## Three misconceptions

> [!MYTH] A data structure is a storage structure.
> Storage is only the implementation layer. One logical structure may be stored sequentially, linked, or through an index, and the logic does not change.

> [!MYTH] A data element is a data item.
> An element is handled as a whole; an item is the smallest indivisible piece. A student row is an element, a student number is one of its items.

> [!MYTH] A typedef is an ADT.
> A typedef is only C syntax. An ADT is a specification of operation semantics; structs, classes, or tables of function pointers are all just implementations of it.

## Practice

> [!PRACTICE] 1 · Follow the pattern
> A student table has 30 rows, each with number, name, age, and class. Identify the data elements, the data items, and one data object.
>
> > [!ANSWER] Show answer
> > The 30 rows are the data elements; the four fields are the data items; all student numbers form one data object, as would all names.

> [!PRACTICE] 2 · Compute an address
> The first element sits at 2000, each element is 8 bytes. Find the address of $a_6$. Under linked storage, how many hops reach $a_6$?
>
> > [!ANSWER] Show answer
> > Sequential: $2000+(6-1)\times8=2040$. Linked: five hops from the head node.

> [!PRACTICE] 3 · Transfer
> Why can one ADT have several implementations without any caller changing code?
>
> > [!ANSWER] Show answer
> > Callers depend on the operation names and semantics, not on the memory layout. As long as the signatures and behaviour hold, swapping an array for a linked list is invisible.

## Formal statement

A data structure is a pair $(D,S)$ where $D$ is a finite set of data elements and $S$ is a finite set of relations on $D$. Adding an operation set $P$ yields an abstract data type $(D,S,P)$. The logical structure is the abstract shape of $S$ — set, linear, tree, or graph — while the storage structure is the image of $(D,S)$ in memory, realised basically by sequential or linked allocation. Under sequential allocation an element's address is an affine function of its index; under linked allocation the successor is recorded explicitly in a pointer field. An ADT constrains only observable operation behaviour, not implementation, so a single ADT may be realised by many data structures.