import React from 'react';
import styled from 'styled-components';
import {Draggable} from "react-beautiful-dnd";

const Container = styled.div`
  border: 3px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${props =>
    props.isDragDisabled
        ? 'lightgrey'
        : props.isDragging
        ? 'lightgreen'
        : 'white'};
  
  width: 40px;
  height: 40px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus {
    outline: none;
    border-color: red;
  }
`;

const Handler = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export default class Task extends React.Component {
    render() {
        const isDragDisabled = this.props.task.id === 'task-1';
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                    >
                        <Handler/>
                        {this.props.task.content[0]}
                    </Container>
                )}
            </Draggable>
        );
    }
}