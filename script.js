const prefixes = [
    { question: "ตัวเลข 10⁻¹⁵ หมายถึงคำอุปสรรคอะไร?", correct: "เฟมโต", options: ["เฟมโต", "พิโค", "นาโน", "ไมโคร"] },
    { question: "ตัวเลข 10⁻¹² หมายถึงคำอุปสรรคอะไร?", correct: "พิโค", options: ["พิโค", "นาโน", "ไมโคร", "มิลลิ"] },
    { question: "ตัวเลข 10⁻⁹ หมายถึงคำอุปสรรคอะไร?", correct: "นาโน", options: ["นาโน", "ไมโคร", "มิลลิ", "เซนติ"] },
    { question: "ตัวเลข 10⁻⁶ หมายถึงคำอุปสรรคอะไร?", correct: "ไมโคร", options: ["ไมโคร", "นาโน", "พิโค", "มิลลิ"] },
    { question: "ตัวเลข 10⁻³ หมายถึงคำอุปสรรคอะไร?", correct: "มิลลิ", options: ["มิลลิ", "ไมโคร", "เซนติ", "เดซิ"] },
    { question: "คำอุปสรรค 'เฟมโต' หมายถึงตัวเลขอะไร?", correct: "10⁻¹⁵", options: ["10⁻¹⁵", "10⁻¹²", "10⁻⁹", "10⁻⁶"] },
    { question: "คำอุปสรรค 'พิโค' หมายถึงตัวเลขอะไร?", correct: "10⁻¹²", options: ["10⁻¹²", "10⁻¹⁵", "10⁻⁹", "10⁻⁶"] },
    { question: "คำอุปสรรค 'นาโน' หมายถึงตัวเลขอะไร?", correct: "10⁻⁹", options: ["10⁻⁹", "10⁻⁶", "10⁻¹²", "10⁻³"] },
    { question: "คำอุปสรรค 'ไมโคร' หมายถึงตัวเลขอะไร?", correct: "10⁻⁶", options: ["10⁻⁶", "10⁻³", "10⁻⁹", "10⁻¹²"] }
];

let score = 0;
let totalQuestions = 0;
let currentQuestions = [];
let currentQuestionIndex = 0;
let timer = 0;
let timerInterval;

// ฟังก์ชันเริ่มเกม
function startGame(questionsCount) {
    score = 0;
    totalQuestions = questionsCount;
    currentQuestionIndex = 0;
    timer = 0;

    currentQuestions = shuffle([...prefixes]).slice(0, questionsCount);

    document.getElementById("setup-container").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    document.getElementById("start-over-button").classList.add("hidden");

    document.getElementById("score-box").textContent = `คะแนน: ${score}`;
    document.getElementById("timer-box").textContent = `เวลา: ${timer} วินาที`;

    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer-box").textContent = `เวลา: ${timer} วินาที`;
    }, 1000);

    loadQuestion();
}

// โหลดคำถาม
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const questionElement = document.getElementById("question");
    const buttons = document.querySelectorAll(".answer-button");
    const currentQuestion = currentQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    const shuffledOptions = shuffle([...currentQuestion.options]);
    buttons.forEach((button, index) => {
        button.textContent = shuffledOptions[index];
        button.onclick = () => checkAnswer(button.textContent, currentQuestion.correct);
    });

    currentQuestionIndex++;
}

// ตรวจสอบคำตอบ
function checkAnswer(selectedAnswer, correctAnswer) {
    const resultElement = document.getElementById("result");

    if (selectedAnswer === correctAnswer) {
        resultElement.textContent = `ถูกต้อง! คำตอบคือ ${correctAnswer}`;
        resultElement.className = "result-box correct";
        score++;
        document.getElementById("score-box").textContent = `คะแนน: ${score}`;
    } else {
        resultElement.textContent = `ผิด! คำตอบที่ถูกต้องคือ ${correctAnswer}`;
        resultElement.className = "result-box wrong";
    }

    setTimeout(() => {
        resultElement.textContent = "";
        loadQuestion();
    }, 1000);
}

// จบเกม
function endGame() {
    clearInterval(timerInterval);

    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("summary-popup").classList.remove("hidden");

    document.getElementById("summary-score").textContent = `คุณทำคะแนนได้ ${score}/${totalQuestions} ในเวลา ${timer} วินาที`;
}

// สุ่มตัวเลือก
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Event listeners
document.querySelectorAll(".setup-button").forEach(button => {
    button.addEventListener("click", () => {
        const questionsCount = parseInt(button.getAttribute("data-questions"));
        startGame(questionsCount);
    });
});

document.getElementById("start-over-button").addEventListener("click", () => {
    document.getElementById("setup-container").classList.remove("hidden");
    document.getElementById("result").textContent = "";
    document.getElementById("summary-popup").classList.add("hidden");
});

document.getElementById("close-popup-button").addEventListener("click", () => {
    document.getElementById("summary-popup").classList.add("hidden");
    document.getElementById("start-over-button").classList.remove("hidden");
});