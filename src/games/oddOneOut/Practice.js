import Box from "../../components/Box";
import GameGrid from "./GameGrid";
import Page from "./Page";
import { useContext, useState } from "react";
import Button from "../../components/Button";
import { GameContext } from "../../core/contexts";
import useDataLoader from "../../hooks/useDataLoader";
import Loading from "./Loading";
import isAnswerCorrect from "../../utilities/isAnswerCorrect";
import { AppContext } from "../../components/AppProvider";

function PracticeHintMessage({ game }) {
  const groupingsMap = {
    color: "shape color",
    shape: "shape",
    background: "background color",
    formation: "formation",
  };

  const group = game.group;

  return (
    <span>
      The answer can be found by grouping the squares by
      {group
        .map((g) => groupingsMap[g])
        .map((g, index) => (
          <span key={index}>
            <>&nbsp;</>
            <span>{g}</span>
            {index !== group.length - 1 && (
              <>
                <>&nbsp;</>
                <b>and</b>
              </>
            )}
          </span>
        ))}
    </span>
  );
}

function IncorrectAnswer({ game, tryAgain, walkthroughIndex }) {
  return (
    <Box height={"100%"}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        bg="red"
        p={2}
        borderRadius={20}
      >
        <Box as="h2" mb={4}>
          Incorrect
        </Box>
        <Box mb={6} textAlign="center">
          <PracticeHintMessage game={game} />
        </Box>
        <Box>
          <Button
            onClick={() => tryAgain(walkthroughIndex)}
            variant="primary"
            px={3}
            py={2}
          >
            Try again
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function Practice() {
  const [index, setIndex] = useState(0);
  const { init } = useContext(AppContext);
  const { dispatch } = useContext(GameContext);
  const [data] = useDataLoader(
    init.urls.get_odd_one_out_practice_game
  );

  const games = data?.games;
  const [practiceErrors, setPracticeErrors] = useState(new Set());
  const messages = [
    "The game is dead easy.  Let's look at two examples together.",
    `Below is a 3 x 3 grid.  Each square in the grid contains four things: background color, shape, shape color
    and shape formation.
    Your job is to click the square which is the odd one out.`,
    `
    Nice one!
    One last practice game to go.  This one is more difficult.
    `,
    `
    Great!
    Time to play for real.
    `,
  ];

  if (!games?.length) {
    return <Loading message="Almost there ..." />;
  }

  const tryAgain = (index) => {
    /**
     * Index is the index position in the walkthrough
     * I.e. the first slide in the walkthrough is 0
     * and is just a message shown to the user.
     *
     * Index position 1 is the first practice game
     * the user is asked to solve.
     */

    const tmp = new Set([...practiceErrors]);
    tmp.delete(index);
    setPracticeErrors(tmp);
  };

  const grids = [
    <></>,
    !practiceErrors.has(1) ? (
      <Box aspectRatio="1" height={"100%"}>
        <Box height="100%" bg="white" p={2} borderRadius={20}>
          <GameGrid
            squares={games?.[0]?.game?.squares || []}
            onClick={(index) => {
              if (
                isAnswerCorrect(
                  init.CAESAR_CIPHER_SHIFT,
                  index.toString(),
                  games?.[0]?.game?.odd_one_out_index
                )
              ) {
                setIndex(2);
              } else {
                setPracticeErrors(new Set([...practiceErrors, 1]));
              }
            }}
          />
        </Box>
      </Box>
    ) : (
      <IncorrectAnswer
        game={games?.[0]?.game}
        tryAgain={tryAgain}
        walkthroughIndex={1}
      />
    ),
    !practiceErrors.has(2) ? (
      <Box height={"100%"}>
        <Box height="100%" bg="white" p={2} borderRadius={20}>
          <GameGrid
            squares={games?.[1]?.game?.squares || []}
            onClick={(index) => {
              if (
                isAnswerCorrect(
                  init.CAESAR_CIPHER_SHIFT,
                  index.toString(),
                  games?.[1]?.game?.odd_one_out_index
                )
              ) {
                setIndex(3);
              } else {
                setPracticeErrors(new Set([...practiceErrors, 2]));
              }
            }}
          />
        </Box>
      </Box>
    ) : (
      <IncorrectAnswer
        game={games?.[1]?.game}
        tryAgain={tryAgain}
        walkthroughIndex={2}
      />
    ),
  ];

  const back = () => (index > 0 ? setIndex(index - 1) : setIndex(0));
  const next = () => setIndex(index + 1);

  return (
    <Page>
      <Box bg="white" p={4} borderRadius={20} mb={4}>
        <Box as="h1" textAlign="center" fontSize={[18, 20]}>
          Practice Mode
        </Box>
        <Box fontSize={14} my={30} textAlign="center" whiteSpace="pre-line">
          {messages[index]}
        </Box>
        <Box mt={30}>
          {index === 3 && (
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              justifyContent="center"
            >
              <Button
                onClick={() =>
                  dispatch({ type: "setView", payload: "mainMenu" })
                }
                py={2}
                px={4}
                variant="primary"
                mb={[4, 0]}
                mr={[0, 4]}
              >
                Main Menu
              </Button>
              <Button
                onClick={() => dispatch({ type: "setView", payload: "game" })}
                py={2}
                px={4}
                variant="secondary"
              >
                Play for real
              </Button>
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt={30}>
            {index > 0 && index < 3 && (
              <Button onClick={back} py={2} px={4} variant="primary">
                Back
              </Button>
            )}
            {index === 0 || (index === 3 && <Box mx={1}></Box>)}
            {index === 0 && (
              <Button onClick={next} py={2} px={4} variant="secondary">
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {grids[index]}
    </Page>
  );
}

export default Practice;