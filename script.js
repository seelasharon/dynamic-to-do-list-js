// Wait until the HTML document is fully loaded before running any script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If the task is empty, alert the user and do not add
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the list item
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item, then append the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing the Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on load if there's already text in the input (safe invocation)
    if (taskInput.value && taskInput.value.trim() !== '') {
        addTask();
    }
});
