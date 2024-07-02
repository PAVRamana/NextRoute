'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../../../assets/point72-logo.png';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './header.styles';

type HeaderTypes = {
  isPage?: boolean;
};

export default function Header({ isPage }: HeaderTypes) {
  const { data: session } = useSession();

  const getUserName = () => {
    const user = session?.user;
    const fistName = user?.firstname && user?.firstname?.substring(0, 1);
    const lastname = user?.lastname && user?.lastname?.substring(0, 1);

    if (fistName && lastname) {
      return `${fistName}${lastname}`;
    } else if (user?.displayName) {
      return user?.displayName?.substring(0, 2)?.toUpperCase();
    } else {
      return '';
    }
  };

  return (
    <Styled.Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Image src={logo} alt='' width={100} height={40} />
            {!isPage && (
              <Styled.HomeContainer>
                <Styled.Home
                  onClick={() => {
                    window.open(
                      'https://company9994-poc.identitynow-demo.com/ui/d/mysailpoint',
                      '_blank' //_self
                    );
                  }}
                >
                  Home
                </Styled.Home>
                <Styled.UserSection>
                  <Styled.DisplayName>
                    {session?.user?.displayName}
                  </Styled.DisplayName>
                  <Styled.UserName>
                    {getUserName()?.toUpperCase()}
                  </Styled.UserName>
                  <Styled.Logout>
                    <Button
                      size='small'
                      color='success'
                      style={{ color: 'red', borderColor: 'red' }}
                      onClick={() => {
                        signOut();
                      }}
                      endIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </Styled.Logout>
                </Styled.UserSection>
              </Styled.HomeContainer>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Styled.Container>
  );
}
