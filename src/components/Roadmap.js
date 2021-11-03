import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export default function RoadMap() {
  function classList(classes) {
    return Object.entries(classes)
      .filter((entry) => entry[1])
      .map((entry) => entry[0])
      .join(" ");
  }
  function RoadMapDesktop() {
    return (
      <ul className="timeline-body mobile--none">
        {ITEMS.map((item, index) => (
          <li
            key={index}
            className={classList({
              "timeline-item": true,
              active: item.is_active,
            })}
          >
            <h3 style={{ color: "white" }} className="text--xl text--700">
              {item.title}
            </h3>
            <p style={{ color: "#AEB6C5" }} className="text--xl desc pre-white">
              {ReactHtmlParser(item.text)}
            </p>

            <div className="timeline-item-number">
              <p className="text--sm text--700">Episode</p>
              <p className="text--body text--700">{item.position}</p>
            </div>
            <div className="timeline-item-title">
              <h2 className="text--5xl">{item.header.title}</h2>
              <p className="text--2xl">{item.header.text}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  function RoadMapMobile(items) {
    return ITEMS.map((item, index) => (
      <div
        key={index}
        className={classList({
          "roadMap-sm": true,
          "desktop--none": true,
          "ipad--none": true,
          active: item.is_active,
        })}
      >
        <div className="roadMap-session">
          <h2 className="text--4xl text--primary">{item.header.title}</h2>
          <p className="text--xl text--700 text--primary text--left pre-white">
            {item.header.text}
          </p>
        </div>
        <div className="roadMap-sm-title">
          <div className="timeline-item-number">
            <p className="text--sm text--700">Episode</p>
            <p className="text--body text--700">{item.position}</p>
          </div>
          <p style={{ color: "white" }} className="roadMap-sm-title-text">
            {item.title}
          </p>
        </div>
        <p style={{ color: "#AEB6C5" }} className="text--xl desc text--left ">
          {item.text}
        </p>
      </div>
    ));
  }
  return (
    <section id="roadMap" className="roadMap-overview">
      <div className="roadMap-wrapper">
        <h2 style={{ color: "white" }} className="text--5xl">
          Roadmap
        </h2>
        <div className="timeline-wrapper">
          {RoadMapDesktop()}
          {RoadMapMobile()}
        </div>
      </div>
    </section>
  );
}

const ITEMS = [
  {
    id: 1,
    header: {
      title: "Season 0",
      text: "The fall and emergence of The Meow Genesis",
    },
    title: "Prologue",
    text: "The gas blackhole has damaged the spaceship; only 187 meows survived from the incident. These survivors are regarded as <b class='redText'> “The Meow Genesis”. </b>",
    position: "0",
    is_active: true,
  },
  {
    id: 2,
    header: {
      title: "Season 1",
      text: "The New Beginning",
    },
    title: "The Awakening of Genesis",
    text: "Brace for the impact, a huge wave is coming. The 187 uniquely 1/1 created Meow will be revealed; the new era of NFT is here.",
    position: "1",
    is_active: true,
  },
  {
    id: 3,
    header: {
      title: "",
      text: "",
    },
    title: "The Attention",
    text: "The world is panicking from the “Gas blackhole Incident”, living in fear and anxiety. The team will focus hugely on marketing through influencers, social media, and bring the mass attention to ramp up Meow to the Moon into space.",
    position: "2",
    is_active: false,
  },
  {
    id: 4,
    header: {
      title: "",
      text: "",
    },
    title: "The Genesis’s Right",
    text: "Two days Before the pre-sale of Meow V2, <b class='redText'>The Meow Genesis holder will be able to free mint 2 Meows V2 for every Meow Genesis they hold.</b>",
    position: "3",
    is_active: false,
  },
  {
    id: 5,
    header: {
      title: "Season 2",
      text: "The V2 Era",
    },
    title: "The Meow V2 Recruitment (Date: TBA)",
    text: `The meow army wants to recruit marvelous soldiers to join the spaceship. The new Meow V2 collection will be launched.
    
    <b class='redText'>- The Meow Genesis Holder will automatically receive the Whitelist in the Meow V2 Collection</b>
    `,
    position: "1",
    is_active: true,
  },
  {
    id: 6,
    header: {
      title: "",
      text: "",
    },
    title: "The 777 Meow Machine (At Meow V2 25% Sold)",
    text: `Meow V2 holders will receive a raffle for every meow V2 they own <b class='redText'> + Meow Genesis holders will receive an addition of 1 raffle </b> for every two weeks to participate in the 777 Meow machine.
    
    The 777 Meow machine is the slot machine where the player will be <b>guaranteed a reward</b>, with the fund of the slot machine will be <b>10% of our Meow V2 minting revenue</b>

    `,
    position: "2",
    is_active: false,
  },
  {
    id: 7,
    header: {
      title: "",
      text: "",
    },
    title: "The Treasure Cavemoon (At Meow V2 50% Sold)",
    text: `The Meow Genesis and Meow V2 holders will be able to <b>stake Meow NFT</b> to receive the <b>$Meow Token</b> which can be used in Meow’s cave, an exclusive reward center.

    <b class='redText'>The Genesis Meow Collection will have x1.5 multiplier to the earning of $Meow Token</b>.

    <b>Reward</b> -
    <b>[DAO’s Selection]</b>: Anything purchased by the Dao’s wallet
    <b>[Fast-pass comic ticket]</b>: One-week fast pass 
    <b>[The Secret Ticket]</b>: The pass to the <b>Secret Collection</b>...
    <b class='redText'>[Genesis’s exclusive merchandise]: Only for Meow Genesis holder for free</b>

    In addition, the start of <b>Meow to the Moon The Series</b> comic will be available for holders to read every week.

    `,
    position: "3",
    is_active: false,
  },
  {
    id: 8,
    header: {
      title: "",
      text: "",
    },
    title: "The Doggy Attack (At Meow V2 75% Sold)",
    text: `The spaceship has been attacked by the doggy army. What should we do? The MVP of the war will receive a special airdrop from the Meow’s Team, <b>a playable Meow NFT in Sandbox Game</b>

    The holders will have the opportunity to participate in a mini-game, which the trait of your Meow will be contributed to the performance in the game
    
    `,
    position: "3.5",
    is_active: false,
  },
  {
    id: 9,
    header: {
      title: "Season 3",
      text: "The Warp Port (At Meow V2 100% sold)",
    },
    title: "Epilogue",
    text: `<b>[Sandbox Land]</b> - We will purchase land, which will serve as the place where Meow’s holders can engage with each other, build connections, and promote their works.
    <b class="redText">Genesis Holder will be given 1x Genesis House in the Meow’s Land we are going to build in the Sandbox Metaverse. </b>
  .
  <b>[Meow Token V2]</b> - We will expand the usage of Meow tokens beyond the reward center in season 1. It may be in the format of NFT-game, Utility Usage, and etc, depending on the direction that the community wants us to go.
  .
  <b>[Meow Note]</b> - We are only as big as our community, the community will be the one who decides the direction of Season 3.
  
    `,
    position: "X",
    is_active: true,
  },
];
