import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px 30px 30px;
  display: grid;
  gap: 20px;
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
  margin-bottom: 10px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 30px;
`;
