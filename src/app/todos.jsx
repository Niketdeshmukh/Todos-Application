"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Head from "next/head";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles1 from '../app/todo.module.css';
import Styles2 from '../app/codeEditor.module.css';
import TodoItem from './TodoItem';
import FormTodo from './FormTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      text: "Complete your todos list 😊",
      description: "Initial task description",
      isDone: false,
      lastUpdated: new Date(),
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const editInputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearchTerm(term);
  }, [searchParams]);

  useEffect(() => {
    if (editingIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingIndex]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, description: "New task", isDone: false, lastUpdated: new Date() }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    newTodos[index].lastUpdated = new Date();
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editingText;
    newTodos[index].lastUpdated = new Date();
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`?search=${encodeURIComponent(searchTerm)}`);
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="image__styling"></div>
      <div className={Styles1.app}>
        <div className={Styles2.code__editor}>
          <div className={Styles2.top__bar}>
            <ul className={Styles2.control}>
              <li className={Styles2.button}></li>
              <li className={Styles2.button}></li>
              <li className={Styles2.button}></li>
            </ul>
            <div className={Styles2.file__path}>~/Users/NIKET/todosList</div>
          </div>
          <div className={Styles1.container}>
            <h1 className={`${Styles2.text__center} ${Styles2.mb-4}`} style={{ color: "#f0ffffc9" }}>
              Todo List
            </h1>
            <FormTodo addTodo={addTodo} />

            <Form onSubmit={handleSearchSubmit} style={{ marginBottom: "20px" }}>
              <Form.Group>
                <Form.Label><b style={{ color: "#ccc" }}>Search Todo</b></Form.Label>
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search todos"
                />
              </Form.Group>
              <Button variant="primary mb-3" type="submit" style={{ marginTop: "12px" }}>
                Search
              </Button>
            </Form>

            <div>
              {filteredTodos.map((todo, index) => (
                <Card key={index} style={{ marginBottom: "30px" }}>
                  <Card.Body>
                    <TodoItem
                      index={index}
                      todo={todo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}
                      toggleExpand={toggleExpand}
                      expandedIndex={expandedIndex}
                      editingIndex={editingIndex}
                      startEditing={startEditing}
                      saveEdit={saveEdit}
                      cancelEdit={cancelEdit}
                      handleEditChange={handleEditChange}
                      editInputRef={editInputRef}
                      editingText={editingText}
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TodoPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoList />
    </Suspense>
  );
};

export default TodoPage;
