import React, { useState } from 'react';
import { Form, TextField, Button } from '@shopify/polaris';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checklistItem, setChecklistItem] = useState('');
  const [checklist, setChecklist] = useState([]);

  const handleAddChecklistItem = () => {
    if (checklistItem.trim() !== '') {
      setChecklist([...checklist, { description: checklistItem, isCompleted: false }]);
      setChecklistItem('');
    }
  };

  const handleSubmit = () => {
    onSubmit({ title, description, checklist });
    setTitle('');
    setDescription('');
    setChecklist([]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={setTitle} />
      <TextField label="Description" value={description} onChange={setDescription} />
      <div>
        <TextField label="Checklist Item" value={checklistItem} onChange={setChecklistItem} />
        <Button onClick={handleAddChecklistItem}>Add Item</Button>
      </div>
      <Button submit>Create Task</Button>
    </Form>
  );
};

export default TaskForm;
