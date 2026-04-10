// idex.js

let display = document.getElementById("display");

// Add values to the display
function appendToDisplay(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Calculate the result
function caculate() {   // (you wrote "caculate", so I kept it same)
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}
