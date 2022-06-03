import shuffle from "lodash.shuffle";
import useKeyPad, {
  keyboardDefaultMap,
  replaceNumberNine,
} from "./useKeypad";
import { DIGITS, indexToNumberPressed } from "./constants";
import { useCallback, useContext, useEffect, useState } from "react";
import useCounter from "../../hooks/useCounter";
import { NUMBERS_MAP } from "../../core/constants";

export default function useKeyPadGame () {
  const numbers = shuffle(DIGITS);
  replaceNumberNine(numbers, keyboardDefaultMap);
  const [state, onClick] = useKeyPad(numbers);
  const [buttonActive, setButtonActive] = useState();
  const [keypadContainerProps, setKeypadContainerProps] = useState({ key: 0 });
  const [score,, increaseScore] = useCounter(0);
  const [lives, decreaseLives] = useCounter(3);

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

  return [
    state,
    onClick,
    score,
    lives,
    buttonActive,
    keypadContainerProps,
    handleMouseDown,
    handleMouseUp,
    activeButtonProps,
    success,
    failure
  ];

}
