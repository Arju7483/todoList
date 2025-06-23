console.log("Script loaded");

interface Todo {
  id: number;
  taskName: string;
  completed: boolean;
}

let TodoList: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
let deleteTargetId: number | null = null;

const form = document.getElementById("form-id") as HTMLFormElement;
//console.log(form);
const input = document.getElementById("input-id") as HTMLInputElement;
    //console.log(input);
const list = document.getElementById("list-id") as HTMLUListElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const confirmDeleteBtn = document.getElementById("confirm-delete");
//console.log(confirmDeleteBtn);
const cancelDeleteBtn = document.getElementById("cancel-delete");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputTask = input.value.trim();

  if (inputTask) {
    const newtodo: Todo = {
      id: Date.now(),
      taskName: inputTask,
      completed: false,
    };
    TodoList.push(newtodo);
    saveTodos();
    renderTodos();
    input.value = "";
  }
  alert("task added");
});

function renderTodos(): void {
  list.innerHTML = "";
   console.log(Date.now());
  TodoList.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.taskName;
    li.classList.toggle("completed", todo.completed);
    li.dataset.id = todo.id.toString();

    // Toggle completed on double-click
    li.ondblclick = () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    };

    // Create delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTargetId = todo.id;
      modal.classList.remove("hidden");
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

const saveTodos = (): void => {
  localStorage.setItem("todos", JSON.stringify(TodoList));
};

// Confirm Deletion
confirmDeleteBtn.addEventListener("click", () => {
  if (deleteTargetId !== null) {
    TodoList = TodoList.filter((todo) => todo.id !== deleteTargetId);
    saveTodos();
    renderTodos();
    deleteTargetId = null;
    modal.classList.add("hidden");
  }
});

// Cancel Deletion
cancelDeleteBtn.addEventListener("click", () => {
  deleteTargetId = null;
  modal.classList.add("hidden");
});

// Initial render on load
renderTodos();
