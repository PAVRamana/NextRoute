import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  text-align: left;
`;

export const WorkItemsInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WorkItemsIconInfo = styled.div`
  display: flex;
  gap: 10px;
`;

export const FormRootContainer = styled.div`
  display: grid;
  background: #fff;
  gap: 10px;
  padding: 10px 20px;
  border-left: 1px solid #dddddd;
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
  text-align: center;
  width: 145px;
  padding: 15px;
  justify-content: center;
  cursor: pointer;
  display: flex;
`;
