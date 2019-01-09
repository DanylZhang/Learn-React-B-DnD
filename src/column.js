import React from 'react';
import styled from 'styled-components';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: white;    
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease-in-out;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
    //flex-grow: 1;
    //min-height: 100px;
    
    display: flex;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.tasks.map((task, index) =>
            <Task key={task.id} task={task} index={index}/>
        )
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                        <Droppable
                            droppableId={this.props.column.id}
                            isDropDisabled={this.props.isDropDisabled}
                            direction='horizontal'
                            type='task'
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks}/>
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}