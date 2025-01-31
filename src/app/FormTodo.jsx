import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const FormTodo = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b style={{ color: "#ccc" }}>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button
        variant="primary mb-3"
        type="submit"
        style={{ marginTop: "12px" }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default FormTodo;
