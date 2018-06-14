// const deck = document.querySelector(".deck");
// const startOver = document.querySelector(".restart");
// const moves = document.querySelector(".moves");


 // *** I start with the grid
 //Create an array that holds all of cards pair
let cardsArray = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bomb",];
cardsArray = [...cardsArray, ...cardsArray];

let shuffledCards = shuffle(cardsArray); //  Shuffles all cards and store it in a new array
// let stars = 3;
let moves = 0;
// let matches = 0;
// let time = 0;
// let startTime;

 

//function initGame(){
    const deck = document.querySelector(".deck");
    let openCards =[];
    //create the cards
    for (let i =0; i<shuffledCards.length; i++){
        const card = document.createElement("li");
        card.classList.add("card"); //add class for each card in array
        card.innerHTML = (`<i class="${shuffledCards[i]}"></i>`); //add icons class to each card
        deck.appendChild(card);
        
        card.addEventListener("click", function() {  //add click event for cards
            
            //this card is opened
            if (openCards.length === 1){

                    card.classList.add("open", "show");
                    openCards.push(card); 
                
                    //compare two opened cards
                if (openCards[0].innerHTML === openCards[1].innerHTML){
                    openCards[0].classList.add("match");
                    openCards[1].classList.add("match");

                    openCards = [];

                } 
                else {
                    //if no match - remove classes
                    setTimeout(function(){
                        openCards.forEach(function(card){
                            card.classList.remove("open", "show");
                        });
                        openCards = [];
                    }, 1000);   
                    
                }

            } 
            else {
            //no opened cards
                card.classList.add("open", "show");
                openCards.push(this); 
            }
            
            // prevent double click on card

            
          
        });   
    }
// }
// initGame();
console.log(openCards);









//shuffle the list of cards using the "shuffle" method
//shuffledArray
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
