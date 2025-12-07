// --- 1. Define Questions (Now 7 Questions) ---
const questions = [
    {
        question: "What is Soham's all-time favourite flavor of ice cream?",
        options: ["Chocolate Chip", "Vanilla", "Pista", "Butterscotch"],
        correctAnswer: "Chocolate Chip"
    },
    {
        question: "What year did we first meet?",
        options: ["2016", "2018", "2019", "2022"],
        correctAnswer: "2022"
    },
    {
        question: "If Soham could only watch one movie for the rest of his life, what would it be?",
        options: ["The Dark Knight", "Inception", "Interstellar", "House Of The dragon"],
        correctAnswer: "The Dark Knight"
    },
    {
        question: "What is the one subject Soham secretly hates?",
        options: ["Physics", "Chemistry", "History", "Math"],
        correctAnswer: "Physics"
    },
    {
        question: "Who is your favourite waifu?",
        options: ["Mikasa AckermaN", "Maki Zenin", "Mia Sakurajima", "Hyuga Hinata"],
        correctAnswer: "Mikasa Ackerman"
    },
    {
        question: "What is Soham's favourite thing to drink during study sessions?",
        options: ["Coffee", "Tea", "Energy Drink", "Water", "Tsunade's Milk"],
        correctAnswer: "water"
    },
    {
        question: "Which valorant character you look alike? HINT:When you wear glasses or search it",
        options: ["Omen", "Chamber", "Sova", "Cypher"],
        correctAnswer: "Chamber"
    }
];

const MAX_SCORE = questions.length; 
const WRONG_MESSAGES = [
    "Oops! Close, but Soham would strongly disagree with that one. Try the next!",
    "Incorrect! That's not the right answer, but don't worry, keep going!",
    "Hmm, I think you missed a detail! That wasn't quite right.",
    "Not quite! Looks like someone needs a refresher on Soham facts. 😉"
];

// --- 2. Variables and DOM Elements ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

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
const feedbackMessage = document.getElementById('feedback-message');
const emojiContainer = document.getElementById('emoji-container');


// --- 3. Core Functions ---

function startHappyAudio() {
    happyAudio.play().catch(e => console.log("Audio playback failed:", e));
}

function loadQuestion() {
    answered = false;
    nextButton.style.display = 'none';
    optionsContainer.innerHTML = '';
    feedbackMessage.style.display = 'none'; // Hide feedback for new question

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
        showFinalScore();
    }
}

function handleAnswer(selectedOption, correctAnswer) {
    if (answered) return; 

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
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        score++;
    } else {
        // Show custom wrong message
        const randomMsg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
        feedbackMessage.textContent = randomMsg;
        feedbackMessage.style.display = 'block';
    }

    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function triggerFloatingEmojis() {
    const emojis = ['🎉', '🎂', '🎈', '🎁', '🥳'];
    const count = 15;

    for (let i = 0; i < count; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add('floating-emoji');
        
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${5 + Math.random() * 8}s`; 
        emoji.style.animationDelay = `${-Math.random() * 5}s`;
        
        emojiContainer.appendChild(emoji);
    }
}

function showFinalScore() {
    happyAudio.pause();
    quizArea.style.display = 'none';
    
    // Update the display to show the score out of 7
    finalResults.querySelector('p').innerHTML = `Your Final Score: <span id="score-display">${score}</span> / ${MAX_SCORE}`;
    
    finalResults.style.display = 'block';
    
    // Start the happy floating emojis
    triggerFloatingEmojis(); 
}

function revealSecret() {
    happyAudio.pause();
    finalResults.style.display = 'none';
    
    secretAudio.play().catch(e => console.log("Secret audio playback failed:", e));

    // ***CUSTOMIZE THIS SECRET MESSAGE!***
    secretText.innerHTML = `
        <p style="font-size: 1.5em; color: #ff4081; font-weight: bold;">
            Dear Soham, Happy Birthday! 
        </p>
        <p style="margin-top: 20px;">
            No matter how many questions you got right, the real secret is this: you are one of the best people I know.
            I treasure our memories, from the silly trips to the late-night talks.
            Thanks for being you. Have an amazing year ahead!
            <br>
            Love, Ayush
        </p>
    `;
    
    secretMessageBox.style.display = 'block';
}

// --- 4. Event Listeners ---
nextButton.addEventListener('click', nextQuestion);
secretButton.addEventListener('click', revealSecret);

yesButton.addEventListener('click', () => {
    // Rickroll URL
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 
});

// NO BUTTON LOGIC (Sad tone and new Rickroll button)
noButton.addEventListener('click', () => {
    // 1. Sad Message
    secretMessageBox.classList.add('sad-message');
    secretText.innerHTML = `
        <p style="font-size: 1.2em; color: #757575;">
            Aww, I'm a little sad you don't want to hear more! 🥲 
        </p>
    `;
    
    // 2. Hide old options
    document.getElementById('more-options').style.display = 'none';

    // 3. Add new sad-tone Rickroll button
    const retryButton = document.createElement('button');
    retryButton.textContent = "But are you SURE? (One last chance to hear more!) 😔";
    retryButton.style.backgroundColor = '#64b5f6'; // Light Blue
    retryButton.style.marginTop = '15px';
    retryButton.style.width = 'auto';
    
    retryButton.addEventListener('click', () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; 
    });

    secretMessageBox.appendChild(retryButton);
});


// --- 5. Initialize the Game ---
loadQuestion();