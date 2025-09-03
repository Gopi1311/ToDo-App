import React, { useState,useEffect } from "react";
import { Form, Button, Container, Card, ListGroup, Row, Col, Badge } from "react-bootstrap";
import '../styleSheet/TodoStyleSheet.css';

const Todo = () => {
  const [tasks, setTasks] = useState(()=>{
    const save=localStorage.getItem("tasks");
    try {
      return save?JSON.parse(save): [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleUpdateTask = () => {
    if (editingTask.trim() === "" || editingIndex === null) return;
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editingTask;
    setTasks(updatedTasks);
    cancelEdit();
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingTask("");
    setEditingIndex(null);
  };

  const startEdit = (index) => {
    setIsEditing(true);
    setEditingTask(tasks[index].text);
    setEditingIndex(index);
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100 py-4 todo-bg">
      <Card className="shadow-lg p-4 w-100 todo-card" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-3">
          <i className="bi bi-check2-circle me-2"></i>Todo List
        </h2>
        
        {/* Stats */}
        {tasks.length > 0 && (
          <div className="d-flex justify-content-between mb-3">
            <small className="text-muted">
              Total: <Badge bg="secondary">{tasks.length}</Badge>
            </small>
            <small className="text-muted">
              Completed: <Badge bg="success">{completedCount}</Badge>
            </small>
            <small className="text-muted">
              Remaining: <Badge bg="warning">{tasks.length - completedCount}</Badge>
            </small>
          </div>
        )}

        {/* Add Task Form */}
        <Form onSubmit={handleAddTask}>
          <Row className="g-2">
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="What needs to be done?"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
                className="py-2"
              />
            </Col>
            <Col xs={3}>
              <Button type="submit" variant="primary" className="task-add w-100 py-2">
                <i className="bi bi-plus-lg me-1"></i> Add
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Task List */}
        <ListGroup className="mt-4">
          {tasks.length === 0 ? (
            <ListGroup.Item className="text-muted text-center py-4">
              <i className="bi bi-inbox display-4 d-block mb-2"></i>
              Your todo list is empty!<br />
              <small>Add a task above to get started.</small>
            </ListGroup.Item>
          ) : (
            tasks.map((task, index) => (
              <ListGroup.Item
                key={index}
                className={`d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : ''}`}
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="me-3"
                  />
                  <div>
                    <div className={task.completed ? "text-decoration-line-through text-muted" : "fw-semibold"}>
                      {task.text}
                    </div>
                    <small className={task.completed ? "text-success" : "text-muted"}>
                      {task.completed ? "Completed" : "Pending"}
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => startEdit(index)}
                    disabled={task.completed}
                  >Edit 
                    <i className="bi bi-pencil-fill ms-1"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(index)}
                  >Delete
                    <i className="bi bi-trash ms-1"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>

        {/* Clear completed button */}
        {completedCount > 0 && (
          <div className="d-flex justify-content-end mt-3">
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => setTasks(tasks.filter(task => !task.completed))}
            >
              <i className="bi bi-trash me-1"></i> Clear Completed
            </Button>
          </div>
        )}

        {/* Edit Task Modal */}
        {isEditing && (
          <div className="modal-backdrop show d-flex justify-content-center align-items-center" style={{opacity:0.9}}>
            <Card className="p-3 shadow-lg" style={{ width: "90%", maxWidth: "500px" }}>
              <Card.Header className="bg-light">
                <h5 className="mb-0">Edit Task</h5>
              </Card.Header>
              <Card.Body>
                <Form.Control
                  type="text"
                  placeholder="Update your task..."
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdateTask()}
                  autoFocus
                  className="py-2"
                />
                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <Button variant="secondary" size="sm" onClick={cancelEdit}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleUpdateTask}>
                    Save Changes
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Todo;