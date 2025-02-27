const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            {text:"Mumbai" , correct:false},
            {text:"New Delhi" , correct:true},
            {text:"Kolkata" , correct:false},
            {text:"Chennnai" , correct:false}
        ]
    },
    {
        question: "Who is known as the Father of the Nation in India?",
        answers: [
            {text:"Jawaharlal Nehru" , correct:false},
            {text:"Sardar Patel" , correct:false},
            {text:"Mahatma Gandhi" , correct:true},
            {text:"Subhash Chandra Bose" , correct:false}
        ]
    },
    {
        question: "When did India gain independence from British rule?",
        answers: [
            {text:"1942" , correct:false},
            {text:"1945" , correct:false},
            {text:"1950 " , correct:false},
            {text:"1947" , correct:true}
        ]
    },
    {
        question: "Who was the first Prime Minister of India?",
        answers: [
            {text:"Sardar Patel" , correct:false},
            {text:"Indira Gandhi" , correct:false},
            {text:"Jawaharlal Nehru " , correct:false},
            {text:"Dr. B.R. Ambedkar" , correct:true}
        ]
    },
    {
        question: "Which city is known as the Silicon Valley of India?",
        answers: [
            {text:"Hyderabad" , correct:false},
            {text:"Bengaluru" , correct:true},
            {text:"Pune" , correct:false},
            {text:"Chennnai" , correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);  
        if(answer.correct){
            button.dataset.correct = answer.correct; //
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
     nextButton.style.display = "none";
        while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild);
        }
    }

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");    
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
},
)
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out ouf ${questions.length} !!!`
    nextButton.innerHTML = `Restart Quiz`;
    nextButton.style.display = "block";
}

startQuiz();