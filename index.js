// For the sake of Simplicity and scope of the project,
// IIFE module desing patter followed

( function() {
// array to store all tasks in
let all_tasks = [];

// getting input field
const input_task = document.getElementById('add');
// list of all tasks
const task_list = document.getElementById('list');
// Number of tasks
const task_count = document.getElementById('count');


// Function to add task
function addTask (task) {
    // checking if text is not empty
    if (task.text === '') {
        showNotification("Empty task can't be added");
    }
    // checking if object is not empty
    else if (task) {
        // adding task to array
        all_tasks.push(task);
        showNotification("Task added successfully.");
        // Rendering List / Presenting List in HTML
        renderList();
    }
    // If any Error occurs
    else {
        showNotification("Internal Sever Error");
    }

}


// Function to delete task
function deleteTask(taskId) {
    // checking if taskId is not empty
    if (taskId) {
        let updatedTasks = all_tasks.filter(function (task) {
            return task.task_id !== taskId;
        });
        all_tasks = updatedTasks;
        showNotification("Task deleted successfully.");
        renderList();    
    }
    // If any Error occurs
    else {
        showNotification("Internal Sever Error");
    }

}

// Function to toggle task
function toggleTask(taskId) {
    // checking if taskId is not empty
    if (taskId) {
        const task = all_tasks.filter(function (task) { return task.task_id === taskId});
        // if any task found with given ID
        if (task.length > 0) {
            // Toggling the status
            task[0].task_status = !task[0].task_status;
            showNotification("Task status changed successfully");
            // Rendering List / Presenting List in HTML
            renderList();
        }
        // If any Error occurs
        else {
            showNotification("Could'nt change the task");
        }
        
    }
    // If any Error occurs
    else {
        showNotification("Internal Sever Error");
    }
    

}

function showNotification(message) {
    let box = document.getElementById('popup-box');
    box.style.visibility = 'visible';
    box.style.opacity = '1';
    let text = document.getElementById('context-text');
    text.innerHTML=message;
}

// Function to hide tha Modal
function disableModal() {
    let box = document.getElementById('popup-box');
    box.style.visibility = 'hidden';
    box.style.opacity = '0';
}

// Function to add element to dom structure
function addListItemToDom(task) {
    // Creating list element
    const list_item = document.createElement('li');
    // Adding class to list element
    list_item.classList.add('list-item','new-box');
    // Adding content to list element
    list_item.innerHTML = `
    <input type="checkbox" id=${task.task_id} ${task.task_status ? 'checked' : '' } class="checkbox">
    <label for="${task.task_id}">${task.text}</label>
    <img src="./cross.png" class="delete" data-id=${task.task_id} alt="bin" />
    `
    // Adding list element to list
    task_list.append(list_item);
}


// Function to render / show list on HTML page
function renderList() {
    // Cleaning all previous doms objects/elements of list
    task_list.innerHTML = '';
    for (let i=0 ; i<all_tasks.length; i++) {
        // Calling function to add list elment into HTML DOM structure
        addListItemToDom(all_tasks[i]);
    }
    // Updating count in HTML DOM structure
    task_count.innerHTML = "Total Tasks : " +all_tasks.length;

}



// Function to handle event of keypress
function Enterkeyhandler(event) {
    // Enter Key pressed
    if (event.key === 'Enter') {
        // Creating task object
        let task = {
            text: event.target.value,
            task_id: Date.now().toString() ,
            task_status:false 
        } 
        // Calling addTask Function with task object
        addTask(task);
        // Clearing the input field in HTML DOM structure
        event.target.value = '';
        return;
    }
}

// Function to handle event of click
function handleClick(event) {
    // Initializing target variable or Getting clicked element
    const target = event.target;

    // on delete button clicking
    if (target.className === 'delete') {
        // getting ID of element
        const taskId = target.dataset.id;
        // Calling function to delete the task using task ID
        deleteTask(taskId);
        return;
    }
    // on task checkbox clicking
    else if (target.className === 'checkbox') {
        // getting ID of element
        const taskId = target.id;
        // Calling function to toggle the task using task ID
        toggleTask(taskId);
        return;
    }
    // on add button clicking
    else if (target.className === 'add-btn') {
        // Creating task object
        let task = {
            text: input_task.value,
            task_id: Date.now().toString() ,
            task_status:false 
        } 
        // Calling addTask Function with task object
        addTask(task);
        // Clearing the input field in HTML DOM structure
        input_task.value = '';
        return;
    }
    // for closing modal
    else if (target.className === 'box-close') {
        disableModal();
    }
}

// Listner to add event delegation
document.addEventListener('click',handleClick);


// Listner for keypress
input_task.addEventListener('keydown',Enterkeyhandler);
})();