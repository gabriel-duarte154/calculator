const output = document.querySelector("#outputCurrent");
const previousOperation = document.querySelector("#outputHold");
const numsBtn = document.querySelectorAll(".nums");
const clearBtn = document.querySelector("#clear");
const reseatBtn = document.querySelector("#reseat");
const operatorBtns = document.querySelectorAll(".operator");
const result = document.querySelector("#result");
const dotBtn = document.querySelector("#dotBtn");
const operations = {
    sum : (a, b) => a + b,
    subtract : (a, b) => a - b,
    multiply : (a, b) => decimalAjust(a * b),
    divide :  (a, b) =>  decimalAjust(a / b),
    porcentage : (a, b) =>  decimalAjust((a / 100) * b)
};

let holdNumber = null;
let currentNumber = "";
let currentOperator = null;

const keybordInput = (e) => {
    if (e.key >= 0 || e.key <= 9) {addNumber(e.key)}
    if (e.key == "Backspace") {clear()};
    if (e.key == "Enter" || e.key == "=") {finishOperation()};
    if (e.key == ".") {addDot()};
    if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/" ||
     e.key == "%") {
        selectOperator(e.key)
    };
};

const addNumber = (num) => {
    currentNumber += num;
    updateOutput(currentNumber);
};

const addDot = () => {
    if (currentNumber.includes(".") || !currentNumber) {return};
    currentNumber += ".";
    updateOutput(currentNumber);
};

const convertOperator = (operator) => {
    switch (operator) {
        case "+":
            return "sum"
        case "-":
            return "subtract"
        case "*":
            return "multiply"
        case "/": 
            return "divide"
        case "%":
            return "porcentage"
    };
};

function execute (a, b, operator) {
    if (!b) {return}
    b = Number(b);
    holdNumber = operations[convertOperator(operator)](a, b);
    updateOutput(holdNumber);
};

function selectOperator (operator) {
    currentOperator = operator;
    if (holdNumber == null) {
        holdNumber = Number(output.innerText)
        currentNumber = "";
    }
    if (currentOperator) {
        execute(holdNumber, currentNumber, currentOperator)
    }
    currentNumber = "";
    updatePrevius();
};

const updateOutput = (number) => {
    if (number == "") {
        output.innerText = "0"
    } else {
        output.innerText = number;
    }
};

const updatePrevius = () =>  {
    if (holdNumber != null) {
        previousOperation.innerHTML = holdNumber + " " +  currentOperator ;
    } else {
        previousOperation.textContent = "";
    }
};

const decimalAjust = (num) =>  {
    return Math.round(num * 1000) / 1000;
};

const clear = () => {
    currentNumber = output.innerText;
    currentNumber = currentNumber.split("")
    .filter((num, index) => index == currentNumber.length -1 ? false: true)
    .join("");
    updateOutput(currentNumber);
};

const reseat = () => {
    holdNumber = null;
    currentOperator = null;
    currentNumber = "";
    updatePrevius();
    updateOutput(currentNumber)
};

const finishOperation = () => {
    if (currentOperator) {
        execute(holdNumber, currentNumber, currentOperator);
        previousOperation.innerText += ` ${currentNumber} = ${holdNumber}`
    }
    holdNumber = null;
    currentNumber = output.innerText;
    currentOperator = null;
};

numsBtn.forEach(num => num.addEventListener("click", (e) => addNumber(e.target.innerText)));
operatorBtns.forEach(btn => 
    btn.addEventListener("click", (e) => selectOperator(e.target.id)));
result.addEventListener("click", finishOperation)
clearBtn.addEventListener("click", clear);
reseatBtn.addEventListener("click", reseat);
dotBtn.addEventListener("click", addDot);
window.addEventListener("keydown", keybordInput)
updateOutput(0);