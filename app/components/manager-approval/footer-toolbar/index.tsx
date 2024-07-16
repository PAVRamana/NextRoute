import React from 'react';

import * as Styled from './footerToolbar.styles';
import { Button } from '@mui/material';
import NavigationPanel from './navigation-panel';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';

type FooterToolbarTypes = {
  changeStep: (step: number) => void;
  moveToDashboard: () => void;
  activeStep: number;
};

function ManagerFooterToolbar({
  changeStep,
  activeStep,
  moveToDashboard,
}: FooterToolbarTypes) {
  const previousButtonActions = [
    'Previous: Dashboard',
    'Previous: New Hire Details',
    'Previous: Select users',
    'Previous: General Access',
    'Previous: Elevated Access',
  ];

  const nextButtonActions = [
    'Next: Select users',
    'Next: General Access',
    'Next: Elevated Access',
    'Next: Confirmation',
    'Next: Submit Changes',
  ];

  const { approvalsData } = useAppSelectorHook();
  const { step2Info, step3Info, step4Info } = approvalsData;

  const isDisabled = (index: number): boolean => {
    if (index === 0) {
      return false;
    } else if (index === 1) {
      return (
        Object.keys(step2Info?.selectedModalData)?.length === 0 ||
        Object.keys(step2Info?.selectedManagerInfo)?.length === 0
      );
    } else if (index === 2) {
      return step3Info?.selectedEntitilementData?.rows?.length === 0;
    } else if (index === 3) {
      return step4Info?.selectedElevatedEntitilementData?.rows?.length === 0;
    } else if (index === 4) {
      return false;
    }
    return false;
  };

  return (
    <>
      <Styled.FooterToolbarContainer>
        <Styled.FooterToolbarSectionContainer>
          <Button
            variant='outlined'
            size='small'
            style={{
              color: '#3a765a',
              borderColor: '#3a765a',
              textTransform: 'none',
            }}
            onClick={() => {
              if (activeStep === 0) {
                moveToDashboard();
              } else {
                changeStep(activeStep - 1);
              }
            }}
          >
            {previousButtonActions[activeStep]}
          </Button>
          <NavigationPanel
            activeStep={activeStep}
            changeCurrentStep={(stepValue: number) => changeStep(stepValue)}
          />
          <Styled.FooterRightSection>
            <Button
              style={{ color: '#3a765a', textTransform: 'none' }}
              size='small'
              onClick={() => {
                moveToDashboard();
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ textTransform: 'none' }}
              variant='contained'
              color='success'
              size='small'
              disabled={isDisabled(activeStep)}
              onClick={() => {
                if (activeStep === 4) {
                  alert('submit');
                } else {
                  changeStep(activeStep + 1);
                }
              }}
            >
              {nextButtonActions[activeStep]}
            </Button>
          </Styled.FooterRightSection>
        </Styled.FooterToolbarSectionContainer>
      </Styled.FooterToolbarContainer>
    </>
  );
}

export default ManagerFooterToolbar;
