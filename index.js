const taskcontainer = document.querySelector(".task__container");

let storage=[];
const newcard = ({id, imageurl, tasktitle, taskdescription, tasktype}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card px-3" >
    <div class="card-header d-flex justify-content-end column-gap-2">
        <button type="button" class="btn btn-outline-success" id=${id} onclick="editCard.apply(this,arguments)">
            <i class="fa-solid fa-pen" id=${id} onclick="editCard.apply(this,arguments)"></i>
        </button>
        <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this,arguments)">
            <i class="fa-solid fa-trash" onclick="deleteCard.apply(this,arguments)" id=${id}></i>
        </button>
    </div>
    <img src=${imageurl} class="card-img-top" alt="image">
    <div class="card-body ">
      <h5 class="card-title">${tasktitle}</h5>
      <p class="card-text">${taskdescription}</p>
      <span class="badge bg-primary">${tasktype}</span>
    </div>
    <div class="card-footer text-body-secondary ">
        <button type="button" id=${id} class="btn btn-outline-primary float-end">Open Task</button>
    </div>
  </div>
</div>`

const updateLocalStorage = () => {
    localStorage.setItem("tasky",JSON.stringify({cards: storage}));
};

const loadData = () => {
    const initialData=localStorage.getItem("tasky");
    if (!initialData) return;
    const {cards} = JSON.parse(initialData);
    cards.map((card) => {
        const createNewCard = newcard(card);
        taskcontainer.insertAdjacentHTML("beforeend", createNewCard);
        storage.push(card);
    });
};

const saveChanges = () => {
    const taskData = {
        id: `${new Date().getTime()}`,
        imageurl: document.getElementById("exampleimageURL").value,
        tasktitle: document.getElementById("exampleTaskTitle").value,
        tasktype: document.getElementById("exampleTaskType").value,
        taskdescription: document.getElementById("exampleFormControlTextarea1").value
    };
    const createnewcard = newcard(taskData);
    taskcontainer.insertAdjacentHTML("beforeend", createnewcard);
    storage.push(taskData);
    updateLocalStorage();
};

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname =event.target.tagName;
    const newUpdatedArray = storage.filter((card) => card.id !== targetID);
    storage = newUpdatedArray;
    updateLocalStorage();
    if (tagname === "BUTTON"){
        return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    };
    return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );
};

const editCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname =event.target.tagName;
    let parentElement;
    if (tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
    submitButton.innerHTML="Save Changes";
};

const saveEditChanges = () => {
    event = window.event;
    const targetID = event.target.id;
    const tagname =event.target.tagName;
    let parentElement;
    if (tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
    const updatedData = {
        tasktitle: taskTitle.innerHTML,
        tasktype: taskType.innerHTML,
        taskdescription: taskDescription.innerHTML
    };  
    storage = storage.map((task) => {
        if (task.id === targetID){
            return{
                id: task.id,
                imageurl: task.imageurl,
                tasktitle: updatedData.tasktitle,
                tasktype: updatedData.tasktype,
                taskdescription: updatedData.taskdescription
            };
        }
        return task;
    });
    updateLocalStorage();
};