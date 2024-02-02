const questions = [
    {
        question : "Which of the following is a linear data structure?",
        answer : [
            {text : "Array", status : "true"},
            {text : "AVL Trees", status : "false"},
            {text : "Binary Trees", status : "false"},
            {text : "Graphs", status : "false"}
        ]
    },
    {
        question : "How is the 2nd element in an array accessed based on pointer notation?",
        answer : [
            {text : "*a + 2", status : "false"},
            {text : "*(*a + 2)", status : "false"},
            {text : "&(a + 2)", status : "false"},
            {text : "*(a + 2)", status : "true"}
        ]
    },
    {
        question : "Which of the following is not the type of queue?",
        answer : [
            {text : "Priority Queue", status : "false"},
            {text : "Single-ended Queue", status : "true"},
            {text : "Circular Queue", status : "false"},
            {text : "Ordinary Queue", status : "false"}
        ]
    },
    {
        question : "From following which is not the operation of data structure?",
        answer : [
            {text : "Operations that manipulate data in some way", status : "true"},
            {text : "Operations that perform a computation", status : "false"},
            {text : "Operations that check for syntax errors", status : "false"},
            {text : "Operations that monitor an object for the occurrence of a controlling event", status : "false"}
        ]
    },
    {
        question : "What is the disadvantage of array data structure?",
        answer : [
            {text : "Elements of an array can be accessed in constant time.", status : "false"},
            {text : "Elements are stored in contiguous memory blocks.", status : "false"},
            {text : "The amount of memory to be allocated should be known beforehand.", status : "true"},
            {text : "Multiple other data structures can be implemented using arrays.", status : "false"}
        ]
    }
]

const quesButton = document.getElementById("question");
const ansButtons = document.getElementById("ans-btn");
const nxtButton = document.getElementById("nxt-btn");

let currQuesInd = 0;
let score = 0;

function startQuiz() {
    readyState();
    
    currQuesInd = 0;
    score = 0;
    nxtButton.innerHTML = "Next";

    showQuestion();
}

function showQuestion() {
    let currQues = questions[currQuesInd];
    let quesNum = currQuesInd + 1;
    quesButton.innerHTML = quesNum + ". " + currQues.question;
    
    currQues.answer.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        
        if(ans.status) {
            button.dataset.status = ans.status;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function readyState() {
    nxtButton.style.display = "none";
    
    while(ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    
    let isCorrect = selectedBtn.dataset.status === "true";
    // document.write(isCorrect)
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(ansButtons.children).forEach(button => {
    if(button.dataset.status === "true") {
        button.classList.add("correct");
    }

    button.disabled = "true";
   })
    
   nxtButton.style.display = "block";
   
}

function showScore() {
    readyState();
    quesButton.innerHTML = `You scored ${score} out of ${questions.length}`;
    nxtButton.innerHTML = "Play Again";
    nxtButton.style.display = "block";
}

function handleQuestions() {
    currQuesInd++;
   
    if(currQuesInd < questions.length) {
        readyState();
        showQuestion();
    }
    else {
        showScore();
    }
}

nxtButton.addEventListener("click", () => {
    if(currQuesInd < questions.length) {
        handleQuestions();
    }
    else {
        startQuiz();
    }

});

startQuiz();