import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 0px;
  display: grid;
`;

export const FieldContainer = styled.div`
  display: grid;
  gap: 5px;
  .MuiInputBase-multiline {
    background: #fff;
  }
  .MuiAutocomplete-root {
    > div {
      background: #fff;
    }
  }
`;

export const AccessModalUserSection = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 50px;
`;
