import React from 'react';

const Reword = () => {
  const maxWidth = 768;
  const notes = [
    'Rewards in TRUST AUTHY tokens will be awarded post-listing on a recognized exchange.',
    'Post-game, NFTs will transform into SBTs (Soul Bond Tokens), unique tokens that are non-transferable.',
  ];

  return (
    <div className="p-reword">
      <div className="p-reword__inner">
        <p className="p-reword__img">
          <img src="images/img_reword.jpg" alt="" aria-hidden="true" />
        </p>

        <div className="c-list--note">
          <ul className="c-list">
            {notes.map((note, i) => (
              <li className="c-list__item" key={i}>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reword;
