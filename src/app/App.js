import React from 'react'
import styled from 'styled-components'
import {Switch ,HashRouter, Route} from 'react-router-dom'
import Home from "../pages/Home";
import Game from "../pages/Game";
import Header from "../components/Header";
import {useSelector} from "react-redux";
import {selectShow} from "../store/imageViewerSlice";
import {ImageViewer} from "../components/ImageViewer";

const App = () => {
  return (
      <HashRouter>
        <Header/>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path={"/game/:gameId"}>
            <Game/>
          </Route>
        </Switch>
        <Modals/>
      </HashRouter>
  )
}

const StyledApp = styled.div`
  
`

const Modals = () => {
  const showImageViewer = useSelector(selectShow)

  return (
    <>
      {showImageViewer && <ImageViewer/>}
    </>
  )
}

export default App
