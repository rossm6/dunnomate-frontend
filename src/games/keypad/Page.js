import Box from "../../components/Box";
import Base from "../../components/Page";

export default function Page({ children }) {
  return (
    <Base bg="blue">
      <Box
        flex={1}
        pt={[40, 50]}
        pb={[50, 60]}
        mx={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth={0}
      >
        <Box minWidth={0} maxWidth={500} width={1}>
          {children}
        </Box>
      </Box>
    </Base>
  );
}
