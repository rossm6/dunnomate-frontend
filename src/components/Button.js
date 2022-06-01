import styled from 'styled-components'
import { space, layout, color, variant, border } from 'styled-system'

const common = {
    borderRadius: 44,
    borderColor: "carbon",
    borderWidth: 1,
    borderStyle: "solid",
    px: 6,
    py: 3
};

const Button = styled('button')(
    {
        appearance: 'button',
        fontFamily: 'inherit',
        padding: "10px 20px",
        fontSize: 14,
        borderRadius: 5,
        transitionDuration: "0.15s",
        transitionProperty: "background-color, border-color, color, fill, stroke",
        border: 0,
        cursor: "pointer",
        fontWeight: "bold",
        letterSpacing: "1px",
    },
    variant({
        variants: {
            primary: {
                ...common,
                color: "dark",
                bg: "white",
                "&:hover": {
                    backgroundColor: "haze",
                },
            },
            secondary: {
                ...common,
                color: "white",
                bg: "black",
                "&:hover": {
                    opacity: 0.5
                },
            },
            grey: {
                ...common,
                color: "dark",
                bg: "lightGrey",
            }
        }
    }),
    border,
    color,
    layout,
    space
);

export default Button;