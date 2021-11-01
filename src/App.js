import { Switch, Route, Redirect } from "react-router-dom";
// import MintPage from "./Pages/MintPage/MintPage";
import HomePage from "./Pages/HomePage/HomePage";
import PremintPage from "./Pages/PremintPage/PremintPage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      {/* <Route path="/mint" exact component={MintPage} /> */}
      <Route path="/premint" exact component={PremintPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
