import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../assets/styles/mintGlobalStyles";

import earlyMeowJSON from "../../whitelist/merkleproof-earlyMeow.json";
import meowJuniorJSON from "../../whitelist/merkleproof-meowJunior.json";

import mint_bg_macbook from "../../assets/images/mint_bg_macbook.png";
import mint_bg_iphone from "../../assets/images/mint_bg_iphone.png";
import mint_bg_ipad_mini from "../../assets/images/mint_bg_ipad_mini.png";

import meow_profile from "../../assets/images/meowprofile.png";
import decrementButton from "../../assets/images/minus_normal.png";
import decrementButtonHover from "../../assets/images/minus_hover.png";
import incrementButton from "../../assets/images/plus_normal.png";
import incrementButtonHover from "../../assets/images/plus_hover.png";
import premintButton from "../../assets/images/premint_normal.png";
import premintButtonHover from "../../assets/images/premint_hover.png";
import connectButton from "../../assets/images/connect_normal.png";
import connectButtonHover from "../../assets/images/connect_hover.png";
import presaleTitleDesktop from "../../assets/images/presale_title_desktop.png";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import Nav from "../../components/layout/Nav";
import classes from "../../assets/styles/mintpage.module.css";
import Spinner from "../../components/Spinner";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

const PremintPage = () => {
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

  const preMint = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);

    blockchain.smartContract.methods
      .preMintCookie(mintAmount, proof, idNumber)
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
    if (newMintAmount > 3) {
      newMintAmount = 3;
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

  useEffect(() => {
    getConfig();
  }, []);

  const background_image =
    width < 768
      ? mint_bg_iphone
      : width < 1368
      ? mint_bg_ipad_mini
      : mint_bg_macbook;

  useEffect(() => {
    getData();
    console.log(blockchain.account);
    let earlyMeowWhitelist = earlyMeowJSON["whitelist"];
    let i = 0;
    for (let key of Object.keys(earlyMeowWhitelist)) {
      if (
        earlyMeowWhitelist[key]["address"].toLowerCase() == blockchain.account
      ) {
        setIdNumber(i);
        setProof(earlyMeowWhitelist[i]["proof"]);
        console.log("You're an earlyMeow", i, earlyMeowWhitelist[i]["proof"]);
      }
      i++;
    }

    let meowJuniorWhitelist = meowJuniorJSON["whitelist"];
    i = 0;
    for (let key of Object.keys(meowJuniorWhitelist)) {
      if (
        meowJuniorWhitelist[key]["address"].toLowerCase() == blockchain.account
      ) {
        setIdNumber(i);
        setProof(meowJuniorWhitelist[i]["proof"]);
        console.log("You're a meowJunior", i, meowJuniorWhitelist[i]["proof"]);
      }
      i++;
    }
  }, [blockchain.account]);

  return (
    <s.Screen image={background_image}>
      {/* <s.TextTitle
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 30,
          marginBottom: -40,
          fontSize: 70,
          fontWeight: "bold",
        }}
      >
        Pre-sale Minting
      </s.TextTitle> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "5vh",
        }}
      >
        <img
          src={presaleTitleDesktop}
          alt="presaleTitleDesktop"
          width="311px"
        />
      </div>
      <Nav mintPage />
      <s.Container flex={1} ai={"center"} style={{ padding: 12 }}>
        <s.SpacerSmall />
        <div style={{ padding: 12 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <img alt={"example"} src={meow_profile} />
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
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
              }}
            >
              {" "}
              Meow Supply
            </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 40,
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
            <s.TextTitle style={{ textAlign: "center" }}>
              {mintAmount} MeowToTheMoon costs{" "}
              {(CONFIG.DISPLAY_COST * mintAmount).toFixed(4)}{" "}
              {CONFIG.NETWORK.SYMBOL} + gas fees
            </s.TextTitle>
            <s.SpacerXSmall />
            <s.TextSubTitle
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
                color: "#5B6370",
              }}
            >
              777 Early Meows - Max 3 Meows Per Wallet
            </s.TextSubTitle>
            <s.TextSubTitle
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 20,
                color: "#5B6370",
              }}
            >
              223 Meow Juniors - Max 2 Meows Per Wallet
            </s.TextSubTitle>
            <s.TextTitle style={{ textAlign: "center" }}></s.TextTitle>
            <s.SpacerSmall />
          </s.Container>

          <s.SpacerMedium />

          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
              <s.TextTitle style={{ textAlign: "center" }}>
                All meows got adopted!.
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
                <s.Container ai={"center"} jc={"center"}>
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
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
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
                            src={premintButton}
                            alt="premintButton"
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              preMint();
                              getData();
                            }}
                          />
                        </div>
                        <div className={classes.buttonHover}>
                          <img
                            src={premintButtonHover}
                            alt="premintBUttonHover"
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              preMint();
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
          {/*           
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address
          </s.TextDescription> */}

          <s.SpacerSmall />
        </s.Container>
      </s.Container>
    </s.Screen>
  );
};

export default PremintPage;
