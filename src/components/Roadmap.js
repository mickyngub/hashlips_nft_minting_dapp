import React from "react";

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
            <h3 className="text--xl text--700">{item.title}</h3>
            <p className="text--xl desc pre-white">{item.text}</p>

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
          <p className="roadMap-sm-title-text">{item.title}</p>
        </div>
        <p className="text--xl desc text--left ">{item.text}</p>
      </div>
    ));
  }
  return (
    <section id="roadMap" className="roadMap-overview">
      <div className="roadMap-wrapper">
        <h2 className="text--5xl">Roadmap</h2>
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
      title: "Season 1",
      text: "The beginning of the Moon Journey",
    },
    title: "The Crew Recruitment",
    text: "The meow army wants to onboard the marvelous soldier to join the spaceship. There will be 2 types of on-board: Whitelist and Public Stealth Launch",
    position: "1",
    is_active: true,
  },
  {
    id: 2,
    header: {
      title: "",
      text: "",
    },
    title: "The Visit of Land (777,777)",
    text: "The onboarding is done; now, the first journey of the meows is the land of trade, Openseas.  After two weeks of listing, the holders of Meow will receive a raffle every two weeks to participate in the 777 Meow machine. The machine is the slot machine where the player will be guaranteed a reward; however, it’s all up to your luck how much you would receive. The fund of the slot machine will be 10% of our minting margin, which the game will continue until it runs out.",
    position: "2",
    is_active: false,
  },
  {
    id: 3,
    header: {
      title: "",
      text: "",
    },
    title: "The Treasure Cave",
    text: `During the expenditure in the land of trade, the Meow’s holder will be able to stake their Meow NFT to receive the loyalty Meow Token which can be used in Meow’s cave, an exclusive point-reward center where holder can exchange their Meow’s point for: 
    \nExclusive merchandise:  Hoodie, Smooshie Meow Pillow, Meow Figure, and etc
    DAO’s Selection: Anytime purchased by the Dao’s wallet. 
    Fast-pass comic ticket: One-week fast pass
    The Secret Ticket: The pass to the secret collection. The royalty fee from the secondary marketplace will be distributed accordingly, 
    
    30% for marketing, 30% to the DAO wallet, 20% to sweep the floor, 10% to charity upon community selection, and 10% for hiring new members.
    In addition, the start of Meow to the Moon The Serie comic will be available for holders to read every week.`,
    position: "3",
    is_active: false,
  },
  {
    id: 4,
    header: {
      title: "",
      text: "",
    },
    title: "The Doggy Attack",
    text: "The spaceship has been attacked by the doggy army.What should we do? The MVP of the war will receive a special airdrop from the Meow’s Team. The airdrop will be the animated version of Meow to the Moon NFT. The holders will have the opportunity to participate in a mini-game, in which your meow will be used as the persona to participate in the game. Will you be the winner?",
    position: "4",
    is_active: false,
  },
  {
    id: 5,
    header: {
      title: "Season 2",
      text: "The Warp Port",
    },
    title: "Episode X",
    text: `In the last chapter of Meow to the Moon Season 1, there will be a cliffhanger. The cliffhanger will revolve around the Meow Secret Pass. For the secret pass holder, you will have the access for a spot in this Season 2 journey. Are you ready for the next battle? 
    
    Sandbox Land - We will purchase land, which will serve as the place where Meow’s holders can engage with each other, build connections, and promote their works. 
    
    Meow Token V2 - We will expand the usage of Meow token beyond the reward center in season 1. It can be in the format of NFT-game, Utility Usage, and etc.
    
    Season 2 Collection: Be sure to follow Meow To the Moon The Serie 

    Meow Note: We are only as big as our community, the community will be the one who decides the direction of Season 2.

    `,
    position: "x",
    is_active: true,
  },
];
