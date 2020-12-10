import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* RESET CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
  }

  html body, input {
    font: 'Roboto', sans-serif 16px 400;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  ul, li {
    list-style: none;
  }

  /* SET GLOBAL COLORS */
  :root {
    --white1: #FFFFFF;
    --white2: #F7FAFC;
    --grey1: #CCCCCC;
    /* --grey1: #B9C8D3; */
    --grey2: #B2BDCE;
    --grey2-hover: rgba(171, 178, 189, 0.5);
    --grey3: #1f2532;
    --grey3-hover: rgba(43, 50, 66, 0.5);
    --green1: #39D183;
    --green2: #40e791;
    --brown: #5F5656;
    --red: #EB5858;
    --red-hover: #D64949;
    --blue: #7495E6;
    --blue-hover: #597CD6;
    --black: #050608;
  }

  /* CUSTOM SCROLLBAR */
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--grey1);
    border-radius: 10px;
  }
`;

export default GlobalStyles;
