// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoListFunction = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState({
        name: "",
        position: "",
        date: "",
        mail: "",
        image: null,
        phone: "",
        address: "",
        status: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [viewTask, setViewTask] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false); // For error popup
    const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation
    const [notification, setNotification] = useState({ message: "", visible: false }); // For side popup



    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) setTasks(storedTasks);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTaskInput((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        let formErrors = {};

        if (!taskInput.name) formErrors.name = "Enter valid Name";
        if (!taskInput.position) formErrors.position = "Enter valid Position";
        if (!taskInput.date) formErrors.date = "Enter valid Date";
        if (!taskInput.mail || !validateEmail(taskInput.mail))
            formErrors.mail = "Please enter a valid email address.";
        if (!taskInput.phone || !validatePhone(taskInput.phone))
            formErrors.phone = "Please enter a valid 10-digit phone number.";
        if (!taskInput.address) formErrors.address = "Address is required.";
        if (!taskInput.status) formErrors.status = "Select a valid Status.";


        setErrors(formErrors);
        setShowPopup(Object.keys(formErrors).length > 0); // Show popup if errors exist
        return Object.keys(formErrors).length === 0;
    };

    const showNotification = (message) => {
        setNotification({ message, visible: true });
        setTimeout(() => setNotification({ message: "", visible: false }), 3000); // Hide after 3 seconds
    };

    const addTask = () => {
        if (validateForm()) {
            const newTasks = [...tasks, taskInput];
            setTasks(newTasks);
            setTaskInput({
                name: "",
                position: "",
                date: "",
                mail: "",
                image: null,
                phone: "",
                address: "",
                status: "",
            });
            setErrors({});
            showNotification("User added successfully!");
        }
    };

    const confirmDeleteTask = (index) => {
        setConfirmDelete(index);
    };

    const deleteTask = () => {
        const updatedTasks = tasks.filter((_, i) => i !== confirmDelete);
        setTasks(updatedTasks);
        setConfirmDelete(null);
        showNotification("User deleted successfully!");
    };

    const startEditing = (index) => {
        setEditIndex(index);
        setTaskInput({ ...tasks[index] });
    };

    const saveTask = () => {
        if (validateForm()) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = taskInput;
            setTasks(updatedTasks);
            setEditIndex(null);
            setTaskInput({
                name: "",
                position: "",
                date: "",
                mail: "",
                image: null,
                phone: "",
                address: "",
                status: "",
            });
            setErrors({});
            showNotification("User added successfully!");
        }
    };

    const viewDetails = (task) => {
        setViewTask(task);
    };

    const closeModal = () => {
        setViewTask(null);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="min-h-screen bg-black text-white text-center">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-semibold mb-6">User Information Table</h1>

                {/* Task Input Form start */}
                <div className="overflow-x-auto">
                    <table className="table mx-auto bg-black text-start text-white rounded-lg shadow-lg">
                        <tbody className="border-1 border-black">
                            <tr className="border border-solid flex flex-wrap sm:flex-nowrap">

                                {/* Profile Image */}
                                <td className="border text-start w-full sm:w-[303px] p-4">
                                    {/* Profile Image Input */}
                                    <div className="justify-center text-center mb-2">
                                        <label className="text-lg mb-[10px]">Profile Image</label>
                                    </div>
                                    <div
                                        className="border-2 border-dashed h-[150px] p-6 rounded-lg bg-black border-white cursor-pointer relative mt-[calc(50%-75px)]" // mt-[calc(50%-75px)] centers the box vertically
                                        onClick={() => document.getElementById('file-input').click()} // Trigger file input click
                                    >
                                        <input
                                            type="file"
                                            id="file-input"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
                                        />
                                        {!taskInput.image ? (
                                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                                <span className="text-sm">Click to upload an image</span>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <img
                                                    src={taskInput.image}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Other Form Inputs */}
                                <td className="border border-solid p-4 w-full sm:w-auto">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="mx-2 pl-2 mr-3">Name: </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={taskInput.name}
                                            onChange={handleChange}
                                            placeholder="Enter Your Name"
                                            className="border w-[200px] px-4 py-2 rounded bg-black text-white"
                                        />
                                    </div>

                                    <br />

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="mail" className="mx-2 pl-2 mr-4">Email: </label>
                                        <input
                                            type="email"
                                            name="mail"
                                            value={taskInput.mail}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="border px-3 w-[200px] py-2 rounded bg-black text-white"
                                        />
                                    </div>

                                    <br />

                                    {/* Position */}
                                    <div>
                                        <label htmlFor="position" className="px-1 pl-2">Position: </label>
                                        <select
                                            name="position"
                                            value={taskInput.position}
                                            onChange={handleChange}
                                            placeholder="Position"
                                            className="border w-[200px] px-3 py-2 rounded bg-black text-white">
                                            <option value="">Select Position</option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Data Scientist">Data Scientist</option>
                                            <option value="Product Manager">Product Manager</option>
                                            <option value="UX/UI Designer">UX/UI Designer</option>
                                        </select>
                                    </div>

                                    <br />

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="pl-2 mr-4">Phone: </label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={taskInput.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                            className="border w-[200px] px-3 py-2 rounded bg-black text-white"
                                        />
                                    </div>

                                    <br />

                                    {/* Date */}
                                    <div>
                                        <label htmlFor="date" className="pl-2 mr-7">Date: </label>
                                        <DatePicker
                                            selected={taskInput.date ? new Date(taskInput.date) : null}
                                            onChange={(date) => handleChange({ target: { name: "date", value: date?.toISOString().split('T')[0] } })}
                                            dateFormat="yyyy-MM-dd"
                                            className="border w-[200px]  px-3 py-2 rounded bg-black text-white"
                                            placeholderText="Select a date"
                                        />
                                    </div>

                                    <br />

                                    {/* Status */}
                                    <div>
                                        <label htmlFor="status" className="pl-2 mr-5">Status: </label>
                                        <select
                                            name="status"
                                            value={taskInput.status}
                                            onChange={handleChange}
                                            className="border w-[200px] px-1 py-2 rounded bg-black text-white"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Banned">Banned</option>
                                        </select>
                                    </div>

                                    <br />

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="pl-2 mr-1">Address: </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={taskInput.address}
                                            onChange={handleChange}
                                            placeholder="Address"
                                            className="border w-[200px] px-3 py-2 rounded bg-black text-white"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4 px-[25%]">
                                        <button
                                            onClick={editIndex === null ? addTask : saveTask}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            {editIndex === null ? "Add User" : "Save Changes"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Task Input Form end */}


                {/* Table Display Model start*/}
                <div className="custom-scrollbar-container">
                    <table className="table-auto border-collapse w-full text-left mt-10" style={{ borderSpacing: "0 10px" }}>
                        <thead>
                            <tr className="hover:bg-gray-900 border-[10px] border-black text-center h-[76px]">
                                <th className="px-4 py-2 min-w-[130px] cursor-pointer"
                                > User </th>
                                <th className="px-4 py-2 min-w-[350px]"></th>
                                <th className="px-4 py-2 min-w-[150px]">Created</th>
                                <th className="px-4 py-2 min-w-[100px]">Status</th>
                                <th className="px-4 py-2 min-w-[200px]">Email</th>
                                <th className="px-4 py-2 min-w-[200px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className="hover:bg-gray-800 border-[10px] border-black bg-gray-950 text-center">
                                    <td className="px-4 py-2">
                                        {task.image && (
                                            <img
                                                src={task.image}
                                                alt={task.name}
                                                className="w-12 h-12 object-cover rounded mx-auto"
                                            />
                                        )}
                                    </td>
                                    <td className="text-start px-4 py-2">
                                        <label className="text-blue-500 text-[18px] block">{task.name}</label>
                                        <label className="text-[12px] text-gray-300">{task.position}</label>
                                    </td>
                                    <td className="px-4 py-2">{task.date}</td>
                                    <td className="text-center px-4 py-2">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-white 
                            ${task.status === "Active" ? "bg-green-600" : ""}
                            ${task.status === "Inactive" ? "bg-gray-600" : ""}
                            ${task.status === "Pending" ? "bg-yellow-600" : ""}
                            ${task.status === "Banned" ? "bg-red-600" : ""}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{task.mail}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => viewDetails(task)}
                                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => startEditing(index)}
                                                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => confirmDeleteTask(index)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Table Display Model end*/}

                {/* Show popup Error model start */}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="bg-gray-950 text-whitw rounded-lg shadow-lg p-6 w-96">
                            <h2 className="text-lg font-semibold mb-4">Validation Errors</h2>
                            <ul className=" text-red-600">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li className="my-1" key={field}>{message}</li>
                                ))}
                            </ul>
                            <button
                                onClick={closePopup}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {/* Show popup Error model end */}

                {/* Notifocation model start */}
                 {notification.visible && (
                    <div className="fixed top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg transition-all">
                        {notification.message}
                    </div>
                )}
                {/* notification model end */}

                {/* confirm Delete Model start */}
                {confirmDelete !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-center">
                        <div className="bg-black text-white p-6 rounded shadow-md border">
                            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete <strong>{tasks[confirmDelete].name}</strong>?</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteTask}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* confirm Delete Model end */}


                {/* View Task Details Modal start*/}
                {viewTask && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black  bg-opacity-75">
                        <div className="bg-black p-6 rounded-lg shadow-lg w-96">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold mb-2">User Details</h2>

                                {/* close button */}
                                <button
                                    onClick={closeModal}
                                    className="text-white bg-red-600 w-[30px] pb-[17px]  rounded-full hover:bg-red-700 h-[30px]"
                                >
                                    {/* &times; */}
                                    x
                                </button>
                            </div>

                            {/* profile picture */}
                            <div className="mb-4">
                                {viewTask.image && (
                                    <img
                                        src={viewTask.image}
                                        alt={viewTask.name}
                                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                                    />
                                )}
                            </div>

                            <table className="w-full ml-[5%]">
                                <tbody>
                                    {/* name */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <strong>Name :</strong>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.name}
                                        </td>
                                    </tr>

                                    {/* position */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Position :</strong></>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.position}
                                        </td>
                                    </tr>

                                    {/* number */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Phone :</strong> </>
                                            </div>

                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.phone}
                                        </td>
                                    </tr>

                                    {/* mail */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Email :</strong> </>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.mail}
                                        </td>
                                    </tr>

                                    {/* status */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Status :</strong></>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            <span
                                                className={`font-bold
                                                    ${viewTask.status === "Active" ? "text-green-600" : ""}
                                                    ${viewTask.status === "Inactive" ? "text-gray-600" : ""}
                                                    ${viewTask.status === "Pending" ? "text-yellow-600" : ""}
                                                    ${viewTask.status === "Banned" ? "text-red-600" : ""} `}>
                                                {viewTask.status}
                                            </span>
                                        </td>
                                    </tr>

                                    {/* date */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Created :</strong> </>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.date}
                                        </td>
                                    </tr>

                                    {/* address */}
                                    <tr>
                                        <td className="text-left pl-7">
                                            <div>
                                                <><strong>Address :</strong> </>
                                            </div>
                                        </td>

                                        <td className="text-left pl-2">
                                            {viewTask.address}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* View Task Details Modal end*/}

            </div>
        </div >
    );
};

export default TodoListFunction;