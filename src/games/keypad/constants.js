import swapKeysAndValues from "../../utilities/swapKeysAndValues";
import { keyboardDefaultMap } from "./useKeypad";
export const indexToNumberPressed = swapKeysAndValues(keyboardDefaultMap);

export const GAME_NAME = "keypad";
export const title = "Keypad";
export const description = "Continue the sequence";
export const BLUE = "blue";
export const GREEN = "#b5e352";
export const GREY = "#91949b";
export const COUNTDOWN_TO_GAME = 3;
export const GAME_TIME_LIMIT = 30;
export const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const LIVES = 3;
