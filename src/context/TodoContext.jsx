import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dummyTodos from '../data/dummyTodos.js';

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);

  const addTodo = useCallback((todo) => {
    setTodos((currentTodos) => {
      // ID berikutnya selalu satu angka di atas ID terbesar saat ini.
      const nextId = Math.max(0, ...currentTodos.map((item) => item.id)) + 1;
      return [{ ...todo, id: nextId }, ...currentTodos];
    });
  }, []);

  const updateTodo = useCallback((id, updates) => {
    const todoId = Number(id);
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, ...updates, id: todo.id } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    const todoId = Number(id);
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  }, []);

  const getTodoById = useCallback(
    (id) => todos.find((todo) => todo.id === Number(id)),
    [todos],
  );

  const value = useMemo(
    () => ({ todos, addTodo, updateTodo, deleteTodo, getTodoById }),
    [todos, addTodo, updateTodo, deleteTodo, getTodoById],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos harus digunakan di dalam TodoProvider.');
  }
  return context;
}
