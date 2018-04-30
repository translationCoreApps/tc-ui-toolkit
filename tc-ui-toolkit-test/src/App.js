import React, { Component } from 'react';

import { CheckInfoCard, ScripturePane, VerseCheck } from 'tc-ui-toolkit';

class App extends Component {
  render() {
    return (
      <div style={{ padding: '10px' }}>
        <ScripturePane
          titleLabel="Step 1. Read"
          closeButtonLabel="Close"
          expandedScripturePaneTitle="Matthew"
          expandButtonHoverText="Click to show expanded resource panes"
        />
        <CheckInfoCard
          title="save, saves, saved, safe, salvation"
          phrase='The term "save" refers to keeping someone from experiencing something bad or harmful. To "be safe" means to be protected from harm or danger.'
          seeMoreLabel="See More"
          showSeeMoreButton={true}
          onSeeMoreClick={() => console.log('CheckInfoCard clicked')}
        />
        <VerseCheck />
      </div>
    );
  }
}

export default App;
