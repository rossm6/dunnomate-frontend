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
      aspectRatio="1"
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
          <Box aspectRatio="1" key={index}></Box>
        ) : (
          <Box
            aspectRatio="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            key={index}
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
          >
            <ShapeComponent fill={color} style={{ height: "100%", width: "100%" }} />
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