import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import initialData from './initial-data';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from "./column";
import Tilt from "./Tilt";

class App extends React.Component {
    state = initialData;

    onDragEnd = result => {
        // TODO: reorder our column

    };

    render() {
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {
                        this.state.columnOrder.map((columnId) => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks}/>;
                        })
                    }
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
