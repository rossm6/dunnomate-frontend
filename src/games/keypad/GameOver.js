import { useContext } from "react";
import { GameContext } from "../../core/contexts";
import Page from "./Page";
import { theme } from "../../core/theme";
import GameOverComponent from "../../components/GameOver";

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
        chartColor={theme.colors.blue}
        chartData={state.result?.chart}
        url="https://www.dunnomate.com/games/keypad"
        shareMessage="Example keypad share message"
      />
    </Page>
  );
}