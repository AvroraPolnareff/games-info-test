import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import GameCard from "../components/GameCard";
import {fetchGames} from "../api/rawg-api";

//TODO REMOVE
const platforms = [
  {name: "PC", id: 1},
  {name: "PlayStation 4", id: 0},
  {name: "PlayStation 3", id: 2},
  {name: "Xbox One", id: 3},
  {name: "Xbox 360", id: 4},
]

const Home = ({}) => {
  const [games, setGames] = useState([])
  useEffect(() => {
    fetchAllGames()
  })

  const fetchAllGames = async () => {
    const games = await fetchGames()
    setGames(games)
  }

  return (
    <StyledHome>
      <SortWrapper>
        <span>Sort By: </span>
        <Select name="sort">
          <option value={"rating"}>Rating asc.</option>
          <option value={"-rating"}>Rating desc.</option>
          <option value={"released"}>Release Date asc.</option>
          <option value={"-released"}>Release Date desc.</option>
        </Select >
        <Select name="platform"/>
      </SortWrapper>
      <GamesList>
        {games.length  && games.map(game => (
          <GameCard
            title={game.title}
            platforms={game.platforms}
            rating={game.rating}
            releaseDate={game.releaseDate}
            thumbnail={game.thumbnail}
          />
        ))}
        <GameCard
          name={"Chiken Police - Paint it RED!"}
          platforms={platforms}
          rating={96}
          releaseDate={"09.09.2020"}
          thumbnail={"https://media.rawg.io/media/crop/600/400/screenshots/17a/17a94bcc1b994fa4e24729371d6988b6.jpg"}
        />
        <GameCard
          name={"Chiken Police - Paint it RED!"}
          platforms={platforms}
          rating={96}
          releaseDate={"09.09.2020"}
          thumbnail={"https://media.rawg.io/media/crop/600/400/screenshots/17a/17a94bcc1b994fa4e24729371d6988b6.jpg"}
        />
        <GameCard
          name={"Chiken Police - Paint it RED!"}
          platforms={platforms}
          rating={96}
          releaseDate={"09.09.2020"}
          thumbnail={"https://media.rawg.io/media/crop/600/400/screenshots/17a/17a94bcc1b994fa4e24729371d6988b6.jpg"}
        />

      </GamesList>
    </StyledHome>
  )
}

const StyledHome = styled.div`
  
`
const GamesList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  
`
const SortWrapper = styled.div`
  
`

const Select = styled.select`
  background-color: ${({theme}) => theme.colors.input.back};
  padding: 4px;

  color: ${({theme}) => theme.colors.input.text};
  border-radius: 4px;
  border: none;
  & > option {
    color: black;
  }
`

export default Home
