import React, { useState, useEffect } from 'react';
import { todoService } from '../services/api';

function Content() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load todos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'finished' : 'active';
      await todoService.updateTodo(id, { todo_status: newStatus });
      
      // Update local state
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, todo_status: newStatus } : todo
      ));
    } catch (err) {
      setError("Failed to update todo status. Please try again.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      
      // Update local state
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="content">
      {todos.length === 0 ? (
        <div className="no-todos">No todos yet. Add your first todo!</div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className={`todo-item ${todo.todo_status}`}>
            <div className="todo-image">
              <img src={todo.todo_image} alt={todo.todo_name} />
            </div>
            <div className="todo-details">
              <h3>{todo.todo_name}</h3>
              <p>{todo.todo_desc}</p>
              <div className="todo-actions">
                <button 
                  onClick={() => handleStatusChange(todo._id, todo.todo_status)}
                  className={todo.todo_status === 'active' ? 'finish-btn' : 'reactivate-btn'}
                >
                  {todo.todo_status === 'active' ? 'Mark as Done' : 'Reactivate'}
                </button>
                <button 
                  onClick={() => handleDelete(todo._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Content;
