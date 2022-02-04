const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);

const globalStore = [];

const newCard = ({id,imageurl,tasktitle,tasktype,taskdescription,}) => `<div class="col-md-6 col-lg-3" id = ${id}>
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil"></i></button>
        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
    </div>
    <img src= ${imageurl} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${tasktitle}</h5>
      <p class="card-text"> ${taskdescription}</p>
     
      <span class="badge bg-primary float-start">${tasktype}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
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
    localStorage.setItem("tasky", JSON.stringify({cards : globalStore}));
};

//cards after refresh deleted -> stored in local storage(5 MB)
//Application Programmming Interface -> API