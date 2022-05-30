import Box from "../../components/Box";
import Base from "../../components/Page";

export default function Page({ children }) {
  return (
    <Base bg="yellow">
      <Box
        flex={1}
        pt={[20, 30]}
        pb={[40, 60]}
        mx={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth={0}
      >
        <Box minWidth={0} width={1} maxWidth={500}>
          {children}
        </Box>
      </Box>
    </Base>
  );
}