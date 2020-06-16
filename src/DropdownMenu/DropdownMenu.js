import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';

export default function DropdownMenu({
  open,
  onClose,
  anchorEl,
  children,
  anchorOrigin,
  transformOrigin,
}) {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {children}
    </Popover>
  );
}

DropdownMenu.defaultProps = {
  transformOrigin: { vertical: 'top', horizontal: 'left' },
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
};

DropdownMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
  transformOrigin: PropTypes.object.isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.bool.isRequired,
  ]),
};

export function MenuItem({
  title,
  divider,
  onClose,
  onClick,
  children,
  disableOnClick,
}) {
  const menuItemStyle = {
    display: 'flex',
    padding: '4px',
    margin: '4px',
    cursor: disableOnClick ? '' : 'pointer',
  };

  function handleOnClick() {
    if (!disableOnClick) {
      if (onClose) {
        onClose();
      }

      if (onClick) {
        onClick();
      }
    }
  }

  return (
    <>
      <div style={menuItemStyle} onClick={handleOnClick} title={title}>
        {children}
      </div>
      {divider && <hr style={{ margin: '4px 4px 0' }} />}
    </>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string,
  divider: PropTypes.bool,
  disableOnClick: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.bool.isRequired,
  ]),
};