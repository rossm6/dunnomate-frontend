import { useState } from "react";
import shuffle from "lodash.shuffle";
import swapKeysAndValues from "../../utilities/swapKeysAndValues";

export const keyboardDefaultMap = {
  6: 0,
  7: 1,
  8: 2,
  3: 3,
  4: 4,
  5: 5,
  0: 6,
  1: 7,
  2: 8,
};

export function replaceNumberNine(numbers, map, exclude_indexes = []) {
  let i = numbers.indexOf(9);
  if (i === map[8]) {
    const availableIndexes = Array.from(Array(9).keys()).filter(i => i !== map[8]).filter(
      (i) => !exclude_indexes.includes(i)
    );
    let randomIndex = Math.floor(Math.random() * availableIndexes.length);
    let newIndex = availableIndexes[randomIndex];
    numbers[i] = numbers[newIndex];
    numbers[newIndex] = 9;
  }
}

const useKeyPad = (numbers, map = keyboardDefaultMap) => {
  const invertedMap = swapKeysAndValues(map);

  const [state, setState] = useState({
    current: undefined,
    next: undefined,
    numbers,
  });

  const onClick = (keyIndex, successCallback, failureCallback) => {
    let index = map[keyIndex];

    if (state?.next?.index === index) {
      // correct !
      successCallback && successCallback();
    } else {
      if (state.current) {
        // incorrect !
        failureCallback && failureCallback();
        return;
        // we want to keep the keypad the same
        // if they got it wrong
      }
    }

    let clicked = { index, display: state.numbers[index] }; // clicked points to another button on the pad

    // change the numbers
    let newNumbers = shuffle([...state.numbers]);

    // ensure the clicked button stays the same
    let toReplace = newNumbers[clicked.index];
    let i = newNumbers.indexOf(clicked.display);
    newNumbers[clicked.index] = clicked.display;
    newNumbers[i] = toReplace;
    replaceNumberNine(newNumbers, map, [i, clicked.index]);

    let pointedTo = { index: map[clicked.display - 1] };
    pointedTo.display = newNumbers[pointedTo.index];

    let movementValue = pointedTo.display;
    let next;

    if (invertedMap[clicked.index] + movementValue > 8) {
      next = {
        index: map[invertedMap[clicked.index] + movementValue - 9],
      };
    } else {
      next = {
        index: map[invertedMap[clicked.index] + movementValue],
      };
    }

    next.display = newNumbers[next.index];

    setState({
      ...state,
      current: clicked,
      next,
      numbers: newNumbers,
    });
  };

  return [state, onClick];
};

export default useKeyPad;
