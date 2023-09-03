const taskcontainer = document.querySelector(".task__container");
const newcard = ({id, imageurl, tasktitle, taskdescription, tasktype}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card px-3" >
    <div class="card-header d-flex justify-content-end column-gap-2">
        <button type="button" class="btn btn-outline-success">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash"></i>
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
};