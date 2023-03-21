import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTodos, removeTodosRequest, markTodoAsCompletedRequest } from './thunks';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);


    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className='list-wrapper'>
            <NewTodoForm />
            {todos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}
            />)}
        </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToPops = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodosRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id))
});



export default connect(mapStateToPops, mapDispatchToProps)(TodoList);