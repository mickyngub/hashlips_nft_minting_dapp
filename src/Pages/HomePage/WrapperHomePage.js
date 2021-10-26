import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import style from "../../assets/styles/main.module.css";

import discord from "../../assets/images/discord.png";
import twitter from "../../assets/images/twitter.png";
import HomePage from "./HomePage";

function WrapperHomePage({ Component, pageProps }) {
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
    nextRedirect: ({ target }) => {
      const url = target.getAttribute("url");
      console.log("nextRedirect =>", url);
      window.open(url, "_blank").focus();
    },
  };

  return (
    <div>
      <div className={style[`main-layout`]}>
        <Nav onProps={onProps} />
        <HomePage />
        <Footer onProps={onProps} />
      </div>
    </div>
  );
}

export default WrapperHomePage;
