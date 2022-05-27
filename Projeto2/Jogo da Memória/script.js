const card = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const ul = document.querySelector("ul");
const random = (min, max) => Math.random() * (max - min) + min;
const randomColors = ["#808080", "#DCDCDC", "#D3D3D3"];

for (let i = 0; i < 1000; i++) {
    const li = document.createElement("li");
    const size = Math.floor(random(1, 3));
    const position = random(1, 260);
    const delay = random(30, 1);
    const duration = random(10, 40);

    li.style.width = `${size}px`
    li.style.height = `${size}px`
    li.style.backgroundColor = randomColors[Math.floor(random(0, 3))]
    li.style.left = `${position}%`
    li.style.animationDelay = `${delay}s`
    li.style.animationDuration = `${duration}s`

    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()},)`

    ul.appendChild(li);
}
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        lockBoard = true;
        setTimeout(() => {
        disableCards();
        }, 1500);
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
 
(function shuffle() {
    card.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

card.forEach((card) => {
    card.addEventListener ('click', flipCard);
})