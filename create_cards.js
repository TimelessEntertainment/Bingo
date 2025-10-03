const fs = require('fs');

// Configuration
const category = '00s';
const numCards = 100; // number of sheets (we’ll do 2 cards per sheet)
const gridSize = 5;   // 5x5 bingo grid

// Read playlist
const songs = JSON.parse(fs.readFileSync(`${category}_songs.json`, 'utf-8'));

// Helper: shuffle array
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Generate cards
const cards = {};
for (let i = 1; i <= numCards * 2; i++) { // 2 cards per sheet
  const shuffled = shuffle([...songs]);
  const selected = shuffled.slice(0, 24).map(s => s.title); // 24 songs
  const grid = [];

  for (let r = 0; r < gridSize; r++) {
    const row = [];
    for (let c = 0; c < gridSize; c++) {
      if (r === 2 && c === 2) {
        row.push("FREE"); // center square
      } else {
        row.push(selected.pop());
      }
    }
    grid.push(row);
  }

  cards[i] = grid;
}

// Save cards JSON
fs.writeFileSync(`${category}_cards.json`, JSON.stringify(cards, null, 2));
console.log(`Generated ${numCards * 2} bingo cards in ${category}_cards.json`);

