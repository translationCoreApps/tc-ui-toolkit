import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Glyphicon} from 'react-bootstrap';
// components
import GroupItems from '../GroupItems';
// helpers
import * as helpers from '../helpers';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.activeGroupItemRef = React.createRef();
    this.currentGroupRef = React.createRef();
    this.scrollToCurrentCheck = this.scrollToCurrentCheck.bind(this);
  }

  scrollToCurrentCheck() {
    if (helpers.inView(this.currentGroupRef, this.activeGroupItemRef)) {
      //If the menu and current check are able to be rendered in the
      //same window scroll to the group menu item
      helpers.scrollIntoView(this.currentGroupRef);
    }
    else {
      //Scroll to the current check item
      helpers.scrollIntoView(this.activeGroupItemRef);
    }
  }

  componentDidMount() {
    if (this.props.active)
      this.scrollToCurrentCheck();
  }

  componentDidUpdate() {
    if (this.props.active)
    this.scrollToCurrentCheck();
  }

  render() {
    const {
      changeCurrentContextId,
      active,
      groupMenuExpandSubMenu,
      openGroup,
      isSubMenuExpanded,
      progress,
      groupIndex,
      groupData,
      filters,
      manifest,
      contextId,
      getSelections,
      isVerseFinished,
      isVerseValid,
      currentToolName
    } = this.props;
    let groupMenuItemHeadingClassName = active ? 'menu-item-heading-current' : 'menu-item-heading-normal';

    let glyphAction = active ? groupMenuExpandSubMenu : openGroup;
    let expandedGlyph = (
      <Glyphicon glyph="chevron-down" style={{float: 'right', marginTop: '3px'}} onClick={() => glyphAction(false)} />
    );
    let collapsedGlyph = (
      <Glyphicon glyph="chevron-right" style={{float: 'right', marginTop: '3px'}} onClick={() => glyphAction(true)} />
    );
    return (
        <div className="group">
          <div ref={this.currentGroupRef} className={groupMenuItemHeadingClassName}>
            {active && isSubMenuExpanded ? expandedGlyph : collapsedGlyph}
            <div onClick={openGroup} style={{display: 'flex'}}>
              <div style={{position: 'relative', justifyContent: 'center', height: 20, width: 20, display: 'flex', marginRight: '10px', float: 'left'}}>
                <div style={{height: 20, width: 20, border: 'white solid 3px', borderRadius: '50%'}} />
                <CircularProgress
                  variant="static"
                  value={progress * 100}
                  thickness={10}
                  size={15}
                  color={'primary'}
                  style={{alignSelf: 'center', position: 'absolute', width: 20, height: 20, color:'#40BDF2'}}
                />
              </div>
              {groupIndex.name}
            </div>
          </div>
          {active && isSubMenuExpanded ?
            (<GroupItems
              currentToolName={currentToolName}
              isVerseFinished={isVerseFinished}
              isVerseValid={isVerseValid}
              getSelections={getSelections}
              changeCurrentContextId={changeCurrentContextId}
              contextId={contextId}
              groupData={groupData}
              activeGroupItemRef={this.activeGroupItemRef}
              filters={filters}
              manifest={manifest} />)
            : null}
        </div>
    );
  }
}

Group.propTypes = {
  manifest: PropTypes.object.isRequired,
  contextId: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  groupData: PropTypes.array.isRequired,
  isSubMenuExpanded: PropTypes.bool.isRequired,
  groupMenuExpandSubMenu: PropTypes.func.isRequired,
  openGroup: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  groupIndex: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  changeCurrentContextId: PropTypes.func.isRequired,
  getSelections: PropTypes.func.isRequired,
  isVerseFinished: PropTypes.func.isRequired,
  isVerseValid: PropTypes.func.isRequired,
  currentToolName: PropTypes.string.isRequired,
};

export default Group;
