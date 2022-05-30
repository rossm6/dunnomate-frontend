import Box from "./Box";
import Button from "./Button";
import General from "./GeneralCard";
import BellCurve from "./BellCurve";

export default function MainMenu({
  gameName,
  gameDescription,
  chartColor,
  chartData,
  practice,
  play,
}) {

  return (

    <General
      Header={<Box as="h2">{gameName}</Box>}
      BodyCopy={
        <Box color="black" opacity={0.4}>
          {gameDescription}
        </Box>
      }
      Chart={
        <Box position="relative">
          <BellCurve bg={chartColor} {...chartData} />
        </Box>
      }
      Buttons={
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="center"
        >
          <Button
            variant="primary"
            bg="lightGrey"
            border={0}
            onClick={practice}
            mb={[4, 0]}
            mr={[0, 4]}
          >
            Practice
          </Button>
          <Button variant="primary" bg="lightGrey" border={0} onClick={play}>
            Play
          </Button>
        </Box>
      }
    />
  );
}