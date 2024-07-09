'use client';

import { Typography } from '@mui/material';
import * as React from 'react';
import * as Styled from './invalidLinkError.styles';
import { signOut } from 'next-auth/react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function InvalidLinkError() {
  setTimeout(() => {
    signOut();
  }, 5000);

  return (
    <Styled.RootContainer>
      <ErrorOutlineIcon
        style={{ color: '#BB3131', width: '40px', height: '40px' }}
      />
      <Typography variant='button' display='block' gutterBottom>
        You are not authorized
      </Typography>
      <Typography variant='body2' gutterBottom>
        It seems like you don't have permission to access this page.
      </Typography>
    </Styled.RootContainer>
  );
}
