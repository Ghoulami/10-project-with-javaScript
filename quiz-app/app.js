//Data
class Quiz {
  constructor(question, a, b, c, d, correct) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.correct = correct;
  }
}

const quizDate = [
  new Quiz(
    "What is the most poppuler lanuge in 2019",
    "JavaScript",
    "Python",
    "Java",
    "C",
    "a"
  ),
  new Quiz(
    "Who is the president of US",
    "Mehdi Ghoulami",
    "Donald Trump",
    "Leonel Messi",
    "Rick sunshez",
    "b"
  ),
  new Quiz(
    "Wath is the real name of Spider Man",
    "Nick Fury",
    "May Parker",
    "Peter Parker",
    "MJ",
    "c"
  ),
  new Quiz(
    "what is distance between earth and sun",
    "149,600,000 KM",
    "139,600,000 KM",
    "149,600,100 KM",
    "149,600,500 KM",
    "a"
  ),
];

let currentQuestion = 0;
let score = 0;

//selectors
const questionText = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const answersEl = [...document.getElementsByClassName("answer")];
const quizContainer = document.getElementById("quiz");

//eventListner
loadQuestion();
submitBtn.addEventListener("click", () => {
  const selected = getSelected();
  if (selected) {
    if (selected === quizDate[currentQuestion].correct) {
      score++;
      console.log(score);
    }
    currentQuestion++;
    if (currentQuestion < quizDate.length) {
      console.log(selected);
      loadQuestion();
    } else {
      quizContainer.innerHTML = `
        <h2>You answered correctly at ${score} / ${quizDate.length} questions </h2>.
        <button onclick="location.reload()">Reload</button>
      `;
    }
  }
});

//function
function loadQuestion() {
  const currentQuiz = quizDate[currentQuestion];
  questionText.innerHTML = currentQuiz.question;
  a_text.innerHTML = currentQuiz.a;
  b_text.innerHTML = currentQuiz.b;
  c_text.innerHTML = currentQuiz.c;
  d_text.innerHTML = currentQuiz.d;
  deselectInswers();
}

function getSelected() {
  let answer = undefined;
  answersEl.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectInswers() {
  answersEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}
