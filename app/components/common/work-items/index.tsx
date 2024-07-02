'use client';

import * as React from 'react';
import * as Styled from './workItems.styles';
import { useSession } from 'next-auth/react';
import formIcon from '../../../assets/form-icon.png';
import Image from 'next/image';

type WorkItemsPageTypes = {
  onClickWorkItem: (step: number) => void;
  showEmptyWorkItems: boolean;
};

export default function WorkItemsPage({
  onClickWorkItem,
  showEmptyWorkItems,
}: WorkItemsPageTypes) {
  const { data: session } = useSession();

  const helDeskDetails = [
    { title: 'Owner', value: 'T.Bradshaw' },
    { title: 'Requester', value: 'P.Davidianson' },
    { title: 'Assign to', value: 'Tech Company Assistants' },
  ];

  const approvalDetails = [
    { title: 'Owner', value: 'M. Jacobson' },
    { title: 'Requester', value: 'P.Davidianson' },
    { title: 'Assign to', value: 'Tech Company Assistants' },
  ];

  return (
    <Styled.Container>
      <Styled.WelcomeBackTitle>
        Welcome back, {session?.user?.firstname}
      </Styled.WelcomeBackTitle>
      <Styled.Line />
      <Styled.WorkItemsTitle>Work items</Styled.WorkItemsTitle>
      <Styled.WorkItemsContainer $isEmptyWorkItems={showEmptyWorkItems}>
        <Styled.WorkItemsSubTitle>
          {showEmptyWorkItems
            ? 'There are currently no work items.'
            : 'Below are a list of access requests that need attention.'}
        </Styled.WorkItemsSubTitle>
        <Styled.WorkItemsCount>
          {showEmptyWorkItems ? 0 : 2} Work Items
        </Styled.WorkItemsCount>
      </Styled.WorkItemsContainer>

      {!showEmptyWorkItems && (
        <>
          <Styled.FormContainer onClick={() => onClickWorkItem(1)}>
            <Styled.FormDetailsContainer>
              <Styled.FormTitle>
                <Styled.FormImageContainer>
                  <Image src={formIcon} alt='' width={15} height={15} />
                  Form
                </Styled.FormImageContainer>
              </Styled.FormTitle>
              <Styled.FormRootContainer>
                <Styled.FormApprovalSection>
                  <Styled.FormApprovalSectionWrapper>
                    <Styled.Title
                      style={{ width: '200px', lineHeight: '25px' }}
                    >
                      Level 1 Approval: Account Change for Dave Matheson
                    </Styled.Title>
                    <Styled.ValueSection>
                      <Styled.Value>06/12/24</Styled.Value>
                      <Styled.VerticalLine />
                      <Styled.Value>3712932</Styled.Value>
                    </Styled.ValueSection>
                  </Styled.FormApprovalSectionWrapper>
                </Styled.FormApprovalSection>
                <Styled.VerticalLine />
                <Styled.SectionContainer>
                  {helDeskDetails?.map((item, index: number) => {
                    return (
                      <Styled.SectionInfo key={index}>
                        <Styled.Title>{item?.title}</Styled.Title>
                        <Styled.Value>{item?.value}</Styled.Value>
                      </Styled.SectionInfo>
                    );
                  })}
                </Styled.SectionContainer>
              </Styled.FormRootContainer>
            </Styled.FormDetailsContainer>
          </Styled.FormContainer>
          <Styled.FormContainer onClick={() => onClickWorkItem(2)}>
            <Styled.FormDetailsContainer>
              <Styled.FormTitle>
                <Styled.FormImageContainer>
                  <Image src={formIcon} alt='' width={15} height={15} />
                  Approval
                </Styled.FormImageContainer>
              </Styled.FormTitle>
              <Styled.FormRootContainer>
                <Styled.FormApprovalSection>
                  <Styled.FormApprovalSectionWrapper>
                    <Styled.Title
                      style={{ width: '200px', lineHeight: '25px' }}
                    >
                      Level 2 Approval: Account Change for Reena Prakish
                    </Styled.Title>
                    <Styled.ValueSection>
                      <Styled.Value>06/12/24</Styled.Value>
                      <Styled.VerticalLine />
                      <Styled.Value>3712932</Styled.Value>
                    </Styled.ValueSection>
                  </Styled.FormApprovalSectionWrapper>
                </Styled.FormApprovalSection>
                <Styled.VerticalLine />
                <Styled.SectionContainer>
                  {approvalDetails?.map((item, index: number) => {
                    return (
                      <Styled.SectionInfo key={index}>
                        <Styled.Title>{item?.title}</Styled.Title>
                        <Styled.Value>{item?.value}</Styled.Value>
                      </Styled.SectionInfo>
                    );
                  })}
                </Styled.SectionContainer>
              </Styled.FormRootContainer>
            </Styled.FormDetailsContainer>
          </Styled.FormContainer>
        </>
      )}
    </Styled.Container>
  );
}
