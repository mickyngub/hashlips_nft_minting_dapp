import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import slotmachine from "./Pages/slotmachine/slotmachine";

import style from "./assets/styles/main.module.css";

const App = () => {

  return (
    <div className={style[`main-layout`]}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/slotmachine" exact component={slotmachine} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
