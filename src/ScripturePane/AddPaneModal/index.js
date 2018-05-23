import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import { Glyphicon } from 'react-bootstrap';

import './AddPaneModal.styles.css';

const styles = {
  toolBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--reverse-color)',
    backgroundColor: 'var(--accent-color-dark)',
    padding: '15px',
    width: '100%',
  },
  title: {
    marginLeft: 'auto',
    fontSize: '22px',
    fontWeight: '400'
  },
  closeButton: {
    marginLeft: 'auto'
  },
  dialogContent: {
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    padding: '0px 24px 24px',
    margin: '0px'
  },
  dialogActions: {
    height: '70px',
    padding: '10px',
    margin: '0px',
    borderTop: '1px solid var(--border-color)'
  },

  icon: {
    color: '#ffffff',
    width: 25,
    height: 25
  },
  iconButton: {
    padding: 0,
    width: 25,
    height: 25,
    marginTop: 5
  },
  // title: {
  //   display: 'flex',
  //   flexDirection: 'row'
  // },
  body: {
    textAlign: 'center'
  },
  select: {
    margin: '0 auto',
    width: '300px'
  }
};

const AddPaneModal = ({
  show,
  onHide,
  title,
  selectLanguageLabel,
  selectLabel,
  selectSourceLanguage,
  biblesWithHighlightedWords,
  selectedPane,
  addNewBibleResource,
  currentPaneSettings,
}) => {
  let panes = [];
  Object.keys(biblesWithHighlightedWords).forEach((languageId) => {
    Object.keys(biblesWithHighlightedWords[languageId]).forEach((bibleId) => {
      const { resource_title, language_name } = biblesWithHighlightedWords[languageId][bibleId]['manifest'];
      const resourceText = bibleId !== "targetBible" ? " (" + resource_title + ")" : " (Current project)";
      const displayText = `${language_name} (${languageId}) ${resourceText}`;
      const foundInCurrentPaneSettings = currentPaneSettings.filter((paneSetting) => {
        return paneSetting.bibleId === bibleId && paneSetting.languageId === languageId;
      }).length > 0;

      panes.push(
        <option
          key={`${languageId}_${bibleId}`}
          value={`${languageId}_${bibleId}`}
          disabled={foundInCurrentPaneSettings}
        >
          {displayText}
        </option>
      );
    });
  });

  return (
    <Dialog open={show} onClose={onHide} fullWidth maxWidth='md'>
      <Toolbar style={styles.toolBar}>
        <div style={styles.title}>
          {title}
        </div>
        <IconButton color="inherit" onClick={onHide} aria-label="Close" style={styles.closeButton}>
          <Glyphicon glyph="remove" />
        </IconButton>
      </Toolbar>
      <DialogContent style={styles.dialogContent}>
        <h4 style={{ marginBottom: "30px" }}>
          {selectLanguageLabel}
        </h4>
          <FormControl
            componentClass="select"
            style={styles.select}
            onChange={e => selectSourceLanguage(e.target.value)}
          >
            <option value="">{selectLabel}</option>
            {panes}
          </FormControl>
      </DialogContent>
      <DialogActions disableActionSpacing style={styles.dialogActions}>
        <button className="btn-second" onClick={onHide}>
          Close
        </button>
        {
          selectedPane &&
          <button className="btn-prime" onClick={addNewBibleResource}>
            Load
          </button>
        }
      </DialogActions>
    </Dialog>
  );
};

AddPaneModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selectLanguageLabel: PropTypes.string.isRequired,
  selectLabel: PropTypes.string.isRequired,
  selectSourceLanguage: PropTypes.func.isRequired,
  biblesWithHighlightedWords: PropTypes.object.isRequired,
  selectedPane: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      bibleId: PropTypes.string,
      languageId: PropTypes.string
    })
  ]),
  addNewBibleResource: PropTypes.func.isRequired,
  currentPaneSettings: PropTypes.array.isRequired,
};

export default AddPaneModal;