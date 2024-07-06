// Wait for the HTML document to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    
    // Get references to HTML elements
    const taskList = document.getElementById("taskList");
    const addTaskButton = document.getElementById("addTask");

    // Add click event listener to the "Add Task" button
    addTaskButton.addEventListener("click", function () {
        
        // Get task description and start time input values
        const taskDescription = document.getElementById("taskDescription").value;
        const taskTime = document.getElementById("taskTime").value;

        // Check if input values are empty, display alert if so
        if (taskDescription.trim() === "" || taskTime === "") {
            alert("Please provide a task description and start time.");
            return;
        }

        // Create a new task item and set its content and style
        const taskItem = document.createElement("h3");
        taskItem.textContent = `Task: "${taskDescription}" - Start Time: ${taskTime}`;
        taskItem.style.color = "black";
        taskItem.style.backgroundColor = "white";
        taskList.appendChild(taskItem);

        // Calculate the start time of the task and set up notifications
        const now = new Date();
        const [hours, minutes] = taskTime.split(":");
        const taskStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        // Determine if the task is ready to start now or in the future
        if (taskStartTime <= now) {
            showConfirmation(`Task: "${taskDescription}" is ready to start. Do you want to start the task now?`);
        } else {
            const timeUntilTask = taskStartTime - now;
            // Set up a timer to play an alert sound and show confirmation when it's time
            setTimeout(function () {
                playAlertSound(function () {
                    showConfirmation(`Task: "${taskDescription}" is ready to start. Do you want to start the task now?`);
                });
            }, timeUntilTask);
        }

        // Clear input values after adding a task
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskTime").value = "";
    });

    // Function to display a confirmation dialog
    function showConfirmation(message) {
        const result = confirm(message);

        if (result) {
            // Perform actions if the user confirms
            // (you can add specific actions here)
        }
    }

    // Function to play an alert sound with optional callback
    function playAlertSound(callback) {
        const audio = new Audio("alert.mp3"); 
        audio.play();

        // Call the callback function when the audio ends
        audio.onended = function () {
            if (callback && typeof callback === "function") {
                callback();
            }
        };
    }
});
