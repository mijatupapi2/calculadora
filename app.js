const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let selectedOperator = null;
let storedOperand = null;

function updateDisplay(value) {
    display.value = String(value);
}

function calculate() {
    if (selectedOperator == null || currentInput == "" || storedOperand == null) {
        return;
    }

    let result = 0;
    const firstOperand = Number(storedOperand);
    const secondOperand = Number(currentInput);

    if (selectedOperator === "+") result = firstOperand + secondOperand;
    if (selectedOperator === "-") result = firstOperand - secondOperand;
    if (selectedOperator === "*") result = firstOperand * secondOperand;
    if (selectedOperator === "/") result = firstOperand / secondOperand;

    currentInput = String(result);
    selectedOperator = null;
    storedOperand = null;
    updateDisplay(currentInput);
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "=") {
            calculate();
            return;
        }

        if (value === "C") {
            currentInput = "";
            selectedOperator = null;
            storedOperand = null;
            updateDisplay("0");
            return;
        }

        if (value === "Back") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput === "" ? "0" : currentInput);
            return;
        }

        if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput === "") return;
            storedOperand = currentInput;
            selectedOperator = value;
            currentInput = "";
            updateDisplay("0");
            return;
        }

        if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput = currentInput === "" ? "0." : currentInput + ".";
                updateDisplay(currentInput);
            }
            return;
        }

        currentInput += value;
        updateDisplay(currentInput);
    });
});