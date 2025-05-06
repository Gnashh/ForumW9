import React, {useState} from "react";
import {IoIosClose} from 'react-icons/io';
import {useDispatch} from 'react-redux';
import {addTodo} from '../slices/taskSlice';
import styles from '../styles/modalstyle.scss';
import Button from "./Button";
import {v4 as uuid} from 'uuid';

function AddTask({modalOpen, setModalOpen}){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [due, setDue] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && desc && due){
            dispatch(
                addTodo({
                    id: uuid(),
                    title,
                    desc, due
                })
            )
        }
    };
    
    return (
        modalOpen &&(
            <div class = "wrapper">
                <div class = "container">
                    <div class = "closeButton" 
                    onClick={() => setModalOpen(false)}
                    onKeyDown={() => setModalOpen(false)}
                    tabIndex={0}
                    role="button"
                    >
                        <IoIosClose/>
                    </div>  
                    <form class = "form" onSubmit={(e)=>handleSubmit(e)}>
                        <h1 class = "formTitle"> New Task </h1>
                        <label htmlFor = "title">
                            Title
                            <input 
                                type = "text" 
                                id="title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor = "desc">
                            Description
                            <input 
                                type = "text" 
                                id="desc" 
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <label htmlFor = "due">
                            Due
                            <input 
                                type = "text" 
                                id="due" 
                                value={due}
                                onChange={(e) => setDue(e.target.value)}
                            />
                        </label>
                        <button class = "buttonContainer" type = "submit">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        )
    )
}

export default AddTask;