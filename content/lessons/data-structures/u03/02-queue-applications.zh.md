---
slug: "queue-applications"
subject: "data-structures"
unit: "u03"
order: 2
mode: "mastery"
lang: "zh"
kicker: "第 2 讲 · 数据结构 · 专业模式"
title: "队列及其应用"
subtitle: "少用一个单元，换来判空判满可区分"
minutes: 16
meta: ["阅读 16 分钟","需要 栈及其应用","掌握级"]
concepts: ["queue"]
prereq: ["list", "stack"]
related: ["stack", "graphds"]
---

## 本讲目标

学完这一讲，你能写出循环队列的入队出队与判空判满，能算出队中元素个数，能说明链队列的适用场合，并能用队列搭建一个离散事件模拟的主循环。

## 三行回顾

- 队列只允许队尾插入、队头删除，先进先出。
- 循环队列靠取模让 `rear` 绕回，牺牲一个单元区分空与满。
- 队列的典型用途是缓冲与按到达顺序处理，如调度、层序遍历、事件模拟。

## 循环队列的判空与判满

顺序队列若用 `front` 指向队头元素、`rear` 指向队尾的下一个空位，直接后移会让 `rear` 越过数组末端，前面的空位白白浪费。解决办法是取模回绕，把数组看成一个环：

```c
#define MAXQSIZE 8
typedef struct {
    int data[MAXQSIZE];
    int front, rear;
} SqQueue;

int EnQueue(SqQueue *Q, int x) {
    if ((Q->rear + 1) % MAXQSIZE == Q->front) return 0;  /* 满 */
    Q->data[Q->rear] = x;
    Q->rear = (Q->rear + 1) % MAXQSIZE;
    return 1;
}

int DeQueue(SqQueue *Q, int *x) {
    if (Q->front == Q->rear) return 0;                   /* 空 */
    *x = Q->data[Q->front];
    Q->front = (Q->front + 1) % MAXQSIZE;
    return 1;
}
```

`front == rear` 同时可能是空或满，二者无法区分。教材的做法是始终空出一个单元：队满的条件写成 `(rear+1) % MAXQSIZE == front`，于是容量为 `MAXQSIZE` 的数组最多存 `MAXQSIZE-1` 个元素。

取 `MAXQSIZE = 8`，可存 7 个元素。设 `front = 3`、`rear = 7`，元素个数为

$$
\text{count}=(\text{rear}-\text{front}+\text{MAXQSIZE})\bmod \text{MAXQSIZE}=(7-3+8)\bmod 8=4
$$

即下标 3、4、5、6 四个元素。此时入队一个元素，写入 `data[7]`，`rear` 变为 $(7+1)\bmod 8=0$；再连续入队两个，`rear` 变为 2。此时 $(2+1)\bmod 8=3=\text{front}$，队列满，虽然数组下标 7 已被用过、下标 0 和 1 也已写入，物理上只剩一个空位却不能再入队。

| 状态 | 条件 | 元素个数 |
| --- | --- | --- |
| 空 | `front == rear` | 0 |
| 满 | `(rear+1) % MAXQSIZE == front` | `MAXQSIZE-1` |
| 一般 | 其他 | `(rear-front+MAXQSIZE) % MAXQSIZE` |

> [!NOTE]
> 也可以额外设一个 `count` 或 `tag` 标志来区分空满，从而用满整个数组。教材采用「牺牲一个单元」的方案，因为它不增加字段，代价只是容量减一。两种方案都对，但要与题目约定保持一致。

## 链队列

链队列用单链表加队头、队尾两个指针，入队在表尾接结点，出队在表头删结点，都是 $O(1)$，且不必预设容量。

```c
typedef struct QNode {
    int data;
    struct QNode *next;
} QNode, *QueuePtr;

typedef struct {
    QueuePtr front, rear;
} LinkQueue;
```

关键细节是：出队时若删除的正是最后一个结点，必须把 `rear` 重新指回 `front`，否则 `rear` 悬空，下一次入队会写到已释放的内存。空队时 `front == rear` 且都指向头结点。

链队列不会假溢出，适合长度变化剧烈、上界难以估计的场合；循环队列不需要动态分配、缓存更友好，适合长度有上界的高频场景。

## 离散事件模拟

银行窗口模拟是队列的经典应用：顾客按到达时刻排队，窗口空闲就立刻服务，否则等待。事件只有两类——顾客到达、顾客离开——按时间顺序处理。做法是用一个队列保存等待的顾客，用一个变量记录当前时刻，每次取出最早的事件推进时间。

以单窗口为例，顾客到达时刻为 0、2、3，服务时长均为 4：

| 时刻 | 事件 | 队列（队头→队尾） | 备注 |
| --- | --- | --- | --- |
| 0 | 1 号到达 | 1 | 窗口空闲，立即服务 |
| 2 | 2 号到达 | 2 | 1 号仍在服务 |
| 3 | 3 号到达 | 2, 3 | 排队 |
| 4 | 1 号离开 | 2, 3 | 2 号开始服务 |
| 8 | 2 号离开 | 3 | 3 号开始服务 |
| 12 | 3 号离开 | 空 | 全部完成 |

平均等待时间为 $(0+2+5)/3\approx2.33$，平均逗留时间为 $(4+6+9)/3\approx6.33$。模拟的正确性依赖两点：事件必须按时间非降序处理，同一时刻的离开要先于到达（否则会凭空多出一个排队者）。队列在这里承担的是「到达顺序即服务顺序」的记账职责。

## 三个常见误解

> [!MYTH] 循环队列的数组有多大就能存多少元素。
> 采用牺牲一个单元的方案时，容量是 `MAXQSIZE-1`。写 `MAXQSIZE` 个元素必然导致队满与队空无法区分。

> [!MYTH] 队列的入队出队都在同一端。
> 入队在队尾，出队在队头，两端各司其职。若在同一端操作，得到的是栈而不是队列。

> [!MYTH] 链队列出队只需修改 `front`。
> 删除最后一个结点时 `rear` 会悬空，必须同步把它指向头结点。漏掉这一步，后续入队会写入已释放的内存。

## 练习

> [!PRACTICE] 1 · 数元素
> `MAXQSIZE = 8`，`front = 6`，`rear = 2`，队中有几个元素？还能入队几个？
>
> > [!ANSWER] 看答案
> > 个数为 $(2-6+8)\bmod 8=4$。容量 7，还能入队 3 个。

> [!PRACTICE] 2 · 判满
> 承上，再入队 3 个后 `rear` 是多少？此时队列处于什么状态？
>
> > [!ANSWER] 看答案
> > `rear` 依次为 3、4、5，此时 $(5+1)\bmod 8=6=\text{front}$，队满。

> [!PRACTICE] 3 · 模拟
> 单窗口，顾客在 0、1 时刻到达，服务时长分别为 5、2，求平均等待时间。
>
> > [!ANSWER] 看答案
> > 1 号等待 0，2 号等到时刻 5 才开始，等待 4，平均等待 $(0+4)/2=2$。

## 严格表述

队列是只允许在表的一端插入、在另一端删除的线性表，插入端为队尾，删除端为队头，遵循先进先出原则。循环队列将数组视为首尾相接的环，以 `front` 指向队头元素、`rear` 指向队尾之后的位置，入队与出队均对下标取模。为使空与满可区分，约定队满条件为 $(\text{rear}+1)\bmod \text{MAXQSIZE}=\text{front}$，此时可存元素数为 $\text{MAXQSIZE}-1$，队中元素个数为 $(\text{rear}-\text{front}+\text{MAXQSIZE})\bmod \text{MAXQSIZE}$。链队列以带头结点的单链表实现，入队在表尾、出队在表头，均为 $O(1)$，删除末结点时须将 `rear` 复位到头结点。队列保证处理顺序与到达顺序一致，因而适用于缓冲、调度、层序遍历与离散事件模拟。