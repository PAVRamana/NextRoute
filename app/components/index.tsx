'use client';

import * as React from 'react';
import AccessModalUserSection from './help-desk/access-modal-user';
import HelpDeskFooterToolbar from './help-desk/footer-toolbar';
import Header from './common/header';
import NewHireSection from './help-desk/new-hire-section';
import * as Styled from './landingPage.styles';
import WorkItemsPage from './work-items';
import ManagerApproval from './manager-approval';
import InvalidLinkError from './common/invalid-link-error';

export default function LandingPage() {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [invalidUserLink, setInvalidUserLink] = React.useState<boolean>(false);

  const noWorkItems = false;
  const queryParams = decodeURIComponent(window.location.search);
  const elements = queryParams.split(':');

  React.useEffect(() => {
    if (elements && elements?.length > 1 && elements[2] !== '123456=') {
      //setInvalidUserLink(true);
      return;
    } else if (elements && elements?.length > 1) {
      const formId = elements[1];
      setActiveStep(formId === '101' ? 1 : formId === '102' ? 2 : 0);
    } else {
      setActiveStep(0);
    }
  }, []);

  return (
    <>
      <Styled.HeaderContainer>
        <Header />
      </Styled.HeaderContainer>
      {invalidUserLink ? (
        <InvalidLinkError />
      ) : (
        <>
          {activeStep === 0 && (
            <Styled.WorkItemContainer $isEmptyWorkItems={noWorkItems}>
              <WorkItemsPage
                onClickWorkItem={(step: number) => setActiveStep(step)}
                showEmptyWorkItems={noWorkItems}
              />
            </Styled.WorkItemContainer>
          )}
          {activeStep === 1 && (
            <Styled.BodyContainer>
              <NewHireSection />
              <AccessModalUserSection />
              <HelpDeskFooterToolbar
                onClickDashboard={() => setActiveStep(0)}
              />
            </Styled.BodyContainer>
          )}
          {activeStep === 2 && (
            <Styled.BodyContainer>
              <ManagerApproval onClickDashboard={() => setActiveStep(0)} />
            </Styled.BodyContainer>
          )}
        </>
      )}
    </>
  );
}
