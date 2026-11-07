---
slug: "security-access-control"
subject: "operating-systems"
unit: "u12"
order: 1
mode: "mastery"
lang: "en"
kicker: "Lecture 23 · Operating Systems · Mastery"
title: "Security Environment and Access Control"
subtitle: "Ten million matrix cells compressed into fifty thousand records"
minutes: 16
meta: ["16 min read","Requires file systems and processes","Mastery level"]
concepts: ["ossecurity","filesys"]
prereq: ["filesys"]
related: ["process","osif"]
---

## What you will get

You will be able to classify attacks, describe TCSEC levels, model permissions as an access matrix, and compare ACLs with capability lists on storage, lookup, and revocation.

## Three lines back

- Security protects confidentiality, integrity, and availability, and threats break them.
- Access control formalizes who may do what to an object as a matrix, compressed by row or column.
- Least privilege gives a subject only the permissions its task needs.

## Threats and evaluation levels

A **passive attack** only observes: wiretapping a link, analyzing traffic patterns. It is hard to detect but preventable by encryption. An **active attack** modifies or fabricates data: tampering, replaying old messages, impersonating an identity, or denying service. It is hard to prevent and is handled by detection and recovery.

Malware carriers include viruses that attach to host programs, worms, trojans disguised as useful software, logic bombs, and rootkits hiding the intrusion.

The **Trusted Computer System Evaluation Criteria** defines seven levels:

| Level | Name | Key requirement |
| --- | --- | --- |
| D | Minimal protection | Fails higher levels |
| C1 | Discretionary security | User and data separation, discretionary access |
| C2 | Controlled access | Per-user auditing, object reuse protection |
| B1 | Labeled security | Mandatory access control, labels |
| B2 | Structured protection | Formal model, covert channel analysis |
| B3 | Security domains | Audit and recovery, trusted path |
| A1 | Verified design | Formal top-level specification and proof |

China's GB 17859 defines five levels, from user discretionary protection to access verification protection, roughly matching C1 through B3.

## The access matrix: subjects, objects, rights

A **subject** initiates access, such as a user or process; an **object** is a resource being accessed, such as a file or device. The **access matrix** $A$ has subjects as rows and objects as columns, and entry $A[s,o]$ is the permitted set of operations, for example $\{r,w,x\}$.

With subjects $s_1,s_2,s_3$ and files $f_1,f_2,f_3$:

| | $f_1$ | $f_2$ | $f_3$ |
| --- | --- | --- | --- |
| $s_1$ | rw | r | — |
| $s_2$ | r | rw | x |
| $s_3$ | — | — | rw |

Real matrices are extremely sparse: 1000 users and 10,000 files make $10^7$ cells, almost all empty. At 1 B per cell that is 10 MB, with only 0.5% non-empty, so compression is mandatory.

## ACLs versus capabilities

An **access control list** compresses by column: each object keeps subject-to-rights entries, scanned when it is opened. A **capability list** compresses by row: each subject holds unforgeable tickets naming objects and rights, checked at authentication.

| Property | Access control list | Capability list |
| --- | --- | --- |
| Stored per | Object | Subject |
| Check path | Scan the object's list on open | Read the subject's own list |
| Revoke one subject | Edit one entry | Walk all that subject's tickets |
| Revoke all on one object | Walk every subject's list | Change the object or drop references |
| Delegation | Edit the object's list | Hand over the ticket |
| Typical use | UNIX mode bits, Windows ACLs | Microkernel IPC, tokens |

Both can coexist. The nine UNIX mode bits are a minimal ACL: subjects collapse into owner, group, and others, at the cost of fine-grained grants, which POSIX ACLs restore.

With 1000 users, 10,000 files, five grantees per file, and 16 B per entry, an ACL holds $50{,}000$ entries, or 800 KB; as capabilities, with 50 rights per user and 12 B per entry, it is 600 KB. Both beat the 10 MB dense matrix by an order of magnitude; the difference is **who pays for lookup and revocation**.

> [!NOTE]
> Least privilege limits the rights a subject holds; separation of duties requires several subjects for a sensitive action. Neither follows from the matrix.

## Three common misconceptions

> [!MYTH] The access matrix can be implemented as a two-dimensional array.
> Real matrices are far too sparse; a dense array wastes orders of magnitude of memory and cannot express wildcards or inheritance.

> [!MYTH] ACLs and capabilities differ only in where they are stored.
> They are asymmetric in revocation: ACLs revoke per object easily, capabilities transfer per subject easily, so the choice follows the dominant operation.

> [!MYTH] With access control in place, encryption is unnecessary.
> Access control covers legitimate paths through the kernel; stolen tapes, memory dumps, and side channels bypass it.

## Practice

> [!PRACTICE] 1 · Compute
> With 500 users, 2000 files, four grantees per file, and 20 B per entry, how large is the ACL? And a dense matrix at 1 B per cell?
>
> > [!ANSWER] Show answer
> > ACL: $2000\times4=8000$ entries, $8000\times20=160$ KB. Dense matrix: $500\times2000=10^6$ B, about 0.95 MB, roughly six times larger.

> [!PRACTICE] 2 · Decide
> A system often blocks one user from one file. ACL or capabilities?
>
> > [!ANSWER] Show answer
> > An ACL: revoking edits one entry in that file's list; capabilities would require walking every ticket the user holds.

> [!PRACTICE] 3 · Classify
> Sort these as passive or active: sniffing Wi-Fi traffic, replaying a login message, analyzing traffic frequency, altering database records.
>
> > [!ANSWER] Show answer
> > Passive: sniffing and traffic analysis. Active: replay and record tampering.

## Formal statement

Threats are passive, observing communication and prevented by encryption, or active, tampering, fabricating, replaying, or denying service and handled by detection and recovery. TCSEC defines levels D through A1, GB 17859 five levels. Access control is the matrix $A[s,o]$ of subject rights over objects, compressed by column into ACLs or by row into capability lists; the first revokes per object, the second delegates per subject, and both reduce storage from $|S|\times|O|$ to non-empty entries.