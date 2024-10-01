/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div<{ $isTableInModal: boolean }>`
  padding-top: 1px;
  table {
    border-spacing: 0;
    border: 1px solid ${(p) => p.theme.colorGray300};
    width: 100%;
    tr {
      :last-child {
        border-bottom: 0;
        border-right: 0;
      }
      &:nth-child(even) {
        background: ${(p) =>
          p.$isTableInModal ? p.theme.colorWhite : p.theme.colorBlue100};
      }
      &:nth-child(odd) {
        background: ${(p) => p.theme.colorWhite};
      }
    }
    th {
      margin: 0;
      padding: 12px 0px 12px 6px;
      border-right: 1px solid ${(p) => p.theme.colorGray300};
      background-color: ${(p) =>
        p.$isTableInModal ? p.theme.colorGray300 : p.theme.colorBlue200};
      text-align: left;
    }
    td {
      margin: 0;
      padding: 12px;
      border-right: 1px solid ${(p) => p.theme.colorGray300};
    }
  }
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: none;
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }
  .resizer.isResizing {
    background: ${(p) => p.theme.colorBlue600};
    opacity: 1;
  }

  @media (hover: hover) {
    .resizer {
      opacity: 0;
    }
    *:hover > .resizer {
      opacity: 1;
    }
  }
`;

export const InnerTableContainer = styled.div`
  border-bottom: 1px solid ${(p) => p.theme.colorGray300} !important;
  table {
    border-spacing: 0;
    border: 1px solid ${(p) => p.theme.colorGray300};
    tr {
      :last-child {
        border-bottom: 0;
        border-right: 0;
      }
      &:nth-child(even) {
        background: ${(p) => p.theme.colorWhite};
      }
      &:nth-child(odd) {
        background: ${(p) => p.theme.colorWhite};
      }
    }
    th {
      margin: 0;
      padding: 8px 0px 8px 8px;
      border-right: 1px solid ${(p) => p.theme.colorGray300} !important;
      background-color: #dee7f3;
      text-align: left;
      > div > div {
        color: ${(p) => p.theme.colorBlack};
        font-weight: ${(p) => p.theme.fontWeight400};
      }
    }
    td {
      margin: 0;
      padding: 10px;
      border-right: 1px solid ${(p) => p.theme.colorGray300} !important;
    }
  }
`;

export const Link = styled('div')`
  color: ${(p) => p.theme.colorBlue600};
  cursor: pointer;
  font-weight: ${(p) => p.theme.fontWeight700};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PersonCardContainer = styled('div')`
  display: flex;
  gap: 10px;
  text-align: center;
  align-items: center;
`;

export const CheckBox = styled('div')`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const ExpandColumn = styled('div')`
  img {
    width: 18px;
    height: 18px;
  }
`;

export const HeaderColumn = styled.div<{ $isTableInModal?: boolean }>`
  display: flex;
  gap: 5px;
  > div {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: ${(p) =>
      p.$isTableInModal ? p.theme.fontWeight500 : p.theme.fontWeight600};
    font-size: 14px;
  }
  img {
    filter: invert(50%);
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
  font-weight: ${(p) =>
    p.$isSelected ? p.theme.fontWeight700 : p.theme.fontWeight500};
  color: ${(p) =>
    p.$isSelected ? p.theme.colorBlue900 : p.theme.colorBlue600};
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

export const MoreIcon = styled('div')`
  cursor: pointer;
`;

export const PopoverMenuItems = styled.div<{ $isClickable?: boolean }>`
  display: flex;
  gap: 13px;
  padding: 10px 15px 10px 15px;
  cursor: ${(p) => (p.$isClickable ? 'pointer' : 'not-allowed')};
  img {
    width: 17px;
    height: 17px;
  }
`;

export const PopoverMenu = styled('div')`
  border-radius: 5px;
  background: #fff;
  :hover {
    background-color: ${(p) => p.theme.colorBlue150};
  }
`;

export const TextWrap = styled('td')`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
