'use client';

import * as React from 'react';
import * as Styled from './workItems.styles';
import { useSession } from 'next-auth/react';
import formIcon from '../../assets/form-icon.png';
import Image from 'next/image';
import { Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DataTable from '../common/components/datatable';

type WorkItemsPageTypes = {
  onClickWorkItem: (step: number) => void;
  showEmptyWorkItems: boolean;
};

export default function WorkItemsPage({
  onClickWorkItem,
  showEmptyWorkItems,
}: WorkItemsPageTypes) {
  const { data: session } = useSession();

  const helpdeskFormData = {
    headers: ['Owner', 'Requester', 'Requested Date', 'Assign to'],
    objects: [
      {
        Owner: 'Eric Bradshaw (8907)',
        Requester: 'Dave Davidianson (9765)',
        'Requested Date': '13-July-2024',
        'Assign to': 'Tech Company Assistants',
      },
    ],
  };

  const approvalData = {
    headers: ['Owner', 'Requester', 'Requested Date', 'Assign to'],
    objects: [
      {
        Owner: 'Mickhel Jacobson (8768)',
        Requester: 'Dave Davidianson (9765)',
        'Requested Date': '13-June-2024',
        'Assign to': 'Tech Company Assistants',
      },
    ],
  };

  return (
    <Styled.Container>
      <Styled.WorkItemsInfo>
        <Styled.WorkItemsIconInfo>
          <Typography variant='button' display='block' gutterBottom>
            Work items
          </Typography>
          <Tooltip
            placement='right'
            title={
              <>
                <Typography variant='body2' gutterBottom>
                  Below are a list of access requests that need attention.
                </Typography>
              </>
            }
          >
            <InfoOutlinedIcon
              style={{ width: '20px', height: '17px', margin: '2px 0px' }}
            />
          </Tooltip>
        </Styled.WorkItemsIconInfo>
        <Typography variant='body2' gutterBottom>
          {showEmptyWorkItems ? 0 : 2} Items
        </Typography>
      </Styled.WorkItemsInfo>

      <>
        <Styled.FormContainer>
          <Styled.FormDetailsContainer>
            <Styled.FormTitle onClick={() => onClickWorkItem(1)}>
              <Styled.FormImageContainer>
                <Image src={formIcon} alt='' width={15} height={15} />
                <Typography variant='body1' gutterBottom>
                  Action Form
                </Typography>
              </Styled.FormImageContainer>
            </Styled.FormTitle>
            <Styled.FormRootContainer>
              <Typography
                variant='button'
                display='block'
                gutterBottom
                style={{
                  textTransform: 'none',
                }}
              >
                Level 1 Approval: Account Change for Dave Matheson
              </Typography>
              <DataTable data={helpdeskFormData} width='800px' border={true} />
            </Styled.FormRootContainer>
          </Styled.FormDetailsContainer>
        </Styled.FormContainer>
      </>

      <>
        <Styled.FormContainer>
          <Styled.FormDetailsContainer>
            <Styled.FormTitle onClick={() => onClickWorkItem(2)}>
              <Styled.FormImageContainer>
                <Image src={formIcon} alt='' width={15} height={15} />
                <Typography variant='body1' gutterBottom>
                  Access Approval
                </Typography>
              </Styled.FormImageContainer>
            </Styled.FormTitle>
            <Styled.FormRootContainer>
              <Typography
                variant='button'
                display='block'
                gutterBottom
                style={{
                  textTransform: 'none',
                }}
              >
                Level 2 Approval: Account Change for Reena Prakish
              </Typography>
              <DataTable data={approvalData} width='800px' border={true} />
            </Styled.FormRootContainer>
          </Styled.FormDetailsContainer>
        </Styled.FormContainer>
      </>
    </Styled.Container>
  );
}
