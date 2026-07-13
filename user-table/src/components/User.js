import React, { useEffect, useState } from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@mui/material';

const User = () => {

    const [users,setUsers] = useState([]);
    const [search,setSearch] = useState("");

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users",err))
    },[])
  return (
    <div style={{padding:'20px'}}>
     <Typography variant='h5' gutterBottom>User List</Typography>
     <Box display='flex' justifyContent='flex-end' mb={2}>
        <TextField label='Search by name,username,email' variant='outlined' size='small'
        value={search} onChange={(e) => setSearch(e.target.value)}/>
     </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
            <TableHead>
                <TableRow sx={{backgroundColor:'#ffdb58'}}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.filter((user) => {
                    const searchTerm = search.toLowerCase();
                    return searchTerm === '' ||
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.username.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm)
                }).map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User