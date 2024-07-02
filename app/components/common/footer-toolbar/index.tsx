import React, { useState } from 'react';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import * as Styled from './footerToolbar.styles';
import { Button } from '@mui/material';

type FooterToolbarTypes = {
  onClickDashboard: () => void;
  isApprovalForm?: boolean;
};

function FooterToolbar({
  onClickDashboard,
  isApprovalForm,
}: FooterToolbarTypes) {
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
          {!isApprovalForm && (
            <Styled.FooterRightSection>
              <Button style={{ color: '#3a765a' }} onClick={onClickDashboard}>
                Cancel
              </Button>
              <Button variant='contained' color='success' onClick={() => {}}>
                Submit changes
              </Button>
            </Styled.FooterRightSection>
          )}
        </Styled.FooterToolbarSectionContainer>
      </Styled.FooterToolbarContainer>
    </>
  );
}

export default FooterToolbar;
