import React from 'react';

import * as Styled from './footerToolbar.styles';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

type FooterToolbarTypes = {
  onClickDashboard: () => void;
};

function HelpDeskFooterToolbar({ onClickDashboard }: FooterToolbarTypes) {
  const router = useRouter();

  return (
    <>
      <Styled.FooterToolbarContainer>
        <Styled.FooterToolbarSectionContainer>
          <Button
            variant='outlined'
            style={{
              color: '#3a765a',
              borderColor: '#3a765a',
              textTransform: 'none',
            }}
            onClick={onClickDashboard}
          >
            Previous: Dashboard
          </Button>
          <Styled.FooterRightSection>
            <Button
              style={{ color: '#3a765a', textTransform: 'none' }}
              onClick={() => {
                //router.push('/?counter=10', undefined, { shallow: true });
                window.history.replaceState(null, '', '/');
                onClickDashboard();
              }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='success'
              style={{ textTransform: 'none' }}
              onClick={() => {
                alert('submit');
              }}
            >
              Submit Changes
            </Button>
          </Styled.FooterRightSection>
        </Styled.FooterToolbarSectionContainer>
      </Styled.FooterToolbarContainer>
    </>
  );
}

export default HelpDeskFooterToolbar;
