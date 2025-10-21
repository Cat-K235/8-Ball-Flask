from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

ANSWERS = [
    "It is certain.",
    "Without a doubt.",
    "Yes — definitely.",
    "You may rely on it.",
    "Outlook good.",
    "Most likely.",
    "Signs point to yes.",
    "Ask again later.",
    "Cannot predict now.",
    "Better not tell you now.",
    "Don't count on it.",
    "My reply is no.",
    "Outlook not so good.",
    "Very doubtful."
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/answer', methods=['POST'])
def answer():
    data = request.get_json(silent=True) or {}
    chosen = random.choice(ANSWERS)
    return jsonify({'answer': chosen})

if __name__ == '__main__':
    app.run(debug=True)
