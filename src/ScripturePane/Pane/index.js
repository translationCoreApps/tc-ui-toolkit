import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import {
  getTitleWithId, getTranslation, isLTR,
} from '../helpers/utils';
import Verse from '../Verse';
import ThreeDotMenu from '../ThreeDotMenu';
import './Pane.styles.css';
// constants
const PANECHAR = 9;

/**
 * create content for title container with selected overall justification
 * @param {boolean} isLTR - justification to use, if true do LTR
 * @param {string} headingText
 * @param {string} localizedDescription
 * @param {string} fontClass
 * @return {*}
 */
function getTitleContainerContent(isLTR, headingText, localizedDescription, fontClass) {
  const styles = { textAlign: isLTR ? 'left' : 'right' };
  const paneTitleClassName = fontClass ? `pane-title-text ${fontClass}` : 'pane-title-text';
  const headingClassName = headingText.length > 21 ? `${paneTitleClassName} hint--bottom hint--medium` : paneTitleClassName;

  return (
    <div className="pane-title-container-content" style={styles}>
      <span
        style={{ lineHeight: 1, padding: fontClass.includes('Awami') ? '0px 0px 6px' : '0px' }}
        className={headingClassName}
        aria-label={headingText}>
        {headingText.length > 21 ? headingText.slice(0, 21) + '...' : headingText}
      </span>
      <ContainerDimensions>
        {
          ({ width }) => (
            <span
              className='pane-subtitle-text hint--bottom hint--medium'
              style={{ lineHeight: 2 }}
              aria-label={localizedDescription}>
              {
                localizedDescription.length > width / PANECHAR ?
                  localizedDescription.slice(0, Math.round(width / PANECHAR)) + '...' :
                  localizedDescription
              }
            </span>
          )
        }
      </ContainerDimensions>
    </div>
  );
}

/**
 * create title container content with selected justification
 * @param {boolean} isLTR - justification to use
 * @param {string} headingText
 * @param {string} localizedDescription
 * @param {function} clickToRemoveResourceLabel
 * @param {number} index
 * @param {function} removePane
 * @return {*}
 */
function TitleContainer({
  font,
  index,
  isLTR,
  fontSize,
  fontClass,
  removePane,
  headingText,
  isTargetBible,
  selectFontLabel,
  changePaneFontSize,
  changePaneFontType,
  complexScriptFonts,
  removeResourceLabel,
  localizedDescription,
  clickToRemoveResourceLabel,
  addObjectPropertyToManifest,
}) {
  if (isLTR) {
    return <>
      {getTitleContainerContent(isLTR, headingText, localizedDescription, fontClass)}
      <ThreeDotMenu
        font={font}
        index={index}
        fontSize={fontSize}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        removePane={removePane}
        isTargetBible={isTargetBible}
        selectFontLabel={selectFontLabel}
        complexScriptFonts={complexScriptFonts}
        changePaneFontSize={changePaneFontSize}
        changePaneFontType={changePaneFontType}
        removeResourceLabel={removeResourceLabel}
        clickToRemoveResourceLabel={clickToRemoveResourceLabel}
        addObjectPropertyToManifest={addObjectPropertyToManifest}
      />
    </>;
  } else { // arrange rtl
    return <>
      <ThreeDotMenu
        font={font}
        index={index}
        fontSize={fontSize}
        removePane={removePane}
        isTargetBible={isTargetBible}
        selectFontLabel={selectFontLabel}
        changePaneFontSize={changePaneFontSize}
        changePaneFontType={changePaneFontType}
        complexScriptFonts={complexScriptFonts}
        removeResourceLabel={removeResourceLabel}
        clickToRemoveResourceLabel={clickToRemoveResourceLabel}
        addObjectPropertyToManifest={addObjectPropertyToManifest}
      />
      {getTitleContainerContent(isLTR, headingText, localizedDescription, fontClass)}
    </>;
  }
}

const Pane = ({
  font,
  index,
  verse,
  chapter,
  bibleId,
  fontSize,
  fontClass,
  direction,
  translate,
  removePane,
  description,
  languageName,
  verseElements,
  isTargetBible,
  selectFontLabel,
  changePaneFontSize,
  changePaneFontType,
  complexScriptFonts,
  removeResourceLabel,
  clickToRemoveResourceLabel,
  addObjectPropertyToManifest,
}) => {
  const isLTR_ = isLTR(direction);
  const headingText = bibleId !== 'targetBible' ?
    getTitleWithId(languageName, bibleId)
    : (languageName || '');
  const localizedDescription = getTranslation(translate, `pane.${description}`, description);
  const verseContainerStyle = fontSize ? { fontSize: `${fontSize}%` } : {};

  return (
    <div className="pane-container">
      <div className={isLTR_ ? 'pane-title-container-rtl' : 'pane-title-container-ltr'}>
        <TitleContainer
          font={font}
          index={index}
          isLTR={isLTR_}
          fontSize={fontSize}
          fontClass={fontClass}
          removePane={removePane}
          headingText={headingText}
          isTargetBible={isTargetBible}
          selectFontLabel={selectFontLabel}
          complexScriptFonts={complexScriptFonts}
          changePaneFontSize={changePaneFontSize}
          changePaneFontType={changePaneFontType}
          removeResourceLabel={removeResourceLabel}
          localizedDescription={localizedDescription}
          clickToRemoveResourceLabel={clickToRemoveResourceLabel}
          addObjectPropertyToManifest={addObjectPropertyToManifest}
        />
      </div>
      <div className={isLTR_ ? 'verse-content-container-ltr' : 'verse-content-container-rtl'} style={verseContainerStyle}>
        <Verse
          verse={verse}
          bibleId={bibleId}
          chapter={chapter}
          translate={translate}
          direction={direction}
          verseElements={verseElements}
        />
      </div>
    </div>
  );
};

Pane.propTypes = {
  fontSize: PropTypes.number,
  fontClass: PropTypes.string,
  font: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  verse: PropTypes.number.isRequired,
  bibleId: PropTypes.string.isRequired,
  chapter: PropTypes.number.isRequired,
  translate: PropTypes.func.isRequired,
  removePane: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  isTargetBible: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  languageName: PropTypes.string.isRequired,
  selectFontLabel: PropTypes.string.isRequired,
  changePaneFontSize: PropTypes.func.isRequired,
  changePaneFontType: PropTypes.func.isRequired,
  complexScriptFonts: PropTypes.array.isRequired,
  removeResourceLabel: PropTypes.string.isRequired,
  addObjectPropertyToManifest: PropTypes.func.isRequired,
  clickToRemoveResourceLabel: PropTypes.string.isRequired,
  verseElements: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
};

Pane.defaultProps = { verseElements: [] };

export default Pane;
