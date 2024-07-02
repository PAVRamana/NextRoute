import styled from 'styled-components';

export const BodyContainer = styled.div`
  padding: 30px;
  border: 1px solid #e2e2e2;
  background: #f2f5f7;
`;

export const WorkItemContainer = styled.div<{ $isEmptyWorkItems: boolean }>`
  padding: 70px;
  border: ;
  border: ${(p) =>
    p.$isEmptyWorkItems ? '0px solid #fff' : '1px solid #e2e2e2'};
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
