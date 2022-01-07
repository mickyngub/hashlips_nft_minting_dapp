import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      {/* <Route path="/mint" exact component={MintPage} /> */}
      {/* <Route path="/premint" exact component={PremintPage} /> */}
      {/* Vercel */}
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
