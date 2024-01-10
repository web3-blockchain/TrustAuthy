import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Content from 'components/pages/top/Content';
import 'assets/css/main.css';

const Top = () => {
  return (
    <div className="l-wrapper">
      <Header />
      <Content />
      <Footer />
      {/* <div>comming soon...</div> */}
    </div>
  );
};

export default Top;
