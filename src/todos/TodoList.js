import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTodos, removeTodosRequest, markTodoAsCompletedRequest } from './thunks';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import NewTodoForm from './NewTodoForm';
import {
    getTodosLoading,
    getCompleteTodos,
    getIncompleteTodos
} from './selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ completedTodos = [], incompletedTodos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);


    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h2>Incomplete Todos</h2>
            {incompletedTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}
            />)}
            <h2>Completed Todos</h2>
            {completedTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}
            />)}
        </ListWrapper>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToPops = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompleteTodos(state),
    incompletedTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodosRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id))
});



export default connect(mapStateToPops, mapDispatchToProps)(TodoList);