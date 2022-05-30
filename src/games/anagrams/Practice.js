import { useContext, useState } from "react";
import Box from "../../components/Box";
import useDataLoader from "../../hooks/useDataLoader";
import useTimer from "../../hooks/useTimer";
import { GAME_TIME_LIMIT } from "./constants";
import Anagram from "./Anagram";
import Page from "./Page";
import TiledLetters from "../../components/Letters";
import caesar from "../../utilities/caesarCipher";
import { GameContext } from "../../core/contexts";
import Button from "../../components/Button";
import { AppContext } from "../../components/AppProvider";
import Loading from "./Loading";

export default function Practice() {
  const { init } = useContext(AppContext);
  const { dispatch } = useContext(GameContext);
  const [data] = useDataLoader(
    init.urls.get_anagrams_practice_game
  );
  const { timeRemaining: timer, start } = useTimer({
    duration: GAME_TIME_LIMIT,
    automatic: false,
  });
  const [gameIndex, setGameIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [unsolvedAnagram, setUnsolvedAnagram] = useState();

  if (!data) {
    return <Loading />;
  }

  start();

  const anagram = data?.games?.[gameIndex]?.anagram;
  const cipheredSolution = data?.games?.[gameIndex]?.solution;
  const solution =
  cipheredSolution && caesar(cipheredSolution, -1 * init.CAESAR_CIPHER_SHIFT);

  const isCorrect = () => {
      setGameOver(true);
  };

  const declareGameOver = () => {
    setGameOver(true);
    setUnsolvedAnagram(solution);
  };


  if (gameOver) {
    return (
      <Page>
        <Box bg="white" p={4} borderRadius={20} mb={4}>
          <Box as="h1" textAlign="center" fontSize={[18, 20]}>
            Practice Mode
          </Box>
          <Box fontSize={14} my={30} textAlign="center">
            {!unsolvedAnagram ? "Well done!" : "Out of time.  The answer was:"}
          </Box>
          {unsolvedAnagram && (
            <TiledLetters
              letters={
                unsolvedAnagram
                .split("")
                .map((letter) => {
                  return {
                    letter,
                  };
                })}
            />
          )}
          <Box display="flex" justifyContent="center" mt={30}>
            <Button
              onClick={() => dispatch({ type: "setView", payload: "mainMenu" })}
              py={2}
              px={4}
              variant="primary"
            >
              MainMenu
            </Button>
            <Box mx={1}></Box>
            <Button
              onClick={() => dispatch({ type: "setView", payload: "game" })}
              py={2}
              px={4}
              variant="secondary"
            >
              Play for real
            </Button>
          </Box>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <Box bg="white" p={4} borderRadius={20} mb={4}>
        <Box as="h1" textAlign="center" fontSize={[18, 20]}>
          Practice Mode
        </Box>
        <Box fontSize={14} my={30} textAlign="center" whiteSpace="pre-line">
          You've got thirty seconds to solve the anagram. Click the letters
          below to spell your solution. If you want to remove a letter from your
          attempt, click it again.
        </Box>
      </Box>
      <Anagram
        anagram={anagram}
        solution={solution}
        key={gameIndex}
        isCorrect={isCorrect}
        gameOver={declareGameOver}
      />
    </Page>
  );
}