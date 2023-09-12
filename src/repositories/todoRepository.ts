import { apiUrl } from '../constants/constants';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export type InsertTodo = {
  title: string;
  completed?: boolean;
};

export const addTodoItem = async (todoText: InsertTodo): Promise<Todo> => {
  try {
    const response = await fetch(`${apiUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ title: todoText.title }),
    });

    if (!response.ok) {
      console.error('Failed to add todo item');
    }

    return response.json();
  } catch (error) {
    console.error('Error adding todo item:', error);
    throw error;
  }
};

export const deleteTodoItem = async (todoId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo item');
    }
    return true;
  } catch (error) {
    console.error('Error deleting todo item:', error);
    throw error;
  }
};
