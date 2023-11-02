import React from 'react'

const DeleteButton = ({ deleteTodo, setTodos, setShowCardTasks, setUserName, setItemBoolean, setTodoInput, setDeleting }) => {
    const handleDeleteButton = () => {
        setDeleting(true)
        setTimeout(() => {
            deleteTodo(); //correcto
            setDeleting(false); //correcto
            setItemBoolean(false); //correcto
            setTodos([]); //correcto
            setShowCardTasks(false); //correcto
            setTodoInput(''); //correcto
            setUserName(''); //correcto
        }, 1500)


    }
    return (
        <div>

            <button type="button" className="deleteButton" onClick={handleDeleteButton}><i class="fa-regular fa-circle-xmark"></i> Delete all tasks and username</button>


        </div>
    )
}

export default DeleteButton