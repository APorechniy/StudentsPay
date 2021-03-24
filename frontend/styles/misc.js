import {css} from 'styled-components'

export const StyleNoUserSelect = css`
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`

export const StyleInputPlaceholder = css`
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #979DAC;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #979DAC;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #979DAC;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`
