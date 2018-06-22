 //Create an array that holds all of cards pair
let cardsArray = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bomb",];
let cardsDeck = shuffle(cardsArray.concat(cardsArray)); //  Shuffles all cards and store them in a new array
let openCards =[];
let matchedCards = [];
let stars = 3;
let moves = 0;
let time = 0;
let timer;
let firstClick =false;
const deck = document.querySelector(".deck");

//new game initialization
function startGame(){
    //create deck of cards  
    const deck = document.querySelector(".deck");
    for (let i =0; i<cardsDeck.length; i++){
        const card = document.createElement("li");
        card.classList.add("card"); //add class for each card in array
        card.innerHTML = (`<i class="${cardsDeck[i]}"></i>`); //add icons class to each card
        deck.appendChild(card);
        clickEv(card); 
    }
} 
startGame();

//click event
function clickEv(card){   
  //document.querySelectorAll("li.card").forEach(function(card){
    card.addEventListener("click", function() {  //add click event for cards
        //myTimer();
         //open card
        if (openCards.length ===1){
            card.classList.add("open", "show");
            openCards.push(card); 
            movesCounter(); //counting the moves after two cards that were opened 

                //compare two opened cards
                if (openCards[0].innerHTML == openCards[1].innerHTML){
                    openCards[0].classList.add("match");
                    openCards[1].classList.add("match");

                    //add mathed cards into array for gameFinished
                    matchedCards.push(openCards[0],openCards[1]);

                    openCards = []; //reset array
                    gameOver(); //here I check if all sets card mathed and opened

                } 
                else {
                    //Wait 800ms then : if no match - remove classes.
                    setTimeout(function(){
                        openCards.forEach(function(card){
                            card.classList.remove("open", "show");
                        });
                        openCards = []; //reset array
                        //TODO card.removeEventListener()
                    }, 800);   
                    
                }

            } 
            else {
            //no opened cards
                card.classList.add("open", "show");
                openCards.push(this); 
                //TODO card.removeEventListener()
            }
            //prevent double click on card 
            // ??? card.classList.toggle("disabled"); 
            //prevent to open more that two cards at one step
        });   
    }

//function for "stars" functionality. Remove star related to number of steps
function starRemove() {
    if (moves === 10 || moves === 15 || moves === 20 ) {
       let allStars = document.querySelectorAll("ul.stars li")
       document.querySelector("ul.stars").removeChild(allStars[0]);         
    }
}

function movesCounter(){      
    let nextMove = document.querySelector('.moves');
    moves++;
    nextMove.innerHTML = moves; 
    starRemove();
}



// function myTimer(){
//     timer = setInterval(function(){
//     time++;
//const minutes = Math.floor(time / 60);
//const seconds = time % 60;
// //console.log(time);
//     },1000);
// }
// function resetTimer(){
//     clearInterval(timer);
// }

let resetBtn = document.getElementById("btn");
resetBtn.addEventListener("click", function(){
    // resetTimer();
    // myTimer();
    moves = 0;
    openCards = [];
    stars = 3;  
//remove all cards from desk - open, show, match
//for (let i =0; i<shuffledCards.length; i++){
    //card.classList.remove("open", "show", "match");
//}
});

 //create function that indicates that the game is over (all cards opened)
 function gameOver(){
    if(matchedCards.length === cardsArray.length){ // let matchedCards =[]; if(matchedCards === 16)
        alert("Game is Won!");
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
