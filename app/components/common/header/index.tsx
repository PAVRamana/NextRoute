'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../../../assets/point72-logo.png';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './header.styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Divider } from '@mui/material';

type HeaderTypes = {
  isLoadingPage?: boolean;
};

export default function Header({ isLoadingPage }: HeaderTypes) {
  const { data: session } = useSession();

  return (
    <Styled.Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Image src={logo} alt='' width={100} height={40} />
            {!isLoadingPage && (
              <>
                <PopupState variant='popover' popupId='header-popup-menu'>
                  {(popupState) => (
                    <React.Fragment>
                      <Button
                        variant='text'
                        style={{
                          color: '#fff',
                          textTransform: 'none',
                          padding: '0px',
                        }}
                        {...bindTrigger(popupState)}
                        endIcon={
                          popupState.isOpen ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        }
                      >
                        {session?.user?.displayName}
                      </Button>
                      <Menu
                        {...bindMenu(popupState)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                          sx: {
                            width:
                              popupState.anchorEl &&
                              (popupState.anchorEl as any)?.offsetWidth,
                          },
                        }}
                      >
                        <MenuItem>About</MenuItem>
                        <Divider
                          style={{ marginTop: '2px', marginBottom: '2px' }}
                        />
                        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Styled.Container>
  );
}
