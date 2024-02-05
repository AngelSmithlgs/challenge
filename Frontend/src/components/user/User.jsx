import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './user.css';
import './chat.css';
import ChatBot from '../chatbot/ChatBot';
import Companion from '../chatbot/Companion';

const User = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: null, priority: 'Baja' });
  const [editTaskId, setEditTaskId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = () => {
    if (editTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId
            ? { ...task, ...newTask, completed: false, selected: false }
            : task
        )
      );
      setEditTaskId(null);
    } else {
      const taskId = tasks.length + 1;
      const newTaskItem = { id: taskId, ...newTask, completed: false, selected: false };
      setTasks([...tasks, newTaskItem]);
    }
    setNewTask({ name: '', description: '', dueDate: null, priority: 'Baja' });
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setNewTask({ ...taskToEdit });
      setEditTaskId(taskId);
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleToggleTaskSelection = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleFilterTasks = (filterType) => {
    setSelectedPriority(filterType);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks
    .filter(task => selectedPriority === 'Todas' || task.priority === selectedPriority)
    .filter(task => searchTerm === '' || task.name.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const visibleTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const today = new Date(); 
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };


  return (
    <div className="user-container">
      <div className="task-form">
        <div className="card p-3 rounded">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre de la tarea"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Descripción de la tarea"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <div className="d-flex justify-content-between">
          <select
              className="form-control mb-2"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
            <p>Cambiar Fecha</p>
            <DatePicker
  selected={newTask.dueDate || today}
  onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
  dateFormat="yyyy-MM-dd"
  className={`form-control mb-2 ${!newTask.dueDate ? 'date-not-selected' : ''}`}
/>



          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddTask}
          >
            {editTaskId !== null ? 'Guardar Cambios' : 'Añadir Tarea'}
          </button>
        </div>
      </div>

      <div className="task-list">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por prioridad, nombre o descripción"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="filter-buttons">
            <button onClick={() => handleFilterTasks('Todas')}>Todas</button>
            <button onClick={() => handleFilterTasks('Baja')}>Baja</button>
            <button onClick={() => handleFilterTasks('Media')}>Media</button>
            <button onClick={() => handleFilterTasks('Alta')}>Alta</button>
          </div>
        </div>

        <ul className="list-group">
          {visibleTasks.map((task) => (
            <li key={task.id} className={`list-group-item ${task.priority.toLowerCase()} ${task.completed ? 'completed-task' : ''} rounded mb-2 p-3`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={task.selected}
                  onChange={() => handleToggleTaskSelection(task.id)}
                />
                <label className="form-check-label">
                  <h5>{task.name}</h5>
                  <p>{task.description}</p>
                </label>
              </div>
              <div className="task-details">
              <p>Fecha: {task.dueDate ? task.dueDate.toLocaleDateString() : 'Sin fecha'}</p>
                <p>Prioridad: {task.priority}</p>
              </div>
              <div className="task-actions">
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleCompleteTask(task.id)}
                >
                  Completar
                </button>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleViewTaskDetails(task.id)}
                >
                  Detalles
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditTask(task.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <p>Página {currentPage} de {totalPages}</p>
          </div>
      </div>
      
      <div className="chat-container">
      {isChatOpen && <ChatBot />}
      <Companion onClick={toggleChat} />
      </div>
    </div>
  );
};

export default User;