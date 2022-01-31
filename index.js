// Initialisation. You can actually call functions even before the function is defined, as long as 
// they are all within this script. This is probably because everything is run at the same time in 
// JS when loading in HTML. But the hierarchy of the functions is still maintained e.g. from global --> local

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById('message-el')
let cardsEl = document.getElementById('cards-el')
let sumEl = document.querySelector('#sum-el') 
// querySelector is more general; 'Selector' means CSS selector. '#' represents element. 
// Other than classes, can even select the whole HTML element e.g. body, h1... 

// Creating player objects. A dict is like a class?
let player = {
    name:"ZY",
    chips:888,
    sayHello: function() {
        console.log('hello') // method within an object. Player.sayHello() should print out in console
    }
} 

let playerEl = document.getElementById('player-el')
playerEl.textContent = player.name + ': $' + player.chips //alternate notation is player["chips"], bracket notation vs dot notation.

function getRandomCard() {
    // Good to put the draw of the card in a function because will have to edit the 
    // values of each card e.g. J Q Ks are all 10s
    let card_value = Math.ceil(Math.random() * 13) // Returns values from 1-13
    
    if (card_value >= 11) {
        return 10
    } else if (card_value === 1) {
        return 11
    } else {
        return card_value
    }
}

function startGame() {
    // This function does the initialisation of the values for a typical blackjack game,
    // as long as the player wants to start the game. Wouldn't make sense to show all these
    // values when the game hasn't been started yet.
    
    isAlive = true
    
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard] // Complex datatype, can combine diff dtypes in one array. Arrays are ordered list of items. So it's like a list in python, where sets are the unordered lists?
    cards.push(6) // This function on a class is specific to the object itself, and cannot be put into another object without modifying the original object.
    console.log(cards.length) // Arrays are a class of it's own, with .length as a 'method' of the class
    cards.pop() // Just the last item in the array. If you assign a variable to this, will store popped element into variable.
    console.log(cards.length) 
    console.log(cards) 
    sum = firstCard + secondCard

    renderGame()

}

function newCard() {
    if (isAlive === true && hasBlackJack === false && cards.length <= 5) {
        // && is logical AND. & is bitwise AND, which is rarely used
        // || is logical OR.
        console.log('Drawing a new card')
        let drawnCard = getRandomCard()
        sum += drawnCard

        // Push card to card array when drawing new card
        cards.push(drawnCard)
        
        renderGame()
    } 
}


function renderGame() {
    // Counting. Need to specify from where start counting, where to stop, and what the step size should be
    cardsEl.textContent = 'Cards: ' 
    sumEl.textContent = "Sum: " + sum
    
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + ' '
    }

    if (sum <= 20) {
        message = "Do you want to draw a card?"
    } else if (sum === 21) {
        message = "Woohoo, you've got a Blackjack!"
        hasBlackJack = true
    } else {
        message = "You boomed."
        isAlive = false
    }
    
    messageEl.textContent = message
    
}