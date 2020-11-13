import React from 'react'
import {hot} from 'react-hot-loader'
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
          <Route path={"/game/:gameId"} component={<Game/>}/>
        </Switch>
      </HashRouter>
  )
}

const StyledApp = styled.div`
  
`

export default App
