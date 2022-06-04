import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../../components/Box";
import usePrevious from "../../hooks/usePrevious";
import { keyboardDefaultMap } from "./useKeypad";
import isNumber from "lodash.isnumber";
import { indexToNumberPressed } from "./constants";
import { ReactComponent as ReplaySVG } from '../../images/replay.svg';
import Button from "../../components/Button";

/**
 * Indicate whether the user got the answer wrong or right.
 * The lives counter isn't clear enough.
 * We should be increasing scores on success !!
 */

 const KeyPadContainer = styled(Box)`
  @keyframes incorrect {
    100% {
      background-color: red;
      opacity: 0.5;
    }
  }
  @keyframes correct {
    100% {
      background-color: green;
      opacity: 0.5;
    }
  }
`;

export const Scrollable = styled(Box)`

  width: 30px;
  height: 30px;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  animation: down 1.5s infinite;
  -webkit-animation: down 1.5s infinite;
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 7px;
    width: 10px;
    height: 10px;
    border-left: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(-45deg);
  }

  @keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }

  @-webkit-keyframes {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }

  @keyframes scroll {
    0% {
      height: 40px;
    }
    30% {
      height: 70px;
    }
    60% {
      height: 40px;
    }
  }

  @-webkit-keyframes scroll {
    0% {
      height: 40px;
    }
    30% {
      height: 70px;
    }
    60% {
      height: 40px;
    }
  }
`;

const KeypadButton = styled(Box)``;

KeypadButton.defaultProps = {
    as: "button",
    height: 50,
    width: 50,
    bg: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    p: 0,
    boxShadow: "0 4px #999"
};


function Keypad ({ children: keys, ...rest }) {

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            {...rest}
        >
            <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                gridGap={4}
            >
                {keys}
            </Box>
        </Box>
    );
}


function helperButtonProps (path, index) {

  let bg;
  let color;

  if(path.start === indexToNumberPressed[index]){
    bg = "green";
  }

  if(path.on && path.index === indexToNumberPressed[index]){
    bg = "blue";
    color = "white";
  }

  if(path.end === indexToNumberPressed[index]){
    color = "red";
  }

  return { bg, color };
}

export default function KeypadGame ({
  keypadContainerProps,
  current,
  next,
  numbers,
  buttonActive,
  activeButtonProps,
  indexToNumberPressed,
  onClick,
  success,
  failure,
  handleMouseDown,
  handleMouseUp,
  showHelpers,
  showReplayButton
}) {

  const [path, setPath] = useState({
    start: undefined,
    end: undefined,
    index: undefined,
    on: false
  });

  const previousNumbers = usePrevious(numbers);

  useEffect(() => {
    if(previousNumbers !== numbers && isNumber(next)){
      let start = keyboardDefaultMap[current];
      let end = keyboardDefaultMap[next];
      setPath({
        start,
        end,
        index: start + 1 === 9 ? indexToNumberPressed[keyboardDefaultMap[0]] : start + 1,
        on: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, next, numbers, path, setPath]);

  useEffect(() => {

    if(path.index !== undefined && path.on){

      const id = setInterval(() => {
        let index;
        let on;
        if(path.index === path.end){
          index = path.start + 1;
          on = false;
        }
        else{
          index = path.index + 1;
          on = true;
        }
        index = index === 9 ? indexToNumberPressed[keyboardDefaultMap[0]] : index;

        setPath({
          start: path.start,
          end: path.end,
          index,
          on
        });

      }, [1000]);

      return () => {
        clearInterval(id);
      };

    }
  }, [path, setPath, indexToNumberPressed]);

  return (
    <KeyPadContainer
      bg="white"
      borderRadius={30}
      p={4}
      {...keypadContainerProps}
    >
      {
        showReplayButton
        &&
        <Box display="flex" justifyContent="center" mt={2} mb={30}>
          <Button display="flex" onClick={() => setPath({ ...path, on: true })}>
            <ReplaySVG/>
          </Button>
        </Box>
      }
      <Keypad>
        {numbers.map((number, index) => (
          <Box key={index}>
            {showHelpers && <Box color="blue" fontSize={10}>{indexToNumberPressed[index] + 1}</Box>}
              <KeypadButton
                {...(index === buttonActive && activeButtonProps)}
                {...(showHelpers && helperButtonProps(path, index))}
                key={index}
                onClick={() => {
                  onClick(indexToNumberPressed[index], success, failure);
                }}
                onMouseDown={() => handleMouseDown(index)}
                onMouseUp={() => handleMouseUp(index)}
                onTouchStart={() => handleMouseDown(index)}
                // onMouseUp seems to be firing on mobile ??
                // And it is this which undos the effect from onTouchStart
              >
                {number}
              </KeypadButton>
            </Box>
        ))}
      </Keypad>
    </KeyPadContainer>
  );
}

KeypadGame.defaultProps = {
  showHelpers: false,
  showReplayButton: false
};
