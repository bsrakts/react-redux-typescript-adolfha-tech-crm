// UsersTable.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Avatar
} from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { fetchUserAsync } from '../features/userSlice';

const UsersTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.user.users);
  console.log(userList, "userlist is here =>>>")
  const status = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserAsync());
    }
  }, [status, dispatch]);

  return (
    <Box sx={{ width: '70%', }}>
      <Paper sx={{ width: '100%', mb: 2, mx:5 }}>
        <TableContainer sx={{maxHeight: 600}}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead className='bg-stone-300'>
              <TableRow style={{fontWeight: 'bold'}}>
                <TableCell>Image</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Birth Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell><Avatar src={user.image} alt={user.firstName} className='rounded shadow-md shadow-stone-300 border border-yellow-100'/></TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePaginationActions
          // ...Pagination Ayarları
        /> */}
      </Paper>
    </Box>
  );
};

export default UsersTable;
