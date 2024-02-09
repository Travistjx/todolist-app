import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import styles from "./Home.module.css";
import { useRef } from "react";

const Home = () => {
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    taskName: "",
    localDateTime: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateTaskName = (newTaskName) => {
    setTask((prevTask) => ({
      ...prevTask,
      taskName: newTaskName,
    }));
  };
  const updateTaskDateTime = (newTaskDateTime) => {
    setTask((prevTask) => ({
      ...prevTask,
      localDateTime: newTaskDateTime,
    }));
  };

  const [taskData, setTaskData] = useState(null);

  const handleSubmit = () => {
    const handlePostRequest = async () => {
      try {
        console.log(task);
        const response = await axios.post(
          "http://localhost:8080/todolist",
          task,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        updateTaskName("");
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (formRef.current.checkValidity() === false) {
    } else {
      handlePostRequest();
      handleClose();
    }
    setValidated(true);
  };

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
  }, [taskData]);

  return (
    <div style={{ textAlign: "center", margin: "30px" }}>
      <h1>To Do List</h1>

      {/* Button to open task modal*/}
      <Button
        variant="success"
        style={{ marginBottom: "20px" }}
        onClick={handleShow}
      >
        {" "}
        + Add Tasks
      </Button>

      {/* Modal which shows up where user can fill in task details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} ref={formRef}>
            <Form.Group md="4" controlId="validationCustom02">
              <Form.Control
                type="text"
                placeholder="Task Name"
                value={task.taskName}
                onChange={(e) => updateTaskName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="4" controlId="validationCustom02">
              <Form.Control
                style={{ marginTop: "10px" }}
                placeholder="Date/Time"
                type="datetime-local"
                value={task.localDateTime}
                onChange={(e) => updateTaskDateTime(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date/time.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Display tasks */}
      <div style={{}}>
        {taskData?.map((task) => (
          <div
            className={`${styles["box"]} ${styles["fade-in"]}`}
            key={task.taskId}
          >
            <p style={{ textAlign: "left", margin: "10px" }}>{task.taskName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
