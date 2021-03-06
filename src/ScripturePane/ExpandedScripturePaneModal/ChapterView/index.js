/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ChapterView.styles.css';

// components
import { getReferenceStr, getTitleStr } from '../../helpers/utils';
import VerseEditorDialog from '../../../VerseEditor';
import VerseRow from './VerseRow';

class ChapterView extends Component {
  componentDidMount() {
    let { chapter, verse } = this.props.contextId.reference;
    let verseReference = ChapterView.makeRefKey(chapter, verse);
    let currentVerse = this.verseRefs[verseReference];
    let element = ReactDOM.findDOMNode(currentVerse);

    if (element) {
      element.scrollIntoView();
    }
  }

  /**
   * Generates a key to use for verse ref's
   * @param chapter
   * @param verse
   * @return {string}
   */
  static makeRefKey(chapter, verse) {
    return `c${chapter.toString()}v${verse.toString()}`;
  }

  componentWillUnmount() {
    this.verseRefs = {};
  }

  render() {
    const {
      bibles,
      contextId,
      translate,
      selections,
      showPopover,
      getLexiconData,
      handleEditorSubmit,
      handleEditorCancel,
      currentPaneSettings,
      projectDetailsReducer,
      handleEditTargetVerse,
    } = this.props;

    const { chapter, verse } = contextId.reference;
    const verseNumbers = Object.keys(bibles['en']['ult'][chapter]);
    const { manifest: projectManifest } = projectDetailsReducer;
    const targetLanguageFont = projectManifest.projectFont || '';
    this.verseRefs = {};
    let verseRows = [];

    if (verseNumbers.length > 0) {
      for (let i = 0, len = verseNumbers.length; i < len; i++) {
        const verseNumber = verseNumbers[i];
        const refKey = ChapterView.makeRefKey(chapter, verseNumber);

        verseRows.push(
          <VerseRow
            key={verseNumber.toString()}
            verse={verse}
            bibles={bibles}
            chapter={chapter}
            translate={translate}
            contextId={contextId}
            selections={selections}
            showPopover={showPopover}
            getLexiconData={getLexiconData}
            currentVerseNumber={verseNumber}
            targetLanguageFont={targetLanguageFont}
            currentPaneSettings={currentPaneSettings}
            onEditTargetVerse={handleEditTargetVerse}
            ref={node => this.verseRefs[refKey] = node}
          />,
        );
      }
    }

    const { editVerse } = this.props;
    const openEditor = editVerse !== null;
    let verseTitle = '';
    let verseText = '';
    let fontSizePercent = 100; // default font size
    const direction = projectManifest.target_language && projectManifest.target_language.direction || 'ltr';

    if (openEditor) {
      let bookName = projectManifest.target_language.book.name;

      if (bookName === null) {
        console.warn('The localized book name could not be found. This is likely a bug in tC.');
        bookName = projectManifest.project.name;
      }

      const refStr = getReferenceStr(editVerse.chapter, editVerse.verse);
      verseTitle = getTitleStr(bookName, refStr, direction);
      verseText = editVerse.verseText;
      const targetConfig = currentPaneSettings.find(pane => (pane.languageId === 'targetLanguage'));

      if (targetConfig) {
        fontSizePercent = targetConfig.fontSize;
      }
    }

    return (
      <div>
        <div className="verse-row-container">
          {verseRows}
        </div>
        <VerseEditorDialog
          open={openEditor}
          translate={translate}
          verseText={verseText}
          verseTitle={verseTitle}
          onSubmit={handleEditorSubmit}
          onCancel={handleEditorCancel}
          targetLanguageFont={targetLanguageFont}
          targetLanguageFontSize={`${fontSizePercent}%`}
          direction={direction}
        />
      </div>
    );
  }
}

ChapterView.propTypes = {
  contextId: PropTypes.object.isRequired,
  currentPaneSettings: PropTypes.array.isRequired,
  editTargetVerse: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  bibles: PropTypes.object.isRequired,
  selections: PropTypes.array.isRequired,
  getLexiconData: PropTypes.func.isRequired,
  showPopover: PropTypes.func.isRequired,
  editVerse: PropTypes.object,
  handleEditTargetVerse: PropTypes.func.isRequired,
  handleEditorSubmit: PropTypes.func.isRequired,
  handleEditorCancel: PropTypes.func.isRequired,
};

export default ChapterView;
