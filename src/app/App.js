import React from 'react'
import {hot} from 'react-hot-loader'
import styled from 'styled-components'
import Switch, {HashRouter} from 'react-router-dom'
import Route from "react-router-dom";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Header from "../components/Header";

const App = () => {
  return (
    <StyledApp>
      <HashRouter>
        <Header/>
        <Switch>
          <Route path="/" component={<Home/>}/>
          <Route path={"/game/:gameId"} component={<Game/>}/>
        </Switch>
      </HashRouter>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  
`

export default hot(module)(App)
