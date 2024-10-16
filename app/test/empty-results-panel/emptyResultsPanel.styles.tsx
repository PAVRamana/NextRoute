import styled from 'styled-components';

export const RootContainer = styled.div`
  height: 500px;
  background: ${(p) => p.theme.colorWhite};
  border-radius: 10px;
  margin-top: 12px;
  margin-bottom: 15px;
`;

export const Container = styled.div`
  text-align: center;
  align-items: center;
  display: block;
  justify-content: center;
  padding-top: 100px;
`;

export const EmptySearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const EmptySearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 120px;
    height: 120px;
  }
`;

export const EmptySearchDescription = styled.div`
  display: grid;
  gap: 10px;
`;
