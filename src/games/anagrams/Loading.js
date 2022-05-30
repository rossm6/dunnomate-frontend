import Spinner from "../../components/Spinner";
import Page from "./Page";
import Box from "../../components/Box";

export default function Loading({ message }) {
  return (
    <Page>
      <Box textAlign="center">
        {message && <Box mb={4}>{message}</Box>}
        <Spinner color="white" />
      </Box>
    </Page>
  );
}