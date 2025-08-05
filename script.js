// Get all the necessary DOM elements
const numDiceInput = document.getElementById('numDice');
const numSidesInput = document.getElementById('numSides');
const numPlayersInput = document.getElementById('numPlayers');
const addPlayerBtn = document.getElementById('addPlayerBtn');
const playersInputContainer = document.getElementById('players-input-container');
const startGameBtn = document.getElementById('startGameBtn');
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceContainer = document.getElementById('dice-container');
const resultsDiv = document.getElementById('results');
const scoreboardContainer = document.getElementById('scoreboard-container');
const scoreboardList = document.getElementById('scoreboard');

let players = [];
let currentPlayerIndex = 0;
let numDice, numSides;
let turnsPlayed = 0;

// Function to add player name input fields
function createPlayerInputs() {
    playersInputContainer.innerHTML = '';
    const numPlayers = parseInt(numPlayersInput.value);
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.id = `player-${i}`;
        playersInputContainer.appendChild(input);
    }
}

addPlayerBtn.addEventListener('click', createPlayerInputs);

startGameBtn.addEventListener('click', () => {
    numDice = parseInt(numDiceInput.value);
    numSides = parseInt(numSidesInput.value);
    
    players = [];
    const playerInputs = playersInputContainer.querySelectorAll('input');
    playerInputs.forEach(input => {
        const name = input.value.trim() || `Player ${players.length + 1}`;
        players.push({ name: name, score: 0 });
    });

    if (players.length === 0) {
        resultsDiv.textContent = "Please add at least one player.";
        return;
    }

    document.querySelector('.setup-section').style.display = 'none';
    playersInputContainer.style.display = 'none';
    startGameBtn.style.display = 'none';
    
    rollDiceBtn.style.display = 'block';
    scoreboardContainer.style.display = 'block';

    resultsDiv.textContent = `${players[currentPlayerIndex].name}'s turn!`;
    updateScoreboard();
});

rollDiceBtn.addEventListener('click', () => {
    // Disable the button to prevent multiple clicks during the animation
    rollDiceBtn.disabled = true;

    // Show a rolling animation
    diceContainer.innerHTML = '';
    for (let i = 0; i < numDice; i++) {
        const rollingDice = document.createElement('span');
        rollingDice.className = 'dice';
        rollingDice.style.animationName = 'rolling';
        rollingDice.textContent = '?';
        diceContainer.appendChild(rollingDice);
    }

    // Wait for the animation to finish before showing the results
    setTimeout(() => {
        const diceRolls = [];
        let totalRoll = 0;
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            diceRolls.push(roll);
            totalRoll += roll;
        }

        players[currentPlayerIndex].score += totalRoll;

        // Update the dice display with final numbers
        diceContainer.innerHTML = diceRolls.map(roll => `<span class="dice">${roll}</span>`).join('');
        resultsDiv.textContent = `${players[currentPlayerIndex].name} rolled a total of ${totalRoll}!`;
        
        updateScoreboard();

        // Move to the next player
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        
        // Re-enable the button
        rollDiceBtn.disabled = false;
        
        setTimeout(() => {
            resultsDiv.textContent = `${players[currentPlayerIndex].name}'s turn!`;
        }, 1500); // Wait 1.5 seconds before showing next player's turn
    }, 1000); // Wait 1 second for the rolling animation to play
});

function updateScoreboard() {
    scoreboardList.innerHTML = '';
    players.sort((a, b) => b.score - a.score);
    
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.score}`;
        scoreboardList.appendChild(li);
    });
}

// Initial setup on page load
createPlayerInputs();