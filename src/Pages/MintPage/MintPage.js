import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";

import * as s from "../../assets/styles/mintGlobalStyles";
import bg_mint from "../../assets/images/mint_bg_macbook.jpg";
import meow_profile from "../../assets/images/meowprofile.png";
import decrementButton from "../../assets/images/minus_normal.png";
import decrementButtonHover from "../../assets/images/minus_hover.png";
import incrementButton from "../../assets/images/plus_normal.png";
import incrementButtonHover from "../../assets/images/plus_hover.png";
import mintButton from "../../assets/images/mint_normal.png";
import mintButtonHover from "../../assets/images/mint_hover.png";
import connectButton from "../../assets/images/connect_normal.png";
import connectButtonHover from "../../assets/images/connect_hover.png";

import Nav from "../../components/layout/Nav";
import classes from "../../assets/styles/mintpage.module.css";
import Spinner from "../../components/Spinner";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

const MintPage = () => {
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
    console.log("Gas limit: ", totalGasLimit);
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

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
    console.log(blockchain.account);
  }, [blockchain.account]);

  return (
    <s.Screen image={bg_mint}>
      <Nav mintPage />
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.SpacerSmall />
        <div style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <img alt={"example"} src={meow_profile} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
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
              <a target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </a>
            </s.TextDescription>
            <s.SpacerSmall />
            <s.SpacerMedium />
            <s.TextTitle style={{ textAlign: "center" }}>
              1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
              {CONFIG.NETWORK.SYMBOL}.
            </s.TextTitle>
            <s.SpacerXSmall />
            <s.TextDescription style={{ textAlign: "center" }}>
              Excluding gas fees.
            </s.TextDescription>
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
              <a target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                {CONFIG.MARKETPLACE}
              </a>
            </>
          ) : (
            <>
              {/*  start of minting function */}

              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Connect to the {CONFIG.NETWORK.NAME} network
                  </s.TextDescription>
                  <s.SpacerSmall />

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
                    }}
                  >
                    {feedback}
                  </s.TextDescription>
                  <s.SpacerMedium />
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
                      <Spinner />
                    )}
                  </s.Container>
                  <s.SpacerSmall />
                </>
              )}
              {/*  end of minting function */}
            </>
          )}
          <s.SpacerLarge />
        </div>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address
          </s.TextDescription>
          <s.SpacerSmall />
        </s.Container>
      </s.Container>
    </s.Screen>
  );
};

export default MintPage;
