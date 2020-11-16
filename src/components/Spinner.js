import styled, {keyframes} from 'styled-components'
import PropTypes from "prop-types"

const loadingspin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

export const Spinner = styled.div`
  pointer-events: none;
  width: ${({big}) => big ? "5" : "2.5"}em;
  height: ${({big}) => big ? "5" : "2.5"}em;
  
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #3E67EC;
  border-radius: 50%;
  animation: ${loadingspin} 1s linear infinite;
`
Spinner.propTypes = {
  big: PropTypes.bool,
}
