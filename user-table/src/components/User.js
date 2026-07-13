import React, { useEffect, useState } from 'react'

const User = () => {

    const [users,setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users",err))
    },[])
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Username</td>
                    <td>Email</td>
                </tr>
            </thead>
            <tbody>
                {users.map((user)  => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default User
