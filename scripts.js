const cards =document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockboard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard){
        //firstClick
        hasFlippedCard = true;
        firstCard = this;

        return
    } 
    //secondClick
    hasFlippedCard = false;
    secondCard = this;

    //do cards match?
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards(){
    lockboard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockboard = false;
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockboard] = [false, false];
    [firstCard, secondCard] = [null. null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));