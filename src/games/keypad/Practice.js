import { useCallback, useContext, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Box from "../../components/Box";
import Button from "../../components/Button";
import "simplebar/src/simplebar.css";
import Keypad, { KeypadButton } from "./Keypad";
import { GameContext } from "../../core/contexts";
import { NUMBERS_MAP } from "../../core/constants";
import GeneralCard from "../../components/GeneralCard";
import Page from "./Page";
import { indexToNumberPressed } from "./constants";
import { keyboardDefaultMap } from "./useKeypad";

function GameExplanation({ messageIndex, setMessageIndex }) {
  const { dispatch } = useContext(GameContext);

  return (
    <>
      {messageIndex === 0 && (
        <Box>
          <Box>
            <Box>
              Below is a keypad with nine keys. Each key has a fixed position
              and a number. The key in the bottom left is position 1, the key at
              the bottom right is position 3, the key at the top left is
              position 7, and the key at the top right is position 9.
            </Box>
            <Box mt={3}>
              Keys also have numbers showing. So on the keypad below, the key at
              position 1 is showing 9, the key at position 3 is showing 8, the
              key at position 7 is showing 2, and the key at position 9 is
              showing 1.
            </Box>
            <Box mt={5}>
              Movement around the keypad is intuitive.
              <Box as="ul" mt={3} listStylePosition="inside">
                <Box>Examples:</Box>
                <Box as="li" my={2}>
                  Starting at the key which displays 9, then moving by 2, would
                  mean moving to the key which displays 8.
                </Box>
                <Box as="li" my={2}>
                  Starting at the key which displays 9, then moving by 3, would
                  mean moving to the key which displays 3.
                </Box>
                <Box as="li" my={2}>
                  Starting at the key which displays 4, then moving by 2, would
                  mean moving to the key which displays 9. (Looping back round
                  in other words.)
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={5}>
            <Box>
              Assuming you understand so far, let's go through some moves
              together to see the other rules of the game.
            </Box>
            <Button onClick={() => setMessageIndex(1)} mt={3}>
              Ready
            </Button>
          </Box>
        </Box>
      )}
      {messageIndex === 1 && (
        <Box>
          <Box mb={3}>
            To start the game you click on any key in the keypad. We'll choose
            the key at position 1 which displays the number 9 for this practice
            run.
          </Box>
          <Box mb={3}>
            Go ahead and click the key at position 1 which displays the number
            9.
          </Box>
        </Box>
      )}
      {messageIndex === 2 && (
        <Box>
          <Box mb={3}>Notice three keys now have a colored border.</Box>
          <Box mb={3}>
            The key with the green border is just the key you last clicked.
            It is showing the number 9.
          </Box>
          <Box mb={3}>
            So we look up the key which is at position 9 (the top right key).
            To help this circled in red.  It is showing the number 2.
          </Box>
          <Box mb={3}>
            So the next key we have to press is the determined by moving
            2 buttons from where we last clicked.  This is the button
            in the bottom right.  It is circled in yellow.
          </Box>
          <Box mb={3}>
            In summary - you have to work out which key to press next.
            The rule is look up the number which is showing at the position
            given by the number showing on the last button you clicked.
          </Box>
          <Box>Go ahead and click the button which is circled in yellow.</Box>
        </Box>
      )}
      {messageIndex === 3 && (
        <Box>
          <Box>
            This time you need to work out the key to click on youself, although
            we've still helped by giving you the other (again with a red
            border).
          </Box>
        </Box>
      )}
      {messageIndex === 4 && (
        <Box>
          <Box>
            Ok, this time we are only reminding you of the last key you clicked
            with the green border. You need to work out the rest.
          </Box>
        </Box>
      )}
      {messageIndex === 5 && (
        <Box>
          <Box>
            Finally, let's see you do one where isn't any reminder or help at
            all. This is what it will be like in the real test.
          </Box>
        </Box>
      )}
      {messageIndex === 6 && (
        <Box>
          <Box mb={3}>Looks like you understand the game.</Box>
          <Box mb={3}>
            The aim of the game is simple - click as many correct keys as you
            can in under two minutes.
          </Box>
          <Box mb={3}>
            If you trip up you lose a life. You have three lives.
          </Box>
          <Box>
            Oh, and if you have a keyboard you can use the number keypad
            to help.  This way it's easy to compete with the guys who
            are using a touch screen device.
          </Box>
          <Box>
            <Button
              onClick={() => dispatch({ type: "setView", payload: "game" })}
            >
              Play
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

function Practice() {
  const [index, setIndex] = useState(0);


  const keypads = useRef([
    {
      keypad: [2, 4, 1, 3, 6, 5, 9, 7, 8],
      answer: 6,
    },
    {
      keypad: [4, 6, 2, 5, 8, 3, 9, 7, 1],
      answer: 8,
      clicked: 6,
      pointer: 2,
      next: 8,
    },
    {
      keypad: [3, 2, 7, 9, 6, 4, 5, 8, 1],
      answer: 1,
      clicked: 8,
      pointer: 6,
    },
    {
      keypad: [1, 2, 8, 6, 5, 4, 7, 3, 9],
      answer: 7,
      clicked: 1,
    },
    {
      keypad: [2, 4, 1, 7, 6, 5, 9, 3, 8],
      answer: 6,
    },
  ]);

  const [messageIndex, setMessageIndex] = useState(0);
  const [buttonActive, setButtonActive] = useState();

  const onClick = useCallback(
    (numberPressedIndex) => {
      const buttonIndex = keyboardDefaultMap[numberPressedIndex];
      if (messageIndex === 0) {
        return;
      }
      if (keypads.current[index].answer === buttonIndex) {
        if (index + 1 < keypads.current.length) {
          setIndex(index + 1);
          setMessageIndex(messageIndex + 1);
        } else {
          setMessageIndex(6);
        }
      }
    },
    [messageIndex, index, setIndex, setMessageIndex]
  );

  const commonOutlineProps = {
    outlineOffset: 4,
    outlineWidth: 2,
    outlineStyle: "solid",
    outlineColor: "transparent",
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      let numberPressed = NUMBERS_MAP[e.keyCode];
      if (numberPressed) {
        setButtonActive(keyboardDefaultMap[numberPressed - 1]);
        onClick(numberPressed - 1);
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

  }, [buttonActive, onClick, setButtonActive]);

  const buttons = keypads.current[index].keypad.map((key, buttonIndex) => {
    const btn = {
      number: key,
      props: {
        ...commonOutlineProps,
      },
    };
    if (buttonIndex === keypads.current[index].clicked) {
      btn.props["outlineColor"] = "green";
    } else if (buttonIndex === keypads.current[index].pointer) {
      btn.props["outlineColor"] = "red";
    } else if (buttonIndex === keypads.current[index].next) {
      btn.props["outlineColor"] = "yellow";
    }
    return btn;
  });

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

  return (
    <Page>
      <GeneralCard
        bg="haze"
        Chart={
          <Box>
            <Box as="h1" fontSize={20} fontWeight={900} mb={30}>
              Game Explanation
            </Box>
            <Box p={20} bg="white" borderRadius={30}>
              <SimpleBar
                forceVisible={true}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontSize: 12,
                  maxHeight: "300px",
                  padding: 10,
                  width: "100%",
                }}
              >
                <GameExplanation
                  messageIndex={messageIndex}
                  setMessageIndex={setMessageIndex}
                />
              </SimpleBar>
            </Box>
            <Box bg="white" mt={6} p={20} borderRadius={30}>
              <Keypad>
                {buttons.map((button, index) => (
                  <KeypadButton
                    key={index}
                    {...(index === buttonActive && activeButtonProps)}
                    {...button.props}
                    onClick={() => onClick(indexToNumberPressed[index])}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseUp={() => handleMouseUp(index)}
                    onTouchStart={() => handleMouseDown(index)}
                  >
                    {button.number}
                  </KeypadButton>
                ))}
              </Keypad>
            </Box>
          </Box>
        }
      />
    </Page>
  );
}

export default Practice;