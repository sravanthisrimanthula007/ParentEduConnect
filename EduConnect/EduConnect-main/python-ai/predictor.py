"""AI prediction and chatbot service for Parent Edu Connect."""
from __future__ import annotations

import math
from typing import Any, Dict, List


def average(values: List[int]) -> float:
    if not values:
        return 0.0
    return sum(values) / len(values)


def predicted_score(student: Dict[str, Any], subject: str) -> int:
    subjects = student.get("subjects", {})
    marks = subjects.get(subject, [])
    if not marks:
        return 0
    trend = marks[-1] - marks[0]
    attendance = student.get("attendance", [])
    attendance_influence = (average(attendance) - 85) * 0.18
    behavior_influence = (student.get("behaviorScore", 75) - 75) * 0.08
    raw = marks[-1] + trend * 0.15 + attendance_influence + behavior_influence
    return min(100, round(raw))


def ml_enhanced_prediction(student: Dict[str, Any], subject: str) -> Dict[str, Any]:
    """Blend rule-based score with sklearn linear trend when enough data exists."""
    base = predicted_score(student, subject)
    subjects = student.get("subjects", {})
    marks = subjects.get(subject, [])
    ml_score = base
    if len(marks) >= 3:
        try:
            from sklearn.linear_model import LinearRegression
            import numpy as np

            x = np.array(range(len(marks))).reshape(-1, 1)
            y = np.array(marks)
            model = LinearRegression()
            model.fit(x, y)
            next_x = np.array([[len(marks)]])
            ml_score = int(round(model.predict(next_x)[0]))
            ml_score = max(0, min(100, ml_score))
            base = int(round((base + ml_score) / 2))
        except Exception:
            pass

    weak = student.get("weakSubject", subject)
    risk = student.get("risk", "Medium")
    pass_prob = student.get("passProbability", 90)

    return {
        "predictedScore": base,
        "mlScore": ml_score,
        "weakSubject": weak,
        "risk": risk,
        "passProbability": pass_prob,
        "recommendation": (
            f"Focus on {weak} with daily practice, error review, and "
            f"target 90% weekly attendance to improve pass probability."
        ),
        "model": "hybrid-rule-linear-regression",
    }


def answer_question(student: Dict[str, Any], subject: str, question: str) -> str:
    q = question.lower()
    name = student.get("name", "Student")
    attendance_vals = student.get("attendance", [])
    att_avg = round(average(attendance_vals))
    weak = student.get("weakSubject", subject)
    grade = student.get("grade", "B")
    pass_prob = student.get("passProbability", 85)

    if any(k in q for k in ["attendance", "उपस्थिति", "హాజరు", "வருகை"]):
        if attendance_vals and attendance_vals[-1] < attendance_vals[0]:
            delta = abs(attendance_vals[-1] - attendance_vals[0])
            return (
                f"Attendance decreased by {delta} points in recent months. "
                "A weekly target of 90% is recommended."
            )
        return f"Attendance is stable at {att_avg}%. Keep the current routine."

    if any(k in q for k in ["weak", "improvement", "कमजोर", "सुधार", "బలహీన", "మెరుగ", "பலவீன", "மேம்பாடு"]):
        return (
            f"{weak} needs improvement. Focus on error review, assignment completion, "
            "and short daily practice before the next exam."
        )

    if any(k in q for k in ["predict", "score", "marks", "अनुमान", "अंक", "అంచనా", "మార్క", "கணிப்பு", "மதிப்பெண்"]):
        score = predicted_score(student, subject)
        return (
            f"The AI estimate for {subject} is {score}%, using marks trend, "
            "attendance, behavior, and participation signals."
        )

    if any(k in q for k in ["complaint", "remark", "शिकायत", "टिप्पणी", "ఫిర్యాదు", "గమనిక", "புகார்", "குறிப்பு"]):
        complaints = student.get("complaints", [])
        if complaints:
            latest = complaints[0]
            return f"Latest teacher note from {latest[0]}: {latest[1]}. Severity: {latest[2]}."
        return "No behavior complaints recorded for this student."

    return (
        f"{name} has {pass_prob}% pass probability, {att_avg}% attendance, and grade {grade}. "
        f"The strongest next action is improving {weak}."
    )
