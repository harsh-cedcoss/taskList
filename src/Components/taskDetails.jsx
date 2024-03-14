// TaskDetails.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskAPI from "./taskApiModule";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      const response = await TaskAPI.fetchTaskDetails(taskId);
      setTaskDetails(response.data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!taskDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{taskDetails.title}</h1>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <p className="text-gray-600">
          <strong>Description:</strong> {taskDetails.description}
        </p>
        <p className="text-gray-600">
          <strong>Client:</strong> {taskDetails.project.client.name}
        </p>
        <p className="text-gray-600">
          <strong>Standard Hours:</strong> {taskDetails.standard_hours}
        </p>
        <p className="text-gray-600">
          <strong>Deadline:</strong> {taskDetails.deadline}
        </p>
      </div>
      {taskDetails.checklists.length > 0 && (
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Checklist</h2>
          {taskDetails.checklists.map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={item.is_completed}
                className="mr-2"
              />
              <p className={item.is_completed ? "line-through" : ""}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Labels</h2>
        {taskDetails.labels.map((label, index) => (
          <div
            key={index}
            className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2"
          >
            {label.name}
          </div>
        ))}
      </div>
      {/* <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Back
      </button> */}
    </div>
  );
};

export default TaskDetails;
