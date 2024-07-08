import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font: 400 14px/20px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    background: #f2f5f7;
  }
  
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background: #eaeaea;
  }
  
  *::-webkit-scrollbar-thumb {
    background-color:#585858;
    border-radius: 5px;
  } 

  body {
    margin: 0;
  }
`;
