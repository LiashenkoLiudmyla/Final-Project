export const TOKEN_KEY = "token";
class ApiError extends Error {
    constructor({message, data, status}) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

class API {
    constructor() {
        this.baseUrl = 'https://byte-tasks.herokuapp.com/api';
        this.headers = {
            Authorization: null, //сюди токен як нормально авторизов буде працювати, як ні буде нал
            "Content-Type": "application/json",
        };
    }

    async handelErrors (response) {
        const { ok, status, statusText } = response;
            if(!ok) {
            // throw new ApiError (`Response on ${url} failed with status${status}`)
        throw new ApiError({
            message: 'Error!',
            data: await response.json(),
            status: status
        })
        }
    }

    async register(data) {
        const response = await fetch(`${this.baseUrl}/auth/register`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
            });

            await this.handelErrors(response);
    
            const registeredUser = await response.json();
    
            return registeredUser
        }

   async login(data) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
        });

        await this.handelErrors(response)

        const { token } = await response.json();

        this.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem(TOKEN_KEY, token);
    }

    async getSelf() {
        const response = await fetch(`${this.baseUrl}/auth/user/self`, {
        method: 'GET',
        headers: this.headers,
        })

        await this.handelErrors(response)

        const user = await response.json()
        // ...handleErrors

        return user;
    }

    isLoggedIn() {
        return Boolean(localStorage.getItem(TOKEN_KEY))
    }

    autoLogin() {
        const localToken = localStorage.getItem(TOKEN_KEY);
        this.headers.Authorization = `Bearer ${localToken}`;

        return this.getSelf()
    }

    async createTask(data) {
        const response = await fetch(`${this.baseUrl}/task`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
        });

        await this.handelErrors(response);

        return response.json();
    }

    async getAllTasks() {
        const response = await fetch(`${this.baseUrl}/task`, {
            method: 'GET',
            headers: this.headers,
        });

        await this.handelErrors(response);

        return await response.json();
    }

    async editTask (id, data) {
        const res = await fetch(`${this.baseUrl}/task/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: this.headers,
        });

        await this.handelErrors(res);

        return res.json();
    }

    async deleteTask (id) {
        const res = await fetch(`${this.baseUrl}/task/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        });

        await this.handelErrors(res);

        return res;
    }



    logout() {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export const api = new API();
