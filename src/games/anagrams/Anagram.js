import { useEffect, useState } from "react";
import Box from "../../components/Box";
import GeneralCard from "../../components/GeneralCard";
import TiledLetters, {
  SELECTED_TILE_COLOR,
  UNSELECTED_TILE_COLOR,
} from "../../components/Letters";
import useTimer from "../../hooks/useTimer";
import { GAME_NAME, GAME_TIME_LIMIT } from "./constants";

export default function Anagram({ anagram, isCorrect, gameOver, solution }) {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const { timeRemaining: timer } = useTimer({
    duration: GAME_TIME_LIMIT,
  });

  useEffect(() => {
    if (
      solution === selectedLetters.map((letterObj) => letterObj.letter).join("")
    ) {
      isCorrect();
    } else if (timer === 0) {
      gameOver();
    }
  }, [gameOver, isCorrect, timer, solution, selectedLetters]);

  const anagramLetters = anagram?.split("");

  const anagramLetterObjs = anagramLetters.map((letter, index) => {
    const positionIndex = selectedLetters
      .map((letterObject) => letterObject.index)
      .indexOf(index);

    return {
      letter,
      bg: positionIndex !== -1 ? SELECTED_TILE_COLOR : UNSELECTED_TILE_COLOR,
      onClick: () => {
        if (positionIndex !== -1) {
          // letter has already been selected
          // so remove
          const tmp = [...selectedLetters];
          tmp.splice(positionIndex, 1);
          setSelectedLetters(tmp);
        } else {
          // not yet selected, so add
          setSelectedLetters([
            ...selectedLetters,
            {
              letter,
              index,
            },
          ]);
        }
      },
    };
  });

  const attempt = selectedLetters.map((letterObj, positionIndex) => {
    return {
      letter: letterObj.letter,
      onClick: () => {
        const tmp = [...selectedLetters];
        tmp.splice(positionIndex, 1);
        setSelectedLetters(tmp);
      },
    };
  });

  return (
    <GeneralCard
      bg="haze"
      Header={<Box as="h2">Anagrams</Box>}
      Chart={
        <Box>
          <Box bg="white" p={4} mb={4} borderRadius={30}>
            <Box display="flex" bg="orange" borderRadius={50} p={"1px"}>
              <Box
                bg="white"
                borderRadius={50}
                fontSize={14}
                height={50}
                width={0.5}
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="orange"
              >
                {timer}s
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={0.5}
                color="white"
              >
                <Box as="span">Time</Box>
              </Box>
            </Box>
          </Box>
          <Box 
            bg="white" 
            borderRadius={30} 
            display="flex" 
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight={300} 
            p={4}
          >
            <TiledLetters letters={anagramLetterObjs} mb="auto" />
            <TiledLetters letters={attempt} />
          </Box>
        </Box>
      }
    />
  );
}