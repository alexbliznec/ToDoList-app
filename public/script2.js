

window.onload = () => {
    const taskArray = [];
    const taskWindow = document.getElementById('taskWindow'); 
    const taskButton = document.getElementById('taskButton');
    const closeTaskWindowBtn = document.getElementById('closeTaskWindow');
    const deleteTaskBtn = document.getElementById('deleteTask');
    const saveTaskDescriptionBtn = document.getElementById('saveUpdatedTaskBtn');
    const makeCompletedBtn = document.getElementById('makeCompleted');
    const showCompletedTasksBtn = document.getElementById('showCompletedTasks');
  


    function iterateTasks () {
        taskArray.length = 0;
        const tasks = document.getElementById('list-box');
        for (let i = 0; i < tasks.childNodes.length; i++) {
            let task = tasks.childNodes[i];
            taskArray.push(task);
        }
    }

    function showTasks () {
        taskArray.forEach((i) => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                showTaskWindow(i);
            });
        });
    }

    function addNewTask () {
        let newTaskName = document.getElementById('taskName').value.trim();
        if (!newTaskName) {
            alert(`У задачи должно быть название!`);
            return;
        } else {
            let newTask = JSON.stringify({taskName: newTaskName});
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/todolist/addtask", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener('load', () => {
                let task = JSON.parse(xhr.response);
                let date = new Date(task.beginDate);
                let html = $(`<div class="list-item" taskID=${task.taskID}> <span class="taskName" taskID=${task.taskID}> ${task.taskName}</span> <span class="taskDate"> ${date.toDateString()}</span></div>`);
                //var html = $('<div class="list-item" task_id="'+task.taskID+'">'+task.taskName+' <span>new</span></div>');      
                $('#list-box').append(html);
                alert(`задача ${task.taskName} добавлена`);
                iterateTasks();
                showTasks();
                console.log(`аякс принес нам новую задачу`);
            });
            xhr.send(newTask);
        }

    };

    function deleteTask () {
        let taskID = taskWindow.getAttribute('windowID');
        let xhr = new XMLHttpRequest();
            xhr.open('GET', `/todolist/deletetask/${taskID}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener('load', () => {
                let deletedTask = JSON.parse(xhr.response);
                let elementToDelete = $(`[taskID = ${taskID}]`);
                console.log(elementToDelete);
                elementToDelete.remove();
                iterateTasks();
                showTasks();
                alert(`задача ${deletedTask.taskName} удалена`);
            });
            xhr.send();
    }

    function showTaskWindow (child) {
            taskWindow.style.display = 'block';
            taskWindow.setAttribute('windowID', child.getAttribute('taskID'));
            let taskName = document.getElementById('editTaskName');
            let taskDescription = document.getElementById('taskDescription');
            let windowID = taskWindow.getAttribute('windowID');
            let xhr = new XMLHttpRequest();
                xhr.open('GET', `/todolisttaskwindow/${windowID}`, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.addEventListener('load', () => {
                    let task = JSON.parse(xhr.response);
                    taskName.value = task.taskName;
                    taskDescription.value = task.taskDescription;
                });
                xhr.send(); 
    };
    
    function saveTaskDescription () {
        let taskDescription = JSON.stringify({taskDescription: document.getElementById('taskDescription').value});
        let windowID = taskWindow.getAttribute('windowID');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/todolist/addtaskdescription/${windowID}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener('load', ()=> {
            let task = JSON.parse(xhr.response);
            alert(`описание задачи сохранено`);

        });
        xhr.send(taskDescription);
    }

    function makeCompleted () {
        let taskID = taskWindow.getAttribute('windowID');
        let xhr = new XMLHttpRequest();
            xhr.open('GET', `/totdolist/completetask/${taskID}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener('load', () => {
                let task = JSON.parse(xhr.response);
                //console.log(task);
                let completedTask = $(`[taskID = ${taskID}]`);
                console.log(completedTask);
                completedTask.removeClass('list-item');
                completedTask.addClass('completed-item')
                alert(`задача ${task.taskName} отмечена как выполненная`);
            });
            xhr.send();
    }

    function closeTaskWindow () {
            taskWindow.style.display = 'none';
    };    

    iterateTasks();
    showTasks();
 
    taskButton.addEventListener('click', (e) => {
        e.preventDefault();
        addNewTask();
    });
        
    closeTaskWindowBtn.addEventListener('click', () => {
        closeTaskWindow();
    });

    deleteTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let deleteConfirm = confirm('Вы действительно желаете удалить задачу?');
        if (deleteConfirm) {
            console.log(`я действительно хочу удалить задачу`);
            deleteTask();
            return
        }
        console.log(`нет я передумал!`);
        return
    });

    saveTaskDescriptionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveTaskDescription();
    });

    makeCompletedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        makeCompleted();
    })

    showCompletedTasksBtn.addEventListener('click', () => {
        let completedItemStyle = $('.completed-item').css('display');
        if(completedItemStyle === 'none') {
            $('.completed-item').css('display', 'block');
        } else {
            $('.completed-item').css('display', 'none');
        }
        
    });

};