import React from 'react'
import styled from 'styled-components'
import GameCard from "../components/GameCard";

const Home = ({}) => {
  return (
    <StyledHome>
      <SortWrapper>
        <Select/>
        <Select/>
      </SortWrapper>
      <GamesList>
        <GameCard/>
        <GameCard/>
        <GameCard/>
        <GameCard/>
        <GameCard/>
      </GamesList>
    </StyledHome>
  )
}

const StyledHome = styled.div`
  
`
const GamesList = styled.div`
  
`


export default Home
