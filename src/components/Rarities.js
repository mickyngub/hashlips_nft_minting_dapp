import React from "react";
import style from "../assets/styles/rarities.module.css";
import cat1 from "../assets/images/cat1.png";
import cat2 from "../assets/images/cat2.png";
import cat3 from "../assets/images/cat3.png";
import cat4 from "../assets/images/cat4.png";

export default function Rarities() {
  return (
    <section id="rarities" className={style[`poperties-wrapper`]}>
      <div className={style[`poperties-text`]}>
        <h2 className="text--5xl">Rarities &amp; Traits</h2>
        <p className="text--xl text--gray">
          This is the 1st generation of meow metaverse which has over 450k
          possible combinations from the following trait options
        </p>
        <ul>
          <li className="text--xl text--700">Body</li>
          <li className="text--xl text--700">Face</li>
          <li className="text--xl text--700">Helmet</li>
          <li className="text--xl text--700">Cloth</li>
          <li className="text--xl text--700">Accessory</li>
          <li className="text--xl text--700">Background</li>
        </ul>
      </div>
      <div className={style[`poperties-image`]}>
        <img className={style.img} src={cat1} />
        <img className={style.img} src={cat2} />
        <img className={style.img} src={cat3} />
        <img className={style.img} src={cat4} />
      </div>
    </section>
  );
}
