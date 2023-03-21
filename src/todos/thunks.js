import {
    loadTodosInProgress,
    removeTodo,
    loadTodoSuccess,
    loadTodoFailure,
    createTodo,
    markTodoAsCompleted
} from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodoSuccess(todos));
    } catch (e) {
        dispatch(loadTodoFailure());
        dispatch(displayAlert(e));
    }

}

export const addTodosRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body
        });

        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }

}

export const removeTodosRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });

        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }

}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });

        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }

}

export const displayAlert = text => () => {
    alert(`Error occurred: ${text}`);
};