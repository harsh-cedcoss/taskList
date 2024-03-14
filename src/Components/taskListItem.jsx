import React from 'react';

const TaskListItem = ({ task }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><b>Client : </b>{task.client}</p>
      {/* <ul>
        {task.checklist.map((item, index) => (
          <li key={index} style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
            {item.description}
          </li>
        ))}
      </ul> */}
    </li>
  );
};

export default TaskListItem;
