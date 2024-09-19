/* eslint-disable prettier/prettier */
import { Text } from '@wayfarer/components';
import styled from 'styled-components';

export const RoootContainer = styled.div`
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
`;

export const PaginationContainer = styled.div`
  justify-content: end;
  display: flex;
  gap: 10px;
  padding: 15px 0px 15px 0px;
  button {
    background: none;
    border: none;
    color: ${(p) => p.theme.colorGray100};
    padding: 0;
    cursor: pointer;
  }
  select {
    background: ${(p) => p.theme.colorWhite};
    border: 1px solid ${(p) => p.theme.colorGray600};
    border-radius: 4px;
    font-size: ${(p) => p.theme.fontSize12};
    width: 50px;
    height: 29px;
    text-align: center;
  }
`;

export const PageNumbers = styled('div')`
  display: flex;
  gap: 20px;
  text-align: center;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: ${(p) => p.theme.colorBlue600};
  font-size: ${(p) => p.theme.fontSize14};
  font-weight: ${(p) => p.theme.fontWeight500};
  line-height: ${(p) => p.theme.lineHeight14};
`;

export const SelectedPage = styled.div<{ $isSelected: boolean }>`
  font-weight: ${(p) => (p.$isSelected ? p.theme.fontWeight700 : p.theme.fontWeight500)};
  color: ${(p) => (p.$isSelected ? p.theme.colorBlue900 : p.theme.colorBlue600)};
`;

export const Showing = styled('div')`
  display: flex;
  gap: 10px;
  color: ${(p) => p.theme.colorBlack};
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => p.theme.fontSize14};
  font-weight: ${(p) => p.theme.fontWeight500};
  line-height: ${(p) => p.theme.lineHeight14};
  margin-left: 40px;
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
  border: 0.5px solid ${(p) => p.theme.colorBlue100};
  border-top: 0;
`;

export const CardContainer = styled.div`
  width: 330px;
  > div:first-child {
    border-radius: ${(p) => p.theme.cornerRadius12};
  }
  .wyfr-container-base___base-with-corner-radius {
    height: 170px;
  }
  .wyfr-dialog-content___title {
    font: ${(p) => p.theme.textStyleRegularBase};
    font-weight: ${(p) => p.theme.fontWeight700};
    padding-top: 2px;
  }
  .wyfr-dialog-content___trim {
    overflow: visible;
  }
  .wyfr-container-base___children-trim {
    overflow: visible;
    width: 330px;
  }
  .wyfr-dialog-content___main-common {
    overflow: visible;
  }
  .wyfr-dialog-content___header-padding-right-no-button {
    padding: 2px;
  }
  .wyfr-dialog-content___non-header-padding-x {
    padding-left: 12px;
  }
`;

export const InnterContainer = styled.div`
  display: grid;
  gap: 3px;
`;

export const UserWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 0px;
`;

export const TextComponent = styled(Text)`
  color: ${(p) => p.theme.colorGray600};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  font-size: 14px;
`;

export const RiskComponent = styled(Text)`
  color: ${(p) => p.theme.colorGray600};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  font-size: 14px;
  display: flex;
  gap: 3px;
`;

export const TextBoldComponent = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  font-size: 16px;
`;
