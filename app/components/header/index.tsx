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
import * as Styled from './header.styles';

export default function Header() {
  const { data: session } = useSession();
  return (
    <Styled.Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Image src={logo} alt='' width={100} height={40} />
            <Styled.HomeContainer>
              <div>Home</div>
              {session?.user?.displayName}
            </Styled.HomeContainer>
          </Toolbar>
        </AppBar>
      </Box>
    </Styled.Container>
  );
}
