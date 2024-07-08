'use client';

import { Typography } from '@mui/material';
import * as React from 'react';
import RenderTypography from '../../common/components/typography';
import InstructionsNote from '../../common/instructions-note';
import * as Styled from './newHireSection.styles';

type NewHireSectionTypes = {
  isApproval?: true;
};

export default function NewHireSection({ isApproval }: NewHireSectionTypes) {
  const userData = [
    { title: 'Display Name', value: 'DMatheson' },
    { title: 'User ID', value: '12142134' },
    { title: 'Employee ID', value: '213113421' },
  ];

  const personalData = [
    { title: 'Job Family Name', value: 'D. Matheson' },
    { title: 'Employment Status', value: 'Unknown' },
    { title: 'Last Hire Date', value: '01/12/2022' },
    { title: 'Work Location', value: 'Detroit HQ' },
  ];

  const companyData = [
    { title: 'Company Name', value: 'Point72' },
    { title: 'Department Desc.', value: 'Information Technology' },
    { title: 'Hiring Manager', value: 'Sheila Thompson' },
    { title: 'Approval Manager', value: 'Dave Hayes' },
  ];

  return (
    <Styled.Container>
      <InstructionsNote
        title='NEW HIRE DETAILS'
        notes={[
          'Below is the details of the new hire. Please review.',
          'When done, click the green Next button at the bottom.',
        ]}
      />
      <Styled.MainRoot>
        <Styled.UserInfoSection>
          <Styled.UserInfoTitleSection>
            <Typography variant='h5' gutterBottom style={{ fontWeight: '700' }}>
              Dave Matheson
            </Typography>
            <Typography variant='h6' gutterBottom>
              System Administrator
            </Typography>
          </Styled.UserInfoTitleSection>
          <Styled.UserSectionContainer>
            {userData?.map((item, index: number) => {
              return (
                <div key={index}>
                  <RenderTypography title={item?.title} />
                  <Typography variant='body2'>{item?.value}</Typography>
                </div>
              );
            })}
          </Styled.UserSectionContainer>
        </Styled.UserInfoSection>
        <Styled.RootContainer>
          <Styled.PersonalInfoSection>
            <Typography variant='h6' gutterBottom>
              Personal Info
            </Typography>
            <Styled.SectionContainer>
              {personalData?.map((item, index: number) => {
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
          </Styled.PersonalInfoSection>
          <Styled.Line />
          <Styled.CompanyInfoSection>
            <Typography variant='h6' gutterBottom>
              Company Info
            </Typography>
            <Styled.SectionContainer>
              {companyData?.map((item, index: number) => {
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
          </Styled.CompanyInfoSection>
        </Styled.RootContainer>
      </Styled.MainRoot>
      {isApproval && <Styled.EmptyWrapper />}
    </Styled.Container>
  );
}
