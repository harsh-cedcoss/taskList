import Tasks from './Components';
import {Page} from '@shopify/polaris';
import './App.css';
import { Route, Router, Routes } from 'react-router';
import TaskDetails from './Components/taskDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/details/:taskId" element={<TaskDetails />} />
    </Routes>
  );
}

export default App;
