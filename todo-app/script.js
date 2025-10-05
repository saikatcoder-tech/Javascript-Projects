const inputText = document.getElementById("input-text");
const addButton = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");


let tasks = [];
loadTask();



//local storage

        //savetasks function
        function saveTask() {
            localStorage.setItem("task", JSON.stringify(tasks));
        }

        //loadtasks  function
        function loadTask() {
            tasks= JSON.parse(localStorage.getItem("task")) || [];
            showTask();
        }







let editIndex = null;

//function to take all the tasks from array and show it
function showTask() {

        // clear the container first to add new array elements
        listContainer.innerHTML="";

    //--------------------------------------------------------------      

        // for each element in array create div in list container
        tasks.forEach(function(value, index) {
        const divListElement = document.createElement("div");
        divListElement.classList.add("list-element");
        divListElement.innerHTML = `
            <h3 class="task-text">${index + 1}. ${value}</h3>
            <div class="edit-delete-list">
                <i class="fa-solid fa-pen-to-square icon-edit"></i>
                <i class="fa-solid fa-trash icon-delete"></i>
            </div>
        `;
        
        //append the div in container so that it shows
        listContainer.append(divListElement);

        //strikethrough text when clicked
        const taskText =  divListElement.querySelector(".task-text");
        taskText.addEventListener("click", function() {
            taskText.classList.toggle("marked");
        });

        //delete logic
        const deleteBtn = divListElement.querySelector(".icon-delete");
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTask();
            showTask();
        });

        //edit logic
        const editBtn = divListElement.querySelector(".icon-edit");
        editBtn.addEventListener("click", function() {
            
            // if this task is already being edited → cancel
            if(divListElement.classList.contains("editing")){
                divListElement.classList.remove("editing");
                editIndex = null;
                inputText.value = ""; // optional: clear input
            } else {
                // remove editing from all tasks first
                document.querySelectorAll(".list-element").forEach(el => el.classList.remove("editing"));

                // then activate current task
                divListElement.classList.add("editing");
                inputText.value = value;
                editIndex = index;
            }
        });

        });

    //---------------------------------------------------------------

    const deleteAllBtn = document.querySelector(".delete-all-btn");

        //show the list container only when there is 1 tasks
        if(listContainer.children.length === 0){
                listContainer.classList.remove("active"); 
                deleteAllBtn.style.display = "none"; 
            } else {
                listContainer.classList.add("active");
                deleteAllBtn.style.display = "block"; 
            }

            deleteAllBtn.addEventListener("click", function(){
                tasks = [];
                saveTask();
                showTask();
            })

}





//function when button is clicked
        function addTask() {
            
            //getting the value from input
            const inputValue = inputText.value.trim();

            //1. checking if something written or not
            if(inputValue === ''){
                inputText.classList.add("nothing-written");
                return; 
            }
            
            //2. push the text in array or edit
            if(editIndex !== null){
                tasks[editIndex] = inputValue;
                editIndex = null;
            }else {
                tasks.push(inputValue);
            };

            saveTask();
            

            //2.5 update display
            showTask();

            //3. clear the input field for next writing
            inputText.value="";

        }


//from addtask function..remove red border when writing something
inputText.addEventListener("input", function() {
    inputText.classList.remove("nothing-written");
});


//button click event
addButton.addEventListener("click", addTask);

inputText.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    };
});


