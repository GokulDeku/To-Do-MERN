import React, {useEffect, useState} from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/taskServices";

import Taskbox from "./Taskbox";
import TaskForm from "./TaskForm";
import TaskEdit from "./TaskEdit";

const Tasks = (props) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editTask, setEditTask] = useState({});
  const [completeFlag, setCompleteFlag] = useState(false);
  const [todoData, setTodoData] = useState({_id:'', task: '', completed: ''});
  const [openFlag, setOpen] = React.useState(false);


  const toggleModal = () => {
    setOpen(!openFlag);
  }

  // Gets all task from db on page load

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const {data: response} = await getTasks();
        console.log(response);
        setTasks(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);  
    };
  
    fetchData();
    
  }, []);

  // Sets Current Task in the input field

  const currentTaskHandler = (e) => {
    setCurrentTask(e.target.value);
    console.log(currentTask);
  }

  // Handles Adding task to the db and updating local list

  const submitHandler = (e) => {

    e.preventDefault();

    const sendData = async() => {
      try {
        const {data} = await addTask({task: currentTask});
        setTasks(oldTasks => [...oldTasks, data]);
        setCurrentTask("");
      } catch (error) {
        console.log(error);
      }
    };

    sendData();
    
  }

  // Passes data from Taskbox to Tasks

  const passData = (data) => {

    setTodoData(data);
    setOpen(!openFlag);
  }

  // Handles updation of task

  const updateHandler = (data) => {

    const updateChanges = async() => { 
      try {
        const tempArr = [...tasks]
        const arrIndex = tempArr.findIndex((task) => task._id === data._id)
        tempArr[arrIndex] = data;
        const {resdata} = await updateTask(data._id, {task: tempArr[arrIndex].task});
        setTasks(tempArr);
        setOpen(!openFlag);
      } catch (error) {
        console.log(error);
      }
    }

    updateChanges();
  }

  // Change Completed status in db and local

  const completeHandler = (index) => {

    const updateCompletedStatus = async() => {
      try {
        const tempArr = [...tasks]
        const arrIndex = tempArr.findIndex((task) => task._id === index)
        tempArr[arrIndex].completed = !tempArr[arrIndex].completed;
        const {data} = await updateTask(index, {completed: tempArr[arrIndex].completed});
        setTasks(tempArr);
      } catch (error) {
        console.log(error);
      }
    };

    updateCompletedStatus();
  }

  // Deletes the task from local and db

  const deleteHandler = (index) => {

    const deleteData = async() => {
      try {
        const tempArr = [...tasks]
        const changedArr = tempArr.filter((task) => task._id !== index)
        setTasks(changedArr);
        await deleteTask(index);
        setOpen(!openFlag);
      } catch (error) {
        console.log(error);
      }
    };

    deleteData();
  }

  return (
    <div>
      <TaskForm value={currentTask} onSubmit={submitHandler} cth={currentTaskHandler}></TaskForm>
      {loading && <div>Loading</div>}
      {!loading && (
      <div>
        <h2>Tasks</h2>
        <Taskbox tasks={tasks} passData={passData} completeHandler={completeHandler}></Taskbox>
      </div>
    )}
      <TaskEdit data={todoData} openFlag={openFlag} toggleModal={toggleModal}  updateHandler={updateHandler} deleteHandler={deleteHandler}></TaskEdit>
    </div>
  );
};

export default Tasks;
