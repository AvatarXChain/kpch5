import { Component } from 'react';
import styles from './less/InviteItem.less';
import { dateFormat } from '../../../utils/filters';

class InviteItem extends Component {

  render() {
    const { item } = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.row1}>{item.user.mobile}</div>
        <div className={styles.row2}>+50</div>
        <div className={styles.row3}>{dateFormat(item.created_at).substr(5, 14)}</div>
      </div>
    );
  }
}

export default InviteItem;
