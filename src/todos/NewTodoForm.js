import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodosRequest } from './thunks';
import './NewTodoForm.css';



const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div className='new-todo-form'>
            <input
                className='new-todo-input'
                type='text'
                placeholder='Type your new todo here...'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button
                onClick={() => {
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText && inputValue !== '') {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className='new-todo-button'>
                Create Todo
            </button>
        </div>
    )
};


const mapStateToPops = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodosRequest(text)),
});

export default connect(mapStateToPops, mapDispatchToProps)(NewTodoForm);