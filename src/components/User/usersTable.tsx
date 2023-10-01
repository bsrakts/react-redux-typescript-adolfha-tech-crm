// UsersTable.tsx
import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Avatar
} from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUserAsync } from '../../features/userSlice';
import { tableHeadList } from '../../data';


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
    <>
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2}}>
        <TableContainer sx={{maxHeight: 600}}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead className='!bg-[#eae8e4] !shadow-md !shadow-stone-200'>
              <TableRow style={{fontWeight: 'bold'}}>
                {tableHeadList.map((head) => (
                    <TableCell className='!bg-[#f4f3f1] !font-bold !text-emerald-800 !border-emerald-700'>{head}</TableCell>
                ))
                }
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
      </Paper>
    </Box>
    </>
  );
};

export default UsersTable;
