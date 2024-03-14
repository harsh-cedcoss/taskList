import React, { useEffect, useState } from "react";
import { BlockStack, Card, Modal, Text } from "@shopify/polaris";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import TaskAPI from "./taskApiModule";
import { Link, useNavigate } from "react-router-dom";
import CreateTask from "./createTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true); 
      const response = await TaskAPI.fetchTasks();
      setTasks(response.data);
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Create Task
        </button>
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Client</th>
          </tr>
        </thead>
        <tbody>
          {console.log("task", tasks)}
          {(tasks.length > 0 && !isLoading)
            ? tasks.map((task, index) => (
                <tr
                  key={task.task_id}
                  className={`hover:bg-blue-100 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  }`}
                  onClick={() => {
                    window.location.href = `/details/${task.task_id}`;
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td className="px-4 py-2">{task.title || ""}</td>
                  <td className="px-4 py-2">{task.description || ""}</td>
                  <td className="px-4 py-2">{task.client || ""}</td>
                </tr>
              ))
            : [...Array(6)].map((_, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                >
                  <td className="px-4 py-2">
                    <div className="animate-pulse h-4 w-20 bg-gray-300"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="animate-pulse h-4 w-32 bg-gray-300"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="animate-pulse h-4 w-16 bg-gray-300"></div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {isModalOpen && (
        <CreateTask
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default Tasks;
