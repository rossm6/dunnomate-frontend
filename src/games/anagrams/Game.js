import { useContext, useEffect, useState } from "react";
import Box from "../../components/Box";
import { GameContext } from "../../core/contexts";
import useDataLoader from "../../hooks/useDataLoader";
import useCounter from "../../hooks/useCounter";
import useTimer from "../../hooks/useTimer";
import Page from "./Page";
import BasePage from "../../components/Page";
import { AppContext } from "../../components/AppProvider";
import Spinner from "../../components/Spinner";
import Anagram from "./Anagram";
import caesar from "../../utilities/caesarCipher";
import { theme } from "../../core/theme";

export default function Game() {
  const { init } = useContext(AppContext);
  const { dispatch } = useContext(GameContext);

  /**
   * Our interval is 10 miliseconds in this game.
   * If the user switches the tab, minimizes the browser however,
   * the interval will be more like a second.  For us it's hard
   * to see how this would really be a problem because the
   * user will be focussed on the game.  If though you want a
   * reliable interval then the solution (apparently) is to
   * use web workers - https://maxschmitt.me/posts/setinterval-settimeout-slows-down-on-tab-change/
   */

  const {  timeRemaining: countDown } = useTimer({ duration: 3 });
  const [score, decreaseScore, increaseScore] = useCounter(0);
  const [data] = useDataLoader(init.urls.get_anagrams_game);
  const [gameIndex, setGameIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [unsolvedAnagram, setUnsolvedAnagram] = useState();

  const games = data?.games;
  const game = games?.[gameIndex]?.game;

  useEffect(() => {
    if (gameOver || (games && gameIndex >= games?.length)) {
      dispatch({
        type: "gameOver",
        payload: {
          score,
          unsolvedAnagram
        },
      });
    }
  }, [dispatch, games, gameOver, gameIndex, unsolvedAnagram, score]);

  const anagram = data?.games?.[gameIndex]?.anagram;
  const cipheredSolution = data?.games?.[gameIndex]?.solution;
  const solution =
    cipheredSolution && caesar(cipheredSolution, -1 * init.CAESAR_CIPHER_SHIFT);

  const isCorrect = () => {
    increaseScore();
    setGameIndex(gameIndex + 1);
  };

  const declareGameOver = () => {
    setGameOver(true);
    setUnsolvedAnagram(solution);
  };

  if(countDown > 0){
    return (
      <BasePage bg={theme.colors.yellow}>
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

  if(countDown === 0 && !data?.games?.length){
    return (
      <BasePage bg={theme.colors.yellow}>
        <Box
          flex={1}
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          fontSize={[24, 36, 48]}
        >
          <Spinner/>
        </Box>
      </BasePage>
    );
  }

  return (
    <Page>
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