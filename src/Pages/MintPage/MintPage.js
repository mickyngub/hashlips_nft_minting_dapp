import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";

import * as s from "../../assets/styles/mintGlobalStyles";
import mint_bg_macbook from "../../assets/images/mint_bg_macbook.png";
import mint_bg_iphone from "../../assets/images/mint_bg_iphone.png";
import mint_bg_ipad_mini from "../../assets/images/mint_bg_ipad_mini.png";
import meow_profile_gif from "../../assets/images/meow_profile_gif.gif";
import decrementButton from "../../assets/images/minus_normal.png";
import decrementButtonHover from "../../assets/images/minus_hover.png";
import incrementButton from "../../assets/images/plus_normal.png";
import incrementButtonHover from "../../assets/images/plus_hover.png";
import mintButton from "../../assets/images/mint_normal.png";
import mintButtonHover from "../../assets/images/mint_hover.png";
import connectButton from "../../assets/images/connect_normal.png";
import connectButtonHover from "../../assets/images/connect_hover.png";
import publicsaleTitle from "../../assets/images/public_sale.png";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import Nav from "../../components/layout/Nav";
import classes from "../../assets/styles/mintpage.module.css";
import Spinner from "../../components/Spinner";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

const MintPage = () => {
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [mintAmount, setMintAmount] = useState(1);
  const [idNumber, setIdNumber] = useState(99999);
  const [proof, setProof] = useState([]);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const publicMint = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    // console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);

    blockchain.smartContract.methods
      .mintCookie(mintAmount)
      .send({
        // gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 6) {
      newMintAmount = 6;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const screen_size =
    width < 768 ? "iphone" : width < 1368 ? "ipad_mini" : "macbook";
  const background_image =
    screen_size == "iphone"
      ? mint_bg_iphone
      : screen_size == "ipad_mini"
      ? mint_bg_ipad_mini
      : screen_size == "macbook"
      ? mint_bg_macbook
      : "";

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
    console.log(blockchain.account);
  }, [blockchain.account]);

  return (
    <s.Screen image={background_image}>
      <Nav mintPage screen_size={screen_size} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "5vh",
        }}
      >
        <img src={publicsaleTitle} alt="publicsaleTitle" />
      </div>
      <s.Container flex={1} ai={"center"} style={{ padding: 12 }}>
        <s.SpacerSmall />
        <div style={{ padding: 12 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <img
              alt={"example"}
              src={meow_profile_gif}
              width="240px"
              style={{ borderRadius: "22px" }}
            />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 24,
              border: "4px solid #3730A3",
              width:
                screen_size == "iphone"
                  ? "80vw"
                  : screen_size == "ipad_mini"
                  ? "70vw"
                  : "40vw",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize:
                  screen_size == "iphone"
                    ? 24
                    : screen_size == "ipad_mini"
                    ? 35
                    : 50,
                fontWeight: "bold",
              }}
            >
              {" "}
              Meow Supply
            </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize:
                  screen_size == "iphone"
                    ? 20
                    : screen_size == "ipad_mini"
                    ? 30
                    : 40,
                fontWeight: "bold",
                color: "#621FF2",
              }}
            >
              {data.totalSupply ? data.totalSupply : "?"} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
                fontSize:
                  screen_size == "iphone"
                    ? 12
                    : screen_size == "ipad_mini"
                    ? 15
                    : 20,
              }}
            >
              <a
                target={"_blank"}
                href={CONFIG.SCAN_LINK}
                rel="noopener noreferrer"
              >
                Contract Address: {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </a>
            </s.TextDescription>
            <s.SpacerSmall />
            <s.SpacerMedium />
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize:
                  screen_size == "iphone"
                    ? 16
                    : screen_size == "ipad_mini"
                    ? 18
                    : 25,
              }}
            >
              {mintAmount} MeowToTheMoon costs{" "}
              {(CONFIG.DISPLAY_COST * mintAmount).toFixed(4)}{" "}
              {CONFIG.NETWORK.SYMBOL} + gas fees
            </s.TextTitle>
            <s.SpacerXSmall />
            <s.TextSubTitle
              style={{
                color: "black",
                textAlign: "center",
                fontSize:
                  screen_size == "iphone"
                    ? 12
                    : screen_size == "ipad_mini"
                    ? 15
                    : 20,
                color: "#5B6370",
              }}
            >
              Max 6 Meows Per Transaction
            </s.TextSubTitle>
            <s.TextSubTitle
              style={{
                color: "black",
                textAlign: "center",
                fontSize:
                  screen_size == "iphone"
                    ? 12
                    : screen_size == "ipad_mini"
                    ? 15
                    : 20,
                fontSize: 20,
                color: "#5B6370",
              }}
            >
              Max 7 Meows Per Wallet
            </s.TextSubTitle>
          </s.Container>

          <s.SpacerMedium />

          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
              <s.TextTitle style={{ textAlign: "center" }}>
                All meows got adopted!
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                You can still find {CONFIG.NFT_NAME} on
              </s.TextDescription>
              <s.SpacerSmall />
              <a
                target={"_blank"}
                href={CONFIG.MARKETPLACE_LINK}
                rel="noopener noreferrer"
              >
                {CONFIG.MARKETPLACE}
              </a>
            </>
          ) : (
            <>
              {/*  start of minting function */}

              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container
                  ai={"center"}
                  jc={"center"}
                  style={{
                    width:
                      screen_size == "iphone"
                        ? "80vw"
                        : screen_size == "ipad_mini"
                        ? "70vw"
                        : "40vw",
                  }}
                >
                  {/* <s.TextDescription
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Connect to the {CONFIG.NETWORK.NAME} network
                  </s.TextDescription> */}

                  <div className={classes.buttonBox}>
                    <div className={classes.button}>
                      <img
                        src={connectButton}
                        alt="connectButton"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      />
                    </div>
                    <div className={classes.buttonHover}>
                      <img
                        src={connectButtonHover}
                        alt="connectButtonHover"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      />
                    </div>
                  </div>

                  {blockchain.errorMsg !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {feedback}
                  </s.TextDescription>
                  <s.Container
                    ai={"center"}
                    jc={"center"}
                    fd={"row"}
                    style={{
                      width:
                        screen_size == "iphone"
                          ? "80vw"
                          : screen_size == "ipad_mini"
                          ? "70vw"
                          : "40vw",
                    }}
                  >
                    <div className={classes.buttonBox}>
                      <div className={classes.button}>
                        <img
                          src={decrementButton}
                          alt="decrementButton"
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            decrementMintAmount();
                          }}
                        />
                      </div>
                      <div className={classes.buttonHover}>
                        <img
                          // style={{ height: "87px", width: "74px" }}
                          src={decrementButtonHover}
                          alt="decrementButtonHover"
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            decrementMintAmount();
                          }}
                        />
                      </div>
                    </div>

                    <s.SpacerMedium />
                    <s.TextDescriptionMintAmount
                      style={{
                        textAlign: "center",
                        width: 35,
                      }}
                    >
                      {mintAmount}
                    </s.TextDescriptionMintAmount>
                    <s.SpacerMedium />
                    <div className={classes.buttonBox}>
                      <div className={classes.button}>
                        <img
                          // style={{ height: "87px", width: "74px" }}
                          src={incrementButton}
                          alt="incrementButton"
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            incrementMintAmount();
                          }}
                        />
                      </div>
                      <div className={classes.buttonHover}>
                        <img
                          // style={{ height: "87px", width: "74px" }}
                          src={incrementButtonHover}
                          alt="incrementButtonHover"
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            incrementMintAmount();
                          }}
                        />
                      </div>
                    </div>
                    {!claimingNft ? (
                      <div className={classes.buttonBox}>
                        <div className={classes.button}>
                          <img
                            src={mintButton}
                            alt="mintButton"
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              publicMint();
                              getData();
                            }}
                          />
                        </div>
                        <div className={classes.buttonHover}>
                          <img
                            src={mintButtonHover}
                            alt="mintButtonHover"
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              publicMint();
                              getData();
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: "241px" }}>
                        <Spinner />
                      </div>
                    )}
                  </s.Container>
                </>
              )}
              {/*  end of minting function */}
            </>
          )}
        </div>
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          {/* <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
};

export default MintPage;
