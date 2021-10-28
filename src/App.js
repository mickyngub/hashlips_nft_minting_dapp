import { Switch, Route, Redirect } from "react-router-dom";
import MintPage from "./Pages/MintPage/MintPage";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/mint" exact component={MintPage} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
