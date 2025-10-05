// Wait until the HTML document is fully loaded before running any script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to keep tasks in memory (strings)
    let tasks = [];

    // Save the current tasks array to localStorage
    function saveTasksToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove one occurrence of taskText from storage and update memory
    function removeTaskFromStorage(taskText) {
        const idx = tasks.indexOf(taskText);
        if (idx > -1) {
            tasks.splice(idx, 1);
            saveTasksToStorage();
        }
    }

    // Function to add a new task to the list
    // If taskTextParam is provided, it will be used instead of the input field
    // If save is true (default) the task will be saved to localStorage
    function addTask(taskTextParam, save = true) {
        // Determine the task text source
        const taskText = (typeof taskTextParam === 'string') ? taskTextParam.trim() : taskInput.value.trim();

        // If the task is empty, alert the user and do not add
        if (taskText === '') {
            if (typeof taskTextParam !== 'string') {
                // Only alert when user attempted to add via input (not when loading from storage)
                alert('Please enter a task.');
            }
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        // Use classList.add for adding class names (safer when other classes may exist)
        removeBtn.classList.add('remove-btn');

        // When the remove button is clicked, remove the list item and update storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the list item, then append the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field for the next task (only when added from the input)
        if (typeof taskTextParam !== 'string') {
            taskInput.value = '';
        }

        // Save to localStorage if requested
        if (save) {
            tasks.push(taskText);
            saveTasksToStorage();
        }
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = Array.isArray(storedTasks) ? storedTasks.slice() : [];
        tasks.forEach(taskText => addTask(taskText, false)); // false prevents saving again
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing the Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage and render them
    loadTasks();
});
