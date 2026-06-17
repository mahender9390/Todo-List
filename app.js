const addbtn = document.querySelector("form button");
const inputtask = document.querySelector("form input");
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
                <span><i class="fa-regular fa-pen-to-square"></i></span>
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
    finishedtask()
    {
        const addedtasks=document.querySelectorAll(".list p");
        addedtasks.forEach((p)=>{
            p.addEventListener("click",()=>{
                if(p.style.textDecoration =="line-through")
                {
                    p.style.textDecoration="none";
                }
                else{
                    p.style.textDecoration="line-through";
                }
            })
        })
    }
    edittask(){
        const edit=document.querySelectorAll(".list span");
        edit.forEach((e)=>{
            e.addEventListener("click",()=>{
                let para= e.parentNode.children[0];
                let oldtask=e.parentNode.children[0].innerText;
                para.contentEditable ="true";
                para.focus();
                para.addEventListener("blur",()=>
                {
                    para.contentEditable ="false";
                    for(let i=0;i<tasks.length;i++){
                        if(tasks[i]===oldtask)
                        {
                            tasks[i]=para.innerText;
                        }
                    }
                    localStorage.setItem("tasks",JSON.stringify(tasks));
                });
            })
        })
    }
}
let obj = new addTask();
addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (tasks.includes(inputtask.value)) {
        alert("YOU HAVE ALREADY A TASK WITH THE NAME");
        return;
    }
    obj.add(inputtask.value);
    obj.delete();
    obj.finishedtask();
    if (inputtask.value.trim() !== "" && !tasks.includes(inputtask.value)) {
        tasks = [...tasks, inputtask.value];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    inputtask.value = "";
});
(() => {
    for (t of tasks) {
        obj.add(t);
    }
    obj.delete();
    obj.finishedtask();
    obj.edittask();
})();