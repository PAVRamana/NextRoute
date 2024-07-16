'use client';

import * as React from 'react';
import * as Styled from './confirmationPage.styles';
import InstructionsNote from '../../common/instructions-note';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppDispatch } from '../../common/service/redux/store';
import { setStep5Info } from '../../common/service/redux/slices/approvalsSlice';
import DataTable from '../../common/components/datatable';

export default function ConfirmationPage() {
  const { approvalsData } = useAppSelectorHook();
  const dispatch = useAppDispatch();
  const { step5Info } = approvalsData;

  React.useEffect(() => {
    dispatch(
      setStep5Info({
        data: {
          ...step5Info,
          comfirmationDetails: {
            enbaled: true,
          },
        },
      })
    );
  }, []);

  const tableData = {
    headers: [
      'Name',
      'Job Title',
      'Copy Access Model User',
      'Receive Notifications',
    ],
    objects: [
      {
        Name: 'Dave Matheson (8403)',
        'Job Title': 'Consultant',
        'Copy Access Model User': 'Myself',
        'Receive Notifications': 'Yes',
      },
    ],
  };

  return (
    <Styled.Container>
      <InstructionsNote
        title='CONFIRMATION'
        notes={[
          'Review details below before submitting your changes.',
          'When done, click the green Next button at the bottom.',
        ]}
      />
      <Styled.ConfirmationContainer>
        <div style={{ width: '62%' }}>
          <DataTable data={tableData} border={true} />
        </div>
        <Styled.ConfirmationSectionContainer>
          <Styled.ConfirmationSection>
            <Styled.ApprovalRate>
              <Styled.ApprovalRateText>
                <Typography variant='h6' gutterBottom>
                  Approval Rate
                </Typography>
                <Typography variant='body2' gutterBottom>
                  Total: 25
                </Typography>
              </Styled.ApprovalRateText>
            </Styled.ApprovalRate>
            <Styled.Gauge>
              <Gauge
                width={120}
                height={170}
                value={75}
                valueMin={0}
                valueMax={100}
                text={({ value }) => `${value}%`}
                sx={() => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#246099',
                  },
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 20,
                  },
                })}
              />
              <Styled.TotalDetails>
                <Typography variant='body2' gutterBottom>
                  <Styled.TotalInnerDetails>
                    <span>Total Entitlements Approved</span>
                    <span style={{ color: '#3A765A' }}>{`: 21`}</span>
                  </Styled.TotalInnerDetails>
                </Typography>
                <Styled.SubLine />
                <Typography variant='body2' gutterBottom>
                  <Styled.TotalInnerDetails>
                    <span>Total Entitlements Denied</span>
                    <span style={{ color: '#C8352C' }}>{`: 4`}</span>
                  </Styled.TotalInnerDetails>
                </Typography>
              </Styled.TotalDetails>
            </Styled.Gauge>
          </Styled.ConfirmationSection>
          <Styled.AccessDetails>
            <Styled.ChartSection>
              <Typography
                variant='h6'
                style={{
                  paddingTop: '15px',
                  textAlign: 'center',
                  marginBottom: '15px',
                }}
              >
                General Access
              </Typography>
              <BarChart
                width={220}
                tooltip={{
                  trigger: 'item',
                  itemContent: () => {
                    return null;
                  },
                }}
                height={180}
                series={[{ data: [15, 10], id: 'uvId' }]}
                barLabel={(item) => {
                  return item?.value?.toString();
                }}
                leftAxis={null}
                xAxis={[
                  {
                    data: ['Approved', 'Rejected'],
                    scaleType: 'band',
                    colorMap: {
                      type: 'ordinal',
                      values: ['Approved', 'Rejected'],
                      colors: ['#3A765A', '#C8352C'],
                    },
                  },
                ]}
                margin={{ right: 30, top: 0 }}
              />
            </Styled.ChartSection>
            <Styled.ChartSection>
              <Typography
                variant='h6'
                style={{
                  paddingTop: '15px',
                  textAlign: 'center',
                  marginBottom: '15px',
                }}
              >
                Elevated Access
              </Typography>
              <BarChart
                width={220}
                height={180}
                margin={{ right: 30, top: 0 }}
                tooltip={{
                  trigger: 'item',
                  itemContent: () => {
                    return null;
                  },
                }}
                series={[{ data: [20, 15], id: 'uvId1' }]}
                barLabel={(item) => {
                  return item?.value?.toString();
                }}
                leftAxis={null}
                xAxis={[
                  {
                    data: ['Approved', 'Rejected'],
                    scaleType: 'band',
                    colorMap: {
                      type: 'ordinal',
                      values: ['Approved', 'Rejected'],
                      colors: ['#3A765A', '#C8352C'],
                    },
                  },
                ]}
              />
            </Styled.ChartSection>
          </Styled.AccessDetails>
        </Styled.ConfirmationSectionContainer>
      </Styled.ConfirmationContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
