import { Button, Form } from "react-bootstrap";
import Styles1 from '../app/todo.module.css';

const TodoItem = ({
  todo,
  index,
  markTodo,
  removeTodo,
  toggleExpand,
  expandedIndex,
  editingIndex,
  startEditing,
  saveEdit,
  cancelEdit,
  handleEditChange,
  editInputRef,
  editingText
}) => {
  return (
    <div className={Styles1.todo}>
      {editingIndex === index ? (
        <>
          <Form.Control
            type="text"
            ref={editInputRef}
            value={editingText}
            onChange={handleEditChange}
            autoFocus
          />
          <Button variant="outline-success" onClick={() => saveEdit(index)}>
            Save
          </Button>
          <Button variant="outline-secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
            {todo.text}
          </span>
          <div>
            <Button variant="outline-primary" onClick={() => startEditing(index)}>
              Edit
            </Button>{" "}
            <Button variant="outline-success" onClick={() => markTodo(index)}>
              ✓
            </Button>{" "}
            <Button variant="outline-danger" onClick={() => removeTodo(index)}>
              ✕
            </Button>{" "}
            <Button variant="outline-info" onClick={() => toggleExpand(index)}>
              {expandedIndex === index ? "Collapse" : "Expand"}
            </Button>
          </div>
          {expandedIndex === index && (
            <div className={Styles1.todoDetails} style={{  }}>
              <p style={{color:'#444',fontSize:'smaller'}}><strong>Description:</strong> {todo.description}</p>
              <p style={{color:'#444',fontSize:'smaller'}}><strong>Last Updated:</strong> {new Date(todo.lastUpdated).toLocaleString()}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoItem;
