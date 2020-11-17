import styled from "styled-components";

export const Button = styled.button`
  padding: 6px 8px;
  margin: 0 4px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.input.back};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
`;
