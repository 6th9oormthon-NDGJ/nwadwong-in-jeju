import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};

    * {
        box-sizing: border-box;
    }


    body {
        background-color: #f0f0f5;
        font-family: 'Pretendard', sans-serif
    }

    ol, ul {
	list-style: none;
    }

    a {
	text-decoration: none;
	color: inherit;

        &:hover {
            text-decoration: none;
        }
        
        &:active {
            text-decoration: none;
        }
            
        &:visited {
            text-decoration: none;
        }
            
        &:link {
            text-decoration: none;
        }
    }`;

export default GlobalStyles;
