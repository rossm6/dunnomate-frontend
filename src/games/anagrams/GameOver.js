import { useContext } from "react";
import { GameContext } from "../../core/contexts";
import Page from "./Page";
import { theme } from "../../core/theme";
import GameOverComponent from "../../components/GameOver";
import TiledLetters from "../../components/Letters";
import Box from "../../components/Box";

export default function GameOver() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <Page>
      <GameOverComponent
        playAgain={() => {
          dispatch({
            type: "handleMainMenuPlayButtonClick",
          });
        }}
        yourScore={state.result?.you?.score}
        yourPercentile={state.result?.you?.percentile}
        chartColor={theme.colors.yellow}
        chartData={state.result?.chart}
        url="https://www.dunnomate.com/games/anagrams"
        shareMessage={`Dunnomate, I only scored ${state.result?.you?.score}`}
      >
        {state.unsolvedAnagram && (
          <Box mt={6} mb={4}>
            <Box>The answer was ...</Box>
            <TiledLetters
              letters={state.unsolvedAnagram.split("").map((letter) => {
                return {
                  letter,
                };
              })}
            />
          </Box>
        )}
      </GameOverComponent>
    </Page>
  );
}
