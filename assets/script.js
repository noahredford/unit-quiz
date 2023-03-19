const startScreen = document.querySelector("#start");
const startBtn = document.querySelector("#main-btn");
const infoBox = document.querySelector(".instructions");
const exitBtn = document.querySelector(".end");
const continueBtn = document.querySelector(".retry");
const quizBox = document.querySelector(".main-box");
const endBox = document.querySelector("#quiz-end");
const submitBtn = document.querySelector("#user-score");
const initialsText = document.querySelector("#initials");
var existing = localStorage.getItem('results');
existing = existing ? existing.split(',') : [];
var queCount = 0;
var score = 0;


continueBtn.onclick = ()=>{
    infoBox.classList.add("hide");
    startScreen.classList.remove("hide");
};


startBtn.onclick = () => {
    function countdown(){
        counter--;
            if (counter === 0){
                clearInterval(startCountdown)
                End()
            };
    let timeRem = document.querySelector("#time-rem");
    let timeTag = "<span>Time Left: "+ counter +"</span>"
    timeRem.innerHTML = timeTag;
    };

    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    displayQuestions(queCount)
};


function optionSelected(answer){
    if (queCount>=10){
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if(userAns == correctAns){
        console.log("Correct");
        const userResponse = document.querySelector("#userResponse");
        userResponse.innerHTML = '<div id="userResponse"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    }else{
        console.log("incorrect");
        const userResponse = document.querySelector("#userResponse");
        userResponse.innerHTML = '<div id="userResponse"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
}

function displayQuestions(index){
    if (queCount>=10){
        return;
    }
    const queText = document.querySelector(".que-text");
    const optionList = document.querySelector("#choices");
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function nextQuestion(){
    queCount++;
    if(queCount == 10){
        
        End()
    };
    displayQuestions(queCount);
    const userResponse = document.querySelector("#userResponse");
    userResponse.innerHTML = '<div id="userResponse"><span></span></div>';
    }


function End(){
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    const Text = document.querySelector(".score");
    let Tag = '<h3 class="score"> Your score was '+ score +' out of 10!</h3>';
    Text.innerHTML = Tag; 
}

submitBtn.onclick = () => {
    let initials = initialsText.value;

    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length+1), JSON.stringify(resultsDataObj));
    initialsText.value = ""
    location.reload();
}