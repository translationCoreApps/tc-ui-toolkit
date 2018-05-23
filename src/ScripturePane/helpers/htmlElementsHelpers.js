import React from 'react';
// Components
import WordDetails from '../WordDetails';
// helpers
import * as lexiconHelpers from './lexiconHelpers';

export const onWordClick = (e, word, getLexiconData, showPopover) => {
  if (word && word.strong) {
    const {strong} = word;
    const entryId = lexiconHelpers.lexiconEntryIdFromStrongs(strong);
    const lexiconId = lexiconHelpers.lexiconIdFromStrongs(strong);
    const lexiconData = getLexiconData(lexiconId, entryId);
    const positionCoord = e.target;
    const PopoverTitle = <strong style={{ fontSize: '1.2em' }}>{word.word}</strong>;
    const wordDetails = (
      <WordDetails lexiconData={lexiconData} word={word} />
    );
    showPopover(PopoverTitle, wordDetails, positionCoord);
  }
};

export const createNonClickableSpan = (index, paddingSpanStyle, padding, isHighlightedWord, text) => {
  return (
    <span key={index.toString()}>
      <span style={paddingSpanStyle}>
        {padding}
      </span>
      <span style={{ backgroundColor: isHighlightedWord ? "var(--highlight-color)" : "" }}>
        {text}
      </span>
    </span>
  );
};

export const createTextSpan = (index, text) => {
  return (
    <span key={index}>
      {text}
    </span>
  );
};

export const createHighlightedSpan = (index, text) => {
  return (
    <span key={index} style={{ backgroundColor: 'var(--highlight-color)' }}>
      {text}
    </span>
  );
};