import React, { useState } from "react";
import { Form, Button, Container, Card, ListGroup, Row, Col } from "react-bootstrap";

const Todo = () => {
  const [items, setItems] = useState([]);
  const [add, setAdd] = useState("");

  const handleItem = (e) => {
    e.preventDefault();
    if (add.trim() === ""){
         return; // Prevent adding empty tasks
    }
    setItems((prev) => [...prev, add]);
    setAdd("");
  };

  const deleteItem = (index) => {
    const deleteArr = items.filter((_, i) => i !== index);
    setItems(deleteArr);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">✨ Todo List ✨</h2>

        {/* Form Section */}
        <Form onSubmit={handleItem}>
          <Row className="g-2">
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="Enter a new task..."
                onChange={(e) => setAdd(e.target.value)}
                value={add}
              />
            </Col>
            <Col xs={3}>
              <Button type="submit" variant="success" className="w-100">
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Todo List Section */}
        <ListGroup className="mt-4">
          {items.length === 0 ? (
            <ListGroup.Item className="text-muted text-center">
              No tasks yet! Add one above 🚀
            </ListGroup.Item>
          ) : (
            items.map((value, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{value}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteItem(index)}
                >
                  ❌ Delete
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Todo;
