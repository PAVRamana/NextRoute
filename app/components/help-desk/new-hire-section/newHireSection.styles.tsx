import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
`;

export const MainRoot = styled.div`
  border: 1px solid #e2e2e2;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

export const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 1em 0;
  padding: 0;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 30px;
`;
