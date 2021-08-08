import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import TodoService from "../services/TodoService";

const List = (props) => {
    const [todo, setTodo] = useState([]);
    const [searchTodo, setSearchTodo] = useState("");
    const todoRef = useRef();

    todoRef.current = todo;

    useEffect(() => {
        retrieveTodo();
    }, []);

    const onChangeSearchTodo = (e) => {
        const searchTodo = e.target.value;
        setSearchTodo(searchTodo);
    };

    const retrieveTodo = () => {
        TodoService.getAll()
            .then((response) => {
                setTodo(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTodo();
    };

    const findByTitle = () => {
        TodoService.findByTitle(searchTodo)
            .then((response) => {
                setTodo(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openTodo = (rowIndex) => {
        const id = todoRef.current[rowIndex].id;

        props.history.push("/todo/" + id);
    };

    const deleteTodo = (rowIndex) => {
        const id = todoRef.current[rowIndex].id;

        TodoService.remove(id)
            .then((response) => {
                props.history.push("/list");

                let newTodo = [...todoRef.current];
                newTodo.splice(rowIndex, 1);

                setTodo(newTodo);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openTodo(rowIdx)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </span>

                            <span onClick={() => deleteTodo(rowIdx)} className="m-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: todo,
    });


    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTodo}
                        onChange={onChangeSearchTodo}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default List;