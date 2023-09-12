import { useState, useEffect } from 'react';
import { todoColumns, apiUrl } from '../constants/constants';
import {
  addTodoItem,
  deleteTodoItem,
  Todo,
  InsertTodo,
} from '../repositories/todoRepository';
import SearchBar from './SearchBar';
import TaskInputBar from './TaskInputBar';
import TodoTable from './TodoTable';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

  const loadTodos = async (): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (inputText: string) => {
    try {
      const newTodoData: InsertTodo = { title: inputText };
      const newTodo = await addTodoItem(newTodoData);
      loadTodos();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const success = await deleteTodoItem(todoId);
      if (success) {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleCompleteTodo = async (todoId: number) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to complete todo:', error);
    }
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title && todo.title.toLowerCase().includes(filterText.toLowerCase()),
  );
  const handleFilterChange = (newFilter: string) => {
    console.log('filter text', newFilter);
    setFilterText(newFilter);
  };

  return (
    <div className="container mt-10">
      <div className="justify-self-auto">
        <div>
          <h2 className="font-bold mt-8 mb-2 text-3xl">Welcome back!</h2>
          <span className="mt-2 mb-1 text-gray-500">
            Here's a list of your tasks for today.
          </span>
        </div>
        <div className="mb-7 mt-5">
          <SearchBar
            filterText={filterText}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div>
          <TodoTable
            todoColumns={todoColumns}
            filteredTodos={filteredTodos}
            handleCompleteTodo={handleCompleteTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        </div>
        <div className="mb-10 mt-5">
          <TaskInputBar onAddTodo={handleAddTodo} />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
