"""FSRS-5 调度器（精简实现）。

前端只有三个评分，映射为 Again / Hard / Good：
    1 忘了 -> Again    2 模糊 -> Hard    3 记得 -> Good
权重沿用 FSRS-5 默认值，复习后按目标留存率 0.9 换算间隔天数。
"""
import math
from datetime import timedelta

from django.utils import timezone

W = (
    0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
    0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
)
DECAY = -0.5
FACTOR = 19 / 81
TARGET_RETENTION = 0.9
MAX_INTERVAL = 365 * 2

AGAIN, HARD, GOOD = 1, 2, 3
RATINGS = (AGAIN, HARD, GOOD)


def retrievability(elapsed_days, stability):
    """在 stability 下经过 elapsed_days 后仍能回忆的概率。"""
    if stability <= 0:
        return 0.0
    return (1 + FACTOR * max(elapsed_days, 0.0) / stability) ** DECAY


def init_stability(rating):
    return W[rating - 1]


def init_difficulty(rating):
    value = W[4] - math.exp(W[5] * (rating - 1)) + 1
    return min(10.0, max(1.0, value))


def interval_days(stability):
    """目标留存率下的复习间隔（天）。"""
    if stability <= 0:
        return 1
    days = stability / FACTOR * (TARGET_RETENTION ** (1 / DECAY) - 1)
    return max(1, min(MAX_INTERVAL, round(days)))


def mastery(stability):
    """把稳定性折成 0-96 的掌握度，用于复习页与统计。"""
    if stability <= 0:
        return 0
    return min(96, round(100 * (1 - math.exp(-stability / 8))))


def _next_difficulty(difficulty, rating):
    moved = difficulty - W[6] * (rating - 3)
    return min(10.0, max(1.0, W[7] * init_difficulty(GOOD) + (1 - W[7]) * moved))


def _recall_stability(stability, difficulty, recall, rating):
    hard_penalty = W[15] if rating == HARD else 1.0
    growth = (
        math.exp(W[8])
        * (11 - difficulty)
        * stability ** (-W[9])
        * (math.exp(W[10] * (1 - recall)) - 1)
        * hard_penalty
    )
    return stability * (1 + growth)


def _forget_stability(stability, difficulty, recall):
    return (
        W[11]
        * difficulty ** (-W[12])
        * ((stability + 1) ** W[13] - 1)
        * math.exp(W[14] * (1 - recall))
    )


def schedule(*, stability=0.0, difficulty=0.0, reps=0, lapses=0, last_review=None,
             rating=GOOD, now=None):
    """推进一步，返回新的卡片状态（不落库）。"""
    now = now or timezone.now()
    if reps <= 0 or stability <= 0 or last_review is None:
        new_stability = init_stability(rating)
        new_difficulty = init_difficulty(rating)
        state = 'learning'
        new_lapses = lapses
    else:
        elapsed = max(0.0, (now - last_review).total_seconds() / 86400)
        recall = retrievability(elapsed, stability)
        if rating == AGAIN:
            new_stability = _forget_stability(stability, difficulty, recall)
            state = 'relearning'
            new_lapses = lapses + 1
        else:
            new_stability = _recall_stability(stability, difficulty, recall, rating)
            state = 'review'
            new_lapses = lapses
        new_difficulty = _next_difficulty(difficulty or init_difficulty(GOOD), rating)

    new_stability = max(0.1, min(3650.0, new_stability))
    days = interval_days(new_stability)
    if rating == AGAIN:
        days = min(days, 1)

    return {
        'stability': round(new_stability, 4),
        'difficulty': round(new_difficulty, 4),
        'state': state,
        'reps': reps + 1,
        'lapses': new_lapses,
        'last_review': now,
        'due': now + timedelta(days=days),
        'interval_days': days,
        'retrievability': round(recall, 4) if reps > 0 and stability > 0 else 0.0,
        'mastery': mastery(new_stability),
    }


def preview(stability=0.0, difficulty=0.0, reps=0, lapses=0, last_review=None, now=None):
    """三个评分分别会排到多少天后。"""
    return {
        str(rating): schedule(
            stability=stability, difficulty=difficulty, reps=reps, lapses=lapses,
            last_review=last_review, rating=rating, now=now,
        )['interval_days']
        for rating in RATINGS
    }
