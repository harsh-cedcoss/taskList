import React from 'react';
import TaskListItem from './taskListItem';

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
