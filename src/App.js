import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AppProvider from "./components/AppProvider";

import Box from "./components/Box";
import Page from "./components/Page";
import KeypadCard from "./games/keypad/HomepageCard";
import Keypad from "./games/keypad";
import OddOneOutCard from "./games/oddOneOut/HomepageCard";
import OddOneOut from "./games/oddOneOut";
import AnagramsCard from "./games/anagrams/HomePageCard";
import Anagrams from "./games/anagrams";
import StandardCard from "./components/StandardCard";

function Home () {

  return (
    <Page>
      <Box pt={[20, 30]} pb={[40, 60]}>
        <Box
          display="grid"
          gridGap={30}
          gridTemplateColumns={["1fr", "1fr 1fr"]}
          mx={4}
        >
          <OddOneOutCard/>
          <KeypadCard/>
          <AnagramsCard/>
          <StandardCard justifyContent="center">
            <Box as="h2" color="slate">
              Coming soon
            </Box>
          </StandardCard>
        </Box>
      </Box>
    </Page>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/games/odd-one-out" element={<OddOneOut/>} />
          <Route path="/games/anagrams" element={<Anagrams/>} />
          <Route path="/games/keypad" element={<Keypad/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
