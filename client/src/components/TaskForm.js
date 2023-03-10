import React from 'react';

const TaskForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        Task: <input type="text" value={props.value} onChange={props.cth}></input>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
 
export default TaskForm;