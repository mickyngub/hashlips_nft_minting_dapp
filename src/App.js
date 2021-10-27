import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Slotmachine from "./Pages/slotmachine/slotmachine";

import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import style from "./assets/styles/main.module.css";

import discord from "./assets/images/discord.png";
import twitter from "./assets/images/twitter.png";
const App = () => {
  const onProps = {
    socials: [
      //   {
      //     id: 1,
      //     image: useImage('/medium.png'),
      //     url: 'https://discord.gg/gEnvhUGh58',
      //     text: 'meow to the moon medium',
      //   },
      {
        id: 2,
        image: discord,
        url: "https://discord.gg/gEnvhUGh58",
        text: "meow to the moon discord",
      },
      {
        id: 3,
        image: twitter,
        url: "https://twitter.com/Meow2themoonNFT",
        text: "meow to the moon twitter",
      },
    ],
  };
  return (
    <div className={style[`main-layout`]}>
      <Nav onProps={onProps} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/slotmachine" exact component={Slotmachine} />
        <Redirect to="/" />
      </Switch>
      <Footer onProps={onProps} />
    </div>
  );
};

export default App;
