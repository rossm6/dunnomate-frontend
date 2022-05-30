import MainMenu from "./MainMenu";
import DEFAULT_GAME_ACTIONS from "../../core/actions";
import reducerFactory from "../../utilities/reducerFactory";
import { GameContext } from "../../core/contexts";
import { useContext, useReducer } from "react";
import { GAME_NAME } from "./constants";
import Practice from "./Practice";
import Game from "./Game";
import useProcessResult from "../../hooks/useProcessResult";
import Loading from "./Loading";
import GameOver from "./GameOver";
import { AppContext } from "../../components/AppProvider";

const initialState = {
  view: "mainMenu",
};

const actions = {
  ...DEFAULT_GAME_ACTIONS,
  gameOver: (state, payload) => {
    return {
      ...state,
      view: "loading",
      processResult: {
        ...payload,
      },
    };
  },
  showResults: (state, payload) => {
    return {
      ...state,
      view: "gameOver",
      result: {
        you: payload?.you,
        chart: {
          scores: payload.points.map((point) => +point.score),
          percentages: payload.points.map((point) => +point.percentage),
        },
      },
    };
  },
  playAgain: () => {
    return {
      ...initialState,
    };
  },
};

const reducer = reducerFactory(actions);

function Index() {
  const { init } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useProcessResult(
    dispatch,
    init.urls.record_game,
    init.games[GAME_NAME],
    state.processResult
  );
  
  return (
    <GameContext.Provider
      value={{
        dispatch,
        state,
      }}
    >
      {state.view === "mainMenu" && <MainMenu />}
      {state.view === "practiceMode" && <Practice />}
      {state.view === "game" && <Game />}
      {state.view === "loading" && <Loading message="Almost there ..." />}
      {state.view === "gameOver" && <GameOver />}
    </GameContext.Provider>
  );
}

export default Index;
