"""Flask API for AI predictions and chatbot."""
from flask import Flask, jsonify, request

from predictor import answer_question, ml_enhanced_prediction

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "Parent Edu Connect AI"})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True) or {}
    student = data.get("student", {})
    subject = data.get("subject", "Mathematics")
    result = ml_enhanced_prediction(student, subject)
    return jsonify(result)


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True) or {}
    student = data.get("student", {})
    subject = data.get("subject", "Mathematics")
    question = data.get("question", "")
    answer = answer_question(student, subject, question)
    return jsonify({"answer": answer})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
