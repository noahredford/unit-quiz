var startScreen = document.querySelector("#start");
var startBtn = document.querySelector("#main-btn");
var infoBox = document.querySelector(".instructions");
var exitBtn = document.querySelector(".end");
var continueBtn = document.querySelector(".retry");
var quizBox = document.querySelector(".main-box");
var endBox = document.querySelector("#quiz-end");
var submitBtn = document.querySelector("#user-score");
var initialsText = document.querySelector("#initials");
var existing = localStorage.getItem('results');
existing = existing ? existing.split(',') : [];
var timerCounter = 0;
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
    displayQuestions(timerCounter)
};


function optionSelected(answer){
    if (timerCounter>=10){
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[timerCounter].answer;
    if(userAns == correctAns){
        console.log("Correct");
        var userResponse = document.querySelector("#userResponse");
        userResponse.innerHTML = '<div id="userResponse"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    }else{
        console.log("incorrect");
        var userResponse = document.querySelector("#userResponse");
        userResponse.innerHTML = '<div id="userResponse"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
}

function displayQuestions(index){
    if (timerCounter>=10){
        return;
    }
    var queText = document.querySelector(".que-text");
    var optionList = document.querySelector("#choices");
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    var option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function nextQuestion(){
    timerCounter++;
    if(timerCounter == 10){
        
        End()
    };
    displayQuestions(timerCounter);
    var userResponse = document.querySelector("#userResponse");
    userResponse.innerHTML = '<div id="userResponse"><span></span></div>';
    }


function End(){
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    var Text = document.querySelector(".score");
    let Tag = '<h3 class="score"> Your score is '+ score +'!</h3>';
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