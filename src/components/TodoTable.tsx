import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../repositories/todoRepository';

interface TodoTableProps {
  todoColumns: string[];
  filteredTodos: Todo[];
  handleCompleteTodo: (todoId: number) => void;
  handleDeleteTodo: (todoId: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({
  todoColumns,
  filteredTodos,
  handleCompleteTodo,
  handleDeleteTodo,
}) => {
  return (
    <table className=" table-fixed w-1/2 rounded-md ">
      <thead className="border rounded-full text-left">
        <tr className=" py-4">
          <th></th>
          <th className="py-2 text-left">Task</th>
          <th className="py-2 text-left">Title</th>
          <th className="py-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="border rounded-sm  ">
        {filteredTodos.length !== 0 ? (
          filteredTodos.map((todo) => (
            <tr className="border rounded-sm" key={todo.id}>
              <td className=" py-2 text-center ">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCompleteTodo(todo.id)}
                  className="ml-4"
                />
              </td>
              <td className="text-left">{`TASK-${todo.id}`}</td>
              <td
                className={` text-left${todo.completed ? 'line-through' : ''}`}
              >
                {todo.title}
              </td>
              <td className="text-center">
                <FontAwesomeIcon
                  className="text-gray-400 px-2 py-1 rounded-sm hover-bg-gray-200"
                  icon={faTrash}
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center my-4 py-4">
              No tasks to display
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TodoTable;
