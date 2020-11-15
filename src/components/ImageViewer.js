import React from 'react'
import styled from 'styled-components'
import previous from '../assets/previous.svg'
import next from '../assets/next.svg'

export const ImageViewer = ({}) => {
  return (
    <StyledImageViewer>
      <UpperButtons>
        <div/>
        <Button><ButtonIcon src={previous}/></Button>
        <Button><ButtonIcon src={next}/></Button>
        <Button>X</Button>
      </UpperButtons>
      <ImageContainer/>
      <PreviewContainer>
        <Preview/>
      </PreviewContainer>
    </StyledImageViewer>
  )
}

export const StyledImageViewer = styled.div`

`

export const UpperButtons = styled.div`

`

export const Button = styled.button`
  border-radius: 50%;
  border: none;
  padding: 8px;
  margin: 0 8px;
  background-color: ${({theme}) => theme.colors.input.back};
  
`

export const ButtonIcon = styled.i.attrs(({src}) => ({style: {backgroundImage: `url(${src});`}}))`
  width: 48px;
  height: 48px;
`

export const ImageContainer = styled.div`

`

export const PreviewContainer = styled.div`

`

export const Preview = styled.div`

`
