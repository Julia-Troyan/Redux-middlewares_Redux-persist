import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, toggleTask, addTask } from "./store/tasksSlice";
import { Provider } from "react-redux";
import store from "./store/store";

const TaskList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <button onClick={handleAddTask}>Добавить</button>
      <ul>
        {items.map((task) => (
          <li key={task.id} onClick={() => dispatch(toggleTask(task.id))} style={{ cursor: "pointer" }}>
            {task.title} {task.completed ? "✔️" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <TaskList />
  </Provider>
);

export default App;