import styled from 'styled-components';

export const Container = styled.div`
  .MuiToolbar-gutters {
    justify-content: space-between;
  }
  .MuiPaper-root {
    background: linear-gradient(rgb(1, 75, 129) 0%, rgb(2, 94, 158) 100%);
    color: #ffffff;
  }
`;

export const Home = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

export const HomeContainer = styled.div`
  font-size: 13.7px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  letter-spacing: 0.01em;
  display: flex;
  gap: 50px;
`;

export const UserName = styled.div`
  padding: 10px;
  background: #426da9;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #fff;
  font-weight: 500;
`;

export const Logout = styled.div``;

export const DisplayName = styled.div``;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 15px;
`;
