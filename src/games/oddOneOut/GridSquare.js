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
            p={"1px"}
          >
            <ShapeComponent fill={color} />
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