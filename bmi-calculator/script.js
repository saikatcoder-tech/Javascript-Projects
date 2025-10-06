const btnEl = document.getElementById("btn");
const bmiInputEl = document.getElementById("bmi-result");
const weightConditionEl = document.getElementById("weight-condition");
const resetEl = document.getElementById("reset");

const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");


function calculateBMI() {
    const heightValue = document.getElementById("height").value / 100;
    const weightValue = document.getElementById("weight").value;

    if (!heightValue || heightValue <= 0) {
    heightEl.style.border = "2px solid red";
    } else {
    heightEl.style.border = "2px solid green";
    }

    if (!weightValue || weightValue <= 0) {
    weightEl.style.border = "2px solid red";
    } else {
    weightEl.style.border = "2px solid green";
    }

    // Calculate BMI (1 decimal place)
    const bmiValue = (weightValue / (heightValue * heightValue)).toFixed(1);
    bmiInputEl.value = bmiValue;

    // Determine condition
    if (bmiValue < 18.5) {
        weightConditionEl.innerText = "Underweight";
        weightConditionEl.style.color = "#00bfff";
    } else if (bmiValue <= 24.9) {
        weightConditionEl.innerText = "Normal weight";
        weightConditionEl.style.color = "#00ff7f";
    } else if (bmiValue <= 29.9) {
        weightConditionEl.innerText = "Overweight";
        weightConditionEl.style.color = "#ffa500";
    } else {
        weightConditionEl.innerText = "Obese";
        weightConditionEl.style.color = "#ff4500";
    }

}

function resetValues() {
    bmiInputEl.value="";
    weightConditionEl.innerText = "";
    weightConditionEl.style.color = "black";

    heightEl.value="";
    weightEl.value="";
    
}

btnEl.addEventListener("click", calculateBMI);
resetEl.addEventListener("click", resetValues);

heightEl.addEventListener("input", calculateBMI);
weightEl.addEventListener("input", calculateBMI);