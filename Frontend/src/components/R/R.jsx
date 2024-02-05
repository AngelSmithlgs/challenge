import { Routes, Route } from 'react-router-dom';

import Main from "../Utilities/Main";
import Settings from "../Utilities/Settings";
import TaskDetails from "../Utilities/TaskDetails";
import TaskList from "../Utilities/TaskList";

const R = () => {
    return (
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/principal" element={<TaskList />} />
        <Route path="/detalles" element={<TaskDetails />} />
        <Route path="/configuraciones" element={<Settings />} />
      </Routes>
    );
  };
  
  export default R;