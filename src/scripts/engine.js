//alert('hello word');
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        gameState: "run",
    },

    actions:{
        timerID: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    if(state.values.currentTime >= 0 && state.values.gameState == "run"){
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
    }
    

    if(state.values.currentTime <= -1 && state.values.gameState == "run"){
        //alert("game Over");
        clearInterval(state.values.currentTime);
        clearInterval(state.values.timerID);
        state.view.timeLeft.textContent = 99;
        state.values.gameState = "stop";
        alert('Game Over! O seu resultado foi: ' + state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare(){

    if(state.values.gameState == "run"){
        state.view.squares.forEach((square) => {
                square.classList.remove("enemy");
            });

            let randomNumber = Math.floor(Math.random() * 9) ;
            let randomSquare = state.view.squares[randomNumber];
            randomSquare.classList.add("enemy");
            state.values.hitPosition = randomSquare.id;
    } else{
        state.view.squares.forEach((square) => {
            square.classList.add("enemy");
        });
    }

    
}

// function moveEnemy(){
//     state.values.timerID = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListnerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            //alert("clicou");
            if (square.id === state.values.hitPosition && state.values.gameState == "run"){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function initialize(){
   // moveEnemy();
    addListnerHitBox();
}

initialize();