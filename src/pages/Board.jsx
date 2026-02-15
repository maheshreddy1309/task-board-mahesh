import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import Column from "../components/Column";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


export default function Board() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };
const handleDragEnd = (result) => {
  if (!result.destination) return;

  const updatedTasks = tasks.map((task) =>
    task.id === result.draggableId
      ? { ...task, status: result.destination.droppableId }
      : task
  );

  setTasks(updatedTasks);
};

  return (
    <div style={{ padding: 40 }}>
      <h2>Task Board</h2>
      <button onClick={logout}>Logout</button>

      <TaskForm addTask={addTask} />

     <DragDropContext onDragEnd={handleDragEnd}>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    {["Todo", "Doing", "Done"].map((col) => (
      <Droppable droppableId={col} key={col}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              width: "30%",
              minHeight: "200px",
              border: "1px solid gray",
              padding: 10
            }}
          >
            <h3>{col}</h3>

            {tasks
              .filter((t) => t.status === col)
              .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: 10,
                        marginBottom: 10,
                        background: "#f4f4f4",
                        border: "1px solid black",
                        ...provided.draggableProps.style
                      }}
                    >
                      <b>{task.title}</b>
                      <p>{task.description}</p>
                    </div>
                  )}
                </Draggable>
              ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ))}
  </div>
</DragDropContext>

    </div>
  );
}
