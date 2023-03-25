import { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm";
import EditUserForm from "./EditUserForm";

export const UsersContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <NewUserForm />,
  },
  {
    path: "/edit/:userId",
    element: <EditUserForm />,
  },
]);

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    )
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .finally(() => setIsLoading(false));
  }, []);

  const addUser = (user) =>
    setUsers([
      ...users,
      { ...user, id: Math.max(...users.map((user) => user.id)) + 1 },
    ]);

  const editUser = (edited) =>
    setUsers([...users.map((user) => (user.id !== edited.id ? user : edited))]);

  const removeUser = (toDeleteId) =>
    setUsers([...users.filter((user) => user.id !== toDeleteId)]);

  const orderByUsername = (direction) => {
    if (direction === "ASC") {
      setUsers([...users.sort((a, b) => (a.username > b.username ? 1 : -1))]);
    } else if (direction === "DESC") {
      setUsers([...users.sort((a, b) => (a.username > b.username ? -1 : 1))]);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        isLoading,
        users,
        addUser,
        editUser,
        removeUser,
        orderByUsername,
      }}
    >
      <RouterProvider router={router} />
    </UsersContext.Provider>
  );
};

export default App;
