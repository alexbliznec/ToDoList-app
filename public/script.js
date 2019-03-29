window.onload = () =>{

    const taskWindow = document.getElementById('taskWindow');
    //const modalWindowBackGround = document.getElementById('modalWindowBackGround');
    const tasks = document.getElementById('list-box');
    const modalCloseBtn = document.getElementById('modalClose');
    const taskButton = document.getElementById('taskButton');
    const editTaskBtn = document.getElementById('saveUpdatedTaskBtn');

    for (let i = 0; i < tasks.childNodes.length; i++) {
        let task = tasks.childNodes[i];
        
        task.addEventListener('click', (e) => {
            e.preventDefault();
            //alert(task.getAttribute('taskID'));

            taskWindow.style.display = 'block';
            //modalWindowBackGround.style.display = 'block';
            taskWindow.setAttribute('taskID', task.getAttribute('taskID'));
            let taskName = document.getElementById('editTaskName');
            let taskDescription = document.getElementById('taskDescription');
            let taskID = taskWindow.getAttribute('taskID');
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `/todolisttaskwindow/${taskID}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener('load', () => {
                let task = JSON.parse(xhr.response);
                console.log('****************************');
                console.log(task);
                console.log(task.taskName);
                console.log(task.taskDescription);
                taskName.value = task.taskName;
                taskDescription.value = task.taskDescription;
            });
            xhr.send();
        });
    }
    
    /*editTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let editTaskName = JSON.stringify({editTaskName: document.getElementById('editTaskName').value});
        let taskDescription = JSON.stringify({taskDescription: document.getElementById('taskDescription').value});
        let taskID = modalWindow.getAttribute('taskID');
        let xhr = new XMLHttpRequest();
        console.log(editTaskName);
        console.log(taskDescription);
        xhr.open('PUT', `/todolist/updatetask/${taskID}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener('load', () => {
            let editedTask = JSON.parse(xhr.response);
            console.log('+++++++++++++++++++++++++++');
            console.log(editedTask);
        });
        xhr.send(editTaskName, taskDescription);
        //xhr.send();
        modalWindow.style.display = 'none';
        modalWindowBackGround.style.display = 'none';
        editTaskName.value = '';
        taskDescription.value ='';
    });

    modalCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('-------------------------');
        console.log(modalWindow);
        let editTaskName = document.getElementById('editTaskName');
        editTaskName.value = '';
        let taskDescription = document.getElementById('taskDescription');
        taskDescription.value ='';
        modalWindow.style.display = 'none';
        modalWindowBackGround.style.display = 'none';

    });*/


    
    //console.log(taskButton);
    taskButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('WTF');
        let newTask = JSON.stringify({taskName: document.getElementById('taskName').value});
        //console.log(taskName);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/todolist/addtask", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener('load', () => {

            let task = JSON.parse(xhr.response);
            let date = new Date(task.beginDate);
            let html = $(`<div class="list-item" taskID=${task.taskID}> <span class="taskName" taskID=${task.taskID}> ${task.taskName}</span> <span class="taskDate"> ${date.toDateString()}</span></div>`);
            //var html = $('<div class="list-item" task_id="'+task.taskID+'">'+task.taskName+' <span>new</span></div>');      
            $('#list-box').append(html);

            for (let i = 0; i < tasks.childNodes.length; i++) {
                let task = tasks.childNodes[i];
                console.log(task.firstChild);
                task.addEventListener('click', (e) => {
                    e.preventDefault();
                    //alert(task.getAttribute('taskID'));
        
                    modalWindow.style.display = 'block';
                    modalWindowBackGround.style.display = 'block';
                    modalWindow.setAttribute('taskID', task.getAttribute('taskID'));
                });
            }
            
        });
        xhr.send(newTask);  

    });



};


