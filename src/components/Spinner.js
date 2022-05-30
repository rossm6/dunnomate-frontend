import styled from "styled-components";
import Box from "./Box";

function Loading({ className, ...rest }) {
  return (
    <Box
      className={className}
      animation="spin 1s linear infinite"
      borderRadius={9999}
      borderWidth={4}
      display="inline-block"
      width="2rem"
      height="2rem"
      position="relative"
      borderStyle="solid"
      borderRightColor="transparent"
      {...rest}
    >
      <Box
        as="span"
        position="absolute"
        width={1}
        height={1}
        padding={0}
        margin={-1}
        overflow="hidden"
        clip="rect(0,0,0,0)"
        whiteSpace="nowrap"
        border={0}
      >
        ...Loading
      </Box>
    </Box>
  );
}

const Spinner = styled(Loading)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;