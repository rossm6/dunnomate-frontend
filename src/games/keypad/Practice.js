import Box from "../../components/Box";
import GeneralCard from "../../components/GeneralCard";
import Page from "./Page";
import { indexToNumberPressed } from "./constants";
import useKeyPadGame from "./useKeypadGame";
import KeypadGame from "./Keypad";
import { useState } from "react";
import isNumber from "lodash.isnumber";
import Button from "../../components/Button";

function Message ({ number, movement }) {

  if(isNumber(number) && isNumber(movement)){
    return (
      <Box>
        <Box as="p" my={30}>The green button is the one you clicked.</Box>
        <Box as="p" my={30}>The button with the red number is the button you have to click next.</Box>
        <Box as="ul" my={30}>
          To work out why this button is the next to click you must do the following -
          <Box as="li" my={20}>
            {`Take the number which is showing in the button you last clicked  (the green button).
            It is currently showing the number ${number}.`}
          </Box>
          <Box as="li" my={20}>
            {`Look up the button at the position given by this number.  (So the button which is
            below the blue number ${number}).  Take note of the number in this button.
            It is currently showing the number ${movement}.`}
          </Box>
          <Box as="li" my={20}>
            Finally count this many buttons from the green button.  The flashing blue
            buttons show you how to count in case you aren't sure.  (Feel free to use
            the replay button).
          </Box>
        </Box>
        <Box as="p" my={20}>Continue the sequence until you feel confident you understand.  In the real game you will literally just have the buttons.</Box>
        <Box display="flex" justifyContent="center" mt={40}>
          <Button variant="secondary">Play for real</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box as="p" my={20}>Below is a keypad.</Box>
      <Box as="p" my={20}>The blue number above each button is the position of the button in the keypad.  Each button shows a different number ranging from 1 to 9.</Box>
      <Box as="p" my={20}>Click any button on the keypad to start.</Box>
    </Box>
  );

}


function Practice() {

  const [
    state,
    onClick,
    ,
    ,
    buttonActive,
    keypadContainerProps,
    handleMouseDown,
    handleMouseUp,
    activeButtonProps,
    success,
    failure
  ] = useKeyPadGame();

  const [clickCount, setClickCount] = useState(0);

  const practiceOnClickHandler = (index, success, failure) => {
    onClick(index, success, failure);
    setClickCount(clickCount + 1);
  };

  return (
    <Page>
      <GeneralCard
        bg="haze"
        Chart={
          <Box>
            <Box bg="white" p={4} borderRadius={20} mb={4}>
              <Box as="h1" textAlign="center" fontSize={[18, 20]}>
                Practice Mode
              </Box>
              <Box fontSize={12} maxHeight={200} overflow="auto" textAlign="left" mb={30}>
                {
                  clickCount > 0
                  ?
                  <Message number={state.current.display} movement={state.numbers[indexToNumberPressed[state.current.display - 1]]} />
                  :
                  <Message/>
                }
              </Box>
            </Box>
            <KeypadGame
              keypadContainerProps={keypadContainerProps}
              current={state.current?.index}
              next={state.next?.index}
              numbers={state.numbers}
              buttonActive={buttonActive}
              activeButtonProps={activeButtonProps}
              indexToNumberPressed={indexToNumberPressed}
              onClick={practiceOnClickHandler}
              success={success}
              failure={failure}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              showHelpers={true}
              showReplayButton={clickCount > 0}
            />
          </Box>
        }
      />
    </Page>
  );
}

export default Practice;
