import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import initialData from './initial-data';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./column";
import Tilt from "./Tilt";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
    state = initialData;

    onDragStart = start => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';

        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

    };

    onDragUpdate = update => {
        const {destination} = update;
        const opacity = destination ?
            destination.index / Object.keys(this.state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
    };

    onDragEnd = result => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';

        const {draggableId, source, destination} = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        // Moving form one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        };
        this.setState(newState);
    };

    render() {
        return (
            <React.Fragment>
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map((columnId) => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks}/>;
                        })}
                    </Container>
                </DragDropContext>

                <div className='totally-centered'>
                    <Tilt>
                        <div className='totally-centered'>
                            vanilla-tilt.js
                        </div>
                    </Tilt>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
