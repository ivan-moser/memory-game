// DOM References
const tiles = document.querySelector(".tiles");
const colors = [
    "#FFB3BA", // Pastel Pink
    "#FFDFBA", // Pastel Orange
    "#FFFFBA", // Pastel Yellow
    "#BAFFC9", // Pastel Green
    "#BAE1FF", // Pastel Blue
    "#D4BAFF", // Pastel Purple
    "#FFC1E3", // Pastel Rose
    "#C5E1A5"  // Pastel Lime
];

const allColors = [...colors, ...colors];
let firstTile = null;
let secondTile = null;
let lockBoard = false;
let score = 0;

// Functions
function createTile(color) {
    const tile = document.createElement("div");
    tile.className = "tile covered";
    tile.setAttribute('data-color', color);
    tile.addEventListener("click", flipTile);
    tiles.appendChild(tile);
}

function flipTile(event) {
    const tile = event.target;

    if (lockBoard || !tile.classList.contains('covered') || tile === firstTile) return;

    tile.classList.remove('covered');
    tile.style.backgroundColor = tile.getAttribute("data-color");

    if (!firstTile) {
        firstTile = tile;
        return;
    }

    secondTile = tile;

    checkForMatch();
}

function checkForMatch() {
    if (firstTile.getAttribute("data-color") === secondTile.getAttribute("data-color")) {
        resetTiles();
        score += 2;
        if (score === allColors.length) {
            alert("Hai vinto! ricarica la pagina per giocare di nuovo.")
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstTile.classList.add('covered');
            secondTile.classList.add('covered');
            firstTile.style.backgroundColor = "#222";
            secondTile.style.backgroundColor = "#222";
            resetTiles();
            lockBoard = false;
        }, 1000)
    }
}

function resetTiles() {
    firstTile = null;
    secondTile = null;
}

// Generation of the gaming table

const colorsCopy = [...allColors];

for (let i = 0; i < allColors.length; i++) {
    const randomIndex = Math.floor(Math.random() * colorsCopy.length);
    const randomColor = colorsCopy[randomIndex];
    createTile(randomColor);
    colorsCopy.splice(randomIndex, 1);
}

