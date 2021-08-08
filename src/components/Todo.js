import React, { useState, useEffect } from "react";
import TodoService from "../services/TodoService";

const Todo = props => {
    const initialTodoState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [currentTodo, setCurrentTodo] = useState(initialTodoState);
    const [message, setMessage] = useState("");

    const getTodo = id => {
        TodoService.get(id)
            .then(response => {
                setCurrentTodo(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTodo(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTodo({ ...currentTodo, [name]: value });
    };

    const updateTodo = status => {
        var data = {
            id: currentTodo.id,
            title: currentTodo.title
        };

        TodoService.update(currentTodo.id, data)
            .then(response => {
                setCurrentTodo({ ...currentTodo });
                console.log(response.data);
                setMessage("The todo was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    // const updateTutorial = () => {
    //     TutorialDataService.update(currentTutorial.id, currentTutorial)
    //         .then(response => {
    //             console.log(response.data);
    //             setMessage("The tutorial was updated successfully!");
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    const deleteTodo = () => {
        TodoService.remove(currentTodo.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/list");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentTodo ? (
                <div className="edit-form">
                    <h4>Todo</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTodo.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTodo.description}
                                onChange={handleInputChange}
                            />
                        </div>

                    </form>


                    <button className="btn btn-danger" onClick={deleteTodo}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success m-2"
                        onClick={updateTodo}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Todo...</p>
                </div>
            )}
        </div>
    );
};

export default Todo;