'use client';

import * as React from 'react';
import AccessModalUserSection from './help-desk/access-modal-user';
import FooterToolbar from './common/footer-toolbar';
import Header from './common/header';
import NewHireSection from './help-desk/new-hire-section';
import * as Styled from './landingPage.styles';
import WorkItemsPage from './common/work-items';

export default function LandingPage() {
  const [activeStep, setActiveStep] = React.useState(-1);

  const queryParams = new URLSearchParams(location.search);
  const formType = queryParams.get('formType');

  React.useEffect(() => {
    if (formType) {
      setActiveStep(
        formType === 'helpdesk' ? 1 : formType === 'approval' ? 2 : 0
      );
    } else {
      setActiveStep(0);
    }
  }, [formType]);

  return (
    <>
      <Styled.HeaderContainer>
        <Header />
      </Styled.HeaderContainer>
      {activeStep === 0 && (
        <Styled.WorkItemContainer $isEmptyWorkItems={false}>
          <WorkItemsPage
            onClickWorkItem={(step: number) => setActiveStep(step)}
            showEmptyWorkItems={false}
          />
        </Styled.WorkItemContainer>
      )}
      {activeStep === 1 && (
        <Styled.BodyContainer>
          <NewHireSection />
          <AccessModalUserSection />
          <FooterToolbar onClickDashboard={() => setActiveStep(0)} />
        </Styled.BodyContainer>
      )}
      {activeStep === 2 && (
        <Styled.BodyContainer>
          <div>TODO Approval Form </div>
          <FooterToolbar
            onClickDashboard={() => setActiveStep(0)}
            isApprovalForm={true}
          />
        </Styled.BodyContainer>
      )}
    </>
  );
}
