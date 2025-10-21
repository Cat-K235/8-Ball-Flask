const shakeBtn = document.getElementById('shake');
const ball = document.getElementById('ball');
const display = document.getElementById('display');
const answerEl = display.querySelector('.answer');
const questionInput = document.getElementById('question');

async function askQuestion() {
  const question = questionInput.value.trim();

  // Reset to show 8
  display.classList.remove('show-answer');
  answerEl.textContent = '';

  // Shake animation
  ball.classList.remove('shake');
  void ball.offsetWidth;
  ball.classList.add('shake');

  try {
    const resp = await fetch('/answer', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ question })
    });
    const data = await resp.json();

    // After shaking, reveal the answer
    setTimeout(() => {
      answerEl.textContent = data.answer;
      display.classList.add('show-answer');
      ball.classList.remove('shake');
    }, 900);
  } catch (err) {
    setTimeout(() => {
      answerEl.textContent = 'Network error.';
      display.classList.add('show-answer');
      ball.classList.remove('shake');
    }, 900);
  }
}

shakeBtn.addEventListener('click', askQuestion);
questionInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') askQuestion();
});
