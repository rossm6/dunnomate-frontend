import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../../components/Box";
import usePrevious from "../../hooks/usePrevious";
import { keyboardDefaultMap } from "./useKeypad";
import isNumber from "lodash.isnumber";
import { indexToNumberPressed } from "./constants";

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

  if(path.index === indexToNumberPressed[index]){
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
  showHelpers
}) {

  const [path, setPath] = useState({
    start: undefined,
    end: undefined,
    index: undefined
  });

  const previousNumbers = usePrevious(numbers);

  useEffect(() => {
    if(previousNumbers !== numbers && isNumber(next)){
      let start = keyboardDefaultMap[current];
      let end = keyboardDefaultMap[next];
      setPath({
        start,
        end,
        index: start + 1 === 9 ? indexToNumberPressed[keyboardDefaultMap[0]] : start + 1
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, next, numbers, path, setPath]);

  useEffect(() => {

    if(path.index !== undefined){

      const id = setInterval(() => {
        let index;
        if(path.index === path.end){
          index = path.start + 1;
        }
        else{
          index = path.index + 1;
        }
        index = index === 9 ? indexToNumberPressed[keyboardDefaultMap[0]] : index;

        setPath({
          start: path.start,
          end: path.end,
          index
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
      <Keypad>
        {numbers.map((number, index) => (
          <Box>
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
  showHelpers: false
};
