import React from 'react';

import * as Styled from './footerToolbar.styles';
import { Button } from '@mui/material';

type FooterToolbarTypes = {
  onClickDashboard: () => void;
};

function HelpDeskFooterToolbar({ onClickDashboard }: FooterToolbarTypes) {
  return (
    <>
      <Styled.FooterToolbarContainer>
        <Styled.FooterToolbarSectionContainer>
          <Button
            variant='outlined'
            style={{ color: '#3a765a', borderColor: '#3a765a' }}
            onClick={onClickDashboard}
          >
            PREVIOUS: DASHBOARD
          </Button>
          <Styled.FooterRightSection>
            <Button style={{ color: '#3a765a' }} onClick={onClickDashboard}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                alert('submit');
              }}
            >
              Submit changes
            </Button>
          </Styled.FooterRightSection>
        </Styled.FooterToolbarSectionContainer>
      </Styled.FooterToolbarContainer>
    </>
  );
}

export default HelpDeskFooterToolbar;
