import { Switch, Route, Redirect } from "react-router-dom";
import Mint from "./Mint";
import WrapperHomePage from "./Pages/HomePage/WrapperHomePage";
const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={WrapperHomePage} />
      <Route path="/mint" exact component={Mint} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
