import React from 'react'
import styled from 'styled-components'

const Header = ({}) => {
  return (
    <StyledHeader>
      <Logo>GAMES INFO</Logo>
      <Search/>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 24px;
`

const Logo = styled.span`

`

const Search = () => {
  return (
    <input/>
  )
}

export default Header
