import React, { useState, useEffect } from 'react';
import RadioButtonGroup from 'components/common/RadioButtonGroup';
import Timer from 'components/common/Timer';
import { useEthersSigner } from '../../../lib/bc/provider.ts';
import {
  codeMintTxRequest,
  depositTxRequest,
  depositUSDTTxRequest,
  approveTxRequest,
  usdtAmount,
  isAllowance,
} from '../../../lib/bc/contract.ts';
import Modal from 'components/pages/top/Modal';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const Sidebar = () => {
  const [selected, setSelected] = useState('werewolf');
  const [matic, setMatic] = useState(100);
  const [imagePath, setImagePath] = useState('images/img_teambox_werewolf.jpg');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setSuccess] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [team, setTeam] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const signer = useEthersSigner();
  const [vipCode, setVipCode] = useState('');

  useEffect(() => {
    if (isLoading || isSuccess || error) {
      setShowModal(true);
    }
  }, [isLoading, isSuccess, error]);

  const closeModal = () => {
    setShowModal(false);
  };

  const expiryDatetime = '2024-01-30 16:00:00';
  const teams = [
    { id: 'werewolf', label: 'TRUST AUTHY', value: 'werewolf' },
    { id: 'human', label: 'TRUST AUTHY', value: 'human' },
    { id: 'vampire', label: 'TRUST AUTHY', value: 'vampire' },
  ];

  const changeTeam = (e) => {
    const team = e.target.value;
    setSelected(team);
    setImagePath('images/img_teambox_werewolf.jpg');

    if (team === 'werewolf') {
      setTeam(0);
    } else if (team === 'human') {
      setTeam(1);
    } else if (team === 'vampire') {
      setTeam(2);
    }
  };

  const handleInputChange = (event) => {
    setVipCode(event.target.value);
  };

  async function handleMintByUSDT(event) {
    try {
      event.preventDefault();
      setData('');
      setError('');
      setSuccess(false);
      setLoading(true);
      const amount = await usdtAmount();

      if (await isAllowance(address, amount)) {
        const txReq = await depositUSDTTxRequest(team, amount);
        if (await sendTransaction(txReq)) {
          setSuccess(true);
        }
      } else {
        const approveReq = await approveTxRequest(amount);
        if (await sendTransaction(approveReq)) {
          const txReq = await depositUSDTTxRequest(team, amount);
          if (await sendTransaction(txReq)) {
            setSuccess(true);
          }
        }
      }
    } catch (error) {
      console.info(error);
      setError(JSON.stringify(error));
      setErrorMessage(gerateErrorMessage(JSON.stringify(error)));
    } finally {
      setLoading(false);
    }
  }

  async function handleMintByMNT(event) {
    event.preventDefault();
    const txReq = await depositTxRequest(team);
    setData('');
    setError('');
    setSuccess(false);
    setLoading(true);
    if (await sendTransaction(txReq)) {
      setSuccess(true);
    }
  }

  async function handleMintByCode(event) {
    event.preventDefault();
    if (!isConnected) {
      openConnectModal();
    } else {
      const txReq = await codeMintTxRequest(vipCode, team);
      setData('');
      setError('');
      setErrorMessage('');
      setSuccess(false);
      setLoading(true);
      if (await sendTransaction(txReq)) {
        setSuccess(true);
      }
    }
  }

  const targetErrors = {
    'is Used Code': 'The VIP code you entered has already been used.',
    'Input string must be 7 characters long':
      'The VIP code you entered is incorrect.',
    'insufficient balance to pay for gas': 'Insufficient $MNT for gas.',
    'Invalid team value':
      'Invalid team value. Team must be WEREWOLF, HUMAN, or VAMPIRE.',
  };

  const gerateErrorMessage = (error) => {
    for (const [key, message] of Object.entries(targetErrors)) {
      if (error.includes(key)) {
        return message;
      }
    }
    return 'An unknown error occurred.';
  };

  const sendTransaction = async (txRequest) => {
    try {
      // const gasLimit = await signer?.estimateGas(txRequest)
      const tx = await signer?.sendTransaction({ ...txRequest });
      setData(tx);
      tx?.wait(1);
      return true;
    } catch (error) {
      console.info(error);
      setError(JSON.stringify(error));
      setErrorMessage(gerateErrorMessage(JSON.stringify(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="l-sidebar">
      <form action="" method="POST">
        <div className="p-buy-area">
          <div className="p-buy-area__header">
            <p className="p-buy-area__header-img">
              <img src="images/common/matic-logo.svg" alt="" />
            </p>
            <p className="p-buy-area__header-text">NFT MINT</p>
            <p className="p-buy-area__header-title">{matic} Token</p>
          </div>

          <div className="p-buy-area__display">
            <p className="p-buy-area__display-img">
              <img src={imagePath} alt="" />
            </p>

            <p className="p-buy-area__display-text">TRUST AUTHY SBT</p>

            <div className="c-list--sidebar-display">
              <ul className="c-list p-buy-area__display-list">
                <RadioButtonGroup
                  options={teams}
                  name="team"
                  selected={selected}
                  onChange={changeTeam}
                />
              </ul>
            </div>
          </div>

          <div className="p-buy-area__payment">
            <div className="p-buy-area__payment-code">
              <div className="p-buy-area__payment-code-input">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="VIP CODE"
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-buy-area__payment-code-btn">
                <button type="" onClick={handleMintByCode}>
                  MINT by VIP CODE
                </button>
                {showModal && (
                  <Modal onClose={closeModal}>
                    {isLoading && (
                      <div className="modal__wait">
                        <div className="modal__wait__title">
                          Approve minting 'TrustAuthyGame NFT'
                        </div>
                        <div className="modal__wait__nft">
                          <div className="modal__wait__image-container">
                            <img
                              src="https://trust-authy-api.vercel.app/metadata/gameFi-image.png"
                              alt="NFT"
                            />
                            <div className="modal__wait__loader"></div>
                          </div>
                          <div>
                            <div className="modal__wait__sub_title">
                              Go to your wallet
                            </div>
                            <div className="modal__wait__body">
                              You'll be asked to review and
                              <br /> confirm this minting from your <br />
                              wallet.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isSuccess && (
                      <div className="modal__wait">
                        <div className="modal__wait__title">
                          Congratulations!
                        </div>
                        <div className="modal__wait__nft">
                          <div className="modal__wait__image-container">
                            <img
                              src="https://trust-authy-api.vercel.app/metadata/gameFi-image.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="modal__wait__sub_title">
                              Your NFT has been minted!
                            </div>
                            <div className="modal__wait__body">
                              You can check your NFT in your
                              <br />
                              wallet app or
                              <a
                                href={`https://mumbai.polygonscan.com/tx/${data.hash}`}
                                target="_blank"
                                style={{ textDecoration: 'underline' }}
                              >
                                Transaction.
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="modal__wait">
                        <div className="modal__wait__title">Mint Error</div>
                        <div className="modal__wait__nft">
                          <div className="modal__wait__image-container">
                            <img src="images/ErrorIcon.jpg" alt="" />
                          </div>
                          <div>
                            <div className="modal__wait__sub_title"></div>
                            <div className="modal__wait__error">
                              {errorMessage}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Modal>
                )}
              </div>
            </div>
          </div>
          <div className="p-buy-area__period">
            <Timer datetime={expiryDatetime} />
          </div>
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
