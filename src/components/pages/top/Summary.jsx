import React from 'react';

const Summary = () => {
  return (
    <div className="p-summary u-mt--30">
      <div className="p-summary__inner">
        <h2 className="c-text--h2-ttl">Introducing TRUST AUTHY</h2>

        <p className="c-text u-mt--30 u-mt--20-sp">
          Embark on an innovative NFT game where your social media reactions can
          lead your team to glory.
          <br />
          Engage with your network to send "BAN points" to your rivals, tipping
          the scales in your team's favor.
          <br />
          The higher the "BAN points" tally for your adversaries, the closer you
          are to triumph!
        </p>

        <p className="p-summary__img u-mt--70 u-mt--40-sp">
          <img src="images/img_summary.jpg" alt="" />
        </p>
      </div>
    </div>
  );
};

export default Summary;
