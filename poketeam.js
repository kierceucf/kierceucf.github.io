// Cache object to minimize API calls
const cache = {};

const input = document.getElementById("pokemonInput");
const findBtn = document.getElementById("findBtn");
const display = document.getElementById("pokemonDisplay");
const cry = document.getElementById("pokemonCry");
const moveSelectors = document.getElementById("moveSelectors");
const addBtn = document.getElementById("addBtn");

let currentPokemon = null;

findBtn.addEventListener("click", fetchPokemon);

async function fetchPokemon() {
    const value = input.value.toLowerCase().trim();
    if (!value) return;

    // Check cache first
    if (cache[value]) {
        loadPokemon(cache[value]);
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
        if (!response.ok) throw new Error("Pokemon not found");

        const data = await response.json();

        cache[value] = data; // store in cache
        loadPokemon(data);

    } catch (error) {
        alert("Pokemon not found!");
    }
}

function loadPokemon(data) {
    currentPokemon = data;

    // Only display image (no name)
    display.innerHTML = `
        <img src="${data.sprites.front_default}">
    `;

    // Load cry audio
    cry.src = data.cries.latest || "";

    // Clear old dropdowns
    moveSelectors.innerHTML = "";

    const moves = data.moves.slice(0, 20);

    for (let i = 0; i < 4; i++) {
        const select = document.createElement("select");

        moves.forEach(move => {
            const option = document.createElement("option");
            option.value = move.move.name;
            option.textContent = move.move.name;
            select.appendChild(option);
        });

        moveSelectors.appendChild(select);
    }
}

addBtn.addEventListener("click", function () {
    if (!currentPokemon) return;

    const selects = moveSelectors.querySelectorAll("select");
    const selectedMoves = [];

    selects.forEach(select => {
        selectedMoves.push(select.value);
    });

    // Get table body
    const tableBody = document.querySelector("#teamTable tbody");

    // Create new row
    const row = document.createElement("tr");

    // Create image cell
    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = currentPokemon.sprites.front_default;
    imgCell.appendChild(img);

    // Create moves cell
    const movesCell = document.createElement("td");
    const ul = document.createElement("ul");

    selectedMoves.forEach(move => {
        const li = document.createElement("li");
        li.textContent = move;
        ul.appendChild(li);
    });

    movesCell.appendChild(ul);

    // Add cells to row
    row.appendChild(imgCell);
    row.appendChild(movesCell);

    // Add row to table
    tableBody.appendChild(row);
});