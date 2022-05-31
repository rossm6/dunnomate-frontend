import Card from "../../components/HomePageCard";
import BellCurve from "../../components/BellCurve";
import useBellCurve from "../../hooks/useBellCurve";
import { AppContext } from "../../components/AppProvider";
import { GAME_NAME, title, description } from "./constants";
import { useContext } from "react";
import { theme } from "../../core/theme";

export default function HomepageCard () {
    const { init } = useContext(AppContext);

    const [, [scores, percentages]] = useBellCurve(
        init.urls.get_bell_curve,
        { game: init.games[GAME_NAME] }
    );

    return (
        <Card
            title={title}
            description={description}
            Chart={
                <BellCurve
                  bg={theme.colors.blue}
                  scores={scores || []}
                  percentages={percentages || []}
                />
              }
            game={"keypad"}
        />
    );

}