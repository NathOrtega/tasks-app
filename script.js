const addTaskButton=document.getElementById("addTaskButton");
const newTask=document.getElementById("tasksInput");
const incompleteTasksButton=document.getElementById("incompleteTasksButton");
const incompleteTasksContainer=document.getElementById("incompleteTasksContainer");
const completedTasksButton=document.getElementById("completedTasksButton");
const completedTasksContainer=document.getElementById("completedTasksContainer");
const noTasksContainer=document.getElementById("noTasksContainer");
const subtitle=document.getElementById("subtitle");
let numberOfActiveTasks=0;
let taskName="";

addTaskButton.addEventListener("click", () => {
  if(newTask.value.trim()!=="") {
    incompleteTasksContainer.innerHTML+=`
      <div class="taskContainer incompleteTask">
        <button class="checkButton taskButton" onclick="moveToCompletedTask(this)">
          <i class="far fa-check-circle"></i>
        </button>
        <p>${newTask.value}</p>
        <button class="trashButton taskButton" onclick="deleteTaskFromIncompleteTasksContainer(this)">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    `;

    newTask.value=null;

    activateTask();
  }
})

completedTasksButton.addEventListener("click", () => {
  completedTasksButton.classList.add("selected");
  incompleteTasksButton.classList.remove("selected");
  completedTasksContainer.classList.remove("undisplay");
  incompleteTasksContainer.classList.add("undisplay");
  noTasksContainer.classList.add("undisplay");
})

incompleteTasksButton.addEventListener("click", () => {
  incompleteTasksButton.classList.add("selected");
  completedTasksButton.classList.remove("selected");
  incompleteTasksContainer.classList.remove("undisplay");
  completedTasksContainer.classList.add("undisplay");

  if (numberOfActiveTasks===0){
    noTasksContainer.classList.remove("undisplay");
  }
})

function moveToCompletedTask(button) {
  taskName=button.nextElementSibling.innerText;
  button.parentNode.remove();

  completedTasksContainer.innerHTML+=`
    <div class="taskContainer completedTask">
      <button class="undoButton taskButton" onclick="undoTask(this)">
        <i class="fas fa-undo"></i>
      </button>
      <p class"completedTask">${taskName}</p>
      <button class="trashButton taskButton" onclick="deleteTaskFromCompletedTasksContainer(this)">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  `;

  deactivateTask();
}

function undoTask(button) {
  taskName=button.nextElementSibling.innerText;
  button.parentNode.remove();

  incompleteTasksContainer.innerHTML+=`
    <div class="taskContainer incompleteTask">
      <button class="checkButton taskButton" onclick="moveToCompletedTask(this)">
        <i class="far fa-check-circle"></i>
      </button>
      <p>${taskName}</p>
      <button class="trashButton taskButton" onclick="deleteTaskFromIncompleteTasksContainer(this)">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  `;

  activateTask();
}

function deleteTaskFromCompletedTasksContainer(button) {
  button.parentNode.remove();
}

function deleteTaskFromIncompleteTasksContainer(button) {
  button.parentNode.remove();

  deactivateTask();
}

function activateTask() {
  numberOfActiveTasks++;

  if (numberOfActiveTasks>0){
    noTasksContainer.classList.add("undisplay");
  }
  
  updateNumberOfActiveTasks();
}

function deactivateTask() {
  numberOfActiveTasks--;

  updateNumberOfActiveTasks();
  
  if (numberOfActiveTasks===0){
    noTasksContainer.classList.remove("undisplay");
  }
}

function updateNumberOfActiveTasks(){
  const isPlural = numberOfActiveTasks !== 1;
  subtitle.innerHTML=`${numberOfActiveTasks} Active task${isPlural ? "s" : ""}`;
}