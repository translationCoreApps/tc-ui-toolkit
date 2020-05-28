import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import RootRef from '@material-ui/core/RootRef';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import memoize from 'memoize-one';
import _ from 'lodash';
import { getFontClassName } from '../../common/fontUtils';
import { isLTR } from '../..';

/**
 * Utility to generate styles for a tooltip arrow
 */
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      'top': 0,
      'left': 0,
      'marginTop': '-0.9em',
      'width': '3em',
      'height': '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      'bottom': 0,
      'left': 0,
      'marginBottom': '-0.9em',
      'width': '3em',
      'height': '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      'left': 0,
      'marginLeft': '-0.9em',
      'height': '3em',
      'width': '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      'right': 0,
      'marginRight': '-0.9em',
      'height': '3em',
      'width': '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

/**
 * Utility to apply styles based on props
 */
// const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = {
  root: {
    'borderBottom': 'solid #333333 1px',
    'backgroundColor': '#747474',
    '&$selected': {
      'backgroundColor': '#2196F3',
      '&:hover': { backgroundColor: '#2196F3' },
    },
  },
  selected: {},
  textRoot: { paddingRight: 0 },
  text: {
    color: '#FFFFFF',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 12,
  },
  badge: {
    backgroundColor: '#ffffff',
    border: 'solid 2px #747474',
    borderColor: '#747474',
    color: '#747474',
    fontWeight: 'bold',
    fontSize: '75%',
    width: 18,
    height: 18,
    marginTop: 2,
    marginRight: 2,
  },
  selectedBadge: {
    backgroundColor: '#ffffff',
    border: 'solid 2px #747474',
    borderColor: '#2196F3',
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: '75%',
    width: 18,
    height: 18,
    marginTop: 2,
    marginRight: 2,
  },
  lightTooltip: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)',
    fontSize: 14,
    padding: 15,
  },
  lightTooltipSmall: {
    backgroundColor: '#fff',
    color: '#333333',
    boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)',
  },
  arrowPopper: arrowGenerator('#fff'),
  arrow: {
    'position': 'absolute',
    'fontSize': 7,
    'width': '3em',
    'height': '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  bootstrapPopper: arrowGenerator('#000'),
  bootstrapTooltip: { backgroundColor: '#000' },
  bootstrapPlacementLeft: { margin: '0 8px' },
  bootstrapPlacementRight: { margin: '0 8px' },
  bootstrapPlacementTop: { margin: '8px 40px' },
  bootstrapPlacementBottom: { margin: '8px 40px' },
};

/**
 * Renders a single item within the menu
 * @param {string} title - the menu item text
 * @param {function} [onClick] - a callback that receives click events from the menu item
 * @param {boolean} [selected] - indicates if this item is selected
 * @param {object} [status] - a dictionary of boolean values indicating the item's status
 * @param {object[]} [statusIcons] - an array if icons that may be mapped to the item's current status
 */
class MenuItem extends React.Component {
  state = {
    arrowRef: null,
    overflow: false,
  };
  textRef = React.createRef();
  listItemTextRef = React.createRef();

  /**
   * Handles the node ref used for the tooltip arrow
   * @param {object} node - a react ref
   */
  handleArrowRef = node => {
    this.setState({ arrowRef: node });
  };

  /**
   * Check for the tooltip text overflow
   */
  checkOverflow = () => {
    const overflow =
      this.listItemTextRef.current.offsetWidth <
      this.textRef.current.offsetWidth;

    if (overflow !== this.state.overflow) {
      this.setState({ overflow });
    }
  };

  /**
   * Handles clicks on the item
   */
  handleClick = e => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  /**
   * Builds the correct status icon to display
   * @param {object} status - the item status. this is an object of boolean keys
   * @param {object[]} statusIcons - an array of available status icons
   */
  generateStatusIcon = memoize((status, statusIcons, selected) => {
    const { classes } = this.props;

    if (!statusIcons || !status) {
      return null;
    }

    const icons = [];

    for (let i = 0, len = statusIcons.length; i < len; i++) {
      const icon = statusIcons[i];
      const s = status[icon.key];

      if (Boolean(s) === icon.value) {
        icons.push(icon.icon);
      }
    }

    if (icons.length === 1) {
      return <ListItemIcon>{icons[0]}</ListItemIcon>;
    } else if (icons.length > 1) {
      // display badged icon with tooltip
      return (
        <ListItemIcon>
          <Tooltip
            placement="right"
            classes={{ tooltip: this.props.classes.lightTooltipSmall }}
            title={
              <React.Fragment>
                {icons.map((i, key) =>
                  React.cloneElement(i, {
                    key,
                    style: { color: '#333333' },
                  }),
                )}
              </React.Fragment>
            }
          >
            <Badge
              badgeContent={icons.length}
              classes={{ badge: selected ? classes.selectedBadge : classes.badge }}
            >
              {icons[0]}
            </Badge>
          </Tooltip>
        </ListItemIcon>
      );
    } else {
      return null;
    }
  });

  shouldComponentUpdate(nextProps, nextState) {
    // TRICKY: we should technically check for an update to statusIcons
    // however that is not a known use case and it's faster to ignore it.
    const {
      title, key, selected, status,
    } = this.props;
    const { overflow } = this.state;
    return (
      overflow !== nextState.overflow ||
      title !== nextProps.title ||
      key !== nextProps.key ||
      selected !== nextProps.selected ||
      !_.isEqual(status, nextProps.status)
    );
  }

  componentDidUpdate() {
    this.checkOverflow();
  }

  componentDidMount() {
    this.checkOverflow();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({ overflow: false });
    }
  }

  render() {
    const {
      key,
      title,
      status,
      tooltip,
      classes,
      selected,
      statusIcons,
      targetLanguageFont,
      direction,
    } = this.props;
    const { overflow } = this.state;
    const tooltipText = tooltip ? tooltip : title;
    const icon = this.generateStatusIcon(status, statusIcons, selected);
    const fontClass = getFontClassName(targetLanguageFont);
    const style = { textAlign: isLTR(direction) ? 'left' : 'right' };

    return (
      <ListItem
        key={key}
        disableGutters={false}
        selected={selected}
        onClick={this.handleClick}
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
      >
        {icon}
        <RootRef rootRef={this.listItemTextRef}>
          <Tooltip
            enterDelay={300}
            title={
              <React.Fragment>
                <span className={fontClass}>{tooltipText}</span>
                <span className={classes.arrow} ref={this.handleArrowRef}/>
              </React.Fragment>
            }
            disableFocusListener={!overflow}
            disableHoverListener={!overflow}
            disableTouchListener={!overflow}
            classes={{
              tooltip: classes.lightTooltip,
              popper: classes.arrowPopper,
              tooltipPlacementLeft: classes.bootstrapPlacementLeft,
              tooltipPlacementRight: classes.bootstrapPlacementRight,
              tooltipPlacementTop: classes.bootstrapPlacementTop,
              tooltipPlacementBottom: classes.bootstrapPlacementBottom,
            }}
            PopperProps={{
              popperOptions: {
                modifiers: {
                  arrow: {
                    enabled: Boolean(this.state.arrowRef),
                    element: this.state.arrowRef,
                  },
                },
              },
            }}
          >
            <ListItemText
              inset={!icon}
              classes={{
                root: classes.textRoot,
                primary: classes.text,
              }}
              primary={<span className={fontClass} ref={this.textRef} style={style}>{title}</span>}
            />
          </Tooltip>
        </RootRef>
      </ListItem>
    );
  }
}

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  key: PropTypes.any,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  statusIcons: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.object,
  targetLanguageFont: PropTypes.string,
  direction: PropTypes.string,
};

export default withStyles(styles)(MenuItem);
