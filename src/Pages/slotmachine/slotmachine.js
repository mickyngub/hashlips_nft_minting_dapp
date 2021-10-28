import React, { useState } from "react";
import cat1 from "../../assets/images/bg_slot.png";
import cat2 from "../../assets/images/bg_slot_md.png";
import cat3 from "../../assets/images/bg_slot_xl.png";
import slot from "../../assets/images/slot.png";
import slot_x from "../../assets/images/slot_xx.png";
import icon from "../../assets/images/icon_cat.png";
import Modal from "../../components/modal";
import slotVideo from "../../assets/video/slotvideo.mp4";

const slotmachine = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute">
          <img className="slot-img" src={slot} alt="" />
          <img className="slot-img-xx" src={slot_x} alt="" />
        </div>
        <div className="absolute video-rounded">
          <video
            className="slot-video"
            src={slotVideo}
            width="442"
            height="500"
            autoPlay
            loop
          ></video>
        </div>

        <div className="absolute-button">
          <button
            className="myButton"
            onClick={handleModal}
            description="You receive 0.0007 ETH"
          >
            <div className="myButton-text">Play</div>
          </button>
        </div>
        <section className="slot">
          <img className="bg-lg" src={cat1} alt="" />
          <img className="bg-md" src={cat2} alt="" />
          <img className="bg-xl" src={cat3} alt="" />
        </section>
      </div>

      <Modal
        isOpen={openModal}
        description="You receive 0.0007 ETH"
        img={<img src={icon} alt="" />}
      >
        <button className="myButton-modal" onClick={() => setOpenModal(false)}>
          <div className="myButton-modal-text">Accept</div>
        </button>
      </Modal>
    </div>
  );
};

export default slotmachine;
