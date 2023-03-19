import { Form } from "./Form";
import { Input } from "./Input";
import { taskConfig } from "./formConfigs";
import { api } from "./API";
import { Task } from "./task";

const getTaskForm = (onTaskCreated) => 
new Form({
    title: 'Add task',
    inputs: taskConfig.map((input) => new Input(input)),
    submitBtnText: 'Add',
    onSubmit: async (data) => {
        const createdTask = await api.createTask(data);
        onTaskCreated(createdTask);
    },
});

export class TaskBoard {
    constructor({ appContainer }) {
        this.appContainer = appContainer;
        this.taskForm = getTaskForm(this.addTask.bind(this));
        this.taskContainer = document.createElement('div'); 
    }

    renderLayout(){
        this.board = document.createElement('div');
        const formContainer = document.createElement('div');

        this.board.classList.add('board');
        formContainer.classList.add('task-form');
        this.taskContainer.classList.add('task-cards');

        this.board.append(formContainer, this.taskContainer);
        this.taskForm.render(formContainer);
        

        this.appContainer.append(this.board);
        // console.log('board',board)
    }

    addTask(taskData) {
        console.log('this', this)
    const task = new Task(taskData);

    task.renderCard(this.taskContainer)
    }

    logout(){
        this.board.innerHTML = '';
        this.taskContainer.innerHTML = ''; 
    }
}