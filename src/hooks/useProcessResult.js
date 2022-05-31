import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppProvider";
import mutate from "../utilities/mutate";

const useProcessResult = (dispatch, record_game_url, gameID, processResult) => {

  const { init } = useContext(AppContext);

  useEffect(() => {
    if (processResult) {
      mutate(
        record_game_url, 
        { ...processResult, game: gameID }, 
        {
          headers: {
            "X-CSRFToken": init.csrftoken 
          } 
        }
      ).then(
        ({ bellCurve }) => {
          dispatch({
            type: "showResults",
            payload: {
              ...bellCurve,
            },
          });
        }
      );
    }
  }, [dispatch, gameID, processResult, record_game_url, init.csrftoken]);
};

export default useProcessResult;