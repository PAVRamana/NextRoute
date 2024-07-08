/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 5px;
  table {
    border-spacing: 0;
    border: 1px solid #d6d6d6;
    width: 100%;
    tr {
      background: #ffffff;
      :last-child {
        border-right: 0;
      }
    }
    th {
      margin: 0;
      padding: 12px 0px 12px 6px;
      border-bottom: 1px solid #d6d6d6;
      background-color: #f4f6f8;
      text-align: left;
    }
    td {
      margin: 0;
      padding: 8px 8px 0px 8px;
      border-bottom: 1px solid #d6d6d6;
    }
  }
`;

export const Action = styled('div')`
  text-align: center;
`;

export const CheckBox = styled('div')`
  :first-child {
    text-align: center;
    align-items: center;
    display: flex;
  }
`;

export const PaginationContainer = styled('div')`
  justify-content: end;
  display: flex;
  gap: 10px;
  padding: 15px 0px 15px 0px;
  button {
    background: none;
    border: none;
    color: #f6f6f6;
    padding: 0;
    cursor: pointer;
  }
`;

export const PageNumbers = styled('div')`
  display: flex;
  gap: 20px;
  text-align: center;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: #426da9;
  font-size: 14px;
  font-weight: 500;
  line-height: 14;
`;

export const SelectedPage = styled.div<{ $isSelected: boolean }>`
  font-weight: ${(p) => (p.$isSelected ? 700 : 500)};
  color: ${(p) => (p.$isSelected ? '#0a3163' : '#426da9')};
`;

export const RowsPerPage = styled('div')`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
`;

export const Spinner = styled('div')`
  width: 100%;
  align-items: center;
  height: 300px;
  display: flex;
  text-align: center;
  justify-content: center;
  border: 0.5px solid #f2f8ff;
  border-top: 0;
`;
