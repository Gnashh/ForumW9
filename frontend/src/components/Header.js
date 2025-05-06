import React, { useState } from 'react';
import { todoService } from '../services/api';

function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    todo_name: '',
    todo_desc: '',
    todo_image: 'https://api.dicebear.com/9.x/icons/svg?seed=Katherine',
    todo_status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await todoService.createTodo(formData);
      
      // Reset form
      setFormData({
        todo_name: '',
        todo_desc: '',
        todo_image: 'https://api.dicebear.com/9.x/icons/svg?seed=Katherine',
        todo_status: 'active'
      });
      
      setIsFormOpen(false);
      
      // Refresh the todo list (you might want to use a context or prop function here)
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header">
      <button 
        className="add-button" 
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {isFormOpen ? 'Cancel' : 'Add New Todo'}
      </button>

      {isFormOpen && (
        <div className="todo-form">
          <h2>Add New Todo</h2>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="todo_name">Todo Name</label>
              <input
                type="text"
                id="todo_name"
                name="todo_name"
                value={formData.todo_name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="todo_desc">Description</label>
              <textarea
                id="todo_desc"
                name="todo_desc"
                value={formData.todo_desc}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="todo_image">Image URL</label>
              <input
                type="text"
                id="todo_image"
                name="todo_image"
                value={formData.todo_image}
                onChange={handleChange}
              />
              <small>Leave default for a random icon</small>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Todo'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Header;
