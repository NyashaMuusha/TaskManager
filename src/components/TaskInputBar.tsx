import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TaskInputBarProps {
  onAddTodo: (newTodoText: string) => void;
}

const TaskInputBar: React.FC<TaskInputBarProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleAddTodo = async () => {
    await onAddTodo(inputText);
    setInputText('');
  };

  return (
    <div className="flex ">
      <div className="flex-none w-96 h-14 mt-6">
        <input
          type="text"
          placeholder="What do you need to get done today?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full "
        />
      </div>
      <div className="flex-initial w-32 justify-end items-end">
        <FontAwesomeIcon
          icon={faPlus}
          onClick={handleAddTodo}
          className="bg-gray-300 text-white px-4 py-2 rounded-3xl hover:bg-gray-500 ml-10 mt-6"
        />
      </div>
    </div>
  );
};

export default TaskInputBar;
