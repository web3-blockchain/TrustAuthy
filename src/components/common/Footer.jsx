import React from 'react';
import ContactCard from 'components/common/ContactCard';
import 'assets/css/main.css';

const Footer = () => {
  const items = [];

  return (
    <footer className="l-footer">
      <div className="l-footer__inner">
        <nav className="l-footer__nav">
          <ul className="l-footer__nav-list">
            {items.map((item, i) => (
              <li className="l-footer__nav-item" key={i}>
                <ContactCard href={item.href} image={item.image} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="l-footer__title">
          <p className="l-footer__title-img">
            {/* <img src="images/common/icon_footer_logo.svg" alt="" /> */}
          </p>
        </div>
      </div>
      <img type="image/png" href="images/favicon.png" />
    </footer>
  );
};

export default Footer;
