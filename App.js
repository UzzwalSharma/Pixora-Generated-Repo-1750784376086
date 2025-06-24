import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Trash2, Check } from 'lucide-react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: crypto.randomUUID(), text: newTodo, completed: false, createdAt: new Date() },
      ]);
      setNewTodo('');
    }
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8 flex items-center gap-2'>
          🎯 Todo App
        </h1>
        <div className='flex gap-2 mb-8'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add a new task...'
            className='flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          />
          <button
            onClick={addTodo}
            className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2'
          >
            <Plus /> Add
          </button>
        </div>
        <div className='space-y-4'>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className='flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all'
            >
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => toggleCompleted(todo.id)}
                  className={`p-2 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
                >
                  <Check className={`w-4 h-4 ${todo.completed ? 'text-white' : 'text-transparent'}`} />
                </button>
                <div>
                  <p className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.text}
                  </p>
                  <p className='text-sm text-gray-500'>{format(todo.createdAt, 'PPP')}</p>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all'
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;