import React, { useEffect, useState } from 'react';
import InputName from "./InputName";
import DeleteButton from './DeleteButton';

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

    const handleInputKeyPress = async (e) => {
        try {
            if (e.key === 'Enter' && todoInput.trim() !== '') {
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

    //DELETE
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
                            <li><input className="inputy" type="text" onChange={handleInputChange} onKeyUp={handleInputKeyPress} value={todoInput} placeholder="What needs to be done?"></input></li>
                            {todos.map((todo, index) => (
                                <li key={index}>{todo.label}
                                    <button className="trash" onClick={() => handleDeleteTodo(index)}><i class="fa-solid fa-trash-can"></i></button>
                                </li>
                            ))}
                        </ul>
                        <DeleteButton deleteTodo={deleteTodo} setTodos={setTodos} setShowCardTasks={setShowCardTasks} setUserName={setUserName} setDeleting={setDeleting} setTodoInput={setTodoInput} setItemBoolean={setItemBoolean} />
                    </div>
                </>))
            : (<div className="deletingRender">Deleting todos and user, please wait...</div>)
    )
}

export default TodoList;