const questions = [
    { question: "What is my favorite color?", options: ["Red", "Lavender", "White", "Black"], correctAnswer: "Lavender" },
    { question: "What is my favorite food?", options: ["Pizza", "Butter Chicken", "White Sauce Pasta", "Paneer Butter Masala"], correctAnswer: "Butter Chicken" },
    { question: "What is my favorite season?", options: ["Spring", "Summer", "Monsoon", "Winter"], correctAnswer: "Winter" },
    { question: "What is my favorite animal?", options: ["Dog", "Cat", "Bird", "Cow"], correctAnswer: "Dog" },
    { question: "What is my favorite movie genre?", options: ["Action", "Romance", "Comedy", "Horror"], correctAnswer: "Comedy" },
    { question: "What is my favorite place?", options: ["Beach", "Mountain", "City", "Countryside"], correctAnswer: "Mountain" },
    { question: "What is my favorite song?", options: ["Tu Hai Kahan", "Main Pal Do Pal Ka", "Afreen Afreen", "Haryanvi Song"], correctAnswer: "Tu Hai Kahan" },
    { question: "What is my favorite time of day?", options: ["Morning", "Afternoon", "Evening", "Night"], correctAnswer: "Evening" },
    { question: "What is my favorite coffee?", options: ["Espresso", "Latte", "Cappuccino", "Americano"], correctAnswer: "Latte" },
    { question: "What is my favorite sport?", options: ["Badminton", "Basketball", "Chess", "Cricket"], correctAnswer: "Cricket" },
    { question: "What is my dream vacation destination?", options: ["Paris", "Bali", "Tokyo", "Switzerland"], correctAnswer: "Switzerland" },
    { question: "What is my favorite book genre?", options: ["Fiction", "Non-Fiction", "Mystery", "Fantasy"], correctAnswer: "Mystery" },
    { question: "What is my favorite hobby?", options: ["Reading", "Traveling", "Cooking", "Gardening"], correctAnswer: "Traveling" },
    { question: "What is my favorite ice cream flavor?", options: ["Vanilla", "Chocolate", "Strawberry", "Mint"], correctAnswer: "Vanilla" },
    { question: "What is my favorite animal to see in a zoo?", options: ["Lion", "Elephant", "Giraffe", "Penguin"], correctAnswer: "Elephant" },
    { question: "What is my favorite holiday?", options: ["Navratri", "Diwali", "Chhath Puja", "Holi"], correctAnswer: "Chhath Puja" }
];

// To track the current question
let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion(index) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Clear the quiz container

    const questionObj = questions[index];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    // Create question text
    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${questionObj.question}`;
    questionDiv.appendChild(questionText);

    // Create options
    questionObj.options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question${index}`;
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        label.addEventListener('change', () => handleAnswer(index, option));

        questionDiv.appendChild(label);
    });

    quizContainer.appendChild(questionDiv);
}

function handleAnswer(questionIndex, selectedOption) {
    // Store the answer
    userAnswers[questionIndex] = selectedOption;

    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, load the next one
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        // Show submit button
        document.getElementById('submitButton').style.display = 'block';
    }
}

function submitQuiz() {
    let score = 0; // Initialize score
    const summary = userAnswers.map((answer, index) => {
        const correctAnswer = questions[index].correctAnswer;
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            score++; // Increase score for correct answer
        }
        return `${questions[index].question} <br>Your answer: ${answer} <br>Correct answer: ${correctAnswer} <br>Status: ${isCorrect ? 'Correct' : 'Incorrect'}`;
    }).join('<br><br>');

    let message = "";
    if (score >= 13) {
        message = "Wow, you really know me well! Perfect or near-perfect score!";
    } else if (score >= 10) {
        message = "You did great! You know me quite well!";
    } else if (score >= 6) {
        message = "Not bad, but there's room for improvement!";
    } else {
        message = "Hmm, maybe we need to hang out more! 😉";
    }

    const creativity = `
        <div style="text-align:center; font-size: 18px; margin-top: 20px;">
            <h2>🎉 You've completed the quiz! 🎉</h2>
            <p>Your Score: ${score} out of ${questions.length}</p>
            <p>${message}</p>
            <p>Here's a little summary of your choices:</p>
            <div style="background-color: #ffefef; padding: 20px; border-radius: 10px;">
                ${summary}
            </div>
            <p style="font-weight: bold;">Thanks for playing! 💖</p>
            <p>Remember, every answer reveals a little more about what makes you special!</p>
        </div>
    `;

    document.getElementById('message').innerHTML = creativity;
    document.getElementById('result').style.display = 'block';
}

// Initially load the first question
window.onload = function() {
    loadQuestion(currentQuestionIndex);
};