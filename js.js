let counter = 0;

/* Simple Functions */

function tickUp() {
    counter++;
    document.getElementById("counter").textContent = counter;
}

function tickDown() {
    counter--;
    document.getElementById("counter").textContent = counter;
}

/* For Loop */

function runForLoop() {
    let output = "";

    for (let i = 0; i <= counter; i++) {
        output += i + " ";
    }

    document.getElementById("forLoopResult").textContent = output.trim();
}

/* Conditional Repitition */

function showOddNumbers() {
    let output = "";

    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) {
            output += i + " ";
        }
    }

    document.getElementById("oddNumberResult").textContent = output.trim();
}

/* Arrays */

function addMultiplesToArray() {
    let multiples = [];

    for (let i = 5; i <= counter; i += 5) {
        multiples.unshift(i); // adds to front to keep reverse order
    }

    console.log(multiples);
}

/* Objects and Form- */

function printCarObject() {
    let car = {
        cType: document.getElementById("carType").value,
        cMPG: document.getElementById("carMPG").value,
        cColor: document.getElementById("carColor").value
    };

    console.log(car);
}


function loadCar(num) {
    let selectedCar;

    if (num === 1) selectedCar = carObject1;
    if (num === 2) selectedCar = carObject2;
    if (num === 3) selectedCar = carObject3;

    document.getElementById("carType").value = selectedCar.cType;
    document.getElementById("carMPG").value = selectedCar.cMPG;
    document.getElementById("carColor").value = selectedCar.cColor;
}

/* Styles */

function changeColor(num) {
    let paragraph = document.getElementById("styleParagraph");

    if (num === 1) paragraph.style.color = "red";
    if (num === 2) paragraph.style.color = "green";
    if (num === 3) paragraph.style.color = "blue";
}
