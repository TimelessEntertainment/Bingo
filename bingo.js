// Bingo numbers
const B = Array.from({length: 15}, (_, i) => i + 1);
const I = Array.from({length: 15}, (_, i) => i + 16);
const N = Array.from({length: 15}, (_, i) => i + 31);
const G = Array.from({length: 15}, (_, i) => i + 46);
const O = Array.from({length: 15}, (_, i) => i + 61);

const columns = {B, I, N, G, O};
let calledNumbers = [];
const maxRecent = 5;

const numberGrid = document.getElementById("bingo-grid");
const recentCalls = document.getElementById("recent-calls");

// Build stacked rows
for (let key of ['B','I','N','G','O']) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('letter-row');

    const letterLabel = document.createElement('div');
    letterLabel.classList.add('letter-label');
    letterLabel.innerText = key;
    rowDiv.appendChild(letterLabel);

    const numberRow = document.createElement('div');
    numberRow.classList.add('number-row');

    columns[key].forEach(num => {
        const cell = document.createElement('div');
        cell.classList.add('number-cell');
        cell.id = key + num;
        cell.innerText = num;
        numberRow.appendChild(cell);
    });

    rowDiv.appendChild(numberRow);
    numberGrid.appendChild(rowDiv);
}

// Draw number
document.getElementById("draw-number-btn").addEventListener('click', () => {
    drawNumber();
});

// Reset board
document.getElementById("reset-btn").addEventListener('click', () => {
    resetBoard();
});

function drawNumber() {
    let allNumbers = [];
    for (let k in columns) allNumbers.push(...columns[k]);
    let remaining = allNumbers.filter(n => !calledNumbers.includes(n));
    if (remaining.length === 0) {
        alert("All numbers called!");
        return;
    }
    let randNum = remaining[Math.floor(Math.random() * remaining.length)];
    calledNumbers.push(randNum);

    // highlight
    const letter = Object.keys(columns).find(k => columns[k].includes(randNum));
    const cell = document.getElementById(letter + randNum);
    if (cell) cell.classList.add('called');

    // update recent calls
    const callDiv = document.createElement('div');
    callDiv.classList.add('recent-call');
    callDiv.innerText = letter + randNum;
    recentCalls.prepend(callDiv);
    if (recentCalls.children.length > maxRecent) recentCalls.removeChild(recentCalls.lastChild);
}

function resetBoard() {
    calledNumbers = [];
    document.querySelectorAll('.number-cell').forEach(cell => cell.classList.remove('called'));
    recentCalls.innerHTML = '';
}

