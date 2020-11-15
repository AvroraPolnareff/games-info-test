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

const Home = ({}) => {
  const games = useSelector(selectGames)
  const status = useSelector(selectStatus)
  const sort = useSelector(selectSort)
  const platforms = useSelector(selectPlatforms)

  const query = useQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGamesList({
        search: query.get('search'),
        platforms: query.get('platforms'),
        sort: query.get('sort'),
      }))
    }
  }, [status, dispatch])

  const onLoadMore = () => {
    dispatch(fetchGamesList({}))
  }

  const handleSort = (e) => {
    console.log(e.target.value)
    dispatch(changeSort(e.target.value))
    console.log(sort)
  }

  const handlePlatforms = (e) => {
    const value = e.target.value ? [e.target.value] : []
    dispatch(changePlatforms(value))
  }

  return (
    <StyledHome>
      <SortWrapper>
        <span>Sort By: </span>
        <Select name="sort" value={sort} onChange={handleSort}>
          <option value="">None</option>
          <option value={"rating"}>Rating asc.</option>
          <option value={"-rating"}>Rating desc.</option>
          <option value={"released"}>Release Date asc.</option>
          <option value={"-released"}>Release Date desc.</option>
        </Select>
        <Select name="platforms" value={platforms} onChange={handlePlatforms}>
          <option value="">All</option>
          <option value="187">PlayStation 5</option>
          <option value="18">PlayStation 4</option>
          <option value="4">Xbox One</option>
        </Select>
      </SortWrapper>
      <GamesList
        dataLength={games.length}
        next={onLoadMore}
        hasMore={true}
        useWindow={true}
        loader={<h4>Loading</h4>}
      >
        {games.length && games.map(game => (
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

const StyledHome = styled.div`
  
`
const GamesList = styled(InfiniteScroll)`
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
