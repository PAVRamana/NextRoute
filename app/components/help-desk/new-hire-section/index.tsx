'use client';

import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import RenderTypography from '../../common/components/typography';
import InstructionsNote from '../../common/instructions-note';
import { usePostApi } from '../../common/service/api';
import { URL } from '../../common/service/axios';
import * as Styled from './newHireSection.styles';

type NewHireSectionTypes = {
  isApproval?: true;
};

export default function NewHireSection({ isApproval }: NewHireSectionTypes) {
  const { data: session } = useSession();
  const [tableData1, setTableData1] = React.useState<any>([]);

  const { run, data, isResolved, error } = usePostApi();

  React.useEffect(() => {
    run(URL.SEARCH, session?.accessToken, {
      indices: ['identities'],
      query: {
        query: 'Ranjan.Dalai',
        fields: ['name'],
      },
    });
  }, []);

  React.useEffect(() => {
    if (error) {
      console.log('error');
    }
  }, [error]);

  React.useEffect(() => {
    if (data && isResolved) {
      const userData = data[0];
      setTableData1([
        { 'First Name': userData?.firstName },
        { 'Last Name': userData?.lastName },
        { 'Job Title': '' },
        { 'Job Family Name': 'Contingent Empployee' },
        { 'Work Location': 'STAM72' },
        { 'Department Desc': '9980 - Information Security' },
        { 'Company Name': 'Point72, LP' },
        { 'User ID': 'AC74374' },
        { 'Employee ID': '8403' },
        { 'Last Hire Date': '12-July-2024' },
        { 'Employment Status': 'T' },
        { 'Hiring Manager': 'Eric Linden' },
        { 'Manager Department Id': '9940' },
        { 'Approval Manager': 'Mark Narcrso' },
        { 'Request Submitted By': 'Tech- PC Support' },
      ]);
    }
  }, [data, isResolved]);

  const tableData = [
    { 'First Name': 'Dave' },
    { 'Last Name': 'Matheson' },
    { 'Job Title': 'Consultant' },
    { 'Job Family Name': 'Contingent Empployee' },
    { 'Work Location': 'STAM72' },
    { 'Department Desc': '9980 - Information Security' },
    { 'Company Name': 'Point72, LP' },
    { 'User ID': 'AC74374' },
    { 'Employee ID': '8403' },
    { 'Last Hire Date': '12-July-2024' },
    { 'Employment Status': 'T' },
    { 'Hiring Manager': 'Eric Linden' },
    { 'Manager Department Id': '9940' },
    { 'Approval Manager': 'Mark Narcrso' },
    { 'Request Submitted By': 'Tech- PC Support' },
  ];

  return (
    <Styled.Container>
      <InstructionsNote
        title='NEW HIRE USER DETAILS'
        notes={[
          'Below is the details of the new hire. Please review.',
          'When done, click the green Next button at the bottom.',
        ]}
      />
      <Styled.MainRoot>
        <Styled.UserInfoSection>
          <Styled.UserInfoTitleSection>
            <Typography variant='body1'>Dave Matheson (8403)</Typography>
          </Styled.UserInfoTitleSection>
        </Styled.UserInfoSection>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            padding: '12px 18px',
            background: '#fff',
          }}
        >
          {tableData?.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
              }}
            >
              <RenderTypography title={Object.keys(item)[0]} />
              <Typography
                variant='body1'
                style={{ fontSize: '13px' }}
                gutterBottom
              >
                {Object.values(item)[0]}
              </Typography>
            </div>
          ))}
        </div>
      </Styled.MainRoot>
      {isApproval && <Styled.EmptyWrapper />}
    </Styled.Container>
  );
}
