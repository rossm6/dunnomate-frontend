import Box from "./Box";
import { useNavigate } from "react-router-dom";

export default function Page({ children, bg }) {
  
  const navigate = useNavigate();

  return (
    <Box bg={bg} minHeight="100vh" display="flex" flexDirection="column">
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        maxWidth={900}
        mx="auto"
        width={1}
      >
        <Box py={6}>
          <Box
            as="h1"
            fontSize={[20, 24]}
            mr={4}
            textAlign="center"
            mx="auto"
            cursor="pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Dunnomate
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

Page.defaultProps = {
  bg: "lightGrey",
};