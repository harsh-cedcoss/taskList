import { Layout, Modal, TextField, Toast } from "@shopify/polaris";
import React, { useState } from "react";
import TaskAPI from "./taskApiModule";

const CreateTask = ({ isOpen, onClose, fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    description: "",
    checklist: [],
    standard_hours: 0,
  });
  const [errorToast, setErrorToast] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await TaskAPI.createTask(formData);
      console.log("Task created:", response);
      onClose();
      fetchTasks(); 
    } catch (error) {
        setErrorToast(error)
      console.error("Failed to create task:", error);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        title="Create Task"
        primaryAction={{
          content: "Create Task",
          onAction: handleSubmit,
          disabled: formData.title == "" || formData.description == "" || formData.deadline == "" || formData.standard_hours == 0
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: onClose,
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(value) => handleChange("title", value)}
          />
          <TextField
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={(value) => handleChange("deadline", value)}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
          />
          <TextField
            label="Standard hours"
            type="number"
            value={formData.standard_hours}
            onChange={(value) => handleChange("standard_hours", value)}
          />
          {/* Add more fields as needed */}
        </Modal.Section>
      </Modal>
    </>
  );
};

export default CreateTask;
