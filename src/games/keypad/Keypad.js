import styled from "styled-components";
import Box from "../../components/Box";

export const KeypadButton = styled(Box)``;

KeypadButton.defaultProps = {
    as: "button",
    height: 50,
    width: 50,
    bg: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    p: 0,
    boxShadow: "0 4px #999"
};


export default function Keypad ({ children: keys, ...rest }) {

    console.log(keys);

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            {...rest}
        >
            <Box
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                gridGap={4}
            >
                {keys}
            </Box>
        </Box>
    );    

}