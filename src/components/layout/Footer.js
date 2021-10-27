import React from "react";
import style from "../../assets/styles/nav.module.css";
import meowLogo from "../../assets/images/logo.png";

export default function Footer({ onProps }) {
  const SOCIALS = onProps.socials;

  function FooterBrand() {
    return (
      <div className="logo-col">
        <div className="logo-moons">
          <img src={meowLogo} alt="logo meow to the moon" />
        </div>
        <div className="logo-titles text--2xl text--700">Meow to the moon</div>
      </div>
    );
  }
  function FooterSocial() {
    return (
      <div className="social-wrapper">
        <div className="social-col">
          {SOCIALS.map((social, index) => (
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
    <section className="footer-wrapper">
      <div className="footer-container">
        {FooterBrand()}
        {FooterSocial()}
      </div>
    </section>
  );
}
