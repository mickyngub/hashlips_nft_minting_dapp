import { Switch, Route, Redirect } from "react-router-dom";
import Mint from "./Pages/MintPage/Mint";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/mint" exact component={Mint} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
