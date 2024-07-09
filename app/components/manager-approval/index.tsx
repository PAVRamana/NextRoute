'use client';

import NewHireSection from '../help-desk/new-hire-section';
import * as React from 'react';
import ManagerFooterToolbar from './footer-toolbar';
import AccessModalUserSection from './access-modal-user';
import GeneralAccess from './general-access';
import ElevatedAccess from './elevated-access';
import ConfirmationPage from './confirmation';

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
      {activeStep === 3 && <ElevatedAccess />}
      {activeStep === 4 && <ConfirmationPage />}
      <ManagerFooterToolbar
        activeStep={activeStep}
        changeStep={(step: number) => setActiveStep(step)}
        moveToDashboard={onClickDashboard}
      />
    </div>
  );
}
