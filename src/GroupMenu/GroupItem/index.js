import React from 'react';
import PropTypes from 'prop-types';

class GroupItem extends React.Component {
  render() {
    const {
      changeCurrentContextId,
      contextId,
      active,
      statusBadge,
      selectionText,
      bookName,
      activeGroupItemRef,
    } = this.props;
    const { reference } = contextId;
    const bookTitle = selectionText ? reference.bookId : bookName;
    return (
      <div ref={activeGroupItemRef} onClick={() => changeCurrentContextId(contextId)}
        className={'group-item' + (active ? ' active active-submenu-item' : ' submenu-item')}>
        {statusBadge}
        <span
          className="selection"
          data-for="groups-tooltip"
          data-tip={selectionText}
          data-place="bottom"
          data-effect="float"
          data-type="light"
          style={{ minWidth: 0 }}
          data-class="selection-tooltip"
          data-delay-hide="100">
          {reference.chapterVerseMenu ?
            <span className={'group-item-text'}>
              {`${reference.text} ${reference.verse}`}
            </span>
            :
            <span className={'group-item-text'}>
              {' ' + bookTitle + ' ' + reference.chapter + ':' + reference.verse + ' ' + selectionText}
            </span>
          }
        </span>
      </div>
    );
  }
}

GroupItem.propTypes = {
  bookName: PropTypes.string.isRequired,
  selectionText: PropTypes.string.isRequired,
  contextId: PropTypes.object.isRequired,
  changeCurrentContextId: PropTypes.func.isRequired,
  statusBadge: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  groupMenuHeader: PropTypes.object,
  activeGroupItemRef: PropTypes.object,
};

export default GroupItem;
