import React from 'react'
import styled from 'styled-components'
import {Switch ,HashRouter, Route} from 'react-router-dom'
import Home from "../pages/Home";
import Game from "../pages/Game";
import Header from "../components/Header";

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
      </HashRouter>
  )
}

const StyledApp = styled.div`
  
`

export default App
