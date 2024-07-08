'use client';

import NewHireSection from '../help-desk/new-hire-section';
import * as React from 'react';
import ManagerFooterToolbar from './footer-toolbar';
import AccessModalUserSection from './access-modal-user';
import NavigationPanel from './navigation-panel';
import GeneralAccess from './general-access';

type ManagerApprovalTypes = {
  onClickDashboard: () => void;
};
export default function ManagerApproval({
  onClickDashboard,
}: ManagerApprovalTypes) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div>
      {activeStep === 0 && <NewHireSection isApproval={true} />}
      {activeStep === 1 && <AccessModalUserSection />}
      {activeStep === 2 && <GeneralAccess />}
      {activeStep === 3 && <div>{activeStep}</div>}
      {activeStep === 4 && <div>{activeStep}</div>}
      <ManagerFooterToolbar
        activeStep={activeStep}
        changeStep={(step: number) => setActiveStep(step)}
        moveToDashboard={onClickDashboard}
      />
    </div>
  );
}
