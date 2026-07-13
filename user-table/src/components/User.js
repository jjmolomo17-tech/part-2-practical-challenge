// Import React and hooks for state management and side effects
import React, { useEffect, useState } from 'react';

// Import Material-UI components for layout, table, and styling
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

// Define the User component
const User = () => {
  // State to hold the list of users fetched from the API
  const [users, setUsers] = useState([]);

  // State to hold the search term entered by the user
  const [search, setSearch] = useState("");

  // useEffect runs once when the component mounts to fetch user data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // API endpoint
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setUsers(data)) // Save data into state
      .catch((err) => console.error("Error fetching users", err)); // Handle errors
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Title for the user list */}
      <Typography variant='h5' gutterBottom>User List</Typography>

      {/* Search bar aligned to the right */}
      <Box display='flex' justifyContent='flex-end' mb={2}>
        <TextField
          label='Search by name, username, email'
          variant='outlined'
          size='small'
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
      </Box>

      {/* Table container with Paper for elevation (shadow effect) */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          {/* Table header with column names */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ffdb58' }}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          {/* Table body with filtered user rows */}
          <TableBody>
            {users
              .filter((user) => {
                // Convert search term to lowercase for case-insensitive matching
                const searchTerm = search.toLowerCase();
                return (
                  searchTerm === '' ||
                  user.name.toLowerCase().includes(searchTerm) ||
                  user.username.toLowerCase().includes(searchTerm) ||
                  user.email.toLowerCase().includes(searchTerm)
                );
              })
              .map((user) => (
                // Render each user as a table row
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
  );
};

// Export the component so it can be used in App.js or elsewhere
export default User;
