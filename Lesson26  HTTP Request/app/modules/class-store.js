import { FetchHelper } from "./fetch-helper.js";
export class Store {

    constructor(){
        this.fetchHelper = new FetchHelper("https://jsonplaceholder.typicode.com");
    }

    getState(id) {
        const store = this.fetchHelper.getAllTodosOfUser(id);

        return store;
    }

    setState(id, value) {      
        return this.fetchHelper.setTodoById(id, value);
    }

    deleteState(id, index) {
        return this.fetchHelper.deleteByTodoId(id, index);
    }

    deleteAllStates(id) {
        return this.fetchHelper.deleteAllById(id);
    }
}