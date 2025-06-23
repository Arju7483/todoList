console.log("Script loaded");
var TodoList = JSON.parse(localStorage.getItem("todos") || "[]");
var deleteTargetId = null;
var form = document.getElementById("form-id");
//console.log(form);
var input = document.getElementById("input-id");
//console.log(input);
var list = document.getElementById("list-id");
var modal = document.getElementById("modal");
var confirmDeleteBtn = document.getElementById("confirm-delete");
//console.log(confirmDeleteBtn);
var cancelDeleteBtn = document.getElementById("cancel-delete");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var inputTask = input.value.trim();
    if (inputTask) {
        var newtodo = {
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
function renderTodos() {
    list.innerHTML = "";
    console.log(Date.now());
    TodoList.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.taskName;
        li.classList.toggle("completed", todo.completed);
        li.dataset.id = todo.id.toString();
        // Toggle completed on double-click
        li.ondblclick = function () {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        };
        // Create delete button
        var delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = function (e) {
            e.stopPropagation();
            deleteTargetId = todo.id;
            modal.classList.remove("hidden");
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
var saveTodos = function () {
    localStorage.setItem("todos", JSON.stringify(TodoList));
};
// Confirm Deletion
confirmDeleteBtn.addEventListener("click", function () {
    if (deleteTargetId !== null) {
        TodoList = TodoList.filter(function (todo) { return todo.id !== deleteTargetId; });
        saveTodos();
        renderTodos();
        deleteTargetId = null;
        modal.classList.add("hidden");
    }
});
// Cancel Deletion
cancelDeleteBtn.addEventListener("click", function () {
    deleteTargetId = null;
    modal.classList.add("hidden");
});
// Initial render on load
renderTodos();
