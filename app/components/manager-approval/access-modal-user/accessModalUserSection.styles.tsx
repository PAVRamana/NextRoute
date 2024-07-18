import styled from 'styled-components';

export const Container = styled.div`
  padding: 1px;
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
  margin-top: 10px;
`;

export const EmptyWrapper = styled.div`
  margin-bottom: 30px;
`;

export const Line = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dddddd;
  margin: 1em 0;
  padding: 0;
`;

export const SelectedModal = styled.div`
  display: flex;
  gap: 25px;
  margin: 10px 0px;
  text-align: center;
  align-items: center;
`;
