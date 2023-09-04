const taskcontainer = document.querySelector(".task__container");

let storage=[];
const newcard = ({id, imageurl, tasktitle, taskdescription, tasktype}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card px-3" >
    <div class="card-header d-flex justify-content-end column-gap-2">
        <button type="button" class="btn btn-outline-success">
            <i class="fa-solid fa-pen"></i>
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
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
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
    const targetName =event.target.targetName;
    storage = storage.filter((card) => card.id !== targetID);
    updateLocalStorage();
    if (targetName === "BUTTON"){
        return taskcontainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
    };
    return taskcontainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );
};