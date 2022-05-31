import { useContext } from "react";
import { GameContext } from "../../core/contexts";
import { theme } from "../../core/theme";
import Page from "../../components/Page";
import { AppContext } from "../../components/AppProvider";
import useBellCurve from "../../hooks/useBellCurve";
import { GAME_NAME, title, description } from "./constants";
import BaseMainMenu from "../../components/MainMenu";
import Box from "../../components/Box";


function MainMenu() {
    const { init } = useContext(AppContext);
    const { dispatch } = useContext(GameContext);
    const [, [scores, percentages]] = useBellCurve(
      init.urls.get_bell_curve,
      { game: init.games[GAME_NAME] }
    );
  
    return (
      <Page>
        <Box display="flex" justifyContent="center" alignItems="center" flex={1} px={2}>
          <BaseMainMenu
            gameName={title}
            gameDescription={description}
            chartColor={theme.colors.green}
            chartData={{
              scores: scores || [],
              percentages: percentages || [],
            }}
            practice={() => {
              dispatch({
                type: "beginPractice",
              });
            }}
            play={() => {
              dispatch({
                type: "handleMainMenuPlayButtonClick",
              });
            }}
          />
        </Box>
      </Page>
    );
  }
  
  export default MainMenu;