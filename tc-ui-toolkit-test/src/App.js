import React, {Component} from 'react';
import {VerseCheck, CheckInfoCard, GroupMenu, TranslationHelps} from 'tc-ui-toolkit';
const article = `# blasphemy, blaspheme, blasphemous, blasphemies #

## Definition: ##

In the Bible, the term "blasphemy" refers to speaking in a way that shows a deep disrespect for God or people. To "blaspheme" someone is to speak against that person so that others think something false or bad about him.

* Most often, to blaspheme God means to slander or insult him by saying things that are not true about him or by behaving in an immoral way that dishonors him.
* It is blasphemy for a human being to claim to be God or to claim that there is a God other than the one true God.
* Some English versions translate this term as "slander" when it refers to blaspheming people.

## Translation Suggestions: ##

* To "blaspheme" can be translated as to "say evil things against" or to "dishonor God" or to "slander."
* Ways to translate "blasphemy" could include "speaking wrongly about others" or "slander" or "spreading false rumors."

(See also: [dishonor](../other/dishonor.md), [slander](../other/slander.md))

## Bible References: ##

* [1 Timothy 01:12-14](rc://en/tn/help/1ti/01/12)
* [Acts 06:10-11](rc://en/tn/help/act/06/10)
* [Acts 26:9-11](rc://en/tn/help/act/26/09)
* [James 02:5-7](rc://en/tn/help/jas/02/05)
* [John 10:32-33](rc://en/tn/help/jhn/10/32)
* [Luke 12:8-10](rc://en/tn/help/luk/12/08)
* [Mark 14:63-65](rc://en/tn/help/mrk/14/63)
* [Matthew 12:31-32](rc://en/tn/help/mat/12/31)
* [Matthew 26:65-66](rc://en/tn/help/mat/26/65)
* [Psalms 074:9-11](rc://en/tn/help/psa/074/009)


## Word Data: ##

* Strong's: H1288, H1442, H2778, H5006, H5007, H5344, G987, G988, G989

`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowHelpsSidebar: false,
      isShowHelpsExpanded: false,
      remindersReducer: {
        enabled: false
      }
    };
  }

  handleSidebarToggle() {
    console.log('handlSidebarToggle: ' + this.state.isShowHelpsSidebar);
    this.setState({
      isShowHelpsSidebar: !this.state.isShowHelpsSidebar
    });
  }

  handleHelpsExpandedToggle() {
    console.log('handleHelpsExpandedToggle: ' + this.state.isShowHelpsExpanded);
    this.setState({
      isShowHelpsExpanded: !this.state.isShowHelpsExpanded
    });
  }

  toggleReminder(event) {
    this.setState({
      remindersReducer: {
        ...this.state.remindersReducer,
        enabled: event.target.checked
      }
    });
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <GroupMenu />
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <CheckInfoCard
            title={'Title'}
            phrase={'a phrase'}
            seeMoreLabel={'see_more'}
            showSeeMoreButton={!this.state.isShowHelpsExpanded}
            onSeeMoreClick={() => this.handleHelpsExpandedToggle()} />
          <VerseCheck />
        </div>
        <TranslationHelps
          openExpandedHelpsModal={() => this.handleHelpsExpandedToggle()}
          isShowHelpsSidebar={this.state.isShowHelpsSidebar}
          sidebarToggle={() => this.handleSidebarToggle()}
          isShowHelpsExpanded={this.state.isShowHelpsExpanded} />
      </div>
    );
  }
}

export default App;
