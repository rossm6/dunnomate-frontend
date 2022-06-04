import Box from "./Box";

export const SELECTED_TILE_COLOR = "anagramTileOrange";
export const UNSELECTED_TILE_COLOR = "antiquewhite";

export function LetterTile({ bg, children, onClick }) {
  return (
    <Box
      cursor="pointer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={50}
      width={50}
      onClick={onClick}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg={bg}
        borderRadius={5}
        height={40}
        width={40}
        flexShrink={1}
      >
        {children}
      </Box>
    </Box>
  );
}

LetterTile.defaultProps = {
  bg: UNSELECTED_TILE_COLOR,
};

export default function TiledLetters({ letters, mb }) {
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" mb={mb}>
      {letters.map((letter, index) => (
        <LetterTile bg={letter.bg} onClick={letter.onClick} key={index}>
          {letter.letter}
        </LetterTile>
      ))}
    </Box>
  );
}
