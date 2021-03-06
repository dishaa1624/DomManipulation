const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);

let globalStore = [];

const newCard = ({id,imageurl,tasktitle,tasktype,taskdescription,}) => `<div class="col-md-6 col-lg-3" id = ${id}>
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" id =${id} class="btn btn-outline-success"  onclick = "editCard.apply(this,arguments)"><i class="fas fa-pencil" id =${id} onclick = "editCard.apply(this,arguments)"></i></button>
        <button type="button"id =${id} class="btn btn-outline-danger" onclick = "deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id =${id} onclick = "deleteCard.apply(this,arguments)"></i></button>
    </div>
    <img src= ${imageurl} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${tasktitle}</h5>
      <p class="card-text"> ${taskdescription}</p>
     
      <span class="badge bg-primary float-start">${tasktype}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" id = ${id} class="btn btn-outline-primary float-end">Open Task</button>
    </div>
  </div>
</div>`;

const loadTaskCards = () =>
{
    //access local storage
    const getInitialData = localStorage.getItem("tasky");
    if (!getInitialData) return;

    //convert string to object
     const {cards} = JSON.parse(getInitialData);

    //map around the array to generate html card and inject it to DOM
    cards.map((cardObject) => {
        const createnewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createnewCard);
        globalStore.push(cardObject);
    });
};

const savechanges = () => 
{
    const taskdata =
    {
        id: `${Date.now()}`, // unique number for card id
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktitle").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescription: document.getElementById("taskdescription").value,
    };

    const createnewCard = newCard(taskdata);
    //parent object of browser-window
    //parent object of html-document
    console.log(createnewCard);

    taskContainer.insertAdjacentHTML("beforeend", createnewCard);
    globalStore.push(taskdata);

    //add to local storage
    updateLocalStorage();
   
};
const updateLocalStorage = () =>
{
        localStorage.setItem("tasky", JSON.stringify({cards : globalStore}));
};
const deleteCard = (event) =>
{
    //id
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;

    //search the global store, delete the id which matches
    const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id !== targetId);
    globalStore = newUpdatedArray;
    updateLocalStorage();
    //access DOM to remove it
    if(tagname === "BUTTON")
    {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
};

const editCard = (event) =>
{
    
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if(tagname === "BUTTON")
    {
        parentElement = event.target.parentNode.parentNode;
        
    }
    else
    {
        parentElement = event.target.parentNode.parentNode.parentNode;
       
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEditChanges.apply(this,arguments)");
    submitButton.innerHTML = "save changes";

};

const saveEditChanges = (event) =>
{
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if(tagname === "BUTTON")
    {
        parentElement = event.target.parentNode.parentNode;
        
    }
    else
    {
        parentElement = event.target.parentNode.parentNode.parentNode;
       
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    const updatedData =
    {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    };
    globalStore = globalStore.map((task) =>
    {
        if(task.id === targetId)
        {
            return {
                id: task.id,
                imageurl: task.imageurl,
                tasktitle: updatedData.taskTitle,
                taskdescription: updatedData.taskDescription,
                tasktype: updatedData.taskType,
            };
            
        }
        return task;
    });
    updateLocalStorage();
    taskTitle.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    submitButton.removeAttribute("on click");
    submitButton.innerHTML = "Open Task";
};

//cards after refresh deleted -> stored in local storage(5 MB)
//Application Programmming Interface -> API 