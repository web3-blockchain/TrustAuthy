import React from 'react';
import 'assets/css/main.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const items = [
    { href: 'https://trustauthy.jp/', text: 'TRUSTAUTHY' },
    // { href: '#schedule', text: 'SCHEDULE' },
    { href: 'https://twitter.com/sachiominamoto', text: 'X (twitter)' },
    // { href: '', text: 'DISCORD' },
  ];

  const handleHamburgerButtonClick = (e) => {
    const html = document.documentElement;
    html.classList.toggle('is-open');
    e.target.setAttribute(
      'aria-expanded',
      !e.target.getAttribute('aria-expanded')
    );
  };

  const closeNav = () => {
    const html = document.documentElement;
    const hamburgerButton = document.getElementById('js-hamburger-btn');
    const windowWidth = window.innerWidth;
    if (windowWidth < 1025) {
      html.classList.toggle('is-open');
      hamburgerButton.setAttribute('aria-expanded', false);
    }
  };

  return (
    <header className="l-header">
      <div className="l-header__inner">
        <h1 className="l-header__title">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            TRUSTAUTHY DEMO
          </a>
        </h1>

        <nav className="l-header__nav">
          <ul className="l-header__nav-list">
            {items.map((item, i) => (
              <li
                className="l-header__nav-item"
                key={i}
                onClick={() => closeNav()}
              >
                <a
                  href={item.href}
                  target={'_blank'}
                  rel={
                    item.href.includes('twitter.com')
                      ? 'noopener noreferrer'
                      : ''
                  }
                  className="l-header__nav-item-link"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>

          <div className="l-header__wallet u-pc--hide">
            <ConnectButton
              label="CONNECT WALLET"
              chainStatus="icon"
              accountStatus="address"
              showBalance={true}
            />
          </div>
        </nav>

        <div className="l-header__wallet u-sp--hide">
          <ConnectButton
            label="CONNECT WALLET"
            chainStatus="icon"
            accountStatus="address"
            showBalance={true}
          />
        </div>

        <div className="l-header__hamburger u-tab-over--hide">
          <button
            type="button"
            id="js-hamburger-btn"
            className="l-header__hamburger-btn c-btn c-btn--hamburger"
            aria-controls="drawer"
            aria-expanded="false"
            onClick={(e) => handleHamburgerButtonClick(e)}
          >
            <span className="l-header__hamburger-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
