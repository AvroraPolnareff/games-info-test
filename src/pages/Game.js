import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

const Game = ({}) => {
  const {gameId} = useParams()
  return (
    <StyledGame>
      <Title/>
      <Picture/>
      <Description/>
      <SiteLink/>
    </StyledGame>
  )
}

const StyledGame = styled.div`
  
`





export default Game
