import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 0px 10px 0px;
`;

export const SearchWrapper = styled.div`
  display: flex;
`;

export const DropDownWrapper = styled.div`
  .drop-down-select__control {
    background: #d6d6d6;
    border: 1px solid #d6d6d6;
    border-radius: 5px 0 0px 5px;
    border-right: 1;
  }
  .drop-down-select__single-value {
    :hover {
      color: #8c8c8c;
    }
  }
  .drop-down-select__indicator {
    > div {
      > img {
        width: 10px;
        height: 10px;
        filter: invert(60%);
      }
    }
  }
  .drop-down-select__single-value {
    font-size: 13px;
  }
`;

export const AutoCompleteWrapper = styled.div<{ $isDisabled: boolean }>`
  .drop-down-select__control {
    background: ${(p) => (p.$isDisabled ? '#d6d6d6' : '#fff')};
    border: 1px solid #d6d6d6;
    border-left-color: ${(p) => (p.$isDisabled ? '#b2aeae' : '#fff')};
    border-radius: 0px;
  }
`;

export const Search = styled.div`
  background: ${(p) => p.theme.colorBlue600};
  align-items: center;
  text-align: center;
  padding: 10px 10px 10px 12px;
  justify-content: center;
  display: flex;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
`;
