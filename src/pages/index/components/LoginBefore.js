import UserLogin from './UserLogin';
import QueueAnim from 'rc-queue-anim';
import styles from './LoginBefore.less';

function LoginBefore({
  dispatch,
  isLoggedIn,
  loginInfo,
}) {

  return (
    <div className={styles['home-container']}>
      <QueueAnim
        className={styles.header}
        type="top"
        delay={300}>
        <div className={styles.logo} key="a"></div>
        <h3 className={styles.name} key="b">快拍</h3>
        <div className={styles['slogan-sub']} key="c">人工智能数据网络生态</div>
        <h1 className={styles['slogan-main']} key="d">
          拍照就能<span className={styles.light}>赚钱</span>
        </h1>
      </QueueAnim>
      <UserLogin/>
    </div>
  );
}

export default LoginBefore;
