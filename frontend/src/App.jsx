// import React from 'react'
import './index.css'

import { useEffect, useState } from "react";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,  //! Destructure all previous values {username: ag , password: 123}
      [e.target.name]: e.target.value
    })
    // console.log(e.target.value,e.target.name);

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    setUsers(prevUsers => [...prevUsers, data]);  // Add the newly created user to the list
  }


  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: 'GET',
    })
    const data = await response.json();
    // console.log(data);
    setUsers(data);

  }

  useEffect(() => {
    getUsers();
  }, [])



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* <p>{JSON.stringify(form)}</p> */}
        <span>User Name</span>
        <input type="text" name="username" onChange={handleForm} />
        <span>Password</span>
        <input type="text" name="password" onChange={handleForm} />
        <input type="submit" />
      </form>
      <div>
        <ul>
          {users.map(user => <li key={user._id}>{user.username},{user.password}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App