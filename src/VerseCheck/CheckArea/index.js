import React from 'react';
import PropTypes from 'prop-types';
// components
import DefaultArea from '../DefaultArea';
import SelectionArea from '../SelectionArea';
import InstructionsArea from '../InstructionsArea';
import EditVerseArea from '../EditVerseArea';
import CommentArea from '../CommentArea';
import '../VerseCheck.styles.css';

let CheckArea = ({
  contextId,
  actions,
  mode,
  tags,
  verseText,
  verseChanged,
  comment,
  newSelections,
  selections,
  projectDetailsReducer,
  translate,
  bibles,
  alignedGLText
}) => {
  let modeArea;
  switch (mode) {
    case 'edit':
      modeArea = (
        <EditVerseArea
          tags={tags}
          verseText={verseText}
          verseChanged={verseChanged}
          actions={actions}
          dir={projectDetailsReducer.manifest.target_language.direction}
          translate={translate}
        />
      );
      break;
    case 'comment':
      modeArea = <CommentArea comment={comment} actions={actions} translate={translate} />;
      break;
    case 'select':
      modeArea = (
        <div style={{WebkitUserSelect: 'none', display: "flex", flex: "1", justifyContent: "center", alignItems: "center", overflow: "auto"}}>
          <InstructionsArea
            verseText={verseText}
            selections={selections}
            alignedGLText={alignedGLText}
            mode={mode}
            translate={translate}
          />
        </div>);
      break;
    case 'default':
    default:
      modeArea = (
        <div style={{WebkitUserSelect: 'none', display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <InstructionsArea
            dontShowTranslation={true}
            verseText={verseText}
            selections={selections}
            alignedGLText={alignedGLText}
            translate={translate}
          />
        </div>
      );
  }

  return (
    <div className='checkArea'>
      {mode === 'select' ?
        <SelectionArea
          verseText={verseText}
          selections={newSelections}
          mode={mode}
          manifest={projectDetailsReducer.manifest}
          reference={contextId.reference}
          actions={actions} /> :
        <DefaultArea
          reference={contextId.reference}
          actions={actions}
          translate={translate}
          manifest={projectDetailsReducer.manifest}
          verseText={verseText}
          selections={selections}
          bibles={bibles}
        />
      }
      <div style={{borderLeft: '1px solid var(--border-color)', flex: 1, overflowY: "auto", display: 'flex', justifyContent: 'center'}}>
        {modeArea}
      </div>
    </div>
  );
};

CheckArea.propTypes = {
  translate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  verseText: PropTypes.string.isRequired,
  verseChanged: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  contextId: PropTypes.object,
  selections: PropTypes.array.isRequired,
  newSelections: PropTypes.array.isRequired,
  projectDetailsReducer: PropTypes.shape({
    manifest: PropTypes.object,
    currentProjectToolsSelectedGL: PropTypes.object
  }).isRequired,
  bibles: PropTypes.object,
  alignedGLText: PropTypes.string.isRequired
};

export default CheckArea;