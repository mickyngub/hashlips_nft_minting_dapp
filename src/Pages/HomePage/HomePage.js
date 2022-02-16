import React from "react";
import Countdown from "react-countdown";

import style from "../../assets/styles/index.module.css";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Rarities from "../../components/Rarities";
import RoadMap from "../../components/Roadmap";
import Team from "../../components/Team";
import Faq from "../../components/Faq";

import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import styleMain from "../../assets/styles/main.module.css";

import discord from "../../assets/images/discord.png";
import twitter from "../../assets/images/twitter.png";
import opensea from "../../assets/images/opensea.png";

import cat1 from "../../assets/images/cat1.png";
import cat2 from "../../assets/images/cat2.png";
import cat3 from "../../assets/images/cat3.png";
import cat4 from "../../assets/images/cat4.png";
import cat5 from "../../assets/images/cat5.png";
import cat6 from "../../assets/images/cat6.png";
import duedate from "../../assets/images/duedate.png";
import genesisVSmeowv2pic from "../../assets/images/genesisVSmeowv2.jpg";

const HomePage = () => {
  const onProps = {
    socials: [
      //   {
      //     id: 1,
      //     image: useImage('/medium.png'),
      //     url: 'https://discord.gg/gEnvhUGh58',
      //     text: 'meow to the moon medium',
      //   },
      {
        id: 1,
        image: discord,
        url: "https://discord.gg/meowniverse",
        text: "meow to the moon discord",
      },
      {
        id: 2,
        image: twitter,
        url: "https://twitter.com/MeowniverseNFT",
        text: "meow to the moon twitter",
      },
      {
        id: 3,
        image: opensea,
        url: "https://opensea.io/collection/meowtothemoon",
        text: "meow to the moon opensea",
      },
    ],
  };
  const GenesisVSmeowv2 = () => (
    <div>
      <img
        className={style.genesisVSmeowv2}
        src={genesisVSmeowv2pic}
        alt="genesisMeowAndmeowV2"
      ></img>
    </div>
  );

  const ComingSoon = () => {
    const Completionist = () => (
      <>
        <div>
          <h2 className={style.countdown}>
            Check the link in Discord announcement!
          </h2>
        </div>
        <div>
          <a
            href="https://Discord.gg/meowtothemoon"
            target="_blank"
            rel="noopener noreferrer"
            className={style.countdown}
          >
            Discord.gg/meowtothemoon
          </a>
        </div>
      </>
    );
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return (
          <h2 style={{ whiteSpace: "pre-line" }} className={style.countdown}>
            Pre Sale - {days * 24 + hours} Hours {minutes} Minutes {seconds}{" "}
            Seconds
          </h2>
        );
      }
    };
    return (
      <>
        <section className={style[`coming-wrapper`]}>
          <img src={duedate} alt="duedate" />
          {/* <img src="/app/duedate.png" alt="duedate" style={{ width: "585px" }} /> */}
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",

            height: "18vh",
          }}
        >
          <>
            <Countdown
              date={Date.UTC(2021, 10, 1, 12, 0, 0)}
              renderer={renderer}
            />
          </>
        </div>
      </>
      //   <section className={style[`coming-wrapper`]}>
      //     <h2 className="text--5xl">Coming soon</h2>
      //   </section>
    );
  };
  const ProductImage = () => {
    return (
      <section className={style[`product-wrapper`]}>
        <div className="mobile--none ipad--none">
          <img src={cat1} className="w-full" />
        </div>
        <div className="mobile--none ipad--none">
          <img src={cat2} className="w-full" />
        </div>
        <div>
          <img src={cat3} className="w-full" />
        </div>
        <div>
          <img src={cat4} className="w-full" />
        </div>
        <div>
          <img src={cat5} className="w-full" />
        </div>
        <div>
          <img src={cat6} className="w-full" />
        </div>
      </section>
    );
  };
  const WhoWeAre = () => {
    return (
      <>
        <section className="who-wrapper flex flex-col">
          <h2 style={{ marginBottom: "16px" }} className="text--5xl">
            Who are we ?
          </h2>
          <p className="text--xl text--gray">
            We are a group of crypto-investors, where each member has their own
            speciality from their work in real life. We have seen many projects
            that promise nothing but a dream for the community. Hence, we are
            inspired to create a project where the community can truly earn the
            benefit from investing in our project.
          </p>
        </section>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 id="team" className="text--5xl m-auto">
            Meow Team
          </h2>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={styleMain[`main-layout`]}>
        <Nav onProps={onProps} />
        <Banner />
        <GenesisVSmeowv2 />
        <ProductImage />
        <About />
        <Rarities />
        <RoadMap />
        <WhoWeAre />
        <Team />
        <Faq />
        <Footer onProps={onProps} />
      </div>
    </>
  );
};

export default HomePage;
