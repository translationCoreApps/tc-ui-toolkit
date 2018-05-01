import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import './VerseRow.styles.css';

// components
import Verse from '../../../Verse';

class VerseRow extends Component {
  render () {
    const {
      chapter,
      verse,
      currentVerseNumber,
      currentPaneSettings,
      biblesWithHighlightedWords,
    } = this.props;
    let verseCells = <div />;
    const isCurrent = currentVerseNumber === verse.toString();

    let colStyle = {
      alignItems: 'stretch', padding: '10px', paddingTop: '20px',
      borderRight: '1px solid var(--border-color)'
    };
    let rowStyle = { display: 'flex', margin: '0', color: 'var(--text-color-dark)' };

    if (currentPaneSettings.length > 0) {
      console.log(currentPaneSettings)
      verseCells = currentPaneSettings.map((paneSetting, index) => {
        console.log(paneSetting)
        const { languageId, bibleId } = paneSetting;
        const { direction, bibleData } = biblesWithHighlightedWords[languageId][bibleId]
        const verseElements = bibleData[chapter][currentVerseNumber];

        return (
          <Col key={index} md={4} sm={4} xs={4} lg={4} style={colStyle}>
            <Verse
              verseElements={verseElements}
              bibleId={bibleId}
              direction={direction}
              chapter={chapter}
              verse={currentVerseNumber}
            />
          </Col>
        );
      });
    }

    return (
      <Row style={rowStyle}>
        {verseCells}
      </Row>
    )
  }
}

VerseRow.propTypes = {
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  currentVerseNumber: PropTypes.number.isRequired,
  currentPaneSettings: PropTypes.array.isRequired,
  verseElements: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
  ]),
}

export default VerseRow