import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import './Verse.styles.css';

const styles = {
  edit_wrapper: {
    textAlign: 'right'
  },
  edit_button: {
    padding: 0,
    width: 28,
    height: 28
  }
};

// constants
const PLACE_HOLDER_TEXT = '[WARNING: This Bible version does not include text for this reference.]';

class Verse extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    const {bibleId, chapter, verse, verseText, onEdit} = this.props;
    if (typeof onEdit === 'function') {
      onEdit(bibleId, chapter, verse, verseText);
    }
  }

  render () {
    const {
      verseElements,
      bibleId,
      direction,
      chapter,
      verse,
      onEdit
    } = this.props;
    const verseIsPlaceHolder = !verseElements;
    const chapterVerseContent = direction === 'rtl' ? `${verse}:${chapter} ` : `${chapter}:${verse} `;
    const chapterVerse = <strong>{chapterVerseContent}</strong>;
    const isEditable = bibleId === 'targetBible';
    let verseSpan = verseElements;

    if (verseIsPlaceHolder) {
      verseSpan = (
        <span className='placeholder-text'>
          {PLACE_HOLDER_TEXT}
        </span>
      );
    }

    let edit = null;
    if(isEditable && onEdit) {
      edit = (
        <div style={styles.edit_wrapper}>
          <IconButton style={styles.edit_button} onClick={this.handleEdit}>
            <EditIcon/>
          </IconButton>
        </div>
      );
    }

    return (
      <div className="verse-container">
        <div className={direction === 'ltr' ? 'verse-content-ltr' : 'verse-content-rtl'}>
          {chapterVerse}
          {verseSpan}
        </div>
        {edit}
      </div>
    );
  }
}

Verse.propTypes = {
  verseText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  verseElements: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  bibleId: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  chapter: PropTypes.number.isRequired,
  verse: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  onEdit: PropTypes.func,
};

export default Verse;
