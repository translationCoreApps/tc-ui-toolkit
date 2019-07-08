import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  colorSwitchBase: {
    '&$colorChecked': {
      color: 'var(--accent-color-dark)',
      '& + $colorBar': {
        backgroundColor: 'var(--accent-color-dark)',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  label: {
    color: 'var(--accent-color-dark)',
    fontWeight: "normal",
    fontSize: 14,
  },
};

const Bookmark = ({
  value,
  label,
  checked,
  color,
  onChange,
  disabled,
  classes
}) => {
  return (
    <FormControlLabel
      style={{paddingLeft:10}}
      control={
        <Switch
          value={value}
          checked={true}
          color={color}
          onChange={onChange}
          disabled={disabled}
          classes={{
            switchBase: classes.colorSwitchBase,
            checked: classes.colorChecked,
            bar: classes.colorBar,
          }}
        />
      }
      classes={{label: classes.label}}
      label={label}
    />
  );
};

Bookmark.defaultProps = {
  checked: false,
  disabled: false,
  color: 'primary',
};

Bookmark.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.string,
  classes: PropTypes.object
};

export default withStyles(styles)(Bookmark);
