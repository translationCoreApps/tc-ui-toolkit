import React from 'react';
import PropTypes from 'prop-types';
import { getFontClassName } from '../common/fontUtils';
import { moveCursorToEnd } from './helpers/editHelpers';

/**
 * @callback EditScreen~onChange
 * @param {string} newVerse - the edited verse
 */

/**
 * Renders a text area for editing the verse
 * @property {string} verseText - the verse text to edit
 * @property {EditScreen~onChange} onChange - callback when the text has changed
 */
class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
  }

  render() {
    const {
      rows,
      style,
      verseText,
      targetLanguageFont,
    } = this.props;
    const fontClass = getFontClassName(targetLanguageFont);
    const className = fontClass ? `edit-screen ${fontClass}-text` : 'edit-screen';

    return (
      <textarea
        id="verse-editor-field"
        rows={rows}
        className={className}
        autoFocus={true}
        onFocus={moveCursorToEnd}
        onChange={this._handleChange}
        value={verseText}
        style={style}
      />
    );
  }
}

EditScreen.propTypes = {
  rows: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  verseText: PropTypes.string.isRequired,
  targetLanguageFont: PropTypes.string,
};

EditScreen.defaultProps = {
  rows: 4,
  style: {},
};

export default EditScreen;
