import React from "react";

import { Counter } from "./Counter";

function TaskCounter(props) {

    const { done, inProgress } = props;

    return (
        <React.Fragment>
            <div className="tasks-counters">
                <div className="counter-container counter-done">
                    <Counter count={done} counterClassName='Counter' />
                    <p className="text-task text-done">Done</p>
                </div>
                <div className="counter-separator-container">
                    <span className="counter-separator"></span>
                </div>
                <div className="counter-container counter-in-progress">
                    <Counter count={inProgress} counterClassName='Counter' />
                    <p className="text-task text-in-progress">In Progress</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export { TaskCounter };
