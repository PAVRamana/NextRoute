'use client';

import Header from '@/app/components/common/header';
import { Button } from '@mui/material';
import { getCsrfToken } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import * as Styled from './page.styles';
import Image from 'next/image';
import myGif from '../../../components/1488.gif';

export default function SignIn() {
  const buttonRef = useRef(null);
  const [csrfValue, setCsrfValue] = useState<string>('');

  useEffect(() => {
    void setCsrfTokenVal();
  }, []);

  useEffect(() => {
    if (csrfValue && buttonRef && buttonRef?.current) {
      //(buttonRef?.current as any)?.click();
    }
  }, [csrfValue]);

  const setCsrfTokenVal = async () => {
    getCsrfToken().then((csrfToken) => {
      setCsrfValue(csrfToken ?? '');
    });
  };

  return (
    <>
      <Header isLoadingPage={true} />
      <Styled.RootContainer>
        <Image src={myGif} alt='my gif' height={50} width={50} />

        <form
          action='http://localhost:3000/api/auth/signin/identitySecureCloud'
          method='POST'
        >
          <input type='hidden' name='csrfToken' value={csrfValue} />
          <input type='hidden' name='callbackUrl' value='/' />
          <Button
            variant='contained'
            color='success'
            ref={buttonRef}
            type='submit'
            style={{
              textTransform: 'none',
              background:
                'linear-gradient(rgb(1, 75, 129) 0%, rgb(2, 94, 158) 100%)',
            }}
          >
            Sign in with Identity Secure Cloud
          </Button>
        </form>
      </Styled.RootContainer>
    </>
  );
}
