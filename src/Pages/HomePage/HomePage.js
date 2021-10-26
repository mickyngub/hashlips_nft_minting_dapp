import React from "react";
import style from "../../assets/styles/index.module.css";
import Banner from "../../components/Banner";
import About from "../../components/About";
import Rarities from "../../components/Rarities";
import RoadMap from "../../components/Roadmap";
import Team from "../../components/Team";
import Faq from "../../components/Faq";

import cat1 from "../../assets/images/cat1.png";
import cat2 from "../../assets/images/cat2.png";
import cat3 from "../../assets/images/cat3.png";
import cat4 from "../../assets/images/cat4.png";
import cat5 from "../../assets/images/cat5.png";
import cat6 from "../../assets/images/cat6.png";
import duedate from "../../assets/images/duedate.png";

const HomePage = () => {
  const ComingSoon = () => {
    return (
      <section className={style[`coming-wrapper`]}>
        <img src={duedate} alt="duedate" />
        {/* <img src="/app/duedate.png" alt="duedate" style={{ width: "585px" }} /> */}
      </section>
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
      <section className="who-wrapper flex flex-col">
        <h2 style={{ marginBottom: "16px" }} className="text--5xl">
          Who are we ?
        </h2>
        <p className="text--xl text--smoke">
          We are a group of crypto-investors, where each member has their own
          speciality from their work in real life. We have seen many projects
          that promise nothing but a dream for the community. Hence, we are
          inspired to create a project where the community can truly earn the
          benefit from investing in our project.
        </p>
      </section>
    );
  };
  return (
    <>
      <Banner />
      {ComingSoon()}
      {ProductImage()}
      <About />
      <Rarities />
      <RoadMap />
      {WhoWeAre()}
      <Team />
      <Faq />
    </>
  );
};

export default HomePage;
