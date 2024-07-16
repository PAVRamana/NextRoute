import styled from 'styled-components';

export const FooterToolbarSectionContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #f6f9fb;
  border: 1px solid #e0dbdb;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const FooterToolbarContainer = styled.div`
  width: 100%;
  bottom: 0px;
  right: 0px;
  z-index: 99999;
  position: fixed;
`;

export const FooterRightSection = styled.div`
  display: flex;
  gap: 20px;
`;
