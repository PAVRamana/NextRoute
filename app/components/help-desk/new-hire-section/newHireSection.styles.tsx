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
  background: #e2e2e2;
  display: flex;
  justify-content: space-between;
`;

export const UserInfoTitleSection = styled.div`
  display: grid;
  gap: 10px;
`;

export const UserInfoTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  color: #3e3d3d;
`;

export const UserInfoDesignation = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #3e3d3d;
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

export const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #3e3d3d;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  color: #246099;
`;

export const Value = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #3e3d3d;
`;
