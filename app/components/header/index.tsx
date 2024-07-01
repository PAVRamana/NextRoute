'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/point72-logo.png';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        style={{
          background: 'linear-gradient(180deg, #014B81 0%, #025E9E 100%)',
          color: '#fff',
        }}
      >
        <Toolbar>
          <div style={{ display: 'flex' }}>
            <Image src={logo} alt='' width={100} height={40} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
