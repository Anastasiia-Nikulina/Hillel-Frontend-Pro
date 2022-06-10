export class Store {

    getState(id) {
        const store = localStorage.getItem(id);

        if (!store) {
            const initStore = [];
            localStorage.setItem(id, JSON.stringify(initStore))
            return initStore;
        }
        return JSON.parse(store);
    }

    setState(id, value) {
        const state = this.getState(id);
        state.push(value);
        localStorage.setItem(id, JSON.stringify(state));

    }

    deleteState(id, index) {
        const state = this.getState(id);
        state.splice(index - 1, 1);
        localStorage.setItem(id, JSON.stringify(state));
    }

    deleteAllStates(id) {
        localStorage.removeItem(id);
    }
}