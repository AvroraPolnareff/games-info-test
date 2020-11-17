import React from "react";
import styled from "styled-components";
import { Switch, HashRouter, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Game from "../components/pages/Game";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectShow as selectViewerShow } from "../store/imageViewerSlice";
import { ImageViewer } from "../components/modals/ImageViewer";
import { selectModal } from "../store/modalSlice";
import { PlatformsModal } from "../components/modals/PlatformsModal";

const App = () => {
  return (
    <StyledApp>
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path={"/game/:gameId"}>
            <Game />
          </Route>
        </Switch>
        <Modals />
      </HashRouter>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  padding-bottom: 200px;
`;

const Modals = () => {
  const showImageViewer = useSelector(selectViewerShow);
  const modal = useSelector(selectModal);

  return (
    <>
      {showImageViewer && <ImageViewer />}
      {modal === "platforms" && <PlatformsModal />}
    </>
  );
};

export default App;
