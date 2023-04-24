let output = document.querySelector("#output");
let numsBtn = document.querySelectorAll(".nums");
let clearBtn = document.querySelector("#clear");
let clearAllBtn = document.querySelector("#clearAll");
let currentNumber = "0";
let holdNumber = 0;
console.log(numsBtn);

const updateOutput = (number) => {
    output.textContent = number;
}

const getNumber = (e) => {
    if (currentNumber == "0") {currentNumber = ""};
    currentNumber += e.target.textContent;
    updateOutput(currentNumber)
}

const clear = () => {
    currentNumber = currentNumber.split("").filter((num, index) => index == currentNumber.length -1 ? false : true).join("");
    if (currentNumber == "") {
        currentNumber = "0"
    };
    updateOutput(currentNumber)
}

const clearAll = () => {
    currentNumber = "0";
    updateOutput(currentNumber);
}

numsBtn.forEach(num => num.addEventListener("click", getNumber))
clearBtn.addEventListener("click", clear);
clearAllBtn.addEventListener("click", clearAll);

updateOutput(currentNumber);