import { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UsersContext } from "./App";
import Delete from "./Delete";

const Home = () => {
  const { isLoading, users, orderByUsername } = useContext(UsersContext);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="d-flex justify-content-end m-4 gap-3">
        <Button onClick={() => orderByUsername("ASC")}>
          Order by username ascending
        </Button>
        <Button onClick={() => orderByUsername("DESC")}>
          Order by username desceding
        </Button>
        <Link to="/add">
          <Button variant="primary" className="">
            + Add new user
          </Button>
        </Link>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {!users.length ? (
            <p>No entries</p>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username || "(empty)"}</td>
                <td>{user.address?.city || "(empty)"}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
                <td>
                  <Delete userId={user.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Home;
