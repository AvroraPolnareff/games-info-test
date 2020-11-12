import React from 'react'
import styled from 'styled-components'

const GameCard = ({name,thumbnail, rating, releaseDate, platforms}) => {
  return (
    <StyledGameCard>
      <Thumbnail/>
      <Platforms>
        <Icon/>
        <Icon/>
      </Platforms>
      <Title/>
      <Rating/>
      <Release/>
    </StyledGameCard>
  )
}

const StyledGameCard = styled.div`
  
`
const Thumbnail = styled.div.attrs(props => ({style: {backgroundImage: props.src}}))`
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
`
const Platforms = styled.div`
  
`
const Icon = styled.div`
  
`
const Title = styled.div`
  
`
const Rating = styled.div`
  
`
const Release = styled.div`
  
`


export default GameCard
