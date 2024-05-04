/** @format */

import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) =>
    props.type === "horiziontal" &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
