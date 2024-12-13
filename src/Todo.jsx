import React, { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "./redux/todoApi";
import { useSelector } from "react-redux";

const Todo = () => {
    let arg
    const { data } = useGetTodosQuery(arg)
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    // const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({

        task: "",
        desc: "",
        isComplete: false,
        priority: "Low",
    });
    const [isEdit, setIsEdit] = useState(false);

    // const { user } = useSelector(state => state.auth)
    // console.log("userrrrrr", user);



    // Open modal for add or edit
    const openModal = (todo = { task: "", desc: "", isComplete: false, priority: "Low" }) => {
        setCurrentTodo(todo);
        setIsEdit(!!todo._id);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTodo({ task: "", desc: "", isComplete: false, priority: "Low" });
    };

    // Handle form submit for add or update
    const handleSubmit = () => {
        // e.preventDefault();
        if (isEdit) {
            updateTodo(currentTodo)
        } else {
            // console.log(currentTodo);
            addTodo(currentTodo)
        }
        closeModal();
    };

    // Delete todo


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Todo List</h1>
                <button
                    onClick={() => openModal()}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Todo
                </button>
                <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-100 text-left">
                                <th className="px-4 py-2 text-gray-600">#</th>
                                <th className="px-4 py-2 text-gray-600">Task</th>
                                <th className="px-4 py-2 text-gray-600">Description</th>
                                <th className="px-4 py-2 text-gray-600">Priority</th>
                                <th className="px-4 py-2 text-gray-600">Completed</th>
                                <th className="px-4 py-2 text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && (
                                data.result.map((todo, index) => (
                                    <tr
                                        key={todo._id}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                                        <td className="px-4 py-2 text-gray-700">{todo.task}</td>
                                        <td className="px-4 py-2 text-gray-700">{todo.desc}</td>
                                        <td className="px-4 py-2 text-gray-700">{todo.priority}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            {todo.isComplete ? "Yes" : "No"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    openModal(todo)
                                                    setIsEdit(true)
                                                }}
                                                className="px-2 py-1 text-sm text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo._id)}
                                                className="px-2 py-1 text-sm text-red-600 hover:underline ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            {isEdit ? "Edit Todo" : "Add Todo"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="task" className="block text-gray-600 mb-2">
                                Task
                            </label>
                            <input
                                id="task"
                                type="text"
                                value={currentTodo.task}
                                onChange={(e) =>
                                    setCurrentTodo({ ...currentTodo, task: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
                                required
                            />

                            <label htmlFor="desc" className="block text-gray-600 mb-2">
                                Description
                            </label>
                            <textarea
                                id="desc"
                                value={currentTodo.desc}
                                onChange={(e) =>
                                    setCurrentTodo({ ...currentTodo, desc: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
                                required
                            ></textarea>

                            <label htmlFor="priority" className="block text-gray-600 mb-2">
                                Priority
                            </label>
                            <select
                                id="priority"
                                value={currentTodo.priority}
                                onChange={(e) =>
                                    setCurrentTodo({ ...currentTodo, priority: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                            <label className="flex items-center text-gray-600 mb-4">
                                <input
                                    type="checkbox"
                                    checked={currentTodo.isComplete}
                                    onChange={(e) =>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            isComplete: e.target.checked,
                                        })
                                    }
                                    className="mr-2"
                                />
                                Mark as Complete
                            </label>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 mr-2"
                                >
                                    Cancel
                                </button>
                                {
                                    isEdit
                                        ? <>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                        </>
                                        : <>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
