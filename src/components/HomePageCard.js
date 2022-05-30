import Box from "./Box";
import Button from "./Button";
import GeneralCard from "./GeneralCard";
import { useNavigate } from "react-router-dom";
import URLS from "../core/urls";

export default function Card ({ 
    title, 
    description, 
    Chart,
    game
}) {
    let navigate = useNavigate();

    let href = URLS[`games:${game}`];

    return (
        <GeneralCard
            Header={
                <Box as="h2">{title}</Box>
            }
            BodyCopy={
                <>
                    <Box color="black" opacity={0.4}>
                        {description}
                    </Box>
                </>
            }
            Chart={Chart}
            Buttons={
                <Button
                    onClick={() => navigate(href)}
                    variant="primary" 
                    bg="lightGrey" 
                    border={0}
                >
                    Play
                </Button>
            }
        />
    );

}