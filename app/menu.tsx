'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut, signIn } from 'next-auth/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

export default function MenuBar() {
  const [requestData, setRequestData] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetchMyRequestsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchMyRequestsData = () => {
    axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://company9994-poc.api.identitynow-demo.com/beta/access-request-status?regarding-identity=me&limit=50&offset=0&count=true&sorters=-created',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then((response: any) => {
        setRequestData(response.data);
      })
      .catch((error: any) => {
        signIn();
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Welcome {session?.user?.name}
          </Typography>
          <Button color='inherit' onClick={() => signOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {requestData && requestData?.length > 0 ? (
        <>
          <div style={{ padding: '10px 0px' }}>
            <Typography variant='h6' component='div'>
              My Requests
            </Typography>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Access Profile</TableCell>
                  <TableCell>Access Request Id</TableCell>
                  <TableCell>Requested</TableCell>
                  <TableCell>Recipient</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData?.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {`Grant: ${item.name}`}
                    </TableCell>
                    <TableCell>{`${item?.type}: ${item?.description}`}</TableCell>
                    <TableCell>{item?.accessRequestId}</TableCell>
                    <TableCell>{item?.created}</TableCell>
                    <TableCell>{item?.requestedFor?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress disableShrink />
        </div>
      )}
    </Box>
  );
}
