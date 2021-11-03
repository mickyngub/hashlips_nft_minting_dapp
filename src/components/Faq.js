import React from "react";
import star1 from "../assets/images/star-1.png";
import star2 from "../assets/images/star-2.png";
import star3 from "../assets/images/star-3.png";
import star4 from "../assets/images/star-4.png";

export default function Faq() {
  return (
    <section id="faqs" className="faq-wrapper">
      <h2 className="text--5xl m-auto">FAQs</h2>
      <div className="faq-body">
        <div className="faq-box">
          <h2 className="text--4xl">What exactly is Meow to the Moon ?</h2>
          <p className="text--xl text--gray">
            Meow to the Moon is a 7777 randomly generated unordinary cats
            existing on Ethereum Blockchain. We don’t promise anything that is
            impossible, but everything that is written in the roadmap will be
            done. We truly want to give benefits to our holders, giving them the
            incentive to “Hold” not just paperhand.
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">So, What’s the price ?</h2>
          <p className="text--xl text--gray">
            The price of the Meows will be 0.0777 ETH/meow.
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">
            Will there be a pre-sale or whitelist for Meow V2?
          </h2>
          <p className="text--xl text--gray">
            Yes, there will be a whitelist for the Meow V2 collection. Firstly,
            the Meow Genesis holder will automatically receive the whitelist
            quota. As for newcomers, the whitelist will be determined by the
            activeness in our discord till our snapshot time.
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">
            Why should I invest in Meow to the Moon ?
          </h2>
          <p className="text--xl text--gray">
            Firstly, the artwork is cute. Secondly, with the royalties program
            and continuous giveaway activities, the project is driven to benefit
            the community. Most importantly, this project is community-driven;
            the holders will have the right to decide the course of the project
            that will lead to the Season 2. Ultimately, we will MOON together.
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">What’s the aim of this project ?</h2>
          <p className="text--xl text--gray">
            The founders have been an investor in Crypto world for over three
            years. There were ups and downs due to high volatility of the
            market. Hence, we want to create the project where holders can
            receive a continuous benefit, ensuring that the holder can feel like
            “ I will definitely make more than what I pay for minting.”
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">Gas Price high AF!</h2>
          <p className="text--xl text--gray">
            We have learnt from our initial plan of MTTM project. From our
            mistake and learning, we will decide along with our community with
            the best way possible to ensure that the pain of gas can be
            minimized.
          </p>
        </div>

        <div className="faq-box">
          <h2 className="text--4xl">When is the launched for Meow V2?</h2>
          <p className="text--xl text--gray">
            Genesis Meow is sold out. The date for pre-sale and public sale for
            Meow V2 is to be announced
          </p>
        </div>
        <div className="faq-box">
          <h2 className="text--4xl">
            How will the royalties feel of Meow V2 be distributed?
          </h2>
          <p className="text--xl text--gray">
            The royalty fee from the Meow V2 secondary marketplace will be
            distributed accordingly, 30% for marketing, 30% to the DAO wallet,
            20% to sweep the floor, 10% to charity upon community selection, and
            10% for hiring new members
          </p>
        </div>
      </div>
      <img src={star1} className="star-1" alt="image-star-1" />
      <img src={star2} className="star-2" alt="image-star-2" />
      <img src={star3} className="star-3" alt="image-star-3" />
      <img src={star4} className="star-4" alt="image-star-4" />
    </section>
  );
}
