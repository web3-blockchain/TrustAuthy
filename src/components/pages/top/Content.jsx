import React from 'react';
import MainVisual from 'components/pages/top/MainVisual';
import Reword from 'components/pages/top/Reword';
import Summary from 'components/pages/top/Summary';
import Rule from 'components/pages/top/Rule';
import Schedule from 'components/pages/top/Schedule';
import Choice from 'components/pages/top/Choice';
import Sidebar from 'components/pages/top/Sidebar';

const Content = () => {
  return (
    <main>
      <MainVisual />
      <div className="l-content">
        <div className="l-content__inner">
          <div className="l-content__main">
            <Reword />
            <Summary />
            <Rule />
          </div>
          <div className="l-content__side">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
