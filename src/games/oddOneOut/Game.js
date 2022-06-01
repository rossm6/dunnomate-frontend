import { useContext, useEffect, useState } from "react";
import Box from "../../components/Box";
import { GameContext } from "../../core/contexts";
import useDataLoader from "../../hooks/useDataLoader";
import useCounter from "../../hooks/useCounter";
import useTimer from "../../hooks/useTimer";
import GameGrid from "./GameGrid";
import Page from "./Page";
import BasePage from "../../components/Page";
import isAnswerCorrect from "../../utilities/isAnswerCorrect";
import { AppContext } from "../../components/AppProvider";
import Spinner from "../../components/Spinner";

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
  const { timeRemaining, start } = useTimer({ automatic: false, duration: 30 });
  const [score,, increaseScore] = useCounter(0);
  const [lives, decreaseLives] = useCounter(3);
  const [data] = useDataLoader(init.urls.get_odd_one_out_game);
  const [gameIndex, setGameIndex] = useState(0);

  const games = data?.games;
  const game = games?.[gameIndex]?.game;

  useEffect(() => {
    if(countDown === 0 && game?.squares){
      start();
    }
  }, [countDown, game?.squares, start]);

  useEffect(() => {
    if (lives === 0 || timeRemaining === 0 || gameIndex > games?.length) {
      dispatch({
        type: "gameOver",
        payload: {
          score,
        },
      });
    }
  }, [dispatch, games, gameIndex, timeRemaining, lives, score]);

  const checkAnswer = (index) => {
    const CAESAR_CIPHER_SHIFT = init.CAESAR_CIPHER_SHIFT;

    if (
      isAnswerCorrect(
        CAESAR_CIPHER_SHIFT,
        index.toString(),
        game.odd_one_out_index
      )
    ) {
      increaseScore();
    } else {
      decreaseLives();
    }

    setGameIndex(gameIndex + 1);
  };

  if(countDown > 0){
    return (
      <BasePage bg="green">
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

  if(countDown === 0 && !game?.squares){
    return (
      <BasePage bg="green">
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
      <Box bg="white" p={4} mb={4} borderRadius={30} display="flex">
        <Box
          display="flex"
          justifyContent="space-between"
          width={0.5}
          bg="green"
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
            color="green"
          >
            {Math.round(timeRemaining)}s
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
      <Box aspectRatio={"1"} height={"100%"}>
        <Box height="100%" bg="white" p={2} borderRadius={20}>
          <GameGrid
            squares={game?.squares || []}
            onClick={(index) => checkAnswer(index)}
          />
        </Box> 
      </Box>
    </Page>
  );
}