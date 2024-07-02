import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  display: grid;
`;

export const WelcomeBackTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0.03em;
  text-align: left;
`;

export const WorkItemsContainer = styled.div<{ $isEmptyWorkItems: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: ${(p) => (p.$isEmptyWorkItems ? '100vh' : 'auto')};
`;

export const WorkItemsTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0.03em;
  text-align: left;
  margin-bottom: 10px;
`;

export const FormRootContainer = styled.div`
  display: flex;
  background: #fff;
  gap: 50px;
  padding: 20px 20px;
  border-left: 1px solid #dddddd;
`;

export const WorkItemsSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
`;

export const WorkItemsCount = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
`;

export const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 1em 0;
  padding: 0;
`;

export const FormContainer = styled.div`
  border: 1px solid #ececec;
  margin-top: 2px;
  cursor: pointer;
  display: flex;
  gap: 20px;
`;

export const FormDetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background: #e7e7e7;
`;

export const FormImageContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const FormTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  color: #3e3d3d;
  width: 125px;
  padding: 15px;
`;

export const FormApprovalSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const FormApprovalSectionWrapper = styled.div`
  display: grid;
  gap: 15px;
  align-items: center;
`;

export const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background: #fff;
  text-align: center;
`;

export const SectionInfo = styled.div`
  display: grid;
`;

export const ValueSection = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const VerticalLine = styled.div`
  border-left: 1px solid #dddddd;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-wrap: balance;
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
