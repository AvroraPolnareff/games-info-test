import React from 'react'
import {hot} from 'react-hot-loader'
import styled from 'styled-components'

const App = () => {
  return (
    <StyledApp>
      <h1>Hello There!</h1>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  
`

export default hot(module)(App)
