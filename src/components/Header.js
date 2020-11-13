import React from 'react'
import styled from 'styled-components'
import searchIcon from '../assets/search.svg'

const Header = ({}) => {
  return (
    <StyledHeader>
      <Logo href="/">GAMES</Logo>
      <Search/>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
`

const Logo = styled.a`
  position: relative;
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 1px;
  color: #fff;
  border: none;
  text-decoration: none;
`

const Search = ({props}) => {
  return (
    <StyledSearch>
      <Input placeholder="Search for games" {...props}/>
    </StyledSearch>
  )
}

const StyledSearch = styled.div`
  margin: 0 12px 0 12px;
  display: flex;
  align-items: center;
`


const Input = styled.input`
  color: ${({theme}) => theme.colors.input.text};
  background: url(${searchIcon}) no-repeat scroll 12px;
  background-size: 14px;
  font-weight: 400;
  background-color: ${({theme}) => theme.colors.input.back};
  border: none;
  border-radius: 16px;
  height: 28px;
  font-size: 14px;
  padding: 0 12px 0 38px ;
  transition: all .3s;
  
  &:active, &:focus, &:hover {
    outline: none;
    color: black;
    background-color: white;
  }
`

export default Header
