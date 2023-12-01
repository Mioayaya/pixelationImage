import styled from "@emotion/styled";

export const PixelateByRgbDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .canvas {
    border: 1px solid black
  }

  .input[type="file"] {
    width: 175px;
    background: #fff;
    margin: 10px;
  }

  .download {
    background: #C3E7FE;
    border: none;
    :hover {
      background: #9FD4FD;
    }
  }
  
`