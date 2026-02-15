export default function Column({ title, tasks }) {
  return (
    <div style={{ width: "30%", padding: 10, border: "1px solid gray" }}>
      <h3>{title}</h3>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid black",
            margin: 8,
            padding: 8
          }}
        >
          <b>{task.title}</b>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
