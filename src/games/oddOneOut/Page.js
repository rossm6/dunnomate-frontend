import Box from "../../components/Box";
import Base from "../../components/Page";

export default function Page({ children }) {
  return (
    <Base bg="green">
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
        <Box aspectRatio={"1"} minWidth={0} maxWidth={350} width={1}>
          {children}
        </Box>
      </Box>
    </Base>
  );
}