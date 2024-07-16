import styled from 'styled-components';

export const Container = styled.div`
  padding: 1px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 60px;
`;

export const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 1em 0;
  padding: 0;
`;

export const MainRoot = styled.div`
  border: 1px solid #e2e2e2;
  background: #fff;
`;

export const RootContainer = styled.div`
  padding: 20px 30px;
  background: #fff;
`;

export const UserSectionContainer = styled.div`
  display: grid;
  grid-template-columns: 150px 150px auto;
`;

export const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
`;

export const SectionInfo = styled.div`
  display: grid;
`;

export const UserInfoSection = styled.div`
  padding: 30px;
  background: #f9fbfc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`;

export const UserInfoTitleSection = styled.div`
  display: grid;
`;

export const PersonalInfoSection = styled.div`
  margin-bottom: 30px;
`;

export const CompanyInfoSection = styled.div``;

export const ConfirmationContainer = styled.div`
  display: grid;
  gap: 2px;
`;

export const ConfirmationSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #dddddd;
`;

export const ConfirmationSectionContainer = styled.div`
  display: flex;
  gap: 2px;
  width: 85%;
`;

export const ApprovalRate = styled.div`
  display: grid;
`;

export const AccessDetails = styled.div`
  display: flex;
  gap: 0;
  border: 1px solid #dddddd;
`;

export const ApprovalRateText = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

export const TotalDetails = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Gauge = styled.div`
  grid-auto-flow: row;
  grid-template-columns: 1fr 1fr;
  display: grid;
`;

export const SubLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 10px 0;
  padding: 0;
`;

export const ChartSection = styled.div`
  background: #fff;
`;

export const TotalInnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
