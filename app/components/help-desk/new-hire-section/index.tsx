'use client';

import * as React from 'react';
import * as Styled from './newHireSection.styles';

export default function NewHireSection() {
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
      <Styled.MainRoot>
        <Styled.UserInfoSection>
          <Styled.UserInfoTitleSection>
            <Styled.UserInfoTitle>Dave Matheson</Styled.UserInfoTitle>
            <Styled.UserInfoDesignation>
              System Administrator
            </Styled.UserInfoDesignation>
          </Styled.UserInfoTitleSection>
          <Styled.UserSectionContainer>
            {userData?.map((item, index: number) => {
              return (
                <Styled.SectionInfo key={index}>
                  <Styled.Title>{item?.title}</Styled.Title>
                  <Styled.Value>{item?.value}</Styled.Value>
                </Styled.SectionInfo>
              );
            })}
          </Styled.UserSectionContainer>
        </Styled.UserInfoSection>
        <Styled.RootContainer>
          <Styled.PersonalInfoSection>
            <Styled.SectionTitle>Personal Info</Styled.SectionTitle>
            <Styled.SectionContainer>
              {personalData?.map((item, index: number) => {
                return (
                  <Styled.SectionInfo key={index}>
                    <Styled.Title>{item?.title}</Styled.Title>
                    <Styled.Value>{item?.value}</Styled.Value>
                  </Styled.SectionInfo>
                );
              })}
            </Styled.SectionContainer>
          </Styled.PersonalInfoSection>
          <Styled.Line></Styled.Line>
          <Styled.CompanyInfoSection>
            <Styled.SectionTitle>Company Info</Styled.SectionTitle>
            <Styled.SectionContainer>
              {companyData?.map((item, index: number) => {
                return (
                  <Styled.SectionInfo key={index}>
                    <Styled.Title>{item?.title}</Styled.Title>
                    <Styled.Value>{item?.value}</Styled.Value>
                  </Styled.SectionInfo>
                );
              })}
            </Styled.SectionContainer>
          </Styled.CompanyInfoSection>
        </Styled.RootContainer>
      </Styled.MainRoot>
    </Styled.Container>
  );
}
