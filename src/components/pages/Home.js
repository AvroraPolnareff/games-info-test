import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import GameCard from "../GameCard";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSort,
  fetchGamesList,
  selectGames,
  selectHasMore,
  selectSort,
  selectStatus,
} from "../../store/gamesListSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../shared/Spinner";
import { Button } from "../shared/Button";
import { show } from "../../store/modalSlice";

const Home = ({}) => {
  const games = useSelector(selectGames);
  const status = useSelector(selectStatus);
  const sort = useSelector(selectSort);
  const hasMore = useSelector(selectHasMore);
  const notFound = useMemo(
    () => !hasMore && !games.length && status !== "idle",
    [hasMore, games],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGamesList({}));
    }
  }, [status, dispatch]);

  const onLoadMore = () => {
    dispatch(fetchGamesList({}));
  };

  const handleSort = (e) => {
    dispatch(changeSort(e.target.value));
  };

  const handlePlatformsClick = (e) => {
    dispatch(show("platforms"));
  };

  return (
    <StyledHome>
      <FiltersWrapper>
        <label>
          Sort By:
          <Select name="sort" value={sort} onChange={handleSort}>
            <option value="">None</option>
            <option value={"rating"}>Rating asc.</option>
            <option value={"-rating"}>Rating desc.</option>
            <option value={"released"}>Release Date asc.</option>
            <option value={"-released"}>Release Date desc.</option>
          </Select>
        </label>

        <Button onClick={handlePlatformsClick}>Select Platforms</Button>
      </FiltersWrapper>
      <GamesList
        dataLength={games.length}
        next={onLoadMore}
        hasMore={hasMore}
        useWindow={true}
        loader={
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        }
      >
        {Boolean(games.length) &&
          games.map((game) => (
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
      {notFound && (
        <h1
          css={`
            margin-top: 30vh;
          `}
        >
          Nothing has found, try to change search parameters.
        </h1>
      )}
    </StyledHome>
  );
};

const StyledHome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const GamesList = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  align-items: flex-start;
`;
const FiltersWrapper = styled.div`
  display: flex;
`;

const Select = styled.select`
  background-color: ${({ theme }) => theme.colors.input.back};
  padding: 4px;
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.input.text};
  border-radius: 4px;
  border: none;

  & > option {
    color: black;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding-top: 48px;
`;

export default Home;
