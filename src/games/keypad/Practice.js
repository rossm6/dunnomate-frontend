import Box from "../../components/Box";
import "simplebar/src/simplebar.css";
import GeneralCard from "../../components/GeneralCard";
import Page from "./Page";
import { indexToNumberPressed } from "./constants";
import useKeyPadGame from "./useKeypadGame";
import KeypadGame from "./Keypad";
import { useState } from "react";

const MESSAGES = [
  () => `
  Below is a keypad.

  The blue number above each button is the position of the button in the keypad.  Each button shows a different number ranging from 1 to 9.

  Click any button on the keypad to start.
  `,
  (number, movement) =>
  `
  The green button is the one you clicked.

  The yellow button is the button you have to click next.

  To work out why this button is the next to click you must do the following -

  Take the number which is showing in the button you last clicked  (the green button).
  It is currently showing the number ${number}.

  Look up the button at the position given by this number.  (So the button which is
  below the blue number ${number}).  Take note of the number in this button.
  It is currently showing the number ${movement}.

  Finally count this many buttons from the green button.  The flashing blue
  buttons show you how to count in case you aren't sure.

  Continue the sequence until you feel confident.
  `
];


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
              <Box fontSize={12} mb={30} textAlign="center" whiteSpace="pre-line">
                {
                  clickCount > 0
                  ?
                  MESSAGES[1](
                    state.current.display,
                    state.numbers[indexToNumberPressed[state.current.display - 1]]
                  )
                  :
                  MESSAGES[0]()
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
            />
          </Box>
        }
      />
    </Page>
  );
}

export default Practice;
