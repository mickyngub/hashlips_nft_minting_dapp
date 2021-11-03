import React from "react";
import style from "../assets/styles/about.module.css";
import bannerPic from "../assets/images/image_banner.png";
import productPic from "../assets/images/image_product.png";
import aboutPic from "../assets/images/image_about.png";

export default function About() {
  const IMAGE = {
    root: productPic,
    about: aboutPic,
    banner: bannerPic,
  };
  return (
    <section id="about" className={style[`about-wrapper`]}>
      <div className={style[`about-image`]}>
        <img src={IMAGE.about} />
      </div>
      <div className={style[`about-text`]}>
        <h2 className="text--5xl">About</h2>
        <p className="text--xl text--gray">
          Meow to the Moon is a 7777 randomly generated unordinary cats existing
          on Ethereum Blockchain. We don’t promise anything that is impossible,
          but everything that is written in the roadmap will be done. We truly
          want to give benefits to our holders, giving them the incentive to
          “Hold” not just paperhand.
        </p>
      </div>
    </section>
  );
}
