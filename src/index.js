import './styles/style.css'
import { loginConfig } from './components/formConfigs'
import { Input } from './components/Input'
import { Form } from './components/Form'
import { TaskBoard } from './components/TaskBoard'
import { Auth } from './components/Auth'

import { api } from './components/API'
// import { config } from 'webpack'

const appContainer = document.getElementById('app');

const onLoginSuccess = async () => {
    console.log('hello');
    appContainer.innerHTML = '';
    const user = await api.getSelf();
    renderAppLayout(user);
}

 const auth = new Auth({
    appContainer,
    onLoginSuccess,
});

export const taskBoard = new TaskBoard({
    appContainer
})

const renderAppLayout = async (user) => {
    auth.user = user;
    auth.renderHeaderControls();
    taskBoard.renderLayout();

    const taskList = await api.getAllTasks();

    taskList.forEach((task) => taskBoard.addTask(task))

};


const init = async () => {
const isLoggedIn = api.isLoggedIn();
if(isLoggedIn) {
    const user = await api.autoLogin();
    renderAppLayout(user);
 } else {
    auth.renderAuthForm();
 }

};

init();


// const testFormContainer = document.createElement('div');
// testFormContainer.classList.add('auth-form');


// appContainer.append(testFormContainer);

// const loginForm = new Form({
//  inputs: loginConfig.map((config) => new Input(config)),
//  onSubmit: (values) => console.log('values', values),
//  submitBtnText: 'Вхід',
//  title: 'Login'
// });

// loginForm.render(testFormContainer)



// const input = new Input({
//     name: 'email',
//     placeholder: 'Enter email',
//     label: 'Email',
// });

// input.render(document.body)



// const api = new API();
// api.get('/auth/user/self')


// api.register({
//     email: "testemaail@ga.com",
//     password: "1q2w3e",
//     name: "testemail",
// }).then(() => {
//     api.login({
//         email: "testhh@gmail.com",
//         password: "Testhh"
//     }).then((res) => {
//         api.getSelf();
//     }).catch((err) => {
    
//         console.log('err',err)
    
//     })
// })


// api.getSelf();


//  const isLoggedIn = api.isLoggedIn();
// if(isLoggedIn) {
//     api.autoLogin()
//  } else {
// //     // render auth form
//    console.log('LOGIN')
//  }
