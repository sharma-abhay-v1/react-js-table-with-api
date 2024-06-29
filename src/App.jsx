import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [apiRsponse, setApiRsponse] = useState([]);
  const [search, setSearch] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = () => {
    setUsers(apiRsponse);
    setTimeout(() => {
      console.log("search clicked", search, users);
      const result = users.filter((user) => {
        return (
          new RegExp(search, "i").test(user.name) ||
          new RegExp(search, "i").test(user.username) ||
          new RegExp(search, "i").test(user.id) ||
          new RegExp(search, "i").test(user.phone) ||
          new RegExp(search, "i").test(user.website)
        );
      });
      console.log(result);
      setUsers(result);
    }, 100);
  };
  const handleReset = () => {
    setUsers(apiRsponse);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
      setApiRsponse(response.data);
    });
  }, []);

  return (
    <div>
      <input
        placeholder="Search here...."
        value={search}
        onChange={handleSearch}
      />
      <button onClick={onSearch}>
        <b>Search</b>
      </button>
      <button onClick={handleReset}>
        <b>Reset</b>
      </button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
              </tr>
            ))
          ) : (
            <tr> NO users</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
