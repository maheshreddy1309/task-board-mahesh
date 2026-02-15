import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const submit = () => {
    if (!title) return alert("Title Required");

 addTask({
  id: uuid(),
  title,
  description: desc,
  status: "Todo",
  priority,
  dueDate,
  createdAt: new Date()
});



    setTitle("");
    setDesc("");
  };

  return (
    <div>
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br /><br />

<label>Priority:</label>
<select onChange={(e) => setPriority(e.target.value)}>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>

<br /><br />

<label>Due Date:</label>
<input
  type="date"
  onChange={(e) => setDueDate(e.target.value)}
/>

      <br /><br />

      <button onClick={submit}>Add Task</button>
    </div>
  );
}
