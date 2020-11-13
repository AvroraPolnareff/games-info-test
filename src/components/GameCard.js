import React from 'react'
import styled from 'styled-components'

const GameCard = ({title, thumbnail, rating, releaseDate, platforms}) => {
  return (
    <StyledGameCard>
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail}/>
      </ThumbnailWrapper>
      <Content>
        <FlexBetween>
          <Platforms>
            {platforms.map(platform => (
              <Badge key={platform.id}>{platform.name}</Badge>
            ))}
          </Platforms>
          <Rating>{rating}</Rating>
        </FlexBetween>
        <Title>{title}</Title>
        <Release>Release Date: {releaseDate}</Release>
      </Content>
    </StyledGameCard>
  )
}

const StyledGameCard = styled.div`
  background-color: ${({theme}) => theme.colors.secondary.back};
  border-radius: 12px;
  margin: 8px 8px;
  box-sizing: border-box;
  width: 100%;
`

const ThumbnailWrapper = styled.div`
  position: relative;
  padding-top: 52%;
`

const Thumbnail = styled.div.attrs(props => ({
  style: {
    background: `url(${props.src})`
  }
}))`
  background-position: 50% !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const Content = styled.div`
  padding: 8px 8px 4px 8px;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const Platforms = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`
const Badge = styled.div`
  
  background-color: ${({theme}) => theme.colors.input.back};
  padding: 2px 3px;
  text-align: center;
  border-radius: 4px;
  font-weight: 400;
  margin: 2px 2px;
`
const Title = styled.h2`
  margin: 4px 0;
`

const Rating = styled.div`
  align-self: center;
  
  border: 1px solid rgba(109,200,73,.4);
  color: #6dc849;
  padding: 2px 0;
  max-width: 32px;
  text-align: center;
  border-radius: 4px;
  font-weight: 700;
  flex-basis: 100px;
  
`
const Release = styled.div`
  text-align: right;
`

export default GameCard
