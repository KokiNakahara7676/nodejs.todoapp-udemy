const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");


const params = window.location.search;
const id = new URLSearchParams(params).get("id");

//一つの特定のタスクを取得する
const showTask = async () => {
    try {
        const { data : task } = await axios.get(`/api/v1/tasks/${id}`);
        //const { _id , completed, name} = task ;
        //上のようにしても可能。（以下を task._id->_id に変更が必要）
        taskIDDOM.textContent = task._id;
        taskNameDOM.value = task.name;
        if(task.completed == true){
            taskCompletedDOM.checked = true;
        }

    }catch(err){
        console.log(err);
    }
} 



showTask();


//タスクの編集
editFormDOM.addEventListener("submit", async(e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompletedDOM.checked;
        const {data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "編集に成功しました。";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
})

setTimeout(() => {
    formAlertDOM.style.display = "none"
    formAlertDOM.classList.remove("text-success")
},10000)