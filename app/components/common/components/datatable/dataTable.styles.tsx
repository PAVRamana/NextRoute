import styled from 'styled-components';

export const Conatiner = styled.div<{ $showBorder: boolean }>`
  .MuiTableContainer-root {
    border-radius: 0px;
    box-shadow: none;
  }
  .MuiPaper-root {
    border-radius: 0px;
    border: ${(p) => (!p.$showBorder ? '0px' : '1px solid #d6d6d6')};
    box-shadow: none;
  }
  th {
    font-weight: 500;
    background: #f9fbfc;
    padding: 10px 10px;
  }
  tbody > tr > td {
    padding: 10px 10px;
  }
`;
