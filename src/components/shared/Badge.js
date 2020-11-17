import styled from "styled-components";

export const Badge = styled.div`
  background-color: ${({ theme }) => theme.colors.input.back};
  padding: 2px 3px;
  text-align: center;
  border-radius: 4px;
  font-weight: 400;
  margin: 2px 2px;
`;
