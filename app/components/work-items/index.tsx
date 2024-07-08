'use client';

import * as React from 'react';
import * as Styled from './workItems.styles';
import { useSession } from 'next-auth/react';
import formIcon from '../../assets/form-icon.png';
import Image from 'next/image';
import { Typography } from '@mui/material';
import RenderTypography from '../common/components/typography';

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
      <Typography variant='h5' gutterBottom>
        Welcome back, {session?.user?.firstname}
      </Typography>
      <Styled.Line />
      <Typography variant='button' display='block' gutterBottom>
        Work items
      </Typography>
      <Styled.WorkItemsContainer $isEmptyWorkItems={showEmptyWorkItems}>
        <Typography variant='body2' gutterBottom>
          {showEmptyWorkItems
            ? 'There are currently no work items.'
            : 'Below are a list of access requests that need attention.'}
        </Typography>
        <Typography variant='body2' gutterBottom>
          {showEmptyWorkItems ? 0 : 2} Work Items
        </Typography>
      </Styled.WorkItemsContainer>

      {!showEmptyWorkItems && (
        <>
          <Styled.FormContainer onClick={() => onClickWorkItem(1)}>
            <Styled.FormDetailsContainer>
              <Styled.FormTitle>
                <Styled.FormImageContainer>
                  <Image src={formIcon} alt='' width={15} height={15} />
                  <Typography variant='h6' gutterBottom>
                    Form
                  </Typography>
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
                      <Typography variant='body2' gutterBottom>
                        06/12/24
                      </Typography>
                      <Styled.VerticalLine />
                      <Typography variant='body2' gutterBottom>
                        1235256
                      </Typography>
                    </Styled.ValueSection>
                  </Styled.FormApprovalSectionWrapper>
                </Styled.FormApprovalSection>
                <Styled.VerticalLine />
                <Styled.SectionContainer>
                  {helDeskDetails?.map((item, index: number) => {
                    return (
                      <Styled.SectionInfo key={index}>
                        <RenderTypography title={item?.title} />
                        <Typography variant='body2' gutterBottom>
                          {item?.value}
                        </Typography>
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
                  <Typography variant='h6' gutterBottom>
                    Approval
                  </Typography>
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
                      <Typography variant='body2' gutterBottom>
                        06/12/24
                      </Typography>
                      <Styled.VerticalLine />
                      <Typography variant='body2' gutterBottom>
                        1235256
                      </Typography>
                    </Styled.ValueSection>
                  </Styled.FormApprovalSectionWrapper>
                </Styled.FormApprovalSection>
                <Styled.VerticalLine />
                <Styled.SectionContainer>
                  {approvalDetails?.map((item, index: number) => {
                    return (
                      <Styled.SectionInfo key={index}>
                        <RenderTypography title={item?.title} />
                        <Typography variant='body2' gutterBottom>
                          {item?.value}
                        </Typography>
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
