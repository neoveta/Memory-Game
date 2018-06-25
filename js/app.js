 //Create an array that holds all of the cards pair
let cardsArray = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bomb",];
let cardsDeck = cardsArray.concat(cardsArray); //  Shuffles all cards and store them in a new array
let openCards =[];
let matchedCards = [];
let moves = 0;
let time = 0;
let updateTimer;
let seconds = 0;
let minutesIcon = document.getElementById('minutes');
let secondsIcon = document.getElementById('seconds');
secondsIcon.innerHTML = '00';
minutesIcon.innerHTML = '00';
let firstClick =false;
const deck = document.querySelector(".deck");
const nextMove = document.querySelector('.moves');
nextMove.innerHTML =0;
const timer = document.getElementById('timer');

function startGame(){   //the new game initialization
    //create deck of cards  
    let shuffleArr = shuffle(cardsDeck) ;
    for (let i =0; i<shuffleArr.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");     //add class for each card in array
        card.innerHTML = (`<i class="${cardsDeck[i]}"></i>`);   //add icons class to each card
        deck.appendChild(card);
        clickEv(card); 
    }
} 
startGame();

//click event functionality
function clickEv(card){  
    card.addEventListener("click", function() {  //add click event for card
        //if timer is not set yet - start it. Start timer at the first clik on the card
        if (updateTimer == undefined)
            myTimer(); 
        //open card
        if (openCards.length ===1){
            card.classList.add("open", "show", "disable");  //"disable" prevents double click on card (pointer-events:none)
            openCards.push(card); 
            matchCards();   //compare two opened cards
            } 
        else {
            card.classList.add("open", "show", "disable");
            openCards.push(card); 
        }
    });   
}
//the function that compares two opened cards
function matchCards(){
    if (openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        matchedCards.push(openCards[0],openCards[1]);   //add mathed cards into array for gameWon
        openCards = [];   //reset array
        gameWon();    //here I check if all sets card mathed and opened
    } 
    else {
        setTimeout(function(){    //Wait 800ms then : if no match - remove classes
            openCards.forEach(function(card){
                card.classList.remove("open", "show", "disable");
            });
            openCards = [];   //reset array
        }, 700);      
    }
    movesCounter();     //counting the moves after two cards that were opened 
}

function movesCounter(){      //function to count moves after two cards opened and compared
    moves++;
    nextMove.innerHTML = moves; 
    starRemove();
}

function buildStars(stars){     //the function to remove stars related to the moves
    let allStars = document.querySelector(".stars");
    let star = '<li><i class="fa fa-star"></i></li>';
    let st = ''; 
    for(var i =0; i < stars; ++i)
        st += star;
    allStars.innerHTML = st;
}
buildStars(3);

function  starRemove(){  //remove stars according to moves
     if(moves > 10 && moves <= 15){
        buildStars(2);
    } else if(moves > 15 && moves <= 20){
        buildStars(1);
    }    
}

function calcTimer(seconds){
    const minutes = Math.floor(seconds / 60);
    const secInMin = seconds % 60;
    return [minutes, secInMin];
}

//function to start the timer 
function myTimer(){
    updateTimer = setInterval(function(){  //Update timer in the screen
            seconds++;
            const tm = calcTimer(seconds);
            secondsIcon.innerHTML = (tm[1] < 10) ? `0${tm[1]}` : `${tm[1]}`;
            minutesIcon.innerHTML = (tm[0] < 10) ?  `0${tm[0]}` : `${tm[0]}`;
    },1000);
}
function resetTimer(){
    seconds = 0;
    minutesIcon.innerHTML = "00";
    secondsIcon.innerHTML = "00";
    updateTimer = undefined;
}
function stopTimer() {    //function to clearInterval to stop the timer.
      clearInterval(updateTimer); 
}

//restart game 
const restartIcon = document.querySelector(".restart");
restartIcon.addEventListener("click", function(){
    openCards = [];   //reset array
    moves = 0;
    deck.innerHTML ="";    //remove all cards from desk - open, show, match
    startGame();     //call the function to create the deck with cards
    stopTimer();
    resetTimer();
    nextMove.innerHTML =0;  //reset moves to start over
    buildStars(3);
});

function gameWon(){     //create function that indicates that the game is over (all cards opened and matched in deck)
if(matchedCards.length == cardsDeck.length ){    // creates a modal when all matches have been made
    stopTimer();    //stop timer 
    deck.childNodes.forEach(function(card){
        if (card.classList != undefined)
            card.classList.remove("open", "show", "disable", "match");
    });
    matchedCards = [];
    let modal = document.getElementById('myModal');  
    modal.className=('modalshow'); //call the win modal
    let winText=document.querySelector("#winner");
    let allStars = document.querySelector(".stars");
    const tm = calcTimer(seconds);
    winText.innerHTML = "Congratulations! \nYou won the game! \nYou took "+ tm[0] + " minutes and " + tm[1] + " seconds to win the game in "+ (moves+1) + " moves. Your star rating is " + allStars.childNodes.length +".";
    }
}
//shuffle the list of cards using the "shuffle" method
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;  
}