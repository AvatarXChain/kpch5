import { Component } from 'react';
import Link from 'umi/link';
import {
  Toast,
  Button,
} from 'antd-mobile';

import styles from './less/Header.less';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
  }

  render() {
    const { code: tokenCountCode, data: tokenCountData } = this.props.tokenCountAll;
    const { code: userInfoCode, data: userInfoData } = this.props.userInfo;

    const tokenCountAll = tokenCountCode === 1 ? (
      <div className={styles.computed}>
        <p className={styles.title}>当前全网算力</p>
        <h2 className={styles.number}>{tokenCountData}</h2>
      </div>
    ) : 0;

    const tokenCountUser = userInfoCode === 1 ? (
      <ul className={styles['count-list']}>
        <li className={styles.item}>
          <Link to="user">
            <p className={styles.title}>总收益</p>
            <p className={styles.number}>{userInfoData.c_token_total}</p>
            <span className={styles['btn-more']}>收益详情</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="user">
            <p className={styles.title}>今日收益</p>
            <p className={styles.number}>{userInfoData.c_token_today}</p>
            <span className={styles['btn-more']}>查看详情</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="user">
            <p className={styles.title}>总收益</p>
            <p className={styles.number}>{userInfoData.c_token_rank}</p>
            <span className={styles['btn-more']}>查看排行</span>
          </Link>
        </li>
      </ul>
    ) : '';

    return (
      <div className={styles.header}>
        {tokenCountAll}
        {tokenCountUser}
      </div>
    );
  }
}

export default Header;
