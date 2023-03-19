
var scores = document.querySelector("#high-scores");
let actualScore = '';


for (let i = 0; i < localStorage.length; i++) {
highScoreData = JSON.parse(localStorage.getItem(i+1));
actualScore = actualScore.concat('</br><div id="high-scores">'+ highScoreData.initials + " "+"-"+" " + highScoreData.score +'</div>');
};

scores.innerHTML = actualScore;