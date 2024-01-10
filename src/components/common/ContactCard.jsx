import React from 'react';
import 'assets/css/main.css';

const ContactCard = ({ href, image }) => {
  const maxWidth = 768;
  const isMailto = href.startsWith('mailto:');

  return (
    <a
      href={href}
      target={isMailto ? '_self' : '_blank'}
      className="l-footer__nav-item-link"
    >
      <img src={image} alt="" aria-hidden="true" />
    </a>
  );
};

export default ContactCard;
