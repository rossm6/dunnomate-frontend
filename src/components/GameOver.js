import percentile from "../utilities/percentile";
import Box from "./Box";
import Button from "./Button";
import GeneralCard from "./GeneralCard";
import BellCurve from "./BellCurve";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function GameOver({
  children,
  playAgain,
  yourScore,
  yourPercentile,
  chartColor,
  chartData,
  url,
  shareMessage,
}) {
  return (
    <GeneralCard
      Header={
        <>
          <Box as="h1">Game over</Box>
          {children}
        </>
      }
      BodyCopy={
        <>
          <Box
            as="h2"
            color="black"
            fontSize={[14, 15]}
            textAlign="center"
            mb={4}
          >
            You scored: {yourScore}
          </Box>
          <Box color="black" fontSize={[10, 12]} textAlign="center" my={4}>
            Percentile: {percentile(yourPercentile)}
          </Box>
        </>
      }
      Chart={<BellCurve bg={chartColor} {...chartData} />}
      Buttons={
        <>
          <Box display="flex" justifyContent="center">
            <Button
              variant="primary"
              bg="lightGrey"
              border={0}
              mr={2}
              onClick={playAgain}
            >
              Play again
            </Button>
          </Box>
          <Box fontSize={12} mt={40}>
            <Box display="flex" justifyContent="center">
              <FacebookShareButton url={url} quote={shareMessage}>
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton url={url} title={shareMessage}>
                <TwitterIcon />
              </TwitterShareButton>
            </Box>
          </Box>
        </>
      }
    />
  );
}