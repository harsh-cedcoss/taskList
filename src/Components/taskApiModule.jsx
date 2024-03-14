const BASE_URL = 'https://s.track.talkwisely.app/api/tracker/task';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwOTIzNjk5LCJpYXQiOjE3MTAzMTg4OTksImp0aSI6ImM0OWVmYjY4Y2YxMDQ2MWM4OTc4YTY1ZmE4NDM2MDk0IiwidXNlcl9pZCI6NDR9.qj6d1XHimyTxd26sps6-xednvCq3s0ukIVRqjdT0SOg'

const TaskAPI = {
  fetchTasks: async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  createTask: async (taskData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_uuid: "ad97dcc7-0311-4664-9657-faa26f1deac1",
          title: taskData.title,
          deadline: taskData.deadline,
          description: taskData.description,
          checklist: taskData.checklist || [],
          users: [{"name": "test.user", "role": "assignee"}, {"name": "jay.desai", "role": "manager"}],
          labels: ["Label 1", "Label 2"],      
          standard_hours: taskData.standard_hours || 0
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  fetchTaskDetails: async (taskId) => {
    try {
      const response = await fetch(`${BASE_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default TaskAPI;
