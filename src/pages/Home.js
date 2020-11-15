import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import GameCard from "../components/GameCard";
import {useDispatch, useSelector} from "react-redux";
import {
  changePlatforms,
  changeSort,
  fetchGamesList,
  selectGames, selectPlatforms,
  selectSort,
  selectStatus
} from "../store/gamesListSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import {useQuery} from "../helpers/hooks";
import {Spinner} from "../components/Spinner";

const Home = ({}) => {
  const games = useSelector(selectGames)
  const status = useSelector(selectStatus)
  const sort = useSelector(selectSort)
  const platforms = useSelector(selectPlatforms)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGamesList({}))
    }
  }, [status, dispatch])

  const onLoadMore = () => {
    dispatch(fetchGamesList({}))
  }

  const handleSort = (e) => {
    dispatch(changeSort(e.target.value))
  }

  const handlePlatforms = (e) => {
    const value = e.target.value ? [e.target.value] : []
    dispatch(changePlatforms(value))
  }

  return (
    <StyledHome>
      <FiltersWrapper>
        <label>Sort By:
          <Select name="sort" value={sort} onChange={handleSort}>
            <option value="">None</option>
            <option value={"rating"}>Rating asc.</option>
            <option value={"-rating"}>Rating desc.</option>
            <option value={"released"}>Release Date asc.</option>
            <option value={"-released"}>Release Date desc.</option>
          </Select>
        </label>

        <label>Platforms:
          <Select name="platforms" value={platforms} onChange={handlePlatforms}>
            <option value="">All</option>
            <option value="187">PlayStation 5</option>
            <option value="18">PlayStation 4</option>
            <option value="4">Xbox One</option>
          </Select>
        </label>
      </FiltersWrapper>
      <GamesList
        dataLength={games.length}
        next={onLoadMore}
        hasMore={true}
        useWindow={true}
        loader={<SpinnerWrapper><Spinner/></SpinnerWrapper>}
      >
        {Boolean(games.length) && games.map(game => (
          <GameCard
            key={game.id}
            title={game.title}
            platforms={game.platforms}
            rating={game.rating}
            releaseDate={game.releaseDate}
            thumbnail={game.thumbnail}
            slug={game.slug}
          />
        ))}
      </GamesList>
    </StyledHome>
  )
}

const StyledHome = styled.main`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const GamesList = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`
const FiltersWrapper = styled.div`
  display: flex;
`

const Select = styled.select`
  background-color: ${({theme}) => theme.colors.input.back};
  padding: 4px;
  margin: 0 8px;
  color: ${({theme}) => theme.colors.input.text};
  border-radius: 4px;
  border: none;
  & > option {
    color: black;
  }
`

const SpinnerWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 48px;
`

export default Home
