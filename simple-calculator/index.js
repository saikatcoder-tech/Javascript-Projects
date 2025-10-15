const display =  document.querySelector(".display");
const numberBtn = document.querySelectorAll(".btn-number");
const operators = ['+', '-', '*', '/', '%'];

numberBtn.forEach(button => {
    button.addEventListener('click', () => {

        if(display.textContent === '0' || display.textContent === 'Error'){
            display.textContent = button.textContent;
        }else{
            display.textContent += button.textContent;
        }
        
    })
})

const operatorBtn = document.querySelectorAll(".btn-operator");

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {

        let value =  button.textContent;
        let lastChar =  display.textContent.slice(-1);

        if(display.textContent === '0'){
            if(value === '-'){
                display.textContent = button.textContent;
            }
            return;
        }
        else{
            if (display.textContent === '-') {
                return;
            }
            if(operators.includes(lastChar)){
                display.textContent = display.textContent.slice(0, -1) + value;
            }
            else{
                display.textContent += button.textContent;
            }
            
        }
        
    })
})


//equal evaluate logic
const equalBtn = document.querySelector(".btn-equal");

        //button click
        equalBtn.addEventListener('click',evaluateFunction)

        //logic
        function evaluateFunction() {
            try{
                let result = eval(display.textContent);
                display.textContent = result;
            }
            catch(error){
                display.textContent = 'Error';
            }
        
        }


//clearall logic
const acBtn = document.getElementById("btn-ac");

        //button click
        acBtn.addEventListener('click', clearAll);

        //logic
        function clearAll() {
            display.textContent ='0';
        }


//backspace logic
const backBtn = document.getElementById("btn-back");

        //button click
        backBtn.addEventListener('click',handleBackSpace);   

        //logic
        function handleBackSpace() {
            if(display.textContent.length === 1){
                display.textContent = '0';
            }else{
                display.textContent = display.textContent.slice(0, -1);
            }
        }



//keyboard click logics
document.addEventListener('keydown', (e) => {

    if(!isNaN(e.key)){
        if(display.textContent === '0' || display.textContent === 'Error'){
            display.textContent = e.key;
        } else {
            display.textContent += e.key;
        }
    }

    // Operators
    else if(operators.includes(e.key)){
    let lastChar = display.textContent.slice(-1);

    if(display.textContent === '0'){
        if(e.key === '-'){
            display.textContent = e.key;
        }
        return;
    } else {
        if(display.textContent === '-') return;

        if(operators.includes(lastChar)){
            display.textContent = display.textContent.slice(0, -1) + e.key;
        } else {
            display.textContent += e.key;
        }
    }
}


    if(e.key === "Backspace"){
        handleBackSpace();
    }

    if(e.key === "Escape"){
        clearAll();
    }

    if(e.key === "Enter"){
        e.preventDefault();
        evaluateFunction();
    }

});
