import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

class GroupItem extends React.Component {
  /**
   * @description Generate the proper glyphicon based on selections
   * @return {component} statusGlyph - component to render
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (this.props.active) {
      if (this.props.inView(this.props.groupMenuHeader, this)) {
        //If the menu and current check are able to be rendered in the
        //same window scroll to the group menu item
        this.props.scrollIntoView(this.props.groupMenuHeader);
      }
      else {
        //Scroll to the current check item
        this.props.scrollIntoView(this);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      if (this.props.inView(nextProps.groupMenuHeader, this)) {
        //If the menu and current check are able to be rendered in the
        //same window scroll to the group menu item
        nextProps.scrollIntoView(nextProps.groupMenuHeader);
      }
      else {
        //Scroll to the current check item
        nextProps.scrollIntoView(this);
      }
    }
  }

  onClick() {
    this.props.actions.changeCurrentContextId(this.props.contextId);
  }

  render() {
    const {
      contextId: {reference},
      active,
      statusBadge,
      selectionText,
      bookName
    } = this.props;
    return (
      <div onClick={this.onClick}
        className={"group-item" + (active ? " active active-submenu-item" : " submenu-item")}>
        {statusBadge}
        <span
          className="selection"
          data-tip={selectionText}
          data-place="bottom"
          data-effect="float"
          data-type="dark"
          data-class="selection-tooltip"
          data-delay-hide="100">
          {reference.chapterVerseMenu ?
            <span className={'group-item-text'}>
              {`${reference.text} ${reference.verse}`}
            </span>
            :
            <span className={'group-item-text'}>
              {" " + bookName + " " + reference.chapter + ":" + reference.verse + " " + selectionText}
            </span>
          }
        </span>
        <ReactTooltip />
      </div>
    );
  }
}

GroupItem.propTypes = {
  bookName: PropTypes.string.isRequired,
  selectionText: PropTypes.string.isRequired,
  contextId: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    changeCurrentContextId: PropTypes.func.isRequired
  }),
  statusBadge: PropTypes.object.isRequired,
  scrollIntoView: PropTypes.func.isRequired,
  inView: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  groupMenuHeader: PropTypes.object
};

module.exports = GroupItem;
