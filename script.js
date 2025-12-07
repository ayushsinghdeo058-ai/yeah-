// --- 1. Define Questions (Now 7 Questions) ---
const questions = [
    {
        question: "What is Soham's all-time favourite flavor of ice cream?",
        options: ["Chocolate Chip Cookie", "Vanilla", "Pista", "Butterscotch"],
        correctAnswer: "Chocolate Chip Cookie"
    },
    {
        question: "What year did we first meet?",
        options: ["2016", "2018", "2019", "2022"],
        correctAnswer: "2022"
    },
    {
        question: "If Soham could only watch one movie for the rest of his life, what would it be?",
        options: ["The Dark Knight", "Inception", "Interstellar", "Sholay"],
        correctAnswer: "The Dark Knight"
    },
    {
        question: "What is the one subject Soham secretly hates?",
        options: ["Physics", "Chemistry", "History", "Math"],
        correctAnswer: "physics"
    },
    {
        question: "Who is your favourite waifu?",
        options: ["Mia sakurajima", "Mikasa Ackerman", "Cha-hae-in", "Maki zenin"],
        correctAnswer: "Cha-hae-in"
    },
    {
        question: "What is Soham's favourite thing to drink during study sessions?", // New Question 6
        options: ["Coffee", "Tea", "Energy Drink", "Water"],
        correctAnswer: "Water,Duh!"
    },
    {
        question: "Which valorant you look alike? Hint:When you wear glasses and also search", // New Question 7
        options: ["Sova", "Chamber", "Omen", "Cypher"],
        correctAnswer: "Chamber"
    }
];

// --- 2. Variables and DOM Elements ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
// Max score is now 7
const MAX_SCORE = questions.length; 

const happyAudio = document.getElementById('happy-track');
const secretAudio = document.getElementById('secret-track');

const quizArea = document.getElementById('quiz-area');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const finalResults = document.getElementById('final-results');
const scoreDisplay = document.getElementById('score-display');
const secretButton = document.getElementById('secret-button');
const secretMessageBox = document.getElementById('secret-message-box');
const secretText = document.getElementById('secret-text');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');


// --- 3. Core Functions ---

// Function to start playing the happy audio track
function startHappyAudio() {
    happyAudio.play().catch(e => console.log("Audio playback failed:", e));
}

// Function to load and display the current question
function loadQuestion() {
    answered = false;
    nextButton.style.display = 'none';
    optionsContainer.innerHTML = ''; // Clear previous options

    if (currentQuestionIndex < MAX_SCORE) {
        const currentQ = questions[currentQuestionIndex];
        questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQ.question}`;
        
        currentQ.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(option, currentQ.correctAnswer));
            optionsContainer.appendChild(button);
        });
    } else {
        // All questions answered, show results
        showFinalScore();
    }
}

// Function to handle answer click
function handleAnswer(selectedOption, correctAnswer) {
    if (answered) return; 

    // Start audio on the very first interaction
    if (currentQuestionIndex === 0) {
        startHappyAudio();
    }

    answered = true;
    const allButtons = optionsContainer.querySelectorAll('button');

    allButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Disable all buttons
    });

    if (selectedOption === correctAnswer) {
        score++;
    }

    nextButton.style.display = 'block';
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Function to show the final score screen
function showFinalScore() {
    happyAudio.pause(); // Pause the happy music
    quizArea.style.display = 'none';
    
    // Update the display to show the score out of 7
    finalResults.querySelector('p').innerHTML = `Your Final Score: <span id="score-display">${score}</span> / ${MAX_SCORE}`;
    
    finalResults.style.display = 'block';
}

// Function to reveal the secret message
function revealSecret() {
    happyAudio.pause();
    finalResults.style.display = 'none';
    
    secretAudio.play().catch(e => console.log("Secret audio playback failed:", e));

    // YOUR SECRET MESSAGE TO SOHAM GOES HERE! (Same as before)
    secretText.innerHTML = `
        <p style="font-size: 1.5em; color: #ff4081; font-weight: bold;">
            Dear Soham, Happy Birthday! 
        </p>
        <p style="margin-top: 20px;">
            No matter how many questions you got right, the real secret is this: you are one of the best people I know.
            I treasure our memories, from the silly trips,the late-night talks to the time we spend at hostel.
            Thanks for being you. Have an amazing year ahead!King
            <br>
            Your friend, Ayush
        </p>
    `;
    
    secretMessageBox.style.display = 'block';
}

// --- 4. Event Listeners ---
nextButton.addEventListener('click', nextQuestion);
secretButton.addEventListener('click', revealSecret);

yesButton.addEventListener('click', () => {
    // The infamous Rickroll URL
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 
});

noButton.addEventListener('click', () => {
    secretText.innerHTML = `
        <p style="font-size: 1.2em; color: #757575;">
            Aww, I'm a little sad you don't want to hear more! 🥲 
            That's okay, maybe next time! Just enjoy your amazing day!
        </p>
    `;
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
});


// --- 5. Initialize the Game ---
loadQuestion();