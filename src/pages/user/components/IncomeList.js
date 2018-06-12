import { Component } from 'react';
import IncomeRow from './IncomeRow';
import styles from './less/IncomeList.less';

class IncomeList extends Component {

  render() {
    const { code, data } = this.props.incomeList;
    if (code === 1) {
      if (data.length > 0) {
        return (
          <div className={styles['list-item']}>
            {data.map((item, index) => <IncomeRow key={index} item={item} />)}
          </div>
        );
      }
      return (
        <div className={styles['list-empty']}>
          <p>邀请一个好友赚 <span className={styles['light-text']}>50</span> POC</p>
          <p>快去邀请好友吧</p>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default IncomeList;
