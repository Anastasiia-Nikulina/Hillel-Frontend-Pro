export class FetchHelper {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetchRequest = async (url, method, initRequest) => {
    const fullUrls = new URL(url, this.baseUrl);

    if (initRequest) {
      initRequest.body = JSON.stringify(initRequest.body);
    }

    const defaultHeaders = new Headers();
    defaultHeaders.set("content-type", "application/json");
    const response = await fetch(fullUrls, {
      headers: defaultHeaders,
      method: method,
      ...initRequest,
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    }

    throw generateFetchError(response);
  };



  getAllTodosOfUser = async (userID) => {
    this.renderLoader();

    const todos = await this.fetchRequest(`/users/${userID}/todos`, "GET");

    return todos;
  };

  setTodoById = async (userId, value) => {
    const todoItem = await this.fetchRequest(`/users`, "POST", {
      body: {
        fakeId: userId,
        title: value,
        body: value,
        userId: userId,
      }
    });
    return todoItem;
  };


  deleteAllById = async (userId) => {
    const todoItem = await this.fetchRequest(`/users/${userId}`, "DELETE");

    return todoItem;
  };

  deleteByTodoId = async (userId, itemId) => {

    const todoItem = await this.fetchRequest(`/users/${userId}`, "DELETE", {
      body: {
        fakeId: itemId
      }
    });

    return todoItem;
  };

  renderLoader = () => {
    const loaderElement = document.createElement('div');

    loaderElement.className = "loader-el";
    loaderElement.innerText = "Loading...";
    document.body.appendChild(loaderElement);
    const wrapper = document.querySelector(".wrapper");
    wrapper.style.display = "none";

    setTimeout(() => {
      wrapper.style.display = "flex";
      loaderElement.hidden = true;
    }, 2000);

    return loaderElement;
  };
}
