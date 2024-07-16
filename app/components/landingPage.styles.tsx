import styled from 'styled-components';

export const BodyContainer = styled.div`
  padding: 20px;
  background: #f2f5f7;
`;

export const WorkItemContainer = styled.div<{ $isEmptyWorkItems: boolean }>`
  padding: 30px;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  background: #f2f5f7;
`;

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0px;
  z-index: 99999;
  width: 100%;
`;
