import Box from "./Box";

export default function StandardCard({ children, ...rest }) {
  return <Box {...rest}>{children}</Box>;
}

StandardCard.defaultProps = {
  bg: "white",
  borderRadius: 30,
  display: "flex",
  flexDirection: "column",
  p: 6,
  textAlign: "center",
  minWidth: 0,
};