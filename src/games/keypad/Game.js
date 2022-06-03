import shuffle from "lodash.shuffle";
import { useCallback, useContext, useEffect, useState } from "react";
import Box from "../../components/Box";
import { GameContext } from "../../core/contexts";
import useCounter from "../../hooks/useCounter";
import useTimer from "../../hooks/useTimer";
import Page from "./Page";
import BasePage from "../../components/Page";
import styled from "styled-components";
import { DIGITS, indexToNumberPressed } from "./constants";
import useKeyPad, {
  keyboardDefaultMap,
  replaceNumberNine,
} from "./useKeypad";
import Keypad, { KeypadButton } from "./Keypad";
import GeneralCard from "../../components/GeneralCard";
import { NUMBERS_MAP } from "../../core/constants";
import KeypadGame from "./Keypad";


export default function Game() {
  const { dispatch } = useContext(GameContext);

  const numbers = shuffle(DIGITS);
  replaceNumberNine(numbers, keyboardDefaultMap);
  // avoid placing number 9 at the position number 9
  // for starting the game
  // this way we avoid extra special cases in the game logic

  const [state, onClick] = useKeyPad(numbers);

  const {  timeRemaining: countDown } = useTimer({ duration: 3 });
  const { timeRemaining, start } = useTimer({ automatic: false, duration: 30 });
  const [score,, increaseScore] = useCounter(0);
  const [lives, decreaseLives] = useCounter(3);

  const [buttonActive, setButtonActive] = useState();
  const [keypadContainerProps, setKeypadContainerProps] = useState({ key: 0 });

  useEffect(() => {
    if(countDown === 0){
      start();
    }
  }, [countDown, start]);

  const success = useCallback(() => {
    increaseScore();
    setKeypadContainerProps({
      animation: "correct 0.25s",
      key: keypadContainerProps.key + 1,
    });
  }, [increaseScore, setKeypadContainerProps, keypadContainerProps.key]);

  const failure = useCallback(() => {
    decreaseLives();
    setKeypadContainerProps({
      animation: "incorrect 0.25s",
      key: keypadContainerProps.key + 1,
    });
  }, [decreaseLives, setKeypadContainerProps, keypadContainerProps.key]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let numberPressed = NUMBERS_MAP[e.keyCode];
      if (numberPressed) {
        setButtonActive(keyboardDefaultMap[numberPressed - 1]);
        onClick(numberPressed - 1, success, failure);
      }
    };

    const handleKeyUp = (e) => {
      buttonActive !== null && setButtonActive(null);
    };

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onClick, buttonActive, setButtonActive, increaseScore, failure, success]);

  useEffect(() => {
    if (!lives || !timeRemaining) {
      dispatch({
        type: "gameOver",
        payload: {
          score,
        },
      });
    }
  }, [dispatch, timeRemaining, lives, score]);

  const handleMouseDown = (index) => {
    setButtonActive(index);
  };
  const handleMouseUp = () => {
    buttonActive !== null && setButtonActive(null);
  };

  const activeButtonProps = {
    backgroundColor: "#f3f3f3",
    boxShadow: "0 5px #666",
    transform: "translateY(2px)",
  };

  if(countDown > 0){
    return (
      <BasePage bg="blue">
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize={[24, 36, 48]}
        >
          {countDown}
        </Box>
      </BasePage>
    );
  }

  return (
    <Page>
      <GeneralCard
        bg="haze"
        Header={<Box as="h2">Keypad</Box>}
        Chart={
          <Box>
            <Box bg="white" p={4} mb={4} borderRadius={30} display="flex">
              <Box
                display="flex"
                justifyContent="space-between"
                width={0.5}
                bg="blue"
                borderRadius={50}
                p={"1px"}
              >
                <Box
                  bg="white"
                  borderRadius={50}
                  fontSize={14}
                  height={50}
                  width={50}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="blue"
                >
                  {timeRemaining}s
                </Box>
                <Box display="flex" alignItems="center" fontSize={10} mr={3}>
                  time
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                width={0.5}
                bg="pink"
                borderRadius={50}
                p="1px"
              >
                <Box display="flex" alignItems="center" fontSize={10} ml={3}>
                  lives
                </Box>
                <Box
                  borderRadius={50}
                  fontSize={14}
                  height={50}
                  width={50}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bg="white"
                  color="pink"
                >
                  {lives}
                </Box>
              </Box>
            </Box>
            <KeypadGame
              keypadContainerProps={keypadContainerProps}
              numbers={state.numbers}
              buttonActive={buttonActive}
              activeButtonProps={activeButtonProps}
              indexToNumberPressed={indexToNumberPressed}
              onClick={onClick}
              success={success}
              failure={failure}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
            />
          </Box>
        }
      />
    </Page>
  );

}
