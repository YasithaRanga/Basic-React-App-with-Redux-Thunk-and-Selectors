import React from 'react';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    postion: relative;
    box-shadow: 0 4px 8px grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const getBorderStyleForDate = (startingDate, currentDate) =>
(startingDate > new Date(currentDate - 8640000 * 5)
    ? 'none'
    : '2px solid red');

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`;

const TodoItemTitle = styled.h3`
    
`;

const ButtonsContainer = styled.div`
    postion: absolute;
    right: 12px;
    left: 12px;
`;

const Button = styled.div`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;



const CompletedButton = styled(Button)`
    background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
    color: #fff;
    background-color: #ee2222;
    margin-left: 8px;
`;



const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
    return (
        <Container createdAt={todo.createdAt}>
            <div>
                <TodoItemTitle>{todo.text}</TodoItemTitle>
                <p>
                    Created at:&nbsp;
                    {(new Date(todo.createdAt)).toLocaleDateString()}
                </p>
            </div>
            <ButtonsContainer>
                {todo.isCompleted ? null : <CompletedButton
                    onClick={() => onCompletedPressed(todo.id)}
                    className='completed-button'>
                    Mark as completed
                </CompletedButton>}
                <RemoveButton
                    onClick={() => onRemovePressed(todo.id)}
                    className='remove-button'>
                    Remove
                </RemoveButton>
            </ButtonsContainer>
        </Container>
    )
};

export default TodoListItem;