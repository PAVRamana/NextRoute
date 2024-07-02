import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
`;

export const Title = styled.div`
  color: #353535;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
`;

export const FieldTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  color: #246099;
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
  margin-bottom: 20px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 30px;
`;
