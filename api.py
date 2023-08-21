# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)
@app.route('/api/question-answering', methods=['POST'])
def question_answering():
    data = request.get_json()
    question = data['question']
    context = data['context']

    qa_pipeline = pipeline('question-answering', model='deepset/roberta-base-squad2', tokenizer='deepset/roberta-base-squad2')
    answer = qa_pipeline(question=question, context=context)

    return jsonify({'answer': answer['answer']})

if __name__ == '__main__':
    app.run(debug=True)
