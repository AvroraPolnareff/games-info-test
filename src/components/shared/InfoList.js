import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

export const InfoList = styled.ul`
  list-style-type: none;
  padding: 0 8px;
  position: relative;
  bottom: 0;
`;
export const InfoElement = ({ name, children }) => {
  return (
    <StyledInfoElement>
      <div css={"font-weight: 700; font-size: 16px"}>{name}</div>
      <div css={"text-align: right"}>{children}</div>
    </StyledInfoElement>
  );
};

InfoElement.propTypes = {
  name: PropTypes.string,
};

const StyledInfoElement = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.input.back};
  a {
    color: ${({ theme }) => theme.colors.text};
  }
`;
