const calculatorDisplay = document.querySelector('h2');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

//calculate first and secound values  depending on operator
const calculate = {
    '/' : (firstNumber,secoundNumber) => firstNumber / secoundNumber,
    '*' : (firstNumber,secoundNumber) => firstNumber * secoundNumber,
    '+' : (firstNumber,secoundNumber) => firstNumber + secoundNumber,
    '-' : (firstNumber,secoundNumber) => firstNumber - secoundNumber,
    '=' : (firstNumber,secoundNumber) => secoundNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){    
//replace current display value  if first value is entered
if(awaitingNextValue){
    calculatorDisplay.textContent = number;
    awaitingNextValue =false;
}
else {
    //if current value is 0 ,replace it , if not add number 
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0'? number :displayValue + number;
}
}

function addDecimal(){
    // if operator pressed dont add decimal
    if(awaitingNextValue) return;
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent =`${calculatorDisplay.textContent}.`
    }
}

function useOperator(operator){
    const currentValue  = Number(calculatorDisplay.textContent);
    
    // to prevent multiple operator
    if (operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    
    // assign first value if no value 
    if(!firstValue){
        firstValue = currentValue
    }
    else{
        // console.log(firstValue,operatorValue,currentValue);
        const calculation = calculate[operatorValue](firstValue,currentValue);
        // console.log('calculation',calculation);
        calculatorDisplay.textContent =calculation;
        firstValue = calculation;
    }

    //Ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
    // console.log('firstValue', firstValue)
    // console.log('operatorValue', operatorValue)
}

// reset all values display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;

    calculatorDisplay.textContent = '0';
}

// add event listners for number operators and decimal buttons
inputBtns.forEach((inputBtns)=> {
    if(inputBtns.classList.length === 0){
        inputBtns.addEventListener('click', ()=>sendNumberValue(inputBtns.value));
    }
    else if(inputBtns.classList.contains('operator')){
        inputBtns.addEventListener('click', ()=>useOperator(inputBtns.value));
    }
    else if(inputBtns.classList.contains('decimal')){
        inputBtns.addEventListener('click', ()=>addDecimal());
    }
});

// event listner 
clearBtn.addEventListener('click', resetAll); 
