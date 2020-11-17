import React, { useRef } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "../../helpers/hooks";
import { up } from "styled-breakpoints";

export const Modal = ({ onClose, children }) => {
  const ref = useRef(null);
  useOnClickOutside(() => {
    onClose();
  }, ref);
  return (
    <BackgroundWrapper>
      <ModalWrapper ref={ref}>{children}</ModalWrapper>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.darken};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.section`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.secondary.back};
  width: 90%;
  height: 90%;
  ${up("md")} {
    width: 400px;
    height: 600px;
  }

  border-radius: 16px;
`;
