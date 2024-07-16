import styled from 'styled-components';

export const Container = styled.div`
  padding: 1px;
  .MuiDataGrid-cell {
    background: #fff;
  }
  .MuiDataGrid-columnHeaders {
    div:first-child {
      background: #f9fbfc;
    }
  }
  .MuiDataGrid-columnHeader {
    outline: none !important;
  }
  .MuiDataGrid-cell {
    outline: none !important;
  }
`;

export const GeneralAccessContainer = styled.div`
  width: 80%;
  margin-bottom: 20px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 30px;
`;
