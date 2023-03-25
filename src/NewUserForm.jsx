import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { UsersContext } from "./App";
import { validateUser } from "./validators";

const NewUserForm = () => {
  const navigate = useNavigate();
  const { addUser } = useContext(UsersContext);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: null, email: null });

  const redirectToHome = () => navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, fieldErrors } = validateUser(formData);

    if (isValid) {
      fetch(
        "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => res.json())
        .then((user) => {
          addUser(user);
          redirectToHome();
        });
    } else {
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-50">
        <Card.Body>
          <Card.Title>Add new user</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onInput={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              ></Form.Control>
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onInput={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              ></Form.Control>
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <div className="mt-4 d-flex justify-content-end gap-3">
              <Button variant="outline-warning" onClick={redirectToHome}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewUserForm;
