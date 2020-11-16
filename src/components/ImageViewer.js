import React from 'react'
import styled, {css} from 'styled-components'
import previousSvg from '../assets/previous.svg'
import nextSvg from '../assets/next.svg'
import closeSvg from '../assets/close.svg'
import {useDispatch, useSelector} from "react-redux";
import {
  hide, jumpTo,
  selectCanNext,
  selectCanPrevious,
  selectCurrentImage,
  selectImages, next, previous
} from "../store/imageViewerSlice";
import {up} from "styled-breakpoints";
import PropTypes from "prop-types"

export const ImageViewer = () => {
  const dispatch = useDispatch()

  const canNext = useSelector(selectCanNext)
  const canPrevious = useSelector(selectCanPrevious)
  const currentImage = useSelector(selectCurrentImage)
  const images = useSelector(selectImages)

  const handlePrevious = () => {
    dispatch(previous())
  }

  const handleNext = () => {
    dispatch(next())
  }

  const handleClose = () => {
    dispatch(hide())
  }

  const handlePreviewClick = (id) => {

    dispatch(jumpTo(id))
  }

  return (
    <StyledImageViewer>
      <UpperButtons>
        <div/>
        <ViewerButton disabled={!canPrevious} src={previousSvg} onClick={handlePrevious}/>
        <ViewerButton disabled={!canNext} src={nextSvg} onClick={handleNext}/>
        <ViewerButton src={closeSvg} onClick={handleClose}/>
      </UpperButtons>
      <ImageContainer>
        <Image src={currentImage.full}/>
      </ImageContainer>
      <PreviewContainer>
        {images.map(image => (
          <Preview
            src={image.mini}
            active={image.id === currentImage.id}
            onClick={() => handlePreviewClick(image.id)}
          />
        ))}
      </PreviewContainer>
    </StyledImageViewer>
  )
}

export const StyledImageViewer = styled.div`
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.colors.back};
  z-index: 100;
  
`

export const UpperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`

const ViewerButton = ({src, disabled, onClick}) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      <span>
      <ButtonIcon src={src}/>
      </span>
    </Button>
  )
}

ViewerButton.propTypes = {
  src: PropTypes.string,
  disabled: PropTypes.boolean,
  onClick: PropTypes.func,
}

export const Button = styled.button`
  border-radius: 50%;
  border: none;
  padding: 8px;
  margin: 0 8px;
  background-color: ${({theme}) => theme.colors.input.enabledBack};
  transition: background-color 0.2s;
  
  ${({disabled, theme}) => (disabled && css`
    background-color: ${theme.colors.input.back};
  `)}
  
  ${({disabled}) => (!disabled && css`
    ${up('md')} {
      &:hover {
        background-color: ${({theme}) => theme.colors.input.back};
      }
    }
`)}
`
Button.propTypes = {
  disabled: PropTypes.boolean
}

const ButtonIcon = styled.i.attrs(({src}) => ({
  style: {
    backgroundImage: `url(${src})`
  }
}))`
  width: 32px;
  height: 32px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`

ButtonIcon.propTypes = {
  src: PropTypes.string
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Image = styled.img`
  margin-top: 10%;
  width: 100%;
  height: auto;
  ${up('md')} {
    padding-top: 0;
    width: 55%;
    margin: 0 auto;
  }
`

export const PreviewContainer = styled.div`
  position: relative;
  margin-top: 4px;
  overflow-x: auto;
  width: 100%;
  display: inline-flex;
  flex-wrap: nowrap;
  height: 25%;
  box-sizing: border-box;
`

export const Preview = styled.div.attrs(({src}) => ({
  style: {
    background: `
      url(${src})
    `
  }
}))`
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: contain !important;
  min-width: 100px;
  box-sizing: border-box;
  margin: 0 8px;
  transition: all 0.3s ;
  
  ${up('md')} {
    min-width: 200px;
  }
  
  ${({active}) => !active && css`
    filter: brightness(50%);
    &:hover {
      
      filter: brightness(100%);
    }
  `}
`

Preview.propTypes = {
  src: PropTypes.string,
  active: PropTypes.boolean
}
