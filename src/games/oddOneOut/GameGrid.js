import Box from "../../components/Box";
import styled from "styled-components";
import GridSquare from "./GridSquare";
import Tile from "./Tile";

const GameDimensions = styled(Box)`
  height: 100%;
  .insuffientSpaceForGrid {
    display: none;
  }
  @media screen and (max-width: 300px) {
    display: flex;
    justify-content: center;
    align-items: center;
    .grid {
      display: none;
    }
    .insuffientSpaceForGrid {
      display: block;
    }
  }
  @media screen and (max-height: 450px) {
    .grid {
      display: none;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    .insuffientSpaceForGrid {
      display: block;
    }
  }
`;

export default function GameGrid({ squares, onClick }) {

  return (
    <GameDimensions>
      <Box
        className="grid"
        height={1}
        display="grid"
        gridGap={2}
        gridTemplateColumns={"1fr 1fr 1fr"}
      >
        {
          squares.map((square, index) => (
            <Box
              borderColor="haze"
              borderStyle="solid"
              borderWidth={1}
              borderRadius={5}
              cursor="pointer"
              display="flex"
              key={index}
              onClick={() => onClick(index)}
            >
              <Tile {...square} />
            </Box>
          ))
        }
      </Box>
      <Box className="insuffientSpaceForGrid" textAlign="center">
        Insuffient space to play the game.
      </Box>
    </GameDimensions>
  );
}
