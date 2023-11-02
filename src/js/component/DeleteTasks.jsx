import React from 'react'

const DeleteTasks = ({ clearAllTasks, setItemBoolean, setTodoInput, setTodos }) => {
    const handleDeleteButton = () => {
        setTimeout(() => {
            clearAllTasks(); //correcto
            setItemBoolean(false); //correcto
            setTodoInput(''); //correcto
            setTodos([]);
        }, 500)  //medio segundo


    }
    return (
        <div>

            <button type="button" className="deleteTasksButton" onClick={handleDeleteButton}><i class="fa-solid fa-broom"></i> Clean all tasks</button>


        </div>
    )
}

export default DeleteTasks