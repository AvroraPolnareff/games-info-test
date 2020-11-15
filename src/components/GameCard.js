import React, {useMemo} from 'react'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import {Link} from "react-router-dom";
import {InfoElement, InfoList} from "./InfoList";
import {Badge} from "./Badge";
import {useHistory} from "react-router-dom"

const GameCard = ({title, thumbnail, rating, releaseDate, platforms, slug}) => {
  const history = useHistory()
  const urlToGo = useMemo(() => `/game/${slug}`, [slug])

  const onCardClick = () => {
    history.push(urlToGo)
  }
  return (
    <StyledGameCard onClick={onCardClick}>
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail}/>
      </ThumbnailWrapper>
      <Content>
        <StyledLink to={`/game/${urlToGo}`}>
          <Title>{title}</Title>
        </StyledLink>
        <Platforms>
          {platforms && platforms.map(platform => (
            <Badge key={platform.id}>{platform.name}</Badge>
          ))}
        </Platforms>
        <InfoList>
          <InfoElement name={"Release Date: "}>{releaseDate ?? "N/A"}</InfoElement>
          <InfoElement name={"Rating: "}>{rating}</InfoElement>
        </InfoList>
      </Content>
    </StyledGameCard>
  )
}

GameCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  rating: PropTypes.number,
  releaseDate: PropTypes.string,
  platforms: PropTypes.arrayOf(Platform),
  slug: PropTypes.string,
}

const StyledGameCard = styled.div`
  background-color: ${({theme}) => theme.colors.secondary.back};
  border-radius: 12px;
  margin: 8px 8px;
  box-sizing: border-box;
  width: 100%;
  transition: all 0.2s ;
  transform: scale(1);
  
  ${up('md')} {
    max-width: 320px;

    &:hover {
      transform: scale(1.05);
    }
  }
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

Thumbnail.propTypes = {
  src: PropTypes.string
}

const Content = styled.div`
  padding: 8px 8px 4px 8px;
`

const Title = styled.h2`
  margin: 4px 0;
`

const Platforms = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.colors.text}
`

export default GameCard
