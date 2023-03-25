import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UsersContext } from "./App";
import { validateUser } from "./validators";

const EditUserForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { users, editUser } = useContext(UsersContext);
  const userData = users.find((user) => user.id === Number(userId));
  const { name, username, address, email } = userData;

  const [formData, setFormData] = useState({
    name,
    username,
    address,
    email,
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
  });

  const redirectToHome = () => navigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, fieldErrors } = validateUser(formData);

    if (isValid) {
      fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => res.json())
        .then((user) => {
          editUser(user);
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
          <Card.Title>Edit user</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onInput={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              ></Form.Control>
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onInput={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onInput={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              ></Form.Control>
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={formData.address?.city}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...address, city: e.target.value },
                  })
                }
              ></Form.Control>
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

export default EditUserForm;
