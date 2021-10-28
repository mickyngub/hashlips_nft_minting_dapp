import React from "react";
import style from "../../assets/styles/nav.module.css";

import meowLogo from "../../assets/images/logo.png";

export default function Nav({ onProps, transparentBg }) {
  const SOCIALS = onProps ? onProps.socials : "";
  function NavBrand() {
    return (
      <div className={style[`logo-col`]}>
        <div className={style[`logo-moons`]}>
          <img src={meowLogo} alt="logo meow to the moon" />
        </div>
        <div className="logo-titles text--2xl text--700">Meow to the moon</div>
      </div>
    );
  }
  function NavMenu() {
    return (
      <ul className={style[`menu-col`]}>
        <li className="text--lg text--700 text--black">
          <a href="#about">About</a>
        </li>
        <li className="text--lg text--700">
          <a href="#rarities">Rarities</a>
        </li>
        <li className="text--lg text--700">
          <a href="#roadMap">Roadmap</a>
        </li>
        <li className="text--lg text--700">
          <a href="#team">Team</a>
        </li>
        <li className="text--lg text--700">
          <a href="#faqs">FAQs</a>
        </li>
      </ul>
    );
  }
  function NavSocial() {
    return (
      <div className={style[`social-wrapper`]}>
        <div className={style[`social-col`]}>
          {SOCIALS &&
            SOCIALS.map((social, index) => (
              <a href={social.url} target="_blank" rel="nopener noreferrer">
                <img
                  src={social.image}
                  alt={social.text}
                  key={`social.id-${index}`}
                  onClick={onProps.nextRedirect}
                  url={social.url}
                />
              </a>
            ))}
        </div>
      </div>
    );
  }

  return (
    <section
      className={
        transparentBg
          ? style[`nav-container-transparent`]
          : style[`nav-container`]
      }
    >
      <nav className={style[`nav-wrapper`]}>
        {NavBrand()}
        {SOCIALS ? NavMenu() : ""}
        {SOCIALS ? NavSocial() : ""}
      </nav>
    </section>
  );
}
