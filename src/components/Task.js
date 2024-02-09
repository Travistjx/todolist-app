import React, { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
  const [taskName, setTaskName] = useState("");
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const toDoList = "http://localhost:8080/todolist";
        const response = await axios.get(toDoList, { timeout: 10000 });
        setTaskData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApi();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {taskData?.map((task) => (
        <p key={task.taskId}>{task.taskName}</p>
      ))}
    </div>
  );
};

export default Task;
