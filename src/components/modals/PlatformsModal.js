import { useDispatch, useSelector } from "react-redux";
import { changePlatforms, selectPlatforms } from "../../store/gamesListSlice";
import {
  selectPlatforms as selectFetchedPlatforms,
  selectStatus,
} from "../../store/platformsListSlice";
import { Modal } from "../shared/Modal";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  fetchPlatformsList,
  selectHasMore,
} from "../../store/platformsListSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { hide } from "../../store/modalSlice";
import { CheckboxGroup } from "../shared/CheckboxGroup";
import { Spinner } from "../shared/Spinner";
import { Button } from "../shared/Button";

export const PlatformsModal = () => {
  const platforms = useSelector(selectPlatforms);
  const fetchedPlatforms = useSelector(selectFetchedPlatforms);
  const hasMore = useSelector(selectHasMore);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    more();
  }, [fetchedPlatforms]);

  const more = () => {
    dispatch(fetchPlatformsList({}));
  };

  const handleChange = (selectedPlatforms) => {
    dispatch(changePlatforms(selectedPlatforms));
  };

  const handleClose = () => {
    dispatch(hide());
  };

  const handleClear = () => {
    if (platforms.length) {
      dispatch(changePlatforms([]));
    }
  };

  return (
    <Modal onClose={handleClose}>
      <StyledPlatformsModal>
        <h1>Select Platforms:</h1>
        <PlatformsList id={"list"}>
          <CheckboxGroup
            value={platforms}
            name={"platforms"}
            onChange={handleChange}
          >
            {(Checkbox) => (
              <InfiniteScroll
                next={more}
                hasMore={hasMore}
                loader={<Spinner />}
                dataLength={fetchedPlatforms.length}
                scrollableTarget={"list"}
              >
                {fetchedPlatforms.map((platform) => (
                  <label key={platform.id}>
                    <Checkbox value={platform.id} /> {platform.name}
                  </label>
                ))}
              </InfiniteScroll>
            )}
          </CheckboxGroup>
        </PlatformsList>
        <ButtonsWrapper>
          <Button onClick={handleClear}>Clear All</Button>
          <Button onClick={handleClose}>Close</Button>
        </ButtonsWrapper>
      </StyledPlatformsModal>
    </Modal>
  );
};

const StyledPlatformsModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const PlatformsList = styled.div`
  max-height: 80%;
  overflow-y: scroll;

  label {
    display: block;
    padding: 4px 6px;
    font-size: 16px;
    background-color: transparent;
    transition: background-color 0.3s;
  }

  label:hover {
    background-color: ${({ theme }) => theme.colors.input.back};
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: 8px;
  text-align: right;
`;
