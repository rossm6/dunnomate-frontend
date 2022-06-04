import Star from "../../components/Star";
import Square from "../../components/Square";
import Circle from "../../components/Circle";
import Box from "../../components/Box";

function GridSquare({ background, shape, color, formation, onClick }) {
  let ShapeComponent;

  if (shape === "circle") {
    ShapeComponent = Circle;
  } else if (shape === "square") {
    ShapeComponent = Square;
  } else if (shape === "star") {
    ShapeComponent = Star;
  }

  return (
    <Box
      bg={background}
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      borderRadius={30}
      p={2}
      borderColor="haze"
      borderStyle="solid"
      cursor="pointer"
      onClick={onClick}
      maxWidth="100%"
      maxHeight="100%"
    >
      {formation.split("").map((el, index) =>
        el === "0" ? (
          <Box key={index}></Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            key={index}
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
          >
            <ShapeComponent fill={color} style={{ height: "calc(100% - 2px)", width: "calc(100% - 2px)" }} />
          </Box>
        )
      )}
    </Box>
  );
}

GridSquare.defaultProps = {
  color: "black",
  formation: "000010000",
};

export default GridSquare;
