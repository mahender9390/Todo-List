const addbtn = document.querySelector("form button");
const intask = document.querySelector("form input");
const task = document.querySelector(".task");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
class addTask {

    add(newtask) {
        if (newtask.trim() === "") {
            alert("plz enter you task");
        }
        else {
            task.innerHTML += `
            <div class="list">
                <p>${newtask}</p>
                <button><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        }
    }
    delete() {
        const del = document.querySelectorAll(".list button");
        del.forEach((btn) => {
            btn.addEventListener("click", () => {
                tasks = tasks.filter((temp) => {
                    return temp !== btn.parentNode.children[0].innerText;
                })
                localStorage.setItem("tasks", JSON.stringify(tasks));
                btn.parentNode.remove();
            })
        });
    }
}
let obj = new addTask();
addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (tasks.includes(intask.value)) {
        alert("YOU HAVE ALREADY A TASK WITH THE NAME");
        return;
    }
    obj.add(intask.value);
    obj.delete();
    if (intask.value.trim() !== "" && !tasks.includes(intask.value)) {
        tasks = [...tasks, intask.value];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    intask.value = "";
});
(() => {
    for (t of tasks) {
        obj.add(t);
    }
    obj.delete();
})();
