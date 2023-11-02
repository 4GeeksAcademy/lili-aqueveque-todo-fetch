import React, { useEffect, useState } from 'react';
import InputName from "./InputName";
import DeleteButton from './DeleteButton';
import DeleteTasks from './DeleteTasks';


//Correcciones:

//Corregi sintaxis, class por className, for por htmlFor
//Agregue un boton para añadir tareas a la lista y a la API
//Condicione el boton de Delete para que se renderice solo cuando hay la menos una tarea añadida
//Respectivas aplicaciones en CSS
//Ademas de tener un boton "DELETE ALL TASKS AND USERNAME" se agrega boton que elimina tareas "CLEAN ALL TASKS" sin borrar el username
//Nuevo componente DeleteTasks
//Al presionar icono de borrar cada tarea por si sola, se elimina de la todo list visual, no en la API, por razones externas de la API.



const TodoList = () => {

    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);
    const [userNameRender, setUserName] = useState('');
    const [showCardTasks, setShowCardTasks] = useState(false);
    const [itemBoolean, setItemBoolean] = useState(false);
    const [deleting, setDeleting] = useState(false);


    let url = 'https://playground.4geeks.com/apis/fake/todos/user/';




    const handleInputChange = (e) => {
        setTodoInput(e.target.value);
    };

    //add new tasks to api
    const handleAddTodo = async (e) => {
        try {
            if (todoInput.trim() !== '') {
                let obj = {
                    label: todoInput,
                    done: false
                }
                setTodos([...todos, obj]);
                setItemBoolean(true);
                setTodoInput('');

                const setPutData = await putData();
                console.log('Sending Data...', setPutData);
            }
        }

        catch (error) {
            console.log('Request failed', error);
        }
    };



    //delete tasks from api (and also username but it gets recreated again)
    const clearAllTasks = async () => {
        try {
            // DELETE all tasks and username
            let userNameAPI = userNameRender;
            let urlAPI = url + userNameAPI;
            const responseDel = await fetch(urlAPI, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if (responseDel.ok) {
                console.log('Tasks and username deleted successfully.');
            } else {
                throw new Error('Failed to delete tasks and username.');
            }

            // CREATE the username again
            const responsePost = await fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify([]), // Empty array to represent no tasks initially
            });

            if (responsePost.ok) {
                console.log('Username created again.');
            } else {
                throw new Error('Failed to create username.');
            }

            // Reset local state
            setTodos([]);
            setItemBoolean(false);
            setTodoInput('');
        } catch (error) {
            console.error('Error clearing tasks and username:', error);
        }
    };




    useEffect(() => {
        if (userNameRender !== '') {
            postData();
        }
    }, [userNameRender])



    //POST = add username
    const postData = async () => {
        try {
            let userNameAPI = userNameRender;
            let urlAPI = url + userNameAPI;

            const response = await fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([])
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                console.log('You created a new user');
            }

            else if (userNameRender == userNameRender) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                console.log('this user already exists');
                console.log('You will enter the usernames info if they already have a todo list');
                getData();
            }

            else {
                throw new Error('Request failed');
            }
        }

        catch (error) {
            console.log('Error getting API', error)
        }
    }


    //PUT = add to-dos
    const putData = async () => {
        try {
            let userNameAPI = userNameRender;
            let urlAPI = url + userNameAPI;
            const responsePut = await fetch(urlAPI, {
                method: 'PUT',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(todos)
            });

            if (responsePut.ok) {
                const jsonResponsePut = await responsePut.json();
                return jsonResponsePut.msg;
            }
            else {
                throw new Error('PUT request failed')
            }
        }
        catch (error) {
            console.log('Request of GET failed', error)
        }
    }



    //DELETE ALL TASKS AND USERNAME
    const deleteTodo = async () => {
        try {
            let userNameAPI = userNameRender;
            let urlAPI = url + userNameAPI;
            const responseDel = await fetch(urlAPI, {
                method: 'DELETE',
                headers: {
                    'Content-type': "application/json"
                },
            })
            if (responseDel.ok) { //deletion is successful and response is parsed as JSON and logged to the console
                const jsonResponseDel = await responseDel.json();
                console.log(jsonResponseDel);
            }
            else {
                throw new Error('Request failed. Username is not part of the API')
            }
        }

        catch (error) {
            console.log('Deletion request failed', error)
        }
    }



    //GET
    const getData = async () => {
        try {
            let userNameAPI = userNameRender;
            let urlAPI = url + userNameAPI;
            const responseGet = await fetch(urlAPI, {
                method: 'GET',
                headers: {
                    'Content-type': "application/json"
                },
            }); //Send request GET to API endpoint

            if (responseGet.ok) { //200-299
                const jsonResponseGet = await responseGet.json();
                const label = jsonResponseGet.map(labelResponse => labelResponse);
                setTodos(label);
                setItemBoolean(true);
            }

            else {
                throw new Error('Request failed GET')
            }
        }

        catch (error) {
            console.log('Request GET failed', error)
        }
    }





    const handleDeleteTodo = (index) => {
        const updateTodos = [...todos];
        updateTodos.splice(index, 1);
        setTodos(updateTodos);
    }

    return (
        !deleting ? (
            !showCardTasks ? (<InputName setShowCardTasks={setShowCardTasks} setUserName={setUserName} postData={postData} />) :
                (<>
                    <h1 className='text-center'>todos by {userNameRender}</h1>
                    <div className="note">
                        <ul>
                            <li><input className="inputy" type="text" onChange={handleInputChange} value={todoInput} placeholder="What needs to be done?"></input><button className="addTaskButton" onClick={handleAddTodo}><i class="fa-solid fa-plus"></i> Add</button></li>
                            {todos.map((todo, index) => (
                                <li key={index}>{todo.label}
                                    <button className="trash" onClick={() => handleDeleteTodo(index)}><i className="fa-solid fa-trash-can"></i></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {todos.length > 0 && (
                        <div>
                            <DeleteTasks clearAllTasks={clearAllTasks} setTodoInput={setTodoInput} setItemBoolean={setItemBoolean} setTodos={setTodos} />
                            <DeleteButton deleteTodo={deleteTodo} setTodos={setTodos} setShowCardTasks={setShowCardTasks} setUserName={setUserName} setDeleting={setDeleting} setTodoInput={setTodoInput} setItemBoolean={setItemBoolean} />
                        </div>
                    )}
                </>))
            : (<div className="deletingRender">Deleting todos and user, please wait...</div>)
    )
}

export default TodoList;