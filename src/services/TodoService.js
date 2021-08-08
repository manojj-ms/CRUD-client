import http from "../http";

const getAll = () => {
    return http.get("/todo");
};

const get = (id) => {
    return http.get(`/todo/${id}`);
};

const create = (data) => {
    return http.post("/todo", data);
};

const update = (id, data) => {
    return http.put(`/todo/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/todo/${id}`);
};

const findByTitle = (title) => {
    return http.get(`/todo?title=${title}`);
};

const TodoService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle,
};

export default TodoService;