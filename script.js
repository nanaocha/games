const problemElement = document.getElementById("problem");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const messageElement = document.getElementById("message");
const timeLeftElement = document.getElementById("time-left");

let score = 0;
let timeLeft = 30;
let timer;
let correctAnswer; // Store the correct answer separately

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    correctAnswer = num1 + num2; // Store the correct answer
    const problem = `${num1} + ${num2}`;
    problemElement.textContent = problem;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft + " seconds";

        if (timeLeft === 0) {
            clearInterval(timer);
            submitButton.disabled = true;
            messageElement.textContent = "Time's up!";
        }
    }, 1000);
}

submitButton.addEventListener("click", () => {
    const userAnswer = parseInt(answerInput.value);

    if (userAnswer === correctAnswer) {
        score++;
        messageElement.textContent = "Correct!";
    } else {
        messageElement.textContent = "Wrong!";
    }

    answerInput.value = "";
    generateProblem();
});

generateProblem();
startTimer();
