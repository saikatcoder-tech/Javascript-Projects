const display = document.querySelector(".display");
const button = document.querySelectorAll("button");
const operators = ['+', '-', '*', '/', '%'];




//function to display the button text in display box
button.forEach(button => {

    //for ac ,delete and '='....dont display this inner text
    if(button.classList.contains('btn-control') || button.classList.contains('btn-equal')){
        return;
    };

    button.addEventListener('click', ()=> {
        const value = button.textContent; //take the value of button using textcontent
        const lastChar = display.textContent.slice(-1); //last character in display

        if(operators.includes(value)) { //check if button clicked is operator ... we are doing this for non repeitive system of operators

            //only - operator allowed for first input
            if(display.textContent === '0' && value == '-') {
                display.textContent = '-';
                return;
            }
            //no other operator is allowed for first input and no change of operator(if - is inputed)
            if(display.textContent === '0' || display.textContent === '-') return;
            

            if(operators.includes(lastChar)) { //check if the last character on display is also an operator.
                display.textContent = display.textContent.slice(0, -1) + value; //remove the last putted operator and replace it
                return; // else just put the operator
            }
        }

        //if display is 0, remove the 0 then add number ..else queue the numbers using += method
        if(display.textContent == 0){
            display.textContent = value;
        }else{
        display.textContent += value;
        }

    });
});


//function to evaluate and equal buton logic

const btnEqual = document.getElementById("btn-equal");

btnEqual.addEventListener('click', () => {

    try{
        let result = eval(display.textContent);
    display.textContent = result;
    }catch(error){
        display.textContent = "Error";
    }
    
});

//fucntion for AC buttton

const btnAC = document.getElementById("btn-ac");

btnAC.addEventListener('click', () => {
    display.textContent = "0";
})


//function for backspace function

const btnBack = document.getElementById("btn-back");

btnBack.addEventListener('click', () => {
    if(display.textContent.length === 1){
        display.textContent = "0";
    }else{
    display.textContent = display.textContent.slice(0, -1);
    }
})



//for keyboard functionality

document.addEventListener('keydown', (e) => {
    const key = e.key; // the key pressed

    // Numbers
    if(!isNaN(key)) {
        if(display.textContent === '0') {
            display.textContent = key;
        } else {
            display.textContent += key;
        }
    }

    // Operators
    else if(operators.includes(key)) {
        const lastChar = display.textContent.slice(-1);

        if(display.textContent === '0' && key === '-') {
            display.textContent = '-';
            return;
        }

        if(display.textContent === '0' || display.textContent === '-') return;

        if(operators.includes(lastChar)) {
            display.textContent = display.textContent.slice(0, -1) + key;
            return;
        }

        display.textContent += key;
    }

    // Decimal point
    else if(key === '.') {
        const parts = display.textContent.split(/[\+\-\*\/%]/);
        const lastPart = parts[parts.length - 1];

        if(!lastPart.includes('.')) {
            display.textContent += '.';
        }
    }

    // Enter = evaluate
    else if(key === 'Enter') {
        try {
            display.textContent = eval(display.textContent);
        } catch {
            display.textContent = "Error";
        }
    }

    // Backspace
    else if(key === 'Backspace') {
        if(display.textContent.length === 1 || (display.textContent.length === 2 && display.textContent.startsWith('-'))) {
            display.textContent = '0';
        } else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }

    // Escape = AC
    else if(key === 'Escape') {
        display.textContent = '0';
    }
});

