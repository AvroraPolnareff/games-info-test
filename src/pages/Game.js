import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import {fetchGame} from "../api/rawg-api";
import {InfoElement, InfoList} from "../components/InfoList";
import {Badge} from "../components/Badge";
import {up} from "styled-breakpoints";
import {Spinner} from "../components/Spinner";
import {useDispatch} from "react-redux";
import {show} from "../store/imageViewerSlice";
import PropTypes from "prop-types"

const Game = ({}) => {
  const {gameId} = useParams()
  const [game, setGame] = useState(null)
  const [status, setStatus] = useState("idle")
  const dispatch = useDispatch()
  useEffect(() => {
    getGame(gameId)
  }, [gameId])


  const getGame = async (gameId) => {
    try {
      const game = await fetchGame(gameId)
      setGame(game)
      setStatus("succeed")
    } catch (e) {
      setStatus("failed")
    }
  }

  const getDescription = () => {
    return {__html: `<div>${game?.description}</div>` ?? ""}
  }

  const baseUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname
    } catch (e) {
      return url
    }
  }

  const screenshotClickHandle = (id) => {
    dispatch(show({images: game.screenshots,id: id}))
  }

  return (
    <ErrorHandler
      status={status}
      failed={
        <MessageWrapper>
          <h1>Error</h1>
        </MessageWrapper>
      }
      idle={
        <MessageWrapper>
          <Spinner/>
        </MessageWrapper>
      }
    >
      {game &&
      <StyledGame>
        <Background src={game.background}/>
        <MainWrapper>
          <div>
            <Title>{game.title}</Title>

            <Platforms>
              {game.platforms.map(platform => (<Badge>{platform.name}</Badge>))}
            </Platforms>

            <h2>Screenshots: </h2>
            <Screenshots>
              {game.screenshots.map(image =>
                <Screenshot key={image.id} onClick={() => screenshotClickHandle(image.id)} src={image.mini}/>
              )}
            </Screenshots>

            <h2>Details:</h2>
            <InfoList>
              <InfoElement name={"Release Date"}>{game.released}</InfoElement>
              <InfoElement name={"Rating"}>{game.rating}</InfoElement>
              {game.website && <InfoElement name={"Website"}>
                <a href={game.website}>
                  {baseUrl(game.website)}
                </a>
              </InfoElement>}
            </InfoList>

            <h2>Description: </h2>
            <Description dangerouslySetInnerHTML={getDescription()}/>
          </div>
        </MainWrapper>
      </StyledGame>
      }
    </ErrorHandler>
  )
}

const ErrorHandler = ({status, failed, idle, children}) => {
  const getComponent = () => {
    switch (status) {
      case "idle":
        return idle
      case "failed":
        return failed
      case "succeed":
        return children
      default:
        return children
    }
  }
  return <>{getComponent()}</>
}

ErrorHandler.propTypes = {
  status: PropTypes.string,
  failed: PropTypes.element,
  idle: PropTypes.element,
}

const StyledGame = styled.div`
  position: relative;
  padding: 0 4px;
`
const MainWrapper = styled.main`
  ${up('md')} {
    width: 700px;
    margin: 0 auto;
  }
`

const Background = ({src}) => {
  return (
    <BackgroundWrapper>
      <BackgroundImage src={src}/>
    </BackgroundWrapper>
  )
}

Background.propTypes = {
  src: PropTypes.string,
}

const BackgroundWrapper = styled.div`
  position: absolute;
  top: -120px;
  left: -8px;
  width: 100vw;
  height: 70vh;
  z-index: -1;
`

const BackgroundImage = styled.div.attrs(props => ({
  style: {
    background: `
    linear-gradient(to bottom, rgba(15,15,15,0.7), ${props.theme.colors.back}),
    url(${props.src})
  `
  }
}))`
  background-position: 50% !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  width: 100%;
  height: 100%;
  z-index: -2;
`

BackgroundImage.propTypes = {
  src: PropTypes.string,
}


const Title = styled.h1`
  text-align: center;
  margin: 46px 0 8px 0;
  
`

const Platforms = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  
  flex-wrap: wrap;
`

const Screenshots = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; 
  padding-bottom: 8px;
  height: 175px;
  width: 100%;
`

const Screenshot = styled.div.attrs(props => ({
  style: {backgroundImage: `url(${props.src})`},
  role: 'button',
  tabIndex: "0"
}))`
  height: 100%;
  min-width: 260px;
  background-position: 50% !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border-radius: 16px;
  margin: 0 4px;
`

Screenshot.propTypes = {
  src: PropTypes.string,
}



const Description = styled.div`
  margin: 0 12px;
  p {
    text-indent: 12px;
  }
`

const MessageWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Game
