'use client';

import * as React from 'react';
import * as Styled from './confirmationPage.styles';
import InstructionsNote from '../../common/instructions-note';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import RenderTypography from '../../common/components/typography';

export default function ConfirmationPage() {
  const { approvalsData } = useAppSelectorHook();
  const { step4Info } = approvalsData;

  const copyAccessData = [
    { title: 'Copy Access Model User', value: 'Myself' },
    { title: 'Receive Notifications', value: 'Yes' },
  ];

  const companyData = [
    { title: 'Company Name', value: 'Point72' },
    { title: 'Department Desc.', value: 'Information Technology' },
  ];

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
        <Styled.MainRoot>
          <Styled.UserInfoSection>
            <Styled.UserInfoTitleSection>
              <Typography
                variant='h5'
                gutterBottom
                style={{ fontWeight: '700' }}
              >
                Dave Matheson
              </Typography>
              <Typography variant='h6' gutterBottom>
                System Administrator
              </Typography>
            </Styled.UserInfoTitleSection>
          </Styled.UserInfoSection>
          <Styled.RootContainer>
            <Styled.PersonalInfoSection>
              <Typography variant='h6' gutterBottom>
                Copy Access Info
              </Typography>
              <Styled.SectionContainer>
                {copyAccessData?.map((item, index: number) => {
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
          <Styled.ConfirmationAccessDetailsSection>
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
                  width={200}
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
                  margin={{ right: 0, top: 0 }}
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
                  width={200}
                  height={180}
                  margin={{ right: 0, top: 0 }}
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
          </Styled.ConfirmationAccessDetailsSection>
        </Styled.ConfirmationSectionContainer>
      </Styled.ConfirmationContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
