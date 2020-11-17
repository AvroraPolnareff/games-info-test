import React, { useEffect, useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/search.svg";
import searchInvertIcon from "../assets/searchInvert.svg";
import { up } from "styled-breakpoints";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, selectSearch } from "../store/gamesListSlice";
import { Link, useHistory } from "react-router-dom";

const Header = ({}) => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const history = useHistory();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(search);
  }, [search]);
  return (
    <StyledHeader>
      <Logo to="/">GAMES</Logo>
      <form
        onSubmit={() => {
          history.push("/");
          dispatch(changeSearch(value));
        }}
      >
        <Search
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"Search for games"}
        />
      </form>
      <div />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
`;

const Logo = styled(Link)`
  position: relative;
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 1px;
  color: #fff;
  border: none;
  text-decoration: none;
`;

const Search = (props) => {
  return (
    <StyledSearch>
      <Input {...props} />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  margin: 0 12px 0 12px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  color: ${({ theme }) => theme.colors.input.text};
  background: url(${searchIcon}) no-repeat scroll 12px;
  background-size: 14px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.input.back};
  border: none;
  border-radius: 16px;
  height: 28px;
  font-size: 14px;
  padding: 0 12px 0 38px;
  transition: background-color 0.3s, color 0.3s;

  ${up("md")} {
    padding: 4px 20px 4px 45px;
    width: 600px;
  }

  &:active,
  &:focus,
  &:hover {
    background: url(${searchInvertIcon}) no-repeat scroll 12px;
    outline: none;
    color: black;
    background-color: white;
  }
`;

export default Header;
